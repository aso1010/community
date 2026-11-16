import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {onRequest} from '../functions/v1/_middleware.js';
import {onRequestPost as pricing} from '../functions/v1/pricing/calculate.js';
import {onRequestPost as inventory} from '../functions/v1/inventory/sync.js';
import {onRequestPost as dispatch} from '../functions/v1/dispatch/batch.js';
import spec from '../lib/food-api-schema.js';
const price = {chef_id:'chef',sku:'sku',cogs_usd:6.8,packaging_usd:.95,target_net_margin:.525,fulfillment_mode:'PICKUP'};
const stock = {node_id:'bk-02',chef_id:'chef',sku:'kn-cod-01',delta:-14,idempotency_key:'00000000-0000-4000-8000-000000000001'};
async function request(path, body, handler, method='POST') {
 const req = new Request('https://example.test/v1/'+path, {method, ...(method==='GET'?{}:{body:typeof body==='string'?body:JSON.stringify(body)})});
 return onRequest({request:req,next:()=>handler({request:req})});
}
test('published contract matches runtime contract',async()=>assert.deepEqual(JSON.parse(await readFile(new URL('../public/api/openapi.json',import.meta.url))),spec));
test('pricing computes pickup and separate courier fee',async()=>{
 const a=await (await request('pricing/calculate',price,pricing)).json();
 const b=await (await request('pricing/calculate',{...price,fulfillment_mode:'ECARGO_BATCH'},pricing)).json();
 assert.equal(a.menu_price_usd,24);assert.equal(a.chef_net_profit_usd,12.6);assert.equal(b.courier_fee_usd,3);assert.equal(b.chef_net_payout_usd,a.chef_net_payout_usd);
});
test('zero costs and margin are preserved',async()=>{
 const r=await (await request('pricing/calculate',{...price,cogs_usd:0,packaging_usd:0,station_amortized_usd:0,target_net_margin:0},pricing)).json();
 assert.equal(r.menu_price_usd,2.25);assert.equal(r.chef_net_profit_usd,0);
});
test('invalid requests are rejected',async()=>{
 for(const patch of [{target_net_margin:1},{cogs_usd:-1},{cogs_usd:'6.8'},{fulfillment_mode:'INVALID'}]) assert.equal((await request('pricing/calculate',{...price,...patch},pricing)).status,422);
 assert.equal((await request('pricing/calculate',{},pricing)).status,422);
 assert.equal((await request('pricing/calculate','{',pricing)).status,400);
 assert.equal((await request('pricing/calculate',null,pricing,'GET')).status,405);
 assert.equal((await request('inventory/sync',{...stock,idempotency_key:'invalid'},inventory)).status,422);
});
test('inventory marks simulation and never claims cache purge',async()=>{
 const r=await request('inventory/sync',stock,inventory);assert.equal(r.headers.get('Cache-Control'),'no-store');
 const d=await r.json();assert.equal(d.remaining_portions,0);assert.equal(d.state,'LOCKED_SOLD_OUT');assert.equal(d.cdn_surrogate_purged,false);assert.equal(d.simulation,true);
});
test('dispatch does not invent orders for empty input',async()=>{
 const body={node_id:'bk-02',window_close_iso:'2026-11-17T18:00:00Z',orders:[]};
 const r=await (await request('dispatch/batch',body,dispatch)).json();assert.equal(r.consolidated_orders_count,0);assert.deepEqual(r.route_sequence,[]);assert.equal(r.total_route_miles,0);
 const d=await (await request('dispatch/batch',{...body,orders:[{order_id:'a'},{order_id:'b'}]},dispatch)).json();assert.deepEqual(d.route_sequence,['a','b']);
 assert.equal((await request('dispatch/batch',{...body,orders:[{dropoff_lat:91}]},dispatch)).status,422);
});

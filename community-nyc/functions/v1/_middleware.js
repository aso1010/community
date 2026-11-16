import spec from '../../lib/food-api-schema.js';

function valid(value, schema) {
  if (schema.type === 'object') {
    return value !== null && typeof value === 'object' && !Array.isArray(value)
      && (schema.required || []).every(k => Object.hasOwn(value, k))
      && Object.entries(schema.properties || {}).every(([k, s]) =>
        !Object.hasOwn(value, k) || valid(value[k], s));
  }
  if (schema.type === 'array') return Array.isArray(value) && value.every(v => valid(v, schema.items));
  if (schema.type === 'string') {
    if (typeof value !== 'string' || !value.trim()) return false;
    if (schema.format === 'uuid' && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) return false;
    if (schema.format === 'date-time' && (!/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value)))) return false;
  }
  if (schema.type === 'number' && (typeof value !== 'number' || !Number.isFinite(value))) return false;
  if (schema.type === 'integer' && !Number.isSafeInteger(value)) return false;
  return !schema.enum || schema.enum.includes(value);
}

export async function onRequest(context) {
  const operation = spec.paths[new URL(context.request.url).pathname]?.post;
  if (!operation) return context.next();
  const headers = { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' };
  if (context.request.method === 'OPTIONS') return new Response(null, {status: 204, headers: {...headers, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}});
  if (context.request.method !== 'POST') return Response.json({error: 'Use POST'}, {status: 405, headers: {...headers, Allow: 'POST, OPTIONS'}});
  let body;
  try { body = await context.request.clone().json(); }
  catch { return Response.json({error: 'Malformed JSON'}, {status: 400, headers}); }
  let acceptable = valid(body, operation.requestBody.content['application/json'].schema);
  if (acceptable) {
    acceptable = ['cogs_usd','packaging_usd','station_amortized_usd','distance_miles'].every(k => body[k] === undefined || body[k] >= 0)
      && (body.target_net_margin === undefined || (body.target_net_margin >= 0 && body.target_net_margin < 1));
    if (body.orders) acceptable = acceptable && body.orders.every(o =>
      (o.dropoff_lat === undefined || Math.abs(o.dropoff_lat) <= 90) &&
      (o.dropoff_lon === undefined || Math.abs(o.dropoff_lon) <= 180));
  }
  if (!acceptable) return Response.json({error: 'Invalid request fields; see /api/openapi.json'}, {status: 422, headers});
  const upstream = await context.next();
  const response = new Response(upstream.body, upstream);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

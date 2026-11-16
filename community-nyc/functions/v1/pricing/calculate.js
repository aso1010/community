export async function onRequestPost(context) {
  const body = await context.request.json();
  const cogs = Number(body.cogs_usd ?? 6.80);
  const packaging = Number(body.packaging_usd ?? 0.95);
  const station = Number(body.station_amortized_usd ?? 1.40);
  const targetMargin = Number(body.target_net_margin ?? 0.525);
  const mode = body.fulfillment_mode || "PICKUP";

  const apiFee = 1.25;
  const stripeRail = 1.00;
  const courierFee = mode === "ECARGO_BATCH" ? 3.00 : 0.00;

  const baseCost = cogs + packaging + station + apiFee + stripeRail;
  const menuPrice = Number((baseCost / (1 - targetMargin)).toFixed(2));
  const chefNetPayout = Number((menuPrice - apiFee - stripeRail).toFixed(2));
  const chefNetProfit = Number((chefNetPayout - cogs - packaging - station).toFixed(2));

  return new Response(JSON.stringify({
    chef_id: body.chef_id || "chef_kenji_02",
    sku: body.sku || "kn-cod-01",
    menu_price_usd: menuPrice,
    api_execution_fee_usd: apiFee,
    courier_fee_usd: courierFee,
    stripe_rail_usd: stripeRail,
    chef_net_payout_usd: chefNetPayout,
    chef_net_profit_usd: chefNetProfit
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

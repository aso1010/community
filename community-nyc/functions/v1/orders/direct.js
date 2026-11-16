export async function onRequestPost(context) {
  const body = await context.request.json();
  return new Response(JSON.stringify({
    status: "CONFIRMED",
    order_id: `ord_${Date.now().toString(36)}`,
    node_id: body.node_id || "bk-02",
    chef_id: body.chef_id || "chef_kenji_02",
    fulfillment_mode: body.fulfillment_mode || "PICKUP",
    settlement_rail: "STRIPE_CONNECT_DIRECT",
    cdn_surrogate_purged: true
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

const BASELINE = {
  "kn-cod-01": 14,
  "kn-sob-02": 22,
  "kn-pan-03": 0
};

export async function onRequestPost(context) {
  const body = await context.request.json();
  const sku = body.sku || "kn-cod-01";
  const delta = Number(body.delta ?? -1);
  const current = BASELINE[sku] ?? 10;
  const remaining = Math.max(0, current + delta);
  const state = remaining === 0 ? "LOCKED_SOLD_OUT" : (remaining <= 5 ? "LOW_STOCK" : "IN_STOCK");

  return new Response(JSON.stringify({
    node_id: body.node_id || "bk-02",
    chef_id: body.chef_id || "chef_kenji_02",
    sku,
    remaining_portions: remaining,
    state,
    cdn_surrogate_purged: true
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

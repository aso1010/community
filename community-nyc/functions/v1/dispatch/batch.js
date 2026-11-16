export async function onRequestPost(context) {
  const body = await context.request.json();
  const orders = Array.isArray(body.orders) ? body.orders : [];
  const routeSequence = orders.map((o, idx) => o.order_id || `ord_${idx + 1}`);

  return new Response(JSON.stringify({
    batch_id: `batch_${(body.node_id || "bk02").replace("-", "")}_1830`,
    courier_id: "demo_ecargo_09",
    simulation: true,
    consolidated_orders_count: orders.length,
    route_sequence: routeSequence,
    total_route_miles: orders.length ? 2.4 : 0
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

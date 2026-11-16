export async function onRequestPost(context) {
  const body = await context.request.json();
  const orders = Array.isArray(body.orders) ? body.orders : [];
  const routeSequence = orders.map((o, idx) => o.order_id || `ord_${idx + 1}`);

  return new Response(JSON.stringify({
    batch_id: `batch_${(body.node_id || "bk02").replace("-", "")}_1830`,
    courier_id: "ecargo_09",
    consolidated_orders_count: orders.length || 4,
    route_sequence: routeSequence.length ? routeSequence : ["ord_101", "ord_104", "ord_107", "ord_112"],
    total_route_miles: 2.4
  }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

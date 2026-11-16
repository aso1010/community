# Food API implementation

The supplied blueprint is preserved in `community-blueprint.md`. Its standalone
storefront is available at `/chefs/kenji/prototype.html`. This is a demonstration:
cart clicks do not reserve inventory, charge money, or place orders. Addresses,
dietary claims, stock, and economic assumptions in the supplied document are
illustrative and must be verified before use in a real service.

`public/api/openapi.json` is the published request contract. Its generated JS
copy in `lib/food-api-schema.js` drives request validation in Pages middleware.
When the contract changes, regenerate that copy and run the contract tests.

Pricing uses the supplied dollar-denominated cost model: ingredient, packaging,
station, $1.25 execution, and $1 payment costs divided by one minus target margin.
The optional station cost defaults to $1.40. A $3 courier fee is charged separately
for ECARGO_BATCH; it is not deducted from chef payout. Zero costs and zero margin
are valid. Negative costs and margins outside [0, 1) are rejected.

Inventory is a stateless baseline simulation, not a database. It validates the
required UUID idempotency key but does not persist or deduplicate mutations.
Responses say `simulation: true` and `cdn_surrogate_purged: false`.
Dispatch preserves submitted order sequence, returns illustrative distance and
courier identifiers, and does not optimize routes or book a courier. Empty input
returns zero orders, an empty route and zero miles.

Durable inventory, idempotency, operator authentication, real courier integration,
and cache invalidation remain prerequisites for operational use. The separate
`/v1/orders/direct` route remains the pre-existing demo; it does not settle payments.

Run `node --test community-nyc/tests/food-api.test.mjs` from the repository root,
then `bash build.sh` to compile the Pages bundle.

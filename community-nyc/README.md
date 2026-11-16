# COMMUNITY.NYC // CLOUDFLARE DEPLOYMENT VECTOR

## Direct Upload (Zero-CLI Drag & Drop)
1. Upload the `public/` directory directly in Cloudflare Dashboard -> **Workers & Pages** -> **Create** -> **Pages** -> **Upload assets**.
2. All static routes (`/`, `/chefs/kenji/`, `/nodes/bk-02/`), `/llms.txt`, `/api/openapi.json`, `/fonts/`, `_headers`, and `_redirects` deploy immediately at Edge CDN.

## Full Stack Deployment (Static + Edge Functions `/v1/*`)
```bash
npx wrangler pages deploy public --project-name=community-nyc
```
Wrangler automatically compiles and binds `functions/v1/**` alongside `public/**`.

## Custom Subdomain Mapping
Attach the following domains in Cloudflare Pages -> **Custom Domains**:
- `community.nyc` -> `/`
- `kenji.community.nyc` -> `/chefs/kenji/` (via `_redirects`)
- `elena.community.nyc` -> `/chefs/elena/` (via `_redirects`)
- `marcus.community.nyc` -> `/chefs/marcus/` (via `_redirects`)

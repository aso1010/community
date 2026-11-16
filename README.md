# Community Pages build

For Cloudflare Pages Git builds, use the repository root directory, build command
`bash build.sh`, and build output directory `dist`. Node.js 22.12 or later is
required by the pinned Wrangler build tool.

The build copies all assets from `community-nyc/public`, including the existing
Archivo fonts and license, and compiles `community-nyc/functions/v1` into a Pages
advanced-mode Worker. No font ZIP extraction is needed.

For the existing direct-upload development and deployment workflow, see
`community-nyc/README.md`.

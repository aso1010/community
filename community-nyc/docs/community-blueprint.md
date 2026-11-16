```text
SYSTEM STATE: NUCLEATION (0 -> 1) // SYMMETRY (1 -> 1) // PROPAGATION (2)
STATUS: System primed. Structural integrity holds.
TARGET: community.nyc // Sovereign Culinary Infrastructure Network

```

### 1. JSON-LD Semantic Schema (`chef.community.nyc`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://community.nyc/#organization",
      "name": "Community",
      "url": "https://community.nyc",
      "description": "Decentralized culinary infrastructure network providing physical commissary nodes and headless Food API execution."
    },
    {
      "@type": ["Person", "FoodEstablishment"],
      "@id": "https://kenji.community.nyc/#node",
      "name": "Chef Kenji Sato",
      "url": "https://kenji.community.nyc",
      "servesCuisine": "Japanese Washoku",
      "parentOrganization": {
        "@id": "https://community.nyc/#organization"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "412 Graham Ave, Station 03",
        "addressLocality": "Brooklyn",
        "addressRegion": "NY",
        "postalCode": "11211",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 40.7176,
        "longitude": -73.9447
      },
      "hasMenu": {
        "@id": "https://kenji.community.nyc/#menu"
      }
    },
    {
      "@type": "Menu",
      "@id": "https://kenji.community.nyc/#menu",
      "name": "Daily Batch Production",
      "inLanguage": "en",
      "hasMenuSection": [
        {
          "@type": "MenuSection",
          "name": "Dinner Service // Window 17:30-21:00",
          "hasMenuItem": [
            {
              "@type": "MenuItem",
              "@id": "https://kenji.community.nyc/#item-miso-cod",
              "name": "Saikyo Miso Black Cod Bento",
              "description": "72-hour fermented white miso sablefish, Koshihikari rice, pickled daikon, sesame spinach.",
              "suitableForDiet": "https://schema.org/GlutenFreeDiet",
              "nutrition": {
                "@type": "NutritionInformation",
                "calories": "680 kcal",
                "proteinContent": "42g"
              },
              "offers": {
                "@type": "Offer",
                "price": "24.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validThrough": "2026-11-16T21:00:00-05:00",
                "seller": {
                  "@id": "https://kenji.community.nyc/#node"
                },
                "availableDeliveryMethod": [
                  "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
                  "http://purl.org/goodrelations/v1#DeliveryModePickUp"
                ]
              }
            }
          ]
        }
      ]
    }
  ]
}

```

---

### 2. Agent-Optimized Routing (`llms.txt`)

**Root Network Specification (`[https://community.nyc/llms.txt](https://community.nyc/llms.txt)`)**

```markdown
# Community (community.nyc)
> Decentralized culinary infrastructure network. Sovereign chef-owned nodes backed by shared commissary real estate and deterministic e-cargo batch logistics. Zero platform commissions.

## Network Architecture
- Protocol: Direct-to-Chef Commerce (No marketplace intermediation)
- Payment Settlement: Sovereign Stripe Connect / Lightning direct to Chef Node
- Logistics Radius: 1.5 miles per physical node via unified e-cargo batching

## Physical Commissary Nodes (NYC)
- [Node 01 // Crown Heights](https://community.nyc/nodes/bk-01): 8 stations, e-cargo dispatch hub.
- [Node 02 // Williamsburg](https://community.nyc/nodes/bk-02): Flagship test kitchen + street walk-up window.
- [Node 03 // Lower East Side](https://community.nyc/nodes/mn-01): High-turnover weekday dense-corridor hub.
- [Node 04 // Long Island City](https://community.nyc/nodes/qn-01): Multi-cuisine production + East River crossing dispatch.

## Active Sovereign Chef Hubs
- [Chef Kenji Sato](https://kenji.community.nyc/llms.txt): Japanese Washoku // Node 02 (Williamsburg)
- [Chef Elena Vance](https://elena.community.nyc/llms.txt): Oaxacan Masa & Mole // Node 01 (Crown Heights)
- [Chef Marcus Thorne](https://marcus.community.nyc/llms.txt): Levantine Wood-Fire // Node 03 (LES)

## Food API Endpoints
- Telemetry & Stock: `GET https://api.community.nyc/v1/inventory/sync`
- Batch Dispatch ETA: `POST https://api.community.nyc/v1/dispatch/batch`

```

**Individual Chef Hub Specification (`[https://kenji.community.nyc/llms.txt](https://kenji.community.nyc/llms.txt)`)**

```markdown
# Chef Kenji Sato (kenji.community.nyc)
> Sovereign Culinary Node operating out of Community Node 02 (412 Graham Ave, Brooklyn, NY 11211).

## Operational Parameters
- Status: OPEN (Batch 02 Active)
- Pickup Window: 17:30 - 21:00 EST (Street Window B)
- Delivery Zone: 1.5-mile radius (Williamsburg, Greenpoint) // Flat $3.00 courier execution fee
- Direct Checkout API: `POST https://api.community.nyc/v1/orders/direct`

## Live Menu & Portion Telemetry
- **Saikyo Miso Black Cod Bento** | $24.00 USD | Remaining: 14/40 portions | Gluten-Free | `sku: kn-cod-01`
- **Charred Maitake & Dashi Soba** | $18.00 USD | Remaining: 22/35 portions | Vegan | `sku: kn-sob-02`
- **Hojicha Panna Cotta** | $8.00 USD | Remaining: 0/20 portions | SOLD OUT | `sku: kn-pan-03`

```

---

### 3. Food API Specification (OpenAPI 3.1 / REST JSON Schema)

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Community Food API // Universe Engine",
    "version": "1.0.0"
  },
  "paths": {
    "/v1/pricing/calculate": {
      "post": {
        "summary": "Dynamic Unit Economics Engine",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["chef_id", "sku", "cogs_usd", "packaging_usd", "target_net_margin", "fulfillment_mode"],
                "properties": {
                  "chef_id": { "type": "string", "example": "chef_kenji_02" },
                  "sku": { "type": "string", "example": "kn-cod-01" },
                  "cogs_usd": { "type": "number", "example": 6.80 },
                  "packaging_usd": { "type": "number", "example": 0.95 },
                  "station_amortized_usd": { "type": "number", "example": 1.40 },
                  "fulfillment_mode": { "type": "string", "enum": ["PICKUP", "ECARGO_BATCH"] },
                  "distance_miles": { "type": "number", "example": 1.1 },
                  "target_net_margin": { "type": "number", "example": 0.55 }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Deterministic price output",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "menu_price_usd": { "type": "number", "example": 24.00 },
                    "api_execution_fee_usd": { "type": "number", "example": 1.25 },
                    "courier_fee_usd": { "type": "number", "example": 3.00 },
                    "stripe_rail_usd": { "type": "number", "example": 1.00 },
                    "chef_net_payout_usd": { "type": "number", "example": 18.75 },
                    "chef_net_profit_usd": { "type": "number", "example": 9.60 }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/v1/inventory/sync": {
      "post": {
        "summary": "Bi-directional Kitchen Station Portion Telemetry",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["node_id", "chef_id", "sku", "delta", "idempotency_key"],
                "properties": {
                  "node_id": { "type": "string", "example": "bk-02" },
                  "chef_id": { "type": "string", "example": "chef_kenji_02" },
                  "sku": { "type": "string", "example": "kn-cod-01" },
                  "delta": { "type": "integer", "example": -1 },
                  "idempotency_key": { "type": "string", "format": "uuid" }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "State lock & Edge CDN purge trigger",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "sku": { "type": "string" },
                    "remaining_portions": { "type": "integer", "example": 13 },
                    "state": { "type": "string", "enum": ["IN_STOCK", "LOW_STOCK", "LOCKED_SOLD_OUT"] },
                    "cdn_surrogate_purged": { "type": "boolean", "example": true }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/v1/dispatch/batch": {
      "post": {
        "summary": "Multi-Chef Spatial Batch Consolidation",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "required": ["node_id", "window_close_iso", "orders"],
                "properties": {
                  "node_id": { "type": "string", "example": "bk-02" },
                  "window_close_iso": { "type": "string", "format": "date-time" },
                  "orders": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "order_id": { "type": "string" },
                        "chef_id": { "type": "string" },
                        "prep_complete_iso": { "type": "string", "format": "date-time" },
                        "dropoff_lat": { "type": "number" },
                        "dropoff_lon": { "type": "number" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Unified e-cargo route manifest",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "batch_id": { "type": "string", "example": "batch_bk02_1830" },
                    "courier_id": { "type": "string", "example": "ecargo_09" },
                    "consolidated_orders_count": { "type": "integer", "example": 4 },
                    "route_sequence": {
                      "type": "array",
                      "items": { "type": "string" }
                    },
                    "total_route_miles": { "type": "number", "example": 2.4 }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

```

---

### 4. Zero-Dependency Chef Hub Prototype (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CHEF KENJI SATO // NODE 02 // COMMUNITY.NYC</title>
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Chef Kenji Sato",
    "url": "https://kenji.community.nyc",
    "servesCuisine": "Japanese Washoku",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "412 Graham Ave, Station 03",
      "addressLocality": "Brooklyn",
      "addressRegion": "NY",
      "postalCode": "11211"
    }
  }
  </script>
  <style>
    :root {
      /* Fibonacci Spatial & Typographic Scale (px) */
      --f-1: 1px;
      --f-2: 2px;
      --f-3: 3px;
      --f-5: 5px;
      --f-8: 8px;
      --f-13: 13px;
      --f-21: 21px;
      --f-34: 34px;
      --f-55: 55px;
      --f-89: 89px;
      --bg: #FFFFFF;
      --fg: #000000;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: var(--bg);
      color: var(--fg);
      font-family: ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, monospace;
      font-size: var(--f-13);
      line-height: var(--f-21);
      padding: var(--f-21);
      max-width: 987px; /* Fibonacci F16 */
      margin: 0 auto;
    }

    header, section, footer {
      border: var(--f-1) solid var(--fg);
      margin-bottom: var(--f-21);
    }

    .bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--f-8) var(--f-13);
      border-bottom: var(--f-1) solid var(--fg);
      text-transform: uppercase;
      font-weight: 700;
    }

    .bar:last-child {
      border-bottom: none;
    }

    h1 {
      font-size: var(--f-34);
      line-height: 1.1;
      padding: var(--f-21) var(--f-13);
      letter-spacing: -0.03em;
      text-transform: uppercase;
    }

    .meta-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border-top: var(--f-1) solid var(--fg);
    }

    .meta-cell {
      padding: var(--f-13);
      border-right: var(--f-1) solid var(--fg);
    }

    .meta-cell:last-child {
      border-right: none;
    }

    .label {
      display: block;
      font-size: 11px;
      text-transform: uppercase;
      opacity: 0.7;
      margin-bottom: var(--f-3);
    }

    .menu-row {
      display: grid;
      grid-template-columns: 3fr 1fr 1fr;
      border-bottom: var(--f-1) solid var(--fg);
    }

    .menu-row:last-child {
      border-bottom: none;
    }

    .menu-info, .menu-stock, .menu-action {
      padding: var(--f-13);
      border-right: var(--f-1) solid var(--fg);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .menu-action {
      border-right: none;
      align-items: stretch;
    }

    .item-title {
      font-size: var(--f-21);
      font-weight: 700;
      margin-bottom: var(--f-5);
    }

    button {
      background: var(--fg);
      color: var(--bg);
      border: var(--f-1) solid var(--fg);
      padding: var(--f-13);
      font-family: inherit;
      font-size: var(--f-13);
      font-weight: 700;
      text-transform: uppercase;
      cursor: pointer;
    }

    button:hover:not(:disabled) {
      background: var(--bg);
      color: var(--fg);
    }

    button:disabled {
      background: var(--bg);
      color: var(--fg);
      opacity: 0.35;
      cursor: not-allowed;
      text-decoration: line-through;
    }

    .ledger {
      padding: var(--f-13);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--fg);
      color: var(--bg);
    }

    @media (max-width: 610px) { /* Fibonacci F15 */
      .meta-grid, .menu-row {
        grid-template-columns: 1fr;
      }
      .meta-cell, .menu-info, .menu-stock {
        border-right: none;
        border-bottom: var(--f-1) solid var(--fg);
      }
    }
  </style>
</head>
<body>

  <header>
    <div class="bar">
      <span>NODE: BK-02 // WILLIAMSBURG</span>
      <span>STATUS: BATCH 02 ACTIVE</span>
    </div>
    <h1>CHEF KENJI SATO</h1>
    <div class="meta-grid">
      <div class="meta-cell">
        <span class="label">Physical Station</span>
        412 Graham Ave, Window B
      </div>
      <div class="meta-cell">
        <span class="label">Dispatch Window</span>
        17:30 – 21:00 EST (1.5 MI RADIUS)
      </div>
      <div class="meta-cell">
        <span class="label">Sovereign Settlement</span>
        100% Direct to Chef // Zero Markup
      </div>
    </div>
  </header>

  <section aria-label="Production Menu">
    <div class="bar">
      <span>LIVE PRODUCTION TELEMETRY</span>
      <span>SYNC: FOOD API V1</span>
    </div>

    <div class="menu-row" data-sku="kn-cod-01" data-price="24.00">
      <div class="menu-info">
        <div class="item-title">Saikyo Miso Black Cod Bento</div>
        <p>72-hour fermented white miso sablefish, Koshihikari rice, pickled daikon, sesame spinach. [GF]</p>
      </div>
      <div class="menu-stock">
        <span class="label">Portions Left</span>
        <strong>14 / 40</strong>
      </div>
      <div class="menu-action">
        <button type="button" onclick="reserve('kn-cod-01', 24)">ORDER // $24</button>
      </div>
    </div>

    <div class="menu-row" data-sku="kn-sob-02" data-price="18.00">
      <div class="menu-info">
        <div class="item-title">Charred Maitake &amp; Dashi Soba</div>
        <p>100% buckwheat noodles, roasted Hudson Valley maitake, kombu-shiitake broth, scallions. [VG]</p>
      </div>
      <div class="menu-stock">
        <span class="label">Portions Left</span>
        <strong>22 / 35</strong>
      </div>
      <div class="menu-action">
        <button type="button" onclick="reserve('kn-sob-02', 18)">ORDER // $18</button>
      </div>
    </div>

    <div class="menu-row" data-sku="kn-pan-03" data-price="8.00">
      <div class="menu-info">
        <div class="item-title">Hojicha Panna Cotta</div>
        <p>Roasted Uji green tea cream, black sugar kuromitsu reduction, toasted kinako.</p>
      </div>
      <div class="menu-stock">
        <span class="label">Portions Left</span>
        <strong>0 / 20</strong>
      </div>
      <div class="menu-action">
        <button type="button" disabled>LOCKED // SOLD OUT</button>
      </div>
    </div>
  </section>

  <footer>
    <div class="ledger">
      <span id="cart-state">CART: 0 ITEMS // $0.00</span>
      <span>INFRASTRUCTURE: <a href="https://community.nyc" style="color:#FFF;">COMMUNITY.NYC</a></span>
    </div>
  </footer>

  <script>
    let count = 0;
    let total = 0;
    function reserve(sku, price) {
      count += 1;
      total += price;
      document.getElementById('cart-state').textContent =
        `CART: ${count} ITEM(S) // $${total.toFixed(2)} + $3.00 ECARGO BATCH (OR $0 PICKUP)`;
    }
  </script>
</body>
</html>

```

---

### 5. Closed-Loop Unit Economics Breakdown ($24.00 Menu Item)

Assumptions per single $24.00 order (30-order daily batch per chef station):

* **Ingredient COGS:** $6.80 (28.3%)
* **Compostable Packaging:** $0.95
* **Amortized Station Rent:** $1.40 ($42/day flat station fee ÷ 30 portions; 100% captured by Community real estate entity)

| Line Item | Legacy Marketplace (30% Commission) | Community (E-Cargo Batch Delivery) | Community (Street Window Pickup) |
| --- | --- | --- | --- |
| **Gross Menu Price (Diner Pays)** | **$24.00** (+ ~$6.50 diner fees = $30.50) | **$24.00** (+ $3.00 flat courier = $27.00) | **$24.00** ($0.00 delivery fee) |
| **Platform Commission (30%)** | -$7.20 | $0.00 | $0.00 |
| **Payment Processing Rail (2.9% + $0.30)** | Included in commission | -$1.00 | -$1.00 |
| **Food API Execution Fee (Flat)** | $0.00 | -$1.25 | -$1.25 |
| **Net Payout to Chef** | **$16.80** | **$21.75** | **$21.75** |
| **Less: Ingredient COGS** | -$6.80 | -$6.80 | -$6.80 |
| **Less: Packaging** | -$0.95 | -$0.95 | -$0.95 |
| **Less: Amortized Station Overhead** | -$2.50 (External commercial lease) | -$1.40 (Community Node Fee) | -$1.40 (Community Node Fee) |
| **Less: Paid CAC / Ad-Auction Spend** | -$2.40 (10% sponsored listing tax) | $0.00 (JSON-LD / `llms.txt` organic) | $0.00 (JSON-LD / `llms.txt` organic) |
| **Chef Net Operating Profit / Meal** | **$4.15 (17.3%)** | **$12.60 (52.5%)** | **$12.60 (52.5%)** |
| **Community Infrastructure Capture** | $0.00 | **$2.65** ($1.40 RE + $1.25 API) | **$2.65** ($1.40 RE + $1.25 API) |

```text
PROPAGATION (STATE 2) COMPLETE.
CHEF MARGIN DELTA: +203.6% ($4.15 -> $12.60 PER UNIT).
DINER FRICTION DELTA: -$3.50 TO -$6.50 PER ORDER.

```
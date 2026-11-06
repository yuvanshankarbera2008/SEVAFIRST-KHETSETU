/* ==========================================================================
   KhetSetu (खेत सेतु) — e-NAM Integration & Comparison Section (Section 18)
   "KhetSetu works with e-NAM, not against it"
   Comprehensive Government Platform Alignment, Mandi Logistics Synergy
   ========================================================================== */

import { DEMO_CONFIG } from '../config/demoData.js';

export function renderEnamSection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const stats = DEMO_CONFIG.enamStats;

  container.innerHTML = `
    <div class="container" style="padding-top: 40px; padding-bottom: 80px;">
      
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-eyebrow">NATIONAL AGRICULTURAL ECOSYSTEM</span>
        <h1 class="section-title">
          KhetSetu works with e-NAM, <span class="serif-italic">not against it.</span>
        </h1>
        <p class="section-subtitle">
          Bridging farm-gate aggregation and digital mandis. How KhetSetu complements the National Agriculture Market (e-NAM) to solve first-mile logistics.
        </p>
      </div>

      <!-- What e-NAM is (Section 18 Background) -->
      <div class="ks-card" style="padding: 32px; margin-bottom: 40px; background: #FFFFFF; border-left: 6px solid var(--ks-green-800);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
          <div>
            <span class="badge badge-pickup-verified" style="margin-bottom: 6px;">Government of India Platform</span>
            <h2 style="font-size: 1.5rem; color: var(--ks-green-950);">What is e-NAM?</h2>
          </div>
          <a href="${stats.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            Visit enam.gov.in ↗
          </a>
        </div>

        <p style="font-size: 1rem; color: var(--ks-text-secondary); line-height: 1.7; margin-bottom: 20px;">
          The <strong>National Agriculture Market (e-NAM)</strong> is a pan-India electronic trading portal launched by the Government of India in <strong>April 2016</strong>. It digitally links existing APMC (Agricultural Produce Market Committee) mandis into one unified online market, enabling transparent price discovery through online bidding and direct payments into farmers’ bank accounts. 
          The <strong>Small Farmers’ Agribusiness Consortium (SFAC)</strong> is the lead agency implementing e-NAM under the aegis of the Ministry of Agriculture and Farmers’ Welfare.
        </p>

        <!-- e-NAM Metrics Box (As of March 2026) -->
        <div style="background: var(--ks-cream-surface); border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-lg); padding: 20px;">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--ks-text-secondary); margin-bottom: 12px; text-transform: uppercase;">
            e-NAM Scale & Reach (Figures as of ${stats.asOfDate})*
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; text-align: center;">
            <div>
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--ks-green-900);">${stats.integratedMandis}</div>
              <div style="font-size: 0.8rem; color: var(--ks-text-secondary);">Integrated Mandis</div>
            </div>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--ks-green-900);">${stats.statesAndUTs}</div>
              <div style="font-size: 0.8rem; color: var(--ks-text-secondary);">States & UTs Covered</div>
            </div>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--ks-marigold);">${stats.registeredFarmers}</div>
              <div style="font-size: 0.8rem; color: var(--ks-text-secondary);">Registered Farmers</div>
            </div>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--ks-green-900);">${stats.registeredTraders}</div>
              <div style="font-size: 0.8rem; color: var(--ks-text-secondary);">Registered Traders</div>
            </div>
            <div>
              <div style="font-size: 1.6rem; font-weight: 800; color: var(--ks-green-900);">${stats.registeredFpos}</div>
              <div style="font-size: 0.8rem; color: var(--ks-text-secondary);">Registered FPOs</div>
            </div>
          </div>
          <div style="font-size: 0.72rem; color: var(--ks-text-tertiary); margin-top: 12px; text-align: right;">
            *Figures shown as of March 2026. Verify current live figures on enam.gov.in before operational deployment.
          </div>
        </div>
      </div>

      <!-- Core Differences Table (Section 18) -->
      <h3 style="font-size: 1.4rem; margin-bottom: 16px; color: var(--ks-green-950);">
        Key Differences at a Glance
      </h3>

      <div class="enam-table-wrapper">
        <table class="enam-table">
          <thead>
            <tr>
              <th style="width: 22%;">Dimension</th>
              <th style="width: 39%;">e-NAM (Government Mandi Platform)</th>
              <th style="width: 39%; background: var(--ks-green-100);">KhetSetu (Farm-to-Org Prototype)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>What it is</strong></td>
              <td>Government platform that digitally links existing APMC mandis</td>
              <td style="background: var(--ks-green-50);">Independent farm-to-organisation marketplace prototype</td>
            </tr>
            <tr>
              <td><strong>Where trade starts</strong></td>
              <td>At the mandi, an FPO collection centre, or a recognised warehouse</td>
              <td style="background: var(--ks-green-50);"><strong>At the farm gate</strong>, with pickup from the village</td>
            </tr>
            <tr>
              <td><strong>Who buys</strong></td>
              <td>Registered commission agents, traders, and buyers across mandis</td>
              <td style="background: var(--ks-green-50);"><strong>Verified organisations directly</strong> (supermarkets, hotels, hostels, restaurants, food processors, NGOs)</td>
            </tr>
            <tr>
              <td><strong>How price is set</strong></td>
              <td>Online bidding, auction, and price discovery at the mandi market</td>
              <td style="background: var(--ks-green-50);"><strong>Farmer sets the asking price</strong>; buyers choose quantity or make an offer</td>
            </tr>
            <tr>
              <td><strong>Quantity</strong></td>
              <td>Lots traded individually through the mandi system</td>
              <td style="background: var(--ks-green-50);">Small farm quantities pooled into larger verified lots; buyer chooses exact kg per farmer</td>
            </tr>
            <tr>
              <td><strong>Logistics</strong></td>
              <td>Produce is brought to the mandi or collection point by the farmer</td>
              <td style="background: var(--ks-green-50);"><strong>Shared pooled pickup</strong> from farms is an integrated part of the process</td>
            </tr>
            <tr>
              <td><strong>Quality</strong></td>
              <td>Assay lab assessment conducted after arrival at the mandi</td>
              <td style="background: var(--ks-green-50);">Farmer-declared TDS and grade, verified at the farm gate with photos and <strong>farmer approval</strong></td>
            </tr>
            <tr>
              <td><strong>Scale & Support</strong></td>
              <td>Pan-India national scale with centralized helpline and mandi staff</td>
              <td style="background: var(--ks-green-50);">Local cluster pilot (Warangal), 8 regional languages, on-ground coordinators, and FPO agents</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- How They Complement Each Other (Section 18) -->
      <h3 style="font-size: 1.4rem; margin: 40px 0 16px 0; color: var(--ks-green-950);">
        How KhetSetu and e-NAM Complement Each Other
      </h3>
      <p style="font-size: 0.95rem; color: var(--ks-text-secondary); margin-bottom: 24px;">
        <em>Note: Stated as design intent for prototype alignment, not an existing official government integration.</em>
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 48px;">
        <div class="ks-card" style="padding: 22px;">
          <div style="font-size: 1.5rem; margin-bottom: 10px;">🌉</div>
          <h4 style="font-size: 1.1rem; margin-bottom: 8px;">1. Farm-Gate Aggregation vs Mandi Trading</h4>
          <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.6;">
            e-NAM digitises the mandi transaction. KhetSetu handles the crucial first-mile farm gate: grouping small quantities from neighbouring farmers, arranging shared transport, and enabling direct institutional purchasing.
          </p>
        </div>

        <div class="ks-card" style="padding: 22px;">
          <div style="font-size: 1.5rem; margin-bottom: 10px;">🏛️</div>
          <h4 style="font-size: 1.1rem; margin-bottom: 8px;">2. FPO Centres as Shared Hubs</h4>
          <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.6;">
            Farmer Producer Organisation (FPO) collection centres can serve both systems: acting as e-NAM assaying/entry points and as KhetSetu pooled pickup points and coordinator help hubs.
          </p>
        </div>

        <div class="ks-card" style="padding: 22px;">
          <div style="font-size: 1.5rem; margin-bottom: 10px;">📲</div>
          <h4 style="font-size: 1.1rem; margin-bottom: 8px;">3. Dual Participation for Farmers</h4>
          <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.6;">
            Farmers already registered on e-NAM can use KhetSetu to receive bulk orders from verified hotels and supermarkets without forfeiting their existing mandi market access.
          </p>
        </div>

        <div class="ks-card" style="padding: 22px;">
          <div style="font-size: 1.5rem; margin-bottom: 10px;">🔄</div>
          <h4 style="font-size: 1.1rem; margin-bottom: 8px;">4. Mandi Fallback for Processing Lots</h4>
          <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.6;">
            Produce with no immediate direct institutional buyer, or Grade C surplus needing instant auction liquidation, can be seamlessly routed to a nearby e-NAM integrated mandi.
          </p>
        </div>

        <div class="ks-card" style="padding: 22px;">
          <div style="font-size: 1.5rem; margin-bottom: 10px;">📊</div>
          <h4 style="font-size: 1.1rem; margin-bottom: 8px;">5. Transparent Price Discovery Synergy</h4>
          <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.6;">
            Real-time e-NAM modal mandi prices can serve as a trusted regional reference benchmark when a farmer sets their independent asking price on KhetSetu.
          </p>
        </div>
      </div>

      <!-- Second Comparison Table: Digital Markets with Farm-level Logistics (Section 18) -->
      <h3 style="font-size: 1.4rem; margin-bottom: 16px; color: var(--ks-green-950);">
        Digital Markets are Stronger with Farm-Level Logistics
      </h3>

      <div class="enam-table-wrapper" style="margin-bottom: 32px;">
        <table class="enam-table">
          <thead>
            <tr>
              <th style="width: 50%;">Existing Online Mandi Market</th>
              <th style="width: 50%; background: var(--ks-green-100);">KhetSetu Architecture</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Farmers often sell individually, bearing solitary travel costs</td>
              <td style="background: var(--ks-green-50);">Nearby farmers sell through <strong>pooled shared lots</strong></td>
            </tr>
            <tr>
              <td>Produce movement to market remains a primary farmer headache</td>
              <td style="background: var(--ks-green-50);"><strong>Shared scheduled pickup</strong> is built directly into the process</td>
            </tr>
            <tr>
              <td>Quality details are often limited or declared post-dispatch</td>
              <td style="background: var(--ks-green-50);">Farmers declare TDS and grade, agents verify at farm gate, buyers review before buying</td>
            </tr>
            <tr>
              <td>Limited visibility of vehicle or produce after dispatch</td>
              <td style="background: var(--ks-green-50);"><strong>Live location and route tracking</strong> for farmer, agent, and buyer</td>
            </tr>
            <tr>
              <td>Digital platforms can be intimidating for low-literacy farmers</td>
              <td style="background: var(--ks-green-50);">Native regional languages + <strong>on-ground help</strong> from coordinators & FPOs</td>
            </tr>
            <tr>
              <td>Price discovery happens via auction bidding</td>
              <td style="background: var(--ks-green-50);"><strong>Farmers set their asking price</strong> and buyers can make offers</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Closing line and Mandatory Disclaimers (Section 18) -->
      <div style="background: var(--ks-green-900); color: #FFFFFF; padding: 28px 32px; border-radius: var(--ks-radius-xl); line-height: 1.7; margin-top: 36px;">
        <p style="font-size: 1.15rem; font-weight: 600; margin-bottom: 14px; color: var(--ks-marigold);">
          “KhetSetu works alongside e-NAM and existing mandi ecosystems by adding farm-level pooling, pickup quality verification, direct organisational buying, and shared logistics.”
        </p>
        <div style="font-size: 0.82rem; color: rgba(255, 255, 255, 0.7); border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 12px;">
          ⚖️ <strong>Legal & Institutional Disclaimer:</strong> KhetSetu is an independent prototype design and is not affiliated with, endorsed by, or sponsored by e-NAM, SFAC, or the Government of India. Official e-NAM portal can be accessed at <a href="https://enam.gov.in" target="_blank" style="color: var(--ks-marigold); text-decoration: underline;">enam.gov.in</a>.
        </div>
      </div>

    </div>
  `;
}


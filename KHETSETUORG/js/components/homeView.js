/* ==========================================================================
   KhetSetu (खेत सेतु) — Home Overview View (Sections 4, 16, 17, 21)
   Scannable <30s overview, Hero, Bridge SVG, 6-Step How It Works,
   Problem & Solution, Count-Up Stats, Interactive Product Preview, 11 Features, Footer
   ========================================================================== */

import { DEMO_CONFIG } from '../config/demoData.js';
import { store } from '../state/store.js';
import { t } from '../i18n/translations.js';
import { initCountUps, initScrollReveals } from './motion.js';
import { renderFirstTimeLangModal } from './langModal.js';
import { openAssistanceBottomSheet } from './assistanceModal.js';

export function renderHomeView(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const stockSnapshot = DEMO_CONFIG.stockListings.slice(0, 3);
  const metrics = DEMO_CONFIG.platformMetrics;

  container.innerHTML = `
    <!-- 1. Hero Section (Section 4) -->
    <section class="hero-section" id="hero">
      <div class="container">
        <div class="hero-grid">
          
          <!-- Hero Text & CTAs -->
          <div>
            <div class="hero-eyebrow">
              <span>🌾</span>
              <span>${t('from_soil_to_shelf')}</span>
            </div>

            <h1 class="hero-headline">
              ${t('hero_headline_1')} <span class="serif-italic">${t('hero_headline_2')}</span>
            </h1>

            <p class="hero-subtext">
              ${t('hero_subtext')}
            </p>

            <div class="hero-ctas">
              <button class="btn btn-primary btn-lg" id="heroFarmerCta">
                <span>👨‍🌾</span>
                <span>${t('cta_farmer')}</span>
              </button>
              <button class="btn btn-secondary btn-lg" id="heroBuyerCta">
                <span>🏢</span>
                <span>${t('cta_buyer')}</span>
              </button>
              <button class="btn btn-outline btn-lg" id="heroBrowseCta">
                <span>🔍</span>
                <span>${t('cta_browse')}</span>
              </button>
            </div>

            <div class="hero-sublinks">
              <a href="#" id="heroPickupLink">I’m a pickup agent →</a>
              <a href="#" id="heroHelpLink">Need help? Ask for assistance 🤝</a>
            </div>

            <!-- Trust Strip (Section 4) -->
            <div class="trust-strip">
              <div class="avatar-stack">
                <div class="avatar-circle c1">L</div>
                <div class="avatar-circle c2">N</div>
                <div class="avatar-circle c3">M</div>
                <div class="avatar-circle c4">K</div>
                <div class="avatar-circle c5">R</div>
                <div class="avatar-circle c6">T</div>
              </div>
              <div class="trust-text">
                <strong>1,240+ farmers</strong> already growing with institutional demand in Telangana.
              </div>
            </div>
          </div>

          <!-- Hero Visual with Self-Drawing Bridge Motif & Floating Cards (Section 2 & 4) -->
          <div class="hero-visual-wrapper">
            
            <!-- Animated SVG Bridge Motif (Setu means Bridge) -->
            <svg class="bridge-svg-canvas" viewBox="0 0 500 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#143522"/>
                  <stop offset="50%" stop-color="#2D6F47"/>
                  <stop offset="100%" stop-color="#E58E26"/>
                </linearGradient>
                <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#EFE8DC" />
                  <stop offset="100%" stop-color="#E2DBD0" />
                </linearGradient>
              </defs>

              <!-- Rural River Bed & Village Contours -->
              <path d="M 0,260 Q 140,240 250,260 T 500,250 L 500,360 L 0,360 Z" fill="url(#groundGrad)" />
              <path d="M 0,300 Q 150,290 260,310 T 500,300" stroke="#C4D7C2" stroke-width="12" fill="none" stroke-linecap="round" />

              <!-- Main Self-Drawing Bridge Arch (Section 2) -->
              <path class="bridge-arch" d="M 50,270 C 130,120 370,120 450,270" stroke="url(#bridgeGrad)" stroke-width="8" stroke-linecap="round" fill="none"/>
              <path class="bridge-arch" d="M 30,280 L 470,280" stroke="#1B442B" stroke-width="6" stroke-linecap="round"/>

              <!-- Bridge Vertical Cables -->
              <line x1="120" y1="280" x2="120" y2="200" stroke="#2D6F47" stroke-width="2.5" stroke-dasharray="4 3" />
              <line x1="180" y1="280" x2="180" y2="155" stroke="#2D6F47" stroke-width="2.5" stroke-dasharray="4 3" />
              <line x1="250" y1="280" x2="250" y2="140" stroke="#E58E26" stroke-width="3" stroke-dasharray="4 3" />
              <line x1="320" y1="280" x2="320" y2="155" stroke="#2D6F47" stroke-width="2.5" stroke-dasharray="4 3" />
              <line x1="380" y1="280" x2="380" y2="200" stroke="#2D6F47" stroke-width="2.5" stroke-dasharray="4 3" />

              <!-- Sun rising over farm fields -->
              <circle cx="250" cy="110" r="26" fill="#FCE8CE" />
              <circle cx="250" cy="110" r="16" fill="#E58E26" />
            </svg>

            <!-- 5 Floating Hero Cards (Section 4) -->
            <div class="hero-card hero-card-1">
              <span style="font-size: 1.4rem;">📈</span>
              <div>
                <strong style="color: var(--ks-green-950); display:block; font-size: 0.76rem; letter-spacing:0.04em;">DEMAND NEAR WARANGAL</strong>
                <span style="font-size: 0.8rem; color: var(--ks-text-secondary);">Tomato demand is up 18% · 3 verified buyers</span>
              </div>
            </div>

            <div class="hero-card hero-card-2">
              <span style="font-size: 1.4rem;">✓</span>
              <div>
                <strong style="color: var(--ks-green-800); display:block; font-size: 0.76rem; letter-spacing:0.04em;">PICKUP VERIFIED</strong>
                <span style="font-size: 0.8rem; color: var(--ks-text-secondary);">Tomatoes from 8 farmers · 600 kg · ₹26/kg</span>
              </div>
            </div>

            <div class="hero-card hero-card-3">
              <span style="font-size: 1.4rem;">💧</span>
              <div>
                <strong style="color: #2980B9; display:block; font-size: 0.76rem; letter-spacing:0.04em;">QUALITY DECLARED</strong>
                <span style="font-size: 0.8rem; color: var(--ks-text-secondary);">TDS 140 ppm · Harvested today</span>
              </div>
            </div>

            <div class="hero-card hero-card-4">
              <span class="pulse-dot"></span>
              <div>
                <strong style="color: var(--ks-status-live); display:block; font-size: 0.76rem; letter-spacing:0.04em;">LIVE PICKUP</strong>
                <span style="font-size: 0.8rem; color: var(--ks-text-secondary);">Vehicle 4 km away · Arriving in 12 min</span>
              </div>
            </div>

            <div class="hero-card hero-card-5">
              <span style="font-size: 1.4rem;">🤝</span>
              <div>
                <strong style="color: var(--ks-saffron); display:block; font-size: 0.76rem; letter-spacing:0.04em;">HELP NEARBY</strong>
                <span style="font-size: 0.8rem; color: var(--ks-text-secondary);">Local coordinator Lakshmi is 3 km away</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- 2. Platform At A Glance (Section 4) -->
    <section style="padding: 60px 0; background: #FFFFFF; border-top: 1px solid var(--ks-cream-border); border-bottom: 1px solid var(--ks-cream-border);">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">BUILT FOR BHARAT</span>
          <h2 class="section-title">A Unified Ecosystem for Rural India</h2>
          <p class="section-subtitle">Connecting fragmented smallholders to bulk institutional demand with dignity, language comfort, and transparency.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          <!-- Farmer Card -->
          <div class="ks-card">
            <div style="font-size: 2.2rem; margin-bottom: 14px;">👨‍🌾</div>
            <h3 style="font-size: 1.3rem; margin-bottom: 8px;">For Farmers</h3>
            <p style="font-size: 0.9rem; color: var(--ks-text-secondary); line-height: 1.6; margin-bottom: 18px;">
              List what you have. Set your own asking price. Neighboring harvests are grouped for shared village pickup, saving you travel hassles and transport fees.
            </p>
            <a href="#" class="text-forest" style="font-weight: 700; font-size: 0.9rem;" id="learnMoreFarmerBtn">Learn more for farmers →</a>
          </div>

          <!-- Buyer Card -->
          <div class="ks-card">
            <div style="font-size: 2.2rem; margin-bottom: 14px;">🏢</div>
            <h3 style="font-size: 1.3rem; margin-bottom: 8px;">For Buyers</h3>
            <p style="font-size: 0.9rem; color: var(--ks-text-secondary); line-height: 1.6; margin-bottom: 18px;">
              Supermarkets, hotels, and canteens procure verified bulk volume with documented water TDS, freshness, and photo audits at single clustered dispatch.
            </p>
            <a href="#" class="text-forest" style="font-weight: 700; font-size: 0.9rem;" id="learnMoreBuyerBtn">Learn more for buyers →</a>
          </div>

          <!-- Pickup Agents & Helpers Card -->
          <div class="ks-card">
            <div style="font-size: 2.2rem; margin-bottom: 14px;">🤝</div>
            <h3 style="font-size: 1.3rem; margin-bottom: 8px;">For Pickup Agents & Helpers</h3>
            <p style="font-size: 0.9rem; color: var(--ks-text-secondary); line-height: 1.6; margin-bottom: 18px;">
              Local coordinators, FPOs, and village agents provide on-ground digital assistance, weighbridge checks, and transparent mobile quality audits.
            </p>
            <a href="#" class="text-forest" style="font-weight: 700; font-size: 0.9rem;" id="learnMorePickupBtn">Learn more for helpers →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Live Marketplace Snapshot (Section 4) -->
    <section style="padding: 70px 0; background: var(--ks-cream-bg);">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 36px; flex-wrap: wrap; gap: 16px;">
          <div>
            <span class="section-eyebrow">LIVE HARVEST SNAPSHOT</span>
            <h2 class="section-title" style="margin-bottom: 6px;">Available Right Now in Warangal</h2>
            <p style="color: var(--ks-text-secondary); font-size: 0.95rem;">Direct farmer prices. Quantities update dynamically on orders.</p>
          </div>
          <button class="btn btn-primary btn-lg" id="viewAllStockBtn">
            View All Stock (మార్కెట్ చూడండి) →
          </button>
        </div>

        <div class="market-grid">
          ${stockSnapshot.map(item => `
            <div class="stock-card">
              <div style="position: relative;">
                <img src="${item.image}" alt="${item.crop}" class="crop-card-img">
                <span class="badge badge-farmer-declared" style="position: absolute; top: 12px; left: 12px;">
                  Farmer-declared
                </span>
                <span style="position: absolute; bottom: 12px; right: 12px; background: rgba(13,35,22,0.85); color: #fff; padding: 4px 10px; border-radius: var(--ks-radius-full); font-size: 0.8rem; font-weight: 600;">
                  📍 ${item.farmerVillage}
                </span>
              </div>
              <div class="stock-card-body">
                <div style="display: flex; justify-content: space-between;">
                  <div>
                    <h3 style="font-size: 1.25rem;">${item.crop}</h3>
                    <div style="font-size: 0.85rem; color: var(--ks-text-secondary);">${item.variety}</div>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-size: 1.5rem; font-weight: 800; color: var(--ks-green-900);">₹${item.pricePerKg}</div>
                    <div style="font-size: 0.75rem; color: var(--ks-text-tertiary);">asking / kg</div>
                  </div>
                </div>

                <!-- Animated Quantity Bar -->
                <div class="qty-bar-container">
                  <div class="qty-bar">
                    <div class="qty-bar-part qty-bar-sold" style="width: ${(item.soldKg / item.totalKg) * 100}%;"></div>
                    <div class="qty-bar-part qty-bar-reserved" style="width: ${(item.reservedKg / item.totalKg) * 100}%;"></div>
                    <div class="qty-bar-part qty-bar-available" style="width: ${(item.availableKg / item.totalKg) * 100}%;"></div>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
                    <span style="color: var(--ks-green-700); font-weight: 700;">${item.availableKg} kg available</span>
                    <span style="color: var(--ks-text-secondary);">${item.totalKg} kg total</span>
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; color: var(--ks-text-secondary); background: var(--ks-cream-surface); padding: 8px 12px; border-radius: var(--ks-radius-md);">
                  <span>💧 TDS: <strong>${item.tdsPpm} ppm</strong></span>
                  <span>🏆 Grade: <strong>${item.expectedGrade}</strong></span>
                  <span>📦 Min: <strong>${item.minOrderKg} kg</strong></span>
                </div>

                <button class="btn btn-outline" data-goto-view="marketplace" style="width: 100%; margin-top: 6px;">
                  Select Quantity →
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 4. How It Works (6 Animated Steps) (Section 4) -->
    <section class="reveal-on-scroll" id="howItWorks" style="padding: 80px 0; background: #FFFFFF;">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">TRANSPARENT LIFECYCLE</span>
          <h2 class="section-title">How KhetSetu Works in 6 Simple Steps</h2>
          <p class="section-subtitle">
            Every step is designed for high mutual trust, rural language comfort, and guaranteed pricing freedom.
          </p>
        </div>

        <div class="how-it-works-grid">
          
          <div class="step-card">
            <span class="step-number">1</span>
            <div class="step-icon-wrap">📝</div>
            <h4 class="step-card-title">List stock</h4>
            <p class="step-card-desc">Farmer sets crop, quantity, quality declarations, and their own non-negotiable asking price.</p>
          </div>

          <div class="step-card">
            <span class="step-number">2</span>
            <div class="step-icon-wrap">🛒</div>
            <h4 class="step-card-title">Buyer chooses quantity</h4>
            <p class="step-card-desc">Institutional buyer picks the exact kg required. Stock is immediately held so no double-booking occurs.</p>
          </div>

          <div class="step-card">
            <span class="step-number">3</span>
            <div class="step-icon-wrap">👍</div>
            <h4 class="step-card-title">Farmer approves</h4>
            <p class="step-card-desc">Farmer accepts request in mobile inbox. Stock moves from held to committed route.</p>
          </div>

          <div class="step-card">
            <span class="step-number">4</span>
            <div class="step-icon-wrap">🚚</div>
            <h4 class="step-card-title">Shared pickup</h4>
            <p class="step-card-desc">One shared vehicle follows an optimized route across nearby village farms, slashing logistics cost.</p>
          </div>

          <div class="step-card">
            <span class="step-number">5</span>
            <div class="step-icon-wrap">🔍</div>
            <h4 class="step-card-title">Quality check & approval</h4>
            <p class="step-card-desc">Agent inspects weight & grades at farm gate with photos. Farmer must tap to approve before confirmation.</p>
          </div>

          <div class="step-card">
            <span class="step-number">6</span>
            <div class="step-icon-wrap">💰</div>
            <h4 class="step-card-title">Delivery and payment</h4>
            <p class="step-card-desc">Consolidated lot delivered to buyer hub. Direct digital payment credited to farmer account.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- 5. Problem & Solution Visual with Bridge Motif (Section 4) -->
    <section class="reveal-on-scroll" style="padding: 70px 0; background: var(--ks-cream-bg);">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">BRIDGING THE GAP ("SETU")</span>
          <h2 class="section-title">From Scattered Harvests to Confident Sales</h2>
          <p class="section-subtitle">
            Replacing middlemen margins and individual transport expenses with pooled community logistics.
          </p>
        </div>

        <div class="before-after-grid">
          <!-- Before Card -->
          <div class="problem-card">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
              <span style="font-size: 1.5rem;">❌</span>
              <h3 style="font-size: 1.35rem; color: var(--ks-terracotta);">The Mandi Problem (Before)</h3>
            </div>
            <ul class="comparison-list">
              <li class="comparison-item">
                <span class="comp-icon-bad">✕</span>
                <span>Small farmers sell individually with low bargaining leverage</span>
              </li>
              <li class="comparison-item">
                <span class="comp-icon-bad">✕</span>
                <span>Forced travel to distant mandis or distress sales to local middlemen</span>
              </li>
              <li class="comparison-item">
                <span class="comp-icon-bad">✕</span>
                <span>Buyers cannot reliably source direct farm produce with known water TDS</span>
              </li>
              <li class="comparison-item">
                <span class="comp-icon-bad">✕</span>
                <span>High post-harvest vegetable spoilage while waiting for transport</span>
              </li>
              <li class="comparison-item">
                <span class="comp-icon-bad">✕</span>
                <span>Farmers new to digital apps are left behind without local help</span>
              </li>
            </ul>
          </div>

          <!-- Solution Card -->
          <div class="solution-card">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 14px;">
              <span style="font-size: 1.5rem;">✅</span>
              <h3 style="font-size: 1.35rem; color: var(--ks-green-800);">With KhetSetu (खेत सेतु)</h3>
            </div>
            <ul class="comparison-list">
              <li class="comparison-item">
                <span class="comp-icon-good">✓</span>
                <span>Nearby farmers pool produce into bulk lots while keeping individual price control</span>
              </li>
              <li class="comparison-item">
                <span class="comp-icon-good">✓</span>
                <span>One shared vehicle collects from several village farms directly at the gate</span>
              </li>
              <li class="comparison-item">
                <span class="comp-icon-good">✓</span>
                <span>Quality is verified at pickup with photo records, and <strong>farmers approve results</strong></span>
              </li>
              <li class="comparison-item">
                <span class="comp-icon-good">✓</span>
                <span>Farmers use their native language with on-ground local coordinator & FPO visits</span>
              </li>
              <li class="comparison-item">
                <span class="comp-icon-good">✓</span>
                <span>Direct, transparent bank payments with live route tracking for everyone</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Platform Numbers Count-Up (Section 4) -->
    <section class="container">
      <div class="stats-strip">
        <div class="stats-grid">
          <div class="stat-item">
            <h3 data-count-to="${metrics.activeFarmers}" data-suffix="+">1,240+</h3>
            <p>Active Farmers Registered</p>
          </div>
          <div class="stat-item">
            <h3 data-count-to="${metrics.verifiedBuyers}" data-suffix="">85</h3>
            <p>Verified Institutional Buyers</p>
          </div>
          <div class="stat-item">
            <h3 data-count-to="${metrics.villagesCovered}" data-suffix="">12</h3>
            <p>Villages Clustered in Pilot</p>
          </div>
          <div class="stat-item">
            <h3 data-count-to="${metrics.tonnesTraded}" data-suffix=" Tonnes">38 Tonnes</h3>
            <p>Farm Produce Traded</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Interactive Product Preview Tabbed Section (Section 16) -->
    <section class="reveal-on-scroll" style="padding: 70px 0; background: #FFFFFF;">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">INTERACTIVE PROTOTYPE PREVIEW</span>
          <h2 class="section-title">Experience KhetSetu from Every Perspective</h2>
          <p class="section-subtitle">Click the tabs below to preview how farmers, buyers, pickup agents, and coordinators interact in real-time.</p>
        </div>

        <!-- 4-Perspective Tabs (Section 16) -->
        <div style="display: flex; justify-content: center; gap: 8px; margin-bottom: 32px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm preview-tab-btn active" data-preview-role="farmer">👨‍🌾 Farmer View</button>
          <button class="btn btn-secondary btn-sm preview-tab-btn" data-preview-role="buyer">🏢 Buyer View</button>
          <button class="btn btn-secondary btn-sm preview-tab-btn" data-preview-role="pickup">🚚 Pickup Agent View</button>
          <button class="btn btn-secondary btn-sm preview-tab-btn" data-preview-role="coordinator">🤝 Coordinator View</button>
        </div>

        <!-- Tab Content Card -->
        <div class="ks-card" id="previewCardBody" style="padding: 32px; background: var(--ks-cream-surface); border: 2px solid var(--ks-green-200);">
          <!-- Populated by JavaScript switch -->
        </div>

      </div>
    </section>

    <!-- 8. Key Features Section (11 Cards) (Section 17) -->
    <section class="reveal-on-scroll" style="padding: 80px 0; background: var(--ks-cream-bg);">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">KEY CAPABILITIES</span>
          <h2 class="section-title">Built for Bharat: 11 Core Pillars</h2>
          <p class="section-subtitle">Designed specifically for the realities of rural Indian agriculture.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
          
          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">🏷️</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">1. Farmer-led pricing</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">Only the farmer sets and edits the asking price. Buyers cannot unilaterally modify it.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">🗣️</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">2. Your language, your way</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">8 Indian languages in native scripts: Telugu, Hindi, Tamil, Marathi, Bengali, Kannada, Gujarati, English.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">👋</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">3. Ask for assistance</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">One-tap regional connection with nearby coordinators, FPOs, and collection agents for phone or village help.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">⚖️</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">4. Quantity choice per farmer</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">Buyers choose exact kg with synced stepper and slider respecting the farmer’s minimum batch size.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">💧</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">5. Farmer-declared quality</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">Irrigation water TDS, farming methods, harvest date, and shelf life declared transparently upfront.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">🚚</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">6. Pooled and shared pickup</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">Neighbouring farmers are grouped into a single transport run, saving up to ₹1,850 per cluster trip.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">🔍</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">7. Pickup quality verification</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">Collection agents verify weight and grade split (A/B/C) with digital photos right at the farm gate.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">🛡️</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">8. Farmer approval before change</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">Any alteration in verified quantity or grade must be approved by the farmer before the sale is final.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">📍</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">9. Live location tracking</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">Real-time animated map shows vehicle progress, farm waypoints, and precise arrival countdowns.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">🏢</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">10. Direct institutional buyers</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">Verified supermarkets, hotels, hostels, and food processors buying directly from source.</p>
          </div>

          <div class="ks-card" style="padding: 22px;">
            <div style="font-size: 1.8rem; margin-bottom: 10px;">💳</div>
            <h4 style="font-size: 1.1rem; margin-bottom: 6px;">11. Transparent payment split</h4>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.5;">Each farmer in a pooled lot sees their own verified quantity, agreed price, and direct bank settlement.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- 9. KhetSetu & e-NAM Teaser Summary Card (Section 4 & 18) -->
    <section class="container" style="margin-bottom: 80px;">
      <div class="ks-card" style="background: linear-gradient(135deg, var(--ks-green-950), var(--ks-green-900)); color: #fff; padding: 36px 40px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
        <div style="max-width: 640px;">
          <span class="badge badge-pickup-verified" style="background: rgba(255,255,255,0.15); color: #fff; border:none; margin-bottom: 8px;">
            POLICY & ECOSYSTEM SYNERGY
          </span>
          <h3 style="font-size: 1.6rem; color: #fff; margin-bottom: 8px;">
            KhetSetu works with e-NAM, not against it.
          </h3>
          <p style="color: rgba(255,255,255,0.8); font-size: 0.95rem; line-height: 1.6;">
            While e-NAM digitises mandi trading across 1,656 markets, KhetSetu solves the farm-gate first mile: farm-level pooling, pickup quality verification, and direct institutional sales.
          </p>
        </div>
        <button class="btn btn-accent btn-lg" id="goToEnamSectionBtn" style="white-space: nowrap;">
          Read Full e-NAM Analysis & Differences →
        </button>
      </div>
    </section>

    <!-- 10. Footer (Section 21) -->
    <footer class="ks-footer">
      <div class="container">
        <div class="footer-grid">
          
          <!-- Col 1: Brand Info -->
          <div class="footer-col">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
              <div style="width: 36px; height: 36px; background: var(--ks-green-800); border-radius: var(--ks-radius-md); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800;">
                🌾
              </div>
              <div>
                <strong style="color: #fff; font-size: 1.25rem;">KhetSetu</strong>
                <span style="color: var(--ks-marigold); font-size: 0.85rem; margin-left: 4px;">खेत सेतु</span>
              </div>
            </div>
            <p style="font-size: 0.88rem; line-height: 1.6; color: rgba(255,255,255,0.7); margin-bottom: 16px;">
              Direct connections. Better decisions. Fairer markets. Built for Bharat.
            </p>
            <div style="font-size: 0.8rem; color: var(--ks-marigold);">
              Piloting in Warangal, Geesugonda & Nekkonda, Telangana.
            </div>
          </div>

          <!-- Col 2: Solutions -->
          <div class="footer-col">
            <h4>Platform Solutions</h4>
            <ul class="footer-links">
              <li><a href="#" data-goto-role="farmer" data-goto-view="farmer">Farmer Onboarding (రైతు నమోదు)</a></li>
              <li><a href="#" data-goto-role="buyer" data-goto-view="buyer">Buyer Institutional Procurement</a></li>
              <li><a href="#" data-goto-role="pickup" data-goto-view="pickup">Pickup Agent Quality Verification</a></li>
              <li><a href="#" data-goto-role="coordinator" data-goto-view="coordinator">Coordinator & FPO Desk</a></li>
              <li><a href="#" data-goto-view="marketplace">Live Produce Marketplace</a></li>
            </ul>
          </div>

          <!-- Col 3: Ecosystem -->
          <div class="footer-col">
            <h4>Ecosystem & Policy</h4>
            <ul class="footer-links">
              <li><a href="#" data-goto-view="enam">KhetSetu & e-NAM Comparison</a></li>
              <li><a href="https://enam.gov.in" target="_blank" rel="noopener noreferrer">e-NAM Portal (enam.gov.in) ↗</a></li>
              <li><a href="#" data-footer-info="schemes">Government Schemes Alignment</a></li>
              <li><a href="#" data-footer-info="fpo">FPO Aggregation Guidelines</a></li>
            </ul>
          </div>

          <!-- Col 4: Help & Languages -->
          <div class="footer-col">
            <h4>Help & Contact</h4>
            <ul class="footer-links">
              <li><a href="#" data-footer-action="assistance">Need Help? Ask for Assistance</a></li>
              <li><a href="#" data-footer-action="langModal">Switch Language (8 Regional Scripts)</a></li>
              <li><a href="#" data-goto-view="login">Demo Accounts Sign In</a></li>
              <li><span style="font-size: 0.85rem; color: rgba(255,255,255,0.5);">Toll-Free Helpline: 1800-KHET-SETU</span></li>
            </ul>
          </div>

        </div>

        <!-- Footer Bottom Legal Disclaimer (Section 21) -->
        <div class="footer-bottom">
          <div>
            © 2026 KhetSetu (खेत सेतु). Built for Bharat.
          </div>
          <div>
            <strong>Disclaimer:</strong> Demo prototype • All names, prices, locations, quality values, and transactions are sample data for the Warangal cluster pilot. Do not enter real Aadhaar or banking details. KhetSetu is an independent prototype and is not officially affiliated with e-NAM or SFAC.
          </div>
        </div>

      </div>
    </footer>
  `;

  // Attach Home Page Actions
  document.getElementById('heroFarmerCta')?.addEventListener('click', () => {
    // Section 5: First-time picker when farmer first taps "I grow produce"
    const { hasChosenLanguageFirstTime } = store.getState();
    if (!hasChosenLanguageFirstTime) {
      renderFirstTimeLangModal(() => {
        store.setState({ activeRole: 'farmer', currentView: 'farmer' });
      });
    } else {
      store.setState({ activeRole: 'farmer', currentView: 'farmer' });
    }
  });

  document.getElementById('heroBuyerCta')?.addEventListener('click', () => {
    store.setState({ activeRole: 'buyer', currentView: 'buyer' });
  });

  document.getElementById('heroBrowseCta')?.addEventListener('click', () => {
    store.setState({ currentView: 'marketplace' });
  });

  document.getElementById('viewAllStockBtn')?.addEventListener('click', () => {
    store.setState({ currentView: 'marketplace' });
  });

  document.getElementById('heroPickupLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setState({ activeRole: 'pickup', currentView: 'pickup' });
  });

  document.getElementById('heroHelpLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAssistanceBottomSheet();
  });

  document.getElementById('learnMoreFarmerBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setState({ activeRole: 'farmer', currentView: 'farmer' });
  });

  document.getElementById('learnMoreBuyerBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setState({ activeRole: 'buyer', currentView: 'buyer' });
  });

  document.getElementById('learnMorePickupBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setState({ activeRole: 'pickup', currentView: 'pickup' });
  });

  document.getElementById('goToEnamSectionBtn')?.addEventListener('click', () => {
    store.setState({ currentView: 'enam' });
  });

  // Handle data-goto-view & footer actions (delegated)
  container.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-goto-view], [data-footer-action], [data-footer-info]');
    if (!targetLink) return;

    const view = targetLink.getAttribute('data-goto-view');
    const role = targetLink.getAttribute('data-goto-role');
    const action = targetLink.getAttribute('data-footer-action');
    const info = targetLink.getAttribute('data-footer-info');

    if (view) {
      e.preventDefault();
      const partial = { currentView: view };
      if (role) partial.activeRole = role;
      store.setState(partial);
      return;
    }

    if (action === 'assistance') {
      e.preventDefault();
      openAssistanceBottomSheet();
      return;
    }

    if (action === 'langModal') {
      e.preventDefault();
      store.setState({ isLangModalOpen: true });
      return;
    }

    if (info === 'schemes') {
      e.preventDefault();
      alert('PM-KISAN and Rythu Bharosa verification enabled for demo.');
      return;
    }

    if (info === 'fpo') {
      e.preventDefault();
      alert('Digital Green & FPO aggregation standards adopted.');
      return;
    }
  });

  // Setup Product Preview Interactive Switcher (Section 16)
  setupProductPreviewTabs();

  // Initialize Motion reveals & Count Ups (Section 2)
  initScrollReveals();
  initCountUps();
}

/**
 * Product Preview Tabbed Switcher (Section 16)
 */
function setupProductPreviewTabs() {
  const previewBody = document.getElementById('previewCardBody');
  if (!previewBody) return;

  function renderPreview(role) {
    if (role === 'farmer') {
      previewBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
          <div>
            <span class="badge badge-farmer-declared" style="margin-bottom: 8px;">Farmer Perspective · Ravi Kumar</span>
            <h3 style="font-size: 1.4rem; margin-bottom: 12px; color: var(--ks-green-950);">My Harvest: Tomatoes (Vaishnavi)</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; line-height: 1.6;">
              <div>📦 <strong>Quantity:</strong> 85 kg (65 kg available · 20 kg reserved)</div>
              <div>💰 <strong>My asking price:</strong> ₹25 / kg (Farmer decided)</div>
              <div>💧 <strong>Quality entered:</strong> TDS 140 ppm · Expected Grade A · Harvested today</div>
              <div>🤝 <strong>Nearby pooled lot:</strong> 600 kg from 8 neighboring farmers</div>
              <div>🚚 <strong>Pickup schedule:</strong> Tomorrow, 8:30 AM</div>
              <div>🏢 <strong>Buyer interest:</strong> 3 verified organisations</div>
              <div>💵 <strong>Estimated earnings:</strong> <span style="font-size: 1.2rem; font-weight: 800; color: var(--ks-marigold);">₹2,125</span></div>
            </div>
            <button class="btn btn-primary" data-goto-role="farmer" data-goto-view="farmer" style="margin-top: 18px;">
              Open Full Farmer Dashboard →
            </button>
          </div>
          <div style="background: #fff; padding: 18px; border-radius: var(--ks-radius-xl); border: 1px solid var(--ks-cream-border); box-shadow: var(--ks-shadow-sm);">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--ks-green-900); margin-bottom: 8px;">LIVE ROUTE PREVIEW</div>
            <div style="height: 180px; background: #eaf1e7; border-radius: var(--ks-radius-md); display: flex; align-items: center; justify-content: center; position: relative;">
              <span class="pulse-dot"></span>
              <span style="font-size: 0.85rem; font-weight: 700; color: var(--ks-green-950); margin-left: 8px;">Vehicle TS-03-AG-8821 en route (Stop 1: Geesugonda)</span>
            </div>
            <div style="font-size: 0.78rem; color: var(--ks-text-secondary); margin-top: 8px;">
              Language: Telugu (తెలుగు) · Assistance button active on screen
            </div>
          </div>
        </div>
      `;
    } else if (role === 'buyer') {
      previewBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
          <div>
            <span class="badge badge-pickup-verified" style="margin-bottom: 8px;">Buyer Perspective · FreshKart Retail</span>
            <h3 style="font-size: 1.4rem; margin-bottom: 12px; color: var(--ks-green-950);">Procurement Cart & Verified Lots</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; line-height: 1.6;">
              <div>🍅 <strong>Line 1:</strong> 40 kg Tomatoes from Ravi Kumar @ ₹25 = ₹1,000</div>
              <div>🌶️ <strong>Line 2:</strong> 20 kg Green Chilli from Lakshmi @ ₹48 = ₹960</div>
              <div>💵 <strong>Order Grand Total:</strong> <span style="font-size: 1.2rem; font-weight: 800; color: var(--ks-green-900);">₹1,960</span></div>
              <div>💧 <strong>Quality Guarantee:</strong> TDS verified, Photo proof of pickup attached</div>
              <div>🚚 <strong>Consolidated Delivery:</strong> 1 pooled vehicle delivery to Hanamkonda Hub</div>
            </div>
            <button class="btn btn-primary" data-goto-role="buyer" data-goto-view="buyer" style="margin-top: 18px;">
              Open Full Marketplace & Cart →
            </button>
          </div>
          <div style="background: #fff; padding: 20px; border-radius: var(--ks-radius-xl); border: 1px solid var(--ks-cream-border);">
            <div style="font-weight: 700; margin-bottom: 10px;">Synced Stepper & Slider Selector:</div>
            <div style="background: var(--ks-cream-surface); padding: 12px; border-radius: var(--ks-radius-md);">
              <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.1rem;">
                <span>Selected: 40 kg</span>
                <span>₹1,000</span>
              </div>
              <input type="range" value="40" min="10" max="65" style="width: 100%; accent-color: var(--ks-green-700); margin: 10px 0;">
              <div style="font-size: 0.75rem; color: var(--ks-text-secondary);">Quick chips: [Min 10kg] [25%] [50%] [All 65kg]</div>
            </div>
          </div>
        </div>
      `;
    } else if (role === 'pickup') {
      previewBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
          <div>
            <span class="badge badge-live" style="margin-bottom: 8px;">Pickup Agent · Suresh</span>
            <h3 style="font-size: 1.4rem; margin-bottom: 12px; color: var(--ks-green-950);">Field Weight & Grade Verification</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; line-height: 1.6;">
              <div>📍 <strong>Current Stop:</strong> Ravi Kumar's farm gate (Geesugonda)</div>
              <div>⚖️ <strong>Scale Reading:</strong> 85 kg digital gross collected</div>
              <div>📋 <strong>Grade Split:</strong> Grade A (70 kg) + Grade B (15 kg) = 85 kg sum check</div>
              <div>📷 <strong>Inspection:</strong> 2 photo timestamps captured</div>
              <div>🔒 <strong>Farmer Pricing Lock:</strong> Asking price ₹25/kg cannot be modified</div>
            </div>
            <button class="btn btn-primary" data-goto-role="pickup" data-goto-view="pickup" style="margin-top: 18px;">
              Open Inspection Form →
            </button>
          </div>
          <div style="background: #fff; padding: 20px; border-radius: var(--ks-radius-xl); border: 1px solid var(--ks-cream-border);">
            <div class="alert-terracotta" style="margin-bottom: 10px; font-size: 0.8rem;">
              ⚠️ Terracotta warning: Farmers must approve all grade changes before confirmation.
            </div>
            <div style="font-size: 0.82rem; color: var(--ks-text-secondary); line-height: 1.5;">
              • Freshness checklist: Verified<br>
              • Visual bruising check: 15 kg moved to Grade B<br>
              • Location: Geesugonda (Accuracy 4m)
            </div>
          </div>
        </div>
      `;
    } else if (role === 'coordinator') {
      previewBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
          <div>
            <span class="badge badge-assisted" style="margin-bottom: 8px;">Coordinator & FPO · Lakshmi</span>
            <h3 style="font-size: 1.4rem; margin-bottom: 12px; color: var(--ks-green-950);">Assistance Dispatch & Support</h3>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.92rem; line-height: 1.6;">
              <div>👥 <strong>Active Queue:</strong> 2 farmer requests pending in Geesugonda</div>
              <div>⭐ <strong>Coordinator Rating:</strong> 4.9/5 · 42 farmers helped this week</div>
              <div>📝 <strong>Assisted Listing:</strong> Help low-literacy farmers list with voice OTP verification</div>
              <div>🗣️ <strong>Regional Outreach:</strong> Native Telugu voice support on WhatsApp & call</div>
            </div>
            <button class="btn btn-primary" data-goto-role="coordinator" data-goto-view="coordinator" style="margin-top: 18px;">
              Open Coordinator Desk →
            </button>
          </div>
          <div style="background: #fff; padding: 20px; border-radius: var(--ks-radius-xl); border: 1px solid var(--ks-cream-border);">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--ks-green-900); margin-bottom: 8px;">QUEUE STATUS:</div>
            <div style="background: var(--ks-cream-surface); padding: 10px; border-radius: var(--ks-radius-md); font-size: 0.85rem; margin-bottom: 6px;">
              👨‍🌾 Kishan Rao (Dharmaram) · Need: List produce & price
            </div>
            <div style="background: var(--ks-cream-surface); padding: 10px; border-radius: var(--ks-radius-md); font-size: 0.85rem;">
              👩‍🌾 Mallamma (Geesugonda) · Need: Quality & TDS test
            </div>
          </div>
        </div>
      `;
    }
  }

  // Initial render
  renderPreview('farmer');

  document.querySelectorAll('.preview-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.preview-tab-btn').forEach(b => {
        b.className = 'btn btn-secondary btn-sm preview-tab-btn';
      });
      btn.className = 'btn btn-primary btn-sm preview-tab-btn active';
      const role = btn.getAttribute('data-preview-role');
      renderPreview(role);
    });
  });
}


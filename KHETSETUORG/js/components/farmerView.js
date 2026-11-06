/* ==========================================================================
   KhetSetu (खेत सेतु) — Farmer Dashboard & Stock Management (Sections 7 & 12)
   Add Stock Drawer, 3-Part Animated Quantity Bar, Orders Inbox, Farmer Approval
   ========================================================================== */

import { api } from '../services/api.js';
import { store } from '../state/store.js';
import { t } from '../i18n/translations.js';
import { showToast } from './motion.js';
import { renderLiveMap } from './liveMap.js';

export async function renderFarmerDashboard(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const stockListings = await api.getMarketplaceListings();
  const myFarmerStock = stockListings.filter(s => s.farmerId === 'FRM-001' || s.farmerName.includes('Ravi'));
  const orders = api.orders;

  container.innerHTML = `
    <div class="container" style="padding-top: 32px; padding-bottom: 60px;">
      
      <!-- Top Banner Strip -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-pickup-verified">రైతు డ్యాష్‌బోర్డ్ / Farmer Dashboard</span>
            <span class="badge badge-live">Live Pilot: Geesugonda Hub</span>
          </div>
          <h1 style="font-size: clamp(1.8rem, 3vw, 2.4rem); margin-top: 6px;">
            నమస్తే, రవి కుమార్ (Ravi Kumar)
          </h1>
          <p style="font-size: 0.95rem; color: var(--ks-text-secondary);">
            Geesugonda Village, Warangal · Farmer ID: <strong>FRM-TG-2026-004512</strong>
          </p>
        </div>

        <div style="display: flex; gap: 12px; align-items: center;">
          <!-- Audio Guide Button -->
          <button class="btn-audio-guide" id="audioGuideBtn">
            <span>🔊</span>
            <span>${t('audio_listen')}</span>
          </button>
          <!-- Add Stock Button -->
          <button class="btn btn-primary btn-lg" id="openAddStockModalBtn">
            <span>+</span>
            <span>${t('list_stock_btn')}</span>
          </button>
        </div>
      </div>

      <!-- Quick Metrics Summary -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px;">
        <div class="ks-card" style="padding: 18px;">
          <span style="font-size: 0.8rem; color: var(--ks-text-secondary); font-weight: 600;">ACTIVE PRODUCE LISTINGS</span>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--ks-green-950); margin-top: 4px;">${myFarmerStock.length} Listings</div>
          <span style="font-size: 0.78rem; color: var(--ks-green-700); font-weight: 600;">● All farmer-priced</span>
        </div>
        <div class="ks-card" style="padding: 18px;">
          <span style="font-size: 0.8rem; color: var(--ks-text-secondary); font-weight: 600;">AVAILABLE FOR BUYERS</span>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--ks-green-950); margin-top: 4px;">65 kg</div>
          <span style="font-size: 0.78rem; color: var(--ks-marigold); font-weight: 600;">20 kg currently on hold</span>
        </div>
        <div class="ks-card" style="padding: 18px;">
          <span style="font-size: 0.8rem; color: var(--ks-text-secondary); font-weight: 600;">INCOMING ORDERS</span>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--ks-green-950); margin-top: 4px;">${orders.length} Requests</div>
          <span style="font-size: 0.78rem; color: var(--ks-saffron); font-weight: 600;">Instant hold active</span>
        </div>
        <div class="ks-card" style="padding: 18px;">
          <span style="font-size: 0.8rem; color: var(--ks-text-secondary); font-weight: 600;">ESTIMATED EARNINGS</span>
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--ks-marigold); margin-top: 4px;">₹2,125</div>
          <span style="font-size: 0.78rem; color: var(--ks-text-secondary);">Direct DBT upon delivery</span>
        </div>
      </div>

      <!-- Live Tracking & Pooled Route Component (Section 15) -->
      <div style="margin-bottom: 36px;">
        <h3 style="font-size: 1.25rem; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          <span>🚚</span>
          <span>మీ ప్రాంతంలో ఉమ్మడి పికప్ వాహనం / Shared Pickup Tracking</span>
        </h3>
        <div id="farmerLiveMapSlot"></div>
      </div>

      <!-- Section: Farmer Approval Alert (Section 12) -->
      <div id="farmerApprovalAlertSlot" style="margin-bottom: 32px;"></div>

      <!-- Main Columns: Stock Listings (Left) + Orders Inbox (Right) -->
      <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 32px;" class="farmer-layout-grid">
        
        <!-- Left: My Stock Listings -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 1.3rem;">${t('my_stock')}</h3>
            <span style="font-size: 0.85rem; color: var(--ks-text-secondary);">${myFarmerStock.length} Active Listings</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${myFarmerStock.map(item => `
              <div class="ks-card" style="padding: 22px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
                  <div style="display: flex; gap: 14px; align-items: center;">
                    <img src="${item.image}" alt="${item.crop}" style="width: 64px; height: 64px; border-radius: var(--ks-radius-md); object-fit: cover;">
                    <div>
                      <h4 style="font-size: 1.15rem; margin-bottom: 2px;">${item.crop} (${item.cropTelugu})</h4>
                      <div style="font-size: 0.85rem; color: var(--ks-text-secondary);">${item.variety}</div>
                    </div>
                  </div>

                  <div style="text-align: right;">
                    <div style="font-size: 1.4rem; font-weight: 800; color: var(--ks-green-900);">₹${item.pricePerKg} <span style="font-size: 0.85rem; font-weight: 500;">/ kg</span></div>
                    <span class="badge badge-farmer-declared">రైతు నిర్ణయించిన ధర</span>
                  </div>
                </div>

                <!-- 3-Part Animated Quantity Bar (Section 7) -->
                <div class="qty-bar-container" style="margin-bottom: 16px;">
                  <div class="qty-bar">
                    <div class="qty-bar-part qty-bar-sold" style="width: ${(item.soldKg / item.totalKg) * 100}%;" title="Sold: ${item.soldKg} kg"></div>
                    <div class="qty-bar-part qty-bar-reserved" style="width: ${(item.reservedKg / item.totalKg) * 100}%;" title="Reserved: ${item.reservedKg} kg"></div>
                    <div class="qty-bar-part qty-bar-available" style="width: ${(item.availableKg / item.totalKg) * 100}%;" title="Available: ${item.availableKg} kg"></div>
                  </div>
                  <div class="qty-bar-legend">
                    <span class="qty-legend-item">
                      <span class="qty-legend-dot" style="background: var(--ks-text-tertiary);"></span>
                      <span>అమ్మినవి (Sold): <strong>${item.soldKg} kg</strong></span>
                    </span>
                    <span class="qty-legend-item">
                      <span class="qty-legend-dot" style="background: var(--ks-marigold);"></span>
                      <span>రిజర్వ్ (Held): <strong>${item.reservedKg} kg</strong></span>
                    </span>
                    <span class="qty-legend-item">
                      <span class="qty-legend-dot" style="background: var(--ks-green-600);"></span>
                      <span>లభ్యం (Available): <strong>${item.availableKg} kg</strong></span>
                    </span>
                  </div>
                </div>

                <!-- Quality & Pickup tags -->
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; font-size: 0.8rem;">
                  <span class="badge badge-neutral">TDS: ${item.tdsPpm} ppm</span>
                  <span class="badge badge-neutral">గ్రేడ్: ${item.expectedGrade}</span>
                  <span class="badge badge-neutral">కనిష్ట ఆర్డర్: ${item.minOrderKg} kg</span>
                  <span class="badge badge-neutral">స్టెప్: ${item.stepKg} kg</span>
                  <span class="badge badge-live">${item.status}</span>
                </div>

                <!-- Actions: Edit, Pause, Mark Sold out -->
                <div style="display: flex; gap: 10px; border-top: 1px solid var(--ks-cream-border); padding-top: 14px; justify-content: flex-end;">
                  <button class="btn btn-outline btn-sm" id="editPriceBtn_${item.id}">ధర మార్చండి / Edit Price</button>
                  <button class="btn btn-secondary btn-sm" id="pauseBtn_${item.id}">${item.status === 'Paused' ? 'Resume' : 'Pause'} Listing</button>
                  <button class="btn btn-primary btn-sm" id="addMoreStockBtn_${item.id}">+ Add Stock</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Incoming Orders Inbox (Section 7) -->
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <h3 style="font-size: 1.3rem;">${t('orders_inbox')}</h3>
            <span class="badge badge-hold">${orders.length} Pending</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            ${orders.map(ord => `
              <div class="ks-card" style="padding: 18px; border-left: 4px solid var(--ks-marigold);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <div>
                    <strong style="color: var(--ks-green-950); font-size: 1rem;">${ord.buyerOrg}</strong>
                    <div style="font-size: 0.8rem; color: var(--ks-text-secondary);">${ord.buyerName} · ${ord.buyerType}</div>
                  </div>
                  <span class="badge badge-hold" style="font-size: 0.75rem;">${ord.status}</span>
                </div>

                <div style="background: var(--ks-cream-surface); padding: 12px; border-radius: var(--ks-radius-md); margin-bottom: 12px; font-size: 0.88rem; line-height: 1.5;">
                  <div>🌾 <strong>${ord.crop}: ${ord.quantityKg} kg</strong></div>
                  <div>💰 Price requested: <strong>₹${ord.offeredPrice}/kg</strong> ${ord.offeredPrice < ord.askingPrice ? '<span style="color:var(--ks-terracotta); font-weight:700;">(Counter Offer)</span>' : '(Farmer Asking Price)'}</div>
                  <div>💵 Total: <strong>₹${ord.quantityKg * ord.offeredPrice}</strong></div>
                  <div style="color: var(--ks-saffron); font-weight: 600; font-size: 0.8rem; margin-top: 4px;">
                    ⏳ ${t('hold_countdown')} 05:42:19 (Stock held)
                  </div>
                </div>

                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-primary btn-sm" style="flex:1;" id="acceptOrderBtn_${ord.id}">
                    ${t('accept_btn')} ✓
                  </button>
                  <button class="btn btn-secondary btn-sm" id="counterOrderBtn_${ord.id}">
                    ${t('counter_btn')}
                  </button>
                  <button class="btn btn-terracotta-outline btn-sm" id="declineOrderBtn_${ord.id}">
                    ${t('decline_btn')}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

    </div>

    <!-- Add Stock Side Panel / Modal Container -->
    <div id="addStockModalWrap"></div>
  `;

  // Render Live Map for Farmer
  renderLiveMap('farmerLiveMapSlot', { role: 'farmer' });

  // Render Farmer Approval banner if pickup has occurred (Section 12)
  renderFarmerApprovalSection('farmerApprovalAlertSlot');

  // Bind Order Action Events
  orders.forEach(ord => {
    document.getElementById(`acceptOrderBtn_${ord.id}`)?.addEventListener('click', async () => {
      await api.respondToOrder(ord.id, 'accept');
      showToast(`Order #${ord.id} accepted! Stock moved to committed route.`);
      renderFarmerDashboard(containerId);
    });

    document.getElementById(`declineOrderBtn_${ord.id}`)?.addEventListener('click', async () => {
      await api.respondToOrder(ord.id, 'decline');
      showToast(`Order #${ord.id} declined. Held stock released back to available.`, 'warning');
      renderFarmerDashboard(containerId);
    });

    document.getElementById(`counterOrderBtn_${ord.id}`)?.addEventListener('click', async () => {
      const counterPrice = prompt('Enter your counter price per kg (₹):', ord.askingPrice);
      if (counterPrice) {
        await api.respondToOrder(ord.id, 'counter', Number(counterPrice));
        showToast(`Counter offer of ₹${counterPrice}/kg sent to ${ord.buyerOrg}`);
        renderFarmerDashboard(containerId);
      }
    });
  });

  // Bind Stock Listing Actions (Section 7)
  myFarmerStock.forEach(item => {
    document.getElementById(`editPriceBtn_${item.id}`)?.addEventListener('click', async () => {
      const newPrice = prompt(`Current asking price is ₹${item.pricePerKg}/kg. Enter new price per kg (₹) (applies to future orders):`, item.pricePerKg);
      if (newPrice && !isNaN(newPrice) && Number(newPrice) > 0) {
        await api.updateStockListing(item.id, { pricePerKg: Number(newPrice) }, 'farmer');
        showToast(`Asking price updated to ₹${newPrice}/kg! Only you set your price.`);
        renderFarmerDashboard(containerId);
      }
    });

    document.getElementById(`pauseBtn_${item.id}`)?.addEventListener('click', async () => {
      const res = await api.pauseStockListing(item.id);
      showToast(`Listing ${item.crop} is now ${res.status}.`);
      renderFarmerDashboard(containerId);
    });

    document.getElementById(`addMoreStockBtn_${item.id}`)?.addEventListener('click', async () => {
      const addedQty = prompt(`How many kg would you like to add to ${item.crop}?`, '25');
      if (addedQty && !isNaN(addedQty) && Number(addedQty) > 0) {
        const newTotal = item.totalKg + Number(addedQty);
        await api.updateStockListing(item.id, { totalKg: newTotal }, 'farmer');
        showToast(`Added ${addedQty} kg! Total harvest now ${newTotal} kg.`);
        renderFarmerDashboard(containerId);
      }
    });
  });

  // Add stock trigger
  document.getElementById('openAddStockModalBtn')?.addEventListener('click', () => {
    openAddStockModal(containerId);
  });

  // Audio Guide placeholder
  document.getElementById('audioGuideBtn')?.addEventListener('click', () => {
    showToast('🔊 Playing audio guide in Telugu (Sample audio playback active)');
  });
}

/**
 * Farmer Approval Screen (Section 12)
 */
function renderFarmerApprovalSection(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  target.innerHTML = `
    <div class="ks-card" style="border: 2px solid var(--ks-marigold); background: #FFFDF9; padding: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
        <div>
          <span class="badge badge-hold">Awaiting Farmer Approval / రైతు ఆమోదం కోసం</span>
          <h3 style="font-size: 1.25rem; margin-top: 6px;">
            పికప్ తనిఖీ నివేదిక — టమోటా (Pickup Inspection Report — Tomato)
          </h3>
          <p style="font-size: 0.88rem; color: var(--ks-text-secondary);">
            Inspected by Collection Agent: <strong>Suresh (KhetSetu Agent)</strong> at Geesugonda Gate.
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.4rem; font-weight: 800; color: var(--ks-green-900);">₹2,125</div>
          <span style="font-size: 0.8rem; color: var(--ks-text-secondary);">Estimated Final Earnings</span>
        </div>
      </div>

      <!-- Comparison: Listed vs Verified Weight & Grades -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 18px;">
        <div style="background: #FFFFFF; border: 1px solid var(--ks-cream-border); padding: 14px; border-radius: var(--ks-radius-md);">
          <span style="font-size: 0.78rem; color: var(--ks-text-secondary); font-weight: 700;">ORIGINAL LISTED DETAILS</span>
          <div style="font-size: 1.1rem; font-weight: 800; margin-top: 4px;">85 kg · Declared Grade A</div>
          <span style="font-size: 0.82rem; color: var(--ks-text-tertiary);">Price: ₹25 / kg</span>
        </div>

        <div style="background: var(--ks-green-50); border: 1px solid var(--ks-green-200); padding: 14px; border-radius: var(--ks-radius-md);">
          <span style="font-size: 0.78rem; color: var(--ks-green-800); font-weight: 700;">AGENT VERIFIED WEIGHT & GRADES</span>
          <div style="font-size: 1.1rem; font-weight: 800; color: var(--ks-green-950); margin-top: 4px;">
            Total: 85 kg (Grade A: 70 kg · Grade B: 15 kg)
          </div>
          <span style="font-size: 0.82rem; color: var(--ks-saffron); font-weight: 600;">
            Reason: 15 kg moved to Grade B due to minor surface marks.
          </span>
        </div>
      </div>

      <!-- Agent's Verified Photo Thumbnails -->
      <div style="margin-bottom: 18px;">
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--ks-text-secondary);">AGENT VERIFICATION PHOTOS:</span>
        <div style="display: flex; gap: 12px; margin-top: 6px;">
          <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80" style="width: 70px; height: 70px; border-radius: var(--ks-radius-md); object-fit: cover; border: 1px solid var(--ks-cream-border);">
          <img src="https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200&auto=format&fit=crop&q=80" style="width: 70px; height: 70px; border-radius: var(--ks-radius-md); object-fit: cover; border: 1px solid var(--ks-cream-border);">
        </div>
      </div>

      <!-- Terracotta Alert (Section 11) -->
      <div class="alert-terracotta" style="margin-bottom: 18px;">
        <span>⚠️</span>
        <div>
          <strong>రైతు గమనిక (Farmer Protection Rule):</strong> 
          No produce can be dispatched or billed without your explicit approval of this inspection report.
        </div>
      </div>

      <!-- Approval & Concern Buttons -->
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button class="btn btn-terracotta-outline" id="raiseConcernBtn">
          అభ్యంతరం తెలపండి / Raise Concern
        </button>
        <button class="btn btn-primary btn-lg" id="approveVerificationBtn">
          తనిఖీని ఆమోదించండి / Approve Verification ✓
        </button>
      </div>
    </div>
  `;

  document.getElementById('approveVerificationBtn')?.addEventListener('click', async () => {
    await api.approveVerification('VRF-SAMPLE-01');
    showToast('Verification approved! Tomatoes added to pooled lot for dispatch.');
    target.innerHTML = `
      <div style="background: var(--ks-green-100); border: 1px solid var(--ks-green-200); padding: 16px; border-radius: var(--ks-radius-md); display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 1.5rem; color: var(--ks-green-800);">✓</span>
        <div>
          <strong style="color: var(--ks-green-950);">తనిఖీ ఆమోదించబడింది (Verification Approved)</strong>
          <div style="font-size: 0.85rem; color: var(--ks-text-secondary);">Your harvest has been approved and pooled into vehicle TS-03-AG-8821. Payment will be credited upon delivery.</div>
        </div>
      </div>
    `;
  });

  document.getElementById('raiseConcernBtn')?.addEventListener('click', async () => {
    const reason = prompt('Please describe your concern with the agent inspection:', 'Disagree with Grade B classification of 15 kg');
    if (reason) {
      await api.raiseConcern('VRF-SAMPLE-01', reason);
      showToast('Concern registered. A coordinator will visit your farm to re-inspect.', 'warning');
    }
  });
}

/**
 * Add Stock Modal / Drawer (Section 7)
 */
function openAddStockModal(dashboardContainerId) {
  const modalWrap = document.getElementById('addStockModalWrap');
  if (!modalWrap) return;

  modalWrap.innerHTML = `
    <div class="modal-backdrop active bottom-sheet" id="addStockBackdrop">
      <div class="modal-dialog" style="max-width: 720px; padding: 28px;">
        <div class="sheet-drag-handle"></div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <span class="badge badge-farmer-declared">రైతు మాత్రమే నిర్ణయిస్తారు</span>
            <h2 style="font-size: 1.4rem; margin-top: 4px;">పంట నిల్వను నమోదు చేయండి / List My Stock</h2>
          </div>
          <button id="closeAddStockBtn" style="background:none; border:none; font-size:1.6rem; cursor:pointer; color:var(--ks-text-tertiary);">×</button>
        </div>

        <form id="newStockForm">
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Crop / పంట</label>
              <select class="form-control" id="stkCrop">
                <option value="Tomato">🍅 Tomato (టమోటా)</option>
                <option value="Green Chilli">🌶️ Green Chilli (పచ్చిమిర్చి)</option>
                <option value="Onion">🧅 Onion (ఉల్లిపాయ)</option>
                <option value="Capsicum">🫑 Capsicum (బెంగళూరు మిరప)</option>
                <option value="Potato">🥔 Potato (బంగాళాదుంప)</option>
                <option value="Brinjal">🍆 Brinjal (వంకాయ)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Variety (Optional)</label>
              <input type="text" class="form-control" id="stkVariety" value="Vaishnavi Hybrid / Local">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Total Quantity (kg)</label>
              <input type="number" class="form-control" id="stkTotalKg" value="100" min="5" step="5">
            </div>
            <div class="form-group">
              <label class="form-label">
                <span>My Asking Price (₹ per kg)</span>
                <span style="font-size:0.75rem; color:var(--ks-green-700);">Farmer set only</span>
              </label>
              <input type="number" class="form-control" id="stkPrice" value="28" min="1" style="font-weight: 700; color: var(--ks-green-950);">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
            <div class="form-group">
              <label class="form-label">Minimum Order (kg)</label>
              <input type="number" class="form-control" id="stkMinOrder" value="10">
            </div>
            <div class="form-group">
              <label class="form-label">Quantity Step (Batch size in kg)</label>
              <input type="number" class="form-control" id="stkStep" value="5">
            </div>
          </div>

          <!-- Quality Details (Section 7) -->
          <div style="background: var(--ks-cream-surface); border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-lg); padding: 18px; margin-bottom: 18px;">
            <h4 style="font-size: 1rem; margin-bottom: 12px; color: var(--ks-green-950);">Declared Quality Details</h4>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label">Irrigation Water TDS (ppm)</label>
                <input type="number" class="form-control" id="stkTds" value="140">
                <span class="form-helper">100-200 ppm = Excellent quality</span>
              </div>
              <div class="form-group">
                <label class="form-label">Expected Grade</label>
                <select class="form-control" id="stkGrade">
                  <option value="A">Grade A (Premium - Supermarkets/Hotels)</option>
                  <option value="B">Grade B (Standard - Regular Retail)</option>
                  <option value="C">Grade C (Processing - Pulp/Sauces)</option>
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label class="form-label">Farming Method</label>
                <select class="form-control" id="stkMethod">
                  <option>Pesticide-free / Drip irrigation</option>
                  <option>Conventional GAP</option>
                  <option>Natural Organic compost</option>
                  <option>Self-declared</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Estimated Shelf Life (Days)</label>
                <input type="number" class="form-control" id="stkShelf" value="6">
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary" id="saveDraftBtn">Save as draft</button>
            <button type="submit" class="btn btn-primary btn-lg" id="publishStockBtn">
              List my stock (ప్రకటించండి) →
            </button>
          </div>

        </form>
      </div>
    </div>
  `;

  document.getElementById('closeAddStockBtn')?.addEventListener('click', () => {
    modalWrap.innerHTML = '';
  });

  document.getElementById('saveDraftBtn')?.addEventListener('click', async () => {
    const crop = document.getElementById('stkCrop').value;
    const variety = document.getElementById('stkVariety').value;
    const totalKg = document.getElementById('stkTotalKg').value;
    const pricePerKg = document.getElementById('stkPrice').value;
    try {
      await api.createStockListing({
        crop,
        variety,
        totalKg,
        pricePerKg,
        saveAsDraft: true,
        pickupVillage: 'Geesugonda Hub'
      });
      showToast(`Draft saved: ${crop} (${totalKg} kg). Not visible to buyers until published.`, 'warning');
      modalWrap.innerHTML = '';
      renderFarmerDashboard(dashboardContainerId);
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  document.getElementById('newStockForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const crop = document.getElementById('stkCrop').value;
    const variety = document.getElementById('stkVariety').value;
    const totalKg = document.getElementById('stkTotalKg').value;
    const pricePerKg = document.getElementById('stkPrice').value;
    const minOrderKg = document.getElementById('stkMinOrder').value;
    const stepKg = document.getElementById('stkStep').value;
    const tdsPpm = document.getElementById('stkTds').value;
    const expectedGrade = document.getElementById('stkGrade').value;

    try {
      await api.createStockListing({
        crop,
        variety,
        totalKg,
        pricePerKg,
        minOrderKg,
        stepKg,
        tdsPpm,
        expectedGrade,
        pickupVillage: 'Geesugonda Hub'
      });
      showToast(`Stock published: ${totalKg} kg of ${crop} at ₹${pricePerKg}/kg!`);
      modalWrap.innerHTML = '';
      renderFarmerDashboard(dashboardContainerId);
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}


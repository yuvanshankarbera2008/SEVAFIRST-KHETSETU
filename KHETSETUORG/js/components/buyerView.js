/* ==========================================================================
   KhetSetu (खेत सेतु) — Buyer Marketplace, Synced Quantity Selector & Cart
   (Sections 8, 9, 10, 13, 20)
   ========================================================================== */

import { api } from '../services/api.js';
import { store } from '../state/store.js';
import { t } from '../i18n/translations.js';
import { showToast } from './motion.js';

export async function renderBuyerMarketplace(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { filters, cart } = store.getState();
  const stockList = await api.getMarketplaceListings(filters);
  const pooledLots = api.pooledLots;

  container.innerHTML = `
    <div class="container" style="padding-top: 32px; padding-bottom: 60px;">
      
      <!-- Marketplace Header -->
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <span class="badge badge-pickup-verified">Institutional Procurement Marketplace</span>
          <h1 style="font-size: clamp(1.8rem, 3.2vw, 2.5rem); margin-top: 6px;">
            Fresh Farm-Gate Produce
          </h1>
          <p style="font-size: 1rem; color: var(--ks-text-secondary);">
            Warangal Clustered Supply · Clustered pickup saves up to 40% in logistics costs.
          </p>
        </div>

        <!-- Mode Toggle: Individual Farmer Stock vs Verified Pooled Lots -->
        <div style="display: flex; background: var(--ks-cream-surface); border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-full); padding: 4px;">
          <button class="btn btn-sm ${filters.mode === 'farmer' ? 'btn-primary' : 'btn-outline'}" id="toggleFarmerStockMode" style="border-radius: var(--ks-radius-full); border:none;">
            👨‍🌾 Individual Farmer Stock
          </button>
          <button class="btn btn-sm ${filters.mode === 'pooled' ? 'btn-primary' : 'btn-outline'}" id="togglePooledLotsMode" style="border-radius: var(--ks-radius-full); border:none;">
            📦 Verified Pooled Lots (${pooledLots.length})
          </button>
        </div>
      </div>

      <!-- Filter & Sort Bar (Section 8) -->
      <div class="ks-card" style="padding: 18px 24px; margin-bottom: 32px; background: #FFFFFF;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; align-items: center;">
          
          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--ks-text-secondary); text-transform: uppercase;">Crop</label>
            <select class="form-control" id="filterCrop" style="height: 40px; min-height: 40px; font-size: 0.9rem;">
              <option value="all" ${filters.crop === 'all' ? 'selected' : ''}>All Crops</option>
              <option value="Tomato" ${filters.crop === 'Tomato' ? 'selected' : ''}>Tomato (టమోటా)</option>
              <option value="Chilli" ${filters.crop === 'Chilli' ? 'selected' : ''}>Green Chilli (పచ్చిమిర్చి)</option>
              <option value="Onion" ${filters.crop === 'Onion' ? 'selected' : ''}>Onion (ఉల్లిపాయ)</option>
              <option value="Capsicum" ${filters.crop === 'Capsicum' ? 'selected' : ''}>Capsicum (బెంగళూరు మిరప)</option>
            </select>
          </div>

          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--ks-text-secondary); text-transform: uppercase;">Grade</label>
            <select class="form-control" id="filterGrade" style="height: 40px; min-height: 40px; font-size: 0.9rem;">
              <option value="all" ${filters.grade === 'all' ? 'selected' : ''}>All Grades</option>
              <option value="A" ${filters.grade === 'A' ? 'selected' : ''}>Grade A (Premium)</option>
              <option value="B" ${filters.grade === 'B' ? 'selected' : ''}>Grade B (Standard)</option>
              <option value="C" ${filters.grade === 'C' ? 'selected' : ''}>Grade C (Processing)</option>
            </select>
          </div>

          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--ks-text-secondary); text-transform: uppercase;">Max Price (₹/kg)</label>
            <input type="range" id="filterMaxPrice" min="10" max="80" value="${filters.maxPrice}" style="width: 100%; accent-color: var(--ks-green-700);">
            <div style="font-size: 0.75rem; text-align: right; color: var(--ks-text-secondary);">Up to ₹<span id="priceLabel">${filters.maxPrice}</span>/kg</div>
          </div>

          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--ks-text-secondary); text-transform: uppercase;">Sort By</label>
            <select class="form-control" id="filterSort" style="height: 40px; min-height: 40px; font-size: 0.9rem;">
              <option value="distance" ${filters.sort === 'distance' ? 'selected' : ''}>Distance (Nearest first)</option>
              <option value="price_asc" ${filters.sort === 'price_asc' ? 'selected' : ''}>Price (Low to High)</option>
              <option value="quantity" ${filters.sort === 'quantity' ? 'selected' : ''}>Largest Quantity Available</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Main Marketplace Grid -->
      <div id="marketplaceListContainer">
        ${filters.mode === 'farmer' ? renderFarmerStockCards(stockList) : renderPooledLotsCards(pooledLots)}
      </div>

    </div>

    <!-- Synced Quantity Selector Modal (Section 8) -->
    <div id="quantitySelectorModalWrap"></div>

    <!-- Review Quality Checklist Modal (Section 8 & 13) -->
    <div id="qualityChecklistModalWrap"></div>
  `;

  // Attach Filters & Toggles
  document.getElementById('toggleFarmerStockMode')?.addEventListener('click', () => {
    store.setState({ filters: { ...filters, mode: 'farmer' } });
    renderBuyerMarketplace(containerId);
  });

  document.getElementById('togglePooledLotsMode')?.addEventListener('click', () => {
    store.setState({ filters: { ...filters, mode: 'pooled' } });
    renderBuyerMarketplace(containerId);
  });

  document.getElementById('filterCrop')?.addEventListener('change', (e) => {
    store.setState({ filters: { ...filters, crop: e.target.value } });
    renderBuyerMarketplace(containerId);
  });

  document.getElementById('filterGrade')?.addEventListener('change', (e) => {
    store.setState({ filters: { ...filters, grade: e.target.value } });
    renderBuyerMarketplace(containerId);
  });

  document.getElementById('filterMaxPrice')?.addEventListener('input', (e) => {
    document.getElementById('priceLabel').textContent = e.target.value;
  });

  document.getElementById('filterMaxPrice')?.addEventListener('change', (e) => {
    store.setState({ filters: { ...filters, maxPrice: e.target.value } });
    renderBuyerMarketplace(containerId);
  });

  document.getElementById('filterSort')?.addEventListener('change', (e) => {
    store.setState({ filters: { ...filters, sort: e.target.value } });
    renderBuyerMarketplace(containerId);
  });

  // Attach card selection listeners
  attachCardEvents(containerId);
  renderCartDrawer();
}

/**
 * Render Farmer Stock Cards (Section 8)
 */
function renderFarmerStockCards(stockList) {
  if (!stockList.length) {
    return `
      <div style="text-align: center; padding: 60px 20px; background: #fff; border-radius: var(--ks-radius-xl); border: 1px solid var(--ks-cream-border);">
        <h3>No produce matches your current filters</h3>
        <p style="color: var(--ks-text-secondary); margin-top: 8px;">Try clearing filters or switching to pooled lots.</p>
      </div>
    `;
  }

  return `
    <div class="market-grid">
      ${stockList.map(item => `
        <div class="stock-card">
          <div style="position: relative;">
            <img src="${item.image}" alt="${item.crop}" class="crop-card-img">
            <span class="badge badge-farmer-declared" style="position: absolute; top: 12px; left: 12px; box-shadow: var(--ks-shadow-sm);">
              ${item.badges[0]}
            </span>
            <span style="position: absolute; bottom: 12px; right: 12px; background: rgba(13, 35, 22, 0.85); color: #fff; padding: 4px 10px; border-radius: var(--ks-radius-full); font-size: 0.8rem; font-weight: 600;">
              📍 ${item.distanceKm} km away
            </span>
          </div>

          <div class="stock-card-body">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <h3 style="font-size: 1.25rem;">${item.crop}</h3>
                <div style="font-size: 0.85rem; color: var(--ks-text-secondary);">${item.variety}</div>
                <div style="font-size: 0.82rem; font-weight: 600; color: var(--ks-green-900); margin-top: 4px;">
                  👨‍🌾 ${item.farmerName} (${item.farmerVillage})
                </div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 1.5rem; font-weight: 800; color: var(--ks-green-900);">
                  ₹${item.pricePerKg}
                </div>
                <div style="font-size: 0.75rem; color: var(--ks-text-tertiary);">Asking price/kg</div>
              </div>
            </div>

            <!-- Animated Stock Bar -->
            <div class="qty-bar-container">
              <div class="qty-bar">
                <div class="qty-bar-part qty-bar-sold" style="width: ${(item.soldKg / item.totalKg) * 100}%;"></div>
                <div class="qty-bar-part qty-bar-reserved" style="width: ${(item.reservedKg / item.totalKg) * 100}%;"></div>
                <div class="qty-bar-part qty-bar-available" style="width: ${(item.availableKg / item.totalKg) * 100}%;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 0.8rem;">
                <span style="color: var(--ks-green-700); font-weight: 700;">${item.availableKg} kg available</span>
                <span style="color: var(--ks-text-tertiary);">${item.totalKg} kg total harvest</span>
              </div>
            </div>

            <!-- Quality Specifications (TDS, Grade, Harvest) -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.82rem; background: var(--ks-cream-surface); padding: 10px; border-radius: var(--ks-radius-md);">
              <div>
                <span style="color: var(--ks-text-tertiary);">Water TDS:</span> 
                <strong>${item.tdsPpm} ppm</strong> (Good)
              </div>
              <div>
                <span style="color: var(--ks-text-tertiary);">Declared Grade:</span> 
                <strong style="color: var(--ks-green-800);">Grade ${item.expectedGrade}</strong>
              </div>
              <div>
                <span style="color: var(--ks-text-tertiary);">Min Order:</span> 
                <strong>${item.minOrderKg} kg</strong>
              </div>
              <div>
                <span style="color: var(--ks-text-tertiary);">Batch Step:</span> 
                <strong>${item.stepKg} kg</strong>
              </div>
            </div>

            <div style="font-size: 0.8rem; color: var(--ks-text-secondary);">
              ⏳ ${item.harvestDate} · Shelf life ~${item.shelfLifeDays} days
            </div>

            <!-- Select Quantity CTA -->
            <button class="btn btn-primary" data-select-stock-id="${item.id}" style="width: 100%; margin-top: 6px;">
              Select Quantity / కొనుగోలు చేయండి →
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Render Verified Pooled Lots Cards (Section 10 & 13)
 */
function renderPooledLotsCards(pooledLots) {
  return `
    <div class="market-grid">
      ${pooledLots.map(lot => `
        <div class="stock-card" style="border: 2px solid var(--ks-green-400);">
          <div style="position: relative;">
            <img src="${lot.photos[0]}" alt="${lot.title}" class="crop-card-img">
            <span class="badge badge-pickup-verified" style="position: absolute; top: 12px; left: 12px; box-shadow: var(--ks-shadow-sm);">
              ✓ Pickup Verified Lot
            </span>
            <span style="position: absolute; bottom: 12px; right: 12px; background: rgba(39, 174, 96, 0.9); color: #fff; padding: 4px 10px; border-radius: var(--ks-radius-full); font-size: 0.8rem; font-weight: 700;">
              ${lot.farmerCount} Farmers Pooled
            </span>
          </div>

          <div class="stock-card-body">
            <div>
              <h3 style="font-size: 1.25rem;">${lot.title}</h3>
              <div style="font-size: 0.85rem; color: var(--ks-text-secondary);">${lot.villageCluster}</div>
              <div style="font-size: 0.82rem; color: var(--ks-green-700); font-weight: 600; margin-top: 4px;">
                Verified by ${lot.agentName} · ${lot.verifiedAt}
              </div>
            </div>

            <div style="background: var(--ks-green-50); border: 1px solid var(--ks-green-200); padding: 12px; border-radius: var(--ks-radius-md);">
              <div style="display: flex; justify-content: space-between; font-size: 0.9rem; font-weight: 700; margin-bottom: 6px;">
                <span>Total Lot: ${lot.totalKg} kg</span>
                <span style="color: var(--ks-green-900);">₹${lot.pricePerKg} / kg</span>
              </div>
              <div style="font-size: 0.82rem; color: var(--ks-text-secondary);">
                • Grade A: <strong>${lot.gradeSplit.gradeA} kg</strong> (80%)<br>
                • Grade B: <strong>${lot.gradeSplit.gradeB} kg</strong> (20%)
              </div>
            </div>

            <!-- Transport Savings Highlight (Section 10) -->
            <div style="background: var(--ks-marigold-light); border: 1px solid var(--ks-marigold-border); padding: 10px 14px; border-radius: var(--ks-radius-md); font-size: 0.85rem; color: #8A4B05; display: flex; align-items: center; gap: 8px;">
              <span>⚡</span>
              <div>
                <strong>Shared Route Transport Savings:</strong> ₹${lot.transportSavingsRupees.toLocaleString('en-IN')} saved vs 12 individual farmer trips.
              </div>
            </div>

            <!-- Actions: Reserve Lot & Make Offer -->
            <div style="display: flex; gap: 10px; margin-top: 8px;">
              <button class="btn btn-secondary btn-sm" style="flex:1;" data-make-lot-offer="${lot.id}">
                Make an Offer
              </button>
              <button class="btn btn-primary btn-sm" style="flex:1;" data-reserve-lot-id="${lot.id}">
                Reserve Lot (${lot.totalKg} kg) →
              </button>
            </div>

          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Attach Card Events & Synced Quantity Selector Dialog (Section 8)
 */
function attachCardEvents(containerId) {
  document.querySelectorAll('[data-select-stock-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-select-stock-id');
      const item = await api.getListingDetail(id);
      openQuantitySelectorModal(item, containerId);
    });
  });

  document.querySelectorAll('[data-reserve-lot-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      openQualityChecklistModal('Pooled Lot (600 kg Tomatoes)', 600, 26, () => {
        store.addToCart({
          listingId: 'LOT-WAR-TOM-01',
          farmerName: 'Warangal 8-Farmer Pool',
          crop: 'Tomato (Pooled Lot)',
          variety: 'Grade A 480kg + Grade B 120kg',
          quantityKg: 600,
          pricePerKg: 26
        });
        showToast('Reserved 600 kg verified pooled lot!');
      });
    });
  });

  document.querySelectorAll('[data-make-lot-offer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lotId = btn.getAttribute('data-make-lot-offer');
      const lot = api.pooledLots.find(l => l.id === lotId) || api.pooledLots[0];
      const customPrice = prompt(`Asking price is ₹${lot.pricePerKg}/kg. Enter your bulk offer price per kg:`, lot.pricePerKg - 2);
      if (customPrice && !isNaN(customPrice)) {
        store.addToCart({
          listingId: lot.id,
          farmerName: `${lot.farmerCount}-Farmer Pool`,
          crop: `${lot.crop} (Pooled Offer)`,
          variety: `${lot.totalKg} kg lot`,
          quantityKg: lot.totalKg,
          pricePerKg: Number(customPrice),
          isOffer: true
        });
        showToast(`Bulk offer of ₹${customPrice}/kg added to order summary! (Subject to farmer approval)`);
      }
    });
  });
}

/**
 * Synced Quantity Selector (Section 8)
 * Stepper (- / +), Numeric input, and Slider in full synchronization.
 * Limits respect min order, step, and max available.
 */
function openQuantitySelectorModal(item, dashboardContainerId) {
  const modalWrap = document.getElementById('quantitySelectorModalWrap');
  if (!modalWrap) return;

  let currentQty = item.minOrderKg;

  modalWrap.innerHTML = `
    <div class="modal-backdrop active" id="qtySelectorBackdrop">
      <div class="modal-dialog" style="max-width: 520px; padding: 28px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
          <div>
            <span class="badge badge-pickup-verified">Farmer-Direct Order</span>
            <h3 style="font-size: 1.35rem; margin-top: 4px;">${item.crop} (${item.variety})</h3>
            <p style="font-size: 0.85rem; color: var(--ks-text-secondary);">
              Grown by <strong>${item.farmerName}</strong> · Asking Price: <strong>₹${item.pricePerKg}/kg</strong>
            </p>
          </div>
          <button id="closeQtySelectorBtn" style="background:none; border:none; font-size:1.6rem; cursor:pointer; color:var(--ks-text-tertiary);">×</button>
        </div>

        <!-- Synced Controls Box (Section 8) -->
        <div class="quantity-selector-box">
          
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span style="color: var(--ks-text-secondary); font-weight: 600;">Choose Quantity (kg)</span>
            <span style="color: var(--ks-green-800); font-weight: 700;">Max: ${item.availableKg} kg available</span>
          </div>

          <!-- Stepper and Number Input -->
          <div class="qty-controls-row">
            <button class="qty-stepper-btn" id="stepperMinusBtn">−</button>
            <input type="number" class="qty-number-input" id="syncedQtyInput"
                   value="${currentQty}" min="${item.minOrderKg}" max="${item.availableKg}" step="${item.stepKg}">
            <button class="qty-stepper-btn" id="stepperPlusBtn">+</button>
          </div>

          <!-- Synced Slider -->
          <div>
            <input type="range" class="qty-slider" id="syncedQtySlider"
                   min="${item.minOrderKg}" max="${item.availableKg}" step="${item.stepKg}" value="${currentQty}">
          </div>

          <!-- Quick-Pick Chips (Section 8) -->
          <div class="qty-chips-row">
            <button class="qty-chip active" id="chipMin">Min (${item.minOrderKg} kg)</button>
            <button class="qty-chip" id="chip25">25% (${Math.round(item.availableKg * 0.25)} kg)</button>
            <button class="qty-chip" id="chip50">50% (${Math.round(item.availableKg * 0.5)} kg)</button>
            <button class="qty-chip" id="chipAll">All Available (${item.availableKg} kg)</button>
          </div>

          <!-- Order Summary & Pickup ETA -->
          <div style="background: #FFFFFF; border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-md); padding: 14px; margin-top: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800; color: var(--ks-green-950);">
              <span>Estimated Total:</span>
              <span id="liveTotalText">₹${currentQty * item.pricePerKg}</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--ks-text-secondary); margin-top: 4px;">
              (${currentQty} kg × ₹${item.pricePerKg}/kg) · Estimated pooled pickup: Today 4:00 PM
            </div>
            <div id="validationHint" style="font-size: 0.78rem; color: var(--ks-text-tertiary); margin-top: 6px;">
              ✓ Minimum order is ${item.minOrderKg} kg. Multiples of ${item.stepKg} kg.
            </div>
          </div>

        </div>

        <!-- Modal Action Buttons (Section 8) -->
        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <button class="btn btn-secondary btn-sm" id="makeOfferBtn" style="flex: 1;">
            Make an Offer
          </button>
          <button class="btn btn-primary btn-lg" id="requestQuantityBtn" style="flex: 1.5;">
            Add to Order Summary →
          </button>
        </div>

      </div>
    </div>
  `;

  const input = document.getElementById('syncedQtyInput');
  const slider = document.getElementById('syncedQtySlider');
  const totalText = document.getElementById('liveTotalText');
  const hint = document.getElementById('validationHint');

  function setQuantity(val) {
    let num = Number(val);
    if (num < item.minOrderKg) num = item.minOrderKg;
    if (num > item.availableKg) num = item.availableKg;

    // Align to step
    const remainder = (num - item.minOrderKg) % item.stepKg;
    if (remainder !== 0) {
      num = num - remainder;
    }

    currentQty = num;
    input.value = currentQty;
    slider.value = currentQty;
    totalText.textContent = `₹${(currentQty * item.pricePerKg).toLocaleString('en-IN')}`;
    hint.textContent = `✓ ${currentQty} kg selected (${currentQty} kg × ₹${item.pricePerKg}/kg)`;
  }

  document.getElementById('stepperPlusBtn')?.addEventListener('click', () => {
    setQuantity(currentQty + item.stepKg);
  });

  document.getElementById('stepperMinusBtn')?.addEventListener('click', () => {
    setQuantity(currentQty - item.stepKg);
  });

  input?.addEventListener('input', (e) => setQuantity(e.target.value));
  slider?.addEventListener('input', (e) => setQuantity(e.target.value));

  document.getElementById('chipMin')?.addEventListener('click', () => setQuantity(item.minOrderKg));
  document.getElementById('chip25')?.addEventListener('click', () => setQuantity(Math.round(item.availableKg * 0.25)));
  document.getElementById('chip50')?.addEventListener('click', () => setQuantity(Math.round(item.availableKg * 0.5)));
  document.getElementById('chipAll')?.addEventListener('click', () => setQuantity(item.availableKg));

  document.getElementById('closeQtySelectorBtn')?.addEventListener('click', () => {
    modalWrap.innerHTML = '';
  });

  // Proceed with Request
  document.getElementById('requestQuantityBtn')?.addEventListener('click', () => {
    openQualityChecklistModal(item.crop, currentQty, item.pricePerKg, () => {
      store.addToCart({
        listingId: item.id,
        farmerName: item.farmerName,
        crop: item.crop,
        variety: item.variety,
        quantityKg: currentQty,
        pricePerKg: item.pricePerKg
      });
      modalWrap.innerHTML = '';
      showToast(`Added ${currentQty} kg of ${item.crop} from ${item.farmerName} to order!`);
    });
  });

  // Make an Offer
  document.getElementById('makeOfferBtn')?.addEventListener('click', () => {
    const offerPrice = prompt(`Farmer asking price is ₹${item.pricePerKg}/kg. Enter your offered price per kg (₹):`, item.pricePerKg - 2);
    if (offerPrice) {
      store.addToCart({
        listingId: item.id,
        farmerName: item.farmerName,
        crop: item.crop,
        variety: item.variety,
        quantityKg: currentQty,
        pricePerKg: Number(offerPrice),
        isOffer: true
      });
      modalWrap.innerHTML = '';
      showToast(`Submitted offer of ₹${offerPrice}/kg for ${currentQty} kg! (Farmer must accept)`);
    }
  });
}

/**
 * Quality Checklist Modal (Section 8)
 * "Review quality before you buy" confirmation
 */
function openQualityChecklistModal(cropName, qty, price, onConfirm) {
  const modalWrap = document.getElementById('qualityChecklistModalWrap');
  if (!modalWrap) return;

  modalWrap.innerHTML = `
    <div class="modal-backdrop active" id="qualityChecklistBackdrop">
      <div class="modal-dialog" style="max-width: 500px; padding: 26px;">
        <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Review Quality Before You Buy</h3>
        <p style="font-size: 0.85rem; color: var(--ks-text-secondary); margin-bottom: 16px;">
          Please confirm that you have reviewed the declared quality details for <strong>${qty} kg of ${cropName}</strong>:
        </p>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
          <label style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; cursor: pointer;">
            <input type="checkbox" checked style="margin-top: 3px; accent-color: var(--ks-green-700);">
            <span>I have reviewed the farmer's water TDS (140 ppm) and pesticide-free declaration.</span>
          </label>
          <label style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; cursor: pointer;">
            <input type="checkbox" checked style="margin-top: 3px; accent-color: var(--ks-green-700);">
            <span>I understand that final weight and grade will be verified at pickup by the collection agent with photo evidence.</span>
          </label>
          <label style="display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; cursor: pointer;">
            <input type="checkbox" checked style="margin-top: 3px; accent-color: var(--ks-green-700);">
            <span>I agree that the farmer retains full pricing rights and must approve any change.</span>
          </label>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button class="btn btn-secondary" id="cancelQualityCheckBtn">Cancel</button>
          <button class="btn btn-primary" id="confirmQualityCheckBtn">Confirm & Add to Order ✓</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('cancelQualityCheckBtn')?.addEventListener('click', () => {
    modalWrap.innerHTML = '';
  });

  document.getElementById('confirmQualityCheckBtn')?.addEventListener('click', () => {
    modalWrap.innerHTML = '';
    onConfirm();
  });
}

/**
 * Multi-Farmer Order Cart Slide-in Drawer (Section 8, 20)
 * Allows buyer to combine produce from Ravi, Lakshmi, Suresh into one order summary
 */
export function renderCartDrawer() {
  const cartWrap = document.getElementById('globalCartDrawerMount') || document.getElementById('cartDrawerWrap');
  if (!cartWrap) return;

  const { cart, isCartOpen } = store.getState();
  const grandTotal = store.getCartTotal();

  cartWrap.innerHTML = `
    <div class="cart-drawer-backdrop ${isCartOpen ? 'active' : ''}" id="cartBackdrop">
      <div class="cart-drawer">
        
        <div style="padding: 20px 24px; border-bottom: 1px solid var(--ks-cream-border); display: flex; justify-content: space-between; align-items: center; background: var(--ks-cream-surface);">
          <div>
            <h3 style="font-size: 1.25rem;">Order Summary</h3>
            <span style="font-size: 0.82rem; color: var(--ks-text-secondary);">${cart.length} farmer line items</span>
          </div>
          <button id="closeCartDrawerBtn" style="background:none; border:none; font-size:1.6rem; cursor:pointer; color:var(--ks-text-tertiary);">×</button>
        </div>

        <!-- Cart Items List -->
        <div style="flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 16px;">
          ${cart.length === 0 ? `
            <div style="text-align: center; padding: 40px 0; color: var(--ks-text-secondary);">
              Your order summary is empty. Browse marketplace stock to add produce.
            </div>
          ` : cart.map(item => `
            <div style="background: var(--ks-cream-surface); border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-lg); padding: 16px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                <strong style="color: var(--ks-green-950); font-size: 1rem;">${item.crop}</strong>
                <span style="font-weight: 800; color: var(--ks-green-900);">₹${item.total.toLocaleString('en-IN')}</span>
              </div>
              <div style="font-size: 0.82rem; color: var(--ks-text-secondary); margin-bottom: 10px;">
                👨‍🌾 Farmer: ${item.farmerName} · ₹${item.pricePerKg}/kg
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 0.85rem; font-weight: 600;">Quantity: <strong>${item.quantityKg} kg</strong></div>
                <button class="btn btn-terracotta-outline btn-sm" data-remove-cart="${item.listingId}">Remove</button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Cart Footer & Checkout -->
        <div style="padding: 20px 24px; border-top: 1px solid var(--ks-cream-border); background: #FFFFFF;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 1.2rem; font-weight: 800;">
            <span>Grand Total:</span>
            <span style="color: var(--ks-green-950);">₹${grandTotal.toLocaleString('en-IN')}</span>
          </div>
          <p style="font-size: 0.78rem; color: var(--ks-text-tertiary); margin-bottom: 16px;">
            Single consolidated pickup vehicle will collect and deliver all items together.
          </p>
          <button class="btn btn-primary btn-lg" id="submitOrderCheckoutBtn" style="width: 100%;" ${cart.length === 0 ? 'disabled' : ''}>
            Submit Order Request (₹${grandTotal.toLocaleString('en-IN')}) →
          </button>
        </div>

      </div>
    </div>
  `;

  document.getElementById('closeCartDrawerBtn')?.addEventListener('click', () => {
    store.setState({ isCartOpen: false });
  });

  document.getElementById('cartBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'cartBackdrop') {
      store.setState({ isCartOpen: false });
    }
  });

  document.querySelectorAll('[data-remove-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove-cart');
      store.removeFromCart(id);
      renderCartDrawer();
    });
  });

  document.getElementById('submitOrderCheckoutBtn')?.addEventListener('click', async () => {
    try {
      await api.submitOrderRequest({
        buyerName: 'Anita Reddy',
        buyerOrg: 'FreshKart Retail',
        cartLines: cart,
        deliveryLocation: 'FreshKart Central Hub, Hanamkonda'
      });
      showToast('Order submitted successfully! Quantities held on farm.');
      store.clearCart();
      store.setState({ isCartOpen: false, currentView: 'farmer' });
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}


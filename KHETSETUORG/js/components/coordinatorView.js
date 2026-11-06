/* ==========================================================================
   KhetSetu (खेत सेतु) — Coordinator & FPO Help Queue Dashboard (Section 14)
   Assistance Queue, Assisted Listing Creation, Metrics Counter
   ========================================================================== */

import { api } from '../services/api.js';
import { store } from '../state/store.js';
import { showToast } from './motion.js';

export function renderCoordinatorView(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const queue = api.assistanceRequests;

  container.innerHTML = `
    <div class="container" style="padding-top: 32px; padding-bottom: 60px;">
      
      <!-- Top Title Strip -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
        <div>
          <div style="display: flex; gap: 8px; align-items: center;">
            <span class="badge badge-assisted">Local Coordinator & FPO Network</span>
            <span class="badge badge-live">Active Hub: Warangal Rural</span>
          </div>
          <h1 style="font-size: clamp(1.8rem, 3vw, 2.3rem); margin-top: 6px;">
            Farmer Assistance Dispatch
          </h1>
          <p style="font-size: 0.95rem; color: var(--ks-text-secondary);">
            Coordinator: <strong>Lakshmi</strong> · Warangal Rural Agricultural Support Center
          </p>
        </div>

        <!-- Metric Counter: Farmers Helped This Week (Section 14) -->
        <div style="background: var(--ks-green-900); color: #fff; padding: 14px 22px; border-radius: var(--ks-radius-xl); text-align: center; box-shadow: var(--ks-shadow-md);">
          <div style="font-size: 2rem; font-weight: 800; color: var(--ks-marigold);">42</div>
          <div style="font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.85);">Farmers Helped This Week</div>
        </div>
      </div>

      <!-- Quick Guidance Banner -->
      <div class="alert-demo-mode" style="margin-bottom: 28px;">
        <div>
          <strong>Coordinator Rule:</strong> You can help farmers enter stock details and TDS readings, but the farmer retains sole authority to confirm asking price. All assisted listings carry the <em>"Listed with help"</em> badge.
        </div>
      </div>

      <!-- Assistance Request Queue -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="font-size: 1.25rem;">Active Help Requests (${queue.length})</h3>
        <span style="font-size: 0.82rem; color: var(--ks-text-secondary);">Sorted by urgency & distance</span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 18px; margin-bottom: 40px;">
        ${queue.map(req => `
          <div class="ks-card" style="padding: 20px; border-left: 5px solid var(--ks-green-700);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 10px;">
              <div>
                <h4 style="font-size: 1.2rem; margin-bottom: 2px;">👨‍🌾 ${req.farmerName}</h4>
                <div style="font-size: 0.85rem; color: var(--ks-text-secondary);">
                  📍 ${req.village} · Language: <strong>${req.language}</strong>
                </div>
              </div>
              <span class="badge ${req.status.includes('Pending') ? 'badge-hold' : 'badge-pickup-verified'}">
                ${req.status}
              </span>
            </div>

            <div style="background: var(--ks-cream-surface); padding: 12px 16px; border-radius: var(--ks-radius-md); font-size: 0.88rem; margin-bottom: 14px;">
              <div>📌 <strong>Need:</strong> ${req.helpCategory}</div>
              <div>⏰ <strong>Preferred Time:</strong> ${req.preferredTime}</div>
              <div>📞 <strong>Phone:</strong> ${req.phone}</div>
            </div>

            <!-- Action Controls -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end;">
              <a href="tel:${req.phone}" class="btn btn-outline btn-sm">
                📞 Call Farmer
              </a>
              <button class="btn btn-secondary btn-sm" id="assistedListingBtn_${req.id}">
                📝 Start Assisted Listing
              </button>
              <button class="btn btn-primary btn-sm" id="completeRequestBtn_${req.id}">
                ✓ Mark Completed
              </button>
            </div>
          </div>
        `).join('')}
      </div>

    </div>

    <!-- Assisted Listing Wizard Modal Container -->
    <div id="assistedListingModalWrap"></div>
  `;

  // Bind Actions
  queue.forEach(req => {
    document.getElementById(`assistedListingBtn_${req.id}`)?.addEventListener('click', () => {
      openAssistedListingModal(req, containerId);
    });

    document.getElementById(`completeRequestBtn_${req.id}`)?.addEventListener('click', () => {
      showToast(`Request from ${req.farmerName} marked as completed! Metric updated.`);
    });
  });
}

/**
 * Assisted Listing Modal (Section 14)
 * Coordinator fills on farmer's behalf, but farmer reviews & approves before live.
 */
function openAssistedListingModal(req, dashboardContainerId) {
  const modalWrap = document.getElementById('assistedListingModalWrap');
  if (!modalWrap) return;

  modalWrap.innerHTML = `
    <div class="modal-backdrop active" id="assistedListingBackdrop">
      <div class="modal-dialog" style="max-width: 600px; padding: 26px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <div>
            <span class="badge badge-assisted">Assisted Mode</span>
            <h3 style="font-size: 1.3rem; margin-top: 4px;">Assisted Listing for ${req.farmerName}</h3>
          </div>
          <button id="closeAssistedModalBtn" style="background:none; border:none; font-size:1.6rem; cursor:pointer; color:var(--ks-text-tertiary);">×</button>
        </div>

        <p style="font-size: 0.85rem; color: var(--ks-text-secondary); margin-bottom: 16px;">
          As coordinator Lakshmi, enter details on behalf of ${req.farmerName}. The farmer must tap to approve the asking price before the listing is visible to buyers.
        </p>

        <form id="assistedStockForm">
          <div class="form-group">
            <label class="form-label">Crop</label>
            <input type="text" class="form-control" id="asCrop" value="Capsicum (Bell Pepper)">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Total Quantity (kg)</label>
              <input type="number" class="form-control" id="asTotal" value="150">
            </div>
            <div class="form-group">
              <label class="form-label">Farmer Asking Price (₹/kg)</label>
              <input type="number" class="form-control" id="asPrice" value="38">
              <span class="form-helper">Confirmed verbally with farmer</span>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Water TDS (ppm)</label>
              <input type="number" class="form-control" id="asTds" value="125">
            </div>
            <div class="form-group">
              <label class="form-label">Expected Grade</label>
              <select class="form-control" id="asGrade">
                <option value="A" selected>Grade A (Polyhouse)</option>
                <option value="B">Grade B</option>
              </select>
            </div>
          </div>

          <div style="background: var(--ks-marigold-light); border: 1px solid var(--ks-marigold-border); padding: 12px; border-radius: var(--ks-radius-md); font-size: 0.85rem; margin-bottom: 20px;">
            🔒 <strong>Verification Step:</strong> A confirmation SMS with OTP <strong>449911</strong> has been sent to ${req.phone} for the farmer's one-tap approval.
          </div>

          <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary" id="cancelAssistedBtn">Cancel</button>
            <button type="submit" class="btn btn-primary btn-lg">
              Send to Farmer for 1-Tap Approval →
            </button>
          </div>
        </form>

      </div>
    </div>
  `;

  document.getElementById('closeAssistedModalBtn')?.addEventListener('click', () => modalWrap.innerHTML = '');
  document.getElementById('cancelAssistedBtn')?.addEventListener('click', () => modalWrap.innerHTML = '');

  document.getElementById('assistedStockForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await api.createStockListing({
      crop: document.getElementById('asCrop').value,
      totalKg: document.getElementById('asTotal').value,
      pricePerKg: document.getElementById('asPrice').value,
      tdsPpm: document.getElementById('asTds').value,
      expectedGrade: document.getElementById('asGrade').value,
      pickupVillage: req.village
    }, 'coordinator', 'Lakshmi (Local Coordinator)');

    showToast(`Assisted listing submitted for ${req.farmerName}! Farmer approved via OTP.`);
    modalWrap.innerHTML = '';
  });
}


/* ==========================================================================
   KhetSetu (खेत सेतु) — Pickup Agent Quality Verification View (Section 11)
   Mobile-First Farm-Gate Inspection, Grade Split Validation, Photo Capture
   ========================================================================== */

import { api } from '../services/api.js';
import { store } from '../state/store.js';
import { showToast } from './motion.js';

export function renderPickupAgentView(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="container container-narrow" style="padding-top: 28px; padding-bottom: 60px;">
      
      <!-- Top Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <span class="badge badge-pickup-verified">Field Inspection Mode</span>
          <h1 style="font-size: 1.6rem; margin-top: 4px;">Farm-Gate Quality Verification</h1>
        </div>
        <span class="badge badge-live">Agent: Suresh (ID: AGT-992)</span>
      </div>

      <!-- Order Details Card (Section 11) -->
      <div class="ks-card" style="padding: 20px; margin-bottom: 24px; background: #FFFFFF; border-left: 5px solid var(--ks-green-700);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
          <div>
            <h3 style="font-size: 1.25rem;">🍅 Tomato (Vaishnavi Hybrid)</h3>
            <div style="font-size: 0.9rem; color: var(--ks-text-secondary); margin-top: 2px;">
              Farmer: <strong>Ravi Kumar</strong> · Geesugonda Village
            </div>
            <div style="font-size: 0.8rem; color: var(--ks-text-tertiary);">
              Route TS-03-AG-8821 · Stop 1 of 4 · Geesugonda Cluster
            </div>
          </div>
          <span class="badge badge-hold">Awaiting Verification</span>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.88rem; background: var(--ks-cream-surface); padding: 12px; border-radius: var(--ks-radius-md);">
          <div>
            <span style="color: var(--ks-text-secondary);">Listed Quantity:</span>
            <strong>85 kg</strong>
          </div>
          <div>
            <span style="color: var(--ks-text-secondary);">Asking Price:</span>
            <strong style="color: var(--ks-green-900);">₹25 / kg</strong>
            <span style="font-size: 0.72rem; color: var(--ks-text-tertiary); display: block;">🔒 Price set by farmer (read-only)</span>
          </div>
        </div>
      </div>

      <!-- Verification Form (Section 11) -->
      <form id="agentVerificationForm" class="ks-card" style="padding: 24px; background: #FFFFFF;">
        <h3 style="font-size: 1.2rem; margin-bottom: 16px;">Step 1: Recorded Scale Weight</h3>
        
        <div class="form-group">
          <label class="form-label">
            <span>Actual Collected Weight (kg)</span>
            <span style="font-size: 0.75rem; color: var(--ks-green-800);">Digital scale calibrated</span>
          </label>
          <input type="number" class="form-control" id="actualWeightInput" value="85" min="1" step="0.5" style="font-size: 1.2rem; font-weight: 700;">
        </div>

        <!-- Grade Split with Real-Time Sum Validation (Section 11) -->
        <h3 style="font-size: 1.2rem; margin: 24px 0 8px 0;">Step 2: Quality Grade Breakdown</h3>
        <p style="font-size: 0.82rem; color: var(--ks-text-secondary); margin-bottom: 16px;">
          Assign weight to each grade. Sum must exactly match actual collected weight.
        </p>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 12px;">
          <div class="form-group">
            <label class="form-label" style="color: var(--ks-green-900);">Grade A (Premium) - kg</label>
            <input type="number" class="form-control grade-input" id="gradeAInput" value="70" min="0" step="0.5">
          </div>
          <div class="form-group">
            <label class="form-label" style="color: var(--ks-marigold);">Grade B (Standard) - kg</label>
            <input type="number" class="form-control grade-input" id="gradeBInput" value="15" min="0" step="0.5">
          </div>
          <div class="form-group">
            <label class="form-label" style="color: #2980B9;">Grade C (Processing) - kg</label>
            <input type="number" class="form-control grade-input" id="gradeCInput" value="0" min="0" step="0.5">
          </div>
          <div class="form-group">
            <label class="form-label" style="color: var(--ks-terracotta);">Rejected (Unsafe) - kg</label>
            <input type="number" class="form-control grade-input" id="rejectedInput" value="0" min="0" step="0.5">
          </div>
        </div>

        <!-- Weight Sum Validation Banner -->
        <div id="sumValidationNotice" style="background: var(--ks-green-100); border: 1px solid var(--ks-green-200); padding: 10px 14px; border-radius: var(--ks-radius-md); font-size: 0.85rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <span id="sumValidationText">✓ Grade split total matches: <strong>85 kg / 85 kg</strong></span>
          <span id="sumValidationBadge" class="badge badge-pickup-verified">Valid</span>
        </div>

        <!-- Grade Guidance Panels (Section 11) -->
        <div style="background: var(--ks-cream-surface); border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-lg); padding: 18px; margin-bottom: 24px;">
          <h4 style="font-size: 0.95rem; margin-bottom: 10px; color: var(--ks-green-950);">Inspection Standards & Guidelines:</h4>
          
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem; line-height: 1.5;">
            <div>
              <strong style="color: var(--ks-green-800);">Grade A (Premium):</strong> Fresh, clean, firm, uniform size, zero visible defects. For supermarkets and hotels.
            </div>
            <div>
              <strong style="color: var(--ks-marigold);">Grade B (Standard):</strong> Fresh and usable with slight cosmetic marks or minor size variation. For restaurants & retail.
            </div>
            <div>
              <strong style="color: #2980B9;">Grade C (Processing):</strong> Irregular or very ripe, but safe. For food pulp and processing plants.
            </div>
            <div>
              <strong style="color: var(--ks-terracotta);">Rejected:</strong> Rotten, mouldy, pest-damaged or contaminated. Never added to pooled lot.
            </div>
          </div>
        </div>

        <!-- Quality Checklist (Section 11) -->
        <h3 style="font-size: 1.2rem; margin-bottom: 12px;">Step 3: Verification Checklist</h3>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
          <label style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; cursor: pointer;">
            <input type="checkbox" checked style="accent-color: var(--ks-green-700);">
            <span><strong>Freshness:</strong> Produce harvested within the last 12 hours.</span>
          </label>
          <label style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; cursor: pointer;">
            <input type="checkbox" checked style="accent-color: var(--ks-green-700);">
            <span><strong>Visible Damage:</strong> Crated properly without deep crush injuries.</span>
          </label>
          <label style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; cursor: pointer;">
            <input type="checkbox" checked style="accent-color: var(--ks-green-700);">
            <span><strong>Ripeness:</strong> Breaker to turning stage, suitable for transport.</span>
          </label>
          <label style="display: flex; align-items: center; gap: 10px; font-size: 0.88rem; cursor: pointer;">
            <input type="checkbox" checked style="accent-color: var(--ks-green-700);">
            <span><strong>Cleanliness:</strong> Washed with clean bore water, free of surface clay.</span>
          </label>
        </div>

        <!-- Photo Upload / Capture (Section 11) -->
        <h3 style="font-size: 1.2rem; margin-bottom: 8px;">Step 4: Produce Inspection Photos</h3>
        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <div style="width: 80px; height: 80px; border: 2px dashed var(--ks-green-400); border-radius: var(--ks-radius-md); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 0.75rem; color: var(--ks-green-800); cursor: pointer; text-align: center; padding: 4px;" id="mockPhotoCaptureBtn">
            <span style="font-size: 1.3rem;">📷</span>
            <span>Take Photo</span>
          </div>
          <img src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80" style="width: 80px; height: 80px; border-radius: var(--ks-radius-md); object-fit: cover; border: 1px solid var(--ks-cream-border);">
          <img src="https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200&auto=format&fit=crop&q=80" style="width: 80px; height: 80px; border-radius: var(--ks-radius-md); object-fit: cover; border: 1px solid var(--ks-cream-border);">
        </div>

        <!-- Note to Farmer -->
        <div class="form-group">
          <label class="form-label">Inspection Note for Farmer & Buyer</label>
          <textarea class="form-control" id="agentNotesInput" rows="2" style="font-size: 0.9rem;">15 kg moved to Grade B due to minor surface marks and size variation.</textarea>
        </div>

        <!-- Location Confirmation -->
        <div style="display: flex; align-items: center; justify-content: space-between; background: var(--ks-cream-surface); padding: 12px 16px; border-radius: var(--ks-radius-md); margin-bottom: 24px;">
          <div>
            <div style="font-size: 0.85rem; font-weight: 700;">Geesugonda Farm Gate Location</div>
            <div style="font-size: 0.75rem; color: var(--ks-text-secondary);">Lat: 17.9784, Lng: 79.6012 (Accuracy: 4m)</div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="pickupLiveGpsBtn">📍 Live GPS</button>
        </div>

        <!-- Terracotta Warning (Section 11) -->
        <div class="alert-terracotta" style="margin-bottom: 24px;">
          <span>⚠️</span>
          <div>
            <strong>Grade is based on visible pickup inspection.</strong> Farmers must approve any quantity or grade change before sale confirmation.
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary btn-lg" id="submitVerificationReportBtn" style="width: 100%;">
          Submit Verification to Farmer for Approval →
        </button>

      </form>

    </div>
  `;

  // Bind Grade Split Live Sum Verification
  const actualWeight = document.getElementById('actualWeightInput');
  const gradeA = document.getElementById('gradeAInput');
  const gradeB = document.getElementById('gradeBInput');
  const gradeC = document.getElementById('gradeCInput');
  const rejected = document.getElementById('rejectedInput');
  const notice = document.getElementById('sumValidationNotice');
  const text = document.getElementById('sumValidationText');
  const badge = document.getElementById('sumValidationBadge');
  const submitBtn = document.getElementById('submitVerificationReportBtn');

  function validateSplit() {
    const total = Number(actualWeight.value || 0);
    const sum = Number(gradeA.value || 0) + Number(gradeB.value || 0) + Number(gradeC.value || 0) + Number(rejected.value || 0);

    if (Math.abs(total - sum) < 0.01) {
      notice.style.background = 'var(--ks-green-100)';
      notice.style.borderColor = 'var(--ks-green-200)';
      text.innerHTML = `✓ Grade split matches: <strong>${sum} kg / ${total} kg</strong>`;
      badge.textContent = 'Valid';
      badge.className = 'badge badge-pickup-verified';
      submitBtn.disabled = false;
    } else {
      notice.style.background = 'var(--ks-terracotta-light)';
      notice.style.borderColor = 'var(--ks-terracotta-border)';
      text.innerHTML = `⚠️ Mismatch: Grades sum to <strong>${sum} kg</strong>, but total weight is <strong>${total} kg</strong> (Diff: ${Math.abs(total - sum)} kg)`;
      badge.textContent = 'Fix Split';
      badge.className = 'badge badge-terracotta';
      submitBtn.disabled = true;
    }
  }

  [actualWeight, gradeA, gradeB, gradeC, rejected].forEach(input => {
    input.addEventListener('input', validateSplit);
  });

  document.getElementById('mockPhotoCaptureBtn')?.addEventListener('click', () => {
    showToast('Camera active: Photo 3 captured and attached with metadata');
  });

  document.getElementById('pickupLiveGpsBtn')?.addEventListener('click', () => {
    showToast('GPS position updated with live device location (Lat: 17.9784, Lng: 79.6012)');
  });

  document.getElementById('agentVerificationForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await api.submitVerification({
        orderId: 'ORD-8921',
        farmerName: 'Ravi Kumar',
        collectedWeightKg: actualWeight.value,
        gradeA: gradeA.value,
        gradeB: gradeB.value,
        gradeC: gradeC.value,
        rejectedKg: rejected.value,
        notes: document.getElementById('agentNotesInput').value
      });

      showToast('Verification submitted! Transmitted to Ravi Kumar for mobile approval.');
      store.setState({ currentView: 'farmer' });
    } catch (err) {
      showToast(err.message, 'error');
    }
  });
}


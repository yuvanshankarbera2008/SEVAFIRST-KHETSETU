/* ==========================================================================
   KhetSetu (खेत सेतु) — Ask For Assistance Flow & Floating Button (Section 14)
   Stuck detection, 4-step bottom sheet, regional helper matching, assisted listing
   ========================================================================== */

import { api } from '../services/api.js';
import { store } from '../state/store.js';
import { t } from '../i18n/translations.js';
import { showToast } from './motion.js';

export function initAssistanceButton() {
  let existingBtn = document.getElementById('floatingAssistanceBtn');
  if (!existingBtn) {
    existingBtn = document.createElement('button');
    existingBtn.id = 'floatingAssistanceBtn';
    existingBtn.className = 'floating-assistance-btn';
    existingBtn.setAttribute('aria-label', 'Ask for assistance');
    document.body.appendChild(existingBtn);
  }

  existingBtn.innerHTML = `
    <span style="font-size: 1.4rem;">👋</span>
    <span id="assistanceBtnText">${t('assistance_btn_label')}</span>
  `;

  existingBtn.onclick = () => {
    store.hideStuckNudge();
    openAssistanceBottomSheet();
  };

  // Idle timer for stuck detection (20 seconds idle triggers gentle nudge)
  initStuckIdleDetector();
}

function initStuckIdleDetector() {
  let idleTimer;
  function resetTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      const state = store.getState();
      if (state.activeRole === 'farmer' && !state.isAssistanceOpen) {
        store.showStuckNudge();
        renderStuckNudge();
      }
    }, 20000); // 20s idle
  }

  window.addEventListener('mousemove', resetTimer, { passive: true });
  window.addEventListener('keypress', resetTimer, { passive: true });
  window.addEventListener('scroll', resetTimer, { passive: true });
  resetTimer();
}

export function renderStuckNudge() {
  let nudgeEl = document.getElementById('stuckNudgeTooltip');
  const { stuckNudgeVisible } = store.getState();

  if (!stuckNudgeVisible) {
    if (nudgeEl) nudgeEl.remove();
    return;
  }

  if (!nudgeEl) {
    nudgeEl = document.createElement('div');
    nudgeEl.id = 'stuckNudgeTooltip';
    nudgeEl.className = 'stuck-nudge';
    document.body.appendChild(nudgeEl);
  }

  nudgeEl.innerHTML = `
    <span style="font-size: 1.3rem;">💡</span>
    <div style="flex:1;">
      <strong>ఇబ్బందిగా ఉందా?</strong> ${t('stuck_nudge_text')}
    </div>
    <button id="closeNudgeBtn" style="background:none; border:none; cursor:pointer; font-weight:700; color:var(--ks-text-tertiary);">×</button>
  `;

  nudgeEl.onclick = (e) => {
    if (e.target.id === 'closeNudgeBtn') {
      store.hideStuckNudge();
      nudgeEl.remove();
      return;
    }
    store.hideStuckNudge();
    nudgeEl.remove();
    openAssistanceBottomSheet();
  };
}

/**
 * 4-Step Bottom Sheet Assistance Flow (Section 14)
 */
export function openAssistanceBottomSheet() {
  let sheetWrap = document.getElementById('assistanceSheetWrap');
  if (!sheetWrap) {
    sheetWrap = document.createElement('div');
    sheetWrap.id = 'assistanceSheetWrap';
    document.body.appendChild(sheetWrap);
  }

  let step = 1;
  const assistState = {
    category: 'List my produce',
    method: 'Call me back',
    language: 'Telugu',
    time: 'Now (Immediate)',
    phone: '+91 98765 43210'
  };

  function update() {
    sheetWrap.innerHTML = `
      <div class="modal-backdrop active bottom-sheet" id="assistBackdrop">
        <div class="modal-dialog" style="max-width: 620px; padding: 26px;">
          <div class="sheet-drag-handle"></div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.4rem;">🤝</span>
              <h3 style="font-size: 1.3rem;">రైతు సహాయ కేంద్రం / Assistance</h3>
            </div>
            <button id="closeAssistSheetBtn" style="background:none; border:none; font-size:1.6rem; cursor:pointer; color:var(--ks-text-tertiary);">×</button>
          </div>

          <div id="assistStepContent">
            ${renderStep(step)}
          </div>

        </div>
      </div>
    `;

    bindEvents();
  }

  function renderStep(s) {
    // Step 1: Category Tiles
    if (s === 1) {
      const categories = [
        { id: 'List my produce', icon: '📝', label: 'List my produce / పంట నమోదు' },
        { id: 'Set my price', icon: '🏷️', label: 'Set my price / ధర నిర్ణయం' },
        { id: 'Quality & grading', icon: '🔍', label: 'Quality & grading / నాణ్యతా పరీక్ష' },
        { id: 'Pickup & transport', icon: '🚚', label: 'Pickup & transport / పికప్ వివరాలు' },
        { id: 'Payments', icon: '💳', label: 'Payments / బ్యాంక్ ఖాతా' },
        { id: 'Something else', icon: '❓', label: 'Something else / ఇతర సహాయం' }
      ];

      return `
        <p style="font-weight: 600; color: var(--ks-green-950); margin-bottom: 12px;">
          1. ${t('help_what')}
        </p>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px;">
          ${categories.map(c => `
            <button class="btn btn-secondary ${assistState.category === c.id ? 'btn-primary' : ''}" data-cat="${c.id}"
                    style="height: 64px; justify-content: flex-start; text-align: left; padding: 10px 14px; font-size: 0.88rem;">
              <span style="font-size: 1.4rem;">${c.icon}</span>
              <span>${c.label}</span>
            </button>
          `).join('')}
        </div>
        <button class="btn btn-primary btn-lg" id="catNextBtn" style="width: 100%;">
          తదుపరి / Continue →
        </button>
      `;
    }

    // Step 2: Contact Method
    if (s === 2) {
      const methods = [
        { id: 'Call me back', icon: '📞', label: 'Call me back (ఫోన్ చేయండి)' },
        { id: 'Chat on WhatsApp', icon: '💬', label: 'Chat on WhatsApp (వాట్సాప్)' },
        { id: 'Visit me at my village', icon: '🏡', label: 'Visit me at my village (మా ఊరికి రండి)' },
        { id: 'Help me list my produce now', icon: '✨', label: 'Help me list my produce now (ఇప్పుడే నమోదు)' }
      ];

      return `
        <p style="font-weight: 600; color: var(--ks-green-950); margin-bottom: 12px;">
          2. ${t('help_how')}
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;">
          ${methods.map(m => `
            <button class="btn btn-secondary ${assistState.method === m.id ? 'btn-primary' : ''}" data-method="${m.id}"
                    style="justify-content: flex-start; padding: 14px 18px; font-size: 0.95rem;">
              <span style="font-size: 1.3rem;">${m.icon}</span>
              <span>${m.label}</span>
            </button>
          `).join('')}
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-secondary" id="backStep1Btn">← Back</button>
          <button class="btn btn-primary btn-lg" id="methodNextBtn" style="flex:1;">Continue to Preferences →</button>
        </div>
      `;
    }

    // Step 3: Preferences
    if (s === 3) {
      return `
        <p style="font-weight: 600; color: var(--ks-green-950); margin-bottom: 14px;">
          3. Confirm your contact details & preferred timing
        </p>
        <div class="form-group">
          <label class="form-label">Phone Number (Pre-filled)</label>
          <input type="text" class="form-control" id="asstPhone" value="${assistState.phone}">
        </div>
        <div class="form-group">
          <label class="form-label">Preferred Language</label>
          <select class="form-control" id="asstLang">
            <option selected>Telugu (తెలుగు)</option>
            <option>Hindi (हिन्दी)</option>
            <option>English</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">When would you like help?</label>
          <select class="form-control" id="asstTime">
            <option selected>Now (Immediate connection)</option>
            <option>Today Evening (4:00 PM - 6:00 PM)</option>
            <option>Tomorrow Morning (8:00 AM - 10:00 AM)</option>
          </select>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
          <button class="btn btn-secondary" id="backStep2Btn">← Back</button>
          <button class="btn btn-primary btn-lg" id="startMatchingBtn" style="flex:1;">
            Find Nearest Coordinator →
          </button>
        </div>
      `;
    }

    // Step 4: Regional Search Animation & Matched Helper Card (Section 14)
    if (s === 4) {
      const helper = api.helpers[0]; // Lakshmi (Local Coordinator, 3km away)
      return `
        <div style="text-align: center; padding: 12px 0;">
          <div style="width: 72px; height: 72px; border-radius: 50%; overflow: hidden; margin: 0 auto 12px auto; border: 3px solid var(--ks-green-600); box-shadow: var(--ks-shadow-md);">
            <img src="${helper.photo}" alt="${helper.name}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>

          <span class="badge badge-pickup-verified" style="margin-bottom: 6px;">✓ Coordinator Found Near You</span>
          <h3 style="font-size: 1.4rem; color: var(--ks-green-950);">${helper.name}</h3>
          <div style="font-size: 0.9rem; font-weight: 600; color: var(--ks-marigold);">${helper.role} (${helper.roleTelugu})</div>
          <div style="font-size: 0.82rem; color: var(--ks-text-secondary); margin-top: 2px;">
            ${helper.org} · 📍 ${helper.village} (3 km away)
          </div>

          <div style="background: var(--ks-cream-surface); border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-lg); padding: 14px; margin: 18px 0; font-size: 0.85rem; text-align: left; line-height: 1.6;">
            <div>⭐ <strong>Rating:</strong> 4.9/5 · Helped <strong>${helper.helpedFarmersCount} farmers</strong> this month</div>
            <div>🗣️ <strong>Languages:</strong> ${helper.languages.join(', ')}</div>
            <div>📱 <strong>Mobile:</strong> ${helper.phone}</div>
          </div>

          <!-- Request Tracker Timeline (Section 14) -->
          <div style="background: #FFFFFF; border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-md); padding: 12px; margin-bottom: 20px;">
            <div style="font-size: 0.78rem; font-weight: 700; color: var(--ks-text-tertiary); text-align: left; margin-bottom: 8px;">
              REQUEST STATUS TRACKER:
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
              <span style="color: var(--ks-green-700); font-weight: 700;">✓ Request Sent</span>
              <span style="color: var(--ks-green-700); font-weight: 700;">✓ Helper Assigned</span>
              <span style="color: var(--ks-marigold); font-weight: 700;">● Call in Progress</span>
              <span style="color: var(--ks-text-tertiary);">Listing Approved</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px;">
            <a href="tel:${helper.phone}" class="btn btn-primary btn-lg" style="flex:1; text-decoration:none;">
              📞 Call Lakshmi Now
            </a>
            <button class="btn btn-secondary btn-lg" id="closeAssistDoneBtn" style="flex:1;">
              Done ✓
            </button>
          </div>
        </div>
      `;
    }
  }

  function bindEvents() {
    document.getElementById('closeAssistSheetBtn')?.addEventListener('click', () => {
      sheetWrap.innerHTML = '';
    });

    document.querySelectorAll('[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        assistState.category = btn.getAttribute('data-cat');
        step = 2;
        update();
      });
    });

    document.getElementById('catNextBtn')?.addEventListener('click', () => {
      step = 2;
      update();
    });

    document.querySelectorAll('[data-method]').forEach(btn => {
      btn.addEventListener('click', () => {
        assistState.method = btn.getAttribute('data-method');
        step = 3;
        update();
      });
    });

    document.getElementById('backStep1Btn')?.addEventListener('click', () => {
      step = 1;
      update();
    });

    document.getElementById('methodNextBtn')?.addEventListener('click', () => {
      step = 3;
      update();
    });

    document.getElementById('backStep2Btn')?.addEventListener('click', () => {
      step = 2;
      update();
    });

    document.getElementById('startMatchingBtn')?.addEventListener('click', async () => {
      showToast('Searching for nearest coordinator in Geesugonda & Warangal...');
      await api.createAssistanceRequest(assistState);
      step = 4;
      update();
    });

    document.getElementById('closeAssistDoneBtn')?.addEventListener('click', () => {
      sheetWrap.innerHTML = '';
      showToast('Lakshmi has received your request and will assist you shortly!');
    });
  }

  update();
}


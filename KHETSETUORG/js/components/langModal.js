/* ==========================================================================
   KhetSetu (खेत सेतु) — Language Selection Modals (Section 5)
   Header Dropdown/Sheet & First-Time Full-Screen Welcome Selector
   ========================================================================== */

import { LANGUAGES } from '../config/languages.js';
import { store } from '../state/store.js';
import { showToast } from './motion.js';

export function renderLangModal() {
  let modalWrap = document.getElementById('langModalWrap');
  if (!modalWrap) {
    modalWrap = document.createElement('div');
    modalWrap.id = 'langModalWrap';
    document.body.appendChild(modalWrap);
  }

  const { currentLang, isLangModalOpen } = store.getState();

  modalWrap.innerHTML = `
    <div class="modal-backdrop bottom-sheet ${isLangModalOpen ? 'active' : ''}" id="langBackdrop">
      <div class="modal-dialog" style="padding: 24px;">
        <div class="sheet-drag-handle"></div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 style="font-size: 1.25rem;">భాషను ఎంచుకోండి / Choose Language</h3>
          <button id="closeLangModalBtn" style="background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--ks-text-tertiary);">×</button>
        </div>
        <p style="font-size: 0.88rem; color: var(--ks-text-secondary); margin-bottom: 20px;">
          Select your preferred language. Telugu is default for the Warangal cluster.
        </p>

        <div class="lang-tiles-grid" style="grid-template-columns: repeat(2, 1fr);">
          ${LANGUAGES.map(l => `
            <button class="lang-tile ${l.code === currentLang ? 'active' : ''}" data-lang-code="${l.code}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="lang-tile-native">${l.nativeName}</span>
                ${l.code === currentLang ? '<span style="color:var(--ks-green-800); font-weight:800;">✓</span>' : ''}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="lang-tile-english">${l.englishName}</span>
                <span style="font-size: 0.7rem; background: var(--ks-cream-border); padding: 2px 6px; border-radius: var(--ks-radius-full);">${l.badge}</span>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Attach event handlers
  document.getElementById('closeLangModalBtn')?.addEventListener('click', () => {
    store.setState({ isLangModalOpen: false });
  });

  document.getElementById('langBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'langBackdrop') {
      store.setState({ isLangModalOpen: false });
    }
  });

  modalWrap.querySelectorAll('.lang-tile').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-lang-code');
      store.setState({ currentLang: code, isLangModalOpen: false });
      showToast(`Language updated to ${btn.querySelector('.lang-tile-native').textContent}`);
    });
  });
}

/**
 * First-Time Full-Screen Welcome Picker (Section 5)
 * Triggered when a farmer taps "I grow produce"
 */
export function renderFirstTimeLangModal(onComplete) {
  let welcomeWrap = document.getElementById('firstTimeLangWrap');
  if (!welcomeWrap) {
    welcomeWrap = document.createElement('div');
    welcomeWrap.id = 'firstTimeLangWrap';
    document.body.appendChild(welcomeWrap);
  }

  const { currentLang } = store.getState();

  welcomeWrap.innerHTML = `
    <div class="modal-backdrop active" id="firstTimeBackdrop" style="background: rgba(13, 35, 22, 0.85); backdrop-filter: blur(8px);">
      <div class="modal-dialog" style="max-width: 680px; padding: 36px 28px; text-align: center;">
        
        <!-- Logo & Bridge Icon -->
        <div style="width: 56px; height: 56px; background: linear-gradient(135deg, var(--ks-green-800), var(--ks-green-600)); border-radius: var(--ks-radius-lg); margin: 0 auto 16px auto; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.8rem; box-shadow: var(--ks-shadow-md);">
          🌾
        </div>

        <h2 style="font-size: 1.6rem; color: var(--ks-green-950); margin-bottom: 8px;">
          స్వాగతం / Welcome to KhetSetu
        </h2>
        
        <p style="font-size: 1.05rem; font-weight: 600; color: var(--ks-marigold); margin-bottom: 6px;">
          Choose your language / మీ భాషను ఎంచుకోండి / अपनी भाषा चुनें
        </p>
        <p style="font-size: 0.88rem; color: var(--ks-text-secondary); margin-bottom: 24px;">
          Built for Bharat. Audio assistance is available in all regional languages.
        </p>

        <!-- 2x4 Colorful Language Grid -->
        <div class="lang-tiles-grid" style="grid-template-columns: repeat(2, 1fr); margin-bottom: 28px;">
          ${LANGUAGES.map(l => `
            <button class="lang-tile ${l.code === currentLang ? 'active' : ''}" data-first-lang="${l.code}"
                    style="border-width: 2px; padding: 18px; text-align: left; background: ${l.code === currentLang ? 'var(--ks-green-100)' : '#FFFFFF'};">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 1.35rem; font-weight: 700; color: var(--ks-green-950);">${l.nativeName}</span>
                ${l.code === currentLang ? '<span style="color:var(--ks-green-800); font-weight:800; font-size: 1.2rem;">✓</span>' : ''}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.85rem; color: var(--ks-text-secondary); font-weight: 500;">${l.englishName}</span>
                <span style="font-size: 0.72rem; color: var(--ks-saffron); font-weight: 600;">${l.region}</span>
              </div>
            </button>
          `).join('')}
        </div>

        <!-- Confirm CTA -->
        <button id="confirmFirstLangBtn" class="btn btn-primary btn-lg" style="width: 100%; font-size: 1.1rem;">
          కొనసాగించండి / Continue with selected language →
        </button>
      </div>
    </div>
  `;

  let selectedCode = currentLang;

  welcomeWrap.querySelectorAll('[data-first-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      welcomeWrap.querySelectorAll('[data-first-lang]').forEach(b => {
        b.classList.remove('active');
        b.style.background = '#FFFFFF';
      });
      btn.classList.add('active');
      btn.style.background = 'var(--ks-green-100)';
      selectedCode = btn.getAttribute('data-first-lang');
    });
  });

  document.getElementById('confirmFirstLangBtn')?.addEventListener('click', () => {
    store.setState({
      currentLang: selectedCode,
      hasChosenLanguageFirstTime: true
    });
    localStorage.setItem('khetsetu_first_time_lang', 'true');
    welcomeWrap.remove();
    if (onComplete) onComplete(selectedCode);
  });
}


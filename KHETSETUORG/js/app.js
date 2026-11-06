/* ==========================================================================
   KhetSetu (खेत सेतु) — Main Application Entry Point & Router
   "Direct connections. Better decisions. Fairer markets."
   ========================================================================== */

import { store } from './state/store.js';
import { renderHeader } from './components/header.js';
import { renderHomeView } from './components/homeView.js';
import { renderBuyerMarketplace, renderCartDrawer } from './components/buyerView.js';
import { renderFarmerDashboard } from './components/farmerView.js';
import { renderPickupAgentView } from './components/pickupAgentView.js';
import { renderCoordinatorView } from './components/coordinatorView.js';
import { renderLoginView, renderFarmerSignup, renderBuyerSignup } from './components/authViews.js';
import { renderEnamSection } from './components/enamSection.js';
import { renderLangModal } from './components/langModal.js';
import { initAssistanceButton, openAssistanceBottomSheet } from './components/assistanceModal.js';
import { showToast } from './components/motion.js';
import { t } from './i18n/translations.js';

class App {
  constructor() {
    this.root = document.getElementById('appRoot');
    this.currentView = null;
    this.currentLang = null;
  }

  init() {
    // Expose globals for safety across templates & events
    window.store = store;
    window.showToast = showToast;
    window.openAssistanceBottomSheet = openAssistanceBottomSheet;

    // 1. Initial render of persistent layout components
    renderHeader();
    initAssistanceButton();
    renderLangModal();
    renderCartDrawer();

    // 2. Subscribe to reactive state updates
    store.subscribe((state) => {
      renderHeader();
      renderLangModal();
      renderCartDrawer();

      // Update floating assistance button text when language changes
      const asstBtnText = document.getElementById('assistanceBtnText');
      if (asstBtnText) {
        asstBtnText.textContent = t('assistance_btn_label');
      }

      // Only re-route if the view or language actually changed!
      if (state.currentView !== this.currentView || state.currentLang !== this.currentLang) {
        this.route(state);
      }
    });

    // 3. Handle Browser Back/Forward & Hash Changes
    window.addEventListener('hashchange', () => this.handleHashChange());
    this.handleHashChange();

    // 4. Initial view mount
    this.route(store.getState());

    // 5. Skip link handler
    document.getElementById('skipToMarketLink')?.addEventListener('click', (e) => {
      e.preventDefault();
      store.setState({ currentView: 'marketplace' });
    });
  }

  handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'marketplace') {
      store.setState({ currentView: 'marketplace' });
    } else if (hash === 'enam') {
      store.setState({ currentView: 'enam' });
    } else if (hash === 'farmer') {
      store.setState({ activeRole: 'farmer', currentView: 'farmer' });
    } else if (hash === 'buyer') {
      store.setState({ activeRole: 'buyer', currentView: 'buyer' });
    } else if (hash === 'pickup') {
      store.setState({ activeRole: 'pickup', currentView: 'pickup' });
    } else if (hash === 'coordinator') {
      store.setState({ activeRole: 'coordinator', currentView: 'coordinator' });
    } else if (hash === 'login') {
      store.setState({ currentView: 'login' });
    } else if (hash === 'signup-farmer') {
      store.setState({ currentView: 'signup-farmer' });
    } else if (hash === 'signup-buyer') {
      store.setState({ currentView: 'signup-buyer' });
    } else if (!hash) {
      store.setState({ currentView: 'home' });
    }
  }

  route(state) {
    const view = state.currentView;
    if (!this.root) return;

    this.currentView = view;
    this.currentLang = state.currentLang;

    // Smooth cross-fade transition without layout jumps (Section 2)
    this.root.style.opacity = '0';
    this.root.style.transition = 'opacity 180ms cubic-bezier(0.22, 1, 0.36, 1)';

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Update farmer mode class on body for larger accessible text/icons
      if (view === 'farmer' || state.activeRole === 'farmer') {
        document.body.classList.add('farmer-mode');
        document.getElementById('floatingAssistanceBtn')?.style.setProperty('display', 'flex');
      } else {
        document.body.classList.remove('farmer-mode');
        // Assistance button is also accessible on home and other views
      }

      switch (view) {
        case 'home':
          renderHomeView('appRoot');
          break;
        case 'marketplace':
          renderBuyerMarketplace('appRoot');
          break;
        case 'farmer':
          renderFarmerDashboard('appRoot');
          break;
        case 'buyer':
          renderBuyerMarketplace('appRoot');
          break;
        case 'pickup':
          renderPickupAgentView('appRoot');
          break;
        case 'coordinator':
          renderCoordinatorView('appRoot');
          break;
        case 'login':
          renderLoginView('appRoot');
          break;
        case 'signup-farmer':
          renderFarmerSignup('appRoot');
          break;
        case 'signup-buyer':
          renderBuyerSignup('appRoot');
          break;
        case 'enam':
          renderEnamSection('appRoot');
          break;
        default:
          renderHomeView('appRoot');
      }

      this.root.style.opacity = '1';
    }, 120);
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});


/* ==========================================================================
   KhetSetu (खेत सेतु) — Header & Navigation Component (Section 3)
   ========================================================================== */

import { LANGUAGES } from '../config/languages.js';
import { store } from '../state/store.js';
import { t } from '../i18n/translations.js';

export function renderHeader() {
  const headerContainer = document.getElementById('mainHeader');
  if (!headerContainer) return;

  const { currentView, activeRole, currentLang, cart } = store.getState();
  const currentLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
  const cartItemCount = cart.reduce((count, item) => count + 1, 0);

  headerContainer.innerHTML = `
    <!-- Top Announcement Strip & Demo Perspective Switcher -->
    <div style="background: var(--ks-green-950); color: #FFFFFF; font-size: 0.8rem; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="color: var(--ks-marigold);">★</span>
          <span><strong>KhetSetu Pilot:</strong> Warangal Cluster, Telangana. "Built for Bharat".</span>
        </div>

        <!-- Role Preview Switcher (Section 3) -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.76rem; color: rgba(255,255,255,0.7);">Switch Prototype View:</span>
          <div class="demo-role-switcher" id="roleSwitcherContainer">
            <button class="demo-role-btn ${activeRole === 'farmer' && currentView === 'farmer' ? 'active' : ''}" data-role-view="farmer">Farmer</button>
            <button class="demo-role-btn ${activeRole === 'buyer' && currentView === 'buyer' ? 'active' : ''}" data-role-view="buyer">Buyer</button>
            <button class="demo-role-btn ${activeRole === 'pickup' && currentView === 'pickup' ? 'active' : ''}" data-role-view="pickup">Pickup Agent</button>
            <button class="demo-role-btn ${activeRole === 'coordinator' && currentView === 'coordinator' ? 'active' : ''}" data-role-view="coordinator">Coordinator</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="ks-header">
      <div class="container">
        <div class="header-inner">
          
          <!-- Brand Wordmark -->
          <a href="#" class="brand-link" id="navLogoBtn">
            <div class="brand-icon">
              <!-- Bridge / Seedling SVG Icon -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19C4 13 8 9 12 9C16 9 20 13 20 19"/>
                <path d="M12 9V19"/>
                <path d="M2 19H22"/>
                <circle cx="12" cy="5" r="2" fill="#E58E26" stroke="none" />
              </svg>
            </div>
            <div class="brand-title">
              <span class="brand-name">KhetSetu</span>
              <span class="brand-hindi">खेत सेतु</span>
            </div>
          </a>

          <!-- Navigation Links -->
          <nav class="header-nav" id="desktopNav">
            <a href="#howItWorks" class="nav-link" data-nav="how-it-works">${t('nav_how_it_works')}</a>
            <a href="#forFarmers" class="nav-link" data-nav="farmers">${t('nav_farmers')}</a>
            <a href="#forBuyers" class="nav-link" data-nav="buyers">${t('nav_buyers')}</a>
            <a href="#forPickup" class="nav-link" data-nav="pickup">${t('nav_pickup')}</a>
            <a href="#marketplace" class="nav-link ${currentView === 'marketplace' ? 'active' : ''}" data-nav="marketplace">${t('nav_marketplace')}</a>
            <a href="#enam" class="nav-link ${currentView === 'enam' ? 'active' : ''}" data-nav="enam">KhetSetu & e-NAM</a>
          </nav>

          <!-- Right Action Controls -->
          <div style="display: flex; align-items: center; gap: 12px;">
            
            <!-- Language Pill Switcher (Section 5) -->
            <button class="lang-pill-btn" id="headerLangBtn" title="Switch Language">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>${currentLangObj.nativeName}</span>
              <span style="font-size: 0.7rem; color: var(--ks-text-tertiary);">▼</span>
            </button>

            <!-- Cart Trigger Button with badge -->
            <button class="btn btn-secondary btn-sm" id="cartTriggerBtn" style="position: relative; padding: 8px 12px;">
              <span>🛒</span>
              ${cartItemCount > 0 ? `
                <span style="position: absolute; top: -6px; right: -6px; background: var(--ks-marigold); color: #fff; font-size: 0.72rem; font-weight: 800; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.15);">
                  ${cartItemCount}
                </span>
              ` : ''}
            </button>

            <!-- Sign In / Dashboard CTA -->
            <button class="btn btn-outline btn-sm" id="headerSignInBtn">
              ${t('nav_signin')}
            </button>
            <button class="btn btn-primary btn-sm" id="headerGetStartedBtn">
              ${t('nav_get_started')}
            </button>

            <!-- Mobile Hamburger Toggle -->
            <button class="mobile-nav-toggle" id="mobileMenuBtn" aria-label="Toggle Navigation">
              ☰
            </button>
          </div>

        </div>
      </div>
    </header>

    <!-- Mobile Drawer Navigation -->
    <div id="mobileDrawer" style="display: none; background: #FFFFFF; border-bottom: 1px solid var(--ks-cream-border); padding: 16px 20px;">
      <div style="display: flex; flex-direction: column; gap: 14px;">
        <a href="#howItWorks" class="nav-link" data-mobile-nav="how-it-works">${t('nav_how_it_works')}</a>
        <a href="#forFarmers" class="nav-link" data-mobile-nav="farmers">${t('nav_farmers')}</a>
        <a href="#forBuyers" class="nav-link" data-mobile-nav="buyers">${t('nav_buyers')}</a>
        <a href="#forPickup" class="nav-link" data-mobile-nav="pickup">${t('nav_pickup')}</a>
        <a href="#marketplace" class="nav-link" data-mobile-nav="marketplace">${t('nav_marketplace')}</a>
        <a href="#enam" class="nav-link" data-mobile-nav="enam">KhetSetu & e-NAM</a>
        <div style="height: 1px; background: var(--ks-cream-border); margin: 6px 0;"></div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-outline btn-sm" style="flex:1;" id="mobileSignInBtn">${t('nav_signin')}</button>
          <button class="btn btn-primary btn-sm" style="flex:1;" id="mobileGetStartedBtn">${t('nav_get_started')}</button>
        </div>
      </div>
    </div>
  `;

  // Attach Header Events
  document.getElementById('navLogoBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setState({ currentView: 'home' });
  });

  document.getElementById('headerLangBtn')?.addEventListener('click', () => {
    store.setState({ isLangModalOpen: true });
  });

  document.getElementById('cartTriggerBtn')?.addEventListener('click', () => {
    store.setState({ isCartOpen: true });
  });

  document.getElementById('headerSignInBtn')?.addEventListener('click', () => {
    store.setState({ currentView: 'login' });
  });

  document.getElementById('mobileSignInBtn')?.addEventListener('click', () => {
    store.setState({ currentView: 'login' });
    closeMobileDrawer();
  });

  document.getElementById('headerGetStartedBtn')?.addEventListener('click', () => {
    store.setState({ currentView: 'signup-farmer' });
  });

  document.getElementById('mobileGetStartedBtn')?.addEventListener('click', () => {
    store.setState({ currentView: 'signup-farmer' });
    closeMobileDrawer();
  });

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  mobileBtn?.addEventListener('click', () => {
    const isVisible = mobileDrawer.style.display === 'block';
    mobileDrawer.style.display = isVisible ? 'none' : 'block';
  });

  function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.style.display = 'none';
  }

  // Demo Role View Switcher
  document.querySelectorAll('[data-role-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.getAttribute('data-role-view');
      store.setState({
        activeRole: role,
        currentView: role
      });
    });
  });

  // Nav link click events
  document.querySelectorAll('[data-nav], [data-mobile-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      const target = el.getAttribute('data-nav') || el.getAttribute('data-mobile-nav');
      if (target === 'marketplace') {
        e.preventDefault();
        store.setState({ currentView: 'marketplace' });
      } else if (target === 'enam') {
        e.preventDefault();
        store.setState({ currentView: 'enam' });
      } else if (target === 'farmers') {
        e.preventDefault();
        store.setState({ activeRole: 'farmer', currentView: 'farmer' });
      } else if (target === 'buyers') {
        e.preventDefault();
        store.setState({ activeRole: 'buyer', currentView: 'buyer' });
      } else if (target === 'pickup') {
        e.preventDefault();
        store.setState({ activeRole: 'pickup', currentView: 'pickup' });
      } else if (target === 'how-it-works') {
        e.preventDefault();
        if (store.getState().currentView !== 'home') {
          store.setState({ currentView: 'home' });
          setTimeout(() => {
            document.getElementById('howItWorks')?.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        } else {
          document.getElementById('howItWorks')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
      closeMobileDrawer();
    });
  });
}


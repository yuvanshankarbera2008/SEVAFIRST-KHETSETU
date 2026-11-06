/* ==========================================================================
   KhetSetu (खेत सेतु) — Central State Store
   Reactive State Management, Event Dispatching & Local Storage Sync
   ========================================================================== */

import { DEFAULT_LANGUAGE } from '../config/languages.js';
import { DEMO_CONFIG } from '../config/demoData.js';

class Store {
  constructor() {
    const savedLang = localStorage.getItem('khetsetu_lang') || DEFAULT_LANGUAGE;
    const hasChosenLang = localStorage.getItem('khetsetu_first_time_lang') === 'true';

    this.state = {
      currentView: 'home', // 'home' | 'marketplace' | 'farmer' | 'buyer' | 'pickup' | 'coordinator' | 'login' | 'signup-farmer' | 'signup-buyer' | 'enam'
      activeRole: 'farmer', // demo role preview: 'farmer' | 'buyer' | 'pickup' | 'coordinator'
      currentLang: savedLang,
      hasChosenLanguageFirstTime: hasChosenLang,
      currentUser: null, // logged in user session
      cart: [
        // Default sample cart as requested in Section 20
        {
          listingId: 'STK-001',
          farmerName: 'Ravi Kumar',
          crop: 'Tomato',
          variety: 'Vaishnavi Semi-determinate',
          quantityKg: 40,
          pricePerKg: 25,
          total: 1000
        },
        {
          listingId: 'STK-002',
          farmerName: 'Lakshmi Narayana',
          crop: 'Green Chilli',
          variety: 'G4 Teja Hot',
          quantityKg: 20,
          pricePerKg: 48,
          total: 960
        }
      ],
      isCartOpen: false,
      isAssistanceOpen: false,
      isLangModalOpen: false,
      isFirstTimeLangOpen: false,
      stuckNudgeVisible: false,
      validationFailuresCount: 0,
      activeOrderToApprove: null,
      filters: {
        crop: 'all',
        grade: 'all',
        maxPrice: 60,
        maxTds: 250,
        sort: 'distance',
        mode: 'farmer' // 'farmer' | 'pooled'
      }
    };

    this.listeners = [];
  }

  getState() {
    return this.state;
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    if (partialState.currentLang) {
      localStorage.setItem('khetsetu_lang', partialState.currentLang);
      document.documentElement.lang = partialState.currentLang;
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Cart operations
  addToCart(item) {
    const existingIndex = this.state.cart.findIndex(i => i.listingId === item.listingId);
    let newCart = [...this.state.cart];

    if (existingIndex > -1) {
      newCart[existingIndex].quantityKg = item.quantityKg;
      newCart[existingIndex].total = item.quantityKg * item.pricePerKg;
    } else {
      newCart.push({
        ...item,
        total: item.quantityKg * item.pricePerKg
      });
    }

    this.setState({ cart: newCart, isCartOpen: true });
  }

  removeFromCart(listingId) {
    const newCart = this.state.cart.filter(i => i.listingId !== listingId);
    this.setState({ cart: newCart });
  }

  updateCartQuantity(listingId, newQuantity) {
    const newCart = this.state.cart.map(item => {
      if (item.listingId === listingId) {
        return {
          ...item,
          quantityKg: newQuantity,
          total: newQuantity * item.pricePerKg
        };
      }
      return item;
    });
    this.setState({ cart: newCart });
  }

  clearCart() {
    this.setState({ cart: [] });
  }

  getCartTotal() {
    return this.state.cart.reduce((sum, item) => sum + item.total, 0);
  }

  // Assistance stuck detection
  registerValidationFailure() {
    const count = this.state.validationFailuresCount + 1;
    this.setState({ validationFailuresCount: count });
    if (count >= 2) {
      this.setState({ stuckNudgeVisible: true });
    }
  }

  showStuckNudge() {
    this.setState({ stuckNudgeVisible: true });
  }

  hideStuckNudge() {
    this.setState({ stuckNudgeVisible: false });
  }
}

export const store = new Store();


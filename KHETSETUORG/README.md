# KhetSetu (खेत सेतु) — Direct Farm-to-Organisation Marketplace

> **“Direct connections. Better decisions. Fairer markets.” — Built for Bharat.**

KhetSetu is a responsive, mobile-first marketplace prototype connecting rural farmers with verified institutional purchasers (supermarkets, hotels, hostels, restaurants, food processors, NGOs) across India. 

The application is architected with a clean separation of concerns: state store, mock service layer, responsive design system, and multi-lingual i18n support.

---

## 🌾 Core Value Proposition & Problem Solved

1. **Farmer-Led Pricing:** Farmers set their own asking prices. Buyers and collection agents cannot alter the price.
2. **Pooled Shared Pickup:** Neighboring smallholders are clustered into a single vehicle route, saving up to ₹1,850 in transport per trip.
3. **Farm-Gate Quality Verification:** Verified digital weights, TDS readings, and grade breakdowns (Grade A, B, C) recorded at the farm gate with mandatory **farmer approval** before any order is finalized.
4. **Accessible "Built for Bharat" Design:** 8 Indian languages (Telugu default, Hindi, English, Tamil, Marathi, Bengali, Kannada, Gujarati), large 44px+ tap targets, audio assistance placeholders, and on-ground local coordinator/FPO support.
5. **e-NAM Mandi Synergy:** Complements the National Agriculture Market (e-NAM) by handling the first-mile farm gate (pooling, village pickup, institutional sales) while mandis handle electronic auction trading.

---

## 📁 Project Architecture & File Structure

```text
c:\Users\yuvan\Desktop\KHETSETUORG\
├── index.html                 # Main HTML5 entry point with Open Graph metadata & landmarks
├── README.md                  # Comprehensive technical documentation & run guide
├── css/
│   ├── design-system.css      # Section 1 & 2: Palette, typography, Indic fonts, CSS variables
│   ├── components.css         # Buttons, cards, badges, 3-part quantity bars, stepper/slider, modals
│   └── pages.css              # Hero section, bridge SVG, live map, auth views, e-NAM tables, footer
└── js/
    ├── app.js                 # Router, view mounting, hash transitions & application bootstrap
    ├── config/
    │   ├── languages.js       # Section 5: 8 languages configuration with native scripts
    │   └── demoData.js        # Section 6, 14, 18, 20: Pre-filled credentials, crops, pooled lots, e-NAM stats
    ├── i18n/
    │   └── translations.js    # Section 5: Full Telugu, English & Hindi dictionaries with t() helper
    ├── services/
    │   └── api.js             # Section 19: Mock API service layer with 24+ async methods & business logic
    ├── state/
    │   └── store.js           # Central reactive state management, cart operations, stuck detection
    └── components/
        ├── motion.js          # Section 2: IntersectionObserver reveals, count-up numbers, toasts
        ├── liveMap.js         # Section 15: Mock animated map with interpolated vehicle movement
        ├── header.js          # Section 3: Wordmark, role switcher, language pill, navigation
        ├── langModal.js       # Section 5: Language dropdown sheet & first-time 2x4 welcome modal
        ├── authViews.js       # Section 6: Pre-filled login & multi-step farmer/buyer signup
        ├── farmerView.js      # Section 7 & 12: My Stock, Add stock drawer, orders inbox, farmer approval
        ├── buyerView.js       # Section 8, 10, 13: Marketplace, synced quantity selector, cart drawer
        ├── pickupAgentView.js # Section 11: Farm-gate inspection, sum check, photo audits, grade guidelines
        ├── coordinatorView.js # Section 14: Assistance queue, assisted listing wizard, helper metrics
        ├── assistanceModal.js # Section 14: Floating pulsing button, stuck detector, 4-step sheet
        ├── homeView.js        # Section 4, 16, 17, 21: Hero, bridge motif, 6 steps, 11 features, footer
        └── enamSection.js     # Section 18: In-depth e-NAM comparison, 8-point table, policy synergy
```

---

## 🚀 How to Run the Prototype

Because KhetSetu is built with modern ES modules, it can be run instantly with the zero-dependency built-in static server:

1. **Option 1: Built-in Node.js server (Recommended)**
   ```bash
   node server.js
   # or
   npm start
   ```
   Open `http://localhost:3000` in any web browser.

2. **Option 2: VS Code 1-Click Launch (F5)**
   Press **F5** in VS Code to trigger the pre-configured `Start KhetSetu Server` launch task.

3. **Option 3: Any other local static server**
   ```bash
   # Python
   python -m http.server 3000

   # Or npx
   npx serve .
   ```

---

## 🔑 Pre-filled Demo Accounts (Golden Rule)

All login and sign-up screens load with real default values enabled:

* **Farmer Account (Ravi Kumar, Geesugonda):**
  - Mobile: `+91 98765 43210`
  - Demo OTP: `123456`
  - Farmer ID: `DEMO-FARMER-0001`
  - Registration No: `FRM-TG-2026-004512`
  - Scheme: PM-KISAN (`DEMO-PMK-778812`)
* **Buyer Account (FreshKart Retail):**
  - Email: `buyer@freshkart-demo.in`
  - Password: `Demo@1234`
  - Contact: Anita Reddy (Procurement Manager, Warangal)
* **Privacy Standard:** Aadhaar numbers are formatted as `XXXX XXXX XXXX` during entry and masked as `XXXX XXXX 0123`. Full Aadhaar is never stored in `localStorage`, session storage, or URLs.

---

## 🛠️ Switching Prototype Perspectives

Use the top **Role Switcher** bar in the header to jump across perspectives instantly:
- **Farmer View:** Manage harvest, view 3-part stock bars (Sold / Reserved / Available), review incoming orders, approve pickup inspection.
- **Buyer View:** Browse farmer listings & pooled lots, use the synced quantity slider/stepper, and submit multi-farmer cart orders.
- **Pickup Agent View:** Conduct farm-gate digital inspection, verify weight sum against grades (A/B/C/Rejected), attach photo proof.
- **Coordinator View:** View regional assistance requests from low-literacy farmers, initiate assisted listings with voice OTP approval.


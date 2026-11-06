/* ==========================================================================
   KhetSetu (खेत सेतु) — Login and Sign-Up Screens (Section 6)
   Pre-filled Golden Rule, Multi-Step Wizards, Aadhaar Privacy Masking
   ========================================================================== */

import { DEMO_CONFIG } from '../config/demoData.js';
import { api } from '../services/api.js';
import { store } from '../state/store.js';
import { showToast } from './motion.js';
import { openAssistanceBottomSheet } from './assistanceModal.js';

export function renderLoginView(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const defaultRoleTab = 'farmer'; // 'farmer' | 'buyer'

  container.innerHTML = `
    <div class="auth-page-wrapper">
      <div class="auth-card-container">
        
        <!-- Form Side -->
        <div class="auth-form-side">
          
          <!-- Demo Mode Alert Banner (Section 6) -->
          <div class="alert-demo-mode">
            <div>
              <strong>Demo mode:</strong> Sample details are pre-filled. Click <strong>Sign in</strong> to proceed, or edit any field.
            </div>
            <button class="btn btn-sm btn-secondary" id="refillDemoLoginBtn" style="flex-shrink:0;">Use demo account</button>
          </div>

          <!-- Role Switcher Tabs -->
          <div style="display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 2px solid var(--ks-cream-border); padding-bottom: 12px;">
            <button class="btn ${defaultRoleTab === 'farmer' ? 'btn-primary' : 'btn-secondary'} btn-sm" id="loginTabFarmer" style="flex:1;">
              రైతు లాగిన్ / I’m a Farmer
            </button>
            <button class="btn ${defaultRoleTab === 'buyer' ? 'btn-primary' : 'btn-secondary'} btn-sm" id="loginTabBuyer" style="flex:1;">
              కొనుగోలుదారు / I’m a Buyer
            </button>
          </div>

          <!-- Farmer Login Form Form -->
          <div id="farmerLoginFormBlock">
            <h2 style="font-size: 1.5rem; margin-bottom: 6px;">రైతు లాగిన్ / Farmer Sign In</h2>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); margin-bottom: 20px;">
              Enter your mobile number or Farmer ID. Demo credentials already filled.
            </p>

            <div style="display: flex; gap: 10px; margin-bottom: 16px;">
              <button class="btn btn-sm btn-outline active" id="loginMethodMobileBtn">Mobile + OTP</button>
              <button class="btn btn-sm btn-outline" id="loginMethodFarmerIdBtn">Farmer ID</button>
            </div>

            <div class="form-group" id="farmerMobileGroup">
              <label class="form-label">
                <span>Mobile Number / మొబైల్ నంబర్</span>
                <span style="font-size: 0.75rem; color: var(--ks-green-700);">Pre-filled demo</span>
              </label>
              <div style="display: flex; gap: 10px;">
                <input type="text" class="form-control" id="farmerMobileInput" value="${DEMO_CONFIG.farmerAccount.mobile}" style="font-weight: 600;">
                <button class="btn btn-secondary" id="resendOtpBtn" style="white-space:nowrap;">Send OTP</button>
              </div>
              <span class="form-helper">Demo OTP is valid for 30s</span>
            </div>

            <div class="form-group" id="farmerFarmerIdGroup" style="display: none;">
              <label class="form-label">Farmer Registration ID</label>
              <input type="text" class="form-control" id="farmerIdInput" value="${DEMO_CONFIG.farmerAccount.farmerId}">
            </div>

            <div class="form-group">
              <label class="form-label">Enter 6-digit OTP</label>
              <input type="text" class="form-control" id="farmerOtpInput" value="${DEMO_CONFIG.farmerAccount.otp}" maxlength="6" style="letter-spacing: 4px; font-weight: 700;">
              <span class="form-helper">Pre-filled with demo code: 123456</span>
            </div>

            <button class="btn btn-primary btn-lg" id="submitFarmerLoginBtn" style="width: 100%; margin-top: 10px;">
              లాగిన్ అవ్వండి / Sign In as Farmer →
            </button>
            
            <div style="text-align: center; margin-top: 16px;">
              <a href="#" id="clearLoginDataBtn" style="font-size: 0.82rem; color: var(--ks-text-tertiary); text-decoration: underline;">Clear demo data</a>
            </div>
          </div>

          <!-- Buyer Login Form (Hidden by default) -->
          <div id="buyerLoginFormBlock" style="display: none;">
            <h2 style="font-size: 1.5rem; margin-bottom: 6px;">Buyer Organisation Login</h2>
            <p style="font-size: 0.88rem; color: var(--ks-text-secondary); margin-bottom: 20px;">
              Sign in to procure verified pooled stock directly from farm-gate.
            </p>

            <div class="form-group">
              <label class="form-label">Work Email Address</label>
              <input type="email" class="form-control" id="buyerEmailInput" value="${DEMO_CONFIG.buyerAccount.email}">
            </div>

            <div class="form-group">
              <label class="form-label">
                <span>Password</span>
                <a href="#" style="font-size: 0.78rem; color: var(--ks-green-700);">Forgot password?</a>
              </label>
              <div style="position: relative;">
                <input type="password" class="form-control" id="buyerPasswordInput" value="${DEMO_CONFIG.buyerAccount.password}">
                <button type="button" id="togglePasswordBtn" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--ks-text-tertiary);">👁️</button>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
              <input type="checkbox" id="keepSignedIn" checked style="accent-color: var(--ks-green-700);">
              <label for="keepSignedIn" style="font-size: 0.85rem; color: var(--ks-text-secondary);">Keep me signed in</label>
            </div>

            <button class="btn btn-primary btn-lg" id="submitBuyerLoginBtn" style="width: 100%;">
              Sign In as Buyer Organisation →
            </button>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--ks-cream-border); font-size: 0.88rem; text-align: center;">
            Don’t have an account yet? 
            <a href="#" id="goToSignupBtn" style="color: var(--ks-marigold); font-weight: 700; text-decoration: none;">Create an account</a>
          </div>

          <!-- Privacy & Demo Disclaimer (Section 6) -->
          <div style="margin-top: 16px; font-size: 0.74rem; color: var(--ks-text-tertiary); line-height: 1.4;">
            🔒 <strong>Demo prototype:</strong> All details shown are sample data for the Warangal pilot. Do not enter real Aadhaar numbers or personal information. Full Aadhaar is never stored or transmitted.
          </div>

        </div>

        <!-- Illustration Side -->
        <div class="auth-illustration-side">
          <div>
            <div style="display: inline-block; background: rgba(229, 142, 38, 0.2); color: var(--ks-marigold); padding: 4px 12px; border-radius: var(--ks-radius-full); font-size: 0.8rem; font-weight: 700; margin-bottom: 16px;">
              BUILT FOR BHARAT
            </div>
            <h3 style="font-size: 2rem; color: #FFFFFF; margin-bottom: 16px; line-height: 1.2;">
              From soil to shelf, <span style="color: var(--ks-marigold);">together.</span>
            </h3>
            <p style="color: rgba(255, 255, 255, 0.85); font-size: 0.95rem; line-height: 1.6;">
              KhetSetu unites rural farmers with verified institutional purchasers. Quality is checked at the farm gate, and farmers always retain 100% control over their price.
            </p>
          </div>

          <!-- Quick Test Accounts Switcher Panel (Section 6) -->
          <div class="demo-accounts-panel" style="background: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.2); color: #fff;">
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--ks-marigold); margin-bottom: 8px;">
              ⚡ QUICK FILL DEMO ACCOUNTS
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.82rem;">
              <button class="btn btn-sm btn-secondary" id="quickFillFarmerBtn" style="justify-content: space-between;">
                <span>👨‍🌾 Farmer: Ravi (+91 98765 43210)</span>
                <span style="font-weight: 700;">Fill</span>
              </button>
              <button class="btn btn-sm btn-secondary" id="quickFillBuyerBtn" style="justify-content: space-between;">
                <span>🏢 Buyer: FreshKart Retail</span>
                <span style="font-weight: 700;">Fill</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  // Attach Login View Handlers
  const farmerBlock = document.getElementById('farmerLoginFormBlock');
  const buyerBlock = document.getElementById('buyerLoginFormBlock');
  const tabFarmer = document.getElementById('loginTabFarmer');
  const tabBuyer = document.getElementById('loginTabBuyer');

  tabFarmer.addEventListener('click', () => {
    tabFarmer.className = 'btn btn-primary btn-sm';
    tabBuyer.className = 'btn btn-secondary btn-sm';
    farmerBlock.style.display = 'block';
    buyerBlock.style.display = 'none';
  });

  tabBuyer.addEventListener('click', () => {
    tabBuyer.className = 'btn btn-primary btn-sm';
    tabFarmer.className = 'btn btn-secondary btn-sm';
    farmerBlock.style.display = 'none';
    buyerBlock.style.display = 'block';
  });

  // Mobile / Farmer ID Sub-tabs
  const btnMobile = document.getElementById('loginMethodMobileBtn');
  const btnFarmerId = document.getElementById('loginMethodFarmerIdBtn');
  const mobileGroup = document.getElementById('farmerMobileGroup');
  const idGroup = document.getElementById('farmerFarmerIdGroup');

  btnMobile.addEventListener('click', () => {
    btnMobile.classList.add('active');
    btnFarmerId.classList.remove('active');
    mobileGroup.style.display = 'flex';
    idGroup.style.display = 'none';
  });

  btnFarmerId.addEventListener('click', () => {
    btnFarmerId.classList.add('active');
    btnMobile.classList.remove('active');
    mobileGroup.style.display = 'none';
    idGroup.style.display = 'flex';
  });

  // Toggle Password Show/Hide
  document.getElementById('togglePasswordBtn')?.addEventListener('click', () => {
    const pwdInput = document.getElementById('buyerPasswordInput');
    if (!pwdInput) return;
    const isPassword = pwdInput.type === 'password';
    pwdInput.type = isPassword ? 'text' : 'password';
    document.getElementById('togglePasswordBtn').textContent = isPassword ? '🙈' : '👁️';
  });

  // Resend OTP with 30-second timer (Section 6)
  let resendCountdown = 0;
  let resendInterval = null;
  document.getElementById('resendOtpBtn')?.addEventListener('click', async () => {
    if (resendCountdown > 0) return;
    const mobile = document.getElementById('farmerMobileInput').value;
    try {
      const res = await api.sendOtp(mobile);
      showToast(res.message);
      resendCountdown = 30;
      const resendBtn = document.getElementById('resendOtpBtn');
      resendBtn.disabled = true;
      resendBtn.textContent = `Resend in ${resendCountdown}s`;
      resendInterval = setInterval(() => {
        resendCountdown--;
        if (resendCountdown <= 0) {
          clearInterval(resendInterval);
          resendBtn.disabled = false;
          resendBtn.textContent = 'Send OTP';
        } else {
          resendBtn.textContent = `Resend in ${resendCountdown}s`;
        }
      }, 1000);
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // Refill / Clear
  document.getElementById('refillDemoLoginBtn')?.addEventListener('click', () => {
    document.getElementById('farmerMobileInput').value = DEMO_CONFIG.farmerAccount.mobile;
    document.getElementById('farmerOtpInput').value = DEMO_CONFIG.farmerAccount.otp;
    document.getElementById('buyerEmailInput').value = DEMO_CONFIG.buyerAccount.email;
    document.getElementById('buyerPasswordInput').value = DEMO_CONFIG.buyerAccount.password;
    showToast('Demo account credentials refilled');
  });

  document.getElementById('clearLoginDataBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('farmerMobileInput').value = '';
    document.getElementById('farmerOtpInput').value = '';
    document.getElementById('buyerEmailInput').value = '';
    document.getElementById('buyerPasswordInput').value = '';
    showToast('Demo form inputs cleared', 'warning');
  });

  // Submit Farmer
  document.getElementById('submitFarmerLoginBtn')?.addEventListener('click', async () => {
    const mobile = document.getElementById('farmerMobileInput').value;
    const otp = document.getElementById('farmerOtpInput').value;
    try {
      const res = await api.loginFarmer(mobile, otp);
      showToast(`Welcome back, ${res.user.name}!`);
      store.setState({ currentUser: res.user, activeRole: 'farmer', currentView: 'farmer' });
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  // Submit Buyer
  document.getElementById('submitBuyerLoginBtn')?.addEventListener('click', async () => {
    const email = document.getElementById('buyerEmailInput').value;
    const pwd = document.getElementById('buyerPasswordInput').value;
    try {
      const res = await api.loginBuyer(email, pwd);
      showToast(`Welcome back, ${res.user.orgName}!`);
      store.setState({ currentUser: res.user, activeRole: 'buyer', currentView: 'buyer' });
    } catch (err) {
      showToast(err.message, 'error');
    }
  });

  document.getElementById('quickFillFarmerBtn')?.addEventListener('click', () => {
    tabFarmer.click();
    document.getElementById('farmerMobileInput').value = DEMO_CONFIG.farmerAccount.mobile;
    document.getElementById('farmerOtpInput').value = DEMO_CONFIG.farmerAccount.otp;
    showToast('Pre-filled Farmer Ravi Kumar');
  });

  document.getElementById('quickFillBuyerBtn')?.addEventListener('click', () => {
    tabBuyer.click();
    document.getElementById('buyerEmailInput').value = DEMO_CONFIG.buyerAccount.email;
    document.getElementById('buyerPasswordInput').value = DEMO_CONFIG.buyerAccount.password;
    showToast('Pre-filled Buyer FreshKart Retail');
  });

  document.getElementById('goToSignupBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    store.setState({ currentView: 'signup-farmer' });
  });
}

/**
 * Farmer Multi-Step Sign-Up (5 steps) (Section 6)
 */
export function renderFarmerSignup(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let currentStep = 1;
  const totalSteps = 5;

  // Form State Pre-filled (Golden rule)
  const formState = {
    mobile: DEMO_CONFIG.farmerAccount.mobile,
    otp: DEMO_CONFIG.farmerAccount.otp,
    aadhaarNumber: DEMO_CONFIG.farmerAccount.aadhaarFormatted,
    aadhaarConsent: true,
    farmerId: DEMO_CONFIG.farmerAccount.registrationNo,
    schemeName: 'PM-KISAN',
    schemeId: DEMO_CONFIG.farmerAccount.schemeId,
    name: DEMO_CONFIG.farmerAccount.name,
    village: DEMO_CONFIG.farmerAccount.village,
    district: DEMO_CONFIG.farmerAccount.district,
    state: DEMO_CONFIG.farmerAccount.state,
    crops: DEMO_CONFIG.farmerAccount.crops,
    land: DEMO_CONFIG.farmerAccount.land,
    language: DEMO_CONFIG.farmerAccount.language,
    termsAccepted: true
  };

  function saveCurrentStepInputs() {
    if (currentStep === 1) {
      const mob = document.getElementById('fMobile');
      const otp = document.getElementById('fOtp');
      if (mob) formState.mobile = mob.value;
      if (otp) formState.otp = otp.value;
    } else if (currentStep === 2) {
      const aadh = document.getElementById('fAadhaar');
      const consent = document.getElementById('fAadhaarConsent');
      if (aadh) formState.aadhaarNumber = aadh.value;
      if (consent) formState.aadhaarConsent = consent.checked;
    } else if (currentStep === 3) {
      const fid = document.getElementById('fFarmerId');
      const scheme = document.getElementById('fSchemeName');
      const sid = document.getElementById('fSchemeId');
      if (fid) formState.farmerId = fid.value;
      if (scheme) formState.schemeName = scheme.value;
      if (sid) formState.schemeId = sid.value;
    } else if (currentStep === 4) {
      const nm = document.getElementById('fName');
      const vil = document.getElementById('fVillage');
      const crp = document.getElementById('fCrops');
      const lnd = document.getElementById('fLand');
      if (nm) formState.name = nm.value;
      if (vil) formState.village = vil.value;
      if (crp) formState.crops = crp.value;
      if (lnd) formState.land = lnd.value;
    } else if (currentStep === 5) {
      const terms = document.getElementById('fTerms');
      if (terms) formState.termsAccepted = terms.checked;
    }
  }

  function updateView() {
    container.innerHTML = `
      <div class="auth-page-wrapper">
        <div class="auth-card-container">
          
          <div class="auth-form-side">
            <!-- Demo Alert -->
            <div class="alert-demo-mode">
              <div><strong>Demo mode:</strong> Sample details are pre-filled. Click <strong>Continue</strong> to proceed, or edit any field.</div>
              <button class="btn btn-sm btn-secondary" id="resetFarmerSignupBtn" style="flex-shrink:0;">Use demo account</button>
            </div>

            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <span class="badge badge-farmer-declared">రైతు నమోదు / Farmer Onboarding</span>
                <h2 style="font-size: 1.45rem; margin-top: 4px;">Step ${currentStep} of ${totalSteps}</h2>
              </div>
              <button class="btn btn-outline btn-sm" id="switchBuyerSignupBtn">Switch to Buyer</button>
            </div>

            <!-- Progress Tracker -->
            <div class="wizard-progress-bar">
              <div class="wizard-progress-track">
                <div class="wizard-progress-fill" style="width: ${((currentStep - 1) / (totalSteps - 1)) * 100}%;"></div>
              </div>
              ${[1, 2, 3, 4, 5].map(step => `
                <div class="wizard-step-node ${step === currentStep ? 'active' : step < currentStep ? 'completed' : ''}">
                  ${step < currentStep ? '✓' : step}
                </div>
              `).join('')}
            </div>

            <!-- Step Content -->
            <div id="stepBody">
              ${renderStepContent(currentStep)}
            </div>

            <!-- Navigation Buttons -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 28px; gap: 14px;">
              ${currentStep > 1 ? `
                <button class="btn btn-secondary" id="stepPrevBtn">← Back</button>
              ` : `
                <a href="#" id="alreadyHaveAccountBtn" style="font-size: 0.88rem; color: var(--ks-green-800); font-weight: 600;">Already registered? Sign in</a>
              `}

              ${currentStep < totalSteps ? `
                <button class="btn btn-primary btn-lg" id="stepNextBtn" style="flex:1;">Continue to Step ${currentStep + 1} →</button>
              ` : `
                <button class="btn btn-primary btn-lg" id="submitCreateFarmerAccountBtn" style="flex:1;">Create my account (స్వాగతం) ✓</button>
              `}
            </div>

            <!-- Privacy Note -->
            <div style="margin-top: 20px; font-size: 0.74rem; color: var(--ks-text-tertiary); line-height: 1.4;">
              🔒 Aadhaar verification is format-only in demo mode. Only the last 4 digits are retained. Full Aadhaar is never saved or shared with buyers.
            </div>

          </div>

          <!-- Illustration Side -->
          <div class="auth-illustration-side">
            <div>
              <div style="display: inline-block; background: rgba(229, 142, 38, 0.2); color: var(--ks-marigold); padding: 4px 12px; border-radius: var(--ks-radius-full); font-size: 0.8rem; font-weight: 700; margin-bottom: 16px;">
                FARMER EMPOWERMENT
              </div>
              <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 14px;">
                Direct farm-gate sales with pooled transport.
              </h3>
              <p style="color: rgba(255, 255, 255, 0.85); font-size: 0.92rem; line-height: 1.6;">
                Save on individual transport costs. Get quality verified right at your village collection point, with full control over asking price.
              </p>
            </div>

            <div class="demo-accounts-panel" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #fff;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--ks-marigold);">PRE-FILLED DEMO APPLICANT:</span>
              <div style="margin-top: 6px; font-size: 0.85rem;">
                <strong>Ravi Kumar</strong> (Geesugonda, Warangal)<br>
                Crop: Tomato & Chilli · 2.5 Acres · PM-KISAN
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    bindStepEvents();
  }

  function renderStepContent(step) {
    if (step === 1) {
      return `
        <h3 style="margin-bottom: 14px;">Step 1: Mobile & Verification</h3>
        <div class="form-group">
          <label class="form-label">Mobile Number</label>
          <input type="text" class="form-control" id="fMobile" value="${formState.mobile}">
          <span class="form-helper">An OTP has been sent to this number</span>
        </div>
        <div class="form-group">
          <label class="form-label">Enter 6-digit OTP</label>
          <input type="text" class="form-control" id="fOtp" value="${formState.otp}" maxlength="6">
          <span class="form-helper">Pre-filled with 123456</span>
        </div>
      `;
    }

    if (step === 2) {
      return `
        <h3 style="margin-bottom: 14px;">Step 2: Identity Verification (Aadhaar)</h3>
        <div class="form-group">
          <label class="form-label">
            <span>Aadhaar Number (12 digits)</span>
            <span class="badge badge-neutral">Sample Aadhaar for demo</span>
          </label>
          <input type="text" class="form-control" id="fAadhaar" value="${formState.aadhaarNumber}">
          <span class="form-helper">Your Aadhaar number is never shown to buyers.</span>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 14px; background: var(--ks-cream-surface); padding: 12px; border-radius: var(--ks-radius-md);">
          <input type="checkbox" id="fAadhaarConsent" ${formState.aadhaarConsent ? 'checked' : ''} style="margin-top: 3px; accent-color: var(--ks-green-700);">
          <label for="fAadhaarConsent" style="font-size: 0.85rem; color: var(--ks-text-secondary);">
            "I agree to use my Aadhaar number only to verify my identity on KhetSetu."
          </label>
        </div>
      `;
    }

    if (step === 3) {
      const isOther = formState.schemeName === 'Other';
      return `
        <h3 style="margin-bottom: 14px;">Step 3: Farmer ID & Scheme Details</h3>
        <div class="form-group">
          <label class="form-label">Farmer Registration / Farmer ID</label>
          <input type="text" class="form-control" id="fFarmerId" value="${formState.farmerId}">
        </div>
        <div class="form-group">
          <label class="form-label">Applicable Farmer Scheme</label>
          <select class="form-control" id="fSchemeName">
            <option value="PM-KISAN" ${formState.schemeName === 'PM-KISAN' ? 'selected' : ''}>PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)</option>
            <option value="Rythu Bharosa" ${formState.schemeName === 'Rythu Bharosa' ? 'selected' : ''}>Rythu Bharosa (Telangana State Farmer Scheme)</option>
            <option value="AgriStack" ${formState.schemeName === 'AgriStack' ? 'selected' : ''}>AgriStack Farmer ID</option>
            <option value="Kisan Credit Card" ${formState.schemeName === 'Kisan Credit Card' ? 'selected' : ''}>Kisan Credit Card (KCC)</option>
            <option value="Other" ${isOther ? 'selected' : ''}>Other / Not yet registered</option>
          </select>
        </div>
        <div class="form-group" id="schemeIdWrap" style="${isOther ? 'display:none;' : ''}">
          <label class="form-label">Scheme Beneficiary ID</label>
          <input type="text" class="form-control" id="fSchemeId" value="${formState.schemeId}">
        </div>
        <div id="unregisteredNotice" style="${isOther ? 'display:block;' : 'display:none;'} background: var(--ks-marigold-light); border: 1px solid var(--ks-marigold-border); padding: 14px; border-radius: var(--ks-radius-md); font-size: 0.88rem; margin-top: 10px;">
          <div>No problem. A local coordinator or FPO can help you register.</div>
          <button type="button" class="btn btn-secondary btn-sm" id="signupAskHelpBtn" style="margin-top: 8px;">
            👋 Ask for assistance
          </button>
        </div>
      `;
    }

    if (step === 4) {
      return `
        <h3 style="margin-bottom: 14px;">Step 4: Farm & Crop Profile</h3>
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" class="form-control" id="fName" value="${formState.name}">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Village / మండలం</label>
            <input type="text" class="form-control" id="fVillage" value="${formState.village}">
          </div>
          <div class="form-group">
            <label class="form-label">District & State</label>
            <input type="text" class="form-control" id="fDistrict" value="${formState.district}, ${formState.state}">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Primary Crops</label>
            <input type="text" class="form-control" id="fCrops" value="${formState.crops}">
          </div>
          <div class="form-group">
            <label class="form-label">Total Land Holding</label>
            <input type="text" class="form-control" id="fLand" value="${formState.land}">
          </div>
        </div>
      `;
    }

    if (step === 5) {
      const cleanDigits = (formState.aadhaarNumber || '').replace(/\D/g, '');
      const last4 = cleanDigits.slice(-4) || '0123';
      return `
        <h3 style="margin-bottom: 14px;">Step 5: Review & Confirm Details</h3>
        <div style="background: var(--ks-cream-surface); border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-lg); padding: 18px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--ks-cream-border); padding-bottom: 8px;">
            <strong style="color: var(--ks-green-950); font-size: 1.15rem;">${formState.name}</strong>
            <button class="btn btn-sm btn-outline" data-edit-farmer-step="4">Edit Profile</button>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.6;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>📱 <strong>Mobile:</strong> ${formState.mobile}</span>
              <button class="btn btn-sm btn-link" data-edit-farmer-step="1" style="font-size:0.75rem;">Edit</button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>🔒 <strong>Aadhaar:</strong> XXXX XXXX ${last4} <span class="badge badge-pickup-verified" style="margin-left: 6px;">Verified (demo)</span></span>
              <button class="btn btn-sm btn-link" data-edit-farmer-step="2" style="font-size:0.75rem;">Edit</button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>📄 <strong>Farmer Registry:</strong> ${formState.farmerId} · Scheme: ${formState.schemeName} (${formState.schemeId || 'N/A'})</span>
              <button class="btn btn-sm btn-link" data-edit-farmer-step="3" style="font-size:0.75rem;">Edit</button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>📍 <strong>Location:</strong> ${formState.village}, ${formState.district} (${formState.state})</span>
              <button class="btn btn-sm btn-link" data-edit-farmer-step="4" style="font-size:0.75rem;">Edit</button>
            </div>
            <div>🌾 <strong>Crops & Land:</strong> ${formState.crops} · ${formState.land}</div>
          </div>
        </div>

        <div style="display: flex; align-items: flex-start; gap: 8px;">
          <input type="checkbox" id="fTerms" ${formState.termsAccepted ? 'checked' : ''} style="margin-top: 3px; accent-color: var(--ks-green-700);">
          <label for="fTerms" style="font-size: 0.85rem; color: var(--ks-text-secondary);">
            I agree to the KhetSetu Terms of Service. I confirm that I retain sole authority to set my asking price.
          </label>
        </div>
      `;
    }
  }

  function bindStepEvents() {
    // Scheme dropdown dynamic behavior (Section 6)
    const schemeSelect = document.getElementById('fSchemeName');
    if (schemeSelect) {
      schemeSelect.addEventListener('change', (e) => {
        formState.schemeName = e.target.value;
        const schemeIdWrap = document.getElementById('schemeIdWrap');
        const unregNotice = document.getElementById('unregisteredNotice');
        if (e.target.value === 'Other') {
          if (schemeIdWrap) schemeIdWrap.style.display = 'none';
          if (unregNotice) unregNotice.style.display = 'block';
        } else {
          if (schemeIdWrap) schemeIdWrap.style.display = 'block';
          if (unregNotice) unregNotice.style.display = 'none';
        }
      });
    }

    // "Ask for assistance" button inside unregistered notice
    document.getElementById('signupAskHelpBtn')?.addEventListener('click', () => {
      openAssistanceBottomSheet();
    });

    // Review step edit buttons
    document.querySelectorAll('[data-edit-farmer-step]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        saveCurrentStepInputs();
        currentStep = parseInt(btn.getAttribute('data-edit-farmer-step'), 10);
        updateView();
      });
    });

    document.getElementById('stepPrevBtn')?.addEventListener('click', () => {
      if (currentStep > 1) {
        saveCurrentStepInputs();
        currentStep--;
        updateView();
      }
    });

    document.getElementById('stepNextBtn')?.addEventListener('click', async () => {
      saveCurrentStepInputs();
      if (currentStep === 2) {
        try {
          await api.verifyAadhaar(formState.aadhaarNumber);
        } catch (err) {
          showToast(err.message, 'error');
          store.registerValidationFailure();
          return;
        }
      }
      currentStep++;
      updateView();
    });

    document.getElementById('submitCreateFarmerAccountBtn')?.addEventListener('click', async () => {
      saveCurrentStepInputs();
      try {
        const res = await api.registerFarmer(formState);
        showToast(`Welcome to KhetSetu, ${res.user.name}!`);
        store.setState({ currentUser: res.user, activeRole: 'farmer', currentView: 'farmer' });
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    document.getElementById('resetFarmerSignupBtn')?.addEventListener('click', () => {
      formState.mobile = DEMO_CONFIG.farmerAccount.mobile;
      formState.otp = DEMO_CONFIG.farmerAccount.otp;
      formState.aadhaarNumber = DEMO_CONFIG.farmerAccount.aadhaarFormatted;
      formState.farmerId = DEMO_CONFIG.farmerAccount.registrationNo;
      formState.schemeName = 'PM-KISAN';
      formState.schemeId = DEMO_CONFIG.farmerAccount.schemeId;
      formState.name = DEMO_CONFIG.farmerAccount.name;
      formState.village = DEMO_CONFIG.farmerAccount.village;
      formState.district = DEMO_CONFIG.farmerAccount.district;
      formState.crops = DEMO_CONFIG.farmerAccount.crops;
      formState.land = DEMO_CONFIG.farmerAccount.land;
      updateView();
      showToast('Form refilled with demo data');
    });

    document.getElementById('switchBuyerSignupBtn')?.addEventListener('click', () => {
      store.setState({ currentView: 'signup-buyer' });
    });

    document.getElementById('alreadyHaveAccountBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      store.setState({ currentView: 'login' });
    });
  }

  updateView();
}

/**
 * Buyer Sign-Up (4 Steps) (Section 6)
 */
export function renderBuyerSignup(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let currentStep = 1;
  const totalSteps = 4;

  const buyerState = {
    name: DEMO_CONFIG.buyerAccount.name,
    designation: DEMO_CONFIG.buyerAccount.designation,
    email: DEMO_CONFIG.buyerAccount.email,
    mobile: DEMO_CONFIG.buyerAccount.mobile,
    otp: DEMO_CONFIG.buyerAccount.otp,
    password: DEMO_CONFIG.buyerAccount.password,
    orgName: DEMO_CONFIG.buyerAccount.orgName,
    orgType: DEMO_CONFIG.buyerAccount.orgType,
    address: DEMO_CONFIG.buyerAccount.address,
    gstin: DEMO_CONFIG.buyerAccount.gstin,
    needs: DEMO_CONFIG.buyerAccount.needs,
    aadhaarNumber: DEMO_CONFIG.buyerAccount.aadhaarFormatted,
    aadhaarConsent: true,
    termsAccepted: true
  };

  function saveBuyerStepInputs() {
    if (currentStep === 1) {
      const nm = document.getElementById('bName');
      const des = document.getElementById('bDesignation');
      const em = document.getElementById('bEmail');
      const pwd = document.getElementById('bPassword');
      if (nm) buyerState.name = nm.value;
      if (des) buyerState.designation = des.value;
      if (em) buyerState.email = em.value;
      if (pwd) buyerState.password = pwd.value;
    } else if (currentStep === 2) {
      const onm = document.getElementById('bOrgName');
      const otyp = document.getElementById('bOrgType');
      const gst = document.getElementById('bGstin');
      const nds = document.getElementById('bNeeds');
      const addr = document.getElementById('bAddress');
      if (onm) buyerState.orgName = onm.value;
      if (otyp) buyerState.orgType = otyp.value;
      if (gst) buyerState.gstin = gst.value;
      if (nds) buyerState.needs = nds.value;
      if (addr) buyerState.address = addr.value;
    } else if (currentStep === 3) {
      const aadh = document.getElementById('bAadhaar');
      const consent = document.getElementById('bAadhaarConsent');
      if (aadh) buyerState.aadhaarNumber = aadh.value;
      if (consent) buyerState.aadhaarConsent = consent.checked;
    } else if (currentStep === 4) {
      const terms = document.getElementById('bTerms');
      if (terms) buyerState.termsAccepted = terms.checked;
    }
  }

  function updateView() {
    container.innerHTML = `
      <div class="auth-page-wrapper">
        <div class="auth-card-container">
          
          <div class="auth-form-side">
            <div class="alert-demo-mode">
              <div><strong>Demo mode:</strong> Sample details are pre-filled. Click <strong>Continue</strong> to proceed, or edit any field.</div>
              <button class="btn btn-sm btn-secondary" id="resetBuyerSignupBtn" style="flex-shrink:0;">Use demo account</button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <div>
                <span class="badge badge-pickup-verified">Buyer Organisation Onboarding</span>
                <h2 style="font-size: 1.45rem; margin-top: 4px;">Step ${currentStep} of ${totalSteps}</h2>
              </div>
              <button class="btn btn-outline btn-sm" id="switchToFarmerSignupBtn">Switch to Farmer</button>
            </div>

            <!-- Progress Tracker -->
            <div class="wizard-progress-bar">
              <div class="wizard-progress-track">
                <div class="wizard-progress-fill" style="width: ${((currentStep - 1) / (totalSteps - 1)) * 100}%;"></div>
              </div>
              ${[1, 2, 3, 4].map(step => `
                <div class="wizard-step-node ${step === currentStep ? 'active' : step < currentStep ? 'completed' : ''}">
                  ${step < currentStep ? '✓' : step}
                </div>
              `).join('')}
            </div>

            <!-- Content -->
            <div id="buyerStepBody">
              ${renderBuyerStep(currentStep)}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 28px; gap: 14px;">
              ${currentStep > 1 ? `
                <button class="btn btn-secondary" id="buyerPrevBtn">← Back</button>
              ` : `
                <a href="#" id="buyerAlreadyRegisteredBtn" style="font-size: 0.88rem; color: var(--ks-green-800); font-weight: 600;">Already registered? Sign in</a>
              `}

              ${currentStep < totalSteps ? `
                <button class="btn btn-primary btn-lg" id="buyerNextBtn" style="flex:1;">Continue to Step ${currentStep + 1} →</button>
              ` : `
                <button class="btn btn-primary btn-lg" id="submitCreateBuyerBtn" style="flex:1;">Create buyer account ✓</button>
              `}
            </div>
          </div>

          <div class="auth-illustration-side">
            <div>
              <div style="display: inline-block; background: rgba(229, 142, 38, 0.2); color: var(--ks-marigold); padding: 4px 12px; border-radius: var(--ks-radius-full); font-size: 0.8rem; font-weight: 700; margin-bottom: 16px;">
                INSTITUTIONAL BUYERS
              </div>
              <h3 style="font-size: 1.8rem; color: #fff; margin-bottom: 14px;">
                Verified quality, single pooled delivery.
              </h3>
              <p style="color: rgba(255, 255, 255, 0.85); font-size: 0.92rem; line-height: 1.6;">
                Procure directly from clustered farmers with transparent TDS, grade split, and digital proof-of-pickup.
              </p>
            </div>
            <div class="demo-accounts-panel" style="background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #fff;">
              <span style="font-size: 0.8rem; font-weight: 700; color: var(--ks-marigold);">PRE-FILLED DEMO BUYER:</span>
              <div style="margin-top: 6px; font-size: 0.85rem;">
                <strong>FreshKart Retail</strong> (Supermarket Chain)<br>
                Anita Reddy · Procurement Manager · Warangal
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    bindBuyerEvents();
  }

  function renderBuyerStep(step) {
    if (step === 1) {
      return `
        <h3 style="margin-bottom: 14px;">Step 1: Account & Credentials</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-control" id="bName" value="${buyerState.name}">
          </div>
          <div class="form-group">
            <label class="form-label">Designation</label>
            <input type="text" class="form-control" id="bDesignation" value="${buyerState.designation}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Work Email</label>
          <input type="email" class="form-control" id="bEmail" value="${buyerState.email}">
        </div>
        <div class="form-group">
          <label class="form-label">
            <span>Password</span>
            <span style="color: var(--ks-status-live); font-size: 0.78rem; font-weight: 700;">Strength: Strong</span>
          </label>
          <input type="password" class="form-control" id="bPassword" value="${buyerState.password}">
        </div>
      `;
    }

    if (step === 2) {
      return `
        <h3 style="margin-bottom: 14px;">Step 2: Organisation Details</h3>
        <div class="form-group">
          <label class="form-label">Organisation Name</label>
          <input type="text" class="form-control" id="bOrgName" value="${buyerState.orgName}">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Organisation Type</label>
            <select class="form-control" id="bOrgType">
              <option ${buyerState.orgType === 'Supermarket' ? 'selected' : ''}>Supermarket</option>
              <option ${buyerState.orgType === 'Hotel' ? 'selected' : ''}>Hotel</option>
              <option ${buyerState.orgType === 'Hostel' ? 'selected' : ''}>Hostel</option>
              <option ${buyerState.orgType === 'Restaurant' ? 'selected' : ''}>Restaurant</option>
              <option ${buyerState.orgType === 'Food processor' ? 'selected' : ''}>Food processor</option>
              <option ${buyerState.orgType === 'NGO' ? 'selected' : ''}>NGO</option>
              <option ${buyerState.orgType === 'Other' ? 'selected' : ''}>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">GSTIN (Optional)</label>
            <input type="text" class="form-control" id="bGstin" value="${buyerState.gstin}">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Delivery Hub / Address</label>
          <input type="text" class="form-control" id="bAddress" value="${buyerState.address}">
        </div>
        <div class="form-group">
          <label class="form-label">Monthly Needs & Volume</label>
          <input type="text" class="form-control" id="bNeeds" value="${buyerState.needs}">
        </div>
      `;
    }

    if (step === 3) {
      return `
        <h3 style="margin-bottom: 14px;">Step 3: Authorised Person Identity</h3>
        <div class="form-group">
          <label class="form-label">
            <span>Authorised Person's Aadhaar</span>
            <span class="badge badge-neutral">Sample Aadhaar for demo</span>
          </label>
          <input type="text" class="form-control" id="bAadhaar" value="${buyerState.aadhaarNumber}">
          <span class="form-helper">Format validation only. Privacy strictly maintained.</span>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 8px; margin-top: 14px; background: var(--ks-cream-surface); padding: 12px; border-radius: var(--ks-radius-md);">
          <input type="checkbox" id="bAadhaarConsent" ${buyerState.aadhaarConsent ? 'checked' : ''} style="margin-top: 3px; accent-color: var(--ks-green-700);">
          <label for="bAadhaarConsent" style="font-size: 0.85rem; color: var(--ks-text-secondary);">
            "I agree to verify identity for organisational procurement on KhetSetu."
          </label>
        </div>
      `;
    }

    if (step === 4) {
      const cleanDigits = (buyerState.aadhaarNumber || '').replace(/\D/g, '');
      const last4 = cleanDigits.slice(-4) || '1234';
      return `
        <h3 style="margin-bottom: 14px;">Step 4: Review Organisation Profile</h3>
        <div style="background: var(--ks-cream-surface); border: 1px solid var(--ks-cream-border); border-radius: var(--ks-radius-lg); padding: 18px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid var(--ks-cream-border); padding-bottom: 8px;">
            <strong style="color: var(--ks-green-950); font-size: 1.15rem;">${buyerState.orgName}</strong>
            <button class="btn btn-sm btn-outline" data-edit-buyer-step="2">Edit Org</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 0.88rem; color: var(--ks-text-secondary); line-height: 1.6;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>🏢 <strong>Type:</strong> ${buyerState.orgType} · GSTIN: ${buyerState.gstin}</span>
              <button class="btn btn-sm btn-link" data-edit-buyer-step="2" style="font-size:0.75rem;">Edit</button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>👤 <strong>Contact:</strong> ${buyerState.name} (${buyerState.designation}) · Email: ${buyerState.email}</span>
              <button class="btn btn-sm btn-link" data-edit-buyer-step="1" style="font-size:0.75rem;">Edit</button>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>🔒 <strong>Authorised Aadhaar:</strong> XXXX XXXX ${last4}</span>
              <button class="btn btn-sm btn-link" data-edit-buyer-step="3" style="font-size:0.75rem;">Edit</button>
            </div>
            <div>📍 <strong>Delivery Hub:</strong> ${buyerState.address}</div>
            <div>📦 <strong>Monthly Needs:</strong> ${buyerState.needs}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <input type="checkbox" id="bTerms" ${buyerState.termsAccepted ? 'checked' : ''} style="accent-color: var(--ks-green-700);">
          <label for="bTerms" style="font-size: 0.85rem; color: var(--ks-text-secondary);">
            I agree to KhetSetu Institutional Procurement Terms.
          </label>
        </div>
      `;
    }
  }

  function bindBuyerEvents() {
    // Review step edit buttons
    document.querySelectorAll('[data-edit-buyer-step]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        saveBuyerStepInputs();
        currentStep = parseInt(btn.getAttribute('data-edit-buyer-step'), 10);
        updateView();
      });
    });

    document.getElementById('buyerPrevBtn')?.addEventListener('click', () => {
      if (currentStep > 1) {
        saveBuyerStepInputs();
        currentStep--;
        updateView();
      }
    });

    document.getElementById('buyerNextBtn')?.addEventListener('click', async () => {
      saveBuyerStepInputs();
      if (currentStep === 3) {
        try {
          await api.verifyAadhaar(buyerState.aadhaarNumber);
        } catch (err) {
          showToast(err.message, 'error');
          store.registerValidationFailure();
          return;
        }
      }
      currentStep++;
      updateView();
    });

    document.getElementById('submitCreateBuyerBtn')?.addEventListener('click', async () => {
      saveBuyerStepInputs();
      try {
        const res = await api.registerBuyer(buyerState);
        showToast(`Welcome, ${res.user.orgName}!`);
        showToast('Organisation Status: Verified organisation (demo)', 'success');
        store.setState({ currentUser: res.user, activeRole: 'buyer', currentView: 'buyer' });
      } catch (err) {
        showToast(err.message, 'error');
      }
    });

    document.getElementById('resetBuyerSignupBtn')?.addEventListener('click', () => {
      buyerState.name = DEMO_CONFIG.buyerAccount.name;
      buyerState.designation = DEMO_CONFIG.buyerAccount.designation;
      buyerState.email = DEMO_CONFIG.buyerAccount.email;
      buyerState.password = DEMO_CONFIG.buyerAccount.password;
      buyerState.orgName = DEMO_CONFIG.buyerAccount.orgName;
      buyerState.orgType = DEMO_CONFIG.buyerAccount.orgType;
      buyerState.address = DEMO_CONFIG.buyerAccount.address;
      buyerState.gstin = DEMO_CONFIG.buyerAccount.gstin;
      buyerState.needs = DEMO_CONFIG.buyerAccount.needs;
      buyerState.aadhaarNumber = DEMO_CONFIG.buyerAccount.aadhaarFormatted;
      updateView();
      showToast('Form refilled with demo data');
    });

    document.getElementById('switchToFarmerSignupBtn')?.addEventListener('click', () => {
      store.setState({ currentView: 'signup-farmer' });
    });

    document.getElementById('buyerAlreadyRegisteredBtn')?.addEventListener('click', (e) => {
      e.preventDefault();
      store.setState({ currentView: 'login' });
    });
  }

  updateView();
}


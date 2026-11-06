/* ==========================================================================
   KhetSetu (खेत सेतु) — Mock Service Layer (Section 19)
   Backend-ready async services with simulated latency and business rules.
   ========================================================================== */

import { DEMO_CONFIG } from '../config/demoData.js';

// Helper for simulated network delay (200ms - 400ms)
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory runtime state clone so mutations persist in session
class ApiService {
  constructor() {
    this.stock = JSON.parse(JSON.stringify(DEMO_CONFIG.stockListings));
    this.pooledLots = JSON.parse(JSON.stringify(DEMO_CONFIG.pooledLots));
    this.helpers = JSON.parse(JSON.stringify(DEMO_CONFIG.helpers));
    this.orders = JSON.parse(JSON.stringify(DEMO_CONFIG.farmerOrders));
    this.assistanceRequests = JSON.parse(JSON.stringify(DEMO_CONFIG.assistanceQueue));
    this.session = null;
    this.verifications = [];
  }

  // 1. sendOtp
  async sendOtp(mobile) {
    await delay(350);
    if (!mobile || mobile.replace(/\D/g, '').length < 10) {
      throw new Error('Please enter a valid 10-digit mobile number');
    }
    return {
      success: true,
      message: 'OTP sent successfully (Demo OTP: 123456)',
      otpMock: '123456',
      resendSeconds: 30
    };
  }

  // 2. verifyOtp
  async verifyOtp(mobile, otp) {
    await delay(300);
    if (otp !== '123456') {
      throw new Error('Invalid OTP. For demo mode, please enter 123456.');
    }
    return { success: true, verified: true };
  }

  // 3. loginFarmer
  async loginFarmer(identifier, otp) {
    await delay(400);
    if (otp !== '123456') {
      throw new Error('Invalid OTP. Use demo OTP 123456');
    }
    const farmer = {
      role: 'farmer',
      id: 'FRM-001',
      name: DEMO_CONFIG.farmerAccount.name,
      village: DEMO_CONFIG.farmerAccount.village,
      district: DEMO_CONFIG.farmerAccount.district,
      mobile: DEMO_CONFIG.farmerAccount.mobile,
      aadhaarLast4: DEMO_CONFIG.farmerAccount.aadhaarLast4,
      schemeId: DEMO_CONFIG.farmerAccount.schemeId,
      crops: DEMO_CONFIG.farmerAccount.crops
    };
    this.session = farmer;
    return { success: true, user: farmer, token: 'demo-farmer-jwt-token' };
  }

  // 4. loginBuyer
  async loginBuyer(email, password) {
    await delay(400);
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }
    const buyer = {
      role: 'buyer',
      id: 'BUY-001',
      name: DEMO_CONFIG.buyerAccount.name,
      orgName: DEMO_CONFIG.buyerAccount.orgName,
      orgType: DEMO_CONFIG.buyerAccount.orgType,
      email: DEMO_CONFIG.buyerAccount.email,
      gstin: DEMO_CONFIG.buyerAccount.gstin,
      aadhaarLast4: DEMO_CONFIG.buyerAccount.aadhaarLast4,
      verified: true
    };
    this.session = buyer;
    return { success: true, user: buyer, token: 'demo-buyer-jwt-token' };
  }

  // 5. verifyAadhaar (Format validation only, masking strictly enforced)
  async verifyAadhaar(aadhaarNumber) {
    await delay(350);
    const cleanNumber = aadhaarNumber.replace(/\s+/g, '');
    if (!/^\d{12}$/.test(cleanNumber)) {
      throw new Error('Aadhaar must be exactly 12 digits');
    }
    if (cleanNumber.startsWith('0') || cleanNumber.startsWith('1')) {
      throw new Error('Aadhaar number cannot start with 0 or 1');
    }
    return {
      success: true,
      verified: true,
      aadhaarLast4: cleanNumber.slice(-4),
      maskedAadhaar: `XXXX XXXX ${cleanNumber.slice(-4)}`,
      notice: 'Aadhaar verified (demo)'
    };
  }

  // 6. verifyFarmerId
  async verifyFarmerId(farmerId, schemeName) {
    await delay(300);
    if (!farmerId) throw new Error('Farmer ID or Scheme ID required');
    return {
      success: true,
      verified: true,
      schemeName: schemeName || 'PM-KISAN',
      status: 'Active Farmer Registry Match'
    };
  }

  // 7. registerFarmer
  async registerFarmer(farmerData) {
    await delay(500);
    // Security & privacy check: never store full Aadhaar
    const last4 = farmerData.aadhaarNumber ? farmerData.aadhaarNumber.slice(-4) : '0123';
    const newFarmer = {
      role: 'farmer',
      id: `FRM-TG-${Date.now().toString().slice(-4)}`,
      name: farmerData.name || 'Ravi Kumar',
      village: farmerData.village || 'Geesugonda',
      district: farmerData.district || 'Warangal',
      state: farmerData.state || 'Telangana',
      crops: farmerData.crops || 'Tomato and Chilli',
      land: farmerData.land || '2.5 acres',
      aadhaarLast4: last4,
      schemeName: farmerData.schemeName || 'PM-KISAN',
      verified: true
    };
    this.session = newFarmer;
    return { success: true, user: newFarmer };
  }

  // 8. registerBuyer
  async registerBuyer(buyerData) {
    await delay(500);
    const last4 = buyerData.aadhaarNumber ? buyerData.aadhaarNumber.slice(-4) : '1234';
    const newBuyer = {
      role: 'buyer',
      id: `BUY-TG-${Date.now().toString().slice(-4)}`,
      name: buyerData.name || 'Anita Reddy',
      designation: buyerData.designation || 'Procurement Manager',
      orgName: buyerData.orgName || 'FreshKart Retail',
      orgType: buyerData.orgType || 'Supermarket',
      email: buyerData.email || 'buyer@freshkart-demo.in',
      aadhaarLast4: last4,
      verificationStatus: 'Verified organisation'
    };
    this.session = newBuyer;
    return { success: true, user: newBuyer };
  }

  // 9. getSession & logout
  async getSession() {
    return this.session;
  }

  async logout() {
    this.session = null;
    return { success: true };
  }

  // 10. getMarketplaceListings (Filtering & Sorting)
  async getMarketplaceListings(filters = {}) {
    await delay(200);
    let list = [...this.stock];

    if (filters.crop && filters.crop !== 'all') {
      list = list.filter(item => item.crop.toLowerCase().includes(filters.crop.toLowerCase()));
    }
    if (filters.grade && filters.grade !== 'all') {
      list = list.filter(item => item.expectedGrade === filters.grade);
    }
    if (filters.maxPrice) {
      list = list.filter(item => item.pricePerKg <= Number(filters.maxPrice));
    }
    if (filters.maxTds) {
      list = list.filter(item => item.tdsPpm <= Number(filters.maxTds));
    }

    // Sort
    if (filters.sort === 'price_asc') {
      list.sort((a, b) => a.pricePerKg - b.pricePerKg);
    } else if (filters.sort === 'distance') {
      list.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (filters.sort === 'quantity') {
      list.sort((a, b) => b.availableKg - a.availableKg);
    }

    return list;
  }

  // 11. getListingDetail
  async getListingDetail(id) {
    await delay(150);
    const item = this.stock.find(s => s.id === id);
    if (!item) throw new Error('Produce listing not found');
    return item;
  }

  // 12. createStockListing (Only Farmer Sets Price)
  async createStockListing(listingData, userRole = 'farmer', helperName = null) {
    await delay(350);
    if (!listingData.crop || !listingData.pricePerKg || !listingData.totalKg) {
      throw new Error('Please fill in Crop, Price per kg, and Total Quantity');
    }
    const badges = ['Farmer-declared'];
    if (helperName) {
      badges.push(`Listed with help from ${helperName}`);
    }

    const newListing = {
      id: `STK-${Date.now().toString().slice(-4)}`,
      farmerId: 'FRM-001',
      farmerName: 'Ravi Kumar',
      farmerVillage: listingData.pickupVillage || 'Geesugonda, Warangal',
      distanceKm: 4.2,
      crop: listingData.crop,
      cropTelugu: listingData.cropTelugu || listingData.crop,
      variety: listingData.variety || 'Local High Yield',
      image: listingData.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      pricePerKg: Number(listingData.pricePerKg), // Enforce: Set by farmer
      totalKg: Number(listingData.totalKg),
      reservedKg: 0,
      committedKg: 0,
      soldKg: 0,
      availableKg: Number(listingData.totalKg),
      minOrderKg: Number(listingData.minOrderKg || 10),
      stepKg: Number(listingData.stepKg || 5),
      expectedGrade: listingData.expectedGrade || 'A',
      tdsPpm: Number(listingData.tdsPpm || 140),
      harvestDate: listingData.harvestDate || 'Harvested today',
      shelfLifeDays: Number(listingData.shelfLifeDays || 5),
      farmingMethod: listingData.farmingMethod || 'Natural / Self-declared',
      sizeAppearance: listingData.sizeAppearance || 'Standard uniform',
      notes: listingData.notes || '',
      pickupWindow: listingData.pickupWindow || 'Tomorrow morning',
      pickupVillage: listingData.pickupVillage || 'Geesugonda',
      status: listingData.saveAsDraft ? 'Draft' : 'Live',
      badges
    };

    this.stock.unshift(newListing);
    return { success: true, listing: newListing };
  }

  // 13. updateStockListing (Farmer edits price only for future orders)
  async updateStockListing(id, updates, role = 'farmer') {
    await delay(250);
    const item = this.stock.find(s => s.id === id);
    if (!item) throw new Error('Listing not found');

    if (updates.pricePerKg && role !== 'farmer') {
      throw new Error('Business Rule: Only the farmer is permitted to set or update asking price.');
    }

    Object.assign(item, updates);
    // Recalculate available stock: total - reserved - committed - sold
    item.availableKg = Math.max(0, item.totalKg - item.reservedKg - item.committedKg - item.soldKg);
    return { success: true, listing: item };
  }

  // 14. pauseStockListing
  async pauseStockListing(id) {
    await delay(200);
    const item = this.stock.find(s => s.id === id);
    if (!item) throw new Error('Listing not found');
    item.status = item.status === 'Paused' ? 'Live' : 'Paused';
    return { success: true, status: item.status };
  }

  // 15. reserveQuantity (Hold immediately when buyer chooses)
  async reserveQuantity(listingId, quantityKg) {
    await delay(250);
    const item = this.stock.find(s => s.id === listingId);
    if (!item) throw new Error('Produce listing not found');

    if (item.status === 'Paused' || item.status === 'Sold out') {
      throw new Error(`Produce is currently ${item.status}. Please select another listing.`);
    }

    if (quantityKg > item.availableKg) {
      throw new Error(`Only ${item.availableKg} kg is available. Cannot hold ${quantityKg} kg.`);
    }

    if (quantityKg < item.minOrderKg) {
      throw new Error(`Minimum order is ${item.minOrderKg} kg.`);
    }

    // Step verification
    if ((quantityKg - item.minOrderKg) % item.stepKg !== 0) {
      throw new Error(`Quantity must be in steps of ${item.stepKg} kg above minimum order.`);
    }

    // Apply hold
    item.reservedKg += quantityKg;
    item.availableKg -= quantityKg;
    if (item.availableKg === 0 && item.reservedKg > 0) {
      item.status = 'Partly reserved';
    }

    return {
      success: true,
      listingId,
      heldKg: quantityKg,
      holdExpiresAt: Date.now() + 6 * 60 * 60 * 1000, // 6 hours hold
      availableKg: item.availableKg
    };
  }

  // 16. releaseHold
  async releaseHold(listingId, quantityKg) {
    await delay(200);
    const item = this.stock.find(s => s.id === listingId);
    if (!item) return;

    item.reservedKg = Math.max(0, item.reservedKg - quantityKg);
    item.availableKg = item.totalKg - item.reservedKg - item.committedKg - item.soldKg;
    if (item.status === 'Partly reserved' && item.availableKg > 0) {
      item.status = 'Live';
    }
    return { success: true, availableKg: item.availableKg };
  }

  // 17. submitOrderRequest (Multi-farmer Cart checkout)
  async submitOrderRequest(orderPayload) {
    await delay(450);
    const { buyerName, buyerOrg, cartLines, deliveryLocation } = orderPayload;

    const newOrders = [];
    for (const line of cartLines) {
      const stockItem = this.stock.find(s => s.id === line.listingId);
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        buyerName: buyerName || 'Anita Reddy',
        buyerOrg: buyerOrg || 'FreshKart Retail',
        crop: stockItem ? stockItem.crop : line.crop,
        quantityKg: line.quantityKg,
        askingPrice: stockItem ? stockItem.pricePerKg : line.pricePerKg,
        offeredPrice: line.offeredPrice || (stockItem ? stockItem.pricePerKg : line.pricePerKg),
        totalAmount: line.quantityKg * (line.offeredPrice || (stockItem ? stockItem.pricePerKg : line.pricePerKg)),
        deliveryLocation: deliveryLocation || 'FreshKart Central Hub, Warangal',
        holdExpiresInSeconds: 21600,
        status: 'Requested',
        requestedAt: 'Just now'
      };
      this.orders.unshift(newOrder);
      newOrders.push(newOrder);
    }

    return { success: true, orders: newOrders };
  }

  // 18. respondToOrder (Farmer Accept / Decline / Counter)
  async respondToOrder(orderId, action, counterPrice = null) {
    await delay(300);
    const order = this.orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');

    if (action === 'accept') {
      order.status = 'Accepted';
      // Move stock from reserved to committed
      const stockItem = this.stock.find(s => s.crop === order.crop);
      if (stockItem) {
        stockItem.reservedKg = Math.max(0, stockItem.reservedKg - order.quantityKg);
        stockItem.committedKg += order.quantityKg;
      }
    } else if (action === 'decline') {
      order.status = 'Declined';
      // Release held stock back to available
      const stockItem = this.stock.find(s => s.crop === order.crop);
      if (stockItem) {
        stockItem.reservedKg = Math.max(0, stockItem.reservedKg - order.quantityKg);
        stockItem.availableKg = stockItem.totalKg - stockItem.reservedKg - stockItem.committedKg - stockItem.soldKg;
      }
    } else if (action === 'counter') {
      order.offeredPrice = counterPrice;
      order.status = 'Countered by Farmer';
    }

    return { success: true, order };
  }

  // 19. submitVerification (Pickup Agent Field Check)
  async submitVerification(verificationReport) {
    await delay(400);
    const { orderId, farmerName, collectedWeightKg, gradeA, gradeB, gradeC, rejectedKg, notes, photos } = verificationReport;

    const sumGrades = Number(gradeA || 0) + Number(gradeB || 0) + Number(gradeC || 0) + Number(rejectedKg || 0);
    if (Math.abs(sumGrades - Number(collectedWeightKg)) > 0.1) {
      throw new Error(`Grade split (${sumGrades} kg) must exactly equal total collected weight (${collectedWeightKg} kg)`);
    }

    const report = {
      id: `VRF-${Date.now().toString().slice(-4)}`,
      orderId,
      farmerName: farmerName || 'Ravi Kumar',
      collectedWeightKg: Number(collectedWeightKg),
      gradeSplit: {
        gradeA: Number(gradeA || 0),
        gradeB: Number(gradeB || 0),
        gradeC: Number(gradeC || 0),
        rejected: Number(rejectedKg || 0)
      },
      notes: notes || 'Verified at farm gate',
      photos: photos || [],
      verifiedAt: 'Just now',
      status: 'Awaiting Farmer Approval'
    };

    this.verifications.unshift(report);
    return { success: true, report };
  }

  // 20. approveVerification (Farmer final signoff)
  async approveVerification(verificationId) {
    await delay(300);
    const report = this.verifications.find(v => v.id === verificationId) || {
      id: verificationId,
      collectedWeightKg: 85,
      gradeSplit: { gradeA: 70, gradeB: 15, gradeC: 0, rejected: 0 }
    };
    report.status = 'Farmer Approved';

    // Update stock to sold
    const stockItem = this.stock[0];
    if (stockItem) {
      stockItem.soldKg += report.collectedWeightKg;
      stockItem.committedKg = Math.max(0, stockItem.committedKg - report.collectedWeightKg);
      stockItem.status = stockItem.availableKg === 0 ? 'Sold out' : 'Live';
    }

    return { success: true, report, message: 'Pickup verification approved by farmer. Produce added to pooled dispatch.' };
  }

  // 21. raiseConcern (Farmer raises issue with agent inspection)
  async raiseConcern(verificationId, reason) {
    await delay(300);
    return {
      success: true,
      status: 'Concern Raised',
      reason,
      message: 'Concern submitted. A regional supervisor will review photos and weight records with the collection agent.'
    };
  }

  // 22. createAssistanceRequest
  async createAssistanceRequest(reqData) {
    await delay(400);
    const newReq = {
      id: `AST-${Date.now().toString().slice(-4)}`,
      farmerName: reqData.farmerName || 'Ravi Kumar',
      village: reqData.village || 'Geesugonda',
      helpCategory: reqData.category || 'List my produce',
      preferredMethod: reqData.method || 'Call me back',
      language: reqData.language || 'Telugu',
      phone: reqData.phone || '+91 98765 43210',
      status: 'Assigned to Lakshmi',
      matchedHelper: this.helpers[0]
    };

    this.assistanceRequests.unshift(newReq);
    return { success: true, request: newReq, helper: this.helpers[0] };
  }

  // 23. getNearbyHelpers
  async getNearbyHelpers() {
    await delay(200);
    return this.helpers;
  }

  // 24. getVehicleLocation (Live interpolated GPS simulation)
  async getVehicleLocation() {
    return {
      vehicleId: 'TS-03-AG-8821',
      driverName: 'K. Naresh',
      currentLat: 17.9784,
      currentLng: 79.6012,
      speedKmH: 34,
      etaMinutes: 12,
      distanceKm: 4.2,
      routeProgressPct: 65,
      stopsRemaining: 3
    };
  }
}

export const api = new ApiService();


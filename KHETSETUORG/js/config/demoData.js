/* ==========================================================================
   KhetSetu (खेत सेतु) — Centralized Demo Data (Section 6, 14, 18, 20)
   Everything is realistic sample data for Warangal cluster, Telangana
   ========================================================================== */

export const DEMO_CONFIG = {
  // Pre-filled Farmer Account (Section 6)
  farmerAccount: {
    mobile: '98765 43210',
    otp: '123456',
    farmerId: 'DEMO-FARMER-0001',
    aadhaarFormatted: '2345 6789 0123',
    aadhaarMasked: 'XXXX XXXX 0123',
    aadhaarLast4: '0123',
    name: 'Ravi Kumar',
    village: 'Geesugonda',
    district: 'Warangal',
    state: 'Telangana',
    crops: 'Tomato and Chilli',
    land: '2.5 acres',
    language: 'Telugu',
    registrationNo: 'FRM-TG-2026-004512',
    schemeName: 'PM-KISAN',
    schemeId: 'DEMO-PMK-778812',
    verified: true
  },

  // Pre-filled Buyer Account (Section 6)
  buyerAccount: {
    name: 'Anita Reddy',
    designation: 'Procurement Manager',
    email: 'buyer@freshkart-demo.in',
    mobile: '+91 99887 76655',
    otp: '123456',
    password: 'Demo@1234',
    orgName: 'FreshKart Retail',
    orgType: 'Supermarket',
    address: '12 Market Road, Hanamkonda, Warangal, Telangana, 506001',
    gstin: 'DEMO-GSTIN-0001',
    needs: 'Tomato, Chilli, Onion; 2–5 tonnes per month',
    aadhaarFormatted: '3456 7890 1234',
    aadhaarMasked: 'XXXX XXXX 1234',
    aadhaarLast4: '1234',
    verified: true,
    verificationStatus: 'Verified organisation'
  },

  // Sample Stock Listings (Section 20)
  stockListings: [
    {
      id: 'STK-001',
      farmerId: 'FRM-001',
      farmerName: 'Ravi Kumar',
      farmerVillage: 'Geesugonda, Warangal',
      distanceKm: 4.2,
      crop: 'Tomato',
      cropTelugu: 'టమోటా',
      variety: 'Vaishnavi Semi-determinate',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      pricePerKg: 25,
      totalKg: 85,
      reservedKg: 20,
      committedKg: 0,
      soldKg: 0,
      availableKg: 65,
      minOrderKg: 10,
      stepKg: 5,
      expectedGrade: 'A',
      tdsPpm: 140,
      harvestDate: 'Harvested today at 6:30 AM',
      shelfLifeDays: 5,
      farmingMethod: 'Pesticide-free / Drip irrigation',
      sizeAppearance: 'Medium-large (50-65mm), firm, uniform red',
      notes: 'Grown with borehole water TDS 140ppm. Handpicked early morning.',
      pickupWindow: 'Today 3:00 PM – 6:00 PM',
      pickupVillage: 'Geesugonda Collection Point',
      status: 'Live',
      badges: ['Farmer-declared', 'Verified farmer']
    },
    {
      id: 'STK-002',
      farmerId: 'FRM-002',
      farmerName: 'Lakshmi Narayana',
      farmerVillage: 'Geesugonda, Warangal',
      distanceKm: 3.5,
      crop: 'Green Chilli',
      cropTelugu: 'పచ్చిమిర్చి',
      variety: 'G4 Teja Hot',
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80',
      pricePerKg: 48,
      totalKg: 120,
      reservedKg: 20,
      committedKg: 0,
      soldKg: 0,
      availableKg: 100,
      minOrderKg: 10,
      stepKg: 5,
      expectedGrade: 'B',
      tdsPpm: 165,
      harvestDate: 'Harvested yesterday evening',
      shelfLifeDays: 8,
      farmingMethod: 'Natural composting',
      sizeAppearance: 'Long pungent pods, 8-10 cm, sharp green',
      notes: 'Well-cured, low surface moisture. Ideal for retail spice sections.',
      pickupWindow: 'Tomorrow 8:00 AM – 11:00 AM',
      pickupVillage: 'Geesugonda Mandal Hub',
      status: 'Partly reserved',
      badges: ['Farmer-declared', 'Verified farmer']
    },
    {
      id: 'STK-003',
      farmerId: 'FRM-003',
      farmerName: 'Suresh Chandra',
      farmerVillage: 'Nekkonda, Warangal',
      distanceKm: 11.0,
      crop: 'Onion',
      cropTelugu: 'ఉల్లిపాయ',
      variety: 'Nashik Red Globe',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
      pricePerKg: 22,
      totalKg: 300,
      reservedKg: 50,
      committedKg: 0,
      soldKg: 0,
      availableKg: 250,
      minOrderKg: 25,
      stepKg: 10,
      expectedGrade: 'A',
      tdsPpm: 130,
      harvestDate: 'Cured & sorted 2 days ago',
      shelfLifeDays: 20,
      farmingMethod: 'Conventional Good Agricultural Practices (GAP)',
      sizeAppearance: 'Globe 45-60mm, tight dry outer skins',
      notes: 'Dry storage, no sprouting, zero neck rot.',
      pickupWindow: 'Tomorrow 10:00 AM – 2:00 PM',
      pickupVillage: 'Nekkonda Market Center',
      status: 'Live',
      badges: ['Farmer-declared', 'Verified farmer']
    },
    {
      id: 'STK-004',
      farmerId: 'FRM-004',
      farmerName: 'Ramesh Patel',
      farmerVillage: 'Wardhannapet, Warangal',
      distanceKm: 8.5,
      crop: 'Capsicum (Bell Pepper)',
      cropTelugu: 'బెంగళూరు మిరప',
      variety: 'Indra Green Hybrid',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop&q=80',
      pricePerKg: 38,
      totalKg: 150,
      reservedKg: 0,
      committedKg: 0,
      soldKg: 0,
      availableKg: 150,
      minOrderKg: 15,
      stepKg: 5,
      expectedGrade: 'A',
      tdsPpm: 125,
      harvestDate: 'Harvested today at 7:00 AM',
      shelfLifeDays: 7,
      farmingMethod: 'Polyhouse protected cultivation',
      sizeAppearance: 'Thick walled, deep green, 3-4 lobes',
      notes: 'Polyhouse produce, uniform grade, zero pesticide residue.',
      pickupWindow: 'Today 4:00 PM – 7:00 PM',
      pickupVillage: 'Wardhannapet Junction',
      status: 'Live',
      badges: ['Farmer-declared', 'Listed with help from Lakshmi']
    }
  ],

  // Sample Verified Pooled Lots (Section 10 & 13)
  pooledLots: [
    {
      id: 'LOT-WAR-TOM-01',
      title: 'Tomatoes from 8 farmers, Warangal',
      titleTelugu: 'వరంగల్ 8 మంది రైతుల టమోటా పూల్డ్ లాట్',
      crop: 'Tomato',
      cropTelugu: 'టమోటా',
      farmerCount: 8,
      totalKg: 600,
      gradeSplit: {
        gradeA: 480, // 80%
        gradeB: 120, // 20%
        gradeC: 0,
        rejected: 0
      },
      pricePerKg: 26,
      villageCluster: 'Geesugonda & Hanamkonda Cluster',
      verifiedAt: 'Verified today at 9:40 AM',
      agentName: 'Suresh (Pickup Agent)',
      tdsPpm: 140,
      tdsCategory: 'Good',
      freshnessScore: 'Harvested today (4-6 hrs ago)',
      farmingMethod: 'Mixed Drip & Naturally Grown',
      photos: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600&auto=format&fit=crop&q=80'
      ],
      transportSavingsRupees: 1850,
      participatingFarmsCount: 12,
      status: 'Pickup verified',
      badges: ['Pickup verified', 'Pooled lot']
    },
    {
      id: 'LOT-WAR-CHI-02',
      title: 'Green Chillies from 5 farmers, Nekkonda',
      titleTelugu: 'నెక్కొండ 5 మంది రైతుల పచ్చిమిర్చి లాట్',
      crop: 'Green Chilli',
      cropTelugu: 'పచ్చిమిర్చి',
      farmerCount: 5,
      totalKg: 450,
      gradeSplit: {
        gradeA: 380,
        gradeB: 70,
        gradeC: 0,
        rejected: 0
      },
      pricePerKg: 49,
      villageCluster: 'Nekkonda Agricultural Belt',
      verifiedAt: 'Verified yesterday at 4:15 PM',
      agentName: 'Mahesh (Pickup Agent)',
      tdsPpm: 155,
      tdsCategory: 'Good',
      freshnessScore: 'Crisp, high pungency',
      farmingMethod: 'GAP Certified',
      photos: [
        'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80'
      ],
      transportSavingsRupees: 1420,
      participatingFarmsCount: 8,
      status: 'Pickup verified',
      badges: ['Pickup verified', 'Pooled lot']
    }
  ],

  // Sample On-ground Helpers (Section 14)
  helpers: [
    {
      id: 'HLP-001',
      name: 'Lakshmi',
      role: 'Local Coordinator',
      roleTelugu: 'స్థానిక సమన్వయకర్త',
      org: 'Warangal Agricultural Rural Network',
      village: 'Geesugonda',
      distanceKm: 3.0,
      languages: ['Telugu (తెలుగు)', 'Hindi (हिन्दी)'],
      rating: 4.9,
      helpedFarmersCount: 42,
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      phone: '+91 94401 23456'
    },
    {
      id: 'HLP-002',
      name: 'Ramesh',
      role: 'Warangal Rythu FPO Lead',
      roleTelugu: 'వరంగల్ రైతు ఎఫ్.పి.ఓ లీడ్',
      org: 'Warangal Rythu Producer Org',
      village: 'Hanamkonda Hub',
      distanceKm: 7.0,
      languages: ['Telugu (తెలుగు)', 'English'],
      rating: 4.8,
      helpedFarmersCount: 86,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      phone: '+91 98480 34567'
    },
    {
      id: 'HLP-003',
      name: 'Suresh',
      role: 'Collection & Quality Agent',
      roleTelugu: 'కలెక్షన్ & నాణ్యత ఏజెంట్',
      org: 'KhetSetu Logistics Cluster',
      village: 'Nekkonda Road',
      distanceKm: 5.0,
      languages: ['Telugu (తెలుగు)'],
      rating: 4.7,
      helpedFarmersCount: 31,
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      phone: '+91 97012 45678'
    }
  ],

  // Sample Incoming Orders for Farmer (Section 7)
  farmerOrders: [
    {
      id: 'ORD-8921',
      buyerName: 'Anita Reddy',
      buyerOrg: 'FreshKart Retail',
      buyerType: 'Supermarket',
      crop: 'Tomato',
      quantityKg: 40,
      askingPrice: 25,
      offeredPrice: 25,
      totalAmount: 1000,
      deliveryLocation: 'FreshKart Central Hub, Hanamkonda',
      holdExpiresInSeconds: 21400, // ~6 hours
      status: 'Requested',
      requestedAt: '12 mins ago'
    },
    {
      id: 'ORD-8924',
      buyerName: 'Vikram Joshi',
      buyerOrg: 'Niloufer Food Processing',
      buyerType: 'Food processor',
      crop: 'Tomato',
      quantityKg: 25,
      askingPrice: 25,
      offeredPrice: 24, // counter offer
      totalAmount: 600,
      deliveryLocation: 'Kazipet Industrial Area',
      holdExpiresInSeconds: 16200,
      status: 'Requested',
      requestedAt: '35 mins ago'
    }
  ],

  // Sample Assistance Queue for Coordinator (Section 14)
  assistanceQueue: [
    {
      id: 'AST-101',
      farmerName: 'Kishan Rao',
      village: 'Dharmaram (4.5 km)',
      helpCategory: 'List my produce & Set price',
      language: 'Telugu',
      preferredTime: 'Today, 4:00 PM',
      phone: '+91 98492 11223',
      status: 'Pending'
    },
    {
      id: 'AST-102',
      farmerName: 'Mallamma',
      village: 'Geesugonda (2.1 km)',
      helpCategory: 'Quality check and TDS testing',
      language: 'Telugu',
      preferredTime: 'Immediate (Now)',
      phone: '+91 94411 99887',
      status: 'Assigned to Lakshmi'
    }
  ],

  // e-NAM Official Stats (Section 18)
  enamStats: {
    asOfDate: 'March 2026',
    integratedMandis: '1,656',
    statesAndUTs: '23 States & 4 UTs',
    registeredFarmers: '1.80 Crore+',
    registeredTraders: '2.73 Lakh',
    registeredFpos: '4,724',
    leadAgency: 'Small Farmers’ Agribusiness Consortium (SFAC), Ministry of Agriculture & Farmers Welfare',
    officialUrl: 'https://enam.gov.in'
  },

  // Platform Metrics (Section 4)
  platformMetrics: {
    activeFarmers: 1240,
    verifiedBuyers: 85,
    villagesCovered: 12,
    tonnesTraded: 38
  }
};


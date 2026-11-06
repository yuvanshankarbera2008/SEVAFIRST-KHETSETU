/* ==========================================================================
   KhetSetu (खेत सेतु) — Internationalization (i18n) Layer (Section 5)
   Full translations: English (en), Telugu (te), Hindi (hi)
   Fallback to English: Tamil (ta), Marathi (mr), Bengali (bn), Kannada (kn), Gujarati (gu)
   ========================================================================== */

import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from '../config/languages.js';

export const TRANSLATIONS = {
  // English
  en: {
    brand_tagline: 'Direct connections. Better decisions. Fairer markets.',
    built_for_bharat: 'Built for Bharat',
    from_soil_to_shelf: 'FROM SOIL TO SHELF, TOGETHER',
    hero_headline_1: 'Better decisions.',
    hero_headline_2: 'Fairer markets.',
    hero_subtext: 'Farmers list their stock. Verified buyers choose the quantity they need. Pickup, quality checks, and payment are handled in one place.',
    cta_farmer: 'I grow produce',
    cta_buyer: 'I buy produce',
    cta_browse: 'Browse live stock',
    cta_pickup_agent: 'I’m a pickup agent',
    cta_ask_help: 'Need help? Ask for assistance',
    trust_farmers_count: '1,240+ farmers already growing with demand.',

    // Navigation
    nav_how_it_works: 'How it works',
    nav_farmers: 'For farmers',
    nav_buyers: 'For buyers',
    nav_pickup: 'For pickup agents',
    nav_tracking: 'Live tracking',
    nav_marketplace: 'Marketplace',
    nav_signin: 'Sign in',
    nav_get_started: 'Get started',

    // Floating Hero Cards
    hero_card_demand_title: 'DEMAND NEAR WARANGAL',
    hero_card_demand_body: 'Tomato demand is up 18% · 3 verified buyers looking now',
    hero_card_pickup_title: 'PICKUP VERIFIED',
    hero_card_pickup_body: 'Tomatoes from 8 farmers · 600 kg · ₹26/kg (Grade A 480 kg · Grade B 120 kg)',
    hero_card_quality_title: 'QUALITY DECLARED',
    hero_card_quality_body: 'TDS 140 ppm · Harvested today',
    hero_card_live_title: 'LIVE PICKUP',
    hero_card_live_body: 'Vehicle 4 km away · Arriving in 12 min',
    hero_card_help_title: 'HELP NEARBY',
    hero_card_help_body: 'Your local coordinator is 3 km away',

    // Farmer Stock Listing & Dashboard
    my_stock: 'My Stock',
    list_stock_btn: 'List my stock',
    add_produce: 'Add Produce',
    crop_name: 'Crop & Variety',
    asking_price: 'My Asking Price',
    price_per_kg: '₹ per kg',
    price_notice: 'Only you decide your price. Buyers cannot alter it.',
    total_quantity: 'Total Quantity',
    min_order_qty: 'Minimum Order Quantity',
    qty_step: 'Quantity Step (Batch size)',
    quality_details: 'Declared Quality Details',
    tds_reading: 'Irrigation Water TDS (ppm)',
    expected_grade: 'Expected Quality Grade',
    grade_a: 'Grade A (Premium)',
    grade_b: 'Grade B (Standard)',
    grade_c: 'Grade C (Processing)',
    farming_method: 'Farming Method',
    harvest_date: 'Harvest Time',
    shelf_life: 'Estimated Shelf Life',
    pickup_location: 'Pickup Village / Mandal',
    live_preview: 'Live Buyer Preview',
    save_draft: 'Save as draft',
    submit_listing: 'Publish Stock',
    farmer_declared: 'Farmer-declared',
    verified_at_pickup: 'Verified at pickup',
    listed_with_help: 'Listed with help from',

    // Status Badges
    status_live: 'Live',
    status_partly_reserved: 'Partly reserved',
    status_sold_out: 'Sold out',
    status_paused: 'Paused',
    status_draft: 'Draft',
    status_requested: 'Requested',
    status_accepted: 'Accepted',
    status_pickup_scheduled: 'Pickup scheduled',
    status_verified: 'Picked up & verified',
    status_delivered: 'Delivered',
    status_paid: 'Paid',

    // Stock bar labels
    bar_sold: 'Sold',
    bar_reserved: 'Reserved',
    bar_available: 'Available',

    // Orders Inbox
    orders_inbox: 'Incoming Buyer Requests',
    accept_btn: 'Accept Order',
    decline_btn: 'Decline',
    counter_btn: 'Counter Offer',
    hold_countdown: 'Hold expires in',

    // Assistance
    assistance_btn_label: 'Need help? Ask for assistance',
    stuck_nudge_text: 'Stuck? We can help. Tap to connect with a local coordinator.',
    assistance_title: 'Ask for Assistance',
    help_what: 'What do you need help with?',
    help_how: 'How would you like help?',
    help_opt_list: 'List my produce',
    help_opt_price: 'Set my price',
    help_opt_quality: 'Quality & grading',
    help_opt_pickup: 'Pickup & transport',
    help_opt_payment: 'Payments & bank',
    help_opt_other: 'Something else',
    help_method_call: 'Call me back',
    help_method_whatsapp: 'Chat on WhatsApp',
    help_method_visit: 'Visit me at my village',
    help_method_now: 'Help me list my produce now',
    help_matching_msg: 'Connecting you with local coordinators & FPOs near Warangal...',
    helper_assigned_title: 'Local Coordinator Assigned',
    call_helper: 'Call Coordinator',
    chat_helper: 'WhatsApp Chat',

    // Farmer Approval
    farmer_approval_title: 'Pickup Verification Approval',
    farmer_approval_desc: 'The collection agent has inspected your produce. Review the recorded weight and grades below before confirming.',
    approve_verification: 'Approve Verification',
    raise_concern: 'Raise Concern',
    earnings_estimate: 'Estimated Final Earnings',

    // Audio placeholders
    audio_listen: 'Listen in Telugu / వినండి'
  },

  // Telugu (తెలుగు) — Primary Default for Warangal Pilot
  te: {
    brand_tagline: 'ప్రత్యక్ష అనుసంధానం. సరైన నిర్ణయాలు. న్యాయమైన మార్కెట్.',
    built_for_bharat: 'భారత రైతాంగం కోసం నిర్మితం',
    from_soil_to_shelf: 'పొలం నుండి షెల్ఫ్ వరకు, కలిసికట్టుగా',
    hero_headline_1: 'సరైన నిర్ణయాలు.',
    hero_headline_2: 'న్యాయమైన మార్కెట్.',
    hero_subtext: 'రైతులు తమ పంట నిల్వలను నమోదు చేస్తారు. ధృవీకరించబడిన కొనుగోలుదారులు తమకు కావాల్సిన పరిమాణాన్ని ఎంచుకుంటారు. పికప్, నాణ్యతా పరీక్ష మరియు చెల్లింపు ఒకే చోట జరుగుతాయి.',
    cta_farmer: 'నేను రైతును (పంట అమ్మండి)',
    cta_buyer: 'నేను కొనుగోలుదారుని',
    cta_browse: 'లైవ్ మార్కెట్ చూడండి',
    cta_pickup_agent: 'నేను పికప్ ఏజెంట్‌ని',
    cta_ask_help: 'సహాయం కావాలా? అడగండి',
    trust_farmers_count: '1,240+ మంది రైతులు ఇప్పటికే డిమాండ్‌తో కలిసి పండిస్తున్నారు.',

    // Navigation
    nav_how_it_works: 'ఇది ఎలా పనిచేస్తుంది',
    nav_farmers: 'రైతుల కోసం',
    nav_buyers: 'కొనుగోలుదారుల కోసం',
    nav_pickup: 'పికప్ ఏజెంట్ల కోసం',
    nav_tracking: 'లైవ్ ట్రాకింగ్',
    nav_marketplace: 'మార్కెట్‌ప్లేస్',
    nav_signin: 'లాగిన్ అవ్వండి',
    nav_get_started: 'ప్రారంభించండి',

    // Floating Hero Cards
    hero_card_demand_title: 'వరంగల్ పరిసరాలలో డిమాండ్',
    hero_card_demand_body: 'టమోటా డిమాండ్ 18% పెరిగింది · 3 వెరిఫైడ్ కొనుగోలుదారులు వేచి ఉన్నారు',
    hero_card_pickup_title: 'పికప్ ధృవీకరించబడింది',
    hero_card_pickup_body: '8 మంది రైతుల టమోటా · 600 కేజీలు · ₹26/కేజీ (గ్రేడ్ A 480 కేజీ · గ్రేడ్ B 120 కేజీ)',
    hero_card_quality_title: 'నాణ్యత వివరాలు',
    hero_card_quality_body: 'TDS 140 ppm · ఈరోజే కోత కోశారు',
    hero_card_live_title: 'లైవ్ పికప్ ట్రాకింగ్',
    hero_card_live_body: 'వాహనం 4 కి.మీ దూరంలో ఉంది · 12 నిమిషాల్లో రాక',
    hero_card_help_title: 'సమీపంలో సమన్వయకర్త',
    hero_card_help_body: 'మీ స్థానిక కోఆర్డినేటర్ 3 కి.మీ దూరంలో ఉన్నారు',

    // Farmer Stock Listing & Dashboard
    my_stock: 'నా పంట నిల్వలు',
    list_stock_btn: 'పంట నిల్వను నమోదు చేయండి',
    add_produce: 'కొత్త పంట నమోదు',
    crop_name: 'పంట & రకం',
    asking_price: 'నా విక్రయ ధర',
    price_per_kg: '₹ ప్రతి కేజీకి',
    price_notice: 'ధరను మీరే నిర్ణయిస్తారు. కొనుగోలుదారులు దీన్ని మార్చలేరు.',
    total_quantity: 'మొత్తం పరిమాణం',
    min_order_qty: 'కనిష్ట ఆర్డర్ పరిమాణం',
    qty_step: 'పరిమాణం పెంపు (స్టెప్ సైజ్)',
    quality_details: 'నాణ్యతా వివరాలు',
    tds_reading: 'సాగు నీటి TDS (ppm)',
    expected_grade: 'నాణ్యత గ్రేడ్ (అంచనా)',
    grade_a: 'గ్రేడ్ A (ప్రీమియం నాణ్యత)',
    grade_b: 'గ్రేడ్ B (స్టాండర్డ్ మార్కెట్)',
    grade_c: 'గ్రేడ్ C (ప్రాసెసింగ్/త్వరతగతిన అమ్మకం)',
    farming_method: 'సాగు విధానం',
    harvest_date: 'కోత సమయం',
    shelf_life: 'నిల్వ ఉండే రోజుల అంచనా',
    pickup_location: 'పికప్ గ్రామం / మండలం',
    live_preview: 'కొనుగోలుదారుడు చూసే దృశ్యం',
    save_draft: 'చిత్తుప్రతిగా భద్రపరుచు',
    submit_listing: 'పంటను ప్రత్యక్ష ప్రసారం చేయండి',
    farmer_declared: 'రైతు ప్రకటించిన నాణ్యత',
    verified_at_pickup: 'పికప్ వద్ద ధృవీకరించబడింది',
    listed_with_help: 'సహాయంతో నమోదు చేయబడింది:',

    // Status Badges
    status_live: 'ప్రత్యక్షంగా ఉంది (Live)',
    status_partly_reserved: 'కొంత రిజర్వ్ చేయబడింది',
    status_sold_out: 'అమ్ముడైంది',
    status_paused: 'నిలిపివేయబడింది',
    status_draft: 'చిత్తుప్రతి',
    status_requested: 'ఆర్డర్ అభ్యర్థన వచ్చింది',
    status_accepted: 'ఆమోదించబడింది',
    status_pickup_scheduled: 'పికప్ షెడ్యూల్ చేయబడింది',
    status_verified: 'పరిశీలించి సేకరించబడింది',
    status_delivered: 'చేరవేయబడింది',
    status_paid: 'చెల్లింపు పూర్తయింది',

    // Stock bar labels
    bar_sold: 'అమ్మినది',
    bar_reserved: 'రిజర్వ్ చేసినది',
    bar_available: 'అందుబాటులో ఉన్నది',

    // Orders Inbox
    orders_inbox: 'వచ్చిన కొనుగోలు ఆర్డర్లు',
    accept_btn: 'ఆర్డర్ ఆమోదించు',
    decline_btn: 'తిరస్కరించు',
    counter_btn: 'ధరను ప్రతిపాదించు',
    hold_countdown: 'స్టాక్ హోల్డ్ సమయం:',

    // Assistance
    assistance_btn_label: 'సహాయం కావాలా? అడగండి',
    stuck_nudge_text: 'ఇబ్బందిగా ఉందా? స్థానిక సమన్వయకర్తతో మాట్లాడటానికి ఇక్కడ నొక్కండి.',
    assistance_title: 'రైతు సహాయ కేంద్రం',
    help_what: 'మీకు ఎలాంటి సహాయం కావాలి?',
    help_how: 'సహాయం ఎలా అందుకోవాలనుకుంటున్నారు?',
    help_opt_list: 'పంటను లిస్ట్ చేయడంలో',
    help_opt_price: 'ధర నిర్ణయించుకోవడంలో',
    help_opt_quality: 'నాణ్యత & గ్రేడింగ్ పరీక్ష',
    help_opt_pickup: 'పికప్ మరియు రవాణా వివరాలు',
    help_opt_payment: 'బ్యాంక్ ఖాతా & చెల్లింపులు',
    help_opt_other: 'ఇతర సహాయం',
    help_method_call: 'నాకు ఫోన్ చేయండి',
    help_method_whatsapp: 'వాట్సాప్‌లో సందేశం పంపండి',
    help_method_visit: 'మా గ్రామానికి రండి',
    help_method_now: 'ఇప్పుడే పంటను నమోదు చేయండి',
    help_matching_msg: 'వరంగల్ స్థానిక కోఆర్డినేటర్ మరియు ఎఫ్.పి.ఓ.లతో అనుసంధానిస్తున్నాము...',
    helper_assigned_title: 'సమన్వయకర్త కేటాయించబడ్డారు',
    call_helper: 'ఫోన్ చేయండి',
    chat_helper: 'వాట్సాప్ సందేశం',

    // Farmer Approval
    farmer_approval_title: 'పికప్ తనిఖీ ఆమోదం',
    farmer_approval_desc: 'కలెక్షన్ ఏజెంట్ మీ పంటను తనిఖీ చేశారు. తూకం మరియు గ్రేడ్ వివరాలను పరిశీలించి ఆమోదించండి.',
    approve_verification: 'తనిఖీని ఆమోదించండి',
    raise_concern: 'అభ్యంతరం తెలపండి',
    earnings_estimate: 'అంచనా వేసిన తుది ఆదాయం',

    // Audio placeholders
    audio_listen: 'ఆడియో వివరణ వినండి'
  },

  // Hindi (हिन्दी)
  hi: {
    brand_tagline: 'सीधा संपर्क। सही निर्णय। निष्पक्ष बाजार।',
    built_for_bharat: 'भारत के किसानों के लिए समर्पित',
    from_soil_to_shelf: 'खेत से शेल्फ तक, एक साथ',
    hero_headline_1: 'सही निर्णय।',
    hero_headline_2: 'निष्पक्ष बाजार।',
    hero_subtext: 'किसान अपनी उपज दर्ज करते हैं। सत्यापित खरीदार अपनी जरूरत की मात्रा चुनते हैं। पिकअप, गुणवत्ता जांच और भुगतान एक ही जगह।',
    cta_farmer: 'मैं किसान हूँ (फसल बेचें)',
    cta_buyer: 'मैं खरीदार हूँ',
    cta_browse: 'लाइव स्टॉक देखें',
    cta_pickup_agent: 'मैं पिकअप एजेंट हूँ',
    cta_ask_help: 'मदद चाहिए? सहायता मांगें',
    trust_farmers_count: '1,240+ किसान पहले से मांग के साथ खेती कर रहे हैं।',

    // Navigation
    nav_how_it_works: 'यह कैसे काम करता है',
    nav_farmers: 'किसानों के लिए',
    nav_buyers: 'खरीदारों के लिए',
    nav_pickup: 'पिकअप एजेंट',
    nav_tracking: 'लाइव ट्रैकिंग',
    nav_marketplace: 'बाजार (मार्केट)',
    nav_signin: 'लॉग इन करें',
    nav_get_started: 'शुरू करें',

    // Floating Hero Cards
    hero_card_demand_title: 'वारंगल के पास मांग',
    hero_card_demand_body: 'टमाटर की मांग 18% बढ़ी · 3 सत्यापित खरीदार तैयार',
    hero_card_pickup_title: 'पिकअप सत्यापित',
    hero_card_pickup_body: '8 किसानों का टमाटर · 600 किग्रा · ₹26/किग्रा (ग्रेड A 480 किग्रा · ग्रेड B 120 किग्रा)',
    hero_card_quality_title: 'घोषित गुणवत्ता',
    hero_card_quality_body: 'TDS 140 ppm · आज ही तुड़ाई हुई',
    hero_card_live_title: 'लाइव पिकअप',
    hero_card_live_body: 'वाहन 4 किमी दूर है · 12 मिनट में आगमन',
    hero_card_help_title: 'पास में समन्वयक',
    hero_card_help_body: 'आपके स्थानीय समन्वयक 3 किमी दूर हैं',

    // Farmer Stock Listing & Dashboard
    my_stock: 'मेरी फसलें (स्टॉक)',
    list_stock_btn: 'नया स्टॉक दर्ज करें',
    add_produce: 'फसल दर्ज करें',
    crop_name: 'फसल और किस्म',
    asking_price: 'मेरा विक्रय मूल्य',
    price_per_kg: '₹ प्रति किग्रा',
    price_notice: 'मूल्य केवल आप तय करते हैं। खरीदार इसे बदल नहीं सकते।',
    total_quantity: 'कुल मात्रा',
    min_order_qty: 'न्यूनतम ऑर्डर मात्रा',
    qty_step: 'मात्रा वृद्धि (बैच आकार)',
    quality_details: 'घोषित गुणवत्ता विवरण',
    tds_reading: 'सिंचाई जल TDS (ppm)',
    expected_grade: 'अनुमानित गुणवत्ता ग्रेड',
    grade_a: 'ग्रेड A (प्रीमियम उत्तम)',
    grade_b: 'ग्रेड B (मानक बाजार)',
    grade_c: 'ग्रेड C (प्रसंस्करण हेतु)',
    farming_method: 'खेती का तरीका',
    harvest_date: 'तुड़ाई का समय',
    shelf_life: 'अनुमानित शेल्फ लाइफ',
    pickup_location: 'पिकअप गांव / मंडल',
    live_preview: 'खरीदार का पूर्वावलोकन',
    save_draft: 'ड्राफ्ट सहेजें',
    submit_listing: 'स्टॉक प्रकाशित करें',
    farmer_declared: 'किसान द्वारा घोषित',
    verified_at_pickup: 'पिकअप पर सत्यापित',
    listed_with_help: 'सहायता से सूचीबद्ध:',

    // Status Badges
    status_live: 'लाइव (सक्रिय)',
    status_partly_reserved: 'आंशिक आरक्षित',
    status_sold_out: 'बिक चुका',
    status_paused: 'रोका गया',
    status_draft: 'ड्राफ्ट',
    status_requested: 'अनुरोध प्राप्त',
    status_accepted: 'स्वीकृत',
    status_pickup_scheduled: 'पिकअप निर्धारित',
    status_verified: 'सत्यापित एवं संग्रहित',
    status_delivered: 'वितरित',
    status_paid: 'भुगतान पूर्ण',

    // Stock bar labels
    bar_sold: 'बिका हुआ',
    bar_reserved: 'आरक्षित',
    bar_available: 'उपलब्ध',

    // Orders Inbox
    orders_inbox: 'आने वाले खरीदार अनुरोध',
    accept_btn: 'ऑर्डर स्वीकार करें',
    decline_btn: 'अस्वीकार करें',
    counter_btn: 'काउंटर ऑफर दें',
    hold_countdown: 'होल्ड समय समाप्त होगा:',

    // Assistance
    assistance_btn_label: 'मदद चाहिए? सहायता मांगें',
    stuck_nudge_text: 'कोई परेशानी? स्थानीय समन्वयक से जुड़ने के लिए यहाँ टैप करें।',
    assistance_title: 'किसान सहायता केंद्र',
    help_what: 'आपको किस प्रकार की सहायता चाहिए?',
    help_how: 'आप सहायता कैसे पाना चाहते हैं?',
    help_opt_list: 'फसल दर्ज करने में',
    help_opt_price: 'मूल्य तय करने में',
    help_opt_quality: 'गुणवत्ता व ग्रेडिंग जांच',
    help_opt_pickup: 'पिकअप व परिवहन जानकारी',
    help_opt_payment: 'भुगतान व बैंक खाता',
    help_opt_other: 'अन्य कोई सवाल',
    help_method_call: 'मुझे कॉल करें',
    help_method_whatsapp: 'व्हाट्सएप पर चैट करें',
    help_method_visit: 'मेरे गांव आकर मिलें',
    help_method_now: 'मेरी फसल अभी दर्ज करवाएं',
    help_matching_msg: 'वारंगल के नजदीकी समन्वयक और एफपीओ से संपर्क हो रहा है...',
    helper_assigned_title: 'समन्वयक मिल गए',
    call_helper: 'कॉल करें',
    chat_helper: 'व्हाट्सएप चैट',

    // Farmer Approval
    farmer_approval_title: 'पिकअप सत्यापन अनुमोदन',
    farmer_approval_desc: 'कलेक्शन एजेंट ने आपकी उपज की जांच की है। पुष्टि करने से पहले दर्ज वजन और ग्रेड की समीक्षा करें।',
    approve_verification: 'सत्यापन स्वीकृत करें',
    raise_concern: 'आपत्ति दर्ज करें',
    earnings_estimate: 'अनुमानित अंतिम कमाई',

    // Audio placeholders
    audio_listen: 'ऑडियो सुनें'
  }
};

/**
 * Translation helper with graceful fallback
 */
export function t(key, lang = null) {
  const currentLang = lang || document.documentElement.lang || DEFAULT_LANGUAGE;
  if (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) {
    return TRANSLATIONS[currentLang][key];
  }
  // Fallback to English
  if (TRANSLATIONS[FALLBACK_LANGUAGE] && TRANSLATIONS[FALLBACK_LANGUAGE][key]) {
    return TRANSLATIONS[FALLBACK_LANGUAGE][key];
  }
  return key;
}


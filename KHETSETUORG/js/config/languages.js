/* ==========================================================================
   KhetSetu (खेत सेतु) — Languages Configuration (Section 5)
   8 Languages, Native Scripts, Default: Telugu (Warangal sample data)
   ========================================================================== */

export const LANGUAGES = [
  {
    code: 'te',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    font: 'Noto Sans Telugu',
    region: 'Telangana & Andhra Pradesh',
    badge: 'డిఫాల్ట్ / Default'
  },
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    font: 'Plus Jakarta Sans',
    region: 'All India',
    badge: 'Standard'
  },
  {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    font: 'Noto Sans Devanagari',
    region: 'North & Central India',
    badge: 'लोकप्रिय'
  },
  {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    font: 'Noto Sans Tamil',
    region: 'Tamil Nadu',
    badge: 'விருப்பம்'
  },
  {
    code: 'mr',
    nativeName: 'मराठी',
    englishName: 'Marathi',
    font: 'Noto Sans Devanagari',
    region: 'Maharashtra',
    badge: 'पर्याय'
  },
  {
    code: 'bn',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    font: 'Noto Sans Bengali',
    region: 'West Bengal',
    badge: 'বিকল্প'
  },
  {
    code: 'kn',
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    font: 'Noto Sans Kannada',
    region: 'Karnataka',
    badge: 'ಆಯ್ಕೆ'
  },
  {
    code: 'gu',
    nativeName: 'ગુજરાતી',
    englishName: 'Gujarati',
    font: 'Noto Sans Gujarati',
    region: 'Gujarat',
    badge: 'વિકલ્પ'
  }
];

export const DEFAULT_LANGUAGE = 'te';
export const FALLBACK_LANGUAGE = 'en';


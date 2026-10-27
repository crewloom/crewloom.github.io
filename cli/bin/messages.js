/** Copy for workspace operations; existing CLI diagnostics elsewhere remain English. */
const dictionaries = {
  en: {
    initOk: 'Initialized .crewloom/config.json.',
    initFailed: 'Initialization failed; existing configuration has been preserved:',
    verifyOk: 'Verification passed.',
    verifyFailed: 'Verification failed. Required checks must all pass.',
    suitePass: 'PASS', suiteFail: 'FAIL',
  },
  ar: {
    initOk: 'تم إنشاء .crewloom/config.json.',
    initFailed: 'تعذر الإعداد؛ تم الحفاظ على ملف الإعدادات الموجود:',
    verifyOk: 'نجحت جميع فحوص التحقق.',
    verifyFailed: 'فشل التحقق. يجب نجاح جميع الفحوص المطلوبة.',
    suitePass: 'نجح', suiteFail: 'فشل',
  },
};
export function translate(key) {
  const locale = process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || 'en';
  return dictionaries[locale.startsWith('ar') ? 'ar' : 'en'][key];
}

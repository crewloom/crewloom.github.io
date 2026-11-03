/** Copy for workspace operations; existing CLI diagnostics elsewhere remain English. */
const dictionaries = {
  en: {
    initOk: 'Initialized .crewloom/config.json.',
    initFailed: 'Initialization failed; existing configuration has been preserved:',
    verifyOk: 'Verification passed.',
    verifyFailed: 'Verification failed. Required checks must all pass.',
    suitePass: 'PASS', suiteFail: 'FAIL',
    'agent:missing-entry': 'Agent CLI entry not found; clone the agent repository into the workspace:',
    'agent:missing-dependencies': 'Agent dependencies are not installed; run `pnpm install` in:',
    'agent:launch': 'Could not start the agent CLI:',
    'agent:signal': 'The agent CLI was terminated by a signal:',
    bannerSubtitle: 'Sovereign AI Agent Engine',
    bannerCore: 'Dual Bicultural Core (En/Ar)',
    bannerTagline: 'Give agent work a {role}, {memory}, and {evidence}.',
    bannerRole: 'role',
    bannerMemory: 'memory',
    bannerEvidence: 'evidence',
    bannerTaglineAlt: 'اعطِ شغل الوكيل {role} و{memory} و{evidence}.',
    bannerRoleAlt: 'دورًا',
    bannerMemoryAlt: 'ذاكرة',
    bannerEvidenceAlt: 'دليلًا',
  },
  ar: {
    initOk: 'تم إنشاء .crewloom/config.json.',
    initFailed: 'تعذر الإعداد؛ تم الحفاظ على ملف الإعدادات الموجود:',
    verifyOk: 'نجحت جميع فحوص التحقق.',
    verifyFailed: 'فشل التحقق. يجب نجاح جميع الفحوص المطلوبة.',
    suitePass: 'نجح', suiteFail: 'فشل',
    'agent:missing-entry': 'لم يُعثر على مدخل واجهة الوكيل؛ انسخ مستودع agent داخل مساحة العمل:',
    'agent:missing-dependencies': 'اعتماديات الوكيل غير مثبتة؛ شغّل `pnpm install` في:',
    'agent:launch': 'تعذر تشغيل واجهة الوكيل:',
    'agent:signal': 'أُنهيت واجهة الوكيل بإشارة:',
    bannerSubtitle: 'محرك وكلاء الذكاء الاصطناعي السيادي',
    bannerCore: 'نواة ثنائية الثقافة (عربي/إنجليزي)',
    bannerTagline: 'اعطِ شغل الوكيل {role} و{memory} و{evidence}.',
    bannerRole: 'دورًا',
    bannerMemory: 'ذاكرة',
    bannerEvidence: 'دليلًا',
    bannerTaglineAlt: 'Give agent work a {role}, {memory}, and {evidence}.',
    bannerRoleAlt: 'role',
    bannerMemoryAlt: 'memory',
    bannerEvidenceAlt: 'evidence',
  },
};
export function translate(key) {
  const locale = process.env.LC_ALL || process.env.LC_MESSAGES || process.env.LANG || 'en';
  return dictionaries[locale.startsWith('ar') ? 'ar' : 'en'][key];
}

import { FaqItem } from '@/types/seo';

export const FAQS_EN: FaqItem[] = [
  {
    question: 'What is Crewloom?',
    answer:
      'Crewloom (https://crewloom.org) is an enterprise-grade sovereign autonomous AI coding agent. It combines 44 open-source specialist skills with a dual English/Arabic core, rigorous non-destructive contract verification, and an omni-channel bridge control room.',
  },
  {
    question: 'How does Crewloom guarantee Zero-Destruction coding?',
    answer:
      'Crewloom integrates pre-execution AST syntax audits, contract verification, and strict additive migration constraints. Any destructive drop operations, unversioned regressions, or unauthorized file deletions are automatically caught and blocked before execution.',
  },
  {
    question: 'How does Crewloom compare to Devin, Cursor, and Windsurf?',
    answer:
      'Unlike cloud-bound code generators, Crewloom is sovereign-first: it runs as a native lightweight background daemon (<0.8ms latency), supports 100% offline air-gapped local models (Ollama/llama.cpp), features full English and Arabic linguistic parity, and connects to remote control bridges like Telegram and WhatsApp.',
  },
  {
    question: 'How do I install Crewloom on macOS or Linux?',
    answer:
      'You can install Crewloom with a single command in your terminal: curl -fsSL https://crewloom.org/install.sh | bash. It also provides a native macOS Cocoa app (58KB binary) and official Homebrew tap.',
  },
  {
    question: 'Can Crewloom run completely offline with local LLMs?',
    answer:
      'Yes. Crewloom was designed for complete data privacy and air-gapped sovereignty. You can point it directly to your local Ollama or llama.cpp socket with zero external telemetry or cloud dependencies.',
  },
];

export const FAQS_AR: FaqItem[] = [
  {
    question: 'ما هو Crewloom (كرو لوم)؟',
    answer:
      'كرو لوم (https://crewloom.org) هو وكيل برمجي ذكي ومستقل يتميز بالسيادة والأمان الفائق. يدمج ٤٤ مهارة تخصصية مفتوحة المصدر مع نواة ذكاء ثنائية عربية/إنجليزية، ونظام فحص عقود صارم يمنع الهدم، وغرفة تحكم شاملة عبر التليجرام والواتساب وتطبيقات سطح المكتب والطرفية.',
  },
  {
    question: 'كيف يضمن Crewloom عدم الهدم أو التدمير البرمجي؟',
    answer:
      'يطبق Crewloom تدقيقاً صارماً على مستوى شجرة الصرف والنحو البرمجية (AST) وعقود الأمان قبل تنفيذ أي أمر؛ مما يمنع نهائياً مسح قواعد البيانات (DROP) أو كسر التوافقية العكسية أو التعديلات العشوائية في بيئات الإنتاج الحية.',
  },
  {
    question: 'ما الفرق بين Crewloom وبين Devin و Cursor و Copilot؟',
    answer:
      'كرو لوم مبني لمبدأ السيادة الكاملة: لا يجبرك على رفع أسرار مشروعك إلى سحابة خارجية، ويعمل كخادم خفيف فوري (أقل من 0.8 ملي ثانية)، ويدعم النماذج المحلية بنسبة 100% (مثل Ollama)، ويتعامل بالعربية والإنجليزية بنفس القوة، فضلاً عن تحكمه السحابي عبر التليجرام.',
  },
  {
    question: 'كيف أقوم بتثبيت واستخدام Crewloom؟',
    answer:
      'يمكن التثبيت عبر أمر مباشر في الطرفية: curl -fsSL https://crewloom.org/install.sh | bash، كما يتوفر تطبيق ماك أصلي فائق السرعة وخفيف الحجم (58 كيلوبايت) وحزمة Homebrew الرسمية.',
  },
  {
    question: 'هل يدعم Crewloom العمل في البيئات المعزولة عن الإنترنت (Air-gapped)؟',
    answer:
      'نعم، صُمم كرو لوم ليكون سيادياً وخالياً من أي تسريبات للمعلومات. يمكنك تشغيله بالكامل على معالجات جهازك المحلية عبر مقبس Ollama دون الحاجة لأي اتصال بالإنترنت.',
  },
];

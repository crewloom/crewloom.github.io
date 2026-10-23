export interface Article {
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  date: string;
  readTimeEn: string;
  readTimeAr: string;
  author: string;
  categoryEn: string;
  categoryAr: string;
  tags: string[];
  contentEn: string;
  contentAr: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'introducing-crewloom',
    titleEn: 'Introducing Crewloom: The Sovereign Autonomous AI Coding Agent',
    titleAr: 'إطلاق كرو لوم Crewloom: الوكيل البرمجي السيادي المطور للأتمتة غير التدميرية',
    descriptionEn: 'Discover Crewloom (https://crewloom.org), the autonomous development runtime uniting 44 open-source specialist skills with strict Zero-Destruction verification.',
    descriptionAr: 'تعرف على كرو لوم Crewloom، بيئة التطوير المستقلة التي تجمع 44 خبيراً برمجياً مع ميثاق عدم الهدم المطلق ونواة ذكاء اصطناعي عربية وإنجليزية.',
    date: '2026-10-23',
    readTimeEn: '5 min read',
    readTimeAr: '٥ دقائق قراءة',
    author: 'Crewloom Core Architecture Team',
    categoryEn: 'Announcements',
    categoryAr: 'إعلانات وإصدارات',
    tags: ['Crewloom', 'AI Coding Agent', 'Zero Destruction', 'Open Source', 'Sovereign AI'],
    contentEn: `
## The New Era of Sovereign Software Engineering

Traditional software engineering with AI has reached an inflection point. While autocomplete tools and cloud-locked assistants help write code faster, they routinely introduce catastrophic regressions, erase persistent database state with unverified DROP statements, and compromise intellectual property through unmonitored telemetry streams.

**Crewloom (https://crewloom.org)** was built from the ground up to solve these core vulnerabilities through a radical new paradigm: **Sovereign Zero-Destruction Autonomy**.

### 1. The Dual-Core Sovereign Architecture
Unlike generalist models forced to act as developers, Crewloom divides responsibilities into a 3-tier sovereign runtime:
- **Layer 01 — Open-Source Specialist Skills (44 Personas)**: Deep domain knowledge across backend frameworks, distributed databases, frontend performance, and penetration security.
- **Layer 02 — Crewloom Bridge**: An ultra-lightweight daemon enabling developers to orchestrate missions directly from the terminal, macOS Cocoa desktop application, or remote channels like Telegram and WhatsApp.
- **Layer 03 — Proprietary Zero-Loss Harness**: A disciplined core operating under a strict constitution that forbids unverified mutations to existing systems.

### 2. The Zero-Destruction Guarantee
Before any generated diff is committed to your workspace or executed on a live database, Crewloom executes formal **AST (Abstract Syntax Tree) auditing** and contract checks:
- Strict rejection of destructive schema queries (DROP, TRUNCATE, unchecked ALTER).
- Additive migrations only with automatic rollback test runs.
- Sub-millisecond pre-flight regression checks on all dependent files.

### 3. Immediate Universal Deployment
You can deploy Crewloom on any modern macOS or Linux workstation with a single terminal command:
\`\`\`bash
curl -fsSL https://crewloom.org/install.sh | bash
\`\`\`

Join the movement toward sovereign, safe, and autonomous software development at [crewloom.org](https://crewloom.org).
    `,
    contentAr: `
## عصر جديد من هندسة البرمجيات السيادية والآمنة

وصل تطوير البرمجيات باستخدام الذكاء الاصطناعي إلى نقطة تحول حاسمة. فرغم أن أدوات الإكمال التلقائي والمساعدات السحابية تزيد من سرعة كتابة الكود، إلا أنها كثيراً ما تتسبب في كوارث برمجية كمسح قواعد البيانات أو كسر التوافقية العكسية أو تسريب البيانات الحساسة عبر خوادم سحابية مجهولة.

جاء **كرو لوم Crewloom (https://crewloom.org)** ليعيد صياغة المشهد بالكامل من خلال مبدأ **الأتمتة السيادية غير التدميرية (Zero-Destruction Autonomy)**.

### 1. معمارية سيادية ثلاثية الطبقات
بدلاً من الاعتماد على نموذج ذكاء اصطناعي عام، يعتمد كرو لوم على هيكل منظم:
- **الطبقة الأولى — مكتبة الـ 44 خبيراً تخصصياً**: خبراء مستقلون في قواعد البيانات، والواجهات، والأمان، وهندسة السحابة.
- **الطبقة الثانية — جسر التحكم الحي (Crewloom Bridge)**: خادم خفيف للتحكم عبر التليجرام أو الواتساب أو الطرفية أو تطبيق الماك المكتبي.
- **الطبقة الثالثة — محرك الانضباط السيادي**: محرّك محمي بدستور صارم يمنع المساس بالأصول البرمجية دون تدقيق.

### 2. ميثاق عدم الهدم المطلق
قبل اعتماد أي تعديل في مستودع الكود أو قاعدة البيانات، يمر الكود بفحص شجرة الصرف والنحو (AST):
- المنع المطلق لأي أوامر تدميرية (مثل DROP أو TRUNCATE).
- فرض التهجير التزايدي (Additive Migrations) واختبار التراجع التلقائي.
- فحص التوافقية وسرعة استجابة فورية أقل من 0.8 ملي ثانية.

### 3. التثبيت الفوري في ثوانٍ
يمكنك البدء فوراً بأمر واحد في الطرفية:
\`\`\`bash
curl -fsSL https://crewloom.org/install.sh | bash
\`\`\`
    `,
  },
  {
    slug: 'crewloom-vs-devin-vs-cursor',
    titleEn: 'Crewloom vs Devin vs Cursor vs Windsurf: 2026 Architectural Comparison',
    titleAr: 'مقارنة معمارية شاملة: Crewloom مقابل Devin و Cursor و Windsurf',
    descriptionEn: 'A deep technical benchmark comparing privacy, database safety, offline local inference, and multi-channel bridge control.',
    descriptionAr: 'مقارنة تقنية دقيقة بين كرو لوم وأدوات البرمجة الذكية العالمية من حيث الأمان والخصوصية والعمل دون إنترنت.',
    date: '2026-10-23',
    readTimeEn: '7 min read',
    readTimeAr: '٧ دقائق قراءة',
    author: 'Crewloom Research',
    categoryEn: 'Benchmarks',
    categoryAr: 'مقارنات وأبحاث',
    tags: ['Crewloom vs Devin', 'Cursor', 'Windsurf', 'AI Benchmarks', 'Coding Agents'],
    contentEn: `
## Why We Benchmarked the World's Leading Coding Agents

As AI coding agents transition from experimental demos to enterprise development workflows, engineering teams demand clear answers on three non-negotiable vectors:
1. **Safety**: Will the agent corrupt production data or delete critical code?
2. **Sovereignty & Privacy**: Does company code leak to third-party model providers?
3. **Omni-Channel Autonomy**: Can the agent execute background missions independently?

Here is how **Crewloom (https://crewloom.org)** compares directly against Devin, Cursor, and Windsurf:

| Feature / Capability | Crewloom | Devin | Cursor | Windsurf |
| :--- | :--- | :--- | :--- | :--- |
| **Destruction Policy** | **Strict Zero-Loss AST Guard** | Best-effort heuristic | None (Editor Diff) | None (Editor Diff) |
| **Offline Local Inference** | **100% Native (Ollama/llama.cpp)** | No (Cloud Only) | Limited | Limited |
| **Dual-Core English/Arabic** | **Full Native Parity** | Weak Translation | Partial | Partial |
| **Omni-Channel Bridge** | **Telegram, WhatsApp, CLI, Cocoa** | Web Sandbox Only | Editor Only | Editor Only |
| **Specialist Roles** | **44 Dedicated Personas** | Monolithic Model | Generalist LLM | Generalist LLM |
| **Boot Latency** | **< 0.8ms (Native Binary)** | Cloud Spin-up (~30s) | Instant (Editor) | Instant (Editor) |

### Key Takeaways
- **Cursor and Windsurf** are exceptional editor autocompletes, but lack autonomous background multi-agent execution and production guardrails.
- **Devin** provides cloud sandbox autonomy, but locks user code into proprietary remote environments with significant latency and high recurring costs.
- **Crewloom** provides the best of both worlds: local workstation speed, multi-agent autonomous missions, and strict mathematical guarantees against destructive operations.
    `,
    contentAr: `
## لماذا نحتاج لمقارنة تقنية واضحة لأدوات الذكاء الاصطناعي البرمجي؟

مع انتقال وكلاء البرمجة من مجرد تجارب إلى أنظمة تشغيل حية في بيئات الإنتاج، تبحث فرق التطوير عن إجابات حاسمة حول:
1. **الأمان البرمجي**: هل سيتسبب الذكاء الاصطناعي في مسح بيانات حيوية؟
2. **السيادة والخصوصية**: هل تتسرب أسرار الكود إلى سحابة الشركات الخارجية؟
3. **حرية الاستخدام والتحكم**: هل يمكن تشغيل المهام أثناء غياب المطور عن الحاسوب؟

إليك جدول المقارنة الشامل بين **كرو لوم Crewloom (https://crewloom.org)** و Devin و Cursor و Windsurf:

| الميزة والمعيار | Crewloom | Devin | Cursor | Windsurf |
| :--- | :--- | :--- | :--- | :--- |
| **ضمان عدم الهدم والكسر** | **فحص شجرة AST صارم 100%** | تقدير نسبي غير مضمون | لا يوجد (محرر كود) | لا يوجد (محرر كود) |
| **العمل بدون إنترنت (محلياً)** | **مدعوم 100% (Ollama/llama.cpp)** | لا (سحابي فقط) | محدود جداً | محدود جداً |
| **الدعم العربي الكامل** | **نواة ثنائية معمارية أصلية** | ترجمة آلية ضعيفة | جزئي | جزئي |
| **التحكم العابر للقنوات** | **تليجرام، واتساب، طرفية، تطبيق ماك** | واجهة ويب فقط | محرر الكود فقط | محرر الكود فقط |
| **كتيبة الخبراء التخصصية** | **44 خبيراً مستقلاً** | نموذج أحادي عام | نموذج أحادي عام | نموذج أحادي عام |
| **سرعة الإقلاع** | **أقل من 0.8 ملي ثانية** | تهيئة سحابية (30 ثانية) | لحظي (محرر) | لحظي (محرر) |
    `,
  },
  {
    slug: 'zero-destruction-ast-verification',
    titleEn: 'Zero-Destruction Autonomy: How Crewloom Protects Production Systems',
    titleAr: 'ميثاق عدم الهدم البرمجي: كيف يحمي Crewloom قواعد البيانات والأنظمة الحية؟',
    descriptionEn: 'An engineering deep dive into AST diff auditing, binding safety constitutions, and pre-commit verification.',
    descriptionAr: 'شرح هندسي عميق لكيفية منع التعديلات العشوائية وحماية قواعد البيانات من المسح والأخطاء الكارثية.',
    date: '2026-10-23',
    readTimeEn: '6 min read',
    readTimeAr: '٦ دقائق قراءة',
    author: 'Safety & Guard Engineering',
    categoryEn: 'Engineering',
    categoryAr: 'هندسة وأنظمة',
    tags: ['Zero Destruction', 'AST Verification', 'Database Safety', 'Reliability'],
    contentEn: `
## The Danger of Autonomous AI in Production

When an AI agent is granted filesystem access and database execution credentials, traditional safeguard models fall short. A hallucinated SQL statement such as:
\`\`\`sql
DROP TABLE users; -- Intended to be temporary cache cleanup
\`\`\`
can wipe years of company history in milliseconds.

### The Crewloom Zero-Destruction Architecture
In **Crewloom**, no action ever bypasses the Non-Destructive Guard. This pipeline executes three sequential validation gates before disk or network mutations:

1. **Gate 1: AST Semantic Audit**:
   The generated code or SQL is parsed into an Abstract Syntax Tree (AST). Destructive nodes (drop table, unconditioned delete, truncations, force-push commits) are flagged and terminated at the AST level.
2. **Gate 2: Additive-Only Database Contract**:
   Database migrations must strictly expand state rather than destruct it. Schema adjustments require explicit deprecation cycles and migration rollbacks tested in-memory before production application.
3. **Gate 3: Multi-Skill Peer Consensus**:
   Before a mission is marked complete, designated review specialist roles (e.g. \`security-audit\`, \`regression-verifier\`) audit the change set against the project constitution.

Learn more and explore the full benchmark simulator at [crewloom.org](https://crewloom.org/#simulator).
    `,
    contentAr: `
## مخاطر الوكلاء المستقلين في بيئات العمل الحقيقية

عندما يُمنح وكيل الذكاء الاصطناعي صلاحيات التعديل على الملفات وقواعد البيانات، تصبح الحماية التقليدية عاجزة. جملة استعلامية خاطئة من النموذج مثل:
\`\`\`sql
DROP TABLE users;
\`\`\`
قادرة على محو سنوات من البيانات خلال جزء من الثانية.

### كيف يمنع كرو لوم Crewloom هذه الكوارث؟
في كرو لوم، لا يمكن لأي أمر أن يتجاوز **حارس عدم الهدم (Zero-Destruction Guard)**، الذي يعمل عبر 3 بوابات فحص إلزامية:

1. **البوابة الأولى: الفحص الصرفي لشجرة الكود (AST Audit)**:
   يتم تفكيك الكود أو الاستعلام إلى شجرة صرفية نحوية. إذا وُجد أي أمر تدميري كحذف الجداول أو مسح السجلات دون شرط دقيق، يتم إيقاف العملية فوراً.
2. **البوابة الثانية: عقد التوسع التزايدي فقط (Additive-Only)**:
   يجب أن تكون تعديلات قواعد البيانات تزايدية، بحيث تدعم التراجع التلقائي والتدرج في إيقاف الأعمدة القديمة دون هدم مباشر.
3. **البوابة الثالثة: إجماع الخبراء ومراجعة النظراء**:
   يقوم خبير فحص التراجعات (Regression Verifier) بمراجعة نتائج الكود والتأكد من عدم كسر أي اختبارات سابقة قبل تنفيذ الالتزام (Commit).
    `,
  },
  {
    slug: 'dalil-crewloom-arabic-developer-guide',
    titleEn: 'Crewloom Arabic Developer Guide: Sovereign AI Coding from Terminal to Telegram',
    titleAr: 'دليل المطور الشامل: ما هو كرو لوم Crewloom وكيف تبدأ استخدامه في دقيقة؟',
    descriptionEn: 'Practical developer guide for installing Crewloom, utilizing 44 specialist skills, and connecting remote bridges.',
    descriptionAr: 'دليل عملي للمطور العربي لكيفية تنصيب كرو لوم عبر سطر أوامر واحد، واستدعاء الـ 44 خبيراً برمجياً، والربط مع بوت التليجرام.',
    date: '2026-10-23',
    readTimeEn: '4 min read',
    readTimeAr: '٤ دقائق قراءة',
    author: 'فريق رموز وهندسة كرو لوم',
    categoryEn: 'Guides',
    categoryAr: 'أدلة إرشادية',
    tags: ['كرو لوم', 'ذكاء اصطناعي عربي', 'دليل المطور', 'تثبيت Crewloom', 'أدوات المبرمجين'],
    contentEn: `
## Complete Developer Quickstart for Crewloom

Welcome to the definitive developer guide for **Crewloom (كرو لوم)**, the world's first sovereign autonomous AI coding agent featuring true native Arabic and English parity.

### Step 1: Universal Installation
Open your terminal on macOS or Linux and paste:
\`\`\`bash
curl -fsSL https://crewloom.org/install.sh | bash
\`\`\`
The installer verifies dependencies, compiles the native launcher, and registers the \`crewloom\` CLI tool globally.

### Step 2: Exploring the 44 Specialist Skills
List all available domain specialists in your terminal:
\`\`\`bash
crewloom roles --category backend
crewloom roles --category database
\`\`\`

### Step 3: Executing a Safe Mission
Run an autonomous mission with Zero-Destruction verification:
\`\`\`bash
crewloom run "Refactor database migrations to be strictly additive and audit against DAC-01 contract"
\`\`\`

### Step 4: Connecting the Telegram Bridge
Stay in control of long-running missions from your phone:
\`\`\`bash
crewloom bridge telegram --bot-token YOUR_TOKEN
\`\`\`

Visit the official website [https://crewloom.org](https://crewloom.org) for documentation and community updates.
    `,
    contentAr: `
## الدليل العملي السريع لتشغيل كرو لوم للمطورين

أهلاً بك في الدليل الرسمي الشامل لأداة **كرو لوم Crewloom (https://crewloom.org)**، أول وكيل برمجي سيادي يتمتع بنواة ذكاء عربية وإنجليزية حقيقية ومصمم للأمان المطلق.

### الخطوة الأولى: التثبيت الفوري
افتح الطرفية (Terminal) على جهاز الماك أو اللينكس ونفذ:
\`\`\`bash
curl -fsSL https://crewloom.org/install.sh | bash
\`\`\`
سيقوم برنامج التثبيت الذكي بإعداد بيئة العمل وتسجيل أمر \`crewloom\` عالمياً على جهازك.

### الخطوة الثانية: استعراض الخبراء البرمجيين (44 خبيراً)
يمكنك عرض المهارات المتاحة بحسب التخصص:
\`\`\`bash
crewloom roles --category backend
crewloom roles --category database
\`\`\`

### الخطوة الثالثة: تنفيذ مهمة برمجية آمنة
وجّه كرو لوم لتنفيذ مهمة معقدة باللغة العربية أو الإنجليزية:
\`\`\`bash
crewloom run "قم بتحسين أداء استعلامات قاعدة البيانات وتأكد من تطبيق ميثاق عدم الهدم"
\`\`\`

### الخطوة الرابعة: الربط مع بوت التليجرام
يمكنك متابعة وتوجيه المهام الطويلة وأنت خارج المنزل مباشرة عبر تليجرام:
\`\`\`bash
crewloom bridge telegram --bot-token YOUR_TOKEN
\`\`\`

لمزيد من المعلومات، تفضل بزيارة الموقع الرسمي: [crewloom.org](https://crewloom.org).
    `,
  },
];

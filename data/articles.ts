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
    descriptionEn: 'Discover Crewloom (https://crewloom.org), the autonomous development runtime uniting 47 open-source specialist skills with strict Zero-Destruction verification.',
    descriptionAr: 'تعرف على كرو لوم Crewloom، بيئة التطوير المستقلة التي تجمع 47 خبيراً برمجياً مع ميثاق عدم الهدم المطلق ونواة ذكاء اصطناعي عربية وإنجليزية.',
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
- **Layer 01 — Open-Source Specialist Skills (47 Personas)**: Deep domain knowledge across backend frameworks, distributed databases, frontend performance, and penetration security.
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
- **الطبقة الأولى — مكتبة الـ 47 خبيراً تخصصياً**: خبراء مستقلون في قواعد البيانات، والواجهات، والأمان، وهندسة السحابة.
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
| **Destruction Policy** | **Strict AST Contract Guard** | Best-effort heuristic | None (Editor Diff) | None (Editor Diff) |
| **Offline Local Inference** | **Supported (Ollama/llama.cpp)** | No (Cloud Only) | Limited | Limited |
| **Dual-Core English/Arabic** | **Full Native Parity** | Weak Translation | Partial | Partial |
| **Omni-Channel Bridge** | **Telegram, WhatsApp, CLI, Cocoa** | Web Sandbox Only | Editor Only | Editor Only |
| **Specialist Roles** | **47 Dedicated Personas** | Monolithic Model | Generalist LLM | Generalist LLM |
| **Execution Architecture** | **Native Daemon (< 0.8ms IPC)** | Cloud Spin-up (~30s) | Editor Integrated | Editor Integrated |

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
| **سياسة حماية الأكواد** | **تدقيق AST صارم للعقود** | تقدير نسبي غير ملزم | لا يوجد (محرر كود) | لا يوجد (محرر كود) |
| **العمل بدون إنترنت (محلياً)** | **مدعوم محلياً (Ollama/llama.cpp)** | لا (سحابي فقط) | محدود جداً | محدود جداً |
| **الدعم العربي الكامل** | **نواة ثنائية معمارية أصلية** | ترجمة آلية ضعيفة | جزئي | جزئي |
| **التحكم العابر للقنوات** | **تليجرام، واتساب، طرفية، تطبيق ماك** | واجهة ويب فقط | محرر الكود فقط | محرر الكود فقط |
| **كتيبة الخبراء التخصصية** | **47 خبيراً مستقلاً** | نموذج أحادي عام | نموذج أحادي عام | نموذج أحادي عام |
| **معمارية التشغيل** | **خادم محلي فائق الخفة (< 0.8ms IPC)** | تهيئة سحابية (~30 ثانية) | مدمج داخل المحرر | مدمج داخل المحرر |
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
    descriptionEn: 'Practical developer guide for installing Crewloom, utilizing 47 specialist skills, and connecting remote bridges.',
    descriptionAr: 'دليل عملي للمطور العربي لكيفية تنصيب كرو لوم عبر سطر أوامر واحد، واستدعاء الـ 47 خبيراً برمجياً، والربط مع بوت التليجرام.',
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

### Step 2: Exploring the 47 Specialist Skills
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

### الخطوة الثانية: استعراض الخبراء البرمجيين (47 خبيراً)
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
  {
    slug: 'crewloom-vs-claude-code-and-open-code-agents',
    titleEn: 'Crewloom vs Claude Code vs Open Code Agents: The Sovereign Smart Agent Architectural Standard',
    titleAr: 'مقارنة كرو لوم مع كلود كود (Claude Code) ومشاريع الأوبن كود: عصر الإيجنت الذكي والسيادة البرمجية',
    descriptionEn: 'An in-depth 2026 architectural benchmark comparing Crewloom against Claude Code and open code coding agents across AST safety, air-gapped sovereignty, omni-channel orchestration, and smart agent intelligence.',
    descriptionAr: 'مقارنة هندسية معمارية شاملة لعام 2026 بين كرو لوم وكلود كود (Claude Code) ومشاريع الأوبن كود من حيث أمان AST، والسيادة بدون اتصال، والتحكم العابر للقنوات، وقدرات الإيجنت الذكي الفائق.',
    date: '2026-10-23',
    readTimeEn: '7 min read',
    readTimeAr: '٧ دقائق قراءة',
    author: 'Crewloom Core Architecture Team',
    categoryEn: 'Benchmarks & Comparisons',
    categoryAr: 'مقارنات واختبارات معمارية',
    tags: [
      'Claude Code',
      'Open Code',
      'Smart Agent',
      'كلود كود',
      'اوبن كود',
      'ايجنت ذكي',
      'AI Coding Agents',
      'Zero Destruction',
      'Sovereign AI',
    ],
    contentEn: `
## The Shift from Cloud-Tethered Assistants to Sovereign Smart Agents

In 2026, developer workflows have shifted dramatically from passive inline autocompletion to autonomous **AI coding agents** capable of executing multi-file refactoring, writing comprehensive test suites, and orchestrating entire infrastructure migrations.

With the emergence of tools like Anthropic's **Claude Code** and various community **open code** frameworks, developers now face a critical architectural decision: Should your engineering workflows be tethered to closed cloud APIs with unmonitored telemetry, or should they run on a **sovereign, disciplined smart agent** with strict Zero-Destruction verification?

Here is how **Crewloom (https://crewloom.org)** compares against Claude Code and generic open code agents across security, autonomy, and speed.

### 1. Comparative Architecture Benchmark

| Dimension | Crewloom (https://crewloom.org) | Anthropic Claude Code | Generic Open Code Agents |
| :--- | :--- | :--- | :--- |
| **Architectural Model** | Dual-Core Sovereign (47 Specialist Skills + Core) | Single-Model CLI Wrapper | Unstructured LLM Loop |
| **AST Zero-Destruction** | Guaranteed (Pre-flight AST audits block DROP/TRUNCATE) | None (Relies on manual git rollback) | None (Prone to code erasure) |
| **Cloud Sovereignty** | 100% Local / Air-Gapped / Zero External Telemetry | Cloud-Tethered (Sends workspace to external servers) | Variable (Often requires third-party API keys) |
| **Linguistic Intelligence** | Native Bilingual (English & Arabic equal parity) | English-First (Limited Arabic technical grammar) | English-First |
| **Bridge Control** | Omni-Channel (Terminal, macOS App, Telegram, WhatsApp) | Terminal CLI Only | Terminal CLI Only |
| **Execution Latency** | Sub-millisecond Unix daemon (<0.8ms IPC overhead) | Cloud Round-Trip Latency (2-5s per tool call) | Dependent on external endpoint |
| **License & Ecosystem** | Open Specialist Layer + Sovereign Core | Closed Commercial Proprietary | Open-Source |

### 2. Why Crewloom is the Ultimate Open Code Alternative to Claude Code

While Claude Code demonstrates impressive reasoning over isolated command-line tasks, it suffers from three fundamental structural constraints:
1. **Telemetry & Privacy Risks**: Proprietary intellectual property, internal schema architectures, and proprietary business logic are continually dispatched to remote inference clusters. Crewloom, by contrast, operates fully offline using local Ollama or llama.cpp sockets.
2. **Lack of Formal Mutation Contracts**: Claude Code executes edits as optimistic diffs. When an incorrect regex or hallucinated SQL statement is executed, live databases can suffer irreversible table drops. Crewloom's **Zero-Destruction AST verification** intercepts and aborts any destructive mutation before it touches disk or database connections.
3. **Omni-Channel Autonomous Coordination**: Software development does not stop when you step away from your keyboard. Crewloom’s bridge daemon connects your running project directly to secure Telegram or WhatsApp channels, allowing you to review diffs and authorize deployments on mobile.

### 3. Quick Installation

You can deploy Crewloom on any macOS or Linux environment in seconds:
\`\`\`bash
curl -fsSL https://crewloom.org/install.sh | bash
\`\`\`

Learn more about Crewloom's sovereign developer ecosystem at [crewloom.org](https://crewloom.org).
    `,
    contentAr: `
## التحول الجذري من مساعدات الكود السحابية إلى الإيجنت الذكي والسيادي

في عام 2026، لم يعد المطورون يبحثون عن مجرد أدوات إكمال تلقائي (Autocomplete)، بل أصبح التركيز على **الوكلاء البرمجيين الأذكياء (Smart AI Coding Agents)** القادرين على أتمتة المشروعات وفحص بيئات العمل واختبار الكود ذاتياً.

مع ظهور أدوات مثل **كلود كود (Claude Code)** التابعة لشركة أنثروبيك، وانتشار نماذج **الأوبن كود (Open Code)** المختلفة، بات المطور العربي والعالمي أمام خيار معماري حاسم: هل تضع شفراتك وأسرار قواعد بياناتك رهن سحابة خارجية ترسل بياناتك، أم تعتمد على **إيجنت ذكي سيادي** مثل **كرو لوم Crewloom (https://crewloom.org)** بميثاق عدم الهدم المطلق؟

### 1. جدول المقارنة المعمارية الشاملة

| المعيار الهندسي | كرو لوم Crewloom | كلود كود Claude Code | مشاريع الأوبن كود العامة (Open Code) |
| :--- | :--- | :--- | :--- |
| **بنية النظام** | نواة سيادية ثنائية (47 خبيراً تخصصياً) | غلاف طرفية أحادي النموذج | حلقة استدعاءات LLM عادية |
| **ميثاق عدم الهدم البرمجي** | تدقيق AST إلزامي يمنع مسح الجداول والتراجع العشوائي | غير متوفر (يعتمد على مراجعة المطور) | غير متوفر (معرض لمسح الملفات) |
| **السيادة والعمل دون إنترنت** | 100% محلي / معزول بالكامل / بدون تسريب أسرار | سحابي بالكامل (يرسل الكود إلى السيرفرات) | يتطلب مفاتيح واجهات API خارجية |
| **اللغة العربية والأداء الفني** | دعم عربي وإنجليزي أصيل بكفاءة متطابقة | دعم إنجليزي في المقام الأول | إنجليزي فقط في الغالب |
| **غرفة التحكم العابرة للقنوات** | طرفية، تطبيق ماك أصلي، بوت تليجرام، واتساب | طرفية فقط (Terminal Only) | طرفية فقط |
| **سرعة الاستجابة اللحظية** | خادم خلفي خفيف (زمن انتقال أقل من 0.8 ملي ثانية) | انتظار استجابة السحابة (2-5 ثوانٍ لكل أمر) | متفاوت بحسب السيرفر الوسيط |

### 2. لماذا يعد كرو لوم أفضل بديل لـ كلود كود ومشاريع الأوبن كود؟

1. **السيادة الكاملة والأمان المحلي (Air-Gapped Privacy)**:
   لا تجبرك كرو لوم على مشاركة أسرار شركتك أو استعلامات قواعد بياناتك مع أي سيرفر خارجي. يمكنك تشغيلها بنسبة 100% أوفلاين مع نماذج محلية عبر Ollama.
2. **محرك تدقيق AST لمنع الهدم**:
   لا يمكن لأي إيجنت برمجي داخل كرو لوم كتابة استعلام مسح \`DROP TABLE\` أو \`TRUNCATE\` في قاعدة بيانات الإنتاج أو مسح مجلد غير مصرح به؛ حيث يتم حجب الأمر فحصاً دلالياً قبل تنفيذه.
3. **إيجنت ذكي متعدد التخصصات (Multi-Agent Specialist Architecture)**:
   يدمج كرو لوم 47 تخصصاً مستقلاً (قواعد بيانات، أمان، واجهات، بنية سحابية) بدلاً من الاعتماد على نموذج عام واحد يحاول القيام بكل شيء.

### 3. التثبيت الفوري

يمكنك تثبيت كرو لوم على جهاز الماك أو اللينكس بأمر واحد:
\`\`\`bash
curl -fsSL https://crewloom.org/install.sh | bash
\`\`\`

انضم إلى مجتمع التطوير السيادي المستقل عبر [crewloom.org](https://crewloom.org).
    `,
  },
  {
    slug: 'crewloom-vs-aider-and-cline-local-coding-agents',
    titleEn: 'Crewloom vs Aider vs Cline: 2026 Local Autonomous Coding Agent Benchmark',
    titleAr: 'مقارنة كرو لوم مع أيدر (Aider) وكلاين (Cline): الدليل الشامل لأقوى إيجنت ذكي محلي في 2026',
    descriptionEn: 'A deep comparative analysis between Crewloom, Aider, and Cline evaluating AST safety gates, token consumption efficiency, multi-agent specialization, and production readiness.',
    descriptionAr: 'تحليل مقارن معمق بين كرو لوم وأيدر (Aider) وكلاين (Cline) لتقييم بوابات أمان AST، واستهلاك التوكنز، والتخصص متعدد الوكلاء، والجاهزية لبيئات الإنتاج.',
    date: '2026-10-23',
    readTimeEn: '6 min read',
    readTimeAr: '٦ دقائق قراءة',
    author: 'Crewloom Core Architecture Team',
    categoryEn: 'Benchmarks & Comparisons',
    categoryAr: 'مقارنات واختبارات معمارية',
    tags: ['Aider', 'Cline', 'Roo Code', 'Local AI', 'AI Coding Agents', 'Smart Agent', 'اوبن كود', 'ايجنت ذكي'],
    contentEn: `
## The Battle for Local Terminal Coding Supremacy

As developers increasingly reject cloud-locked subscriptions that expose their private source code, local CLI coding agents have surged in popularity. Tools like **Aider** and **Cline (formerly Claude Dev)** pioneered interactive prompt-driven development.

However, running terminal coding tools in production codebases introduces significant failure modes: hallucinated diff loops, token exhaustion on large repos, and silent breakage of untested dependencies.

**Crewloom (https://crewloom.org)** addresses these exact pain points by combining open specialist skills with a non-negotiable **Zero-Destruction Constitution**.

### 1. Feature Matrix: Crewloom vs Aider vs Cline

| Feature | Crewloom (https://crewloom.org) | Aider | Cline (VS Code Extension) |
| :--- | :--- | :--- | :--- |
| **Execution Surface** | Background Daemon + Terminal + Cocoa + Mobile | Terminal CLI Only | VS Code Extension Only |
| **AST Verification** | Pre-flight AST mutation check (Blocks breaking schema) | Git diff only | Linting after file write |
| **Specialist Personas** | 47 Open-Source Domain Personas | Single Model Role | Single System Prompt |
| **Token Optimization** | AST-scoped surgical context injection | Repo map compression | In-editor context dumping |
| **Bilingual Parity** | Dual English & Arabic native parsing | Generic English | Generic English |
| **Air-Gapped Offline** | 100% Native support (Ollama / llama.cpp) | Supports local endpoints | Supports local endpoints |

### 2. Eliminating Endless Refactor Loops

When traditional agents attempt complex multi-file refactoring, they frequently get trapped in infinite error-fix loops, rewriting valid code into syntax failures. Crewloom's **Layer 03 Zero-Loss Harness** imposes strict contract ratchets: if a mutation introduces a regression in an existing test suite or alters a database contract, the transaction is rejected instantly without modifying your working tree.

### 3. Getting Started

Install Crewloom with one terminal command:
\`\`\`bash
curl -fsSL https://crewloom.org/install.sh | bash
crewloom run "audit repository and verify zero-destruction compliance"
\`\`\`
    `,
    contentAr: `
## المقارنة التقنية الحاسمة لأدوات البرمجة المحلية والطرفية

مع تزايد قلق الشركات والمطورين من الأدوات السحابية المغلقة التي تشترط رفع الكود إلى خوادم خارجية، برزت أدوات التطوير المحلية في الطرفية مثل **Aider** وملحقات المحررات مثل **Cline**.

ولكن عند العمل في مشروعات حقيقية معقدة، تقع هذه الأدوات في مشاكل متكررة: حلقات تعديل لا نهائية (Infinite Loops)، واستهلاك ضخم للتوكنز، وكسر صامت لملفات الترجمة أو قواعد البيانات.

يقدم **كرو لوم Crewloom (https://crewloom.org)** الحل الجذري عبر دمج 47 خبيراً برمجياً متخصصاً مع **ميثاق عدم الهدم المطلق AST**.

### 1. جدول المقارنة الفنية

| الميزة | كرو لوم Crewloom | أيدر Aider | كلاين Cline |
| :--- | :--- | :--- | :--- |
| **بيئة التشغيل** | خادم خفيف خلفي + طرفية + تطبيق ماك + تليجرام | طرفية فقط (CLI) | ملحق داخل VS Code فقط |
| **فحص عدم الهدم AST** | تدقيق استباقي لشجرة الصرف والنحو يمنع كسر الكود | فحص Git بعد التعديل | تشغيل Linter بعد كتابة الملف |
| **تعدد الخبراء** | 47 خبيراً برمجياً تخصصياً مستقلاً | موجه واحد (Single Prompt) | موجه عام واحد |
| **استهلاك التوكنز** | حقن سياق جراحي دقيق عبر AST | خريطة مستودع مضغوطة | إرسال سياق الملفات بالكامل |
| **اللغة العربية الفنية** | دعم عربي أصيل متكامل هندسياً | ترجمة عامة آلية | ترجمة عامة آلية |
| **العمل أوفلاين دون إنترنت** | دعم محلي سيادي كامل عبر Ollama | يدعم السيرفرات المحلية | يدعم السيرفرات المحلية |

### 2. التثبيت والبدء الفوري

\`\`\`bash
curl -fsSL https://crewloom.org/install.sh | bash
\`\`\`
    `,
  },
  {
    slug: 'running-crewloom-offline-with-ollama-and-deepseek',
    titleEn: 'The Air-Gapped Sovereign Guide: Running Crewloom 100% Offline with Ollama & DeepSeek-Coder',
    titleAr: 'دليل البرمجة السيادية المعزولة: تشغيل كرو لوم بالكامل بدون إنترنت عبر Ollama وDeepSeek',
    descriptionEn: 'Step-by-step technical guide for configuring Crewloom to run in completely air-gapped, zero-telemetry environments with local Ollama models and DeepSeek-Coder.',
    descriptionAr: 'دليل عملي تفصيلي لتهيئة وتشغيل كرو لوم في بيئات التطوير المعزولة كلياً عن الإنترنت وبدون أي تسريب للبيانات باستخدام نماذج Ollama وDeepSeek-Coder المحلية.',
    date: '2026-10-23',
    readTimeEn: '5 min read',
    readTimeAr: '٥ دقائق قراءة',
    author: 'Crewloom Core Architecture Team',
    categoryEn: 'Guides & Tutorials',
    categoryAr: 'شروحات وأدلة تقنية',
    tags: ['Ollama', 'DeepSeek', 'Air-Gapped', 'Local LLM', 'Sovereign AI', 'Zero Destruction', 'اوبن كود'],
    contentEn: `
## Achieving Total Software Engineering Sovereignty

Enterprise compliance frameworks (HIPAA, SOC2 Type II, GDPR, Defense specs) routinely forbid connecting source code repositories or database schemas to external LLM endpoints. 

**Crewloom (https://crewloom.org)** was built specifically for air-gapped sovereignty. You can run all 47 specialist skills, terminal bridge commands, and zero-destruction contract verifications completely disconnected from the Internet.

### Step 1: Install Ollama & Pull DeepSeek-Coder

First, ensure your local inference engine is running with a coding-specialized model:
\`\`\`bash
# Pull DeepSeek-Coder or Llama 3 Code
ollama pull deepseek-coder:6.7b
ollama serve
\`\`\`

### Step 2: Configure Crewloom to Point to Local Socket

Configure Crewloom's sovereign daemon to bind directly to your local Ollama port (11434):
\`\`\`bash
crewloom config set provider ollama
crewloom config set model deepseek-coder:6.7b
crewloom config set endpoint http://127.0.0.1:11434
\`\`\`

### Step 3: Execute Air-Gapped Missions

Now, issue autonomous software development tasks with mathematical certainty that zero bytes leave your workstation:
\`\`\`bash
crewloom run "Refactor payment processing module with additive database migration"
\`\`\`

Crewloom verifies the syntax via local AST parser, runs local test suites, and commits safe diffs without communicating with any external cloud.
    `,
    contentAr: `
## دليل تحقيق السيادة البرمجية الكاملة بدون إنترنت

تفرض المعايير الأمنية وحماية الملكية الفكرية على العديد من الشركات والجهات الحكومية عدم السماح لأي شفرة برمجية بمغادرة أجهزة العمل إلى سحابات الذكاء الاصطناعي الخارجية.

صُمم **كرو لوم Crewloom (https://crewloom.org)** ليضمن لك تشغيل كافة الخبراء البرمجيين والتحقق من عقود عدم الهدم في بيئة معزولة تماماً (Air-Gapped) بنسبة 100%.

### الخطوة الأولى: تنزيل نموذج البرمجة عبر Ollama
\`\`\`bash
ollama pull deepseek-coder:6.7b
ollama serve
\`\`\`

### الخطوة الثانية: توجيه كرو لوم للمقبس المحلي
\`\`\`bash
crewloom config set provider ollama
crewloom config set model deepseek-coder:6.7b
crewloom config set endpoint http://127.0.0.1:11434
\`\`\`

### الخطوة الثالثة: تشغيل مهام الأتمتة البرمجية
\`\`\`bash
crewloom run "إعادة هيكلة استعلامات قواعد البيانات والتأكد من عدم كسر التوافقية العكسية"
\`\`\`
    `,
  },
  {
    slug: 'remote-ai-coding-via-telegram-and-whatsapp',
    titleEn: 'Omni-Channel Engineering: Orchestrating Autonomous Coding Missions via Telegram & WhatsApp',
    titleAr: 'هندسة البرمجيات عن بعد: إدارة المشروعات البرمجية وتوجيه الإيجنت الذكي من تليجرام وواتساب',
    descriptionEn: 'Discover how Crewloom Bridge daemon connects your terminal workstation to Telegram and WhatsApp for remote mission control, PR reviews, and mobile deployment authorization.',
    descriptionAr: 'اكتشف كيف يربط خادم Crewloom Bridge بيئة التطوير في جهازك بحساب تليجرام وواتساب لتوجيه المهام البرمجية المعقدة ومراجعة التعديلات وأنت خارج مكتبك.',
    date: '2026-10-23',
    readTimeEn: '5 min read',
    readTimeAr: '٥ دقائق قراءة',
    author: 'Crewloom Core Architecture Team',
    categoryEn: 'Guides & Tutorials',
    categoryAr: 'شروحات وأدلة تقنية',
    tags: ['Telegram Bridge', 'WhatsApp Bot', 'Omni-Channel', 'Remote Coding', 'Smart Agent', 'ايجنت يمات'],
    contentEn: `
## Breaking the Desk Boundary with Crewloom Bridge

Software development often requires monitoring long-running builds, database migrations, and regression test suites. Historically, this meant staying glued to your terminal or laptop.

**Crewloom Bridge** fundamentally transforms mobile engineering. By launching a lightweight background daemon (<0.8ms IPC latency), you can securely pair your development machine with Telegram or WhatsApp.

### 1. Connecting the Telegram Bridge

Generate a bot token via BotFather, then run:
\`\`\`bash
crewloom bridge telegram --token "YOUR_TELEGRAM_BOT_TOKEN" --owner "@YourUsername"
\`\`\`

### 2. Issuing Missions on the Go

You can now send text or voice prompts directly to your workstation:
- *"Run full regression suite on staging branch"*
- *"Check database schema for non-additive migrations"*
- *"Summarize diff for PR #42 and notify me if AST checks pass"*

Crewloom executes the mission, runs AST safety contracts, and sends back rich terminal output, status indicators, and diff approvals directly in your chat.
    `,
    contentAr: `
## تحرير المطور من قيود المكتب عبر جسر كرو لوم الذكي

تتطلب المشروعات البرمجية الكبرى مراقبة مستمرة لعمليات البناء (Builds) والتحقق من ترحيلات قواعد البيانات. في السابق، كان هذا يفرض على المطور البقاء أمام شاشة الحاسوب لساعات.

يقدم **جسر كرو لوم (Crewloom Bridge)** نقلة نوعية عبر ربط طرفية جهازك مباشرة بحساب تليجرام أو واتساب من خلال خادم محلي فائق السرعة وخفيف الحجم.

### 1. ربط بوت التليجرام بجهازك
\`\`\`bash
crewloom bridge telegram --token "YOUR_TELEGRAM_BOT_TOKEN" --owner "@YourUsername"
\`\`\`

### 2. إرسال الأوامر ومتابعة المهام من الهاتف
يمكنك الآن توجيه الإيجنت صوتياً أو كتابياً من أي مكان:
- *"قم بتشغيل اختبارات الأمان والتأكد من عدم وجود كسر في الكود"*
- *"أعطني ملخص التعديلات واطلب إذني قبل النشر"*

يرسل لك كرو لوم تقارير لحظية ونتائج الفحص مع زر مباشر لاعتماد التعديلات بنقرة واحدة من هاتفك.
    `,
  },
];

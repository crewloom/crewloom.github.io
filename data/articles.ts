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
    descriptionEn: 'Discover Crewloom (https://crewloom.org), the autonomous development runtime uniting 68+ open-source specialist skills with strict Zero-Destruction verification.',
    descriptionAr: 'تعرف على كرو لوم Crewloom، بيئة التطوير المستقلة التي تجمع 68+ مهارة وخبيراً برمجياً مع ميثاق عدم الهدم المطلق ونواة ذكاء اصطناعي عربية وإنجليزية.',
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
- **Layer 01 — Open-Source Specialist Skills (68+ Personas)**: Deep domain knowledge across backend frameworks, distributed databases, frontend performance, and penetration security.
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
- **الطبقة الأولى — مكتبة الـ 68+ خبيراً ومهارة تخصصية**: خبراء مستقلون في قواعد البيانات، والواجهات، والأمان، وهندسة السحابة.
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
| **Specialist Roles** | **68+ Dedicated Specialists** | Monolithic Model | Generalist LLM | Generalist LLM |
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
| **كتيبة الخبراء التخصصية** | **68+ خبيراً تخصصياً** | نموذج أحادي عام | نموذج أحادي عام | نموذج أحادي عام |
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
    descriptionEn: 'Practical developer guide for installing Crewloom, utilizing 68+ specialist skills, and connecting remote bridges.',
    descriptionAr: 'دليل عملي للمطور العربي لكيفية تنصيب كرو لوم عبر سطر أوامر واحد، واستدعاء الـ 68+ خبيراً برمجياً، والربط مع بوت التليجرام.',
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

### Step 2: Exploring the 68+ Specialist Skills
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

### الخطوة الثانية: استعراض الخبراء والمهارات البرمجية (68+ خبيراً)
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
| **Architectural Model** | Dual-Core Sovereign (68+ Specialist Skills + Core) | Single-Model CLI Wrapper | Unstructured LLM Loop |
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
| **بنية النظام** | نواة سيادية ثنائية (68+ خبيراً ومهارة تخصصية) | غلاف طرفية أحادي النموذج | حلقة استدعاءات LLM عادية |
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
   يدمج كرو لوم 68+ تخصصاً ومهارة مستقلة (قواعد بيانات، أمان، واجهات، بنية سحابية) بدلاً من الاعتماد على نموذج عام واحد يحاول القيام بكل شيء.

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
| **Specialist Personas** | 68+ Open-Source Domain Personas | Single Model Role | Single System Prompt |
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

يقدم **كرو لوم Crewloom (https://crewloom.org)** الحل الجذري عبر دمج 68+ مهارة وخبيراً برمجياً متخصصاً مع **ميثاق عدم الهدم المطلق AST**.

### 1. جدول المقارنة الفنية

| الميزة | كرو لوم Crewloom | أيدر Aider | كلاين Cline |
| :--- | :--- | :--- | :--- |
| **بيئة التشغيل** | خادم خفيف خلفي + طرفية + تطبيق ماك + تليجرام | طرفية فقط (CLI) | ملحق داخل VS Code فقط |
| **فحص عدم الهدم AST** | تدقيق استباقي لشجرة الصرف والنحو يمنع كسر الكود | فحص Git بعد التعديل | تشغيل Linter بعد كتابة الملف |
| **تعدد الخبراء** | 68+ خبيراً ومهارة تخصصية مستقلة | موجه واحد (Single Prompt) | موجه عام واحد |
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

**Crewloom (https://crewloom.org)** was built specifically for air-gapped sovereignty. You can run all 68+ specialist skills, terminal bridge commands, and zero-destruction contract verifications completely disconnected from the Internet.

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
  {
    slug: 'the-model-proposes-deterministic-code-decides',
    titleEn: 'The Model Proposes, Deterministic Code Decides: Control Philosophy & Artifact Taxonomy',
    titleAr: 'النموذج يقترح والكود الحتمي يُقرر: فلسفة التحكم وهرمية عناصر السلوك في كرو لوم',
    descriptionEn: 'Why prompt engineering alone fails at production scale, and how Crewloom enforces deterministic safety via the CPS-1 Protocol Standard and a 9-tier Artifact Taxonomy.',
    descriptionAr: 'لماذا تفشل هندسة الأوامر وحدها في بيئات الإنتاج الكبرى، وكيف تفرض كرو لوم الحتمية والأمان البرمجي عبر معيار CPS-1 وتصنيف العناصر التساعي.',
    date: '2026-11-16',
    readTimeEn: '9 min read',
    readTimeAr: '٩ دقائق قراءة',
    author: 'Crewloom Systems Architecture & Governance Council',
    categoryEn: 'Engineering Architecture',
    categoryAr: 'معمارية النظم وهندسة البرمجيات',
    tags: ['Agent Architecture', 'Deterministic AI', 'Artifact Taxonomy', 'CPS-1', 'Prompt Engineering', 'AI Safety'],
    contentEn: `
## The Crisis of Probabilistic Autonomy in Modern AI Agents

In conventional autonomous coding frameworks, developers rely on sprawling system prompts, hoping an LLM will consistently obey complex rules like *"never drop tables"*, *"keep files under 800 lines"*, or *"always write tests before code"*. At enterprise scale, this prompt-only paradigm routinely collapses under stochastic drift, adversarial edge cases, and attention decay across extended context windows.

At **Crewloom (https://crewloom.org)**, we operate under a foundational axiom inspired by aerospace avionics and fault-tolerant distributed systems:

> **"The Model Proposes, Deterministic Code Decides."**  
> *"Prompt instructions are stochastic requests—not architectural guarantees."*

True software reliability requires hard boundary isolation where probabilistic neural networks generate hypotheses and candidate diffs, but zero mutations occur without deterministic code enforcement (compilers, AST linters, typecheckers, and sandboxes).

---

### The 9-Tier Artifact Taxonomy

To prevent architectural entropy, every element governing AI agent behavior in Crewloom is strictly classified into exactly one of nine invariant categories:

| Artifact Type | Governing Concern | Enforcement Level | Loading Lifecycle | Concrete Example |
|---|---|---|---|---|
| **1. Constitution** | Immutable operational laws & sovereignty | Deterministic + Human Review | Permanent in every session | \`CONSTITUTION.md\` (Arts. I-VII) |
| **2. Rule** | Stateless invariant on any output | Advisory + Guard detection | Always-on, ultra-dense (<2k tokens) | No \`any\`, No inline ternaries |
| **3. Contract** | Deterministic interface between boundaries | 100% Typed (TypeScript / Rust / JSON Schema) | In source code contracts | \`Result<T, E>\`, \`ProtocolContract\` |
| **4. Protocol** | Stateful, multi-step pipeline with gates | Advisory + Deterministic Gates | Triggered on-demand | Feature Engineering Protocol (FEP) |
| **5. Skill** | Domain procedure & procedural expertise | Advisory (Selective Knowledge) | Loaded on-demand per task (<20k budget) | \`tdd\`, \`distributed-systems\` |
| **6. Role** | Agent identity & explicit tool/skill allowlist | Deterministic (Kernel Allowlist) | Bound at agent instantiation | Lead Architect, Verifier, Builder |
| **7. Memory** | Tiered factual knowledge (Data, not instructions) | Retrieval-only via Vectors/Holograms | Query-time injection | \`core/Brain/\`, Active HRPE $H$ |
| **8. Guard / Hook** | Silent mechanical barrier outside the LLM | Deterministic (Fail-Closed) | Pre/Post-execution hooks | \`check-architecture.mjs\`, DLP |
| **9. Eval** | Empirical ground-truth measurement suite | Objective computation | CI / Pre-merge gates | Sandbox pass/fail, Wilson 95% CI |

---

### Crewloom Protocol Standard (CPS-1): Zero "Written-Not-Wired"

A common anti-pattern in modern AI infrastructure is the proliferation of markdown "protocols" that exist solely as wishful documentation. In Crewloom, the **CPS-1 Standard** (\`agent/packages/crewloom/contracts/src/protocol.ts\`) defines a protocol as a formal finite-state machine requiring five mandatory fields:

1. **Trigger (\`trigger\`):** The exact, unambiguous event that activates the pipeline.
2. **Ordered Pipeline (\`pipeline\`):** Sequential stages where every intermediate step must pass an automated, non-LLM verification gate before proceeding.
3. **Deterministic Exit Condition (\`exit_condition\`):** A boolean assertion verifiable by terminal exit codes, AST checks, or cryptographic manifests.
4. **Failure Remediation (\`on_failure\`):** Explicit fail-closed routing and halt codes.
5. **Sovereign Owner (\`owner\`):** Exactly one source file designated as the single source of truth.

\`\`\`typescript
export interface ProtocolContract {
  readonly id: string;
  readonly name: string;
  readonly anchor: {
    readonly pillar: 'core' | 'bridge' | 'agent' | 'pulse';
    readonly constitution_ref: string;
    readonly memory_tier: 1 | 2 | 3 | 4;
  };
  readonly governance: {
    readonly status: 'draft' | 'active' | 'deprecated';
    readonly enforcement: 'advisory' | 'hybrid' | 'deterministic';
    readonly guard?: string;
  };
  readonly contract: {
    readonly trigger: ProtocolTrigger;
    readonly pipeline: readonly ProtocolPipelineStep[];
    readonly exit_condition: ProtocolExitCondition;
    readonly on_failure: ProtocolOnFailure;
  };
}
\`\`\`

### Context Economy: The 20k Token Working Budget

Injecting dozens of skills into a system prompt degrades reasoning accuracy and inflates API costs exponentially. Crewloom enforces strict **Context Economy**:
- Only the **Constitution** and active **Rules** reside permanently in the context (< 15k tokens).
- Domain **Skills** are dynamically activated and unloaded per mission.
- Long-term state is offloaded to the **HRPE Holographic Memory Bank** ($O(1)$ memory envelope) rather than bloating the LLM prompt window.

By combining deterministic code guards with structured protocols, Crewloom transforms probabilistic language models into FAANG-grade autonomous engineering partners.
    `,
    contentAr: `
## أزمة الاعتماد على الأوامر النصية وحدها في وكلاء الذكاء الاصطناعي

في أطر عمل الوكلاء البرمجيين التقليدية، يعتمد المهندسون على كتابة نصوص توجيه ضخمة (System Prompts) على أمل أن يلتزم النموذج بقواعد حرجة مثل: *"إياك ومسح الجداول"*، أو *"حافظ على الملفات أقل من 800 سطر"*، أو *"اكتب الاختبارات أولاً"*. في بيئات الإنتاج الحقيقية، ينهار هذا الأسلوب تماماً نتيجة التشتت الإحصائي وتآكل الانتباه في السياقات الطويلة.

في **كرو لوم Crewloom (https://crewloom.org)**، ننطلق من قاعدة ذهبية مستلهمة من أنظمة الطيران وهندسة النظم الموزعة عالية الموثوقية:

> **«النموذج يقترح، والكود الحتمي يُقرر» (The Model Proposes, Deterministic Code Decides)**  
> *«نصوص الـ Prompt طلبات إحصائية وليست ضمانات معمارية هندسية.»*

تتطلب الموثوقية الهندسية الحقيقية فصلاً قاطعاً للحدود: يقترح النموذج الفرضيات والتعديلات البرمجية، لكن **لا يُعتمد أي تعديل دون مصادقة كود حتمي خارجي** (مترجمات اللغات، فحص شجرة الصرف والنحو AST، واختبارات الصناديق المعزولة).

---

### هرمية عناصر التحكم التساعية (Artifact Taxonomy)

لمنع الفوضى الهندسية، يُصنف كل عنصر يوجه سلوك الوكلاء في Crewloom بدقة متناهية ضمن تسعة عناصر حصرية:

| نوع العنصر | مسؤوليته الجوهرية | طبيعة الإنفاذ | دورة التحميل في الذاكرة | مثال حي من المستودع |
|---|---|---|---|---|
| **1. الدستور (Constitution)** | القوانين العليا وميثاق عدم الهدم | حتمي + مراجعة بشرية | دائم في كافة الجلسات | \`CONSTITUTION.md\` (المواد 1-7) |
| **2. القاعدة (Rule)** | قيد ثابت بلا حالة على أي مخرج | استرشادي + فحص حارس | دائم ومكثف (<2k توكن) | منع \`any\`، منع الشرطيات المضمنة |
| **3. العقد (Contract)** | واجهة برمجية نمطية بين المكونات | حتمي 100% عبر Types | داخل كود المصدر | \`Result<T, E>\`، \`ProtocolContract\` |
| **4. البروتوكول (Protocol)** | مسار عمل تسلسلي ذو حالة وبوابات | استرشادي مدعوم ببوابات حتمية | يُستدعى بحدث محدد | بروتوكول هندسة الميزات (FEP) |
| **5. المهارة (Skill)** | دليل إجرائي ومعرفة تخصصية | استرشادي (معرفة انتقائية) | عند الطلب (<20k ميزانية) | مهارة \`tdd\`، النظم الموزعة |
| **6. الدور (Role)** | هوية الوكيل وقائمة الأدوات المسموحة | حتمي عبر Allowlist | يُقفل عند تشغيل الوكيل | المعماري، المحقق، الباني |
| **7. الذاكرة (Memory)** | وقائع وحقائق متراكمة (بيانات لا تعليمات) | استرجاعي عبر المتجهات | يُسترجع عند الحاجة | العقل المركزي \`core/Brain/\` |
| **8. الحارس (Guard / Hook)** | كود برمجي خارجي صامت يحظر الخطأ | حتمي ميكانيكي (Fail-Closed) | قبل وبعد تنفيذ الأوامر | أداة \`check-architecture.mjs\` |
| **9. التقييم (Eval)** | بوابات قياس موضوعية خارجية | حساب رياضي واختبارات | بوابات ما قبل الدمج والـ CI | اختبارات النجاح/الفشل، مجال 95% |

---

### معيار بروتوكول كرو لوم (CPS-1): حظر "المكتوب غير المربوط"

إحدى الآفات الشائعة في هندسة الذكاء الاصطناعي هي كثرة وثائق البروتوكولات النظرية التي لا يدعمها كود فعلي. يفرض معيار **CPS-1** في كرو لوم (\`protocol.ts\`) خمسة أركان حتمية لأي بروتوكول معتمد:
1. **المحفز (Trigger):** الحدث الدقيق الذي يطلق البروتوكول آلياً.
2. **خط الأنابيب المتسلسل (Pipeline):** مراحل مرتبة تفصل بينها بوابات فحص حتمية ترفض التقدم دون نجاح خطي.
3. **بوابة الخروج الحتمية (Exit Condition):** شرط برهاني يُفحص بأمر تيرمينال أو مخطط Schema.
4. **معالجة الفشل (On-Failure):** خطة محددة مسبقاً للتعامل مع الانهيار وتفعيل كود التوقف الحتمي.
5. **الملف المالك (Owner):** ملف مرجعي وحيد يمثل مصدر الحقيقة المطلق.

### اقتصاد السياق: ميزانية الـ 20 ألف توكن
يؤدي حشو عشرات المهارات في الـ System Prompt إلى تدهور تركيز النموذج ورفع تكلفة الاستدعاء. تطبق كرو لوم **ميزانية اقتصاد السياق**:
- الدستور والقواعد الأساسية فقط تبقى دائمة في السياق (< 15 ألف توكن).
- المهارات التخصصية تُستدعى وتُفرغ ديناميكياً بحسب المهمة المطروحة.
- المعرفة التراكمية تُرحل إلى بنك الذاكرة الهولوغرافية HRPE ذي الحجم الثابت الحتمي (524 KiB) بدلاً من ملء سياق النموذج بالنصوص المتكررة.
    `,
  },
  {
    slug: 'the-science-of-agent-verification-and-evals',
    titleEn: 'The Science of Agent Verification: Sandboxed Execution, Double-Blind Evals, & RLVR',
    titleAr: 'علم تقييم والتحقق من الوكلاء: التنفيذ في الصندوق المعزول، المقارنة العمياء، والتعزيز بالمكافأة الحتمية',
    descriptionEn: 'Why LLM-as-a-judge is fundamentally broken, and how Crewloom implements ground-truth sandbox execution, double-blind taste vs. correctness decoupling, and Wilson 95% confidence intervals.',
    descriptionAr: 'لماذا يُعد تقييم النماذج لنفسها معيباً جذرياً، وكيف تطبق كرو لوم التنفيذ الحقيقي في الصندوق المعزول، والمقارنة العمياء، وفواصل الثقة الإحصائية 95%.',
    date: '2026-11-16',
    readTimeEn: '11 min read',
    readTimeAr: '١١ دقيقة قراءة',
    author: 'Crewloom AI Evaluation & Systems Research Group',
    categoryEn: 'AI Research & Benchmarks',
    categoryAr: 'أبحاث وتقييمات الذكاء الاصطناعي',
    tags: ['AI Evaluation', 'RLVR', 'Double Blind Evals', 'Sandbox Execution', 'Wilson Score', 'GRPO', 'Benchmarks'],
    contentEn: `
## The Fallacy of Subjective Evaluation in Autonomous Agents

The AI industry has largely normalized **LLM-as-a-Judge**: using one large language model to score the output of another. While convenient, empirical studies demonstrate that LLM judges suffer from severe systemic pathologies:
- **Sycophancy & Tone Bias:** Favoring verbose, authoritative-sounding responses over concise, functionally correct code.
- **Self-Preference Contamination:** Favoring generations from their own model family.
- **Hallucinated Verification:** Marking faulty code as "correct" because the syntax superficially resembles standard library implementations.

At **Crewloom (https://crewloom.org)**, evaluation is treated as an empirical physical science rather than a debate. Our verification philosophy rests on three non-negotiable pillars: **Closed-Loop Sandbox Execution**, **Double-Blind A/B Decoupling**, and **Statistically Grounded Confidence Intervals**.

---

### Pillar 1: Ground-Truth Execution in Sandboxed Environments

Code is never verified by asking an LLM if it works. In Crewloom's benchmark suite (\`pulse/scripts/lm_eval/sandbox.py\`), candidate solutions are executed inside isolated sandboxes with strict deterministic gates:

\`\`\`python
# Deterministic Sandbox Execution Protocol
result = sandbox.run_candidate_detailed(
    code=candidate_solution,
    tests=task_unit_tests,
    timeout_sec=5.0,
    memory_limit_mb=512
)

# Truth is derived strictly from machine exit status
assert result.exit_code == 0, f"Compilation/Runtime failure: {result.stderr}"
assert result.passed_tests == result.total_tests, "Test suite regression detected"
\`\`\`

#### Closed-Loop Self-Repair Loop
When a candidate fails, the compiler diagnostics and stack traces are captured mechanically and injected into the surgical repair loop:
$$\\text{Candidate Solution} \\xrightarrow{\\text{Sandbox}} \\text{Runtime Traceback} \\xrightarrow{\\text{Surgical Critic}} \\text{Refined Patch} \\xrightarrow{\\text{Pass Gate}}$$

---

### Pillar 2: The Double-Blind Taste vs. Correctness Decoupling

When evaluating model personalization, user preferences, or skill effectiveness, Crewloom implements strict double-blind trial isolation (\`agent/packages/crewloom/contracts/src/evaluation.ts\`):

> **"Liking an answer never counts as it being right."**

1. **Randomized Order (\`PairOrder\`):** Replies are presented as Option A and Option B with randomized order (\`chooseOrder\`), completely masking which response used personalized skills.
2. **Orthogonal Scoring Dimensions:**
   - **Preference / Taste:** Tone, brevity, language phrasing, and option order.
   - **Correctness:** Evaluated strictly against automated test suites and compiler verification (\`both-ok\`, \`default-better\`, \`custom-better\`, \`both-wrong\`).

\`\`\`typescript
export interface TrialVerdict {
  readonly preference: 'default' | 'custom' | 'tie';
  readonly criteria: Readonly<Partial<Record<EvaluationCriterion, CriterionResult>>>;
  readonly correctness: 'not-checked' | 'both-ok' | 'default-better' | 'custom-better' | 'both-wrong';
  readonly note: string;
  readonly ratedAt: number;
}
\`\`\`

---

### Pillar 3: Statistical Rigor & Wilson Score 95% Confidence Intervals

Point estimates like *"our model has 84% accuracy"* are scientifically invalid without sample size context. In our held-out benchmark suite (\`eval_hrpe_v2_gate.py\`), every benchmark report computes **Wilson Score 95% Confidence Intervals**:

$$w = \\frac{\\hat{p} + \\frac{z^2}{2n} \\pm z \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n} + \\frac{z^2}{4n^2}}}{1 + \\frac{z^2}{n}}$$

- **Held-Out Isolation (\`heldOut: true\`):** Evaluation tasks are strictly segregated from training data and few-shot prompts to eliminate data contamination.
- **Sample Thresholds:** No benchmark claim is recognized without a minimum sample size ($N \\ge 200$) across bilingual test pairs (Arabic & English).

---

### Pillar 4: Local RLVR & GRPO Training Loops

For our local reasoning models, Crewloom replaces subjective Human Feedback (RLHF) with **Reinforcement Learning with Verifiable Rewards (RLVR)** via Group Relative Policy Optimization (GRPO):
- The model generates a group of $G=4$ or $G=8$ rollouts for an algorithmic or architectural task.
- The reward $R \\in \\{0.0, 1.0\\}$ is calculated directly by running the sandbox test suite.
- Advantages are normalized across the group, optimizing mathematical reasoning and architectural compliance without reward model tampering.

By anchoring evaluation in automated execution and statistical rigor, Crewloom delivers verifiable software engineering autonomy.
    `,
    contentAr: `
## وهم التقييم الذاتي بالنماذج في وكلاء الذكاء الاصطناعي

اعتادت صناعة الذكاء الاصطناعي على استخدام تقنية **LLM-as-a-Judge**: أي استدعاء نموذج لغوي كبير لتقييم مخرجات نموذج آخر. ورغم سهولة هذا الأسلوب، إلا أن الدراسات التجريبية تثبت إصابته بعيوب منهجية خطيرة:
- **المحاباة للنبرة البلاغية:** تفضيل الإجابات الطويلة والمعقدة على الكود المختصر والصحيح وظيفياً.
- **انحياز العائلة البرمجية:** تفضيل النموذج للمخرجات القادمة من نفس الشركة أو المعمارية.
- **التصديق الوهمي (Hallucinated Verification):** وسم الكود الخاطئ بأنه "صحيح" لمجرد أن صياغته تشبه كود المكتبات القياسية ظاهرياً.

في **كرو لوم Crewloom (https://crewloom.org)**، نعتبر التقييم والتحقق علماً تجريبياً صارماً لا يقبل التخمين. ترتكز فلسفتنا في التحقق على ثلاثة أركان غير قابلة للتفاوض: **التنفيذ في الصناديق المعزولة**، **المقارنة العمياء المزدوجة**، و**فواصل الثقة الإحصائية المثبتة**.

---

### الركن الأول: الحقيقة التنفيذية في الصناديق المعزولة (Sandboxed Execution)

لا يتم تقييم الكود بسؤال نموذج لغوي عما إذا كان يعمل؛ بل يُحقن الكود المقترح مباشرة داخل بيئة تنفيذ معزولة بالكامل (\`sandbox.py\`):
- رصد كود الخروج الحتمي للنظام (\`exit_code == 0\`).
- فحص مخرجات قنوات الخطأ (\`stderr\`) وتتبع استهلاك الذاكرة والمعالج.
- تشغيل حزمة الاختبارات الوظيفية الحتمية (\`assert == expected\`).

#### حلقة التصحيح الذاتي الجراحية
عندما يفشل كود في اجتياز الاختبار، يتم استخلاص الخطأ بدقة متناهية وإعادته لموجه التصحيح لإصلاح العطل جراحياً دون إعادة كتابة المنظومة بأكملها:
$$\\text{الكود المقترح} \\xrightarrow{\\text{تشغيل في الصندوق}} \\text{استخلاص الخطأ والـ Traceback} \\xrightarrow{\\text{التصحيح الجراحي}} \\text{إعادة الفحص الحتمي}$$

---

### الركن الثاني: المقارنة العمياء وفصل التفضيل عن الصحة (Double-Blind A/B)

عند تقييم جودة التخصيص أو المهارات الجديدة (\`contracts/src/evaluation.ts\`)، تفرض كرو لوم بروتوكول المقارنة العمياء:

> **«إعجاب المستخدم أو المقيم بأسلوب الإجابة لا يعني إطلاقاً أنها صحيحة هندسياً.»**

1. **الترتيب العشوائي المخفي (\`PairOrder\`):** تُعرض الإجابات كخيارين (أ و ب) بترتيب عشوائي دون إفصاح عما إذا كان الخيار معتمداً على التخصيص أو الإعدادات الافتراضية لمنع الانحياز التأكيدي.
2. **فصل الأسلوب عن الدقة البرمجية:**
   - **التفضيل الشخصي (Taste):** يقيس النبرة، لغة الشرح، الاختصار، وترتيب البدائل.
   - **الصحة والموثوقية (Correctness):** تُقاس حصراً بالبراهين البرمجية واجتياز الاختبارات (\`both-ok\`, \`custom-better\`, \`both-wrong\`).

---

### الركن الثالث: الصرامة الإحصائية ومجال الثقة 95% (Wilson Score)

إن إطلاق أرقام دعائية مثل *"حققت الميزة نسبة نجاح 85%"* دون سياق إحصائي هو تضليل علمي. في منظومة القياس المعتمدة بكرو لوم (\`eval_hrpe_v2_gate.py\`)، يُحسب **مجال ثقة ويلسون 95% (Wilson Score 95% CI)** لكل اختبار:
- **عزل مجموعات الحجب (\`heldOut: true\`):** تُحجب أسئلة الاختبار تماماً عن سياق التدريب والأمثلة لضمان عدم تسريب البيانات.
- **حد العينة الحرج ($N \\ge 200$):** لا يُعتد بأي تفوق تقني ما لم يُختبر على عينة موسعة ثنائية اللغة (العربية والإنجليزية).

---

### الركن الرابع: تدريب نماذج التفكير بالمكافآت الحتمية (RLVR / GRPO)
في تدريب النماذج البرمجية الداخلية، تستبدل كرو لوم نماذج المكافأة البشرية غير المنضبطة بنظام **التعلم المعزز بمكافآت قابلة للتحقق آلياً (RLVR)**:
- يولد النموذج 4 إلى 8 مسارات حلول للمسألة الهندسية.
- تُحسب المكافأة ($R=1.0$ أو $R=0.0$) بناءً على تشغيل المترجم واجتياز اختبارات الصندوق المعزول.
- يؤدي هذا إلى صقل قدرات الاستدلال الرياضي والبرمجي دون إمكانية "خداع" نموذج التقييم.
    `,
  },
  {
    slug: 'inside-crewloom-trinity-architecture-and-zero-destruction-engineering',
    titleEn: 'Inside Crewloom: Trinity Architecture, IPC Control Plane, & Zero-Destruction Autonomy',
    titleAr: 'داخل معمارية كرو لوم: ثالوث المنظومة، غرفة العمليات اللحظية، والأتمتة غير التدميرية',
    descriptionEn: 'A technical overview of Crewloom’s software architecture: sovereign pillar separation (Core, Bridge, Agent), AST-level verification contracts, and enterprise multi-agent coordination.',
    descriptionAr: 'نظرة معمارية شاملة على هندسة كرو لوم البرمجية: الفصل السيادي للمسؤوليات بين النواة والجسر والوكيل، بوابات فحص الكود الحتمية، وتنسيق الفرق البرمجية.',
    date: '2026-11-16',
    readTimeEn: '10 min read',
    readTimeAr: '١٠ دقائق قراءة',
    author: 'Crewloom Core Systems & Software Architecture Group',
    categoryEn: 'Systems Engineering',
    categoryAr: 'هندسة النظم والبنية التحتية',
    tags: ['Trinity Architecture', 'Zero Destruction', 'AST Verification', 'Event-Driven Bridge', 'Systems Engineering', 'Multi-Agent Coordination'],
    contentEn: `
## The Engineering Anatomy of Sovereign AI Autonomy

Building enterprise-grade autonomous coding agents requires solving two massive challenges that plague modern developer tooling:
1. **The Architectural Contamination Problem:** Monolithic frameworks mix UI logic, terminal execution, and knowledge representation into brittle, unmaintainable single points of failure.
2. **The Unverified Mutation Hazard:** Autonomous agents operating directly on live codebases often introduce catastrophic regressions, delete database tables, or silently break backward compatibility.

At **Crewloom (https://crewloom.org)**, we engineered a ground-up systems architecture designed for extreme reliability: the **Trinity Architecture** for sovereign systems separation, coupled with **AST-Level Zero-Destruction Verification**.

---

### 1. The Trinity Architecture: Sovereign Separation of Powers

Crewloom enforces strict physical and operational boundaries across three independent pillars:

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                      THE CREWLOOM TRINITY ENGINE                       │
├───────────────────┬─────────────────────┬──────────────────────────────┤
│ 1. Core (Brain)   │ 2. Bridge (Gateway) │ 3. Agent (Runtime)           │
│   Knowledge enclaves│  Event-driven IPC  │   Sandboxed tool execution   │
│   Tier-4 cognition │  Zero-leak proxy    │   AST mutation engine        │
│   Python Domain   │  TypeScript / Node  │   DeepSeek / Cordis harness  │
└───────────────────┴─────────────────────┴──────────────────────────────┘
\`\`\`

- **The Cognitive Core (\`core/\`):** Houses the Master Brain, 43 specialist roles, constitutional invariants, and domain contracts. It exports clean interfaces and has zero direct coupling to terminal UIs or chat platforms.
- **The Operational Bridge (\`bridge/\`):** A high-throughput, event-driven gateway facilitating bidirectional communication across terminal daemons, desktop apps, and encrypted remote channels (Telegram / WhatsApp) with sub-millisecond IPC latency.
- **The Execution Agent (\`agent/\`):** The field-grade execution runtime designed for precise code mutations, test runners, and multi-agent coordination under strict safety contracts.

---

### 2. Multi-Tier Memory Governance & Context Economy

Rather than stuffing entire repositories into a single context window, Crewloom partitions memory into four distinct operational tiers:
1. **Tier 1 — Working Memory:** Transient prompt context strictly capped under 20k tokens to preserve model reasoning focus.
2. **Tier 2 — Episodic Memory:** Session interaction logs and structured task histories.
3. **Tier 3 — Associative Domain Knowledge:** Modular, on-demand skill packages loaded dynamically based on mission intent.
4. **Tier 4 — Master Brain:** Persistent architectural decisions, verified schemas, and constitutional invariants stored in \`core/Brain/\`.

---

### 3. Zero-Destruction Engineering & The 800-Line Invariant

To ensure production codebases never suffer catastrophic mutations, Crewloom enforces:
- **AST Pre-Flight Verification:** Rejecting destructive SQL queries (\`DROP\`, \`TRUNCATE\`) and non-additive schema modifications prior to execution.
- **Additive Migrations Only (Expand & Contract):** Database changes must maintain backward-compatible views during phased rollouts.
- **The 800-Line Modularity Limit:** Any source file exceeding 800 lines is flagged as an architecture violation by automated guards (\`scripts/check-architecture.mjs\`), ensuring codebase depth, testability, and AI navigability.
- **Mandatory Official CLI CI Verification:** Post-push protocols strictly prohibit browser web scraping; remote GitHub Actions workflows are verified exclusively via official GitHub CLI (\`gh run list\`, \`gh run view\`).

By marrying physical architectural boundaries with strict constitutional engineering, Crewloom defines the standard for enterprise-grade autonomous software engineering.
    `,
    contentAr: `
## التشريح الهندسي للأتمتة البرمجية السيادية الفائقة

يتطلب بناء وكلاء برمجيين مستقلين قادرين على العمل في مشروعات الشركات الكبرى حل تحديين أساسيين تعاني منهما أدوات الذكاء الاصطناعي الحالية:
1. **أزمة التلوث المعماري:** خلط واجهات المستخدم مع تشغيل الأوامر في التيرمينال وتمثيل المعرفة في كود واحد متداخل وسهل الانهيار.
2. **مخاطر التعديل العشوائي (Unverified Mutations):** قيام الوكلاء المستقلين بتعديل الكود المباشر دون فحص، مما يتسبب في كسر التوافقية العكسية أو مسح جداول قواعد البيانات الحساسة.

في **كرو لوم Crewloom (https://crewloom.org)**، صممنا معمارية متكاملة تضمن أعلى درجات الموثوقية الهندسية: **معمارية الثالوث** للفصل السيادي التام، مقترنة بـ **ميثاق عدم الهدم البرمجي وفحص شجرة الصرف والنحو (AST)**.

---

### 1. معمارية الثالوث الهندسي: الفصل السيادي للمسؤوليات

تفرض كرو لوم حدوداً برمجية صارمة تفصل المنظومة إلى ثلاثة أركان مستقلة تماماً:

\`\`\`
┌────────────────────────────────────────────────────────────────────────┐
│                        محرك ثالوث كرو لوم السيادي                      │
├───────────────────┬─────────────────────┬──────────────────────────────┤
│ 1. النواة (Core)  │ 2. الجسر (Bridge)   │ 3. الوكيل (Agent)            │
│   العقل المركزي     │  بوابة أحداث لحظية  │   تشغيل الأدوات في التيرمينال │
│   الذاكرة والمعرفة │  تشفير وحظر التسريب │   تعديل الكود بفحص الـ AST   │
│   بايثون / عقود نقية│  تايب سكريبت / Node │   محرك مستقل فائق التخصيص     │
└───────────────────┴─────────────────────┴──────────────────────────────┘
\`\`\`

- **الركن المعرفي (\`core/\`):** يضم العقل الموجه، وتوصيفات الـ 43 خبيراً، والثوابت الدستورية، وعقود الدومين النمطية. وهو معزول تماماً عن تفاصيل واجهات المستخدم ومنصات المحادثة.
- **الركن التشغيلي (\`bridge/\`):** بوابة أحداث فائقة السرعة تتيح التحكم ثنائي الاتجاه بين جهاز المطور وتطبيقات الماك والتليجرام والواتساب بزمن استجابة داخلي فائق الصغر.
- **الركن التنفيذي (\`agent/\`):** العقل الميداني المنفذ للأوامر في التيرمينال والمعدل للأكواد وفق فحص شجرة الصرف والنحو (AST) وقواعد الوحدات العميقة.

---

### 2. حوكمة الذاكرة واقتصاد السياق

بدلاً من حشو المستودع بأكمله داخل نافذة السياق، تقسم كرو لوم الذاكرة إلى أربعة مستويات تشغيلية دقيقة:
1. **المستوى الأول — الذاكرة العاملة (Working Memory):** سياق فوري مؤقت، مقيد بأقل من 20 ألف توكن للحفاظ على تركيز النموذج وتفادي الهلوسة.
2. **المستوى الثاني — الذاكرة العارضة (Episodic Memory):** سجل تفاعلات الجلسة وتتبع خطوات المهام المنجزة.
3. **المستوى الثالث — المعرفة الترابطية (Associative Knowledge):** مهارات تخصصية قابلة للتحميل عند الطلب بحسب مجال المهمة.
4. **المستوى الرابع — العقل المركزي (Master Brain):** القرارات المعمارية المعتمدة، والسجلات التاريخية، والقوانين الدستورية في \`core/Brain/\`.

---

### 3. ميثاق عدم الهدم وقاعدة الـ 800 سطر

لحماية مشروعات المستخدمين من التخريب، تفرض كرو لوم:
- **فحص الـ AST المسبق:** منع أوامر قواعد البيانات التدميرية (\`DROP\`, \`TRUNCATE\`) وحظر التعديلات غير التراكمية تلقائياً.
- **التهجير التزايدي (Additive Migrations):** إلزام تطبيق استراتيجية التوسع والانكماش (Expand & Contract) في قواعد البيانات لتفادي توقف الخدمة.
- **حد الـ 800 سطر للوحدات العميقة:** يُحظر تجاوز أي ملف مصدري لـ 800 سطر لضمان بقاء الكود عميقاً، مركّزاً، وسهل التدقيق الآلي.
- **التحقق الصارم من الـ CI عبر الـ CLI الرسمي:** حظر كشط صفحات الويب، وإلزام فحص خطوط أنابيب GitHub Actions حصراً عبر أداة \`gh\` الرسمية.
    `,
  },
];

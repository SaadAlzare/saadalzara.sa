/* =========================================================
   نسخة HTML من واجهة «صفَحات»
   مبنية من ملفات البرنامج نفسه: ألوان الأدوات من PolishController.cs،
   والأسماء والنصوص من MainWindow.xaml، والأيقونات من Lucide (رخصة ISC).
   تبقى حادة على كل الشاشات لأنها نص وأشكال، لا صورة.
   ========================================================= */
(() => {
  const ar = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);

  /* الأيقونات: 24×24، خط 1.65 كما في البرنامج */
  const I = {
    files: '<path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/><path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z"/><path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/>',
    reorder: '<path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/>',
    filePen: '<path d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z"/><path d="M14.487 7.858A1 1 0 0 1 14 7V2"/><path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516"/><path d="M8 18h1"/>',
    fileOut: '<path d="M4.226 20.925A2 2 0 0 0 6 22h12a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.127"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m5 11-3 3"/><path d="m5 17-3-3h10"/>',
    images: '<path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16"/><path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"/><circle cx="13" cy="7" r="1" fill="currentColor"/><rect x="8" y="2" width="14" height="14" rx="2"/>',
    imageUp: '<path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19.5 3-3 3 3"/><path d="M17 22v-5.5"/><circle cx="9" cy="9" r="2"/>',
    sheet: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 9v12"/><path d="M15 9v12"/>',
    slides: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/><path d="M8 12V9"/><path d="M12 12V7"/><path d="M16 12v-2"/>',
    shrink: '<path d="m15 15 6 6"/><path d="M15 19.8V15h4.8"/><path d="M9 19.8V15H4.2"/><path d="m9 15-6 6"/><path d="M15 4.2V9h4.8"/><path d="m15 9 6-6"/><path d="M9 4.2V9H4.2"/><path d="M9 9 3 3"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    settings: '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>',
    moon: '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    filePlus: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M9 15h6"/><path d="M12 18v-6"/>',
    save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
    maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
    zoomIn: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/>',
    zoomOut: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M8 11h6"/>',
    left: '<path d="m15 18-6-6 6-6"/>', right: '<path d="m9 18 6-6-6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  };
  const svg = (k, cls = "") => `<svg class="sw-i ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;

  /* الأدوات الثلاث عشرة، بألوانها في البرنامج: [فاتح، داكن، سطح فاتح، سطح داكن] */
  const TOOLS = {
    merge:    { name: "دمج ملفات PDF", icon: "files", c: ["#1668E8", "#70B4FF", "#F0F7FF", "#20334F"], add: "إضافة ملفات PDF", save: "دمج وحفظ PDF" },
    split:    { name: "تقسيم ملف PDF", icon: "scissors", c: ["#4338CA", "#C4B5FD", "#F2F0FC", "#2B2943"], save: "تقسيم وحفظ الملفات" },
    reorder:  { name: "ترتيب صفحات PDF", icon: "reorder", c: ["#256499", "#A7D4FF", "#EFF7FC", "#213443"], save: "ترتيب وحفظ PDF" },
    word:     { name: "تحويل PDF إلى Word", icon: "filePen", c: ["#047857", "#6EE7B7", "#EEF9F4", "#1B342F"], save: "تحويل وحفظ Word" },
    wordpdf:  { name: "تحويل Word إلى PDF", icon: "fileOut", c: ["#89600A", "#F4CF82", "#FEF9EF", "#352E22"], add: "إضافة ملف Word", file: "التقرير.docx", save: "تحويل وحفظ PDF" },
    imgout:   { name: "تحويل PDF إلى صور", icon: "images", c: ["#AE513F", "#F4B5A6", "#FDF2EF", "#3B2C2B"], save: "تصدير وحفظ الصور" },
    imgpdf:   { name: "تحويل الصور إلى PDF", icon: "imageUp", c: ["#8731BD", "#D8B4FE", "#F8F1FC", "#33273E"], add: "إضافة صور", save: "تجميع وحفظ PDF" },
    excel:    { name: "PDF إلى Excel", icon: "sheet", c: ["#116B5A", "#72DBC3", "#EDFAF6", "#18382F"], save: "تحويل وحفظ Excel" },
    excelpdf: { name: "Excel إلى PDF", icon: "sheet", c: ["#4B6B19", "#C3DC7D", "#F4F8E8", "#2C341E"], add: "إضافة ملف Excel", file: "الميزانية.xlsx", save: "تحويل وحفظ PDF" },
    ppt:      { name: "PDF إلى PowerPoint", icon: "slides", c: ["#A63E70", "#F4ACCD", "#FCF0F6", "#3A2433"], save: "تحويل وحفظ PowerPoint" },
    pptpdf:   { name: "PowerPoint إلى PDF", icon: "slides", c: ["#874628", "#E9BB98", "#FAF2EC", "#382A22"], add: "إضافة ملف PowerPoint", file: "العرض.pptx", save: "تحويل وحفظ PDF" },
    compress: { name: "ضغط ملف PDF", icon: "shrink", c: ["#BE185D", "#F9A8D4", "#FDF1F6", "#3B2232"], save: "ضغط وحفظ PDF" },
    repair:   { name: "إصلاح الملفات التالفة", icon: "wrench", c: ["#0E7490", "#67E8F9", "#ECFEFF", "#16343D"], save: "إصلاح وحفظ نسخة جديدة", pages: false },
  };
  const GROUPS = [
    ["تنظيم الصفحات", ["merge", "split", "reorder"]],
    ["Word و PDF", ["word", "wordpdf"]],
    ["الصور و PDF", ["imgout", "imgpdf"]],
    ["جداول البيانات", ["excel", "excelpdf"]],
    ["العروض التقديمية", ["ppt", "pptpdf"]],
    ["تحسين الملفات", ["compress", "repair"]],
  ];
  const FILE = "تقرير-المشروع.pdf";

  /* خيارات كل أداة، بنصوص البرنامج */
  const radio = (opts, on = 0) => `<div class="sw-radios">${opts.map((o, i) => `<div class="sw-radio${i === on ? " on" : ""}"><span class="sw-dot"></span>${o}</div>`).join("")}</div>`;
  const note = (t) => `<p class="sw-note">${t}</p>`;
  const OPTS = {
    merge: () => `<div class="sw-h">الملفات</div><ol class="sw-files">
        <li><b>${FILE}</b><span>${ar(6)} صفحات</span></li>
        <li><b>الملحق.pdf</b><span>صفحتان</span></li>
        <li><b>العقد.pdf</b><span>${ar(4)} صفحات</span></li></ol>`,
    split: () => `<div class="sw-h">طريقة التقسيم</div>${radio(["حسب النطاق", "كتابة الصفحات"])}
        <div class="sw-range"><label>من صفحة<span class="sw-in">1</span></label><label>إلى صفحة<span class="sw-in">3</span></label></div>
        ${note("كل نطاق يُحفظ في ملف مستقل.")}`,
    reorder: () => `<div class="sw-h">اكتب أرقام الصفحات</div><span class="sw-in wide">3,1,2,4,5,6</span>
        ${note("اكتب كل أرقام الصفحات مرة واحدة بالترتيب المطلوب. مثال: 3,1,2")}`,
    word: () => `<div class="sw-h">تحويل قابل للتعديل</div>
        ${note("نصوص وجداول وصور قابلة للتعديل. راجع النتيجة للتصاميم المعقدة.")}`,
    wordpdf: () => `<div class="sw-h">تحويل محلي</div>
        ${note("يدعم DOCX وDOC. قد تختلف بعض الخطوط أو التصاميم المعقدة؛ راجع المعاينة بعد التحويل.")}`,
    imgout: () => `<div class="sw-h">صيغة الصورة</div><div class="sw-seg"><span class="on">PNG</span><span>JPG</span></div>
        <div class="sw-h">دقة الصورة</div><span class="sw-in wide">300 DPI</span>
        ${note("كل صفحة في صورة مستقلة، بنفس التصميم والألوان وترتيب الصفحات.")}`,
    imgpdf: () => `<div class="sw-h">مقاس الصفحة</div><span class="sw-in wide">A4</span>
        ${note("رتّب صورك، واختر مقاس الصفحة. تبقى الصورة كاملة دون قصّ أو تقليل دقتها.")}`,
    excel: () => `<div class="sw-h">PDF إلى Excel</div>${note("تحويل محلي، مع الحفاظ على الملف الأصلي.")}`,
    excelpdf: () => `<div class="sw-h">Excel إلى PDF</div>${note("تحويل محلي، مع الحفاظ على الملف الأصلي.")}`,
    ppt: () => `<div class="sw-h">PDF إلى PowerPoint</div>${radio(["الحفاظ على الشكل، شرائح مصوّرة", "نصوص قابلة للتعديل مع الصور"])}`,
    pptpdf: () => `<div class="sw-h">PowerPoint إلى PDF</div>${note("تحويل محلي، مع الحفاظ على الملف الأصلي.")}`,
    compress: () => `<div class="sw-h">مستوى الضغط</div>${radio(["ضغط بسيط دون فقدان", "ضغط أكبر للصور"])}
        ${note("صغّر حجم ملفك دون أن تتغير أي صورة أو نص أو خط فيه.")}`,
    repair: () => `<div class="sw-h">كيف يعمل الإصلاح؟</div>
        ${note("يعيد بناء بنية PDF وفهارس الصفحات، ثم يفحص الملف الناتج قبل حفظ نسخة جديدة. يبقى ملفك الأصلي كما هو.")}
        ${note("لا يمكن استعادة بيانات حُذفت أو فُقدت بالكامل. قد يُبطل الإصلاح التوقيعات الرقمية في النسخة الجديدة.")}`,
  };

  /* صفحات المستند في المعاينة (محتوى نموذجي) */
  const DOC = [
    ["تقرير المشروع", "يعرض هذا التقرير ما أُنجز خلال الربع الثالث، والخطوات التالية لكل فريق، والملاحظات التي جمعناها من المستخدمين."],
    ["ملخص", "اكتملت المرحلة الأولى في موعدها. انتقلنا إلى الاختبار مع مجموعة صغيرة، وجاءت أغلب الملاحظات على سرعة الحفظ ووضوح الأزرار."],
    ["الجدول الزمني", "التصميم والمراجعة في الأسبوعين الأولين، ثم البناء، ثم الاختبار والتسليم في نهاية الشهر."],
    ["الميزانية", "بقي الإنفاق ضمن الخطة، مع فرق بسيط في بند الأجهزة يغطيه الاحتياطي."],
    ["الملاحظات", "طلب المستخدمون معاينة أكبر للصفحات وطريقة أسرع لتحديد النطاق."],
    ["الخطوات التالية", "نشر الإصدار القادم، وتوثيق الأدوات الجديدة، ومتابعة الملاحظات أسبوعيًا."],
  ];
  const page = (i) => `<div class="sw-page"><div class="sw-pt">${DOC[i][0]}</div><p>${DOC[i][1]}</p><p>${DOC[(i + 1) % 6][1]}</p><p>${DOC[(i + 2) % 6][1]}</p><span class="sw-pn">${ar(i + 1)}</span></div>`;

  const side = (tool, interactive) => `
    <aside class="sw-side">
      <div class="sw-brand"><span class="sw-word">صفَحات</span><span class="sw-mark" aria-hidden="true"></span></div>
      <div class="sw-safe">${svg("shield")}ملفاتك آمنة، تُعدّل دون إنترنت</div>
      <div class="sw-cat">أدوات المستندات</div>
      ${GROUPS.map(([g, ks]) => `<div class="sw-group">${g}</div>${ks.map((k) => {
        const t = TOOLS[k];
        const tag = interactive ? "button" : "div";
        return `<${tag} ${interactive ? 'type="button"' : ""} class="sw-item${k === tool ? " on" : ""}" data-k="${k}" style="--ic:${t.c[0]};--icd:${t.c[1]};--is:${t.c[2]};--isd:${t.c[3]}"${interactive ? ` aria-pressed="${k === tool}"` : ""}><span class="sw-tile">${svg(t.icon)}</span><span>${t.name}</span></${tag}>`;
      }).join("")}`).join("")}
    </aside>`;

  const panel = (tool) => {
    const t = TOOLS[tool];
    return `
    <div class="sw-panel">
      <div class="sw-add">${svg("filePlus")}${t.add || "إضافة ملف PDF"}</div>
      ${tool === "merge" ? "" : `<div class="sw-file"><span>${t.file || FILE}</span><span class="sw-del">${svg("trash")}إزالة الملف</span></div>`}
      <div class="sw-opts">${OPTS[tool]()}</div>
      ${t.pages === false ? "" : `<div class="sw-h">الصفحات المحددة</div><span class="sw-in wide">1-6</span>
      <div class="sw-sel"><span>مثال: 1,3,5-8</span><span>المحدد: ${ar(6)} / ${ar(6)}</span></div>`}
      <div class="sw-save">${svg("save")}${t.save}</div>
    </div>`;
  };

  const preview = (tool) => `
    <div class="sw-prev">
      <div class="sw-prev-h"><b>معاينة الملف</b><span>${svg("maximize")}عرض موسع</span></div>
      <div class="sw-zoom">${svg("zoomOut")}<span>%100</span>${svg("zoomIn")}<span class="sw-fit">ملاءمة</span></div>
      <div class="sw-desk">${page(0)}</div>
      <div class="sw-nav"><span>${svg("right")}السابقة</span><span>صفحة ${ar(1)} من ${ar(6)}</span><span>التالية${svg("left")}</span></div>
      <div class="sw-thumbs">${[0, 1, 2, 3, 4, 5].map((i) => `<div class="sw-th${i === 0 ? " cur" : ""}"><div class="sw-mini">${page(i)}</div><span>${ar(i + 1)}</span><i>${svg("check")}</i></div>`).join("")}</div>
    </div>`;

  const paint = (root, tool) => {
    const t = TOOLS[tool];
    root.style.setProperty("--tc", t.c[0]); root.style.setProperty("--tcd", t.c[1]);
    root.style.setProperty("--ts", t.c[2]); root.style.setProperty("--tsd", t.c[3]);
  };

  const windowHTML = (tool, interactive) => `
    ${side(tool, interactive)}
    <div class="sw-main">
      <div class="sw-top">
        ${interactive
          ? `<button type="button" class="sw-ib sw-theme" aria-label="بدّل المظهر">${svg("moon", "mo")}${svg("sun", "su")}</button>`
          : `<span class="sw-ib">${svg("moon", "mo")}${svg("sun", "su")}</span>`}
        <span class="sw-ib">${svg("settings")}</span><span class="sw-ib">${svg("info")}</span>
      </div>
      <div class="sw-work">
        <div class="sw-crumb">مساحة العمل&nbsp; / &nbsp;<span class="sw-cn">${TOOLS[tool].name}</span></div>
        <div class="sw-titlerow"><div class="sw-title">${TOOLS[tool].name}</div><span class="sw-badge">${svg(TOOLS[tool].icon)}</span></div>
        <div class="sw-cols">${panel(tool)}${preview(tool)}</div>
      </div>
    </div>`;

  /* ملاءمة النافذة لعرض الحاوية: تُرسم بمقاسها الحقيقي ثم تُصغَّر، فتبقى حادة */
  const fit = (box, el, w) => {
    const go = () => { const k = Math.max(box.clientWidth / w, matchMedia("(max-width: 640px)").matches ? 0.6 : 0); el.style.transform = `scale(${k})`; box.style.height = el.offsetHeight * k + "px"; };
    go(); new ResizeObserver(go).observe(box);
    document.fonts?.ready.then(go);
  };

  const api = {
    TOOLS,
    window(box, { tool = "merge", theme = "light", interactive = true, scale = true, onTheme } = {}) {
      const el = document.createElement("div");
      el.className = "sw sw-window";
      el.setAttribute("data-ui", "");
      el.dataset.theme = theme;
      el.setAttribute("dir", "rtl");
      el.innerHTML = windowHTML(tool, interactive);
      paint(el, tool);
      box.append(el);
      if (scale) fit(box, el, 1180);
      const setTool = (k) => {
        if (!TOOLS[k]) return;
        tool = k; paint(el, k);
        el.querySelectorAll(".sw-item").forEach((b) => { const on = b.dataset.k === k; b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
        const work = el.querySelector(".sw-work");
        el.querySelector(".sw-cn").textContent = TOOLS[k].name;
        el.querySelector(".sw-title").textContent = TOOLS[k].name;
        el.querySelector(".sw-badge").innerHTML = svg(TOOLS[k].icon);
        el.querySelector(".sw-panel").outerHTML = panel(k);
        work.classList.remove("in"); void work.offsetWidth; work.classList.add("in");
      };
      const setTheme = (th) => { el.dataset.theme = th; onTheme?.(th); };
      if (interactive) {
        el.addEventListener("click", (e) => {
          const b = e.target.closest(".sw-item"); if (b) return setTool(b.dataset.k);
          if (e.target.closest(".sw-theme")) setTheme(el.dataset.theme === "dark" ? "light" : "dark");
        });
      }
      return { el, setTool, setTheme, get theme() { return el.dataset.theme; } };
    },
    sidebar(box, { tool = "word", theme = "dark" } = {}) {
      const el = document.createElement("div");
      el.className = "sw sw-only-side"; el.setAttribute("data-ui", ""); el.dataset.theme = theme; el.setAttribute("dir", "rtl");
      el.innerHTML = side(tool, false); paint(el, tool); box.append(el); return el;
    },
    panel(box, { tool = "ppt", theme = "dark" } = {}) {
      const el = document.createElement("div");
      el.className = "sw sw-only-panel"; el.setAttribute("data-ui", ""); el.dataset.theme = theme; el.setAttribute("dir", "rtl");
      el.innerHTML = panel(tool); paint(el, tool); box.append(el); return el;
    },
  };
  window.SafahatUI = api;
})();

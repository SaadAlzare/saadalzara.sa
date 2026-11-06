/* =========================================================
   برامجي — أضف مشاريعك هنا
   ---------------------------------------------------------
   كل مشروع كتلة { ... } في القائمة. المشروع الأول يظهر أولًا.
   لإضافة مشروع جديد انسخ الكتلة الموجودة وعدّل قيمها،
   والحقول التي لا تحتاجها احذفها.

   name         اسم البرنامج
   latin        اسمه بالإنجليزية (اختياري)
   type         نوعه: "web" | "mobile" | "desktop" | "tool"
   year         سنة الإطلاق
   version      رقم آخر إصدار (اختياري)
   tagline      جملة قصيرة تعرّف البرنامج
   description  فقرة تشرح ما يفعله
   icon         أيقونة البرنامج داخل assets/projects
   accent       لون البرنامج الأساسي (اختياري)
   images       لقطات الشاشة: [{ src, label }] — إن كانت أكثر من
                واحدة يظهر زر للتبديل بينها
   stats        حقائق قصيرة: [["العنوان", "القيمة"], ...]
   tools        مجموعات الأدوات (اختياري): [{ group, items: [[الاسم, اللون]] }]
   ui           (اختياري) true يعرض نسخة HTML حية من واجهة صفَحات (assets/app.js)
                بدل لقطات الشاشة. البرامج الأخرى تكتفي بـ images
   tech         التقنيات المستخدمة (تظهر سطرًا صغيرًا تحت الوصف)
   links        download (رابط التحميل) | page (صفحة المشروع)
                | code (المستودع) | live (رابط التجربة)
   release      (اختياري) يجعل أزرار التحميل تجلب آخر إصدار من GitHub
                تلقائيًا: { repo: "المالك/المستودع",
                             asset: "جزء من اسم ملف التثبيت",
                             portable: "جزء من اسم النسخة المحمولة" }
   ========================================================= */

window.PROJECTS = [
  {
    name: "صفَحات",
    latin: "Safahat",
    type: "desktop",
    year: 2026,
    version: "3.3.3",
    tagline: "كل ما تحتاجه لملفات PDF في برنامج عربي واحد.",
    description:
      "برنامج مجاني لويندوز يدمج ملفات PDF ويقسّمها ويضغطها ويحوّلها إلى صيغ Office والصور وبالعكس. يعمل دون إنترنت، فلا تغادر ملفاتك جهازك.",
    icon: "assets/projects/safahat-mark.svg",
    accent: "#1668E8",
    ui: true,
    images: [
      { src: "assets/projects/safahat-light.webp", label: "فاتح" },
      { src: "assets/projects/safahat-dark.webp", label: "داكن" }
    ],
    stats: [
      ["السعر", "مجاني"],
      ["النظام", "Windows 7 إلى 11"],
      ["المعالج", "32 و64 بت، و ARM"],
      ["اللغة", "العربية والإنجليزية"]
    ],
    tools: [
      { group: "تنظيم الصفحات", items: [["دمج", "#E0457B"], ["تقسيم", "#5B4BDB"], ["ترتيب", "#1668E8"]] },
      { group: "Word", items: [["PDF إلى Word", "#0E8A5F"], ["Word إلى PDF", "#B7860B"]] },
      { group: "Excel", items: [["PDF إلى Excel", "#2F8F5B"], ["Excel إلى PDF", "#5E8F1F"]] },
      { group: "PowerPoint", items: [["PDF إلى PowerPoint", "#C2417A"], ["PowerPoint إلى PDF", "#A4552B"]] },
      { group: "الصور", items: [["PDF إلى صور", "#0E9AA7"], ["الصور إلى PDF", "#D2457F"]] },
      { group: "صيانة", items: [["ضغط", "#3A6FD8"], ["إصلاح الملفات التالفة", "#0AA5C8"]] }
    ],
    tech: ["C#", "WPF", "PDFium", "Tesseract OCR", "qpdf"],
    links: {
      download: "https://github.com/SaadAlzare/safahat-releases/releases/latest",
      portable: "https://github.com/SaadAlzare/safahat-releases/releases/latest"
    },
    release: { repo: "SaadAlzare/safahat-releases", asset: "Setup.exe", portable: "portable.zip" }
  }
];

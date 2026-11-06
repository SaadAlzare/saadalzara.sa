/* الموقع الشخصي — التفاعل */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const TYPES = { web: "تطبيق ويب", mobile: "تطبيق جوال", desktop: "برنامج لويندوز", tool: "أداة" };
  const LINKS = { download: "تحميل مجاني", portable: "النسخة المحمولة", page: "صفحة البرنامج", live: "جرّبه", code: "الكود المصدري" };
  const ar = (n) => String(n); // الأرقام بالصيغة الغربية في الموقع كله
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ICON_DL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m15.2-6.7-1.4 1.4M6.7 17.3l-1.4 1.4m0-13.4 1.4 1.4m10.6 10.6 1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const ICON_MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

  /* ---------- البرامج ---------- */
  const UI = window.SafahatUI;
  const list = $("#projects");
  if (list) {
    list.innerHTML = projects.map((p, n) => {
      const imgs = p.images || [];
      const links = Object.entries(p.links || {}).filter(([, u]) => u);
      const meta = [p.version && `الإصدار ${p.version}`, TYPES[p.type] || p.type, p.year && ar(p.year)].filter(Boolean);
      const live = p.ui && UI;
      const themes = live ? [["light", "فاتح"], ["dark", "داكن"]] : imgs.map((im, i) => [String(i), im.label || ar(i + 1)]);
      return `
      <article class="proj" aria-labelledby="p${n}">
        <div class="proj-top" data-rv>
          <div class="proj-id">
            ${p.icon ? `<img class="proj-icon" src="${esc(p.icon)}" alt="" width="64" height="64">` : ""}
            <div>
              <h3 class="proj-name" id="p${n}">${esc(p.name)}</h3>
              <p class="proj-meta">${meta.map((m, i) => `<span${i === 0 ? ' class="ver"' : ""}>${esc(m)}</span>`).join("")}</p>
            </div>
          </div>
          ${links.length ? `<div class="proj-links">${links.map(([k, u], i) =>
            `<a class="btn ${i === 0 ? "" : "btn-quiet"}" href="${esc(u)}" ${(k === "download" || k === "portable") && p.release ? `data-release="${n}" data-kind="${k}"` : /^https?:/.test(u) ? 'target="_blank" rel="noopener"' : ""}>${k === "download" || k === "portable" ? ICON_DL : ""}${LINKS[k] || esc(k)}</a>`).join("")}</div>` : ""}
        </div>
        <figure class="shot" data-rv>
          ${live ? `<div class="shot-fit" data-live="${n}"></div>` : `<div class="screens">${imgs.map((im, i) => `<img class="${i === 0 ? "on" : ""}" src="${esc(im.src)}" alt="لقطة من ${esc(p.name)}" width="1000" height="640" decoding="async">`).join("")}</div>`}
          <div class="shot-bar">
            ${themes.length > 1 ? `
            <div class="switch" role="group" aria-label="مظهر الواجهة">
              ${themes.map(([v, l], i) => `<button type="button" data-shot="${v}" aria-pressed="${i === 0}">${/داكن/.test(l) ? ICON_MOON : /فاتح/.test(l) ? ICON_SUN : ""}${esc(l)}</button>`).join("")}
            </div>` : ""}
            ${live ? `<figcaption class="shot-cap">جرّب الأدوات من الشريط الجانبي.<span class="swipe-hint"> اسحب الواجهة لرؤيتها كاملة.</span></figcaption>` : ""}
          </div>
        </figure>
        <div class="proj-body" data-rv>
          <div>
            ${p.tagline ? `<p class="proj-tag">${esc(p.tagline)}</p>` : ""}
            ${p.description ? `<p class="proj-desc">${esc(p.description)}</p>` : ""}
            ${p.tech?.length ? `<p class="tech">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</p>` : ""}
          </div>
          ${p.stats?.length ? `<dl class="stats">${p.stats.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
        </div>
      </article>`;
    }).join("");

    $$(".proj", list).forEach((art, n) => {
      const sw = $(".switch", art);
      const btns = sw ? $$("button", sw) : [];
      const box = $("[data-live]", art);
      let win = null, k = 0, auto = 0, stopped = false;
      const mark = (i) => btns.forEach((b, j) => b.setAttribute("aria-pressed", i === j));
      const pick = (i) => {
        k = i; mark(i);
        if (win) win.setTheme(btns[i].dataset.shot);
        else $$(".screens img", art).forEach((im, j) => im.classList.toggle("on", i === j));
      };
      if (box) {
        win = UI.window(box, { tool: "merge", theme: "light", onTheme: (th) => { k = th === "dark" ? 1 : 0; mark(k); } });
        win.el.addEventListener("click", () => { stopped = true; clearInterval(auto); });
      }
      btns.forEach((b, i) => b.addEventListener("click", () => { stopped = true; clearInterval(auto); pick(i); }));
      // يتبدل المظهر وحده ببطء، كالضوء يتغير في الغرفة، حتى يتفاعل الزائر
      const run = () => { clearInterval(auto); if (!stopped && !document.hidden) auto = setInterval(() => pick((k + 1) % btns.length), 7000); };
      if (!reduce && btns.length > 1) {
        const fig = $(".shot", art);
        new IntersectionObserver((es) => { es[0].isIntersecting ? run() : clearInterval(auto); }, { threshold: 0.4 }).observe(fig);
        document.addEventListener("visibilitychange", () => (document.hidden ? clearInterval(auto) : run()));
      }
    });
  }

  /* ---------- أزرار التحميل: آخر إصدار من GitHub ---------- */
  // يسأل GitHub عن آخر إصدار ويضع رابط الملف مباشرة في كل زر.
  // إن تعذّر ذلك تبقى الأزرار على صفحة آخر إصدار.
  projects.forEach(async (p, n) => {
    if (!p.release?.repo) return;
    const btns = $$(`[data-release="${n}"]`);
    if (!btns.length) return;
    const fallback = (b) => { b.target = "_blank"; b.rel = "noopener"; };
    try {
      const r = await fetch(`https://api.github.com/repos/${p.release.repo}/releases/latest`, { headers: { Accept: "application/vnd.github+json" } });
      if (!r.ok) throw r.status;
      const rel = await r.json();
      const assets = rel.assets || [];
      const find = (part, re) => assets.find((x) => part && x.name.toLowerCase().includes(part.toLowerCase())) || assets.find((x) => re.test(x.name));
      const v = (rel.tag_name || "").replace(/^v/i, "");
      btns.forEach((b) => {
        const portable = b.dataset.kind === "portable";
        const a = portable ? find(p.release.portable, /portable.*\.zip$/i) : find(p.release.asset, /\.exe$/i);
        if (!a) return fallback(b);
        b.href = a.browser_download_url;
        b.setAttribute("download", "");
        if (v) b.setAttribute("aria-label", `${LINKS[b.dataset.kind]}، الإصدار ${v}`);
      });
      const ver = btns[0].closest(".proj")?.querySelector(".ver");
      if (v && ver) ver.textContent = "الإصدار " + v;
    } catch {
      btns.forEach(fallback);
    }
  });

  /* ---------- الشاشة الأولى: التوقيع يُكتب ثم يظهر السطر ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.classList.add("ready");
    $(".sig-hero")?.classList.add("drawn");
  }));

  /* ---------- السطر: يرسو في الأعلى ---------- */
  const rail = $("#nav");
  const stage = $(".stage");
  const setRail = () => root.style.setProperty("--rail-now", (rail?.offsetHeight || 64) + "px");
  const onScroll = () => {
    if (rail && stage) {
      const docked = scrollY >= stage.offsetHeight - 2;
      if (docked !== rail.classList.contains("docked")) { rail.classList.toggle("docked", docked); requestAnimationFrame(setRail); }
    }
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", setRail);
  onScroll(); setRail();

  // تمييز رابط القسم الحالي
  const navLinks = $$('.rail-nav a[href^="#"]');
  const secObs = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["work", "about", "contact"].forEach((id) => { const s = document.getElementById(id); if (s) secObs.observe(s); });

  /* ---------- ظهور الأقسام ---------- */
  const rvObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      rvObserver.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  $$("[data-rv]").forEach((el) => {
    [...el.children].forEach((c, i) => c.style.setProperty("--i", i));
    rvObserver.observe(el);
  });

  /* ---------- ماذا يفعل صفحات: الصفحات تتحرك ---------- */
  // كل أداة حالتان (قبل وبعد) لأربع صفحات: [x%, y%, دوران, حجم, ظاهرة؟, الرقم, الوسم, مخرَج؟, ممزقة؟]
  const FMT = ["Word", "Excel", "PowerPoint", "JPG"];
  const fan = (cx, cy, i, s = 1) => [cx + (i - 1.5) * 6, cy + (i - 1.5) * 4, (i - 1.5) * 2.5, s];
  const T = {
    merge: {
      cap: "دمج: ملفان من صفحتين يصيران ملفًا واحدًا من أربع صفحات.",
      a: [0, 1, 2, 3].map((i) => [...(i < 2 ? [68 + (i - .5) * 6, 46 + (i - .5) * 4] : [32 + (i - 2.5) * 6, 46 + (i - 2.5) * 4]), (i % 2 ? 3 : -3), .9, 1, ar(i % 2 + 1), "PDF"]),
      b: [0, 1, 2, 3].map((i) => [...fan(50, 50, 3 - i), 1, ar(i + 1), "PDF", true]),
    },
    split: {
      cap: "تقسيم: ملف من أربع صفحات يصير ملفين، لكل نطاق ملفه.",
      a: [0, 1, 2, 3].map((i) => [...fan(50, 50, 3 - i), 1, ar(i + 1), "PDF"]),
      b: [0, 1, 2, 3].map((i) => [...(i < 2 ? [68 + (i - .5) * 6, 46 + (i - .5) * 4] : [32 + (i - 2.5) * 6, 46 + (i - 2.5) * 4]), (i % 2 ? 3 : -3), .9, 1, ar(i % 2 + 1), "PDF", true]),
    },
    order: {
      cap: "ترتيب: الصفحات في مكانها الصحيح، من اليمين إلى اليسار.",
      a: [[3, 0], [1, 1], [4, 2], [2, 3]].map(([n, slot]) => [80 - slot * 20, 50, 0, .55, 1, ar(n), "PDF"]),
      b: [[3, 0], [1, 1], [4, 2], [2, 3]].map(([n]) => [80 - (n - 1) * 20, 50, 0, .55, 1, ar(n), "PDF", true]),
    },
    compress: {
      cap: "ضغط: الصفحات نفسها، في ملف أخف للإرسال.",
      a: [0, 1, 2, 3].map((i) => [...fan(50, 50, 3 - i, 1.25), 1, ar(i + 1), "PDF"]),
      b: [0, 1, 2, 3].map((i) => [50 + (1.5 - i) * 3, 52 + (1.5 - i) * 2, 0, .62, 1, ar(i + 1), "PDF", true]),
    },
    from: {
      cap: "من PDF: الملف يصير مستندًا تعدّله في Word أو Excel أو PowerPoint، أو صورًا.",
      a: (f) => [[64, 50, -3, 1, 1, "", "PDF"], [64, 50, -3, 1, 0, "", f], [64, 50, 0, 1, 0, "", f], [64, 50, 0, 1, 0, "", f]],
      b: (f) => [[64, 50, -3, 1, 1, "", "PDF"], [34, 50, 3, 1, 1, "", f, true], [64, 50, 0, 1, 0, "", f], [64, 50, 0, 1, 0, "", f]],
    },
    to: {
      cap: "إلى PDF: مستند Word أو جدول Excel أو عرض PowerPoint أو صورة، في ملف PDF.",
      a: (f) => [[64, 50, -3, 1, 1, "", f], [64, 50, -3, 1, 0, "", "PDF"], [64, 50, 0, 1, 0, "", "PDF"], [64, 50, 0, 1, 0, "", "PDF"]],
      b: (f) => [[64, 50, -3, 1, 1, "", f], [34, 50, 3, 1, 1, "", "PDF", true], [64, 50, 0, 1, 0, "", "PDF"], [64, 50, 0, 1, 0, "", "PDF"]],
    },
    repair: {
      cap: "إصلاح: الملف الذي لا يُفتح يعود سليمًا.",
      a: [[50, 52, -7, 1.2, 1, "!", "PDF", false, true], [50, 50, 0, 1, 0, "", ""], [50, 50, 0, 1, 0, "", ""], [50, 50, 0, 1, 0, "", ""]],
      b: [[50, 50, 0, 1.2, 1, ar(1), "PDF", true, false], [50, 50, 0, 1, 0, "", ""], [50, 50, 0, 1, 0, "", ""], [50, 50, 0, 1, 0, "", ""]],
    },
  };
  const desk = $(".desk");
  if (desk) {
    const pages = $$(".pg", desk);
    const cap = $(".desk-cap", desk);
    const btns = $$(".names button");
    let tool = "merge", phase = 0, round = 0, timer = 0;
    const apply = (states) => states.forEach(([x, y, r, s, on, n, t, out, torn], i) => {
      const pg = pages[i];
      pg.style.setProperty("--x", x + "%"); pg.style.setProperty("--y", y + "%");
      pg.style.setProperty("--r", r + "deg"); pg.style.setProperty("--s", s);
      pg.style.opacity = on ? 1 : 0;
      pg.style.zIndex = 10 - i;
      pg.classList.toggle("out", !!out); pg.classList.toggle("torn", !!torn);
      pg.querySelector(".pg-n").textContent = n;
      const tag = pg.querySelector(".pg-t");
      tag.textContent = t; tag.hidden = !t;
    });
    const show = () => {
      const d = T[tool], f = FMT[round % FMT.length];
      const st = phase ? d.b : d.a;
      apply(typeof st === "function" ? st(f) : st);
    };
    const loop = () => {
      clearTimeout(timer);
      if (reduce) { phase = 1; show(); return; }
      timer = setTimeout(() => { phase = 1 - phase; if (!phase) round++; show(); loop(); }, phase ? 1500 : 1900);
    };
    const TC = { merge: "merge", split: "split", order: "reorder", compress: "compress", from: "word", to: "wordpdf", repair: "repair" };
    const stage = $(".desk-pages", desk);
    const tint = () => { const t = window.SafahatUI?.TOOLS[TC[tool]]; if (t && stage) stage.style.setProperty("--tc", t.c[0]); };
    const choose = (b) => {
      tool = b.dataset.tool; phase = 0; round = 0; tint();
      btns.forEach((x) => x.setAttribute("aria-pressed", x === b));
      cap.textContent = T[tool].cap;
      show(); loop();
    };
    btns.forEach((b) => {
      b.addEventListener("click", () => choose(b));
      b.addEventListener("mouseenter", () => { if (matchMedia("(hover: hover)").matches && b.dataset.tool !== tool) choose(b); });
      b.addEventListener("focus", () => { if (b.dataset.tool !== tool) choose(b); });
    });
    tint(); show();
    new IntersectionObserver((es) => (es[0].isIntersecting ? loop() : clearTimeout(timer))).observe(desk);
  }

  /* ---------- الرسالة: تفتح البريد برسالة جاهزة ---------- */
  const form = $(".field");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const body = form.elements.body.value.trim();
    location.href = `mailto:Saad.Alzaree@gmail.com?subject=${encodeURIComponent("رسالة من saadalzara.sa")}&body=${encodeURIComponent(body)}`;
  });

  /* ---------- نسخ البريد ---------- */
  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try { await navigator.clipboard.writeText(text); }
      catch {
        const t = Object.assign(document.createElement("textarea"), { value: text });
        document.body.append(t); t.select(); document.execCommand("copy"); t.remove();
      }
      btn.textContent = "نُسخ";
      btn.classList.add("done");
      setTimeout(() => { btn.textContent = "انسخ"; btn.classList.remove("done"); }, 1800);
    });
  });

  const yr = $("#yr");
  if (yr) yr.textContent = ar(new Date().getFullYear());
})();

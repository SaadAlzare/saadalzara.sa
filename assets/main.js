/* الموقع الشخصي — التفاعل */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const $ = (s, el = document) => el.querySelector(s);

  const TYPES = { web: "تطبيق ويب", mobile: "تطبيق جوال", desktop: "برنامج سطح مكتب", tool: "أداة" };
  const LINKS = { download: "تحميل مجاني", portable: "النسخة المحمولة", page: "صفحة البرنامج", live: "جرّبه", code: "الكود المصدري" };
  const ar = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ICON_DL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICON_SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2.5v2m0 15v2m9.5-9.5h-2m-15 0h-2m15.2-6.7-1.4 1.4M6.7 17.3l-1.4 1.4m0-13.4 1.4 1.4m10.6 10.6 1.4 1.4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const ICON_MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';

  /* ---------- البرامج ---------- */
  const list = $("#projects");
  if (list) {
    list.innerHTML = projects.map((p, n) => {
      const imgs = p.images || [];
      const links = Object.entries(p.links || {}).filter(([, u]) => u);
      const meta = [TYPES[p.type] || p.type, p.year && ar(p.year)].filter(Boolean);
      return `
      <article class="proj" style="--accent:${esc(p.accent || "#0784f2")}" aria-labelledby="p${n}">
        <div class="proj-grid">
          <div class="proj-info" data-rv>
            <div class="proj-id">
              ${p.icon ? `<img class="proj-icon" src="${esc(p.icon)}" alt="" width="72" height="72">` : ""}
              <div>
                <h3 class="proj-name" id="p${n}">${esc(p.name)}</h3>
                <p class="proj-meta">${p.version ? `<span class="badge" dir="ltr">v${esc(p.version)}</span>` : ""}${meta.map((m) => `<span>${esc(m)}</span>`).join("")}${p.latin ? `<span dir="ltr">${esc(p.latin)}</span>` : ""}</p>
              </div>
            </div>
            ${p.tagline ? `<p class="proj-tag">${esc(p.tagline)}</p>` : ""}
            ${p.description ? `<p class="proj-desc">${esc(p.description)}</p>` : ""}
            ${p.stats?.length ? `<dl class="stats">${p.stats.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
            ${links.length ? `<div class="proj-links">${links.map(([k, u]) =>
              `<a class="btn ${k === "download" ? "" : "btn-ghost"}" href="${esc(u)}" ${(k === "download" || k === "portable") && p.release ? `data-release="${n}" data-kind="${k}"` : /^https?:/.test(u) ? 'target="_blank" rel="noopener"' : ""}>${k === "download" || k === "portable" ? ICON_DL : ""}${LINKS[k] || esc(k)}</a>`).join("")}</div>` : ""}
          </div>
          ${imgs.length ? `
          <div class="shot-wrap" data-rv>
            <div class="window">
              <div class="window-bar" aria-hidden="true"><i></i><i></i><i></i><b>${esc(p.latin || p.name)}</b></div>
              <div class="screens">
                ${imgs.map((im, i) => `<img class="${i === 0 ? "on" : ""}" src="${esc(im.src)}" alt="لقطة من ${esc(p.name)}${im.label ? ` — المظهر ${esc(im.label)}` : ""}" width="1346" height="862" ${i ? 'loading="lazy"' : ""} decoding="async">`).join("")}
              </div>
            </div>
            ${imgs.length > 1 ? `
            <div class="switch" role="group" aria-label="بدّل لقطة الشاشة">
              <span class="pill" aria-hidden="true"></span>
              ${imgs.map((im, i) => `<button type="button" data-shot="${i}" aria-pressed="${i === 0}">${/داكن/.test(im.label) ? ICON_MOON : /فاتح/.test(im.label) ? ICON_SUN : ""}${esc(im.label || ar(i + 1))}</button>`).join("")}
            </div>` : ""}
          </div>` : ""}
        </div>
        ${p.tools?.length ? `
        <div class="tools" data-rv>
          <div class="tools-head">
            <h4>ماذا يفعل ${esc(p.name)}؟</h4>
            <p>${ar(p.tools.reduce((s, g) => s + g.items.length, 0))} أداة في مساحة عمل واحدة</p>
          </div>
          <div class="tool-groups">
            ${p.tools.map((g) => `<div class="tg"><h5>${esc(g.group)}</h5><ul>${g.items.map(([t, c]) => `<li class="tool" style="--c:${esc(c)}">${esc(t)}</li>`).join("")}</ul></div>`).join("")}
          </div>
          ${p.tech?.length ? `<p class="tech">${p.tech.map((t) => `<span>${esc(t)}</span>`).join("")}</p>` : ""}
        </div>` : ""}
      </article>`;
    }).join("");

    // مبدّل لقطات الشاشة
    list.querySelectorAll(".shot-wrap").forEach((wrap) => {
      const sw = $(".switch", wrap);
      const imgs = [...wrap.querySelectorAll(".screens img")];
      if (sw) {
        const pill = $(".pill", sw);
        const btns = [...sw.querySelectorAll("button")];
        const place = (b) => {
          pill.style.width = b.offsetWidth + "px";
          pill.style.insetInlineStart = (sw.offsetWidth - b.offsetLeft - b.offsetWidth) + "px";
        };
        const pick = (i) => {
          btns.forEach((b, j) => b.setAttribute("aria-pressed", i === j));
          imgs.forEach((im, j) => im.classList.toggle("on", i === j));
          place(btns[i]);
        };
        btns.forEach((b, i) => b.addEventListener("click", () => { pick(i); clearInterval(auto); }));
        const ready = () => place(btns.find((b) => b.getAttribute("aria-pressed") === "true"));
        document.fonts?.ready.then(ready); ready(); addEventListener("resize", ready);
        // تبديل تلقائي هادئ حتى يتفاعل الزائر
        let k = 0, auto = 0;
        if (!reduce && btns.length > 1) {
          new IntersectionObserver((es, o) => {
            if (!es[0].isIntersecting) return; o.disconnect();
            auto = setInterval(() => { k = (k + 1) % btns.length; pick(k); }, 4200);
          }, { threshold: 0.5 }).observe(wrap);
        }
      }
      // ميلان خفيف مع المؤشر
      const win = $(".window", wrap);
      if (fine && !reduce && win) {
        wrap.addEventListener("pointermove", (e) => {
          const r = win.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          win.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
          win.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
          win.style.setProperty("--gx", `${x * 100}%`);
          win.style.setProperty("--gy", `${y * 100}%`);
        });
        wrap.addEventListener("pointerleave", () => { win.style.setProperty("--ry", "0deg"); win.style.setProperty("--rx", "0deg"); });
      }
    });
  }

  /* ---------- أزرار التحميل: آخر إصدار من GitHub ---------- */
  // يسأل GitHub عن آخر إصدار ويضع رابط الملف مباشرة في كل زر:
  // ملف التثبيت لزر «تحميل مجاني»، والملف المضغوط لزر «النسخة المحمولة».
  // إن تعذّر ذلك تبقى الأزرار على صفحة آخر إصدار.
  projects.forEach(async (p, n) => {
    if (!p.release?.repo) return;
    const btns = [...document.querySelectorAll(`[data-release="${n}"]`)];
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
        if (v) b.setAttribute("aria-label", `${LINKS[b.dataset.kind]} — الإصدار ${v}`);
      });
      const badge = btns[0].closest(".proj")?.querySelector(".badge");
      if (v && badge) badge.textContent = "v" + v;
    } catch {
      btns.forEach(fallback);
    }
  });

  /* ---------- الواجهة: الاسم ثم التوقيع ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.classList.add("ready");
    $(".sig-hero")?.classList.add("drawn");
  }));

  /* ---------- الشريط العلوي والتمرير ---------- */
  const nav = $("#nav");
  const heroSig = $(".sig-hero");
  let lastY = scrollY, ticking = false;
  const onScroll = () => {
    const y = scrollY;
    nav?.classList.toggle("solid", y > 40);
    nav?.classList.toggle("hide", y > innerHeight && y > lastY + 4);
    if (y < lastY - 4) nav?.classList.remove("hide");
    lastY = y;
    if (heroSig && !reduce && y < innerHeight * 1.2) {
      heroSig.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + y * 0.00012})`;
    }
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // تمييز رابط القسم الحالي
  const navLinks = [...document.querySelectorAll('.nav nav a[href^="#"]')];
  const secObs = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  ["work", "about"].forEach((id) => { const s = document.getElementById(id); if (s) secObs.observe(s); });

  /* ---------- ظهور الأقسام ---------- */
  const rvObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      rvObserver.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -10% 0px" });
  document.querySelectorAll("[data-rv]").forEach((el) => {
    [...el.children].forEach((c, i) => c.style.setProperty("--i", i));
    rvObserver.observe(el);
  });
  const footSig = $(".sig-foot");
  if (footSig) {
    new IntersectionObserver((es, o) => {
      if (es[0].isIntersecting) { footSig.classList.add("drawn"); o.disconnect(); }
    }, { threshold: 0.3 }).observe(footSig);
  }

  /* ---------- عدد البرامج ---------- */
  const countEl = $("[data-count]");
  if (countEl) {
    const n = projects.length;
    countEl.textContent = n === 1 ? "برنامج واحد" : n === 2 ? "برنامجان" : n <= 10 ? `${ar(n)} برامج` : `${ar(n)} برنامجًا`;
  }

  /* ---------- نسخ البريد ---------- */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try { await navigator.clipboard.writeText(text); }
      catch {
        const t = Object.assign(document.createElement("textarea"), { value: text });
        document.body.append(t); t.select(); document.execCommand("copy"); t.remove();
      }
      btn.textContent = "نُسخ ✓";
      btn.classList.add("done");
      setTimeout(() => { btn.textContent = "انسخ"; btn.classList.remove("done"); }, 1800);
    });
  });

  const yr = $("#yr");
  if (yr) yr.textContent = ar(new Date().getFullYear());
})();

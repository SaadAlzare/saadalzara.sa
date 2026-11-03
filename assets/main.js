/* الموقع الشخصي — التفاعل */
(() => {
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const $ = (s, el = document) => el.querySelector(s);

  const TYPES = { web: "ويب", mobile: "جوال", desktop: "سطح المكتب", tool: "أداة" };
  const LINKS = { live: "جرّبه", code: "الكود المصدري", download: "تحميل" };
  const ar = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- الواجهة: الاسم ثم التوقيع ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    root.classList.add("ready");
    $(".sig-hero")?.classList.add("drawn");
  }));

  // التوقيع في الواجهة يتحرك ببطء مع التمرير
  const heroSig = $(".sig-hero");
  if (heroSig && !reduce) {
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(scrollY, innerHeight);
        heroSig.style.transform = `translate3d(0, ${y * 0.18}px, 0) scale(${1 + y * 0.00012})`;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- ظهور الأقسام ---------- */
  const rvObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      rvObserver.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -12% 0px" });
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

  /* ---------- عدد البرامج في النبذة ---------- */
  const countEl = $("[data-count]");
  if (countEl) {
    const total = projects.length;
    countEl.textContent = ar(total);
    if (!reduce && total > 1) {
      new IntersectionObserver((es, o) => {
        if (!es[0].isIntersecting) return;
        o.disconnect();
        let n = 0;
        const t = setInterval(() => { n++; countEl.textContent = ar(n); if (n >= total) clearInterval(t); }, 90);
      }, { threshold: 1 }).observe(countEl);
    }
  }

  /* ---------- برامجي ---------- */
  const namesEl = $("#names");
  const frame = $("#frame");
  const factType = $("#factType");
  const factYear = $("#factYear");
  const filtersEl = $("#filters");
  let filter = "all";
  let shown = [];
  let current = -1;

  const coverHTML = (p, i) => {
    if (p.image) return `<img class="shot" src="${esc(p.image)}" alt="" loading="lazy" decoding="async" width="1200" height="1200">`;
    const tone = ["", "alt", "alt2"][i % 3];
    return `<div class="shot gen-cover ${tone}"><svg viewBox="0 0 1640 530"><use href="#sig-main"/></svg><b>${esc(p.name)}</b></div>`;
  };

  // نجهّز كل الصور مرة واحدة داخل الإطار، ونبدّل بينها
  if (frame) frame.innerHTML = projects.map(coverHTML).join("");
  const shots = frame ? [...frame.children] : [];

  function setCurrent(idx) {
    if (idx === current || idx < 0) return;
    current = idx;
    const p = projects[idx];
    shots.forEach((s, i) => s.classList.toggle("on", i === idx));
    namesEl.querySelectorAll(".pname").forEach((b) => b.classList.toggle("cur", +b.dataset.i === idx));
    [factType, factYear].forEach((f) => f.classList.add("swap"));
    setTimeout(() => {
      factType.textContent = `${TYPES[p.type] || p.type || ""}`;
      factYear.textContent = p.year ? ar(p.year) : "";
      [factType, factYear].forEach((f) => f.classList.remove("swap"));
    }, 160);
  }

  function renderFilters() {
    const counts = projects.reduce((m, p) => ((m[p.type] = (m[p.type] || 0) + 1), m), {});
    const keys = Object.keys(TYPES).filter((k) => counts[k]);
    if (keys.length < 2) { filtersEl.hidden = true; return; }
    const chips = [["all", "الكل", projects.length], ...keys.map((k) => [k, TYPES[k], counts[k]])];
    filtersEl.innerHTML = chips.map(([k, label, n]) =>
      `<button class="chip" type="button" data-f="${k}" aria-pressed="${k === filter}">${label}<span>${ar(n)}</span></button>`).join("");
  }

  function renderNames(animate) {
    shown = projects.map((p, i) => ({ p, i })).filter(({ p }) => filter === "all" || p.type === filter);
    namesEl.classList.toggle("many", shown.length > 9);
    namesEl.innerHTML = shown.map(({ p, i }) =>
      `<li><button class="pname" type="button" data-i="${i}" aria-haspopup="dialog">${esc(p.name)}</button></li>`).join("");
    if (animate && !reduce) {
      namesEl.classList.remove("fade"); void namesEl.offsetWidth; namesEl.classList.add("fade");
    }
    current = -1;
    if (shown.length) setCurrent(shown[0].i);
    track();
  }

  // الاسم الأقرب لمنتصف الشاشة هو الحالي
  function track() {
    const btns = namesEl.querySelectorAll(".pname");
    if (!btns.length) return;
    const mid = innerHeight / 2;
    let best = null, bestD = Infinity;
    btns.forEach((b) => {
      const r = b.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestD) { bestD = d; best = b; }
    });
    if (best) setCurrent(+best.dataset.i);
  }
  let tTick = false;
  addEventListener("scroll", () => {
    if (tTick) return;
    tTick = true;
    requestAnimationFrame(() => { track(); tTick = false; });
  }, { passive: true });
  addEventListener("resize", track);

  if (namesEl) {
    renderFilters();
    renderNames(false);
    namesEl.addEventListener("pointerover", (e) => {
      const b = e.target.closest(".pname");
      if (b && matchMedia("(hover: hover)").matches) setCurrent(+b.dataset.i);
    });
    namesEl.addEventListener("focusin", (e) => {
      const b = e.target.closest(".pname");
      if (b) setCurrent(+b.dataset.i);
    });
    namesEl.addEventListener("click", (e) => {
      const b = e.target.closest(".pname");
      if (b) openProject(+b.dataset.i, b);
    });
    filtersEl.addEventListener("click", (e) => {
      const c = e.target.closest(".chip");
      if (!c || c.dataset.f === filter) return;
      filter = c.dataset.f;
      filtersEl.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", x === c));
      renderNames(true);
      const idx = $("#index");
      const top = idx.getBoundingClientRect().top + scrollY - innerHeight * 0.1;
      if (scrollY > top + 40) scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ---------- نافذة التفاصيل ---------- */
  const dlg = $("#pd");
  let openIdx = -1, opener = null;

  function fillDialog(i) {
    const p = projects[i];
    openIdx = i;
    $("#pdMedia").innerHTML = p.image
      ? `<img src="${esc(p.image)}" alt="لقطة من ${esc(p.name)}" width="1200" height="1200">`
      : coverHTML(p, i).replace('class="shot ', 'class="');
    $("#pdMeta").textContent = [TYPES[p.type] || p.type, p.year && ar(p.year)].filter(Boolean).join(" · ");
    $("#pdName").textContent = p.name;
    $("#pdSum").textContent = p.summary || "";
    $("#pdDesc").textContent = p.description || "";
    $("#pdTech").textContent = (p.tech || []).join(" · ");
    const links = Object.entries(p.links || {}).filter(([, url]) => url);
    $("#pdLinks").innerHTML = links.map(([k, url], n) =>
      `<a class="${n === 0 ? "btn" : ""}" href="${esc(url)}" ${/^https?:/.test(url) ? 'target="_blank" rel="noopener"' : ""}>${LINKS[k] || esc(k)}</a>`).join("");
    const list = shown.map((s) => s.i);
    const pos = list.indexOf(i);
    $("#pdPrev").hidden = list.length < 2;
    $("#pdNext").hidden = list.length < 2;
    $("#pdPrev").dataset.to = list[(pos - 1 + list.length) % list.length];
    $("#pdNext").dataset.to = list[(pos + 1) % list.length];
  }

  function openProject(i, from) {
    if (!dlg) return;
    opener = from || null;
    fillDialog(i);
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    $("#pdClose").focus();
  }
  function closeDialog() {
    if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open");
  }
  if (dlg) {
    dlg.addEventListener("close", () => {
      const b = namesEl.querySelector(`.pname[data-i="${openIdx}"]`) || opener;
      b?.focus({ preventScroll: true });
    });
    $("#pdClose").addEventListener("click", closeDialog);
    dlg.addEventListener("click", (e) => { if (e.target === dlg) closeDialog(); });
    ["#pdPrev", "#pdNext"].forEach((s) => $(s).addEventListener("click", (e) => fillDialog(+e.currentTarget.dataset.to)));
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") fillDialog(+$("#pdNext").dataset.to);
      if (e.key === "ArrowRight") fillDialog(+$("#pdPrev").dataset.to);
    });
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
      btn.textContent = "نُسخ";
      btn.classList.add("done");
      setTimeout(() => { btn.textContent = "انسخ"; btn.classList.remove("done"); }, 1800);
    });
  });

  const yr = $("#yr");
  if (yr) yr.textContent = ar(new Date().getFullYear());
})();

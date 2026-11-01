// Techlog Training — the map, the flight and the certificates.
(() => {
  const MAP = window.MAP, ORGS = window.ORGS || [];
  if (!MAP) return;
  const NS = "http://www.w3.org/2000/svg";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const KIND = { p147: "Part-147 maintenance training", camo: "CAMO, Part-M and ARC", lease: "Lease transition and OIL", ato: "Pilot and cabin crew (ATO)" };
  const CODES = { "Austria": "VIE", "Malta": "MLA", "Switzerland": "ZRH", "Slovakia": "BTS", "Germany": "FRA", "Ireland": "SNN", "United Kingdom": "LHR", "France": "TLS", "Spain": "MAD", "Turkey": "IST", "United Arab Emirates": "DXB", "Singapore": "SIN", "United States of America": "MIA" };
  const label = (n) => n === "United States of America" ? "United States" : n === "Turkey" ? "Türkiye" : n;

  // Group the listings by country.
  const byCountry = new Map();
  for (const o of ORGS) { if (!byCountry.has(o.country)) byCountry.set(o.country, []); byCountry.get(o.country).push(o); }
  const listed = [...byCountry.keys()].sort((a, b) => label(a).localeCompare(label(b)));
  $$("[data-count-orgs]").forEach((el) => (el.textContent = ORGS.length));
  $$("[data-count-countries]").forEach((el) => (el.textContent = listed.length));

  // ---- draw the map ----
  const world = $("[data-world]"), gCountries = $("[data-countries]");
  const shapes = new Map();
  for (const c of MAP.countries) {
    const has = byCountry.has(c.name);
    let el;
    if (c.dot) {
      if (!has) continue;
      el = document.createElementNS(NS, "circle");
      el.setAttribute("cx", c.c[0]); el.setAttribute("cy", c.c[1]); el.setAttribute("r", 4.5);
      el.setAttribute("class", "dot");
    } else {
      el = document.createElementNS(NS, "path");
      el.setAttribute("d", c.d);
      el.setAttribute("class", "land" + (has ? " has" : ""));
    }
    if (has) {
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", `${label(c.name)}, ${byCountry.get(c.name).length} organisations`);
      el.addEventListener("click", () => choose(c.name));
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(c.name); } });
      shapes.set(c.name, { el, c: c.c });
    }
    gCountries.appendChild(el);
  }
  // dots on top of shapes
  $$(".dot", gCountries).forEach((d) => gCountries.appendChild(d));

  // ---- destinations, hero select ----
  const destList = $("[data-destinations]"), select = $("[data-country-select]");
  for (const name of listed) {
    const li = document.createElement("li");
    const b = document.createElement("button");
    b.type = "button"; b.dataset.country = name; b.setAttribute("aria-pressed", "false");
    b.innerHTML = `${label(name)}<span class="n">${byCountry.get(name).length}</span>`;
    b.addEventListener("click", () => choose(name));
    li.appendChild(b); destList.appendChild(li);
    const opt = document.createElement("option"); opt.value = name; opt.textContent = label(name); select.appendChild(opt);
  }
  $("[data-hero-form]").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = select.value || listed[0];
    $("#map").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    setTimeout(() => choose(name), reduce ? 0 : 650);
  });

  // ---- the flight ----
  const HOME = shapes.get("Austria")?.c || [533, 107];
  const plane = $("[data-plane]"), trail = $("[data-trail]"), hint = $("[data-map-hint]");
  $("[data-home]").setAttribute("transform", `translate(${HOME})`);
  let pos = HOME.slice(), heading = 0, flying = 0;
  const full = [0, 0, MAP.w, MAP.h];
  let view = full.slice();
  const setPlane = (p, a) => plane.setAttribute("transform", `translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) rotate(${a.toFixed(1)})`);
  const setView = (v) => world.setAttribute("viewBox", v.map((n) => n.toFixed(1)).join(" "));
  setPlane(pos, heading);

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const bez = (a, k, b, t) => [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * k[0] + t * t * b[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * k[1] + t * t * b[1]];

  function frameFor(a, b) {
    // a camera box that holds both ends of the flight, at least 220 wide, 2:1
    const pad = 60;
    let x0 = Math.min(a[0], b[0]) - pad, x1 = Math.max(a[0], b[0]) + pad;
    let y0 = Math.min(a[1], b[1]) - pad, y1 = Math.max(a[1], b[1]) + pad;
    let w = Math.max(220, x1 - x0, (y1 - y0) * 2);
    w = Math.min(w, MAP.w);
    const h = w / 2, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    return [Math.min(Math.max(cx - w / 2, 0), MAP.w - w), Math.min(Math.max(cy - h / 2, 0), MAP.h - h), w, h];
  }

  function fly(to, done) {
    const from = pos.slice();
    const dx = to[0] - from[0], dy = to[1] - from[1], dist = Math.hypot(dx, dy);
    // arc bends "up" like a great circle on this projection
    const k = [(from[0] + to[0]) / 2 - dy * 0.15, (from[1] + to[1]) / 2 - Math.max(18, dist * 0.28)];
    const v0 = view.slice(), v1 = frameFor(from, to);
    const id = ++flying;
    if (reduce || dist < 1) {
      pos = to.slice(); setPlane(pos, heading); view = v1; setView(view);
      trail.setAttribute("d", `M${from} Q${k} ${to}`);
      return done();
    }
    const dur = Math.min(2600, 1100 + dist * 5);
    const t0 = performance.now();
    trail.setAttribute("d", "");
    function step(now) {
      if (id !== flying) return;
      const t = Math.min(1, (now - t0) / dur), e = ease(t);
      const p = bez(from, k, to, e), q = bez(from, k, to, Math.min(1, e + 0.01));
      if (Math.hypot(q[0] - p[0], q[1] - p[1]) > 0.01) heading = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI;
      pos = p; setPlane(p, heading);
      // draw the trail up to the plane
      const pts = []; for (let i = 0; i <= 24; i++) pts.push(bez(from, k, to, (e * i) / 24).map((n) => n.toFixed(1)).join(","));
      trail.setAttribute("d", "M" + pts.join(" L"));
      view = v0.map((n, i) => n + (v1[i] - n) * ease(Math.min(1, t * 1.15))); setView(view);
      if (t < 1) requestAnimationFrame(step); else done();
    }
    requestAnimationFrame(step);
  }

  // ---- results deck ----
  const deck = $("[data-deck]"), title = $("[data-results-title]"), count = $("[data-results-count]"), filter = $("[data-filter]");
  let current = null, kind = "all";

  function render() {
    const list = (byCountry.get(current) || []).filter((o) => kind === "all" || o.kind === kind);
    deck.innerHTML = "";
    list.forEach((o, i) => {
      const card = document.createElement("article");
      card.className = "cert enter" + (i === 0 ? " open" : "");
      card.style.setProperty("--i", i);
      const subject = encodeURIComponent(`Course enquiry via Techlog Training: ${o.name}`);
      card.innerHTML = `
        <button type="button" class="cert-spine" aria-label="Open ${o.name}"><span>${o.name}</span></button>
        <div class="cert-body">
          <h4 class="cert-name">${o.name}</h4>
          <dl class="cert-facts">
            <dt>Training</dt><dd>${KIND[o.kind]}</dd>
            <dt>Approval</dt><dd class="cert-ref">${o.ref}</dd>
            <dt>City</dt><dd>${o.city}</dd>
            <dt>Language</dt><dd>${o.lang}</dd>
            <dt>Delivery</dt><dd>${o.mode}</dd>
          </dl>
          <ul class="cert-courses">${o.courses.map((c) => `<li>${c}</li>`).join("")}</ul>
          <p class="cert-foot"><a class="link-plain" href="mailto:hello@techlog-training.example?subject=${subject}">Send an enquiry</a><span class="sample">Sample listing</span></p>
        </div>`;
      card.querySelector(".cert-spine").addEventListener("click", () => openCard(card));
      deck.appendChild(card);
    });
    if (!list.length) deck.innerHTML = `<p class="deck-empty">No ${KIND[kind] || ""} listed in ${label(current)} yet.</p>`;
    count.textContent = `${list.length} of ${(byCountry.get(current) || []).length} organisations in ${label(current)}.`;
  }
  function openCard(card) {
    $$(".cert.open", deck).forEach((c) => c.classList.remove("open"));
    card.classList.add("open");
    card.querySelector(".cert-body a")?.focus({ preventScroll: true });
  }
  filter.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-kind]"); if (!b) return;
    kind = b.dataset.kind;
    $$("button", filter).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    render();
  });

  function choose(name) {
    if (!byCountry.has(name)) return;
    current = name; kind = "all";
    $$("button", filter).forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.kind === "all")));
    shapes.forEach((s, n) => s.el.classList.toggle("on", n === name));
    $$("button", destList).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.country === name)));
    select.value = name;
    $("[data-stub-to]").textContent = CODES[name] || label(name);
    hint.textContent = `Flying to ${label(name)}…`;
    title.textContent = `Training in ${label(name)}`;
    fly(shapes.get(name).c, () => {
      hint.textContent = `Landed in ${label(name)}. ${byCountry.get(name).length} organisations listed.`;
      filter.hidden = false;
      render();
    });
  }

  // Start at home: Austria's schools are on the desk before the first flight.
  (function home() {
    const name = byCountry.has("Austria") ? "Austria" : listed[0];
    current = name; filter.hidden = false;
    shapes.get(name)?.el.classList.add("on");
    $$("button", destList).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.country === name)));
    title.textContent = `Training in ${label(name)}`;
    render();
  })();
})();

// Reveal once when an element enters the viewport; never leaves content hidden.
(() => {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) { targets.forEach((el) => el.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }, { rootMargin: "0px 0px 10% 0px", threshold: 0 });
  targets.forEach((el) => io.observe(el));
  addEventListener("load", () => setTimeout(() => targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add("is-in"); }), 2500));
})();

// The boarding pass lifts away gently as the page scrolls past it.
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const pass = document.querySelector("[data-pass]"), room = document.querySelector(".hangar");
  if (!pass) return;
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(scrollY, innerHeight);
      const t = y / innerHeight;
      pass.style.translate = `0 ${(-t * 60).toFixed(1)}px`;
      pass.style.scale = (1 - t * 0.06).toFixed(3);
      if (room) room.style.transform = `translateY(${(t * 80).toFixed(1)}px) scale(${(1 + t * 0.05).toFixed(3)})`;
      ticking = false;
    });
  }, { passive: true });
})();

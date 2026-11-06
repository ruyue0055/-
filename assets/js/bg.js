/* 背景引擎：天候底片 + 剪影 + 粒子
   想换成自己的插画：给场景节点加 bg: "assets/bg/xxx.jpg" 即可（见 README） */
window.BG = (function () {
  "use strict";

  var THEMES = {
    night:  { sky: ["#060912", "#0c1626", "#04060b"], glow: "rgba(140,175,225,.20)", part: "star",  sil: "eave"  },
    snow:   { sky: ["#070a0d", "#121b23", "#040607"], glow: "rgba(190,210,225,.10)", part: "snow",  sil: "eave"  },
    lamp:   { sky: ["#0b0705", "#1c1109", "#050303"], glow: "rgba(235,165,70,.20)",  part: "dust",  sil: "eave"  },
    rain:   { sky: ["#070b0d", "#0e1a1f", "#030507"], glow: "rgba(110,150,165,.12)", part: "rain",  sil: "city"  },
    war:    { sky: ["#0c0605", "#1f0f0b", "#050303"], glow: "rgba(225,95,50,.16)",  part: "ember", sil: "mount" },
    dawn:   { sky: ["#100e08", "#2c2516", "#070604"], glow: "rgba(245,205,125,.18)", part: "dust",  sil: "mount" },
    abroad: { sky: ["#04070c", "#0a1828", "#020406"], glow: "rgba(90,150,190,.15)", part: "fog",   sil: "sea"   },
    plain:  { sky: ["#06070a", "#121316", "#030404"], glow: "rgba(200,180,140,.09)", part: "dust",  sil: "mount" }
  };

  var SIL = {
    eave: "M-80,520 L-80,372 Q120,356 260,318 Q430,280 560,300 L900,300 Q1040,282 1200,300 L1400,300 Q1540,330 1680,352 L1680,520 Z",
    mount: "M-80,520 L-80,436 L120,330 L268,404 L430,296 L580,392 L720,318 L880,424 L1010,348 L1150,420 L1300,330 L1460,412 L1680,352 L1680,520 Z",
    city: "M-80,520 L-80,404 L60,404 L60,372 L150,372 L150,404 L250,404 L250,352 L286,352 L286,332 L322,352 L322,404 L430,404 L430,380 L540,380 L540,404 L640,404 L640,344 L700,344 L700,316 L742,344 L742,404 L860,404 L860,376 L980,376 L980,404 L1080,404 L1080,360 L1120,360 L1120,340 L1160,360 L1160,404 L1290,404 L1290,384 L1400,384 L1400,404 L1520,404 L1520,368 L1600,368 L1600,404 L1680,404 L1680,520 Z",
    sea:   "M-80,520 L-80,452 C120,436 240,470 400,452 C560,434 700,470 860,452 C1020,434 1160,470 1320,452 C1460,436 1580,466 1680,452 L1680,520 Z"
  };

  var bgEl, aEl, bEl, silEl, cv, ctx, W = 0, H = 0, DPR = 1;
  var parts = [], mode = "dust", running = false, raf = 0, cur = 0, active = "a";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function silURL(kind) {
    var d = SIL[kind] || SIL.mount;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 520" preserveAspectRatio="none">' +
      '<path d="' + d + '" fill="#04050a" opacity="0.78"/>' +
      '<path d="' + d + '" fill="none" stroke="rgba(232,208,164,0.20)" stroke-width="1.6"/>' +
      "</svg>";
    return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
  }

  function layer(url, css) {
    var el = document.createElement("div");
    el.className = css;
    el.style.backgroundImage = url;
    return el;
  }

  function init() {
    bgEl = document.getElementById("bg");
    aEl = document.createElement("div"); aEl.className = "bg-a";
    bEl = document.createElement("div"); bEl.className = "bg-b";
    bgEl.appendChild(aEl); bgEl.appendChild(bEl);

    silEl = document.createElement("div");
    silEl.className = "bg-sil";
    bgEl.parentNode.insertBefore(silEl, bgEl.nextSibling);

    cv = document.getElementById("fx");
    ctx = cv.getContext("2d");
    resize();
    window.addEventListener("resize", debounce(resize, 180));
    if (!reduce) start();
  }

  function debounce(fn, ms) {
    var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  function resize() {
    if (!cv) return;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.floor(W * DPR); cv.height = Math.floor(H * DPR);
    cv.style.width = W + "px"; cv.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    build();
  }

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function build() {
    parts = [];
    var n = 0;
    if (mode === "star") n = Math.round((W * H) / 4200);
    else if (mode === "snow") n = Math.round((W * H) / 12000);
    else if (mode === "rain") n = Math.round((W * H) / 4600);
    else if (mode === "ember") n = Math.round((W * H) / 18000);
    else if (mode === "fog") n = 26;
    else n = Math.round((W * H) / 20000);
    n = Math.max(12, Math.min(n, 420));

    for (var i = 0; i < n; i++) {
      if (mode === "rain") parts.push({ x: rnd(-100, W), y: rnd(-H, H), l: rnd(12, 34), v: rnd(9, 17), a: rnd(.10, .30), w: rnd(.7, 1.5) });
      else if (mode === "snow") parts.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(.8, 2.6), v: rnd(.25, .9), d: rnd(-.4, .4), p: rnd(0, 6.28), a: rnd(.35, .85) });
      else if (mode === "ember") parts.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(.6, 2.1), v: rnd(.3, 1.1), d: rnd(-.25, .25), a: rnd(.25, .8), p: rnd(0, 6.28) });
      else if (mode === "star") parts.push({ x: rnd(0, W), y: rnd(0, H * .82), r: rnd(.6, 2.1), a: rnd(.3, .95), p: rnd(0, 6.28), s: rnd(.6, 1.8) });
      else if (mode === "fog") parts.push({ x: rnd(-200, W), y: rnd(H * .35, H), r: rnd(160, 420), v: rnd(.06, .3), a: rnd(.02, .06) });
      else parts.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(.4, 1.5), v: rnd(.08, .3), d: rnd(-.2, .2), a: rnd(.06, .3), p: rnd(0, 6.28) });
    }
  }

  function tick(t) {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    var i, p;

    if (mode === "rain") {
      ctx.strokeStyle = "rgba(196,222,238,1)";
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        ctx.globalAlpha = p.a;
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.l * .28, p.y + p.l);
        ctx.stroke();
        p.y += p.v; p.x -= p.v * .28;
        if (p.y > H + 40) { p.y = -40; p.x = rnd(-40, W + 60); }
        if (p.x < -60) p.x = W + 40;
      }
    } else if (mode === "snow") {
      ctx.fillStyle = "#eef3f7";
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        ctx.globalAlpha = p.a;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        p.p += .01; p.y += p.v; p.x += p.d + Math.sin(p.p) * .35;
        if (p.y > H + 10) { p.y = -10; p.x = rnd(0, W); }
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      }
    } else if (mode === "ember") {
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        p.p += .03;
        var fl = .55 + Math.sin(p.p) * .45;
        ctx.globalAlpha = p.a * fl;
        ctx.fillStyle = Math.random() > .82 ? "#ffd9a0" : "#e8794a";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        p.y -= p.v; p.x += p.d + Math.sin(p.p * .7) * .3;
        if (p.y < -10) { p.y = H + 10; p.x = rnd(0, W); }
      }
    } else if (mode === "star") {
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        p.p += .012 * p.s;
        ctx.globalAlpha = p.a * (.55 + .45 * (0.5 + 0.5 * Math.sin(p.p)));
        ctx.fillStyle = "#dfe9ff";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
      }
    } else if (mode === "fog") {
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, "rgba(150,180,200," + p.a + ")");
        g.addColorStop(1, "rgba(150,180,200,0)");
        ctx.globalAlpha = 1; ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        p.x += p.v; if (p.x - p.r > W) p.x = -p.r;
      }
    } else {
      ctx.fillStyle = "#f0e2c8";
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        ctx.globalAlpha = p.a;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        p.p += .01; p.y -= p.v; p.x += p.d + Math.sin(p.p) * .2;
        if (p.y < -10) { p.y = H + 10; p.x = rnd(0, W); }
      }
    }
    ctx.globalAlpha = 1;
    if (running) raf = requestAnimationFrame(tick);
  }

  function start() {
    if (running || reduce) return;
    running = true; raf = requestAnimationFrame(tick);
  }
  function stop() {
    running = false; cancelAnimationFrame(raf);
  }
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else start();
  });

  function preload(urls) {
    (urls || []).forEach(function (u) {
      if (!u) return;
      var im = new Image();
      im.src = u;
    });
  }

  function set(mood, image) {
    var th = THEMES[mood] || THEMES.plain;
    if (!aEl) return;

    var nextEl = active === "a" ? bEl : aEl;
    var prevEl = active === "a" ? aEl : bEl;

    if (image) {
      nextEl.style.backgroundImage = 'url("' + image + '")';
      nextEl.style.backgroundColor = th.sky[2];
      nextEl.classList.add("has-image");
    } else {
      nextEl.style.backgroundImage =
        "radial-gradient(90% 70% at 50% 18%, " + th.glow + ", transparent 62%)," +
        "linear-gradient(180deg, " + th.sky[0] + " 0%, " + th.sky[1] + " 52%, " + th.sky[2] + " 100%)";
      nextEl.style.backgroundColor = th.sky[2];
      nextEl.classList.remove("has-image");
    }

    nextEl.style.opacity = "0";
    void nextEl.offsetWidth;
    nextEl.style.opacity = "1";
    prevEl.style.opacity = "0";
    prevEl.classList.remove("has-image");

    active = active === "a" ? "b" : "a";

    /* 有插画时不叠剪影（剪影只服务于程序生成的底片） */
    if (silEl) {
      silEl.style.backgroundImage = silURL(th.sil);
      silEl.style.opacity = image ? "0" : "";
    }
    document.body.classList.toggle("has-art", !!image);

    if (mode !== th.part) { mode = th.part; build(); }
  }

  return { init: init, set: set, preload: preload, themes: THEMES };
})();

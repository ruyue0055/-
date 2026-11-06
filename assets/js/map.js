/* 行进路线图：Natural Earth 110m 国界轮廓（含台湾、海南），手绘风描边
   面板用「行程区」放大视图，全屏用全国视图。纯 SVG，无第三方库 */
window.MAPS = (function () {
  "use strict";

  /* 经纬度序列（已简化为两位小数） */
  var RINGS = {
    mainland: "127.66,49.76 129.40,49.44 130.58,48.73 130.99,47.79 132.51,47.79 133.37,48.18 135.03,48.48 134.50,47.58 134.11,47.21 133.77,46.12 133.10,45.14 131.88,45.32 131.03,44.97 131.29,44.11 131.14,42.93 130.63,42.90 130.64,42.40 129.99,42.99 129.60,42.42 128.05,41.99 128.21,41.47 127.34,41.50 126.87,41.82 126.18,41.11 125.08,40.57 124.27,39.93 122.87,39.64 122.13,39.17 121.05,38.90 121.59,39.36 121.38,39.75 122.17,40.42 121.64,40.95 120.77,40.59 119.64,39.90 119.02,39.25 118.04,39.20 117.53,38.74 118.06,38.06 118.88,37.90 118.91,37.45 119.70,37.16 120.82,37.87 121.71,37.48 122.36,37.45 122.52,36.93 121.10,36.65 120.64,36.11 119.66,35.61 119.15,34.91 120.23,34.36 120.62,33.38 121.23,32.46 121.91,31.69 121.89,30.95 121.26,30.68 121.50,30.14 122.09,29.83 121.94,29.02 121.68,28.23 121.13,28.14 120.40,27.05 119.59,25.74 118.66,24.55 117.28,23.62 115.89,22.78 114.76,22.67 114.15,22.22 113.81,22.55 113.24,22.05 111.84,21.55 110.79,21.40 110.44,20.34 109.89,20.28 109.63,21.01 109.86,21.40 108.52,21.72 108.05,21.55 107.04,21.81 106.57,22.22 106.73,22.79 105.81,22.98 105.33,23.35 104.48,22.82 103.50,22.70 102.71,22.71 102.17,22.46 101.65,22.32 101.80,21.17 101.27,21.20 101.18,21.44 101.15,21.85 100.42,21.56 99.98,21.74 99.24,22.12 99.53,22.95 98.90,23.14 98.66,24.06 97.60,23.90 97.72,25.08 98.67,25.92 98.71,26.74 98.68,27.51 98.25,27.75 97.91,28.34 97.33,28.26 96.25,28.41 96.59,28.83 96.12,29.45 95.40,29.03 94.57,29.28 93.41,28.64 92.50,27.90 91.70,27.77 91.26,28.04 90.73,28.06 90.02,28.30 89.48,28.04 88.81,27.30 88.73,28.09 88.12,27.88 86.95,27.97 85.82,28.20 85.01,28.64 84.23,28.84 83.90,29.32 83.34,29.46 82.33,30.12 81.53,30.42 81.11,30.18 79.72,30.88 78.74,31.52 78.46,32.62 79.18,32.48 79.21,32.99 78.81,33.51 78.91,34.32 77.84,35.49 76.19,35.90 75.90,36.67 75.16,37.13 74.98,37.42 74.83,37.99 74.86,38.38 74.26,38.61 73.93,38.51 73.68,39.43 73.96,39.66 73.82,39.89 74.78,40.37 75.47,40.56 76.53,40.43 76.90,41.07 78.19,41.19 78.54,41.58 80.12,42.12 80.26,42.35 80.18,42.92 80.87,43.18 79.97,44.92 81.95,45.32 82.46,45.54 83.18,47.33 85.16,47.00 85.72,47.45 85.77,48.46 86.60,48.55 87.36,49.21 87.75,49.30 88.01,48.60 88.85,48.07 90.28,47.69 90.97,46.89 90.59,45.72 90.95,45.29 92.13,45.12 93.48,44.98 94.69,44.35 95.31,44.24 95.76,43.32 96.35,42.73 97.45,42.75 99.52,42.52 100.85,42.66 101.83,42.51 103.31,41.91 104.52,41.91 104.96,41.60 106.13,42.13 107.74,42.48 109.24,42.52 110.41,42.87 111.13,43.41 111.83,43.74 111.67,44.07 111.35,44.46 111.87,45.10 112.44,45.01 113.46,44.81 114.46,45.34 115.99,45.73 116.72,46.39 117.42,46.67 118.87,46.81 119.66,46.69 119.77,47.05 118.87,47.75 118.06,48.07 117.30,47.70 116.31,47.85 115.74,47.73 115.49,48.14 116.19,49.13 116.68,49.89 117.88,49.51 119.29,50.14 119.28,50.58 120.18,51.64 120.74,51.96 120.73,52.52 120.18,52.75 121.00,53.25 122.25,53.43 123.57,53.46 125.07,53.16 125.95,52.79 126.56,51.78 126.94,51.35 127.29,50.74 127.66,49.76",
    hainan: "110.34,18.68 109.48,18.20 108.66,18.51 108.63,19.37 109.12,19.82 110.21,20.10 110.79,20.08 111.01,19.70 110.57,19.26 110.34,18.68",
    taiwan: "121.78,24.39 121.18,22.79 120.75,21.97 120.22,22.81 120.11,23.56 120.69,24.54 121.50,25.30 121.95,25.00 121.78,24.39"
  };

  var RIVERS = {
    changjiang: "104.1,30.7 106.5,29.6 108.4,30.8 111.3,30.7 112.2,30.3 114.3,30.6 116.0,29.7 117.2,30.5 118.8,32.1 120.4,32.2 121.5,31.4",
    huanghe: "103.8,36.1 105.7,37.5 106.3,38.5 107.5,39.8 109.8,40.6 110.4,39.0 110.5,37.5 110.3,34.7 112.5,34.8 113.6,34.8 115.0,35.4 117.0,36.7 118.9,37.8"
  };

  var BBOX_FULL = { x0: 73, x1: 136, y0: 17.5, y1: 54.5 };
  var BBOX_DETAIL = { x0: 97, x1: 125.5, y0: 21.0, y1: 43.0 };
  var PAD = 12;

  function makeProj(bbox, W, H) {
    var mx = (bbox.x0 + bbox.x1) / 2, my = (bbox.y0 + bbox.y1) / 2;
    var k = Math.cos(my * Math.PI / 180);
    var w = (bbox.x1 - bbox.x0) * k, h = (bbox.y1 - bbox.y0);
    var s = Math.min((W - PAD * 2) / w, (H - PAD * 2) / h);
    return function (lon, lat) {
      return {
        x: W / 2 + (lon - mx) * k * s,
        y: H / 2 - (lat - my) * s
      };
    };
  }

  function ringPath(str, project) {
    var pts = str.trim().split(/\s+/), d = "";
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i].split(","), q = project(+p[0], +p[1]);
      d += (i ? "L" : "M") + q.x.toFixed(1) + " " + q.y.toFixed(1) + " ";
    }
    return d + "Z";
  }

  function smoothPath(points) {
    if (!points.length) return "";
    if (points.length === 1) return "M" + points[0].x.toFixed(1) + " " + points[0].y.toFixed(1);
    var d = "M" + points[0].x.toFixed(1) + " " + points[0].y.toFixed(1);
    for (var i = 1; i < points.length; i++) {
      var p0 = points[i - 1], p1 = points[i];
      var mx = (p0.x + p1.x) / 2, my = (p0.y + p1.y) / 2;
      d += " Q" + p0.x.toFixed(1) + " " + p0.y.toFixed(1) + " " + mx.toFixed(1) + " " + my.toFixed(1);
    }
    var last = points[points.length - 1];
    return d + " L" + last.x.toFixed(1) + " " + last.y.toFixed(1);
  }

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  function render(o) {
    o = o || {};
    var detail = !!o.detail;
    var W = 400, H = detail ? 300 : 306;
    var project = makeProj(detail ? BBOX_DETAIL : BBOX_FULL, W, H);
    var fs = detail ? 1.5 : 1.0;
    var uid = o.id || "m1";
    var stage = o.stage || 1;
    var data = window.STORY;
    var out = [];

    out.push('<defs>' +
      '<filter id="rough-' + uid + '" x="-6%" y="-6%" width="112%" height="112%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="' + (detail ? "0.02" : "0.028") + '" numOctaves="2" seed="7" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G"/>' +
      "</filter>" +
      '<linearGradient id="paper-' + uid + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#efe3c6"/><stop offset="1" stop-color="#e2d2ad"/>' +
      "</linearGradient></defs>");

    out.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="url(#paper-' + uid + ')"/>');

    /* 经纬网 */
    var g = [], i, a, b;
    for (var lon = 80; lon <= 130; lon += 10) {
      a = project(lon, 15); b = project(lon, 56);
      if (a.x < -10 || a.x > W + 10) continue;
      g.push('<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '"/>');
    }
    for (var lat = 20; lat <= 50; lat += 10) {
      a = project(70, lat); b = project(140, lat);
      if (a.y < -10 || a.y > H + 10) continue;
      g.push('<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '"/>');
    }
    out.push('<g class="map-grid">' + g.join("") + "</g>");

    /* 陆地 */
    out.push('<g filter="url(#rough-' + uid + ')">');
    ["mainland", "hainan", "taiwan"].forEach(function (k) {
      out.push('<path class="map-land" d="' + ringPath(RINGS[k], project) + '"/>');
    });
    out.push("</g>");

    /* 江河 */
    var rv = [];
    for (var k2 in RIVERS) {
      var pts = RIVERS[k2].split(" ").map(function (s) {
        var p = s.split(","); return project(+p[0], +p[1]);
      });
      rv.push('<path class="map-river" d="' + smoothPath(pts) + '"/>');
    }
    out.push("<g>" + rv.join("") + "</g>");

    /* 路线 */
    var routeEls = [], shown = {}, ghost = ["south", "mid", "west"];
    data.routes.forEach(function (r) {
      if (stage < r.stage && r.id !== o.extra) return;
      var isBranch = ghost.indexOf(r.id) >= 0;
      var cls = "map-route";
      if (isBranch) cls += (o.chosen === r.id) ? " is-chosen" : " is-ghost";
      if (r.dash) cls += " is-dash";
      if (r.sea) cls += " is-sea";
      if (r.ret) cls += " is-return";

      if (r.exit) {
        var sp = project(data.cities.shanghai.lon, data.cities.shanghai.lat);
        var d2 = "M" + sp.x.toFixed(1) + " " + sp.y.toFixed(1) +
          " C" + (sp.x - 30) + " " + (sp.y - 42) + " " + (sp.x - 88) + " " + (sp.y - 62) + " 8 46";
        routeEls.push('<path class="' + cls + '" d="' + d2 + '"/>');
        routeEls.push('<text class="map-route-label" style="font-size:' + (8.5 * fs).toFixed(1) + 'px" x="16" y="36">往伦敦 · 1935</text>');
        return;
      }
      var pts2 = r.via.map(function (id) {
        var c = data.cities[id];
        shown[id] = true;
        return project(c.lon, c.lat);
      });
      routeEls.push('<path class="' + cls + '" d="' + smoothPath(pts2) + '"/>');
      if (r.id === "mid" && stage >= 5) {
        var cp = project(data.cities.chongqing.lon, data.cities.chongqing.lat);
        routeEls.push('<circle class="map-event" cx="' + (cp.x - 4).toFixed(1) + '" cy="' + (cp.y + 10).toFixed(1) + '" r="2.2"/>');
      }
    });

    /* 城市 */
    var order = ["beiping", "xuzhou", "zhengzhou", "nanjing", "shanghai", "hankou", "yichang", "changsha",
      "guiyang", "anshun", "chongqing", "leshan", "baoji", "hanzhong", "chengdu", "emei", "keelung", "taipei"];
    var cityEls = [];
    order.forEach(function (id) {
      var c = data.cities[id];
      if (!c) return;
      if (!shown[id] && !(id === "beiping" && stage >= 1)) return;
      var p = project(c.lon, c.lat);
      cityEls.push('<g class="map-city">' +
        '<circle class="map-city-halo" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + (detail ? 7.5 : 9) + '"/>' +
        '<circle class="map-city-dot" cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + (detail ? 3 : 3.4) + '"/>' +
        cityLabel(c, p, fs, detail) + "</g>");
    });

    out.push('<g class="map-routes">' + routeEls.join("") + "</g>");
    out.push('<g class="map-cities">' + cityEls.join("") + "</g>");

    /* 指北针 / 比例尺 */
    out.push('<g class="map-compass" transform="translate(' + (W - 26) + ',32)">' +
      '<circle r="13" fill="none" stroke="#8a6f3e" stroke-width="0.8" opacity="0.5"/>' +
      '<path d="M0 -9 L3.4 2 L0 -1 L-3.4 2 Z" fill="#8a2b22" opacity="0.85" stroke="none"/>' +
      '<text y="-16" text-anchor="middle" style="font-size:' + (7 * fs).toFixed(1) + 'px">北</text></g>');
    out.push('<g class="map-scale" transform="translate(18,' + (H - 14) + ')">' +
      '<path d="M0 0 L46 0" stroke="#6b5b49" stroke-width="1"/>' +
      '<path d="M0 -3 L0 0 M23 -2 L23 0 M46 -3 L46 0" stroke="#6b5b49" stroke-width="1"/>' +
      '<text x="0" y="-6" style="font-size:' + (6.4 * fs).toFixed(1) + 'px">0</text>' +
      '<text x="46" y="-6" text-anchor="end" style="font-size:' + (6.4 * fs).toFixed(1) + 'px">500 公里</text></g>');

    return '<svg class="map-svg' + (detail ? " is-detail" : "") + '" viewBox="0 0 ' + W + " " + H +
      '" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">' + out.join("") + "</svg>";
  }

  function cityLabel(c, p, fs, detail) {
    if (c.hideLabel) return "";
    var x = p.x + (c.dx || 0) * (detail ? 1.25 : 1);
    var y = p.y + (c.dy || 0) * (detail ? 1.25 : 1);
    var anchor = c.anchor || "middle";
    var t = '<text class="map-city-label" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="' + anchor +
      '" style="font-size:' + (9.6 * fs).toFixed(1) + 'px">' + esc(c.name) + "</text>";
    if (c.label && detail) {
      t += '<text class="map-city-sub" x="' + x.toFixed(1) + '" y="' + (y + 8.5 * fs).toFixed(1) + '" text-anchor="' + anchor +
        '" style="font-size:' + (6.3 * fs).toFixed(1) + 'px">' + esc(c.label) + "</text>";
    }
    return t;
  }

  return { render: render };
})();

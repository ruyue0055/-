/* 《万里典守录》 — 叙事引擎 */
(function () {
  "use strict";

  var S = window.STORY, ART = window.ART, MAP = window.MAPS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var SAVE_KEY = "wgny_saves_v1", AUTO_KEY = "wgny_auto_v1";

  /* 出错时给出可见提示，便于排查 */
  window.addEventListener("error", function (e) {
    var t = document.getElementById("toast");
    if (t) { t.textContent = "脚本出错：" + (e.message || "未知错误"); t.classList.add("is-on"); }
    console.error(e.error || e.message);
  });

  var state = {
    node: S.start, line: 0, flags: {}, relics: [], endings: [],
    stage: 1, history: [], choicePoints: [], started: false
  };

  var typing = null, choiceVisible = false, autoMode = false, autoTimer = null, ended = false;

  /* ---------------- 工具 ---------------- */
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function toast(msg) {
    var t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(t._tm);
    t._tm = setTimeout(function () { t.classList.remove("is-on"); }, 2200);
  }
  function save() {
    try { localStorage.setItem(AUTO_KEY, JSON.stringify(snapshot())); } catch (e) { }
  }
  function snapshot() {
    return {
      v: 1, node: state.node, line: 0, flags: state.flags, relics: state.relics,
      endings: state.endings, stage: state.stage, history: state.history,
      choicePoints: state.choicePoints.slice(-12), at: Date.now()
    };
  }
  function restore(d) {
    state.node = d.node || S.start;
    state.line = 0;
    state.flags = d.flags || {};
    state.relics = d.relics || [];
    state.endings = d.endings || [];
    state.stage = d.stage || 1;
    state.history = d.history || [];
    state.choicePoints = d.choicePoints || [];
  }

  /* ---------------- 顶栏 / 幕次 ---------------- */
  function renderActNav() {
    var nav = $("#actNav"), cur = (S.nodes[state.node] || {}).act;
    nav.innerHTML = S.acts.map(function (a) {
      var idx = S.acts.indexOf(a), curIdx = -1;
      S.acts.forEach(function (x, i) { if (x.id === cur) curIdx = i; });
      var cls = "an" + (a.id === cur ? " is-on" : (curIdx > idx ? " is-done" : ""));
      return '<div class="' + cls + '"><b>' + String(idx + 1).padStart(2, "0") + "</b><span>" + a.name + "</span></div>";
    }).join("");
  }

  /* ---------------- 正文 ---------------- */
  function node() { return S.nodes[state.node]; }

  function setMeta(n) {
    var act = S.acts.filter(function (a) { return a.id === n.act; })[0] || S.acts[3];
    $("#smAct").textContent = act.no + " · " + act.name;
    $("#smTime").textContent = n.time || act.time;
    $("#smPlace").textContent = n.place || act.place;
    var p = Math.min(100, ((S.acts.indexOf(act) + 1) / (S.acts.length + 1)) * 100);
    $("#progressBar").style.width = p + "%";
  }

  function clearTyping() {
    if (typing) { clearInterval(typing.timer); typing = null; }
  }

  function finishTyping() {
    if (!typing) return;
    clearInterval(typing.timer);
    typing.node.textContent = typing.text;
    typing = null;
    onLineDone();
  }

  function addLine(l, silent) {
    clearTyping();
    var isNarr = !l.who;
    var d = el("div", "line " + (isNarr ? "is-narr" : "is-dialog") + (l.cls ? " " + l.cls : ""));
    if (l.who) d.appendChild(el("span", "who", l.who === "你" ? "你（心声）" : l.who));
    var t = el("span", "txt", "");
    d.appendChild(t);
    $("#textBody").appendChild(d);
    state.history.push({ who: l.who || "", text: l.text });

    if (silent) {
      t.textContent = l.text;
      scrollBottom();
      return;
    }

    scrollBottom();
    typing = {
      node: t, text: l.text, timer: null,
      timer: setInterval(function () {
        var cur = t.textContent.length + 1;
        t.textContent = l.text.slice(0, cur);
        if (cur >= l.text.length) {
          clearInterval(typing.timer);
          typing = null;
          onLineDone();
        }
      }, 16)
    };
  }

  function onLineDone() {
    var n = node();
    if (state.line >= n.lines.length) {
      if (n.choice) showChoices(n);
      else $("#tapHint").hidden = false;
    }
    scrollBottom();
    if (autoMode) {
      clearTimeout(autoTimer);
      autoTimer = setTimeout(function () { if (autoMode && !typing && !choiceVisible) advance(); }, n.choice ? 2600 : 1500);
    }
  }

  function scrollBottom() {
    var b = $("#textBody");
    b.scrollTop = b.scrollHeight;
  }

  function revealNext() {
    var n = node();
    if (state.line < n.lines.length) {
      addLine(n.lines[state.line]);
      state.line++;
    }
  }

  var lastAct = null, sceneNo = 0;

  function startNode(id) {
    ended = false;
    $("#endingWrap").hidden = true;
    $("#dossier").hidden = false;
    choiceVisible = false;
    clearTyping();
    state.node = id;
    state.line = 0;
    var n = node();
    if (!n) { console.warn("missing node", id); return; }

    if (typeof n.stage === "number" && n.stage > state.stage) state.stage = n.stage;

    setMeta(n);
    renderActNav();

    (n.relics || []).forEach(function (rid) {
      if (state.relics.indexOf(rid) < 0) {
        state.relics.push(rid);
        var r = S.relics.filter(function (x) { return x.id === rid; })[0];
        if (r) setTimeout(function () { toast("收录文物 · " + r.name); }, 500);
      }
    });
    renderRelics();
    renderMap();
    save();

    var changed = lastAct && lastAct !== n.act;
    lastAct = n.act;
    if (changed) showActCard(n.act, function () { beginNode(n); });
    else beginNode(n);
  }

  function beginNode(n) {
    sceneNo++;
    $("#textBody").innerHTML = "";
    $("#textBody").scrollTop = 0;
    $("#choices").hidden = true;
    $("#choices").innerHTML = "";
    $("#choices").classList.remove("show");
    $("#tapHint").hidden = true;

    var dz = $("#dossier");
    dz.style.animation = "none";
    void dz.offsetWidth;
    dz.style.animation = "";

    var fn = $("#fileNo");
    if (fn) fn.textContent = "檔案 · 第 " + String(sceneNo).padStart(3, "0") + " 號";

    if (n.lines.length === 0) {
      if (n.choice) showChoices(n);
      return;
    }
    revealNext();
  }

  /* 幕次卡 */
  function showActCard(actId, done) {
    var a = S.acts.filter(function (x) { return x.id === actId; })[0];
    if (!a) { done(); return; }
    var idx = S.acts.indexOf(a);
    var card = document.createElement("div");
    card.className = "actcard";
    card.innerHTML =
      '<div class="ac-inner">' +
      '<div class="ac-left"><div class="ac-num">' + String(idx + 1).padStart(2, "0") + "</div>" +
      '<div class="ac-line"></div></div>' +
      '<div class="ac-title">' + a.name + "</div>" +
      '<div class="ac-meta">' +
      '<div class="ac-no">' + a.no + "</div>" +
      '<div class="ac-sub">' + a.sub + "</div>" +
      '<div class="ac-time">' + a.time + "</div>" +
      '<div class="ac-place">' + a.place + "</div>" +
      "</div></div>" +
      '<div class="ac-hint">点击继续</div>';
    document.body.appendChild(card);
    var closed = false;
    function close() {
      if (closed) return;
      closed = true;
      card.classList.add("is-out");
      setTimeout(function () {
        if (card.parentNode) card.parentNode.removeChild(card);
        done();
      }, 520);
    }
    card.addEventListener("click", close);
    setTimeout(close, 2600);
    setTimeout(function () { card.classList.add("is-in"); }, 30);
  }

  function advance() {
    if (!state.started) return;
    if (typing) { finishTyping(); return; }
    if (choiceVisible) return;
    var n = node();
    if (n.choice && state.line >= n.lines.length) { showChoices(n); return; }
    if (state.line < n.lines.length) { revealNext(); return; }
    if (n.ending) { showEnding(n.ending); return; }
    if (n.next) { startNode(n.next); return; }
  }

  /* ---------------- 抉择 ---------------- */
  function showChoices(n) {
    if (choiceVisible) return;
    choiceVisible = true;
    $("#tapHint").hidden = true;
    var box = $("#choices");
    box.innerHTML = "";
    box.appendChild(el("div", "choice-prompt", n.choice.prompt));
    n.choice.options.forEach(function (op) {
      var locked = op.requires && !state.flags[op.requires];
      var b = el("button", "choice" + (locked ? " is-locked" : ""));
      b.innerHTML =
        '<span class="choice-key">' + op.key + "</span>" +
        '<span class="choice-main">' +
        '<span class="choice-top"><span class="choice-title">' + op.title + "</span>" +
        (op.tag ? '<span class="choice-tag">' + op.tag + "</span>" : "") + "</span>" +
        (op.quote ? '<span class="choice-quote">「' + op.quote + "」</span>" : "") +
        (op.desc ? '<span class="choice-desc">' + op.desc + "</span>" : "") +
        (locked && op.lockHint ? '<span class="choice-lock">✕ ' + op.lockHint + "</span>" : "") +
        "</span>";
      if (!locked) {
        b.addEventListener("click", function (ev) {
          ev.stopPropagation();
          choose(op);
        });
      } else {
        b.addEventListener("click", function (ev) {
          ev.stopPropagation();
          toast(op.lockHint || "此路尚未开启");
        });
      }
      box.appendChild(b);
    });
    box.hidden = false;
    box.classList.add("show");
    setTimeout(function () { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); }, 60);
  }

  function choose(op) {
    state.choicePoints.push(snapshot());
    if (op.flag) for (var k in op.flag) state.flags[k] = op.flag[k];
    if (S.endings[op.to]) { showEnding(op.to); return; }
    startNode(op.to);
  }

  /* ---------------- 结局 ---------------- */
  function showEnding(eid) {
    var e = S.endings[eid];
    if (!e) return;
    ended = true;
    if (e.stage && e.stage > state.stage) state.stage = e.stage;
    if (state.endings.indexOf(eid) < 0) {
      state.endings.push(eid);
      toast("结局收录 · " + e.title);
    }
    var w = $("#endingWrap");
    w.innerHTML =
      '<div class="ending-card-big">' +
      '<div class="ending-seal">' + e.seal + "</div>" +
      '<div class="ek-kicker">' + e.no + " · " + e.kind + "</div>" +
      "<h2>" + e.title + "</h2>" +
      '<div class="ek-sub">' + e.sub + "</div>" +
      '<div class="ek-body">' + e.text.map(function (t) { return "<p>" + t + "</p>"; }).join("") + "</div>" +
      '<div class="ek-actions">' +
      '<button class="btn-primary" id="ekAgain">再走一遍</button>' +
      '<button class="btn-ghost" id="ekBack">回到上一次抉择</button>' +
      '<button class="btn-ghost" id="ekAlbum">结局图鉴</button>' +
      "</div></div>";
    w.hidden = false;
    $("#dossier").hidden = true;
    $("#tapHint").hidden = true;
    renderMap();
    save();
    $("#ekAgain").addEventListener("click", function () { restart(); });
    $("#ekBack").addEventListener("click", function () { backToChoice(); });
    $("#ekAlbum").addEventListener("click", openEndings);
  }

  function backToChoice() {
    if (!state.choicePoints.length) { toast("这一程还没有分岔"); return; }
    var snap = state.choicePoints.pop();
    restore(snap);
    $("#endingWrap").hidden = true;
    $("#endingWrap").innerHTML = "";
    ended = false;
    startNode(state.node);
    toast("回到上一个分岔口");
  }

  function restart() {
    if (!confirm("重新开始？当前进度会被自动存档覆盖。")) return;
    state.flags = {}; state.relics = []; state.history = []; state.stage = 1;
    state.choicePoints = []; state.endings = state.endings || [];
    $("#endingWrap").hidden = true;
    startNode(S.start);
  }

  /* ---------------- 文物 ---------------- */
  var currentRelic = null, relicFilter = "all";

  function renderRelics(newId) {
    var grid = $("#relicGrid");
    var unlocked = state.relics;
    grid.innerHTML = "";
    S.relics.forEach(function (r) {
      var on = unlocked.indexOf(r.id) >= 0;
      var card = el("div", "relic" + (on ? "" : " is-locked") + (r.id === newId ? " is-new" : ""));
      card.dataset.id = r.id;
      card.innerHTML =
        '<div class="relic-art">' + (on ? ART[r.art] : dimArt()) + "</div>" +
        '<div class="relic-name">' + (on ? r.name : "未 收 录") + "</div>" +
        '<div class="relic-tag">' + (on ? r.tag : "· · · · ·") + "</div>";
      if (on) card.addEventListener("click", function () { openRelic(r.id); });
      grid.appendChild(card);
    });
    $("#relicCount").textContent = unlocked.length + " / " + S.relics.length;
  }

  function dimArt() {
    return '<svg viewBox="0 0 200 200"><rect x="60" y="60" width="80" height="80" fill="none" stroke="#6b5b49" stroke-width="1" stroke-dasharray="3 5"/><text x="100" y="106" text-anchor="middle" fill="#6b5b49" font-size="12" font-family="serif">?</text></svg>';
  }

  function openRelic(id) {
    var list = S.relics.filter(function (r) { return state.relics.indexOf(r.id) >= 0; });
    var idx = list.map(function (r) { return r.id; }).indexOf(id);
    if (idx < 0) return;
    showRelicOverlay(list, idx);
  }

  function showRelicOverlay(list, idx) {
    currentRelic = { list: list, idx: idx };
    var r = list[idx];
    $("#ovTitle").textContent = "文物鉴赏 · " + r.name;
    $("#ovPrev").hidden = $("#ovNext").hidden = list.length < 2;
    var thumbs = list.map(function (x, i) {
      return '<button class="ov-thumb' + (i === idx ? " is-on" : "") + '" data-i="' + i + '">' + ART[x.art] + "</button>";
    }).join("");
    var bonus = r.id === "stele" ? '<p style="color:#c8a15a;font-size:13px">「往事并非如烟，档案记下了每一个名字。」</p>' : "";
    $("#overlayBody").innerHTML =
      '<div class="ov-relic">' +
      '<div class="ov-art">' + ART[r.art] + "</div>" +
      '<div class="ov-info">' +
      '<div class="ov-kicker">' + r.year + " · " + r.tag + "</div>" +
      '<h2 class="ov-name">' + r.name + "</h2>" +
      '<div class="ov-sub">' + r.sub + "</div>" +
      '<div class="ov-line"></div>' +
      '<p class="ov-note">' + r.note + "</p>" + bonus +
      '<div class="ov-source">' + r.source + "</div>" +
      '<div class="ov-thumbs">' + thumbs + "</div>" +
      "</div></div>";
    $("#overlay").hidden = false;
    document.body.style.overflow = "hidden";
    $$(".ov-thumb", $("#overlayBody")).forEach(function (t) {
      t.addEventListener("click", function () { showRelicOverlay(list, +t.dataset.i); });
    });
  }

  /* ---------------- 地图 ---------------- */
  var STAGE_LABEL = { 1: "北平", 2: "北平 → 上海", 3: "上海 → 伦敦", 4: "南京", 5: "三路西迁", 6: "东归南京", 7: "渡海" };

  function renderMap() {
    var stage = state.stage;
    var chosen = state.flags.route;
    var html = MAP.render({ stage: stage, chosen: chosen, london: state.flags.london, id: "main", detail: true });
    $("#mapWrap").innerHTML = html;
    $("#mapStageLabel").textContent = STAGE_LABEL[stage] || "北平";

    var rows = S.routes.filter(function (r) { return stage >= r.stage; }).map(function (r) {
      var isB = ["south", "mid", "west"].indexOf(r.id) >= 0;
      var ghost = isB && chosen && chosen !== r.id;
      var names = r.via.map(function (id) { return id === "exit" ? "出洋" : S.cities[id].name; }).join(" · ");
      return '<div class="mlog' + (ghost ? " is-ghost" : "") + '"><i></i><div><b>' + r.name + "</b><span>" + names + "</span></div></div>";
    }).join("");
    $("#mapLog").innerHTML = rows || '<div class="mlog is-ghost"><i></i><div><b>尚未启程</b><span>1933 · 北平</span></div></div>';
  }

  function openMap() {
    var stage = state.stage, chosen = state.flags.route;
    $("#ovTitle").textContent = "万里行程 · 1933—1949";
    $("#ovPrev").hidden = $("#ovNext").hidden = true;
    var rows = S.routes.filter(function (r) { return stage >= r.stage; }).map(function (r) {
      var isB = ["south", "mid", "west"].indexOf(r.id) >= 0;
      var ghost = isB && chosen && chosen !== r.id;
      var names = r.via.map(function (id) { return id === "exit" ? "（出洋）" : S.cities[id].name; }).join(" → ");
      return '<div class="ov-route' + (ghost ? " is-ghost" : "") + '"><i></i><div><b>' + r.name + "</b>" + names + "</div></div>";
    }).join("");
    $("#overlayBody").innerHTML =
      '<div class="ov-map">' +
      '<div class="ov-map-canvas">' + MAP.render({ stage: stage, chosen: chosen, london: state.flags.london, id: "big", detail: false }) + "</div>" +
      '<div class="ov-map-side">' + "<h4>已行之路</h4>" + '<div class="ov-routes">' + rows + "</div>" +
      '<div class="ov-map-note">底图据 Natural Earth 1:110m 国界简化；路线为史实示意，非精确测绘。' +
      "南路：南京—汉口—长沙—贵阳安顺—四川巴县；中路：南京—汉口—宜昌—重庆—乐山；" +
      "西路：南京—徐州—宝鸡—汉中—成都—峨嵋。</div></div></div>";
    $("#overlay").hidden = false;
    document.body.style.overflow = "hidden";
  }

  $("[data-act=save]").addEventListener("click", openSaves);
  $("#mapExpand").addEventListener("click", openMap);
  $("#relicAll").addEventListener("click", function () {
    var list = S.relics.filter(function (r) { return state.relics.indexOf(r.id) >= 0; });
    if (!list.length) { toast("还没有收录文物"); return; }
    showRelicOverlay(list, 0);
  });

  /* ---------------- 浮层 ---------------- */
  function closeOverlay() {
    $("#overlay").hidden = true;
    document.body.style.overflow = "";
  }
  $("#ovClose").addEventListener("click", closeOverlay);
  $("#overlay").addEventListener("click", function (ev) {
    if (ev.target === $("#overlay") || ev.target.classList.contains("overlay-body")) closeOverlay();
  });
  $("#ovPrev").addEventListener("click", function () {
    if (!currentRelic) return;
    var i = (currentRelic.idx - 1 + currentRelic.list.length) % currentRelic.list.length;
    showRelicOverlay(currentRelic.list, i);
  });
  $("#ovNext").addEventListener("click", function () {
    if (!currentRelic) return;
    var i = (currentRelic.idx + 1) % currentRelic.list.length;
    showRelicOverlay(currentRelic.list, i);
  });

  /* ---------------- 弹窗 ---------------- */
  function openModal(title, html) {
    $("#modalTitle").textContent = title;
    $("#modalBody").innerHTML = html;
    $("#modal").hidden = false;
  }
  function closeModal() { $("#modal").hidden = true; }
  $("#modalClose").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", function (e) { if (e.target === $("#modal")) closeModal(); });

  function openSaves() {
    var saves = [];
    try { saves = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]"); } catch (e) { }
    var html = '<div class="slots">';
    for (var i = 0; i < 3; i++) {
      var s = saves[i];
      if (s) {
        var n = S.nodes[s.node] || {};
        html += '<div class="slot" data-load="' + i + '"><div class="slot-no">卷 ' + (i + 1) + "</div>" +
          '<div class="slot-main"><b>' + (n.place || "—") + "・" + (n.time || "") + "</b>" +
          "<span>" + new Date(s.at).toLocaleString("zh-CN") + " · 文物 " + (s.relics || []).length + " 件</span></div>" +
          '<div class="slot-del" data-del="' + i + '">删除</div></div>';
      } else {
        html += '<div class="slot" data-save="' + i + '"><div class="slot-no">卷 ' + (i + 1) + "</div>" +
          '<div class="slot-main"><b>空 卷</b><span class="slot-empty">点击存入当前进度</span></div></div>';
      }
    }
    html += "</div>";
    html += '<p style="margin-top:16px;font-size:12px;color:#6f6455">自动存档在每次换场时更新；「卷」为手动存档，可存三处。</p>';
    openModal("卷宗 · 存取", html);

    $$("[data-save]", $("#modalBody")).forEach(function (b) {
      b.addEventListener("click", function () {
        var idx = +b.dataset.save;
        saves[idx] = snapshot();
        localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
        toast("已存入卷 " + (idx + 1));
        closeModal(); openSaves();
      });
    });
    $$("[data-load]", $("#modalBody")).forEach(function (b) {
      b.addEventListener("click", function () {
        var s = saves[+b.dataset.load];
        restore(s);
        closeModal();
        startNode(state.node);
        toast("已读取卷宗");
      });
    });
    $$("[data-del]", $("#modalBody")).forEach(function (b) {
      b.addEventListener("click", function (ev) {
        ev.stopPropagation();
        var idx = +b.dataset.del;
        saves.splice(idx, 1);
        saves = saves.filter(Boolean);
        localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
        openSaves();
      });
    });
  }

  function openHistory() {
    if (!state.history.length) { toast("尚无已读记录"); return; }
    var html = state.history.map(function (h) {
      return "<p>" + (h.who ? "<b style='color:#c8a15a;font-family:var(--kai)'>" + h.who + "　</b>" : "") + h.text + "</p>";
    }).join("");
    openModal("回想 · 已读", html);
    setTimeout(function () { var b = $("#modalBody"); b.scrollTop = b.scrollHeight; }, 30);
  }

  function openEndings() {
    var html = '<div class="endings-grid">';
    Object.keys(S.endings).forEach(function (k) {
      var e = S.endings[k], on = state.endings.indexOf(k) >= 0;
      html += '<div class="ending-card' + (on ? "" : " is-locked") + '">' +
        '<div><div class="ec-no">' + e.no + " · " + e.kind + "</div>" +
        '<div class="ec-title">' + (on ? e.title : "？？？？") + "</div>" +
        '<div class="ec-sub">' + (on ? e.sub : "尚未抵达") + "</div></div>" +
        '<div class="ec-kind">' + (on ? "已收录" : "未解锁") + "</div>" +
        (on ? '<div class="ec-seal">' + e.seal + "</div>" : "") +
        "</div>";
    });
    html += "</div>";
    html += '<p style="margin-top:18px;font-size:12px;color:#6f6455">结局三需在第二幕选择「请缨加入海外护展团」；结局四、五分别藏在第一幕与第三幕的分岔里。</p>';
    openModal("结局图鉴 · " + state.endings.length + " / " + Object.keys(S.endings).length, html);
  }

  function openAbout() {
    var html =
      "<p><b style='color:#e6d6b6'>这是一部怎样的作品</b><br>" +
      "《万里典守录》以第一人称视角重走 1933—1949 年故宫文物南迁之路。五次抉择决定你走上哪条线，五个结局各自封存一段史实。</p>" +
      "<p><b style='color:#e6d6b6'>操作</b><br>" +
      "点击正文推进；有抉择时点选项。空格 / 回车 = 继续，Esc = 关闭浮层。<br>" +
      "左侧文物随剧情解锁，点击可全屏鉴赏；右侧地图随行程推进，点「展开全图」看完整路线。</p>" +
      "<p><b style='color:#e6d6b6'>史料依据</b><br>" +
      S.sources.map(function (s) { return '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.name + "</a>"; }).join("<br>") +
      "</p>" +
      "<p style='font-size:12px;color:#6f6455'>说明：叙事文本依据剧本原稿整理；文物插图为手绘矢量示意，非文物照片；地图底图据 Natural Earth 1:110m 简化，路线为史实示意。</p>";
    openModal("史料与说明", html);
  }

  /* ---------------- 控制 ---------------- */
  $("#btnAuto").addEventListener("click", function () {
    autoMode = !autoMode;
    this.classList.toggle("is-on", autoMode);
    if (autoMode && !typing && !choiceVisible) advance();
    else clearTimeout(autoTimer);
  });
  $("#btnSkip").addEventListener("click", function () {
    if (typing) finishTyping();
    var n = node();
    if (state.line < n.lines.length) {
      while (state.line < n.lines.length) {
        addLine(n.lines[state.line], true);
        state.line++;
      }
      onLineDone();
    } else {
      advance();
    }
  });
  $("#btnReplay").addEventListener("click", backToChoice);
  $("#btnMenu").addEventListener("click", restart);
  $("#brand").addEventListener("click", openAbout);

  $$(".tbtn").forEach(function (b) {
    b.addEventListener("click", function () {
      var a = b.dataset.act;
      if (a === "history") openHistory();
      else if (a === "endings") openEndings();
      else if (a === "about") openAbout();
    });
  });

  /* 点击推进 */
  $("#stage").addEventListener("click", function (ev) {
    if (ev.target.closest(".choice") || ev.target.closest(".ending-card-big") || ev.target.closest(".controls")) return;
    advance();
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") { closeOverlay(); closeModal(); return; }
    if (!$("#overlay").hidden || !$("#modal").hidden) return;
    if (ev.key === " " || ev.key === "Enter" || ev.key === "ArrowRight") {
      if (ev.target.tagName === "BUTTON") return;
      ev.preventDefault();
      advance();
    }
    if (/^[1-9]$/.test(ev.key) && choiceVisible) {
      var btns = $$(".choice:not(.is-locked)");
      var b = btns[+ev.key - 1];
      if (b) b.click();
    }
  });

  /* 手机端切换 */
  $$("#mobileTabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      var tab = b.dataset.tab;
      $$("#mobileTabs button").forEach(function (x) { x.classList.toggle("is-on", x === b); });
      $("#relicPanel").classList.toggle("is-open", tab === "relics");
      $("#mapPanel").classList.toggle("is-open", tab === "map");
    });
  });

  /* ---------------- 开始 ---------------- */
  var auto = null;
  try { auto = JSON.parse(localStorage.getItem(AUTO_KEY) || "null"); } catch (e) { }
  if (auto && auto.node) {
    var cb = $("#btnContinue");
    cb.hidden = false;
    var nn = S.nodes[auto.node] || {};
    cb.textContent = "续上旧档 · " + (nn.time || "上一程");
    cb.addEventListener("click", function () {
      restore(auto);
      state.started = true;
      $("#curtain").classList.add("is-off");
      startNode(state.node);
    });
  }

  $("#btnStart").addEventListener("click", function () {
    state.started = true;
    state.node = S.start; state.line = 0; state.stage = 1;
    $("#curtain").classList.add("is-off");
    startNode(S.start);
  });

  /* 预渲染 */
  var ew = el("div", "stage-inner-inner");
  ew.id = "endingWrap"; ew.hidden = true;
  ew.style.cssText = "display:flex;justify-content:center;align-items:center;width:100%;padding:10px 0 30px";
  $("#dossier").parentNode.insertBefore(ew, $("#dossier")); 
  renderRelics();
  renderMap();
  renderActNav();
})();

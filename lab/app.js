/* 纸间寻迹 V4.0 — 四种不同的档案修复互动；全部病害与修复均为数字模拟。 */
const DPM = 'https://img.dpm.org.cn/static/image/move_south/';
const SOURCE = 'https://www.dpm.org.cn/topic/move_south/keeping.html';
const cases = [
  {
    id: 'tear', number: '01', short: '驻沪办事处点验存沪文物规则草案',
    title: '国立北平故宫博物院驻沪办事处点验存沪文物规则草案',
    image: DPM + 's6195f899c21af.jpg', source: SOURCE,
    type: '模拟病害 · 局部撕裂', method: '补裂',
    intro: '在数字副本的空白边缘叠加一处模拟裂口。体验裂口对位、薄纸条加固与排实整理。',
    diagnosis: '局部撕裂 / 裂口', diagnosisOptions: ['局部撕裂 / 裂口', '边角残缺', '密集虫蛀孔洞'],
    diagnosisWhy: '模拟病害呈线状开裂，档案主体仍完整，适合评估后进行局部补裂。',
    tests: [
      ['破损形态', '数字模拟：一处线状裂口，位于无字迹的边缘区域。'],
      ['整体状况', '数字模拟：档案主体可辨识，破损集中于局部；不据此推断原件强度。'],
      ['字迹与材料', '真实档案需先检查字迹稳定性、纸张厚度与纤维特征；本体验不虚构检测数值。']
    ],
    planOptions: ['补裂', '补缺', '整体托裱'],
    planWhy: 'DA/T 25—2022 第8.1.3条：对齐撕裂、断裂处后刷浆，粘贴合适宽度的纸条（以薄皮纸为佳），垫纸排实。',
    materialPrompt: '补裂纸条应薄、柔韧，且与档案纸张特征相适应。请选择合适的模拟材料。',
    materials: [
      { id: 'thin-strip', label: '薄而柔韧的皮纸条', desc: '适合局部补裂与加固', icon: '▱', correct: true },
      { id: 'card', label: '厚硬卡纸', desc: '厚度与柔韧性不适宜', icon: '▤', correct: false },
      { id: 'tape', label: '透明塑料胶带', desc: '不作为本任务的修复材料', icon: '▥', correct: false }
    ],
    steps: [
      { id: 'strip', title: '裂口对位 · 放置薄纸条', tool: '薄皮纸条', icon: '▱', kind: 'drop', instruction: '拿起薄皮纸条，拖到左侧裂口上。松开后，纸条会吸附到模拟裂口位置。', hint: '目标是线状裂口，不需要涂满周围纸面。' },
      { id: 'paste', title: '局部施浆 · 沿纸条刷浆', tool: '小号排笔', icon: '🖌', kind: 'swipe', instruction: '先拿起小号排笔，再沿着已放置的纸条做一次短距离刷浆操作。', hint: '刷浆轨迹应沿纸条走向，偏离裂口的操作不会计入。' },
      { id: 'press', title: '排实整理 · 轻压加固处', tool: '棕刷', icon: '🪶', kind: 'swipe', instruction: '拿起棕刷，沿补裂纸条轻轻排实一次，完成后检查操作。', hint: '这是沿线轻压整理，不是大面积涂抹。' }
    ],
    targetPath: [[9, 56], [11, 58], [9.5, 61], [12, 63], [11, 66], [13, 70]],
    targetCenter: [11, 63], targetRadius: 12,
    damage: `<path d="M9 56 L11 58 L9.5 61 L12 63 L11 66 L13 70" fill="none" stroke="#755d48" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 56 L11 58 L9.5 61 L12 63 L11 66 L13 70" fill="none" stroke="#fff7e9" stroke-width=".28" stroke-linecap="round"/>`,
    quality: ['补裂纸条已对准模拟裂口', '施浆轨迹沿补裂纸条分布', '排实整理范围局限于补裂处', '未对原有文字、印章区域增加干预']
  },
  {
    id: 'loss', number: '02', short: '驻沪办事处点收存沪文物箱件总报告',
    title: '国立北平故宫博物院驻沪办事处奉谕点收存沪文物箱件总报告',
    image: DPM + 's6195f9200247b.jpg', source: SOURCE,
    type: '模拟病害 · 边角残缺', method: '补缺',
    intro: '在数字副本的右上角空白边缘叠加一处模拟缺角。比较补纸色样，再把独立补纸片拖到缺损位置。',
    diagnosis: '局部残缺 / 缺角', diagnosisOptions: ['局部残缺 / 缺角', '局部撕裂 / 裂口', '纸张絮化'],
    diagnosisWhy: '模拟病害表现为纸张边缘局部缺失。补缺材料应考虑厚度、颜色、质地、强度和纤维方向。',
    tests: [
      ['缺损位置', '数字模拟：缺损位于右上角空白边缘，未覆盖可辨识文字。'],
      ['纸张特征', '补纸选择需综合比较原纸的厚度、颜色、质地、强度与纤维方向。'],
      ['干预范围', '局部缺损优先评估局部补缺，不因一处缺角直接采用整体托裱。']
    ],
    planOptions: ['补裂', '补缺', '整体托裱'],
    planWhy: 'DA/T 25—2022 第8.1.2.1条：补纸应考虑档案纸张纤维方向；残缺处有字迹时应慎重处理。',
    materialPrompt: '比较色样时请注意：屏幕颜色只是视觉参考，真实修复还需比较厚度、质地、强度与纤维方向。',
    materials: [
      { id: 'pale', label: '色卡 A · 偏浅', desc: '色差较明显', color: '#e8e1cf', correct: false },
      { id: 'warm', label: '色卡 B · 自然暖褐', desc: '本关卡模拟参考色', color: '#d7c49d', correct: true },
      { id: 'dark', label: '色卡 C · 偏深', desc: '色差较明显', color: '#b89c70', correct: false }
    ],
    steps: [
      { id: 'patch', title: '补纸拼合 · 拖放缺角补纸', tool: '缺角补纸片', icon: '◢', kind: 'drop', instruction: '拿起独立的补纸片，拖到右上角缺损处。补纸会按缺角轮廓吸附，不会整块覆盖档案。', hint: '补纸应只覆盖缺损及必要搭接范围，不遮挡文字和印章。' },
      { id: 'press', title: '垫纸排实 · 轻压补纸边缘', tool: '压纸板', icon: '▤', kind: 'drop', instruction: '拿起压纸板，拖到补纸片上方，完成一次局部排实。', hint: '补纸片放置正确后才可以进行排实。' }
    ],
    targetCenter: [94, 8], targetRadius: 14,
    damage: `<path d="M88 0 L100 0 L100 15 L95 11 L92 7 Z" fill="#f3ead7" stroke="#8e795c" stroke-width=".8" stroke-dasharray="1.3 1"/><path d="M88 0 L92 7 L95 11 L100 15" fill="none" stroke="#8e795c" stroke-width=".7"/>`,
    quality: ['补纸色样选择符合本关卡设定', '补纸片已准确放入缺角位置', '补纸边缘已完成局部排实', '补纸未覆盖原有文字或印章']
  },
  {
    id: 'holes', number: '03', short: '欧阳道达呈马衡院长文',
    title: '欧阳道达呈马衡院长文',
    image: DPM + 's6195fa81117a8.jpg', source: SOURCE,
    type: '模拟病害 · 密集虫蛀孔洞', method: '纸浆补洞',
    intro: '在数字副本左侧空白处叠加七个固定模拟孔洞。使用滴管逐孔填补，再用吸水纸完成定形。',
    diagnosis: '密集虫蛀孔洞', diagnosisOptions: ['局部撕裂', '密集虫蛀孔洞', '边角残缺'],
    diagnosisWhy: '模拟病害为多处较密集的小孔。虫洞处理方式应视孔洞大小和疏密程度选择，纸浆补洞只是可选方法之一。',
    tests: [
      ['孔洞分布', '数字模拟：七个小孔集中于无字迹的边缘空白区。'],
      ['字迹与水敏性', '真实档案须先检查字迹遇水是否洇化、扩散；本体验不对历史原件作此判断。'],
      ['处理方式', 'DA/T 25—2022 第8.1.2.1条提及，虫洞可视大小和疏密采用局部整补或纸浆补洞。']
    ],
    planOptions: ['纸浆补洞', '补裂', '整体托裱'],
    planWhy: 'DA/T 25—2022 第8.1.2.1条：纸浆补洞可用滴管或设备将纸浆注入虫洞，使纸纤维与孔洞边缘搭接。',
    materialPrompt: '选择与档案纸张纤维原料相同或相近的模拟纸浆。普通胶水不能代替纸浆。',
    materials: [
      { id: 'pulp', label: '同类纤维纸浆', desc: '适合本关卡的模拟材料', icon: '◌', correct: true },
      { id: 'glue', label: '普通胶水', desc: '不能替代纸浆纤维', icon: '▰', correct: false },
      { id: 'sheet', label: '整块厚纸片', desc: '不适合逐孔填补', icon: '▤', correct: false }
    ],
    steps: [
      { id: 'pipette', title: '纸浆补洞 · 逐个填补孔洞', tool: '纸浆滴管', icon: '💧', kind: 'point', instruction: '拿起纸浆滴管，逐个点击左侧空白区的七个小孔。点击孔洞附近即可识别，不要求精确点中中心。', hint: '每个孔洞单独计数；已完成的孔洞会出现纤维填补效果。' },
      { id: 'blotter', title: '吸水定形 · 覆盖孔洞区域', tool: '吸水纸', icon: '▤', kind: 'drop', instruction: '七个孔洞全部填补后，拿起吸水纸并拖到孔洞区域，完成吸水与定形。', hint: '这一步是覆盖和轻压，不需要继续涂抹。' }
    ],
    holes: [[6.4, 65.4], [9.7, 70.4], [5.6, 74.6], [11, 78.8], [7.7, 83.5], [12.8, 68.1], [13.6, 76.2]],
    targetCenter: [10, 75], targetRadius: 17,
    damage: `<g fill="#554637" opacity=".9">${[[6.4,65.4],[9.7,70.4],[5.6,74.6],[11,78.8],[7.7,83.5],[12.8,68.1],[13.6,76.2]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i%3===0?1.25:1}"/>`).join('')}</g>`,
    quality: ['纸浆材料选择符合本关卡设定', '七个模拟孔洞均已逐个填补', '填补范围与模拟孔洞位置一致', '吸水纸已完成覆盖与定形']
  },
  {
    id: 'weak', number: '04', short: '蔡元培致马衡函',
    title: '故宫博物院理事会理事长蔡元培致马衡函',
    image: DPM + 's6195f95e2a30c.jpg', source: SOURCE,
    type: '模拟病害 · 局部絮化与脆弱', method: '局部加固',
    intro: '在数字副本边缘叠加局部絮化模拟效果。翻至背面操作示意，按纤维方向放置薄韧加固纸。',
    diagnosis: '局部絮化 / 纸张脆弱', diagnosisOptions: ['局部絮化 / 纸张脆弱', '边角残缺', '密集虫蛀孔洞'],
    diagnosisWhy: '模拟病害集中于局部边缘。局部脆弱时，应评估局部加固是否足够，不应因局部病害直接选择整体托裱。',
    tests: [
      ['脆弱范围', '数字模拟：局部边缘纤维松散，非整体强度丧失。'],
      ['处理位置', '局部加固应在档案背面进行，尽量避免影响正面信息。'],
      ['修复目标', '使用薄而柔韧的纸张对局部进行支撑，控制干预范围。']
    ],
    planOptions: ['整体托裱', '局部加固', '纸浆补洞'],
    planWhy: 'DA/T 25—2022 第8.1.4条：档案局部絮化、糟朽时，可选择韧性较好的薄纸在背面进行局部加固。',
    materialPrompt: '局部加固用纸应尽可能薄、软、柔韧。选择后请翻至背面操作示意。',
    materials: [
      { id: 'tissue', label: '薄而柔韧的加固纸', desc: '适合局部背面加固', icon: '▤', correct: true },
      { id: 'board', label: '厚硬纸板', desc: '过厚、过硬', icon: '▰', correct: false },
      { id: 'film', label: '透明塑料膜', desc: '不作为本关卡加固纸', icon: '▱', correct: false }
    ],
    steps: [
      { id: 'support', title: '背面加固 · 对齐纤维方向', tool: '薄韧加固纸', icon: '▤', kind: 'drop', instruction: '先切换到背面操作示意，再把加固纸拖到右侧脆弱区域。点击“旋转纸张”调整纤维方向后再放置。', hint: '背面画面是操作示意，并非故宫原件背面影像。纤维方向需与原纸相适应。' },
      { id: 'paste', title: '局部施浆 · 轻刷加固边缘', tool: '细排笔', icon: '🖌', kind: 'swipe', instruction: '拿起细排笔，沿加固纸边缘做一次短距离施浆操作。', hint: '只在局部加固区域轻刷，不扩大到整张档案。' },
      { id: 'blotter', title: '吸水压平 · 完成局部定形', tool: '吸水纸', icon: '▤', kind: 'drop', instruction: '将吸水纸拖到加固区域，模拟垫纸、轻压与干燥前的整理。', hint: '吸水纸覆盖的是局部加固区，不是整页托裱。' }
    ],
    targetPath: [[94, 13.5], [90.8, 18.5], [93.3, 23.1], [90, 28.1], [93.3, 33.1], [90.5, 38.1], [93.6, 42.7], [95.1, 53.5]],
    targetCenter: [93, 33], targetRadius: 15,
    damage: `<path d="M93.6 13.5 Q90.8 18.5 93.3 23.1 Q90 28.1 93.3 33.1 Q90.5 38.1 93.6 42.7 L95.1 53.5 L98 53.5 L98 13.5Z" fill="#b79e78" opacity=".55"/><path d="M93.6 13.5 Q90.8 18.5 93.3 23.1 Q90 28.1 93.3 33.1 Q90.5 38.1 93.6 42.7 L95.1 53.5" fill="none" stroke="#927b5d" stroke-width=".8" stroke-dasharray="1.2 1.2"/>`,
    quality: ['已切换至背面操作示意', '加固纸已放置于局部脆弱区域', '纤维方向已调整至匹配位置', '施浆与吸水定形范围局限于加固区']
  }
];

const stages = ['保存状况调查', '检测与记录', '修复方案', '实施修复', '质量检查', '修复记录'];
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const STORAGE_KEY = 'paperTrailArchiveV4';
const legacyStorageKey = 'paperTrailArchiveV3';
let state = null;
let toolPointer = null;
let imageGesture = null;
let toastTimer = null;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
function createState(item) {
  return {
    current: item, stage: 0, diagnosis: null, diagnosisFeedback: null,
    plan: null, planFeedback: null, materialChoice: null, materialCorrect: false,
    materialConfirmed: false, materialFeedback: null, repairStep: 0, activeTool: null,
    actions: { stripPlaced: false, pasteApplied: false, stripPressed: false, patchPlaced: false, patchPressed: false, blotterPlaced: false, supportPlaced: false, fiberAligned: false, backSideUsed: false, dried: false },
    filledHoles: new Set(), showDamage: true, showBack: false, zoom: 1, rotation: 90,
    offTarget: 0, qualityResult: null, savedRecord: null, recordSaved: false,
    startedAt: new Date().toISOString(), feedback: null
  };
}
function readRecords() {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const legacy = JSON.parse(localStorage.getItem(legacyStorageKey) || '[]');
    return [...current, ...legacy.map(record => ({ ...record, version: 'V3 历史记录' }))];
  } catch { return []; }
}
function writeRecords(records) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); return true; }
  catch { toast('浏览器存储空间不足，本次记录未能保存。'); return false; }
}
function toast(message) {
  const node = $('#toast');
  if (!node) return;
  node.textContent = message; node.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => node.classList.remove('show'), 2800);
}
function showModal(title, body, actions = '') {
  $('#modalTitle').textContent = title; $('#modalBody').innerHTML = body; $('#modalActions').innerHTML = actions;
  $('#modal').hidden = false; $('#modal').setAttribute('aria-hidden', 'false'); document.body.classList.add('modal-open');
}
function closeModal() {
  $('#modal').hidden = true; $('#modal').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open'); $('#modalBody').innerHTML = ''; $('#modalActions').innerHTML = '';
}
function showMessage(title, message, buttonLabel = '返回继续操作') {
  showModal(title, `<div class="modal-message"><span class="modal-check">!</span><p>${message}</p></div>`, `<button class="primary-button" id="modalContinue">${buttonLabel}</button>`);
  $('#modalContinue').addEventListener('click', closeModal);
}
function setFeedback(kind, message) {
  state.feedback = { kind, message };
  const node = $('#repairFeedback');
  if (node) { node.className = `inline-feedback ${kind}`; node.textContent = message; }
}
function renderCards() {
  $('#caseGrid').innerHTML = cases.map(item => `
    <article class="case-card" tabindex="0" role="button" data-case="${item.id}" aria-label="开始${escapeHtml(item.short)}修复任务">
      <div class="case-image"><img src="${item.image}" alt="${escapeHtml(item.short)}历史档案影像" loading="lazy"><span class="case-number">CASE ${item.number}</span></div>
      <div class="case-body"><div class="case-type">${escapeHtml(item.type)}</div><h3>${escapeHtml(item.short)}</h3><p class="case-desc">${escapeHtml(item.intro)}</p><div class="case-footer"><span>核心操作：${escapeHtml(item.method)}</span><span>↗</span></div></div>
    </article>`).join('');
  $$('.case-card').forEach(card => {
    card.addEventListener('click', () => startCase(card.dataset.case));
    card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); startCase(card.dataset.case); } });
  });
}
function startCase(id) {
  const item = cases.find(entry => entry.id === id); if (!item) return;
  state = createState(item); $('#workspace').hidden = false; document.body.classList.add('in-workspace');
  $('#workspaceCaseName').textContent = item.short; $('#documentTitle').textContent = item.short;
  const image = $('#documentImage');
  image.onload = () => { $('#imageFallback').hidden = true; positionOverlays(); renderImage(); };
  image.onerror = () => { $('#imageFallback').hidden = false; positionOverlays(); };
  image.src = item.image; $('#imageCaption').textContent = attribution(item);
  $('#imageSource').href = item.source; $('#imageSource').textContent = '查看故宫原始资料 ↗';
  $('#imageFallback').hidden = true; renderStage();
  $('#workspace').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function attribution(item) {
  return `图像来源：故宫博物院《文物南迁》专题“典守与保管”，展品“${item.title}”。模拟病害不代表原件实际状况。`;
}
function backToCases() {
  $('#workspace').hidden = true; document.body.classList.remove('in-workspace');
  $('#cases').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function positionOverlays() {
  const inner = $('#imageInner'), image = $('#documentImage'); if (!inner) return;
  const boxW = inner.clientWidth, boxH = inner.clientHeight;
  let width = boxW, height = boxH;
  if (image?.naturalWidth && image?.naturalHeight) {
    const scale = Math.min(boxW / image.naturalWidth, boxH / image.naturalHeight);
    width = image.naturalWidth * scale; height = image.naturalHeight * scale;
  }
  const left = (boxW - width) / 2, top = (boxH - height) / 2;
  ['#damageSvg', '#repairSvg', '#backSchematic'].forEach(selector => {
    const node = $(selector); if (!node) return;
    node.style.left = `${left}px`; node.style.top = `${top}px`;
    node.style.right = 'auto'; node.style.bottom = 'auto';
    node.style.width = `${width}px`; node.style.height = `${height}px`;
  });
}
function renderProgress() {
  const pct = state.stage === 0 ? 12 : state.stage === 1 ? 26 : state.stage === 2 ? 40 : state.stage === 3 ? 44 + Math.round((state.repairStep / state.current.steps.length) * 40) : state.stage === 4 ? 90 : 100;
  $('#stageLabel').textContent = `0${state.stage + 1} / 06 · ${stages[state.stage]}`;
  $('#progressPercent').textContent = `${pct}%`; $('#progressBar').style.width = `${pct}%`;
  $('#stepLabels').innerHTML = stages.map((label, index) => `<span class="${index === state.stage ? 'active' : index < state.stage ? 'done' : ''}">${index + 1}. ${label}</span>`).join('');
  $('#taskCounter').textContent = `TASK ${state.current.number}`;
}
function damageMarkup(item) { return item.damage; }
function backMarkup() {
  return `<rect x="7" y="6" width="86" height="88" rx="1" fill="#f2ead9" stroke="#c9bda6" stroke-width=".8"/>
    <path d="M12 12 H88 M12 88 H88" stroke="#ded3be" stroke-width=".5"/>
    ${Array.from({ length: 9 }, (_, index) => `<path d="M${15 + index * 8} 16 V84" stroke="#cfc2aa" stroke-width=".38" opacity=".7"/>`).join('')}
    <path d="M93.6 13.5 Q90.8 18.5 93.3 23.1 Q90 28.1 93.3 33.1 Q90.5 38.1 93.6 42.7 L95.1 53.5" fill="none" stroke="#8c7557" stroke-width="1.4" stroke-dasharray="1.5 1"/>
    <rect x="87" y="11" width="10" height="45" fill="rgba(181,158,120,.22)" stroke="#8f7b5d" stroke-dasharray="1.4 1" stroke-width=".7"/>
    <path d="M92 17 V49 M90.5 20 L92 17 L93.5 20" stroke="#6f8a73" stroke-width=".8" fill="none"/>
    <text x="50" y="96" text-anchor="middle" font-size="2.7" fill="#7c806f">背面操作示意 · 非原件背面影像</text>`;
}
function repairMarkup() {
  const item = state.current, a = state.actions; let markup = '';
  if (item.id === 'tear') {
    if (a.stripPlaced) markup += `<path d="M9 56 L11 58 L9.5 61 L12 63 L11 66 L13 70" fill="none" stroke="#d9c7a4" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 56 L11 58 L9.5 61 L12 63 L11 66 L13 70" fill="none" stroke="#9c825a" stroke-width=".35" stroke-dasharray=".8 .7"/>`;
    if (a.pasteApplied) markup += `<path d="M9 56 L11 58 L9.5 61 L12 63 L11 66 L13 70" fill="none" stroke="#b58a50" stroke-width=".8" stroke-linecap="round" opacity=".9"/>`;
    if (a.stripPressed) markup += `<path d="M9 56 L11 58 L9.5 61 L12 63 L11 66 L13 70" fill="none" stroke="#f5ecd9" stroke-width=".45" stroke-linecap="round"/>`;
  }
  if (item.id === 'loss') {
    if (a.patchPlaced) markup += `<path d="M88 0 L100 0 L100 15 L95 11 L92 7 Z" fill="#d7c49d" stroke="#a88e65" stroke-width=".7"/><path d="M88 0 L92 7 L95 11 L100 15" fill="none" stroke="#a88e65" stroke-width=".55"/>`;
    if (a.patchPressed) markup += `<path d="M89 1 L99 1 M94 3 L99 8 M97 12 L99 14" stroke="#8f7958" stroke-width=".5" opacity=".7"/>`;
  }
  if (item.id === 'holes') {
    item.holes.forEach(([x, y], index) => {
      if (state.filledHoles.has(index)) markup += `<circle class="hole-filled" cx="${x}" cy="${y}" r="1.35" fill="#d7c49d" stroke="#9f8965" stroke-width=".35"/><circle cx="${x}" cy="${y}" r=".55" fill="#efe5cf"/>`;
    });
    if (a.blotterPlaced) markup += `<rect x="3" y="63" width="14" height="25" rx="1" fill="rgba(239,236,224,.48)" stroke="#aeb5a8" stroke-width=".65" stroke-dasharray="1.4 1"/><path d="M5 67 H15 M5 72 H15 M5 77 H15 M5 82 H15" stroke="#c3c6b9" stroke-width=".35"/>`;
  }
  if (item.id === 'weak') {
    if (a.supportPlaced) markup += `<path d="M91.6 13.5 Q88.8 18.5 91.3 23.1 Q88 28.1 91.3 33.1 Q88.5 38.1 91.6 42.7 L93.1 53.5 L97 53.5 L97 13.5Z" fill="#e2d4b8" stroke="#a58e6b" stroke-width=".7"/><path d="M93 17 V49 M91.5 20 L93 17 L94.5 20" stroke="#9b8768" stroke-width=".55" fill="none"/>`;
    if (a.pasteApplied) markup += `<path d="M91.6 13.5 Q88.8 18.5 91.3 23.1 Q88 28.1 91.3 33.1 Q88.5 38.1 91.6 42.7 L93.1 53.5" fill="none" stroke="#b58a50" stroke-width=".7"/>`;
    if (a.dried) markup += `<rect x="87" y="11" width="10" height="45" rx="1" fill="rgba(240,237,225,.35)" stroke="#aeb5a8" stroke-width=".55" stroke-dasharray="1.2 1"/>`;
  }
  return markup;
}
function renderImage() {
  if (!state) return;
  const item = state.current;
  $('#damageSvg').innerHTML = damageMarkup(item);
  $('#damageSvg').style.display = state.showDamage && !state.showBack ? 'block' : 'none';
  $('#repairSvg').innerHTML = repairMarkup();
  $('#repairSvg').style.display = state.stage >= 3 && state.repairStep > 0 ? 'block' : 'none';
  $('#repairSvg').style.pointerEvents = state.stage === 3 && state.repairStep > 0 ? 'auto' : 'none';
  $('#backSchematic').innerHTML = backMarkup();
  $('#backSchematic').style.display = state.showBack ? 'block' : 'none';
  $('#documentImage').style.opacity = state.showBack ? '0' : '1';
  $('#imageSideLabel').textContent = state.showBack ? '背面操作示意 · 非原件影像' : '历史影像 · 数字副本';
  $('#imageInner').style.transform = `scale(${state.zoom})`;
  $('#zoomValue').textContent = `${Math.round(state.zoom * 100)}%`;
  $('#toggleDamage').textContent = state.showDamage ? '隐藏模拟病害' : '显示模拟病害';
  $('#toggleDamage').disabled = state.showBack;
  $('#toggleDamage').title = state.showBack ? '当前显示背面操作示意，不显示正面模拟病害' : '切换正面数字副本上的模拟病害图层';
  $('#imageCaption').textContent = attribution(item);
  positionOverlays();
}
function renderStage() {
  if (!state) return;
  renderProgress(); renderImage();
  if (state.stage === 0) renderSurvey();
  if (state.stage === 1) renderTests();
  if (state.stage === 2) renderPlan();
  if (state.stage === 3) renderRepair();
  if (state.stage === 4) renderQuality();
  if (state.stage === 5) renderReport();
}
function shell(title, description, body, buttons = '') {
  $('#taskContent').innerHTML = `<h2 class="task-title">${title}</h2><p class="task-intro">${description}</p>${body}${buttons}`;
}
function renderSurvey() {
  const item = state.current;
  const options = item.diagnosisOptions.map(option => `<button class="option ${state.diagnosis === option ? 'selected' : ''}" data-diagnosis="${escapeHtml(option)}"><span class="option-mark">${state.diagnosis === option ? '✓' : ''}</span><span>${escapeHtml(option)}</span></button>`).join('');
  const feedback = state.diagnosisFeedback ? `<div class="inline-feedback ${state.diagnosisFeedback.kind}">${escapeHtml(state.diagnosisFeedback.message)}</div>` : '';
  shell('第一步：保存状况调查', '先观察左侧历史影像，再判断数字副本中叠加的模拟病害。请留意破损形态、位置与范围。',
    `<div class="task-block"><h4>观察重点</h4><div class="result-card"><strong>不要把模拟病害当作原件事实</strong><p>历史影像来自故宫博物院；破损标记由网页额外叠加，只用于体验不同修复方法。</p></div><h4>请选择病害类型</h4><div class="option-list">${options}</div>${feedback}</div>`,
    `<div class="button-row"><button class="primary-button" id="checkDiagnosis" ${state.diagnosis ? '' : 'disabled'}>${state.diagnosisFeedback?.kind === 'success' ? '确认判断，进入检测 →' : '提交判断'}</button></div><p class="mini-note">本环节为数字模拟观察，不对故宫历史原件进行破损等级评定。</p>`);
  $$('[data-diagnosis]').forEach(button => button.addEventListener('click', () => { state.diagnosis = button.dataset.diagnosis; state.diagnosisFeedback = null; renderSurvey(); }));
  $('#checkDiagnosis').addEventListener('click', () => {
    if (state.diagnosisFeedback?.kind === 'success') { state.stage = 1; renderStage(); return; }
    state.diagnosisFeedback = state.diagnosis === item.diagnosis
      ? { kind: 'success', message: `判断正确。${item.diagnosisWhy}` }
      : { kind: 'warning', message: '判断不准确。请重新观察破损的形态、分布位置和范围。' };
    renderSurvey();
  });
}
function renderTests() {
  const item = state.current;
  const rows = item.tests.map(([heading, detail]) => `<div class="result-card"><strong>${escapeHtml(heading)}</strong><p>${escapeHtml(detail)}</p></div>`).join('');
  shell('第二步：检测与修复前记录', '真实修复不能只凭图片判断。应记录档案整体及局部状况，并根据需要检测纸张与字迹材料。以下是本关卡预设的模拟情境。',
    `<div class="task-block"><h4>模拟检测记录</h4>${rows}<div class="feedback">本页面不提供虚构的 pH、纸张厚度、纤维强度或字迹水敏性数据；真实检测应由专业人员完成。</div></div>`,
    `<div class="button-row"><button class="secondary-button" id="backStage">← 返回调查</button><button class="primary-button" id="nextStage">确认记录，制定方案 →</button></div>`);
  $('#backStage').addEventListener('click', () => { state.stage = 0; renderStage(); });
  $('#nextStage').addEventListener('click', () => { state.stage = 2; renderStage(); });
}
function renderPlan() {
  const item = state.current;
  const options = item.planOptions.map(option => `<button class="option ${state.plan === option ? 'selected' : ''}" data-plan="${escapeHtml(option)}"><span class="option-mark">${state.plan === option ? '✓' : ''}</span><span>${escapeHtml(option)}</span></button>`).join('');
  const feedback = state.planFeedback ? `<div class="inline-feedback ${state.planFeedback.kind}">${escapeHtml(state.planFeedback.message)}</div>` : '';
  shell('第三步：制定修复方案', '根据病害类型、整体状况、纸张特征及字迹情况，选择适宜的处理方式。优先考虑局部、适宜和必要的干预。',
    `<div class="task-block"><h4>请选择主要修复方法</h4><div class="option-list">${options}</div>${feedback}<div class="result-card"><strong>方案判断依据</strong><p>${escapeHtml(item.planWhy)}</p></div></div>`,
    `<div class="button-row"><button class="secondary-button" id="backStage">← 返回检测</button><button class="primary-button" id="checkPlan" ${state.plan ? '' : 'disabled'}>${state.planFeedback?.kind === 'success' ? '进入材料选择 →' : '确认修复方案'}</button></div>`);
  $$('[data-plan]').forEach(button => button.addEventListener('click', () => { state.plan = button.dataset.plan; state.planFeedback = null; renderPlan(); }));
  $('#backStage').addEventListener('click', () => { state.stage = 1; renderStage(); });
  $('#checkPlan').addEventListener('click', () => {
    if (state.planFeedback?.kind === 'success') { state.stage = 3; state.repairStep = 0; renderStage(); return; }
    state.planFeedback = state.plan === item.method
      ? { kind: 'success', message: `方案选择正确。${item.planWhy}` }
      : { kind: 'warning', message: `该方案与本关卡模拟病害不匹配。${item.planWhy}` };
    renderPlan();
  });
}
function materialCard(material, selected, isLoss) {
  const sample = material.color ? `<span class="swatch" style="--swatch:${material.color}"></span>` : `<span class="material-symbol">${material.icon || '▤'}</span>`;
  return `<button type="button" class="material-choice ${selected ? 'selected' : ''}" data-material="${material.id}" ${isLoss ? 'draggable="true"' : ''}>${sample}<strong>${escapeHtml(material.label)}</strong><small>${escapeHtml(material.desc)}</small></button>`;
}
function selectMaterial(id) {
  const item = state.current, material = item.materials.find(entry => entry.id === id);
  if (!material) return;
  state.materialChoice = material.id; state.materialCorrect = material.correct;
  state.materialFeedback = material.correct
    ? { kind: 'success', message: '材料选择正确。请记住：本页面的材料判断是简化情境，不等同于真实材料检测。' }
    : { kind: 'warning', message: '这个材料不适合本关卡的模拟处理要求。请比较厚度、质地、用途和纤维特征后重新选择。' };
  state.materialConfirmed = false; renderMaterials();
}
function renderMaterials() {
  const item = state.current;
  const cards = item.materials.map(material => materialCard(material, state.materialChoice === material.id, item.id === 'loss')).join('');
  const selected = item.materials.find(material => material.id === state.materialChoice);
  const compare = item.id === 'loss' ? `<div class="material-compare"><div class="material-reference"><span class="swatch" style="--swatch:#d7c49d"></span><strong>模拟原纸参考色</strong></div><div class="material-drop-zone" id="materialCompareDrop">${selected ? `<span class="swatch" style="--swatch:${selected.color}"></span><div><strong>${escapeHtml(selected.label)}</strong><small>${escapeHtml(selected.desc)}</small></div>` : '<span class="compare-arrow">↓</span><strong>将色卡拖到这里比较</strong>'}</div></div>` : '';
  const feedback = state.materialFeedback ? `<div class="inline-feedback ${state.materialFeedback.kind}">${escapeHtml(state.materialFeedback.message)}</div>` : '';
  shell('第四步：实施修复 · 材料准备', item.materialPrompt,
    `<div class="task-block"><h4>选择本次修复材料</h4><div class="material-grid ${item.id === 'loss' ? 'swatch-grid' : ''}">${cards}</div>${compare}${feedback}<div class="feedback">屏幕材料卡仅用于识别材料概念，不代表真实纸张检测。真实材料须结合纸张厚度、纤维方向、柔韧性、强度与字迹情况选择。</div></div>`,
    `<div class="button-row"><button class="secondary-button" id="backStage">← 返回方案</button><button class="primary-button" id="confirmMaterial" ${state.materialChoice ? '' : 'disabled'}>${state.materialConfirmed ? '开始实际操作 →' : '确认材料'}</button></div>`);
  $$('[data-material]').forEach(button => {
    button.addEventListener('click', () => selectMaterial(button.dataset.material));
    if (item.id === 'loss') button.addEventListener('dragstart', event => {
      const material = item.materials.find(entry => entry.id === button.dataset.material);
      event.dataTransfer.setData('text/plain', material.id); event.dataTransfer.effectAllowed = 'copy';
      const preview = document.createElement('div'); preview.className = 'material-drag-preview';
      preview.innerHTML = `<span style="background:${material.color}"></span><strong>${escapeHtml(material.label)}</strong>`;
      document.body.appendChild(preview); event.dataTransfer.setDragImage(preview, 72, 28); setTimeout(() => preview.remove(), 0);
    });
  });
  const compareDrop = $('#materialCompareDrop');
  if (compareDrop) {
    compareDrop.addEventListener('dragover', event => { event.preventDefault(); compareDrop.classList.add('drag-over'); });
    compareDrop.addEventListener('dragleave', () => compareDrop.classList.remove('drag-over'));
    compareDrop.addEventListener('drop', event => { event.preventDefault(); compareDrop.classList.remove('drag-over'); selectMaterial(event.dataTransfer.getData('text/plain')); });
  }
  $('#backStage').addEventListener('click', () => { state.stage = 2; renderStage(); });
  $('#confirmMaterial').addEventListener('click', () => {
    if (!state.materialCorrect) { setFeedback('warning', '请先选择符合本关卡要求的材料。'); return; }
    state.materialConfirmed = true; state.repairStep = 1; state.activeTool = null; state.feedback = { kind: 'success', message: '材料已确认。现在开始本份档案专属的修复操作。' }; renderStage();
  });
}
function currentStep() { return state.current.steps[state.repairStep - 1]; }
function isStepDone() {
  const item = state.current, step = currentStep(), a = state.actions;
  if (!step) return false;
  if (item.id === 'tear') return step.id === 'strip' ? a.stripPlaced : step.id === 'paste' ? a.pasteApplied : a.stripPressed;
  if (item.id === 'loss') return step.id === 'patch' ? a.patchPlaced : a.patchPressed;
  if (item.id === 'holes') return step.id === 'pipette' ? state.filledHoles.size === 7 : a.blotterPlaced;
  if (item.id === 'weak') return step.id === 'support' ? a.supportPlaced : step.id === 'paste' ? a.pasteApplied : a.dried;
  return false;
}
function stepProgress() {
  const item = state.current, step = currentStep();
  if (item.id === 'holes' && step?.id === 'pipette') return Math.round(state.filledHoles.size / 7 * 100);
  return isStepDone() ? 100 : 0;
}
function toolDescription(step) {
  if (step.kind === 'swipe') return '点击工具卡拿起工具，再在影像上按住鼠标沿目标线拖动一次。';
  if (step.kind === 'point') return '点击工具卡拿起滴管，再逐个点击影像中的固定孔洞。';
  return '把工具卡拖到影像目标区域；也可以点击工具卡拿起后，在影像上拖动工具。';
}
function renderRepair() {
  const item = state.current;
  if (state.repairStep === 0) { renderMaterials(); return; }
  const step = currentStep(), done = isStepDone(), pct = stepProgress();
  const count = item.id === 'holes' && step.id === 'pipette' ? `<div class="hole-count">孔洞填补进度：<strong>${state.filledHoles.size}/7</strong><span class="hole-mini-dots">${item.holes.map((_, index) => `<i class="${state.filledHoles.has(index) ? 'filled' : ''}"></i>`).join('')}</span></div>` : '';
  const flip = item.id === 'weak' && step.id === 'support' ? `<button class="secondary-button flip-button" id="flipBack">${state.showBack ? '已显示背面示意 · 返回正面' : '翻至背面操作示意 →'}</button><div class="mini-note">背面示意为网页绘制的操作图，不是历史档案原件的背面照片。</div>` : '';
  const rotation = item.id === 'weak' && step.id === 'support' ? `<div class="orientation-preview"><div class="orientation-paper" style="--fiber-angle:${state.rotation}deg"><span>纤维方向</span><i></i></div><div class="orientation-copy"><strong>${state.rotation === 0 ? '方向已对齐' : '方向尚未对齐'}</strong><small>将加固纸纤维方向与档案纸张方向保持一致</small><button class="secondary-button rotate-button" id="rotatePaper">旋转加固纸 90°</button></div></div>` : ''; 
  const feedback = state.feedback ? `<div id="repairFeedback" class="inline-feedback ${state.feedback.kind}">${escapeHtml(state.feedback.message)}</div>` : `<div id="repairFeedback" class="repair-feedback-placeholder">操作结果会显示在这里。</div>`;
  const metricName = item.id === 'holes' && step.id === 'pipette' ? '已完成孔洞' : '本步完成度';
  const toolCard = `<button type="button" class="tool-object ${state.activeTool === step.id ? 'active' : ''}" id="toolObject" data-tool="${step.id}" aria-pressed="${state.activeTool === step.id}"><span class="tool-object-icon">${step.icon}</span><span class="tool-object-copy"><strong>${state.activeTool === step.id ? '工具已拿起' : '拿起工具'}</strong><small>${escapeHtml(step.tool)}</small></span><span class="drag-tag">可拖动</span></button>`;
  shell(step.title, step.instruction,
    `<div class="repair-step-card"><div class="repair-step-head"><span>操作步骤 ${state.repairStep} / ${item.steps.length}</span><strong>${pct}%</strong></div><div class="metric-track"><span style="width:${pct}%"></span></div>${count}${flip}<div class="tool-area"><h4>当前操作工具</h4><div class="tool-row">${toolCard}${rotation}</div><div class="tool-description">${toolDescription(step)}</div>${feedback}<div class="tool-tip"><strong>操作提示</strong><span>${escapeHtml(step.hint)}</span></div></div></div>`,
    `<div class="button-row"><button class="secondary-button" id="backRepair">← 返回上一步</button><button class="secondary-button" id="redoStep">重做本步</button><button class="primary-button" id="nextRepair">${state.repairStep === item.steps.length ? '检查修复操作 →' : '检查本步操作 →'}</button></div><p class="mini-note">所有操作均发生在数字副本图层，不会修改故宫博物院提供的原始影像。</p>`);
  bindToolCard(step);
  if ($('#flipBack')) $('#flipBack').addEventListener('click', () => { state.showBack = !state.showBack; renderImage(); setFeedback('success', state.showBack ? '已切换至背面操作示意。现在可以放置局部加固纸。' : '已返回正面历史影像。局部加固操作需在背面示意中完成。'); });
  if ($('#rotatePaper')) $('#rotatePaper').addEventListener('click', () => { state.rotation = state.rotation === 90 ? 0 : 90; setFeedback('info', `加固纸已旋转至 ${state.rotation}°。请让纸张纤维方向与示意箭头一致。`); renderRepair(); });
  $('#backRepair').addEventListener('click', () => { state.activeTool = null; if (state.repairStep === 1) state.repairStep = 0; else state.repairStep--; state.feedback = null; renderStage(); });
  $('#redoStep').addEventListener('click', resetCurrentStep);
  $('#nextRepair').addEventListener('click', () => {
    if (!isStepDone()) {
      const message = item.id === 'holes' && step.id === 'pipette'
        ? `还有 <strong>${7 - state.filledHoles.size} 个孔洞</strong> 尚未填补。请完成 <strong>7/7</strong> 后再进入下一步。`
        : '本步操作尚未完成。请按照左侧目标区域和右侧工具提示完成操作，再进行检查。';
      showMessage('本步尚未完成', message); return;
    }
    if (state.repairStep < item.steps.length) { state.repairStep++; state.activeTool = null; state.feedback = { kind: 'success', message: '上一步操作已完成。请使用下一件工具继续。' }; renderStage(); }
    else { state.stage = 4; state.activeTool = null; state.showDamage = false; state.qualityResult = calculateQuality(); renderStage(); }
  });
  renderImage();
}
function bindToolCard(step) {
  const card = $('#toolObject');
  card.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault();
    toolPointer = { stepId: step.id, startX: event.clientX, startY: event.clientY, moved: false };
    document.addEventListener('pointermove', moveToolPointer);
    document.addEventListener('pointerup', endToolPointer, { once: true });
  });
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleActiveTool(step); }
  });
}
function moveToolPointer(event) {
  if (!toolPointer) return;
  if (Math.hypot(event.clientX - toolPointer.startX, event.clientY - toolPointer.startY) > 5) toolPointer.moved = true;
  if (!toolPointer.moved) return;
  let ghost = $('#toolDragGhost');
  if (!ghost) { ghost = document.createElement('div'); ghost.id = 'toolDragGhost'; ghost.className = 'tool-drag-ghost'; document.body.appendChild(ghost); }
  const step = currentStep();
  const shapes = { strip: '<span class="ghost-strip"></span>', patch: '<span class="ghost-patch"></span>', press: '<span class="ghost-board"></span>', pipette: '<span class="ghost-dropper">💧</span>', blotter: '<span class="ghost-blotter"></span>', support: '<span class="ghost-support"></span>', paste: '<span class="ghost-brush">🖌</span>' };
  ghost.innerHTML = `${shapes[step.id] || `<span>${step.icon}</span>`}<strong>${escapeHtml(step.tool)}</strong>`;
  ghost.style.left = `${event.clientX + 14}px`; ghost.style.top = `${event.clientY + 14}px`;
}
function endToolPointer(event) {
  document.removeEventListener('pointermove', moveToolPointer);
  const current = toolPointer; toolPointer = null; $('#toolDragGhost')?.remove();
  if (!current) return;
  const step = currentStep();
  if (!current.moved) { toggleActiveTool(step); return; }
  const rect = $('#repairSvg').getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
    setFeedback('warning', '工具没有放到档案影像上。请拖到左侧图像的目标区域。'); return;
  }
  const point = pointFromClient(event.clientX, event.clientY);
  if (step.kind === 'swipe') { state.activeTool = step.id; setFeedback('info', `已拿起${step.tool}。请在图像上沿标记区域按住鼠标拖动一次。`); renderRepair(); return; }
  if (step.kind === 'point') { state.activeTool = step.id; fillHole(point); return; }
  performDrop(step.id, point);
}
function toggleActiveTool(step) {
  state.activeTool = state.activeTool === step.id ? null : step.id;
  setFeedback(state.activeTool ? 'success' : 'info', state.activeTool ? `已拿起${step.tool}。现在可以在左侧档案影像上操作。` : '工具已放回托盘。');
  renderRepair();
}
function pointFromClient(clientX, clientY) {
  const rect = $('#repairSvg').getBoundingClientRect();
  return [(clientX - rect.left) / rect.width * 100, (clientY - rect.top) / rect.height * 100];
}
function distance(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1]); }
function performDrop(stepId, point) {
  const item = state.current, center = item.targetCenter, near = distance(point, center) <= item.targetRadius;
  if (!near) { state.offTarget++; setFeedback('warning', '位置不正确。请把工具拖到虚线标记的目标区域附近再松开。'); return; }
  if (item.id === 'tear' && stepId === 'strip') state.actions.stripPlaced = true;
  else if (item.id === 'loss' && stepId === 'patch') state.actions.patchPlaced = true;
  else if (item.id === 'loss' && stepId === 'press') {
    if (!state.actions.patchPlaced) { setFeedback('warning', '请先放置补纸片，再进行排实。'); return; }
    state.actions.patchPressed = true;
  }
  else if (item.id === 'holes' && stepId === 'blotter') {
    if (state.filledHoles.size < 7) { setFeedback('warning', `还有 ${7 - state.filledHoles.size} 个孔洞未填补，暂时不能吸水定形。`); return; }
    state.actions.blotterPlaced = true;
  }
  else if (item.id === 'weak' && stepId === 'support') {
    if (!state.showBack) { setFeedback('warning', '请先翻至背面操作示意，再放置加固纸。'); return; }
    if (state.rotation !== 0) { setFeedback('warning', '纤维方向还没有对齐。请先旋转加固纸，使箭头方向与示意方向一致。'); return; }
    state.actions.supportPlaced = true; state.actions.backSideUsed = true; state.actions.fiberAligned = true;
  }
  else if (item.id === 'weak' && stepId === 'blotter') {
    if (!state.actions.pasteApplied) { setFeedback('warning', '请先完成局部施浆，再进行吸水压平。'); return; }
    state.actions.dried = true;
  }
  else { setFeedback('warning', '当前工具与操作步骤不匹配，请查看右侧工具名称。'); return; }
  state.activeTool = null;
  const messages = {
    strip: '纸条已吸附到裂口位置。对位正确，可以进行局部施浆。',
    patch: '补纸片已按缺角轮廓放置，未覆盖档案正文。',
    press: '压纸板已放在补纸边缘，局部排实完成。',
    blotter: item.id === 'holes' ? '吸水纸已覆盖孔洞区域，完成吸水与定形。' : '吸水纸已放在局部加固区，完成压平前整理。',
    support: '加固纸已按纤维方向放置在背面脆弱区域。'
  };
  setFeedback('success', messages[stepId] || '操作正确，已记录本步结果。');
  renderRepair(); renderImage(); renderProgress();
}
function fillHole(point) {
  const item = state.current;
  let nearest = -1, best = Infinity;
  item.holes.forEach(([x, y], index) => { const d = distance(point, [x, y]); if (d < best) { best = d; nearest = index; } });
  if (best > 7.5) { state.offTarget++; setFeedback('warning', '没有点到孔洞附近。请点击左侧七个固定小孔，附近区域也可以识别。'); return; }
  if (state.filledHoles.has(nearest)) { setFeedback('info', `这个孔洞已经完成。当前进度 ${state.filledHoles.size}/7。`); return; }
  state.filledHoles.add(nearest); state.activeTool = 'pipette';
  setFeedback('success', `填补正确：第 ${nearest + 1} 个孔洞已完成，当前 ${state.filledHoles.size}/7。`);
  renderImage(); renderRepair(); renderProgress();
}
function pointToSegmentDistance(point, start, end) {
  const dx = end[0] - start[0], dy = end[1] - start[1];
  const lengthSq = dx * dx + dy * dy;
  if (!lengthSq) return distance(point, start);
  const t = Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / lengthSq));
  return distance(point, [start[0] + t * dx, start[1] + t * dy]);
}
function distanceToPath(point, path) {
  let min = Infinity;
  for (let index = 0; index < path.length - 1; index++) min = Math.min(min, pointToSegmentDistance(point, path[index], path[index + 1]));
  return min;
}
function finishSwipe(points) {
  const item = state.current, step = currentStep();
  if (!step || step.kind !== 'swipe') return;
  if (points.length < 2 || distance(points[0], points[points.length - 1]) < 7) { setFeedback('warning', '请按住鼠标沿目标线拖动一段距离，再松开。'); return; }
  const path = item.targetPath;
  const nearCount = points.filter(point => distanceToPath(point, path) <= 8).length;
  const coverage = nearCount / points.length;
  const startNear = distanceToPath(points[0], path) <= 10;
  const endNear = distanceToPath(points[points.length - 1], path) <= 10;
  if (coverage < .48 || !startNear || !endNear) {
    state.offTarget++; setFeedback('warning', '操作轨迹没有沿着目标区域。请从虚线附近开始，顺着裂口或加固边缘拖动。'); return;
  }
  if (item.id === 'tear' && step.id === 'paste') state.actions.pasteApplied = true;
  else if (item.id === 'tear' && step.id === 'press') state.actions.stripPressed = true;
  else if (item.id === 'weak' && step.id === 'paste') state.actions.pasteApplied = true;
  else return;
  state.activeTool = null;
  const message = step.id === 'paste' ? '施浆轨迹正确，操作集中在需要加固的纸条附近。' : '排实轨迹正确，补裂区域已完成轻压整理。';
  setFeedback('success', message); renderRepair(); renderImage(); renderProgress();
}
function bindRepairSvg() {
  const svg = $('#repairSvg');
  svg.addEventListener('pointerdown', event => {
    if (state?.stage !== 3 || state.repairStep < 1) return;
    const step = currentStep(); if (!step) return;
    if (step.kind === 'point') {
      if (state.activeTool !== step.id) { setFeedback('warning', '请先拿起纸浆滴管，再点击孔洞。'); return; }
      fillHole(pointFromClient(event.clientX, event.clientY)); return;
    }
    if (step.kind === 'swipe' && state.activeTool !== step.id) {
      setFeedback('warning', `请先拿起${step.tool}，再沿目标区域拖动。`); return;
    }
    if (step.kind === 'drop' && state.activeTool !== step.id) {
      setFeedback('warning', `请先拿起${step.tool}，再拖动到目标区域。`); return;
    }
    event.preventDefault(); svg.setPointerCapture(event.pointerId);
    imageGesture = { stepId: step.id, points: [pointFromClient(event.clientX, event.clientY)] };
    $('#gestureCursor').hidden = false; updateGestureCursor(event.clientX, event.clientY, step);
  });
  svg.addEventListener('pointermove', event => {
    if (!imageGesture) return;
    const point = pointFromClient(event.clientX, event.clientY);
    const last = imageGesture.points[imageGesture.points.length - 1];
    if (distance(point, last) > 1.2) imageGesture.points.push(point);
    updateGestureCursor(event.clientX, event.clientY, currentStep());
  });
  svg.addEventListener('pointerup', event => {
    if (!imageGesture) return;
    const gesture = imageGesture; imageGesture = null; $('#gestureCursor').hidden = true;
    const point = pointFromClient(event.clientX, event.clientY);
    if (gesture.points.length) gesture.points.push(point);
    const step = currentStep();
    if (step.kind === 'swipe') finishSwipe(gesture.points);
    else performDrop(gesture.stepId, point);
    renderImage();
  });
  svg.addEventListener('pointercancel', () => { imageGesture = null; $('#gestureCursor').hidden = true; });
}
function updateGestureCursor(clientX, clientY, step) {
  const cursor = $('#gestureCursor'); cursor.textContent = `${step?.icon || '✦'} ${step?.tool || '工具'}`;
  cursor.style.left = `${clientX + 12}px`; cursor.style.top = `${clientY + 12}px`;
}
function resetCurrentStep() {
  const item = state.current, step = currentStep(); state.activeTool = null;
  if (item.id === 'tear') {
    if (step.id === 'strip') { state.actions.stripPlaced = false; state.actions.pasteApplied = false; state.actions.stripPressed = false; }
    if (step.id === 'paste') { state.actions.pasteApplied = false; state.actions.stripPressed = false; }
    if (step.id === 'press') state.actions.stripPressed = false;
  }
  if (item.id === 'loss') { if (step.id === 'patch') { state.actions.patchPlaced = false; state.actions.patchPressed = false; } else state.actions.patchPressed = false; }
  if (item.id === 'holes') { if (step.id === 'pipette') { state.filledHoles.clear(); state.actions.blotterPlaced = false; } else state.actions.blotterPlaced = false; }
  if (item.id === 'weak') { if (step.id === 'support') { state.actions.supportPlaced = false; state.actions.backSideUsed = false; state.actions.fiberAligned = false; state.actions.pasteApplied = false; state.actions.dried = false; state.rotation = 90; } if (step.id === 'paste') { state.actions.pasteApplied = false; state.actions.dried = false; } if (step.id === 'blotter') state.actions.dried = false; }
  state.offTarget = 0;
  state.feedback = { kind: 'info', message: '本步操作已重置。请重新使用工具完成目标操作。' };
  renderStage();
}
function calculateQuality() {
  const item = state.current, a = state.actions, checks = [];
  checks.push(['修复方案与模拟病害相匹配', state.plan === item.method]);
  checks.push(['材料选择符合本关卡模拟要求', state.materialCorrect]);
  if (item.id === 'tear') {
    checks.push(['薄皮纸条已放置并对准裂口', a.stripPlaced]);
    checks.push(['施浆轨迹沿纸条分布', a.pasteApplied]);
    checks.push(['棕刷已完成局部排实', a.stripPressed]);
  } else if (item.id === 'loss') {
    checks.push(['补纸片已放置于缺角', a.patchPlaced]);
    checks.push(['补纸边缘已完成排实', a.patchPressed]);
    checks.push(['补纸范围未覆盖正文区域', a.patchPlaced]);
  } else if (item.id === 'holes') {
    checks.push(['七个孔洞均已完成纸浆填补', state.filledHoles.size === 7]);
    checks.push(['填补范围与孔洞位置一致', state.filledHoles.size === 7]);
    checks.push(['吸水纸已完成覆盖与定形', a.blotterPlaced]);
  } else if (item.id === 'weak') {
    checks.push(['已在背面操作示意中完成加固', !!a.backSideUsed]);
    checks.push(['加固纸已放置且纤维方向匹配', a.supportPlaced && a.fiberAligned]);
    checks.push(['局部施浆已完成', a.pasteApplied]);
    checks.push(['吸水压平与局部定形已完成', a.dried]);
  }
  checks.push(['操作范围控制在必要区域', true]);
  const passed = checks.every(([, ok]) => ok);
  const score = Math.round(checks.reduce((sum, [, ok]) => sum + (ok ? 1 : 0), 0) / checks.length * 100);
  return { score, passed, checks };
}
function renderQuality() {
  const item = state.current, result = state.qualityResult || calculateQuality(); state.qualityResult = result;
  const rows = result.checks.map(([label, passed]) => `<div class="auto-check-row"><span class="auto-check-icon ${passed ? 'ok' : 'bad'}">${passed ? '✓' : '!'}</span><span>${escapeHtml(label)}</span><strong>${passed ? '通过' : '待改进'}</strong></div>`).join('');
  shell('第五步：修复质量自动检查', '检查结果由系统根据方案、材料选择和实际操作状态自动生成，不需要玩家自行勾选。这是网页设定的数字模拟验收，不等同于真实档案的专业质量检测。',
    `<div class="score-panel"><div><span>本次模拟质量得分</span><strong>${result.score}<small>/100</small></strong></div><div class="score-status ${result.passed ? 'pass' : 'revise'}">${result.passed ? '达到本关卡模拟验收条件' : '尚未达到模拟验收条件'}</div></div><div class="auto-check-list">${rows}</div><div class="result-card"><strong>检查说明</strong><p>${result.passed ? '本次操作已达到网页预设的模拟条件。真实修复还需专业人员检查纸张、字迹、材料兼容性与长期保存状态。' : '系统发现部分操作尚未完成。可以返回对应步骤重新操作，再次进行检查。'}</p></div>`,
    `<div class="button-row"><button class="secondary-button" id="backToRepair">← 返回修复操作</button><button class="primary-button" id="finishQuality" ${result.passed ? '' : 'disabled'}>通过模拟验收，生成修复记录 →</button></div>`);
  $('#backToRepair').addEventListener('click', () => { state.stage = 3; state.repairStep = item.steps.length; renderStage(); });
  $('#finishQuality').addEventListener('click', () => { state.stage = 5; state.showDamage = false; saveRecord(result); renderStage(); });
}
function buildRecord(result) {
  const item = state.current, now = new Date();
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, date: now.toISOString(),
    dateLabel: now.toLocaleString('zh-CN'), caseId: item.id, title: item.title, short: item.short,
    type: item.type, method: item.method, material: item.materials.find(material => material.id === state.materialChoice)?.label || '',
    score: result.score, passed: result.passed, checks: result.checks.map(([label, passed]) => ({ label, passed })),
    actions: Object.keys(state.actions).filter(key => state.actions[key]), holeCount: state.filledHoles.size,
    offTarget: state.offTarget, attribution: attribution(item), notice: '本记录为课堂数字模拟记录，不代表历史原件的真实病害或真实修复记录；模拟验收规则由网页设定。'
  };
}
function saveRecord(result) {
  if (state.recordSaved) return state.savedRecord;
  const record = buildRecord(result), records = readRecords(); records.unshift(record);
  if (writeRecords(records)) { state.recordSaved = true; state.savedRecord = record; renderArchive(); }
  return record;
}
function recordText(record) {
  return `纸质档案数字修复记录\n项目：纸间寻迹·档案修复实验室 V4.0\n档案：${record.title}\n模拟病害：${record.type}\n修复方法：${record.method}\n材料：${record.material}\n完成时间：${record.dateLabel}\n模拟评分：${record.score}/100\n\n自动检查：\n${(record.checks || record.items || []).map(check => { const label = Array.isArray(check) ? check[0] : check.label; const passed = Array.isArray(check) ? check[1] : check.passed; return `${label}：${passed ? '通过' : '待改进'}`; }).join('\n')}\n\n影像来源：${record.attribution}\n说明：${record.notice}`;
}
function downloadText(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' }), url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function renderReport() {
  const item = state.current, result = state.qualityResult, record = state.savedRecord || buildRecord(result);
  shell('第六步：生成修复记录', '本次任务已完成。系统已将材料选择、操作步骤和自动检查结果保存到「我的修复档案库」。',
    `<div class="report-paper"><p class="report-kicker">ARCHIVE CONSERVATION RECORD</p><h3>纸质档案数字修复记录</h3><p><b>档案名称：</b>${escapeHtml(item.title)}</p><p><b>模拟病害：</b>${escapeHtml(item.type)}</p><p><b>处理方法：</b>${escapeHtml(item.method)}</p><p><b>操作材料：</b>${escapeHtml(record.material)}</p><p><b>操作日期：</b>${escapeHtml(record.dateLabel)}</p><p><b>模拟评分：</b>${result.score}/100</p><p><b>自动检查：</b>${result.checks.filter(check => check[1]).length}/${result.checks.length} 项通过</p><span class="report-stamp">课堂数字模拟 · 非原件修复记录</span></div><div class="feedback">修复工作的目标不是让档案焕然一新，而是在保护档案信息与原有材料的前提下，进行必要、适宜的干预。</div>`,
    `<div class="button-row"><button class="secondary-button" id="downloadReport">下载本次记录</button><button class="primary-button" id="backLibrary">返回档案库，选择下一份 →</button></div>`);
  $('#downloadReport').addEventListener('click', () => downloadText(`${item.short}-数字修复记录.txt`, recordText(record)));
  $('#backLibrary').addEventListener('click', backToCases);
}
function renderArchive() {
  const host = $('#archiveList'); if (!host) return;
  const records = readRecords();
  if (!records.length) {
    host.innerHTML = '<div class="archive-empty"><span class="archive-empty-icon">▤</span><strong>还没有修复记录</strong><p>完成任意一份档案的数字修复并通过自动检查后，记录会保存在这里。</p></div>'; return;
  }
  host.innerHTML = records.slice(0, 16).map(record => `
    <article class="archive-record"><div class="archive-record-main"><span class="archive-date">${escapeHtml(record.dateLabel || '')}</span><h3>${escapeHtml(record.short || record.title)}</h3><p>${escapeHtml(record.type || '')} · ${escapeHtml(record.method || '')}</p></div>
    <div class="archive-score"><strong>${Number(record.score) || 0}</strong><small>/100</small><span>${record.passed ? '模拟验收通过' : '历史记录'}</span></div>
    <div class="archive-actions"><button class="secondary-button" data-view-record="${escapeHtml(record.id)}">查看记录</button><button class="secondary-button" data-download-record="${escapeHtml(record.id)}">下载</button></div></article>`).join('');
  $$('[data-view-record]').forEach(button => button.addEventListener('click', () => viewRecord(button.dataset.viewRecord)));
  $$('[data-download-record]').forEach(button => button.addEventListener('click', () => { const record = readRecords().find(entry => entry.id === button.dataset.downloadRecord); if (record) downloadText(`${record.short}-数字修复记录.txt`, recordText(record)); }));
}
function viewRecord(id) {
  const record = readRecords().find(entry => entry.id === id); if (!record) return;
  const checks = (record.checks || record.items || []).map(check => {
    const label = Array.isArray(check) ? check[0] : check.label;
    const passed = Array.isArray(check) ? check[1] : check.passed;
    return `<p><strong>${passed ? '✓' : '!'}</strong>${escapeHtml(label)}</p>`;
  }).join('');
  showModal('修复档案详情', `<div class="record-detail"><p><strong>档案名称</strong>${escapeHtml(record.title)}</p><p><strong>模拟病害</strong>${escapeHtml(record.type)}</p><p><strong>处理方法</strong>${escapeHtml(record.method)}</p><p><strong>材料</strong>${escapeHtml(record.material || '未记录')}</p><p><strong>完成时间</strong>${escapeHtml(record.dateLabel || '')}</p><p><strong>模拟得分</strong>${record.score}/100</p><p><strong>孔洞填补数</strong>${record.holeCount ?? '—'}</p><p><strong>影像来源</strong>${escapeHtml(record.attribution || '')}</p><div class="record-checks">${checks}</div><p class="record-note">${escapeHtml(record.notice || '')}</p></div>`, '<button class="primary-button" id="closeRecord">关闭</button>');
  $('#closeRecord').addEventListener('click', closeModal);
}
function openOriginalImage() {
  if (!state) return;
  const item = state.current;
  showModal('原始历史档案影像', `<div class="original-view"><img src="${item.image}" alt="${escapeHtml(item.short)}原始历史影像"><p>此处单独展示故宫博物院专题提供的原始影像，不叠加模拟病害、修复痕迹或操作轨迹。</p><a href="${item.source}" target="_blank" rel="noreferrer">查看故宫博物院原始专题 ↗</a></div>`, '<button class="primary-button" id="closeOriginal">关闭</button>');
  $('#closeOriginal').addEventListener('click', closeModal);
}
function openPdf(path, title) {
  showModal(title, `<div class="pdf-frame-wrap"><iframe class="pdf-frame" src="${path}#view=FitH" title="${escapeHtml(title)}"></iframe></div><p class="pdf-fallback">如果预览区域未显示，请<a href="${path}" target="_blank" rel="noreferrer">在新标签页打开 PDF</a>。</p>`, '<button class="secondary-button" id="openPdfTab">新标签页打开</button><button class="primary-button" id="closePdf">关闭</button>');
  $('#openPdfTab').addEventListener('click', () => window.open(path, '_blank', 'noopener'));
  $('#closePdf').addEventListener('click', closeModal);
}

function init() {
  $('#backToCases').addEventListener('click', backToCases);
  $('#restartCase').addEventListener('click', () => {
    if (!state) return;
    showModal('重新开始本份档案？', '<p>本次尚未完成的操作、选择和进度将清空；已经保存到「我的修复档案库」的历史记录不会删除。</p>', '<button class="secondary-button" id="cancelRestart">取消</button><button class="primary-button" id="confirmRestart">重新开始</button>');
    $('#cancelRestart').addEventListener('click', closeModal);
    $('#confirmRestart').addEventListener('click', () => { const id = state.current.id; closeModal(); startCase(id); });
  });
  $('#zoomIn').addEventListener('click', () => { if (!state) return; state.zoom = Math.min(1.6, state.zoom + .1); renderImage(); });
  $('#zoomOut').addEventListener('click', () => { if (!state) return; state.zoom = Math.max(.8, state.zoom - .1); renderImage(); });
  $('#toggleDamage').addEventListener('click', () => { if (!state) return; state.showDamage = !state.showDamage; renderImage(); });
  $('#openOriginal').addEventListener('click', openOriginalImage);
  $('#modalClose').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', event => { if (event.target.matches('[data-modal-close]')) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !$('#modal').hidden) closeModal(); });
  $$('[data-pdf]').forEach(button => button.addEventListener('click', () => openPdf(button.dataset.pdf, button.dataset.title)));
  bindRepairSvg();
  window.addEventListener('resize', positionOverlays);
  if ('ResizeObserver' in window) { const observer = new ResizeObserver(positionOverlays); observer.observe($('#imageInner')); }
  renderCards(); renderArchive();
}
init();

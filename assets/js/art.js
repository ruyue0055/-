/* 线描插图：全部手绘 SVG，无外部图片依赖
   viewBox 200×200，墨线为主，设色克制（纸、墨、金、朱、青玉、青铜） */
window.ART = (function () {
  "use strict";

  var P = "#efe4cb", INK = "#2c241e", INK2 = "#6b5b49",
      GOLD = "#b48a4a", ZHU = "#a8402f", JADE = "#9db5a9",
      BRONZE = "#7d7a5c", BLUE = "#46606f", SNOW = "#dfe6e4";

  function svg(inner, cls) {
    return '<svg class="art-svg ' + (cls || "") + '" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">' +
      '<g stroke="' + INK + '" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      inner + "</g></svg>";
  }

  /* 背景淡墨 */
  var wash = '<path d="M28 118 C34 74 62 44 106 44 C150 44 178 76 176 116 C174 154 144 172 104 170 C64 168 22 158 28 118 Z" fill="' + P + '" stroke="none" opacity="0.55"/>' +
    '<path d="M40 132 C52 100 74 82 106 82 C142 82 166 106 164 134" stroke="' + INK2 + '" stroke-width="0.8" opacity="0.35" stroke-dasharray="2 7"/>';

  var ART = {};

  /* 1 南迁木箱 */
  ART.crate = svg(wash +
    '<path d="M52 82 L146 82 L146 162 L52 162 Z" fill="#e3cfa4"/>' +
    '<path d="M52 82 L78 58 L172 58 L146 82" fill="#d8c091"/>' +
    '<path d="M146 82 L172 58 L172 138 L146 162" fill="#c9b07d"/>' +
    '<path d="M52 82 L78 58 L172 58" stroke-width="2"/>' +
    '<path d="M52 104 L146 104 M52 128 L146 128 M52 150 L146 150" stroke="' + INK2 + '" stroke-width="1.1"/>' +
    '<path d="M78 104 L104 82 M78 128 L104 104 M78 150 L104 128" stroke="' + INK2 + '" stroke-width="1.1" opacity="0.8"/>' +
    '<path d="M72 84 L72 160 M128 84 L128 160" stroke="' + GOLD + '" stroke-width="3.2" opacity="0.85"/>' +
    '<path d="M72 84 L72 160 M128 84 L128 160" stroke="' + INK + '" stroke-width="0.8" opacity="0.4"/>' +
    '<rect x="92" y="80" width="20" height="82" fill="#f6eeda" stroke-width="1"/>' +
    '<text x="102" y="104" font-size="13" fill="' + INK + '" text-anchor="middle" stroke="none" font-family="serif">故</text>' +
    '<text x="102" y="122" font-size="13" fill="' + INK + '" text-anchor="middle" stroke="none" font-family="serif">宫</text>' +
    '<rect x="95" y="132" width="14" height="14" fill="' + ZHU + '" stroke="none" opacity="0.85"/>' +
    '<text x="102" y="143" font-size="9" fill="#f6eeda" text-anchor="middle" stroke="none" font-family="serif">封</text>' +
    '<path d="M56 158 L50 168 M64 160 L60 170 M138 158 L144 168" stroke="' + INK2 + '" stroke-width="1.1"/>'
  );

  /* 2 四库全书 · 函套 */
  ART.siku = svg(wash +
    '<rect x="38" y="124" width="104" height="42" fill="' + BLUE + '" opacity="0.9"/>' +
    '<rect x="46" y="88" width="104" height="40" fill="#3d5563" opacity="0.92"/>' +
    '<rect x="58" y="54" width="98" height="38" fill="' + BLUE + '" opacity="0.85"/>' +
    '<path d="M38 124 L46 88 M142 124 L150 88" stroke-width="0.9" opacity="0.35"/>' +
    '<rect x="52" y="132" width="16" height="26" fill="#f4ecd8" stroke-width="1"/>' +
    '<rect x="60" y="96" width="15" height="24" fill="#f4ecd8" stroke-width="1"/>' +
    '<rect x="70" y="62" width="15" height="23" fill="#f4ecd8" stroke-width="1"/>' +
    '<text x="60" y="144" font-size="7" fill="' + INK + '" stroke="none" text-anchor="middle" font-family="serif">經</text>' +
    '<text x="67.5" y="108" font-size="7" fill="' + INK + '" stroke="none" text-anchor="middle" font-family="serif">史</text>' +
    '<text x="77.5" y="74" font-size="7" fill="' + INK + '" stroke="none" text-anchor="middle" font-family="serif">子</text>' +
    '<path d="M38 148 L142 148 M46 112 L150 112 M58 76 L156 76" stroke="' + GOLD + '" stroke-width="1.4" opacity="0.75"/>' +
    '<path d="M38 124 L38 166 M142 124 L142 166 M46 88 L46 128 M150 88 L150 128" stroke-width="1.4"/>'
  );

  /* 3 宋元善本 */
  ART.songben = svg(wash +
    '<path d="M30 128 C56 112 84 110 100 118 C116 110 144 112 170 128 L170 158 C144 144 116 144 100 152 C84 144 56 144 30 158 Z" fill="#f3e8cf"/>' +
    '<path d="M100 118 L100 152" stroke-width="1.2"/>' +
    '<path d="M46 124 L46 150 M58 121 L58 147 M70 119 L70 145 M82 118 L82 144" stroke="' + INK2 + '" stroke-width="0.9" opacity="0.75"/>' +
    '<path d="M118 118 L118 144 M130 119 L130 145 M142 121 L142 147 M154 124 L154 150" stroke="' + INK2 + '" stroke-width="0.9" opacity="0.75"/>' +
    '<path d="M30 128 C56 112 84 110 100 118 C116 110 144 112 170 128" stroke-width="1.8"/>' +
    '<path d="M30 158 C56 144 84 144 100 152 C116 144 144 144 170 158" stroke-width="1.8"/>' +
    '<path d="M24 122 L24 136 M27 122 L27 136 M30 122 L30 136" stroke="' + GOLD + '" stroke-width="0.9"/>' +
    '<rect x="36" y="150" width="12" height="12" fill="' + ZHU + '" stroke="none" opacity="0.7"/>'
  );

  /* 4 存沪文物点查清册 */
  ART.ledger = svg(wash +
    '<rect x="46" y="76" width="106" height="86" rx="2" fill="#e8d8b4"/>' +
    '<rect x="42" y="70" width="106" height="86" rx="2" fill="#efe4cb"/>' +
    '<rect x="52" y="66" width="104" height="84" rx="2" fill="#f6eeda"/>' +
    '<path d="M156 66 L156 150" stroke-width="1"/>' +
    '<rect x="66" y="78" width="22" height="60" fill="#fbf6ea" stroke-width="1"/>' +
    '<text x="77" y="94" font-size="9" fill="' + INK + '" stroke="none" text-anchor="middle" font-family="serif">存</text>' +
    '<text x="77" y="108" font-size="9" fill="' + INK + '" stroke="none" text-anchor="middle" font-family="serif">滬</text>' +
    '<text x="77" y="122" font-size="9" fill="' + INK + '" stroke="none" text-anchor="middle" font-family="serif">清</text>' +
    '<text x="77" y="136" font-size="9" fill="' + INK + '" stroke="none" text-anchor="middle" font-family="serif">册</text>' +
    '<path d="M100 82 L100 140 M108 82 L108 140 M116 82 L116 140 M124 82 L124 140 M132 82 L132 140" stroke="' + INK2 + '" stroke-width="0.7" opacity="0.55"/>' +
    '<path d="M100 90 L100 134 M108 90 L108 134 M116 90 L116 134" stroke="' + INK2 + '" stroke-width="0.7" opacity="0.35"/>' +
    '<rect x="126" y="126" width="18" height="18" fill="' + ZHU + '" stroke="none" opacity="0.8" transform="rotate(-8 135 135)"/>' +
    '<path d="M50 156 L46 162 L152 162 L156 156" stroke="' + INK2 + '" stroke-width="1" opacity="0.6"/>'
  );

  /* 5 嘉庆青玉执壶 */
  ART.ewer = svg(wash +
    '<path d="M74 158 C58 150 54 126 58 108 C62 90 74 80 92 78 C110 76 128 86 134 104 C140 122 136 148 120 158 Z" fill="' + JADE + '"/>' +
    '<path d="M92 78 C90 66 94 58 104 58 C114 58 118 66 116 78" fill="' + JADE + '"/>' +
    '<path d="M104 58 L104 50 M100 50 L108 50" stroke-width="1.6"/>' +
    '<path d="M58 112 C42 108 34 96 36 84 C38 74 46 70 52 74" fill="' + JADE + '"/>' +
    '<path d="M36 84 C40 92 46 96 52 96" stroke-width="1"/>' +
    '<path d="M134 106 C152 104 160 118 154 132 C150 142 138 142 132 134" stroke-width="3.4"/>' +
    '<path d="M72 150 C84 158 112 158 124 150" stroke="' + INK2 + '" stroke-width="1" opacity="0.6"/>' +
    '<path d="M70 116 C78 108 92 106 100 112 M70 128 C80 122 96 122 106 128" stroke="#ffffff" stroke-width="1.2" opacity="0.5"/>' +
    '<path d="M96 84 C94 96 95 104 100 110" stroke="' + INK2 + '" stroke-width="0.9" opacity="0.45"/>'
  );

  /* 6 康熙画珐琅莲花纹盖碗 */
  ART.bowl = svg(wash +
    '<ellipse cx="100" cy="160" rx="56" ry="12" fill="#e6d7b6"/>' +
    '<path d="M62 160 C58 146 66 130 100 128 C134 130 142 146 138 160 Z" fill="#efe4cb"/>' +
    '<path d="M56 104 C56 122 74 132 100 132 C126 132 144 122 144 104 Z" fill="#f2e6cc"/>' +
    '<path d="M56 104 C56 92 74 84 100 84 C126 84 144 92 144 104" fill="#e8d8b4"/>' +
    '<path d="M56 104 C70 112 84 116 100 116 C116 116 130 112 144 104" stroke-width="1.2"/>' +
    '<path d="M64 140 C72 134 84 132 92 134 M108 134 C118 132 128 136 134 142" stroke="' + ZHU + '" stroke-width="1.3" opacity="0.75"/>' +
    '<path d="M74 122 C82 116 92 114 100 116 C108 114 118 116 126 122" stroke="' + ZHU + '" stroke-width="1.1" opacity="0.55"/>' +
    '<path d="M100 84 L100 68" stroke-width="1.6"/>' +
    '<ellipse cx="100" cy="64" rx="8" ry="5" fill="' + GOLD + '"/>' +
    '<path d="M86 92 C92 88 96 86 100 86" stroke="#ffffff" stroke-width="1.4" opacity="0.55"/>'
  );

  /* 7 商周青铜鼎 */
  ART.ding = svg(wash +
    '<path d="M56 96 L144 96 L136 140 L64 140 Z" fill="' + BRONZE + '"/>' +
    '<path d="M56 96 C56 84 74 78 100 78 C126 78 144 84 144 96" fill="#6f6c50"/>' +
    '<ellipse cx="100" cy="96" rx="44" ry="10" fill="#5f5c44"/>' +
    '<path d="M70 74 L70 56 M74 74 L74 56 M70 56 L74 56 M126 74 L126 56 M130 74 L130 56 M126 56 L130 56"/>' +
    '<path d="M56 104 L144 104 M56 112 L144 112" stroke="' + GOLD + '" stroke-width="1" opacity="0.55"/>' +
    '<path d="M76 118 C80 114 86 114 90 118 M96 118 C100 114 106 114 110 118 M116 118 C120 114 126 114 130 118" stroke="' + GOLD + '" stroke-width="1.1" opacity="0.7"/>' +
    '<path d="M80 140 L74 168 M84 140 L88 168 M120 140 L126 168 M116 140 L112 168" stroke-width="3"/>' +
    '<path d="M68 108 L64 118 M132 108 L136 118" stroke="' + INK2 + '" stroke-width="1" opacity="0.6"/>'
  );

  /* 8 华严洞桐油灯 */
  ART.lamp = svg(wash +
    '<circle cx="100" cy="84" r="26" fill="' + GOLD + '" opacity="0.12" stroke="none"/>' +
    '<path d="M76 150 C76 138 84 130 100 130 C116 130 124 138 124 150 C124 156 116 160 100 160 C84 160 76 156 76 150 Z" fill="#c9a86a"/>' +
    '<path d="M76 138 C86 144 114 144 124 138" stroke-width="1.1"/>' +
    '<path d="M100 130 C98 120 96 112 100 104 C104 96 100 90 100 86" stroke-width="1.4"/>' +
    '<path d="M100 88 C92 96 92 106 100 112 C108 106 108 96 100 88 Z" fill="' + GOLD + '"/>' +
    '<path d="M100 94 C96 98 96 104 100 107 C104 104 104 98 100 94 Z" fill="#fff8e0" stroke="none"/>' +
    '<path d="M60 160 L140 160" stroke="' + INK2 + '" stroke-width="1.2" opacity="0.55"/>' +
    '<path d="M88 66 C86 60 90 56 96 58 M112 62 C114 56 110 52 104 54" stroke="' + INK2 + '" stroke-width="0.9" opacity="0.35"/>'
  );

  /* 9 第 19557 号木箱 */
  ART.crate19557 = svg(wash +
    '<path d="M50 84 L144 84 L144 160 L50 160 Z" fill="#dec99d"/>' +
    '<path d="M50 84 L74 62 L168 62 L144 84" fill="#d3bb8b"/>' +
    '<path d="M144 84 L168 62 L168 138 L144 160" fill="#c4aa78"/>' +
    '<path d="M50 84 L74 62 L168 62" stroke-width="2"/>' +
    '<path d="M50 106 L144 106 M50 130 L144 130" stroke="' + INK2 + '" stroke-width="1" opacity="0.8"/>' +
    '<text x="97" y="126" font-size="17" fill="' + INK + '" stroke="none" text-anchor="middle" font-family="Courier New, monospace" letter-spacing="1">19557</text>' +
    '<path d="M62 116 L62 122 M132 116 L132 122" stroke="' + ZHU + '" stroke-width="2" opacity="0.8"/>' +
    '<path d="M96 146 C92 142 92 136 96 134 C100 132 104 136 104 140 C104 136 108 132 112 134 C116 136 116 142 112 146 C108 150 100 150 96 146 Z" fill="#f7f2e6"/>' +
    '<path d="M104 146 L104 156" stroke-width="1.1"/>'
  );

  /* 10 川江小木船 */
  ART.boat = svg(wash +
    '<path d="M28 132 C48 152 152 152 172 132 C166 144 156 152 146 154 L54 154 C44 152 34 144 28 132 Z" fill="#cbb17f"/>' +
    '<path d="M28 132 C48 152 152 152 172 132" stroke-width="2"/>' +
    '<path d="M70 134 L70 92 M74 134 L74 92" stroke-width="2"/>' +
    '<path d="M48 120 L48 96 C60 88 76 86 88 92 L88 118" fill="#efe4cb"/>' +
    '<path d="M56 104 L80 104 M56 111 L80 111" stroke="' + INK2 + '" stroke-width="0.9" opacity="0.7"/>' +
    '<path d="M120 128 L126 118 L132 128" fill="#efe4cb" stroke-width="1.4"/>' +
    '<path d="M132 128 L138 120" stroke-width="1.4"/>' +
    '<path d="M20 122 L46 128" stroke="' + GOLD + '" stroke-width="1.6"/>' +
    '<path d="M10 138 C18 132 26 132 32 138" stroke="' + INK2 + '" stroke-width="1" opacity="0.5"/>' +
    '<path d="M36 158 C56 164 144 164 164 158" stroke="' + INK2 + '" stroke-width="0.9" opacity="0.45"/>'
  );

  /* 11 秦岭道上的卡车 */
  ART.truck = svg(wash +
    '<path d="M18 150 C40 128 62 138 82 126 C104 112 122 124 140 118 C156 112 174 122 184 132" stroke="' + INK2 + '" stroke-width="1.1" opacity="0.55"/>' +
    '<path d="M24 150 C46 130 66 140 86 128 C108 114 126 126 144 120 C160 114 178 124 188 134" stroke-width="0.9" opacity="0.3" stroke-dasharray="1 6"/>' +
    '<rect x="44" y="96" width="60" height="34" fill="#e8d8b4"/>' +
    '<path d="M104 108 L128 108 L138 130 L104 130 Z" fill="#dcc9a1"/>' +
    '<path d="M108 112 L126 112 L132 126 L108 126 Z" fill="#cbb98f"/>' +
    '<rect x="50" y="86" width="24" height="12" fill="#efe4cb"/>' +
    '<rect x="78" y="86" width="22" height="12" fill="#efe4cb"/>' +
    '<path d="M98 100 L98 130" stroke-width="1.2"/>' +
    '<circle cx="62" cy="134" r="12" fill="#3a322c"/><circle cx="62" cy="134" r="5" fill="#e8d8b4"/>' +
    '<circle cx="126" cy="134" r="12" fill="#3a322c"/><circle cx="126" cy="134" r="5" fill="#e8d8b4"/>' +
    '<path d="M40 130 L42 138 M148 130 L146 138" stroke-width="1.2"/>' +
    '<path d="M12 70 C18 60 26 58 32 64 M30 78 C36 70 44 68 50 74 M160 66 C166 58 174 56 180 62" stroke="' + INK2 + '" stroke-width="0.9" opacity="0.4"/>'
  );

  /* 12 中鼎轮 */
  ART.ship = svg(wash +
    '<path d="M22 132 L178 132 L166 158 L34 158 Z" fill="#3f4a4e"/>' +
    '<path d="M22 132 L178 132" stroke-width="2"/>' +
    '<rect x="52" y="104" width="96" height="28" fill="#e6dcc6"/>' +
    '<rect x="66" y="86" width="68" height="18" fill="#efe4cb"/>' +
    '<rect x="84" y="66" width="14" height="20" fill="#5c5049"/>' +
    '<rect x="106" y="72" width="12" height="14" fill="#5c5049"/>' +
    '<path d="M84 66 L84 60 M98 66 L98 60 M106 72 L106 66 M118 72 L118 66" stroke-width="1.2"/>' +
    '<path d="M56 112 L82 112 M90 112 L100 112 M108 112 L142 112 M56 120 L142 120" stroke="' + INK2 + '" stroke-width="0.8" opacity="0.55"/>' +
    '<path d="M34 148 L60 148 M74 148 L100 148 M114 148 L166 148" stroke="' + GOLD + '" stroke-width="1.2" opacity="0.6"/>' +
    '<path d="M14 164 C30 158 44 170 60 164 C76 158 90 170 106 164 C122 158 136 170 152 164 C164 160 174 164 184 162" stroke="' + INK2 + '" stroke-width="1.1" opacity="0.5"/>' +
    '<path d="M60 70 C66 62 72 60 78 64" stroke="' + INK2 + '" stroke-width="0.9" opacity="0.35"/>'
  );

  /* 13 安谷乡纪念碑 */
  ART.stele = svg(wash +
    '<rect x="62" y="46" width="76" height="104" rx="6" fill="#d9cdb2"/>' +
    '<rect x="66" y="50" width="68" height="96" rx="4" stroke="' + INK2 + '" stroke-width="0.9" opacity="0.5"/>' +
    '<rect x="50" y="150" width="100" height="16" rx="2" fill="#cdbf9f"/>' +
    '<rect x="44" y="166" width="112" height="10" rx="2" fill="#bfb090"/>' +
    '<path d="M84 70 L84 128 M92 70 L92 128 M100 70 L100 128 M108 70 L108 128 M116 70 L116 128" stroke="' + INK2 + '" stroke-width="2.2" opacity="0.45"/>' +
    '<text x="100" y="44" font-size="9" fill="' + INK + '" stroke="none" text-anchor="middle" font-family="serif">碑</text>' +
    '<path d="M136 148 C140 140 148 138 152 142 C156 138 164 140 166 148 C168 154 160 160 152 158 C144 160 134 154 136 148 Z" fill="#f7f2e6" stroke-width="1.2"/>' +
    '<path d="M152 158 L152 168" stroke-width="1.2"/>' +
    '<path d="M40 176 L60 176 M140 176 L160 176" stroke="' + INK2 + '" stroke-width="0.8" opacity="0.4"/>'
  );

  return ART;
})();

const pptxgen = require("pptxgenjs");

const NAVY = "0E2841";
const RED = "E50000";
const WHITE = "FFFFFF";
const ICE = "CADCFC";
const MUTED = "8FA3BF";
const DARKTEXT = "1A1A1A";
const BODYGRAY = "3D3D3D";
const CODEBG = "1E1E1E";
const CODEFG = "D4D4D4";
const CODEGREEN = "6A9955";

const FONT_HEAD = "Arial";
const FONT_BODY = "Arial";
const FONT_MONO = "Courier New";

const W = 13.333, H = 7.5;
const ASSETS = __dirname + "/assets/";

let sectionCounter = 0;
let slideCounter = 0;

function footer(slide, opts) {
  opts = opts || {};
  const dark = !!opts.dark;
  slide.addText("ewNA26", {
    x: W - 2.3, y: H - 0.45, w: 2.0, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 10, color: dark ? MUTED : "9AA5B1",
    align: "right", margin: 0,
  });
  slideCounter++;
  slide.addText(String(slideCounter), {
    x: 0.4, y: H - 0.45, w: 0.6, h: 0.35,
    fontFace: FONT_HEAD, fontSize: 10, color: dark ? MUTED : "9AA5B1",
    align: "left", margin: 0,
  });
}

function contentTitle(s, title) {
  s.addText(title, {
    x: 0.7, y: 0.35, w: 12.0, h: 0.8, fontFace: FONT_HEAD, fontSize: 28,
    color: DARKTEXT, bold: true, margin: 0,
  });
}

function notesFrom(lines) {
  return lines.join("\n");
}

// ---------- Title / Speaker ----------

function titleSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addImage({ path: ASSETS + "toradex-logo.png", x: 0.6, y: 0.5, w: 2.4, h: 0.586 });
  s.addImage({ path: ASSETS + "EWLogo.png", x: W - 2.9, y: 0.5, w: 2.3, h: 0.33 });
  // title-slide-image.png is 1008x917 (~1.099 aspect) — hold aspect while docking bottom-right
  const imgW = 4.6, imgH = imgW / (1008 / 917);
  s.addImage({ path: ASSETS + "title-slide-image.png", x: W - imgW - 0.5, y: H - imgH - 0.55, w: imgW, h: imgH });
  s.addText("SYSTEMS & SOFTWARE ENGINEERING TRACK", {
    x: 0.9, y: 2.2, w: 7.0, h: 0.4, fontFace: FONT_HEAD, fontSize: 14,
    color: RED, bold: true, charSpacing: 2, margin: 0,
  });
  s.addText("Containers for Embedded Linux", {
    x: 0.9, y: 2.65, w: 7.0, h: 1.1, fontFace: FONT_HEAD, fontSize: 40,
    color: WHITE, bold: true, margin: 0,
  });
  s.addText("The Next Chapter", {
    x: 0.9, y: 3.6, w: 7.0, h: 0.8, fontFace: FONT_HEAD, fontSize: 30,
    color: ICE, margin: 0,
  });
  s.addText("Drew Moseley  |  Staff Developer, Torizon Professional Services  |  Toradex", {
    x: 0.9, y: 5.4, w: 7.0, h: 0.5, fontFace: FONT_BODY, fontSize: 16,
    color: MUTED, margin: 0,
  });
  s.addText("Embedded World North America 2026  •  Anaheim, CA  •  Sep 22, 2026", {
    x: 0.9, y: 5.9, w: 7.0, h: 0.4, fontFace: FONT_BODY, fontSize: 13,
    color: MUTED, margin: 0,
  });
  footer(s, { dark: true });
  s.addNotes(notesFrom([
    "Note: this is a respin of \"Beyond Basic Containers for Embedded Linux\" (EW Germany, March 2026).",
    "Open with a pause — let the title sink in. Don't rush into the speaker slide.",
  ]));
}

function speakerSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  s.addImage({ path: ASSETS + "headshot.png", x: 0.9, y: 1.6, w: 2.6, h: 2.6 });
  s.addText("Drew Moseley", {
    x: 3.9, y: 1.7, w: 8.0, h: 0.7, fontFace: FONT_HEAD, fontSize: 32, bold: true,
    color: DARKTEXT, margin: 0,
  });
  s.addText("Torizon Professional Services, Staff Developer  |  Toradex", {
    x: 3.9, y: 2.4, w: 8.0, h: 0.45, fontFace: FONT_BODY, fontSize: 16,
    color: RED, bold: true, margin: 0,
  });
  s.addText("We're located in Lucerne, Switzerland", {
    x: 3.9, y: 2.9, w: 8.0, h: 0.4, fontFace: FONT_BODY, fontSize: 13,
    color: BODYGRAY, italic: true, margin: 0,
  });
  const contacts = [
    { icon: "email", text: "drew.moseley@toradex.com" },
    { icon: "linkedin", text: "linkedin.com/in/drewmoseley" },
    { icon: "x", text: "x.com/@drewmoseley" },
    { icon: "github", text: "github.com/drewmoseley" },
    { icon: "mastodon", text: "fosstodon.org/@drewmoseley" },
  ];
  const rowH = 0.48, iconSize = 0.3, startY = 3.5;
  contacts.forEach((c, i) => {
    const y = startY + i * rowH;
    s.addImage({ path: ASSETS + `icon-${c.icon}.png`, x: 3.9, y: y + (rowH - iconSize) / 2 - 0.05, w: iconSize, h: iconSize });
    s.addText(c.text, {
      x: 3.9 + iconSize + 0.2, y, w: 7.8, h: rowH, fontFace: FONT_BODY, fontSize: 15,
      color: BODYGRAY, margin: 0, valign: "middle",
    });
  });
  s.addText([
    { text: "Source + examples on ", options: {} },
    { text: "GitHub", options: { hyperlink: { url: "https://github.com/drewmoseley/containers-the-next-chapter-talk" }, underline: true } },
    { text: ": github.com/drewmoseley/containers-the-next-chapter-talk", options: {} },
  ], {
    x: 3.9, y: startY + contacts.length * rowH + 0.15, w: 8.5, h: 0.4, fontFace: FONT_BODY, fontSize: 12,
    color: BODYGRAY, italic: true, margin: 0,
  });
  footer(s);
  s.addNotes(notesFrom([
    "Slow down here. Actually read out email/LinkedIn — gives audience time to snap a photo of the slide.",
    "Mention Lucerne, Switzerland location as a quick personal aside.",
    "Point out the GitHub source link — this replaces the old meta-talk slide's mention of it.",
  ]));
}

function whyBeyondSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  contentTitle(s, "Why Containers Beyond the Basics?");
  s.addText("The basics are known. Embedded adds real constraints:", {
    x: 0.7, y: 1.25, w: 11.5, h: 0.5, fontFace: FONT_BODY, fontSize: 17,
    color: BODYGRAY, margin: 0,
  });
  const cards = [
    { icon: "💾", title: "Storage", desc: "Flash is small" },
    { icon: "📡", title: "Network", desc: "Connectivity is unreliable" },
    { icon: "⚡", title: "Power", desc: "Can fail at any time" },
    { icon: "🕐", title: "Longevity", desc: "Devices live for years" },
  ];
  const gap = 0.4;
  const cardW = (11.4 - gap * (cards.length - 1)) / cards.length;
  cards.forEach((c, i) => {
    const x = 0.9 + i * (cardW + gap);
    s.addShape("roundRect", {
      x, y: 2.1, w: cardW, h: 3.2, rectRadius: 0.08,
      fill: { color: "F4F6F8" }, line: { type: "none" },
    });
    s.addText(c.icon, { x, y: 2.35, w: cardW, h: 0.9, fontSize: 40, align: "center", margin: 0 });
    s.addText(c.title, {
      x, y: 3.3, w: cardW, h: 0.5, fontFace: FONT_HEAD, fontSize: 18, bold: true,
      color: RED, align: "center", margin: 0,
    });
    s.addText(c.desc, {
      x: x + 0.2, y: 3.85, w: cardW - 0.4, h: 1.0, fontFace: FONT_BODY, fontSize: 13,
      color: BODYGRAY, align: "center", margin: 0,
    });
  });
  footer(s);
  s.addNotes(notesFrom([
    "Pause on each card for a beat — this is the setup for the whole talk.",
    "These four constraints are the lens every later slide gets filtered through.",
  ]));
}

// ---------- Section divider ----------

function sectionSlide(pres, title, notes) {
  sectionCounter++;
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addText(`SECTION 0${sectionCounter}`, {
    x: 0.9, y: 2.9, w: 8, h: 0.5, fontFace: FONT_HEAD, fontSize: 16,
    color: RED, bold: true, charSpacing: 3, margin: 0,
  });
  s.addText(title, {
    x: 0.9, y: 3.45, w: 11.0, h: 1.3, fontFace: FONT_HEAD, fontSize: 40,
    color: WHITE, bold: true, margin: 0,
  });
  footer(s, { dark: true });
  if (notes) s.addNotes(notes);
  return s;
}

// ---------- Code + bullets pattern slide ----------

function codeSlide(pres, title, bullets, filename, codeLines, keyIdeas, notes) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  contentTitle(s, title);

  // Left: bullets
  const leftW = 5.4;
  s.addText(renderBullets(bullets, 15), {
    x: 0.7, y: 1.35, w: leftW, h: 4.3, fontFace: FONT_BODY, fontSize: 15,
    color: BODYGRAY, margin: 0, valign: "top",
  });

  // Right: code window — size dynamically so long snippets never overflow the box
  const codeX = 6.4, codeY = 1.35, codeW = 6.2;
  const maxCodeBottom = 6.85; // leave room for footer
  const lineSpacing = 1.15;
  const LINE_FACTOR = 1.22; // empirical: actual rendered line height vs raw font size
  let codeFontSize = 11.5;
  const headerH = 0.5, paddingBottom = 0.25;
  const safeCodeLines = codeLines.map(l => l.replace(/\t/g, "    "));
  let lineHeightIn = (codeFontSize * LINE_FACTOR * lineSpacing) / 72;
  let neededTextH = safeCodeLines.length * lineHeightIn;
  let codeH = headerH + neededTextH + paddingBottom;
  // shrink font if it still won't fit in the available vertical space
  while (codeH > (maxCodeBottom - codeY) && codeFontSize > 9) {
    codeFontSize -= 0.5;
    lineHeightIn = (codeFontSize * LINE_FACTOR * lineSpacing) / 72;
    neededTextH = safeCodeLines.length * lineHeightIn;
    codeH = headerH + neededTextH + paddingBottom;
  }
  codeH = Math.min(Math.max(codeH, 3.0), maxCodeBottom - codeY);

  s.addShape("roundRect", {
    x: codeX, y: codeY, w: codeW, h: codeH, rectRadius: 0.06,
    fill: { color: CODEBG }, line: { type: "none" },
  });
  // titlebar dots
  ["FF5F56", "FFBD2E", "27C93F"].forEach((c, i) => {
    s.addShape("ellipse", {
      x: codeX + 0.2 + i * 0.28, y: codeY + 0.16, w: 0.14, h: 0.14,
      fill: { color: c }, line: { type: "none" },
    });
  });
  s.addText(filename, {
    x: codeX + 1.1, y: codeY + 0.08, w: codeW - 1.3, h: 0.3, fontFace: FONT_MONO, fontSize: 11,
    color: "AAAAAA", margin: 0,
  });
  s.addText(safeCodeLines.join("\n"), {
    x: codeX + 0.25, y: codeY + 0.5, w: codeW - 0.5, h: codeH - headerH - paddingBottom,
    fontFace: FONT_MONO, fontSize: codeFontSize, color: CODEFG, margin: 0, valign: "top", lineSpacingMultiple: lineSpacing,
  });

  // Key idea callout(s) — placed below the code box, wherever it ended up
  if (keyIdeas && keyIdeas.length) {
    const keyY = codeY + codeH + 0.3;
    s.addText(keyIdeas.map((k, i) => ({ text: k, options: { breakLine: i < keyIdeas.length - 1, paraSpaceAfter: 6 } })), {
      x: 0.7, y: keyY, w: 11.9, h: Math.max(0.3, 7.0 - keyY), fontFace: FONT_BODY, fontSize: 14, italic: true,
      color: RED, bold: true, margin: 0, valign: "top",
    });
  }

  footer(s);
  if (notes) s.addNotes(notes);
  return s;
}

function renderBullets(bullets, size) {
  return bullets.map((b, i) => {
    const isStr = typeof b === "string";
    const text = isStr ? b : b.text;
    const sub = !isStr && b.sub;
    return { text, options: { bullet: !sub, indentLevel: sub ? 1 : 0, breakLine: i < bullets.length - 1, paraSpaceAfter: 8, fontSize: sub ? size - 2 : size } };
  });
}

// ---------- Running Comparison ----------

const STEP_ROWS = [
  ["step0", "Baseline: single-stage, debian:trixie, build tools included", "498 MB"],
  ["step1", "Multi-stage: debian:trixie-slim runtime, no build tools", "112 MB"],
  ["step2", "Microservices: sensor + nginx, named volume", "~112 MB on disk (shared base)"],
  ["step3", "Distroless: sensor (35 MB) + Go web (7.6 MB)", "~40 MB on disk"],
  ["step4", "Nonroot: :nonroot distroless tags, uid 65532", "~40 MB on disk (same size)"],
  ["step5", "Multi-arch: amd64 + arm/v7 + arm64 manifest list", "~40 MB on device (right blob pulled automatically)"],
];

const ARCH_BLUE = NAVY;
const ARCH_GREEN = "2E7D32";
const ARCH_GRAY = "8FA0AF";
const ARCH_GRAY_LINE = "B0B8C1";

function archBox(s, x, y, w, h, main, sub) {
  s.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: WHITE }, line: { color: ARCH_BLUE, width: 1.5 },
  });
  if (sub) {
    s.addText(main, {
      x, y: y + h * 0.1, w, h: h * 0.44, fontFace: FONT_HEAD, fontSize: 11.5, bold: true,
      color: DARKTEXT, align: "center", valign: "bottom", margin: 0,
    });
    s.addText(sub, {
      x, y: y + h * 0.54, w, h: h * 0.36, fontFace: FONT_BODY, fontSize: 9, italic: true,
      color: BODYGRAY, align: "center", valign: "top", margin: 0,
    });
  } else {
    s.addText(main, {
      x, y, w, h, fontFace: FONT_HEAD, fontSize: 11.5, bold: true,
      color: DARKTEXT, align: "center", valign: "middle", margin: 0,
    });
  }
}

function archFileBox(s, x, y, w, h, line1, line2) {
  s.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.04,
    fill: { color: "F2F8F3" }, line: { color: ARCH_GREEN, width: 1.5 },
  });
  s.addText(line2 ? `${line1}\n${line2}` : line1, {
    x, y, w, h, fontFace: FONT_MONO, fontSize: 9,
    color: DARKTEXT, align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.05,
  });
}

function archVolumeBox(s, x, y, w, h, main, sub) {
  s.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.04,
    fill: { color: "F4F6F8" }, line: { color: ARCH_GRAY_LINE, width: 1.25, dashType: "dash" },
  });
  s.addText(main, {
    x, y: y + h * 0.1, w, h: h * 0.44, fontFace: FONT_HEAD, fontSize: 10.5, bold: true,
    color: DARKTEXT, align: "center", valign: "bottom", margin: 0,
  });
  s.addText(sub, {
    x, y: y + h * 0.54, w, h: h * 0.36, fontFace: FONT_BODY, fontSize: 8.5, italic: true,
    color: BODYGRAY, align: "center", valign: "top", margin: 0,
  });
}

function archArrow(s, x, y, w, h, label) {
  s.addText(label, {
    x, y, w, h: h * 0.4, fontFace: FONT_BODY, fontSize: 8.5, italic: true,
    color: ARCH_GRAY, align: "center", valign: "bottom", margin: 0,
  });
  s.addText("→", {
    x, y: y + h * 0.4, w, h: h * 0.6, fontFace: FONT_BODY, fontSize: 20,
    color: ARCH_GRAY_LINE, align: "center", valign: "middle", margin: 0,
  });
}

function archOuter(s, x, y, w, h, label) {
  s.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: "FAFBFC" }, line: { color: ARCH_BLUE, width: 1.5, dashType: "dash" },
  });
  s.addText(label, {
    x, y: y - 0.26, w, h: 0.24, fontFace: FONT_BODY, fontSize: 10, bold: true,
    color: ARCH_BLUE, align: "center", valign: "bottom", margin: 0,
  });
}

// Reserves 0.3 above the outer box for its label and 0.3 below for the port row.
function drawSingleArch(s, x, y, w, h, d) {
  const outerH = h - 0.6, outerY = y + 0.3;
  archOuter(s, x, outerY, w, outerH, d.outerLabel);

  const boxW = w * 0.15, arrowW = w * 0.11, fileW = w * 0.24;
  const totalW = boxW * 2 + arrowW * 2 + fileW;
  const padX = (w - totalW) / 2;
  const boxH = outerH * 0.6, boxY = outerY + (outerH - boxH) / 2;

  let cx = x + padX;
  archBox(s, cx, boxY, boxW, boxH, d.box1Main, d.box1Sub);
  cx += boxW;
  archArrow(s, cx, boxY, arrowW, boxH, "writes");
  cx += arrowW;
  archFileBox(s, cx, boxY, fileW, boxH, d.fileLine1, d.fileLine2);
  cx += fileW;
  archArrow(s, cx, boxY, arrowW, boxH, "serves");
  cx += arrowW;
  archBox(s, cx, boxY, boxW, boxH, d.box2Main, d.box2Sub);

  s.addText(d.portRow, {
    x, y: y + h - 0.24, w, h: 0.24, fontFace: FONT_BODY, fontSize: 10.5, bold: true,
    color: DARKTEXT, align: "center", margin: 0,
  });
}

// Same vertical budget as drawSingleArch: two arch-outer boxes flanking a volume connector.
function drawTwoArch(s, x, y, w, h, d) {
  const outerH = h - 0.6, outerY = y + 0.3;

  const colW = w * 0.28, connW = w - colW * 2;
  const boxH = outerH * 0.55, boxY = outerY + (outerH - boxH) / 2;
  const boxW = colW * 0.7;

  archOuter(s, x, outerY, colW, outerH, d.leftLabel);
  archBox(s, x + (colW - boxW) / 2, boxY, boxW, boxH, d.leftBoxMain, d.leftBoxSub);

  const connX = x + colW;
  archOuter(s, connX + connW, outerY, colW, outerH, d.rightLabel);
  archBox(s, connX + connW + (colW - boxW) / 2, boxY, boxW, boxH, d.rightBoxMain, d.rightBoxSub);

  const arrowW = connW * 0.28, volW = connW - arrowW * 2;
  let cx = connX;
  archArrow(s, cx, boxY, arrowW, boxH, "writes");
  cx += arrowW;
  archVolumeBox(s, cx, boxY, volW, boxH, d.volMain, d.volSub);
  cx += volW;
  archArrow(s, cx, boxY, arrowW, boxH, "reads");

  s.addText(d.portRow, {
    x, y: y + h - 0.24, w, h: 0.24, fontFace: FONT_BODY, fontSize: 10.5, bold: true,
    color: DARKTEXT, align: "center", margin: 0,
  });
}

function comparisonSlide(pres, stepIdx, title, archNote, diagram, changedNote, notes) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  contentTitle(s, title);

  s.addText(archNote, {
    x: 0.7, y: 1.2, w: 11.9, h: 0.25, fontFace: FONT_BODY, fontSize: 13, italic: true,
    color: BODYGRAY, margin: 0,
  });

  const diagX = 0.9, diagY = 1.55, diagW = 11.5, diagH = 1.55;
  if (diagram.type === "single") {
    drawSingleArch(s, diagX, diagY, diagW, diagH, diagram);
  } else {
    drawTwoArch(s, diagX, diagY, diagW, diagH, diagram);
  }

  const rows = STEP_ROWS.slice(0, stepIdx + 1).map((r, i) => {
    const isLast = i === stepIdx;
    return r.map(cell => ({
      text: cell,
      options: {
        fontFace: isLast ? FONT_HEAD : FONT_BODY,
        bold: isLast,
        color: isLast ? WHITE : DARKTEXT,
        fill: { color: isLast ? RED : (i % 2 === 0 ? "F4F6F8" : WHITE) },
        fontSize: 12,
      },
    }));
  });
  const header = ["Step", "Change", "Image Size"].map(h => ({
    text: h, options: { bold: true, color: WHITE, fill: { color: NAVY }, fontSize: 12 },
  }));

  const tableY = 3.25, rowH = 0.38;
  s.addTable([header, ...rows], {
    x: 0.7, y: tableY, w: 11.9, h: rowH * (rows.length + 1),
    colW: [1.3, 7.4, 3.2],
    border: { type: "solid", color: "DDDDDD", pt: 0.5 },
    autoPage: false,
    valign: "middle",
  });

  if (changedNote) {
    s.addText(changedNote, {
      x: 0.7, y: tableY + rowH * (rows.length + 1) + 0.15, w: 11.9, h: 0.35, fontFace: FONT_BODY, fontSize: 12, italic: true,
      color: MUTED2(), margin: 0,
    });
  }

  footer(s);
  if (notes) s.addNotes(notes);
  return s;
}
function MUTED2() { return "6B7280"; }

// ---------- Deployment section slides ----------

function onlineOfflineSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  contentTitle(s, "Online & Offline Updates");

  const cols = [
    { title: "🌐 Online", items: [
      "Signed, multi-arch registry",
      "Pull-through cache saves bandwidth",
      "Staggered rollout · canary devices for large fleets",
    ] },
    { title: "💾 Offline / Air-Gapped", items: [
      "docker save/load via USB or SD card",
      "Verify signature before load",
      "Keep previous · roll back on health check failure",
    ] },
  ];
  const colW = 5.6, gap = 0.4;
  cols.forEach((c, i) => {
    const x = 0.7 + i * (colW + gap);
    s.addShape("roundRect", {
      x, y: 1.4, w: colW, h: 2.6, rectRadius: 0.08,
      fill: { color: "F4F6F8" }, line: { type: "none" },
    });
    s.addText(c.title, {
      x: x + 0.3, y: 1.6, w: colW - 0.6, h: 0.45, fontFace: FONT_HEAD, fontSize: 17,
      bold: true, color: RED, margin: 0,
    });
    s.addText(c.items.map((it, j) => ({ text: it, options: { bullet: true, breakLine: j < c.items.length - 1, paraSpaceAfter: 8 } })), {
      x: x + 0.3, y: 2.15, w: colW - 0.6, h: 1.7, fontFace: FONT_BODY, fontSize: 13.5,
      color: BODYGRAY, margin: 0, valign: "top",
    });
  });

  s.addText("For both:", {
    x: 0.7, y: 4.3, w: 11.4, h: 0.4, fontFace: FONT_HEAD, fontSize: 16, bold: true,
    color: DARKTEXT, margin: 0,
  });
  const both = [
    "🩺 Health checks — verify new container before retiring old",
    "↩️ Rollback — keep previous image; restart on failure",
    "🔏 Signature verification — confirm origin before load",
  ];
  s.addText(both.map((b, i) => ({ text: b, options: { bullet: true, breakLine: i < both.length - 1, paraSpaceAfter: 8 } })), {
    x: 0.9, y: 4.8, w: 11.0, h: 1.6, fontFace: FONT_BODY, fontSize: 14,
    color: BODYGRAY, margin: 0, valign: "top",
  });

  footer(s);
  s.addNotes("Emphasize: the online/offline split is about the delivery mechanism only — health checks, rollback, and signature verification apply to both paths identically.");
  return s;
}

function ladderSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  contentTitle(s, "Embedded Integration Ladder");
  s.addText("Pick the right rung for your application:", {
    x: 0.7, y: 1.15, w: 11.5, h: 0.4, fontFace: FONT_BODY, fontSize: 15,
    color: BODYGRAY, margin: 0,
  });

  const rungs = [
    { label: "Groups & permissions", desc: "dialout, gpio, i2c — no kernel privileges needed", color: "2E7D32" },
    { label: "--device", desc: "Single device node; nothing else exposed (/dev/ttyUSB0, CAN, I2C/SPI)", color: "2E7D32" },
    { label: "--device-cgroup-rule", desc: "Device class by major number — Wayland kiosk: c 226:* rmw, /dev/dri, --shm-size", color: "B8860B" },
    { label: "Linux capabilities", desc: "--cap-drop ALL --cap-add CAP_NET_ADMIN — surgical and auditable", color: "B8860B" },
    { label: "⛔ --privileged", desc: "Full host kernel access — almost never the right answer", color: RED },
  ];
  const y0 = 1.7, rh = 0.86, gap = 0.08;
  rungs.forEach((r, i) => {
    const y = y0 + i * (rh + gap);
    s.addShape("roundRect", {
      x: 1.4, y, w: 10.5, h: rh, rectRadius: 0.05,
      fill: { color: "F4F6F8" }, line: { color: r.color, width: 1.5 },
    });
    s.addText(r.label, {
      x: 1.7, y: y + 0.06, w: 9.9, h: 0.35, fontFace: FONT_HEAD, fontSize: 14, bold: true,
      color: r.color, margin: 0,
    });
    s.addText(r.desc, {
      x: 1.7, y: y + 0.4, w: 9.9, h: 0.4, fontFace: FONT_MONO, fontSize: 11,
      color: BODYGRAY, margin: 0,
    });
  });

  footer(s);
  s.addNotes("Walk this top to bottom. Land hard on --privileged being almost never the right answer — that's the payoff line.");
  return s;
}

function futureTopicsSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  contentTitle(s, "Future Topics");
  s.addText("Each deserves its own talk:", {
    x: 0.7, y: 1.15, w: 11.5, h: 0.4, fontFace: FONT_BODY, fontSize: 15,
    color: BODYGRAY, margin: 0,
  });
  const cols = [
    { title: "⚡ Performance & Footprint", items: [
      "Image size → OTA bandwidth & flash",
      "Startup time; avoid init overhead",
      "overlayfs on eMMC/SD I/O",
      "cgroups: pin cores, cap memory",
      "Pre-pull during maintenance windows",
    ] },
    { title: "🔐 Security & Supply Chain", items: [
      "Minimal images shrink CVE surface",
      "SBOMs (SPDX / CycloneDX)",
      "Image signing with Cosign / Sigstore",
      "Runtime hardening: read-only rootfs, drop caps",
      "Rootless runtimes",
    ] },
    { title: "🔍 Debugging in Production", items: [
      "Debug sidecar: share --pid, --net namespaces",
      ":debug tag adds a busybox shell",
      "Tooling containers: pull on demand",
      "Ephemeral debug containers; no restart needed",
    ] },
  ];
  const colW = 3.73, gap = 0.25;
  cols.forEach((c, i) => {
    const x = 0.7 + i * (colW + gap);
    s.addShape("roundRect", {
      x, y: 1.65, w: colW, h: 4.7, rectRadius: 0.08,
      fill: { color: "F4F6F8" }, line: { type: "none" },
    });
    s.addText(c.title, {
      x: x + 0.2, y: 1.85, w: colW - 0.4, h: 0.7, fontFace: FONT_HEAD, fontSize: 14,
      bold: true, color: RED, margin: 0,
    });
    s.addText(c.items.map((it, j) => ({ text: it, options: { bullet: true, breakLine: j < c.items.length - 1, paraSpaceAfter: 8 } })), {
      x: x + 0.2, y: 2.6, w: colW - 0.4, h: 3.5, fontFace: FONT_BODY, fontSize: 11.5,
      color: BODYGRAY, margin: 0, valign: "top",
    });
  });
  s.addText("Watch this space: this 2-part series is probably becoming a 3- or 4-parter.", {
    x: 0.7, y: 6.5, w: 11.5, h: 0.5, fontFace: FONT_BODY, fontSize: 13, italic: true,
    color: RED, bold: true, margin: 0,
  });
  footer(s);
  s.addNotes("Don't dive deep on any of these — this is a teaser slide for the next talk in the series, keep it brisk.");
  return s;
}

function wrapupSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: WHITE };
  contentTitle(s, "Putting It All Together");

  s.addShape("roundRect", {
    x: 0.7, y: 1.4, w: 3.7, h: 5.0, rectRadius: 0.08,
    fill: { color: "FBEAEA" }, line: { type: "none" },
  });
  s.addText("⚠️ We started with…", {
    x: 0.95, y: 1.6, w: 3.2, h: 0.45, fontFace: FONT_HEAD, fontSize: 15, bold: true,
    color: RED, margin: 0,
  });
  const before = ["Single, naive image", "498 MB · x86 only", "Runs as root", "No update strategy", "Full device access or nothing"];
  s.addText(before.map((b, i) => ({ text: b, options: { bullet: true, breakLine: i < before.length - 1, paraSpaceAfter: 8 } })), {
    x: 0.95, y: 2.15, w: 3.2, h: 4.0, fontFace: FONT_BODY, fontSize: 13,
    color: BODYGRAY, margin: 0, valign: "top",
  });

  s.addShape("roundRect", {
    x: 4.65, y: 1.4, w: 7.95, h: 5.0, rectRadius: 0.08,
    fill: { color: "EAF6EC" }, line: { type: "none" },
  });
  s.addText("✅ We end with…", {
    x: 4.9, y: 1.6, w: 7.4, h: 0.45, fontFace: FONT_HEAD, fontSize: 15, bold: true,
    color: "2E7D32", margin: 0,
  });
  const domains = [
    ["🏗️ Image Design", "498 MB → ~40 MB · multi-stage · 3 platforms · nonroot distroless"],
    ["📡 Deployment", "Layer-aware OTA · online & offline · rollback on failed health check"],
    ["🔌 Integration", "Least-privilege device access · capabilities over --privileged"],
    ["🔬 Coming next", "Debug sidecars · SBOMs · image signing · performance & footprint"],
  ];
  let dy = 2.25;
  domains.forEach(([label, desc]) => {
    s.addText(label, {
      x: 4.9, y: dy, w: 7.4, h: 0.35, fontFace: FONT_HEAD, fontSize: 13, bold: true,
      color: "2E7D32", margin: 0,
    });
    s.addText(desc, {
      x: 4.9, y: dy + 0.32, w: 7.4, h: 0.55, fontFace: FONT_BODY, fontSize: 12,
      color: BODYGRAY, margin: 0,
    });
    dy += 1.0;
  });

  s.addText("Key takeaway: Containers can be right for embedded — but only if we design with embedded constraints in mind.", {
    x: 0.7, y: 6.55, w: 11.9, h: 0.6, fontFace: FONT_BODY, fontSize: 13, italic: true,
    color: DARKTEXT, bold: true, margin: 0,
  });

  footer(s);
  s.addNotes("This is the payoff slide — slow down, this is the one people should photograph. Land the key takeaway line deliberately.");
  return s;
}

function thankYouSlide(pres) {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addText("THANK YOU", {
    x: 0.9, y: 2.3, w: 11.0, h: 1.1, fontFace: FONT_HEAD, fontSize: 44, bold: true,
    color: WHITE, margin: 0,
  });
  s.addText("FOR YOUR INTEREST", {
    x: 0.9, y: 3.15, w: 11.0, h: 0.6, fontFace: FONT_HEAD, fontSize: 22,
    color: ICE, margin: 0,
  });
  s.addText("www.toradex.com   |   www.torizon.io\ndeveloper.toradex.com   |   community.toradex.com", {
    x: 0.9, y: 4.1, w: 11.0, h: 0.9, fontFace: FONT_BODY, fontSize: 16,
    color: MUTED, margin: 0, lineSpacingMultiple: 1.4,
  });
  s.addImage({ path: ASSETS + "toradex-logo.png", x: 0.9, y: 5.6, w: 2.6, h: 0.635 });
  s.addImage({ path: ASSETS + "EWLogo.png", x: W - 2.9, y: 5.6, w: 2.2, h: 0.315 });
  footer(s, { dark: true });
  s.addNotes("Stay up for Q&A — track has shared Q&A after all 3 speakers.");
}

async function main() {
  const pres = new pptxgen();
  pres.defineLayout({ name: "EWNA", width: W, height: H });
  pres.layout = "EWNA";

  titleSlide(pres);
  speakerSlide(pres);
  whyBeyondSlide(pres);

  sectionSlide(pres, "Image Design", "Transition slide — Image Design section. Beat before diving into the beginner setup.");

  codeSlide(pres, "Beginner Setup",
    [
      "Single Dockerfile:",
      { text: "Full Debian image", sub: true },
      { text: "Build tools included", sub: true },
      { text: "Intermediate artifacts included", sub: true },
      "Problems:",
      { text: "498 MB image", sub: true },
      { text: "Large attack surface", sub: true },
      { text: "No separation of concerns", sub: true },
      { text: "Runs as root", sub: true },
    ],
    "Dockerfile",
    [
      "FROM debian:trixie",
      "",
      "RUN apt-get update && apt-get install -y \\",
      "    build-essential \\",
      "    nginx \\",
      "    && rm -rf /var/lib/apt/lists/*",
      "",
      "WORKDIR /app",
      "COPY sensor.c .",
      "RUN gcc -o sensor sensor.c",
      "",
      "COPY html/ /var/www/html/",
      "COPY entrypoint.sh .",
      "RUN chmod +x entrypoint.sh",
      "",
      "EXPOSE 80",
      'CMD ["/app/entrypoint.sh"]',
    ],
    ["Key idea: What you build with ≠ what you need to run."],
    "This is the strawman — go quick, the audience should recognize this pattern immediately."
  );

  comparisonSlide(pres, 0, "Step 0: Running Comparison",
    "Toradex Verdin i.MX8M Mini + Dahlia Carrier Board, eMMC storage",
    {
      type: "single",
      outerLabel: "debian:trixie · single container · runs as root",
      box1Main: "sensor", box1Sub: "C daemon",
      fileLine1: "/var/www/html/", fileLine2: "data.json",
      box2Main: "nginx", box2Sub: null,
      portRow: "↓  port 80 → Browser",
    },
    "Baseline established: 498 MB, single container, root. This is the number every later step improves on."
  );

  codeSlide(pres, "Smarter Builds: Multi-Stage Patterns",
    [
      "Multi-stage builds:",
      { text: "builder — toolchains, headers, debug tools", sub: true },
      { text: "runtime — only what you need to run", sub: true },
      "Benefits:",
      { text: "Smaller images", sub: true },
      { text: "Fewer CVEs", sub: true },
      { text: "Fewer packages on device", sub: true },
      "Common patterns:",
      { text: "Strip binaries in builder", sub: true },
      { text: "Separate debug vs production image", sub: true },
    ],
    "Dockerfile",
    [
      "# -- Builder stage --------------------",
      "FROM debian:bookworm AS builder",
      "",
      "RUN apt-get update && apt-get install -y \\",
      "    build-essential cmake libssl-dev",
      "",
      "COPY src/ /src/",
      "WORKDIR /src",
      "RUN cmake -B build && \\",
      "    cmake --build build && \\",
      "    strip build/dashboard",
      "",
      "# -- Runtime stage --------------------",
      "FROM debian:bookworm-slim",
      "",
      "COPY --from=builder \\",
      "    /src/build/dashboard \\",
      "    /usr/local/bin/",
      "",
      'CMD ["/usr/local/bin/dashboard"]',
    ],
    [
      "Key idea: Use the builder as a workshop, the runtime as the shipping container.",
      "Key idea #2: Container images as code.",
    ],
    null
  );

  comparisonSlide(pres, 1, "Step 1: Running Comparison",
    "Same app, same board — only the Dockerfile changed",
    {
      type: "single",
      outerLabel: "debian:trixie-slim · single container · runs as root",
      box1Main: "sensor", box1Sub: "C daemon",
      fileLine1: "/var/www/html/", fileLine2: "data.json",
      box2Main: "nginx", box2Sub: null,
      portRow: "↓  port 80 → Browser",
    },
    null, null
  );

  codeSlide(pres, "Microservices",
    [
      "Monolithic problems:",
      { text: "Single failure domain", sub: true },
      { text: "One crash takes everything down", sub: true },
      { text: "Update one → rebuild all", sub: true },
      { text: "No independent resource limits", sub: true },
      "One process per container:",
      { text: "Own image, lifecycle, restart policy", sub: true },
      { text: "Share data via named volumes or networking", sub: true },
      "Common 3-service pattern: sensor + api + frontend (here: 2 services suffice)",
    ],
    "docker-compose.yml",
    [
      "services:",
      "  sensor:",
      "    image: dashboard-step2-sensor",
      "    volumes:",
      "      - dashboard-data:/data",
      "    restart: unless-stopped",
      "",
      "  nginx:",
      "    image: dashboard-step2-nginx",
      "    volumes:",
      "      - dashboard-data:/data:ro",
      "    ports:",
      '      - "8080:80"',
      "    restart: unless-stopped",
      "",
      "volumes:",
      "  dashboard-data:",
    ],
    ["Key idea: Containers as unit of deployment, not just packaging."],
    null
  );

  comparisonSlide(pres, 2, "Step 2: Running Comparison",
    "Split into two containers: sensor writes JSON to a named volume; nginx reads it",
    {
      type: "two",
      leftLabel: "sensor · trixie-slim",
      leftBoxMain: "sensor", leftBoxSub: "C daemon",
      volMain: "dashboard-data", volSub: "named volume",
      rightLabel: "nginx · trixie-slim",
      rightBoxMain: "nginx", rightBoxSub: null,
      portRow: "↓  port 8080 → Browser",
    },
    null, null
  );

  codeSlide(pres, "Minimal Base Images: Distroless / Scratch",
    [
      "Traditional bases bundle shell, package manager, libraries",
      "Minimal options:",
      { text: "Distroless (Google) — no shell, no package manager, just runtime libs", sub: true },
      { text: "Chiselled (Canonical) — Ubuntu stripped to essentials", sub: true },
      { text: "scratch — empty; static binaries only", sub: true },
      "Embedded benefits: smaller flash footprint, fewer packages to patch, smaller CVE surface",
      "Distroless variants: base (glibc), static (static binaries), cc (glibc + libstdc++)",
    ],
    "web/Dockerfile",
    [
      "# -- Builder ---------------------------",
      "FROM golang:alpine AS builder",
      "",
      "WORKDIR /build",
      "COPY go.mod main.go ./",
      "RUN CGO_ENABLED=0 GOOS=linux \\",
      '    go build -ldflags="-s -w" -o web .',
      "",
      "# -- Runtime: truly nothing ------------",
      "FROM gcr.io/distroless/static",
      "",
      "COPY --from=builder /build/web /web",
      "COPY html/ /www/",
      "",
      'CMD ["/web"]',
    ],
    ["Tradeoff: Great for production; need a separate path for debugging."],
    null
  );

  comparisonSlide(pres, 3, "Step 3: Running Comparison",
    "Same architecture as step 2 — only the FROM lines changed",
    {
      type: "two",
      leftLabel: "sensor · distroless/base",
      leftBoxMain: "sensor", leftBoxSub: "C daemon",
      volMain: "dashboard-data", volSub: "named volume",
      rightLabel: "web · distroless/static",
      rightBoxMain: "web", rightBoxSub: "Go fileserver",
      portRow: "↓  port 8080 → Browser",
    },
    null, null
  );

  codeSlide(pres, "Non-root Containers",
    [
      "Root inside a container is still a risk:",
      { text: "Container escape → root on host", sub: true },
      { text: "Accidental writes to system paths", sub: true },
      "Run as an unprivileged user:",
      { text: "USER instruction in the Dockerfile", sub: true },
      { text: "Distroless :nonroot — uid 65532, no extra steps", sub: true },
      "App requirements:",
      { text: "No privileged ports (< 1024)", sub: true },
      { text: "No writes to root-owned paths", sub: true },
      { text: "Volumes writable by uid 65532", sub: true },
    ],
    "sensor/Dockerfile",
    [
      "# -- Builder ---------------------------",
      "FROM debian:trixie-slim AS builder",
      "",
      "RUN apt-get update && apt-get install -y \\",
      "    build-essential \\",
      "    && rm -rf /var/lib/apt/lists/*",
      "",
      "COPY sensor.c .",
      "RUN gcc -o sensor sensor.c && strip sensor",
      "",
      "# -- Runtime: nonroot ------------------",
      "FROM gcr.io/distroless/base:nonroot",
      "",
      "COPY --from=builder /sensor /sensor",
      "",
      'CMD ["/sensor", "/data/sensor.json"]',
    ],
    ["Key idea: Least privilege applies inside containers too."],
    null
  );

  comparisonSlide(pres, 4, "Step 4: Running Comparison",
    "Same architecture as step 3 — only the image tags changed",
    {
      type: "two",
      leftLabel: "sensor · distroless/base:nonroot",
      leftBoxMain: "sensor", leftBoxSub: "C daemon",
      volMain: "dashboard-data", volSub: "named volume",
      rightLabel: "web · distroless/static:nonroot",
      rightBoxMain: "web", rightBoxSub: "Go fileserver",
      portRow: "↓  port 8080 → Browser",
    },
    null, null
  );

  codeSlide(pres, "Multi-Arch",
    [
      "One tag, multiple platform blobs (OCI manifest list):",
      { text: "docker pull selects the right arch", sub: true },
      { text: "No per-device Dockerfile changes", sub: true },
      "How: docker buildx with a multi-platform builder, QEMU binfmt (or native builders), a registry",
      "Targets:",
      { text: "linux/amd64 — dev machines", sub: true },
      { text: "linux/arm/v7 — ARM 32-bit boards (Apalis i.MX6)", sub: true },
      { text: "linux/arm64 — AArch64 boards (Verdin iMX8M Mini)", sub: true },
    ],
    "Makefile",
    [
      "REGISTRY := ghcr.io/example/dashboard",
      "TAG      := step5",
      "PLATFORMS := linux/amd64,linux/arm/v7,linux/arm64",
      "",
      "build:",
      "\tdocker buildx build \\",
      "\t    --platform $(PLATFORMS) --push \\",
      "\t    -t $(REGISTRY)/sensor:$(TAG) sensor/",
      "\tdocker buildx build \\",
      "\t    --platform $(PLATFORMS) --push \\",
      "\t    -t $(REGISTRY)/web:$(TAG) web/",
      "",
      "deploy:",
      "\tscp docker-compose.yml \\",
      "\t    $(BOARD_USER)@$(BOARD_HOST):/tmp/",
      "\tssh $(BOARD_USER)@$(BOARD_HOST) \\",
      '\t    "docker compose -f /tmp/docker-compose.yml pull && up -d"',
    ],
    ["Key idea: One image name serves every architecture — the registry does the dispatch."],
    null
  );

  comparisonSlide(pres, 5, "Step 5: Running Comparison",
    "Same app, same Dockerfiles — only the build command changed",
    {
      type: "two",
      leftLabel: "sensor · distroless/base:nonroot",
      leftBoxMain: "sensor", leftBoxSub: "C daemon",
      volMain: "dashboard-data", volSub: "named volume",
      rightLabel: "web · distroless/static:nonroot",
      rightBoxMain: "web", rightBoxSub: "Go fileserver",
      portRow: "↓  port 8080 → Browser · same image on amd64 / arm/v7 / arm64",
    },
    "This is the end of the image-design arc: 498 MB → ~40 MB. Pause here before moving to Deployment."
  );

  sectionSlide(pres, "Deployment & Updates", "Transition — Deployment & Updates section.");

  codeSlide(pres, "Layer Reuse",
    [
      "Stable base image + app layer on top:",
      { text: "Only the app layer ships on update", sub: true },
      "Anti-pattern: RUN apt update && apt upgrade in every build",
      { text: "Busts the cache above it", sub: true },
      "Change one line in sensor.c → rebuild → push",
      { text: "Device pulls only the app layer (a few kB) of a 35 MB image", sub: true },
    ],
    "board terminal",
    [
      "$ docker pull \\",
      "    ghcr.io/example/dashboard/sensor:v2",
      "",
      "v2: Pulling from example/dashboard/sensor",
      "a8ca11554fce: Already exists",
      "3d8f1b4c0b9e: Already exists",
      "b2e7f9d1a3c4: Already exists",
      "9f4e2b8d6a1c: Pull complete",
      "Digest: sha256:3f7a2d...",
      "Status: Downloaded newer image",
    ],
    [
      "Key idea: The registry is a content-addressed patch system — you only pay for what changed.",
      "Key idea #2: Frequently-changing instructions go last — everything above is reused.",
    ],
    null
  );

  onlineOfflineSlide(pres);
  ladderSlide(pres);

  codeSlide(pres, "GPU Integration: Nvidia Container Toolkit",
    [
      "GPU access is device passthrough at scale:",
      { text: "Kernel driver + libs + CUDA runtime + firmware, not one /dev node", sub: true },
      "nvidia-container-toolkit hooks container creation, injects libs + device nodes:",
      { text: "docker: --gpus all  ·  Jetson (L4T): --runtime nvidia", sub: true },
      "Jetson vs discrete GPU:",
      { text: "Jetson: unified memory, driver locked to JetPack version", sub: true },
      { text: "Discrete (dGPU): own VRAM, swappable host driver", sub: true },
      "CDI (Container Device Interface) — CNCF spec, vendor-neutral:",
      { text: "nvidia-ctk cdi generate  ·  --device nvidia.com/gpu=all  ·  same syntax on Podman/containerd/CRI-O", sub: true },
    ],
    "board terminal",
    [
      "# Docker + nvidia-container-toolkit (legacy hook)",
      "$ docker run --rm --gpus all \\",
      "    nvidia/cuda:12.4-base nvidia-smi",
      "",
      "# Jetson (L4T) — csv mount plugin, no discrete driver",
      "$ docker run --rm --runtime nvidia \\",
      "    dustynv/l4t-pytorch:r36.2.0 \\",
      '    python3 -c "import torch; print(torch.cuda.is_available())"',
      "",
      "# CDI — vendor-neutral, runtime-agnostic",
      "$ nvidia-ctk cdi generate \\",
      "    --output=/etc/cdi/nvidia.yaml",
      "$ podman run --device nvidia.com/gpu=all \\",
      "    nvidia/cuda:12.4-base nvidia-smi",
    ],
    ["Key idea: The toolkit exists because a GPU driver stack is too complex for a single --device flag."],
    "New for ewNA — audience will have just seen several Nvidia announcements at the show; land the Jetson vs dGPU distinction, that's the one that trips people up."
  );

  futureTopicsSlide(pres);
  wrapupSlide(pres);
  thankYouSlide(pres);

  await pres.writeFile({ fileName: __dirname + "/output.pptx" });
  console.log("done, slides:", slideCounter);
}

main().catch(e => { console.error(e); process.exit(1); });

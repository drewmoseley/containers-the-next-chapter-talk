% Containers for Embedded Linux;<br>The Next Chapter
% <img src="img/headshot.png" alt="Drew Moseley"><span><small>Presented by</small><strong>Drew Moseley</strong>Torizon Professional Services, Staff Developer<br>Toradex</span>
% Embedded World Conference and Expo – March 12, 2026

---

## WITH YOU TODAY… {.speaker-slide}

<div class="speaker-cards">
<div class="speaker-card">
<img src="img/headshot.png" alt="Drew Moseley">
<p class="speaker-name">Drew Moseley</p>
<p class="speaker-role">Torizon Professional Services, Staff Developer</p>
<p class="speaker-company">Toradex</p>
</div>
</div>

<p class="speaker-location">We're located in Lucerne, Switzerland</p>

---

## Why Containers *Beyond* the Basics?

We already know: `docker build`, `docker run`, basic images. Embedded is different:

<div class="constraint-cards">
<div class="constraint-card fragment"><div class="constraint-icon">💾</div>
<div class="constraint-title">Storage</div>
<div class="constraint-desc">Flash is small</div></div>
<div class="constraint-card fragment"><div class="constraint-icon">📡</div>
<div class="constraint-title">Network</div>
<div class="constraint-desc">Connectivity is unreliable</div></div>
<div class="constraint-card fragment"><div class="constraint-icon">⚡</div>
<div class="constraint-title">Power</div>
<div class="constraint-desc">Can fail at any time</div></div>
<div class="constraint-card fragment"><div class="constraint-icon">🕐</div>
<div class="constraint-title">Longevity</div>
<div class="constraint-desc">Devices live for years</div></div>
</div>

---

## Meta-Talk: A Note

- This talk was also an excuse to experiment with new tools:
  - Slides authored in **Markdown** (not PowerPoint)
  - Presented with **Reveal.js** in the browser
  - Built with **pandoc** + a simple **Makefile**
  - Developed with help from **AI** (Claude Code)
  - Tight integration into bot Visual Studio Code and Emacs
- The source and examples are on [GitHub](https://github.com/drewmoseley/containers-the-next-chapter-talk)<sup>1</sup> if you're curious

<div class="right-logos">
<img src="img/markdown-color.svg" title="Markdown">
<img src="img/revealdotjs-color.svg" title="Reveal.js">
<img src="img/emacs-color.svg" title="GNU Emacs">
<img src="img/vscode.svg" title="VS Code">
<img src="img/claude-color.svg" title="Claude Code">
</div>

<p class="slide-footnote"><sup>1</sup> https://github.com/drewmoseley/containers-the-next-chapter-talk</p>

---

## Step 0: Running Example

- Toradex Verdin i.MX8M Mini + Dahlia Carrier Board, eMMC storage

<div class="arch-diagram">
<div class="arch-outer">
<div class="arch-outer-label">debian:trixie &nbsp;·&nbsp; single container &nbsp;·&nbsp; runs as root</div>
<div class="arch-services">
<div class="arch-box">sensor<small>C daemon</small></div>
<div class="arch-arrow"><span>writes</span><span class="arch-shaft">→</span></div>
<div class="arch-file-box">/var/www/html/<br>data.json</div>
<div class="arch-arrow"><span>serves</span><span class="arch-shaft">→</span></div>
<div class="arch-box">nginx</div>
</div>
</div>
<div class="arch-port-row">↓ &nbsp; port 80 → Browser</div>
</div>

| Step | Change | Image Size |
| ---- | ------ | ---------- |
| step0 | Baseline: single-stage, debian:trixie, build tools included | 498 MB |

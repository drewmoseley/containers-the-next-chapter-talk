% Beyond Basic Containers for Embedded Linux
% Drew Moseley
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

- We already know:
  - `Dockerfile`, `docker run`, basic images
- Embedded questions are different:
  - Flash is small
  - Networks are flaky
  - Devices live for *years*
- Goal of this talk:
  - Take a naive embedded container setup
  - Turn it into something production-grade
  - Focus on size, performance, and lifecycle
  - _Basic_ security will be discussed
- Other topics
  - Reliable update delivery
  - Additional tools
  - CVE scanning
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

## Running Example

- Simple embedded Linux device:
  - Toradex Verdin i.MX8M Mini + Dahlia Carrier Board
  - eMMC for storage
  - Flaky Network
  - Flaky Power
- Baseline:
  - Single container running a compiled application
  - Built only for target arch
  - Runs as root, based on Debian Trixie
- We will:
  - Refine build
  - Convert to multiple services
  - Improve performance
  - Harden security

# containers-embedded-talk — Claude guidance

@infra/CLAUDE.md

Talk: **Beyond Basic Containers for Embedded Linux**
Author: Drew Moseley (Toradex)
Venue: Embedded World 2026

See `infra/CLAUDE.md` for the full slide authoring system reference (format,
build commands, manage_slides.py, base CSS classes).

---

## Memory

Claude memory for this project lives in `.claude/memory/` within the repo (not in
`~/.claude/projects/`). This keeps it portable across machines via SyncThing.
Always read from and write memory to `.claude/memory/MEMORY.md` and
`.claude/memory/*.md`.

---

## Talk-specific structure

```text
sections/
  001-intro.md        title + speaker bio + meta-talk note
  002-image-design.md image design section (multi-stage, distroless, non-root, multi-arch)
  003-deployment.md   deployment section (updates, registries)
  004-integration.md  hardware integration section
  005-future-topics.md future topics
  008-wrap-up.md      wrap-up / before-after summary
  009-thank-you.md    thank-you slide
  010-backup.md       backup slides

img/
  title-slide-image.png   right-half illustration on title slide
  thank-you-slide.jpg     full-bleed background on thank-you slide
  main-slide-background.png  used by infra/custom.css on all content slides
  headshot.png            speaker photo
  toradex-logo.png        Toradex logo (TITLE_LOGOS)
  EWLogo.png              Embedded World logo (TITLE_LOGOS)
  (various SVG tool logos: markdown, revealdotjs, emacs, vscode, claude, github, linkedin, x, mastodon, email)
```

---

## Extra CSS classes (talk-extras.css)

### Section title slides

```markdown
## Image Design {.section-title}
```

Centers heading vertically and horizontally with a green underline border.
Large (3.5em), bold, Toradex blue.

### Constraint cards (2×2 grid)

```html
<div class="constraint-cards">
  <div class="constraint-card fragment">
    <div class="constraint-icon">💾</div>
    <div class="constraint-title">Storage</div>
    <div class="constraint-desc">Flash is small</div>
  </div>
  <!-- repeat for each card -->
</div>
```

### Two-column layout with code window

```markdown
:::: {.slide-columns}
::: {.slide-col-left}
- Bullet list content
:::
::: {.slide-col-right}
::::: {.code-window}
:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[Filename]{.cw-filename}
::::

~~~
code here
~~~

:::::
:::
::::
```

### Code window (standalone)

Solarized Dark theme titlebar (macOS traffic-light dots).

```html
<div class="code-window">
  <div class="code-window-titlebar">
    <span class="cw-dot cw-red"></span>
    <span class="cw-dot cw-yellow"></span>
    <span class="cw-dot cw-green"></span>
    <span class="cw-filename">Filename</span>
  </div>
  <!-- fenced code block follows -->
</div>
```

Or in pandoc fenced-div syntax (as used in the sections):

```markdown
::::: {.code-window}
:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[Filename]{.cw-filename}
::::

~~~
code here
~~~

:::::
```

### Architecture diagrams

Single-container:

```html
<div class="arch-diagram">
  <div class="arch-outer">
    <div class="arch-outer-label">image · single container</div>
    <div class="arch-services">
      <div class="arch-box">process<small>description</small></div>
      <div class="arch-arrow"><span>writes</span><span class="arch-shaft">→</span></div>
      <div class="arch-file-box">/path/file</div>
      <div class="arch-arrow"><span>serves</span><span class="arch-shaft">→</span></div>
      <div class="arch-box">nginx</div>
    </div>
  </div>
  <div class="arch-port-row">↓ &nbsp; port 80 → Browser</div>
</div>
```

Two-container (microservices):

```html
<div class="arch-diagram">
  <div class="arch-two-col">
    <div class="arch-outer">...</div>
    <div class="arch-vol-connector">
      <div class="arch-arrow">...</div>
      <div class="arch-volume-box">volume-name<br><small>named volume</small></div>
      <div class="arch-arrow">...</div>
    </div>
    <div class="arch-outer">...</div>
  </div>
  <div class="arch-port-row">...</div>
</div>
```

### Step comparison table

Follow architecture diagram with a Markdown table that grows row-by-row:

```markdown
| Step | Change | Image Size |
| ---- | ------ | ---------- |
| step0 | Baseline description | 498 MB |
| step1 | Change description | 112 MB |
```

### Hardware integration components

- `.hw-cards` / `.hw-card` / `.hw-card-title` — 3-column card grid
- `.hw-danger` — red danger/warning strip below cards
- `.priv-ladder` / `.priv-rung` — privilege ladder (`.priv-safe`, `.priv-caution`, `.priv-danger`)
- `.boundary-diagram` / `.boundary-host` / `.boundary-container` / `.boundary-wall` — host/container boundary diagram

### Update flow components

- `.update-layout` / `.update-cards` / `.update-card` — 2-column update mode cards
- `.update-considerations` — full-width considerations panel below cards
- `.update-flows` / `.update-flow-row` — stacked flow rows

### Wrap-up before/after

```html
<div class="wrapup-layout">
  <div class="wrapup-before">
    <div class="wrapup-card-title">Before</div>
    <ul>...</ul>
  </div>
  <div class="wrapup-after">
    <div class="wrapup-domain">
      <span class="wrapup-domain-label">Domain</span>
      <span class="wrapup-domain-desc">Description of improvement</span>
    </div>
    <!-- repeat wrapup-domain for each row -->
  </div>
</div>
```

### Thank-you slide

Uses `id="thank-you-slide"` on the section (set via pandoc from the heading id).
Structure:

```html
<div class="ty-logo-bar"><img src="img/toradex-logo.png"></div>
<div class="ty-content">
  <div class="ty-heading">Thank You!</div>
  <div class="ty-urls">...</div>
</div>
<div class="ty-bottom"><img src="img/EWLogo.png"></div>
```

### Ecosystem layout

```html
<div class="ecosystem-layout">
  <div class="ecosystem-top">  <!-- 2-column grid -->
    <div class="eco-card"><div class="eco-card-title">Title</div><ul>...</ul></div>
    <div class="eco-card">...</div>
  </div>
  <div class="ecosystem-bottom">  <!-- 3-column grid -->
    <div class="eco-card">...</div>
    ...
  </div>
</div>
```

### Future topics grid

```html
<div class="topics-grid">  <!-- 3-column grid -->
  <div class="topic-col">
    <div class="topic-col-title">Title</div>
    <ul>...</ul>
  </div>
  ...
</div>
```

# AGENTS.md — containers-embedded-talk

## Known issue: two hand-authored slide sources

This talk has two independent, hand-authored slide sources that are
**not generated from each other** (see `CLAUDE.md` for the mechanics):

- `sections/*.md` — reveal.js/pandoc deck (`make reveal`, `make pdf`)
- `pptx/build.js` — pptxgenjs script (`make pptx`, `make pptx-pdf`)

Original plan was markdown+reveal only. For Embedded World North America
2026 the reveal template wasn't used (skipped markdown authoring, went
straight to PPTX to match the EWNA-required template), so `pptx/build.js`
was hand-authored instead and has since diverged from `sections/*.md` more
than once (see 2026-09-14 fix commit, e991994).

## Decision (2026-09-30): don't fix now, fix on next re-presentation

Considered migrating to [Marp](https://github.com/marp-team/marp-cli),
which — per `marp-talk-infra` (see
`/var/home/dmoseley/SyncThing/Documents/1-Projects/marp-talk-infra`) —
builds HTML **and** PPTX **and** PDF from one `slides.md` via
`npx @marp-team/marp-cli --pptx --pdf`, eliminating the dual-source drift
entirely. `torizon-customization-hardening-talk` already uses this
pattern successfully in the fleet.

Decided against migrating now: **this talk has already been delivered
twice** (EW Germany, EW North America). Not worth reauthoring past
material. If there's a future opportunity to re-present this talk,
migrate to marp-talk-infra then — it directly solves this problem. Until
then, when editing a slide, **update both sources** (see CLAUDE.md
checklist) rather than restructuring the build.

Cost of that future migration: the custom CSS components (constraint
cards, arch diagrams, code-window, priv-ladder, etc., documented in
CLAUDE.md) need porting to Marp's directive/HTML+CSS model — Marp allows
raw HTML+CSS per slide so it's a port, not a rewrite, but not free.

## Delivered-talk PDFs

`pdf/` holds the PDF actually associated with each show:

- `pdf/embedded-world-germany-2026.pdf` — built from the reveal.js deck
  (`make pdf`, from `sections/*.md`)
- `pdf/embedded-world-north-america-2026.pdf` — built from the pptx deck
  (`make pptx-pdf`, from `pptx/build.js`, converted via LibreOffice)

These are named by show, not by build tool — if a future talk instance
consolidates onto one source (e.g. Marp), keep naming PDFs by show/venue
in `pdf/`, not by which tool built them.

Note: `sections/001-intro.md`'s title-slide metadata (`% Embedded World
North America 2026 – Anaheim, CA...`) is **not rendered** in the actual
output — `talk-extras.css` hides `.reveal #title-slide p.date` via
`display: none !important`. Don't use that metadata line as evidence of
which show a build represents; it's leftover/unused text, not what was
shown on stage. (Found 2026-09-30 while trying to reconcile which PDF
matched which show — the metadata line looked like EWNA even for the
EW-Germany-delivered PDF.)

## Build fixes made 2026-09-30

- `make pdf` (decktape) was broken: decktape's bundled puppeteer-core
  wants a pinned Chrome build (146.x) that was never installed, and
  `npx --yes decktape ...` silently swallows its own crash/error output
  in this environment (confirmed: same command run via `node
  <path-to-decktape.js>` directly prints full errors/logs; via `npx`
  it exits 1 with zero stdout/stderr). Fix: added `decktape` as a local
  devDependency (root `package.json`, `PUPPETEER_SKIP_DOWNLOAD=true npm
  install` since we always override the Chrome path anyway), and the
  `pdf` Makefile target now invokes `node node_modules/decktape/decktape.js`
  directly with an explicit `--chrome-path` (found via `find
  $HOME/.cache/puppeteer/chrome -maxdepth 3 -name chrome -type f`,
  note: **maxdepth 3**, the binary is at
  `chrome/linux-<ver>/chrome-linux64/chrome`) and `--chrome-arg=--no-sandbox
  --chrome-arg=--disable-gpu` (needed in this container/sandbox
  environment).
- Added `make pptx-pdf`: converts `pptx/output.pptx` to PDF via
  `soffice --headless --convert-to pdf` (LibreOffice). Previously a
  manual, undocumented step.

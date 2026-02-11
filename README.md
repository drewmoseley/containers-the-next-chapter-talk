# Beyond Basic Containers for Embedded Linux

This repository contains the slide deck for the talk:

> **Beyond Basic Containers for Embedded Linux**  
> Author: Drew Moseley

Slides are authored in Markdown, split across multiple files under `slides/`,
and built into:

- reveal.js HTML for presenting
- Org mode for Emacs usage

## Layout

- `slides/` – individual Markdown slide sections
- `build/` – generated artifacts
  - `containers-embedded.html` – reveal.js slides
  - `containers-embedded.org` – Org mode export

## Building

You will need `pandoc` installed.

- Build reveal.js HTML:

    make reveal

  This generates `build/containers-embedded.html`.

- Build Org:

    make org

  This generates `build/containers-embedded.org`.

Both targets concatenate the `slides/*.md` files in numeric order and feed them
to pandoc.

You can tweak the `Makefile` variable `REVEALJS_URL` to use a local copy of
reveal.js if desired.

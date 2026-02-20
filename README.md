# Beyond Basic Containers for Embedded Linux

This repository contains the slide deck for the talk:

> **Beyond Basic Containers for Embedded Linux**
> Author: Drew Moseley

Slides are authored in Markdown, split across multiple files under `slides/`,
and built into:

- reveal.js HTML for presenting
- Org mode for Emacs usage

## Layout

- `slides/` – individual Markdown slide sections (named `NNN-slug.md`)
- `vendor/` – third-party dependencies (reveal.js)
- `build/` – generated artifacts (not committed)
  - `containers-embedded.html` – reveal.js slides
  - `containers-embedded.org` – Org mode export

## Dependencies

- **pandoc** – converts Markdown to HTML/Org output
- **Python 3** – required for `manage_slides.py`
- **reveal.js** – must be present at `vendor/reveal.js/` (see setup below)

## Setup

### reveal.js

Download reveal.js and place it at `vendor/reveal.js/`:

```sh
git clone https://github.com/hakimel/reveal.js.git vendor/reveal.js
```

Or download a release archive from https://github.com/hakimel/reveal.js/releases
and extract it to `vendor/reveal.js/`.

## Building

- Build reveal.js HTML:

    make reveal

  This generates `build/containers-embedded.html`.

- Build Org:

    make org

  This generates `build/containers-embedded.org`.

- Build both:

    make

Both targets concatenate the `slides/*.md` files in numeric order and feed them
to pandoc.

You can override Makefile variables from the command line:

```sh
make reveal REVEALJS_URL=https://cdn.jsdelivr.net/npm/reveal.js
make reveal REVEAL_WIDTH=1280 REVEAL_HEIGHT=720
```

## Managing Slides

Use `manage_slides.py` to insert or delete slides while keeping numeric prefixes
in order. Run it from the repository root.

```sh
# Insert a new slide at position 4 (shifts existing slides 4+ up by one)
./manage_slides.py insert 4 "Multi-arch builds"

# Delete the slide at position 7 (shifts remaining slides down by one)
./manage_slides.py delete 7
```

Slide files are named `NNN-slug.md` where `NNN` is a zero-padded 3-digit
number. The script maintains contiguous numbering automatically.

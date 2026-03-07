## Smarter Builds: Multi-Stage Patterns

:::: {.slide-columns}

::: {.slide-col-left}

- Multi-stage builds:
  - `builder` image with toolchains, headers, debug tools
  - `runtime` image with only what you need
- Benefits:
  - Smaller images
  - Fewer CVEs
  - Fewer packages installed on device
- Additional common patterns:
  - Strip binaries (`strip`, `objcopy`) in builder
  - Separate “debug image” vs “production image”

:::

::: {.slide-col-right}

::::: {.code-window}

:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[Dockerfile]{.cw-filename}
::::

```
# ── Builder stage ─────────────────────────
FROM debian:bookworm AS builder

RUN apt-get update && apt-get install -y \
    build-essential cmake libssl-dev

COPY src/ /src/
WORKDIR /src
RUN cmake -B build && \
    cmake --build build && \
    strip build/dashboard

# ── Runtime stage ─────────────────────────
FROM debian:bookworm-slim

COPY --from=builder \
    /src/build/dashboard \
    /usr/local/bin/

CMD [“/usr/local/bin/dashboard”]
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> Use the builder as a workshop, the runtime as the shipping container.</p>

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea #2:</strong> Container images as code.</p>

---

## Step 1: Running Example

- Same app, same board — only the Dockerfile changed

<div class="arch-diagram">
<div class="arch-outer">
<div class="arch-outer-label">debian:trixie-slim &nbsp;·&nbsp; single container &nbsp;·&nbsp; runs as root</div>
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
| step1 | Multi-stage: debian:trixie-slim runtime, no build tools | 112 MB |

---

## Microservices

:::: {.slide-columns}

::: {.slide-col-left}

- Monolithic container problems:
  - Single failure domain
  - One process crash takes everything down
  - Update one thing → rebuild and redeploy everything
  - Can't resource-limit services independently
- Solution: one process per container
  - Each service has its own image, lifecycle, restart policy
  - Services share data via **named volumes** or networking
  - Independent image sizes, update cadence, security surface
- Common 3-service pattern: `sensor` + `api` + `frontend`
  - Frontend gets its own build pipeline (React, Vue, …)
  - Here: frontend is a single static file — 2 services is enough

:::

::: {.slide-col-right}

::::: {.code-window}

:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[docker-compose.yml]{.cw-filename}
::::

```
services:
  sensor:
    image: dashboard-step2-sensor
    volumes:
      - dashboard-data:/data
    restart: unless-stopped

  nginx:
    image: dashboard-step2-nginx
    volumes:
      - dashboard-data:/data:ro
    ports:
      - "8080:80"
    restart: unless-stopped

volumes:
  dashboard-data:
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> Containers as unit of deployment, not just packaging.</p>

---

## Step 2: Running Example

- Split into two containers: `sensor` writes JSON to a named volume; `nginx` reads it

<div class="arch-diagram">
<div class="arch-two-col">
<div class="arch-outer">
<div class="arch-outer-label">sensor &nbsp;·&nbsp; trixie-slim</div>
<div class="arch-services">
<div class="arch-box">sensor<small>C daemon</small></div>
</div>
</div>
<div class="arch-vol-connector">
<div class="arch-arrow"><span>writes</span><span class="arch-shaft">→</span></div>
<div class="arch-volume-box">dashboard-data<br><small>named volume</small></div>
<div class="arch-arrow"><span>reads</span><span class="arch-shaft">→</span></div>
</div>
<div class="arch-outer">
<div class="arch-outer-label">nginx &nbsp;·&nbsp; trixie-slim</div>
<div class="arch-services">
<div class="arch-box">nginx</div>
</div>
</div>
</div>
<div class="arch-port-row">↓ &nbsp; port 8080 → Browser</div>
</div>

| Step | Change | Image Size |
| ---- | ------ | ---------- |
| step0 | Baseline: single-stage, debian:trixie, build tools included | 498 MB |
| step1 | Multi-stage: debian:trixie-slim runtime, no build tools | 112 MB |
| step2 | Microservices: sensor + nginx, named volume | 101 + 112 MB = 213 MB naïve; **~112 MB on disk** (shared base) |

---

## Minimal Base Images: Distroless / Scratch

:::: {.slide-columns}

::: {.slide-col-left}

- Traditional base images include shell, package manager, libraries
- Minimal options:
  - **Distroless** (Google) — no shell, no package manager, just runtime libs
  - **Chiselled** (Canonical) — Ubuntu with everything non-essential removed
  - **`scratch`** — empty filesystem; fully static binaries only
- Why it matters for embedded:
  - Smaller flash footprint
  - Fewer packages to patch
  - Smaller CVE surface
- Choosing the right distroless variant:
  - `distroless/base` — glibc included (C/C++ programs)
  - `distroless/static` — nothing; statically compiled binaries only
  - `distroless/cc` — glibc + libstdc++ (C++ programs)

:::

::: {.slide-col-right}

::::: {.code-window}

:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[web/Dockerfile]{.cw-filename}
::::

```
# ── Builder ────────────────────────────────
FROM golang:alpine AS builder

WORKDIR /build
COPY go.mod main.go ./
RUN CGO_ENABLED=0 GOOS=linux \
    go build -ldflags="-s -w" -o web .

# ── Runtime: truly nothing ──────────────────
FROM gcr.io/distroless/static

COPY --from=builder /build/web /web
COPY html/ /www/

CMD ["/web"]
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Tradeoff:</strong> Great for production; need a separate path for debugging.</p>

---

## Step 3: Running Example

- Same architecture as step 2 — only the `FROM` lines changed

<div class="arch-diagram">
<div class="arch-two-col">
<div class="arch-outer">
<div class="arch-outer-label">sensor &nbsp;·&nbsp; distroless/base</div>
<div class="arch-services">
<div class="arch-box">sensor<small>C daemon</small></div>
</div>
</div>
<div class="arch-vol-connector">
<div class="arch-arrow"><span>writes</span><span class="arch-shaft">→</span></div>
<div class="arch-volume-box">dashboard-data<br><small>named volume</small></div>
<div class="arch-arrow"><span>reads</span><span class="arch-shaft">→</span></div>
</div>
<div class="arch-outer">
<div class="arch-outer-label">web &nbsp;·&nbsp; distroless/static</div>
<div class="arch-services">
<div class="arch-box">web<small>Go fileserver</small></div>
</div>
</div>
</div>
<div class="arch-port-row">↓ &nbsp; port 8080 → Browser</div>
</div>

| Step | Change | Image Size |
| ---- | ------ | ---------- |
| step0 | Baseline: single-stage, debian:trixie, build tools included | 498 MB |
| step1 | Multi-stage: debian:trixie-slim runtime, no build tools | 112 MB |
| step2 | Microservices: sensor + nginx, named volume | 101 + 112 MB = 213 MB naïve; **~112 MB on disk** (shared base) |
| step3 | Distroless: sensor (35 MB) + Go web (7.6 MB) | **~40 MB on disk** |

---

## Multi-Architecture Builds as a First-Class Concern

- Typical scenario:
  - x86_64 dev machines
  - ARMv7 / AArch64 targets
- Goals:
  - Same tag runs on both
  - Reproducible builds
- Techniques:
  - `docker buildx build --platform linux/amd64,linux/arm64 ...`
  - QEMU for cross-builds vs native builders
- Benefits:
  - Devs test locally on x86
  - CI builds images for all target architectures
  - Simplified tooling: one image name, multiple arches

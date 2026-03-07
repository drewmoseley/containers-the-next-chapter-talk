## Image Design {.section-title}

---

## Beginner Setup

:::: {.slide-columns}

::: {.slide-col-left}

- Single Dockerfile ("stage" - details later):
  - Full Debian image
  - Build tools in the running image
  - Intermediate build outputs also in the running image
- Problems:
  - Large Image: 498 MB
  - Large base image = bigger attack surface
  - No separation of concerns (sensor + nginx in one contaner)
  - Runs as root

:::

::: {.slide-col-right}

::::: {.code-window}

:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[Dockerfile]{.cw-filename}
::::

```
FROM debian:trixie

RUN apt-get update && apt-get install -y \
    build-essential \
    nginx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY sensor.c .
RUN gcc -o sensor sensor.c

COPY html/ /var/www/html/
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 80

CMD ["/app/entrypoint.sh"]
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> What you build with ≠ what you need to run.</p>

---

## Step 0: Running Comparison

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

---

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

## Step 1: Running Comparison

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

## Step 2: Running Comparison

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

## Step 3: Running Comparison

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

## Non-root Containers

:::: {.slide-columns}

::: {.slide-col-left}

- Running as root inside a container is still a risk:
  - Container escape → root on host
  - Accidental writes to system paths
- Solution: run as an unprivileged user
  - `USER` instruction in the Dockerfile
  - Or use distroless `:nonroot` tags — uid 65532 baked in, no extra steps
- Requirements for your app:
  - Must not bind privileged ports (< 1024)
  - Must not write to root-owned paths
  - Data volumes must be writable by the non-root uid

:::

::: {.slide-col-right}

::::: {.code-window}

:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[sensor/Dockerfile]{.cw-filename}
::::

```
# ── Builder ────────────────────────────────
FROM debian:trixie-slim AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY sensor.c .
RUN gcc -o sensor sensor.c && strip sensor

# ── Runtime: nonroot ────────────────────────
FROM gcr.io/distroless/base:nonroot

COPY --from=builder /sensor /sensor

CMD ["/sensor", "/data/sensor.json"]
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> Least privilege applies inside containers too.</p>

---

## Step 4: Running Comparison

- Same architecture as step 3 — only the image tags changed

<div class="arch-diagram">
<div class="arch-two-col">
<div class="arch-outer">
<div class="arch-outer-label">sensor &nbsp;·&nbsp; distroless/base:nonroot</div>
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
<div class="arch-outer-label">web &nbsp;·&nbsp; distroless/static:nonroot</div>
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
| step4 | Nonroot: `:nonroot` distroless tags, uid 65532 | **~40 MB on disk** (same size) |

---

## Multi-Arch

:::: {.slide-columns}

::: {.slide-col-left}

- OCI manifest lists
  — one tag, multiple platform blobs
  - `docker pull` fetches the right arch automatically
  - No per-device Dockerfile changes
- How:
  - `docker buildx` with a multi-platform builder
  - QEMU binfmt handlers on the build host (or native builders)
  - A registry
- Platforms used:
  - `linux/amd64` — dev machines
  - `linux/arm/v7` — ARM 32-bit boards (Apalis i.MX6)
  - `linux/arm64` — AArch64 boards (Verdin iMX8M Mini)

:::

::: {.slide-col-right}

::::: {.code-window}

:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[Makefile]{.cw-filename}
::::

```
REGISTRY := ghcr.io/example/dashboard
TAG      := step5
PLATFORMS := linux/amd64,linux/arm/v7,linux/arm64

build:
	docker buildx build \
	    --platform $(PLATFORMS) \
	    --push \
	    -t $(REGISTRY)/sensor:$(TAG) \
	    sensor/
	docker buildx build \
	    --platform $(PLATFORMS) \
	    --push \
	    -t $(REGISTRY)/web:$(TAG) \
	    web/

deploy:
	scp docker-compose.yml \
	    $(BOARD_USER)@$(BOARD_HOST):/tmp/
	ssh $(BOARD_USER)@$(BOARD_HOST) \
	    "docker compose -f /tmp/docker-compose.yml \
	     pull && up -d"
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> One image name serves every architecture — the registry does the dispatch.</p>

---

## Step 5: Running Comparison

- Same app, same Dockerfiles — only the build command changed

<div class="arch-diagram">
<div class="arch-two-col">
<div class="arch-outer">
<div class="arch-outer-label">sensor &nbsp;·&nbsp; distroless/base:nonroot</div>
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
<div class="arch-outer-label">web &nbsp;·&nbsp; distroless/static:nonroot</div>
<div class="arch-services">
<div class="arch-box">web<small>Go fileserver</small></div>
</div>
</div>
</div>
<div class="arch-port-row">↓ &nbsp; port 8080 → Browser &nbsp;·&nbsp; same image on amd64 / arm/v7 / arm64</div>
</div>

| Step | Change | Image Size |
| ---- | ------ | ---------- |
| step0 | Baseline: single-stage, debian:trixie, build tools included | 498 MB |
| step1 | Multi-stage: debian:trixie-slim runtime, no build tools | 112 MB |
| step2 | Microservices: sensor + nginx, named volume | 101 + 112 MB = 213 MB naïve; **~112 MB on disk** (shared base) |
| step3 | Distroless: sensor (35 MB) + Go web (7.6 MB) | **~40 MB on disk** |
| step4 | Nonroot: `:nonroot` distroless tags, uid 65532 | **~40 MB on disk** (same size) |
| step5 | Multi-arch: amd64 + arm/v7 + arm64 manifest list | **~40 MB on device** (right blob pulled automatically) |

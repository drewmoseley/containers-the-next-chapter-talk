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

<br><br><br>

<p class=”fragment” style=”font-size: 1.2em;”><strong>Key idea:</strong> Use the builder as a workshop, the runtime as the shipping container.</p>
<p class=”fragment” style=”font-size: 1.2em;”><strong>Key idea #2:</strong> Container images as code.</p>

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

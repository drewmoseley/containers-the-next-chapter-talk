## Deployment & Updates {.section-title}

---

## Layer Reuse

:::: {.slide-columns}

::: {.slide-col-left}

- Layering strategy:
  - Stable base image + app layer on top
  - Only the app layer ships on update
- Anti-pattern: `RUN apt update && apt upgrade` in every build
  - Invalidates everything above it in the layer cache
- Change one line in `sensor.c` → rebuild → push
  - Device pulls only the app layer (a few kB) of a 35 MB image

:::

::: {.slide-col-right}

::::: {.code-window}

:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[board terminal]{.cw-filename}
::::

```
$ docker pull \
    ghcr.io/example/dashboard/sensor:v2

v2: Pulling from example/dashboard/sensor
a8ca11554fce: Already exists
3d8f1b4c0b9e: Already exists
b2e7f9d1a3c4: Already exists
9f4e2b8d6a1c: Pull complete
Digest: sha256:3f7a2d...
Status: Downloaded newer image

~XX kB pulled of 35 MB total  ← actual size TBD
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> The registry is a content-addressed patch system — you only pay for what changed.</p>

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea #2:</strong> Place frequently changing instructions <em>later</em> in the Dockerfile — everything above a changed layer is reused.</p>

---

## Online & Offline Updates

:::: {.slide-columns}

::: {.slide-col-left}

**Online**

- Central registry holds signed, multi-arch images
- Edge mirrors / pull-through cache save bandwidth
- Staggered rollout / canary devices for large fleets

:::

::: {.slide-col-right}

**Offline / Air-Gapped**

- `docker save`/`load` via USB or SD card
- Verify image signature on-device before load
- Rollback: keep previous image, fall back on failed health check

:::

::::

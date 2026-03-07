## 6. Deployment & Update Workflows

- Embedded constraints:
  - Intermittent connectivity
  - Bandwidth is expensive
  - Power can drop at any time
- We care about:
  - Minimizing download size
  - Safe rollbacks
  - Offline / factory updates

---

## Designing Images for Efficient Updates

- Layering strategy:
  - Put frequently changing parts in upper layers
  - Keep shared base layers very stable
- Anti-pattern:
  - `RUN apt update && apt upgrade` in every build
  - Leads to huge diffs and unpredictable contents
- Better:
  - Fixed, versioned base image
  - Application layer(s) on top
  - Predictable diffs and caching between releases

---

## Layer Reuse in Practice

:::: {.slide-columns}

::: {.slide-col-left}

- Change one line in `sensor.c` → rebuild → push
- Only the **app layer** is new; base layers are untouched
- `docker pull` skips anything already on the device
- Result: 52 kB transferred instead of 35 MB

```
# Edit, rebuild, push:
docker buildx build \
    --platform linux/arm64 \
    --push \
    -t ghcr.io/example/dashboard/sensor:v2 \
    sensor/
```

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

52 kB pulled of 35 MB total
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> The registry is a content-addressed patch system — you only pay for what changed.</p>

---

## Inspecting Layers Before You Pull

:::: {.slide-columns}

::: {.slide-col-left}

- **`skopeo`** queries a registry without pulling the image
- Reads the OCI manifest: layer digests + compressed sizes
- Useful for:
  - Pre-flight bandwidth estimates
  - Verifying which layers changed between releases
  - Scripted fleet update planning
- Runs on the update server, CI, or the device itself
- No Docker daemon required

:::

::: {.slide-col-right}

::::: {.code-window}

:::: {.code-window-titlebar}
[]{.cw-dot .cw-red}[]{.cw-dot .cw-yellow}[]{.cw-dot .cw-green}[terminal]{.cw-filename}
::::

```
$ skopeo inspect --raw \
    docker://ghcr.io/example/dashboard/sensor:v2 \
  | jq '.layers[] | {digest: .digest[7:19],
                     size_kb: (.size/1024|floor)}'

{ "digest": "a8ca11554fce", "size_kb": 17999 }
{ "digest": "3d8f1b4c0b9e", "size_kb": 14453 }
{ "digest": "b2e7f9d1a3c4", "size_kb": 4      }
{ "digest": "9f4e2b8d6a1c", "size_kb": 52     }
```

```
$ skopeo inspect --raw \
    docker://ghcr.io/example/dashboard/sensor:v1 \
  | jq '[.layers[].size] | add / 1024 / 1024'

34.7
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> Know your update payload size <em>before</em> you commit the device's bandwidth.</p>

---

## Online Updates: Registries and Mirrors

- Central registry:
  - Holds signed, multi-arch images
- Edge mirrors:
  - Site-local registry to save bandwidth
  - Devices pull from nearby source (pull-through cache)
- Consider:
  - Authentication and authorization to registry
  - Rate limits for large fleets
  - Staggered rollout / canary devices

---

## Offline & Air-Gapped Updates

- Common scenarios:
  - Factory provisioning
  - Customer sites without internet
- Techniques:
  - `docker save`/`load` style workflows
  - Transfer OCI archives via USB / SD card
  - Verify signature on-device before load
- Rollback:
  - Keep at least one previous image locally
  - Fallback if new version fails health checks

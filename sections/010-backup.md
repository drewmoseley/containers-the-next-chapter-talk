## Backup Slides {.section-title}

---

## Inspecting Layers Before You Pull

:::: {.slide-columns}

::: {.slide-col-left}

- **`skopeo`** reads the OCI manifest from a registry — no pull, no daemon required
- Shows layer digests + compressed sizes before committing any bandwidth
- Useful for pre-flight estimates, diffing releases, scripted fleet rollouts

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
{ "digest": "9f4e2b8d6a1c", "size_kb": XX     }  ← TBD
```

:::::

:::

::::

<p class="fragment" style="font-size: 1.2em;"><strong>Key idea:</strong> Know your update payload size <em>before</em> you commit the device's bandwidth.</p>

---

## The Container Ecosystem

<div class="ecosystem-layout">

<div class="ecosystem-top">

<div class="eco-card">
<div class="eco-card-title">📋 OCI — The Common Foundation</div>
<ul>
<li><strong>Image Format Spec</strong> — content-addressed layers; portable across all tools</li>
<li><strong>Runtime Spec</strong> — defines how containers execute on Linux</li>
<li><strong>Distribution Spec</strong> — how registries serve and receive images</li>
</ul>
</div>

<div class="eco-card">
<div class="eco-card-title">⚙️ Runtimes</div>
<ul>
<li><strong><code>containerd</code></strong> — lightweight daemon; the engine inside Docker and Torizon</li>
<li><strong>Docker Engine</strong> — containerd + CLI + UX layer; ideal for development</li>
<li><strong>Podman</strong> — daemonless, rootless-native; compatible CLI</li>
</ul>
</div>

</div>

<div class="ecosystem-bottom">

<div class="eco-card">
<div class="eco-card-title">🔨 Build</div>
<ul>
<li><strong><code>docker buildx</code></strong> — multi-platform builds</li>
<li><strong><code>buildah</code></strong> — daemonless; scriptable</li>
</ul>
</div>

<div class="eco-card">
<div class="eco-card-title">📦 Registry & Inspection</div>
<ul>
<li><strong><code>docker</code></strong> — pull, push, inspect</li>
<li><strong><code>skopeo</code></strong> — registry ops without a daemon</li>
<li><strong><code>crane</code></strong> — scripting-friendly registry client</li>
</ul>
</div>

<div class="eco-card">
<div class="eco-card-title">🔐 Security</div>
<ul>
<li><strong><code>cosign</code></strong> — sign & verify images (Sigstore)</li>
<li><strong><code>syft</code> / <code>grype</code></strong> — SBOM generation & CVE scanning</li>
</ul>
</div>

</div>

</div>

<p class="fragment" style="font-size: 1.1em;">We use <strong>Docker</strong> throughout — but the images and workflows are portable across the whole stack.</p>

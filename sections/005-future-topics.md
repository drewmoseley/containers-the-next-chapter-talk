## Future Topics

Each deserves its own talk:

<div class="topics-grid">

<div class="topic-col">
<div class="topic-col-title">⚡ Performance & Footprint</div>

- Image size → OTA bandwidth & flash
- Startup time; avoid init overhead
- overlayfs on eMMC/SD I/O
- cgroups: pin cores, cap memory
- Pre-pull during maintenance windows
</div>

<div class="topic-col">
<div class="topic-col-title">🔐 Security & Supply Chain</div>

- Minimal images shrink CVE surface
- SBOMs (SPDX / CycloneDX)
- Image signing with Cosign / Sigstore
- Runtime hardening: read-only rootfs, drop caps
- Rootless runtimes
</div>

<div class="topic-col">
<div class="topic-col-title">🔍 Debugging in Production</div>

- Debug sidecar: share `--pid`, `--net` namespaces
- `:debug` tag adds a busybox shell
- Tooling containers: pull on demand
- Ephemeral debug containers; no restart needed
</div>

</div>

<p class="fragment" style="font-size: 1.2em;"><strong>Watch this space:</strong> this 2-part series is probably becoming a 3- or 4-parter.</p>

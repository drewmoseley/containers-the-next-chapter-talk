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

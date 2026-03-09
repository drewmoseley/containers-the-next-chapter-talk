## Putting It All Together

<div class="wrapup-layout">

<div class="wrapup-before">
<div class="wrapup-card-title">⚠️ We started with…</div>
<ul>
<li>Single, naive image</li>
<li>498 MB · x86 only</li>
<li>Runs as root</li>
<li>No update strategy</li>
<li>Full device access or nothing</li>
</ul>
</div>

<div class="wrapup-after">
<div class="wrapup-card-title">✅ We end with…</div>

<div class="wrapup-domain">
<div class="wrapup-domain-label">🏗️ Image Design</div>
<div class="wrapup-domain-desc">498 MB → ~40 MB · multi-stage · 3 platforms · nonroot distroless</div>
</div>

<div class="wrapup-domain">
<div class="wrapup-domain-label">📡 Deployment</div>
<div class="wrapup-domain-desc">Layer-aware OTA · online &amp; offline · rollback on failed health check</div>
</div>

<div class="wrapup-domain">
<div class="wrapup-domain-label">🔌 Integration</div>
<div class="wrapup-domain-desc">Least-privilege device access · capabilities over <code>--privileged</code></div>
</div>

<div class="wrapup-domain">
<div class="wrapup-domain-label">🔬 Coming next</div>
<div class="wrapup-domain-desc">Debug sidecars · SBOMs · image signing · performance &amp; footprint</div>
</div>

</div>

</div>

<p class="fragment" style="font-size: 1.2em;"><strong>Key takeaway:</strong> Containers <em>can</em> be right for embedded — but only if we design with embedded constraints in mind.</p>

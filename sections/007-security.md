## Security & Supply Chain

Again, a full talk on its own. The headlines:

- **Minimal base images** shrink your CVE surface — demonstrated in steps 3 & 4
- **SBOMs** (Software Bill of Materials): machine-readable list of everything in your image — SPDX / CycloneDX formats
- **Image signing** (Sigstore / Cosign): cryptographic proof of origin, verified on-device before load
- **Runtime hardening**: read-only rootfs, drop capabilities, avoid `--privileged`
- **Rootless runtimes**: run the daemon itself without root — host kernel setup required

<p class=”fragment” style=”font-size: 1.2em;”><strong>Watch this space:</strong> this 2-part series is probably becoming a 3- or 4-parter.</p>

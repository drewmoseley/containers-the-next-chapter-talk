## 5. Security & Software Supply Chain

- Reality:
  - Devices may be deployed for 5–10+ years
  - You *will* need to patch them
- Key questions:
  - What exactly is in this image?
  - Who built it, and how?
  - Has it been tampered with?

Topics we’ll cover:

- Trusted base images
- SBOMs and provenance
- Image signing and verification
- Runtime hardening

---

## Trusted Base Images & SBOMs

- Choose curated bases:
  - Distroless
  - Chiselled
  - Vendor-maintained images
- SBOM (Software Bill of Materials):
  - SPDX / CycloneDX formats
  - List of libraries and versions in each image
- Why it matters:
  - Faster CVE triage
  - Compliance / auditing
  - Clear story for customers and regulators

---

## Image Signing & Verification

- Build-time:
  - Sign images as part of CI/CD
  - Attach signatures + SBOMs to the registry
- Deploy-time:
  - Device verifies signatures before pulling / starting
  - Optional: offline / air-gapped verification from USB or local media
- Benefits:
  - Prevents unauthorized images
  - Clear provenance (“came from *this* build pipeline”)

---

## Runtime Hardening

- Avoid `--privileged` by default
- Drop root where possible:
  - Run as non-root user inside containers
  - Consider user namespaces
- Limit capabilities:
  - Add only what you need (`CAP_NET_RAW`, etc.)
  - Remove the rest
- File-system:
  - Read-only rootfs
  - Bind-mount writable data directories only

## 1. Smarter Builds: Multi-Stage Patterns

- Multi-stage builds:
  - `builder` image with toolchains, headers, debug tools
  - `runtime` image with only what you need
- Benefits:
  - Smaller images
  - Fewer CVEs
  - No build tools on device
- Common embedded patterns:
  - Strip binaries (`strip`, `objcopy`) in builder
  - Separate “debug image” vs “production image”

**Key idea:** Use the builder as a workshop, the runtime as the shipping container.

---

## Multi-Stage: Before and After

- Naive Dockerfile:
  - One huge image
  - `build-essential`, `git`, `python`, etc. shipped to the device
- Refactored:
  - Stage 1: build + strip
  - Stage 2: copy single binary + minimal runtime deps
- Show (in demo / notes):
  - Image size delta
  - Startup time delta
  - Security scan delta

---

## 2. Multi-Architecture Builds as a First-Class Concern

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

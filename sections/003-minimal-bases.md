## 3. Minimal Base Images: Distroless / Chiselled / Scratch

- Traditional base images:
  - Ubuntu / Debian / Fedora
  - Include shell, package manager, lots of libraries
- Minimal options:
  - Distroless (Google)
  - Chiselled (Canonical, e.g. Ubuntu Chisel)
  - `scratch` for fully static binaries
- Why it matters for embedded:
  - Smaller flash footprint
  - Fewer moving parts to patch
  - Smaller attack surface

**Tradeoff:** Great for production; need a separate path for debugging.

---

## Debug vs Runtime Images

- Runtime image:
  - Maybe no shell, no package manager
  - Just the app and its runtime
- Debug / diagnostics image:
  - Shell, strace, perf, eBPF tools, editors
  - Not normally deployed, or only on dev devices
- Pattern:
  - Attach debug container to running app container
  - Share namespaces instead of bloating runtime image

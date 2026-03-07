## Debugging in Production {.section-title}

---

## Debugging in Production

- Problem:
  - Minimal / distroless images are great… until something breaks
  - No shell, no tools, no package manager
- Strategy:
  - Keep runtime image lean
  - Use external tooling when needed

Patterns:

- "Debug sidecar":
  - Temporary container that joins namespaces of running app
  - Share `--pid`, `--net` namespaces — see inside without modifying the runtime image
  - `gcr.io/distroless/base:debug` adds a busybox shell for exactly this
- Tooling containers:
  - Full toolbox (strace, perf, eBPF tools, editors) for field engineers
  - Not present on every device by default — pull on demand

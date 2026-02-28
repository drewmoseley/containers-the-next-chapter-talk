## Debug vs Runtime Images

- Runtime image:
  - No shell, no package manager
  - Just the app and its runtime
- Debug / diagnostics image:
  - Shell, strace, perf, eBPF tools, editors
  - Not normally deployed, or only on dev devices
- Pattern:
  - Attach debug container to running app container
  - Share namespaces (`--pid`, `--net`) instead of bloating runtime image
  - `gcr.io/distroless/base:debug` adds busybox shell for exactly this

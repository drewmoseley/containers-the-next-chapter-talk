## 8. Debugging in Production

- Problem:
  - Minimal / distroless images are great… until something breaks
- Strategy:
  - Keep runtime image lean
  - Use external tooling when needed

Patterns:

- “Debug sidecar”:
  - Temporary container that joins namespaces of running app
- Tooling containers:
  - Full toolbox for field engineers
  - Not present on every device by default

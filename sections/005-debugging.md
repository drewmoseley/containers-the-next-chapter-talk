## Debugging in Production {.section-title}

---

## Debugging in Production

Minimal images are great — until something breaks. A few patterns that keep runtime images lean while still giving you escape hatches:

- **Debug sidecar** — temporary container that joins the app's namespaces (`--pid`, `--net`) without modifying the runtime image
- **`distroless/base:debug`** — the `:debug` tag adds a busybox shell for exactly this purpose
- **Tooling containers** — full toolbox (strace, perf, eBPF tools) for field engineers; pull on demand, not deployed by default
- **Ephemeral debug containers** — `docker exec` into a running container with a separate image; no restart required

<p class="fragment" style="font-size: 1.2em;"><strong>Watch this space:</strong> this 2-part series is probably becoming a 3- or 4-parter.</p>

# ── Builder stage ──────────────────────────────────────
FROM debian:trixie AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY sensor.c .
RUN gcc -O2 -o sensor sensor.c && strip sensor

# Create /data owned by nonroot uid (65532) so the named volume
# inherits the correct permissions on first use.
RUN mkdir /data && chown 65532:65532 /data

# ── Runtime stage ──────────────────────────────────────
FROM gcr.io/distroless/base:nonroot

COPY --from=builder /app/sensor /sensor
COPY --from=builder /data /data

VOLUME ["/data"]

CMD ["/sensor"]

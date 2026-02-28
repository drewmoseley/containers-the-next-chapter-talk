# ── Builder stage ──────────────────────────────────────
FROM debian:trixie AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY sensor.c .
RUN gcc -O2 -o sensor sensor.c && strip sensor

# ── Runtime stage ──────────────────────────────────────
FROM debian:trixie-slim

WORKDIR /app
COPY --from=builder /app/sensor .

VOLUME ["/data"]

CMD ["/app/sensor"]

# ── Builder stage ─────────────────────────────────────
FROM debian:trixie AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY sensor.c .
RUN gcc -O2 -o sensor sensor.c && strip sensor

# ── Runtime stage ──────────────────────────────────────
FROM debian:trixie-slim

RUN apt-get update && apt-get install -y \
    nginx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/sensor .
COPY html/ /var/www/html/
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 80

CMD ["/app/entrypoint.sh"]

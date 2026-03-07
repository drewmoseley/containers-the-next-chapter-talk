# ── Builder stage ──────────────────────────────────────
FROM golang:alpine AS builder

WORKDIR /build
COPY go.mod main.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o web .

# ── Runtime stage ──────────────────────────────────────
FROM gcr.io/distroless/static:nonroot

COPY --from=builder /build/web /web
COPY html/ /www/

EXPOSE 80

CMD ["/web"]

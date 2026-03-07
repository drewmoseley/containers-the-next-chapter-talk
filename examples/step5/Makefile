REGISTRY  := ghcr.io/example/dashboard
TAG       := step5
PLATFORMS := linux/amd64,linux/arm/v7,linux/arm64
BOARD_HOST := verdin-imx8mm
BOARD_USER := torizon

IMAGE_SENSOR := $(REGISTRY)/sensor:$(TAG)
IMAGE_WEB    := $(REGISTRY)/web:$(TAG)

.PHONY: all build deploy shell size

all: build

build:
	docker buildx build \
	    --platform $(PLATFORMS) \
	    --push \
	    -t $(IMAGE_SENSOR) \
	    sensor/
	docker buildx build \
	    --platform $(PLATFORMS) \
	    --push \
	    -t $(IMAGE_WEB) \
	    web/

deploy:
	scp docker-compose.yml \
	    $(BOARD_USER)@$(BOARD_HOST):/tmp/
	ssh $(BOARD_USER)@$(BOARD_HOST) " \
		docker compose -f /tmp/docker-compose.yml pull && \
		docker compose -f /tmp/docker-compose.yml down 2>/dev/null; \
		docker compose -f /tmp/docker-compose.yml up -d"

shell:
	ssh $(BOARD_USER)@$(BOARD_HOST)

size:
	@echo "step5: multi-arch manifest lists pushed to registry"
	@echo "  Image: $(IMAGE_SENSOR)"
	@echo "  Image: $(IMAGE_WEB)"
	@echo ""
	@echo "Per-platform blob sizes (inspect from registry):"
	@docker buildx imagetools inspect $(IMAGE_SENSOR) 2>/dev/null || \
	    echo "  (push to registry first)"
	@docker buildx imagetools inspect $(IMAGE_WEB) 2>/dev/null || \
	    echo "  (push to registry first)"

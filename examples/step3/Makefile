IMAGE_SENSOR := dashboard-step3-sensor
IMAGE_WEB    := dashboard-step3-web
PLATFORM     := linux/arm64
BOARD_HOST   := verdin-imx8mm
BOARD_USER   := torizon
TARBALL_SENSOR := /tmp/$(IMAGE_SENSOR).tar
TARBALL_WEB    := /tmp/$(IMAGE_WEB).tar

.PHONY: all build deploy shell size clean

all: build

build:
	docker buildx build --platform $(PLATFORM) --load -t $(IMAGE_SENSOR) sensor/
	docker buildx build --platform $(PLATFORM) --load -t $(IMAGE_WEB)    web/

deploy: build
	docker save $(IMAGE_SENSOR) -o $(TARBALL_SENSOR)
	docker save $(IMAGE_WEB)    -o $(TARBALL_WEB)
	scp $(TARBALL_SENSOR) $(TARBALL_WEB) docker-compose.yml \
	    $(BOARD_USER)@$(BOARD_HOST):/tmp/
	ssh $(BOARD_USER)@$(BOARD_HOST) " \
		docker load -i $(TARBALL_SENSOR) && \
		docker load -i $(TARBALL_WEB) && \
		docker compose -f /tmp/docker-compose.yml down 2>/dev/null; \
		docker compose -f /tmp/docker-compose.yml up -d"

shell:
	ssh $(BOARD_USER)@$(BOARD_HOST)

size:
	@docker image ls --filter 'reference=dashboard-*' \
	    --format 'table {{.Repository}}\t{{.Tag}}\t{{.Size}}'
	@echo ""
	@echo "step3 layer-sharing analysis:"
	@python3 size-analysis.py $(IMAGE_SENSOR) $(IMAGE_WEB)

clean:
	docker rmi $(IMAGE_SENSOR) $(IMAGE_WEB) 2>/dev/null || true
	rm -f $(TARBALL_SENSOR) $(TARBALL_WEB)

IMAGE_SENSOR   := dashboard-step2-sensor
IMAGE_NGINX    := dashboard-step2-nginx
PLATFORM       := linux/arm64
BOARD_HOST     := verdin-imx8mm
BOARD_USER     := torizon
TARBALL_SENSOR := /tmp/$(IMAGE_SENSOR).tar
TARBALL_NGINX  := /tmp/$(IMAGE_NGINX).tar

.PHONY: all build deploy shell size clean

all: build

build:
	docker buildx build --platform $(PLATFORM) --load -t $(IMAGE_SENSOR) sensor/
	docker buildx build --platform $(PLATFORM) --load -t $(IMAGE_NGINX)  nginx/

deploy: build
	docker save $(IMAGE_SENSOR) -o $(TARBALL_SENSOR)
	docker save $(IMAGE_NGINX)  -o $(TARBALL_NGINX)
	scp $(TARBALL_SENSOR) $(TARBALL_NGINX) docker-compose.yml \
	    $(BOARD_USER)@$(BOARD_HOST):/tmp/
	ssh $(BOARD_USER)@$(BOARD_HOST) " \
		docker load -i $(TARBALL_SENSOR) && \
		docker load -i $(TARBALL_NGINX) && \
		docker compose -f /tmp/docker-compose.yml down 2>/dev/null; \
		docker compose -f /tmp/docker-compose.yml up -d"

shell:
	ssh $(BOARD_USER)@$(BOARD_HOST)

size:
	@docker image ls --filter 'reference=dashboard-*' \
	    --format 'table {{.Repository}}\t{{.Tag}}\t{{.Size}}'
	@echo ""
	@echo "step2 layer-sharing analysis:"
	@python3 size-analysis.py $(IMAGE_SENSOR) $(IMAGE_NGINX)

clean:
	docker rmi $(IMAGE_SENSOR) $(IMAGE_NGINX) 2>/dev/null || true
	rm -f $(TARBALL_SENSOR) $(TARBALL_NGINX)

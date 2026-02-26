IMAGE      := dashboard-step0
PLATFORM   := linux/arm64
BOARD_HOST := verdin-imx8mm
BOARD_USER := torizon
TARBALL    := /tmp/$(IMAGE).tar

.PHONY: all build deploy shell size clean

all: build

build:
	docker buildx build --platform $(PLATFORM) --load -t $(IMAGE) .

deploy: build
	docker save $(IMAGE) -o $(TARBALL)
	scp $(TARBALL) $(BOARD_USER)@$(BOARD_HOST):/tmp/
	ssh $(BOARD_USER)@$(BOARD_HOST) " \
		docker load -i $(TARBALL) && \
		docker rm -f $(IMAGE) 2>/dev/null; \
		docker run -d --restart unless-stopped -p 8080:80 --name $(IMAGE) $(IMAGE)"

shell:
	ssh $(BOARD_USER)@$(BOARD_HOST)

size:
	@docker image ls --filter 'reference=dashboard-*' \
	    --format 'table {{.Repository}}\t{{.Tag}}\t{{.Size}}'

clean:
	docker rmi $(IMAGE) 2>/dev/null || true
	rm -f $(TARBALL)

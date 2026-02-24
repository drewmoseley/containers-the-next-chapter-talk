BUILD_DIR   := build
HTML_OUT    := $(BUILD_DIR)/containers-embedded.html
ORG_OUT     := $(BUILD_DIR)/containers-embedded.org
TITLE_LOGOS := img/docker-blue.svg img/containerd-blue.svg img/podman-blue.svg
INFRA_DIR   := infra
include $(INFRA_DIR)/Makefile.include

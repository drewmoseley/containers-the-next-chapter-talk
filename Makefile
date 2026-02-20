PANDOC       ?= pandoc
SLIDES_DIR   := slides
BUILD_DIR    := build

SLIDES_MD    = $(sort $(wildcard $(SLIDES_DIR)/[0-9][0-9][0-9]-*.md))

COMBINED_MD  := $(BUILD_DIR)/slides.md
HTML_OUT     := $(BUILD_DIR)/containers-embedded.html
ORG_OUT      := $(BUILD_DIR)/containers-embedded.org

IMG_DIR := img
IMAGES  := $(wildcard $(IMG_DIR)/*)
BUILD_IMG_DIR := $(BUILD_DIR)/img
BUILD_IMAGES   := $(patsubst $(IMG_DIR)/%,$(BUILD_IMG_DIR)/%,$(IMAGES))

REVEALJS_URL ?= reveal.js

.PHONY: all reveal org clean

all: reveal org

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(BUILD_IMG_DIR):
	mkdir -p $@

$(COMBINED_MD): $(SLIDES_MD) | $(BUILD_DIR)
	rm -f $(COMBINED_MD)
	for f in $(SLIDES_MD); do \
	  cat "$$f"; \
	  printf '\n\n'; \
	done > $(COMBINED_MD)

$(BUILD_DIR)/custom.css: custom.css | $(BUILD_DIR)
	cp $< $@

$(BUILD_IMG_DIR)/%: $(IMG_DIR)/% | $(BUILD_IMG_DIR)
	cp $< $@

REVEAL_SRC_DIR := vendor/reveal.js
REVEAL_BUILD_DIR := $(BUILD_DIR)/reveal.js

$(REVEAL_BUILD_DIR): $(REVEAL_SRC_DIR) | $(BUILD_DIR)
	cp -R $(REVEAL_SRC_DIR) $(REVEAL_BUILD_DIR)

REVEAL_WIDTH  ?= 1920
REVEAL_HEIGHT ?= 1080
REVEAL_MARGIN ?= 0.05
REVEAL_MIN    ?= 0.2
REVEAL_MAX    ?= 2.0
reveal: $(COMBINED_MD) $(BUILD_DIR)/custom.css $(BUILD_IMAGES) $(REVEAL_BUILD_DIR)
	$(PANDOC) $(COMBINED_MD) \
	  -t revealjs \
	  -s \
	  -c custom.css \
	  -V theme=white \
	  -V center=false \
	  -V revealjs-url=$(REVEALJS_URL) \
	  -V slide-level=2 \
	  -V width=$(REVEAL_WIDTH) \
	  -V height=$(REVEAL_HEIGHT) \
	  -V margin=$(REVEAL_MARGIN) \
	  -V minScale=$(REVEAL_MIN) \
	  -V maxScale=$(REVEAL_MAX) \
	  -o $(HTML_OUT)

org: $(COMBINED_MD)
	$(PANDOC) $(COMBINED_MD) \
	  -t org \
	  -s \
	  -o $(ORG_OUT)

clean:
	rm -rf $(BUILD_DIR)

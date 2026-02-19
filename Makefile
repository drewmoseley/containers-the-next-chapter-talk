PANDOC       ?= pandoc
SLIDES_DIR   := slides
BUILD_DIR    := build

SLIDES_MD    = $(sort $(wildcard $(SLIDES_DIR)/[0-9][0-9][0-9]-*.md))

COMBINED_MD  := $(BUILD_DIR)/slides.md
HTML_OUT     := $(BUILD_DIR)/containers-embedded.html
ORG_OUT      := $(BUILD_DIR)/containers-embedded.org

# Change this if you host reveal.js locally
REVEALJS_URL ?= https://unpkg.com/reveal.js@5.0.0

.PHONY: all reveal org clean

all: reveal

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(COMBINED_MD): $(SLIDES_MD) | $(BUILD_DIR)
	cat $(SLIDES_MD) > $(COMBINED_MD)

REVEAL_WIDTH  ?= 1920
REVEAL_HEIGHT ?= 1080
REVEAL_MARGIN ?= 0.05
REVEAL_MIN    ?= 0.2
REVEAL_MAX    ?= 2.0
reveal: $(COMBINED_MD)
	$(PANDOC) $(COMBINED_MD) \
	  -t revealjs \
	  -s \
	  -c ../custom.css \
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

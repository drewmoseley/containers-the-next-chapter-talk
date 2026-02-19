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

reveal: $(COMBINED_MD)
	$(PANDOC) $(COMBINED_MD) \
	  -t revealjs \
	  -s \
	  -V revealjs-url=$(REVEALJS_URL) \
	  -V slide-level=2 \
	  -o $(HTML_OUT)

org: $(COMBINED_MD)
	$(PANDOC) $(COMBINED_MD) \
	  -t org \
	  -s \
	  -o $(ORG_OUT)

clean:
	rm -rf $(BUILD_DIR)

PANDOC       ?= pandoc
SLIDES_DIR   := slides
BUILD_DIR    := build
SLIDES_MD    := $(SLIDES_DIR)/01-intro.md \
                 $(SLIDES_DIR)/02-builds.md \
                 $(SLIDES_DIR)/03-minimal-bases.md \
                 $(SLIDES_DIR)/04-performance.md \
                 $(SLIDES_DIR)/05-security.md \
                 $(SLIDES_DIR)/06-deployment.md \
                 $(SLIDES_DIR)/07-integration.md \
                 $(SLIDES_DIR)/08-debugging.md \
                 $(SLIDES_DIR)/09-wrap-up.md

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

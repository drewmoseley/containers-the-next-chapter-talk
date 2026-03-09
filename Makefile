.DEFAULT_GOAL := all

BUILD_DIR   := build
HTML_OUT    := $(BUILD_DIR)/containers-embedded.html
PDF_OUT     := $(BUILD_DIR)/containers-embedded.pdf
ORG_OUT     := $(BUILD_DIR)/containers-embedded.org
TITLE_LOGOS := img/toradex-logo.png img/EWLogo.png
EXTRA_CSS   := talk-extras.css
INFRA_DIR   := infra
PDF_PORT    := 8765
PDF_FILE    := $(notdir $(HTML_OUT))
include $(INFRA_DIR)/Makefile.include

.PHONY: pdf
pdf: reveal
	@bash -c '\
	  python3 -m http.server $(PDF_PORT) --bind 127.0.0.1 --directory $(BUILD_DIR) &\
	  SERVER_PID=$$!; sleep 1;\
	  npx decktape reveal "http://127.0.0.1:$(PDF_PORT)/$(PDF_FILE)" $(abspath $(PDF_OUT));\
	  kill $$SERVER_PID 2>/dev/null; true'

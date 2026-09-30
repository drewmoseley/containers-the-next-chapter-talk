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

PPTX_DIR := pptx

.PHONY: pptx
pptx:
	cd $(PPTX_DIR) && npm install --no-audit --no-fund && node build.js

.PHONY: pptx-pdf
pptx-pdf: pptx
	cd $(PPTX_DIR) && soffice --headless --convert-to pdf output.pptx

.PHONY: clean
clean:
	rm -rf $(BUILD_DIR)
	rm -rf $(PPTX_DIR)/node_modules $(PPTX_DIR)/output.* $(PPTX_DIR)/tmp $(PPTX_DIR)/unpacked $(PPTX_DIR)/*.jpg
	rm -rf node_modules

DECKTAPE_JS := node_modules/decktape/decktape.js

.PHONY: pdf
pdf: reveal $(DECKTAPE_JS)
	@bash -c '\
	  python3 -m http.server $(PDF_PORT) --bind 127.0.0.1 --directory $(BUILD_DIR) &\
	  SERVER_PID=$$!; sleep 1;\
	  CHROME_PATH=$$(find $$HOME/.cache/puppeteer/chrome -maxdepth 3 -name chrome -type f 2>/dev/null | sort -V | tail -1);\
	  if [ -z "$$CHROME_PATH" ]; then npx --yes puppeteer browsers install chrome >&2; CHROME_PATH=$$(find $$HOME/.cache/puppeteer/chrome -maxdepth 3 -name chrome -type f 2>/dev/null | sort -V | tail -1); fi;\
	  node $(DECKTAPE_JS) --chrome-path="$$CHROME_PATH" --chrome-arg=--no-sandbox --chrome-arg=--disable-gpu --size 1920x1080 reveal "http://127.0.0.1:$(PDF_PORT)/$(PDF_FILE)" $(abspath $(PDF_OUT));\
	  kill $$SERVER_PID 2>/dev/null; true'

$(DECKTAPE_JS):
	PUPPETEER_SKIP_DOWNLOAD=true npm install --no-audit --no-fund

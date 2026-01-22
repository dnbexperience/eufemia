# Eufemia LLM Metadata Gatsby Plugin

Generates Markdown copies with JSON blocks for documentation pages to aid LLMs.

## How it works

- Uses `eufemia-llm-metadata` to collect documentation and creates relevant files.
- Files are referenced in the head as alternate markdown links for properties/events by the portal.
- Gatsby portal build: writes to `packages/dnb-design-system-portal/public` and includes `llms.txt`.

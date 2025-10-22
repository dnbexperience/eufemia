Eufemia LLM Metadata Plugin

Generates JSON metadata for documentation pages to aid LLMs. It scans `src/docs/uilib` for entry MDX pages and extracts properties/events tables (when present), then writes a JSON file under `public/llm/<slug>/metadata.json`.

Files are referenced in the head as a `<link rel="eufemia:metadata">` by the portal.


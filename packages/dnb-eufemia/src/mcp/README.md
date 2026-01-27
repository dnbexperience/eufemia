# MCP Server for Eufemia documentation

This MCP server exposes the packaged documentation from `@dnb/eufemia/docs` so AI tools can read it.

By default it looks for `/docs` inside the installed package. During local development you can point it at another location with `EUFEMIA_DOCS_ROOT`.

## Available Tools

The server exposes these tools:

- `docs_entry` - Returns docs/llm.md (AI entrypoint).
- `docs_index` - Returns a JSON list of all markdown docs.
- `docs_list` - List docs with optional prefix filter.
- `docs_read` - Read a docs file by path.
- `docs_search` - Search across markdown docs (supports multi-word queries).
- `component_find` - Resolve component doc/properties/events paths (supports dot notation like `Field.Address`).
- `component_doc` - Return markdown documentation for a component.
- `component_api` - Return JSON blocks extracted from component markdown.
- `component_props` - Return JSON blocks for component properties/events.

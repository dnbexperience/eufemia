# MCP Server for Eufemia documentation

This MCP server exposes the packaged documentation from `@dnb/eufemia/docs` so AI tools can read it.

By default it looks for `/docs` inside the installed package. During local development you can point it at another location with `EUFEMIA_DOCS_ROOT`.

## Installation

The MCP server requires `@modelcontextprotocol/sdk` as a peer dependency. It is not included as a runtime dependency of `@dnb/eufemia` since it is only needed for AI/MCP tooling.

Install it as a devDependency in your application:

```bash
npm install --save-dev @modelcontextprotocol/sdk
# or
yarn add --dev @modelcontextprotocol/sdk
```

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

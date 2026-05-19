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

## Transports

The MCP server can be exposed in two ways:

### 1. stdio (default)

Used by editor integrations like Cursor and the VSCode/Claude Code MCP config. The server reads JSON-RPC from `stdin` and writes responses to `stdout`:

- Entry: `src/mcp/mcp-docs-server.ts`
- Wrapper: `src/mcp/run-mcp-server.sh`

### 2. HTTP (SSE + Streamable HTTP)

Use this when you want to host the MCP server behind a public URL — for example to plug it into a Claude flair / proxy server, Claude Desktop's "Add MCP server (SSE)" option, or any remote MCP client:

- Entry: `src/mcp/mcp-http-server.ts`
- Wrapper: `src/mcp/run-mcp-http-server.sh`

The HTTP server exposes:

- `GET /healthz` — health check (`{ ok: true, name, version, transports }`).
- `POST /mcp`, `GET /mcp`, `DELETE /mcp` — modern Streamable HTTP transport (recommended). Stateful; the session id is returned in the `mcp-session-id` response header.
- `GET /sse` — legacy SSE stream. Emits an `endpoint` event with `/messages?sessionId=<id>`.
- `POST /messages?sessionId=<id>` — legacy SSE message endpoint.

#### Configuration

The HTTP server is configured via environment variables:

| Variable            | Default        | Description                                                                                       |
| ------------------- | -------------- | ------------------------------------------------------------------------------------------------- |
| `PORT`              | `8787`         | HTTP port to listen on.                                                                           |
| `HOST`              | `0.0.0.0`      | Bind host.                                                                                        |
| `EUFEMIA_DOCS_ROOT` | `./build/docs` | Path to the Eufemia docs directory.                                                               |
| `MCP_AUTH_TOKEN`    | _(unset)_      | If set, every request must send `Authorization: Bearer <token>`.                                  |
| `MCP_ALLOWED_HOSTS` | _(unset)_      | Comma-separated `Host` header allowlist for DNS-rebinding protection (e.g. `eufemia-mcp.dnb.no`). |

#### Run locally

```bash
yarn workspace @dnb/eufemia exec bash src/mcp/run-mcp-http-server.sh
# or
PORT=8787 EUFEMIA_DOCS_ROOT=./packages/dnb-eufemia/build/docs \
  yarn workspace @dnb/eufemia babel-node \
  --extensions .js,.ts,.tsx \
  src/mcp/mcp-http-server.ts
```

Then verify it is up:

```bash
curl http://localhost:8787/healthz
```

#### Build the docs bundle locally

```bash
yarn workspace @dnb/eufemia build:docs
yarn workspace @dnb/eufemia build:docs:bundle
# writes packages/dnb-eufemia/src/mcp/worker/docs.bundle.json
```

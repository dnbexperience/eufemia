# MCP Server for Eufemia documentation

This MCP server exposes the packaged documentation from `@dnb/eufemia/docs` so AI tools can read it.

By default it looks for `/docs` inside the installed package. During local development you can point it at another location with `EUFEMIA_DOCS_ROOT`.

## Installation

The MCP server dependencies are not included as runtime dependencies of
`@dnb/eufemia`, since they are only needed for AI/MCP tooling.

Install it as a devDependency in your application:

```bash
npm install --save-dev @modelcontextprotocol/server
# or
yarn add --dev @modelcontextprotocol/server
```

That is sufficient for the stdio server. The HTTP server also needs the Node
adapter, legacy SSE transport, and Express:

```bash
npm install --save-dev @modelcontextprotocol/node @modelcontextprotocol/server-legacy express
# or
yarn add --dev @modelcontextprotocol/node @modelcontextprotocol/server-legacy express
```

## Available Tools

The server exposes these tools:

- `docs_entry` - Returns the complete docs/llm.md link index (large; use only for exhaustive discovery).
- `docs_meta` - Returns the Eufemia version, generation time and source commit for the served documentation.
- `review_rules` - Returns Eufemia-owned review rule metadata.
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

- Entry: `src/mcp/mcp-server.ts`
- Wrapper: `src/mcp/run-mcp-server.sh`

### 2. HTTP (SSE + Streamable HTTP)

Use this when you want to host the MCP server behind a public URL — for example to plug it into a Claude flair / proxy server, Claude Desktop's "Add MCP server (SSE)" option, or any remote MCP client:

- Entry: `src/mcp/mcp-http-server.ts`
- Wrapper: `src/mcp/run-mcp-http-server.sh`

The HTTP server exposes:

- `GET /healthz` — health check (`{ ok: true, name, version, transports }`).
- `POST /mcp`, `GET /mcp`, `DELETE /mcp` — MCP 2025 and `2026-07-28`
  on the same URL. Existing 2025 clients keep their stateful sessions; modern
  clients use stateless per-request serving.
- `GET /sse` — legacy SSE stream. Emits an `endpoint` event with `/messages?sessionId=<id>`.
- `POST /messages?sessionId=<id>` — legacy SSE message endpoint.

#### Configuration

The HTTP server is configured via environment variables:

| Variable              | Default        | Description                                                                                       |
| --------------------- | -------------- | ------------------------------------------------------------------------------------------------- |
| `PORT`                | `8787`         | HTTP port to listen on.                                                                           |
| `HOST`                | `127.0.0.1`    | Bind host. Set to `0.0.0.0` to expose the server beyond the local machine.                        |
| `EUFEMIA_DOCS_ROOT`   | `./build/docs` | Path to the Eufemia docs directory.                                                               |
| `MCP_AUTH_TOKEN`      | _(unset)_      | If set, every request must send `Authorization: Bearer <token>`.                                  |
| `MCP_ALLOWED_HOSTS`   | _(unset)_      | Comma-separated `Host` header allowlist for DNS-rebinding protection (e.g. `eufemia-mcp.dnb.no`). |
| `MCP_ALLOWED_ORIGINS` | _(loopback)_   | Comma-separated `Origin` header allowlist. Use `*` to accept any browser origin.                  |

Requests without an `Origin` header are unaffected by `MCP_ALLOWED_ORIGINS`,
which exists to stop a browser page on another site from reaching the server.
It is a DNS-rebinding guard rather than a standalone access control, so an
exposed host still needs `MCP_AUTH_TOKEN` and `MCP_ALLOWED_HOSTS`.

Setting `MCP_ALLOWED_ORIGINS` replaces the loopback default, so list the local
origins too when a browser on `localhost` should keep working. Entries are
compared as canonical origins, meaning a trailing slash, a default port or
mixed case still match; anything that is not a valid origin is skipped and
logged at startup.

When hosting the server on a public URL, set `HOST=0.0.0.0` together with
`MCP_AUTH_TOKEN`, `MCP_ALLOWED_HOSTS` and `MCP_ALLOWED_ORIGINS`.

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

## Telemetry

The **stdio** server sends anonymous, aggregate usage statistics so we can see
which tools, components and documentation areas are most used and prioritise the
docs accordingly. It is **on by default** and **opt-out**.

**What is collected** (a closed, public vocabulary only):

- the tool name (from the fixed set of registered tools);
- for a component tool, the component name (e.g. `Button`, `Field.Address`);
- for `docs_read` / `docs_list`, the leading documentation area (e.g.
  `/uilib/components/`), not the full path or prefix;
- the running `@dnb/eufemia` version.

**What is not in the payload:** no machine id, install id, user, session or
correlation id, and no free text — in particular the `docs_search` query is
never sent (a search is recorded as a tool count only). The request's source
IP is visible to the network layer like any HTTP call, but it is not part of
this payload and is not stored on the ingest side.

Each event is POSTed to `https://server.eufemia.dnb.no/analytics/collect-local-mcp-usage`
as a fire-and-forget beacon with a short (~1s) timeout. It never blocks or
affects a tool call, and any failure is silently ignored. The server holds no
credentials; the ingest route is locked down at the edge.

**Turn it off** by setting the environment variable in your MCP client config:

```json
{
  "servers": {
    "eufemia": {
      "command": "node",
      "args": [
        "${workspaceFolder}/node_modules/@dnb/eufemia/mcp/mcp-server.js"
      ],
      "env": { "EUFEMIA_MCP_TELEMETRY": "0" }
    }
  }
}
```

A one-line notice is printed to `stderr` once per server start. Telemetry is
disabled when `EUFEMIA_MCP_TELEMETRY` is `0` or `false`.

# Eufemia MCP legacy proxy (Cloudflare Worker)

Deprecation compatibility layer for the **old** Cloudflare-hosted MCP endpoint.

- **Deprecated:** `https://eufemia-mcp.eufemia.workers.dev/mcp`
- **Current:** `https://server.eufemia.dnb.no/mcp/web`

Existing users may still have the old URL configured. This Worker keeps that URL
working during the migration window and makes the new URL visible to both
clients (via headers / redirect) and agents (via the MCP `initialize`
instructions and JSON-RPC error messages).

The new server is stateless, POST-only, unauthenticated, and returns JSON (not
SSE), so this proxy is deliberately small.

## Behaviour (`MODE`)

The endpoint is phased down by changing the `MODE` var — no code change needed:

| `MODE`     | Response                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `proxy`    | Forward `POST` to the new endpoint, add deprecation headers, inject a migration notice into the `initialize` instructions. **Default.** |
| `redirect` | `308 Permanent Redirect` to the new endpoint (+ JSON-RPC error body for clients that don't follow redirects).                           |
| `gone`     | `410 Gone` with a migration message.                                                                                                    |

Every response carries `Deprecation` (RFC 9745), `Sunset` (RFC 8594), and
`Link: <…>; rel="successor-version"`.

## Develop

```bash
yarn workspace @dnb/eufemia-mcp-legacy-proxy dev        # local worker
yarn workspace @dnb/eufemia-mcp-legacy-proxy test       # unit tests
yarn workspace @dnb/eufemia-mcp-legacy-proxy typecheck
```

## Deploy

Requires Cloudflare credentials for the account that owns the
`eufemia-mcp.eufemia.workers.dev` hostname (`wrangler login`, or
`CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID`). The Worker `name` is
`eufemia-mcp`, so with the `eufemia` account subdomain it serves the original
`eufemia-mcp.eufemia.workers.dev` URL.

```bash
yarn workspace @dnb/eufemia-mcp-legacy-proxy deploy
```

Phase the endpoint down without editing code:

```bash
wrangler deploy --var MODE:redirect   # step to 308
wrangler deploy --var MODE:gone       # final 410
```

## Rollback

- Revert `MODE` (e.g. `gone` → `redirect` → `proxy`) and re-deploy, **or**
- `wrangler rollback` to the previous deployed version.

## Migration plan

1. Deploy in `proxy` mode; announce the new URL and sunset date.
2. Monitor legacy traffic (Worker logs: `wrangler tail`) — each request logs
   `{ method, client, status }` only; no credentials or bodies are recorded.
3. When legacy traffic is low, switch to `redirect` (`308`).
4. After the final support period, switch to `gone` (`410`).

Update the `SUNSET` / `DEPRECATION_DATE` vars in [`wrangler.toml`](./wrangler.toml)
once the dates are agreed.

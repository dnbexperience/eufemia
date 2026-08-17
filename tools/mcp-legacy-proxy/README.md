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

Merges to `main` that touch this workspace auto-deploy via
[`mcp-legacy-proxy-deploy.yml`](../../.github/workflows/mcp-legacy-proxy-deploy.yml),
using the repo's `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` secrets. The
Worker `name` is `eufemia-mcp`, so with the `eufemia` account subdomain it serves
the original `eufemia-mcp.eufemia.workers.dev` URL.

Phase the endpoint down without a code change by dispatching the workflow with a
`mode` input (`proxy` | `redirect` | `gone`) from the Actions tab.

To deploy manually (needs `wrangler login` or the Cloudflare env vars):

```bash
yarn workspace @dnb/eufemia-mcp-legacy-proxy deploy
yarn workspace @dnb/eufemia-mcp-legacy-proxy deploy --var MODE:redirect
yarn workspace @dnb/eufemia-mcp-legacy-proxy deploy --var MODE:gone
```

## Rollback

- Revert `MODE` (e.g. `gone` → `redirect` → `proxy`) and re-deploy, **or**
- Run `yarn workspace @dnb/eufemia-mcp-legacy-proxy exec wrangler rollback`.

## Migration plan

1. Deploy in `proxy` mode; announce the new URL and sunset date.
2. Monitor legacy traffic with
   `yarn workspace @dnb/eufemia-mcp-legacy-proxy exec wrangler tail` — each
   request logs `{ method, client, status }` only; no credentials or bodies are
   recorded.
3. When legacy traffic is low, switch to `redirect` (`308`).
4. After the final support period, switch to `gone` (`410`).

Update the `SUNSET` / `DEPRECATION_DATE` vars in [`wrangler.toml`](./wrangler.toml)
once the dates are agreed.

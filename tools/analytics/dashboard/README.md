# Eufemia Analytics dashboard

A dashboard UI for the analytics records — key figures and ranked bar lists,
built with React, Vite and [`@dnb/eufemia`](https://eufemia.dnb.no/uilib/)
components. It renders whatever data it is given and shows an empty state until a
data source is wired up.

## Develop locally

```bash
yarn workspace eufemia-analytics-dashboard dev
# open the URL Vite prints (default http://localhost:5173)
```

Other scripts: `build` (production build to `dist/`), `preview` (serve the built
output), `test`, `test:types`, and `lint`.

With no `config.json` present the page renders without sign-in for local preview,
so the data API is not called. Use `preview` when testing sign-in, so the port
matches a redirect URI registered on the app registration.

## Sign-in

Access is limited to authorised DnB users via Entra (Azure AD). The page runs an
OpenID Connect sign-in (authorization code + PKCE, no secret in the browser);
only users assigned to the app registration receive a token, which controls who
can sign in.

Configure it per host: copy `config.example.json` to `config.json` (gitignored)
and fill in the `clientId`, `tenantId`, a `redirectUri` that exactly matches one
registered on the app (SPA platform), the `apiBaseUrl` of the dashboard data API
and the `apiScope` (`api://<client-id>/Dashboard.Read`) it requests a token for.
The page fetches `config.json` at runtime, so it is not bundled into the build.

## Data and access

Data is served by a separate, access-controlled API rather than bundled into
these files. On a static host the sign-in gates the UI, so the API itself also
enforces access by validating the Entra token. These pieces are layered on top
of this UI shell.

The API also requires the `Dashboard.Read` scope, so the app registration must
issue v2 access tokens (`requestedAccessTokenVersion = 2`) that carry a `scp`
claim. Confirm end to end after a deploy: sign in, then check the `/data` call
returns 200 (a 401/403 usually means the token is v1 or is missing the scope).

## Build and deploy

The production build (`yarn workspace eufemia-analytics-dashboard build`) emits a
static site to `dist/`, including Eufemia's fonts and icons. The analytics deploy
workflow builds `dist/`, ships it to the GitHub Enterprise deploy branch, then
generates `config.json` from the deploy variables and syncs everything to the S3
bucket behind CloudFront. The site is served under a strict Content-Security
Policy (`script-src 'self'`), so the build avoids inline scripts.

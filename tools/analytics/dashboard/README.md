# Eufemia Analytics dashboard

A static dashboard that shows a snapshot of the analytics records. It renders
key figures and simple bar charts from a bundled `data/records.json`, with no
API token in the browser and no external dependencies.

## How the data gets here

The dashboard does **not** call the analytics API from the browser: the API
requires a bearer token and sits behind the Akamai edge, and the browser cannot
hold that token or reach the origin directly. Instead,
`ghe-dashboard-snapshot-workflow.yml` runs on a schedule in GitHub Enterprise
(where the token is a secret), queries `GET /analytics/records`, and writes the
result to `data/records.json`. The page then reads that static file.

```
schedule → workflow (token as secret) → GET /analytics/records → data/records.json → static page
```

## Preview locally

Any static file server works, for example:

```bash
cd tools/analytics/dashboard
python3 -m http.server 4173
# open http://localhost:4173
```

The committed `data/records.json` contains sample data so the page renders
before the first snapshot runs. Use the port that matches the redirect URI
registered for the app registration (see below) when testing sign-in.

## Sign-in

Access is limited to authorised DnB users via Entra (Azure AD). The page runs an
OpenID Connect sign-in (authorization code + PKCE, no secret in the browser);
only users assigned to the app registration receive a token, which controls who
can sign in.

Configure it per host: copy `config.example.json` to `config.json` (gitignored)
and fill in the `clientId`, `tenantId` and a `redirectUri` that exactly matches
one registered on the app (SPA platform). Without a `config.json`, the page
renders the snapshot for local preview.

**Important:** on a static site this sign-in gates the UI, but it does not by
itself protect a publicly served `data/records.json`. Real data protection
requires the host to enforce auth on the files, or serving the data from a
token-protected API. Choose one when the host is decided.

## Hosting

The dashboard is static and can be served from any host. Two front-door options
discussed:

- **AWS + Entra** — host the files and gate access with the Entra sign-in above.
- **Akamai edge SSO** — front the files through the existing edge, which performs
  the Entra login. No new AWS IAM role required.

Enable the publish step in the snapshot workflow once the host is chosen.

# Eufemia Analytics dashboard

A dependency-free dashboard UI for the analytics records — key figures and
simple bar charts. It renders whatever data it is given and shows an empty state
until a data source is wired up.

## Preview locally

Any static file server works, for example:

```bash
cd tools/analytics/dashboard
python3 -m http.server 4173
# open http://localhost:4173
```

With no data source configured the page shows an empty state. Use the port that
matches a redirect URI registered on the app registration when testing sign-in.

## Sign-in

Access is limited to authorised DnB users via Entra (Azure AD). The page runs an
OpenID Connect sign-in (authorization code + PKCE, no secret in the browser);
only users assigned to the app registration receive a token, which controls who
can sign in.

Configure it per host: copy `config.example.json` to `config.json` (gitignored)
and fill in the `clientId`, `tenantId` and a `redirectUri` that exactly matches
one registered on the app (SPA platform). Without a `config.json`, the page
renders without sign-in for local preview.

## Data and access

Data is served by a separate, access-controlled API rather than bundled into
these files. On a static host the sign-in gates the UI, so the API itself also
enforces access by validating the Entra token. These pieces are layered on top
of this UI shell.

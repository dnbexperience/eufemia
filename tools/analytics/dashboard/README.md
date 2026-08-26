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
python3 -m http.server 4000
# open http://localhost:4000
```

The committed `data/records.json` contains sample data so the page renders
before the first snapshot runs.

## Hosting and access control

The dashboard is static and can be served from any host. Access must be limited
to DnB employees (including non-developers), so the front door authenticates
against Entra:

- **Akamai edge SSO** — front the static files through the existing edge, which
  performs the Entra login. No new AWS IAM role required.
- **AWS + Cognito/Entra** — federate Cognito to Entra for a live app.

Both require an Entra app registration (client ID, redirect URIs, group claim).
Enable the publish step in the snapshot workflow once the host is chosen.

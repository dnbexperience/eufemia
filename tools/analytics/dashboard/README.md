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

With no data source configured the page shows an empty state.

## Data and access

Data is served by a separate, access-controlled API rather than bundled into
these files, and access is limited to authorised DnB users via Entra sign-in.
Those pieces are layered on top of this UI shell.

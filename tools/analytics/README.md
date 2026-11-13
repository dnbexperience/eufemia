# Eufemia Analytics (AWS Lambda)

Minimal service to ingest anonymous portal analytics into AWS and serve it to the dashboard, deployed as AWS Lambda functions behind API Gateway.

## Architecture

```
POST /collect-portal-views → API Gateway HTTP API → Lambda (Node.js 22) → S3 (portal-views/dt=YYYY-MM-DD/*.json)
GET  /data (dashboard API) → read-only Lambda → S3 snapshot ← hourly generator → Athena (Glue table w/ partition projection)
```

Portal views are written to S3 as newline-delimited JSON (one event per line), partitioned by date. A Glue table with partition projection lets Athena query them without `MSCK`/`ADD PARTITION`. The Lambdas are stateless.

## HTTP API

| Route                           | Auth | Description                                      |
| ------------------------------- | ---- | ------------------------------------------------ |
| `GET /healthz`                  | edge | Liveness probe                                   |
| `POST /collect-portal-views`    | edge | Ingest anonymous portal page views (batch)       |
| `POST /collect-local-mcp-usage` | edge | Ingest anonymous local (stdio) MCP usage (batch) |

Every ingest route is gated by the Akamai `X-Edge-Auth` origin header; there is no bearer token, so the browser never holds a secret. The web MCP Lambda writes its own `mcp-usage/` prefix directly via IAM; the local (stdio) MCP server runs on public, open-source machines and cannot hold a secret or IAM role, so it goes through `/collect-local-mcp-usage` instead — the `transport` field is stamped `local` server-side regardless of what the client sends. The dashboard's read API (`GET /data`) is a separate HTTP API gated by an Entra JWT authorizer.

### Record shape

A portal view carries a `path` and optional `timestamp`, `env`, `status`, `locale`, `theme`, `color_scheme`, `referrer`, and `via_search` dimensions. The service stamps `created_at`; an absent `timestamp` defaults to that receive time, `status` defaults to `ok`, and the remaining absent dimensions default to `unknown`. An unrecognized `env`, `locale`, `theme`, `color_scheme`, `referrer`, or `via_search` is coerced to `unknown` rather than rejected, so a stale value never drops a batch. No identifiers or personal data are stored.

```json
{
  "path": "/web/components/button",
  "env": "prod",
  "timestamp": "2026-08-07T09:00:00.000Z",
  "status": "ok",
  "locale": "nb-NO",
  "theme": "ui",
  "color_scheme": "light",
  "referrer": "search",
  "via_search": "yes",
  "created_at": "2026-08-07T09:00:00.000Z"
}
```

`path` must start with `/` and be at most 2048 characters, and a batch may contain at most 50 events. Supported dimensions are `status`: `ok`, `not_found`, or `error`; `locale`: `nb-NO`, `en-GB`, `sv-SE`, `da-DK`, or `en-US`; `theme`: `ui`, `sbanken`, `eiendom`, or `carnegie`; `color_scheme`: `light` or `dark`; `referrer`: `search`, `internal`, `direct`, or `external`; and `via_search`: `yes` or `no`.

A local MCP usage event carries a required `tool` (one of the registered MCP tools) and optional `component`, `componentMissed`, `path`, `env`, `eufemiaVersion` and `timestamp`. `componentMissed: true` marks a component lookup whose name the docs do not contain; the missed name itself is never sent. The service stamps `transport` to `local` regardless of what the client sends, so a local-origin row can never be attributed to the web MCP. It also stamps `created_at` and stores camelCase fields in snake_case, e.g. `eufemiaVersion` as `eufemia_version`. An unrecognized `component`, `componentMissed`, `path` or `env` is dropped rather than rejected; a malformed `tool`, `eufemiaVersion` (validated as a semver shape, not membership of a real release) or `timestamp` rejects the event. No identifiers, IP or free text are accepted.

```json
{
  "tool": "component_doc",
  "component": "Button",
  "env": "prod",
  "eufemiaVersion": "12.3.0",
  "timestamp": "2026-08-07T09:00:00.000Z"
}
```

## Prerequisites

- Node.js — the repo pins Node via Volta for local development; the deployed Lambda runtime is Node 22
- Yarn (workspace-aware)
- AWS CLI configured with appropriate credentials
- Terraform >= 1.10

## Local development

```bash
yarn test        # run the unit tests
yarn test:types  # type-check
yarn lint        # lint
```

## Build & deploy (manual)

```bash
yarn build        # bundle src/lambda/index.ts → dist/lambda.zip
yarn deploy:plan  # build + terraform plan
yarn deploy       # build + terraform apply
```

Copy `infra/terraform.tfvars.example` to `infra/terraform.tfvars` and fill in `cost_allocation`. `terraform.tfvars` is gitignored.

## CI/CD deploy (two-repo flow)

Deployment mirrors the MCP Lambda pattern: public GitHub builds and tests, then hands off to GitHub Enterprise where OIDC federation authenticates to AWS.

```
public GitHub (.github/workflows/analytics-lambda.yml)
  → test + build lambda.zip
  → force-push dist/ + infra/ + dashboard/ + deploy workflow to GHE repo `deploy` branch
      → GHE (ghe-deploy-workflow.yml as .github/workflows/deploy.yml)
          → OIDC assume role → terraform apply
          → generate dashboard/config.json → aws s3 sync → CloudFront invalidation
```

- **Triggers** (`analytics-lambda.yml`): a push to `main` touching `tools/analytics/**` (or the workflow), or a manual `workflow_dispatch` from any branch. Analytics deploys on its own code changes, not on every Eufemia release (it has no Eufemia docs dependency, unlike the MCP server).
- The public workflow copies `ghe-deploy-workflow.yml` onto the GHE `deploy` branch, so the deploy job is self-installing — no manual workflow setup in the GHE repo.
- On forks and PRs without deploy credentials, the build-and-push step is skipped (tests still run).
- **Failure alerts**: a green public run only means the hand-off worked; see [Production health monitor](#production-health-monitor).

### Required configuration

Deploy credentials and configuration are provided via repository secrets and variables (managed in the repository settings), not stored in this repo.

### Lambda execution roles

The deploy creates the three Lambda execution roles with the OIDC permissions boundary. Each gets basic Lambda logging plus one policy from the OIDC federation repo, and the deploy role may attach no others:

- `eufemia-<env>-analytics-lambda` (ingest): `eufemia-<env>-analytics-collect` (`s3:PutObject` on the data bucket's `portal-views/*` and `mcp-usage/*` prefixes).
- `eufemia-<env>-analytics-snapshot-lambda` (snapshot generator): `eufemia-<env>-analytics-snapshot-build` (read the data bucket, `s3:PutObject` only on the `portal-views-daily/*`, `mcp-usage-daily/*`, `component-usage-daily/*`, `snapshots/*` and `athena-results/*` prefixes, run Athena queries in the workgroup, read the analytics Glue tables).
- `eufemia-<env>-dashboard-lambda` (dashboard read): `eufemia-<env>-dashboard-snapshot-read` (`s3:GetObject` on `snapshots/*`).

The deploy role can't change a role's trust policy, description or maximum session duration; such a change fails the deploy until the OIDC federation repo grants it. Renaming a role replaces it, so the new name must be granted there first and `prevent_destroy` lifted in the same change.

The GHE deploy repo and its OIDC role/federation entry must be provisioned once, as with the MCP pipeline.

## Infrastructure

`infra/` provisions:

- **S3 bucket** (versioned, SSE-S3, public access blocked) holding portal-view records (`portal-views/`, `portal-views-daily/`), MCP usage (`mcp-usage/`, `mcp-usage-daily/`), component usage (`component-usage/`, `component-usage-daily/`), the dashboard snapshot (`snapshots/dashboard.json`), and Athena output (`athena-results/`, expired after 7 days). The raw event prefixes (`portal-views/`, `mcp-usage/`, `component-usage/`) are expired after 395 days (≈ 13 months) to cover year-over-year reporting; the daily rollups (`*-daily/`) and the regenerated snapshot are not expired, so aggregated history outlives the raw rows.
- **Glue database + tables** with JSON SerDe and partition projection on `dt` (`portal_views`, `portal_views_daily`, `mcp_usage`, `mcp_usage_daily`, `component_usage`, `component_usage_daily`). The `portal_views_daily` rollup keeps the anonymous view dimensions (`status`, `locale`, `theme`, `color_scheme`, `referrer`, `via_search`) alongside `path`/`env` so their history survives the raw expiry and stays queryable via Athena; only the per-event timestamp is dropped (aggregated to the `dt` day). The `mcp_usage_daily` rollup keeps `transport` (`web` or `local`), so the dashboard can show the web and local MCP servers separately; raw web rows written before the MCP Lambda stamped `transport` are counted as `web`. It also keeps `component_missed`, so the dashboard can count missed component lookups; rows written before misses were recorded count as no miss.

> **Note:** the snapshot generator refreshes the durable `portal_views_daily` rollup each run, then reads up to 13 calendar months of it for the dashboard's page-view trends.

Scheduled runs recompute only the recent tail. To capture page-views recorded before this rollup existed, or to add `transport` to older MCP usage rollup days, run the generator once with an explicit start date. The same `sinceDt` applies to both rollups, and writes are idempotent per day:

```sh
aws lambda invoke --function-name eufemia-<env>-analytics-snapshot \
  --payload '{"sinceDt":"2024-01-01"}' --cli-binary-format raw-in-base64-out /dev/stdout
```

The rollup refresh is best-effort, so the invoke returns a normal snapshot result even if the backfill failed — check the run logs or the `PortalViewsRollupFailure` and `McpUsageBuildFailure` metrics, not the invoke exit, and re-run if needed. If the full-history pass is too large for one invocation (90s / 256 MB), run it with progressively earlier `sinceDt` values (each re-scans to today; idempotent per day).

To inspect a dimension the dashboard doesn't show, run an ad-hoc Athena query against the workgroup, e.g. year-over-year page views by month:

```sql
SELECT substr(dt, 1, 7) AS month, sum(count) AS views
FROM portal_views_daily
GROUP BY substr(dt, 1, 7)
ORDER BY month;
```

Swap `sum(count)` groupings for any retained dimension (`locale`, `theme`, `color_scheme`, `referrer`, `via_search`, `status`, `path`, `env`) to inspect its history.

> **Note:** the `component_usage*` tables and `component-usage*` prefixes are scaffold for a future Nucleus component-usage producer. There is no producer yet, so the snapshot generator does **not** query them (to avoid running Athena against empty tables) and the section ships empty. Once a producer writes data, set `COMPONENT_USAGE_ENABLED = "true"` on the snapshot Lambda in `infra/main.tf`.

- **Athena workgroup** for the retrieve queries.
- **Lambda function** (`nodejs22.x`) serving the ingest routes under `eufemia-<env>-analytics-lambda`.
- **Dashboard-read Lambda** (`nodejs22.x`) serving `GET /data` under the read-only dashboard role, plus a **scheduled snapshot generator** Lambda (hourly EventBridge rule) that runs under `eufemia-<env>-analytics-snapshot-lambda` and refreshes `snapshots/dashboard.json` off the request path. CloudWatch alarms flag a failed generator run (`Errors`), a generator that has stopped firing (missing `Invocations`), a run that succeeds but writes a snapshot with no page views (the `SnapshotPortalViewCount` EMF metric stays below 1), and a run that fails to refresh, or falls back to an empty, MCP usage or component usage section (the `McpUsageBuildFailure`/`ComponentUsageBuildFailure` EMF metrics). The EMF-based alarms need no extra role permissions. All alarms notify an SNS topic (`snapshot_alerts`); set `snapshot_alert_email` to subscribe an address (SNS emails a confirmation link that must be clicked once), or add another `aws_sns_topic_subscription` pointed at a different target, such as AWS Chatbot or a formatting Lambda for Slack (a raw incoming webhook can't complete the SNS subscription handshake, so it isn't a drop-in target).
- **Lambda execution roles** for the three Lambdas, created by the deploy (see [Lambda execution roles](#lambda-execution-roles)).
- The generator is also invoked once at the end of every deploy (the `Seed snapshot` step in `ghe-deploy-workflow.yml`), so the dashboard has data immediately instead of waiting for the first scheduled run, and a generator failure fails the deploy rather than surfacing later as a silently unavailable dashboard.
- **API Gateway HTTP API** with the `/collect-portal-views` and `/collect-local-mcp-usage` ingest routes (plus `/healthz`) and throttling.

The dashboard is hosted separately as a static site:

- **Dashboard bucket** (private, versioned, SSE-S3, public access blocked) holding the static UI, read only by CloudFront via an Origin Access Control.
- **CloudFront distribution** serving the dashboard on its default `*.cloudfront.net` domain. The shell holds no data or secrets — data access is gated entirely by the Entra sign-in and the token-protected `/data` API. As defense-in-depth for the shell, a viewer-request CloudFront function locks the origin to the Akamai edge by rejecting any request missing the shared `X-Origin-Verify` header, so no Lambda@Edge or extra execution role is needed. A custom response-headers policy applies HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy` and a Content-Security-Policy (`script-src`/`connect-src` locked to same-origin, Entra sign-in and the dashboard API). The deploy job generates `dashboard/config.json` (non-secret public identifiers: `clientId`/`tenantId` from `ENTRA_CLIENT_ID`/`ENTRA_TENANT_ID`, `redirectUri` set to the canonical dashboard URL (`DASHBOARD_PUBLIC_URL`), `apiBaseUrl` from the dashboard API endpoint, and `apiScope` = `api://<clientId>/Dashboard.Read`), syncs the files to the bucket and invalidates the cache.

The dashboard API's CORS allows the dashboard's canonical origin (`DASHBOARD_PUBLIC_URL`, the custom domain) plus any extra origins from the optional `dashboard_origins` Terraform variable, such as a local-dev URL. The raw `*.cloudfront.net` origin is intentionally not allow-listed, since the dashboard is served via the custom domain (Akamai + WAF); direct access to the raw `*.cloudfront.net` origin is blocked at CloudFront by the `X-Origin-Verify` viewer-request function above, so only the Akamai edge (which injects the header) can reach it. After the first deploy, add the dashboard URL as a redirect URI on the app registration.

Prerequisites for sign-in and data to work end to end: the app registration must expose a `Dashboard.Read` scope under App ID URI `api://<clientId>` and issue v2 access tokens (`requestedAccessTokenVersion = 2`). The deploy role's CloudFront, S3, and SNS permissions are provisioned in the OIDC federation repo, alongside the Lambda execution role policies.

Terraform state reuses the shared `eufemia-mcp-terraform-state` bucket under the `analytics/` key.

## Production health monitor

The AWS service monitoring (`tools/service-monitoring`) runs `checkAnalytics` every hour: the public deploy run, the newest GHE `deploy` run, whether that deploy ran the newest public commit, the API health endpoint and the dashboard page. Failures and recoveries go to the shared Slack monitoring channel, like the CDN and MCP checks. See tools/service-monitoring for its setup, including the GHE token secret it reads. A permission failure in deployment verification reports unhealthy even when the API and dashboard are available, so read the individual check results.

For an on-demand check, run `yarn workspace eufemia-analytics check:analytics` with GH_TOKEN (optional, public GitHub API), GHE_TOKEN (Actions read on the internal analytics deployment repository) and ANALYTICS_DEPLOY_REPOSITORY (owner/repo) set. It prints the report and writes analytics-health-report.json; it sends no messages.

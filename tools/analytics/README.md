# Eufemia Analytics (AWS Lambda)

Minimal service to ingest anonymous portal analytics into AWS and serve it to the dashboard, deployed as AWS Lambda functions behind API Gateway.

## Architecture

```
POST /collect-portal-views → API Gateway HTTP API → Lambda (Node.js 22) → S3 (portal-views/dt=YYYY-MM-DD/*.json)
GET  /data (dashboard API) → read-only Lambda → S3 snapshot ← hourly generator → Athena (Glue table w/ partition projection)
```

Portal views are written to S3 as newline-delimited JSON (one event per line), partitioned by date. A Glue table with partition projection lets Athena query them without `MSCK`/`ADD PARTITION`. The Lambdas are stateless.

## HTTP API

| Route                        | Auth | Description                                |
| ---------------------------- | ---- | ------------------------------------------ |
| `GET /healthz`               | edge | Liveness probe                             |
| `POST /collect-portal-views` | edge | Ingest anonymous portal page views (batch) |

Every ingest route is gated by the Akamai `X-Edge-Auth` origin header; there is no bearer token, so the browser never holds a secret. First-party producers (MCP, Nucleus) write their own S3 prefix directly via IAM rather than through an HTTP route. The dashboard's read API (`GET /data`) is a separate HTTP API gated by an Entra JWT authorizer.

### Record shape

A portal view carries a `path` and optional `timestamp`, `env`, `status`, `locale`, `theme`, `color_scheme`, `referrer`, and `via_search` dimensions. The service stamps `created_at`; an absent `timestamp` defaults to that receive time, `status` defaults to `ok`, and the remaining absent dimensions default to `unknown`. An unrecognised `env`, `locale`, `theme`, `color_scheme`, `referrer`, or `via_search` is coerced to `unknown` rather than rejected, so a stale value never drops a batch. No identifiers or personal data are stored.

```json
{
  "path": "/uilib/components/button",
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

### Required configuration

Deploy credentials and configuration are provided via repository secrets and variables (managed in the repository settings), not stored in this repo.

### One-time bootstrap (admin, out-of-band)

Because the OIDC deploy role's permissions boundary forbids `iam:CreateRole` (ADR 0004), an admin must pre-create the Lambda execution role `eufemia-<env>-analytics-role` (trust policy for Lambda + `AWSLambdaBasicExecutionRole`) with an attached policy granting: `s3:GetObject`/`PutObject`/`ListBucket` on the data bucket (bucket-wide, so it covers every analytics prefix — `portal-views/`, `mcp-usage/`, `mcp-usage-daily/`, `component-usage/`, `component-usage-daily/`, `snapshots/`, `athena-results/`), `athena:StartQueryExecution`/`GetQueryExecution`/`GetQueryResults` on the workgroup, and `glue:GetTable`/`GetDatabase`/`GetPartitions` on the analytics database and its tables. The GHE deploy repo and its OIDC role/federation entry must also be provisioned, as with the MCP pipeline.

For the same reason, an admin must pre-create the read-only dashboard-read execution role `eufemia-<env>-dashboard-role` (trust policy for Lambda + `AWSLambdaBasicExecutionRole`) with an inline policy granting exactly one permission — `s3:GetObject` on the snapshot prefix `arn:aws:s3:::eufemia-<env>-analytics-<account-id>/snapshots/*` — and nothing else, so the browser-facing read Lambda has no write or Athena access. The snapshot generator Lambda reuses `eufemia-<env>-analytics-role` (it needs the same Athena + S3 access), so it requires no additional role.

## Infrastructure

`infra/` provisions:

- **S3 bucket** (versioned, SSE-S3, public access blocked) holding portal-view records (`portal-views/`, `portal-views-daily/`), MCP usage (`mcp-usage/`, `mcp-usage-daily/`), component usage (`component-usage/`, `component-usage-daily/`), the dashboard snapshot (`snapshots/dashboard.json`), and Athena output (`athena-results/`, expired after 7 days). The raw event prefixes (`portal-views/`, `mcp-usage/`, `component-usage/`) are expired after 395 days (≈ 13 months) to cover year-over-year reporting; the daily rollups (`*-daily/`) and the regenerated snapshot are not expired, so aggregated history outlives the raw rows.
- **Glue database + tables** with JSON SerDe and partition projection on `dt` (`portal_views`, `portal_views_daily`, `mcp_usage`, `mcp_usage_daily`, `component_usage`, `component_usage_daily`). The `portal_views_daily` rollup keeps the anonymous view dimensions (`status`, `locale`, `theme`, `color_scheme`, `referrer`, `via_search`) alongside `path`/`env` so their history survives the raw expiry and stays queryable via Athena; only the per-event timestamp is dropped (aggregated to the `dt` day).

> **Note:** the snapshot generator refreshes the durable `portal_views_daily` rollup each run for retention, but the dashboard does not read it yet — it still shows the recent raw page-view rows. Surfacing the retained history (and its dimensions) on the dashboard is a follow-up; the rollup exists now so the history is preserved before the raw rows begin to expire.

Scheduled runs recompute only the recent tail. To capture page-views recorded before this rollup existed, run the generator once with an explicit start date (writes are idempotent per day):

```sh
aws lambda invoke --function-name eufemia-<env>-analytics-snapshot \
  --payload '{"sinceDt":"2024-01-01"}' --cli-binary-format raw-in-base64-out /dev/stdout
```

The rollup refresh is best-effort, so the invoke returns a normal snapshot result even if the backfill failed — check the run logs or the `PortalViewsRollupFailure` metric, not the invoke exit, and re-run if needed. If the full-history pass is too large for one invocation (90s / 256 MB), run it with progressively earlier `sinceDt` values (each re-scans to today; idempotent per day).

Because nothing reads the rollup back in-app yet, sanity-check that the retained history is queryable with an ad-hoc Athena query against the workgroup, e.g. year-over-year page views by month:

```sql
SELECT substr(dt, 1, 7) AS month, sum(count) AS views
FROM portal_views_daily
GROUP BY substr(dt, 1, 7)
ORDER BY month;
```

Swap `sum(count)` groupings for any retained dimension (`locale`, `theme`, `color_scheme`, `referrer`, `via_search`, `status`, `path`, `env`) to inspect its history.

> **Note:** the `component_usage*` tables and `component-usage*` prefixes are scaffold for a future Nucleus component-usage producer. There is no producer yet, so the snapshot generator does **not** query them (to avoid running Athena against empty tables) and the section ships empty. Re-wiring is a small change in `buildComponentUsage`'s caller — see the guidance in `src/lambda/snapshot.ts`.

- **Athena workgroup** for the retrieve queries.
- **Lambda function** (`nodejs22.x`) — its execution role is pre-created out-of-band, because the OIDC deploy role's permissions boundary forbids `iam:CreateRole` (ADR 0004); it is only referenced here.
- **Dashboard-read Lambda** (`nodejs22.x`) serving `GET /data` under the read-only `eufemia-<env>-dashboard-role`, plus a **scheduled snapshot generator** Lambda (hourly EventBridge rule) that runs under `eufemia-<env>-analytics-role` and refreshes `snapshots/dashboard.json` off the request path. CloudWatch alarms flag a failed generator run (`Errors`), a generator that has stopped firing (missing `Invocations`), a run that succeeds but writes an empty snapshot (the `SnapshotRecordCount` EMF metric stays below 1), and a run that falls back to an empty MCP usage or component usage section (the `McpUsageBuildFailure`/`ComponentUsageBuildFailure` EMF metrics). The EMF-based alarms need no extra role permissions. All alarms notify an SNS topic (`snapshot_alerts`); set `snapshot_alert_email` to subscribe an address (SNS emails a confirmation link that must be clicked once), or add another `aws_sns_topic_subscription` pointed at a different target, such as AWS Chatbot or a formatting Lambda for Slack (a raw incoming webhook can't complete the SNS subscription handshake, so it isn't a drop-in target).
- The generator is also invoked once at the end of every deploy (the `Seed snapshot` step in `ghe-deploy-workflow.yml`), so the dashboard has data immediately instead of waiting for the first scheduled run, and a generator failure fails the deploy rather than surfacing later as a silently unavailable dashboard.
- **API Gateway HTTP API** with the `/collect-portal-views` ingest route (plus `/healthz`) and throttling.

The dashboard is hosted separately as a static site:

- **Dashboard bucket** (private, versioned, SSE-S3, public access blocked) holding the static UI, read only by CloudFront via an Origin Access Control.
- **CloudFront distribution** serving the dashboard on its default `*.cloudfront.net` domain. The shell holds no data or secrets — data access is gated entirely by the Entra sign-in and the token-protected `/data` API. As defense-in-depth for the shell, a viewer-request CloudFront function locks the origin to the Akamai edge by rejecting any request missing the shared `X-Origin-Verify` header, so no Lambda@Edge or extra execution role is needed. A custom response-headers policy applies HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy` and a Content-Security-Policy (`script-src`/`connect-src` locked to same-origin, Entra sign-in and the dashboard API). The deploy job generates `dashboard/config.json` (non-secret public identifiers: `clientId`/`tenantId` from `ENTRA_CLIENT_ID`/`ENTRA_TENANT_ID`, `redirectUri` set to the canonical dashboard URL (`DASHBOARD_PUBLIC_URL`), `apiBaseUrl` from the dashboard API endpoint, and `apiScope` = `api://<clientId>/Dashboard.Read`), syncs the files to the bucket and invalidates the cache.

The dashboard API's CORS allows the dashboard's canonical origin (`DASHBOARD_PUBLIC_URL`, the custom domain) plus any extra origins from the optional `dashboard_origins` Terraform variable, such as a local-dev URL. The raw `*.cloudfront.net` origin is intentionally not allow-listed, since the dashboard is served via the custom domain (Akamai + WAF); direct access to the raw `*.cloudfront.net` origin is blocked at CloudFront by the `X-Origin-Verify` viewer-request function above, so only the Akamai edge (which injects the header) can reach it. After the first deploy, add the dashboard URL as a redirect URI on the app registration.

Prerequisites for sign-in and data to work end to end: the app registration must expose a `Dashboard.Read` scope under App ID URI `api://<clientId>` and issue v2 access tokens (`requestedAccessTokenVersion = 2`). The deploy role's CloudFront, S3, and SNS permissions are provisioned in the OIDC federation repo, alongside the Lambda execution role.

Terraform state reuses the shared `eufemia-mcp-terraform-state` bucket under the `analytics/` key.

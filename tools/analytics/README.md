# Eufemia Analytics (AWS Lambda)

Minimal service to store and retrieve analytics records in AWS, deployed as an AWS Lambda function behind API Gateway.

## Architecture

```
POST /records → API Gateway HTTP API → Lambda (Node.js 22) → S3 (records/dt=YYYY-MM-DD/<id>.json)
GET  /records → API Gateway HTTP API → Lambda (Node.js 22) → Athena (Glue table w/ partition projection) → S3
```

Records are written to S3 as one JSON object per record, partitioned by date. A Glue table with partition projection lets Athena query them without `MSCK`/`ADD PARTITION`. The Lambda is stateless.

## HTTP API

| Route           | Auth   | Description                                             |
| --------------- | ------ | ------------------------------------------------------- |
| `GET /healthz`  | edge   | Liveness probe                                          |
| `POST /records` | bearer | Store a record: `{ "id", "name", "value" }`             |
| `GET /records`  | bearer | Retrieve records; optional `?id=` and `?limit=` filters |

Auth is a bearer token compared against the `API_TOKEN` environment variable, and the origin additionally requires the Akamai `X-Edge-Auth` header.

### Record shape

`id`, `name` and `value` are supplied by the caller; `createdAt` is stamped by the service.

```json
{
  "id": "abc-1",
  "name": "Widget",
  "value": 42,
  "createdAt": "2026-08-07T09:00:00.000Z"
}
```

`id` must match `^[A-Za-z0-9._-]{1,128}$`, `name` is at most 256 characters, and `value` must be a finite number.

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

Copy `infra/terraform.tfvars.example` to `infra/terraform.tfvars` and fill in `cost_allocation` (and `api_token` to enable auth). `terraform.tfvars` is gitignored.

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

Because the OIDC deploy role's permissions boundary forbids `iam:CreateRole` (ADR 0004), an admin must pre-create the Lambda execution role `eufemia-<env>-analytics-role` (trust policy for Lambda + `AWSLambdaBasicExecutionRole`) with an attached policy granting: `s3:GetObject`/`PutObject`/`ListBucket` on the data bucket, `athena:StartQueryExecution`/`GetQueryExecution`/`GetQueryResults` on the workgroup, and `glue:GetTable`/`GetDatabase`/`GetPartitions` on the analytics database/table. The GHE deploy repo and its OIDC role/federation entry must also be provisioned, as with the MCP pipeline.

For the same reason, an admin must pre-create the read-only dashboard-read execution role `eufemia-<env>-dashboard-role` (trust policy for Lambda + `AWSLambdaBasicExecutionRole`) with an inline policy granting exactly one permission — `s3:GetObject` on the snapshot object `arn:aws:s3:::eufemia-<env>-analytics-<account-id>/records/dashboard-snapshot.json` — and nothing else, so the browser-facing read Lambda has no write or Athena access. The snapshot generator Lambda reuses `eufemia-<env>-analytics-role` (it needs the same Athena + S3 access), so it requires no additional role.

## Infrastructure

`infra/` provisions:

- **S3 bucket** (versioned, SSE-S3, public access blocked) holding both records (`records/`) and Athena output (`athena-results/`, expired after 7 days).
- **Glue database + table** with JSON SerDe and partition projection on `dt`.
- **Athena workgroup** for the retrieve queries.
- **Lambda function** (`nodejs22.x`) — its execution role is pre-created out-of-band, because the OIDC deploy role's permissions boundary forbids `iam:CreateRole` (ADR 0004); it is only referenced here.
- **Dashboard-read Lambda** (`nodejs22.x`) serving `GET /data` under the read-only `eufemia-<env>-dashboard-role`, plus a **scheduled snapshot generator** Lambda (hourly EventBridge rule) that runs under `eufemia-<env>-analytics-role` and refreshes `records/dashboard-snapshot.json` off the request path.
- **API Gateway HTTP API** with the two `/records` routes and throttling.

The dashboard is hosted separately as a static site:

- **Dashboard bucket** (private, versioned, SSE-S3, public access blocked) holding the static UI, read only by CloudFront via an Origin Access Control.
- **CloudFront distribution** serving the dashboard on its default `*.cloudfront.net` domain. The shell holds no data or secrets — access is gated entirely by the Entra sign-in and the token-protected `/data` API — so no Lambda@Edge, edge auth or extra IAM role is needed. The deploy job generates `dashboard/config.json` (non-secret public identifiers: `clientId`/`tenantId` from `ENTRA_CLIENT_ID`/`ENTRA_TENANT_ID`, `redirectUri` set to the CloudFront URL, `apiBaseUrl` from the dashboard API endpoint, and `apiScope` = `api://<clientId>/Dashboard.Read`), syncs the files to the bucket and invalidates the cache.

The CloudFront origin is added to the dashboard API's CORS automatically (the distribution domain is concatenated onto `DASHBOARD_ORIGINS`), so no second deploy is needed for cross-origin `/data` calls; `DASHBOARD_ORIGINS` only needs any extra origins such as a local-dev URL. After the first deploy, add the CloudFront URL as a redirect URI on the app registration.

Prerequisites for sign-in and data to work end to end: the app registration must expose a `Dashboard.Read` scope under App ID URI `api://<clientId>` and issue v2 access tokens (`requestedAccessTokenVersion = 2`). The deploy role's CloudFront and S3 permissions are provisioned in the OIDC federation repo, alongside the Lambda execution role.

Terraform state reuses the shared `eufemia-mcp-terraform-state` bucket under the `analytics/` key.

# Eufemia MCP Server (AWS Lambda)

MCP server that exposes the Eufemia documentation to AI tools, deployed as an AWS Lambda function behind API Gateway.

## Architecture

```
POST /mcp/web → API Gateway HTTP API → Lambda (Node.js 22) → MCP SDK → Docs on disk
                                                   └→ SQS → consumer Lambda → analytics S3
```

The server is stateless and serves both the MCP 2025 and `2026-07-28`
protocol eras from the same `/mcp` URL. No session state is kept between
invocations. Tool definitions and docs access are shared with the local MCP
implementation in `packages/dnb-eufemia/src/mcp/`.

For local development, a stdio transport is also available.

> **Relationship to the in-repo MCP core:** A local stdio/HTTP MCP server lives
> under [`packages/dnb-eufemia/src/mcp/`](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/mcp/)
> for editor integrations and offline use. It was previously also deployed as a
> Cloudflare Worker; that hosted deployment has been removed in favour of this
> Lambda-based server.

## Available tools

| Tool              | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `docs_entry`      | Read `llm.md` — the AI entrypoint to understand docs structure |
| `docs_index`      | List all markdown/MDX file paths                               |
| `docs_list`       | List docs under an optional prefix                             |
| `docs_read`       | Read a single file by path                                     |
| `docs_search`     | Full-text search with ranked results                           |
| `component_find`  | Resolve doc/properties/events paths for a component            |
| `component_doc`   | Read full markdown for a component                             |
| `component_api`   | Extract JSON code blocks from a component doc                  |
| `component_props` | Get structured JSON blocks for props/events                    |

Component names support dot-notation: `Button`, `Field.Address`, `Value.Name`, `Form.Section`.

## Prerequisites

- Node.js — the repo pins Node 24 via Volta for local development; the deployed Lambda runtime is Node 22
- Yarn (workspace-aware)
- AWS CLI configured with appropriate credentials
- Terraform >= 1.10

## Local development

Run the MCP server locally via stdio (for editor integrations):

```bash
# Build docs first (if not already built)
yarn workspace @dnb/eufemia build:docs

# Run with stdio transport
yarn dev
```

Set `EUFEMIA_DOCS_ROOT` to override the docs directory:

```bash
EUFEMIA_DOCS_ROOT=/path/to/docs yarn dev
```

## Scripts

| Script             | Description                            |
| ------------------ | -------------------------------------- |
| `yarn dev`         | Run locally via stdio transport        |
| `yarn test`        | Run tests                              |
| `yarn typecheck`   | Type-check without emitting            |
| `yarn build`       | Build docs and create both Lambda ZIPs |
| `yarn deploy:plan` | Build and run `terraform plan`         |
| `yarn deploy`      | Build and run `terraform apply`        |

## Build

The build script does the following:

1. Builds Eufemia docs (`yarn workspace @dnb/eufemia build:docs`)
2. Bundles the MCP and usage-consumer handlers into separate ESM files
3. Copies the built docs into `dist/docs/`
4. Creates `dist/lambda.zip` and `dist/usage-consumer.zip`

```bash
yarn build
```

## Deploying

```bash
# Preview what will change
yarn deploy:plan

# Apply changes
yarn deploy
```

Terraform state is stored in S3 (`eufemia-mcp-terraform-state`) with the S3 native state lockfile (`use_lockfile`).

### Continuous deployment

Deployment is a two-stage pipeline that spans public GitHub and GitHub Enterprise:

1. **Build & push** — [`.github/workflows/mcp-lambda.yml`](https://github.com/dnbexperience/eufemia/blob/main/.github/workflows/mcp-lambda.yml) runs on public GitHub. It tests, builds both Lambda artifacts, and force-pushes them with `infra/` and the deploy workflow to the `deploy` branch of the GHE repo (`eufemia/eufemia-mcp`). It only pushes when the `GHE_DEPLOY_PAT` secret is set (skips on forks).
2. **Deploy** — `ghe-deploy-workflow.yml` (shipped as `.github/workflows/deploy.yml` on the GHE `deploy` branch) runs on push to `deploy`. It authenticates to AWS via OIDC and runs `terraform apply`.

The build & push workflow triggers on:

| Trigger                       | Deploys? |
| ----------------------------- | -------- |
| Push to `release`             | Yes      |
| Push of a `v*` / `v*.*.*` tag | Yes      |
| Manual `workflow_dispatch`    | Yes      |

Deploy credentials and configuration are provided via repository secrets and variables (managed in the repository settings), not stored in this repo.

The MCP execution role needs `sqs:SendMessage` on the usage queue. The
pre-created `eufemia-<env>-mcp-usage-consumer-role` needs basic Lambda logging,
`sqs:ReceiveMessage`/`DeleteMessage`/`GetQueueAttributes` on that queue, and
`s3:PutObject` on the analytics bucket's `mcp-usage/*` prefix.

### Infrastructure

Managed via Terraform in `infra/`:

| Resource       | Configuration                                      |
| -------------- | -------------------------------------------------- |
| MCP Lambda     | Node.js 22, 512 MB, 30s timeout, 30 max concurrent |
| Usage pipeline | Encrypted SQS, batched consumer, retry queue + DLQ |
| API Gateway    | HTTP API, `POST /mcp/web` + `GET /healthz`         |
| Throttling     | 200 burst / 400 requests per second                |
| CloudWatch     | 30-day log retention                               |
| Region         | eu-north-1                                         |

### Emergency stop

Set Lambda concurrency to 0 to immediately reject all requests:

```bash
aws lambda put-function-concurrency \
  --function-name eufemia-dev-mcp \
  --reserved-concurrent-executions 0
```

Reverse it by restoring the value declared in [`infra/main.tf`](infra/main.tf)
(`reserved_concurrent_executions`). The simplest way is to re-run the deploy
(or `terraform apply`), which resets it to the source-of-truth value. To restore
manually without a deploy, pass that same number:

```bash
# Use the current reserved_concurrent_executions from infra/main.tf
aws lambda put-function-concurrency \
  --function-name eufemia-dev-mcp \
  --reserved-concurrent-executions <value-from-main.tf>
```

## Project structure

```
tools/mcp-lambda/
├── src/
│   ├── resolve-docs-root.ts   # Docs-root resolution (env + candidates)
│   ├── server.ts              # Adapter for the shared MCP server factory
│   ├── transports/
│   │   ├── stdio.ts           # Local dev entry point
│   │   └── lambda-handler.ts  # AWS Lambda entry point
│   └── __tests__/
│       ├── docs-server.test.ts
│       ├── docs-source.test.ts
│       ├── docs-source-node.test.ts
│       ├── lambda-handler.test.ts
│       └── resolve-docs-root.test.ts
├── infra/
│   ├── main.tf                # Lambda, API Gateway, IAM, CloudWatch
│   ├── variables.tf           # Region, environment, cost allocation
│   ├── outputs.tf             # API endpoint URL
│   ├── providers.tf           # AWS provider, S3 backend
│   └── terraform.tfvars       # Variable values (gitignored)
├── ghe-deploy-workflow.yml    # Deploy workflow shipped to the GHE deploy branch
├── dist/                      # Build output (gitignored)
├── package.json
└── tsconfig.json
```

## Production HTTP monitoring

The **Eufemia HTTP MCP health** workflow checks
https://server.eufemia.dnb.no/mcp/web every hour, after **MCP Lambda**
completes, and on manual dispatch from the default branch. It executes Node.js
directly without installing dependencies or receiving deployment credentials.

Each run checks:

- Public HTTPS liveness at https://server.eufemia.dnb.no/healthz.
- MCP 2025 initialization and MCP 2026 discovery, including server identity,
  supported protocol and tools capability.
- The required documentation tools in both protocol versions.
- A real Button documentation read and valid docs metadata through both
  transports. HTTP 200 containing an error or empty document fails.
- The served docs commit against the most recent MCP Lambda deployment source.
  A mismatch is pending for one hour after the public build/push completes;
  actual availability and protocol failures still fail after retries. Failed
  deployment workflows and runs stalled for an hour are reported separately.

The hosted docs are rebuilt independently of npm and currently report a
development version. The source commit is the deployment freshness signal;
this monitor does not claim npm version equality. The public deployment
workflow hands artifacts to a separate deploy pipeline, so its success alone
is insufficient: the monitor also checks the commit returned by production.
A public workflow that finishes without updating production is detected after
the rollout window. Metadata uses the generated short commit hash.

Requests have a 20-second deadline, a 1 MiB response limit and two retries.
JSON and event-stream replies are supported; complete MCP events are consumed
without waiting for the server to close the stream. These are read-only MCP
tool calls. They pass through the existing anonymous usage tracking and are
not unique-user activity. The check does not verify the telemetry consumer,
all documentation files, every edge location or deployment infrastructure.

An unhealthy run opens one **Eufemia MCP incident** and fails the workflow.
The shared incident reporter keeps MCP and CDN incidents separate. It alerts
on new or changed failures and recovery, with no messages for identical
failures. Recovery comments on and closes the incident; pending deployments
do not close it. Failed notification delivery is retried on the next run.
Reports are attached as workflow artifacts for 14 days.

Slack uses the existing repository secret `CDN_ALERT_WEBHOOK` by default, so
these alerts reach the same team channel. Set `MCP_ALERT_WEBHOOK` to a separate
Slack incoming webhook to use a different channel. The workflow's built-in
GitHub token reads public deployment status and manages the incident issue;
no personal token or AWS credentials are needed.

After merging, dispatch **Eufemia HTTP MCP health** from the default branch
and inspect the report. Verify controlled failure and recovery in a test
repository/channel before relying on the notification route. Local tests
cover the incident lifecycle without creating issues or sending Slack messages.
GitHub schedules can be delayed or dropped and stop after 60 days without
repository activity. For prompt paging and regional coverage, pair this with
an independent multi-region uptime check of the public health endpoint every
1–5 minutes. See
[GitHub's schedule limitations](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

Run the production check locally from the repository root:

```sh
yarn workspace eufemia-mcp-lambda check:http
```

This reads public production endpoints and writes
`tools/mcp-lambda/mcp-health-report.json`. Exit code 1 means unhealthy; a
pending deployment is reported explicitly and exits 0. To run the same
read-only production checks outside Yarn, use:

```sh
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON tools/mcp-lambda/src/check-http.ts
```

The report is written to the current directory. An optional `GH_TOKEN` is sent
only to the GitHub API for rate limiting; MCP endpoints receive no credentials.

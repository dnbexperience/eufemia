# Eufemia MCP Server (AWS Lambda)

MCP server that exposes the Eufemia documentation to AI tools, deployed as an AWS Lambda function behind API Gateway.

## Architecture

```
POST /mcp → API Gateway HTTP API → Lambda (Node.js 22) → MCP SDK → Docs on disk
```

The server is stateless — each request creates a fresh MCP transport, processes the JSON-RPC call, and tears down. No session state is kept between invocations.

For local development, a stdio transport is also available.

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

- Node.js 22+
- Yarn (workspace-aware)
- AWS CLI configured with appropriate credentials
- Terraform >= 1.5

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

| Script             | Description                                     |
| ------------------ | ----------------------------------------------- |
| `yarn dev`         | Run locally via stdio transport                 |
| `yarn test`        | Run tests                                       |
| `yarn typecheck`   | Type-check without emitting                     |
| `yarn build`       | Build docs, bundle handler, create `lambda.zip` |
| `yarn deploy:plan` | Build and run `terraform plan`                  |
| `yarn deploy`      | Build and run `terraform apply`                 |

## Build

The build script does the following:

1. Builds Eufemia docs (`yarn workspace @dnb/eufemia build:docs`)
2. Bundles `lambda-handler.ts` with esbuild into a single ESM file
3. Copies the built docs into `dist/docs/`
4. Zips everything into `dist/lambda.zip`

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

Terraform state is stored in S3 (`eufemia-mcp-terraform-state`) with DynamoDB locking.

### Infrastructure

Managed via Terraform in `infra/`:

| Resource    | Configuration                                      |
| ----------- | -------------------------------------------------- |
| Lambda      | Node.js 22, 512 MB, 30s timeout, 10 max concurrent |
| API Gateway | HTTP API, `POST /mcp` only                         |
| Throttling  | 50 burst / 100 requests per second                 |
| CloudWatch  | 30-day log retention                               |
| Region      | eu-north-1                                         |

### Emergency stop

Set Lambda concurrency to 0 to immediately reject all requests:

```bash
aws lambda put-function-concurrency \
  --function-name eufemia-dev-mcp \
  --reserved-concurrent-executions 0
```

Reverse it:

```bash
aws lambda put-function-concurrency \
  --function-name eufemia-dev-mcp \
  --reserved-concurrent-executions 10
```

## Project structure

```
tools/mcp/
├── src/
│   ├── server.ts              # Server singleton (resolves docs root)
│   ├── docs-server.ts         # Tool handlers, search, component resolution
│   ├── docs-source.ts         # Filesystem abstraction (DocsSource interface)
│   ├── transports/
│   │   ├── stdio.ts           # Local dev entry point
│   │   └── lambda-handler.ts  # AWS Lambda entry point
│   └── __tests__/
│       ├── docs-source.test.ts
│       ├── docs-source-node.test.ts
│       └── docs-server.test.ts
├── infra/
│   ├── main.tf                # Lambda, API Gateway, IAM, CloudWatch
│   ├── variables.tf           # Region, environment, cost allocation
│   ├── outputs.tf             # API endpoint URL
│   ├── providers.tf           # AWS provider, S3 backend
│   └── terraform.tfvars       # Variable values (gitignored)
├── dist/                      # Build output (gitignored)
├── package.json
└── tsconfig.json
```

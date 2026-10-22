# Eufemia service monitoring

Hourly AWS checks of the public CDN and HTTP MCP server, independent of GitHub's scheduled-workflow delivery. Reuses the existing checkCdn and checkHttpMcp implementations, including their retries, response limits and rollout grace periods.

## Deployment

The public Service Monitoring Lambda workflow tests and bundles the checks, then copies the ZIP, Terraform and internal deployment workflow to the repository configured by GHE_MONITORING_DEPLOY_REPO. Only main can perform the handoff. The internal workflow uses OIDC to apply Terraform and invokes both monitors as a smoke test. Until the handoff variable is configured, CI still validates and produces a downloadable deployment artifact.

Each service has a separate Node.js 22 Lambda using the same bundle, with 256 MB memory and one reserved concurrent execution. The HTTP budget is 330 seconds; Lambda allows 480 seconds for checks, persistence and notifications. There is no public inbound endpoint, runtime checkout, docs build or package installation. The production checks always use the public edge, including npm and GitHub for freshness verification.

EventBridge Scheduler runs CDN at :07 and MCP at :11 hourly in UTC, with flexible windows disabled. Scheduler has minute-level precision, not a hard execution-time guarantee. Scheduler delivery and asynchronous Lambda execution have separate bounded retry policies and failure destinations. Retried invocations perform fresh checks, so old event payloads cannot overwrite a newer observation.

## One-time setup

1. Create a dedicated internal deployment repository. Provision its OIDC deploy role through the internal federation repository, restricted to the deploy branch and verified repository IDs. Give it scoped access to this stack, its Terraform state key and permission to pass the three execution roles.
2. Use the internal AWS bootstrap repository to create the Lambda, Scheduler and Slack notifier roles under the approved permissions boundary. Terraform only reads these roles. The check role needs log writes, DynamoDB item read/write, secret read and failure-queue writes. The notifier needs its own log writes, webhook secret read and sqs:SendMessage for its failure destination; it has no DynamoDB access. Scheduler trust restricts the source account and schedule group. Its permissions are lambda:InvokeFunction for the two check functions and sqs:SendMessage for the schedule failure queue.
3. Configure GHE_MONITORING_DEPLOY_REPO in the public repo and grant the existing GHE_DEPLOY_PAT access to it. Configure the internal variables below.
4. Deploy with notifications disabled. Terraform creates an empty Secrets Manager secret. An operator populates its string value with the existing Slack webhook URL through Secrets Manager. Never place secret values in Terraform, repository variables, logs or committed files. GitHub cannot export an existing Actions secret.

| Internal variable                  | Value                                                             |
| ---------------------------------- | ----------------------------------------------------------------- |
| AWS_ROLE_ARN                       | Provisioned monitoring OIDC deploy role                           |
| COST_ALLOCATION                    | Approved ServiceNow cost allocation                               |
| TF_STATE_BUCKET                    | Existing encrypted Terraform state bucket                         |
| MONITORING_ENVIRONMENT             | Account environment, defaults to dev                              |
| MONITORING_NOTIFICATIONS_ENABLED   | false during verification, then true                              |
| MONITORING_GITHUB_TOKEN_SECRET_ARN | Optional Secrets Manager ARN for a read-only GitHub Actions token |

State uses the default Terraform workspace at service-monitoring/terraform.tfstate with S3 native locking. Workspace discovery is scoped to service-monitoring/workspaces/, matching the deployment role's monitoring-only bucket listing permission. The deployment role only has object access to the default workspace state and its lock.

The environment controls AWS resource naming; checks always target production. Use a separate state key for another environment. Secret values are read at runtime and are not managed in Terraform state. After creation, description and KMS key changes are owned by the administrator and ignored by Terraform; the deployment role does not have UpdateSecret permission.

The optional GitHub credential is a secret string with read-only public workflow access, rather than an ephemeral Actions token. Without it, GitHub source verification uses the unauthenticated API limit. A 403/429 makes the deployment-source check unhealthy while endpoint checks continue; unchanged failures are deduplicated. Provision a read-only token before enabling alerts if shadow runs encounter rate limiting.

Functions use Lambda's default network with outbound HTTPS. If account policy requires a VPC, provide approved outbound connectivity to the public edge, npm, GitHub, Slack and AWS services before deployment.

## Slack alerts and recovery

Each service has a separate DynamoDB item containing the latest report, last acknowledged fingerprint and pending notification. Slack alerts on a new or changed failure and once on recovery. A pending rollout does not close an incident. Shadow runs save reports and metrics without sending or acknowledging notifications.

Notification intent is persisted before delivery and acknowledged only after Slack accepts it. Pending notifications survive a failed send and are retried before subsequent recovery messages. Delivery is at least once: a crash after Slack accepts a message but before persistence can duplicate that message. One reserved concurrent execution serializes each service's state updates. Keep all invocations on the unqualified functions configured by this stack.

CloudWatch reports persist for 30 days. Execution failures log the stage and an allowlisted error type; rejected Slack responses also include the HTTP status. Error messages, request URLs and credential values are excluded. DynamoDB retains the latest report with encryption, point-in-time recovery and deletion protection. Function-name metric dimensions keep environments isolated.

Monitor-health alarms also go to Slack, using SNS and a separate notifier Lambda. They cover failed Lambda executions, missing completed checks in two consecutive hourly periods and exhausted Scheduler or asynchronous execution retries. This route does not require the check function or its DynamoDB table to work. Service failure and recovery messages come directly from the check functions, avoiding duplicate service alarms.

No email subscriptions are created. If Slack is unavailable, delivery fails visibly in AWS and failed events are retained for 14 days in the failure queue after retries. Slack cannot receive an alert while Slack itself is unavailable. Inspect logs and queued events before replaying or removing failures. SNS alarm notifications may be duplicated by retry delivery and include the alarm name and state.

GitHub issues remain owned by the existing Actions monitors during migration. AWS alert delivery does not depend on GitHub issue writes. Adding issue synchronization later requires a dedicated GitHub App and explicit incident ownership. Unavailable MCP freshness verification appears separately from endpoint failures in the report. A configured GitHub secret that cannot be read does not prevent endpoint checks.

## Verify and switch over

1. Run tests, types, lint, bundle import checks, Terraform validation and live checks. CI repeats offline validation and never sends test Slack messages.
2. Deploy with notifications disabled. Inspect both smoke tests and at least two actual hourly executions per service. Confirm the secret is populated and metrics use the expected function dimensions.
3. In an isolated test stack with a test webhook, verify a failed check, unchanged failure, recovery, rejected Slack request, storage failure and stopped schedule. Confirm service alerts and monitor-health alarms. Offline tests inject check dependencies and do not alter production endpoints.
4. Enable AWS notifications and verify Slack delivery with an authorized test. Then retire Actions cron triggers and automatic incident reporting for these services in a follow-up PR. Preserve useful manual and post-deployment checks while assigning alert ownership to one system.

Existing Actions schedules remain active until verification is complete. Roll back alert ownership by disabling AWS notifications and restoring Actions reporting. A regional AWS outage needs an external uptime service for independent paging.

## Local validation

Run the service-monitoring workspace scripts: test, test:types, lint and build. The build imports both shipped ESM bundles before packaging the ZIP, catching loader failures. Initialize Terraform with backend disabled and the committed lockfile before validation. Live check commands remain in the existing assets and mcp-lambda workspaces; running them without the alert wrappers sends no messages.

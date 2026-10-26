# Eufemia service monitoring

Hourly AWS checks of the public CDN and HTTP MCP server, independent of GitHub's scheduled-workflow delivery. Reuses the existing checkCdn and checkHttpMcp implementations, including their retries, response limits and rollout grace periods.

## Deployment

The public Service Monitoring Lambda workflow tests and bundles the checks, then copies the ZIP, Terraform and internal deployment workflow to the repository configured by GHE_MONITORING_DEPLOY_REPO. Only main can perform the handoff. The internal workflow uses OIDC to apply Terraform and invokes both monitors as a smoke test. Until the handoff variable is configured, CI still validates and produces a downloadable deployment artifact. Root dependency and Yarn configuration changes also trigger validation. The handoff compares the complete deployment package with the internal deploy branch and skips the push when its contents are unchanged; dependency changes that affect the bundle still deploy.

Each service has a separate Node.js 22 Lambda using the same bundle, with 256 MB memory and one reserved concurrent execution. The HTTP budget is 330 seconds; Lambda allows 480 seconds for checks, persistence and notifications. There is no public inbound endpoint, runtime checkout, docs build or package installation. The production checks always use the public edge, including npm and GitHub for freshness verification.

EventBridge Scheduler runs CDN at :07 and MCP at :11 hourly in UTC, with flexible windows disabled. Scheduler has minute-level precision, not a hard execution-time guarantee. Scheduler delivery and asynchronous Lambda execution have separate bounded retry policies and failure destinations. Retried invocations perform fresh checks, so old event payloads cannot overwrite a newer observation.

## One-time setup

1. Create a dedicated internal deployment repository. Provision its OIDC deploy role through the internal federation repository, restricted to the deploy branch and verified repository IDs. Give it scoped access to this stack, its Terraform state key and permission to pass the three execution roles.
2. Use the internal AWS bootstrap repository to create the Lambda, Scheduler and Slack notifier roles under the approved permissions boundary. Terraform only reads these roles. The check role needs log writes, DynamoDB item read/write, secret read, sns:Publish to the monitoring topic and failure-queue writes. The notifier needs its own log writes, bot configuration secret read, monitoring-table item read/write and sqs:SendMessage for its failure destination. Scheduler trust restricts the source account and schedule group. Its permissions are lambda:InvokeFunction for the two check functions and sqs:SendMessage for the schedule failure queue.
3. Configure GHE_MONITORING_DEPLOY_REPO in the public repo and a monitoring-only GHE_MONITORING_DEPLOY_PAT credential with Contents read/write, Workflows read/write and required Metadata read for that internal repository only. The handoff writes .github/workflows/deploy.yml, so workflow-file access is required. Configure the internal variables below.
4. Configure the Slack bot secret and deploy with notifications disabled. Follow the Slack app setup below before enabling notifications. The existing webhook secret remains for rollback; never put secret values in Terraform, repository variables, logs or committed files.

The deployment token must remain active for automatic updates. Record its owner
and expiration in the internal deployment repository, renew it before expiration,
and replace GHE_MONITORING_DEPLOY_PAT. Then dispatch Service Monitoring Lambda
from main and verify both the public handoff and internal deployment. The deployed
AWS schedules continue running independently if a deployment credential expires.

| Internal variable                  | Value                                                                |
| ---------------------------------- | -------------------------------------------------------------------- |
| AWS_ROLE_ARN                       | Provisioned monitoring OIDC deploy role                              |
| COST_ALLOCATION                    | Approved ServiceNow cost allocation                                  |
| TF_STATE_BUCKET                    | Existing encrypted Terraform state bucket                            |
| MONITORING_ENVIRONMENT             | Account environment, defaults to dev                                 |
| MONITORING_SLACK_BOT_SECRET_ARN    | Required bot configuration secret ARN when notifications are enabled |
| MONITORING_NOTIFICATIONS_ENABLED   | false during verification, then true                                 |
| MONITORING_GITHUB_TOKEN_SECRET_ARN | Optional Secrets Manager ARN for a read-only GitHub Actions token    |

State uses the default Terraform workspace at service-monitoring/terraform.tfstate with S3 native locking. Workspace discovery is scoped to service-monitoring/workspaces/, matching the deployment role's monitoring-only bucket listing permission. The deployment role only has object access to the default workspace state and its lock.

The environment controls AWS resource naming; checks always target production. Use a separate state key for another environment. Secret values are read at runtime and are not managed in Terraform state. After creation, description and KMS key changes are owned by the administrator and ignored by Terraform; the deployment role does not have UpdateSecret permission.

The optional GitHub credential is a secret string with read-only public workflow access, rather than an ephemeral Actions token. Without it, GitHub source verification uses the unauthenticated API limit. A 403/429 makes the deployment-source check unhealthy while endpoint checks continue; unchanged failures are deduplicated. Provision a read-only token before enabling alerts if shadow runs encounter rate limiting.

Functions use Lambda's default network with outbound HTTPS. If account policy requires a VPC, provide approved outbound connectivity to the public edge, npm, GitHub, Slack and AWS services before deployment.

## Quiet Slack notifications

A single notifier owns all AWS CDN/MCP posts. Check functions save their health
reports and publish observations to SNS. CloudWatch alarm transitions enter the
same notifier. Reserved concurrency of one serializes shared notification state.
Each check retains its pending observation until SNS accepts it. A later run
publishes that observation before checking again, so an SNS failure cannot erase
an observed outage when the service recovers.

The bot creates one shared monitoring overview, then edits that same message
using chat.update. Healthy checks do not create new channel messages. The overview
shows each service's latest observation, accepted check observations, incident count and
observed incident time. Statistics start with this notifier's first observation;
they do not reconstruct earlier outages. Stale events are ignored for state and counters, so these are accepted observations rather than an exact Lambda invocation count. The latest 50 recovered intervals are
retained in DynamoDB alongside cumulative counters.

A new outage creates one channel post. Repeated failures and changes to the set
of failed checks update the summary only. A pending rollout does not recover an
open outage. Recovery posts once as a reply to the recorded outage thread, with
reply_broadcast disabled. Multiple active monitor-health alarms form one grouped
Monitoring incident; it recovers after every known alarm has cleared. An alarm
that was already active before deployment is learned on its next transition;
inspect existing alarm state as part of migration. Timestamp checks deduplicate accepted observations and hourly repeated failures. They do not guarantee exactly-once Slack delivery.

Observed incident time is the window between the first failed check and first
healthy check. Hourly sampling cannot determine exact downtime, and a freshness
or monitoring failure need not mean the service was unavailable. Reports and raw
check results remain in CloudWatch Logs for 30 days. Missing-check alarms still
detect a broken scheduler separately from service health.

Notification intent is stored before delivery. The returned Slack timestamp is
stored before recovery can be sent. Stable client message IDs are reused on retries as a best-effort hint. Slack does not document a deduplication guarantee for this argument, and repeated-ID behavior has not been verified with live posts. Retries may be deduplicated or may create duplicate messages. A rejected request remains unacknowledged and enters the normal retry/failure-queue path. Slack delivery and DynamoDB persistence are not one transaction. The notifier never searches private-channel history.

The summary is best-effort and runs after incident delivery. Summary failures are logged with the summary update stage without failing an otherwise completed observation or creating replacement posts. If the overview was deleted, an operator can remove only the summary timestamp from the notifications state item while the notifier is paused, then resume it to create one replacement. Preserve incident threads, counters and pending delivery. A missing outage parent remains a delivery failure and needs operator investigation.

All notifications, including monitor-health alarms, require the monitoring DynamoDB table and Secrets Manager. A table outage delays Slack delivery; retries and the failure queue retain failed events within their configured retention limits. CloudWatch alarms and AWS logs remain available independently of the table. There is no stateless Slack fallback, so storage failures cannot cause untracked repeated posts. Inspect AWS directly during a notification-path failure; Slack is not an independent alert channel for an AWS regional outage.

### Slack app setup

Incoming webhooks return no message timestamp and cannot update messages. Use the
included slack-app-manifest.json to configure a bot with chat:write only. Install
it in the approved workspace and add it to the private alert channel. Reading
channel history, managing channels and broad workspace permissions are not
required.

An authorized operator must create a Secrets Manager secret with a JSON string
containing token (the xoxb bot token) and channel (the private channel ID). Put only
its ARN in MONITORING_SLACK_BOT_SECRET_ARN in the internal deployment repo. Never
put token values in source, Terraform, repository variables or logs. Apply the
internal bootstrap permission update before deploying the new notifier. The
existing incoming-webhook secret is retained for rollback.

The deployment fails before enabling notifications unless slack_bot_secret_arn is
configured. The notifier validates the secret at runtime. The API uses only fixed
Slack endpoints and refuses redirects; logs include only allowlisted error names, HTTP status and Slack error codes, excluding tokens and raw response bodies. SNS and Lambda failure destinations preserve rejected deliveries.

### Migration and tests

Use mocked Slack API calls for development and CI. No test messages go to the
production team channel. If a live check is necessary, use a separate test channel
with an explicitly approved destination. Do not manufacture service failures in
the production incident state.

Install/configure the bot and apply the bootstrap role update first. Verify the notifier with notifications disabled or in a test stack, then deploy and assign CDN/MCP alert ownership to AWS. Production CDN/MCP checks and alert ownership stay in AWS. Use the local diagnostic commands for on-demand checks. Existing open GitHub incidents need explicit handoff; the notifier does
not write GitHub issues. Analytics and Portal monitors remain separate workflows
and need their own integration before they can share this overview.

The retired CDN/MCP Actions workflows and alert entrypoints are removed. The shared GitHub incident reporter remains in use by Analytics. Rollback requires a previous notifier package and its matching configuration; the legacy webhook secret is retained for this purpose. A regional AWS
outage still needs an external uptime service for independent paging.

## Local validation

Run the service-monitoring workspace scripts: test, test:types, lint and build. The build imports both shipped ESM bundles before packaging the ZIP, catching loader failures. Initialize Terraform with backend disabled and the committed lockfile before validation. Live check commands remain in the existing assets and mcp-lambda workspaces; running them without the alert wrappers sends no messages.

# Eufemia service monitoring

Hourly AWS checks of the public CDN, the HTTP MCP server and the analytics service, independent of GitHub's scheduled-workflow delivery. Reuses the existing checkCdn, checkHttpMcp and checkAnalytics implementations, including their retries, response limits and rollout grace periods. The GitHub workflows check monitors all scheduled GitHub Actions workflows, including social image publishing and GHE token expiry. It reports failed runs and schedules that stop completing. GitHub emails a failed scheduled run only to the last editor of its schedule.

## Deployment

The public Service Monitoring Lambda workflow tests and bundles the checks, then copies the ZIP, Terraform and internal deployment workflow to the repository configured by GHE_MONITORING_DEPLOY_REPO. Only main can perform the handoff. The internal workflow uses OIDC to apply Terraform and invokes every monitor as a smoke test. Until the handoff variable is configured, CI still validates and produces a downloadable deployment artifact. Root dependency and Yarn configuration changes also trigger validation. The handoff compares the complete deployment package with the internal deploy branch and skips the push when its contents are unchanged; dependency changes that affect the bundle still deploy.

Each service has a separate Node.js 22 Lambda using the same bundle, with 256 MB memory and one reserved concurrent execution. The HTTP budget is 330 seconds; Lambda allows 480 seconds for checks, persistence and notifications. There is no public inbound endpoint, runtime checkout, docs build or package installation. The production checks always use the public edge, including npm and GitHub for freshness verification.

EventBridge Scheduler runs CDN at :07, MCP at :11, Analytics at :17 and GitHub workflows at :23 hourly in UTC, with flexible windows disabled. Scheduler has minute-level precision, not a hard execution-time guarantee. Scheduler delivery and asynchronous Lambda execution have separate bounded retry policies and failure destinations. Retried invocations perform fresh checks, so old event payloads cannot overwrite a newer observation. The GitHub workflows check retains the deployed Tokens resource and state keys, so this extension needs no new Lambda, log group or IAM grants.

## When an alert fires

Each outage post lists the failing checks with their reasons and links to the service and the monitor's logs. Start there, then use the entry for the service below. The recovery reply comes from the next healthy check, so nothing needs closing by hand. While an incident is open, new failures in the same service only update the overview, except newly failing GitHub workflows, which also get a reply in the incident thread. To rerun a check without posting, use the local diagnostic commands in [Local validation](#local-validation); GitHub workflows has none, and check:analytics needs the GHE settings in the [analytics README](../analytics/README.md#production-health-monitor) for its GHE deploy run check. To roll back a monitor change, revert it on main; the next handoff deploys the previous package.

Without the optional read-only GitHub token, a 403 or 429 from the GitHub API in a deployment source or scheduled workflow check is the unauthenticated GitHub API limit. It clears by itself; provision the token if it repeats.

A failure ending in "(blocked by Akamai, reference …)", in any service, means the edge firewall denied the monitor's request; the service itself may be fine. Send the reference to the Akamai owners the same day: it is the only way to find the rule that blocked the request, and it can be looked up for 2 days only.

### CDN

- **HTTP 403 or 404 on an asset URL (without an Akamai reference):** the asset is missing from the CDN. For a new release the check waits 60 minutes before alerting, so a post means the release has not reached the CDN: check the latest assets deployment ([assets hosting](../assets/README.md#deployment)).
- **npm latest:** the npm registry did not answer or returned invalid metadata; the CDN itself may be fine.
- **Wrong content type, CORS, signature or manifest mismatch on an asset, or an invalid manifest:** the CDN serves a wrong or changed file. These fail at once, without the release grace period. Check the latest assets deployment.
- **stable-manifest/…:** the stable alias still serves an older version than npm reports after the edge cache settled. Check the latest assets deployment.

### MCP

- **HTTP health, negotiation, tools, documentation or metadata:** the MCP server is down or answers incorrectly. Open the service link and the MCP Lambda logs, then the latest MCP deployment ([continuous deployment](../mcp-lambda/README.md#continuous-deployment)).
- **deployment source or deployed source:** the latest deployment failed, has run for more than 60 minutes, or the server does not run the commit it published. Check that deployment run.

### Analytics

- **API health:** the analytics API is down. Check the analytics Lambda logs.
- **dashboard:** the dashboard page or its script is missing. The dashboard is a static site, so check the latest analytics deployment, which uploads it.
- **"GHE deploy run: Token expired or revoked (HTTP 401)":** the monitor's own GHE token has expired. Replace the value of eufemia/<environment>/monitoring/ghe-analytics-token; the next hourly check recovers.
- **Other GHE deploy run failures:** the internal deploy run failed, has run for more than 60 minutes, or the monitor's GHE settings are missing. Check the internal deploy run.
- **deployment source or deployed source:** as for MCP, for the analytics deployment.

### GitHub workflows

- **Latest scheduled run concluded …:** open the linked run and fix the cause. Dependency audit and CodeQL also recover after a newer successful push run on main, where they run the same checks. Other workflows need a successful scheduled run. Re-running an old run uses its original code; a fix merged to main will be picked up by the next schedule. Manual runs can use different inputs, so they and pull request runs do not clear alerts. Queued and running scheduled runs are pending and cannot recover an open incident until they succeed. Recovery is posted when all monitored workflows are healthy.
- **No recent scheduled run within …:** check whether the workflow is disabled, delayed or stuck. Daily workflows have a 48-hour freshness window, weekly workflows 8 days and monthly workflows 32 days. These windows allow for GitHub scheduling delays.

The check covers Dependency audit, GHE token expiry, Release SBOM check, CodeQL, Portal accessibility and duplicate IDs, Portal social images, Portal hydration and Country Flags. Maintain the list and freshness windows in src/check-scheduled-workflows.ts when adding or changing schedules. CI checks that every scheduled workflow is included. Each hourly check makes one GitHub API request per workflow, plus a recovery lookup when Dependency audit or CodeQL has a recent completed scheduled failure, with retries on request failure. Push runs do not extend the scheduled freshness window. Workflow incidents are reported through Slack and do not fail the deployment smoke test; Lambda invocation errors still fail it.

### Monitoring

Monitor-health alarms share one Monitoring incident. Its post names the alarm that opened it and that alarm's description, when it has one. Later alarms post nothing while the incident is open, and it recovers only when every alarm is OK, so check the CloudWatch alarm list for others in ALARM.

- **-not-completing:** a check reported no completed run in two hourly periods. Inspect the Lambda logs and Scheduler delivery. The first deployment of a new monitor opens and closes this within about a minute; that is expected. If a new monitor's log group stays empty, the group is missing from the check role's policy.
- **-execution-errors:** a check Lambda threw an error. Inspect its logs.
- **-undelivered:** Scheduler delivery, a check or the notifier exhausted its retries. Read the messages in the failures queue to see which; they are kept for 14 days. The alarm clears after five minutes even if nobody has looked.

## One-time setup

1. Create a dedicated internal deployment repository. Provision its OIDC deploy role through the internal federation repository, restricted to the deploy branch and verified repository IDs. Give it scoped access to this stack and its Terraform state key.
2. Add each execution role's policy, and the deploy role's grants to manage these roles, to the internal federation repository. Terraform creates the check, Slack notifier and Scheduler roles under the OIDC permissions boundary; the deploy role may create only these names with that boundary, attach only their approved policies and pass each role to its one service. The check role needs DynamoDB item read/write, read of the optional GitHub token secret and the analytics GHE token secret, sns:Publish to the monitoring topic and failure-queue writes. The notifier needs bot configuration secret read, monitoring-table item read/write and sqs:SendMessage for its failure destination. Each Lambda role's policy also allows log writes to its own log groups only (every monitor's group for the check role). Terraform creates the groups; the roles can't create them. Scheduler trust restricts the source account and schedule group. Its permissions are lambda:InvokeFunction for every function with this stack's name prefix and sqs:SendMessage for the schedule failure queue. Before you deploy a new monitor, add its log group to the check role's policy through the federation repository, plus read access to any new secret it uses. Renaming a role replaces it, so the new name must be granted in the federation repository first and `prevent_destroy` lifted in the same change.
3. Configure GHE_MONITORING_DEPLOY_REPO as a repository variable in the public repo. Create a monitoring-only GHE_MONITORING_DEPLOY_PAT credential with Contents read/write, Workflows read/write and required Metadata read for that internal repository only, and store it as a secret of the `ghe-deploy` environment. The handoff writes .github/workflows/deploy.yml, so workflow-file access is required. Configure the internal variables below.
4. Configure the Slack bot secret and deploy with notifications disabled. Follow the Slack app setup below before enabling notifications. Never put secret values in Terraform, repository variables, logs or committed files.

The deployment token must remain active for automatic updates. Record its owner
and expiration in the internal deployment repository, renew it before expiration,
and replace the GHE_MONITORING_DEPLOY_PAT secret of the `ghe-deploy` environment.
Then dispatch Service Monitoring Lambda
from main with `force` checked (an unchanged package otherwise skips the push)
and verify both the public handoff and internal deployment. The deployed
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
| MONITORING_ANALYTICS_DEPLOY_REPO   | Required: owner/repo of the analytics deployment                     |
| MONITORING_USER_AGENT              | Optional User-Agent sent with every check request                    |

State uses the default Terraform workspace at service-monitoring/terraform.tfstate with S3 native locking. Workspace discovery is scoped to service-monitoring/workspaces/, matching the deployment role's monitoring-only bucket listing permission. The deployment role only has object access to the default workspace state and its lock.

The environment controls AWS resource naming; checks always target production. Use a separate state key for another environment. Secrets are created by an administrator; the Lambdas read their values at runtime. Terraform passes the GitHub and Slack bot secrets by ARN. The analytics check reads its GHE token by the fixed name eufemia/<environment>/monitoring/ghe-analytics-token: a dnb.ghe.com fine-grained token with Actions read on the analytics deployment repository only, stored as plain text with the default Secrets Manager key. Create it before deploying the analytics function; without it the analytics check reports unhealthy and the smoke test fails.

The optional GitHub credential is a secret string with read-only public workflow access, rather than an ephemeral Actions token. Without it, GitHub source verification and the scheduled workflow checks use the unauthenticated API limit. A 403/429 makes those checks unhealthy while endpoint checks continue; unchanged failures are deduplicated. Provision a read-only token before enabling alerts if shadow runs encounter rate limiting.

Functions use Lambda's default network with outbound HTTPS. If account policy requires a VPC, provide approved outbound connectivity to the public edge, npm, GitHub, Slack and AWS services before deployment.

## Quiet Slack notifications

A single notifier owns all AWS monitoring posts. Check functions save their health
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
of failed checks update the summary only, except newly failing GitHub workflows,
which also get a reply in the incident thread. A pending rollout does not recover
an open outage. Recovery posts once as a reply to the recorded outage thread, with
reply_broadcast disabled. Multiple active monitor-health alarms form one grouped
Monitoring incident; it recovers after every known alarm has cleared. An alarm
that was already active before deployment is learned on its next transition;
inspect existing alarm state as part of migration. Timestamp checks deduplicate accepted observations and hourly repeated failures. They do not guarantee exactly-once Slack delivery.

Outage posts list each failed check with its reason and link to the service and
the monitor's CloudWatch log group (sign-in required).
CDN reasons already name the failing asset URL. Monitoring incidents link to the
alarm that opened them.

Observed incident time is the window between the first failed check and first
healthy check. Hourly sampling cannot determine exact downtime, and a freshness
or monitoring failure need not mean the service was unavailable. Reports and raw
check results remain in CloudWatch Logs for 30 days. Missing-check alarms still
detect a broken scheduler separately from service health.

Notification intent is stored before delivery. The returned Slack timestamp is
stored before recovery can be sent. Stable client message IDs are reused on retries as a best-effort hint. Slack does not document a deduplication guarantee for this argument, and repeated-ID behavior has not been verified with live posts. Retries may be deduplicated or may create duplicate messages. A rejected request remains unacknowledged and enters the normal retry/failure-queue path. Slack delivery and DynamoDB persistence are not one transaction. The notifier never searches private-channel history.

The summary is best-effort and runs after incident delivery. Summary failures are logged with the summary update stage without failing an otherwise completed observation or creating replacement posts. If the overview was deleted, an operator can remove only the summary timestamp from the notifications state item while the notifier is paused, then resume it to create one replacement. Preserve incident threads, counters and pending delivery. A missing outage parent remains a delivery failure and needs operator investigation.

All notifications, including monitor-health alarms, require the monitoring DynamoDB table and Secrets Manager. A table outage delays Slack delivery; retries and the failure queue retain failed events within their configured retention limits. CloudWatch alarms and AWS logs remain available independently of the table. There is no stateless Slack fallback, so storage failures cannot cause untracked repeated posts. Inspect AWS directly during a notification-path failure; Slack is not an independent alert channel for an AWS regional outage.

### Weekly report

One new channel post each Monday at 09:00 Europe/Oslo summarizes CDN (public
assets), MCP (HTTP server), Analytics (API and dashboard) and GitHub workflows
(scheduled workflows). It shows accepted observations by result, new incidents,
observed and missing hourly windows, latest status and observation time, and active monitor
alarms. The first report covers a partial week starting with the first accepted
observation after deployment. Later reports cover Monday to Monday in Oslo time,
including 167- or 169-hour weeks when daylight saving time changes. The report
labels its timestamps as UTC and keeps the last known status visible when an
observation is stale.

Hourly counters are retained for 15 days in the existing notification state.
Smoke checks and retries with newer timestamps count as extra observations;
duplicate and stale observations are ignored. Extra observations in one UTC hour
cannot cover another missing hour. Only full hourly windows after statistics
started are expected. Missing windows indicate monitoring gaps, not confirmed
service downtime. These AWS checks verify public endpoints, including public
DNS; they do not verify access from the internal network.

The schedule uses the existing serialized notifier, bot and failure queue. It is
disabled when notifications are disabled. The report's text and scheduled time
are saved before delivery and reused on retries; a sent period is skipped. As
with incident posts, Slack delivery and state persistence are not atomic, so a
failure after Slack accepts a post can still cause a duplicate. An undelivered
report does not block later observations; the next week's report replaces an old
pending report. Existing overview updates and outage/recovery posts continue.

A weekly post confirms that its notification path worked when delivered. It
cannot independently prove that AWS or Slack will remain available. Missing
reports still require investigation alongside the existing monitor-health alarms.

### Slack app setup

Incoming webhooks return no message timestamp and cannot update messages. Use the
included slack-app-manifest.json to configure a bot with chat:write only. Install
it in the approved workspace and add it to the private alert channel. Reading
channel history, managing channels and broad workspace permissions are not
required.

An authorized operator must create a Secrets Manager secret with a JSON string
containing token (the xoxb bot token) and channel (the private channel ID). Put only
its ARN in MONITORING_SLACK_BOT_SECRET_ARN in the internal deployment repo. Never
put token values in source, Terraform, repository variables or logs.

The deployment fails before enabling notifications unless slack_bot_secret_arn is
configured. The notifier validates the secret at runtime. The API uses only fixed
Slack endpoints and refuses redirects; logs include only allowlisted error names, HTTP status and Slack error codes, excluding tokens and raw response bodies. SNS and Lambda failure destinations preserve rejected deliveries.

### Tests

Use mocked Slack API calls for development and CI. No test messages go to the
production team channel. If a live check is necessary, use a separate test channel
with an explicitly approved destination. Do not manufacture service failures in
the production incident state.

Production CDN, MCP and analytics checks and alert ownership stay in AWS. Use the
local diagnostic commands for on-demand checks. The notifier does not write GitHub
issues. Portal scans remain separate GitHub workflows; their scheduled run
results are covered by the GitHub workflows check. A regional AWS outage
still needs an external uptime service for independent paging.

## Local validation

Run the service-monitoring workspace scripts: test, test:types, lint and build. The build imports both shipped ESM bundles before packaging the ZIP, catching loader failures. Initialize Terraform with backend disabled and the committed lockfile before validation. Live check commands remain in the assets, mcp-lambda and analytics workspaces (check:cdn, check:http, check:analytics); they send no messages.

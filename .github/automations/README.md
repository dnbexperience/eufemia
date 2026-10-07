# Repository automations

Most of these automations use a configurable Responses-compatible model gateway
and the hosted Eufemia MCP server to produce advisory reports. They never label,
assign, commit, push, approve, merge, deploy, or update snapshots. Human
notifications are limited to update-in-place pull request comments and dedicated
tracking issues. They do not post to Slack or any other external service.

## Shared setup

Create a GitHub Actions environment named `automation` with:

- `SECRET_API_KEY`: an approved non-interactive gateway credential.
- `API_GATEWAY`: the complete Responses endpoint.
- `MODEL`: a model allowed by [`guardrails.json`](./guardrails.json).

Create the repository Actions variable `AUTOMATIONS_ENABLED` with value `false`
while reviewing or merging the stack. Change it to `true` only after the gateway
configuration below is ready and the automation owners have approved the event
triggers and output locations.

Do not add required reviewers to this environment because event-driven and
scheduled runs would pause for approval. Restrict the environment to the
default branch, limit who can change its configuration, rotate its credential,
and apply usage limits and monitoring at the gateway.

The gateway address is intentionally not documented in this public repository.
The protected environment controls the destination; the runtime guard requires
HTTPS, the `/v1/responses` path, and an allowlisted model.

The Eufemia MCP endpoint is:

```text
https://server.eufemia.dnb.no/mcp/web
```

The shared runner verifies its required tools before analyses that depend on
Eufemia documentation. The contract matches the currently deployed endpoint and
should be expanded when new tools are released. MCP failure diagnosis runs
without MCP so that an outage does not prevent diagnosis.

## Automations

### CI failure triage

- Trigger: completion of selected CI workflows with conclusion `failure`.
- Scope: same-repository runs only; visual failures are handled separately.
- Input: bounded failed logs, failed-job metadata, optional PR metadata and code.
- Cost control: visual-regression and release-readiness checks are handled by
  their dedicated automations. MCP deployment failures use CI triage; public
  endpoint health has a separate deterministic monitor.
- Output: an update-in-place comment on the affected pull request when one is
  available, plus the complete Actions report and artifact.

### Release readiness

- Trigger: successful Verify run for a PR titled `release of ...`.
- Input: PR metadata, commits, changed files, code, tests, and documentation.
- Output: an update-in-place release-PR comment with advisory compatibility,
  migration, documentation, testing, and security risks.

### Documentation drift

- Trigger: every Monday at 05:23 UTC or manual dispatch.
- Input: the latest default branch plus commits and changed paths from the last
  seven days.
- Output: a dedicated tracking issue updated with specific
  source-to-documentation contradictions or omissions.

### Issue intake

- Trigger: every six hours or manual dispatch.
- Input: up to 20 public issues opened in the last seven hours and a bounded
  recent-issue inventory. Batching limits cost and public-trigger abuse.
- Output: one dedicated batch-summary issue with classification, likely
  ownership, missing information, and plausible duplicates. The automation does
  not change individual issues.

### Visual regression triage

- Trigger: failed Visual Regression Tests workflow.
- Input: a bounded visual report, representative expected/actual/diff images,
  failed log, and relevant source revision.
- Output: an update-in-place PR comment with grouped likely causes and whether
  human visual approval or more evidence is needed. It never approves or updates
  snapshots.

### MCP health

- Trigger: daily at 05:17 UTC or manual dispatch after a deployment.
- Deterministic path: checks the health endpoint and required MCP tool contract.
- Model path: runs only when a deterministic check fails and diagnoses the
  likely edge, origin, runtime, protocol, bundle, or contract layer.
- Output: healthy runs stay in the Actions summary; failures update one dedicated
  MCP health tracking issue.

### Platform modernization

- Trigger: 15 January and 15 July at 06:37 UTC, or manual dispatch.
- Deterministic path: compares Eufemia's configured minimum browsers with
  versioned MDN browser-compatibility data for curated compatibility code that
  still exists in the repository.
- Model path: prioritizes verified candidates and explains the code, tests,
  documentation, accessibility, and consumer risks to review before removal.
- Cost control: the model runs only when a registered candidate is eligible
  across the complete configured browser matrix. Blocked candidates remain
  visible in the deterministic job summary.
- Output: eligible candidates update one dedicated modernization tracking issue
  and retain the full Actions artifact. Add candidates to the registry when
  temporary polyfills or fallbacks enter the codebase.

### Release announcement

- Trigger: successful `Release` workflow for the `release` branch. Waiting for
  workflow completion avoids announcements for failed or superseded attempts.
- Input: the published GitHub release and the pull requests and direct commits
  included since the previous release.
- Output: an AI-generated Slack draft in a version-specific comment on the
  merged release pull request. The publisher checks the expected format, release
  link, comment size, and every deployed documentation route and anchor first.
- Human checkpoint: review the selected features and wording before copying the
  draft to Slack. The automation never sends the announcement to Slack.

### Release motivation links

- Trigger: the same successful `Release` workflow.
- Input: pull request bodies and direct commit messages included since the
  previous published tag.
- Output: a deterministic, version-specific release-PR comment containing the
  collected links. Bot-generated dependency pull requests and URLs with
  sensitive-looking parameters are excluded. This helper does not use AI or
  require the `automation` environment.

## Reports

Every advisory model-backed automation returns the same structured report:

- `status`: `ok`, `attention`, or `blocked`.
- `summary`: concise overall result.
- `findings`: up to 20 evidence-backed P1-P3 items.
- `metrics`: small factual measurements relevant to the event.

Reports are escaped before they are written to the Actions summary and uploaded
as JSON artifacts. Human notifications escape model output again, include no more
than five findings, link to the complete run, and are updated in place. Tracking
issues are reopened when attention is needed and closed after a clean result.
Context and report artifacts have bounded retention.
Context is rejected before model access when it contains symlinks, unexpected
file types, too many files, or more than 10 MiB.
Secret-bearing jobs always run the trusted default-branch workflow and source.
When a pull request or feature branch matters, its diff is supplied only as
bounded inert context; branch-controlled scripts or instructions are never
executed.

## Guardrail ownership

The gateway owns identity, provider and model access, content policy, audit
logging, quotas, rate limits, retention, and regional processing.

The repository owns event selection, trusted prompts, read-only permissions,
same-repository checks, context limits, MCP contracts, report schemas, output
escaping, and narrowly scoped release-comment publishing.
Only notification jobs receive `issues: write`; secret-bearing model jobs and
context collectors remain read-only.

## Suggested stacked pull requests

1. Shared runner, policy, schemas, tests, and this runbook.
2. CI failure triage.
3. Release readiness.
4. Documentation drift.
5. Issue intake.
6. Visual regression triage.
7. MCP health and failure diagnosis.
8. Release announcement draft.
9. Release motivation links.
10. Platform modernization audit.

Each automation PR should target the previous stack layer until the foundation
is merged. Keep `AUTOMATIONS_ENABLED` set to `false` until the environment and
gateway service credential are ready.

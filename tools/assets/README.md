# Eufemia assets hosting

Publishes `packages/dnb-eufemia/assets` at `https://assets.eufemia.dnb.no`. The
AWS origin is a private, versioned S3 bucket behind CloudFront. Akamai is the
public edge and CloudFront rejects requests that do not carry the shared origin
verification header.

Every published Eufemia version, including prereleases, gets an immutable
prefix. Stable aliases follow only the latest stable release and remain
available for manually linked assets and backwards compatibility:

- `https://assets.eufemia.dnb.no/v<version>/fonts/dnb/DNB-Regular.woff2`
- `https://assets.eufemia.dnb.no/fonts/dnb/DNB-Regular.woff2`

Generated Eufemia CSS uses the immutable URL matching its package version, and
repeats each `@font-face` source against the stable alias so the fonts still
load while a version prefix is unavailable. The root sync cannot delete
historical `v*/` content or independently published prefixes. The `logos/`
namespace is reserved for the standalone `@eufemia/logos` publisher.

## Deployment

The public workflow `.github/workflows/assets.yml` copies the assets, Terraform
configuration, and deploy workflow to the `deploy` branch of the private GitHub
Enterprise repository configured by `GHE_ASSETS_DEPLOY_REPO`. That repository
deploys through GitHub OIDC without AWS access keys. The public workflow then
waits for a versioned font and SVG to return HTTP 200 with the expected Content
Security Policy through the public hostname, and fails if either check times out.

The infrastructure uses `environment=dev` because Eufemia currently has one AWS
account, `DNB-EUFEMIA-Dev`. The production Akamai hostname is independent of
that AWS account classification.

The deploy repository requires:

- variable `AWS_ROLE_ARN`: the `eufemia-assets-deploy` role ARN
- variable `COST_ALLOCATION`: the Eufemia BA number
- secret `EDGE_AUTH_SECRET`: the value Akamai sends in the `X-Origin-Verify`
  request header

The public repository requires `GHE_ASSETS_DEPLOY_REPO=eufemia/eufemia-assets`.
Its existing `GHE_DEPLOY_PAT` must also be granted Contents read/write access to
that repository, and permission to write workflow files, because the push
includes `.github/workflows/deploy.yml`. Without it the push is rejected and no
version reaches the CDN.

After the first AWS deployment, copy the `origin_hostname` Terraform output to
the `assets.eufemia.dnb.no` property in `akamai_delivery_eufemia`. Configure the
property like the CloudFront-backed dashboard property, including
`X-Origin-Verify`; the Lambda-backed server property uses a different header.
The public DNS record is created by that repository's standard Akamai DNS PR
module.

## Production monitoring

Hourly production checks and Slack incident/recovery notifications run in AWS
EventBridge Scheduler and Lambda. See [service monitoring](../service-monitoring/README.md)
for deployment, alert ownership and rollback.

GitHub Actions builds and validates the monitoring package, but does not run a
separate CDN health workflow. Release-time asset and CSP verification remains
in the publishing workflow. For an on-demand diagnosis, use the read-only
local command below.

The monitor checks:

- npm's `latest` stable version and its publication time.
- Stable URLs for DNB Regular, DNB Bold, and the DNB logo, even if npm is down.
- The latest version's deployment manifest and the same immutable assets.
- HTTP 200, actual binary signatures, MIME types, public CORS headers, and
  immutable asset SHA-256 hashes against the deployment manifest.
- Stable aliases against the latest manifest after 25 hours, allowing for the
  public edge's 24-hour cache plus one hour for deployment.

Each failed request is retried twice, with a 10-second timeout per attempt.
Missing versioned assets (403 or 404) have a 60-minute grace period after npm
publication. During this period the previous stable version is also checked.
Stable outages, invalid content, CORS errors, and timeouts still fail immediately
after retries. A pending deployment does not close an existing incident.
Prereleases do not move npm's stable `latest` tag and are outside this monitor's
scope. This is a representative asset check, not an audit of every asset or
historical release. Hashes verify consistency with the CDN deployment manifest;
they do not independently compare the entire npm tarball with the CDN.

### Alerts

AWS owns one new-incident alert and one recovery reply in the incident thread. Its shared overview updates quietly; repeated or changed failures do not create new posts. Pending delivery is retained for retries. Slack bot configuration is read from AWS Secrets Manager; local diagnostic commands do not receive it. Unavailable npm metadata is reported separately from CDN
availability in each report.

The hourly AWS checks run from one region. For faster paging and regional
coverage, pair them with an independent multi-region uptime check of a stable
asset URL. See the [monitoring rollout and rollback instructions](../service-monitoring/README.md#migration-and-tests).

### Local verification

Run from the repository root after `yarn install --immutable`:

```sh
yarn workspace eufemia-assets-hosting test
yarn workspace eufemia-assets-hosting test:types
yarn workspace eufemia-assets-hosting lint
yarn workspace eufemia-assets-hosting check:cdn
```

The last command only reads public npm/CDN endpoints. It writes
`tools/assets/cdn-health-report.json` and exits nonzero on failure. To execute
the same read-only production checks, run `node tools/assets/check-cdn.ts` from
the root; its report is written in the current directory.

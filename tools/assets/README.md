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

Generated Eufemia CSS uses the immutable URL matching its package version. The
root sync cannot delete historical `v*/` content or independently published
prefixes. The `logos/` namespace is reserved for the standalone
`@eufemia/logos` publisher.

## Deployment

The public workflow `.github/workflows/assets.yml` copies the assets, Terraform
configuration, and deploy workflow to the `deploy` branch of the private GitHub
Enterprise repository configured by `GHE_ASSETS_DEPLOY_REPO`. That repository
deploys through GitHub OIDC without AWS access keys.

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
that repository.

After the first AWS deployment, copy the `origin_hostname` Terraform output to
the `assets.eufemia.dnb.no` property in `akamai_delivery_eufemia`. Configure the
property like the CloudFront-backed dashboard property, including
`X-Origin-Verify`; the Lambda-backed server property uses a different header.
The public DNS record is created by that repository's standard Akamai DNS PR
module.

# Security Policy

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues,
pull requests, or discussions.**

Report it privately using one of the following, in order of preference:

1. **GitHub private vulnerability reporting** — go to the
   [Security tab](https://github.com/dnbexperience/eufemia/security) and choose
   **"Report a vulnerability"**. This keeps the report private and lets us
   collaborate on a fix and a coordinated disclosure.
2. **Email** — the Eufemia maintainers at
   [tobias.hoegh@dnb.no](mailto:tobias.hoegh@dnb.no).
   <!-- TODO: replace the address above with a team distribution list
        (e.g. eufemia-security@dnb.no) so reports don't depend on one person. -->

Please include, where possible:

- The affected package and version (`@dnb/eufemia`, the docs portal, or the MCP
  worker/lambda).
- A description of the issue and its impact.
- Steps to reproduce, or a proof of concept.
- Any known mitigations.

## What to expect

| Stage                                    | Target                          |
| ---------------------------------------- | ------------------------------- |
| Acknowledgement of your report           | within **3 business days**      |
| Initial assessment (severity + validity) | within **5 business days**      |
| Fix or mitigation plan communicated      | depends on severity — see below |

Response targets for confirmed issues are driven by severity **and** whether the
vulnerable code ships to consumers (see
[the vulnerability-management routine](./docs/vulnerability-management.md)):

| Severity (in shipped code) | Target to fix / mitigate         |
| -------------------------- | -------------------------------- |
| Critical                   | ASAP — hotfix release            |
| High                       | within 7 days                    |
| Moderate                   | within the current sprint        |
| Low                        | best-effort / next routine batch |

Issues that only affect development, build, or CI tooling (not the published
artifacts) are handled on a best-effort/routine basis.

We will keep you informed throughout, and — unless you prefer to remain
anonymous — credit you once a fix is released.

## Supported versions

Security fixes are released against the **latest** published major of
`@dnb/eufemia`. Older majors are not maintained; please upgrade to receive
security updates.

## Ownership

Security reports and dependency advisories for this repository are owned by the
**Eufemia maintainers** (not a single individual). The team triages incoming
reports and Dependabot alerts per the routine linked below.

## For maintainers

The internal process for triaging and responding to Dependabot alerts and other
advisories lives in
[`docs/vulnerability-management.md`](./docs/vulnerability-management.md).

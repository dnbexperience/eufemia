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
  server).
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
| Critical                   | Immediately — hotfix release     |
| High                       | Within 7 days                    |
| Moderate                   | Promptly — prioritised           |
| Low                        | Best-effort / next routine batch |

Issues that only affect development, build, or CI tooling (not the published
artifacts) are handled on a best-effort/routine basis.

These targets are deliberately stricter than — and therefore satisfy — DNB's
internal flaw-remediation limits (SI-02: Critical within 1 month, all others
within 3 months).

We will keep you informed throughout, and — unless you prefer to remain
anonymous — credit you once a fix is released.

## Supported versions

Security fixes are released against the **latest** published major of
`@dnb/eufemia`. Older majors are not maintained; please upgrade to receive
security updates.

## Ownership

Vulnerability management for this repository is owned by the Eufemia **Security
Champion** — **Anders Langseth** ([@langz](https://github.com/langz)) — following
DNB's Security Champion model. The Champion is accountable for the review
cadence, signs off on any deferral or exception (recorded for auditability), acts
as liaison to DNB's central Vulnerability Management team, and reports Eufemia's
vulnerability status upward. Day-to-day triage of incoming reports and Dependabot
alerts can rotate across the Eufemia maintainers, per the routine linked below.

## For maintainers

The internal process for triaging and responding to Dependabot alerts and other
advisories lives in
[`docs/vulnerability-management.md`](./docs/vulnerability-management.md).

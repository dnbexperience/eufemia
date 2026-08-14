# Security Policy

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues,
pull requests, or discussions.**

Report it privately using one of the following, in order of preference:

1. **GitHub private vulnerability reporting** — go to the
   [Security tab](https://github.com/dnbexperience/eufemia/security) and choose
   **"Report a vulnerability"**. This keeps the report private and lets us
   collaborate on a fix and a coordinated disclosure. Prefer this route: it
   reaches the whole maintainer team, so it does not depend on one person being
   available.
2. **Email** — if that form is unavailable, the Eufemia Security Champion at
   [anders.langseth@dnb.no](mailto:anders.langseth@dnb.no), or a maintainer at
   [tobias.hoegh@dnb.no](mailto:tobias.hoegh@dnb.no).

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

If your report indicates a critical, actively exploitable issue, say so in the
subject or title — we treat those ahead of the queue rather than waiting out the
acknowledgement window.

Response targets for confirmed issues are driven by severity **and** whether the
vulnerable code ships to consumers (see
[the vulnerability-management routine](./docs/vulnerability-management.md)). They
are in **calendar days** and run from the point we **confirm** the issue, not
from when it was reported:

| Severity (in shipped code) | Target to fix / mitigate       |
| -------------------------- | ------------------------------ |
| Critical                   | Within 3 days — hotfix release |
| High                       | Within 7 days                  |
| Moderate                   | Within 30 days                 |
| Low                        | Within 60 days                 |

Issues that only affect development, build, or CI tooling (not the published
artifacts) are handled on a best-effort/routine basis.

Every target above sits strictly inside DNB's internal flaw-remediation limits
(SI-02: Critical within 1 month, all others within 3 months), so meeting ours
also satisfies those.

We will keep you informed throughout, and — unless you prefer to remain
anonymous — credit you once a fix is released.

## Supported versions

| Version         | Security fixes                                          |
| --------------- | ------------------------------------------------------- |
| `11.x` (latest) | Yes — all severities                                    |
| `10.x`          | Critical only — last release was `10.104.2` in May 2026 |
| `9.x` and older | No                                                      |

Fixes for all severities are released against the **latest** published major of
`@dnb/eufemia` (`11.x`). For `10.x` we backport fixes for **critical**
vulnerabilities only; less-severe issues will not be patched there, so please
plan to upgrade. Majors below `10.x` are end-of-life — there is no maintained
release line to publish a fix from, so upgrade to a supported major.

## Ownership

Vulnerability management for this repository is owned by the Eufemia **Security
Champion** — **Anders Langseth** ([@langz](https://github.com/langz)) — following
DNB's Security Champion model. The Champion is accountable for the review cadence,
acts as liaison to DNB's central Vulnerability Management team, and reports
Eufemia's vulnerability status upward. Deferrals and exceptions are signed off by
the team's risk owner rather than by the Champion, and recorded for auditability.
Day-to-day triage of incoming reports and Dependabot alerts can rotate across the
Eufemia maintainers, per the routine linked below.

## For maintainers

The internal process for triaging and responding to Dependabot alerts and other
advisories lives in
[`docs/vulnerability-management.md`](./docs/vulnerability-management.md).

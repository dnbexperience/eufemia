# Portal hydration monitoring

The Portal hydration workflow scans every published canonical Portal page on
Tuesdays at 07:37 UTC and supports manual runs. Changes to the scanner or workflow
also run a production scan on the pull request.

The workflow starts in report-only mode. Review its first successful GitHub Actions
run and the initial issue previews before setting the repository variable
PORTAL_HYDRATION_ISSUES_ENABLED to true. Pull request runs always remain
report-only. This variable does not affect scanning or artifact collection.

## Coverage and results

Chromium opens every URL directly in light and dark mode, waits for Portal
readiness, and observes another 1.5 seconds. The production scan captures React
recoverable hydration errors and component stacks, including minified error codes.
Production React omits development-only warnings, including attribute mismatches,
so those cannot be detected on the published site. The scan does not exercise
every demo interaction, browser, locale, or viewport.

The workflow uses the production sitemap. Until that file is deployed, it generates
the canonical page list from the latest successful GitHub Pages deployment, using
the same fallback as the accessibility workflow.

The job summary links affected pages. The portal-hydration-report artifact keeps
the complete visit results and issue previews for 90 days. Hydration findings do
not fail the scan job. HTTP failures, readiness timeouts, unexpected runtime errors,
and incomplete scans do fail it and prevent all issue updates.

Browser contexts are reused for HTTP caching, with four concurrent workers and
three attempts per page and theme. HTTP 429 pauses workers with bounded backoff
and honors Retry-After up to two minutes. Exhausted retries remain scan errors,
not hydration findings.

## Issue lifecycle

With reporting enabled, the workflow maintains one issue per affected canonical
URL. It combines repeated messages and both themes. The same underlying component
bug may affect several URLs, so maintainers can link related issues during triage.

The reporter manages only issues created by GitHub Actions with its stable page
marker. Unchanged findings produce no updates or comments. Changed findings update
the issue body; a recurrence reopens an issue previously closed as completed.
Issues closed as not planned stay closed unless a maintainer reopens them. Asset
filename changes alone do not count as changed findings.

An issue closes only when a complete scan successfully checks that page in both
themes and finds no hydration errors. URLs absent from a later sitemap are left
for manual review. The issue-writing job has no browser or dependency installation
and consumes only its own successful scan's artifact. Scheduled and manual issue
updates run only in the upstream repository on main.

## Local use

From the Portal workspace, with a deployed canonical sitemap saved locally:

    yarn test:hydration
    yarn scan:hydration --sitemap public/sitemap.json

These commands do not change GitHub issues. The focused tests use real development
and production React bundles in Chromium, plus an in-memory issue API to verify
creation, deduplication, updates, recovery, recurrence, and incomplete-scan handling.

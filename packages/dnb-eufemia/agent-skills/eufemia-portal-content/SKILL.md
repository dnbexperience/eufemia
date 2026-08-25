---
name: eufemia-portal-content
description: Edit content in the official Eufemia portal and deliver small, reviewable pull requests with working page previews. Use when a non-technical contributor asks AI to change portal copy, guidance, or other editorial content.
compatibility: Requires the Eufemia repository and permission to create GitHub pull requests.
metadata:
  owner: dnbexperience/eufemia
  manifest-version: '1'
---

# Edit Eufemia Portal Content

Handle the repository and GitHub workflow for the contributor. Use plain
language, show the proposed result, and do not require them to choose branches,
commands, files, or validation steps.

1. Read the repository instructions and inspect the current page and nearby
   content before proposing an edit. Verify technical claims against the source
   or current Eufemia documentation.
2. Before changing files, ask two plain-language questions: whether the change
   should appear in the next release notes, and whether it can wait for the next
   regular portal deployment or needs a portal-only deployment. For an urgent
   change, also ask for the desired deadline and a short reason that maintainers
   can evaluate.
3. Fetch current refs and create the content branch from `origin/main`. `main`
   is the source for new work; `release` is the exact source deployed to the
   production portal.
4. Keep one independently understandable content outcome per pull request.
   Split changes that cover different topics, audiences, navigation areas, or
   reviewer decisions. Keep tightly coupled edits together when separating them
   would make either preview incomplete or misleading. If the work grows while
   editing, stop expanding the current pull request and propose the remaining
   sequence.
5. Preserve the page's MDX structure, imports, links, terminology, tone, and
   heading hierarchy. Do not turn an editorial request into component, API, or
   layout work without explaining the additional scope and receiving approval.
6. Format changed files with the workspace tools, run focused checks, inspect
   the complete diff, and verify the affected route and anchor. Add or update
   tests only when behavior rather than prose changes.
7. Choose the pull request title from the contributor's release-note intent:
   - Use `docs(Portal): ...` when the change should be listed under
     Documentation in the next Eufemia release notes.
   - Use `chore(Portal): ...` when it should not be listed.
     Confirm the choice in plain language. Neither type should publish a package
     version by itself, but verify the current semantic-release configuration
     before promising release behavior.
8. Open the pull request against `main` with a short motivation-focused
   description. After the preview workflow finishes, read its stable Branch
   Preview URL, append the affected page path and anchor, verify that exact link,
   and update the description. Include a short release-priority line. Do not list
   changed files or validation steps. A suitable shape is:

   ```markdown
   Explains the problem and why the content change matters.

   Preview: [Open the changed section](https://<branch-preview>/<route>/#<anchor>)

   Release priority: Regular, or portal-only by <date> because <reason>.
   ```

9. Report the pull request, the verified preview link, the release-note choice,
   and any remaining reviewer decision in plain language. Never merge the pull
   request without explicit permission.

## Portal-only deployment

Treat the contributor's portal-only selection as authorization to prepare the
promotion pull request. Do not ask them to request the promotion again. It does
not authorize either merge.

1. Before preparing the promotion, fetch current refs, identify the latest npm
   version tag reachable from `origin/release`, and confirm no release is
   running. Inspect every commit after that tag together with the proposed
   promotion using the current semantic-release rules. Continue only when none
   would trigger an npm release. Earlier portal-only `chore` commits after the
   tag are safe; a pending `feat`, `fix`, or other release-triggering commit is
   not. Wait for the regular release to finish in that case, then fetch and
   check again.
2. Create a branch from the latest `origin/release` and bring over only the
   content commit or commits from the source pull request. Open a separate pull
   request to `release` titled `chore(Portal): promote ...` so the deployment
   commit is not repeated in later release notes.
3. For an ASAP request, prepare this promotion pull request as a draft as soon
   as the content diff is stable. After the content pull request is merged to
   `main`, update or recreate the promotion from the latest `origin/release` and
   complete the checks below. For other portal-only requests, prepare it after
   the merge to `main`.
4. Compare the promotion with the final approved content change. The affected
   paths and resulting content patch must match, with no extra changes. Commit
   hashes and commit messages may differ because the branches have different
   histories. If the patches do not match, update the promotion and require the
   mismatch to be reviewed.
5. Verify that the promoted content works with the currently released portal,
   that no included commit would trigger an npm release, and that the promotion
   pull request has its own working portal preview. If the content depends on
   unreleased code or conflicts substantially, stop and recommend the regular
   release path.
6. Link the original content pull request from the promotion description and
   state that the affected paths and resulting content were verified as an
   exact match with no extras. Require the maintainer to squash-merge it so
   `release` receives one `chore(Portal)` deployment commit. Merging the
   promotion deploys the production portal from `release`; semantic-release
   should skip npm publishing when the preflight above passes.

The review responsibilities are different:

- The designer verifies the content once, using the content pull request's
  preview.
- The maintainer performs the full content review on the pull request to
  `main`.
- The maintainer treats the pull request to `release` as a short deployment
  gate: confirm that the source pull request is merged, the target is `release`,
  the patch matches with no extras, the preview works, and the npm-release
  preflight passes. Then squash-merge it. The maintainer does not create this
  pull request or repeat the editorial review.

If the agent cannot remain active until the first pull request is merged, state
that the maintainer must resume the task afterward; do not imply that background
automation exists.

Do not copy all of `main` into `release` for an urgent content change. That can
silently include unrelated features and fixes.

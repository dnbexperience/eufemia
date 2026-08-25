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

An urgent portal deployment is a separate promotion after the content pull
request is approved and merged to `main`. It does not change how content is
authored.

1. Require explicit permission before preparing or merging a promotion.
2. Create a branch from the latest `origin/release` and bring over only the
   approved content commit or commits. Open a separate pull request to
   `release`.
3. Verify that the promotion contains only the intended portal content, works
   with the currently released portal, and contains no commit that would trigger
   an npm release. If it depends on unreleased code or conflicts substantially,
   stop and recommend the regular release path.
4. Verify the release pull request's own portal preview. Merging it deploys the
   production portal from `release`; semantic-release should skip npm publishing
   when no release-triggering commits are present.

Do not copy all of `main` into `release` for an urgent content change. That can
silently include unrelated features and fixes.

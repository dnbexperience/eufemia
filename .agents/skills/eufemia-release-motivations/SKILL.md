---
name: eufemia-release-motivations
description: Collect Motivation and Slack links from pull requests included in an Eufemia release.
---

# Eufemia Release Motivations

When asked for the motivations behind an Eufemia release:

- Read the requested GitHub release and resolve every linked pull request.
- Inspect the current pull request descriptions rather than relying on commit messages or the release notes alone.
- Collect links presented as Motivation and all Slack links, including links outside a named Motivation section.
- Group the links by pull request and retain meaningful labels such as PM, product motivation, and technical motivation.
- Report how many pull requests were inspected and identify pull requests without matching links when that helps reveal omissions.
- Keep the workflow read-only unless the user explicitly asks to update GitHub content.

Return direct, copyable links with the pull request number and link.

# Eufemia agent skills

Status: Draft

## Problem

Teams are creating local agent skills that copy Eufemia component APIs, token
values, theme support and usage rules. These copies drift from the versioned
package and create competing sources of truth.

## Proposal

Eufemia should publish a small set of official agent skills. The skills should
define workflows and direct agents to Eufemia's MCP tools. Facts should remain
in source code and generated documentation.

Initial skills:

- `eufemia-components`: discover components and retrieve current APIs.
- `eufemia-compose`: compose layout, typography, forms and feedback patterns.
- `eufemia-review`: review code using Eufemia-owned rules and documentation.
- `eufemia-accessibility`: apply Eufemia-specific accessibility guidance.
- `eufemia-migrate`: find release guidance, deprecations and codemods.

Each skill should:

1. Query the MCP server before giving version-sensitive guidance.
2. Link to the source documentation used for a recommendation.
3. Avoid copying component props, token values and supported theme matrices.
4. Distinguish requirements from recommendations and contextual examples.
5. Encourage generally useful improvements to be contributed to Eufemia.

## Distribution requirements

The skills should be versioned with Eufemia and usable by multiple agent hosts.
The distribution mechanism must preserve plain Markdown skills without making
one editor or agent runtime the source format.

The package should expose:

- The installed Eufemia and skill version.
- The minimum MCP tool surface required by each skill.
- A manifest listing skill names, descriptions and entry files.
- A documented update path for consumers that install skills separately.

## Ownership boundary

Eufemia skills should cover design-system APIs and reusable usage patterns.
They should not prescribe application providers, deployment, authentication,
business workflows or product-area component precedence.

Product and platform teams can add their own skills on top of this foundation.
Those skills should query Eufemia instead of reproducing Eufemia knowledge.

## Open decisions

- Publish skills inside `@dnb/eufemia` or as a separate package.
- Select the first supported host integrations and installation workflow.
- Decide whether skills are authored directly or generated from templates.
- Define compatibility between skill versions and MCP tool versions.
- Decide how downstream skills extend an Eufemia workflow without copying it.

## Acceptance criteria

- A consumer can install an official skill and use it with packaged Eufemia
  documentation.
- Updating Eufemia facts does not require editing skill prose in another
  repository.
- Skills produce guidance appropriate to the documentation version they query.
- Team-specific plugins can compose the official skills without forking them.

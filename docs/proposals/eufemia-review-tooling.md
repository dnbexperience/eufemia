# Eufemia review tooling

Status: Draft

## Problem

Eufemia guidance is consumed through documentation, ESLint, Stylelint,
codemods, MCP tools and downstream agent skills. When each surface defines its
own rules and severity, the same usage can be classified differently or become
an unsupported automatic rewrite.

## Proposal

Define review rules once in Eufemia and expose adapters for the tools that can
enforce or explain them.

Each rule record should include:

- A stable Eufemia rule identifier.
- Category and default severity.
- Whether the rule is a requirement, deprecation or recommendation.
- Applicable source types and Eufemia versions.
- Documentation and rationale.
- Whether detection and automatic fixes are available.
- Conditions that require human or design-system review.

## Tool responsibilities

### ESLint and Stylelint

Lint plugins should report deterministic source-level findings. Recommended
configs should consume severity from the shared rule record unless a tool has a
documented reason to override it.

### MCP

The MCP server should expose the same records for code review and explain which
documentation supports a finding. It should not promote recommendations to
errors or infer rules that Eufemia has not published.

### Codemods

Codemods should only exist for deterministic transformations with a stable
replacement. Context-dependent changes should produce findings with guidance,
not rewrite code automatically.

For example, replacing a renamed prop can be deterministic. Selecting a
semantic color token or redesigning an unavailable action usually is not.

## Rule lifecycle

1. Add the rule record and documentation.
2. Add detection to the relevant lint adapter.
3. Add an automatic fix only when behavior can be preserved.
4. Expose the rule through MCP using the same metadata.
5. Mark version applicability when introducing or removing a deprecation.
6. Remove obsolete adapters without deleting historical migration guidance.

## Initial scope

Use `eufemia/no-deprecated-color-variables` as the first end-to-end rule. It is
already detected in JavaScript, TypeScript, CSS and SCSS, and its replacement
is intentionally contextual rather than autofixable.

After validating the model, consider rules for:

- Removed or renamed component props with deterministic replacements.
- Deprecated import paths.
- Deprecated token names.
- Unsupported theme and color-scheme combinations.

Accessibility guidance should only become a lint rule when static analysis can
identify a real violation without rejecting supported component APIs.

## Non-goals

- Replacing integration, accessibility or visual tests.
- Encoding team-specific architecture as Eufemia compliance.
- Automatically rebuilding application layouts or state management.
- Treating every best practice as an error.

## Open decisions

- Whether the catalogue is JavaScript, JSON or generated from rule modules.
- Which metadata fields are part of the public compatibility contract.
- Whether MCP reads the package export or generated documentation.
- How consumers override severity without changing Eufemia's default meaning.

## Acceptance criteria

- Lint and MCP identify a rule with the same ID, severity and documentation.
- An autofix is never advertised unless the corresponding implementation
  exists and preserves behavior.
- Downstream tools can consume the catalogue without copying Eufemia facts.
- Recommendations remain distinguishable from unsupported or deprecated usage.

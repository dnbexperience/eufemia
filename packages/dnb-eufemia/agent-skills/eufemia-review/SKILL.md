---
name: eufemia-review
description: Review code against current Eufemia documentation and supported APIs. Use for Eufemia compliance reviews, design-system audits, deprecations, accessibility findings, or migration readiness.
compatibility: Requires the Eufemia MCP server and its packaged documentation.
metadata:
  owner: dnbexperience/eufemia
  manifest-version: '1'
---

# Review Eufemia Usage

Review against Eufemia's current contract, not local copies of design-system
facts.

1. Identify the Eufemia version in the target project. Call `docs_meta` and note
   any mismatch with the installed version.
2. Use `docs_search` and `docs_read` for relevant requirements,
   recommendations, deprecations, and release guidance.
3. Resolve every questioned component with `component_find`. Verify its current
   API with `component_props` and behavior with `component_doc`.
4. Call `review_rules`. Run the Eufemia ESLint and Stylelint plugins when they
   are installed in the target project. Treat their findings according to the
   same rule metadata and documentation.
5. Classify each finding as unsupported usage, deprecation, accessibility
   defect, recommendation, or context-dependent alternative.
6. Only propose automatic changes when the replacement is deterministic and
   preserves behavior. Do not automatically redesign application architecture.
7. Present actionable findings first, with source paths and Eufemia
   documentation evidence. State remaining test or manual verification gaps.

Do not turn preferences into universal Eufemia requirements. Missing generic
functionality should be considered for contribution to Eufemia before another
permanent abstraction is introduced.
If the MCP server or a required tool is unavailable, stop and report the
incompatible setup instead of guessing current Eufemia rules.

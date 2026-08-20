---
name: eufemia-accessibility
description: Apply Eufemia-specific accessibility guidance. Use when designing, implementing, or reviewing keyboard interaction, semantics, focus, labels, contrast, or assistive technology behavior.
compatibility: Requires the Eufemia MCP server and its packaged documentation.
metadata:
  owner: dnbexperience/eufemia
  manifest-version: '1'
---

# Eufemia Accessibility

Use current Eufemia documentation and verify the complete application behavior.

1. Call `docs_meta` when available to identify the documentation version.
2. Use `docs_search` and `docs_read` to locate current accessibility, focus,
   typography, forms, and interaction guidance.
3. Use `component_doc` for the accessibility behavior and limitations of each
   relevant component.
4. Separate guarantees provided by Eufemia from responsibilities that remain in
   application composition, content, routing, state, and focus management.
5. Verify semantics, labels and descriptions, keyboard operation, visible focus,
   status announcements, contrast, zoom, reflow, reduced motion, and screen
   reader behavior where relevant.
6. Prefer supported native and Eufemia behavior. Do not classify a documented
   API as prohibited without documentation that establishes that requirement.

Automated checks are supporting evidence, not proof of accessibility. Report
manual verification gaps and cite the Eufemia documentation behind findings.

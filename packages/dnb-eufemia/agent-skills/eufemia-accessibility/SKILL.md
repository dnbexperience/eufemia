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

1. Call `docs_meta` to identify the documentation version.
2. Compare it with the project's installed `@dnb/eufemia` version. If they
   differ, switch to the local MCP from the installed package before making
   component-specific claims. If no package is installed, state the served
   version as the proposed target and keep any result that cannot be run as an
   unverified plan.
3. Use `docs_search` and `docs_read` to locate current accessibility, focus,
   typography, forms, and interaction guidance.
4. Use `component_doc` for the accessibility behavior and limitations of each
   relevant component.
5. Separate guarantees provided by Eufemia from responsibilities that remain in
   application composition, content, routing, state, and focus management.
6. Verify semantics, labels and descriptions, keyboard operation, visible focus,
   status announcements, contrast, zoom, reflow, reduced motion, and screen
   reader behavior where relevant.
7. Prefer supported native and Eufemia behavior. Do not classify a documented
   API as prohibited without documentation that establishes that requirement.

Automated checks are supporting evidence, not proof of accessibility. Report
manual verification gaps and cite the Eufemia documentation behind findings.
If the MCP server or a required tool is unavailable, stop and report the
incompatible setup instead of guessing current Eufemia guidance.

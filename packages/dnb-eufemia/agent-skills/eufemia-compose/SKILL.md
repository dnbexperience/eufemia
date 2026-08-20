---
name: eufemia-compose
description: Compose pages and features from current Eufemia documentation. Use when building layouts, forms, feedback states, theming, or complete Eufemia interfaces.
compatibility: Requires the Eufemia MCP server and its packaged documentation.
metadata:
  owner: dnbexperience/eufemia
  manifest-version: '1'
---

# Compose With Eufemia

Build from current Eufemia capabilities rather than copied component recipes.

1. Call `docs_meta` to identify the documentation version.
2. Read the project's installed `@dnb/eufemia` version. If it differs from
   `docs_meta`, switch to the local MCP from that installed package before
   composing version-specific code. If no version is installed, state the
   served version as the proposed target. When package installation is
   prohibited, limit the result to documentation and planning.
3. Describe the user goal, primary action, information hierarchy, data states,
   and accessibility needs before choosing components.
4. Use `docs_search` and `docs_read` to find the relevant layout, Forms,
   theming, typography, or feedback guidance. Add a prefix when the relevant
   documentation area is known.
5. Resolve candidate components with `component_find`, verify APIs with
   `component_props`, and read `component_doc` for behavior and examples.
6. Verify theme and color-scheme support in the current theming documentation.
   Do not infer a complete color scheme from the existence of `ondark` tokens.
7. Cover loading, empty, error, success, validation, keyboard, and responsive
   states that apply to the feature.
8. Follow the target repository's architecture and styling conventions where
   they do not conflict with Eufemia's documented API.

Keep business workflows, authentication, deployment, and product-specific
provider stacks outside this skill. If the required generic capability is
missing, propose an Eufemia contribution and make any local fallback explicit.
If the MCP server or a required tool is unavailable, stop and report the
incompatible setup instead of guessing current Eufemia facts.

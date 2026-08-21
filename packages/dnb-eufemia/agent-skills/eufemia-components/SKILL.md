---
name: eufemia-components
description: Find and apply current Eufemia component APIs. Use when choosing a component or implementing Eufemia props, events, forms, layout primitives, or examples.
compatibility: Requires the Eufemia MCP server and its packaged documentation.
metadata:
  owner: dnbexperience/eufemia
  manifest-version: '1'
---

# Eufemia Components

Use Eufemia's packaged documentation as the source of truth.

1. Call `docs_meta` on the Eufemia MCP server to identify the documentation
   version.
2. Read the project's installed `@dnb/eufemia` version. If it differs from
   `docs_meta`, switch to the local MCP from that installed package before using
   version-specific APIs. If no version is installed, treat the served version
   as the proposed target and state that it must be installed before
   implementation can be verified.
3. If the component name is uncertain, use `component_find` before selecting an
   API.
4. Use `component_props` for current properties and events. Read every returned
   block, including inherited APIs and compound components.
5. Use `component_doc` when implementation examples, behavior, accessibility,
   or contextual guidance are needed.
6. Do not infer undocumented properties or reproduce APIs from memory.
7. If generally useful functionality is missing, identify it as a possible
   Eufemia contribution instead of automatically creating a parallel component.

State which documentation path or component API supports the result. If the MCP
server or a required tool is unavailable, stop and report that the current
Eufemia contract could not be verified instead of guessing.

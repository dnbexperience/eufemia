# Eufemia Design System for RAIWork

Official Eufemia workflows and versioned documentation for production DNB
frontends.

## Included skills

| Skill                   | Use it for                                                                |
| ----------------------- | ------------------------------------------------------------------------- |
| `eufemia-components`    | Find components and verify current props, events, forms, and layout APIs. |
| `eufemia-compose`       | Compose complete pages and features from Eufemia primitives and guidance. |
| `eufemia-accessibility` | Apply Eufemia-specific accessibility guidance and verification.           |
| `eufemia-review`        | Review code against supported APIs, deprecations, and documented rules.   |
| `eufemia-migrate`       | Plan and validate Eufemia upgrades using current release documentation.   |

## Enable the MCP server

RAIWork selects skills by default during installation, but remote MCP servers
require explicit consent. Enable the **eufemia** MCP row to let the skills query
the official hosted documentation.

The hosted server only serves Eufemia documentation and machine-readable design
system metadata. It does not read your project files or execute code on your
machine.

If the MCP server is not enabled or cannot be reached, the skills should explain
that current Eufemia facts could not be verified instead of guessing.

## Version behavior

The hosted MCP server follows the latest released Eufemia documentation. When a
project uses another `@dnb/eufemia` version, compare it with `docs_meta` when the
tool is available and treat version-specific guidance carefully.

## Scope

This plugin owns generic Eufemia components, themes, accessibility guidance,
review rules, and migrations. Product-specific authentication, providers,
deployment, and business workflows remain with product or platform tooling.
Generic visual-exploration skills can support ideation, but they do not define
production DNB design-system APIs or compliance requirements.

More documentation: [eufemia.dnb.no](https://eufemia.dnb.no)

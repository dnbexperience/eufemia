# Eufemia documentation

> DNB's Eufemia design system. This file points LLMs to machine-readable docs and clean Markdown copies.

- Use the documentation exactly as provided.
- Gather all required information from the documentation before using it as a reference.
- Do not make assumptions or infer missing details unless explicitly instructed to do so.

## Quick Reference

- [Eufemia quick reference]({{BASE}}/uilib/usage/first-steps/quick-reference.md): A compact, practical guide with setup, components, forms, and key conventions.

## Machine-readable docs

Every Eufemia documentation page — including components, Forms fields, values, and related entities — includes machine-readable Markdown copies with JSON blocks that describe its public API.

Each page is both:

- a standalone documentation page, and
- an addressable API surface with structured JSON blocks.

The JSON blocks may include:

- props (properties, types, defaults, descriptions).
- events.
- relationships to other pages or components.
- links to related documentation pages.
- a docs entry that leads to the markdown file, which includes additional information, demos and examples.

The docs links are referenced from each page's frontmatter and are intended for tooling and AI-assisted usage, without relying on prose.

### Finding component API details

For any page (component, field, value, etc.):

- Open the page markdown (e.g. `/uilib/components/<name>.md`).
- Look at the demos and examples how to use the component.
- Read the JSON blocks in the markdown to get the API (props, events, translations).

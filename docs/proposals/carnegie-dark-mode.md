# Carnegie dark mode

Status: Draft, product decision required

## Current support

Carnegie is currently a light-only Eufemia theme. It provides `ondark` tokens
for components placed on bounded dark surfaces, but it does not provide a full
dark color scheme or a `carnegie-theme-dark-mode` stylesheet.

Using `<Theme name="carnegie" surface="dark">` for a dark region is supported.
Setting `colorScheme="dark"` does not establish Carnegie dark-mode support.

## Decision required

Do not add or advertise a Carnegie dark color scheme until there is an approved
consumer requirement and a design-system implementation plan.

A Figma token collection or a downstream token table is useful design input,
but it is not an Eufemia support contract. Support also includes component
states, accessibility, documentation, testing and release ownership.

The proposal needs:

- A sponsoring product and concrete use cases.
- Approved Carnegie dark-mode designs and semantic token mappings.
- Agreement on scope, release timing and long-term ownership.
- A migration plan for any existing local implementations.

## Implementation scope if approved

### Tokens and styles

- Add an approved dark token mode to the token source.
- Generate Carnegie dark tokens through the existing token pipeline.
- Publish a Carnegie dark-mode stylesheet using the established theme naming.
- Keep dark-surface `ondark` behavior distinct from application color scheme.

### Components

Verify every component and Forms surface used by the sponsoring products,
including default, hover, pressed, selected, disabled, focus, error, loading and
overlay states. Missing behavior should be fixed in Eufemia rather than patched
in consuming applications.

### Accessibility

- Verify text, icon, control and focus contrast.
- Test keyboard focus across dark backgrounds and layered surfaces.
- Test forced colors, reduced motion and browser color-scheme integration.
- Include manual screen-reader and zoom checks for representative flows.

### Validation and release

- Add visual regression coverage for representative components and forms.
- Add token and stylesheet build validation.
- Document setup, supported combinations and migration guidance.
- Expose Carnegie dark support in Eufemia's machine-readable theme capability
  metadata only when the implementation is complete.

## Non-goals

- Shipping a local `carnegie-theme-dark-mode` file outside Eufemia.
- Treating dark-surface tokens as proof of full dark-mode support.
- Copying provisional token values into agent skills or application guidance.
- Advertising support before components and accessibility have been verified.

## Open questions

- Which products require Carnegie dark mode, and for which user journeys?
- Is the requirement full application dark mode or selected dark surfaces?
- Which Figma source and approval process owns the final semantic mappings?
- Which component set defines the first supported release?
- How should existing downstream experiments be migrated or removed?

## Acceptance criteria

If the proposal is approved, Eufemia should only declare Carnegie dark mode
supported when tokens, styles, components, accessibility checks, documentation
and machine-readable capability metadata ship together.

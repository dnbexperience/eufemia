---
version: 11.0.2
generatedAt: 2026-04-28T04:47:22.538Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

---

**NB:** Do not use the `--token-*` CSS custom properties in your code until this page is marked as ready for consumption. The token API is still being finalized and may change without warning until then.

---

## Overview

```tsx
render(
  <Table>
    <thead>
      <Tr>
        <Th>Section</Th>
        <Th>Tokens</Th>
        <Th>Usage</Th>
      </Tr>
    </thead>
    <tbody>
      {colorSections.map((section) => {
        return (
          <Tr key={section.id}>
            <Td>
              <Anchor
                href={`/uilib/usage/customisation/theming/design-tokens/colors/#${section.id}`}
              >
                {section.title}
              </Anchor>
            </Td>
            <Td>{section.tokens.length}</Td>
            <Td>
              {section.id === 'component'
                ? 'For internal use only.'
                : section.id === 'decorative'
                  ? 'For advanced custom decorative needs.'
                  : 'For external use. Use the filters in each section to narrow tokens to the variants you need.'}
            </Td>
          </Tr>
        )
      })}
    </tbody>
  </Table>
)
```

### Tips

- Hover over the value of a token in the tables below to see its **Eufemia Foundation** name.
- Use the filter buttons above each table to narrow tokens by modifier (for example `inverse`, `ondark`, `subtle`, `bold` or `static`). Multiple modifiers combine with `AND`.
- You can sort the tables by clicking the column headers. Click again to reverse the sort order.

## Background

Background tokens are used for surfaces, fills and interactive fill states. Typical semantic names in this section are `action`, `neutral`, `selected` and `page`.

<TokenSectionTable section="background" />

## Text

Text tokens are used for readable content, labels and text states.

<TokenSectionTable section="text" />

## Icon

Icon tokens are used for icon colors.

<TokenSectionTable section="icon" />

## Stroke

Stroke tokens are used for borders, dividers, outlines and focus-related line work.

<TokenSectionTable section="stroke" />

## Decorative

Decorative tokens are colors to use for advanced custom decorative needs where the semantic color tokens are not the right fit. They should not be used for text. For text on dark decorative backgrounds, use the `ondark` text tokens, and for other backgrounds, use the `neutral` text tokens.

If you use decorative tokens, the `First`, `Second`, and `Third` sets are intended to be used one at a time, because the colors inside each set are designed to match each other.

<TokenSectionTable section="decorative" />

## Component

**NB:** Do not use. These tokens are reserved for internal use only.

Component tokens are the component-specific layer. They are useful when a broad semantic token is not precise enough and the API needs a token with an explicit component role, such as `button`, `tooltip` or `table`.

After `-component-`, the next segment is the component name, followed by the role path. Example:

<TokenExample name="--token-color-component-button-background-action" />.

<TokenSectionTable section="component" />

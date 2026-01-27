---
title: 'Typography'
description: 'DNB Headings and paragraphs, their properties and styling.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.351Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Typography

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=530-49)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/style)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/typography)

## Typography components

The two main components used to set typography are:

- [Span](/uilib/elements/span)
- [P](/uilib/elements/paragraph)

([Lead](/uilib/elements/lead) and [Ingress](uilib/elements/ingress) also work in the same way)

## Typography in general

Fonts are handled automatically once the CSS packages **dnb-ui-core** or **dnb-ui-basis** are loaded.

Every typography HTML element, like headings and paragraphs, has a defined `height` and `line-height` so everything falls exactly into the **8-pixel grid**.

You don't need to define the `font-family`, but rather use CSS Custom Properties for `font-weight`, `font-size`, and `line-height`.

### Typography property tables

- [font-weight](/uilib/typography/font-weight)
- [font-size](/uilib/typography/font-size)
- [line-height](/uilib/typography/line-height)

### Typography Examples

```tsx
render(
  <div
    style={{
      maxWidth: '30rem',
    }}
  >
    <Code>Heading xx-large</Code>
    <H4 size="xx-large" space={0}>
      Dette er en heading på over to linjer
    </H4>
    <Code top="large">Heading x-large</Code>
    <H4 size="x-large" space={0}>
      Og dette er en heading small tittel som også går over to linjer, nei
      vent, tre linjer.
    </H4>
    <Code top="large">Heading large</Code>
    <H4 size="large" space={0}>
      Hva har vi her, en liten heading som mot alle odds går over flere
      linjer.
    </H4>
    <Code top="large">Text Lead</Code>
    <Lead space={0}>
      Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
      appetere oporteat eam te.
    </Lead>
    <Code top="large">Text basis</Code>
    <P space={0}>
      Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
      appetere oporteat eam te. Vel in deleniti sensibus, officiis menandri
      efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax
      ea pro, vidit fierent mentitum in est, ex fabellas senserit
      inciderint vim.
    </P>
    <Code top="large">Text basis (Medium)</Code>
    <P weight="medium" space={0}>
      Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
      appetere oporteat eam te. Vel in deleniti sensibus, officiis menandri
      efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax
      ea pro, vidit fierent mentitum in est, ex fabellas senserit
      inciderint vim.
    </P>
    <Code top="large">Text small</Code>
    <P size="small" space={0}>
      Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
      appetere oporteat eam te. Vel in deleniti sensibus, officiis menandri
      efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax
      ea pro, vidit fierent mentitum in est, ex fabellas senserit
      inciderint vim.
    </P>
    <Code top="large">Text small (Medium)</Code>
    <P size="small" weight="medium" space={0}>
      Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei,
      appetere oporteat eam te. Vel in deleniti sensibus, officiis menandri
      efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax
      ea pro, vidit fierent mentitum in est, ex fabellas senserit
      inciderint vim.
    </P>
    <Code top="large">Text x-small</Code>
    <P size="x-small" space={0}>
      Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei.
    </P>
    <Code top="large">Text x-small (Medium)</Code>
    <P size="x-small" weight="medium" space={0}>
      Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei.
    </P>
  </div>
)
```

## Line length

For readable paragraphs and inline help text, keep line length constrained to a comfortable character count.

- Use `var(--prose-max-width)` as the canonical token for maximum text width. Default is `60ch`.
- Base styles and some components expose `var(--prose-max-width)`, which maps to `var(--prose-max-width)`.

### Using the `proseMaxWidth` property (max width in characters)

Prose refers to written text in its natural form, particularly paragraphs and other continuous writing. Typography components like `H2`, `H3`, and `P` support the `proseMaxWidth` property to limit text width based on character count:

```tsx
<H2 proseMaxWidth={80}>
  This heading will be limited to approximately 80 characters wide
</H2>
<P proseMaxWidth={60}>
  This paragraph will be limited to approximately 60 characters wide
</P>
```

### Using `Typography.Provider`

Use `Typography.Provider` to apply `proseMaxWidth` to multiple typography components at once:

```tsx
<Typography.Provider proseMaxWidth={60}>
  <P>This paragraph will be limited to approximately 60 characters wide</P>
  <P>
    This paragraph will also be limited to approximately 60 characters wide
  </P>
  <H2 proseMaxWidth={80}>This heading overrides with its own value</H2>
</Typography.Provider>
```

CSS example:

```css
.prose {
  max-width: var(--prose-max-width); /* 60ch by default */
}
```

## Font Face

The default DNB font family is `DNB`, loaded via `@font-face` in `@dnb/eufemia/src/style/themes/theme-ui/fonts.scss`.

- Sbanken uses its own fonts, declared and loaded in `@dnb/eufemia/src/style/themes/theme-sbanken/fonts.scss` and applied via Sbanken-specific properties.
- Carnegie uses the `ArizonaFlare` font family, declared and loaded in `@dnb/eufemia/src/style/themes/theme-carnegie/fonts.scss`, and applied through the Carnegie theme’s typography variables.
- Eiendom uses the default DNB font family.

## Spacing and margin collapsing

You can use the [Spacing properties](/uilib/layout/space/properties) inside every Eufemia React Element, but keep in mind that [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing) can sometimes be a little tricky to get right.

```jsx
import { H1, H2, ... } from '@dnb/eufemia'

<H1 bottom="x-large">Heading with bottom margin: x-large</H1>
<H2 top="x-large">Heading with top margin: x-large</H2>
```

## Anchor

- `.dnb-anchor` <a href="/" className="dnb-anchor">Anchor with default style</a>
- `.dnb-anchor--hover` <a href="/" className="dnb-anchor dnb-anchor--hover">Hover style</a>
- `.dnb-anchor--active` <a href="/" className="dnb-anchor dnb-anchor--active">Active style</a>
- `.dnb-anchor--focus` <a href="/" className="dnb-anchor dnb-anchor--focus">Focus style</a>

Read more about the [Anchor / Text Link](/uilib/components/anchor).

## DNB Mono (monospace)

DNB has its own monospace typeface (`font-family`).

Use it either by a CSS class `.dnb-t__family--monospace` or define your own like so:

```css
.css-selector {
  font-family: var(--font-family-monospace);
  font-weight: normal;
  font-style: normal;
}
```

## Hosted Fonts (CDN)

The font files are hosted under the following URLs:

### DNB

- `https://eufemia.dnb.no/fonts/dnb/DNB-Regular.woff2`
- `https://eufemia.dnb.no/fonts/dnb/DNB-Medium.woff2`
- `https://eufemia.dnb.no/fonts/dnb/DNB-Bold.woff2`
- `https://eufemia.dnb.no/fonts/dnb/DNBMono-Regular.woff2`
- `https://eufemia.dnb.no/fonts/dnb/DNBMono-Medium.woff2`
- `https://eufemia.dnb.no/fonts/dnb/DNBMono-Bold.woff2`

### Sbanken

- `https://eufemia.dnb.no/fonts/sbanken/MaisonNeue.woff2`
- `https://eufemia.dnb.no/fonts/sbanken/Roboto-Regular.woff2`
- `https://eufemia.dnb.no/fonts/sbanken/Roboto-Medium.woff2`
- `https://eufemia.dnb.no/fonts/sbanken/Roboto-Bold.woff2`

### DNB Carnegie

- `https://eufemia.dnb.no/fonts/carnegie/ArizonaFlare-Regular.woff2`
- `https://eufemia.dnb.no/fonts/carnegie/ArizonaFlare-Medium.woff2`
- `https://eufemia.dnb.no/fonts/carnegie/ArizonaFlare-Bold.woff2`

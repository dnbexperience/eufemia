---
title: 'Typography'
description: 'DNB Headings and paragraphs, their properties and styling.'
icon: 'typography'
order: 5
showTabs: true
tabs:
  - title: General
    key: /uilib/typography
  - title: Headings
    key: /uilib/typography/heading
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

## Typography in general

Fonts are handled automatically once the CSS packages **dnb-ui-core** or **dnb-ui-basis** are loaded.

Every typography HTML element, like headings and paragraphs, have a defined `height`, respective `line-height` so everything falls exactly into the **8 pixel grid**.

You don't need to define the `font-family` ever, but rather use CSS Custom Properties for `font-weight`, `font-size` and `line-height`.

### Typography property tables

- [font-weight](/uilib/typography/font-weight)
- [font-size](/uilib/typography/font-size)
- [line-height](/uilib/typography/line-height)

### Typography Examples

<ComponentBox data-visual-test="typography-variants" hideCode>
{`
<div style={{maxWidth: '30rem'}}>
  <Code>Heading xx-large</Code>
  <H4 size="xx-large" space={0}>Dette er en heading på over to linjer</H4>
  <Code top="large">Heading x-large</Code>
  <H4 size="x-large" space={0}>Og dette er en heading small tittel som også går over to linjer, nei vent, tre linjer.</H4>
  <Code top="large">Heading large</Code>
  <H4 size="large" space={0}>Hva har vi her, en liten heading som mot alle odds går over flere linjer.</H4>
  <Code top="large">Text Lead</Code>
  <Lead space={0}>Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere oporteat eam te.</Lead>
  <Code top="large">Text basis</Code>
  <P space={0}>Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere oporteat eam te. Vel in deleniti sensibus, officiis menandri efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax ea pro, vidit fierent mentitum in est, ex fabellas senserit inciderint vim.</P>
  <Code top="large">Text basis (Medium)</Code>
  <P modifier="medium" space={0}>Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere oporteat eam te. Vel in deleniti sensibus, officiis menandri efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax ea pro, vidit fierent mentitum in est, ex fabellas senserit inciderint vim.</P>
  <Code top="large">Text small</Code>
  <P size="small" space={0}>Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere oporteat eam te. Vel in deleniti sensibus, officiis menandri efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax ea pro, vidit fierent mentitum in est, ex fabellas senserit inciderint vim.</P>
  <Code top="large">Text small (Medium)</Code>
  <P size="small" modifier="medium" space={0}>Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei, appetere oporteat eam te. Vel in deleniti sensibus, officiis menandri efficiantur no cum. Per et habemus gubergren. Mundi copiosae pertinax ea pro, vidit fierent mentitum in est, ex fabellas senserit inciderint vim.</P>
  <Code top="large">Text x-small</Code>
  <P size="x-small" space={0}>Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei.</P>
  <Code top="large">Text x-small (Medium)</Code>
  <P size="x-small" modifier="medium" space={0}>Lorem ipsum dolor sit amet, sint quodsi concludaturque nam ei.</P>
</div>
`}
</ComponentBox>

## Font Face

The DNB default Font Family is `DNB`. This font, together with it's weights is loaded and imported with `@font-face` in `/css/core/fonts.scss`. The font family is included in the library package.

## Spacing and margin collapsing

You can use the [Spacing properties](/uilib/components/space/properties) inside every Eufemia React Element, but keep in mind, [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing) can some times a little tricky to get right.

```jsx
import { H1, H2, ... } from '@dnb/eufemia/elements'

<H1 bottom="x-large">Heading with bottom margin: x-large</H1>
<H2 top="x-large">Heading with top margin: x-large</H2>
```

## Anchor

- `.dnb-anchor` <a href="/" class="dnb-anchor">Anchor with default style</a>
- `.dnb-anchor--hover` <a href="/" class="dnb-anchor dnb-anchor--hover">Hover Style</a>
- `.dnb-anchor--active` <a href="/" class="dnb-anchor dnb-anchor--active">Active Style</a>
- `.dnb-anchor--focus` <a href="/" class="dnb-anchor dnb-anchor--focus">Focus Style</a>

Read more about the [Anchor / Text Link](/uilib/elements/anchor)

## DNB Mono (monospace)

DNB hast it's own monospace typeface (`font-family`).

Use it either by a CSS class `.dnb-typo-mono-regular` or define your own like so:

```css
.css-selector {
  font-family: var(--font-family-monospace);
  font-weight: normal;
  font-style: normal;
}
```

---
title: 'Hr-line'
redirect_from:
  - /uilib/elements/hr
---

import ComponentBox from 'Tags/ComponentBox'

## Horizontal Rule

The `<hr />` tag in HTML stands for horizontal rule and is used to insert a horizontal rule or a thematic break in an HTML page to divide or separate document sections. The `<hr />` tag is an empty tag and it does not require an end tag.

## Customize hr color

```css
/* Example of how to change the line color */
.dnb-hr:after {
  color: var(--color-ocean-green);
}
```

<ComponentBox hideCode useRender data-dnb-test="hr-default">
{`
// import { Hr } from 'dnb-ui-lib/elements'
render(<>
  Something
  <Hr />
  Something
</>)
`}
</ComponentBox>

## Horizontal Rule in fullscreen

Use the modifier `dnb-hr--fullscreen` to get a full screen rule. You can also set just `fullscreen={true}`.

<ComponentBox hideCode useRender data-dnb-test="hr-fullscreen">
{`
// import { Hr } from 'dnb-ui-lib/elements'
render(<>
  Something
  <Hr fullscreen />
  Something
</>)
`}
</ComponentBox>

## Horizontal Rule thickness / hairline

Use the modifier `dnb-hr--light` to get a `0.5px` rule. You can also set just `light={true}` or `medium={true}`.

<ComponentBox hideCode useRender data-dnb-test="hr-thickness">
{`
// import { Hr } from 'dnb-ui-lib/elements'
render(<>
  <Dl>
    <dt>Light 0.5px</dt>
    <dd><Hr light /></dd>
  </Dl>
  <Dl>
    <dt>Default 1px</dt>
    <dd><Hr /></dd>
  </Dl>
  <Dl>
    <dt>Medium 1.5px</dt>
    <dd><Hr medium /></dd>
  </Dl>
</>)
`}
</ComponentBox>

## Horizontal Rule thickness tests

Browsers do render borders differently. They also handle sizing differently. E.g. will `1.5px` be rounded up to `2px` in Chromium based browsers (on size related CSS properties).

In order to address different solutions, [here is a test case](https://r8ljo.csb.app/), finding the right balance of creating `0.5px` / `1.5px` lines, browser compatibility and correct look. As per year 2020, Firefox does the best job on showing the line thickness correct.

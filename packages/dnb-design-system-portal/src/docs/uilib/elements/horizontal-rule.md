---
title: 'Hr'
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

### Horizontal Rule in fullscreen

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

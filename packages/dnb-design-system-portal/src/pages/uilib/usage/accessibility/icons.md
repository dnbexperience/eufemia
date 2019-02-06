---
title: 'Icon'
draft: false
---

import ComponentBox from 'Tags/ComponentBox'
import Beach from 'Pages/uilib/usage/accessibility/assets/beach'

# Accessibility of Icons

By using Inline SVG, we have today the possibility to make graphical assets both **responsive** and **interactive**. In order to do so, use the [Icon](/uilib/components/icon) or [IconPrimary](/uilib/components/icon-primary) component. These components provides the needed runtime processing, witch is needed to get there.

## Decorative Icons

If your icons are purely **decorative**, you’ll need to manually add an **aria-hidden** (results in `aria-hidden="true"`) attribute to each of your icons so Your app is "accessible".

<ComponentBox scope={{Beach}}>
{`
<Icon icon={Beach} size="60" title="Beach" aria-hidden />
`}
</ComponentBox>

## Responsive Icons

Use `size="auto"` to force the icon to inherit the size of its parent element.

<ComponentBox scope={{Beach}}>
{`
<h1>My H1 with an Icon <Icon icon={Beach} title="Beach" size="auto" /></h1>
<h4>My H4 with the same Icon <Icon icon={Beach} title="Beach" size="auto" /></h4>
`}
</ComponentBox>

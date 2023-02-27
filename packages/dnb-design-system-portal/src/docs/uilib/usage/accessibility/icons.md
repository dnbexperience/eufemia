---
title: 'Icons'
---

import {
IconsDecorativeExample,
IconsResponsiveExample,
IconsSVGExample
} from 'Docs/uilib/usage/accessibility/icons/Examples'

# Accessibility of Icons

By using inline SVG, we have the possibility to make graphical assets both **responsive** and **interactive**. In order to do so, use the [Icon](/uilib/components/icon) or [IconPrimary](/uilib/components/icon-primary) component. These components provide the needed runtime processing.

## Decorative Icons

If your icons are purely **decorative**, you’ll need to manually add an **aria-hidden** (results in `aria-hidden={true}`) attribute to each of your icons so your app is "accessible".

<IconsDecorativeExample />

## Responsive Icons

Use `size="auto"` to force the icon to inherit the size of its parent element.

<IconsResponsiveExample />

## SVG Icons

_Scalable Vector Graphics_ can be set up to be scalable and actually respond to the `font-size`.

<IconsSVGExample />

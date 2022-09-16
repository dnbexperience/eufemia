---
showTabs: true
---

import {
HeightAnimationExample,
} from 'Docs/uilib/helpers/Examples'
import SkipLinkExample from 'Docs/uilib/usage/accessibility/examples/skip-link-example.js'

## Description

These React Hooks are internally used in the components, and are with that a good choice when it comes to save bandwidth in the final production bundle.

## `useHeightAnimation`

In many places we want to animate the content in and out. The challenge is to never define a fixed height, because of an unknown content size and users' different font sizes.

The `useHeightAnimation` hook takes an HTML Element, and animates it from 0 to the current content. When the animation is done, it sets the element's height to `auto`.

The element animation is done with a CSS transition, e.g.:

```css
.animation-element {
  overflow: hidden;
  transition: height 1s var(--easing-default);
}
```

<HeightAnimationExample />

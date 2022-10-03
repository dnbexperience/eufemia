---
showTabs: true
---

import {
HeightAnimationDefault,
HeightAnimationKeepInDOM,
} from 'Docs/uilib/components/height-animation/Examples'

## Demos

### HeightAnimation

<HeightAnimationDefault />

### Keep in DOM

When providing `keepInDOM={true}`, your nested content will never be removed from the DOM. But rather be "hidden" with `visually: hidden` and `aria-hidden`.

<HeightAnimationKeepInDOM />

---
showTabs: true
---

## Description

The HeightAnimation component is a helper component to animate from 0px to height:auto powered by CSS. It calculates the height on the fly.

When the animation is done, it sets the element's height to `auto`.

The component can be used as an opt-int replacement instead of vanilla HTML Elements.

The element animation is done with a CSS transition and a `400ms` duration:

## Accessibility

It is important to never animate from 0 to e.g. 64px – because the content may differ based on the viewport width (screen size), the content itself, or the user may even have a larger `font-size`.

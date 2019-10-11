---
draft: true
---

import Examples from 'Pages/uilib/components/section/Examples'

## Description

The Section component is a visual helper. It wraps content inside a visual section banner. Under the hoot it uses a couple of tricks to get an infinite wide look background. You don't need to do anything more than you else would do regarding your content and the `max-width`. The background from the Section component will go beyond a `max-width`.

## Usage

In the following example shows form sections with different styling. The helper prop `spacing` adds spacing to the section if needed.

## Customize color

```css
/* Example of how to change the background color */
.dnb-section:after {
  color: var(--color-ocean-green);
}
```

## Demos

<Examples />

---
showTabs: true
---

import '@dnb/eufemia/src/components/slider/style/dnb-range.scss'
import {
SliderExampleDefault,
SliderVerticalWithSteps,
SliderExampleHorizontalSync,
SliderExampleSuffix,
SliderExampleRange,
SliderExampleMultiButtons,
SliderExampleMultiButtonsThumbBehavior,
} from 'Docs/uilib/components/slider/Examples'

## Demos

### Default Slider

<SliderExampleDefault />

### Slider with multiple thumb buttons

Provide the `value` property as an array with numbers. The `onChange` event will then also return the property `value` as an array. The `+` and `-` buttons will not be visible when when more than one thumb button is present.

<SliderExampleMultiButtons />

By default, the thumbs can swap positions. You can change that behavior with `multiThumbBehavior`.

<SliderExampleMultiButtonsThumbBehavior />

### Vertical slider with steps of 10

<SliderVerticalWithSteps />

### Horizontal and vertical slider in sync with input field

<SliderExampleHorizontalSync />

### Slider with a suffix

<SliderExampleSuffix />

### Native Range Slider

In order to get the styles, import also: `@dnb/eufemia/components/slider/style/dnb-range.min.css`

<SliderExampleRange />

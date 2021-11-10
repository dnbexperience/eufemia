---
showTabs: true
---

import FormRowVisualTests, {
FormRowVerticalAlignedLabels,
FormRowLegendIndentUsage,
FormRowSectionStyle,
FormRowCombineVerticalAndHorizontal,
FormRowCustomIndentLayout,
FormRowDefault,
FormRowVertical,
FormRowVerticalDirection,
FormRowNoWrap,
FormRowWrap,
FormRowLegendUsage,
FormRowInheritContext,
FormRowDifferentDirections,
} from 'Docs/uilib/components/form-row/Examples'

## Demos

### Basic FormRow

<FormRowDefault />

### Vertical FormRow

<FormRowVertical />

### Vertical aligned labels

Only the labels are vertical aligned - while the input labels are still horizontal.

<FormRowVerticalAlignedLabels />

### Vertical direction

Vertical label direction in combination with a button

<FormRowVerticalDirection />

### Combine both vertical and horizontal FormRow's

<FormRowCombineVerticalAndHorizontal />

### Several components inside a horizontal FormRow - not wrapping

<FormRowNoWrap />

### Several components inside a wrapping (`wrap`) horizontal FormRow

<FormRowWrap />

### Legend usage

<FormRowLegendUsage />

### Legend and indent usage

<FormRowLegendIndentUsage />

### Inherit context

<FormRowInheritContext />

### Combining different components and directions

<FormRowDifferentDirections />

### Section style

The `label` property can be used to set a row label as well as the `section_style` is supported

<FormRowSectionStyle />

### Custom indent layout

Customize the `.dnb-form-row` styles. Instead of using the build in `indent` property.

<FormRowCustomIndentLayout />

<FormRowVisualTests />

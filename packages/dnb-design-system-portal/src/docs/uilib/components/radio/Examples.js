/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const RadioExampleDefault = () => (
  <ComponentBox data-visual-test="radio-group">
    {
      /* jsx */ `
<Radio.Group
  label="Radio Group:"
  on_change={({ value }) => { console.log('on_change', value) }}
  value="first"
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio
    label="Third"
    value="third"
  />
</Radio.Group>
`
    }
  </ComponentBox>
)

export const RadioExampleVerticalGroup = () => (
  <ComponentBox data-visual-test="radio-group-vertical">
    {
      /* jsx */ `
<Radio.Group
  label="Vertical Group:"
  layout_direction="column"
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio
    label="Third"
    value="third"
    checked
  />
</Radio.Group>
`
    }
  </ComponentBox>
)

export const RadioExampleGroupStatus = () => (
  <ComponentBox data-visual-test="radio-group-status">
    {
      /* jsx */ `
<Radio.Group
  label="Radio Group with status:"
  layout_direction="column"
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <Radio
    label="First"
    value="first"
    status="error"
  />
  <Radio
    label="Second"
    value="second"
    status="Error message"
  />
  <Radio
    label="Third"
    value="third"
    checked
    status="Info message"
    status_state="info"
  />
</Radio.Group>
`
    }
  </ComponentBox>
)

export const RadioExampleWithoutGroup = () => (
  <ComponentBox data-visual-test="radio-group-plain">
    {
      /* jsx */ `
<FormRow label="Plain Radio group:">
  <Radio
    value="first"
    label="First"
    group="MyRadioGroup"
    labelledby="MyRadioGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
    right
  />
  <Radio
    value="second"
    label="Second"
    group="MyRadioGroup"
    labelledby="MyRadioGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
    right
  />
  <Radio
    checked
    value="third"
    label="Third"
    group="MyRadioGroup"
    labelledby="MyRadioGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
    right
  />
</FormRow>
`
    }
  </ComponentBox>
)

export const RadioExampleSizes = () => (
  <ComponentBox data-visual-test="radio-sizes">
    {
      /* jsx */ `
<Radio size="medium" label="Medium" right="large" checked />
<Radio size="large" label="Large" checked />
`
    }
  </ComponentBox>
)

export const RadioExampleDisabled = () => (
  <ComponentBox data-visual-test="radio-group-disabled">
    {
      /* jsx */ `
<Radio.Group
  label="Disabled Group:"
  disabled
  label_position="left"
  name="MyGroup"
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio
    label="Third"
    value="third"
    checked
  />
</Radio.Group>
`
    }
  </ComponentBox>
)

export const RadioExampleSuffix = () => (
  <ComponentBox>
    {
      /* jsx */ `
<Radio.Group
  label="With suffixes:"
  label_position="left"
>
  <Radio label="First" value="first" />
  <Radio
    label="Second"
    value="second"
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
  />
  <Radio
    label="Third"
    value="third"
    status="Error message"
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
    checked
  />
</Radio.Group>
`
    }
  </ComponentBox>
)

export function RadioVisualTests() {
  return !global.IS_TEST ? null : (
    <>
      <ComponentBox
        title="Unchecked Radio (Single Radio buttons should not be used)"
        data-visual-test="radio-default"
      >
        {
          /* jsx */ `
<Radio
  label="Single Radio"
/>
`
        }
      </ComponentBox>
      <ComponentBox
        title="Checked Radio (Single Radio buttons should not be used)"
        data-visual-test="radio-checked"
      >
        {
          /* jsx */ `
<Radio
  label="Checked Radio"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
`
        }
      </ComponentBox>
    </>
  )
}

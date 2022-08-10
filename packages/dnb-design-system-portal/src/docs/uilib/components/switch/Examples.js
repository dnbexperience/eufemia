/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

const onChange = (state) => {
  console.log('onChangeHandler', state)
}

export const SwitchExampleDefault = () => (
  <ComponentBox data-visual-test="switch-default" scope={{ onChange }}>
    {
      /* jsx */ `
<Switch
  label="Switch"
  on_change={onChange}
/>
`
    }
  </ComponentBox>
)

export const SwitchExampleChecked = () => (
  <ComponentBox data-visual-test="switch-checked" scope={{ onChange }}>
    {
      /* jsx */ `
<Switch
  label="Label:"
  label_position="left"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
`
    }
  </ComponentBox>
)

export const SwitchExampleErrorMessage = () => (
  <ComponentBox data-visual-test="switch-error" scope={{ onChange }}>
    {
      /* jsx */ `
<Switch
  label="Switch"
  checked
  status="Error message"
/>
`
    }
  </ComponentBox>
)

export const SwitchExampleSuffix = () => (
  <ComponentBox scope={{ onChange }}>
    {
      /* jsx */ `
<Switch
  label="Switch"
  checked
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`
    }
  </ComponentBox>
)

export const SwitchExampleSizes = () => (
  <ComponentBox data-visual-test="switch-sizes">
    {
      /* jsx */ `
<Switch size="medium" label="Medium" right="large" checked />
<Switch size="large" label="Large" right="large" checked />
<Switch size="large" label="Large" />
`
    }
  </ComponentBox>
)

export const SwitchExampleDisabled = () => (
  <ComponentBox data-visual-test="switch-disabled">
    {
      /* jsx */ `
<Switch
  checked
  disabled
  label="Disabled"
/>
`
    }
  </ComponentBox>
)

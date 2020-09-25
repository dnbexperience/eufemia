/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

export const CheckboxUnchecked = () => (
  <ComponentBox data-dnb-test="checkbox-default">
    {
      /* @jsx */ `
<Checkbox
  label="Checkbox"
  on_change={(e) => console.log(e)}
/>
          `
    }
  </ComponentBox>
)

export const CheckboxChecked = () => (
  <ComponentBox data-dnb-test="checkbox-checked">
    {
      /* @jsx */ `
<Checkbox
  label="Label:"
  label_position="left"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
          `
    }
  </ComponentBox>
)

export const CheckboxWithError = () => (
  <ComponentBox data-dnb-test="checkbox-error">
    {
      /* @jsx */ `
<Checkbox
  label="Checkbox"
  checked
  status="Error message"
/>
          `
    }
  </ComponentBox>
)

export const CheckboxSuffix = () => (
  <ComponentBox>
    {
      /* @jsx */ `
<Checkbox
  label="Checkbox"
  checked
  suffix={<Modal title="Modal Title">Modal content</Modal>}
/>
          `
    }
  </ComponentBox>
)

export const CheckboxDifferentSizes = () => (
  <ComponentBox data-dnb-test="checkbox-sizes">
    {
      /* @jsx */ `
<Checkbox size="medium" label="Medium" right="large" checked />
<Checkbox size="large" label="Large" checked />
          `
    }
  </ComponentBox>
)

export const CheckboxDisabled = () => (
  <ComponentBox data-dnb-test="checkbox-disabled">
    {
      /* @jsx */ `
<Checkbox
  checked
  disabled
/>
`
    }
  </ComponentBox>
)

/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Checkbox, HelpButton } from '@dnb/eufemia/src'

export const CheckboxUnchecked = () => (
  <ComponentBox data-visual-test="checkbox-default">
    <Checkbox label="Checkbox" on_change={(e) => console.log(e)} />
  </ComponentBox>
)

export const CheckboxChecked = () => (
  <ComponentBox data-visual-test="checkbox-checked">
    <Checkbox
      label="Label"
      label_position="left"
      checked
      on_change={({ checked }) => console.log(checked)}
    />
  </ComponentBox>
)

export const CheckboxWithError = () => (
  <ComponentBox data-visual-test="checkbox-error">
    <Checkbox label="Checkbox" checked status="Error message" />
  </ComponentBox>
)

export const CheckboxSuffix = () => (
  <ComponentBox>
    <Checkbox
      label="Checkbox"
      checked
      suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
    />
  </ComponentBox>
)

export const CheckboxDifferentSizes = () => (
  <ComponentBox data-visual-test="checkbox-sizes">
    <Checkbox size="medium" label="Medium" right="large" checked />
    <Checkbox size="large" label="Large" checked />
  </ComponentBox>
)

export const CheckboxDisabled = () => (
  <ComponentBox data-visual-test="checkbox-disabled">
    <Checkbox checked disabled />
  </ComponentBox>
)

export const CheckboxWithErrorStates = () => (
  <>
    <ComponentBox data-visual-test="checkbox-error-unchecked">
      <Checkbox label="Unchecked" status="error" />
    </ComponentBox>
    <ComponentBox data-visual-test="checkbox-error-checked">
      <Checkbox label="Checked" status="error" checked />
    </ComponentBox>
  </>
)

export const CheckboxBoundingArea = () => (
  <ShowBoundingArea>
    <ComponentBox data-visual-test="checkbox-bounding">
      <Checkbox label="Checkbox" checked />
    </ComponentBox>
  </ShowBoundingArea>
)

const ShowBoundingArea = styled.div`
  .dnb-checkbox__input {
    opacity: 0.5;
  }
`

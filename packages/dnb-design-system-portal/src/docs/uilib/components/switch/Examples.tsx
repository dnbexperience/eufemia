/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Switch, HelpButton } from '@dnb/eufemia/src'

const onChange = (state) => {
  console.log('onChangeHandler', state)
}

export const SwitchExampleDefault = () => (
  <ComponentBox data-visual-test="switch-default" scope={{ onChange }}>
    <Switch label="Switch" on_change={onChange} />
  </ComponentBox>
)

export const SwitchExampleChecked = () => (
  <ComponentBox data-visual-test="switch-checked" scope={{ onChange }}>
    <Switch
      label="Label:"
      label_position="left"
      checked
      on_change={({ checked }) => console.log(checked)}
    />
  </ComponentBox>
)

export const SwitchExampleErrorMessage = () => (
  <ComponentBox data-visual-test="switch-error" scope={{ onChange }}>
    <Switch label="Switch" checked status="Error message" />
  </ComponentBox>
)

export const SwitchExampleSuffix = () => (
  <ComponentBox scope={{ onChange }}>
    <Switch
      label="Switch"
      checked
      suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
    />
  </ComponentBox>
)

export const SwitchExampleSizes = () => (
  <ComponentBox data-visual-test="switch-sizes">
    <Switch size="medium" label="Medium" right="large" checked />
    <Switch size="large" label="Large" right="large" checked />
    <Switch size="large" label="Large" />
  </ComponentBox>
)

export const SwitchExampleDisabled = () => (
  <ComponentBox data-visual-test="switch-disabled">
    <Switch checked disabled label="Disabled" />
  </ComponentBox>
)

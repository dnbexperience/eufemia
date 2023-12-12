/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Switch, HelpButton } from '@dnb/eufemia/src'

export const SwitchExampleDefault = () => (
  <ComponentBox data-visual-test="switch-default">
    <Switch
      label="Switch"
      on_change={({ checked }) => console.log(checked)}
    />
  </ComponentBox>
)

export const SwitchExampleChecked = () => (
  <ComponentBox data-visual-test="switch-checked">
    <Switch
      label="Label:"
      label_position="left"
      checked
      on_change={({ checked }) => console.log(checked)}
    />
  </ComponentBox>
)

export const SwitchExampleErrorMessage = () => (
  <ComponentBox data-visual-test="switch-error">
    <Switch label="Switch" checked status="Error message" />
  </ComponentBox>
)

export const SwitchExampleSuffix = () => (
  <ComponentBox>
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

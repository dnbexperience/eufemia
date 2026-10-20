/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Switch, HelpButton, Section } from '@dnb/eufemia/src'

export const SwitchExampleDefault = () => (
  <ComponentBox data-visual-test="switch-default">
    <Switch label="Switch" onChange={console.log} />
  </ComponentBox>
)

export const SwitchExampleChecked = () => (
  <ComponentBox data-visual-test="switch-checked">
    <Switch
      label="Label"
      labelPosition="left"
      checked
      onChange={({ checked }) => console.log(checked)}
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
    <Switch disabled label="Unchecked" right="large" />
    <Switch checked disabled label="Checked" />
    <Section surface="dark" innerSpace top>
      <Switch disabled label="Unchecked on dark" right="large" />
      <Switch checked disabled label="Checked on dark" />
    </Section>
  </ComponentBox>
)

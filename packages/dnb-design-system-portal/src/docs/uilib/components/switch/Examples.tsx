/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Flex, HelpButton, Section, Switch } from '@dnb/eufemia/src'

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
    <Switch checked disabled label="Disabled" />
  </ComponentBox>
)

export const SwitchExampleStates = () => (
  <ComponentBox data-visual-test="switch-states">
    <Flex.Vertical gap="small">
      <Flex.Horizontal gap="medium" align="center">
        <Switch label="Off" />
        <Switch label="On" checked />
        <Switch label="Error" status="Error" />
        <Switch label="Disabled" checked disabled />
      </Flex.Horizontal>

      <Section surface="dark" innerSpace>
        <Flex.Horizontal gap="medium" align="center">
          <Switch label="Off on dark" />
          <Switch label="On on dark" checked />
          <Switch label="Large on dark" checked size="large" />
        </Flex.Horizontal>
      </Section>
    </Flex.Vertical>
  </ComponentBox>
)

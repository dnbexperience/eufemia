/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import {
  HelpButton,
  Input,
  Dl,
  Dt,
  Dd,
  Dialog,
  Flex,
  Card,
} from '@dnb/eufemia/src'

export const HelpButtonDefaultExample = () => (
  <ComponentBox data-visual-test="help-button-default">
    <HelpButton>Text</HelpButton>
  </ComponentBox>
)

export const HelpButtonSuffixExample = () => (
  <ComponentBox data-visual-test="help-button-suffix">
    <Input
      size={10}
      placeholder="Input ..."
      suffix={<HelpButton title="Custom title">Text</HelpButton>}
    />
  </ComponentBox>
)

export const HelpButtonSizesExample = () => (
  <ComponentBox data-visual-test="help-button-sizes">
    <HelpButton title="Custom title">Text</HelpButton>
    <HelpButton
      size="small"
      left
      on_click={() => {
        console.log('on_click')
      }}
    >
      Text
    </HelpButton>
  </ComponentBox>
)

export const HelpButtonInfoIconExample = () => (
  <ComponentBox>
    <HelpButton icon="information" tooltip="More info">
      <Dl>
        <Dt>Term</Dt>
        <Dd>Description</Dd>
        <Dd>Description</Dd>
        <Dt>Term</Dt>
        <Dd>Description</Dd>
      </Dl>
    </HelpButton>
  </ComponentBox>
)

export const HelpButtonInsideTextExample = () => (
  <ComponentBox data-visual-test="help-button-inline">
    <span>
      Text <HelpButton>Text</HelpButton> Text
    </span>
  </ComponentBox>
)

export const HelpButtonRenderExample = () => (
  <ComponentBox scope={{ Dialog }}>
    <HelpButton
      title="Title"
      render={(children, props) => (
        <Dialog triggerAttributes={props} className="your-class">
          {children}
        </Dialog>
      )}
    >
      Help text
    </HelpButton>
  </ComponentBox>
)

export const HelpButtonInline = () => (
  <ComponentBox data-visual-test="help-button-inline-content">
    <HelpButton displayMethod="inline">Peekaboo!</HelpButton>
  </ComponentBox>
)

export const HelpButtonInlineCustom = () => (
  <ComponentBox>
    <Card>
      <Flex.Container>
        <Flex.Item size={12}>
          <HelpButton
            displayMethod="inline"
            contentId="help-content-control-id"
          />
        </Flex.Item>
        <Flex.Item>
          <Field.Email />
          <HelpButton.Content contentId="help-content-control-id">
            This field only accepts valid emails
          </HelpButton.Content>
        </Flex.Item>
        <Flex.Item>
          <Field.Number label="Antall" />
          <HelpButton.Content contentId="help-content-control-id">
            In this field you need to type numbers
          </HelpButton.Content>
        </Flex.Item>
      </Flex.Container>
    </Card>
  </ComponentBox>
)

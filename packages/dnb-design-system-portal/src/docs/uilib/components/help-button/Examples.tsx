/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

import { HelpButton, Input } from '@dnb/eufemia/src'
import { Dl, Dt, Dd } from '@dnb/eufemia/src'

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

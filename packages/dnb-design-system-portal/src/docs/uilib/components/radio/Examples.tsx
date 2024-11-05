/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Radio, HelpButton } from '@dnb/eufemia/src'
import { FieldBlock } from '@dnb/eufemia/src/extensions/forms'

export const RadioExampleDefault = () => (
  <ComponentBox data-visual-test="radio-group">
    <Radio.Group
      label="Radio Group"
      on_change={({ value }) => {
        console.log('on_change', value)
      }}
      value="first"
    >
      <Radio label="First" value="first" />
      <Radio label="Second" value="second" />
      <Radio label="Third" value="third" />
    </Radio.Group>
  </ComponentBox>
)

export const RadioExampleVerticalGroup = () => (
  <ComponentBox data-visual-test="radio-group-vertical">
    <Radio.Group
      label="Vertical Group"
      layout_direction="column"
      on_change={({ value }) => {
        console.log('on_change', value)
      }}
    >
      <Radio label="First" value="first" />
      <Radio label="Second" value="second" />
      <Radio label="Third" value="third" checked />
    </Radio.Group>
  </ComponentBox>
)

export const RadioExampleLabelAbove = () => (
  <ComponentBox data-visual-test="radio-group-label-above">
    <Radio.Group
      vertical
      label="Vertical Group"
      layout_direction="column"
      on_change={({ value }) => {
        console.log('on_change', value)
      }}
    >
      <Radio label="First" value="first" />
      <Radio label="Second" value="second" />
      <Radio label="Third" value="third" checked />
    </Radio.Group>
  </ComponentBox>
)

export const RadioExampleGroupStatus = () => (
  <ComponentBox data-visual-test="radio-group-status">
    <Radio.Group
      label="Radio Group with status"
      layout_direction="column"
      on_change={({ value }) => {
        console.log('on_change', value)
      }}
    >
      <Radio label="First" value="first" status="error" />
      <Radio label="Second" value="second" status="Error message" />
      <Radio
        label="Third"
        value="third"
        checked
        status="Info message"
        status_state="info"
      />
    </Radio.Group>
  </ComponentBox>
)

export const RadioExampleWithoutGroup = () => (
  <ComponentBox data-visual-test="radio-group-plain">
    <FieldBlock
      label="Plain Radio group"
      layout="horizontal"
      labelHeight="small"
    >
      <Radio
        value="first"
        label="First"
        group="MyRadioGroup"
        on_change={({ value, checked }) => {
          console.log('on_change', value, checked)
        }}
        right
      />
      <Radio
        value="second"
        label="Second"
        group="MyRadioGroup"
        on_change={({ value, checked }) => {
          console.log('on_change', value, checked)
        }}
        right
      />
      <Radio
        checked
        value="third"
        label="Third"
        group="MyRadioGroup"
        on_change={({ value, checked }) => {
          console.log('on_change', value, checked)
        }}
        right
      />
    </FieldBlock>
  </ComponentBox>
)

export const RadioExampleSizes = () => (
  <ComponentBox data-visual-test="radio-sizes">
    <Radio size="medium" label="Medium" right="large" checked />
    <Radio size="large" label="Large" checked />
  </ComponentBox>
)

export const RadioExampleDisabled = () => (
  <ComponentBox data-visual-test="radio-group-disabled">
    <Radio.Group
      label="Disabled Group"
      disabled
      label_position="left"
      name="MyGroup"
    >
      <Radio label="First" value="first" />
      <Radio label="Second" value="second" />
      <Radio label="Third" value="third" checked />
    </Radio.Group>
  </ComponentBox>
)

export const RadioExampleSuffix = () => (
  <ComponentBox>
    <Radio.Group label="With suffixes" label_position="left">
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
  </ComponentBox>
)

export function RadioVisibleWhenVisualTests() {
  return (
    <>
      <ComponentBox data-visual-test="radio-default">
        <Radio label="Single Radio" />
      </ComponentBox>
      <ComponentBox data-visual-test="radio-checked">
        <Radio
          label="Checked Radio"
          checked
          on_change={({ checked }) => console.log(checked)}
        />
      </ComponentBox>
    </>
  )
}

export const RadioExampleError = () => (
  <>
    <ComponentBox data-visual-test="radio-error-unchecked">
      <Radio label="Unchecked" status="error" />
    </ComponentBox>
    <ComponentBox data-visual-test="radio-error-checked">
      <Radio label="Checked" status="error" checked />
    </ComponentBox>
  </>
)

export const RadioBoundingArea = () => (
  <ShowBoundingArea>
    <ComponentBox data-visual-test="radio-bounding">
      <Radio label="Radio button" checked />
    </ComponentBox>
  </ShowBoundingArea>
)

const ShowBoundingArea = styled.div`
  .dnb-radio__input {
    opacity: 0.5;
  }
`

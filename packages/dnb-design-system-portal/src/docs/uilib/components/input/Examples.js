/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="Placeholder text"
          data-dnb-test="input-placeholder"
        >
          {/* @jsx */ `
<Input
  label="Label:"
  placeholder="Placeholder text"
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Search text placeholder"
          data-dnb-test="input-search"
        >
          {/* @jsx */ `
<Input
  label="Search:"
  type="search"
  submit_button_title="Search"
  placeholder="Search text placeholder"
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
  on_submit={({ value }) => {
    console.log('Submit:', value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Medium input with right aligned text and stretched search input">
          {/* @jsx */ `
<Input
  label="Medium input:"
  size="medium"
  align="right"
  stretch="true"
  placeholder="Medium input placeholder"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Large and stretched search input"
          data-dnb-test="input-large"
        >
          {/* @jsx */ `
<Input
  size="large"
  type="search"
  stretch="true"
  value="Large search value"
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Disabled input"
          data-dnb-test="input-disabled"
        >
          {/* @jsx */ `
<Input
  disabled
  label="Disabled input:"
  id="text-input-disabled"
  placeholder="Disabled Input with a placeholder"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Show failure status">
          {/* @jsx */ `
<Input
  label="Show status:"
  status="error"
  value="Shows status with border only"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="With FormStatus">
          {/* @jsx */ `
<Input
  label="With FormStatus:"
  status="You have to fill in this field"
  value="Input value with error"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Input with suffix (additional description)">
          {/* @jsx */ `
<Input
  label="Short Label:"
  autocomplete="on"
  placeholder="Placeholder text"
  suffix={<Modal title="Info">Some content</Modal>}
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Stretched `Input` in horizontal wrapping `FormRow` and a long label">
          {/* @jsx */ `
<FormRow
  label="Long label labwl Adipiscing mauris dis proin nec:"
  indent="true"
  indent_offset="large"
  wrap
>
  <Input value="I stretch ..." stretch />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox caption="Numbers are ligned by using Proportional Lining">
          {/* @jsx */ `
<Input
  label="My Status:"
  autocomplete="on"
  placeholder="Placeholder text"
  status="Numbers are ligned by using Proportional Lining"
  status_state="info"
  status_animation="fade-in"
  value="This is the value 1234567890"
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Submit Form with Input. Pressing the enter key will trigger a submit.">
          {/* @jsx */ `
<FormSet
  prevent_submit={true}
  on_submit={(event) => {
    console.log('FormRow.on_submit', event)
  }}
>
  <FormRow>
    <Input
      type="search"
      label="Label:"
      value="Input ..."
      selectall="true"
      on_submit={event => {
        console.log('Input.on_submit', event)
      }}
      on_change={({ value }) => {
        console.log('on_change:', value)
      }}
      onChange={({ value }) => {
        console.log('onChange:', value)
      }}
      right="small"
      bottom="x-small"
    />
    <Button text="Submit" type="submit" />
  </FormRow>
</FormSet>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-input input {
    min-width: 10rem;
  }
  .dnb-form-label + .dnb-input {
    margin-top: 0;
  }
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

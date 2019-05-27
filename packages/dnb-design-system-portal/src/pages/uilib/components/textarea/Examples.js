/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="Placeholder text"
          data-dnb-test="textarea-placeholder"
        >
          {/* @jsx */ `
<FormLabel for_id="text-textarea-1" text="Label:" />
<Textarea
  id="text-textarea-1"
  placeholder="Placeholder text"
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Search text placeholder"
          data-dnb-test="textarea-search"
        >
          {/* @jsx */ `
<Textarea
  label="Search:"
  type="search"
  submit_button_title="Search"
  placeholder="Search text placeholder"
  on_change={({ value }) => {
    console.log(value)
  }}
  on_submit={({ value }) => {
    console.log('Submit:', value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Medium textarea placeholder">
          {/* @jsx */ `
<Textarea
  label="Medium textarea:"
  size="medium"
  placeholder="Medium textarea placeholder"
  on_change={({ value }) => {
    console.log(value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Large textarea with right aligned text">
          {/* @jsx */ `
<Textarea
  label="Large textarea:"
  size="large"
  align="right"
  placeholder="Large textarea with right aligned text"
  on_change={({ value }) => {
    console.log(value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Disabled textarea"
          data-dnb-test="textarea-disabled"
        >
          {/* @jsx */ `
<Textarea
  disabled
  label="Disabled textarea:"
  id="text-textarea-disabled"
  placeholder="Disabled Textarea with a placeholder"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Show FormStatus (Error)">
          {/* @jsx */ `
<Textarea
  label="Show status:"
  status="error"
  value="Shows status with border only"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="With FormStatus">
          {/* @jsx */ `
<Textarea
  label="With FormStatus:"
  status="You have to fill in this field"
  value="Textarea value with error"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Textarea wigth additional description">
          {/* @jsx */ `
<Textarea
  label="Short Label:"
  autocomplete="on"
  placeholder="Placeholder text"
  description="Additional description"
  on_change={({ value }) => {
    console.log(value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Numbers are ligned by using Proportional Lining">
          {/* @jsx */ `
<Textarea
  label="My Status:"
  autocomplete="on"
  placeholder="Placeholder text"
  status="Numbers are ligned by using Proportional Lining"
  status_state="info"
  status_animation="fade-in"
  value="This is the value 1234567890"
  on_change={({ value }) => {
    console.log(value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Submit Form with Textarea. Pressing the enter key will trigger a submit.">
          {/* @jsx */ `
<form
  onSubmit={event => {
    console.log('onSubmit')
    event.preventDefault()
  }}
>
  <Textarea
    label="Label:"
    value="Textarea ..."
    on_submit={event => {
      console.log('on_submit')
    }}
    on_change={({ value }) => {
      console.log('on_change:', value)
    }}
    onChange={({ value }) => {
      console.log('onChange:', value)
    }}
  />
  <Button text="Submit" type="submit" />
</form>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-textarea textarea {
    min-width: 10rem;
  }
  .dnb-form-label + .dnb-textarea {
    margin-top: 0;
  }
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

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
          data-dnb-test="textarea-default"
        >
          {/* @jsx */ `
<Textarea
  label="Default:"
  rows="2"
  cols="20"
  value="Textarea value\\nNewline"
  on_change={({ value }) => { console.log('on_change', value) }}
  on_focus={() => { console.log('on_focus') }}
  on_blur={() => { console.log('on_blur') }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Placeholder text">
          {/* @jsx */ `
<FormLabel for_id="text-textarea-1" text="Placeholder:" />
<Textarea
  id="text-textarea-1"
  placeholder="Placeholder text"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Vertical placed label">
          {/* @jsx */ `
<Textarea
  label="Vertical:"
  label_direction="vertical"
  rows="3"
  cols="33"
  value="Textarea value with more than 3 lines\\nNewline\\nNewline\\nNewline\\nNewline"
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Stretched horizontal placed label"
          data-dnb-test="textarea-stretch"
        >
          {/* @jsx */ `
<Textarea
  label="Horizontal:"
  stretch="true"
  rows="3"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Max length usage">
          {/* @jsx */ `
<Textarea
  label="Length limit:"
  rows="3"
  cols="33"
  maxLength="20"
  required
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="With FormStatus failure message"
          data-dnb-test="textarea-error"
        >
          {/* @jsx */ `
<Textarea
  label="Error Message:"
  cols="33"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  status="Message to the user"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Show failure status">
          {/* @jsx */ `
<Textarea
  label="Show status:"
  status="error"
  value="Shows status with border only"
/>
`}
        </ComponentBox>
        <ComponentBox caption="Disabled textarea">
          {/* @jsx */ `
<Textarea
  label="Disabled:"
  disabled
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  width: 100%;

  ${'' /* .dnb-textarea textarea {
    min-width: 10rem;
  }
  .dnb-form-label + .dnb-textarea {
    margin-top: 0;
  } */}
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

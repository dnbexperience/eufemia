/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ComponentBox
          title="Placeholder text"
          data-visual-test="textarea-default"
        >
          {
            /* @jsx */ `
<Textarea
  label="Default:"
  rows="2"
  cols="20"
  value="Textarea value\\nNewline"
  on_change={({ value }) => { console.log('on_change', value) }}
  on_focus={() => { console.log('on_focus') }}
  on_blur={() => { console.log('on_blur') }}
/>
          `
          }
        </ComponentBox>
        <ComponentBox title="Placeholder text">
          {
            /* @jsx */ `
<Textarea
  label="Placeholder:"
  placeholder="Placeholder text"
/>
          `
          }
        </ComponentBox>
        <ComponentBox title="Vertical placed label">
          {
            /* @jsx */ `
<Textarea
  label="Vertical:"
  label_direction="vertical"
  rows="3"
  cols="33"
  value="Textarea value with more than 3 lines\\nNewline\\nNewline\\nNewline\\nNewline"
/>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Stretched horizontal placed label"
          data-visual-test="textarea-stretch"
        >
          {
            /* @jsx */ `
<Textarea
  label="Horizontal:"
  stretch="true"
  rows="3"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
          `
          }
        </ComponentBox>
        <ComponentBox title="Max length usage">
          {
            /* @jsx */ `
<Textarea
  label="Length limit:"
  rows="3"
  cols="33"
  maxLength="20"
  required
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="With FormStatus failure message"
          data-visual-test="textarea-error"
        >
          {
            /* @jsx */ `
<Textarea
  label="Error Message:"
  cols="33"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  status="Message to the user"
/>
          `
          }
        </ComponentBox>
        <ComponentBox title="Show failure status">
          {
            /* @jsx */ `
<Textarea
  label="Show status:"
  status="error"
  value="Shows status with border only"
/>
`
          }
        </ComponentBox>
        <ComponentBox title="Disabled textarea">
          {
            /* @jsx */ `
<Textarea
  label="Disabled:"
  disabled
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
          `
          }
        </ComponentBox>
        <ComponentBox title="Textarea with suffix">
          {
            /* @jsx */ `
<Textarea
  label="Textarea with suffix:"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
          `
          }
        </ComponentBox>
      </React.Fragment>
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
export default function StyledExample() {
  return (
    <Wrapper>
      <Example />
    </Wrapper>
  )
}

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
<div className="dnb-form-group">
  <Textarea
    label="Default:"
    rows="2"
    cols="20"
    value="Textarea value\\nNewline"
  />
</div>
          `}
        </ComponentBox>
        <ComponentBox caption="Placeholder text">
          {/* @jsx */ `
<div className="dnb-form-group">
  <FormLabel for_id="text-textarea-1" text="Placeholder:" />
  <Textarea
    id="text-textarea-1"
    placeholder="Placeholder text"
  />
</div>
          `}
        </ComponentBox>
        <ComponentBox caption="Vertical placed label, using `.dnb-form-group`">
          {/* @jsx */ `
<div className="dnb-form-group dnb-form-group__position--vertical">
  <Textarea
    label="Vertical:"
    rows="3"
    cols="33"
    value="Textarea value with more than 3 lines\\nNewline\\nNewline\\nNewline\\nNewline"
  />
</div>
          `}
        </ComponentBox>
        <ComponentBox caption="Horizontal placed label, using `.dnb-form-group`">
          {/* @jsx */ `
<div className="dnb-form-group">
  <Textarea
    label="Horizontal:"
    rows="3"
    value="Nec litora inceptos vestibulum id interdum donec gravida."
  />
</div>
          `}
        </ComponentBox>
        <ComponentBox caption="Max length usage">
          {/* @jsx */ `
<div className="dnb-form-group">
  <Textarea
    label="Length limit:"
    rows="3"
    cols="33"
    maxLength="20"
    required
    value="Nec litora inceptos vestibulum id interdum donec gravida."
  />
</div>
          `}
        </ComponentBox>
        <ComponentBox
          caption="With FormStatus failure message"
          data-dnb-test="textarea-error"
        >
          {/* @jsx */ `
<div className="dnb-form-group dnb-form-group__position--vertical">
  <Textarea
    label="Error Message:"
    cols="33"
    value="Nec litora inceptos vestibulum id interdum donec gravida."
    status="Message to the user"
  />
</div>
          `}
        </ComponentBox>
        <ComponentBox caption="Show failure status">
          {/* @jsx */ `
<div className="dnb-form-group">
  <Textarea
    label="Show status:"
    status="error"
    value="Shows status with border only"
  />
</div>
`}
        </ComponentBox>
        <ComponentBox caption="Disabled textarea">
          {/* @jsx */ `
<div className="dnb-form-group">
  <Textarea
    label="Disabled:"
    disabled
    value="Nec litora inceptos vestibulum id interdum donec gravida."
  />
</div>
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

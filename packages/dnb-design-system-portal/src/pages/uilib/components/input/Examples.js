/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'

class Example extends PureComponent {
  handleInputChange = ({ value }) => {
    console.log(value)
  }
  handleInputSubmit = ({ value }) => {
    console.log('Submit:', value)
  }
  state = { showTestData: false }
  componentDidMount() {
    const showTestData = typeof window !== 'undefined' && window.IS_TEST
    this.setState({ showTestData })
  }
  showTestData(state) {
    return this.state.showTestData
      ? `wrapper_attributes={{'data-dnb-test': "input-${state}"}}`
      : ''
  }
  render() {
    const handleInputChange = this.handleInputChange
    const handleInputSubmit = this.handleInputSubmit
    return (
      <Fragment>
        <ComponentBox caption="Placeholder text">
          {/* @jsx */ `
<FormLabel for_id="text-input-1" text="Label:" />
<Input ${this.showTestData('placeholder')}
  id="text-input-1"
  placeholder="Placeholder text"
/>
          `}
        </ComponentBox>
        <ComponentBox
          scope={{ handleInputChange, handleInputSubmit }}
          caption="Search text placeholder"
        >
          {/* @jsx */ `
<Input ${this.showTestData('search')}
  label="Search:"
  type="search"
  submit_button_title="Search"
  placeholder="Search text placeholder"
  on_change={handleInputChange}
  on_submit={handleInputSubmit}
/>
          `}
        </ComponentBox>
        <ComponentBox
          scope={{ handleInputChange }}
          caption="Medium input placeholder"
        >
          {/* @jsx */ `
<Input
  label="Medium input:"
  size="medium"
  placeholder="Medium input placeholder"
  on_change={handleInputChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          scope={{ handleInputChange }}
          caption="Large input with right aligned text"
        >
          {/* @jsx */ `
<Input
  label="Large input:"
  size="large"
  align="right"
  placeholder="Large input with right aligned text"
  on_change={handleInputChange}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Disabled input">
          {/* @jsx */ `
<Input ${this.showTestData('disabled')}
  disabled
  label="Disabled input:"
  id="text-input-disabled"
  placeholder="Disabled Input with a placeholder"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Show FormStatus (Error)">
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
        <ComponentBox
          scope={{ handleInputChange }}
          caption="Input wigth additional description"
        >
          {/* @jsx */ `
<Input
  label="Short Label:"
  autocomplete="on"
  placeholder="Placeholder text"
  description="Additional description"
  on_change={handleInputChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          scope={{ handleInputChange }}
          caption="Numbers are ligned by using Proportional Lining"
        >
          {/* @jsx */ `
<Input
  label="My Status:"
  autocomplete="on"
  placeholder="Placeholder text"
  status="Numbers are ligned by using Proportional Lining"
  status_state="info"
  status_animation="fade-in"
  on_change={handleInputChange}
>
  This is the value 1234567890
</Input>
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

  ${'' /* .dnb-form-group,
  .dnb-input {
    margin-top: 1rem;
  }
  .dnb-form-label + .dnb-input {
    margin-top: 0;
  } */}
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

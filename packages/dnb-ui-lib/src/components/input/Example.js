/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Input from './Input'
import FormLabel from '../form-label'
import styled from '@emotion/styled'

// The range slider gets imported by the input directly
// import '../slider/style'

class Example extends PureComponent {
  state = {
    status: null
  }
  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }
  componentDidMount() {
    this.setState({
      icon: 'chevron-right'
    })
    // use this only in case of using web-components - so the tag should then be <dnb-input ref={}> insted if <Input>
    if (this._ref.current.addEvent) {
      Input.enableWebComponent()
      const cb = e => {
        console.log('on_change', e)
      }
      const eventId = this._ref.current.addEvent('on_change', cb)

      setTimeout(() => {
        this._ref.current.fireEvent('on_change', {
          value:
            'Hello from an auto fired event with a new value. But the event listener gets removed in 2 seconds.'
        })
        setTimeout(() => {
          this._ref.current.removeEvent(eventId)
        }, 2e3)
      }, 2e3)
    }

    setTimeout(() => {
      this.setState({
        status: 'You have to fill in this field'
      })
    }, 400)
  }
  handleInputChange = ({ value }) => {
    console.log(value)
  }
  render() {
    return (
      <Fragment>
        <div className="dnb-form-row">
          <FormLabel for_id="text-input-1" text="Label:" />
          <Input id="text-input-1" placeholder="Placeholder text" />
        </div>

        <Input
          label="Search:"
          type="search"
          search_button_title="Search"
          placeholder="Search text placeholder"
          on_change={this.handleInputChange}
        />

        <Input
          type="text"
          label="Medium input:"
          size="medium"
          placeholder="Medium input placeholder"
          on_change={this.handleInputChange}
        />

        <Input
          type="text"
          label="Large input:"
          size="large"
          align="right"
          placeholder="Large input with right align"
          on_change={this.handleInputChange}
        />

        <Input
          label="Disabled input:"
          disabled
          id="text-input-disabled"
          placeholder="Disabled Input with a placeholder"
        />

        <Input
          label="My Label:"
          type="text"
          autocomplete="on"
          placeholder="Placeholder text"
          description="Kr"
          extra_information="Info: numbers are ligned by using typo-number--lining"
          ref={this._ref}
          on_change={this.handleInputChange}
        >
          This is the value 1234567890
        </Input>

        <Input
          label="With FormStatus:"
          status={this.state.status}
          value="Input value with error"
        />
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-input {
    margin-top: 1rem;
  }
  .dnb-form-label + .dnb-input {
    margin-top: 0;
  }

  ${'' /* .dnb-form-row,
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

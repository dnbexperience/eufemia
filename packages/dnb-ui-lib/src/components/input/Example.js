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
  }
  handleInputChange = ({ value }) => {
    console.log(value)
  }
  render() {
    return (
      <Fragment>
        <div className="dnb-form-row">
          <FormLabel for_id="text-input-2" text="Label" />
          <Input id="text-input-2" placeholder="Placeholder text" />
        </div>

        <div className="dnb-form-row">
          <FormLabel for_id="search-input" text="Search" />
          <Input
            type="search"
            id="search-input"
            search_button_title="Search"
            placeholder="Search text placeholder"
            on_change={this.handleInputChange}
          />
        </div>

        <div className="dnb-form-row">
          <FormLabel for_id="text-input-medium" text="Medium input" />
          <Input
            type="text"
            id="text-input-medium"
            size="medium"
            placeholder="Medium input placeholder"
            on_change={this.handleInputChange}
          />
        </div>

        <div className="dnb-form-row">
          <FormLabel for_id="text-input-large" text="Large input" />
          <Input
            type="text"
            id="text-input-large"
            size="large"
            align="right"
            placeholder="Large input with right align"
            on_change={this.handleInputChange}
          />
        </div>

        <div className="dnb-form-row">
          <FormLabel for_id="text-input-disabled" text="Disabled input" />
          <Input
            disabled
            id="text-input-disabled"
            value="Disabled Input with a text value"
          />
        </div>

        <div className="dnb-form-row">
          <FormLabel for_id="text-input-1" text="With extra information" />
          <Input
            type="text"
            id="text-input-1"
            autocomplete="on"
            placeholder="Placeholder text"
            description="Kr"
            extra_information="Info: numbers are ligned by using typo-number--lining"
            ref={this._ref}
            on_change={this.handleInputChange}
          >
            This is the value 1234567890
          </Input>
        </div>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-form-row,
  .dnb-input {
    margin-top: 1rem;
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

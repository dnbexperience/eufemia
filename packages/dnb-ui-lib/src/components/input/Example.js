/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Input from './Input'
import FormLabel from '../form-label'
import styled from 'react-emotion'

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
        <Input id="text-input-2" placeholder="Placeholder text" />

        <div className="dnb-form-row">
          <FormLabel
            id="search-input-label"
            for_id="search-input"
            text="Search"
          />
          <Input
            type="search"
            id="search-input"
            search_button_title="Search"
            on_change={this.handleInputChange}
          />
        </div>

        <Input
          type="text"
          id="text-input-medium"
          autocomplete="off"
          size="medium"
          placeholder="Medium input"
          on_change={this.handleInputChange}
        />

        <Input
          type="text"
          id="text-input-large"
          autocomplete="off"
          size="large"
          align="right"
          placeholder="Large input with right align"
          on_change={this.handleInputChange}
        />

        <Input
          disabled
          id="text-input-disabled"
          value="Disabled Input with a value"
        />

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

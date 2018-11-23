/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import Input from './Input'
import styled from 'react-emotion'

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

        <Input
          type="search"
          id="search-input"
          search_button_title="Search"
          placeholder="Search"
          on_change={this.handleInputChange}
        />

        <Input
          type="text"
          id="text-input-large"
          autocomplete="off"
          size="large"
          align="right"
          font_class="typo-light"
          placeholder="Large input with .typo-light class"
          on_change={this.handleInputChange}
        />

        <Input
          disabled
          id="text-input-disabled"
          value="Disabled Input with a value"
          on_change={this.handleInputChange}
        />

        <Input
          type="text"
          id="text-input-1"
          autocomplete="on"
          placeholder="Placeholder text"
          description="Kr"
          extra_information="Maksimumsbeløpet inkluderer eventuell fellesgjeld og omkostninger ved kjøp."
          ref={this._ref}
          on_change={this.handleInputChange}
        >
          This is the value
        </Input>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-input {
    margin: 1rem 0;
  }
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

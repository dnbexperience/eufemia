/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import InputMasked from './InputMasked'
import styled from '@emotion/styled'

import createNumberMask from 'text-mask-addons/dist/createNumberMask' // https://github.com/text-mask/text-mask
const numberMask = createNumberMask({
  allowDecimal: false,
  prefix: '',
  suffix: ' kr.'
})

class Example extends PureComponent {
  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }
  componentDidMount() {
    this.setState({
      icon: 'chevron-right'
    })
    // use this only in case of using web-components - so the tag should then be <dnb-input-masked ref={}> insted if <InputMasked>
    if (this._ref.current.addEvent) {
      InputMasked.enableWebComponent()
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
  handleInputMaskedChange = ({ value }) => {
    console.log(value)
  }
  render() {
    return (
      <Fragment>
        <div className="example-box">
          <InputMasked
            label="With Mask"
            mask={[
              '(',
              /[1-9]/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/
            ]}
            show_mask="true"
            attributes={{
              'data-fake:show_mask': 'true'
            }}
            ref={this._ref}
          />
        </div>
        <div className="example-box">
          <InputMasked
            label="Amount"
            autocomplete="off"
            size="large"
            mask={numberMask}
            align="right"
            placeholder="Enter a number"
            on_change={this.handleInputMaskedChange}
          />
        </div>
        <div className="example-box">
          <InputMasked
            label="Amount"
            autocomplete="off"
            value="1000000"
            mask={numberMask}
            show_mask="true"
            align="right"
            on_change={this.handleInputMaskedChange}
          />
        </div>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-form-group,
  .dnb-masked-input {
    margin: 1rem 0;
  }
  .dnb-form-label + .dnb-masked-input {
    margin-top: 0;
  }
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

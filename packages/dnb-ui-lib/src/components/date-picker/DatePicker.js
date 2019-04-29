/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
// import keycode from 'keycode'
// import {
//   registerElement,
//   validateDOMAttributes,
//   processChildren,
//   dispatchCustomElementEvent
// } from '../../shared/component-helper'
// import Icon from '../icon-primary/IconPrimary'
import Input from '../input/Input'

const renderProps = {
  on_change: null
}

export const propTypes = {
  mask: PropTypes.string
  // show_mask: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export const defaultProps = {
  // mask: ['DD', 'MM', 'YYYY'],
  mask: 'dd/mm/yyyy',
  // show_mask: false,
  ...renderProps
}

export default class DatePicker extends PureComponent {
  // static tagName = 'dnb-input-masked'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  // static enableWebComponent() {
  //   registerElement(InputMasked.tagName, InputMasked, defaultProps)
  // }

  constructor(props) {
    super(props)

    const separators = props.mask.match(/[^mdy]/g)
    this.maskList = props.mask.split(/[^mdy]/).reduce((acc, cur) => {
      acc.push(cur)
      if (separators.length > 0) {
        acc.push(separators.shift())
      }
      return acc
    }, [])
    // console.log('this.maskList', this.maskList)
  }
  render() {
    // const {
    //   mask,
    //   // show_mask,
    //   // guide,
    //   // pipe,
    //   // keep_char_positions,
    //   // placeholder_char,
    //   ...props
    // } = this.props

    // const params = {
    //   mask,
    //   showMask: Boolean(show_mask),
    //   guide,
    //   pipe,
    //   keepCharPositions: keep_char_positions,
    //   placeholderChar: placeholder_char
    // }

    const list = this.maskList.map((m, i) => {
      if (/[a-z]/.test(m)) {
        switch (m.slice(0, 1)) {
          case 'd':
            return <DayInput key={'d' + i} value={m} />
          case 'm':
            return <MonthInput key={'m' + i} value={m} />
          case 'y':
            return <YearInput key={'y' + i} value={m} />
        }
      }
      return m
    })

    return (
      <span className="dnb-date-picker">
        <Input
          label="Date:"
          inputElement={() => {
            return <span className="dnb-date-picker--shell">{list}</span>
          }}
          on_submit={e => {
            console.log('on_submit', e)
          }}
          submit_button_icon="calendar"
          on_change={val => {
            console.log('val', val)
          }}
        />
      </span>
    )
  }
}

const DayInput = () => (
  <input
    className="width-two"
    defaultValue="dd"
    maxLength="2"
    aria-label="Day"
  />
)
const MonthInput = () => (
  <input
    className="width-two"
    defaultValue="mm"
    maxLength="2"
    aria-label="Month"
  />
)
const YearInput = () => (
  <input
    className="width-four"
    defaultValue="yyyy"
    maxLength="4"
    aria-label="Year"
  />
)

// const pascalCase = s => {
//   return s.replace(/\w+/g, function(w) {
//     return w[0].toUpperCase() + w.slice(1).toLowerCase()
//   })
// }

// const pascalCase = s =>
//   s.replace(/(\w)(\w*)/g, function(g0, g1, g2) {
//     return g1.toUpperCase() + g2.toLowerCase()
//   })

/**
 * Web DescriptionList Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
// import './style/dnb-description-list.scss' // no good solution to import the style here

const renderProps = {}

const propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.exact({
        title: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  ]).isRequired,
  info: PropTypes.string,
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  // Web Component props
}

const defaultProps = {
  data: [],
  info: null,
  class: null,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class DescriptionList extends React.PureComponent {
  static tagName = 'dnb-description-list'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(DescriptionList.tagName, DescriptionList, defaultProps)
  }

  static getData(props) {
    let res = []
    if (props.data) res = props.data
    else res = processChildren(props)
    if (typeof res === 'string')
      return res[0] === '[' ? JSON.parse(res) : []
    return res || []
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.data) {
        if (state._data !== props.data) {
          state._data = props.data
          state.data = DescriptionList.getData(props)
        }
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    this.state = {
      _listenForPropChanges: true,
      // active_item: props.active_item,
      _data: props.data || props.children,
      data: DescriptionList.getData(props)
    }
  }

  render() {
    const { info, className, class: _className } = this.props

    const data = DescriptionList.getData(this.props)

    const params = {
      className: classnames('dnb-description-list', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params}>
        {data.length > 0 && (
          <dl className="dnb-description-list__dl typo-light">
            {data.map(({ title, value }, i) => (
              <React.Fragment key={`dl${i}`}>
                <dt className="dnb-description-list__dt">{title}</dt>
                <dd className="dnb-description-list__dd">{value}</dd>
              </React.Fragment>
            ))}
          </dl>
        )}

        {info && (
          <p className="dnb-description-list__info dnb-typo-regular">
            {info}
          </p>
        )}
      </div>
    )
  }
}

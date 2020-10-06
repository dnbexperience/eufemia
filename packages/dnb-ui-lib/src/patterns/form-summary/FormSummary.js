/**
 * Web FormSummary Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes
} from '../../shared/component-helper'
// import './style/dnb-form-summary.scss' // no good solution to import the style here
import DescriptionList from '../description-list/DescriptionList'

const renderProps = {}

const propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  descriptionListData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  descriptionListInfo: PropTypes.string,
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  // Web Component props
}

const defaultProps = {
  title: null,
  text: null,
  descriptionListData: null,
  descriptionListInfo: null,
  class: null,
  /** React props */
  className: null,
  children: null,
  // Web Component props
  ...renderProps
}

export default class FormSummary extends React.PureComponent {
  static tagName = 'dnb-form-summary'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(FormSummary.tagName, FormSummary, defaultProps)
  }

  render() {
    const {
      title,
      text,
      descriptionListData,
      descriptionListInfo,
      className,
      class: _className
    } = this.props

    const params = {
      className: classnames('dnb-form-summary', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params}>
        <div className="dnb-belt">
          <div className="dnb-width-limit">
            <div className="dnb-grid dnb-grid--gutters">
              <div className="dnb-grid__cell u-1of3">
                <div className="dnb-form-summary__header">
                  <h2 className="dnb-form-summary__title typo-light">
                    {title}
                  </h2>
                  <p className="dnb-form-summary__info dnb-typo-regular">
                    {text}
                  </p>
                </div>
              </div>
              <div className="dnb-grid__cell">
                <div className="dnb-form-summary__list">
                  <DescriptionList
                    data={descriptionListData}
                    info={descriptionListInfo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

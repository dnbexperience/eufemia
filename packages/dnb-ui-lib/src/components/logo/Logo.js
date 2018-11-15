/**
 * Web Logo Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { registerElement } from '../../shared/component-helper'
// import './style/dnb-logo.scss' // no good solution to import the style here

const renderProps = {}

export const propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  class: PropTypes.string,
  /** React props */
  className: PropTypes.string
  // Web Component props
}

export const defaultProps = {
  size: null,
  width: null,
  height: null,
  color: null,
  class: null,
  /** React props */
  className: null,
  // Web Component props
  ...renderProps
}

export default class Logo extends PureComponent {
  static tagName = 'dnb-logo'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(Logo.tagName, Logo, defaultProps)
  }

  render() {
    const { className, class: _className, ...rest } = this.props

    const rootParams = {
      className: classnames('dnb-logo', className, _className)
    }

    const svgParams = {
      viewBox: '0 0 24 20',
      alt: 'DNB Logo',
      ...rest
    }
    if (parseFloat(this.props.size) > -1)
      svgParams['width'] = this.props.size
    if (parseFloat(this.props.width) > -1)
      svgParams['width'] = this.props.width
    if (parseFloat(this.props.height) > -1)
      svgParams['height'] = this.props.height
    if (this.props.color) svgParams['color'] = this.props.color

    return (
      <span {...rootParams}>
        <svg {...svgParams}>
          <path d="M201.40213,115.79042l-23.38616.04163-.06186-34.10932,26.66456-.04839c11.55556-.02006,19.67734,6.51872,19.69522,15.85212.00686,4.50011.03164,18.22241-22.91176,18.264ZM177.88671,43.9491l19.77634-.0355q10.49946-.01914,15.50507,3.47079c2.11363,1.49675,5.00838,4.38,5.02074,11.76891.02337,13.22062-10.41829,14.29422-13.58394,14.30027l-26.66594.04767-.05227-29.55214Zm46.28277,35.91164a26.57575,26.57575,0,0,0-4.61506-3.04642l-.44557-.22167.38919-.33431c3.16012-2.78337,6.92949-8.06579,6.913-17.11981-.01649-8.333-2.86036-14.55014-8.53294-18.48437-4.78423-3.38136-11.39742-5.03528-20.23015-5.0192l-25.33205.04561a2.70186,2.70186,0,0,0-2.66093,2.67116l.14988,83.05092a2.6666,2.6666,0,0,0,2.67059,2.66163l28.94185-.05225c9.11052-.01624,16.44018-1.97421,21.70984-5.81628a21.64865,21.64865,0,0,0,6.98449-8.51425,28.17443,28.17443,0,0,0,2.47807-12.16986,22.41194,22.41194,0,0,0-8.42018-17.6509Z" />
          <path d="M49.9512,105.95077c-6.81815,8.34495-16.314,10.14051-23.09179,10.154L8.41609,116.137,8.28716,44.254l18.44325-.03353c6.77715-.01209,16.27984,1.69076,23.1275,10.06807,7.3492,8.987,7.92868,22.42918,7.93615,26.31552.01,5.83513-.96964,16.8903-7.84286,25.34676Zm6.2856-56.89513A35.153,35.153,0,0,0,42.27495,38.803,42.10458,42.10458,0,0,0,26.71572,35.9419l-24.05414.04361A2.71485,2.71485,0,0,0-.00013,38.71369L.14894,121.7075a2.66724,2.66724,0,0,0,2.67178,2.66163l24.05342-.04289a41.01365,41.01365,0,0,0,15.54921-2.91687,34.49874,34.49874,0,0,0,13.925-10.24929c8.48143-10.45748,9.735-23.62645,9.72223-30.57075-.01-5.88616-.981-20.7189-9.83373-31.53369Z" />
          <path d="M149.75345.00009l.22,121.99346a2.45179,2.45179,0,0,1-1.7176,2.39043,1.96025,1.96025,0,0,1-.77695.16917,2.52322,2.52322,0,0,1-2.05862-1.05425L90.911,54.326l.19,105.65888L82.8237,160,82.60352,37.72931a2.49636,2.49636,0,0,1,1.77329-2.38976,1.76336,1.76336,0,0,1,.77834-.11276,2.55427,2.55427,0,0,1,2.05671.9944l54.50921,69.23L141.53127.01482l8.22218-.01473Z" />
        </svg>
      </span>
    )
  }
}

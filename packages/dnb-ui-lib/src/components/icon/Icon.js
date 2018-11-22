/**
 * Web Icon Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { ErrorHandler } from '../../shared/error-helper'
import {
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'

export const DefaultIconSize = 16
export const DefaultIconSizes = {
  default: 16,
  medium: 24,
  large: 32
}
export const ListDefaultIconSizes = Object.entries(DefaultIconSizes)

export const propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  modifier: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // center_self: PropTypes.string,// we may have usage of center_self later
  color: PropTypes.string,
  alt: PropTypes.string,
  area_hidden: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  class: PropTypes.string,
  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}

export const defaultProps = {
  icon: null,
  modifier: null,
  size: DefaultIconSize,
  width: null,
  height: null,
  color: null,
  alt: null,
  area_hidden: false,
  attributes: null,
  class: null,
  // React props
  className: null,
  children: null
}

/**
 * The icon component is a span wrapping an inline svg. When using this component in your preferred framework. To load an svg file dynamically, you may need a "svg-loader". Feel free to use whatever tool you want (regarding the setup/tooling), as long as the output is the same markup as shown below.
 */
export default class Icon extends PureComponent {
  static tagName = 'dnb-icon'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent(
    tag = Icon.tagName,
    inst = Icon,
    props = defaultProps
  ) {
    registerElement(tag, inst, props)
  }

  static getIcon(props) {
    if (props.icon) {
      return props.icon
    }
    return processChildren(props)
  }

  static prerender(props) {
    const icon = Icon.getIcon(props)

    const { color, height, width, className, area_hidden } = props

    let { size, alt, modifier } = props
    if (!alt) {
      if (typeof icon === 'string') alt = icon
      else if (typeof icon === 'object' && icon.displayName) alt = icon
    }

    // also used for code markup simulation
    const wrapperParams = validateDOMAttributes(props, {
      role: 'presentation'
    })
    if (alt) {
      wrapperParams['aria-label'] = alt
    }
    if (area_hidden) {
      wrapperParams['aria-hidden'] = area_hidden
    }

    if (typeof size === 'string' && size) {
      size = ListDefaultIconSizes.filter(([key]) => key === size).reduce(
        (acc, [key, value]) => {
          return key && value
        },
        null
      )
    }

    const svgParams = {}
    if (parseFloat(size) > -1) {
      svgParams['width'] = svgParams['height'] = size
    }
    if (parseFloat(width) > -1) svgParams['width'] = width
    if (parseFloat(height) > -1) svgParams['height'] = height
    if (color) svgParams['color'] = color

    // if the sizes are identical and they are defualt sizes
    // decorate the css class with that info
    if (
      !modifier &&
      parseFloat(svgParams['width']) === parseFloat(svgParams['height'])
    ) {
      const wantedSize = parseFloat(svgParams['height'])
      modifier = ListDefaultIconSizes.filter(
        ([key, value]) => key !== 'default' && value === wantedSize
      ).reduce((acc, [key]) => key, null)
    }

    wrapperParams.className = classnames(
      'dnb-icon',
      modifier ? `dnb-icon--${modifier}` : '',
      // we may have usage of center_self later
      // props.center_self ? 'dnb-icon--center-self' : '',
      props.class,
      className
    )

    // if the size is default, remove the widht/height
    // but if the browser is IE11 - do not remove theese attributes
    if (
      !isIE11 &&
      ListDefaultIconSizes.includes(parseFloat(svgParams['width']))
    ) {
      svgParams['width'] = null
    }
    if (
      !isIE11 &&
      ListDefaultIconSizes.includes(parseFloat(svgParams['height']))
    ) {
      svgParams['height'] = null
    }

    return {
      icon,
      svgParams,
      wrapperParams
    }
  }

  render() {
    const { icon, wrapperParams, svgParams } = Icon.prerender(this.props)

    const Svg = loadSVG(icon)

    // make sure we return an empty span if we dont could get the icon
    if (!Svg) return <span />

    return (
      <span {...wrapperParams}>
        <Svg {...svgParams} />
      </span>
    )
  }
}

export const loadSVG = (icon, listOfIcons) => {
  if (typeof icon === 'function') {
    const elem = icon()
    if (React.isValidElement(elem)) {
      return icon
    }
    return elem
  }

  if (React.isValidElement(icon) || Array.isArray(icon)) {
    return () => icon
  }

  // for importing react component
  try {
    icon = iconCase(icon)
    const mod = (listOfIcons.dnbIcons
      ? listOfIcons.dnbIcons
      : listOfIcons)[
      icon
      // `icon_${iconCase(icon)}`
    ]
    return mod && mod.default ? mod.default : mod
  } catch (e) {
    new ErrorHandler(`Icon '${icon}' did not exist!`)
    return null
  }
}

// to replace icon names
export const iconCase = name =>
  name
    .replace(/((?!^)[A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^[0-9]/g, '$1')
    .replace(/[^a-z0-9_]/gi, '_')

const isIE11 = !!window.MSInputMethodContext && !!document.documentMode

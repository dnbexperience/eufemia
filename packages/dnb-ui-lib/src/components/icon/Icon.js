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
  medium: 24
  // large: 32 // currently not in use
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

    const {
      color,
      modifier,
      height,
      width,
      class: _className,
      className,
      area_hidden
    } = props

    let { alt, size } = props
    let size_int = size

    // get the icon name - we use is for several things
    const name =
      typeof props.icon === 'string'
        ? props.icon
        : props.icon.displayName || props.icon.name

    // if there is no size, check if we can find the actuall size in the name
    if (!size || size === DefaultIconSize) {
      const nameParts = (name || '').split('_')
      if (nameParts.length > 1) {
        const lastPartOfIconName = nameParts.reverse()[0]
        const potentialSize = ListDefaultIconSizes.filter(
          ([key]) => key === lastPartOfIconName
        ).reduce((acc, [key, value]) => {
          return key && value
        }, null)
        if (potentialSize) {
          size_int = potentialSize
        }
      }
    }

    // if size is defined as a string, find the size number
    if (typeof size === 'string' && !(parseFloat(size) > 0)) {
      size_int = ListDefaultIconSizes.filter(
        ([key]) => key === size
      ).reduce((acc, [key, value]) => {
        return key && value
      }, null)
    }

    // define all the svg parameters
    const svgParams = {}
    if (parseFloat(size_int) > -1) {
      svgParams['width'] = svgParams['height'] = size_int
    }
    if (parseFloat(width) > -1) svgParams['width'] = width
    if (parseFloat(height) > -1) svgParams['height'] = height
    if (color) svgParams['color'] = color

    // if the sizes are identical and they are default sizes
    // decorate the css class with that info
    if (
      parseFloat(svgParams['width']) === parseFloat(svgParams['height'])
    ) {
      const wantedSize = parseFloat(svgParams['height'])
      size = ListDefaultIconSizes.filter(
        ([key, value]) => key && value === wantedSize
      ).reduce((acc, [key]) => key, null)
    }

    const widthExistsInDefaultSizes = ListDefaultIconSizes.some(
      ([key, value]) => key && value === parseFloat(svgParams['width'])
    )
    const heightExistsInDefaultSizes = ListDefaultIconSizes.some(
      ([key, value]) => key && value === parseFloat(svgParams['height'])
    )

    // if the size is default, remove the widht/height
    // but if the browser is IE11 - do not remove theese attributes
    if (!isIE11 && widthExistsInDefaultSizes) {
      svgParams['width'] = null
    }
    if (!isIE11 && heightExistsInDefaultSizes) {
      svgParams['height'] = null
    }

    // some wrapper params
    // also used for code markup simulation
    const wrapperParams = validateDOMAttributes(props, {
      role: 'img'
    })
    // get the alt
    wrapperParams['aria-label'] = (alt || name).replace(/_/g, ' ')
    if (area_hidden) {
      // wrapperParams['role'] = 'presentation' // almost the same as aria-hidden
      wrapperParams['aria-hidden'] = area_hidden
    }
    wrapperParams.className = classnames(
      'dnb-icon',
      modifier ? `dnb-icon--${modifier}` : null,
      size ? `dnb-icon--${size}` : null,
      !widthExistsInDefaultSizes && !heightExistsInDefaultSizes
        ? 'has-custom-size'
        : null,
      _className,
      className
    )

    return {
      ...props,
      icon,
      svgParams,
      wrapperParams
    }
  }

  render() {
    const { icon, size, wrapperParams, svgParams } = Icon.prerender(
      this.props
    )

    const Svg = loadSVG(icon, size)

    // make sure we return an empty span if we dont could get the icon
    if (!Svg) return <span />

    return (
      <span {...wrapperParams}>
        <Svg {...svgParams} />
      </span>
    )
  }
}

export const loadSVG = (icon, size = null, listOfIcons = null) => {
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
    if (
      size &&
      DefaultIconSizes[size] &&
      size !== 'default' &&
      !(parseFloat(size) > 0) &&
      !icon.includes(size)
    ) {
      icon = `${icon}_${size}`
    }
    const mod = (listOfIcons.dnbIcons
      ? listOfIcons.dnbIcons
      : listOfIcons)[icon]
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

export const isIE11 =
  typeof window !== 'undefined'
    ? !!window.MSInputMethodContext && !!document.documentMode
    : false

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
  // small: 8,
  default: 16,
  medium: 24
  // large: 32 // currently not in use
}
export const ListDefaultIconSizes = Object.entries(DefaultIconSizes)
export const ValidIconSizes = ['small', 'default', 'medium', 'large']

export const propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  modifier: PropTypes.string,
  /**
   * The Icon size can be either a number or a string
   */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
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
  size: null,
  width: null,
  height: null,
  color: null,
  alt: null,
  title: null,
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

  static getIconNameFromComponent(props) {
    const name =
      typeof props.icon === 'string'
        ? props.icon
        : props.icon &&
          typeof props.icon === 'object' &&
          (props.icon.displayName || props.icon.name)
    if (/^data:image\//.test(name)) {
      return null
    }
    return name
  }

  static calcSize(props) {
    const { size, height, width } = props

    let sizeAsInt = -1
    let sizeAsString = null

    // if there is no size, check if we can find the actuall size in the name
    if (!size || size === DefaultIconSize) {
      // get the icon name - we use is for several things
      const name = Icon.getIconNameFromComponent(props)

      const nameParts = String(name || '').split('_')
      if (nameParts.length > 1) {
        const lastPartOfIconName = nameParts.reverse()[0]
        const potentialSize = ListDefaultIconSizes.filter(
          ([key]) => key === lastPartOfIconName
        ).reduce((acc, [key, value]) => {
          return key && value
        }, null)
        if (potentialSize) {
          sizeAsInt = potentialSize
        }
      } else {
        sizeAsInt = DefaultIconSize
      }
    }

    // if size is defined as a string, find the size number
    else if (typeof size === 'string' && !(parseFloat(size) > 0)) {
      sizeAsInt = ListDefaultIconSizes.filter(
        ([key]) => key === size
      ).reduce((acc, [key, value]) => {
        return key && value
      }, -1)

      // of if the size is a default size defined as a string
      if (ValidIconSizes.includes(size)) {
        sizeAsString = size
      }
    }

    // check if the size is given as a number, and if is a default size
    else if (parseFloat(size) > 0) {
      sizeAsInt = ListDefaultIconSizes.filter(
        ([key, value]) => key && value === parseFloat(size)
      ).reduce((acc, [key, value]) => {
        if (key && value) return value
        return acc
      }, -1)

      // has custom size
      if (sizeAsInt === -1) {
        sizeAsInt = parseFloat(size)
        sizeAsString = 'custom-size'
      }
    }

    // check if the sizeAsInt is a default size
    if (sizeAsInt > 0) {
      const potentialSizeAsString = ListDefaultIconSizes.reduce(
        (acc, [key, value]) => {
          if (key && value === sizeAsInt) {
            return key
          }
          return acc
        },
        null
      )

      if (potentialSizeAsString) {
        sizeAsString = potentialSizeAsString
      }
    }

    const prepareSvgParams = () => {
      const svgParams = {}

      if (!sizeAsString && !(sizeAsInt > 0) && parseFloat(size) > -1) {
        svgParams.width = svgParams.height = parseFloat(size)
      } else if (sizeAsString === 'custom-size') {
        svgParams.width = svgParams.height = parseFloat(sizeAsInt)
      }
      if (parseFloat(width) > -1) {
        sizeAsString = 'custom-size'
        svgParams.width = parseFloat(width)
      }
      if (parseFloat(height) > -1) {
        sizeAsString = 'custom-size'
        svgParams.height = parseFloat(height)
      }

      // and the sizeAsString is not a default size
      const sizeIsValid = ValidIconSizes.includes(sizeAsString)

      // if the size is default, remove the widht/height
      // but if the browser is IE11 - do not remove theese attributes
      if (!isIE11 && sizeIsValid) {
        svgParams.width = null
        svgParams.height = null
      }
      if (isIE11 && sizeAsInt > 0) {
        svgParams.width = svgParams.height = sizeAsInt
      }

      validateDOMAttributes({}, svgParams)

      return svgParams
    }

    // define all the svg parameters
    const svgParams = prepareSvgParams()

    return {
      svgParams,
      sizeAsInt,
      sizeAsString
    }
  }

  static prerender(props) {
    const icon = Icon.getIcon(props)

    const {
      color,
      modifier,
      alt: _alt,
      title,
      class: _className,
      className,
      area_hidden
    } = props

    const { sizeAsString, svgParams } = Icon.calcSize(props)

    if (color) {
      svgParams.color = color
    }

    // get the alt
    let alt = _alt || title

    if (!(alt && alt.length > 0)) {
      alt = String(Icon.getIconNameFromComponent(props)).replace(/_/g, ' ')
    }

    // some wrapper params
    // also used for code markup simulation
    const wrapperParams = validateDOMAttributes(props, {
      role: 'img',
      // as we use aria-label, we do not provide an alt as well
      // alt,
      ['aria-label']: alt,
      title
    })

    if (area_hidden) {
      // wrapperParams['role'] = 'presentation' // almost the same as aria-hidden
      wrapperParams['aria-hidden'] = area_hidden
    }
    wrapperParams.className = classnames(
      'dnb-icon',
      modifier ? `dnb-icon--${modifier}` : null,
      sizeAsString ? `dnb-icon--${sizeAsString}` : null,
      _className,
      className
    )

    return {
      ...props,
      icon,
      alt,
      svgParams,
      wrapperParams
    }
  }

  render() {
    const { icon, size, wrapperParams, svgParams, alt } = Icon.prerender(
      this.props
    )

    const IconContainer = prepareIcon({ icon, size, alt })

    // make sure we return an empty span if we dont could get the icon
    if (!IconContainer) return <></>

    return (
      <span {...wrapperParams}>
        <IconContainer {...svgParams} />
      </span>
    )
  }
}

export const prepareIcon = ({
  icon,
  size = null,
  listOfIcons = null,
  alt = null
} = {}) => {
  if (typeof icon === 'string' && /^data:image\//.test(icon)) {
    return () => <img src={icon} alt={alt || 'no-alt'} />
  }

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

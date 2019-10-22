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
  processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Context from '../../shared/Context'

export const DefaultIconSize = 16
export const DefaultIconSizes = {
  // small: 8,
  default: 16,
  medium: 24
  // large: 32 // currently not in use
}
// instead of using Object.entries(DefaultIconSizes)
export const ListDefaultIconSizes = [['default', 16], ['medium', 24]]
export const ValidIconSizes = [
  'small', // 12px 0.75rem
  'default', // 16px 1rem
  'medium', // 24px 1.5rem
  'large', // 32px 2rem
  'x-large', // 40px 2.5rem
  'xx-large' // 48px 3rem
]

const propTypes = {
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

const defaultProps = {
  icon: null,
  modifier: null,
  size: null,
  width: null,
  height: null,
  color: null,
  alt: null,
  title: null,
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
  static contextType = Context

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

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const { icon, size, wrapperParams, iconParams, alt } = prepareIcon(
      props
    )

    const IconContainer = prerenderIcon({ icon, size, alt })

    // make sure we return an empty span if we dont could get the icon
    if (!IconContainer) return <></>

    return (
      <span {...wrapperParams}>
        <IconContainer {...iconParams} />
      </span>
    )
  }
}

export const getIconNameFromComponent = icon => {
  const name =
    typeof icon === 'string'
      ? icon
      : icon && (icon.displayName || icon.name)
  if (/^data:image\//.test(name)) {
    return null
  }
  return name
}

export const calcSize = props => {
  const { icon, size, height, width } = props

  let sizeAsInt = -1
  let sizeAsString = null

  // if there is no size, check if we can find the actuall size in the name
  if (!size || size === DefaultIconSize) {
    // get the icon name - we use is for several things
    const name = getIconNameFromComponent(icon)

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
      if (ValidIconSizes.includes(lastPartOfIconName)) {
        sizeAsString = lastPartOfIconName
      }
    } else {
      if (typeof icon === 'function') {
        const elem = icon()
        if (elem.props) {
          let potentialSize = -1
          if (elem.props.width) {
            potentialSize = elem.props.width
          }
          if (!potentialSize && elem.props.viewBox) {
            potentialSize = /[0-9]+ [0-9]+ ([0-9]+)/.exec(
              elem.props.viewBox
            )[1] // get the width
          }
          if (potentialSize) {
            sizeAsInt = potentialSize
          }
        }
      }
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

  // check if the sizeAsInt is a default size - and no sizeAsString exists yet
  if (!sizeAsString && sizeAsInt > 0) {
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

  // define all the svg parameters
  const {
    sizeAsString: isCustomSize,
    params: iconParams
  } = prepareIconParams({
    sizeAsString,
    sizeAsInt,
    size,
    width,
    height
  })
  if (isCustomSize) {
    sizeAsString = isCustomSize
  }

  if (!(sizeAsInt > 0)) {
    sizeAsInt = DefaultIconSize
  }

  if (size === 'auto') {
    iconParams.width = '100%'
    iconParams.height = '100%'
    sizeAsString = null
  }

  return {
    iconParams,
    sizeAsInt,
    sizeAsString
  }
}

const prepareIconParams = ({ sizeAsString, ...rest }) => {
  const { size, width, height, sizeAsInt } = rest
  const params = {}

  if (!sizeAsString && !(sizeAsInt > 0) && parseFloat(size) > -1) {
    params.width = params.height = parseFloat(size)
  } else if (sizeAsString === 'custom-size') {
    params.width = params.height = parseFloat(sizeAsInt)
  }
  if (parseFloat(width) > -1) {
    sizeAsString = 'custom-size'
    params.width = parseFloat(width)
  }
  if (parseFloat(height) > -1) {
    sizeAsString = 'custom-size'
    params.height = parseFloat(height)
  }

  validateDOMAttributes({}, params)

  return { params, sizeAsString }
}

export const prepareIcon = props => {
  const {
    icon,
    size, // eslint-disable-line
    height,
    width,
    color,
    modifier,
    alt: _alt,
    title,
    class: _className,
    className,
    ...attributes
  } = props

  const { sizeAsString, iconParams } = calcSize({
    icon,
    size,
    height,
    width
  })

  if (color) {
    iconParams.color = color
  }

  // get the alt
  let alt = _alt || title

  if (!(alt && alt.length > 0)) {
    alt = getIconNameFromComponent(icon)
    alt = alt ? String(alt).replace(/_/g, ' ') : null
  }

  // some wrapper params
  // also used for code markup simulation
  const wrapperParams = validateDOMAttributes(props, {
    role: 'img',
    alt, // in case the image don't shows up (because we define the role to be img)
    ['aria-label']: !attributes['aria-hidden'] ? alt : null, // for screen readers only
    title, // to show on hover, if defined
    ...attributes
  })

  wrapperParams.className = classnames(
    'dnb-icon',
    modifier ? `dnb-icon--${modifier}` : null,
    sizeAsString ? `dnb-icon--${sizeAsString}` : null,
    createSpacingClasses(props),
    _className,
    className
  )

  return {
    ...props,
    icon: Icon.getIcon(props),
    alt,
    iconParams,
    wrapperParams
  }
}

export const prerenderIcon = ({
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

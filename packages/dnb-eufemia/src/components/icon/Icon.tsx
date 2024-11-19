import React, { useContext } from 'react'
import classnames from 'classnames'
import { ErrorHandler } from '../../shared/error-helper'
import {
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import Context, { ContextProps } from '../../shared/Context'
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { iconCase } from './IconHelpers'
import { SpacingProps } from '../../shared/types'
import { SkeletonShow } from '../Skeleton'
import { FormStatusIconTypes } from '../FormStatus'

export const DefaultIconSize = 16
export const DefaultIconSizes = {
  // small: 8, // currently not in use
  default: 16,
  medium: 24,
  // large: 32 // currently not in use
} as const
export const ListDefaultIconSizes: Array<
  [ValidIconType, ValidIconNumericSize]
> = [
  ['default', 16],
  ['medium', 24],
]
export const ValidIconType = [
  'small', // 12px 0.75rem
  'default', // 16px 1rem
  'medium', // 24px 1.5rem
  'large', // 32px 2rem
  'x-large', // 40px 2.5rem
  'xx-large', // 48px 3rem
] as const

export type DefaultIconSizes = typeof DefaultIconSizes
export type ValidIconType = (typeof ValidIconType)[number]
export type ValidIconNumericSize = DefaultIconSizes[keyof DefaultIconSizes]

/** For internal usage */
type IconType =
  | string
  | React.ReactElement<SVGElement>
  | ((props?: unknown) => JSX.Element)
  | false

/** For external usage */
export type IconIcon = IconType | FormStatusIconTypes | React.FC<unknown>

export type IconSize =
  | ValidIconNumericSize
  | `${ValidIconNumericSize | number}`
  | ValidIconType
  | 'auto'
  | 'basis'

export type IconColor =
  | string
  | number
  | { [key: string]: string | number }

export type IconProps = {
  /**
   * A React SVG Component.
   */
  icon?: IconIcon

  /**
   * The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`,`medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the parent HTML element if it provides a `font-size`.
   */
  size?: IconSize

  /**
   * The color can be any valid color property, such as Hex, RGB or preferable – any CSS variable from the <a href="/uilib/usage/customisation/colors">colors table</a>, e.g. `var(--color-ocean-green)`. Default is no color, which means `--color-black-80`.
   */
  color?: IconColor

  /**
   * Defaults to `true`. Set to `false` if you do not want to inherit the color by `currentColor`.
   */
  inheritColor?: boolean

  /** @deprecated Use `inheritColor` instead */
  inherit_color?: boolean

  /**
   * The alternative label (text version) of the icon. Defaults to the imported icon name.
   */
  alt?: string

  /**
   * Use a title to provide extra information about the icon used.
   */
  title?: string

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  /**
   * Modifier class to define. Will result in: `dnb-icon--${modifier}`.
   */
  modifier?: string

  border?: boolean
  width?: `${IconSize}` | `${number}%` | number
  height?: `${IconSize}` | `${number}%` | number
  children?: IconIcon
}

export type IconAllProps = IconProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'size' | 'children'>

export default function Icon(localProps: IconAllProps) {
  const context = useContext(Context)

  // use only the props from context, who are available here anyway
  const props = extendPropsWithContext(
    localProps,
    {},
    { skeleton: context?.skeleton },
    context.Icon
  )

  // Todo: rewrite prepareIcon to hook
  const {
    icon: iconProp,
    size,
    wrapperParams,
    iconParams,
    alt,
    children,
  } = prepareIcon(props, context)
  const icon = iconProp ?? children

  if (!icon) {
    return null
  }

  const IconContainer = prerenderIcon({ icon, size, alt })

  // make sure we return an empty span if we couldn't get the icon
  if (!IconContainer) {
    return <></>
  }

  return (
    <span {...wrapperParams}>
      <IconContainer {...iconParams} />
    </span>
  )
}

export function getIconNameFromComponent(icon: IconProps['icon']): string {
  if (React.isValidElement(icon) && icon?.type) {
    icon = icon?.type as IconType
  }
  const name = typeof icon === 'function' ? icon.name : String(icon)
  if (/^data:image\//.test(name)) {
    return null
  }
  return name
}

export function calcSize(props: IconProps) {
  const { icon, size, width, height } = props as Omit<
    IconProps,
    'icon'
  > & { icon: IconType }

  let sizeAsInt: ValidIconNumericSize | -1 = null
  let sizeAsString = null

  // if there is no size, check if we can find the actual size in the name
  if (!size || size === DefaultIconSize) {
    // get the icon name - we use it for several things
    const name = getIconNameFromComponent(icon)

    const nameParts = String(name || '').split('_')

    if (nameParts.length > 1) {
      const lastPartOfIconName = nameParts.reverse()[0] as ValidIconType
      const potentialSize = ListDefaultIconSizes.filter(
        ([key]) => key === lastPartOfIconName
      )?.[0]?.[1]
      if (potentialSize) {
        sizeAsInt = potentialSize
      }
      if (ValidIconType.includes(lastPartOfIconName)) {
        sizeAsString = lastPartOfIconName
      }
    } else {
      if (typeof icon === 'function') {
        const elem = icon()
        if (elem.props) {
          let potentialSize: ValidIconNumericSize | -1 = null
          if (elem.props.width) {
            potentialSize = elem.props.width
          }
          if (!potentialSize && elem.props.viewBox) {
            potentialSize = parseFloat(
              /[0-9]+ [0-9]+ ([0-9]+)/.exec(elem.props.viewBox)[1]
            ) as ValidIconNumericSize // get the width
          }
          if (!isNaN(potentialSize)) {
            sizeAsInt = potentialSize
          }
        }
      }
    }
  }

  // if size is defined as a string, find the size number
  else if (typeof size === 'string' && !(parseFloat(size) > 0)) {
    sizeAsInt =
      ListDefaultIconSizes.filter(([key]) => key === size)?.[0]?.[1] ?? -1

    // or if the size is a default size defined as a string
    if (ValidIconType.includes(size as ValidIconType)) {
      sizeAsString = size
    }
  }

  // check if the size is given as a number, and if it's a default size
  else if (parseFloat(String(size)) > 0) {
    sizeAsInt =
      ListDefaultIconSizes.filter(
        ([key, value]) => key && value === parseFloat(String(size))
      )?.[0]?.[1] ?? -1

    // has custom size
    if (sizeAsInt === -1) {
      sizeAsInt = parseFloat(String(size)) as ValidIconNumericSize
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
  const { sizeAsString: isCustomSize, params: iconParams } =
    prepareIconParams({
      sizeAsString,
      sizeAsInt,
      size,
      width,
      height,
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
    sizeAsString = 'auto'
  }

  return {
    iconParams,
    sizeAsInt,
    sizeAsString,
  }
}

function prepareIconParams({
  sizeAsString,
  ...rest
}: Omit<IconProps, 'icon'> & {
  sizeAsString?: ValidIconType | 'custom-size'
  sizeAsInt?: ValidIconNumericSize | -1
}) {
  const { size, width, height, sizeAsInt } = rest
  const params: {
    height?: IconProps['height']
    width?: IconProps['width']
    color?: IconProps['color']
  } = {}

  if (!sizeAsString && !(sizeAsInt > 0) && parseFloat(String(size)) > -1) {
    params.width = params.height = parseFloat(String(size))
  } else if (sizeAsString === 'custom-size') {
    params.width = params.height = parseFloat(String(sizeAsInt))
  }
  if (parseFloat(String(width)) > -1) {
    sizeAsString = 'custom-size'
    params.width = parseFloat(String(width))
  }
  if (parseFloat(String(height)) > -1) {
    sizeAsString = 'custom-size'
    params.height = parseFloat(String(height))
  }

  validateDOMAttributes({}, params)

  return { params, sizeAsString }
}

export function prepareIcon(props: IconAllProps, context: ContextProps) {
  const {
    icon,
    size,
    width,
    height,
    border,
    color,
    inheritColor,
    inherit_color,
    modifier,
    alt,
    title,
    skeleton,
    className,
    ...attributes
  } = props

  const { sizeAsString, iconParams } = calcSize({
    icon,
    size,
    width,
    height,
  })

  if (color) {
    iconParams.color = color
  }

  const label = icon ? getIconNameFromComponent(icon) : null

  // some wrapper params
  // also used for code markup simulation
  const wrapperParams = validateDOMAttributes(props, {
    role: alt ? 'img' : 'presentation',
    alt, // in case the image don't shows up (because we define the role to be img)
    'aria-label':
      label && !label.includes('default')
        ? label.replace(/_/g, ' ') + ' icon'
        : null, // for screen readers only
    title, // to show on hover, if defined
    ...attributes,
  })
  if (!alt && typeof wrapperParams['aria-hidden'] === 'undefined') {
    wrapperParams['aria-hidden'] = true
  }
  if (wrapperParams['aria-hidden']) {
    if (
      !wrapperParams['data-testid'] &&
      typeof process !== 'undefined' &&
      process.env.NODE_ENV === 'test'
    ) {
      wrapperParams['data-testid'] = wrapperParams['aria-label']
    }
    delete wrapperParams['aria-label']
  }

  wrapperParams.className = classnames(
    'dnb-icon',
    modifier && `dnb-icon--${modifier}`,
    border && 'dnb-icon--border',
    (inheritColor ?? inherit_color) !== false && 'dnb-icon--inherit-color',
    sizeAsString ? `dnb-icon--${sizeAsString}` : 'dnb-icon--default',
    createSkeletonClass(null, skeleton, context),
    createSpacingClasses(props),
    className
  )

  let iconToRender = getIcon(props)

  if (iconToRender && typeof iconToRender.defaultProps !== 'undefined') {
    iconToRender = React.createElement(
      iconToRender,
      validateDOMAttributes(
        {},
        {
          color,
          icon,
          size,
          width,
          height,
        }
      )
    )
  }

  return {
    ...props,
    icon: iconToRender,
    alt,
    iconParams,
    wrapperParams,
  }
}

export function prerenderIcon(
  props: IconProps & {
    listOfIcons?: Record<string, IconIcon>
  }
) {
  const { size = null, listOfIcons = null, alt = null } = props
  let { icon } = props as Omit<IconProps, 'icon'> & { icon: IconType }

  if (typeof icon === 'string' && /^data:image\//.test(icon)) {
    return () => <img src={String(icon)} alt={alt || 'no-alt'} />
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

  // For UMD/ dynamic import of icons
  try {
    icon = iconCase(icon)
    if (
      size &&
      DefaultIconSizes[size] &&
      size !== 'basis' &&
      size !== 'default' &&
      !(parseFloat(String(size)) > 0) &&
      !icon.includes(size as ValidIconType)
    ) {
      icon = `${icon}_${size}`
    }
    const mod = (
      listOfIcons.dnbIcons ? listOfIcons.dnbIcons : listOfIcons
    )[icon]
    return mod && mod.default ? mod.default : mod
  } catch (e) {
    ErrorHandler(`Icon '${icon}' did not exist!`)
    return null
  }
}

function getIcon(props) {
  if (props.icon) {
    return props.icon
  }
  return processChildren(props)
}

Icon._supportsSpacingProps = true

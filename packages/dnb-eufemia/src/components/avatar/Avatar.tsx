import React from 'react'
import clsx from 'clsx'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import Icon, { IconIcon, IconAllProps } from '../icon/Icon'
import IconPrimary from '../IconPrimary'

// Elements
import Img, { ImgProps } from '../../elements/img/Img'

// Shared
import Context from '../../shared/Context'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../skeleton/Skeleton'
import {
  validateDOMAttributes,
  extendPropsWithContext,
  warn,
} from '../../shared/component-helper'

// Internal
import AvatarGroup, { AvatarGroupContext } from './AvatarGroup'
import { getColor } from '../../shared/helpers'

export type AvatarSizes = 'small' | 'medium' | 'large' | 'x-large'
export type AvatarVariants = 'primary' | 'secondary' | 'tertiary'

export type AvatarImgProps = ImgProps

export interface AvatarProps
  extends Omit<React.HTMLProps<HTMLElement>, 'size'> {
  /**
   * Used in combination with `src` to provide an alt attribute for the `img` element.
   * Default: null
   */
  alt?: string

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow

  /**
   * The content of the component. Can be used instead of prop "data".
   * Default: null
   */
  children?: React.ReactNode

  /**
   * The size of the component.
   * Default: medium.
   */
  size?: AvatarSizes

  /**
   * Specifies the path to the image
   * Default: null
   */
  src?: string

  /**
   * Props applied to the `img` element if the component is used to display an image.
   * Default: null
   */
  imgProps?: ImgProps

  /**
   * An icon name or component
   */

  icon?: IconIcon

  /**
   * The variant of the component.
   * Default: primary.
   */
  variant?: AvatarVariants

  /**
   * If an avatar is hidden from the screen reader (by setting aria-hidden={true}) or if label is given, typical inside a table or dl (definition list), then you can disable Avatar.Group as a dependent of Avatar.
   * Use `true` to omit the `Avatar group required:` warning.
   * Default: null
   */
  hasLabel?: boolean

  /**
   * Define a custom background color, instead of a variant. Use a Eufemia color.
   * Default: undefined
   */
  backgroundColor?: string

  /**
   * Define a custom color to compliment the backgroundColor. Use a Eufemia color.
   * Default: undefined
   */
  color?: string
}

export const defaultProps = {
  size: 'medium',
  variant: 'primary',
  skeleton: false,
}

const Avatar = (localProps: AvatarProps & SpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
  const avatarGroupContext = React.useContext(AvatarGroupContext)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.Avatar,
    { skeleton: context?.skeleton },
    avatarGroupContext
  )

  const {
    alt,
    className,
    children: childrenProp,
    size,
    skeleton,
    variant,
    src,
    imgProps,
    icon,
    hasLabel,
    backgroundColor,
    color,
    ...props
  } = allProps

  let children = null

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const childrenIsString = typeof childrenProp === 'string'

  if (icon) {
    children = isIconComponent(icon) ? (
      iconAutoSize(icon)
    ) : (
      <IconPrimary
        icon={icon}
        size="auto"
        aria-hidden={childrenIsString ? true : null}
        skeleton={skeleton}
      />
    )
  } else if (src || imgProps) {
    const imageProps = { src, alt, ...imgProps }
    children = <Img {...imageProps} />
  } else if (childrenIsString) {
    const firstLetterUpperCase = childrenProp.charAt(0).toUpperCase()
    children = <span aria-hidden>{firstLetterUpperCase}</span>
  } else if (
    React.Children.count(childrenProp) === 1 &&
    isIconComponent(childrenProp)
  ) {
    children = iconAutoSize(childrenProp)
  } else {
    children = childrenProp
  }

  if (!avatarGroupContext && !hasLabel) {
    warn(
      `Avatar group required: An Avatar requires an Avatar.Group with label description as a parent component. This is to ensure correct semantic and accessibility.`
    )
  }

  validateDOMAttributes(allProps, props)

  const style = {
    '--background-color': getColor(backgroundColor),
    '--color': getColor(color),
    ...props?.style,
  } as React.CSSProperties

  return (
    <span
      className={clsx(
        'dnb-avatar',
        `dnb-avatar--${variant || 'primary'}`,
        `dnb-avatar--size-${size || 'medium'}`,
        skeletonClasses,
        spacingClasses,
        className
      )}
      {...props}
      style={style}
    >
      {childrenIsString && (
        <span className="dnb-sr-only">{childrenProp}</span>
      )}
      {children}
    </span>
  )
}

Avatar.Group = AvatarGroup

export { AvatarGroup }

Avatar._supportsSpacingProps = true

export default Avatar

function isIconComponent(
  element: unknown
): element is React.ReactElement<IconAllProps> {
  return (
    React.isValidElement(element) &&
    (element.type === Icon || element.type === IconPrimary)
  )
}

function iconAutoSize(
  icon: React.ReactElement<IconAllProps>
): React.ReactElement<IconAllProps> {
  return !icon.props.size
    ? React.cloneElement(icon, {
        size: 'auto',
      })
    : icon
}

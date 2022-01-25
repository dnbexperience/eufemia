import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

// Elements
import { ImgProps } from '../../elements/Img'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps, SkeletonTypes } from '../../shared/interfaces'
import {
  extendPropsWithContext,
  warn,
} from '../../shared/component-helper'
import { Img } from '../..'

// Internal
import AvatarGroup, { AvatarGroupContext } from './AvatarGroup'

export * from './AvatarGroup'

type AltSrcProps =
  | {
      alt?: string
      src?: string
    }
  | { alt: string; src: string }

export type AvatarSizes = 'small' | 'medium' | 'large' | 'x-large'
export type AvatarVariants = 'primary' | 'secondary' | 'tertiary'

export interface AvatarProps {
  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonTypes

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
   * Props applied to the `img` element if the component is used to display an image.
   * Default: null
   */
  imgProps?: ImgProps

  /**
   * The variant of the component.
   * Default: primary.
   */
  variant?: AvatarVariants
}

export const defaultProps = {
  className: null,
  size: 'medium',
  imgProps: null,
  variant: 'primary',
  skeleton: false,
  children: null,
}

function Avatar(localProps: AvatarProps & AltSrcProps & ISpacingProps) {
  // Every component should have a context
  const context = React.useContext(Context)
  const avatarGroupContext = React.useContext(AvatarGroupContext)

  // Extract additional props from global context
  const {
    alt,
    className,
    children: childrenProp,
    size,
    skeleton,
    variant,
    src,
    imgProps,
    ...props
  } = extendPropsWithContext(
    { ...defaultProps, ...localProps },
    defaultProps,
    context?.Avatar,
    avatarGroupContext
  )

  let children = null

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const childrenIsString = typeof childrenProp === 'string'

  if (src || imgProps) {
    const imageProps = { src, alt, ...imgProps }
    children = <Img {...imageProps} />
  } else if (childrenIsString) {
    const firstLetterUpperCase = childrenProp.charAt(0).toUpperCase()
    children = (
      <span data-testid="avatar-text" aria-hidden>
        {firstLetterUpperCase}
      </span>
    )
  } else {
    children = childrenProp
  }

  if (!avatarGroupContext) {
    warn(
      `Avatar group required: An Avatar requires an Avatar.Group with label description as a parent component. This is to ensure correct semantic and accessibility.`
    )
  }

  return (
    <div
      className={classnames(
        'dnb-avatar',
        `dnb-avatar--${variant || 'primary'}`,
        `dnb-avatar--size-${size || 'medium'}`,
        skeletonClasses,
        spacingClasses,
        className
      )}
      data-testid="avatar"
      {...props}
    >
      {childrenIsString && (
        <span data-testid="avatar-label" className="dnb-sr-only">
          {childrenProp}
        </span>
      )}
      {children}
    </div>
  )
}

Avatar.Group = AvatarGroup

export { AvatarGroup }

export default Avatar

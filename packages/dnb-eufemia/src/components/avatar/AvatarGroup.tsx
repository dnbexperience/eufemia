import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { AvatarSizes, AvatarVariants } from './Avatar'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps } from '../../shared/interfaces'
import { extendPropsWithContext } from '../../shared/component-helper'

export interface AvatarGroupProps {
  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Number of max displayed elements, including the "elements hidden text (+x)".
   * Default: 4
   */
  maxElements?: number

  /**
   * The avatars to group.
   * Default: null
   */
  children?: React.ReactNode

  /**
   * The size of the Avatars, and "elements hidden text (+x)".
   * Default: medium.
   */
  size?: AvatarSizes

  /**
   * The variant of the Avatars.
   * Default: primary.
   */
  variant?: AvatarVariants
}

export const defaultProps = {
  className: null,
  maxElements: 4,
  size: 'medium',
  children: null,
  variant: 'primary',
}

function AvatarGroup(localProps: AvatarGroupProps & ISpacingProps) {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    className,
    children: childrenProp,
    size,
    maxElements: maxElementsProp,
    variant,
    ...props
  } = extendPropsWithContext(
    { ...defaultProps, ...localProps },
    defaultProps,
    context?.AvatarGroup
  )

  const maxElements =
    maxElementsProp && maxElementsProp > 0 ? maxElementsProp : 4

  const numOfHiddenAvatars =
    childrenProp.length > maxElements
      ? childrenProp.length - maxElements + 1
      : 0

  let children = childrenProp

  if (Array.isArray(childrenProp)) {
    children = [...childrenProp]
      .slice(0, childrenProp.length - numOfHiddenAvatars)
      .reverse()
      .map((child, i) => {
        const appliedSize = child.props.size ? child.props.size : size
        const appliedVariant = child.props.variant
          ? child.props.variant
          : variant
        return React.cloneElement(child, {
          size: appliedSize,
          variant: appliedVariant,
          key: i,
        })
      })
  }

  const spacingClasses = createSpacingClasses(props)

  return (
    <div
      className={classnames(
        'dnb-avatar--group',
        spacingClasses,
        className
      )}
      data-testid="avatar-group"
      {...props}
    >
      {numOfHiddenAvatars ? (
        <ElementsHidden size={size}>+{numOfHiddenAvatars}</ElementsHidden>
      ) : null}
      {children}
    </div>
  )
}

export interface ElementsHiddenProps {
  /**
   * The avatars to group.
   * Default: null
   */
  children?: React.ReactNode

  /**
   * The size of the "elements hidden text (+x)".
   * Default: medium.
   */
  size?: AvatarSizes
}

function ElementsHidden(props: ElementsHiddenProps) {
  const { size, children } = props
  return (
    <span
      className={classnames(
        'dnb-avatar--group--elements-left',
        `dnb-avatar--group--elements-left--size-${size || 'medium'}`
      )}
      data-testid="elements-left"
    >
      {children}
    </span>
  )
}

export default AvatarGroup

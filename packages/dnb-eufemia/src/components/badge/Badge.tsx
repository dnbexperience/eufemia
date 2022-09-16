import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

// Shared
import Context from '../../shared/Context'
import { ISpacingProps } from '../../shared/interfaces'
import { SkeletonShow } from '../skeleton/Skeleton'
import { usePropsWithContext } from '../../shared/component-helper'
import { warn } from '../../shared/component-helper'

export interface BadgeProps {
  /**
   * Aria label to describe the badge
   * Default: null
   */
  label?: React.ReactNode

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
   * The content to display the badge on top of.
   * Default: null
   */
  children?: React.ReactNode

  /**
   * The content of the component.
   * Default: null
   */
  content?: string | number | React.ReactNode

  /**
   * The vertical positioning of the component.
   * Default: null
   */
  vertical?: 'bottom' | 'top'

  /**
   * The horizontal positioning of the component.
   * Default: null
   */
  horizontal?: 'left' | 'right'

  /**
   * The variant of the component.
   * Default: information.
   */
  variant?: 'information' | 'notification'
}

type BadgeAndISpacingProps = BadgeProps & ISpacingProps

export const defaultProps = {
  label: null,
  className: null,
  skeleton: false,
  children: null,
  content: null,
  vertical: null,
  horizontal: null,
  variant: 'information',
}

function Badge(localProps: BadgeAndISpacingProps) {
  // Every component should have a context
  const context = React.useContext(Context)

  // Extract additional props from global context
  const { children, ...props } = usePropsWithContext(
    localProps,
    defaultProps,
    context?.Badge
  )

  const BadgeRoot = ({ children }: { children: React.ReactNode }) => (
    <span className="dnb-badge__root" data-testid="badge-root">
      {children}
    </span>
  )

  const BadgeElem = (localProps: BadgeAndISpacingProps) => {
    const {
      label,
      className,
      children,
      skeleton,
      horizontal,
      vertical,
      content: contentProp,
      variant,
      ...props
    } = localProps

    const skeletonClasses = createSkeletonClass('shape', skeleton, context)
    const spacingClasses = createSpacingClasses(props)
    const contentIsNum = typeof contentProp === 'number'
    const variantIsNotification = variant === 'notification'

    const content =
      variantIsNotification && contentIsNum && contentProp > 9
        ? '9+'
        : contentProp

    if (variantIsNotification && !contentIsNum) {
      warn(
        `Type of content should be a number: A notification badge is best suited to display content of type number.`
      )
    }
    if (!label && contentIsNum) {
      warn(
        `Label required: A Badge with a number as content requires a label describing the content of the badge. This is to ensure correct semantic and accessibility.`
      )
    }

    return (
      <span
        className={classnames(
          'dnb-badge',
          `dnb-badge--variant-${variant}`,
          horizontal && `dnb-badge--horizontal-${horizontal}`,
          vertical && `dnb-badge--vertical-${vertical}`,
          skeletonClasses,
          spacingClasses,
          className
        )}
        data-testid="badge"
        {...props}
      >
        {label && (
          <span data-testid="badge-label" className="dnb-sr-only">
            {label}{' '}
          </span>
        )}
        {content}
      </span>
    )
  }

  if (children) {
    return (
      <BadgeRoot>
        {children}
        <BadgeElem {...props} />
      </BadgeRoot>
    )
  }

  return <BadgeElem {...props} />
}

export default Badge

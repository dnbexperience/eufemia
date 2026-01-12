import React from 'react'
import classnames from 'classnames'

// Components
import { createSpacingClasses } from '../space/SpacingHelper'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

// Shared
import Context, { ContextProps } from '../../shared/Context'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../skeleton/Skeleton'
import {
  warn,
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import NumberFormat from '../NumberFormat'

export type BadgeProps = {
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
   * Default: "information".
   */
  variant?: 'information' | 'notification' | 'content'

  /**
   * Defines the status color of the `"information"` variant. Has no effect on other variants.
   * Default: "default".
   */
  status?: 'default' | 'neutral' | 'positive' | 'warning' | 'negative'
  /**
   * Applies subtle style to `"information"` variant. Has no effect on other variants.
   * Default: false.
   */
  subtle?: boolean
}

type BadgeAndSpacingProps = BadgeProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, 'content' | 'label'>

type BadgeElemProps = BadgeAndSpacingProps & { context: ContextProps }

export const defaultProps: BadgeAndSpacingProps = {
  label: null,
  className: null,
  skeleton: false,
  children: null,
  content: null,
  vertical: null,
  horizontal: null,
  variant: 'information',
  status: 'default',
  subtle: false,
}

function Badge(localProps: BadgeAndSpacingProps) {
  // Every component should have a context
  const context = React.useContext(Context)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.Badge,
    { skeleton: context?.skeleton }
  )
  const { children } = allProps

  if (children) {
    return (
      <BadgeRoot>
        {children}
        <BadgeElem context={context} {...allProps} />
      </BadgeRoot>
    )
  }

  return <BadgeElem context={context} {...allProps} />
}

function BadgeRoot({ children }: { children: React.ReactNode }) {
  return <span className="dnb-badge__root">{children}</span>
}

/** Ensures props that only affect certain variants are reset to default */
function propGuard(
  fn: React.FC<BadgeElemProps>
): React.FC<BadgeElemProps> {
  return (props) => {
    if (props.variant !== 'information') {
      const { status, subtle } = defaultProps

      return fn({ ...props, subtle, status })
    }
    return fn(props)
  }
}

const BadgeElem = propGuard(function (props: BadgeElemProps) {
  const {
    label,
    className,
    children,
    skeleton,
    horizontal,
    vertical,
    content: contentProp,
    variant,
    status,
    subtle,
    context,
    ...restProps
  } = props

  // to remove spacing props, etc.
  validateDOMAttributes(props, restProps)

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const spacingClasses = createSpacingClasses(props)
  const contentIsNum = typeof contentProp === 'number'
  const variantIsNotification = variant === 'notification'

  const content =
    variantIsNotification && contentIsNum ? (
      <NumberFormat>{contentProp}</NumberFormat>
    ) : (
      contentProp
    )

  if (!label && contentIsNum) {
    warn(
      `Label required: A Badge with a number as content requires a label describing the content of the badge. This is to ensure correct semantic and accessibility.`
    )
  }

  const isInline = !children && content

  return (
    <span
      role="status"
      className={classnames(
        'dnb-badge',
        variant !== 'content' && `dnb-badge--variant-${variant}`,
        horizontal && `dnb-badge--horizontal-${horizontal}`,
        vertical && `dnb-badge--vertical-${vertical}`,
        isInline && 'dnb-badge--inline',
        variant === 'information' &&
          `dnb-badge--status-${status}${
            subtle ? ` dnb-badge--subtle` : ''
          }`,
        skeletonClasses,
        spacingClasses,
        className
      )}
      {...restProps}
    >
      {label && <span className="dnb-sr-only">{label} </span>}
      {content}
    </span>
  )
})

Badge._supportsSpacingProps = true

export default Badge

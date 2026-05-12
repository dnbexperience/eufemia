import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useContext } from 'react'
import type { CSSProperties, HTMLProps, JSX, ReactNode } from 'react'
import clsx from 'clsx'

// Components
import { applySpacing } from '../space/SpacingUtils'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

// Shared
import type { ContextProps } from '../../shared/Context'
import Context from '../../shared/Context'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../skeleton/Skeleton'
import {
  warn,
  extendPropsWithContext,
  validateDOMAttributes,
} from '../../shared/component-helper'
import useNumberFormat from '../number-format/useNumberFormat'

export type BadgeProps = {
  /**
   * The label description of the badge. Only required when passing a number as the badge content.
   */
  label?: ReactNode

  /**
   * Custom className on the component root
   * Default: `null`
   */
  className?: string

  /**
   * Applies loading skeleton.
   * Default: `false`
   */
  skeleton?: SkeletonShow

  /**
   * The content to display the badge on top of.
   * Default: `null`
   */
  children?: ReactNode

  /**
   * The content of the component.
   * Default: `null`
   */
  content?: string | number | ReactNode

  /**
   * The vertical positioning of the component.
   * Default: `null`
   */
  vertical?: 'bottom' | 'top'

  /**
   * The horizontal positioning of the component.
   * Default: `null`
   */
  horizontal?: 'left' | 'right'

  /**
   * The variant of the component.
   * Default: `information`
   */
  variant?: 'information' | 'notification' | 'content'

  /**
   * Defines the status color of the `"information"` variant. Has no effect on other variants.
   * Default: `default`
   */
  status?: 'default' | 'neutral' | 'positive' | 'warning' | 'negative'
  /**
   * Applies subtle style to `"information"` variant. Has no effect on other variants.
   * Default: `false`
   */
  subtle?: boolean
  /**
   * Removes the badge without removing children. Useful when Badge wraps content.
   * Default: `false`
   */
  hideBadge?: boolean
}

export type BadgeAllProps = BadgeProps &
  SpacingProps &
  Omit<HTMLProps<HTMLElement>, 'content' | 'label'>

type BadgeElemProps = BadgeAllProps & { context: ContextProps }

export const defaultProps: BadgeAllProps = {
  skeleton: false,
  variant: 'information',
  status: 'default',
  subtle: false,
  hideBadge: false,
}

function Badge(localProps: BadgeAllProps) {
  // Every component should have a context
  const context = useContext(Context)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.Badge,
    { skeleton: context?.skeleton }
  )
  const { children, className } = allProps

  if (children) {
    return (
      <BadgeRoot {...applySpacing(allProps, {})}>
        {children}
        <BadgeElem context={context} {...allProps} className={className} />
      </BadgeRoot>
    )
  }

  return (
    <BadgeElem
      context={context}
      {...allProps}
      {...applySpacing(allProps, { className })}
    />
  )
}

function BadgeRoot({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <span className={clsx('dnb-badge__root', className)} style={style}>
      {children}
    </span>
  )
}

/** Ensures props that only affect certain variants are reset to default */
function propGuard(
  fn: (props: BadgeElemProps) => JSX.Element | null
): (props: BadgeElemProps) => JSX.Element | null {
  return (props) => {
    if (props.variant !== 'information') {
      return fn({
        ...props,
        subtle: defaultProps.subtle,
        status: defaultProps.status,
      })
    }
    return fn(props)
  }
}

const BadgeElem = propGuard((props: BadgeElemProps) => {
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
    hideBadge,
    context,
    ...restProps
  } = props

  if (hideBadge) {
    return null
  }

  // to remove spacing props, etc.
  validateDOMAttributes(props, restProps)

  const skeletonClasses = createSkeletonClass('shape', skeleton, context)
  const contentIsNum = typeof contentProp === 'number'
  const num = useNumberFormat(contentIsNum ? contentProp : 0)
  const variantIsNotification = variant === 'notification'
  const content = variantIsNotification && contentIsNum ? num : contentProp

  if (!label && contentIsNum) {
    warn(
      `Label required: A Badge with a number as content requires a label describing the content of the badge. This is to ensure correct semantics and accessibility.`
    )
  }

  const isInline = !children && content

  return (
    <span
      role="status"
      className={clsx(
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
        className
      )}
      {...restProps}
    >
      {label && <span className="dnb-sr-only">{label} </span>}
      {content}
    </span>
  )
})

withComponentMarkers(Badge, {
  _supportsSpacingProps: true,
})

export default Badge

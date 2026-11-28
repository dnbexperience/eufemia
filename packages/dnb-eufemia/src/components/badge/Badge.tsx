import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers'
import { cloneElement, isValidElement, useContext, useRef } from 'react'
import type {
  CSSProperties,
  HTMLProps,
  JSX,
  ReactElement,
  ReactNode,
} from 'react'
import { clsx } from 'clsx'

// Components
import { useSpacing } from '../space/SpacingUtils'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import Icon from '../icon/Icon'
import type { IconAllProps, IconIcon } from '../icon/Icon'
import IconPrimary from '../icon-primary/IconPrimary'

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
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'

export type BadgeProps = {
  /**
   * The label description of the badge. Required when passing a number as the badge content, and for a `notification` badge without content.
   */
  label?: ReactNode

  /**
   * Custom `className` for the component.
   */
  className?: string

  /**
   * Applies loading skeleton.
   */
  skeleton?: SkeletonShow

  /**
   * Content to display the badge on top of.
   */
  children?: ReactNode

  /**
   * Content of the component. Without content, the `notification` variant is shown as a small dot, and requires a `label`.
   */
  content?: string | number | ReactNode

  /**
   * Vertical positioning of the component. Options: `bottom` | `top`.
   */
  vertical?: 'bottom' | 'top'

  /**
   * Horizontal positioning of the component. Options: `left` | `right`.
   */
  horizontal?: 'left' | 'right'

  /**
   * Defines the visual appearance of the badge. There are two main variants `notification` and `information`. The `content` variant is just for placement purposes, and will require you to style the `content` all by yourself. Default variant is `information`.
   */
  variant?: 'information' | 'notification' | 'content'

  /**
   * Defines the status color of the `"information"` variant. Has no effect on other variants. The status is only shown with color. A color change alone is not enough, so also name the status in the `content`. Defaults to `"default"`.
   */
  status?: 'default' | 'neutral' | 'positive' | 'warning' | 'negative'
  /**
   * Applies subtle style to `"information"` variant. Has no effect on other variants. Defaults to `false`.
   */
  subtle?: boolean
  /**
   * Icon shown before the `content` of the `"information"` variant. Primary Icons can be set as a string (e.g. `icon="calendar"`), other icons, a [CountryFlag](/web/components/country-flag) or a logo should be set as React elements. Has no effect on other variants.
   */
  icon?: IconIcon
  /**
   * Removes the badge without removing children. Useful when Badge wraps content. Defaults to `false`.
   */
  hideBadge?: boolean
}

export type BadgeAllProps = BadgeProps &
  SpacingProps &
  Omit<HTMLProps<HTMLElement>, 'content' | 'label'>

type BadgeElemProps = BadgeAllProps & { context: ContextProps }

export const badgeDefaultProps: BadgeAllProps = {
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
    badgeDefaultProps,
    context?.Badge,
    { skeleton: context?.skeleton }
  )
  const { children, className, content, horizontal, hideBadge, variant } =
    allProps

  const spacingProps = useSpacing(allProps, { className })

  if (children) {
    const buttonSide =
      variant === 'notification' &&
      !hideBadge &&
      !isEmptyContent(content) &&
      isButtonElement(children)
        ? horizontal
        : undefined

    return (
      <BadgeRoot
        {...spacingProps}
        buttonSide={buttonSide}
        content={content}
      >
        {children}
        <BadgeElem context={context} {...allProps} className={className} />
      </BadgeRoot>
    )
  }

  return <BadgeElem context={context} {...allProps} {...spacingProps} />
}

function BadgeRoot({
  children,
  className,
  style,
  buttonSide,
  content,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  buttonSide?: BadgeProps['horizontal']
  content?: ReactNode
}) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const estimatedWidth = buttonSide
    ? estimateBadgeWidth(content)
    : undefined

  // Replace the estimate with the rendered width, which depends on fonts and custom styles
  useIsomorphicLayoutEffect(() => {
    if (!buttonSide) {
      return undefined // stop here
    }

    const root = rootRef.current
    const badge = root.querySelector<HTMLElement>(':scope > .dnb-badge')
    const updateWidth = () => {
      root.style.setProperty('--badge-width', `${badge.offsetWidth}px`)
    }
    updateWidth()

    if (typeof ResizeObserver === 'undefined') {
      return undefined // stop here
    }

    const observer = new ResizeObserver(updateWidth)
    observer.observe(badge)
    return () => observer.disconnect()
  }, [buttonSide, estimatedWidth])

  return (
    <span
      ref={rootRef}
      className={clsx(
        'dnb-badge__root',
        buttonSide && `dnb-badge__root--button-${buttonSide}`,
        className
      )}
      style={
        estimatedWidth
          ? ({
              ...style,
              '--badge-width': estimatedWidth,
            } as CSSProperties)
          : style
      }
    >
      {children}
    </span>
  )
}

function isEmptyContent(content: ReactNode) {
  return content === undefined || content === null || content === ''
}

function isButtonElement(element: ReactNode) {
  return (
    isValidElement(element) &&
    Boolean((element.type as ComponentMarkers)?._isButton)
  )
}

// Roughly the width of the notification badge, so prerendered buttons reserve space
function estimateBadgeWidth(content: ReactNode) {
  let characters: number
  let separators = 0

  if (typeof content === 'number') {
    characters = String(Math.round(Math.abs(content))).length
    separators = Math.floor((characters - 1) / 3)
  } else if (typeof content === 'string') {
    characters = content.length
  } else {
    return undefined // stop here
  }

  const em = (characters * 6 + separators * 3) / 10
  return `max(1.5rem, calc(${em} * var(--font-size-x-small) + 0.5rem))`
}

/** Ensures props that only affect certain variants are reset to default */
function propGuard(
  fn: (props: BadgeElemProps) => JSX.Element | null
): (props: BadgeElemProps) => JSX.Element | null {
  return (props) => {
    if (props.variant !== 'information') {
      return fn({
        ...props,
        subtle: badgeDefaultProps.subtle,
        status: badgeDefaultProps.status,
        icon: undefined,
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
    icon,
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
  const isIndicator = variantIsNotification && isEmptyContent(content)

  if (!label && contentIsNum) {
    warn(
      `Label required: A Badge with a number as content requires a label describing the content of the badge. This is to ensure correct semantics and accessibility.`
    )
  }

  if (!label && isIndicator) {
    warn(
      `Label required: A notification Badge without content requires a label describing what it indicates. This is to ensure correct semantics and accessibility.`
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
        isIndicator && 'dnb-badge--indicator',
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
      {icon && <BadgeIcon icon={icon} skeleton={skeleton} />}
      {variant === 'information' &&
      content &&
      typeof content !== 'string' &&
      typeof content !== 'number' ? (
        // Flex items would drop the spaces at the edges of text nodes
        <span className="dnb-badge__content">{content}</span>
      ) : (
        content
      )}
    </span>
  )
})

function BadgeIcon({
  icon,
  skeleton,
}: {
  icon: IconIcon
  skeleton: SkeletonShow
}) {
  if (isIconElement(icon)) {
    return cloneElement(icon, {
      className: clsx('dnb-badge__icon', icon.props.className),
      skeleton: icon.props.skeleton ?? skeleton,
    })
  }

  return (
    <IconPrimary
      icon={icon}
      className="dnb-badge__icon"
      skeleton={skeleton}
    />
  )
}

function isIconElement(
  element: unknown
): element is ReactElement<IconAllProps> {
  return (
    isValidElement(element) &&
    (element.type === Icon || element.type === IconPrimary)
  )
}

withComponentMarkers(Badge, {
  _supportsSpacingProps: true,
})

export default Badge

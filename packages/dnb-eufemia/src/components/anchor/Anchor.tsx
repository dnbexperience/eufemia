/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import type { ElementProps } from '../../elements/Element';
import E from '../../elements/Element'
import Context from '../../shared/Context'
import {
  makeUniqueId,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { getOffsetTop } from '../../shared/helpers'
import IconPrimary from '../icon-primary/IconPrimary'
import Tooltip from '../tooltip/Tooltip'
import { launch as launchIcon } from '../../icons'
import type { IconIcon } from '../icon/Icon'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { DynamicElement, SpacingProps } from '../../shared/types'

// Local type for react-router-dom link with only the necessary props. Done this way to prevent react-router-dom dependency.
type ReactRouterLink = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  to: string | { pathname?: string; search?: string; has?: string }
}

export type AnchorProps = {
  element?:
    | DynamicElement<HTMLAnchorElement | AnchorAllProps>
    | React.ForwardRefExoticComponent<
        ReactRouterLink & React.RefAttributes<HTMLAnchorElement>
      >
  href?: string
  to?: string
  targetBlankTitle?: string
  target?: string
  tooltip?: React.ReactNode
  icon?: IconIcon
  iconPosition?: 'left' | 'right'
  skeleton?: SkeletonShow
  omitClass?: boolean
  innerRef?: React.RefObject<HTMLAnchorElement>

  /**
   * Removes default animation.
   * Default: `false`
   */
  noAnimation?: boolean
  /**
   * Removes default styling.
   * Default: `false`
   */
  noStyle?: boolean
  /**
   * Removes default hover style.
   * Default: `false`
   */
  noHover?: boolean
  /**
   * Removes underline.
   * Default: `false`
   */
  noUnderline?: boolean
  /**
   * Removes Icon.
   * Default: `false`
   */
  noIcon?: boolean
  /**
   * Removes Launch Icon.
   * Default: `false`
   */
  noLaunchIcon?: boolean
}

export type AnchorAllProps = AnchorProps &
  Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'> &
  SpacingProps

const defaultProps: AnchorProps = {
  noAnimation: false,
  noStyle: false,
  noHover: false,
  noUnderline: false,
  noIcon: false,
  noLaunchIcon: false,
}

export function AnchorInstance(localProps: AnchorAllProps) {
  const context = React.useContext(Context)
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context?.getTranslation(localProps as AnchorAllProps).Anchor,
    context?.Anchor
  )

  if (!allProps.innerRef) {
    allProps.innerRef = React.createRef()
  }

  const {
    id,
    element,
    className,
    children,
    tooltip,
    icon,
    iconPosition = 'left',
    omitClass,
    innerRef,
    targetBlankTitle,
    noAnimation,
    noHover,
    noStyle,
    noUnderline,
    noIcon,
    noLaunchIcon,
    ...rest
  } = allProps

  const attributes = rest as ElementProps
  const internalId = id || 'id' + makeUniqueId()
  const as = element || 'a'

  const href = allProps.href || allProps.to
  const _opensNewTab = opensNewTab(allProps.target, href)
  const showLaunchIcon =
    _opensNewTab &&
    !noIcon &&
    !noLaunchIcon &&
    !className?.includes('dnb-anchor--no-icon') &&
    !className?.includes('dnb-anchor--no-launch-icon') &&
    !omitClass
  const showTooltip = (tooltip || _opensNewTab) && !allProps.title

  const iconNode = icon && getIcon(icon)

  const suffix =
    (iconPosition === 'right' && iconNode) ||
    (showLaunchIcon && (
      <IconPrimary className="dnb-anchor__launch-icon" icon={launchIcon} />
    ))

  const prefix = iconPosition === 'left' && iconNode

  return (
    <>
      <E
        as={as}
        id={id}
        internalClass={as !== 'button'}
        className={classnames(
          omitClass !== true &&
            classnames(
              'dnb-anchor',
              prefix && 'dnb-anchor--icon-left',
              suffix && 'dnb-anchor--icon-right',
              typeof children !== 'string' && 'dnb-anchor--was-node',
              noAnimation && 'dnb-anchor--no-animation',
              noHover && 'dnb-anchor--no-hover',
              noStyle && 'dnb-anchor--no-style',
              noUnderline && 'dnb-anchor--no-underline',
              noIcon &&
                !className?.includes('dnb-anchor--no-icon') &&
                'dnb-anchor--no-icon',
              noLaunchIcon &&
                !className?.includes('dnb-anchor--no-launch-icon') &&
                'dnb-anchor--no-launch-icon'
            ),
          className
        )}
        {...attributes}
        innerRef={innerRef}
      >
        {prefix}
        {children}
        {suffix}
      </E>

      {showTooltip && (
        <Tooltip
          showDelay={100}
          id={internalId + '-tooltip'}
          targetElement={innerRef}
          tooltip={tooltip}
        >
          {allProps.title || targetBlankTitle}
        </Tooltip>
      )}
    </>
  )
}

const Anchor = React.forwardRef(
  (props: AnchorAllProps, ref: React.RefObject<HTMLAnchorElement>) => {
    return <AnchorInstance innerRef={ref} {...props} />
  }
)

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error - Adding custom property to component for spacing detection
Anchor._supportsSpacingProps = true

export default Anchor

export function scrollToHash(hash: string) {
  if (typeof document === 'undefined' || !hash || !hash.includes('#')) {
    return // stop here
  }

  // Only continue, when we are sure we are on the same page,
  // because, the same ID may exists occasionally on the current page.
  const id = hash.split(/#/g).reverse()[0]
  const anchorElem = document.getElementById(id)

  if (anchorElem instanceof HTMLElement) {
    try {
      const scrollPadding = parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop
      )
      const top = getOffsetTop(anchorElem) - scrollPadding || 0

      window.scroll({ top })

      return { element: anchorElem }
    } catch (error) {
      console.error(error)
    }
  }
}

function getIcon(icon) {
  return pickIcon(icon) || <IconPrimary icon={icon} />
}

export function pickIcon(icon, className?: string) {
  return icon?.props?.icon || icon?.props?.className?.includes('dnb-icon')
    ? React.cloneElement(icon, {
        key: 'button-icon-clone',
        className: classnames(icon.props?.className, className),
      })
    : null
}

export const opensNewTab = (target: string, href: string): boolean =>
  target === '_blank' && !/^(mailto|tel|sms)/.test(href)

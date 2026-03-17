/**
 * HTML Element
 *
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React from 'react'
import clsx from 'clsx'
import type { ElementAllProps } from '../../elements/Element'
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
    | React.ComponentType<
        ReactRouterLink & { ref?: React.Ref<HTMLAnchorElement> }
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
  ref?: React.Ref<HTMLAnchorElement>

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
  /**
   * Disables the Anchor element.
   * Default: `false`
   */
  disabled?: boolean
  /**
   * Changes component style based on background.
   * Default: `undefined`
   */
  surface?: 'dark'
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
  disabled: false,
}

export function AnchorInstance(localProps: AnchorAllProps) {
  const context = React.useContext(Context)
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton, surface: context?.theme?.surface },
    context?.getTranslation(localProps as AnchorAllProps).Anchor,
    context?.Anchor
  )

  const fallbackRef = React.useRef<HTMLAnchorElement>(null)

  if (!allProps.ref) {
    allProps.ref = fallbackRef
  }

  const tooltipRef = React.useRef<HTMLAnchorElement | null>(null)

  const {
    id,
    element,
    className,
    children,
    tooltip,
    icon,
    iconPosition = 'left',
    omitClass,
    ref: refProp,
    targetBlankTitle,
    noAnimation,
    noHover,
    noStyle,
    noUnderline,
    noIcon,
    noLaunchIcon,
    disabled,
    surface,
    ...rest
  } = allProps

  const attributes = rest as ElementAllProps & { to: string | undefined }
  const internalId = id || 'id' + makeUniqueId()
  const as = element || 'a'
  const isDisabled = disabled
  const hasNoHover = noHover || isDisabled
  const hasNoAnimation = noAnimation || isDisabled
  const hasNoUnderline = noUnderline || isDisabled

  const href = allProps.href || allProps.to
  const _opensNewTab = opensNewTab(allProps.target, href)
  const showLaunchIcon =
    _opensNewTab &&
    !isDisabled &&
    !noIcon &&
    !noLaunchIcon &&
    !className?.includes('dnb-anchor--no-icon') &&
    !className?.includes('dnb-anchor--no-launch-icon') &&
    !omitClass
  const showTooltip = (tooltip || _opensNewTab) && !allProps.title

  // Security: Add rel="noopener noreferrer" to prevent reverse tabnabbing when opening in new tab
  if (_opensNewTab && !attributes.rel) {
    attributes.rel = 'noopener noreferrer'
  }

  const iconNode = icon && getIcon(icon)

  const suffix =
    (iconPosition === 'right' && iconNode) ||
    (showLaunchIcon && (
      <IconPrimary className="dnb-anchor__launch-icon" icon={launchIcon} />
    ))

  const prefix = iconPosition === 'left' && iconNode

  const anchorRef = React.useCallback(
    (elem: HTMLAnchorElement | null) => {
      tooltipRef.current = elem

      if (typeof refProp === 'function') {
        refProp(elem)
      } else if (refProp) {
        ;(refProp as React.RefObject<HTMLAnchorElement | null>).current =
          elem
      }
    },
    [refProp]
  )

  if (isDisabled) {
    attributes.disabled = true

    if (as === 'a') {
      attributes.tabIndex = -1
      attributes['aria-disabled'] = true

      if (attributes.href) {
        delete attributes.href
      }
      if (attributes.to) {
        delete attributes.to
      }

      attributes.onClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
      }
    }
  }

  return (
    <>
      <E
        as={as}
        id={id}
        internalClass={as !== 'button'}
        className={clsx(
          omitClass !== true &&
            clsx(
              'dnb-anchor',
              prefix && 'dnb-anchor--icon-left',
              suffix && 'dnb-anchor--icon-right',
              typeof children !== 'string' && 'dnb-anchor--was-node',
              hasNoAnimation && 'dnb-anchor--no-animation',
              hasNoHover && 'dnb-anchor--no-hover',
              noStyle && 'dnb-anchor--no-style',
              hasNoUnderline && 'dnb-anchor--no-underline',
              isDisabled && 'dnb-anchor--disabled',
              noIcon &&
                !className?.includes('dnb-anchor--no-icon') &&
                'dnb-anchor--no-icon',
              noLaunchIcon &&
                !className?.includes('dnb-anchor--no-launch-icon') &&
                'dnb-anchor--no-launch-icon',
              surface === 'dark' && 'dnb-anchor--surface-dark'
            ),
          className
        )}
        {...attributes}
        ref={anchorRef}
      >
        {prefix}
        {children}
        {suffix}
      </E>

      {showTooltip && (
        <Tooltip
          showDelay={100}
          id={internalId + '-tooltip'}
          targetElement={tooltipRef}
          tooltip={tooltip}
        >
          {allProps.title || targetBlankTitle}
        </Tooltip>
      )}
    </>
  )
}

function Anchor(props: AnchorAllProps) {
  return <AnchorInstance {...props} />
}

withComponentMarkers(Anchor, {
  _supportsSpacingProps: true,
})

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
  if (icon?.props?.icon || icon?.props?.className?.includes('dnb-icon')) {
    return React.createElement(icon.type, {
      ...icon.props,
      key: 'button-icon-clone',
      className: clsx(icon.props?.className, className),
    })
  }

  return null
}

export const opensNewTab = (target: string, href: string): boolean =>
  target === '_blank' && !/^(mailto|tel|sms)/.test(href)

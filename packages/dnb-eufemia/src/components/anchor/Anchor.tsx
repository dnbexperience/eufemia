/**
 * HTML Element
 *
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { createElement, useCallback, useContext, useRef } from 'react'
import type {
  AnchorHTMLAttributes,
  ComponentType,
  HTMLProps,
  ReactNode,
  Ref,
  RefObject,
} from 'react'
import { clsx } from 'clsx'
import type { ElementAllProps } from '../../elements/Element'
import E from '../../elements/Element'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import { getOffsetTop } from '../../shared/helpers'
import IconPrimary from '../icon-primary/IconPrimary'
import Tooltip from '../tooltip/Tooltip'
import { launch as LaunchIcon } from '../../icons'
import type { IconIcon } from '../icon/Icon'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { DynamicElement, SpacingProps } from '../../shared/types'

// Local type for react-router-dom link with only the necessary props. Done this way to prevent react-router-dom dependency.
type ReactRouterLink = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  to: string | { pathname?: string; search?: string; has?: string }
}

export type AnchorProps = {
  element?:
    | DynamicElement<HTMLAnchorElement | AnchorAllProps>
    | ComponentType<ReactRouterLink & { ref?: Ref<HTMLAnchorElement> }>
  href?: string
  to?: string
  targetBlankTitle?: string
  target?: string
  tooltip?: ReactNode
  icon?: IconIcon
  iconPosition?: 'left' | 'right'
  skeleton?: SkeletonShow
  omitClass?: boolean
  ref?: Ref<HTMLAnchorElement>

  /**
   * Removes animations if set to `true`. Defaults to `false`.
   */
  noAnimation?: boolean
  /**
   * Removes styling if set to `true`. Defaults to `false`.
   */
  noStyle?: boolean
  /**
   * Removes hover effects if set to `true`. Defaults to `false`.
   */
  noHover?: boolean
  /**
   * Removes underline if set to `true`. Defaults to `false`.
   */
  noUnderline?: boolean
  /**
   * Removes icons if set to `true`. Defaults to `false`.
   */
  noIcon?: boolean
  /**
   * Removes launch icon if set to `true`. Defaults to `false`.
   */
  noLaunchIcon?: boolean
  /**
   * Disables the Anchor (no navigation, no hover). Keep a short reason nearby (e.g. using the `tooltip` property).
   */
  disabled?: boolean
}

export type AnchorAllProps = AnchorProps &
  Omit<HTMLProps<HTMLAnchorElement>, 'ref'> &
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
  const context = useContext(Context)
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context?.getTranslation(localProps as AnchorAllProps).Anchor,
    context?.Anchor
  )

  const fallbackRef = useRef<HTMLAnchorElement>(null)

  if (!allProps.ref) {
    allProps.ref = fallbackRef
  }

  const tooltipRef = useRef<HTMLAnchorElement | null>(null)

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
    ...rest
  } = allProps

  const attributes = rest as ElementAllProps & { to: string | undefined }
  const internalId = useId(id)
  const as = element || 'a'
  const isDisabled = disabled
  const hasNoHover = noHover || isDisabled
  const hasNoAnimation = noAnimation || isDisabled
  const hasNoUnderline = noUnderline || isDisabled

  // Security: drop javascript:/vbscript: URLs, which can execute script on
  // click and have no legitimate navigation use. This protects consumers that
  // pass untrusted input to the href/to props.
  if (isDangerousHref(attributes.href)) {
    delete attributes.href
  }
  if (isDangerousHref(attributes.to)) {
    delete attributes.to
  }

  const href = attributes.href || (attributes.to as string)
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
      <IconPrimary className="dnb-anchor__launch-icon" icon={LaunchIcon} />
    ))

  const prefix = iconPosition === 'left' && iconNode

  const anchorRef = useCallback(
    (elem: HTMLAnchorElement | null) => {
      tooltipRef.current = elem

      if (typeof refProp === 'function') {
        refProp(elem)
      } else if (refProp) {
        ;(refProp as RefObject<HTMLAnchorElement | null>).current = elem
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
              context?.theme?.surface === 'dark' &&
                'dnb-anchor--surface-dark'
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
    return undefined // stop here
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
      console.error('Anchor: Failed to scroll to element:', error)
    }
  }
  return undefined
}

function getIcon(icon) {
  return pickIcon(icon) || <IconPrimary icon={icon} />
}

export function pickIcon(icon, className?: string) {
  if (icon?.props?.icon || icon?.props?.className?.includes('dnb-icon')) {
    return createElement(icon.type, {
      ...icon.props,
      key: 'button-icon-clone',
      className: clsx(icon.props?.className, className),
    })
  }

  return null
}

export const opensNewTab = (target: string, href: string): boolean =>
  target === '_blank' && !/^(mailto|tel|sms)/.test(href)

/**
 * Returns true when the given href uses a script-executing protocol
 * (`javascript:` or `vbscript:`). Browsers ignore leading control characters
 * and whitespace (including tabs and newlines) when resolving the scheme, so
 * those are stripped before testing to catch obfuscated values such as
 * `java\tscript:alert(1)`.
 */
export function isDangerousHref(href: unknown): boolean {
  if (typeof href !== 'string') {
    return false
  }

  // Remove characters that browsers ignore when resolving a URL scheme
  // (C0 controls, space, DEL and C1 controls) so obfuscated values such as
  // "java\tscript:" are still detected.
  let normalized = ''
  for (const char of href) {
    const code = char.charCodeAt(0)
    if (code > 0x20 && code !== 0x7f && !(code >= 0x80 && code <= 0xa0)) {
      normalized += char
    }
  }

  return /^(javascript|vbscript):/i.test(normalized)
}

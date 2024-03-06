/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps } from '../../elements/Element'
import { useTheme } from '../../shared'
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

export type AnchorProps = {
  element?: DynamicElement<HTMLAnchorElement | AnchorAllProps>
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

  /** @deprecated use innerRef instead */
  inner_ref?: React.RefObject<HTMLAnchorElement>
}

export type AnchorAllProps = AnchorProps &
  Omit<React.HTMLProps<HTMLAnchorElement>, 'ref'> &
  SpacingProps

const defaultProps = {}

export function AnchorInstance(localProps: AnchorAllProps) {
  const context = React.useContext(Context)
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    { skeleton: context?.skeleton },
    context?.getTranslation(localProps as AnchorAllProps).Anchor,
    context?.Anchor
  )

  // deprecated: inner_ref is still needed to support Button's usage of Anchor
  if (typeof allProps.inner_ref !== 'undefined') {
    allProps.innerRef = allProps.inner_ref
    delete allProps.inner_ref
  }

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
    ...rest
  } = allProps

  const theme = useTheme()
  const iconSpacer = theme?.isSbanken ? ' ' : ''
  const attributes = rest as ElementProps
  const internalId = id || 'id' + makeUniqueId()
  const as = element || 'a'

  let prefix: React.ReactNode
  let suffix: React.ReactNode

  const href = allProps.href || allProps.to
  const showLaunchIcon = opensNewTab(allProps.target, href)
  const showTooltip = (tooltip || showLaunchIcon) && !allProps.title

  // WCAG guide: https://www.w3.org/TR/WCAG20-TECHS/G201.html
  if (showLaunchIcon && !omitClass) {
    suffix = (
      <>
        {iconSpacer}
        <IconPrimary
          className="dnb-anchor__launch-icon"
          icon={launchIcon}
        />
      </>
    )
  }

  if (icon) {
    const iconNode = pickIcon(icon) || <IconPrimary icon={icon} />
    if (iconPosition === 'left') {
      prefix = (
        <>
          {iconNode}
          {iconSpacer}
        </>
      )
    } else if (iconPosition === 'right') {
      suffix = (
        <>
          {iconSpacer}
          {iconNode}
        </>
      )
    }
  }

  return (
    <>
      <E
        as={as}
        id={id}
        className={classnames(
          omitClass !== true &&
            classnames(
              'dnb-anchor',
              prefix && 'dnb-anchor--icon-left',
              suffix && 'dnb-anchor--icon-right',
              typeof children !== 'string' && 'dnb-anchor--was-node'
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
// @ts-ignore
Anchor._supportsSpacingProps = true

export default Anchor

export function scrollToHashHandler(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  const element = event.currentTarget as HTMLAnchorElement
  const href = element.getAttribute('href')

  if (typeof document === 'undefined' || !href.includes('#')) {
    return // stop here
  }

  /**
   * What happens here?
   * When `scroll-behavior: smooth;` in CSS is set,
   * Blink/Chromium wants the user to click two times in order to actually scroll to the anchor hash.
   * The first click, sets the hash, the second one, scrolls to it.
   * We want Chromium browsers to scroll to the element on the first click.
   */
  const isSamePath =
    href.startsWith('#') ||
    window.location.href.includes(element.pathname?.replace(/\/$/, ''))

  // Only continue, when we are sure we are on the same page,
  // because, the same ID may exists occasionally on the current page.
  if (isSamePath) {
    const id = href.split(/#/g).reverse()[0]
    const anchorElem = document.getElementById(id)

    if (anchorElem instanceof HTMLElement) {
      try {
        const scrollPadding = parseFloat(
          window.getComputedStyle(document.documentElement)
            .scrollPaddingTop
        )
        const top = getOffsetTop(anchorElem) - scrollPadding || 0

        window.scroll({ top })

        return { element: anchorElem }
      } catch (error) {
        console.error(error)
      }
    }
  }
}

export function pickIcon(icon) {
  return icon?.props?.icon || icon?.props?.className?.includes('dnb-icon')
    ? React.cloneElement(icon, {
        key: 'button-icon-clone',
        className: classnames(icon.props?.className, 'dnb-button__icon'),
      })
    : null
}

export const opensNewTab = (target: string, href: string): boolean =>
  target === '_blank' && !/^(mailto|tel|sms)/.test(href)

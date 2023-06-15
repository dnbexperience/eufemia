/**
 * HTML Element
 *
 */

import React from 'react'
import classnames from 'classnames'
import E, { ElementProps, ElementIsType } from '../../elements/Element'
import Context from '../../shared/Context'
import {
  makeUniqueId,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { getOffsetTop } from '../../shared/helpers'
import IconPrimary from '../icon-primary/IconPrimary'
import Tooltip from '../tooltip/Tooltip'
import type { IconIcon } from '../icon/Icon'
import type { SkeletonShow } from '../skeleton/Skeleton'
import type { SpacingProps } from '../../shared/types'

export type AnchorProps = {
  element?: ElementIsType
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

  const attributes = rest as ElementProps

  const internalId = id || 'id' + makeUniqueId()

  // WCAG guide: https://www.w3.org/TR/WCAG20-TECHS/G201.html
  const showTooltip =
    tooltip || (allProps.target === '_blank' && !allProps.title)

  const as = (element || 'a') as string

  let prefix
  let suffix
  if (icon) {
    const iconNode =
      typeof icon === 'string' ? <IconPrimary icon={icon} /> : icon
    if (iconPosition === 'left') {
      prefix = <>{iconNode} </>
    } else if (iconPosition === 'right') {
      suffix = <> {iconNode}</>
    }
  }

  return (
    <>
      <E
        as={as}
        id={id}
        className={classnames(
          omitClass !== true && 'dnb-anchor',
          className,

          // because we then don't want to distract the link out
          // we make sure we hide the icon
          allProps.target === '_blank' &&
            (typeof children !== 'string' || suffix) &&
            'dnb-anchor--no-icon',
          typeof children !== 'string' && 'dnb-anchor--has-icon',
          prefix && 'dnb-anchor--icon-left',
          suffix && 'dnb-anchor--icon-right'
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

export default Anchor

export function scrollToHashHandler(
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  const element = e.currentTarget as HTMLAnchorElement
  const href = element.getAttribute('href')

  if (typeof document === 'undefined' || !href.includes('#')) {
    return // stop here
  }

  /**
   * What happens here?
   * When `scroll-behavior: smooth;` in CSS is set,
   * Blink/Chromium wants the user to click two times in order to actually scroll to the anchor hash.
   * The first click, sets the hash, the second one, srollts to it.
   * We want Chromium browsers to scorll to the element on the first click.
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
      e.preventDefault()

      const scrollPadding = parseFloat(
        window.getComputedStyle(document.documentElement).scrollPaddingTop
      )
      const top = getOffsetTop(anchorElem) - scrollPadding || 0

      window.scroll({ top })
    }
  }
}

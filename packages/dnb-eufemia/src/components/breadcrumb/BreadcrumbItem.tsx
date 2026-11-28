import { useContext, useRef } from 'react'
import { clsx } from 'clsx'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import Icon from '../icon/Icon'
import chevronRight from '../../icons/chevron_right'
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

// Components
import type { ButtonProps } from '../Button'
import type { AnchorAllProps } from '../Anchor'
import Anchor from '../Anchor'
import IconPrimary from '../icon-primary/IconPrimary'
import type { DataAttributes } from '../../shared/types'
import type { IconIcon } from '../icon/Icon'

// Elements
import P from '../../elements/P'

// Icons
import homeIcon from '../../icons/home'

// Shared
import Context from '../../shared/Context'
import type { SkeletonShow } from '../skeleton/Skeleton'
import { extendPropsWithContext } from '../../shared/component-helper'
import BreadcrumbItemContext from './BreadcrumbItemContext'

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type BreadcrumbItemProps = {
  /**
   * Text displaying the title of the item's corresponding page
   * Defaults to `Home` when variant is `home`, otherwise required.
   */
  text?: ReactNode

  /**
   * The icon shown before the item text. Keep the default navigation icons for consistency. Overrides need a use case approved by DNB UX. Non-home items use `chevron_right` by default; `variant="home"` always uses the home icon.
   */
  icon?: IconIcon

  /**
   * Href should be the link to the item's corresponding page.
   * Default: `null`
   */
  href?: string

  /**
   * Set a custom click event. In this case, you should not define the prop href.
   * Default: `null`
   */
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>

  /**
   * The component variant. Variant 'current' should correspond to the current page and 'home' to the root page.
   * Default: `null`
   */
  variant?: 'home' | 'previous' | 'current'

  /**
   * Skeleton should be applied when loading content
   * Default: `null`
   */
  skeleton?: SkeletonShow

  /** Internal */
  itemNo?: number
} & (AnchorAllProps & Omit<ButtonProps, 'variant'>) &
  DataAttributes

const navigationIcon = Icon.transition({
  previous: chevronRight,
  home: homeIcon,
})

const determineIcon = (variant: string) => {
  switch (variant) {
    case 'home':
      return 'home-icon'
    case 'single':
      return 'chevron_left'
    default:
      return 'chevron_right'
  }
}

const BreadcrumbItem = (localProps: BreadcrumbItemProps) => {
  // Every component should have a context
  const context = useContext(Context)
  const breadcrumbItemContext = useContext(BreadcrumbItemContext)
  const {
    translation: {
      Breadcrumb: { homeText },
    },
  } = context

  // Extract additional props from global context
  const {
    text,
    href,
    icon,
    onClick,
    variant,
    skeleton,
    itemNo: itemNoProp,
    ...props
  } = extendPropsWithContext(localProps, {}, context?.BreadcrumbItem)

  const itemNo = itemNoProp ?? breadcrumbItemContext?.itemNo
  const { animate, motion } = breadcrumbItemContext ?? {}
  const exiting = motion === 'exit'
  const ref = useRef<HTMLLIElement>(null)
  const animation = useRef<Animation>(undefined)

  const currentIcon = icon ?? determineIcon(variant)

  const currentText = text || (variant === 'home' && homeText) || ''
  const isInteractive =
    (href || onClick || props.to) && variant !== 'current'
  const style = { '--delay': String(itemNo) } as CSSProperties

  const iconToUse =
    variant === 'home' || currentIcon === 'home-icon'
      ? homeIcon
      : currentIcon

  useLayoutEffect(() => {
    if (!animate || !ref.current) {
      return
    }

    const item = ref.current
    if (!motion) {
      animation.current?.cancel()
      animation.current = undefined
      item.style.removeProperty('--breadcrumb-text-width')
      return
    }

    if (!animation.current) {
      const text = item.querySelector(
        ':scope > .dnb-anchor, :scope > .dnb-p'
      )
      if (text) {
        // Keep wrapping stable while the item changes width.
        item.style.setProperty(
          '--breadcrumb-text-width',
          text.getBoundingClientRect().width + 'px'
        )
      }
    }

    const computed = getComputedStyle(item)
    const expanded = {
      maxWidth: item.scrollWidth + 'px',
      marginRight: '0px',
      opacity: '1',
      transform: 'none',
    }
    const collapsed = {
      maxWidth: '0px',
      marginRight: '-0.5rem',
      opacity: '0',
      transform: 'translateX(-0.25rem)',
    }
    const from = animation.current
      ? {
          maxWidth: computed.maxWidth,
          marginRight: computed.marginRight,
          opacity: computed.opacity,
          transform: computed.transform,
        }
      : exiting
        ? expanded
        : collapsed
    animation.current?.cancel()
    animation.current = item.animate?.(
      [from, exiting ? collapsed : expanded],
      {
        duration: 180,
        easing:
          computed.getPropertyValue('--easing-default').trim() || 'ease',
        fill: 'both',
      }
    )
  }, [animate, motion, exiting, isInteractive, currentText])

  useLayoutEffect(
    () => () => {
      animation.current?.cancel()
      animation.current = undefined
    },
    []
  )

  return (
    <li
      ref={ref}
      className={clsx(
        'dnb-breadcrumb__item',
        animate && 'dnb-breadcrumb__item--animated',
        motion && 'dnb-breadcrumb__item--' + motion
      )}
      inert={exiting || undefined}
      aria-hidden={exiting || undefined}
      aria-current={!exiting && variant === 'current' ? 'page' : undefined}
      style={style}
    >
      {animate ? (
        <>
          <IconPrimary
            icon={!icon || variant === 'home' ? navigationIcon : iconToUse}
            transitionState={variant === 'home' ? 'home' : 'previous'}
            className={clsx(
              'dnb-breadcrumb__item__span__icon',
              variant === 'home' &&
                isInteractive &&
                'dnb-breadcrumb__item__home-icon'
            )}
          />
          {isInteractive ? (
            <Anchor
              href={href}
              onClick={onClick}
              skeleton={skeleton}
              {...props}
            >
              {currentText}
            </Anchor>
          ) : (
            <P space="0">{currentText}</P>
          )}
        </>
      ) : isInteractive ? (
        <>
          {variant !== 'home' && (
            <IconPrimary
              icon={iconToUse}
              className="dnb-breadcrumb__item__span__icon"
            />
          )}
          <Anchor
            href={href}
            onClick={onClick}
            icon={variant === 'home' ? iconToUse : null}
            skeleton={skeleton}
            {...props}
          >
            {currentText}
          </Anchor>
        </>
      ) : (
        <span className="dnb-breadcrumb__item__span">
          <IconPrimary
            icon={iconToUse}
            className="dnb-breadcrumb__item__span__icon"
          />
          <P space="0">{currentText}</P>
        </span>
      )}
    </li>
  )
}

withComponentMarkers(BreadcrumbItem, {
  _supportsSpacingProps: true,
})

export default BreadcrumbItem

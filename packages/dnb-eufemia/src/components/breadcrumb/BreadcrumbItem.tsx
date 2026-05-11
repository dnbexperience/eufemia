import { useContext, useState } from 'react'
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
import { useMediaQuery } from '../../shared'
import Context from '../../shared/Context'
import type { SkeletonShow } from '../skeleton/Skeleton'
import { extendPropsWithContext } from '../../shared/component-helper'
import BreadcrumbItemContext from './BreadcrumbItemContext'

import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type BreadcrumbItemProps = {
  /**
   * Text displaying the title of the item's corresponding page
   * Defaults to `Home` when variant is `home`, otherwise required.
   */
  text?: ReactNode

  /**
   * Icon displaying on the left side
   * Default: `HomeIcon / chevron_right`
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

const determineIcon = (variant: string, isSmallScreen: boolean) => {
  switch (variant) {
    case 'home':
      return 'home-icon'
    case 'single':
    case 'collapse':
      return 'chevron_left'
    default:
      return isSmallScreen ? 'chevron_left' : 'chevron_right'
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

  const isSmallScreen = useMediaQuery({
    matchOnSSR: true,
    when: { max: 'medium' },
  })

  const [currentIcon, setCurrentIcon] = useState<IconIcon>('chevron_left')

  useLayoutEffect(() => {
    if (!icon) {
      setCurrentIcon(determineIcon(variant, isSmallScreen))
    } else {
      if (variant !== 'home') {
        setCurrentIcon(icon ?? 'chevron_left')
      }
    }
  }, [icon, isSmallScreen, variant])

  const currentText = text || (variant === 'home' && homeText) || ''
  const isInteractive =
    (href || onClick || props.to) && variant !== 'current'
  const style = { '--delay': String(itemNo) } as CSSProperties

  const iconToUse =
    variant === 'home' || currentIcon === 'home-icon'
      ? homeIcon
      : currentIcon

  return (
    <li
      className="dnb-breadcrumb__item"
      aria-current={variant === 'current' ? 'page' : undefined}
      style={style}
    >
      {isInteractive ? (
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

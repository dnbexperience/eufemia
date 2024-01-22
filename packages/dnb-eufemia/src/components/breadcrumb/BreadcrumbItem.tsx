import React from 'react'

// Components
import Button, { ButtonProps } from '../button/Button'
import IconPrimary from '../icon-primary/IconPrimary'
import type { IconIcon } from '../icon/Icon'

// Elements
import P from '../../elements/P'

// Icons
import homeIcon from '../../icons/home'

// Shared
import { useTheme, useMediaQuery } from '../../shared'
import Context from '../../shared/Context'
import type { SkeletonShow } from '../skeleton/Skeleton'
import {
  extendPropsWithContext,
  filterProps,
} from '../../shared/component-helper'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type BreadcrumbItemProps = {
  /**
   * Text displaying the title of the item's corresponding page
   * Default: If variant='home', default is "Home". Otherwise it is required.
   */
  text?: React.ReactNode

  /**
   * Icon displaying on the left side
   * Default: HomeIcon / chevron_left
   */
  icon?: IconIcon

  /**
   * Href should be the link to the item's corresponding page.
   * Default: null
   */
  href?: string

  /**
   * Set a custom click event. In this case, you should not define the prop href.
   * Default: null
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>

  /**
   * The component variant. Variant 'current' should correspond to the current page and 'home' to the root page.
   * Default: null
   */
  variant?: 'home' | 'previous' | 'current'

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow

  /** Internal */
  itemNr?: number
} & Omit<ButtonProps, 'variant'>

const defaultProps = {
  text: null,
  href: null,
  icon: null,
  onClick: null,
  variant: null,
  skeleton: null,
}

const determineSbankenIcon: IconIcon = (
  variant: string,
  isSmallScreen: boolean
) => {
  switch (variant) {
    case 'home':
      return homeIcon
    case 'single':
    case 'collapse':
      return 'chevron_left'
    default:
      return isSmallScreen ? 'chevron_left' : 'chevron_right'
  }
}

const BreadcrumbItem = (localProps: BreadcrumbItemProps) => {
  // Every component should have a context
  const context = React.useContext(Context)
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
    itemNr,
    ...props
  } = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.BreadcrumbItem
  )

  const theme = useTheme()
  const isSmallScreen = useMediaQuery({
    matchOnSSR: true,
    when: { max: 'medium' },
  })

  const [currentIcon, setCurrentIcon] = React.useState(null)

  useLayoutEffect(() => {
    if (!icon && theme?.name === 'sbanken') {
      const currentIcon = determineSbankenIcon(variant, isSmallScreen)
      setCurrentIcon(currentIcon)
    } else {
      setCurrentIcon(
        icon || (variant === 'home' && homeIcon) || 'chevron_left'
      )
    }
  }, [icon, isSmallScreen, theme?.name, variant])

  const currentText = text || (variant === 'home' && homeText) || ''
  const isInteractive =
    (href || onClick || props.to) && variant !== 'current'
  const style = { '--delay': String(itemNr) } as React.CSSProperties

  return (
    <li
      className="dnb-breadcrumb__item"
      aria-current={variant === 'current' ? 'page' : undefined}
      style={style}
    >
      {isInteractive ? (
        <Button
          variant="tertiary"
          href={href}
          icon={currentIcon}
          icon_position="left"
          on_click={onClick}
          text={currentText}
          skeleton={skeleton}
          {...props}
        />
      ) : (
        <span
          className="dnb-breadcrumb__item__span"
          // TODO: Consider deprecating passing down props to span in v11
          {...filterProps(props, (key) => !key.includes('-'))}
        >
          {currentIcon && (
            <IconPrimary
              icon={currentIcon}
              className="dnb-breadcrumb__item__span__icon"
            />
          )}
          <P space="0">{currentText}</P>
        </span>
      )}
    </li>
  )
}

BreadcrumbItem._supportsSpacingProps = true

export default BreadcrumbItem

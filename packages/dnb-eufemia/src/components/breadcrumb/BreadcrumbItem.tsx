import React from 'react'

// Components
import Button from '../button/Button'
import IconPrimary, { IconPrimaryIcon } from '../icon-primary/IconPrimary'

// Elements
import P from '../../elements/P'

// Icons
import homeIcon from '../../icons/home'

// Shared
import Context from '../../shared/Context'
import { SkeletonTypes } from '../../shared/interfaces'
import { usePropsWithContext } from '../../shared/hooks'

export interface BreadcrumbItemProps {
  /**
   * Text displaying the title of the item's corresponding page
   * Default: If variant='home', default is "Home". Otherwise it is required.
   */
  text?: React.ReactNode

  /**
   * Icon displaying on the left side
   * Default: HomeIcon / chevron_left
   */
  icon?: IconPrimaryIcon

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
  skeleton?: SkeletonTypes
}

const defaultProps = {
  text: null,
  href: null,
  icon: null,
  onClick: null,
  variant: null,
  skeleton: null,
}

export default function BreadcrumbItem(localProps: BreadcrumbItemProps) {
  // Every component should have a context
  const context = React.useContext(Context)
  const {
    translation: {
      Breadcrumb: { homeText },
    },
  } = context

  // Extract additional props from global context
  const { text, href, icon, onClick, variant, skeleton, ...props } =
    usePropsWithContext(localProps, defaultProps, context?.BreadcrumbItem)

  const currentIcon =
    icon || (variant === 'home' && homeIcon) || 'chevron_left'
  const currentText = text || (variant === 'home' && homeText) || ''
  const isInteractive = (href || onClick) && variant !== 'current'

  return (
    <li
      className="dnb-breadcrumb__item"
      data-testid="breadcrumb-item"
      aria-current={variant === 'current' ? 'page' : undefined}
    >
      {isInteractive ? (
        <Button
          variant="tertiary"
          href={href}
          icon={currentIcon}
          icon_position="left"
          icon_={currentIcon} // what does this do?
          on_click={onClick}
          text={currentText}
          skeleton={skeleton}
          {...props}
        />
      ) : (
        <span className="dnb-breadcrumb__item__span" {...props}>
          <IconPrimary
            icon={currentIcon}
            className="dnb-breadcrumb__item__span__icon"
          />
          <P left="0" data-testid="breadcrumb-item-text">
            {currentText}
          </P>
        </span>
      )}
    </li>
  )
}

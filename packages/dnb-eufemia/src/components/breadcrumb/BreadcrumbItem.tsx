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
import { extendPropsWithContext } from '../../shared/component-helper'

// Types
import type {
  BreadcrumbItemProps,
  BreadcrumbItemProviderProps,
} from './types'

export type { BreadcrumbItemProps } from './types'

const defaultProps = {
  text: null,
  href: null,
  icon: null,
  onClick: null,
  variant: null,
  skeleton: null,
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
  const { text, href, icon, onClick, variant, skeleton, ...props } =
    extendPropsWithContext(
      localProps,
      defaultProps,
      context?.BreadcrumbItem
    )

  const currentIcon: IconPrimaryIcon =
    icon || (variant === 'home' && homeIcon) || 'chevron_left'
  const currentText = text || (variant === 'home' && homeText) || ''
  const isInteractive = (href || onClick) && variant !== 'current'

  const elementRef = React.useRef()
  const style = useDelayStyle(elementRef)

  return (
    <li
      className="dnb-breadcrumb__item"
      data-testid="breadcrumb-item"
      aria-current={variant === 'current' ? 'page' : undefined}
      style={style}
      ref={elementRef}
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

export const BreadcrumbItemContext =
  React.createContext<BreadcrumbItemProviderProps>({
    memoRef: { current: { count: 0 } },
  })

export function BreadcrumbItemProvider({
  children,
  ...props
}: BreadcrumbItemProviderProps) {
  const memoRef = React.useRef({ count: 0 })

  return (
    <BreadcrumbItemContext.Provider value={{ memoRef, ...props }}>
      {children}
    </BreadcrumbItemContext.Provider>
  )
}

function useDelayStyle(elementRef: React.RefObject<HTMLSpanElement>) {
  const { memoRef, currentVariant } = React.useContext(
    BreadcrumbItemContext
  )
  const [style, setStyle] = React.useState<React.CSSProperties>(null)

  React.useLayoutEffect(() => {
    if (currentVariant === 'collapse') {
      const text = elementRef.current.textContent
      memoRef.current[text] = memoRef.current[text] || {
        count: memoRef.current.count++,
      }

      const style = {
        '--delay': String(memoRef.current[text].count),
      } as React.CSSProperties

      setStyle(style)
    }
  }, [elementRef, memoRef, currentVariant])

  return style
}

export default BreadcrumbItem

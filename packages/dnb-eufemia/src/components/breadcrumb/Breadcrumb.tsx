import React, { useEffect, useState } from 'react'
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem'
export * from './Breadcrumb'
import Context from '../../shared/Context'
import { ISpacingProps } from '../../shared/interfaces'
import classnames from 'classnames'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import { useMediaQuery, SkeletonTypes } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'

export interface BreadcrumbProps {
  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonTypes

  /**
   * Pass in a list of your pages as objects of breadcrumbitem to render them as breadcrumbitems.
   * Default: null
   */
  data?: BreadcrumbItemProps[]

  /**
   * The content of the component. Can be used instead of prop "data".
   * Default: null
   */
  children?: React.ReactNode // ReactNode allows multiple elements, strings, numbers, fragments, portals...

  /**
   * The variant of the component.
   * Default: When children and data is not defined, it defaults to "single". If they are defined, the variant depends on the viewport.
   */
  variant?: 'single' | 'multiple' | 'collapse'

  /**
   * Handle the click event on 'single'/'collapse'
   * Default: null
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>

  /**
   * For variant 'single', use href (or onClick) to set href when clicking "Back"
   * Default: null
   */
  href?: string

  /**
   * Add custom 'Back' text for variant 'single'
   * Default: 'Back' or defined by Context translation
   */
  goBackText?: React.ReactNode

  /**
   * Add custom 'Home' text
   * Default: 'Home' or defined by Context translation
   */
  homeText?: React.ReactNode

  /**
   * Add custom 'Back to...' text, for variant collapse
   * Default 'Back to...' or defined by Context translation
   */
  backToText?: React.ReactNode

  /**
   * If variant='collapse', you can override isCollapsed for the collapsed content by updating this value.
   * Default: null
   */
  isCollapsed?: boolean | string
}

export const defaultProps = {
  className: null,
  skeleton: false,
  children: null,
  variant: null,
  onClick: null,
  href: null,
  goBackText: 'Back',
  homeText: 'Home',
  backToText: 'Back to...',
  isCollapsed: true,
  data: null,
}

export default function Breadcrumb(
  localProps: BreadcrumbProps & ISpacingProps
) {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    className,
    skeleton,
    children,
    variant,
    onClick,
    goBackText, // has a translation in context
    homeText, // has a translation in context
    backToText, // has a translation in context
    isCollapsed: overrideIsCollapsed,
    data,
    href,
    ...props
  } = extendPropsWithContext(
    { ...defaultProps, ...localProps },
    defaultProps,
    context?.translation?.Breadcrumb,
    context?.Breadcrumb
  )
  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const [isCollapsed, setCollapse] = useState(true)
  const isSmallScreen = useMediaQuery({
    matchOnSSR: true,
    when: { max: 'medium' },
  })

  let currentVariant = variant
  if (variant === null) {
    if (children || data) {
      currentVariant = isSmallScreen ? 'collapse' : 'multiple'
    } else {
      currentVariant = 'single'
    }
  }

  useEffect(() => {
    setCollapse(overrideIsCollapsed)
  }, [overrideIsCollapsed])

  const MultipleCrumbs = () => (
    <>
      {data?.map((breadcrumbItem, i) => (
        <span key={`${breadcrumbItem.text}`}>
          <BreadcrumbItem
            variant={
              (i == 0 && 'home') ||
              (i == data.length - 1 && 'current') ||
              null
            }
            {...breadcrumbItem}
          />
        </span>
      ))}

      {children}
    </>
  )

  return (
    <nav
      className={classnames(skeletonClasses, spacingClasses, className)}
      {...props}
    >
      <ol className="dnb-breadcrumb" data-testid="breadcrumb">
        <span className="dnb-breadcrumb__bar">
          {currentVariant === 'single' && (
            <BreadcrumbItem
              text={goBackText}
              icon="chevron_left"
              onClick={onClick}
              href={href}
            />
          )}

          {currentVariant === 'multiple' && <MultipleCrumbs />}

          {currentVariant === 'collapse' && (
            <BreadcrumbItem
              text={backToText}
              icon="chevron_left"
              onClick={
                onClick ||
                (() => {
                  setCollapse(!isCollapsed)
                })
              }
            />
          )}
        </span>
        {currentVariant === 'collapse' && !isCollapsed && (
          <span
            className="dnb-breadcrumb__collapse"
            data-testid="breadcrumb-collapse"
          >
            <MultipleCrumbs />
          </span>
        )}
      </ol>
    </nav>
  )
}

Breadcrumb.Item = BreadcrumbItem

export { BreadcrumbItem, BreadcrumbItemProps }

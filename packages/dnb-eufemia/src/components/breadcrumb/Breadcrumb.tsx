import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

// Components
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Section, {
  SectionSpacing,
  SectionStyleTypes,
} from '../section/Section'
import Button from '../button/Button'

// Shared
import { useMediaQuery } from '../../shared'
import Context from '../../shared/Context'
import { SpacingProps } from '../../shared/types'
import { SkeletonShow } from '../skeleton/Skeleton'

// Internal
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem'
import {
  convertJsxToString,
  isTrue,
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { BreadcrumbMultiple } from './BreadcrumbMultiple'

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
  skeleton?: SkeletonShow

  /**
   * Pass in a list of your pages as objects of breadcrumbitem to render them as breadcrumbitems.
   * Default: null
   */
  data?: Array<BreadcrumbItemProps>

  /**
   * The content of the component. Can be used instead of prop "data".
   * Default: null
   */
  children?: Array<React.ReactElement<BreadcrumbItemProps>>

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
   * Every <nav> on a page needs an unique aria-label text
   * Default: Page hierarchy
   */
  navText?: React.ReactNode

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
  isCollapsed?: boolean

  /**
   * Use one of the Section component style types (style_type)
   * Default: transparent
   */
  styleType?: SectionStyleTypes

  /**
   * Use one of the Section component style types (style_type)
   * Default: pistachio
   */
  collapsedStyleType?: SectionStyleTypes

  /**
   * Include spacing properties from the Section component in breadcrumb. If only `true` is given, the spacing will be `small`.
   * Default: false
   */
  spacing?: SectionSpacing

  /**
   * Will disable the height animation
   * Default: false
   */
  noAnimation?: boolean
}

export const defaultProps = {
  skeleton: false,
  navText: 'Back',
  goBackText: 'Back',
  homeText: 'Home',
  backToText: 'Back to...',
  isCollapsed: true,
  styleType: 'transparent',
  collapsedStyleType: 'pistachio',
  spacing: false,
}

const Breadcrumb = (localProps: BreadcrumbProps & SpacingProps) => {
  // Every component should have a context
  const context = React.useContext(Context)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    defaultProps,
    context?.translation?.Breadcrumb,
    context?.Breadcrumb,
    { skeleton: context?.skeleton }
  )

  const {
    className,
    skeleton,
    children: items,
    variant,
    onClick,
    navText, // has a translation in context
    goBackText, // has a translation in context
    homeText, // eslint-disable-line
    backToText, // has a translation in context
    styleType,
    collapsedStyleType,
    isCollapsed: overrideIsCollapsed,
    spacing,
    noAnimation,
    data,
    href,
    ...props
  } = allProps
  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const [isCollapsed, setCollapse] = useState(overrideIsCollapsed)
  const isSmallScreen = useMediaQuery({
    matchOnSSR: true,
    when: { max: 'medium' },
  })

  let currentVariant = variant
  if (!variant) {
    if (items || data) {
      currentVariant = isSmallScreen ? 'collapse' : 'multiple'
    } else {
      currentVariant = 'single'
    }
  }

  useEffect(() => {
    setCollapse(overrideIsCollapsed)
  }, [overrideIsCollapsed])

  validateDOMAttributes(allProps, props)

  const innerSpacing = isTrue(spacing) ? 'small' : spacing

  return (
    <nav
      aria-label={convertJsxToString(navText)}
      className={classnames(
        'dnb-breadcrumb',
        skeletonClasses,
        spacingClasses,
        className
      )}
      data-testid="breadcrumb-nav"
      {...props}
    >
      <Section
        className="dnb-breadcrumb__bar"
        style_type={styleType || 'transparent'}
        spacing={isSmallScreen ? innerSpacing : false}
      >
        {currentVariant === 'collapse' && (
          <Button
            text={backToText}
            variant="tertiary"
            icon="chevron_left"
            icon_position="left"
            onClick={
              onClick ||
              (() => {
                setCollapse(!isCollapsed)
              })
            }
            aria-expanded={!isCollapsed}
          />
        )}

        {currentVariant === 'single' && (
          <Button
            text={goBackText}
            variant="tertiary"
            icon="chevron_left"
            icon_position="left"
            onClick={onClick}
            href={href}
          />
        )}

        {currentVariant === 'multiple' && (
          <BreadcrumbMultiple
            data={data}
            items={items}
            isCollapsed={false}
            noAnimation={noAnimation}
          />
        )}
      </Section>

      {currentVariant === 'collapse' && (
        <Section
          style_type={collapsedStyleType}
          className="dnb-breadcrumb__collapse"
        >
          <BreadcrumbMultiple
            data={data}
            items={items}
            isCollapsed={isCollapsed}
            noAnimation={noAnimation}
          />
        </Section>
      )}
    </nav>
  )
}

Breadcrumb.Item = BreadcrumbItem

export { BreadcrumbItem }

export default Breadcrumb

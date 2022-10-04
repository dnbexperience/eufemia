import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

// Components
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Section from '../section/Section'
import Button from '../button/Button'

// Shared
import { useMediaQuery } from '../../shared'
import Context from '../../shared/Context'

// Internal
import BreadcrumbItem, { BreadcrumbItemProvider } from './BreadcrumbItem'
import {
  convertJsxToString,
  isTrue,
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { BreadcrumbMultiple } from './BreadcrumbMultiple'

// Types
import type { SpacingProps } from '../../shared/types'
import type { BreadcrumbProps, CurrentVariant } from './types'

export type { BreadcrumbProps } from './types'

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

  let currentVariant: CurrentVariant = variant
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
    <BreadcrumbItemProvider currentVariant={currentVariant}>
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
          spacing={innerSpacing}
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
    </BreadcrumbItemProvider>
  )
}

Breadcrumb.Item = BreadcrumbItem

export { BreadcrumbItem }

export default Breadcrumb

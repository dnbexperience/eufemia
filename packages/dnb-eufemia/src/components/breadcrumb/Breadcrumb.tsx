import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import classnames from 'classnames'

// Components
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Section, {
  SectionSpacing,
  SectionStyleTypes,
  SectionVariants,
} from '../section/Section'
import Button from '../button/Button'

// Shared
import Context from '../../shared/Context'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../skeleton/Skeleton'

// Internal
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem'
import {
  convertJsxToString,
  isTrue,
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { BreadcrumbMultiple } from './BreadcrumbMultiple'
import { useMedia, useTheme } from '../../shared'

export type BreadcrumbProps = {
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
  children?:
    | React.ReactElement<BreadcrumbItemProps>
    | Array<React.ReactElement<BreadcrumbItemProps>>

  /**
   * The variant of the component.
   * Default: When children and data is not defined, it defaults to "single". "responsive" if they are defined.
   */
  variant?: 'responsive' | 'single' | 'multiple' | 'collapse'

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
   * Use one of the Section component variants
   * Default: info
   */
  collapsedStyleType?: SectionVariants

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
  /**
   * Will be called when breadcrumb expands or collapses.
   */
  onToggle?: (isCollapsed: boolean) => void
}

export const defaultProps = {
  skeleton: false,
  navText: 'Back',
  goBackText: 'Back',
  homeText: 'Home',
  backToText: 'Back to...',
  isCollapsed: true,
  styleType: 'transparent',
  collapsedStyleType: 'info',
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
    onToggle,
    ...props
  } = allProps
  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const [, forceUpdate] = useReducer(() => ({}), {})

  const isCollapsedRef = useRef(overrideIsCollapsed)

  const { isLarge } = useMedia()

  useEffect(() => {
    if (overrideIsCollapsed !== isCollapsedRef.current) {
      isCollapsedRef.current = overrideIsCollapsed
      forceUpdate()
    }
  }, [overrideIsCollapsed])

  // Auto-collapse breadcrumbs if going from small screen to large screen.
  useEffect(() => {
    if (isLarge && overrideIsCollapsed !== false) {
      // Call onToggle if breadcrumbs is expanded and is going to collapse due to large screen size.
      if (isCollapsedRef.current === false) {
        onToggle?.(true)
      }

      isCollapsedRef.current = true

      forceUpdate()
    }
  }, [isLarge, overrideIsCollapsed, onToggle])

  const onClickHandler = useCallback(() => {
    isCollapsedRef.current = !isCollapsedRef.current
    forceUpdate()

    onToggle?.(isCollapsedRef.current)
  }, [onToggle])

  const currentVariant = useMemo(() => {
    if (!variant) {
      if (items || data) {
        return 'responsive'
      } else {
        return 'single'
      }
    }

    return variant
  }, [data, items, variant])

  validateDOMAttributes(allProps, props)

  const innerSpace = isTrue(spacing) ? 'small' : spacing

  const overrideSbankenSectionColor =
    useTheme()?.isSbanken && collapsedStyleType === 'info'

  return (
    <nav
      aria-label={convertJsxToString(navText)}
      className={classnames(
        'dnb-breadcrumb',
        `dnb-breadcrumb--variant-${currentVariant}`,
        skeletonClasses,
        spacingClasses,
        className
      )}
      {...props}
    >
      <Section
        className="dnb-breadcrumb__bar"
        style_type={styleType || 'transparent'}
        innerSpace={innerSpace}
      >
        {currentVariant === 'single' ? (
          <Button
            text={goBackText}
            variant="tertiary"
            icon="chevron_left"
            icon_position="left"
            onClick={onClick}
            href={href}
          />
        ) : (
          <>
            {currentVariant !== 'multiple' && (
              <Button
                className="dnb-breadcrumb__toggle"
                text={backToText}
                variant="tertiary"
                icon="chevron_left"
                icon_position="left"
                onClick={onClick ?? onClickHandler}
                aria-expanded={!isCollapsedRef.current}
              />
            )}

            {currentVariant !== 'collapse' && (
              <BreadcrumbMultiple
                data={data}
                items={items}
                isCollapsed={false}
                noAnimation={noAnimation}
              />
            )}
          </>
        )}
      </Section>

      {(currentVariant === 'collapse' ||
        currentVariant === 'responsive') && (
        <Section
          variant={
            overrideSbankenSectionColor ? undefined : collapsedStyleType
          }
          className="dnb-breadcrumb__collapse"
          backgroundColor={
            overrideSbankenSectionColor
              ? 'var(--sb-color-gray-light-2)'
              : undefined
          }
        >
          <BreadcrumbMultiple
            data={data}
            items={items}
            isCollapsed={isCollapsedRef.current}
            noAnimation={noAnimation}
          />
        </Section>
      )}
    </nav>
  )
}

Breadcrumb.Item = BreadcrumbItem
Breadcrumb._supportsSpacingProps = true

export { BreadcrumbItem }
export default Breadcrumb

import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import clsx from 'clsx'

// Components
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import type {
  SectionSpacing,
  SectionBackgroundColor,
  SectionVariants,
} from '../section/Section'
import Section from '../section/Section'
import Button from '../button/Button'

// Shared
import Context from '../../shared/Context'
import type { SpacingProps } from '../../shared/types'
import type { SkeletonShow } from '../skeleton/Skeleton'

// Internal
import type { BreadcrumbItemProps } from './BreadcrumbItem'
import BreadcrumbItem from './BreadcrumbItem'
import {
  convertJsxToString,
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { BreadcrumbMultiple } from './BreadcrumbMultiple'
import { useMedia, useTheme } from '../../shared'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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
   * If variant='collapse', you can override collapsed state for the collapsed content by updating this value.
   * Default: null
   */
  collapsed?: boolean

  /**
   * Use one of the Section component style types (styleType)
   * Default: transparent
   */
  styleType?: SectionBackgroundColor

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
  onToggle?: (collapsed: boolean) => void

  /**
   * Send along a custom React Ref.
   * Default: null
   */
  ref?: React.Ref<HTMLElement>
}

export type BreadcrumbAllProps = BreadcrumbProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, keyof BreadcrumbProps>

const defaultProps: Partial<BreadcrumbAllProps> = {
  skeleton: false,
  navText: 'Back',
  goBackText: 'Back',
  homeText: 'Home',
  backToText: 'Back to...',
  collapsed: true,
  styleType: 'transparent',
  collapsedStyleType: 'info',
  spacing: false,
}

const Breadcrumb = (localProps: BreadcrumbAllProps) => {
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
    homeText,
    backToText, // has a translation in context
    styleType,
    collapsedStyleType,
    collapsed: overrideCollapsed,
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

  const isCollapsedRef = useRef(overrideCollapsed)

  const { isLarge } = useMedia()

  useEffect(() => {
    if (overrideCollapsed !== isCollapsedRef.current) {
      isCollapsedRef.current = overrideCollapsed
      forceUpdate()
    }
  }, [overrideCollapsed])

  // Auto-collapse breadcrumbs if going from small screen to large screen.
  useEffect(() => {
    if (isLarge && overrideCollapsed !== false) {
      // Call onToggle if breadcrumbs is expanded and is going to collapse due to large screen size.
      if (isCollapsedRef.current === false) {
        onToggle?.(true)
      }

      isCollapsedRef.current = true

      forceUpdate()
    }
  }, [isLarge, overrideCollapsed, onToggle])

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

  const innerSpace = spacing === true ? 'small' : spacing

  const overrideSbankenSectionColor =
    useTheme()?.isSbanken && collapsedStyleType === 'info'

  return (
    <nav
      aria-label={convertJsxToString(navText)}
      className={clsx(
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
        backgroundColor={styleType || 'transparent'}
        innerSpace={innerSpace}
      >
        {currentVariant === 'single' ? (
          <Button
            text={goBackText}
            variant="tertiary"
            icon="chevron_left"
            iconPosition="left"
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
                iconPosition="left"
                onClick={onClick ?? onClickHandler}
                aria-expanded={!isCollapsedRef.current}
              />
            )}

            {currentVariant !== 'collapse' && (
              <BreadcrumbMultiple
                data={data}
                items={items}
                collapsed={false}
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
            collapsed={isCollapsedRef.current}
            noAnimation={noAnimation}
          />
        </Section>
      )}
    </nav>
  )
}

Breadcrumb.Item = BreadcrumbItem
export { BreadcrumbItem }
withComponentMarkers(Breadcrumb, {
  _supportsSpacingProps: true,
})

export default Breadcrumb

import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import type {
  HTMLAttributes,
  HTMLProps,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'
import clsx from 'clsx'

// Components
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { useSpacing } from '../space/SpacingUtils'
import type {
  SectionBackgroundColor,
  SectionVariants,
} from '../section/Section'
import Section from '../section/Section'
import Button from '../button/Button'

// Shared
import Context from '../../shared/Context'
import type {
  SpaceTypeAll,
  SpaceTypeMedia,
  SpacingProps,
} from '../../shared/types'
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
import { useMedia } from '../../shared'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type BreadcrumbProps = {
  /**
   * Custom className on the component root
   * Default: `null`
   */
  className?: string

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  /**
   * Pass in a list of your pages as objects of breadcrumbitem to render them as breadcrumbitems.
   * Default: `null`
   */
  data?: Array<BreadcrumbItemProps>

  /**
   * The content of the component. Can be used instead of prop "data".
   * Default: `null`
   */
  children?:
    | ReactElement<BreadcrumbItemProps>
    | Array<ReactElement<BreadcrumbItemProps>>

  /**
   * The variant of the component.
   * Defaults to `single` when children and data are not defined, `responsive` if they are.
   */
  variant?: 'responsive' | 'single' | 'multiple' | 'collapse'

  /**
   * Handle the click event on 'single'/'collapse'
   * Default: `null`
   */
  onClick?: MouseEventHandler<HTMLButtonElement>

  /**
   * For variant 'single', use href (or onClick) to set href when clicking "Back"
   * Default: `null`
   */
  href?: string

  /**
   * Every <nav> on a page needs a unique aria-label text
   * Default: `Page hierarchy`
   */
  navText?: ReactNode

  /**
   * Add custom 'Back' text for variant 'single'
   * Default: `'Back' or defined by Context translation`
   */
  goBackText?: ReactNode

  /**
   * Add custom 'Home' text
   * Default: `'Home' or defined by Context translation`
   */
  homeText?: ReactNode

  /**
   * Add custom 'Back to...' text, for variant collapse
   * Default 'Back to...' or defined by Context translation
   */
  backToText?: ReactNode

  /**
   * If variant='collapse', you can override collapsed state for the collapsed content by updating this value.
   * Default: `null`
   */
  collapsed?: boolean

  /**
   * Use one of the Section background colors.
   * Default: `transparent`
   */
  backgroundColor?: SectionBackgroundColor

  /**
   * Use one of the Section component variants
   * Default: `information`
   */
  collapsedStyleType?: SectionVariants

  /**
   * Include spacing properties in breadcrumb. If only `true` is given, the spacing will be `small`.
   * Default: `false`
   */
  spacing?: SpaceTypeAll | SpaceTypeMedia

  /**
   * Will disable the height animation
   * Default: `false`
   */
  noAnimation?: boolean
  /**
   * Will be called when breadcrumb expands or collapses.
   */
  onToggle?: (collapsed: boolean) => void

  /**
   * Send along a custom React Ref.
   * Default: `null`
   */
  ref?: Ref<HTMLElement>
}

export type BreadcrumbAllProps = BreadcrumbProps &
  SpacingProps &
  Omit<HTMLProps<HTMLElement>, keyof BreadcrumbProps>

const defaultProps: Partial<BreadcrumbAllProps> = {
  skeleton: false,
  navText: 'Back',
  goBackText: 'Back',
  homeText: 'Home',
  backToText: 'Back to...',
  collapsed: true,
  backgroundColor: 'transparent',
  collapsedStyleType: 'information',
  spacing: false,
}

const Breadcrumb = (localProps: BreadcrumbAllProps) => {
  // Every component should have a context
  const context = useContext(Context)

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
    backgroundColor,
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

  const innerSpace = spacing
    ? spacing === true
      ? 'small'
      : spacing
    : undefined

  const navProps = useSpacing(allProps, {
    ...props,
    'aria-label': convertJsxToString(navText),
    className: clsx(
      'dnb-breadcrumb',
      `dnb-breadcrumb--variant-${currentVariant}`,
      skeletonClasses,
      className
    ),
  })

  return (
    <nav {...(navProps as HTMLAttributes<HTMLElement>)}>
      <Section
        className="dnb-breadcrumb__bar"
        backgroundColor={backgroundColor || 'transparent'}
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
          variant={collapsedStyleType}
          className="dnb-breadcrumb__collapse"
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

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
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'
import { clsx } from 'clsx'

// Components
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { useSpacing } from '../space/SpacingUtils'
import Button from '../button/Button'
import Icon from '../icon/Icon'
import Accordion from '../accordion/Accordion'

// Shared
import Context from '../../shared/Context'
import type {
  SpaceTypeAll,
  SpaceTypeMedia,
  SpacingProps,
} from '../../shared/types'
import { chevron_down, chevron_up } from '../../icons'
import type { SkeletonShow } from '../skeleton/Skeleton'

const toggleIcon = Icon.transition({
  collapsed: chevron_down,
  expanded: chevron_up,
})

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
   * Custom `className` for the component root.
   */
  className?: string

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow

  /**
   * List of pages to render as breadcrumb items. Each object in data can include all properties from [BreadcrumbItem properties](/uilib/components/breadcrumb/properties#breadcrumbitem-properties).
   */
  data?: Array<BreadcrumbItemProps>

  /**
   * Content of the component. Can be used instead of property `data`, by adding `Breadcrumb.Item` children `<Breadcrumb.Item {...properties} />`.
   */
  children?:
    | ReactElement<BreadcrumbItemProps>
    | Array<ReactElement<BreadcrumbItemProps>>

  /**
   * Defaults to `responsive` or `single` depending on content. Options: `responsive` | `single` | `multiple` | `collapse`.
   */
  variant?: 'responsive' | 'single' | 'multiple' | 'collapse'

  /**
   * Will be called by user click interaction, to handle click event on "Back" for variant `single` and "Back to..." for variant `collapse`.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>

  /**
   * For variant `single`, set `href` for button click. Can be used instead of event/property `onClick`.
   */
  href?: string

  /**
   * Every `<nav>` on a page needs a unique `aria-label` text.
   */
  navText?: ReactNode

  /**
   * Override with a custom 'Back' text for variant `single` (Not recommended).
   */
  goBackText?: ReactNode

  /**
   * Override with a custom 'Home' text (Not recommended).
   */
  homeText?: ReactNode

  /**
   * Override with a custom 'Back to...' text (Not recommended).
   */
  backToText?: ReactNode

  /**
   * For variant `collapse`, override collapsed state for the collapsed content by updating this value using the provided property `onClick`.
   */
  collapsed?: boolean

  /**
   * Include spacing properties in breadcrumb. If only `true` is given, the spacing will be `small`. Defaults to `false`.
   */
  spacing?: SpaceTypeAll | SpaceTypeMedia

  /**
   * Disables the height animation. Defaults to `false`.
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

const breadcrumbDefaultProps: Partial<BreadcrumbAllProps> = {
  skeleton: false,
  collapsed: true,
  spacing: false,
}

const Breadcrumb = (localProps: BreadcrumbAllProps) => {
  // Every component should have a context
  const context = useContext(Context)

  // Extract additional props from global context
  const allProps = extendPropsWithContext(
    localProps,
    breadcrumbDefaultProps,
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

  const { isSmall } = useMedia()

  useEffect(() => {
    if (overrideCollapsed !== isCollapsedRef.current) {
      isCollapsedRef.current = overrideCollapsed
      forceUpdate()
    }
  }, [overrideCollapsed])

  // Auto-collapse breadcrumbs if going from small screen to larger screen.
  useEffect(() => {
    if (!isSmall && overrideCollapsed !== false) {
      // Call onToggle if the breadcrumb is expanded and is going to collapse due to larger screen size.
      if (isCollapsedRef.current === false) {
        onToggle?.(true)
      }

      isCollapsedRef.current = true

      forceUpdate()
    }
  }, [isSmall, overrideCollapsed, onToggle])

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
      <div className="dnb-breadcrumb__bar">
        {currentVariant === 'single' ? (
          <Button
            text={goBackText}
            variant="tertiary"
            icon="chevron_left"
            iconPosition="left"
            onClick={onClick}
            href={href}
          />
        ) : currentVariant === 'collapse' ? (
          <Accordion
            variant="tertiary"
            title={backToText}
            expanded={!isCollapsedRef.current}
            noAnimation={noAnimation}
            onChange={({ expanded, event }) => {
              onClick?.(event as MouseEvent<HTMLButtonElement>)
              isCollapsedRef.current = !expanded
              onToggle?.(!expanded)
            }}
          >
            <div className="dnb-breadcrumb__collapse">
              <BreadcrumbMultiple
                data={data}
                items={items}
                collapsed={false}
                noAnimation={noAnimation}
              />
            </div>
          </Accordion>
        ) : (
          <>
            {currentVariant === 'responsive' && (
              <Button
                className="dnb-breadcrumb__toggle"
                text={backToText}
                variant="tertiary"
                icon={toggleIcon}
                transitionState={
                  !isCollapsedRef.current ? 'expanded' : 'collapsed'
                }
                iconPosition="left"
                onClick={onClick ?? onClickHandler}
                aria-expanded={!isCollapsedRef.current}
                bounding
              />
            )}

            <BreadcrumbMultiple
              data={data}
              items={items}
              collapsed={false}
              noAnimation={noAnimation}
            />
          </>
        )}
      </div>

      {currentVariant === 'responsive' && (
        <div className="dnb-breadcrumb__collapse">
          <BreadcrumbMultiple
            data={data}
            items={items}
            collapsed={isCollapsedRef.current}
            noAnimation={noAnimation}
          />
        </div>
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

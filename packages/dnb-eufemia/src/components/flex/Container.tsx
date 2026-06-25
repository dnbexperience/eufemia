import {
  Children,
  Fragment,
  createElement,
  isValidElement,
  useMemo,
} from 'react'
import type {
  CSSProperties,
  ComponentType,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import { clsx } from 'clsx'
import type { SpaceProps } from '../space/Space'
import Space from '../space/Space'
import { Hr } from '../../elements'
import useMedia from '../../shared/useMedia'
import {
  getSpaceValue,
  isHeadingElement,
  renderWithSpacing,
} from './utils'

import type { MediaQueryBreakpoints } from '../../shared/MediaQueryUtils'
import type { SpaceType } from '../../shared/types'
import type { UseMediaQueries } from '../../shared/useMedia'
import type { FlexEnd, FlexStart } from './types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers'

type Gap =
  | false
  | 'xx-small'
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'

export type FlexContainerProps = {
  direction?: 'horizontal' | 'vertical'
  wrap?: boolean
  /**
   * Define if intrinsic DOM child elements such as `li` should be wrapped in `Space` to receive spacing. Set to `false` to keep them as direct descendants.
   * Default: `true`
   */
  wrapChildrenInSpace?: boolean
  rowGap?: Gap
  sizeCount?: number
  /**
   * Distribute sub components along the main axis (CSS `justify-content`). In horizontal direction, this controls left-to-right placement. In vertical direction, this controls top-to-bottom placement.
   * Default: `'flex-start'`
   */
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  /**
   * Align sub components along the cross axis (CSS `align-items`). In horizontal direction, this controls vertical alignment. In vertical direction, this controls horizontal alignment.
   * Default: `'flex-start'`
   */
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  /** For when used as a flex item in an outer container in addition to being a container: */
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
  /**
   * How to separate sub components.
   * Default: `'space'`
   */
  divider?: 'space' | 'line' | 'line-framed'
  /**
   * How much space between child items. Use `false` for no spacing. (If in vertical layout: if both `rowGap` and `gap` is set, `rowGap` will be used.).
   * Default: `'small'`
   */
  gap?: Gap
  breakpoints?: MediaQueryBreakpoints
  queries?: UseMediaQueries
}

export type FlexContainerAllProps = FlexContainerProps &
  SpaceProps &
  Omit<
    HTMLAttributes<HTMLDivElement>,
    'ref' | 'wrap' | 'value' | 'label' | 'title' | 'placeholder'
  >

const propNames: Array<keyof FlexContainerAllProps> = [
  'direction',
  'wrap',
  'wrapChildrenInSpace',
  'justify',
  'align',
  'divider',
  'gap',
]

export function pickFlexContainerProps<T extends FlexContainerAllProps>(
  props: T,
  defaults: Partial<FlexContainerAllProps> = {},
  skip: Array<keyof FlexContainerAllProps> = []
): Omit<FlexContainerAllProps, 'children'> {
  return {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(props ?? {}).filter(
        ([key]) =>
          propNames.includes(key as keyof FlexContainerAllProps) &&
          !skip.includes(key as keyof FlexContainerAllProps)
      )
    ),
  }
}

function FlexContainer(props: FlexContainerAllProps) {
  const {
    className,
    style,
    children,
    element = 'div',
    direction = 'horizontal',
    wrap = true,
    wrapChildrenInSpace = true,
    sizeCount = 12,
    rowGap,
    justify = 'flex-start',
    align = 'flex-start',
    alignSelf,
    divider = 'space',
    gap = 'small',
    breakpoints,
    queries,
    ...rest
  } = props

  const spacing = useMemo(
    () => (direction === 'vertical' ? rowGap : undefined) ?? gap,
    [direction, gap, rowGap]
  )
  const childrenArray = replaceRootFragment(wrapChildren(props, children))
  const hasHeading = childrenArray.some((child, i) => {
    const previousChild = childrenArray?.[i - 1]
    return (
      isHeadingElement(child) || (i > 0 && isHeadingElement(previousChild))
    )
  })
  const hasSizeProp =
    !hasHeading &&
    direction === 'horizontal' &&
    childrenArray.some((child) => child['props']?.span)

  const { key: mediaKey } = useMedia({
    disabled: !hasSizeProp,
    breakpoints,
    queries,
  })

  const content = childrenArray.map((child, i) => {
    // Set spacing on child components by props (instead of CSS) to be able to dynamically override by props on each child. The default
    // is the spacing-props that controls space between children. Then override with props sent to the children, including both top
    // and bottom when th
    const isFirst = i === 0
    const isLast = i >= childrenArray.length - 1
    const previousChild = childrenArray?.[i - 1]
    const isHeading = hasHeading && isHeadingElement(previousChild)

    // Always set spacing between elements in the vertical layout on the top props, and 0 on bottom, to avoid
    // having to divide spacing between both with smaller values.
    const start: FlexStart = direction === 'horizontal' ? 'left' : 'top'
    const end: FlexEnd = direction === 'horizontal' ? 'right' : 'bottom'
    const endSpacing = 0
    let startSpacing: SpaceType

    if (
      // No line above heading
      !isHeading &&
      ((divider === 'line' && !isFirst) || divider === 'line-framed')
    ) {
      const spaceAboveLine = getSpaceValue(end, previousChild) ?? spacing
      startSpacing = (getSpaceValue(start, child) ?? spacing) as SpaceType

      return (
        <Fragment key={`element-${i}`}>
          <Hr
            top={!isFirst ? spaceAboveLine : 0}
            space={0}
            className="dnb-flex-container__hr"
          />

          {renderWithSpacing(child, {
            space: { [start]: startSpacing, [end]: endSpacing },
            wrapInSpace: wrapChildrenInSpace,
          })}

          {divider === 'line-framed' && isLast && (
            <Hr
              top={spaceAboveLine}
              space={0}
              className="dnb-flex-container__hr"
            />
          )}
        </Fragment>
      )
    }

    // No space above first element.
    if (isFirst && direction !== 'horizontal') {
      startSpacing = 0
    } else {
      // Since top space of current and bottom space of previous component is the same
      startSpacing =
        getSpaceValue(start, child) ??
        getSpaceValue(end, previousChild) ??
        spacing
    }

    if (
      isValidElement(previousChild) &&
      previousChild?.type?.['_supportsSpacingProps'] === false
    ) {
      startSpacing = 0
    }

    const space =
      direction === 'horizontal'
        ? { [start]: endSpacing, [end]: startSpacing }
        : { [start]: startSpacing, [end]: endSpacing }

    return renderWithSpacing(child, {
      key: child?.['key'] || `element-${i}`,
      space,
      wrapInSpace: wrapChildrenInSpace,
    })
  })

  const n = 'dnb-flex-container'
  const rowGapClass = useMemo(() => {
    if (rowGap !== false && direction === 'horizontal') {
      return `${n}--row-gap-${rowGap ?? 'small'}`
    }
    return undefined
  }, [direction, rowGap])

  const cn = clsx(
    'dnb-flex-container',
    direction && `${n}--direction-${direction}`,
    justify && `${n}--justify-${justify}`,
    align && `${n}--align-${align}`,
    alignSelf && `${n}--align-self-${alignSelf}`,
    spacing && `${n}--spacing-${spacing}`,
    wrap && `${n}--wrap`,
    rowGapClass,
    hasSizeProp && `${n}--has-size`,
    divider && `${n}--divider-${divider}`,
    className
  )

  return (
    <Space
      element={element}
      className={cn}
      data-media-key={mediaKey}
      style={
        hasSizeProp
          ? ({ '--size-count': sizeCount, ...style } as CSSProperties)
          : style
      }
      {...rest}
    >
      {content}
    </Space>
  )
}

function wrapChildren(props: FlexContainerAllProps, children: ReactNode) {
  return Children.toArray(children).map((child) => {
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      (child.type as ComponentMarkers)?._supportsSpacingProps ===
        'children'
    ) {
      const childElement = child as ReactElement<{ children?: ReactNode }>
      const childKey = childElement.key
      const childProps = childElement.props || {}
      return createElement(
        childElement.type as ComponentType<{ children?: ReactNode }>,
        { ...childProps, key: childKey },
        <FlexContainer {...props}>
          {childElement.props.children}
        </FlexContainer>
      )
    }

    return child
  })
}

function replaceRootFragment(children) {
  const firstChild = children[0]
  if (Children.count(children) === 1 && firstChild?.type === Fragment) {
    return Children.toArray(firstChild?.props?.children)
  }
  return children
}

withComponentMarkers(FlexContainer, {
  _supportsSpacingProps: true,
})

export default FlexContainer

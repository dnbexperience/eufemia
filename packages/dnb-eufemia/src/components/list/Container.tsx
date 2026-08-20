import {
  Children,
  cloneElement,
  isValidElement,
  useContext,
  useMemo,
} from 'react'
import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'
import type { ListVariant } from './ListContext'
import { ListContext } from './ListContext'
import type { StackProps as FlexProps } from '../flex/Stack'
import FlexContainer from '../flex/Stack'
import type { SkeletonShow } from '../Skeleton'
import HeightAnimation from '../height-animation/HeightAnimation'
import SharedContext from '../../shared/Context'
import { useSharedState } from '../../shared/helpers/useSharedState'
import type { ListShowMoreButtonSharedState } from './ListShowMoreButton'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ListContainerProps = {
  id?: string
  visibleCount?: number
  variant?: ListVariant
  separated?: boolean
  /**
   * Applies alternating row background colors to the list items. Use `true` or `odd` to color odd items, or `even` to color even items.
   * Default: `false`
   */
  striped?: boolean | 'odd' | 'even'
  skeleton?: SkeletonShow
  disabled?: boolean
} & FlexProps

function ListContainer(props: ListContainerProps) {
  const {
    className,
    children,
    visibleCount,
    variant = 'basic',
    separated = false,
    striped = false,
    skeleton,
    disabled,
    wrapChildrenInSpace = false,
    ...rest
  } = props

  const parentContext = useContext(ListContext)
  const globalContext = useContext(SharedContext)
  const appliedSkeleton =
    skeleton ?? parentContext?.skeleton ?? globalContext?.skeleton
  const appliedDisabled = disabled ?? parentContext?.disabled

  const hasVisibleCount =
    typeof visibleCount === 'number' &&
    Number.isFinite(visibleCount) &&
    visibleCount > 0

  const hasToggle = hasVisibleCount && props.id !== undefined

  const { data: toggleData } =
    useSharedState<ListShowMoreButtonSharedState>(
      hasToggle ? props.id : undefined,
      { expanded: false }
    )

  const expanded = hasToggle ? (toggleData?.expanded ?? false) : false
  const shouldLimit = hasVisibleCount && !expanded

  const renderedChildren = useMemo(() => {
    if (!hasVisibleCount) {
      return children
    }

    const childArray = Children.toArray(children)

    if (!shouldLimit) {
      return childArray
    }

    return childArray.map((child, index) => {
      if (index < visibleCount) {
        return child
      }

      if (isValidElement<HTMLAttributes<HTMLElement>>(child)) {
        return cloneElement(child, {
          hidden: true,
        })
      }

      return null
    })
  }, [children, hasVisibleCount, shouldLimit, visibleCount])

  const listContent = (
    <FlexContainer
      element="ul"
      rowGap={separated ? 'small' : false}
      wrap={false}
      wrapChildrenInSpace={wrapChildrenInSpace}
      className={clsx(
        'dnb-list',
        'dnb-list__container',
        variant && `dnb-list--variant-${variant}`,
        separated && 'dnb-list--separated',
        striped && 'dnb-list--striped',
        striped === 'even' && 'dnb-list--striped-even',
        className
      )}
      {...rest}
    >
      {renderedChildren}
    </FlexContainer>
  )

  return (
    <ListContext
      value={{
        variant,
        separated,
        skeleton: appliedSkeleton,
        disabled: appliedDisabled,
      }}
    >
      {hasToggle ? (
        <HeightAnimation>{listContent}</HeightAnimation>
      ) : (
        listContent
      )}
    </ListContext>
  )
}

withComponentMarkers(ListContainer, {
  _supportsSpacingProps: true,
})

export default ListContainer

import React, { useCallback, useRef, useState } from 'react'
import classnames from 'classnames'
import Card, { Props as CardProps } from '../card/Card'
import ScrollView, {
  ScrollViewAllProps,
} from '../../fragments/scroll-view/ScrollView'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'

import type { SpacingProps } from '../../shared/types'

export type ListCardProps = CardProps

const defaultListItemOutlineCompensation = '0.125rem'

function ListCard(props: ListCardProps) {
  const { className, children, ...rest } = props

  return (
    <Card
      stack
      className={classnames('dnb-list__card', className)}
      {...rest}
    >
      {children}
    </Card>
  )
}

ListCard._supportsSpacingProps = true

export type ListCardScrollViewProps = {
  children: React.ReactNode
  maxVisibleListItems?: number
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
  SpacingProps &
  ScrollViewAllProps

function ListCardScrollView(props: ListCardScrollViewProps) {
  const {
    className,
    children,
    maxVisibleListItems,
    style,
    innerRef,
    ...rest
  } = props

  const localRef = useRef<HTMLDivElement>(null)
  const [measuredMaxHeight, setMeasuredMaxHeight] = useState<
    string | undefined
  >(undefined)
  const [outlineCompensation, setOutlineCompensation] = useState(
    defaultListItemOutlineCompensation
  )

  const hasValidMaxVisibleListItems =
    typeof maxVisibleListItems === 'number' &&
    Number.isFinite(maxVisibleListItems) &&
    maxVisibleListItems > 0

  const fallbackMaxHeight = hasValidMaxVisibleListItems
    ? `calc(var(--item-height, 4rem) * ${maxVisibleListItems})`
    : undefined

  const measureMaxHeight = useCallback(() => {
    if (!hasValidMaxVisibleListItems || style?.maxHeight) {
      setMeasuredMaxHeight(undefined)
      return
    }

    setOutlineCompensation(
      getListItemOutlineCompensation(localRef.current)
    )

    const measuredHeight = getVisibleListItemsHeight(
      localRef.current,
      maxVisibleListItems
    )

    setMeasuredMaxHeight(
      measuredHeight ? `${measuredHeight}px` : undefined
    )
  }, [hasValidMaxVisibleListItems, maxVisibleListItems, style?.maxHeight])

  useLayoutEffect(() => {
    if (!innerRef) {
      return
    }

    if (typeof innerRef === 'function') {
      innerRef(localRef.current)
      return
    }

    innerRef.current = localRef.current
  }, [innerRef])

  useLayoutEffect(() => {
    measureMaxHeight()
  }, [children, measureMaxHeight])

  useLayoutEffect(() => {
    if (!hasValidMaxVisibleListItems || style?.maxHeight) {
      return
    }

    window.addEventListener('resize', measureMaxHeight)

    return () => {
      window.removeEventListener('resize', measureMaxHeight)
    }
  }, [hasValidMaxVisibleListItems, measureMaxHeight, style?.maxHeight])

  const resolvedMaxHeight = style?.maxHeight
    ? undefined
    : measuredMaxHeight || fallbackMaxHeight

  const scrollViewStyle: React.CSSProperties = {
    ...(resolvedMaxHeight
      ? {
          maxHeight: `calc(${resolvedMaxHeight} + ${outlineCompensation})`,
          marginBottom: `-${outlineCompensation}`,
        }
      : null),
    ...style,
  }

  return (
    <ScrollView
      className={classnames(
        'dnb-list__card__scroll-view',
        'dnb-list--inset-outline',
        className
      )}
      interactive="auto"
      ref={localRef}
      style={scrollViewStyle}
      {...rest}
    >
      {children}
    </ScrollView>
  )
}

function getVisibleListItemsHeight(
  scrollViewElement: HTMLDivElement | null,
  maxVisibleListItems: number
) {
  if (!scrollViewElement) {
    return null
  }

  const listElement = scrollViewElement.querySelector(
    '.dnb-list__container'
  )

  if (!(listElement instanceof HTMLElement)) {
    return null
  }

  const items = Array.from(listElement.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement
  )

  const firstVisibleItem = items[0]
  const lastVisibleItem = items[maxVisibleListItems - 1]

  if (!firstVisibleItem || !lastVisibleItem) {
    return null
  }

  return Math.ceil(
    lastVisibleItem.offsetTop +
      lastVisibleItem.offsetHeight -
      firstVisibleItem.offsetTop
  )
}

function getListItemOutlineCompensation(
  scrollViewElement: HTMLDivElement | null
) {
  if (!scrollViewElement || typeof getComputedStyle === 'undefined') {
    return defaultListItemOutlineCompensation
  }

  const cardElement = scrollViewElement.closest('.dnb-card')
  const targetElement =
    cardElement?.querySelector('.dnb-list__container') ||
    scrollViewElement.querySelector('.dnb-list__container')

  if (!(targetElement instanceof HTMLElement)) {
    return defaultListItemOutlineCompensation
  }

  const outlineWidth = getComputedStyle(targetElement)
    .getPropertyValue('--item-outline-width')
    .trim()

  return (
    doubleCssLength(outlineWidth) || defaultListItemOutlineCompensation
  )
}

function doubleCssLength(value: string) {
  if (!value) {
    return null
  }

  const match = value.match(/^(-?\d*\.?\d+)([a-z%]+)$/i)

  if (match) {
    return `${parseFloat(match[1]) * 2}${match[2]}`
  }

  return `calc(${value} * 2)`
}

ListCardScrollView._supportsSpacingProps = true

ListCard.ScrollView = ListCardScrollView

export default ListCard

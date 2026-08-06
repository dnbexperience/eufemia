import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

type FlexDividersProps = {
  containerRef: RefObject<HTMLElement | null>
}

export default function FlexDividers({ containerRef }: FlexDividersProps) {
  const frameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return undefined
    }

    const updateDividers = () => {
      if (
        typeof frameRef.current !== 'undefined' &&
        typeof cancelAnimationFrame !== 'undefined'
      ) {
        cancelAnimationFrame(frameRef.current)
      }

      if (typeof requestAnimationFrame === 'undefined') {
        applyDividers()
      } else {
        frameRef.current = requestAnimationFrame(applyDividers)
      }
    }

    const applyDividers = () => {
      const containerRect = container.getBoundingClientRect()
      const containerStyle = getComputedStyle(container)
      const isHorizontal = containerStyle.flexDirection.startsWith('row')
      const visibleChildren = Array.from(container.children).filter(
        (element) => {
          const style = getComputedStyle(element)
          return style.display !== 'none' && style.visibility !== 'hidden'
        }
      )
      const dividers = visibleChildren
        .slice(1)
        .flatMap((element, index) => {
          const previous = visibleChildren[index]
          if (
            previous?.getAttribute('data-flex-item-type') === 'heading'
          ) {
            return []
          }

          const rect = element.getBoundingClientRect()
          const previousRect = previous.getBoundingClientRect()
          const isWrapped = isHorizontal
            ? Math.abs(rect.top - previousRect.top) > 0.5
            : rect.top <= previousRect.top
          if (isWrapped) {
            return []
          }

          const style = getComputedStyle(element)
          const startSpacing = parseFloat(
            isHorizontal ? style.marginInlineStart : style.marginBlockStart
          )
          const gap = parseFloat(
            isHorizontal ? containerStyle.columnGap : containerStyle.rowGap
          )
          const offset = Number.isFinite(startSpacing)
            ? -startSpacing - gap / 2
            : -gap / 2

          return [
            isHorizontal
              ? {
                  position: `${rect.left - containerRect.left + offset}px ${rect.top - containerRect.top}px`,
                  size: `1px ${rect.height}px`,
                }
              : {
                  position: `${rect.left - containerRect.left}px ${rect.top - containerRect.top + offset}px`,
                  size: `${containerRect.width}px 1px`,
                },
          ]
        })
      const nextStyles = {
        images: dividers
          .map(
            () =>
              'linear-gradient(var(--flex-divider-color), var(--flex-divider-color))'
          )
          .join(', '),
        positions: dividers.map(({ position }) => position).join(', '),
        sizes: dividers.map(({ size }) => size).join(', '),
      }

      if (
        container.style.getPropertyValue('--flex-divider-images') !==
          nextStyles.images ||
        container.style.getPropertyValue('--flex-divider-positions') !==
          nextStyles.positions ||
        container.style.getPropertyValue('--flex-divider-sizes') !==
          nextStyles.sizes
      ) {
        container.style.setProperty(
          '--flex-divider-images',
          nextStyles.images
        )
        container.style.setProperty(
          '--flex-divider-positions',
          nextStyles.positions
        )
        container.style.setProperty(
          '--flex-divider-sizes',
          nextStyles.sizes
        )
      }
    }

    updateDividers()

    const observer =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(updateDividers)
        : null

    observer?.observe(container)
    Array.from(container.children).forEach((element) =>
      observer?.observe(element)
    )
    const mutationObserver =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(updateDividers)
        : null
    mutationObserver?.observe(container, {
      attributes: true,
      childList: true,
      subtree: true,
    })

    return () => {
      if (
        typeof frameRef.current !== 'undefined' &&
        typeof cancelAnimationFrame !== 'undefined'
      ) {
        cancelAnimationFrame(frameRef.current)
      }
      observer?.disconnect()
      mutationObserver?.disconnect()
    }
  }, [containerRef])

  return null
}

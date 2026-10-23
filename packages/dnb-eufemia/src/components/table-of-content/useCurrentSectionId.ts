import { useEffect, useState } from 'react'
import type { TableOfContentSection } from './types'

/**
 * Returns the id of the section currently being read, updates on scrolling and
 * resizing.
 */
export default function useCurrentSectionId(
  sections: TableOfContentSection[],
  currentSectionOffset = 0,
  enabled = true
): string | null {
  const [currentId, setCurrentId] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled || sections.length === 0) {
      setCurrentId(null)
      return undefined
    }

    let animationFrameId = 0

    const updateCurrent = () => {
      animationFrameId = 0

      // Resolve elements again because applications can replace or reveal them.
      const tracked = sections.flatMap(({ id }) => {
        const element = document.getElementById(id)
        return element &&
          element.getClientRects().length &&
          !element.closest('[hidden], [aria-hidden="true"]') &&
          getComputedStyle(element).visibility !== 'hidden'
          ? [{ id, element }]
          : []
      })

      const found = findCurrentSectionIndex(
        tracked.map(({ element }) => element.getBoundingClientRect().top),
        currentSectionOffset
      )

      setCurrentId(found === null ? null : tracked[found].id)
    }

    const scheduleUpdate = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateCurrent)
      }
    }

    updateCurrent()
    const observer = new MutationObserver((mutations) => {
      if (
        mutations.some(
          ({ target }) =>
            !(
              target instanceof Element ? target : target.parentElement
            )?.closest('.dnb-table-of-content')
        )
      ) {
        scheduleUpdate()
      }
    })
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id', 'hidden', 'aria-hidden', 'class', 'style'],
    })
    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(document.body)
    window.addEventListener('scroll', scheduleUpdate, {
      passive: true,
      capture: true,
    })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate, {
        capture: true,
      })
      window.removeEventListener('resize', scheduleUpdate)
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [sections, currentSectionOffset, enabled])

  return currentId
}

/**
 * The index of the section at the top of the viewport, or the first section
 * when the view is above it.
 */
export function findCurrentSectionIndex(
  sectionTops: number[],
  currentSectionOffset: number
): number | null {
  if (sectionTops.length === 0) {
    return null
  }

  let currentIndex = 0

  for (let index = 0; index < sectionTops.length; index++) {
    if (sectionTops[index] <= currentSectionOffset) {
      currentIndex = index
    }
  }

  return currentIndex
}

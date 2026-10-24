import { useEffect, useRef, useState } from 'react'
import type { TableOfContentSection } from './types'
import decodeHashId from '../../shared/helpers/decodeHashId'
import getVisibleSection from './getVisibleSection'

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
  const initialHash = useRef<
    { id: string; selected: boolean } | null | undefined
  >(undefined)

  useEffect(() => {
    if (initialHash.current === undefined) {
      initialHash.current = {
        id: decodeHashId(window.location.hash.slice(1)),
        selected: false,
      }
    }
    if (!enabled || sections.length === 0) {
      setCurrentId(null)
      return undefined
    }

    let animationFrameId = 0

    const updateCurrent = () => {
      animationFrameId = 0

      // Resolve elements again because applications can replace or reveal them.
      const tracked = sections.flatMap(({ id }) => {
        const element = getVisibleSection(id)
        return element ? [{ id, element }] : []
      })

      const sectionTops = tracked.map(
        ({ element }) => element.getBoundingClientRect().top
      )
      const hashTarget = tracked.find(
        ({ id }) => id === initialHash.current?.id
      )
      if (
        hashTarget &&
        isInView(hashTarget.element, currentSectionOffset)
      ) {
        initialHash.current.selected = true
        setCurrentId(hashTarget.id)
        return
      }
      if (initialHash.current?.selected) {
        initialHash.current = null
      }
      const groups = new Map<Element, number[]>()
      tracked.forEach(({ element }, index) => {
        const scroller = scrollContainerOf(element)
        const group = groups.get(scroller) ?? []
        group.push(index)
        groups.set(scroller, group)
      })
      const selectionTops = [...sectionTops]
      groups.forEach((indices, scroller) => {
        const viewportBottom =
          scroller === document.scrollingElement ||
          scroller === document.documentElement
            ? window.innerHeight
            : scroller.getBoundingClientRect().top +
              (scroller as HTMLElement).clientTop +
              scroller.clientHeight
        const fitted = fitSectionTopsToScrollRange(
          indices.map((index) => sectionTops[index]),
          currentSectionOffset,
          scroller.scrollTop,
          scroller.scrollHeight - scroller.clientHeight,
          viewportBottom
        )
        indices.forEach((index, position) => {
          if (
            fitted[position] === sectionTops[index] ||
            isInView(tracked[index].element, currentSectionOffset)
          ) {
            selectionTops[index] = fitted[position]
          }
        })
      })
      const found = findCurrentSectionIndex(
        selectionTops,
        currentSectionOffset
      )

      setCurrentId(found === null ? null : tracked[found].id)
    }

    const scheduleUpdate = () => {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateCurrent)
      }
    }
    const endHashPreference = () => {
      initialHash.current = null
      scheduleUpdate()
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
    window.addEventListener('hashchange', endHashPreference)
    window.addEventListener('popstate', endHashPreference)
    const manualEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown']
    manualEvents.forEach((event) =>
      window.addEventListener(event, endHashPreference, {
        capture: true,
        passive: true,
      })
    )

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', scheduleUpdate, {
        capture: true,
      })
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('hashchange', endHashPreference)
      window.removeEventListener('popstate', endHashPreference)
      manualEvents.forEach((event) =>
        window.removeEventListener(event, endHashPreference, true)
      )
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [sections, currentSectionOffset, enabled])

  return currentId
}

function isInView(element: HTMLElement, offset: number) {
  const rect = element.getBoundingClientRect()
  let top = Math.max(0, offset)
  let bottom = window.innerHeight
  for (
    let parent = element.parentElement;
    parent;
    parent = parent.parentElement
  ) {
    if (
      parent !== document.body &&
      parent !== document.documentElement &&
      /^(auto|scroll|overlay|hidden|clip)$/.test(
        getComputedStyle(parent).overflowY
      )
    ) {
      const start = parent.getBoundingClientRect().top + parent.clientTop
      top = Math.max(top, start)
      bottom = Math.min(bottom, start + parent.clientHeight)
    }
  }
  return rect.top < bottom && rect.bottom > top
}

function scrollContainerOf(element: HTMLElement): Element {
  for (
    let parent = element.parentElement;
    parent;
    parent = parent.parentElement
  ) {
    if (
      parent !== document.body &&
      parent !== document.documentElement &&
      /^(auto|scroll|overlay)$/.test(getComputedStyle(parent).overflowY) &&
      parent.scrollHeight > parent.clientHeight
    ) {
      return parent
    }
  }
  return document.scrollingElement ?? document.documentElement
}

/** Fit unreachable final headings into the remaining scroll range in document order. */
export function fitSectionTopsToScrollRange(
  sectionTops: number[],
  offset: number,
  scrollTop: number,
  maximumScroll: number,
  viewportBottom = 0
): number[] {
  if (maximumScroll <= 0 || sectionTops.length === 0) {
    return sectionTops
  }
  const positions = sectionTops.map((top) => top + scrollTop)
  const limit = maximumScroll + offset
  const last = positions.at(-1)
  if (last <= limit) {
    return sectionTops
  }
  let anchorIndex = -1
  positions.forEach((position, index) => {
    if (position < limit) {
      anchorIndex = index
    }
  })
  const anchor = Math.max(offset, positions[anchorIndex] ?? offset)
  // Include the content after the last heading, so it has a selection interval
  // instead of becoming current only at the final scroll pixel.
  const end = Math.max(last + 1, maximumScroll + viewportBottom)
  return sectionTops.map((top, index) =>
    index <= anchorIndex
      ? top
      : anchor +
        ((positions[index] - anchor) * (limit - anchor)) / (end - anchor) -
        scrollTop
  )
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

import { useEffect, useRef } from 'react'
import { getClosestParent, warn } from '../../shared/component-helper'
import { getOffsetTop } from '../../shared/helpers'

export type TableStickyHeaderProps = {
  /**
   * Use `true` to enable a sticky Table header. Or use `'css-position'` to enable the CSS based scroll behavior.
   * Default: `false`
   */
  sticky?: boolean | 'css-position'

  /**
   * Defines the offset (top) from where the header should start to stick. Use a `rem` value like `"3.5rem"`, or a number in pixels. You may define your app header height here, if you have a sticky header on your page.
   * Default: `0`
   */
  stickyOffset?: string | number
}

export const useStickyHeader = ({
  sticky,
  stickyOffset,
}: TableStickyHeaderProps) => {
  const elementRef = useRef<HTMLTableElement>(undefined)

  useEffect(() => {
    if (sticky) {
      let isSticky = false
      let thHeight = 0
      let offsetTopPx = 0
      let tableOffset = 0
      let tableHeight = 0
      let totalOffset = 0
      let hasScrollbar = null
      let scrollViewElem = null
      let scrollTargetElem: HTMLElement | Document = null
      let timeout: NodeJS.Timeout = null
      let usesScrollTimeline = false

      try {
        const supportsScrollTimeline =
          typeof CSS !== 'undefined' &&
          typeof CSS.supports === 'function' &&
          CSS.supports('animation-timeline: scroll(root block)') &&
          CSS.supports('animation-range: 0 1px')
        const tableElem = elementRef.current

        const trElem = getTrElement(tableElem)
        const thElem = getThElement(tableElem)

        const setScrollRange = () => {
          const usesPageScroll =
            sticky !== 'css-position' && !scrollViewElem
          trElem.toggleAttribute('data-page-scroll', usesPageScroll)
          usesScrollTimeline = usesPageScroll && supportsScrollTimeline

          if (usesScrollTimeline) {
            trElem.style.removeProperty('--table-offset')
          }

          if (!usesPageScroll) {
            trElem.style.removeProperty('--table-scroll-start')
            trElem.style.removeProperty('--table-scroll-end')
            trElem.style.removeProperty('--table-scroll-distance')
            return // stop here
          }

          trElem.style.setProperty(
            '--table-scroll-start',
            `${totalOffset}px`
          )
          trElem.style.setProperty(
            '--table-scroll-end',
            `${totalOffset + tableHeight - thHeight}px`
          )
          trElem.style.setProperty(
            '--table-scroll-distance',
            `${tableHeight - thHeight}px`
          )
        }

        const setSizes = () => {
          offsetTopPx = parseFloat(String(stickyOffset)) || 0
          if (offsetTopPx > 0) {
            if (String(stickyOffset).includes('rem')) {
              offsetTopPx = Math.round(offsetTopPx * 16)
            }
          }

          const modalElem = getClosestParent(
            '.dnb-modal__content',
            tableElem
          )

          if (modalElem) {
            scrollViewElem = modalElem.querySelector('.dnb-scroll-view')

            if (offsetTopPx === 0) {
              offsetTopPx =
                (
                  modalElem.querySelector(
                    '.dnb-modal__header__bar'
                  ) as HTMLElement
                ).offsetHeight || 0
            }
          } else {
            const scrollElem = getClosestParent(
              '.dnb-scroll-view',
              tableElem
            ) as HTMLElement

            if (scrollElem) {
              hasScrollbar =
                scrollElem.scrollHeight - 1 > scrollElem.offsetHeight

              // without a scrollbar the page scrolls, not the scroll view
              scrollViewElem = hasScrollbar ? scrollElem : null
            }
          }

          thHeight = thElem.offsetHeight
          tableHeight = tableElem.offsetHeight
          tableOffset = getOffsetTop(tableElem)
          totalOffset = tableOffset - offsetTopPx
          setScrollRange()

          if (sticky === 'css-position') {
            trElem.style.setProperty(
              '--table-top',
              `${offsetTopPx / 16}rem`
            )
            // The sticky row always applies the transform, so a leftover offset would stack on top
            trElem.style.removeProperty('--table-offset')
          } else {
            trElem.style.removeProperty('--table-top')
          }
        }

        let offset = 0
        const onScroll = () => {
          if (scrollViewElem) {
            offset = scrollViewElem.scrollTop
          } else {
            offset = window.scrollY

            // Recalculate table position on each scroll to handle
            // dynamic layout changes (e.g., banners appearing above the table)
            const nextTableOffset = getOffsetTop(tableElem)
            const nextTableHeight = tableElem.offsetHeight
            if (
              nextTableOffset !== tableOffset ||
              nextTableHeight !== tableHeight
            ) {
              tableOffset = nextTableOffset
              tableHeight = nextTableHeight
              totalOffset = tableOffset - offsetTopPx
              setScrollRange()
            }
          }

          offset -= hasScrollbar ? offsetTopPx : totalOffset

          // By sub thHeight and checking for the height, we avoid a scrollbar inside a Table.ScrollView
          if (offset > 0 && offset < tableHeight - thHeight) {
            if (sticky !== 'css-position' && !usesScrollTimeline) {
              trElem.style.setProperty(
                '--table-offset',
                String(offset) + 'px'
              )
            }

            if (!isSticky) {
              isSticky = true

              trElem.toggleAttribute('data-is-sticky', true)
            }
          } else {
            if (isSticky) {
              isSticky = false

              if (offset <= 0) {
                if (sticky !== 'css-position' && !usesScrollTimeline) {
                  trElem.style.removeProperty('--table-offset')
                }
              }

              trElem.removeAttribute('data-is-sticky')
            }
          }
        }

        // the scroll target can change, because a scrollbar may appear first on a resize
        const bindScroll = () => {
          const target = scrollViewElem || document
          if (target !== scrollTargetElem) {
            scrollTargetElem?.removeEventListener('scroll', onScroll)
            scrollTargetElem = target
            scrollTargetElem.addEventListener('scroll', onScroll)
          }
        }

        const onResize = () => {
          setSizes()
          bindScroll()
          onScroll()
        }

        const applyObservers = () => {
          try {
            // Unlike classes, data attributes are kept when React re-renders the row
            trElem.setAttribute('data-sticky', String(sticky))

            setSizes()

            bindScroll()
            window.addEventListener('resize', onResize)
          } catch (e) {
            stickyWarning(String(e))
          }
        }

        timeout = setTimeout(applyObservers, 100) // to get a more precise offset/sizes, we delay the initialization

        return () => {
          clearTimeout(timeout)
          scrollTargetElem?.removeEventListener('scroll', onScroll)
          window.removeEventListener('resize', onResize)
        }
      } catch (e) {
        stickyWarning(String(e))
      }
    }

    // the element is still mounted here, unlike during the effect cleanup
    resetStickyHeader(elementRef.current)

    return undefined
  }, [elementRef, sticky, stickyOffset])

  return { elementRef }
}

const resetStickyHeader = (tableElem: HTMLTableElement) => {
  const trElem = getTrElement(tableElem)

  if (!trElem) {
    return // stop here
  }

  trElem.removeAttribute('data-sticky')
  trElem.removeAttribute('data-page-scroll')
  trElem.removeAttribute('data-is-sticky')
  trElem.style.removeProperty('--table-offset')
  trElem.style.removeProperty('--table-top')
  trElem.style.removeProperty('--table-scroll-start')
  trElem.style.removeProperty('--table-scroll-end')
  trElem.style.removeProperty('--table-scroll-distance')
}

const stickyWarning = (message = '') => {
  warn('Could not enable Sticky mode in table:', message)
}
const getThElement = (element: HTMLTableElement): HTMLTableCellElement => {
  return element.querySelector(
    'thead > tr:first-of-type > th:first-of-type, thead > .dnb-table__tr:first-of-type > .dnb-table__th:first-of-type'
  )
}
const getTrElement = (element: HTMLTableElement): HTMLTableRowElement => {
  return element?.querySelector(
    'thead > tr:first-of-type, thead > .dnb-table__tr:first-of-type'
  )
}

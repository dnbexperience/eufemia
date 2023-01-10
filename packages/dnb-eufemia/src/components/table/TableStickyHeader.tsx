import React from 'react'
import { getPreviousSibling, warn } from '../../shared/component-helper'
import { getOffsetTop } from '../../shared/helpers'

export type StickyTableHeaderProps = {
  /**
   * Makes the Table header sticky
   * Default: false
   */
  sticky?: boolean | 'css-position'

  /**
   * The offset from top in rem or em unit
   * Default: false
   */
  stickyOffset?: string | number
}

export const useStickyHeader = ({
  sticky,
  stickyOffset,
}: StickyTableHeaderProps) => {
  const elementRef = React.useRef<HTMLTableElement>()

  React.useEffect(() => {
    if (sticky) {
      let isSticky = false
      let thHeight = 0
      let offsetTopPx = 0
      let tableOffset = 0
      let tableHeight = 0
      let totalOffset = 0
      let hasScrollbar = null
      let scrollViewElem = null
      let timeout: NodeJS.Timeout = null

      try {
        const tableElem = elementRef.current

        const trElem: HTMLTableRowElement = tableElem.querySelector(
          'thead > tr:first-of-type, thead > .dnb-table__tr:first-of-type'
        )
        const thElem = getThElement(tableElem)

        const setSizes = () => {
          offsetTopPx = parseFloat(String(stickyOffset)) || 0
          if (offsetTopPx > 0) {
            if (String(stickyOffset).includes('rem')) {
              offsetTopPx = Math.round(offsetTopPx * 16)
            }
          }

          const modalElem = getPreviousSibling(
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
            const scrollElem = getPreviousSibling(
              '.dnb-scroll-view',
              tableElem
            ) as HTMLElement

            if (scrollElem) {
              hasScrollbar =
                scrollElem.scrollHeight - 1 > scrollElem.offsetHeight

              if (hasScrollbar) {
                scrollViewElem = scrollElem
              }
            }
          }

          thHeight = thElem.offsetHeight
          tableHeight = tableElem.offsetHeight
          tableOffset = getOffsetTop(tableElem)
          totalOffset = tableOffset - offsetTopPx

          if (sticky === 'css-position') {
            trElem.style.setProperty(
              '--table-top',
              `${offsetTopPx / 16}rem`
            )
          }
        }

        let offset = 0
        const onScroll = () => {
          if (scrollViewElem) {
            offset = scrollViewElem.scrollTop
          } else {
            offset = window.pageYOffset
          }

          offset -= hasScrollbar ? offsetTopPx : totalOffset

          // By sub thHeight and checking for the height, we avoid a scrollbar inside a Table.ScrollView
          if (offset > 0 && offset < tableHeight - thHeight) {
            if (sticky !== 'css-position') {
              trElem.style.setProperty(
                '--table-offset',
                String(offset) + 'px'
              )
            }

            if (!isSticky) {
              isSticky = true

              trElem.classList.add('is-sticky')
            }
          } else {
            if (isSticky) {
              isSticky = false

              if (offset <= 0) {
                if (sticky !== 'css-position') {
                  trElem.style.removeProperty('--table-offset')
                }
              }

              trElem.classList.remove('is-sticky')
            }
          }
        }

        const onResize = () => {
          setSizes()
          onScroll()
        }

        const applyObservers = () => {
          try {
            trElem.classList.add('sticky')
            if (sticky === 'css-position') {
              trElem.classList.add('css-position')
            }

            setSizes()

            const scrollElem = scrollViewElem || document
            scrollElem.addEventListener('scroll', onScroll)
            window.addEventListener('resize', onResize)
          } catch (e) {
            stickyWarning(e)
          }
        }

        timeout = setTimeout(applyObservers, 100) // to get a more precise offset/sizes, we delay the initialisation

        return () => {
          clearTimeout(timeout)
          document.removeEventListener('scroll', onScroll)
          window.removeEventListener('resize', onResize)
        }
      } catch (e) {
        stickyWarning(e)
      }
    }
  }, [elementRef, sticky, stickyOffset])

  return { elementRef }
}

const stickyWarning = (message = '') => {
  warn('Could not enable Sticky mode in table:', message)
}
const getThElement = (element: HTMLTableElement): HTMLTableCellElement => {
  return element.querySelector(
    'thead > tr:first-of-type > th:first-of-type, thead > .dnb-table__tr:first-of-type > .dnb-table__th:first-of-type'
  )
}

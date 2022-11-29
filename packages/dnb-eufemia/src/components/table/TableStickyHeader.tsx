import React from 'react'
import { warn } from '../../shared/component-helper'
import { getOffsetTop } from '../../shared/helpers'

export type StickyTableHeaderProps = {
  /**
   * Makes the Table header sticky
   * Default: false
   */
  sticky?: boolean | 'body-scroll'

  /**
   * The offset from top in rem or em unit
   * Default: false
   */
  stickyOffset?: string | number

  /**
   * @deprecated Please use `stickyOffset`
   */
  sticky_offset?: string | number
}

export const useStickyHeader = ({
  sticky,
  stickyOffset,
  sticky_offset,
}: StickyTableHeaderProps) => {
  if (sticky_offset) {
    stickyOffset = sticky_offset
  }

  const elementRef = React.useRef<HTMLTableElement>()
  const intersectionObserver = React.useRef<IntersectionObserver | null>(
    null
  )

  React.useEffect(() => {
    if (sticky) {
      if (typeof IntersectionObserver === 'undefined') {
        stickyWarning('IntersectionObserver not supported')
        return // stop here
      }

      if (!elementRef.current) {
        stickyWarning('No ref element given')
      }

      const tableElem = elementRef.current

      let thHeight = 0
      let offsetTopPx = 0
      let isIntersecting = false
      let tableOffset = 0
      let tableHeight = 0
      let totalOffset = 0
      let timeout: NodeJS.Timeout = null

      try {
        const trElem: HTMLTableRowElement = tableElem.querySelector(
          'thead > tr:first-of-type, thead > .dnb-table__tr:first-of-type'
        )
        const thElem = getThElement(tableElem)
        const tdElem =
          tableElem.querySelector(
            'tbody > tr.dnb-table__sticky-helper > td:first-of-type'
          ) || getTdElement(tableElem)

        const inIframe = window.self !== window.top

        offsetTopPx = parseFloat(String(stickyOffset)) || 0

        if (offsetTopPx > 0) {
          if (String(stickyOffset).includes('em')) {
            offsetTopPx = Math.round(offsetTopPx * 16)
          }
          trElem.style.setProperty('--table-top', `${offsetTopPx / 16}rem`)
        }

        const setSizes = () => {
          thHeight = thElem.offsetHeight
          tableHeight = tableElem.offsetHeight
          tableOffset = getOffsetTop(tableElem)
          totalOffset = tableOffset - (inIframe ? 0 : offsetTopPx)
        }

        const onScroll = () => {
          const offset = window.pageYOffset - totalOffset

          // By sub thHeight and checking for the height, we avoid a scrollbar inside a Table.ScrollView
          if (isIntersecting && offset < tableHeight - thHeight) {
            trElem.style.transform =
              'translate3d(0,' + String(offset) + 'px,0)'
          }
        }

        const onResize = () => {
          setSizes()
          onScroll()
        }

        const applyObservers = () => {
          try {
            trElem.classList.add('sticky')

            setSizes()

            if (sticky === 'body-scroll') {
              document.addEventListener('scroll', onScroll)
              window.addEventListener('resize', onResize)
            }

            intersectionObserver.current = new IntersectionObserver(
              (entries) => {
                const [entry] = entries

                try {
                  isIntersecting = !entry.isIntersecting

                  if (isIntersecting) {
                    trElem.classList.add('show-shadow')

                    if (sticky === 'body-scroll') {
                      onScroll()
                    }
                  } else {
                    trElem.classList.remove('show-shadow')
                    trElem.style.transform = 'translate3d(0,0,0)'
                  }
                } catch (e) {
                  stickyWarning(e)
                }
              },
              {
                threshold: 1,
                rootMargin: `-${thHeight + offsetTopPx}px 0px 0px 0px`,
              }
            )

            intersectionObserver.current.observe(tdElem)
          } catch (e) {
            stickyWarning(e)
          }
        }

        timeout = setTimeout(applyObservers, 100) // to get a more precise offset/sizes, we delay the initialisation

        return () => {
          clearTimeout(timeout)
          intersectionObserver.current?.disconnect()
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

export const StickyHelper = () => {
  return (
    <tr className="dnb-table__sticky-helper">
      <td />
    </tr>
  )
}

const stickyWarning = (message = '') => {
  warn('Could not enable Sticky mode in table:', message)
}
const getTdElement = (element: HTMLTableElement): HTMLTableCellElement => {
  return element.querySelector(
    'tbody > tr:not(.dnb-table__sticky-helper):first-of-type > td:first-of-type, tbody > .dnb-table__tr:first-of-type > .dnb-table__td:first-of-type'
  )
}
const getThElement = (element: HTMLTableElement): HTMLTableCellElement => {
  return element.querySelector(
    'thead > tr:first-of-type > th:first-of-type, thead > .dnb-table__tr:first-of-type > .dnb-table__th:first-of-type'
  )
}

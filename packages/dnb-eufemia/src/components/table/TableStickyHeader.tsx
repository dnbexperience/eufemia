import React from 'react'
import { warn } from '../../shared/component-helper'

export interface StickyTableHeaderProps {
  /**
   * Makes the Table header sticky
   * Default: false
   */
  sticky?: boolean

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

      let trElem: HTMLTableRowElement
      let thElem: HTMLTableCellElement
      let tdElem: HTMLTableCellElement
      let thHeight = 80
      let tdHeight = 64
      let offsetTopPx = 0

      try {
        trElem = tableElem.querySelector(
          'thead > tr:first-of-type, thead > .dnb-table__tr:first-of-type'
        )
        thElem = getThElement(tableElem)
        tdElem = getTdElement(tableElem)

        offsetTopPx = parseFloat(String(stickyOffset || '0'))

        if (offsetTopPx > 0) {
          if (String(stickyOffset).includes('em')) {
            offsetTopPx = Math.round(offsetTopPx * 16)
            trElem.style.top = String(stickyOffset)
          } else {
            trElem.style.top = `${offsetTopPx / 16}rem`
          }
        }

        thHeight =
          (thElem && parseFloat(window.getComputedStyle(thElem).height)) ||
          thHeight
        tdHeight =
          (tdElem && parseFloat(window.getComputedStyle(tdElem).height)) ||
          tdHeight
      } catch (e) {
        stickyWarning(e)
      }

      const marginTop = thHeight + tdHeight + offsetTopPx

      intersectionObserver.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          try {
            if (entry.isIntersecting) {
              trElem.classList.remove('show-shadow')
            } else {
              trElem.classList.add('show-shadow')
            }
          } catch (e) {
            stickyWarning(e)
          }
        },
        {
          rootMargin: `-${marginTop}px 0px 0px 0px`,
        }
      )

      try {
        const trElem = tableElem.querySelector('thead > tr:first-of-type')
        trElem.classList.add('sticky')
        const tdElem =
          tableElem.querySelector(
            'tbody > tr.dnb-table__sticky-helper > td:first-of-type'
          ) || getTdElement(tableElem)

        if (tdElem) {
          intersectionObserver.current.observe(tdElem)
        }
      } catch (e) {
        stickyWarning(e)
      }
    }

    return () => {
      intersectionObserver.current?.disconnect()
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

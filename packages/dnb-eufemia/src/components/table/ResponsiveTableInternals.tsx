import React from 'react'
import { warn } from '../../shared/helpers'
import {
  getPreviousSibling,
  InteractionInvalidation,
} from '../../shared/component-helper'

const interactiveElements: Array<string> = [
  'button',
  'input',
  'a',
  'select',
]

export function getInteractiveElements(element: HTMLElement) {
  return interactiveElements.filter((tagName) =>
    getPreviousSibling('tagName:' + tagName, element)
  )
}

export function useHandleInvisibleTds({
  trRef,
  trIsOpen,
  responsive,
  hasAccordionContent,
}) {
  React.useEffect(() => {
    if (responsive && !hasAccordionContent) {
      if (trRef.current.parentElement.tagName === 'THEAD') {
        return // stop here
      }

      let timeout: ReturnType<typeof setTimeout>
      const listener = () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          hideInvisibleTds(trRef.current)
        }, 100)
      }

      window.addEventListener('resize', listener)

      return () => {
        clearTimeout(timeout)
        window.removeEventListener('resize', listener)
      }
    }
  }, [trRef, responsive, hasAccordionContent])

  React.useEffect(() => {
    if (responsive && !hasAccordionContent) {
      if (trRef.current.parentElement.tagName === 'THEAD') {
        return // stop here
      }

      hideInvisibleTds(trRef.current, trIsOpen)
    }
  }, [trRef, trIsOpen, responsive, hasAccordionContent])
}

/**
 * Helper function to hive td elements which are not "visible"
 * due to the fixed height.
 * We hide them so the user can not tab invisible focus elements, like a button.
 *
 * @param trElement {HTMLTableRowElement}
 */
function hideInvisibleTds(
  trElement: HTMLTableRowElement,
  showAll?: boolean
) {
  if (!isSmallScreen()) {
    if (trElement.style.getPropertyValue('--tr-height--open')) {
      trElement.style.removeProperty('--tr-height--open')
      trElement.style.removeProperty('--tr-height--closed')

      const listOfTds = getListOfTds(trElement)
      listOfTds.forEach((tdElement) => {
        if (tdElement?.__iiInstance) {
          tdElement.__iiInstance.revert()
        }
      })
    }

    return // stop here
  }

  const { trHeightOpen, trHeightClosed } = getTrHeights({
    trElement,
    showAll,
  })

  try {
    if (trHeightOpen > 0) {
      trElement.style.setProperty(
        '--tr-height--open',
        String(trHeightOpen / 16) + 'rem'
      )
    }

    if (trHeightClosed > 0) {
      trElement.style.setProperty(
        '--tr-height--closed',
        String(trHeightClosed / 16) + 'rem'
      )
    }
  } catch (e) {
    warn(e)
  }
}

function isSmallScreen() {
  return Math.ceil(document.documentElement.offsetWidth / 16) <= 40
}

function getTrHeights({
  trElement,
  showAll,
}: {
  trElement: HTMLTableRowElement
  showAll: boolean
}) {
  const mainElementHeight = getMainCellHeight(trElement)

  const { openHeights, closedHeights } = calculateHeightsFromTr({
    trElement,
    mainElementHeight,
    showAll,
  })

  const additionalOpenHeight = Object.values(openHeights).reduce(
    (acc, cur) => {
      acc += cur
      return acc
    },
    0
  )
  const additionalClosedHeight = Object.values(closedHeights).sort(
    (a, b) => {
      if (a < b) {
        return -1
      } else if (a > b) {
        return 1
      }
      return 0
    }
  )[0]

  const trHeightOpen = mainElementHeight + additionalOpenHeight
  const trHeightClosed =
    additionalClosedHeight > 0
      ? mainElementHeight + additionalClosedHeight
      : 0

  return { trHeightOpen, trHeightClosed }
}

function getMainCellHeight(trElement: HTMLTableRowElement) {
  const mainElement = trElement.querySelector(
    '.dnb-table__main_cell'
  ) as HTMLElement | null

  return mainElement?.offsetHeight || 0
}

type tdWithIi = {
  __iiInstance?: InteractionInvalidation
} & HTMLTableCellElement

function calculateHeightsFromTr({
  trElement,
  mainElementHeight,
  showAll,
}: {
  trElement: HTMLTableRowElement
  mainElementHeight: number
  showAll: boolean
}) {
  const openHeights: Record<number, number> = {}
  const closedHeights: Record<number, number> = {}
  const listOfTds = getListOfTds(trElement)
  // console.log('listOfTds', listOfTds.length)

  /**
   * Find every <td> that is wrapped on a newline
   * The <tr> needs a CSS style of: `position: relative`
   */
  listOfTds.forEach((tdElement) => {
    const offsetTop = tdElement?.offsetTop

    if (typeof offsetTop === 'undefined') {
      return // stop here because of invalid element
    }

    // Collect heights, based on top position
    openHeights[offsetTop] = tdElement.offsetHeight

    const elements = tdElement.querySelectorAll(
      interactiveElements.map((selector) => `* ${selector}`).join(',')
    )

    if (offsetTop > mainElementHeight && !showAll) {
      if (elements.length > 0) {
        if (!tdElement.__iiInstance) {
          tdElement.__iiInstance = new InteractionInvalidation({
            ariaHidden: false, // Do not hide it from screen reader, because the table is still readable.
          })
        }

        tdElement.__iiInstance.activate(tdElement)
      }

      closedHeights[offsetTop] = tdElement.offsetHeight
    } else if (offsetTop <= mainElementHeight || showAll) {
      if (tdElement?.__iiInstance) {
        if (elements.length > 0) {
          tdElement.__iiInstance.revert()
        }
      }
    }
  })

  return { openHeights, closedHeights }
}

function getListOfTds(trElement: HTMLTableRowElement): Array<tdWithIi> {
  return Array.from(
    trElement.querySelectorAll('td:not(.dnb-table__main_cell)')
  )
}

import React from 'react'
import classnames from 'classnames'
import useTableAnimationHandler from './useTableAnimationHandler'
import { TableContext } from './TableContext'
import Td from './TableTd'

export type TableAccordionTrProps = {
  /**
   * Set to true to expanded the content on initial render
   */
  expanded?: boolean

  /**
   * Set to true to skip animation
   * Default: false
   */
  noAnimation?: boolean
}

export default function TableAccordionTr(
  componentProps: TableAccordionTrProps &
    React.TableHTMLAttributes<HTMLTableRowElement>
) {
  const {
    expanded = null,
    noAnimation = null,
    className,
    children,
    style,
    ...props
  } = componentProps

  const allProps = React.useContext(TableContext)?.allProps
  const innerRef = React.useRef<HTMLDivElement>(null)
  const trRef = React.useRef<HTMLTableRowElement>(null)

  const {
    ariaLive,
    isInDOM,
    isAnimating,
    isVisibleParallax,
    firstPaintStyle,
  } = useTableAnimationHandler({
    innerRef,
    trRef,
    expanded,
    noAnimation,
  })

  const expandColumn = (
    <Td>
      <span className="dnb-sr-only">
        <span aria-live="assertive">
          {isInDOM && ariaLive ? allProps?.accordionMoreContentSR : null}
        </span>
      </span>
    </Td>
  )

  return (
    <tr
      /**
       * VoiceOver needs the "tr" to be in the DOM in order to be able to continue reading downwards,
       * even it is either closed or opened. Else VO pretends that this current table row is the end of the table.
       *
       * + All the browsers do count the correct number (childCount) of rows + NVDA counts correct when used with Chrome.
       * - Firefox on Windows does it as well, but not when used with NVDA.
       */
      aria-hidden={!isInDOM} // NVDA and VoiceOver needs "aria-hidden" to remove it from the accessibility tree
      hidden={isInDOM ? undefined : true} // NVDA and VoiceOver needs "hidden" to be true in order to not count invisible table rows (based on "tr" element)
      role={isInDOM ? 'row' : undefined} // NVDA and VoiceOver needs "hidden" to be true in order to not count invisible table rows (based on "role" element)
      style={{ ...firstPaintStyle, ...style }}
      className={classnames(
        isInDOM && 'dnb-table__tr',
        'dnb-table__tr__accordion-content',
        isInDOM && 'dnb-table__tr__accordion-content--expanded',
        isAnimating && 'dnb-table__tr__accordion-content--animating',
        isVisibleParallax && 'dnb-table__tr__accordion-content--parallax',
        className
      )}
      ref={trRef}
      {...props}
    >
      {allProps.accordionChevronPlacement !== 'end' && expandColumn}
      {isInDOM && children}
      {allProps.accordionChevronPlacement === 'end' && expandColumn}
    </tr>
  )
}

import React from 'react'
import classnames from 'classnames'
import { useHeightAnimation } from '../height-animation/useHeightAnimation'
import TableContext from './TableContext'

export const TrContext = React.createContext(null)

export type TableAccordionContentProps = {
  /**
   * Set to true to expanded the content on initial render
   */
  expanded?: boolean

  /**
   * Set to true to skip animation
   * Default: false
   */
  noAnimation?: boolean

  /**
   * Overwrite the internal collected colSpan (add +1)
   */
  colSpan?: number
}

export default function TableAccordionContent(
  componentProps: TableAccordionContentProps &
    React.TableHTMLAttributes<HTMLTableRowElement>
) {
  const {
    expanded = null,
    noAnimation = null,
    className,
    children,
    colSpan = 100,
    ...props
  } = componentProps

  const allProps = React.useContext(TableContext)?.allProps
  const trContext = React.useContext(TrContext)
  const innerRef = React.useRef<HTMLDivElement>(null)
  const trRef = React.useRef<HTMLTableRowElement>(null)
  const [ariaLive, setAriaLive] = React.useState(null)

  const { isInDOM, isAnimating, isVisibleParallax } = useHeightAnimation(
    innerRef,
    {
      open: Boolean(expanded || trContext?.trIsOpen),
      animate: Boolean(!noAnimation && !trContext?.noAnimation),
      onOpen: (state) => {
        setAriaLive(state ? true : null)
      },
      onAnimationEnd: (state) => {
        const event = { target: trRef.current }
        switch (state) {
          case 'opened':
            trContext.onOpened?.(event)
            break

          case 'closed':
            trContext.onClosed?.(event)
            break
        }
      },
    }
  )

  const countTds = trContext?.countTds || colSpan

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
      className={classnames(
        isInDOM && 'dnb-table__tr',
        'dnb-table__tr__accordion_content',
        isInDOM && 'dnb-table__tr__accordion_content--expanded',
        isAnimating && 'dnb-table__tr__accordion_content--animating',
        isVisibleParallax && 'dnb-table__tr__accordion_content--parallax',
        className
      )}
      ref={trRef}
      {...props}
    >
      <td
        role={isInDOM ? 'cell' : undefined} // remove the "role", because the parent role is removed as well
        colSpan={countTds}
        className="dnb-table__td"
      >
        {isInDOM && (
          <div
            className="dnb-table__tr__accordion_content__inner"
            ref={innerRef}
          >
            <div className="dnb-table__tr__accordion_content__inner__spacing">
              {children}
            </div>
          </div>
        )}
        <span className="dnb-sr-only">
          <span aria-live="assertive">
            {isInDOM && !ariaLive
              ? allProps?.accordionMoreContentSR
              : null}
          </span>
        </span>
      </td>
    </tr>
  )
}

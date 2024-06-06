import React from 'react'
import classnames from 'classnames'
import useTableAnimationHandler from '../useTableAnimationHandler'
import { TableContext } from '../TableContext'
import { TableAccordionContext } from './TableAccordionContext'

type TableAccordionContentProps = {
  /** Set to true to expanded the content on initial render */
  expanded?: boolean
  /** Set to true to skip animation */
  noAnimation?: boolean
  /** Overwrite the internal collected colSpan (add +1) */
  colSpan?: number
  variant: 'row' | 'single'
} & React.TableHTMLAttributes<HTMLTableRowElement>

export type TableAccordionContentRowProps = Omit<
  TableAccordionContentProps,
  'variant' | 'colSpan'
>

export type TableAccordionContentSingleProps = Omit<
  TableAccordionContentProps,
  'variant'
>

function TableAccordionContent(
  componentProps: TableAccordionContentProps
) {
  const {
    variant,
    expanded = null,
    noAnimation = null,
    className,
    children,
    colSpan,
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

  const chevronTdProps = {
    ariaLive,
    isInDOM,
    accordionMoreContentSR: allProps?.accordionMoreContentSR,
  }

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
        `dnb-table__tr__accordion-content--${variant}`,
        isInDOM && 'dnb-table__tr__accordion-content--expanded',
        isAnimating && 'dnb-table__tr__accordion-content--animating',
        isVisibleParallax && 'dnb-table__tr__accordion-content--parallax',
        className
      )}
      ref={trRef}
      {...props}
    >
      {variant === 'row' && (
        <>
          {allProps.accordionChevronPlacement !== 'end' && (
            <ChevronTd {...chevronTdProps} />
          )}
          {isInDOM && children}
          {allProps.accordionChevronPlacement === 'end' && (
            <ChevronTd {...chevronTdProps} />
          )}
        </>
      )}
      {variant === 'single' && (
        <ChevronTd {...chevronTdProps} colSpan={colSpan}>
          {isInDOM && (
            <div
              className="dnb-table__tr__accordion-content__inner"
              ref={innerRef}
            >
              <div className="dnb-table__tr__accordion-content__inner__spacing">
                {children}
              </div>
            </div>
          )}
        </ChevronTd>
      )}
    </tr>
  )
}

const ChevronTd = ({
  children = undefined,
  colSpan = undefined,
  ariaLive,
  isInDOM,
  accordionMoreContentSR,
}) => (
  <td
    role={isInDOM ? 'cell' : undefined} // remove the "role", because the parent role is removed as well
    className="dnb-table__td"
    colSpan={colSpan}
  >
    {children}
    <span className="dnb-sr-only">
      <span aria-live="assertive">
        {isInDOM && ariaLive ? accordionMoreContentSR : null}
      </span>
    </span>
  </td>
)

export function TableAccordionContentRow(
  props: TableAccordionContentRowProps
) {
  return <TableAccordionContent variant="row" {...props} />
}

export function TableAccordionContentSingle({
  colSpan = 100,
  ...props
}: TableAccordionContentSingleProps) {
  const tableAccordionContext = React.useContext(TableAccordionContext)

  return (
    <TableAccordionContent
      variant="single"
      colSpan={tableAccordionContext?.countTds || colSpan}
      {...props}
    />
  )
}

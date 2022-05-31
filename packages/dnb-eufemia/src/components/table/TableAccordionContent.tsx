import React from 'react'
import classnames from 'classnames'
import TableTrContext from './TableTrContext'
import { useHeightAnimation } from '../height-animation/useHeightAnimation'

export type TableAccordionContentProps = {
  /**
   * Set to true to open the content on initial render
   */
  open?: boolean

  /**
   * Set to true to skip animation
   */
  noAnimation?: boolean

  /**
   * For internal use
   */
  countTds?: number

  /**
   * The content of the component.
   * Default: null
   */
  children?: React.ReactNode

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string
}

const TableAccordionContent = (
  componentProps: TableAccordionContentProps &
    React.TableHTMLAttributes<HTMLTableRowElement>
) => {
  const {
    open = null,
    noAnimation = null,
    className,
    children,
    countTds = 1,

    ...props
  } = componentProps

  const trContext = React.useContext(TableTrContext)

  const innerRef = React.useRef(null)

  const { isInDOM, isVisibleParallax } = useHeightAnimation(innerRef, {
    open: open || trContext?.trIsOpen,
    animate: !noAnimation,
  })

  if (!isInDOM) {
    return null
  }

  return (
    <tr
      role="row"
      id={'tr-accordion-' + trContext?.id}
      className={classnames(
        'dnb-table__tr',
        'dnb-table__tr__accordion_content',
        isInDOM && 'dnb-table__tr__accordion_content--open',
        isVisibleParallax &&
          'dnb-table__tr__accordion_content--open-delayed',
        className
      )}
      {...props}
    >
      <td className="dnb-table__td" colSpan={countTds}>
        <div
          className="dnb-table__tr__accordion_content__inner"
          ref={innerRef}
        >
          <section
            aria-label="Expanded Table Row Content"
            className="dnb-table__tr__accordion_content__inner__spacing"
          >
            {children}
          </section>
        </div>
      </td>
    </tr>
  )
}

export default TableAccordionContent

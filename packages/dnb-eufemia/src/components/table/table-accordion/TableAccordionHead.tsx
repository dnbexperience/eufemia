import React, { useEffect } from 'react'
import Td from '../TableTd'
import { TableContext } from '../TableContext'
import {
  TableClickableButtonTd,
  TableClickableHead,
  TableIconSrTh,
  isTableHead,
  onClickTr,
} from '../TableClickableHead'
import { TableAccordionContext } from './TableAccordionContext'
import {
  TableAccordionContentSingle,
  TableAccordionContentRow,
} from './TableAccordionContent'

import type {
  TableAccordionContentSingleProps,
  TableAccordionContentRowProps,
} from './TableAccordionContent'
import type { TableTrProps } from '../TableTr'

export type TableAccordionHeadProps = {
  /** The row number */
  count: number
} & TableTrProps &
  React.TableHTMLAttributes<HTMLTableRowElement>

export function TableAccordionHead(allProps: TableAccordionHeadProps) {
  const {
    children,
    expanded,
    noAnimation,
    onClick,
    onOpened,
    onClosed,
    count,
    ...props
  } = allProps
  const tableContext = React.useContext(TableContext)

  const [trIsOpen, setOpen] = React.useState(() => {
    if (typeof expanded === 'boolean') {
      return expanded
    } else if (typeof location !== 'undefined') {
      const id = props?.id
      if (id && '#' + id === location.hash) {
        return true
      }
    }

    return false
  })
  const [trIsHover, setHover] = React.useState(false)
  const [trHadClick, setHadClick] = React.useState(false)

  let headerContent = React.Children.toArray(children)

  const addContent = (content) => {
    if (tableContext.allProps.accordionChevronPlacement === 'end') {
      headerContent.push(content)
    } else {
      headerContent.unshift(content)
    }
  }

  /**
   * Handle Accordion Content
   */
  const accordionContent = headerContent.filter(
    (element: React.ReactElement) => {
      return isAccordionElement(element)
    }
  ) as React.ReactElement<
    TableAccordionContentSingleProps | TableAccordionContentRowProps
  >[]

  const hasAccordionContent =
    accordionContent.length !== 0 &&
    accordionContent.every((element) => React.isValidElement(element))

  useEffect(() => {
    if (
      hasAccordionContent &&
      tableContext?.collapseTrCallbacks?.current &&
      count
    ) {
      tableContext.collapseTrCallbacks.current[count] = () => {
        setOpen(false)
      }
    }
  }, [count, tableContext?.collapseTrCallbacks, hasAccordionContent])

  const tableContextAllProps = React.useContext(TableContext)?.allProps

  if (hasAccordionContent) {
    // Remove the AccordionContent, and use it outside of the tr
    headerContent = headerContent.filter((element: React.ReactElement) => {
      return !isAccordionElement(element)
    })

    addContent(
      <TableClickableButtonTd
        trIsOpen={trIsOpen}
        ariaLabel={tableContextAllProps?.accordionToggleButtonSR}
        icon="chevron_down"
        onClick={toggleOpenTr}
        key="td-icon"
      />
    )
  } else if (isTableHead(headerContent)) {
    addContent(
      <TableIconSrTh
        key="th-icon"
        text={tableContext?.allProps?.accordionToggleButtonSR}
      />
    )
  } else if (!hasAccordionContent) {
    addContent(<Td key="empty-td"></Td>)
  }

  const countTds = hasAccordionContent
    ? headerContent.filter((element: React.ReactElement) => {
        return (
          element.type === Td || element.type === TableClickableButtonTd
        ) // TODO: We may need to include this in future --> || component.type === Td.MainCell
      }).length
    : null

  return (
    <TableAccordionContext.Provider
      value={{
        toggleOpenTr,
        trIsOpen,
        noAnimation,
        countTds,
        onOpened,
        onClosed,
      }}
    >
      <TableClickableHead
        trIsOpen={trIsOpen}
        trIsHover={trIsHover}
        trHadClick={trHadClick}
        clickable={hasAccordionContent}
        noAnimation={noAnimation}
        onClick={toggleOpenTr}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        onKeyDown={onKeyDownHandler}
        ariaLabel={tableContextAllProps?.accordionToggleButtonSR}
        {...props}
      >
        {headerContent}
      </TableClickableHead>
      {accordionContent}
    </TableAccordionContext.Provider>
  )

  function onMouseEnterHandler() {
    setHover(true)
  }

  function onKeyDownHandler(event: React.SyntheticEvent) {
    toggleOpenTr(event, true)
  }

  function onMouseLeaveHandler() {
    setHover(false)
    setHadClick(false)
  }

  function toggleOpenFn(event: React.SyntheticEvent) {
    setOpen(!trIsOpen)
    setHadClick(true)
    onClick?.(event)
  }

  function toggleOpenTr(
    event: React.SyntheticEvent,
    allowInteractiveElement?: boolean
  ) {
    onClickTr(event, allowInteractiveElement, toggleOpenFn)
  }
}

const isAccordionElement = (element: React.ReactElement) =>
  element.type === TableAccordionContentSingle ||
  element.type === TableAccordionContentRow

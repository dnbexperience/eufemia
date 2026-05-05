import {
  Children,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type {
  ReactElement,
  SyntheticEvent,
  TableHTMLAttributes,
} from 'react'
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

// Extend the ViewTransition API types
type DocumentWithViewTransition = Document & {
  startViewTransition?: (
    updateCallback?: () => void | Promise<void>
  ) => void
}

export type TableAccordionHeadProps = {
  /** The row number */
  count: number
} & TableTrProps &
  TableHTMLAttributes<HTMLTableRowElement>

export function TableAccordionHead(allProps: TableAccordionHeadProps) {
  const {
    children,
    expanded,
    noAnimation,
    keepInDOM,
    onClick,
    onOpen,
    onClose,
    count,
    ...props
  } = allProps
  const tableContext = useContext(TableContext)

  const [trIsOpen, setOpen] = useState(() => {
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
  const [trIsHover, setHover] = useState(false)
  const [trHadClick, setHadClick] = useState(false)

  let headerContent = Children.toArray(children)

  const addContent = useCallback(
    (content) => {
      if (tableContext.allProps.accordionChevronPlacement === 'right') {
        headerContent.push(content)
      } else {
        headerContent.unshift(content)
      }
    },
    [headerContent, tableContext.allProps.accordionChevronPlacement]
  )

  const onMouseLeaveHandler = useCallback(() => {
    setHover(false)
    setHadClick(false)
  }, [])

  const toggleOpenFn = useCallback(
    (event: SyntheticEvent) => {
      const doc = document as DocumentWithViewTransition
      if (
        typeof doc !== 'undefined' &&
        typeof doc.startViewTransition !== 'undefined'
      ) {
        if (tableContext.hasAccordionRows && !trIsOpen) {
          doc.startViewTransition?.(() => {
            setOpen(true)
          })
        } else {
          setOpen(!trIsOpen)
        }
      } else {
        setOpen(!trIsOpen)
      }
      setHadClick(true)
      onClick?.(event)
    },
    [onClick, tableContext.hasAccordionRows, trIsOpen]
  )

  const toggleOpenTr = useCallback(
    (event: SyntheticEvent, allowInteractiveElement?: boolean) => {
      onClickTr(event, allowInteractiveElement, toggleOpenFn)
    },
    [toggleOpenFn]
  )

  const onMouseEnterHandler = useCallback(() => {
    setHover(true)
  }, [])

  const onKeyDownHandler = useCallback(
    (event: SyntheticEvent) => {
      toggleOpenTr(event, true)
    },
    [toggleOpenTr]
  )

  /**
   * Handle Accordion Content
   */
  const accordionContent = headerContent.filter((element) => {
    return isAccordionElement(element as ReactElement)
  }) as ReactElement<
    TableAccordionContentSingleProps | TableAccordionContentRowProps
  >[]

  const hasAccordionContent =
    accordionContent.length !== 0 &&
    accordionContent.every((element) => isValidElement(element))

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

  const tableContextAllProps = useContext(TableContext)?.allProps

  if (hasAccordionContent) {
    // Remove the AccordionContent, and use it outside of the tr
    headerContent = headerContent.filter((element) => {
      return !isAccordionElement(element as ReactElement)
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
    addContent(<Td key="empty-td" />)
  }

  const countTds = hasAccordionContent
    ? headerContent.filter((element) => {
        const el = element as ReactElement
        return el.type === Td || el.type === TableClickableButtonTd // TODO: We may need to include this in future --> || component.type === Td.MainCell
      }).length
    : null

  return (
    <TableAccordionContext
      value={{
        toggleOpenTr,
        trIsOpen,
        noAnimation,
        keepInDOM,
        countTds,
        onOpen,
        onClose,
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
    </TableAccordionContext>
  )
}

const isAccordionElement = (element: ReactElement) =>
  element.type === TableAccordionContentSingle ||
  element.type === TableAccordionContentRow

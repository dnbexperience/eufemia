import React from 'react'
import classnames from 'classnames'
import { makeUniqueId } from '../../shared/component-helper'
import AccordionContent, {
  TableAccordionContentProps,
} from './TableAccordionContent'
import Td, { TableTdProps } from './TableTd'
import TableTrContext from './TableTrContext'
import TableContext from './TableContext'
import { hasSelectedText } from '../../shared/helpers'
import {
  useHandleInvisibleTds,
  getInteractiveElements,
} from './ResponsiveTableInternals'

export type TableTrProps = {
  /**
   * Give the tr an unique ID
   */
  id?: string

  /**
   * The variant of the tr
   */
  variant?: 'even' | 'odd'

  /**
   * Set true to render the tr initially as opened
   */
  open?: boolean

  /**
   * Set to true to skip animation
   */
  noAnimation?: boolean

  /**
   * The content of the component.
   */
  children: Array<React.ReactElement<TableTdProps>>

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string
}

const Tr = (
  componentProps: TableTrProps &
    React.TableHTMLAttributes<HTMLTableRowElement>
) => {
  const {
    id = makeUniqueId(),
    variant,
    open, // eslint-disable-line
    noAnimation, // eslint-disable-line
    className,
    children,

    ...props
  } = componentProps

  const tableContext = React.useContext(TableContext)
  const { responsive } = tableContext

  const {
    toggleOpenTr,
    trIsOpen,
    isInDom,
    hasAccordionContent,
    accordionContent,
    countTds,
    currentVariant,
    trRef,
    trParams,
  } = useHandleTrLogic({
    tableContext,
    children,
    variant,
    open,
  })

  useHandleInvisibleTds({
    trRef,
    trIsOpen,
    responsive,
    hasAccordionContent,
  })

  return (
    <TableTrContext.Provider
      value={{
        id,
        toggleOpenTr,
        trIsOpen,
        hasAccordionContent,
      }}
    >
      <tr
        role="row"
        id={'tr-' + id}
        className={classnames(
          'dnb-table__tr',
          currentVariant && `dnb-table__tr--${currentVariant}`,
          responsive &&
            (trIsOpen
              ? 'dnb-table__tr--open'
              : isInDom && 'dnb-table__tr--closed'),
          hasAccordionContent && 'dnb-table__tr--has-accordion-content',
          (noAnimation || !isInDom) && 'dnb-table__tr--no-animation',
          className
        )}
        ref={trRef}
        {...trParams}
        {...props}
      >
        {hasAccordionContent
          ? // Remove the AccordionContent, and use it outside of the tr
            children.filter((component) => {
              return component.type !== AccordionContent
            })
          : children}
      </tr>

      {hasAccordionContent &&
        React.cloneElement(accordionContent, {
          countTds,
          noAnimation,
        })}
    </TableTrContext.Provider>
  )
}

export default Tr

function useHandleTrLogic({ tableContext, variant, children, open }) {
  const trRef = React.useRef(null)

  /**
   * Handle odd/even
   */
  const [count] = React.useState(
    () => tableContext.trTmpRef.current.count++
  )
  React.useEffect(() => {
    return () => {
      tableContext.trTmpRef.current.count--
    }
  }, [tableContext.trTmpRef])

  /**
   * Handle Accordion Content
   */
  const accordionContent = children.find(
    (component: React.ReactElement) => component.type === AccordionContent
  ) as React.ReactElement<TableAccordionContentProps>
  const hasAccordionContent = React.isValidElement(accordionContent)
  const countTds = hasAccordionContent
    ? children.filter((component: React.ReactElement) => {
        return component.type === Td || component.type === Td.MainCell
      }).length
    : null

  /**
   * Find out the current odd/even when "accordionContent" is used.
   * Because we have now an additional "tr" element.
   * Then the CSS can't figure out the correct nth element (nth-of-type)
   * and we need to set it manually (nth-child and nth-of-type do not respect classes, so we can't ignore this one).
   */
  let currentVariant = variant
  if (!currentVariant && accordionContent) {
    currentVariant = count % 2 ? 'odd' : 'even'
  }

  const [trIsOpen, setOpen] = React.useState<boolean>(open)
  const toggleOpenTr = (state: boolean) => {
    if (typeof state === 'boolean') {
      setOpen(state)
    } else {
      setOpen(!trIsOpen)
    }
  }

  const trParams = { onClick: undefined }
  const { responsive } = tableContext
  if (responsive) {
    const onClickHandler = (
      event: React.MouseEvent<HTMLTableRowElement>
    ) => {
      const element = event.target as HTMLElement

      if (
        !hasSelectedText() &&
        getInteractiveElements(element).length === 0
      ) {
        setOpen(!trIsOpen)
      }
    }

    trParams.onClick = onClickHandler
  }

  const [isInDom, setIsInDom] = React.useState<boolean>(false)

  React.useEffect(() => {
    setIsInDom(true)
  }, [])

  return {
    trRef,
    toggleOpenTr,
    trIsOpen,
    isInDom,
    hasAccordionContent,
    accordionContent,
    countTds,
    currentVariant,
    trParams,
  }
}

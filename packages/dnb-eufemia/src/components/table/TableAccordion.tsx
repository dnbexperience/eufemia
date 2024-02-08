import React from 'react'
import classnames from 'classnames'
import Button from '../button/Button'
import IconPrimary from '../icon/IconPrimary'
import Th from './TableTh'
import Td from './TableTd'
import { TableAccordionContext, TableContext } from './TableContext'
import keycode from 'keycode'
import { hasSelectedText } from '../../shared/helpers'
import { TableTrProps } from './TableTr'

import TableAccordionTd from './TableAccordionTd'
import type { TableAccordionTdProps } from './TableAccordionTd'

export function useTableAccordion({
  children,
  className,
  props,
  expanded,
  disabled,
  noAnimation,
  onClick,
  onOpened,
  onClosed,
}) {
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

  let content = React.Children.toArray(children)

  if (!tableContext?.allProps?.accordion) {
    return null
  }

  /**
   * Handle Accordion Content
   */
  const accordionContent = content.find((element: React.ReactElement) => {
    return element.type === TableAccordionTd
  }) as React.ReactElement<TableAccordionTdProps>
  const hasAccordionContent = React.isValidElement(accordionContent)
  const countTds = hasAccordionContent
    ? children.filter((element: React.ReactElement) => {
        return element.type === Td // TODO: We may need to include this in future --> || component.type === Td.MainCell
      }).length + 1 // +1 because we push the TableAccordionToggleButton
    : null

  const trParams =
    !disabled && hasAccordionContent
      ? {
          onClick: toggleOpenTr,
          onMouseEnter: onMouseEnterHandler,
          onMouseLeave: onMouseLeaveHandler,
          onKeyDown: onKeydownHandler,
        }
      : {}

  if (hasAccordionContent) {
    // Remove the AccordionContent, and use it outside of the tr
    content = content.filter((element) => {
      const hasContent =
        (element as React.ReactElement<TableTrProps>).type ===
        TableAccordionTd
      return !hasContent
    })

    const tdElem = <TableTdAccordionIcon key="td-icon" />

    if (tableContext.allProps.accordionChevronPlacement === 'end') {
      content.push(tdElem)
    } else {
      content.unshift(tdElem)
    }
  } else if (tableContext?.allProps?.accordion) {
    const isTh = content.some((element) => {
      return (element as React.ReactElement<TableTrProps>).type === Th
    })

    if (isTh) {
      const thElem = <TableThAccordionIcon key="th-icon" />

      if (tableContext.allProps.accordionChevronPlacement === 'end') {
        content.push(thElem)
      } else {
        content.unshift(thElem)
      }
    }
  }

  return (
    <TableAccordionContext.Provider
      value={{
        toggleOpenTr,
        trIsOpen,
        noAnimation,
        countTds,
        hasAccordionContent,
        onOpened,
        onClosed,
      }}
    >
      <tr
        tabIndex={accordionContent && !disabled ? 0 : undefined}
        className={classnames(
          className,
          hasAccordionContent && 'dnb-table__tr--has-accordion-content',
          trIsOpen && 'dnb-table__tr--expanded',
          disabled && 'dnb-table__tr--disabled',
          noAnimation && 'dnb-table__tr--no-animation',
          trIsHover && trHadClick && 'dnb-table__tr--hover'
        )}
        {...trParams}
        {...props}
      >
        {content}
      </tr>
      {accordionContent}
    </TableAccordionContext.Provider>
  )

  function onKeydownHandler(event: KeyboardEvent) {
    switch (keycode(event)) {
      case 'space':
      case 'enter':
        {
          const target = event.target as HTMLElement
          if (
            document.activeElement !== target ||
            target.tagName === 'TR'
          ) {
            setOpen(!trIsOpen)
            event.preventDefault()
          }
        }
        break
    }
  }
  function onMouseEnterHandler() {
    setHover(true)
  }
  function onMouseLeaveHandler() {
    setHover(false)
    setHadClick(false)
  }
  function toggleOpenTr(
    event: MouseEvent,
    allowInteractiveElement = false
  ) {
    const target = event.target as HTMLElement
    if (
      /**
       * Do not toggle if user clicked an interactive element (input, button, etc.).
       * Interactive to set activeElement on mouseDown, we we can check against it.
       */
      ((document.activeElement !== target &&
        /**
         * Safari on macOS needs this extra check:
         *
         * > For example, on macOS systems, elements that aren't text input elements are not typically focusable by default.
         * https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement
         */
        target.tagName !== 'INPUT' &&
        target.tagName !== 'LABEL') ||
        allowInteractiveElement) &&
      /**
       * Let the user select text,
       * without triggering the accordion.
       */
      !hasSelectedText()
    ) {
      setOpen(!trIsOpen)
      setHadClick(true)

      onClick?.(event)
    }
  }
}

export function TableAccordionToggleButton() {
  const tableAccordionContext = React.useContext(TableAccordionContext)
  const allProps = React.useContext(TableContext)?.allProps
  const iconSize =
    allProps.size === 'medium' || allProps.size === 'small'
      ? 'basis'
      : 'medium'

  return (
    <span className="dnb-table__toggle-button">
      <IconPrimary icon="chevron_down" size={iconSize} />
      <Button
        className="dnb-sr-only"
        tabIndex={-1}
        aria-label={allProps?.accordionToggleButtonSR}
        aria-expanded={Boolean(tableAccordionContext?.trIsOpen)}
        on_click={(event) =>
          tableAccordionContext?.toggleOpenTr(event, true)
        }
      />
    </span>
  )
}

function TableThAccordionIcon() {
  const tableContext = React.useContext(TableContext)
  return (
    <Th aria-hidden className="dnb-table__th__accordion-icon">
      <div>{tableContext?.allProps?.accordionToggleButtonSR}</div>
    </Th>
  )
}

function TableTdAccordionIcon() {
  return (
    <Td className="dnb-table__td__accordion-icon">
      <TableAccordionToggleButton />
    </Td>
  )
}

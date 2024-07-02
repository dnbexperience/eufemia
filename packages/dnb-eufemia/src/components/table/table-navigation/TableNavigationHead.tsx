import React from 'react'
import classnames from 'classnames'
import keycode from 'keycode'
import { hasSelectedText } from '../../../shared/helpers'
import Button from '../../button/Button'
import IconPrimary from '../../icon/IconPrimary'
import Th from '../TableTh'
import Td from '../TableTd'
import { TableContext } from '../TableContext'

import type { TableTrProps } from '../TableTr'

export type TableNavigationHeadProps = TableTrProps &
  React.TableHTMLAttributes<HTMLTableRowElement>

export function TableNavigationHead(allProps: TableNavigationHeadProps) {
  const {
    children,
    className,
    expanded,
    disabled,
    onClick,
    onOpened,
    onClosed,
    ...props
  } = allProps
  const tableContext = React.useContext(TableContext)

  let content = React.Children.toArray(children)

  const addToContent = (icon) => {
    content.push(icon)
  }

  const hasOnClick = typeof onClick === 'function'

  const trParams =
    !disabled && hasOnClick
      ? {
          onClick: onClickTr,
          onKeyDown: onKeydownHandler,
        }
      : {}

  if (isTableHead(content)) {
    addToContent(
      <Th
        aria-hidden
        className="dnb-table__th__accordion-icon"
        key="th-icon"
      >
        <div>{tableContext?.allProps?.navigationButtonSR}</div>
      </Th>
    )
  } else if (hasOnClick) {
    addToContent(
      <Td className="dnb-table__td__accordion-icon" key="td-icon">
        <TableNavigationButton onClick={onClickTr} />
      </Td>
    )
  } else if (!hasOnClick) {
    addToContent(<Td key="empty-td"></Td>)
  }

  return (
    <tr
      tabIndex={!disabled ? 0 : undefined}
      className={classnames(
        className,
        hasOnClick && 'dnb-table__tr--has-accordion-content',
        disabled && 'dnb-table__tr--disabled'
      )}
      {...trParams}
      {...props}
    >
      {content}
    </tr>
  )

  function onKeydownHandler(event: React.SyntheticEvent) {
    switch (keycode(event.nativeEvent)) {
      case 'space':
      case 'enter':
        {
          const target = event.target as HTMLElement
          if (
            document.activeElement !== target ||
            target.tagName === 'TR'
          ) {
            onClick?.(event)
            event.preventDefault()
          }
        }
        break
    }
  }
  function onClickTr(
    event: React.SyntheticEvent,
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
       * without triggering the onClick.
       */
      !hasSelectedText()
    ) {
      onClick?.(event)
    }
  }
}

export function TableNavigationButton(props: {
  onClick: (
    event: React.SyntheticEvent,
    allowInteractiveElement: boolean
  ) => void
}) {
  const { onClick } = props
  const tableContextAllProps = React.useContext(TableContext)?.allProps
  const iconSize =
    tableContextAllProps?.size === 'medium' ||
    tableContextAllProps?.size === 'small'
      ? 'basis'
      : 'medium'

  return (
    <span className="dnb-table__toggle-button">
      <IconPrimary icon="chevron_right" size={iconSize} />
      <Button
        className="dnb-sr-only"
        tabIndex={-1}
        aria-label={tableContextAllProps?.navigationButtonSR}
        on_click={(event) => onClick(event, true)}
      />
    </span>
  )
}

const isTableHead = (children: React.ReactNode[]) =>
  children.some((element: React.ReactElement) => element.type === Th)

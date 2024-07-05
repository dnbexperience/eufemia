import React from 'react'
import classnames from 'classnames'
import keycode from 'keycode'
import { hasSelectedText } from '../../shared/helpers'
import Button from '../button/Button'
import IconPrimary from '../icon/IconPrimary'
import Th from './TableTh'
import Td from './TableTd'
import { TableContext } from './TableContext'
import type { TableTrProps } from './TableTr'

export type TableClickableHeadProps = {
  trIsOpen?: boolean
  trIsHover?: boolean
  trHadClick?: boolean
  clickable: boolean
  noAnimation?: boolean
  ariaLabel: string
} & TableTrProps &
  React.TableHTMLAttributes<HTMLTableRowElement>

export function TableClickableHead(allProps: TableClickableHeadProps) {
  const {
    children,
    className,
    disabled,
    onClick,
    onOpened,
    onClosed,

    trIsOpen,
    trIsHover,
    trHadClick,
    clickable,
    noAnimation,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    ariaLabel,
    ...props
  } = allProps

  const trParams =
    !disabled && clickable
      ? {
          onClick: onClick,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
          onKeyDown: onKeydownHandler,
        }
      : {}

  return (
    <tr
      tabIndex={clickable && !disabled ? 0 : undefined}
      className={classnames(
        className,
        clickable && 'dnb-table__tr--clickable',
        trIsOpen && 'dnb-table__tr--expanded',
        disabled && 'dnb-table__tr--disabled',
        noAnimation && 'dnb-table__tr--no-animation',
        trIsHover && trHadClick && 'dnb-table__tr--hover'
      )}
      {...trParams}
      {...props}
    >
      {children}
    </tr>
  )

  function onKeydownHandler(
    event: React.KeyboardEvent<HTMLTableRowElement>
  ) {
    switch (keycode(event.nativeEvent)) {
      case 'space':
      case 'enter':
        {
          const target = event.target as HTMLElement
          if (
            document.activeElement !== target ||
            target.tagName === 'TR'
          ) {
            onKeyDown(event)
            event.preventDefault()
          }
        }
        break
    }
  }
}

export function onClickTr(
  event: React.SyntheticEvent,
  allowInteractiveElement = false,
  onClick?: (event: React.SyntheticEvent) => void
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
     * without triggering the onclick.
     */
    !hasSelectedText()
  ) {
    onClick?.(event)
  }
}

export function TableClickableButtonTd(props: {
  trIsOpen?: boolean
  ariaLabel: string
  icon: 'chevron_down' | 'chevron_right'
  onClick: (
    event: React.SyntheticEvent,
    allowInteractiveElement: boolean
  ) => void
}) {
  const { trIsOpen, ariaLabel, icon, onClick } = props

  const tableContextAllProps = React.useContext(TableContext)?.allProps
  const iconSize =
    tableContextAllProps?.size === 'medium' ||
    tableContextAllProps?.size === 'small'
      ? 'basis'
      : 'medium'

  return (
    <Td className="dnb-table__td__button-icon">
      <span className="dnb-table__button">
        <IconPrimary icon={icon} size={iconSize} />
        <Button
          className="dnb-sr-only"
          tabIndex={-1}
          aria-label={ariaLabel}
          aria-expanded={Boolean(trIsOpen)}
          {...(trIsOpen != null
            ? { 'aria-expanded': Boolean(trIsOpen) }
            : {})}
          on_click={(event) => onClick(event, true)}
        />
      </span>
    </Td>
  )
}

export function TableIconSrTh(props: { text: string }) {
  const { text } = props

  return (
    <Th aria-hidden className="dnb-table__th__button-icon">
      <div>{text}</div>
    </Th>
  )
}

export const isTableHead = (children: React.ReactNode[]) =>
  children.some((element: React.ReactElement) => element.type === Th)

import { useCallback, useContext } from 'react'
import type {
  KeyboardEvent,
  ReactElement,
  ReactNode,
  SyntheticEvent,
  TableHTMLAttributes,
} from 'react'
import clsx from 'clsx'
import useId from '../../shared/helpers/useId'
import { emptySelectedText, hasSelectedText } from '../../shared/helpers'
import Button from '../button/Button'
import IconPrimary from '../icon/IconPrimary'
import Th from './TableTh'
import Td from './TableTd'
import { TableContext } from './TableContext'
import type { TableTrProps, TableTrClickInfo } from './TableTr'

export type TableClickableHeadProps = {
  trIsOpen?: boolean
  trIsHover?: boolean
  trHadClick?: boolean
  clickable: boolean
  noAnimation?: boolean
  ariaLabel: string
  onClick?: (
    event: SyntheticEvent,
    allowInteractiveElement?: boolean
  ) => void
} & Omit<TableTrProps, 'onClick'> &
  Omit<TableHTMLAttributes<HTMLTableRowElement>, 'onClick'>

export function TableClickableHead(allProps: TableClickableHeadProps) {
  const {
    children,
    className,
    disabled,
    expanded,
    onClick,
    onOpen,
    onClose,

    trIsOpen,
    trIsHover,
    trHadClick,
    clickable,
    noAnimation,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    ariaLabel,
    style,
    ...props
  } = allProps

  const tableContext = useContext(TableContext)
  const id = useId()
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
      role="row"
      tabIndex={clickable && !disabled ? 0 : undefined}
      className={clsx(
        className,
        clickable && 'dnb-table__tr--clickable',
        trIsOpen && 'dnb-table__tr--expanded',
        disabled && 'dnb-table__tr--disabled',
        noAnimation && 'dnb-table__tr--no-animation',
        trIsHover && trHadClick && 'dnb-table__tr--hover'
      )}
      style={{
        ...style,
        viewTransitionName: tableContext.hasAccordionRows
          ? `row-${id}`
          : undefined,
      }}
      {...trParams}
      {...props}
    >
      {children}
    </tr>
  )

  function onKeydownHandler(event: KeyboardEvent<HTMLTableRowElement>) {
    switch (event.key) {
      case ' ':
      case 'Enter':
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
  event: SyntheticEvent,
  allowInteractiveElement = false,
  onClick?: (event: SyntheticEvent, info: TableTrClickInfo) => void
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
    !(hasSelectedText() && event.type === 'click')
  ) {
    const trElement = (target.closest('tr') ||
      null) as HTMLTableRowElement | null

    onClick?.(event, {
      trElement,
    })
  }
}

export function TableClickableButtonTd(props: {
  trIsOpen?: boolean
  ariaLabel: string
  icon: 'chevron_down' | 'chevron_right'
  onClick: (
    event: SyntheticEvent,
    allowInteractiveElement: boolean
  ) => void
}) {
  const { trIsOpen, ariaLabel, icon, onClick } = props

  const tableContextAllProps = useContext(TableContext)?.allProps
  const iconSize =
    tableContextAllProps?.size === 'medium' ||
    tableContextAllProps?.size === 'small'
      ? 'basis'
      : 'medium'

  const emptyTextHandler = useCallback(() => {
    // Empty the selected text, so that the user can always expand/close accordion.
    // The selected text is not automatically cleared because we have
    // CSS property `user-select: none` to prevent selection on double-click.
    emptySelectedText()
  }, [])

  const onClickHandler = useCallback(
    (event: SyntheticEvent) => {
      onClick(event, true)
    },
    [onClick]
  )

  return (
    <Td className="dnb-table__td__button-icon">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <span className="dnb-table__button" onClick={emptyTextHandler}>
        <IconPrimary icon={icon} size={iconSize} />
        <Button
          className="dnb-sr-only"
          tabIndex={-1}
          aria-label={ariaLabel}
          aria-expanded={Boolean(trIsOpen)}
          {...(trIsOpen != null
            ? { 'aria-expanded': Boolean(trIsOpen) }
            : {})}
          onClick={onClickHandler}
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

export const isTableHead = (children: ReactNode[]) =>
  children.some((element) => (element as ReactElement).type === Th)

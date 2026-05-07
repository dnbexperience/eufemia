import type { ReactNode, SyntheticEvent, TdHTMLAttributes } from 'react'
import clsx from 'clsx'
import IconPrimary from '../icon/IconPrimary'
import type { IconIcon } from '../icon/Icon'
import { TableAccordionContentSingle } from './table-accordion/TableAccordionContent'

export type TableTdClickInfo = {
  trElement: HTMLTableRowElement | null
  tdElement: HTMLTableCellElement | null
  thElement: HTMLTableCellElement | null
}

export type TableTdProps = {
  /**
   * if set to `true`, no padding will be added
   * Default: `false`
   */
  noSpacing?: boolean

  /**
   * Set to `horizontal` for padding on left and right side
   * Default: `undefined`
   */
  spacing?: 'horizontal'

  /**
   * Vertical alignment of the cell content.
   * Default: `undefined`
   */
  verticalAlign?: 'top' | 'middle' | 'bottom'

  /**
   * Will emit when user clicks the cell button.
   * Renders a native button inside the cell for accessibility.
   * The second argument contains `trElement`, `tdElement`, and `thElement` (the matching Th in thead).
   */
  onClick?: (event: SyntheticEvent, info: TableTdClickInfo) => void

  /**
   * Icon to show in the navigable cell.
   * Set to `true` for the default chevron icon, or pass a custom icon.
   * Set to `false` to hide the icon.
   * Only takes effect when `onClick` is provided.
   * Default: `true`
   */
  icon?: boolean | IconIcon

  /**
   * The content of the component.
   * Default: `null`
   */
  children?: ReactNode
}

export default function Td(
  componentProps: TableTdProps &
    Omit<TdHTMLAttributes<HTMLTableCellElement>, 'onClick'>
) {
  const {
    className,
    children,
    noSpacing,
    spacing,
    verticalAlign,
    onClick,
    icon = true,
    ...props
  } = componentProps

  const hasOnClick = typeof onClick === 'function'

  const resolvedIcon = icon === true ? 'chevron_right' : icon

  return (
    <td
      // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
      role="cell"
      className={clsx(
        'dnb-table__td',
        noSpacing && 'dnb-table__td--no-spacing',
        spacing && `dnb-table__td--spacing-${spacing}`,
        verticalAlign && `dnb-table__td--vertical-align-${verticalAlign}`,
        hasOnClick && 'dnb-table__td--clickable',
        className
      )}
      {...props}
    >
      {hasOnClick ? (
        <button
          type="button"
          className="dnb-table__td__button"
          onClick={(event) => {
            const tdElement = event.currentTarget
              .parentElement as HTMLTableCellElement
            const trElement =
              (tdElement?.parentElement as HTMLTableRowElement) || null
            const columnIndex = tdElement
              ? Array.from(trElement?.children || []).indexOf(tdElement)
              : -1
            const table = trElement?.closest('table')
            const thElement = table?.querySelector(
              `thead tr th:nth-child(${columnIndex + 1})`
            ) as HTMLTableCellElement | null

            onClick(event, {
              trElement,
              tdElement,
              thElement,
            })
          }}
        >
          <span className="dnb-table__td__button__content">
            {children}
          </span>

          {resolvedIcon && (
            <IconPrimary
              className="dnb-table__td__button__icon"
              icon={resolvedIcon}
              size="basis"
            />
          )}
        </button>
      ) : (
        children
      )}
    </td>
  )
}

Td.AccordionContent = TableAccordionContentSingle

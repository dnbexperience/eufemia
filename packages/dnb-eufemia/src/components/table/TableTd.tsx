import {
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type SyntheticEvent,
  type TdHTMLAttributes,
} from 'react'
import { clsx } from 'clsx'
import IconPrimary from '../icon/IconPrimary'
import type { IconIcon } from '../icon/Icon'
import { TableAccordionContentSingle } from './table-accordion/TableAccordionContent'
import { TableTrContext } from './TableTrContext'

export type TableTdClickInfo = {
  trElement: HTMLTableRowElement | null
  tdElement: HTMLTableCellElement | null
  thElement: HTMLTableCellElement | null
  isSelected: boolean
  setSelected: (selected: boolean) => boolean
}

export type TableTdProps = {
  /**
   * If set to `true`, no padding will be added.
   * Default: `false`
   */
  noSpacing?: boolean

  /**
   * Set to `horizontal` for padding on left and right side.
   * Default: `undefined`
   */
  spacing?: 'horizontal'

  /**
   * Vertical alignment of the cell content.
   * Default: `undefined`
   */
  verticalAlign?: 'top' | 'middle' | 'bottom'

  /**
   * When `true`, the cell is styled as selected (highlighted background and selected icon/border). Requires `onClick` to take effect, since the selected styling targets the cell button. When provided (either `true` or `false`), the cell button is announced as a toggle button by screen readers via `aria-pressed`. Use `setSelected` from the `onClick` callback to toggle the state.
   * Default: `undefined`
   */
  selected?: boolean

  /**
   * If set to `true`, the cell receives a highlighted background. Automatically set when the parent `<Tr>` has `highlight`, or when the corresponding `<Th>` in the same column has `highlight`.
   * Default: `false`
   */
  highlight?: boolean

  /**
   * Will emit when user clicks the cell button. The second argument is an object with `trElement` (the parent `HTMLTableRowElement`), `tdElement` (the `HTMLTableCellElement`), `thElement` (the matching `<Th>` from `<thead>`, or `null` if not found), `isSelected` (current selected state), and `setSelected` (function to update the selected state — only effective when the `selected` prop is provided).
   * Default: `undefined`
   */
  onClick?: (event: SyntheticEvent, info: TableTdClickInfo) => void

  /**
   * Icon to show in the clickable cell. Set to `true` for the default chevron icon, or pass a custom icon. Set to `false` to hide the icon. Only takes effect when `onClick` is provided.
   * Default: `true`
   */
  icon?: boolean | IconIcon

  /**
   * The content of the component.
   * Default: `undefined`
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
    highlight: highlightProp,
    selected: selectedProp,
    onClick,
    icon = true,
    ...props
  } = componentProps

  const trContext = useContext(TableTrContext)
  const highlight = highlightProp || trContext?.highlight

  const hasOnClick = typeof onClick === 'function'
  const isSelectable = selectedProp !== undefined
  const [selectedState, setSelectedState] = useState(selectedProp ?? false)
  const isSelected = isSelectable ? selectedState : false

  useEffect(() => {
    if (selectedProp !== undefined) {
      setSelectedState(selectedProp)
    }
  }, [selectedProp])

  const setSelected = useCallback(
    (value: boolean) => {
      if (isSelectable) {
        setSelectedState(value)
      }
      return value
    },
    [isSelectable]
  )

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
        isSelected && 'dnb-table__td--selected',
        highlight && 'dnb-table__td--highlight',
        className
      )}
      {...props}
    >
      {hasOnClick ? (
        <button
          type="button"
          className="dnb-table__td__button"
          aria-pressed={isSelectable ? isSelected : undefined}
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
              isSelected,
              setSelected,
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

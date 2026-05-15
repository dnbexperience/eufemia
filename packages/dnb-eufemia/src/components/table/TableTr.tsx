import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode, SyntheticEvent, TableHTMLAttributes } from 'react'
import clsx from 'clsx'
import { TableAccordionHead } from './table-accordion/TableAccordionHead'
import { TableNavigationHead } from './table-navigation/TableNavigationHead'
import { TableAccordionContentRow } from './table-accordion/TableAccordionContent'
import { TableContext } from './TableContext'
import { TableTrContext } from './TableTrContext'

export type TableTrClickInfo = {
  trElement: HTMLTableRowElement | null
}

export type TableTrProps = {
  /**
   * The variant of the tr
   */
  variant?: 'even' | 'odd'

  /**
   * If set to true, the inherited header text will not wrap to new lines.
   * Default: `false`
   */
  noWrap?: boolean

  /**
   * Vertical alignment of all cell content in the row.
   * Default: `undefined`
   */
  verticalAlign?: 'top' | 'middle' | 'bottom'

  /**
   * Highlights all cells in the row with a subtle background.
   * Default: `false`
   */
  highlight?: boolean

  /**
   * Set true to render the tr initially as expanded.
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
   * Default: `false`
   */
  expanded?: boolean

  /**
   * Set true to disable the tr to be accessible as an interactive element.
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"`prop in main Table.
   * Default: `false`
   */
  disabled?: boolean

  /**
   * Set to true to skip animation.
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
   * Default: `false`
   */
  noAnimation?: boolean

  /**
   * Set to `true` to keep the accordion content in the DOM when closed.
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
   * Default: `false`
   */
  keepInDOM?: boolean

  /**
   * Will emit when user clicks/expands or on keydown space/enter(in mode="accordion" and mode="navigation") in the table row.
   * Is part of the mode feature and needs to be enabled with the `mode` prop in main Table.
   * The second argument contains `trElement`.
   */
  onClick?: (event: SyntheticEvent, info: TableTrClickInfo) => void

  /**
   * Will emit when table row is expanded.
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
   */
  onOpen?: ({ target }: { target: HTMLTableRowElement }) => void

  /**
   * Will emit when table row is closed (after it was open)
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
   */
  onClose?: ({ target }: { target: HTMLTableRowElement }) => void

  /**
   * The content of the component.
   */
  children: ReactNode
}

export default function Tr(
  componentProps: TableTrProps &
    Omit<TableHTMLAttributes<HTMLTableRowElement>, 'onClick'>
) {
  const {
    variant,
    noWrap,
    verticalAlign,
    highlight,
    className: _className,
    ...restProps
  } = componentProps

  const { currentVariant, isLast, count } = useHandleTrVariant({
    variant,
  })

  const className = clsx(
    'dnb-table__tr',
    currentVariant && `dnb-table__tr--${currentVariant}`,
    isLast && 'dnb-table__tr--last',
    noWrap && 'dnb-table--no-wrap',
    verticalAlign && `dnb-table__tr--vertical-align-${verticalAlign}`,
    _className
  )

  const tableContext = useContext(TableContext)
  const trContext = highlight ? { highlight } : null

  if (tableContext?.allProps?.mode == 'accordion') {
    return (
      <TableTrContext value={trContext}>
        <TableAccordionHead
          count={count}
          className={className}
          {...restProps}
        />
      </TableTrContext>
    )
  }
  if (tableContext?.allProps?.mode === 'navigation') {
    return (
      <TableTrContext value={trContext}>
        <TableNavigationHead className={className} {...restProps} />
      </TableTrContext>
    )
  }

  const {
    expanded,
    disabled,
    noAnimation,
    keepInDOM,
    onClick,
    onOpen,
    onClose,
    ...trProps
  } = restProps

  return (
    <TableTrContext value={trContext}>
      <tr role="row" className={className} {...trProps} />
    </TableTrContext>
  )
}

function useHandleTrVariant({ variant }) {
  const tableContext = useContext(TableContext)

  /**
   * Handle odd/even
   */
  const countRef = tableContext?.trCountRef.current
  const lastRenderAliasRef = useRef(null)
  const hasIncrementedRef = useRef(false)

  const increment = useCallback(() => {
    if (typeof countRef === 'undefined') {
      return 0
    }
    if (
      !variant ||
      (variant === 'even' && countRef.count % 2 === 1) ||
      (variant === 'odd' && countRef.count % 2 === 0)
    ) {
      countRef.count++
    }

    return countRef.count
  }, [countRef, variant])

  const [count, setCount] = useState(() => {
    // Guard against StrictMode double-invocation of useState initializer.
    // Refs persist across StrictMode's double-calls, so the second call
    // returns the current count without re-incrementing.
    if (hasIncrementedRef.current) {
      return countRef?.count ?? 0
    }

    hasIncrementedRef.current = true
    return increment()
  })

  useEffect(() => {
    if (lastRenderAliasRef.current === null) {
      // Initial mount - useState already handled the count
      lastRenderAliasRef.current = tableContext?.rerenderAlias
      return // stop here
    }

    if (lastRenderAliasRef.current !== tableContext?.rerenderAlias) {
      lastRenderAliasRef.current = tableContext?.rerenderAlias
      hasIncrementedRef.current = false
    }

    if (!hasIncrementedRef.current) {
      hasIncrementedRef.current = true
      setCount(increment())
    }
  }, [tableContext?.rerenderAlias, increment])

  /**
   * Find out the current odd/even when "accordionContent" is used.
   * Because we have now an additional "tr" element.
   * Then the CSS can't figure out the correct nth element (nth-of-type)
   * and we need to set it manually (nth-child and nth-of-type do not respect classes, so we can't ignore this one).
   */
  let currentVariant = variant
  if (!currentVariant) {
    currentVariant = count % 2 ? 'odd' : 'even'
  }
  const isLast =
    typeof countRef !== 'undefined' && countRef.count === count
  return {
    currentVariant,
    isLast,
    count,
  }
}

/**
 * Handle odd/even on re-render and StrictMode
 */
export function useHandleOddEven({ children }) {
  // Create this ref in order to "auto" set even/odd class in tr elements
  const trCountRef = useRef({ count: 0 })

  // When the alias changes, all tr's will rerender and get a new even/odd color
  // This is useful, when one tr gets removed
  const [rerenderAlias, setRerenderAlias] = useState({})

  const forceRerender = useCallback(() => {
    trCountRef.current.count = 0
    setRerenderAlias({})
  }, [])

  const isMounted = useRef(false)
  useEffect(() => {
    if (isMounted.current) {
      forceRerender()
    }
    isMounted.current = true
  }, [children, forceRerender])

  return { trCountRef, rerenderAlias, setRerenderAlias }
}

Tr.AccordionContent = TableAccordionContentRow

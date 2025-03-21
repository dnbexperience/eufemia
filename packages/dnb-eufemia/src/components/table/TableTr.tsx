import React from 'react'
import classnames from 'classnames'
import { TableAccordionHead } from './table-accordion/TableAccordionHead'
import { TableNavigationHead } from './table-navigation/TableNavigationHead'
import { TableAccordionContentRow } from './table-accordion/TableAccordionContent'
import { TableContext } from './TableContext'

export type TableTrProps = {
  /**
   * The variant of the tr
   */
  variant?: 'even' | 'odd'

  /**
   * If set to true, the inherited header text will not wrap to new lines.
   * Default: false
   */
  noWrap?: boolean

  /**
   * Set true to render the tr initially as expanded.
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
   * Default: false
   */
  expanded?: boolean

  /**
   * Set true to disable the tr to be accessible as an interactive element.
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"`prop in main Table.
   * Default: false
   */
  disabled?: boolean

  /**
   * Set to true to skip animation.
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
   * Default: false
   */
  noAnimation?: boolean

  /**
   * Will emit when user clicks/expands or on keydown space/enter(in mode="accordion" and mode="navigation") in the table row.
   * Is part of the mode feature and needs to be enabled with the `mode` prop in main Table.
   */
  onClick?: (event: React.SyntheticEvent) => void

  /**
   * Will emit when table row is expanded.
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
   */
  onOpened?: ({ target }: { target: HTMLTableRowElement }) => void

  /**
   * Will emit when table row is closed (after it was open)
   * Is part of the accordion feature and needs to be enabled with `mode="accordion"` prop in main Table.
   */
  onClosed?: ({ target }: { target: HTMLTableRowElement }) => void

  /**
   * The content of the component.
   */
  children: React.ReactNode
}

export default function Tr(
  componentProps: TableTrProps &
    React.TableHTMLAttributes<HTMLTableRowElement>
) {
  const {
    variant,
    noWrap,
    className: _className,
    ...restProps
  } = componentProps

  const { currentVariant, isLast, count } = useHandleTrVariant({
    variant,
  })

  const className = classnames(
    'dnb-table__tr',
    currentVariant && `dnb-table__tr--${currentVariant}`,
    isLast && 'dnb-table__tr--last',
    noWrap && 'dnb-table--no-wrap',
    _className
  )

  const tableContext = React.useContext(TableContext)

  // Deprecated – can be removed in v11
  const deprecatedAccordionProp = tableContext?.allProps?.accordion

  if (
    deprecatedAccordionProp ||
    tableContext?.allProps?.mode == 'accordion'
  ) {
    return (
      <TableAccordionHead
        count={count}
        className={className}
        {...restProps}
      />
    )
  }
  if (tableContext?.allProps?.mode == 'navigation') {
    return <TableNavigationHead className={className} {...restProps} />
  }

  const {
    expanded, // eslint-disable-line @typescript-eslint/no-unused-vars
    disabled, // eslint-disable-line @typescript-eslint/no-unused-vars
    noAnimation, // eslint-disable-line @typescript-eslint/no-unused-vars
    onClick, // eslint-disable-line @typescript-eslint/no-unused-vars
    onOpened, // eslint-disable-line @typescript-eslint/no-unused-vars
    onClosed, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...trProps
  } = restProps

  return <tr role="row" className={className} {...trProps} />
}

function useHandleTrVariant({ variant }) {
  const tableContext = React.useContext(TableContext)

  /**
   * Handle odd/even
   */
  const countRef = tableContext?.trCountRef.current
  const increment = () => {
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
  }

  const [count, setCount] = React.useState(() => {
    // SSR Support
    if (typeof window === 'undefined') {
      return increment()
    }
  })

  // StrictMode support
  React.useEffect(() => {
    // SSR will not execute useEffect
    setCount(increment())
  }, [tableContext?.rerenderAlias]) // eslint-disable-line react-hooks/exhaustive-deps

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
 * Handle odd/even on re-render and React.StrictMode
 */
export function useHandleOddEven({ children }) {
  // Create this ref in order to "auto" set even/odd class in tr elements
  const trCountRef = React.useRef({ count: 0 })

  // When the alias changes, all tr's will rerender and get a new even/odd color
  // This is useful, when one tr gets removed
  const [rerenderAlias, setRerenderAlias] = React.useState({}) // eslint-disable-line no-unused-vars

  const forceRerender = React.useCallback(() => {
    trCountRef.current.count = 0
    setRerenderAlias({})
  }, [])

  const isMounted = React.useRef(false)
  React.useEffect(() => {
    if (isMounted.current) {
      forceRerender()
    }
    isMounted.current = true
  }, [children]) // eslint-disable-line react-hooks/exhaustive-deps

  return { trCountRef, rerenderAlias, setRerenderAlias }
}

Tr.AccordionContent = TableAccordionContentRow

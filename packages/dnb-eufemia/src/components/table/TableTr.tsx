import React from 'react'
import classnames from 'classnames'
import { useTableAccordion } from './TableAccordion'
import { TableTdProps } from './TableTd'
import TableContext from './TableContext'

export type TableTrProps = {
  /**
   * The variant of the tr
   */
  variant?: 'even' | 'odd'

  /**
   * If set to true, the inherited header text will not wrap to new lines
   * Default: false
   */
  noWrap?: boolean

  /**
   * Set true to render the tr initially as expanded
   * Is part of the accordion feature and needs to be enabled with `accordion` prop in main Table
   * Default: false
   */
  expanded?: boolean

  /**
   * Set true to disable the tr to be accessible as an interactive element
   * Is part of the accordion feature and needs to be enabled with `accordion` prop in main Table
   * Default: false
   */
  disabled?: boolean

  /**
   * Set to true to skip animation
   * Is part of the accordion feature and needs to be enabled with `accordion` prop in main Table
   * Default: false
   */
  noAnimation?: boolean

  /**
   * Will emit when user clicks/expands the table row
   * Is part of the accordion feature and needs to be enabled with `accordion` prop in main Table
   */
  onClick?: (event?: React.SyntheticEvent) => void

  /**
   * Will emit when table row is expanded
   * Is part of the accordion feature and needs to be enabled with `accordion` prop in main Table
   */
  onOpened?: (event?: React.SyntheticEvent) => void

  /**
   * Will emit when table row is closed (after it was open)
   * Is part of the accordion feature and needs to be enabled with `accordion` prop in main Table
   */
  onClosed?: (event?: React.SyntheticEvent) => void

  /**
   * The content of the component.
   */
  children:
    | React.ReactElement<TableTdProps>
    | Array<React.ReactElement<TableTdProps>>
}

export default function Tr(
  componentProps: TableTrProps &
    React.TableHTMLAttributes<HTMLTableRowElement>
) {
  const {
    variant,
    noWrap,
    expanded,
    disabled,
    noAnimation,
    onClick,
    onOpened,
    onClosed,
    children,
    className: _className,
    ...props
  } = componentProps

  const { currentVariant } = useHandleTrVariant({ variant })

  const className = classnames(
    'dnb-table__tr',
    currentVariant && `dnb-table__tr--${currentVariant}`,
    noWrap && 'dnb-table--no-wrap',
    _className
  )

  const accordionTr = useTableAccordion({
    className,
    children,
    props,
    expanded,
    disabled,
    noAnimation,
    onClick,
    onOpened,
    onClosed,
  })

  if (accordionTr) {
    return accordionTr
  }

  return (
    <tr role="row" className={className} {...props}>
      {children}
    </tr>
  )
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

  return {
    currentVariant,
  }
}

/**
 * Handle odd/even on re-render and React.StrictMode
 */
export function useHandleOddEven({ children }) {
  // Create this ref in order to "auto" set even/odd class in tr elements
  const trCountRef = React.useRef({ count: 0 })

  // When the alias changes, all tr's will rerender and get a new even/odd color
  // This is usefull, when one tr gets removed
  const [rerenderAlias, setRerenderAlias] = React.useState({}) // eslint-disable-line no-unused-vars

  const isMounted = React.useRef(false)
  React.useEffect(() => {
    if (isMounted.current) {
      forceRerender()
    }
    isMounted.current = true
  }, [children]) // eslint-disable-line react-hooks/exhaustive-deps

  return { trCountRef, rerenderAlias, setRerenderAlias }

  function forceRerender() {
    trCountRef.current.count = 0
    setRerenderAlias({})
  }
}

import React from 'react'
import classnames from 'classnames'
import { TableTdProps } from './TableTd'
import TableContext from './TableContext'

export type TableTrProps = {
  /**
   * The variant of the tr
   */
  variant?: 'even' | 'odd'

  /**
   * The content of the component.
   */
  children:
    | React.ReactElement<TableTdProps>
    | Array<React.ReactElement<TableTdProps>>
}

const Tr = (
  componentProps: TableTrProps &
    React.TableHTMLAttributes<HTMLTableRowElement>
) => {
  const {
    variant,
    className,
    children,

    ...props
  } = componentProps

  const tableContext = React.useContext(TableContext)

  const { currentVariant, trRef, trParams } = useHandleTrLogic({
    tableContext,
    variant,
  })

  return (
    <tr
      role="row"
      className={classnames(
        'dnb-table__tr',
        currentVariant && `dnb-table__tr--${currentVariant}`,
        className
      )}
      ref={trRef}
      {...trParams}
      {...props}
    >
      {children}
    </tr>
  )
}

export default Tr

function useHandleTrLogic({ tableContext, variant }) {
  const trRef = React.useRef(null)

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
  const decrement = () => {
    if (typeof countRef === 'undefined') {
      return null
    }
    if (
      !variant ||
      (variant === 'even' && countRef.count % 2 === 1) ||
      (variant === 'odd' && countRef.count % 2 === 0)
    ) {
      countRef.count--
      tableContext?.forceRerender()
    }
  }

  // Run increment during SSR
  const count = React.useMemo(increment, [tableContext?.rerenderAlias]) // eslint-disable-line react-hooks/exhaustive-deps

  // Run decrement when component unmounts and force the whole table to re-render
  React.useEffect(() => decrement, [tableContext?.trCountRef]) // eslint-disable-line react-hooks/exhaustive-deps

  // For the whole table to re-render when a variant changes
  React.useEffect(() => {
    tableContext?.forceRerender()
  }, [variant]) // eslint-disable-line react-hooks/exhaustive-deps

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

  const trParams = {}

  return {
    trRef,
    currentVariant,
    trParams,
  }
}

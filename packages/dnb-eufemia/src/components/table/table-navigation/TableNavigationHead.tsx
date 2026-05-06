import { useCallback, useContext } from 'react'
import type { SyntheticEvent, TableHTMLAttributes } from 'react'
import Td from '../TableTd'
import { TableContext } from '../TableContext'
import {
  TableClickableButtonTd,
  TableClickableHead,
  TableIconSrTh,
  isTableHead,
  onClickTr,
} from '../TableClickableHead'

import type { TableTrProps } from '../TableTr'

export type TableNavigationHeadProps = TableTrProps &
  Omit<TableHTMLAttributes<HTMLTableRowElement>, 'onClick'>

export function TableNavigationHead(allProps: TableNavigationHeadProps) {
  const { children, onClick, ...props } = allProps
  const tableContext = useContext(TableContext)

  const content = Array.isArray(children) ? [...children] : [children]

  const hasOnClick = typeof onClick === 'function'

  const tableContextAllProps = useContext(TableContext)?.allProps

  const onClickHandler = useCallback(
    (event: SyntheticEvent, allowInteractiveElement?: boolean) => {
      onClickTr(event, allowInteractiveElement, onClick)
    },
    [onClick]
  )

  if (hasOnClick) {
    content.push(
      <TableClickableButtonTd
        key="td-icon"
        ariaLabel={tableContextAllProps?.navigationButtonSR}
        icon="chevron_right"
        onClick={onClickHandler}
      />
    )
  } else if (isTableHead(content)) {
    content.push(
      <TableIconSrTh
        key="th-icon"
        text={tableContext?.allProps?.navigationButtonSR}
      />
    )
  } else if (!hasOnClick) {
    content.push(<Td key="empty-td" />)
  }

  const onKeyDownHandler = useCallback(
    (event: SyntheticEvent) => {
      onClickTr(event, true, onClick)
    },
    [onClick]
  )

  return (
    <TableClickableHead
      clickable={hasOnClick}
      onClick={onClickHandler}
      onKeyDown={onKeyDownHandler}
      ariaLabel={tableContextAllProps?.navigationButtonSR}
      {...props}
    >
      {content}
    </TableClickableHead>
  )
}

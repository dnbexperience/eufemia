import React from 'react'
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
  React.TableHTMLAttributes<HTMLTableRowElement>

export function TableNavigationHead(allProps: TableNavigationHeadProps) {
  const { children, onClick, ...props } = allProps
  const tableContext = React.useContext(TableContext)

  let content = React.Children.toArray(children)

  const hasOnClick = typeof onClick === 'function'

  const tableContextAllProps = React.useContext(TableContext)?.allProps

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
    content.push(<Td key="empty-td"></Td>)
  }

  return (
    <TableClickableHead
      clickable={hasOnClick}
      onClick={onClickHandler}
      onKeyDown={onClick}
      ariaLabel={tableContextAllProps?.navigationButtonSR}
      {...props}
    >
      {content}
    </TableClickableHead>
  )

  function onClickHandler(
    event: React.SyntheticEvent,
    allowInteractiveElement?: boolean
  ) {
    onClickTr(event, allowInteractiveElement, onClick)
  }
}

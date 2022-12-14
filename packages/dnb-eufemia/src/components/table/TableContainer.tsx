import React from 'react'
import classnames from 'classnames'
import TableScrollView, { TableScrollViewProps } from './TableScrollView'
import { createSpacingClasses } from '../space/SpacingUtils'

import type { TableProps } from './Table'
import type { SpacingProps } from '../space/types'
import { validateDOMAttributes } from '../../shared/component-helper'

export type TableContainerProps = {
  /**
   * The content of the component.
   */
  children: [
    React.ReactElement<TableContainerHeadProps>,
    React.ReactElement<TableContainerBodyProps>,
    React.ReactElement<TableContainerFootProps>
  ]
}

export type TableContainerAllProps = TableContainerProps &
  React.TableHTMLAttributes<HTMLTableRowElement> &
  SpacingProps

type InternalTableContainerTableScrollView = Omit<
  TableScrollViewProps,
  'children'
> & {
  children: React.ReactNode
}

export default function TableContainer(props: TableContainerAllProps) {
  const { children, className, ...rest } = props
  const spacingClasses = createSpacingClasses(props)

  validateDOMAttributes(props, rest)

  const ScrollView =
    TableScrollView as React.FunctionComponent<InternalTableContainerTableScrollView>

  return (
    <section
      className={classnames(
        'dnb-table__container',
        className,
        spacingClasses
      )}
      {...rest}
    >
      <ScrollView>{children}</ScrollView>
    </section>
  )
}

export type TableContainerBodyProps = {
  /**
   * The content of the component.
   */
  children:
    | React.ReactElement<TableProps>
    | Array<React.ReactElement<TableProps>>
}

export function TableContainerBody(
  props: TableContainerBodyProps & React.HTMLAttributes<HTMLDivElement>
) {
  const { children, className, ...rest } = props

  return (
    <div
      className={classnames('dnb-table__container__body', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export type TableContainerHeadProps = {
  /**
   * The content of the component.
   */
  children: React.ReactNode
}

export function TableContainerHead(
  props: TableContainerHeadProps & React.HTMLAttributes<HTMLDivElement>
) {
  const { children, className, ...rest } = props

  return (
    <div
      className={classnames(
        'dnb-table__container__head',
        !children && 'dnb-table__container__head--empty',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export type TableContainerFootProps = {
  /**
   * The content of the component.
   */
  children: React.ReactNode
}

export function TableContainerFoot(
  props: TableContainerFootProps & React.HTMLAttributes<HTMLDivElement>
) {
  const { children, className, ...rest } = props

  return (
    <div
      className={classnames(
        'dnb-table__container__foot',
        !children && 'dnb-table__container__foot--empty',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

TableContainer.Body = TableContainerBody
TableContainer.Head = TableContainerHead
TableContainer.Foot = TableContainerFoot

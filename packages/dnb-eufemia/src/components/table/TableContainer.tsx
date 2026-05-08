import type {
  HTMLAttributes,
  JSX,
  ReactElement,
  ReactNode,
  TableHTMLAttributes,
} from 'react'
import clsx from 'clsx'
import type { TableScrollViewProps } from './TableScrollView'
import TableScrollView from './TableScrollView'
import { applySpacing } from '../space/SpacingUtils'

import type { TableProps } from './Table'
import type { SpacingProps } from '../../shared/types'
import { validateDOMAttributes } from '../../shared/component-helper'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type TableContainerProps = {
  /**
   * The content of the component.
   */
  children:
    | [
        ReactElement<TableContainerHeadProps>,
        ReactElement<TableContainerBodyProps>,
        ReactElement<TableContainerFootProps>,
      ]
    | ReactElement<TableContainerBodyProps>
}

export type TableContainerAllProps = TableContainerProps &
  TableHTMLAttributes<HTMLTableRowElement> &
  SpacingProps

type InternalTableContainerTableScrollView = Omit<
  TableScrollViewProps,
  'children'
> & {
  children: ReactNode
}

export default function TableContainer(props: TableContainerAllProps) {
  const { children, className, ...rest } = props

  validateDOMAttributes(props, rest)

  const sectionProps = applySpacing(props, {
    className: clsx('dnb-table__container', className),
    ...rest,
  })

  const ScrollView = TableScrollView as (
    props: InternalTableContainerTableScrollView
  ) => JSX.Element

  const isArray = Array.isArray(children)
  const content = isArray ? children : [children]

  if (content[0]?.type !== TableContainer.Head) {
    content.unshift(<TableContainer.Head key="head" />)
  }
  if (content[2]?.type !== TableContainer.Foot) {
    content.push(<TableContainer.Foot key="foot" />)
  }

  return (
    <section {...sectionProps}>
      <ScrollView>{content}</ScrollView>
    </section>
  )
}

export type TableContainerBodyProps = {
  /**
   * The content of the component.
   */
  children: ReactElement<TableProps> | Array<ReactElement<TableProps>>
}

export function TableContainerBody(
  props: TableContainerBodyProps & HTMLAttributes<HTMLDivElement>
) {
  const { children, className, ...rest } = props

  return (
    <div
      className={clsx('dnb-table__container__body', className)}
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
  children?: ReactNode
}

export function TableContainerHead(
  props: TableContainerHeadProps & HTMLAttributes<HTMLDivElement>
) {
  const { children, className, ...rest } = props

  return (
    <div
      className={clsx(
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
  children?: ReactNode
}

export function TableContainerFoot(
  props: TableContainerFootProps & HTMLAttributes<HTMLDivElement>
) {
  const { children, className, ...rest } = props

  return (
    <div
      className={clsx(
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
withComponentMarkers(TableContainer, { _supportsSpacingProps: true })

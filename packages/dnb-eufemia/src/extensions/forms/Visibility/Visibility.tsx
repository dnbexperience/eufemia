import React, { useContext } from 'react'
import pointer from 'json-pointer'
import * as DataContext from '../DataContext'
import { HeightAnimation } from '../../../components'
import { SpacingProps } from '../../../shared/types'

export type Props = {
  visible?: boolean
  /** Will use span instead of div */
  inline?: boolean
  /** Given data context path must be defined to show children */
  pathDefined?: string
  /** Given data context path must be undefined to show children */
  pathUndefined?: string
  /** Given data context path must be truthy to show children */
  pathTruthy?: string
  /** Given data context path must be falsy to show children */
  pathFalsy?: string
  /** Given data context path must be true to show children */
  pathTrue?: string
  /** Given data context path must be false to show children */
  pathFalse?: string
  /** Infer visibility calling given derivative function with the whole data set. Should return true/false for visibility.   */
  inferData?: (data: unknown) => boolean
  children: React.ReactNode
} & SpacingProps

function Visibility({
  visible,
  inline,
  pathDefined,
  pathUndefined,
  pathTruthy,
  pathFalsy,
  pathTrue,
  pathFalse,
  inferData,
  children,
  ...props
}: Props) {
  const dataContext = useContext(DataContext.Context)

  let open = true

  if (visible === false) {
    open = false
  }

  if (pathDefined && !pointer.has(dataContext.data, pathDefined)) {
    open = false
  }
  if (pathUndefined && pointer.has(dataContext.data, pathUndefined)) {
    open = false
  }

  if (
    pathTruthy &&
    (!pointer.has(dataContext.data, pathTruthy) ||
      !pointer.get(dataContext.data, pathTruthy))
  ) {
    open = false
  }
  if (
    pathFalsy &&
    pointer.has(dataContext.data, pathFalsy) &&
    Boolean(pointer.get(dataContext.data, pathFalsy))
  ) {
    open = false
  }

  if (
    pathTrue &&
    (!pointer.has(dataContext.data, pathTrue) ||
      pointer.get(dataContext.data, pathTrue) !== true)
  ) {
    open = false
  }
  if (
    pathFalse &&
    (!pointer.has(dataContext.data, pathFalse) ||
      pointer.get(dataContext.data, pathFalse) !== false)
  ) {
    open = false
  }

  if (inferData && !inferData(dataContext.data)) {
    open = false
  }

  return (
    <HeightAnimation
      element={inline ? 'span' : 'div'}
      animate={!inline}
      open={open}
      {...props}
    >
      {children}
    </HeightAnimation>
  )
}

Visibility._supportsSpacingProps = true
export default Visibility

import React, { useContext } from 'react'
import pointer from 'json-pointer'
import * as DataContext from '../DataContext'

export type Props = {
  visible?: boolean
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
}

function Visibility({
  visible,
  pathDefined,
  pathUndefined,
  pathTruthy,
  pathFalsy,
  pathTrue,
  pathFalse,
  inferData,
  children,
}: Props) {
  const dataContext = useContext(DataContext.Context)

  if (visible === false) {
    return null
  }

  if (pathDefined && !pointer.has(dataContext.data, pathDefined)) {
    return null
  }
  if (pathUndefined && pointer.has(dataContext.data, pathUndefined)) {
    return null
  }

  if (
    pathTruthy &&
    (!pointer.has(dataContext.data, pathTruthy) ||
      !pointer.get(dataContext.data, pathTruthy))
  ) {
    return null
  }
  if (
    pathFalsy &&
    pointer.has(dataContext.data, pathFalsy) &&
    Boolean(pointer.get(dataContext.data, pathFalsy))
  ) {
    return null
  }

  if (
    pathTrue &&
    (!pointer.has(dataContext.data, pathTrue) ||
      pointer.get(dataContext.data, pathTrue) !== true)
  ) {
    return null
  }
  if (
    pathFalse &&
    (!pointer.has(dataContext.data, pathFalse) ||
      pointer.get(dataContext.data, pathFalse) !== false)
  ) {
    return null
  }

  if (inferData && !inferData(dataContext.data)) {
    return null
  }

  return <>{children}</>
}

Visibility._supportsSpacingProps = 'children'
export default Visibility

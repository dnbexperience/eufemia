import React, { useContext, useMemo } from 'react'
import pointer from 'json-pointer'
import type { ComponentProps } from '../types'
import Context from './Context'

export type Props = ComponentProps & {
  /** JSON Pointer for where in the source dataset to point at in sub components */
  path?: string
  iterate?: boolean
  children?: React.ReactNode
}

function At(props: Props) {
  const { path = '/', iterate, children } = props
  const dataContext = useContext(Context)
  const { data: contextData, handlePathChange: contextHandlePathChange } =
    dataContext

  const data =
    contextData && pointer.has(contextData, path)
      ? pointer.get(contextData, path)
      : undefined

  const handlePathChange = useMemo(
    () =>
      contextHandlePathChange
        ? (changePath, value) => {
            contextHandlePathChange(`${path}${changePath}`, value)
          }
        : undefined,
    [contextHandlePathChange, path]
  )

  if (iterate) {
    if (!Array.isArray(data)) {
      return null
    }
    return (
      <>
        {data.map((element, i) => {
          const handlePathChange = contextHandlePathChange
            ? (changePath, value) => {
                contextHandlePathChange(`${path}/${i}${changePath}`, value)
              }
            : undefined

          return (
            <Context.Provider
              key={`element${i}`}
              value={{
                ...dataContext,
                data: element,
                handlePathChange,
              }}
            >
              {children}
            </Context.Provider>
          )
        })}
      </>
    )
  }

  return (
    <Context.Provider
      value={{
        ...dataContext,
        data,
        handlePathChange,
      }}
    >
      {children}
    </Context.Provider>
  )
}

At._supportsEufemiaSpacingProps = true
export default At

import React, { useCallback, useContext } from 'react'
import pointer from '../../utils/json-pointer'
import type { ComponentProps } from '../../types'
import Context, { ContextState } from '../Context'

export type Props = ComponentProps & {
  /** JSON Pointer for where in the source dataset to point at in sub components */
  path?: string
  iterate?: boolean
  children?: React.ReactNode
}

function At(props: Props) {
  const { path = '/', iterate, children } = props
  const dataContext = useContext(Context)
  const {
    data: contextData,
    handlePathChange: handlePathChangeDataContext,
  } = dataContext

  const data =
    contextData && pointer.has(contextData, path)
      ? pointer.get(contextData, path)
      : undefined

  const handlePathChange: ContextState['handlePathChange'] = useCallback(
    (changePath, value) => {
      handlePathChangeDataContext(`${path}${changePath}`, value)
    },
    [handlePathChangeDataContext, path]
  )

  if (iterate) {
    if (!Array.isArray(data)) {
      return null
    }
    return (
      <>
        {data.map((element, i) => {
          const handlePathChange = (
            handlePathChangeDataContext
              ? (changePath, value) => {
                  handlePathChangeDataContext(
                    `${path}/${i}${changePath}`,
                    value
                  )
                }
              : undefined
          ) as ContextState['handlePathChange']

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

At._supportsSpacingProps = true
export default At

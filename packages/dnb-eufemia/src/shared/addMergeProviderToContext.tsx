import React from 'react'
import type { Optional } from './types'

/**
 * Adds an alternative Provider, `MergeProvider`, to a Context. `.MergeProvider` allows you
 * to update individual properties of a Context value, instead of overwriting the value.
 *
 * _`MergeProvider` is only useful if the context value is an object with properties._
 *
 *
 * ## Example:
 *
 * ```
 * <MyContext.MergeProvider value={myNewValues}>
 * ```
 *
 * is equivalent to writing:
 *
 * ```
 * const myContextValues = useContext(MyContext)
 * <MyContext.Provider value={{...myContextValues, ...myNewValues}}>
 * ```
 * @param context A react context object
 * @returns the same context extended with the property `MergeProvider`
 */
export function addMergeProviderToContext<T extends object>(
  context: React.Context<T>
) {
  const mergableContext = context as React.Context<T> & {
    MergeProvider: (props: React.ProviderProps<Optional<T>>) => JSX.Element
  }

  const MergeProvider = ({
    value,
    ...props
  }: React.ProviderProps<Optional<T>>) => {
    return (
      <context.Provider
        value={{ ...React.useContext(context), ...value }}
        {...props}
      />
    )
  }

  mergableContext.MergeProvider = MergeProvider
  return mergableContext
}

import React, { useCallback, useContext } from 'react'
import { getStyleScopeHash } from '../plugins/postcss-isolated-style-scope/plugin-scope-hash.js'

export { getStyleScopeHash }

export type IsolatedStyleScopeProps = {
  scopeHash?: string | 'auto'
  disableCoreStyleWrapper?: boolean
  uniqueKey?: string | false
  children: React.ReactNode
  style?: React.CSSProperties & {
    [key: `--${string}`]: string | number
  }
}

export const IsolatedStyleScopeContext = React.createContext<
  {
    generatedScopeHash: string
    internalKeys: Set<string>
  } & Pick<
    IsolatedStyleScopeProps,
    'scopeHash' | 'disableCoreStyleWrapper' | 'style'
  >
>(undefined)

export default function IsolatedStyleScope(
  props: IsolatedStyleScopeProps
) {
  const styleScopeContext = useContext(IsolatedStyleScopeContext)
  const {
    scopeHash = 'auto',
    disableCoreStyleWrapper = false,
    uniqueKey = 'default',
    children,
    style,
  } = props

  if (
    // - When nested, we expect a scopeHash to be passed
    // else – we will not render the component with the scope a second time.
    styleScopeContext?.generatedScopeHash ? props.scopeHash : true
  ) {
    if (
      uniqueKey === false ||
      !styleScopeContext?.internalKeys?.has(uniqueKey)
    ) {
      const generatedScopeHash =
        scopeHash === 'auto'
          ? styleScopeContext?.generatedScopeHash || getStyleScopeHash()
          : scopeHash
      const internalKeys = new Set(styleScopeContext?.internalKeys || [])
      if (typeof uniqueKey === 'string') {
        internalKeys.add(uniqueKey)
      }

      return (
        <IsolatedStyleScopeContext.Provider
          value={{
            generatedScopeHash,
            scopeHash,
            internalKeys: internalKeys,
            disableCoreStyleWrapper,
            style,
          }}
        >
          <div
            data-scope-hash={
              scopeHash === 'auto'
                ? styleScopeContext?.scopeHash ?? scopeHash
                : scopeHash
            }
            data-scope-hash-id={uniqueKey || undefined}
            className={generatedScopeHash}
            style={style || styleScopeContext?.style}
          >
            {disableCoreStyleWrapper ? (
              children
            ) : (
              <div className="dnb-core-style">{children}</div>
            )}
          </div>
        </IsolatedStyleScopeContext.Provider>
      )
    }
  }

  return children
}

export function getStyleScopeRootElement(
  scopeHash = null,
  fallback = null
) {
  if (scopeHash === 'auto') {
    scopeHash = getStyleScopeHash()
  }

  if (typeof window === 'undefined') {
    return undefined
  }

  if (scopeHash) {
    return document.querySelector(`.${scopeHash}`)
  }

  return fallback || document.body
}

export function useStyleScopeRootElement() {
  const styleScopeContext = useContext(IsolatedStyleScopeContext)
  const { generatedScopeHash } = styleScopeContext || {}

  const getElement = useCallback(() => {
    return getStyleScopeRootElement(generatedScopeHash)
  }, [generatedScopeHash])

  return { getElement }
}

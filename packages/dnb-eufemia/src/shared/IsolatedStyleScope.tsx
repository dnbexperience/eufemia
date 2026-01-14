import React, { useCallback, useContext, useRef } from 'react'
import { getStyleScopeHash } from '../plugins/postcss-isolated-style-scope/plugin-scope-hash.js'
import { getSha } from './build-info/BuildInfo.js'

export { getStyleScopeHash }

export type IsolatedStyleScopeProps = {
  scopeHash?: string | 'auto'
  disableCoreStyleWrapper?: boolean
  uniqueKey?: string | false
  innerRef?: React.RefObject<HTMLDivElement>
  children: React.ReactNode
  style?: React.CSSProperties & {
    [key: `--${string}`]: string | number
  }
}

export const IsolatedStyleScopeContext = React.createContext<
  {
    generatedScopeHash: string
    scopeElementRef: React.RefObject<HTMLDivElement>
    internalKeys: Set<string>
    parentContextMap?: Map<string, any>
  } & Pick<
    IsolatedStyleScopeProps,
    'scopeHash' | 'disableCoreStyleWrapper' | 'style'
  >
>(undefined)

// Map to keep track of parent contexts by generatedScopeHash
const parentScopeContextMap = new Map<string, any>()

export default function IsolatedStyleScope(
  props: IsolatedStyleScopeProps
) {
  const styleScopeContext = useContext(IsolatedStyleScopeContext)
  const {
    scopeHash = 'auto',
    disableCoreStyleWrapper = false,
    uniqueKey = 'default',
    innerRef,
    children,
    style,
  } = props

  const localRef = useRef<HTMLDivElement>()
  const scopeElementRef = innerRef || localRef

  // Determine the generated scope hash for this instance
  const generatedScopeHash =
    scopeHash === 'auto'
      ? styleScopeContext?.generatedScopeHash || getStyleScopeHash()
      : scopeHash

  // If we are nested and the scope hash is different, render a new scope
  const isNestedWithNewScope =
    styleScopeContext &&
    styleScopeContext.generatedScopeHash &&
    styleScopeContext.generatedScopeHash !== generatedScopeHash

  // Always keep track of parent context if nested
  const parentContextMap =
    styleScopeContext?.parentContextMap || parentScopeContextMap
  if (styleScopeContext?.generatedScopeHash) {
    parentContextMap.set(
      styleScopeContext.generatedScopeHash,
      styleScopeContext
    )
  }

  if (
    // - When nested, we expect a scopeHash to be passed
    // else – we will not render the component with the scope a second time.
    styleScopeContext?.generatedScopeHash ? props.scopeHash : true
  ) {
    if (
      uniqueKey === false ||
      !styleScopeContext?.internalKeys?.has(uniqueKey) ||
      isNestedWithNewScope
    ) {
      const internalKeys = new Set(styleScopeContext?.internalKeys || [])
      if (typeof uniqueKey === 'string') {
        internalKeys.add(uniqueKey)
      }

      return (
        <IsolatedStyleScopeContext.Provider
          value={{
            scopeHash,
            generatedScopeHash,
            disableCoreStyleWrapper,
            style,
            scopeElementRef,
            internalKeys: internalKeys,
            parentContextMap,
          }}
        >
          <div
            data-scope-hash={
              scopeHash === 'auto'
                ? styleScopeContext?.scopeHash ?? scopeHash
                : scopeHash
            }
            data-scope-hash-id={uniqueKey || undefined}
            data-scope-sha={uniqueKey ? getSha() : undefined}
            className={generatedScopeHash}
            style={style || styleScopeContext?.style}
            ref={scopeElementRef}
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

export function getCurrentStyleScopeElement(
  currentElement: HTMLElement,
  scopeHash = 'auto',
  fallback = null
) {
  if (scopeHash === 'auto') {
    scopeHash = getStyleScopeHash()
  }

  if (typeof window === 'undefined') {
    return undefined
  }

  if (scopeHash) {
    return currentElement.closest(`.${scopeHash}`)
  }

  return fallback || document.body
}

// Updated hook to support looking up by scopeHash
export function useIsolatedStyleScope(scopeHash?: string) {
  const styleScopeContext = useContext(IsolatedStyleScopeContext)
  const { scopeElementRef, generatedScopeHash, parentContextMap } =
    styleScopeContext || {}

  const getScopeElement = useCallback(() => {
    if (!scopeHash || scopeHash === generatedScopeHash) {
      return scopeElementRef?.current
    }

    // Look up parent context for the given scopeHash
    const map = parentContextMap || parentScopeContextMap
    const parentCtx = map.get(scopeHash)
    return parentCtx?.scopeElementRef?.current
  }, [scopeElementRef, generatedScopeHash, parentContextMap, scopeHash])

  return { getScopeElement }
}

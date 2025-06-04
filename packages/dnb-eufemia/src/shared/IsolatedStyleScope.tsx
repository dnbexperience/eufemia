import React, { useCallback, useContext } from 'react'
import classnames from 'classnames'
import { getStyleScopeHash } from './BuildInfo.cjs'

export { getStyleScopeHash }

export type Props = {
  scopeHash?: string | 'auto'
  disableCoreStyleWrapper?: boolean
}
export type AllProps = Props & React.HTMLProps<HTMLDivElement>

export const StyleScopeContext = React.createContext<{
  scopeHash: string | 'auto'
  disableCoreStyleWrapper?: boolean
  __hasStyleScope: boolean
}>(undefined)

export default function IsolatedStyleScope(props: AllProps) {
  const styleScopeContext = useContext(StyleScopeContext)
  const {
    scopeHash = 'auto',
    disableCoreStyleWrapper = false,
    className,
    children,
    ...rest
  } = props

  if (!styleScopeContext?.__hasStyleScope && scopeHash) {
    const hash = scopeHash === 'auto' ? getStyleScopeHash() : scopeHash

    return (
      <StyleScopeContext.Provider
        value={{ scopeHash, __hasStyleScope: true }}
      >
        <div
          data-style-scope={scopeHash}
          className={classnames(hash, className)}
          {...rest}
        >
          {disableCoreStyleWrapper ? (
            children
          ) : (
            <div className="dnb-core-style">{children}</div>
          )}
        </div>
      </StyleScopeContext.Provider>
    )
  }

  return <>{children}</>
}

export function getStyleScopeRootElement(
  scopeHash = null,
  fallback = null
) {
  if (scopeHash === 'auto') {
    scopeHash = getStyleScopeHash
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
  const styleScopeContext = useContext(StyleScopeContext)
  const { scopeHash = styleScopeContext?.scopeHash } =
    styleScopeContext || {}

  const getElement = useCallback(() => {
    return getStyleScopeRootElement(scopeHash)
  }, [scopeHash])

  return { getElement }
}

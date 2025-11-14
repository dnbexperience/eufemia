import React, { useContext, useMemo, useReducer, useRef } from 'react'
import { createPortal } from 'react-dom'
import classnames from 'classnames'
import IsolatedStyleScope, {
  IsolatedStyleScopeContext,
} from '../../shared/IsolatedStyleScope'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

type SelectorOptions = {
  /**
   * The id used for the portal root element. Defaults to `eufemia-portal-root`.
   * If an element with this id already exists in the DOM, it will be reused.
   */
  id?: string
  /**
   * CSS selector for a container to place the portal root inside. The portal element is inserted as the first child of the matched element.
   */
  insideSelector?: string
  /**
   * CSS selector for a target element; the portal root will be inserted directly before the first matched element.
   */
  beforeSelector?: string
}

export type PortalRootProps = {
  innerRef?:
    | React.Ref<HTMLElement>
    | React.MutableRefObject<HTMLElement>
    | ((instance: HTMLElement) => void)
} & SelectorOptions &
  Omit<React.HTMLProps<HTMLElement>, 'ref' | 'id'>

type PortalRootContextValue = SelectorOptions

const PortalRootContext =
  React.createContext<PortalRootContextValue | null>(null)

export type PortalRootProviderProps =
  React.PropsWithChildren<SelectorOptions>

export function PortalRootProvider(
  props: PortalRootProviderProps
): JSX.Element | null {
  const { id, insideSelector, beforeSelector, children } = props

  const value = useMemo(
    () => ({ id, insideSelector, beforeSelector }),
    [id, insideSelector, beforeSelector]
  )

  return (
    <PortalRootContext.Provider value={value}>
      {children}
    </PortalRootContext.Provider>
  )
}

function PortalRoot(props: PortalRootProps = {}): JSX.Element {
  const {
    id: idProp,
    insideSelector: insideSelectorProp,
    beforeSelector: beforeSelectorProp,
    innerRef,
    className,
    style,
    children,
    ...rest
  } = props

  const [, forceUpdate] = useReducer(() => ({}), {})
  const { style: scopeStyle } = useContext(IsolatedStyleScopeContext) || {}
  const selectorContext = useContext(PortalRootContext)

  const hasPropOverride =
    typeof insideSelectorProp !== 'undefined' ||
    typeof beforeSelectorProp !== 'undefined'

  const insideSelector = hasPropOverride
    ? insideSelectorProp
    : selectorContext?.insideSelector
  const beforeSelector = hasPropOverride
    ? beforeSelectorProp
    : selectorContext?.beforeSelector

  const effectiveId =
    idProp ?? selectorContext?.id ?? 'eufemia-portal-root'

  // Get initial element for first render - may not find HTML element with id yet
  const initialElement = useMemo(() => {
    if (idProp && typeof document !== 'undefined') {
      return document.getElementById(idProp)
    }
    return getOrCreatePortalElement({
      id: effectiveId,
      insideSelector,
      beforeSelector,
    })
  }, [effectiveId, idProp, insideSelector, beforeSelector])
  const localRef = useRef<HTMLElement | null>(initialElement)

  useLayoutEffect(() => {
    if (idProp || insideSelector || beforeSelector) {
      const elem = getOrCreatePortalElement({
        id: effectiveId,
        insideSelector,
        beforeSelector,
      })
      if (localRef.current !== elem) {
        localRef.current = elem
        forceUpdate()
      }
    }

    if (innerRef && localRef.current) {
      if (typeof innerRef === 'function') {
        innerRef(localRef.current)
      } else {
        const ref = innerRef as React.MutableRefObject<HTMLElement>
        ref.current = localRef.current
      }
    }
  }, [effectiveId, idProp, innerRef, insideSelector, beforeSelector])

  const portalElement = localRef.current || initialElement
  if (!portalElement) {
    return null
  }

  return createPortal(
    <IsolatedStyleScope
      scopeHash="auto"
      disableCoreStyleWrapper
      uniqueKey={false} // ensure that the scope is used on every portal root
    >
      <div
        className={classnames('dnb-core-style', className)}
        style={{ ...scopeStyle, ...style }}
        {...rest}
      >
        {children}
      </div>
    </IsolatedStyleScope>,
    portalElement
  )
}

export function getOrCreatePortalElement({
  id,
  insideSelector,
  beforeSelector,
}: SelectorOptions): HTMLElement | null {
  if (typeof document === 'undefined') {
    return null
  }

  let elem = document.getElementById(id)

  if (!elem) {
    // Determine insertion point
    let parent: ParentNode & Node = document.body
    let referenceNode: ChildNode | null = document.body.firstChild

    if (beforeSelector) {
      const target = document.querySelector(beforeSelector)
      if (target && target.parentElement) {
        parent = target.parentElement
        referenceNode = target
      }
    } else if (insideSelector) {
      const target = document.querySelector(insideSelector)
      if (target) {
        parent = target
        referenceNode = target.firstChild
      }
    }

    elem = document.createElement('div')
    elem.setAttribute('id', id)
    parent.insertBefore(elem, referenceNode)
  }

  // Ensure role attribute
  if (!elem.hasAttribute('role')) {
    elem.setAttribute('role', 'presentation')
  }

  return elem
}
PortalRoot.Provider = PortalRootProvider

export default PortalRoot

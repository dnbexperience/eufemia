import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import classnames from 'classnames'
import IsolatedStyleScope, {
  IsolatedStyleScopeContext,
} from '../../shared/IsolatedStyleScope'

export type PortalRootProps = {
  innerRef?:
    | React.Ref<HTMLElement>
    | React.MutableRefObject<HTMLElement>
    | ((instance: HTMLElement) => void)
} & Omit<React.HTMLProps<HTMLElement>, 'ref'>

function PortalRoot({
  innerRef,
  className,
  style,
  children,
  ...rest
}: PortalRootProps): JSX.Element {
  const { style: scopeStyle } = useContext(IsolatedStyleScopeContext) || {}

  const id = 'eufemia-portal-root'
  const initialElement = useMemo(
    () => getOrCreatePortalElement(id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const localRef = useRef<HTMLElement | null>(initialElement)

  useEffect(() => {
    const elem = getOrCreatePortalElement(id)
    localRef.current = elem

    if (innerRef) {
      if (typeof innerRef === 'function') {
        innerRef(elem)
      } else {
        const ref = innerRef as React.MutableRefObject<HTMLElement>
        ref.current = elem
      }
    }

    // Do not remove the element, because it might be used by other components
  }, [id, innerRef])

  if (!localRef.current) {
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
    localRef.current
  )
}

export function getOrCreatePortalElement(id: string): HTMLElement | null {
  if (typeof window === 'undefined') {
    return null
  }

  let elem = document.getElementById(id) as HTMLElement | null
  if (!elem) {
    elem = document.createElement('div')
    elem.setAttribute('id', id)
    elem.setAttribute('role', 'presentation')
    document.body.insertBefore(elem, document.body.firstChild)
  }

  return elem
}

export default PortalRoot

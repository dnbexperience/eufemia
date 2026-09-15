import { useCallback, useEffect } from 'react'
import type { JSX } from 'react'
import { useToasterUI } from './useToasterState'
import { getToasterRefs } from './toasterRefs'
import useTranslation from '../../shared/useTranslation'

export type ToasterFocusProxyProps = {
  /** The ID of the Toaster.Host this component belongs to. */
  hostId: string

  /** Whether the notification button uses floating placement. */
  floating?: boolean
}

function ToasterFocusProxy({
  hostId,
  floating = false,
}: ToasterFocusProxyProps): JSX.Element {
  const state = useToasterUI(hostId)
  const refs = getToasterRefs(hostId)
  const tr = useTranslation().Toaster

  useEffect(() => {
    refs.hasFocusProxy.current = true
    return () => {
      refs.hasFocusProxy.current = false
    }
  }, [refs])

  const handleFocus = useCallback(
    (e: React.FocusEvent) => {
      if (!floating) {
        return // stop here — inline proxy is only a programmatic focus target
      }

      if (refs.returningRef.current || refs.programmaticFocusRef.current) {
        refs.returningRef.current = false
        return // stop here — arrived via sentinel, Escape, or dismiss-all
      }

      if (e.relatedTarget === refs.notificationButtonRef.current) {
        return // stop here — Shift+Tab from notification button
      }

      refs.programmaticFocusRef.current = true
      refs.notificationButtonRef.current?.focus()
      requestAnimationFrame(() => {
        refs.programmaticFocusRef.current = false
      })
    },
    [floating, refs]
  )

  return (
    <button
      ref={state.focusProxyRef}
      className="dnb-sr-only dnb-toaster__focus-proxy"
      tabIndex={floating ? 0 : -1}
      onFocus={handleFocus}
    >
      {tr.systemMessages}
    </button>
  )
}

export default ToasterFocusProxy

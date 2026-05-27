import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'

const FOCUS_MODE_CODE_PARAM = 'focusmode'

type FocusModeCodeContextType = {
  focusModeCodeId: string | null
  setFocusModeCodeId: (id: string | null) => void
  savedScrollY: React.RefObject<number>
}

const FocusModeCodeContext = createContext<FocusModeCodeContextType>({
  focusModeCodeId: null,
  setFocusModeCodeId: () => {},
  savedScrollY: { current: 0 },
})

export function FocusModeCodeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [focusModeCodeId, setFocusModeCodeIdState] = useState<
    string | null
  >(null)
  const savedScrollY = useRef(0)

  // Read URL param on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      return // stop here
    }

    const params = new URLSearchParams(window.location.search)
    const value = params.get(FOCUS_MODE_CODE_PARAM)

    if (value) {
      setFocusModeCodeIdState(value)

      // When loading directly into focusmode (e.g. page refresh),
      // restore the saved scroll position from sessionStorage so it
      // can be used when exiting focusmode.
      try {
        const stored = parseFloat(
          sessionStorage.getItem('scroll-window') || '0'
        )
        if (stored) {
          savedScrollY.current = stored
        }
      } catch {
        // ignore
      }

      // Defer validation until after components have rendered.
      // If the ID doesn't exist after a short delay, remove the focusmode param.
      const timeoutId = setTimeout(() => {
        const elementExists = document.getElementById(value)

        if (!elementExists) {
          const url = new URL(window.location.href)
          url.searchParams.delete(FOCUS_MODE_CODE_PARAM)
          window.history.replaceState(null, '', url.toString())
          setFocusModeCodeIdState(null)
        }
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [])

  const setFocusModeCodeId = useCallback((id: string | null) => {
    setFocusModeCodeIdState(id)

    if (typeof window === 'undefined') {
      return // stop here
    }

    const url = new URL(window.location.href)

    if (id) {
      url.searchParams.set(FOCUS_MODE_CODE_PARAM, id)
    } else {
      url.searchParams.delete(FOCUS_MODE_CODE_PARAM)
    }

    window.history.replaceState(null, '', url.toString())
  }, [])

  return (
    <FocusModeCodeContext.Provider
      value={{ focusModeCodeId, setFocusModeCodeId, savedScrollY }}
    >
      {children}
    </FocusModeCodeContext.Provider>
  )
}

export function useFocusModeCode() {
  return useContext(FocusModeCodeContext)
}

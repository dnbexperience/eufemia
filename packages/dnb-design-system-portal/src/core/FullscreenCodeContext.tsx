import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { ReactNode } from 'react'

const FULLSCREEN_CODE_PARAM = 'focusmode'

type FullscreenCodeContextType = {
  fullscreenCodeId: string | null
  setFullscreenCodeId: (id: string | null) => void
  savedScrollY: React.RefObject<number>
}

const FullscreenCodeContext = createContext<FullscreenCodeContextType>({
  fullscreenCodeId: null,
  setFullscreenCodeId: () => {},
  savedScrollY: { current: 0 },
})

export function FullscreenCodeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [fullscreenCodeId, setFullscreenCodeIdState] = useState<
    string | null
  >(null)
  const savedScrollY = useRef(0)

  // Read URL param on mount
  useEffect(() => {
    if (typeof window === 'undefined') {
      return // stop here
    }

    const params = new URLSearchParams(window.location.search)
    const value = params.get(FULLSCREEN_CODE_PARAM)

    if (value) {
      setFullscreenCodeIdState(value)

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

      // Defer validation until after components have rendered
      // If the ID doesn't exist after a short delay, remove the focusmode param
      const timeoutId = setTimeout(() => {
        const elementExists = document.getElementById(value)

        if (!elementExists) {
          // Remove invalid focusmode param from URL
          const url = new URL(window.location.href)
          url.searchParams.delete(FULLSCREEN_CODE_PARAM)
          window.history.replaceState(null, '', url.toString())
          setFullscreenCodeIdState(null)
        }
      }, 500) // Wait 500ms for components to render

      return () => clearTimeout(timeoutId)
    }
  }, [])

  const setFullscreenCodeId = useCallback((id: string | null) => {
    setFullscreenCodeIdState(id)

    if (typeof window === 'undefined') {
      return // stop here
    }

    const url = new URL(window.location.href)

    if (id) {
      url.searchParams.set(FULLSCREEN_CODE_PARAM, id)
    } else {
      url.searchParams.delete(FULLSCREEN_CODE_PARAM)
    }

    window.history.replaceState(null, '', url.toString())
  }, [])

  return (
    <FullscreenCodeContext.Provider
      value={{ fullscreenCodeId, setFullscreenCodeId, savedScrollY }}
    >
      {children}
    </FullscreenCodeContext.Provider>
  )
}

export function useFullscreenCode() {
  return useContext(FullscreenCodeContext)
}

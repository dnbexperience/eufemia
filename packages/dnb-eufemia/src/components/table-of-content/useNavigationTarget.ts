import { useCallback, useEffect, useState } from 'react'

export default function useNavigationTarget(enabled: boolean) {
  const [targetId, setTargetId] = useState<string | null>(null)
  const navigate = useCallback(
    (id: string) => {
      if (enabled) {
        setTargetId(id)
      }
    },
    [enabled]
  )

  useEffect(() => {
    if (!enabled) {
      setTargetId(null)
      return undefined
    }
    if (!targetId) {
      return undefined
    }

    const finish = () => setTargetId(null)
    let scrollTarget: EventTarget | null = null
    // A same-fragment click may not scroll at all.
    let timeout = setTimeout(finish, 1000)
    const onScroll = (event: Event) => {
      if (
        event.target instanceof Element &&
        event.target.closest('.dnb-table-of-content')
      ) {
        return
      }
      scrollTarget = event.target
      clearTimeout(timeout)
      // Fallback for browsers without scrollend.
      timeout = setTimeout(finish, 150)
    }
    const onScrollEnd = (event: Event) => {
      if (event.target === scrollTarget) {
        // A route's focus restoration can end before its smooth scroll starts.
        clearTimeout(timeout)
        timeout = setTimeout(finish, 150)
      }
    }

    window.addEventListener('scroll', onScroll, {
      capture: true,
      passive: true,
    })
    window.addEventListener('scrollend', onScrollEnd, true)
    window.addEventListener('wheel', finish, {
      capture: true,
      passive: true,
    })
    window.addEventListener('touchstart', finish, {
      capture: true,
      passive: true,
    })
    window.addEventListener('pointerdown', finish, true)
    window.addEventListener('keydown', finish, true)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('scrollend', onScrollEnd, true)
      window.removeEventListener('wheel', finish, true)
      window.removeEventListener('touchstart', finish, true)
      window.removeEventListener('pointerdown', finish, true)
      window.removeEventListener('keydown', finish, true)
    }
  }, [targetId, enabled])

  return { targetId: enabled ? targetId : null, navigate }
}

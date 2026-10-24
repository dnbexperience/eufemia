import { useCallback, useEffect, useState } from 'react'

export default function useNavigationTarget(enabled: boolean) {
  const [target, setTarget] = useState<{ id: string } | null>(null)
  const navigate = useCallback(
    (id: string) => {
      if (enabled) {
        setTarget({ id })
      }
    },
    [enabled]
  )

  useEffect(() => {
    if (!enabled) {
      setTarget(null)
      return undefined
    }
    if (!target) {
      return undefined
    }

    const finish = () => setTarget(null)
    let settled = false
    const settle = () => {
      // Short pages may stop before the destination reaches the selection offset.
      // Keep that destination selected until scrolling resumes or is interrupted.
      settled = true
    }
    let scrollTarget: EventTarget | null = null
    // A same-fragment click may not scroll at all.
    let timeout = setTimeout(settle, 1000)
    const onScroll = (event: Event) => {
      if (
        event.target instanceof Element &&
        event.target.closest('.dnb-table-of-content')
      ) {
        return
      }
      if (settled) {
        finish()
        return
      }
      scrollTarget = event.target
      clearTimeout(timeout)
      // Fallback for browsers without scrollend.
      timeout = setTimeout(settle, 150)
    }
    const onScrollEnd = (event: Event) => {
      if (event.target === scrollTarget) {
        // A route's focus restoration can end before its smooth scroll starts.
        clearTimeout(timeout)
        timeout = setTimeout(settle, 150)
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
    window.addEventListener('resize', finish)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('scrollend', onScrollEnd, true)
      window.removeEventListener('wheel', finish, true)
      window.removeEventListener('touchstart', finish, true)
      window.removeEventListener('pointerdown', finish, true)
      window.removeEventListener('keydown', finish, true)
      window.removeEventListener('resize', finish)
    }
  }, [target, enabled])

  return { targetId: enabled ? (target?.id ?? null) : null, navigate }
}

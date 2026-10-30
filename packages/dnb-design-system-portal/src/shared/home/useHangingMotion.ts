import { useLayoutEffect, useRef } from 'react'
import type mountHangingMotion from './hangingMotion'

export default function useHangingMotion() {
  const ref = useRef<HTMLDivElement>(null)
  const enter = useRef(
    typeof document !== 'undefined' &&
      document.documentElement.hasAttribute('data-portal-ready')
  )

  useLayoutEffect(() => {
    const root = ref.current
    const updateOffset = () => {
      root.style.setProperty(
        '--anchor-offset',
        root.getBoundingClientRect().top + window.scrollY + 'px'
      )
    }
    updateOffset()
    const resize = new ResizeObserver(updateOffset)
    resize.observe(root)
    resize.observe(root.previousElementSibling)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let disposed = false
    let pending = false
    let physics: ReturnType<typeof mountHangingMotion> | undefined
    let pointer: PointerEvent | undefined
    let latest: PointerEvent | undefined

    const load = (event?: PointerEvent) => {
      if (
        event?.type === 'pointerdown' &&
        event.button === 0 &&
        (event.target as Element).closest('[data-home-specimen]')
      ) {
        pointer = latest = event
      }
      if (reduced.matches || pending || physics) {
        return
      }
      pending = true
      void import('./hangingMotion')
        .then(
          (motion) => motion.default,
          () => null
        )
        .then((mount) => {
          if (!mount || disposed || reduced.matches) {
            return
          }
          physics = mount(root, enter.current)
          if (pointer) {
            physics.down(pointer)
            if (latest !== pointer) {
              physics.move(latest)
            }
          } else if (
            (event?.type === 'pointerover' ||
              (event?.type === 'pointerdown' &&
                event.pointerType === 'touch')) &&
            root.contains(event.target as Node)
          ) {
            physics.hover(event)
          } else if (!event && !enter.current) {
            physics.breeze()
          }
        })
        .catch(() => {
          // Brand, appearance and settings controls remain available.
        })
        .finally(() => {
          pending = false
          root.style.removeProperty('visibility')
        })
    }
    const idleTimer = setTimeout(() => load(), 1500 + Math.random() * 1000)
    if (enter.current && !reduced.matches) {
      root.style.visibility = 'hidden'
      load()
    }
    const move = (event: PointerEvent) => {
      if (pointer?.pointerId === event.pointerId) {
        latest = event
      }
    }
    const release = (event: PointerEvent) => {
      if (pointer?.pointerId === event.pointerId) {
        pointer = latest = undefined
      }
    }
    const preventSelection = (event: Event) => {
      if (pointer && !reduced.matches) {
        event.preventDefault()
      }
    }
    root.addEventListener('pointerover', load)
    root.addEventListener('pointerdown', load)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    document.addEventListener('selectstart', preventSelection)
    return () => {
      disposed = true
      clearTimeout(idleTimer)
      resize.disconnect()
      physics?.destroy()
      root.removeEventListener('pointerover', load)
      root.removeEventListener('pointerdown', load)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
      document.removeEventListener('selectstart', preventSelection)
    }
  }, [])

  return ref
}

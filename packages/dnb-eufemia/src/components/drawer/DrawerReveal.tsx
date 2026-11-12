import { useContext, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import ModalContext from '../modal/ModalContext'
import type { DrawerAllProps } from './Drawer'
import type { DrawerDriver, DrawerDriverProps } from './types'
import { clsx } from 'clsx'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import { DrawerContentContext } from './parts/DrawerContentContext'

type RevealState = {
  active: boolean
  dragging: boolean
  offset: number
  width: number
  dialog: HTMLElement | null
  update?: (offset: number) => void
  close?: (event: TouchEvent) => void
}

const revealTargets = new WeakMap<Element, RevealState>()

export type DrawerRevealOptions = {
  /** CSS selector for the page surfaces to move. Keep the Drawer outside these surfaces. */
  target: string
}

/** Create once outside rendering to preserve the Drawer state. */
export function createDrawerReveal({
  target,
}: DrawerRevealOptions): DrawerDriver {
  function Renderer(props: DrawerDriverProps) {
    return <RevealDrawer {...props} target={target} />
  }
  return { Renderer }
}

function RevealDrawer({
  renderDrawer,
  target,
  ...props
}: DrawerDriverProps & DrawerRevealOptions) {
  const reveal = useDrawerReveal(
    (props.containerPlacement ?? 'right') === 'left' && !props.disabled
      ? target
      : undefined,
    props.open
  )
  if (!reveal.enabled) {
    return renderDrawer(props)
  }
  return (
    <DrawerContentContext value={{ reveal: true }}>
      {renderDrawer(
        {
          ...props,
          open: reveal.open,
          onClose: (event) => {
            reveal.onClose()
            props.onClose?.(event)
          },
          overlayClass: clsx(
            'dnb-drawer__reveal-overlay',
            props.overlayClass
          ),
          contentClass: clsx('dnb-drawer__reveal', props.contentClass),
        },
        <RevealSurface
          state={reveal.state}
          target={target}
          noAnimation={props.noAnimation}
          noAnimationOnMobile={props.noAnimationOnMobile}
          animationDuration={props.animationDuration}
          preventOverlayClose={props.preventOverlayClose}
          preventClose={props.preventClose}
        />
      )}
    </DrawerContentContext>
  )
}

function useDrawerReveal(target: string, open: boolean) {
  const [swipeOpen, setSwipeOpen] = useState(false)
  const state = useRef<RevealState>({
    active: false,
    dragging: false,
    offset: 0,
    width: 0,
    dialog: null,
  })

  useEffect(() => {
    if (open) {
      setSwipeOpen(false)
    }
  }, [open])

  useEffect(() => {
    if (!target) {
      return undefined
    }

    let gesture: { x: number; y: number; opened: boolean }
    let dragFrame: number
    const reveal = state.current
    const surfaces = Array.from(document.querySelectorAll(target))
    surfaces.forEach((element) => revealTargets.set(element, reveal))
    const settle = (opened: boolean, event: TouchEvent) => {
      cancelAnimationFrame(dragFrame)
      dragFrame = undefined
      reveal.update?.(reveal.offset)
      reveal.dragging = false
      if (opened) {
        reveal.update?.(reveal.width)
      } else {
        reveal.close?.(event)
      }
      gesture = null
    }
    const start = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        if (gesture) {
          settle(gesture.opened, event)
        }
        return
      }
      const element = event.target as HTMLElement
      const opened = reveal.active
      if (!opened) {
        for (let parent = element; parent; parent = parent.parentElement) {
          const owner = revealTargets.get(parent)
          if (owner) {
            if (owner !== reveal) {
              return
            }
            break
          }
        }
      }
      if (opened) {
        if (
          element.closest('[role=dialog]') !== reveal.dialog ||
          element.closest(
            'input, textarea, select, [contenteditable], [role=slider], [role=separator]'
          )
        ) {
          return
        }
      } else if (
        !element.closest(target) ||
        document.documentElement.hasAttribute('data-dnb-modal-active') ||
        element.closest(
          'a, button, input, textarea, select, [contenteditable], [role=slider], [role=separator]'
        )
      ) {
        return
      }
      // Keep native horizontal controls and scrollable examples available.
      for (let parent = element; parent; parent = parent.parentElement) {
        if (parent === reveal.dialog) {
          break
        }
        if (
          parent.scrollWidth > parent.clientWidth &&
          /auto|scroll/.test(getComputedStyle(parent).overflowX)
        ) {
          return
        }
      }
      const touch = event.touches[0]
      gesture = {
        x: touch.clientX,
        y: touch.clientY,
        opened,
      }
    }
    const move = (event: TouchEvent) => {
      if (!gesture || event.touches.length !== 1) {
        return
      }
      let dx = event.touches[0].clientX - gesture.x
      const dy = event.touches[0].clientY - gesture.y
      if (!reveal.dragging) {
        if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) {
          gesture = null
          return
        }
        if (Math.abs(dx) < 10 || Math.abs(dx) < Math.abs(dy) * 1.25) {
          return
        }
        if ((gesture.opened && dx > 0) || (!gesture.opened && dx < 0)) {
          gesture = null
          return
        }
        reveal.dragging = true
        gesture.x = event.touches[0].clientX
        dx = 0
        if (!gesture.opened) {
          setSwipeOpen(true)
        }
      }
      event.preventDefault()
      reveal.offset = Math.max(
        0,
        Math.min(
          reveal.width || window.innerWidth * 0.9,
          (gesture.opened ? reveal.width : 0) + dx
        )
      )
      if (dragFrame === undefined) {
        dragFrame = requestAnimationFrame(() => {
          dragFrame = undefined
          reveal.update?.(reveal.offset)
        })
      }
    }
    const end = (event: TouchEvent) => {
      if (!gesture) {
        return
      }
      if (reveal.dragging) {
        settle(
          event.type === 'touchcancel'
            ? gesture.opened
            : reveal.offset > reveal.width / 2,
          event
        )
      } else {
        gesture = null
      }
    }
    document.addEventListener('touchstart', start, {
      passive: true,
      capture: true,
    })
    document.addEventListener('touchmove', move, {
      passive: false,
      capture: true,
    })
    document.addEventListener('touchend', end, true)
    document.addEventListener('touchcancel', end, true)
    return () => {
      surfaces.forEach((element) => revealTargets.delete(element))
      cancelAnimationFrame(dragFrame)
      document.removeEventListener('touchstart', start, true)
      document.removeEventListener('touchmove', move, true)
      document.removeEventListener('touchend', end, true)
      document.removeEventListener('touchcancel', end, true)
    }
  }, [target])

  return {
    enabled: Boolean(target),
    open: target ? swipeOpen || open : open,
    state,
    onClose: () => setSwipeOpen(false),
  }
}

function RevealSurface({
  state,
  target,
  animationDuration = 300,
  noAnimation,
  noAnimationOnMobile,
  preventOverlayClose,
  preventClose,
}: Pick<
  DrawerAllProps,
  | 'animationDuration'
  | 'noAnimation'
  | 'noAnimationOnMobile'
  | 'preventOverlayClose'
  | 'preventClose'
> & {
  state: RefObject<RevealState>
  target: string
}) {
  const { hide, contentId, close } = useContext(ModalContext)

  useIsomorphicLayoutEffect(() => {
    const reveal = state.current
    const dialog = document.getElementById(contentId)
    const drawer = dialog?.querySelector<HTMLElement>('.dnb-drawer')
    const edge = dialog?.querySelector<HTMLElement>(
      '.dnb-drawer__reveal-edge'
    )
    const surfaces = Array.from(
      document.querySelectorAll<HTMLElement>(target)
    )
    if (!drawer || !surfaces.length) {
      return undefined
    }
    const overlay = dialog.nextElementSibling as HTMLElement
    const layers = [dialog, overlay].filter(Boolean)
    const previousLayerStyles = layers.map((element) =>
      element.getAttribute('style')
    )
    // Keep the fixed containing block's bounds, including inline demos.
    // Absolute layers let Safari extend the translated page behind its bars.
    const position = () => {
      Object.assign(dialog.style, {
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
      })
      const bounds = dialog.getBoundingClientRect()
      const width = dialog.offsetWidth
      const height = dialog.offsetHeight
      Object.assign(dialog.style, {
        position: 'absolute',
        width: `${width}px`,
        height: `${height}px`,
      })
      const origin = dialog.getBoundingClientRect()
      const style = {
        position: 'absolute',
        top: `${(bounds.top - origin.top) / (height ? origin.height / height : 1)}px`,
        left: `${(bounds.left - origin.left) / (width ? origin.width / width : 1)}px`,
        width: `${width}px`,
        height: `${height}px`,
      }
      layers.forEach((element) => Object.assign(element.style, style))
    }
    position()
    window.addEventListener('resize', position)
    window.addEventListener('scroll', position, { passive: true })
    edge.style.color = getComputedStyle(drawer).backgroundColor
    reveal.dialog = dialog
    dialog.focus({ preventScroll: true })
    const keepFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || event.defaultPrevented) {
        return
      }
      const elements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex]'
        )
      ).filter(
        (element) =>
          element.tabIndex >= 0 &&
          !element.matches(':disabled') &&
          !element.closest('[inert], [aria-hidden="true"]') &&
          element.getClientRects().length > 0 &&
          getComputedStyle(element).visibility !== 'hidden'
      )
      const current = elements.indexOf(
        document.activeElement as HTMLElement
      )
      const next = event.shiftKey
        ? (current <= 0 ? elements.length : current) - 1
        : (current + 1) % elements.length
      event.preventDefault()
      ;(elements[next] || dialog).focus()
    }
    dialog.addEventListener('keydown', keepFocus)
    const overflowElements = [document.documentElement, document.body]
    const previousOverflow = overflowElements.map(
      (element) => element.style.overflowX
    )
    // Mobile layout viewports also need the body to contain translated overflow.
    overflowElements.forEach((element) => {
      element.style.overflowX = 'clip'
    })
    const duration =
      noAnimation ||
      (noAnimationOnMobile &&
        window.matchMedia('(max-width: 40em)').matches)
        ? 0
        : parseFloat(String(animationDuration))
    const previousStyles = surfaces.map((element) => ({
      transform: element.style.transform,
      opacity: element.style.opacity,
      inert: element.inert,
    }))
    surfaces.forEach((element) => {
      element.classList.add('dnb-drawer__reveal-target')
      element.inert = true
    })
    const elements = [...surfaces, dialog]
    elements.forEach((element) => {
      element.style.setProperty(
        '--drawer-reveal-duration',
        `${duration}ms`
      )
    })
    let dragging: boolean
    let opening: boolean
    let ready = duration === 0 || reveal.dragging
    reveal.update = (offset) => {
      if (opening !== reveal.active) {
        opening = reveal.active
        surfaces.forEach((element) => {
          element.classList.toggle('dnb-drawer__reveal-opening', opening)
        })
      }
      if (dragging !== reveal.dragging) {
        dragging = reveal.dragging
        elements.forEach((element) => {
          element.classList.toggle('dnb-drawer__reveal-dragging', dragging)
        })
      }
      if (!ready) {
        offset = 0
      }
      const transform = `translate3d(${offset}px, 0, 0)`
      const progress = reveal.width ? offset / reveal.width : 0
      surfaces.forEach((element) => {
        element.style.transform = transform
        element.style.opacity = String(
          1 - 0.32 * Math.max(0, (progress - 0.4) / 0.6)
        )
      })
      edge.style.transform = transform
      // Avoid invalidating inherited custom properties across the menu each frame.
      drawer.style.clipPath = `inset(0 ${Math.max(0, reveal.width - offset)}px 0 0)`
    }
    const measure = () => {
      reveal.width = drawer.getBoundingClientRect().width
      reveal.update(
        reveal.dragging
          ? Math.min(reveal.offset, reveal.width)
          : reveal.active
            ? reveal.width
            : 0
      )
    }
    const observer = new ResizeObserver(measure)
    observer.observe(drawer)
    measure()
    // Let modal setup and the closed surface paint before starting the transition.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        ready = true
        measure()
      })
    })
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', position)
      window.removeEventListener('scroll', position)
      layers.forEach((element, index) => {
        if (previousLayerStyles[index] === null) {
          element.removeAttribute('style')
        } else {
          element.setAttribute('style', previousLayerStyles[index])
        }
      })
      dialog.removeEventListener('keydown', keepFocus)
      surfaces.forEach((element, index) => {
        element.classList.remove(
          'dnb-drawer__reveal-target',
          'dnb-drawer__reveal-opening',
          'dnb-drawer__reveal-dragging'
        )
        const { inert, ...style } = previousStyles[index]
        Object.assign(element.style, style)
        element.inert = inert
        element.style.removeProperty('--drawer-reveal-duration')
      })
      overflowElements.forEach((element, index) => {
        element.style.overflowX = previousOverflow[index]
      })
      reveal.dialog = null
      reveal.update = undefined
      reveal.dragging = false
    }
  }, [
    state,
    target,
    contentId,
    animationDuration,
    noAnimation,
    noAnimationOnMobile,
  ])

  useIsomorphicLayoutEffect(() => {
    const reveal = state.current
    reveal.active = !hide
    reveal.close = (event) => {
      if (!preventOverlayClose) {
        close(event, { triggeredBy: 'overlay' })
      }
      if (preventOverlayClose || preventClose) {
        reveal.update?.(reveal.width)
      }
    }
    if (!reveal.dragging) {
      reveal.update?.(hide ? 0 : reveal.width)
    }
    return () => {
      reveal.active = false
      reveal.close = undefined
    }
  }, [hide, state, close, preventOverlayClose, preventClose])

  return <span className="dnb-drawer__reveal-edge" aria-hidden />
}

import { useRef } from 'react'
import type { RefObject } from 'react'
import useLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'

export default function useContentTransition(
  ref: RefObject<HTMLDivElement>,
  enabled: boolean,
  content: unknown
) {
  const previous = useRef<{
    signature: string
    view: HTMLElement
    top: number
    left: number
    width: number
    height: number
    scrollTop: number
  }>(null)
  const cleanup = useRef<() => void>(() => undefined)

  useLayoutEffect(() => {
    const view = ref.current
    const container = view?.parentElement
    const old = previous.current
    if (!enabled || !view) {
      cleanup.current()
      cleanup.current = () => undefined
      previous.current = null
      return
    }

    const signature = JSON.stringify(
      Array.from(view.querySelectorAll('a')).map((link) => {
        let depth = 0
        for (
          let parent = link.parentElement;
          parent && parent !== view;
          parent = parent.parentElement
        ) {
          if (parent.tagName === 'UL') {
            depth++
          }
        }
        return [link.getAttribute('href'), link.innerHTML, depth]
      })
    )
    if (old?.signature === signature) {
      return
    }
    cleanup.current()
    cleanup.current = () => undefined
    const rect = view.getBoundingClientRect()
    const bounds = container.getBoundingClientRect()
    const snapshot = view.cloneNode(true) as HTMLElement
    previous.current = {
      signature,
      view: snapshot,
      top: rect.top - bounds.top,
      left: rect.left - bounds.left,
      width: rect.width,
      height: rect.height,
      scrollTop: view.scrollTop,
    }
    if (
      !old ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !view.querySelector('a')?.getClientRects().length ||
      !view.animate
    ) {
      return
    }

    const outgoing = old.view
    outgoing.setAttribute('data-toc-outgoing', '')
    outgoing.setAttribute('data-toc-entering', '')
    outgoing.setAttribute('aria-hidden', 'true')
    outgoing.setAttribute('inert', '')
    const snapshotElements = [
      outgoing,
      ...outgoing.querySelectorAll(
        '[id], [href], [aria-labelledby], [aria-describedby]'
      ),
    ]
    snapshotElements.forEach((element) => {
      for (const attribute of [
        'id',
        'href',
        'aria-labelledby',
        'aria-describedby',
      ]) {
        element.removeAttribute(attribute)
      }
    })
    Object.assign(outgoing.style, {
      position: 'absolute',
      top: old.top + 'px',
      left: old.left + 'px',
      width: old.width + 'px',
      height: old.height + 'px',
      pointerEvents: 'none',
    })
    view.parentElement.append(outgoing)
    outgoing.scrollTop = old.scrollTop
    const easing =
      getComputedStyle(container)
        .getPropertyValue('--easing-default')
        .trim() || 'ease-out'
    const exit = outgoing.animate(
      [
        { opacity: 1, transform: 'translateX(0)' },
        { opacity: 0, transform: 'translateX(0.25rem)' },
      ],
      { duration: 100, easing, fill: 'both' }
    )
    const links = Array.from(view.querySelectorAll<HTMLAnchorElement>('a'))
    view.setAttribute('data-toc-entering', '')
    const enter = links.map((link, index) =>
      link.animate(
        [
          { opacity: 0, transform: 'translateX(-0.375rem)' },
          { opacity: 1, transform: 'translateX(0)' },
        ],
        {
          duration: 180,
          delay: 100 + Math.min(index * 15, 120),
          easing,
          fill: 'backwards',
        }
      )
    )
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stop = () => {
      exit.cancel()
      enter.forEach((animation) => animation.cancel())
      view.removeAttribute('data-toc-entering')
      outgoing.remove()
      media.removeEventListener('change', stop)
      view.removeEventListener('focusin', stop)
      view.removeEventListener('pointerdown', stop)
      window.removeEventListener('resize', stop)
    }
    cleanup.current = stop
    media.addEventListener('change', stop)
    view.addEventListener('focusin', stop)
    view.addEventListener('pointerdown', stop)
    window.addEventListener('resize', stop)
    void Promise.all([
      exit.finished,
      ...enter.map((animation) => animation.finished),
    ]).then(stop, () => undefined)
  }, [ref, enabled, content])

  useLayoutEffect(() => () => cleanup.current(), [])
}

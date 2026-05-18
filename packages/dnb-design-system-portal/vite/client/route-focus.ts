import { scrollToHash } from '@dnb/eufemia/src/components/Anchor'
import {
  applyPageFocus,
  setPageFocusElement,
} from '@dnb/eufemia/src/shared/helpers'

function getFocusTarget(element: HTMLElement) {
  if (
    element.classList.contains('anchor-hash') ||
    element.getAttribute('aria-hidden') === 'true'
  ) {
    return (
      element.closest<HTMLElement>('h1, h2, h3, h4, h5, h6') || element
    )
  }

  return element
}

export function applyRouteFocus(hash: string) {
  if (hash) {
    const result = scrollToHash(hash)

    if (result?.element) {
      setPageFocusElement(getFocusTarget(result.element), 'route-hash')
      applyPageFocus('route-hash')
    }

    return
  }

  applyPageFocus('content')
}

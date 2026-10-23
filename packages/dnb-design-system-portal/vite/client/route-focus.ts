import {
  applyPageFocus,
  setPageFocusElement,
} from '@dnb/eufemia/src/shared/helpers'
import decodeHashId from '@dnb/eufemia/src/shared/helpers/decodeHashId'

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

export function applyRouteFocus(
  hash: string,
  behavior: ScrollBehavior = 'instant'
) {
  if (hash) {
    const id = hash.slice(1)
    const element =
      document.getElementById(id) ??
      document.getElementById(decodeHashId(id))

    if (element) {
      setPageFocusElement(getFocusTarget(element), 'route-hash')
      applyPageFocus('route-hash')
      element.scrollIntoView({ behavior })
      element.parentElement?.classList.add('focus')
    }

    return
  }

  applyPageFocus('content')
}

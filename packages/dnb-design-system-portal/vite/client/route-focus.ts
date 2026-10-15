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

export function applyRouteFocus(
  hash: string,
  behavior: ScrollBehavior = 'instant'
) {
  if (hash) {
    const element = document.getElementById(hash.slice(1))

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

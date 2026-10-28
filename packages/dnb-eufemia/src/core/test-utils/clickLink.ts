import { fireEvent } from '@testing-library/react'

/**
 * Clicks a link like `fireEvent.click`, and returns `true` when nothing
 * prevented the browser from following it.
 *
 * It then stops the navigation, because jsdom does not support navigation
 * to another document and logs "Not implemented" for it.
 */
export function clickLink(element: Element, init?: MouseEventInit) {
  let followed = false
  const stopNavigation = (event: Event) => {
    followed = !event.defaultPrevented
    event.preventDefault()
  }

  // Window listeners run last, after the component has handled the click
  window.addEventListener('click', stopNavigation)
  try {
    fireEvent.click(element, init)
  } finally {
    window.removeEventListener('click', stopNavigation)
  }

  return followed
}

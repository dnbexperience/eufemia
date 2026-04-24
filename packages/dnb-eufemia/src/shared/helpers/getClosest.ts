import { warn } from '../helpers'

export type TargetSelector = string
export type RootElement = Element

/**
 * getClosestParent returns the first element that matches the `selector` starting with the given `element` and traversing up through its parent.
 *
 * @param  {string} selector CSS class or tag name (tag name with upper case chars, like "BUTTON")
 * @param  {Element} element The element to begin with
 * @param  {boolean} excludeSelf Whether to exclude the given element itself from the search. Default: `false`.
 * @return {Element} Found element or `null`
 */
export const getClosestParent = (
  selector: TargetSelector,
  element: RootElement,
  excludeSelf = false
): Element | null => {
  try {
    const tagName = /[A-Z]/.test(selector) ? selector : null
    const className = tagName ? null : selector.replace(/^\./, '')

    const contains = (element: Element) => {
      if (!element) {
        return null
      }

      if (tagName) {
        return element?.tagName === tagName
      }

      return element?.classList.contains(className)
    }

    if (excludeSelf) {
      element = element?.parentElement
    }

    while (element && !contains(element)) {
      element = element?.parentElement
    }
  } catch (e) {
    warn(e)
  }

  return element
}

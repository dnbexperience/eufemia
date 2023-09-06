import { warn } from '../helpers'

export type TargetSelector = string
export type RootElement = Element

/**
 * getPreviousSibling traverses down the DOM tree until it finds the wanted element
 *
 * @param  {string} selector CSS selector name (HTML class name or selector or tag name with upper case chars, like BUTTON)
 * @param  {Element} element The element to begin with
 * @return {Element} Found element
 */
export const getPreviousSibling = (
  selector: TargetSelector,
  element: RootElement
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

    if (contains(element)) {
      return element
    }

    while ((element = element?.parentElement) && !contains(element));
  } catch (e) {
    warn(e)
  }

  return element
}

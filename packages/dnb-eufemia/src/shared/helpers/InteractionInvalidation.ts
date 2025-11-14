export type TargetElement = HTMLElement
export type TargetSelector = string
export type HTMLElementNode = TargetElement & {
  __ariaHidden: string
  __tabIndex: string
}

export type InteractionInvalidationOptions = {
  /**
   * Use false to omit processing aria-hidden. Defaults to true.
   */
  ariaHidden?: boolean

  /**
   * Use false to omit processing tabindex. Defaults to true.
   */
  tabIndex?: boolean
}

/**
 * Helper class to invalidate interactions (tabbing and screen readers)
 *
 * NB: In a couple of years, we can start using the inert attribute instead.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/inert
 */
export class InteractionInvalidation {
  bypassElements: Array<TargetElement>
  bypassSelectors: Array<TargetSelector>
  _nodesToInvalidate: Array<HTMLElementNode>
  options: InteractionInvalidationOptions

  constructor(options: InteractionInvalidationOptions = null) {
    this.bypassElements = []
    this.bypassSelectors = []
    this.options = options || {}
    return this
  }

  setBypassElements(bypassElements: Array<TargetElement>) {
    this.bypassElements = bypassElements
  }

  setBypassSelector(
    bypassSelector: TargetSelector | Array<TargetSelector>
  ) {
    if (!Array.isArray(bypassSelector)) {
      bypassSelector = [bypassSelector]
    }
    this.bypassSelectors = bypassSelector
    return this
  }

  activate(targetElement: TargetElement | TargetSelector = null) {
    if (!this._nodesToInvalidate) {
      this._runInvalidation(targetElement)
    }
  }

  revert() {
    this._revertInvalidation()
    this._nodesToInvalidate = null
  }

  _runInvalidation(targetElement: TargetElement | TargetSelector) {
    if (typeof document === 'undefined') {
      return // stop here
    }

    this._nodesToInvalidate = this.getNodesToInvalidate(targetElement)

    if (!Array.isArray(this._nodesToInvalidate)) {
      return // stop here
    }

    // 1. Save the previous tabindex and aria-hidden state so we can restore it on close
    // 2. And invalidate the node
    for (const node of this._nodesToInvalidate) {
      if (!node) {
        continue
      }

      if (this.options.tabIndex !== false) {
        const tabIndex = node.getAttribute('tabindex')
        if (tabIndex !== null && typeof node.__tabIndex === 'undefined') {
          node.__tabIndex = tabIndex
        }
        node.setAttribute('tabindex', '-1')
      }

      if (this.options.ariaHidden !== false) {
        const ariaHidden = node.getAttribute('aria-hidden')
        if (
          ariaHidden !== null &&
          typeof node.__ariaHidden === 'undefined'
        ) {
          node.__ariaHidden = ariaHidden
        }
        node.setAttribute('aria-hidden', 'true')
      }
    }
  }

  _revertInvalidation() {
    if (!Array.isArray(this._nodesToInvalidate)) {
      return // stop here
    }

    // restore or remove tabindex and aria-hidden from nodes
    for (const node of this._nodesToInvalidate) {
      if (!node) {
        continue
      }

      if (this.options.tabIndex !== false) {
        if (typeof node.__tabIndex !== 'undefined') {
          node.setAttribute('tabindex', node.__tabIndex)
          delete node.__tabIndex
        } else {
          node.removeAttribute('tabindex')
        }
      }

      if (this.options.ariaHidden !== false) {
        if (typeof node.__ariaHidden !== 'undefined') {
          node.setAttribute('aria-hidden', node.__ariaHidden)
          delete node.__ariaHidden
        } else {
          node.removeAttribute('aria-hidden')
        }
      }
    }
  }

  getNodesToInvalidate(
    targetElement: TargetElement | TargetSelector = null
  ): Array<HTMLElementNode> {
    if (typeof document === 'undefined') {
      return [] // stop here
    }

    if (typeof targetElement === 'string') {
      targetElement = document.querySelector(
        targetElement
      ) as TargetElement
    }

    // by only finding elements that do not have tabindex="-1" we ensure we don't
    // corrupt the previous state of the element if a modal was already open
    const rootSelector = targetElement ? '*' : 'html *'

    const elementSelector = this.bypassSelectors
      .map((s) => `:not(${s})`)
      .join('')

    const selector = `${rootSelector} ${elementSelector}:not(script):not(style):not(path):not(head *)`

    // JSDOM has issues with the selector :not(x *), so we used it only in the browser,
    // so we remove the asterisk from the selector, but add it to the exclude selectors list and make another querySelectorAll call
    // - so we query all bypass selectors with "asterisk" manually
    if (process.env.NODE_ENV === 'test') {
      const allNodes = Array.from(
        (targetElement || document.documentElement).querySelectorAll(
          '*'
        ) as NodeListOf<HTMLElementNode>
      )

      return allNodes.filter((node) => {
        // Skip script, style, path, head, and body elements
        if (
          node.tagName === 'SCRIPT' ||
          node.tagName === 'STYLE' ||
          node.tagName === 'PATH' ||
          node.tagName === 'HEAD' ||
          node.tagName === 'BODY'
        ) {
          return false
        }

        // Check if node should be bypassed by elements or selectors
        const bypassedByElement = this.bypassElements.includes(node)
        const bypassedBySelector = this.bypassSelectors.some(
          (selector) => {
            try {
              // Handle wildcard selectors (ending with *)
              if (selector.endsWith(' *')) {
                const baseSelector = selector.replace(' *', '')
                const baseElement = (
                  targetElement || document.documentElement
                ).querySelector(baseSelector)
                return baseElement && baseElement.contains(node)
              } else {
                // Handle direct selectors
                const matchingElement = (
                  targetElement || document.documentElement
                ).querySelector(selector)
                return matchingElement && matchingElement.contains(node)
              }
            } catch (e) {
              return false
            }
          }
        )

        return !(bypassedByElement || bypassedBySelector)
      })
    }

    try {
      return Array.from(
        (targetElement || document.documentElement).querySelectorAll(
          selector
        ) as NodeListOf<HTMLElementNode>
      ).filter((node) => !this.bypassElements.includes(node))
    } catch (error) {
      //
    }
  }
}

import { IS_IE11 } from '../helpers'

export type TargetElement = HTMLElement
export type TargetSelector = string
export type HTMLElementNode = TargetElement & {
  __ariahidden: string
  __tabindex: string
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

export class InteractionInvalidation {
  bypassElement: TargetElement
  bypassSelectors: Array<TargetSelector>
  _nodesToInvalidate: Array<HTMLElementNode>
  options: InteractionInvalidationOptions

  constructor(options: InteractionInvalidationOptions = null) {
    this.bypassElement = null
    this.bypassSelectors = []
    this.options = options || {}
    return this
  }

  setBypassElement(bypassElement: TargetElement) {
    if (bypassElement instanceof HTMLElement) {
      this.bypassElement = bypassElement
    }
    return this
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
      this._runInvalidaiton(targetElement)
    }
  }

  revert() {
    this._revertInvalidation()
    this._nodesToInvalidate = null
  }

  _runInvalidaiton(targetElement: TargetElement | TargetSelector) {
    if (typeof document === 'undefined') {
      return // stop here
    }

    this._nodesToInvalidate = this.getNodesToInvalidate(targetElement)

    // 1. Save the previous tabindex and aria-hidden state so we can restore it on close
    // 2. And invalidate the node
    for (const node of this._nodesToInvalidate) {
      if (!node) {
        continue
      }

      if (this.options.tabIndex !== false) {
        const tabindex = node.getAttribute('tabindex')
        if (tabindex !== null && typeof node.__tabindex === 'undefined') {
          node.__tabindex = tabindex
        }
        node.setAttribute('tabindex', '-1')
      }

      if (this.options.ariaHidden !== false) {
        const ariahidden = node.getAttribute('aria-hidden')
        if (
          ariahidden !== null &&
          typeof node.__ariahidden === 'undefined'
        ) {
          node.__ariahidden = ariahidden
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
        if (typeof node.__tabindex !== 'undefined') {
          node.setAttribute('tabindex', node.__tabindex)
          delete node.__tabindex
        } else {
          node.removeAttribute('tabindex')
        }
      }

      if (this.options.ariaHidden !== false) {
        if (typeof node.__ariahidden !== 'undefined') {
          node.setAttribute('aria-hidden', node.__ariahidden)
          delete node.__ariahidden
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

    // JSDOM and IE11 has issues with the selector :not(x *), so we used it only in the browser,
    // so we remove the asterisk from the selector, but add it to the exclude selectors list and make another querySelectorAll call
    // - so we query all bypass selectors with "asterisk" manually
    if (IS_IE11 || process.env.NODE_ENV === 'test') {
      const excludeSelectors = []

      const testSelector = selector
        .split(':')
        .map((localSel) => {
          if (localSel.endsWith(' *)')) {
            excludeSelectors.push(
              ...Array.from(
                (
                  (targetElement as TargetElement) ||
                  document.documentElement
                ).querySelectorAll(localSel.match(/\(([^)]*)\)/)[1])
              )
            )
            localSel = localSel.replace(' *', '')
          }

          return localSel
        })
        .join(':')

      return Array.from(
        (targetElement || document.documentElement).querySelectorAll(
          testSelector
        )
      ).filter(
        (node) => !excludeSelectors.includes(node)
      ) as Array<HTMLElementNode>
    }

    return Array.from(
      (targetElement || document.documentElement).querySelectorAll(
        selector
      )
    )
  }
}

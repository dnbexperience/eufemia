import type { Page } from '@playwright/test'

export type OlderBrowser = 'firefox-before-121' | 'safari-before-15.4'

/**
 * Simulates an older browser: removes every rule that uses a selector it
 * does not support, and applies the `@supports` rules as it would.
 */
export function simulateOlderBrowser(page: Page, browser: OlderBrowser) {
  return page.evaluate((browser) => {
    const unsupported =
      browser === 'safari-before-15.4'
        ? [':has(', ':focus-visible']
        : [':has(']
    const supportsSelector = (selector: string) =>
      !unsupported.some((pseudo) => selector.startsWith(pseudo))

    // Only handles the conditions these styles use
    const evaluate = (condition: string) => {
      const js = condition
        .replaceAll('selector(:has(*))', String(supportsSelector(':has(')))
        .replaceAll(
          'selector(:focus-visible)',
          String(supportsSelector(':focus-visible'))
        )
        .replace(/\bnot\b/g, '!')
        .replace(/\band\b/g, '&&')
        .replace(/\bor\b/g, '||')

      if (!/^[\s!&|()a-z]*$/.test(js)) {
        return null // Not a selector condition
      }

      return Boolean(new Function(`return ${js}`)())
    }

    let removed = 0
    let applied = 0

    const walk = (list: CSSStyleSheet | CSSGroupingRule) => {
      for (let i = list.cssRules.length - 1; i >= 0; i--) {
        const rule = list.cssRules[i]

        if (
          rule instanceof CSSStyleRule &&
          unsupported.some((pseudo) => rule.selectorText.includes(pseudo))
        ) {
          list.deleteRule(i)
          removed++
        } else if (rule instanceof CSSSupportsRule) {
          const result = evaluate(rule.conditionText)

          if (result === true) {
            const inner = [...rule.cssRules].map(({ cssText }) => cssText)
            list.deleteRule(i)
            inner.reverse().forEach((text) => list.insertRule(text, i))
            applied += inner.length
          } else if (result === false) {
            list.deleteRule(i)
          }
        } else if ('cssRules' in rule) {
          walk(rule as CSSGroupingRule)
        }
      }
    }

    for (const sheet of document.styleSheets) {
      try {
        walk(sheet)
      } catch {
        // Skip style sheets from other origins
      }
    }

    return { removed, applied }
  }, browser)
}

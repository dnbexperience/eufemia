// @vitest-environment node

import postcss from 'postcss'
import { loadScss } from '../../../core/test-utils/testSetup'

// Safari before 15.4 and Firefox before 121 do not support :has().
// These browsers drop the rules that show the outline of an item on
// keyboard focus, so the styles have a fallback for them.
function getFallbackSelectors() {
  const css = loadScss(require.resolve('../style/dnb-list.scss'))
  const selectors: string[] = []

  postcss.parse(css).walkAtRules('supports', (atRule) => {
    if (atRule.params === 'not (selector(:has(*)))') {
      atRule.walkRules((rule) => {
        selectors.push(...rule.selectors)
      })
    }
  })

  return selectors
}

describe('List scss', () => {
  it('should show the outline of a focused item in browsers without :has()', () => {
    expect(getFallbackSelectors()).toEqual([
      '.dnb-list__item__action:not(.dnb-list__item--disabled):focus-within',
      '.dnb-list__item__accordion:not(.dnb-list__item--disabled):focus-within',
      '.dnb-card .dnb-list__container .dnb-list__item.dnb-list__item__action:not(.dnb-list__item--disabled):focus-within::after',
      '.dnb-card .dnb-list__container .dnb-list__item.dnb-list__item__accordion:not(.dnb-list__item--disabled):focus-within::after',
    ])
  })

  it('should not use :has() or :focus-visible in the fallback', () => {
    for (const selector of getFallbackSelectors()) {
      expect(selector).not.toContain(':has(')
      expect(selector).not.toContain(':focus-visible')
    }
  })
})

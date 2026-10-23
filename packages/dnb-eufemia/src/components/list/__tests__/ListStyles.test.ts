// @vitest-environment node

import postcss from 'postcss'
import { loadScss } from '../../../core/test-utils/testSetup'

// Safari before 15.4 and Firefox before 121 do not support :has().
// These browsers drop the rules that show the outline of an item on
// keyboard focus, so the styles have a fallback for them. It must target
// only the primary focus targets, not the whole item. The behaviour is
// tested in ListFocusFallback.e2e.spec.ts.
function getFallbackRules() {
  const css = loadScss(require.resolve('../style/dnb-list.scss'))
  const rules: Array<{ condition: string; selector: string }> = []

  postcss.parse(css).walkAtRules('supports', (atRule) => {
    if (atRule.params.includes('not (selector(:has(*)))')) {
      atRule.walkRules((rule) => {
        for (const selector of rule.selectors) {
          rules.push({ condition: atRule.params, selector })
        }
      })
    }
  })

  return rules
}

const withFocusVisible =
  '(not (selector(:has(*)))) and (selector(:focus-visible))'
const withoutFocusVisible =
  '(not (selector(:has(*)))) and (not (selector(:focus-visible)))'

describe('List scss', () => {
  it('should show the outline of a focused item in browsers without :has()', () => {
    expect(getFallbackRules()).toEqual([
      {
        condition: withFocusVisible,
        selector:
          '.dnb-list__item__action:not(.dnb-list__item--disabled) > a:focus-visible::before',
      },
      {
        condition: withFocusVisible,
        selector:
          '.dnb-list__item__action:not(.dnb-list__item--disabled) > .dnb-list__item__action__button:focus-visible::before',
      },
      {
        condition: withoutFocusVisible,
        selector:
          '.dnb-list__item__action:not(.dnb-list__item--disabled) > a:focus::before',
      },
      {
        condition: withoutFocusVisible,
        selector:
          '.dnb-list__item__action:not(.dnb-list__item--disabled) > .dnb-list__item__action__button:focus::before',
      },
      {
        condition: withFocusVisible,
        selector:
          '.dnb-list__item__accordion:not(.dnb-list__item--disabled) > .dnb-list__item__accordion__header:focus-visible::before',
      },
      {
        condition: withoutFocusVisible,
        selector:
          '.dnb-list__item__accordion:not(.dnb-list__item--disabled) > .dnb-list__item__accordion__header:focus::before',
      },
    ])
  })

  it('should only use selectors the fallback browsers support', () => {
    const rules = getFallbackRules()
    const withoutFocusVisibleRules = rules.filter(
      ({ condition }) => condition === withoutFocusVisible
    )

    expect(withoutFocusVisibleRules.length).toBeGreaterThan(0)

    for (const { selector } of rules) {
      expect(selector).not.toContain(':has(')
    }
    for (const { selector } of withoutFocusVisibleRules) {
      expect(selector).not.toContain(':focus-visible')
    }
  })
})

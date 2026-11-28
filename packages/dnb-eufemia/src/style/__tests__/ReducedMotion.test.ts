// @vitest-environment node

import { loadScss } from '../../core/test-utils/testSetup'
import postcss from 'postcss'
import isolatedStyleScopePlugin from '../../plugins/postcss-isolated-style-scope/isolated-style-scope-plugin.js'

function getReducedMotionSelectors(css: string) {
  const selectors: string[] = []

  postcss.parse(css).walkAtRules('media', (atRule) => {
    if (!atRule.params.includes('prefers-reduced-motion: reduce')) {
      return // stop here
    }

    atRule.walkRules((rule) => {
      rule.walkDecls('animation-duration', () => {
        selectors.push(...rule.selectors)
      })
    })
  })

  return selectors
}

describe('Reduced motion CSS', () => {
  it('reduces motion on the whole page in the core styles', () => {
    const css = loadScss(require.resolve('../dnb-ui-core.scss'))

    expect(getReducedMotionSelectors(css)).toEqual([
      '*',
      '*::before',
      '*::after',
    ])
  })

  it('reduces motion only inside the wrapper in the basis styles', () => {
    const css = loadScss(require.resolve('../dnb-ui-basis.scss'))

    expect(getReducedMotionSelectors(css)).toEqual([
      '.dnb-core-style',
      '.dnb-core-style *',
      '.dnb-core-style *::before',
      '.dnb-core-style *::after',
    ])
  })

  it('reduces motion only inside the scope in the isolated basis styles', async () => {
    const css = loadScss(require.resolve('../dnb-ui-basis.scss'))
    const isolated = await postcss([
      isolatedStyleScopePlugin({
        scopeHash: 'test-scope',
        warnOnDeprecatedColorVariables: false,
      }),
    ]).process(css, { from: undefined })

    const selectors = getReducedMotionSelectors(isolated.css)

    expect(selectors.length).toBeGreaterThan(0)
    selectors.forEach((selector) => {
      expect(selector).toMatch(/^\.test-scope /)
    })
  })
})

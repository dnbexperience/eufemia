// @vitest-environment node

import { loadScss } from '../../core/test-utils/testSetup'
import postcss from 'postcss'
import isolatedStyleScopePlugin from '../../plugins/postcss-isolated-style-scope/isolated-style-scope-plugin.js'

describe('Text scale CSS', () => {
  it('keeps Apple Dynamic Type as a global fallback until the script succeeds', async () => {
    const css = loadScss(null, {
      data: `
        @use 'scopes.scss' as scopes;
        @include scopes.htmlDefault();
      `,
    })

    expect(css).toContain('html:not([data-eufemia-text-scale])')
    expect(css).toContain('font: -apple-system-body')

    const isolated = await postcss([
      isolatedStyleScopePlugin({ scopeHash: 'test-scope' }),
    ]).process(css, { from: '/file.css' })

    expect(isolated.css).toContain('html:not([data-eufemia-text-scale]) {')
    expect(isolated.css).not.toContain(
      'html:not([data-eufemia-text-scale]) .test-scope'
    )
  })
})

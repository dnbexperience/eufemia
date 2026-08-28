// @vitest-environment node

import { loadScss } from '../../core/test-utils/testSetup'

describe('Text scale CSS', () => {
  it('keeps Apple Dynamic Type as a fallback until the script succeeds', () => {
    const css = loadScss(null, {
      data: `
        @use 'scopes.scss' as scopes;
        @include scopes.htmlDefault();
      `,
    })

    expect(css).toContain('html:not([data-eufemia-text-scale])')
    expect(css).toContain('font: -apple-system-body')
  })
})

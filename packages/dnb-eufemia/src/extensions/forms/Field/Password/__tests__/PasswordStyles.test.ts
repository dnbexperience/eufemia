// @vitest-environment node

import { loadScss } from '../../../../../core/test-utils/testSetup'

describe('Password error colors', () => {
  it('uses the destructive foreground on the filled error hover button', () => {
    const css = loadScss(require.resolve('../style/dnb-password.scss'))

    expect(css).toMatch(
      /--button-color-icon--hover: var\(\s*--token-color-component-button-icon-neutral-destructive\s*\)/
    )
    expect(css).toMatch(
      /--button-color-text--hover: var\(\s*--token-color-component-button-text-neutral-destructive\s*\)/
    )
  })
})

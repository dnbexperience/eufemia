/**
 * Blockquote Test
 *
 */

import { render } from '@testing-library/react'
import { loadScss } from '../../../core/test-utils/testSetup'
import Blockquote from '../Blockquote'
import Code from '../../code/Code'

describe('Blockquote', () => {
  describe('surface context', () => {
    it('should set surface to dark for children by default', () => {
      render(
        <Blockquote>
          <Code>code</Code>
        </Blockquote>
      )

      const code = document.querySelector('.dnb-code')
      expect(code).toHaveClass('dnb-code--surface-dark')
    })

    it('should set surface to initial when noBackground is true', () => {
      render(
        <Blockquote noBackground>
          <Code>code</Code>
        </Blockquote>
      )

      const code = document.querySelector('.dnb-code')
      expect(code).not.toHaveClass('dnb-code--surface-dark')
    })
  })
})

describe('Blockquote scss', () => {
  it('uses the Figma corner radius and author line height', () => {
    const css = loadScss(
      require.resolve('../style/dnb-blockquote.scss')
    ) as string

    expect(css).toMatch(
      /\.dnb-blockquote \{[^}]*border-radius: var\(--token-radius-xl\);/
    )
    expect(css).toMatch(
      /\.dnb-blockquote figcaption \{[^}]*line-height: var\(--line-height-small\);/
    )
  })
})

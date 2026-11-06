/**
 * Hr Test
 *
 */

import { render } from '@testing-library/react'
import { Theme } from '../../../shared'
import { loadScss } from '../../../core/test-utils/testSetup'
import Hr from '../Hr'

describe('Hr', () => {
  describe('surface', () => {
    it('does not apply dark surface class by default', () => {
      render(<Hr />)

      const element = document.querySelector('.dnb-hr')

      expect(element.classList.contains('dnb-hr--surface-dark')).toBe(
        false
      )
    })

    it('applies dark surface class from Theme.Context', () => {
      render(
        <Theme.Context surface="dark">
          <Hr />
        </Theme.Context>
      )

      const element = document.querySelector('.dnb-hr')

      expect(element.classList.contains('dnb-hr--surface-dark')).toBe(true)
    })
  })
})

describe('Hr scss', () => {
  it('fills the container minus the left and right spacing', () => {
    const css = loadScss(require.resolve('../style/dnb-hr.scss'))

    expect(css).toMatch(
      /\.dnb-hr \{[^}]*width: 100%;\s*width: -moz-available;\s*width: -webkit-fill-available;\s*width: stretch;/
    )
  })
})

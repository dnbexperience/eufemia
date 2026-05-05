/**
 * Hr Test
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Theme } from '../../../shared'
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

/**
 * Blockquote Test
 *
 */

import React from 'react'
import { render } from '@testing-library/react'
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

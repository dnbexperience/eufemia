/**
 * GlobalResponsiveTypography Test
 *
 */

import { render } from '@testing-library/react'
import GlobalResponsiveTypography from '../GlobalResponsiveTypography'
import { Typography } from '../../../elements'

describe('GlobalResponsiveTypography', () => {
  describe('responsiveAll', () => {
    it('wraps children in a div with .dnb-global-responsive-typography__responsive-all-on class', () => {
      render(
        <GlobalResponsiveTypography>
          <Typography>Wrapped text</Typography>
        </GlobalResponsiveTypography>
      )
      const wrapper = document.querySelector(
        '.dnb-global-responsive-typography__responsive-all-on'
      )

      expect(wrapper.tagName).toBe('DIV')
    })

    it('wraps children in a new div when responsive changes in nested wrapper', () => {
      const { container } = render(
        <GlobalResponsiveTypography>
          <GlobalResponsiveTypography off>
            <Typography>Text</Typography>
          </GlobalResponsiveTypography>
        </GlobalResponsiveTypography>
      )
      const outerDiv = container.querySelector(
        '.dnb-global-responsive-typography__responsive-all-on'
      )
      const innerDiv = outerDiv.querySelector(
        '.dnb-global-responsive-typography__responsive-all-off'
      )

      expect(outerDiv.tagName).toBe('DIV')
      expect(innerDiv.tagName).toBe('DIV')
    })

    it('wraps regular components inside the div', () => {
      render(
        <GlobalResponsiveTypography>
          <button>I exist</button>
        </GlobalResponsiveTypography>
      )
      const wrapper = document.querySelector(
        '.dnb-global-responsive-typography'
      )
      const button = document.querySelector('button')

      expect(wrapper.tagName).toBe('DIV')
      expect(wrapper.contains(button)).toBe(true)
    })
  })
})

/**
 * GlobalResponsiveTypography Test
 *
 */

import { render } from '@testing-library/react'
import GlobalResponsiveTypography from '../GlobalResponsiveTypography'
import { Typography, H1, P, Span } from '../../../elements'

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

    it('adds dnb-t__responsive-on class to P children', () => {
      render(
        <GlobalResponsiveTypography>
          <P>Paragraph text</P>
        </GlobalResponsiveTypography>
      )
      const paragraph = document.querySelector('.dnb-p')

      expect(paragraph.classList.contains('dnb-t__responsive-on')).toBe(
        true
      )
    })

    it('adds dnb-t__responsive-on class to H1 children', () => {
      render(
        <GlobalResponsiveTypography>
          <H1>Heading</H1>
        </GlobalResponsiveTypography>
      )
      const heading = document.querySelector('.dnb-h--xx-large')

      expect(heading.classList.contains('dnb-t__responsive-on')).toBe(true)
    })

    it('adds dnb-t__responsive-on class to Span children', () => {
      render(
        <GlobalResponsiveTypography>
          <Span>Text</Span>
        </GlobalResponsiveTypography>
      )
      const span = document.querySelector('.dnb-span')

      expect(span.classList.contains('dnb-t__responsive-on')).toBe(true)
    })

    it('removes dnb-t__responsive-on class from children when off is set', () => {
      render(
        <GlobalResponsiveTypography off>
          <P>Paragraph text</P>
        </GlobalResponsiveTypography>
      )
      const paragraph = document.querySelector('.dnb-p')

      expect(paragraph.classList.contains('dnb-t__responsive-on')).toBe(
        false
      )
      expect(paragraph.classList.contains('dnb-t__responsive-off')).toBe(
        true
      )
    })

    it('nested off overrides responsive for its children', () => {
      render(
        <GlobalResponsiveTypography>
          <P>Responsive</P>
          <GlobalResponsiveTypography off>
            <P>Not responsive</P>
          </GlobalResponsiveTypography>
        </GlobalResponsiveTypography>
      )
      const paragraphs = document.querySelectorAll('.dnb-p')

      expect(
        paragraphs[0].classList.contains('dnb-t__responsive-on')
      ).toBe(true)
      expect(
        paragraphs[1].classList.contains('dnb-t__responsive-off')
      ).toBe(true)
    })
  })
})

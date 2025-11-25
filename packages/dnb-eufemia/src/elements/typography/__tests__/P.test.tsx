/**
 * Element Test
 *
 */

import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import Dialog from '../../../components/dialog/Dialog'
import Drawer from '../../../components/drawer/Drawer'
import P, { PProps } from '../P'
import { render } from '@testing-library/react'

const props: PProps = {
  size: 'x-small',
  element: 'p',
}

describe('P element', () => {
  it('has p element as default', () => {
    render(<P />)

    const element = document.querySelector('.dnb-p')
    expect(element.tagName).toBe('P')
  })

  it('has span element when nested', () => {
    render(
      <P>
        <P />
      </P>
    )

    const element = document.querySelector('.dnb-p > .dnb-p')
    expect(element.tagName).toBe('SPAN')
  })

  it('uses the given element when nested and defined', () => {
    const MockComponent = (props) => <strong {...props}>Mock</strong>

    render(
      <P>
        <P element={MockComponent} />
      </P>
    )

    const element = document.querySelector('.dnb-p > .dnb-p')
    expect(element.tagName).toBe('STRONG')
  })

  describe('paragraphs inside Dialog', () => {
    it('renders as a paragraph inside Dialog even when the Dialog is wrapped by another paragraph', () => {
      render(
        <P>
          <Dialog noAnimation openState title="Dialog title">
            <P>Dialog paragraph</P>
          </Dialog>
        </P>
      )

      const dialogParagraph = document.querySelector(
        '.dnb-dialog__content .dnb-p'
      )
      expect(dialogParagraph.tagName).toBe('P')
    })

    it('still renders nested paragraphs inside Dialog as spans', () => {
      render(
        <P>
          <Dialog noAnimation openState title="Dialog title">
            <P>
              <P>Inner Paragraph</P>
            </P>
          </Dialog>
        </P>
      )

      const nestedParagraph = document.querySelector(
        '.dnb-dialog__content .dnb-p .dnb-p'
      )
      expect(nestedParagraph.tagName).toBe('SPAN')
    })
  })

  describe('paragraphs inside Drawer', () => {
    it('renders as a paragraph inside Drawer even when the Drawer is wrapped by another paragraph', () => {
      render(
        <P>
          <Drawer noAnimation openState title="Drawer title">
            <P>Drawer paragraph</P>
          </Drawer>
        </P>
      )

      const drawerParagraph = document.querySelector(
        '.dnb-drawer__content .dnb-p'
      )
      expect(drawerParagraph.tagName).toBe('P')
    })

    it('still renders nested paragraphs inside Drawer as spans', () => {
      render(
        <P>
          <Drawer noAnimation openState title="Drawer title">
            <P>
              <P>Inner Paragraph</P>
            </P>
          </Drawer>
        </P>
      )

      const nestedParagraph = document.querySelector(
        '.dnb-drawer__content .dnb-p .dnb-p'
      )
      expect(nestedParagraph.tagName).toBe('SPAN')
    })
  })

  it('can set className', () => {
    render(<P className="my-class" weight="regular" />)
    const element = document.querySelector('.dnb-p')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'my-class',
      'dnb-t__weight--regular',
    ])
  })

  it('has correct size and line height when size is defined', () => {
    render(<P size="large" />)
    const element = document.querySelector('.dnb-t__size--large')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-t__line-height--large',
      'dnb-t__size--large',
    ])
  })

  it('has correct style when bold is set to true', () => {
    render(<P weight="bold" />)
    const element = document.querySelector('.dnb-t__weight--bold')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-t__weight--bold',
    ])
  })

  it('has correct style when several modifiers are defined', () => {
    render(
      <P
        size="small"
        lineHeight="xx-large"
        align="center"
        family="monospace"
        weight="medium"
        decoration="underline"
      />
    )
    const element = document.querySelector('.dnb-p')

    expect(Array.from(element.classList)).toEqual([
      'dnb-p',
      'dnb-t__line-height--xx-large',
      'dnb-t__size--small',
      'dnb-t__align--center',
      'dnb-t__family--monospace',
      'dnb-t__weight--medium',
      'dnb-t__decoration--underline',
    ])
  })

  it('should validate with ARIA rules as a p element', async () => {
    const Comp = render(<P {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })

  describe('deprecated behavior', () => {
    it('can set className and modifier', () => {
      render(<P className="my-class" modifier="my-modifier" />)
      const element = document.querySelector('.dnb-p')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-p--my-modifier',
        'my-class',
      ])
    })
    it('has correct style when size and a modifier is defined', () => {
      render(<P size="medium" modifier="medium" />)
      const element = document.querySelector('.dnb-t__size--medium')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__line-height--medium',
        'dnb-t__size--medium',
        'dnb-t__weight--medium',
      ])
    })
    it('has correct style when several modifiers are defined', () => {
      render(<P modifier="medium small" />)
      const element = document.querySelector('.dnb-t__size--small')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__line-height--small',
        'dnb-t__size--small',
        'dnb-t__weight--medium',
      ])
    })
    it('has correct style when several modifiers conflict', () => {
      render(<P modifier="medium bold x-small small" />)
      const element = document.querySelector('.dnb-t__size--x-small')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__line-height--x-small',
        'dnb-t__size--x-small',
        'dnb-t__weight--bold',
      ])
    })
    it('has correct style when medium is set to true', () => {
      render(<P medium />)
      const element = document.querySelector('.dnb-t__weight--medium')
      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__weight--medium',
      ])
    })

    it('has correct style when bold is set to true', () => {
      render(<P bold />)
      const element = document.querySelector('.dnb-t__weight--bold')

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__weight--bold',
      ])
    })
  })

  describe('proseMaxWidth', () => {
    it('applies proseMaxWidth style when provided', () => {
      render(<P proseMaxWidth={60}>Test paragraph</P>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('60ch')
    })

    it('does not apply proseMaxWidth style when not provided', () => {
      render(<P>Test paragraph</P>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('')
    })

    it('merges proseMaxWidth with existing styles', () => {
      render(
        <P proseMaxWidth={80} style={{ color: 'blue' }}>
          Test paragraph
        </P>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('80ch')
      expect(element.style.color).toBe('blue')
    })

    it('works with different character widths', () => {
      render(<P proseMaxWidth={40}>Short paragraph</P>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('40ch')
    })

    it('works with size and proseMaxWidth together', () => {
      render(
        <P size="large" proseMaxWidth={100}>
          Large paragraph with width limit
        </P>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__line-height--large',
        'dnb-t__size--large',
      ])
      expect(element.style.maxWidth).toBe('100ch')
    })

    it('works with weight and proseMaxWidth together', () => {
      render(
        <P weight="bold" proseMaxWidth={50}>
          Bold paragraph with width limit
        </P>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__weight--bold',
      ])
      expect(element.style.maxWidth).toBe('50ch')
    })

    it('works with all typography props and proseMaxWidth', () => {
      render(
        <P
          size="medium"
          weight="medium"
          align="center"
          family="monospace"
          proseMaxWidth={70}
        >
          Styled paragraph with width limit
        </P>
      )
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(Array.from(element.classList)).toEqual([
        'dnb-p',
        'dnb-t__line-height--medium',
        'dnb-t__size--medium',
        'dnb-t__align--center',
        'dnb-t__family--monospace',
        'dnb-t__weight--medium',
      ])
      expect(element.style.maxWidth).toBe('70ch')
    })

    it('applies proseMaxWidth as 60ch when true', () => {
      render(<P proseMaxWidth>Test paragraph</P>)
      const element = document.querySelector('.dnb-p') as HTMLElement

      expect(element.style.maxWidth).toBe('60ch')
    })
  })
})

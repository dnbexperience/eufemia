import React from 'react'
import { render } from '@testing-library/react'
import Stack from '../Stack'

describe('Layout.Stack', () => {
  it('should forward HTML attributes', () => {
    render(<Stack aria-label="Aria Label">content</Stack>)

    const element = document.querySelector('.dnb-layout__stack')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<Stack top="large">content</Stack>)

    const element = document.querySelector('.dnb-layout__stack')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Stack space={{ top: 'x-large' }}>content</Stack>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Stack className="custom-class">content</Stack>)

    const element = document.querySelector('.dnb-layout__stack')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout__flex-container',
      'dnb-layout__stack',
      'custom-class',
      'dnb-layout__flex-container--direction-vertical',
      'dnb-layout__flex-container--justify-flex-start',
      'dnb-layout__flex-container--align-stretch',
      'dnb-layout__flex-container--align-self-stretch',
      'dnb-layout__flex-container--spacing-small',
      'dnb-layout__flex-container--wrap',
      'dnb-layout__flex-container--divider-space',
    ])
  })

  it('should support "spacing" property', () => {
    render(<Stack spacing="large">content</Stack>)

    const element = document.querySelector('.dnb-layout__stack')

    expect(element.classList).toContain(
      'dnb-layout__flex-container--spacing-large'
    )
    expect(element.classList).toContain(
      'dnb-layout__flex-container--divider-space'
    )
  })

  it('should omit spacing when "spacing" is false', () => {
    render(<Stack spacing={false}>content</Stack>)

    const element = document.querySelector('.dnb-layout__stack')

    expect(element.className).not.toContain('spacing')
  })

  it('should default to section element', () => {
    render(<Stack>content</Stack>)

    const element = document.querySelector('.dnb-layout__stack')

    expect(element.tagName).toBe('SECTION')
  })

  it('should default direction to column', () => {
    render(<Stack>content</Stack>)

    const element = document.querySelector('.dnb-layout__stack')

    expect(element.classList).toContain(
      'dnb-layout__flex-container--direction-vertical'
    )
  })

  it('should set flow direction of content', () => {
    const { rerender } = render(<Stack>content</Stack>)

    const element = document.querySelector('.dnb-layout__stack')

    expect(element.classList).toContain(
      'dnb-layout__flex-container--direction-vertical'
    )

    rerender(<Stack direction="horizontal">content</Stack>)

    expect(element.classList).toContain(
      'dnb-layout__flex-container--direction-horizontal'
    )
  })
})

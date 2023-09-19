import React from 'react'
import { render } from '@testing-library/react'
import Stack from '../Stack'

describe('Layout.Stack', () => {
  it('should forward HTML attributes', () => {
    render(<Stack aria-label="Aria Label">content</Stack>)

    const element = document.querySelector('.dnb-layout-stack')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<Stack top="large">content</Stack>)

    const element = document.querySelector('.dnb-layout-stack')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Stack space={{ top: 'x-large' }}>content</Stack>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Stack className="custom-class">content</Stack>)

    const element = document.querySelector('.dnb-layout-stack')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout-flex-container',
      'dnb-layout-stack',
      'custom-class',
      'dnb-layout-flex-container--direction-vertical',
      'dnb-layout-flex-container--justify-flex-start',
      'dnb-layout-flex-container--align-stretch',
      'dnb-layout-flex-container--align-self-stretch',
      'dnb-layout-flex-container--spacing-small',
      'dnb-layout-flex-container--wrap',
      'dnb-layout-flex-container--divider-space',
    ])
  })

  it('should support "spacing" property', () => {
    render(<Stack spacing="large">content</Stack>)

    const element = document.querySelector('.dnb-layout-stack')

    expect(element.classList).toContain(
      'dnb-layout-flex-container--spacing-large'
    )
    expect(element.classList).toContain(
      'dnb-layout-flex-container--divider-space'
    )
  })

  it('should omit spacing when "spacing" is false', () => {
    render(<Stack spacing={false}>content</Stack>)

    const element = document.querySelector('.dnb-layout-stack')

    expect(element.className).not.toContain('spacing')
  })

  it('should default to section element', () => {
    render(<Stack>content</Stack>)

    const element = document.querySelector('.dnb-layout-stack')

    expect(element.tagName).toBe('SECTION')
  })

  it('should default direction to column', () => {
    render(<Stack>content</Stack>)

    const element = document.querySelector('.dnb-layout-stack')

    expect(element.classList).toContain(
      'dnb-layout-flex-container--direction-vertical'
    )
  })

  it('should set flow direction of content', () => {
    const { rerender } = render(<Stack>content</Stack>)

    const element = document.querySelector('.dnb-layout-stack')

    expect(element.classList).toContain(
      'dnb-layout-flex-container--direction-vertical'
    )

    rerender(<Stack direction="horizontal">content</Stack>)

    expect(element.classList).toContain(
      'dnb-layout-flex-container--direction-horizontal'
    )
  })
})

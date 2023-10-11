import React from 'react'
import { render } from '@testing-library/react'
import Flex from '../Flex'

describe('Flex.Stack', () => {
  it('should forward HTML attributes', () => {
    render(<Flex.Stack aria-label="Aria Label">content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <Flex.Stack top="large">content</Flex.Stack>
    )

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Flex.Stack space={{ top: 'x-large' }}>content</Flex.Stack>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Flex.Stack className="custom-class">content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-flex-container',
      'dnb-flex-stack',
      'custom-class',
      'dnb-flex-container--direction-vertical',
      'dnb-flex-container--justify-flex-start',
      'dnb-flex-container--align-stretch',
      'dnb-flex-container--align-self-stretch',
      'dnb-flex-container--spacing-small',
      'dnb-flex-container--wrap',
      'dnb-flex-container--divider-space',
    ])
  })

  it('should support "spacing" property', () => {
    render(<Flex.Stack spacing="large">content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.classList).toContain(
      'dnb-flex-container--spacing-large'
    )
    expect(element.classList).toContain(
      'dnb-flex-container--divider-space'
    )
  })

  it('should omit spacing when "spacing" is false', () => {
    render(<Flex.Stack spacing={false}>content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.className).not.toContain('spacing')
  })

  it('should default to section element', () => {
    render(<Flex.Stack>content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.tagName).toBe('SECTION')
  })

  it('should default direction to column', () => {
    render(<Flex.Stack>content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.classList).toContain(
      'dnb-flex-container--direction-vertical'
    )
  })

  it('should set flow direction of content', () => {
    const { rerender } = render(<Flex.Stack>content</Flex.Stack>)

    const element = document.querySelector('.dnb-flex-stack')

    expect(element.classList).toContain(
      'dnb-flex-container--direction-vertical'
    )

    rerender(<Flex.Stack direction="horizontal">content</Flex.Stack>)

    expect(element.classList).toContain(
      'dnb-flex-container--direction-horizontal'
    )
  })
})

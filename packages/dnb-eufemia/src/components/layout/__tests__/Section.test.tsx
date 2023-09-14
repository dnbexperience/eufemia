import React from 'react'
import { render } from '@testing-library/react'
import Section from '../Section'

describe('Layout.Section', () => {
  it('should forward HTML attributes', () => {
    render(<Section aria-label="Aria Label">content</Section>)

    const element = document.querySelector('.dnb-layout__section')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(<Section top="large">content</Section>)

    const element = document.querySelector('.dnb-layout__section')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<Section space={{ top: 'x-large' }}>content</Section>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<Section className="custom-class">content</Section>)

    const element = document.querySelector('.dnb-layout__section')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-layout__flex-container',
      'dnb-layout__section',
      'custom-class',
      'dnb-layout__flex-container--direction-column',
      'dnb-layout__flex-container--justify-flex-start',
      'dnb-layout__flex-container--align-flex-start',
      'dnb-layout__flex-container--divider-space',
      'dnb-layout__flex-container--spacing-small',
    ])
  })

  it('should support "spacing" property', () => {
    render(<Section spacing="large">content</Section>)

    const element = document.querySelector('.dnb-layout__section')

    expect(element.classList).toContain(
      'dnb-layout__flex-container--spacing-large'
    )
    expect(element.classList).toContain(
      'dnb-layout__flex-container--divider-space'
    )
  })

  it('should omit spacing when "spacing" is false', () => {
    render(<Section spacing={false}>content</Section>)

    const element = document.querySelector('.dnb-layout__section')

    expect(element.className).not.toContain('spacing')
  })

  it('should default to section element', () => {
    render(<Section>content</Section>)

    const element = document.querySelector('.dnb-layout__section')

    expect(element.tagName).toBe('SECTION')
  })

  it('should default direction to column', () => {
    render(<Section>content</Section>)

    const element = document.querySelector('.dnb-layout__section')

    expect(element.classList).toContain(
      'dnb-layout__flex-container--direction-column'
    )
  })

  it('should set flow direction of content', () => {
    const { rerender } = render(<Section>content</Section>)

    const element = document.querySelector('.dnb-layout__section')

    expect(element.classList).toContain(
      'dnb-layout__flex-container--direction-column'
    )

    rerender(<Section direction="row">content</Section>)

    expect(element.classList).toContain(
      'dnb-layout__flex-container--direction-row'
    )
  })
})

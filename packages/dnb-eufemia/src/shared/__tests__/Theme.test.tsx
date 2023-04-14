import React from 'react'
import { render } from '@testing-library/react'
import Theme from '../Theme'

describe('Theme', () => {
  it('sets name and variant as HTML classes', () => {
    render(
      <Theme name="eiendom" variant="soft">
        content
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__eiendom',
      'eufemia-theme__eiendom--soft',
    ])
  })

  it('supports nested themes', () => {
    render(
      <Theme id="theme-1" name="eiendom">
        <Theme id="theme-2" variant="soft">
          content
        </Theme>
      </Theme>
    )

    const element1 = document.querySelector('#theme-1')
    const element2 = document.querySelector('#theme-2')
    expect(Array.from(element1.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__eiendom',
    ])
    expect(Array.from(element2.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__eiendom',
      'eufemia-theme__eiendom--soft',
    ])
  })

  it('sets size as HTML classes', () => {
    render(<Theme size="basis">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(Array.from(element.classList)).toEqual([
      'eufemia-theme',
      'eufemia-theme__size--basis',
    ])
  })

  it('sets additional attributes', () => {
    render(
      <Theme aria-label="custom label" element="section">
        content
      </Theme>
    )

    const element = document.querySelector('.eufemia-theme')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )
    expect(attributes).toEqual(['class', 'aria-label'])
  })

  it('uses custom element when set', () => {
    render(<Theme element="span">content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(element.tagName).toBe('SPAN')
  })

  it('uses custom component when set', () => {
    const Component = ({ children, ...rest }) => (
      <section {...rest}>{children}</section>
    )
    render(<Theme element={Component}>content</Theme>)

    const element = document.querySelector('.eufemia-theme')
    expect(element.tagName).toBe('SECTION')
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import ButtonRow from '../ButtonRow'
import Button from '../../../../../components/Button'

describe('Form.ButtonRow', () => {
  it('should forward HTML attributes', () => {
    render(
      <ButtonRow aria-label="Aria Label">
        <Button>Button</Button>
      </ButtonRow>
    )

    const element = document.querySelector('.dnb-forms-button-row')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('aria-label')
    expect(element.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <ButtonRow top="large">
        <Button>Button</Button>
      </ButtonRow>
    )

    const element = document.querySelector('.dnb-forms-button-row')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(
      <ButtonRow space={{ top: 'x-large' }}>
        <Button>Button</Button>
      </ButtonRow>
    )

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(
      <ButtonRow className="custom-class">
        <Button>Button</Button>
      </ButtonRow>
    )

    const element = document.querySelector('.dnb-forms-button-row')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-forms-button-row',
      'custom-class',
    ])
  })

  it('should render children', () => {
    render(
      <ButtonRow className="custom-class">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonRow>
    )

    const element = document.querySelector('.dnb-forms-button-row')
    const children = element.children
    const childrenTextContents = Array.from(children).map((child) =>
      child.textContent.replace(/[\u200C]/g, '')
    )

    expect(children.length).toEqual(3)
    expect(childrenTextContents).toEqual([
      'Button 1',
      'Button 2',
      'Button 3',
    ])
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import FieldBlock from '../FieldBlock'
import { FormError } from '../../types'

describe('FieldBlock', () => {
  it('should forward HTML attributes', () => {
    render(<FieldBlock id="custom-id">content</FieldBlock>)

    const element = document.querySelector('.dnb-forms-field-block')
    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toContain('id')
    expect(element.getAttribute('id')).toBe('custom-id')
  })

  it('should support spacing props', () => {
    const { rerender } = render(
      <FieldBlock top="large">content</FieldBlock>
    )

    const element = document.querySelector('.dnb-forms-field-block')

    expect(element.classList).toContain('dnb-space__top--large')

    rerender(<FieldBlock space={{ top: 'x-large' }}>content</FieldBlock>)

    expect(element.classList).toContain('dnb-space__top--x-large')
  })

  it('should contain given classes', () => {
    render(<FieldBlock className="custom-class">content</FieldBlock>)

    const element = document.querySelector('.dnb-forms-field-block')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-forms-field-block',
      'dnb-forms-field-block--layout-vertical',
      'custom-class',
    ])
  })

  it('should support "forId" property', () => {
    render(
      <FieldBlock forId="unique" label="A Label">
        <input type="text" id="unique" />
      </FieldBlock>
    )

    const element = document.querySelector('.dnb-forms-field-block')
    const labelElement = element.querySelector('label')
    const inputElement = element.querySelector('input')

    expect(labelElement.getAttribute('for')).toBe('unique')
    expect(labelElement.getAttribute('for')).toBe(
      inputElement.getAttribute('id')
    )
  })

  it('should render a "label"', () => {
    render(<FieldBlock label="A Label">content</FieldBlock>)

    const labelElement = document.querySelector('label')

    expect(labelElement).toBeInTheDocument()
    expect(labelElement.textContent).toBe('A Label')
  })

  it('should render a "labelDescription"', () => {
    render(
      <FieldBlock labelDescription="A Label Description">
        content
      </FieldBlock>
    )

    const labelElement = document.querySelector('label')

    expect(labelElement).toBeInTheDocument()
    expect(labelElement.className).toBe(
      'dnb-form-label dnb-space__bottom--x-small'
    )
    expect(labelElement.textContent).toBe('A Label Description')
  })

  it('should render a "labelSecondary"', () => {
    render(
      <FieldBlock labelDescription="A Secondary Label">content</FieldBlock>
    )

    const labelElement = document.querySelector('label')

    expect(labelElement).toBeInTheDocument()
    expect(labelElement.className).toBe(
      'dnb-form-label dnb-space__bottom--x-small'
    )
    expect(labelElement.textContent).toBe('A Secondary Label')
  })

  it('should render a FormStatus when "info" is given', () => {
    render(<FieldBlock info="Info">content</FieldBlock>)

    const element = document.querySelector('.dnb-form-status')

    expect(element).toBeInTheDocument()
    expect(element.className).toBe(
      'dnb-form-status dnb-form-status--info dnb-form-status__size--default dnb-space__top--x-small dnb-form-status--has-content'
    )
    expect(element.textContent).toBe('Info')
  })

  it('should render a FormStatus when "warning" is given', () => {
    render(<FieldBlock warning="Warning">content</FieldBlock>)

    const element = document.querySelector('.dnb-form-status')

    expect(element).toBeInTheDocument()
    expect(element.className).toBe(
      'dnb-form-status dnb-form-status--warn dnb-form-status__size--default dnb-space__top--x-small dnb-form-status--has-content'
    )
    expect(element.textContent).toBe('Warning')
  })

  it('should render a FormStatus when "error" is given', () => {
    render(
      <FieldBlock error={new FormError('Error message')}>
        content
      </FieldBlock>
    )

    const element = document.querySelector('.dnb-form-status')

    expect(element).toBeInTheDocument()
    expect(element.className).toBe(
      'dnb-form-status dnb-form-status--error dnb-form-status__size--default dnb-space__top--x-small dnb-form-status--has-content'
    )
    expect(element.textContent).toBe('Error message')
  })

  it('should support "layout" property', () => {
    render(<FieldBlock layout="horizontal">content</FieldBlock>)

    const element = document.querySelector('.dnb-forms-field-block')

    expect(element.classList).toContain(
      'dnb-forms-field-block--layout-horizontal'
    )
    expect(element.classList).not.toContain(
      'dnb-forms-field-block--layout-vertical'
    )
  })

  it('should support "width" property', () => {
    const { rerender } = render(
      <FieldBlock width="medium">content</FieldBlock>
    )

    const element = document.querySelector('.dnb-forms-field-block')

    expect(element.classList).toContain(
      'dnb-forms-field-block--width-medium'
    )

    rerender(<FieldBlock width="large">content</FieldBlock>)

    expect(element.classList).toContain(
      'dnb-forms-field-block--width-large'
    )
  })

  it('should support "contentsWidth" property', () => {
    const { rerender } = render(
      <FieldBlock contentsWidth="medium">content</FieldBlock>
    )

    const element = document.querySelector(
      '.dnb-forms-field-block__contents'
    )

    expect(element.classList).toContain(
      'dnb-forms-field-block__contents--width-medium'
    )

    rerender(<FieldBlock contentsWidth="large">content</FieldBlock>)

    expect(element.classList).toContain(
      'dnb-forms-field-block__contents--width-large'
    )
  })

  it('should support "contentClassName" property', () => {
    render(
      <FieldBlock contentClassName="custom-class">content</FieldBlock>
    )

    const element = document.querySelector(
      '.dnb-forms-field-block__contents'
    )

    expect(element.classList).toContain('custom-class')
  })
})

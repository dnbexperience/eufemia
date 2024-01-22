import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Input } from '../../../../components'
import FieldBlock from '../FieldBlock'
import { FormError } from '../../types'
import userEvent from '@testing-library/user-event'
import { useDataValue } from '../../hooks'

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

  it('should support disabled prop', () => {
    const { rerender } = render(
      <FieldBlock label="Disabled label" disabled>
        content
      </FieldBlock>
    )

    const labelElement = () => document.querySelector('label')

    expect(labelElement()).toHaveAttribute('disabled')

    rerender(<FieldBlock label="Disabled label">content</FieldBlock>)

    expect(labelElement()).not.toHaveAttribute('disabled')
  })

  it('should support heading size prop', () => {
    const { rerender } = render(
      <FieldBlock label="Label" size="medium">
        content
      </FieldBlock>
    )

    expect(document.querySelector('.dnb-form-label').classList).toContain(
      'dnb-h--medium'
    )

    rerender(
      <FieldBlock label="Label" size="large">
        content
      </FieldBlock>
    )

    expect(document.querySelector('.dnb-form-label').classList).toContain(
      'dnb-h--large'
    )
  })

  it('should contain given classes', () => {
    render(<FieldBlock className="custom-class">content</FieldBlock>)

    expect(
      Array.from(
        document.querySelector('.dnb-forms-field-block').classList
      )
    ).toEqual(['dnb-space', 'dnb-forms-field-block', 'custom-class'])

    expect(
      Array.from(
        document.querySelector('.dnb-forms-field-block__grid').classList
      )
    ).toEqual([
      'dnb-forms-field-block__grid',
      'dnb-forms-field-block--layout-vertical',
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
      'dnb-form-label dnb-space__right--small dnb-space__top--zero dnb-space__bottom--x-small'
    )
    expect(labelElement.textContent).toBe('A Label Description')
  })

  it('click on label should set focus on input after value change', async () => {
    const MockComponent = () => {
      const fromInput = React.useCallback(({ value }) => value, [])
      const { value, handleChange } = useDataValue({
        value: '',
        fromInput,
      })

      return (
        <FieldBlock label="Label" forId="unique">
          <Input id="unique" value={value} on_change={handleChange} />
        </FieldBlock>
      )
    }

    render(<MockComponent />)

    const label = document.querySelector('label')
    const input = document.querySelector('input')

    await userEvent.type(input, 'foo')
    await userEvent.click(label)

    await waitFor(() => {
      expect(input).toHaveFocus()
    })
  })

  it('should not use fieldset/legend elements when no label is given', () => {
    render(
      <FieldBlock>
        <div>
          <span>no label</span>
          <Input label="Label" />
          <FieldBlock label="Label">
            <div>
              <span>no label</span>
              <Input label="Label" />
              <span>no label</span>
            </div>
          </FieldBlock>
          <span>no label</span>
        </div>
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
  })

  it('should use fieldset/legend elements when nested component has a label property', () => {
    render(
      <FieldBlock label="Legend">
        <div>
          <span>no label</span>
          <Input label="Label" />
          <FieldBlock label="Label">
            <div>
              <span>no label</span>
              <Input label="Label" />
              <span>no label</span>
            </div>
          </FieldBlock>
          <span>no label</span>
        </div>
      </FieldBlock>
    )

    expect(document.querySelectorAll('fieldset')).toHaveLength(1)
    expect(document.querySelectorAll('legend')).toHaveLength(1)
    expect(document.querySelector('.dnb-forms-field-block').tagName).toBe(
      'FIELDSET'
    )

    const labelElements = document.querySelectorAll('.dnb-form-label')
    expect(labelElements[0].tagName).toBe('LEGEND')
    expect(labelElements[1].tagName).toBe('LABEL')
    expect(labelElements[2].tagName).toBe('LABEL')
    expect(labelElements[3].tagName).toBe('LABEL')
    expect(labelElements[4]).toBe(undefined)
  })

  it('should use fieldset/legend elements when several components have a label property', () => {
    const { rerender } = render(
      <FieldBlock label="Legend">
        <MockComponent label="Label" />
        <MockComponent label="Label" />
      </FieldBlock>
    )

    expect(document.querySelectorAll('fieldset')).toHaveLength(1)
    expect(document.querySelectorAll('legend')).toHaveLength(1)
    expect(document.querySelector('legend')).not.toHaveAttribute('for')
    expect(document.querySelectorAll('label')).toHaveLength(2)

    rerender(
      <FieldBlock label="Legend" forId="unique">
        <MockComponent label="Label" />
        <MockComponent id="unique" />
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
    expect(document.querySelectorAll('label')).toHaveLength(2)

    rerender(
      <FieldBlock label="Legend">
        <MockComponent />
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
    expect(document.querySelectorAll('label')).toHaveLength(1)
  })

  it('should use fieldset/legend when _formElement is given', () => {
    MockComponent._formElement = true

    const { rerender } = render(
      <FieldBlock label="Legend">
        <MockComponent />
        <MockComponent />
      </FieldBlock>
    )

    expect(document.querySelectorAll('fieldset')).toHaveLength(1)
    expect(document.querySelectorAll('legend')).toHaveLength(1)
    expect(document.querySelector('legend')).not.toHaveAttribute('for')

    delete MockComponent._formElement

    rerender(
      <FieldBlock label="Legend">
        <MockComponent />
        <MockComponent />
      </FieldBlock>
    )

    expect(document.querySelector('fieldset')).not.toBeInTheDocument()
    expect(document.querySelector('legend')).not.toBeInTheDocument()
    expect(document.querySelectorAll('label')).toHaveLength(1)
  })

  it('should use fieldset/legend when "asFieldset" is given', () => {
    render(
      <FieldBlock label="Legend" asFieldset>
        content
      </FieldBlock>
    )

    expect(document.querySelectorAll('fieldset')).toHaveLength(1)
    expect(document.querySelectorAll('legend')).toHaveLength(1)
    expect(document.querySelector('legend')).not.toHaveAttribute('for')
    expect(document.querySelector('.dnb-forms-field-block').tagName).toBe(
      'FIELDSET'
    )
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

    const element = document.querySelector('.dnb-forms-field-block__grid')

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

  it('should support "contentWidth" property', () => {
    const { rerender } = render(
      <FieldBlock contentWidth="medium">content</FieldBlock>
    )

    const element = document.querySelector(
      '.dnb-forms-field-block__contents'
    )

    expect(element.classList).toContain(
      'dnb-forms-field-block__contents--width-medium'
    )

    rerender(<FieldBlock contentWidth="large">content</FieldBlock>)

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

function MockComponent({ label = null, id = null }) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <input id={id} />
    </>
  )
}
MockComponent._formElement = null

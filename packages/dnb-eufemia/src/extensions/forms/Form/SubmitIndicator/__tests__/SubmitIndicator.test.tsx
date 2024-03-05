import React from 'react'
import { render } from '@testing-library/react'
import { Form } from '../../..'
import locales from '../../../../../shared/locales'

const nbNO = locales['nb-NO']

describe('Form.SubmitIndicator', () => {
  it('should set custom "className"', () => {
    render(
      <Form.SubmitIndicator className="custom-class" state={undefined} />
    )

    const element = document.querySelector('.dnb-form-submit-indicator')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-form-submit-indicator',
      'custom-class',
    ])
  })

  it('should have three dots', () => {
    render(<Form.SubmitIndicator state="pending" />)

    const element = document.querySelector('.dnb-form-submit-indicator')
    expect(element).toHaveTextContent('...')
  })

  it('should support spacing props', () => {
    render(<Form.SubmitIndicator state="pending" top="2rem" />)

    const element = document.querySelector('.dnb-form-submit-indicator')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-form-submit-indicator',
      'dnb-form-submit-indicator--state-pending',
    ])
  })

  it('should forward HTML attributes', () => {
    render(
      <Form.SubmitIndicator state="pending" aria-label="Custom Label" />
    )

    const element = document.querySelector('.dnb-form-submit-indicator')
    const dots = document.querySelector('.dnb-form-submit-indicator__dots')

    expect(
      Array.from(element.attributes).map((attr) => attr.name)
    ).toEqual(['class'])

    expect(Array.from(dots.attributes).map((attr) => attr.name)).toEqual([
      'class',
      'aria-busy',
      'aria-label',
    ])
    expect(dots).toHaveAttribute('aria-label', 'Custom Label')
  })

  it('should have aria-busy', () => {
    render(<Form.SubmitIndicator state="pending" />)

    const dots = document.querySelector('.dnb-form-submit-indicator__dots')

    expect(dots).toHaveAttribute('aria-busy', 'true')
  })

  it('should have default aria-label', () => {
    render(<Form.SubmitIndicator state="pending" />)

    const dots = document.querySelector('.dnb-form-submit-indicator__dots')

    expect(dots).toHaveAttribute(
      'aria-label',
      nbNO.ProgressIndicator.indicator_label
    )
  })

  it('should set class with given state', () => {
    const { rerender } = render(<Form.SubmitIndicator state="pending" />)

    const element = document.querySelector('.dnb-form-submit-indicator')
    expect(element).toHaveClass('dnb-form-submit-indicator--state-pending')

    rerender(<Form.SubmitIndicator state="complete" />)

    expect(element).toHaveClass(
      'dnb-form-submit-indicator--state-complete'
    )
  })

  it('should check if a newline is needed', () => {
    Object.defineProperties(HTMLElement.prototype, {
      offsetHeight: {
        get: () => 10,
      },
    })

    const { rerender } = render(
      <Form.SubmitIndicator state="pending">
        Text of a long label 1
      </Form.SubmitIndicator>
    )

    const element = document.querySelector('.dnb-form-submit-indicator')
    expect(element).not.toHaveClass(
      'dnb-form-submit-indicator--inline-wrap'
    )

    let count = 0
    Object.defineProperties(HTMLElement.prototype, {
      offsetHeight: {
        get: () => {
          count++
          return 10 * count
        },
      },
    })

    rerender(
      <Form.SubmitIndicator state="pending">
        Text of a long label 2
      </Form.SubmitIndicator>
    )

    expect(element).toHaveClass('dnb-form-submit-indicator--inline-wrap')

    Object.defineProperties(HTMLElement.prototype, {
      offsetHeight: {
        get: () => 30,
      },
    })

    rerender(
      <Form.SubmitIndicator state="pending">
        Text of a long label 3
      </Form.SubmitIndicator>
    )

    expect(element).not.toHaveClass(
      'dnb-form-submit-indicator--inline-wrap'
    )
  })
})

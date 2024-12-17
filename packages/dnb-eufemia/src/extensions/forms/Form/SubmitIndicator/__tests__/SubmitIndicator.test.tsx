import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '../../..'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import locales from '../../../constants/locales'

const nbNO = locales['nb-NO']

describe('Form.SubmitIndicator', () => {
  it('should set custom "className"', () => {
    render(
      <Form.SubmitIndicator className="custom-class" state={undefined} />
    )

    const element = document.querySelector('.dnb-forms-submit-indicator')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-forms-submit-indicator',
      'custom-class',
    ])
  })

  it('should have three dots', () => {
    render(<Form.SubmitIndicator state="pending" />)

    const element = document.querySelector('.dnb-forms-submit-indicator')
    expect(element).toHaveTextContent('...')
  })

  it('should support spacing props', () => {
    render(<Form.SubmitIndicator state="pending" top="2rem" />)

    const element = document.querySelector('.dnb-forms-submit-indicator')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-space__top--large',
      'dnb-forms-submit-indicator',
      'dnb-forms-submit-indicator--state-pending',
    ])
  })

  it('should forward HTML attributes', () => {
    render(
      <Form.SubmitIndicator state="pending" aria-label="Custom Label" />
    )

    const element = document.querySelector('.dnb-forms-submit-indicator')
    const dots = document.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(
      Array.from(element.attributes).map((attr) => attr.name)
    ).toEqual(['class'])

    expect(Array.from(dots.attributes).map((attr) => attr.name)).toEqual([
      'class',
      'role',
      'aria-busy',
      'aria-label',
    ])
    expect(dots).toHaveAttribute('aria-label', 'Custom Label')
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<Form.SubmitIndicator state="pending" />)

    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('should not have role of status when state is not pending', () => {
    render(<Form.SubmitIndicator state="abort" />)

    const dots = document.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(dots).not.toHaveAttribute('role', 'status')
  })

  it('should role of status', () => {
    render(<Form.SubmitIndicator state="pending" />)

    const dots = document.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(dots).toHaveAttribute('role', 'status')
  })

  it('should have aria-busy', () => {
    render(<Form.SubmitIndicator state="pending" />)

    const dots = document.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(dots).toHaveAttribute('aria-busy', 'true')
  })

  it('should have aria-hidden when not pending', () => {
    render(<Form.SubmitIndicator state="complete" />)

    const dots = document.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(dots).toHaveAttribute('aria-hidden', 'true')
  })

  it('should have default aria-label', () => {
    render(<Form.SubmitIndicator state="pending" />)

    const dots = document.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(dots).toHaveAttribute('aria-label', nbNO.SubmitIndicator.label)
  })

  it('should have aria-label with custom label', () => {
    render(<Form.SubmitIndicator state="pending" label="Custom label" />)

    const dots = document.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(dots).toHaveAttribute('aria-label', 'Custom label')
  })

  it('should render when showLabel is true', () => {
    render(<Form.SubmitIndicator state="pending" showLabel />)

    const label = document.querySelector(
      '.dnb-forms-submit-indicator__label'
    )

    expect(label).toHaveTextContent(nbNO.SubmitIndicator.label)
  })

  it('should render custom label', () => {
    render(
      <Form.SubmitIndicator
        state="pending"
        label="Custom label"
        showLabel
      />
    )

    const label = document.querySelector(
      '.dnb-forms-submit-indicator__label'
    )

    expect(label).toHaveTextContent('Custom label')
  })

  it('should set class with given state', () => {
    const { rerender } = render(<Form.SubmitIndicator state="pending" />)

    const element = document.querySelector('.dnb-forms-submit-indicator')
    expect(element).toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )

    rerender(<Form.SubmitIndicator state="complete" />)

    expect(element).toHaveClass(
      'dnb-forms-submit-indicator--state-complete'
    )
  })

  it('should not add dots when state is "success" or "abort"', () => {
    const { rerender } = render(<Form.SubmitIndicator state="abort" />)

    const element = document.querySelector('.dnb-forms-submit-indicator')
    expect(element).toHaveTextContent('')

    rerender(<Form.SubmitIndicator state="success" />)

    expect(element).toHaveTextContent('')

    rerender(<Form.SubmitIndicator state="complete" />)

    expect(element).toHaveTextContent('...')
  })

  it('should remove dots when state is "complete"', async () => {
    const { rerender } = render(<Form.SubmitIndicator state="abort" />)

    const element = document.querySelector('.dnb-forms-submit-indicator')
    expect(element).toHaveTextContent('')

    rerender(<Form.SubmitIndicator state="success" />)

    expect(element).toHaveTextContent('')

    rerender(<Form.SubmitIndicator state="complete" />)

    expect(element).toHaveTextContent('...')
  })

  it('should check if a newline is needed', () => {
    const { rerender } = render(
      <Form.SubmitIndicator state="pending">
        Text of a long label 1
      </Form.SubmitIndicator>
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

    const element = document.querySelector('.dnb-forms-submit-indicator')
    expect(element).not.toHaveClass(
      'dnb-forms-submit-indicator--inline-wrap'
    )

    rerender(
      <Form.SubmitIndicator state="pending">
        Text of a long label 2
      </Form.SubmitIndicator>
    )

    expect(element).toHaveClass('dnb-forms-submit-indicator--inline-wrap')

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
      'dnb-forms-submit-indicator--inline-wrap'
    )
  })

  it('should recalculate wrapping on window resize', async () => {
    render(
      <Form.SubmitIndicator state="pending">
        Text of a long label
      </Form.SubmitIndicator>
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

    const element = document.querySelector('.dnb-forms-submit-indicator')
    expect(element).not.toHaveClass(
      'dnb-forms-submit-indicator--inline-wrap'
    )

    window.dispatchEvent(new Event('resize'))

    await waitFor(() => {
      expect(element).toHaveClass(
        'dnb-forms-submit-indicator--inline-wrap'
      )
    })
  })

  it('should support HTML content', () => {
    Object.defineProperties(HTMLElement.prototype, {
      offsetHeight: {
        get: () => 10,
      },
    })

    const { rerender } = render(
      <Form.SubmitIndicator state="pending">
        Text of a <b>bold</b> label 1
      </Form.SubmitIndicator>
    )

    const element = document.querySelector('.dnb-forms-submit-indicator')
    expect(element).not.toHaveClass(
      'dnb-forms-submit-indicator--inline-wrap'
    )

    expect(element.querySelector('span').innerHTML).toBe(
      'Text of a <b>bold</b> label 1'
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
        Text of a <b>bold</b> label 2
      </Form.SubmitIndicator>
    )

    expect(element).toHaveClass('dnb-forms-submit-indicator--inline-wrap')
    expect(element.querySelector('span').innerHTML).toBe(
      'Text of a <b>bold</b> label 2'
    )

    Object.defineProperties(HTMLElement.prototype, {
      offsetHeight: {
        get: () => 30,
      },
    })

    rerender(
      <Form.SubmitIndicator state="pending">
        Text of a <b>bold</b> label 3
      </Form.SubmitIndicator>
    )

    expect(element).not.toHaveClass(
      'dnb-forms-submit-indicator--inline-wrap'
    )
    expect(element.querySelector('span').innerHTML).toBe(
      'Text of a <b>bold</b> label 3'
    )
  })

  it('should not remove event listeners of nested components', async () => {
    Object.defineProperties(HTMLElement.prototype, {
      offsetHeight: {
        get: () => 10,
      },
    })

    const NestedComponent = () => {
      const [count, increment] = React.useReducer((state) => state + 1, 1)
      return <button onClick={increment}>{count}</button>
    }

    const { rerender } = render(
      <Form.SubmitIndicator state="pending">
        <NestedComponent /> label 1
      </Form.SubmitIndicator>
    )

    const element = document.querySelector('.dnb-forms-submit-indicator')

    expect(element).not.toHaveClass(
      'dnb-forms-submit-indicator--inline-wrap'
    )
    expect(element.querySelector('span').innerHTML).toBe(
      '<button>1</button> label 1'
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
        <NestedComponent /> label 2
      </Form.SubmitIndicator>
    )

    await userEvent.click(document.querySelector('button'))

    expect(element).toHaveClass('dnb-forms-submit-indicator--inline-wrap')
    expect(element.querySelector('span').innerHTML).toBe(
      '<button>2</button> label 2'
    )
  })

  it('should update children (label) when it changes', async () => {
    const MockComponent = () => {
      const [count, increment] = React.useReducer((state) => state + 1, 1)
      return (
        <>
          <Form.SubmitIndicator state="success">
            Label {count}
          </Form.SubmitIndicator>
          <button onClick={increment}>{count}</button>
        </>
      )
    }

    render(<MockComponent />)

    const button = document.querySelector('button')
    const element = document.querySelector('.dnb-forms-submit-indicator')

    expect(element).toHaveTextContent('Label 1')

    await userEvent.click(button)

    expect(element).toHaveTextContent('Label 2')
  })
})

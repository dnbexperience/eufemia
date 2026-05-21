import { render, screen } from '@testing-library/react'
import { Provider } from '../../../../../shared'
import { Value, Form } from '../../..'

describe('Value.Time', () => {
  it('renders value', () => {
    render(<Value.Time value="14:30" />)

    expect(
      document.querySelector('.dnb-forms-value-block__content').textContent
    ).toBe('14:30')
  })

  it('renders without value', () => {
    expect(() => render(<Value.Time />)).not.toThrow()

    render(<Value.Time />)
    expect(document.body.textContent).toBe('')
  })

  it('renders label when showEmpty is true', () => {
    const { rerender } = render(
      <Value.Time label="Time label" showEmpty />
    )
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Time label'
    )

    rerender(<Value.Time label="Time label" />)
    expect(document.querySelector('.dnb-form-label')).toBeNull()
  })

  it('renders value and label', () => {
    render(<Value.Time label="Label" value="14:30" />)

    expect(
      document.querySelector('.dnb-forms-value-block__content')
    ).toHaveTextContent('14:30')
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.Time placeholder="Enter time" />)

    expect(screen.getByText('Enter time')).toBeInTheDocument()
  })

  it('renders value based on path', () => {
    render(
      <Form.Handler data={{ myTime: '09:15' }}>
        <Value.Time path="/myTime" />
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-forms-value-block__content')
    ).toHaveTextContent('09:15')
  })

  it('renders default label from translations', () => {
    render(<Value.Time value="14:30" />)

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Tidspunkt'
    )
  })

  it('displays seconds when value contains seconds', () => {
    render(<Value.Time value="14:30:45" />)

    expect(
      document.querySelector('.dnb-forms-value-block__content')
    ).toHaveTextContent('14:30:45')
  })

  it('omits seconds when value has no seconds', () => {
    render(<Value.Time value="14:30" />)

    expect(
      document.querySelector('.dnb-forms-value-block__content')
    ).toHaveTextContent('14:30')
  })

  it('renders value with seconds based on path', () => {
    render(
      <Form.Handler data={{ myTime: '09:15:30' }}>
        <Value.Time path="/myTime" />
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-forms-value-block__content')
    ).toHaveTextContent('09:15:30')
  })

  it('formats time using the given locale', () => {
    render(
      <Provider locale="en-GB">
        <Value.Time value="14:30" />
      </Provider>
    )

    expect(
      document.querySelector('.dnb-forms-value-block__content')
    ).toHaveTextContent('14:30')
  })

  it('uses locale prop over context locale', () => {
    render(
      <Provider locale="nb-NO">
        <Value.Time value="14:30" locale="en-US" />
      </Provider>
    )

    const content = document.querySelector(
      '.dnb-forms-value-block__content'
    ).textContent

    expect(content).toContain('2:30')
    expect(content).toContain('PM')
  })
})

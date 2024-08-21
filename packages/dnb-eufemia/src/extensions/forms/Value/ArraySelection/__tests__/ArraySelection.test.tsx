import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form } from '../../..'

describe('Value.ArraySelection', () => {
  it('renders value', () => {
    render(<Value.ArraySelection value={['Foo', 'Bar', 'Baz']} />)

    expect(
      document.querySelector(
        '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo, Bar, Baz')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.ArraySelection showEmpty label="My label" />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My label'
    )
  })

  it('renders value and label', () => {
    render(
      <Value.ArraySelection
        label="My selections"
        value={['Foo', 'Bar', 'Baz']}
      />
    )
    expect(
      document.querySelector(
        '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo, Bar, Baz')

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My selections'
    )
  })

  it('renders custom label', () => {
    render(<Value.ArraySelection label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.ArraySelection placeholder="Please select a value" />)
    expect(screen.getByText('Please select a value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: ['Baz', 'Bar', 'Foo'] }}>
        <Value.ArraySelection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Baz, Bar, Foo')
  })
})

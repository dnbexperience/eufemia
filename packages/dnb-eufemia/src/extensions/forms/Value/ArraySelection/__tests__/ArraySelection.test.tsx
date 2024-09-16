import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { Value, Form, Field } from '../../..'

describe('Value.ArraySelection', () => {
  it('renders string values', () => {
    render(<Value.ArraySelection value={['Foo', 'Bar', 'Baz']} />)

    expect(
      document.querySelector(
        '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo, Bar og Baz')
  })

  it('renders number values', () => {
    render(<Value.ArraySelection value={[123, 456, 789]} />)

    expect(
      document.querySelector(
        '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123, 456 og 789')
  })

  it('renders custom format', () => {
    render(
      <Value.ArraySelection
        value={[123, 456, 789]}
        format={{ style: 'short', type: 'disjunction' }}
      />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123, 456 eller 789')
  })

  it('should render different variants', () => {
    const { rerender } = render(
      <Value.ArraySelection variant="ol" value={[123, 456, 789]} />
    )

    const valueBlock = document.querySelector(
      '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
    )

    const ol = valueBlock.querySelector('.dnb-ol') as HTMLOListElement

    expect(ol).toBeInTheDocument()
    expect(ol.children.length).toBe(3)
    expect(ol).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )
    rerender(<Value.ArraySelection variant="ul" value={[123, 456, 789]} />)

    const ul = valueBlock.querySelector('.dnb-ul') as HTMLUListElement

    expect(ol).not.toBeInTheDocument()
    expect(ul).toBeInTheDocument()
    expect(ul.children.length).toBe(3)
    expect(ul).toContainHTML(
      '<li class="dnb-li">123</li><li class="dnb-li">456</li><li class="dnb-li">789</li>'
    )

    rerender(
      <Value.ArraySelection variant="text" value={[123, 456, 789]} />
    )

    expect(ol).not.toBeInTheDocument()
    expect(ul).not.toBeInTheDocument()
    expect(valueBlock).toHaveTextContent('123, 456 og 789')
  })

  it('should render unstyled list variants if specified', () => {
    const { rerender } = render(
      <Value.ArraySelection
        variant="ol-unstyled"
        value={[123, 456, 789]}
      />
    )

    const valueBlock = document.querySelector(
      '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
    )

    const ol = valueBlock.querySelector('.dnb-ol')

    expect(ol).toHaveClass('dnb-unstyled-list')
    expect(ol).not.toHaveClass('dnb-list')

    rerender(
      <Value.ArraySelection
        variant="ul-unstyled"
        value={[123, 456, 789]}
      />
    )

    const ul = valueBlock.querySelector('.dnb-ul')

    expect(ul).toHaveClass('dnb-unstyled-list')
    expect(ul).not.toHaveClass('dnb-list')
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
    ).toHaveTextContent('Foo, Bar og Baz')

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
    ).toHaveTextContent('Baz, Bar og Foo')
  })

  it('formats value in different locale', () => {
    render(
      <Form.Handler
        locale="en-GB"
        data={{ myPath: ['Baz', 'Bar', 'Foo'] }}
      >
        <Value.ArraySelection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Baz, Bar and Foo')
  })

  it('should use Field.Option title rendered in Field.ArraySelection', () => {
    render(
      <Form.Handler
        locale="en-GB"
        data={{
          myPath: ['foo', 'bar'],
        }}
      >
        <Field.ArraySelection path="/myPath">
          <Field.Option value="foo" title="Foo title" />
          <Field.Option value="bar" title={<span>Bar title</span>} />
          <Field.Option value="baz" title="Baz title" />
        </Field.ArraySelection>

        <Value.ArraySelection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo title and Bar title')
  })

  it('should use Field.Option title rendered in Field.ArraySelection interactively', () => {
    render(
      <Form.Handler
        locale="en-GB"
        data={{
          myPath: ['foo', 'bar'],
        }}
      >
        <Field.ArraySelection path="/myPath">
          <Field.Option value="foo" title="Foo title" />
          <Field.Option value="bar" title="Bar title" />
          <Field.Option value="baz" title="Baz title" />
        </Field.ArraySelection>

        <Value.ArraySelection path="/myPath" showEmpty />
      </Form.Handler>
    )

    const element = document.querySelector(
      '.dnb-forms-value-array-selection .dnb-forms-value-block__content'
    )

    expect(element).toHaveTextContent('Foo title and Bar title')

    fireEvent.click(screen.getAllByText('Foo title')[0])
    expect(element).toHaveTextContent('Bar title')

    fireEvent.click(screen.getAllByText('Bar title')[0])
    expect(element).toHaveTextContent('')

    fireEvent.click(screen.getAllByText('Bar title')[0])
    expect(element).toHaveTextContent('Bar title')

    fireEvent.click(screen.getAllByText('Foo title')[0])
    expect(element).toHaveTextContent('Foo title and Bar title')

    fireEvent.click(screen.getAllByText('Baz title')[0])
    expect(element).toHaveTextContent('Foo title, Bar title and Baz title')
  })
})

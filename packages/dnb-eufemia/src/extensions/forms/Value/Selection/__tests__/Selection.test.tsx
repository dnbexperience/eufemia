import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value, Form, Field } from '../../..'
import userEvent from '@testing-library/user-event'

describe('Value.Selection', () => {
  it('renders value', () => {
    render(<Value.Selection value="Bankaxept" />)

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Bankaxept')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.Selection showEmpty label="My label" />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My label'
    )
  })

  it('renders value and label', () => {
    render(<Value.Selection label="My selections" value="Visa" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Visa')

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My selections'
    )
  })

  it('renders custom label', () => {
    render(<Value.Selection label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  it('renders placeholder', () => {
    render(<Value.Selection placeholder="Please select a value" />)
    expect(screen.getByText('Please select a value')).toBeInTheDocument()
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: 'Mastercard' }}>
        <Value.Selection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Mastercard')
  })

  it('should use Field.Option title rendered in Field.Selection', () => {
    render(
      <Form.Handler
        data={{
          myPath: 'foo',
        }}
      >
        <Field.Selection path="/myPath" variant="radio">
          <Field.Option value="foo" title="Foo title" />
          <Field.Option value="bar" title="Bar title" />
          <Field.Option value="baz" title="Baz title" />
        </Field.Selection>

        <Value.Selection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo title')
  })

  it('should use Field.Option title, when title is JSX', async () => {
    render(
      <Form.Handler
        data={{
          myPath: 'bar',
        }}
      >
        <Field.Selection path="/myPath">
          <Field.Option value="foo" title="Foo title" />
          <Field.Option value="bar" title={<span>Bar title</span>} />
          <Field.Option value="baz" title="Baz title" />
        </Field.Selection>

        <Value.Selection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Bar title')
  })

  it('should use Field.Option title rendered in Field.Selection interactively', async () => {
    render(
      <Form.Handler
        data={{
          myPath: 'foo',
        }}
      >
        <Field.Selection path="/myPath" variant="radio">
          <Field.Option value="foo" title="Foo title" />
          <Field.Option value="bar" title="Bar title" />
          <Field.Option value="baz" title="Baz title" />
        </Field.Selection>

        <Value.Selection path="/myPath" />
      </Form.Handler>
    )

    const element = document.querySelector(
      '.dnb-forms-value-string .dnb-forms-value-block__content'
    )

    expect(element).toHaveTextContent('Foo title')

    await userEvent.click(screen.getAllByText('Bar title')[0])
    expect(element).toHaveTextContent('Bar title')

    await userEvent.click(screen.getAllByText('Baz title')[0])
    expect(element).toHaveTextContent('Baz title')

    await userEvent.click(screen.getAllByText('Foo title')[0])
    expect(element).toHaveTextContent('Foo title')
  })

  it('should use title from data context interactively', async () => {
    render(
      <Form.Handler
        data={{
          selection: 'foo',
          myList: [
            { value: 'foo', title: 'Foo title' },
            { value: 'bar', title: 'Bar title' },
            { value: 'baz', title: 'Baz title' },
          ],
        }}
      >
        <Field.Selection
          path="/selection"
          dataPath="/myList"
          variant="radio"
        />
        <Value.Selection path="/selection" dataPath="/myList" />
      </Form.Handler>
    )

    const element = document.querySelector(
      '.dnb-forms-value-string .dnb-forms-value-block__content'
    )

    expect(element).toHaveTextContent('Foo title')

    await userEvent.click(screen.getAllByText('Bar title')[0])
    expect(element).toHaveTextContent('Bar title')

    await userEvent.click(screen.getAllByText('Baz title')[0])
    expect(element).toHaveTextContent('Baz title')

    await userEvent.click(screen.getAllByText('Foo title')[0])
    expect(element).toHaveTextContent('Foo title')
  })

  it('should use data from context when "dataPath" is defined', () => {
    render(
      <Form.Handler
        data={{
          selection: 'bar',
          myList: [
            { value: 'foo', title: 'Foo title' },
            { value: 'bar', title: 'Bar title' },
            { value: 'baz', title: 'Baz title' },
          ],
        }}
      >
        <Value.Selection path="/selection" dataPath="/myList" />
      </Form.Handler>
    )

    const element = document.querySelector(
      '.dnb-forms-value-string .dnb-forms-value-block__content'
    )

    expect(element).toHaveTextContent('Bar title')
  })

  it('should use data from context when "dataPath" is defined without "path"', () => {
    render(
      <Form.Handler
        data={{
          myList: [
            { value: 'foo', title: 'Foo title' },
            { value: 'bar', title: 'Bar title' },
            { value: 'baz', title: 'Baz title' },
          ],
        }}
      >
        <Value.Selection dataPath="/myList" defaultValue="bar" />
      </Form.Handler>
    )

    const element = document.querySelector(
      '.dnb-forms-value-string .dnb-forms-value-block__content'
    )

    expect(element).toHaveTextContent('Bar title')
  })
})

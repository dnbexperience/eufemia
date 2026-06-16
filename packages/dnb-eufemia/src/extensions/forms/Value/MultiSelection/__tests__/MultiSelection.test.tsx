import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Value, Form, Field } from '../../..'

describe('Value.MultiSelection', () => {
  const data = [
    { value: 'foo', title: 'Foo title' },
    { value: 'bar', title: 'Bar title' },
    { value: 'baz', title: 'Baz title' },
  ]

  it('renders string values', () => {
    render(<Value.MultiSelection value={['Foo', 'Bar', 'Baz']} />)

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo, Bar og Baz')
  })

  it('renders number values', () => {
    render(<Value.MultiSelection value={[123, 456, 789]} />)

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123, 456 og 789')
  })

  it('renders custom format', () => {
    render(
      <Value.MultiSelection
        value={[123, 456, 789]}
        format={{ style: 'short', type: 'disjunction' }}
      />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('123, 456 eller 789')
  })

  it('should render different variants', () => {
    const values = [123, 456, 789]
    const { rerender } = render(
      <Value.MultiSelection variant="ol" value={values} />
    )

    const valueBlock = document.querySelector(
      '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
    )

    const ol = valueBlock.querySelector('.dnb-ol') as HTMLOListElement
    expect(ol).toBeInTheDocument()
    expect(ol.children.length).toBe(3)

    rerender(<Value.MultiSelection variant="ul" value={values} />)
    const ul = valueBlock.querySelector('.dnb-ul') as HTMLUListElement
    expect(ol).not.toBeInTheDocument()
    expect(ul).toBeInTheDocument()
    expect(ul.children.length).toBe(3)

    rerender(<Value.MultiSelection variant="text" value={values} />)
    expect(ol).not.toBeInTheDocument()
    expect(ul).not.toBeInTheDocument()
    expect(valueBlock).toHaveTextContent('123, 456 og 789')
  })

  it('renders label when showEmpty is true', () => {
    render(<Value.MultiSelection showEmpty label="My label" />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My label'
    )
  })

  it('renders value and label', () => {
    render(
      <Value.MultiSelection
        label="My selections"
        value={['Foo', 'Bar', 'Baz']}
      />
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo, Bar og Baz')

    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'My selections'
    )
  })

  it('renders placeholder', () => {
    render(<Value.MultiSelection placeholder="Please select a value" />)
    expect(
      document.querySelector('.dnb-forms-value-multi-selection')
    ).toHaveTextContent('Please select a value')
  })

  it('renders value from path', () => {
    render(
      <Form.Handler data={{ myPath: ['Baz', 'Bar', 'Foo'] }}>
        <Value.MultiSelection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Baz, Bar og Foo')
  })

  it('formats value in different locale', () => {
    render(
      <Form.Handler
        locale="en-GB"
        data={{ myPath: ['Baz', 'Bar', 'Foo'] }}
      >
        <Value.MultiSelection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Baz, Bar and Foo')
  })

  it('resolves values to titles using direct data prop', () => {
    render(<Value.MultiSelection value={['foo', 'baz']} data={data} />)

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo title og Baz title')
  })

  it('resolves values to titles using dataPath', () => {
    render(
      <Form.Handler
        locale="en-GB"
        data={{
          myItems: data,
          myPath: ['foo', 'bar'],
        }}
      >
        <Value.MultiSelection path="/myPath" dataPath="/myItems" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo title and Bar title')
  })

  it('updates titles when dataPath data changes', async () => {
    function ChangeOptions() {
      const { update } = Form.useData()

      return (
        <button
          type="button"
          onClick={() => {
            update('/myItems', [
              { value: 'foo', title: 'Updated foo' },
              { value: 'bar', title: 'Updated bar' },
            ])
          }}
        >
          Change options
        </button>
      )
    }

    render(
      <Form.Handler
        locale="en-GB"
        data={{
          myItems: data,
          myPath: ['foo', 'bar'],
        }}
      >
        <Value.MultiSelection path="/myPath" dataPath="/myItems" />
        <ChangeOptions />
      </Form.Handler>
    )

    const element = document.querySelector(
      '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
    )

    expect(element).toHaveTextContent('Foo title and Bar title')

    await userEvent.click(screen.getByText('Change options'))

    expect(element).toHaveTextContent('Updated foo and Updated bar')
  })

  it('resolves values to titles from Field.MultiSelection via field internals', () => {
    render(
      <Form.Handler
        locale="en-GB"
        data={{
          myPath: ['foo', 'bar'],
        }}
      >
        <Field.MultiSelection path="/myPath" data={data} />
        <Value.MultiSelection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('Foo title and Bar title')
  })

  it('updates when Field.MultiSelection selection changes interactively', () => {
    render(
      <Form.Handler
        locale="en-GB"
        data={{
          myPath: ['foo', 'bar'],
        }}
      >
        <Field.MultiSelection
          path="/myPath"
          data={data}
          variant="inline"
        />
        <Value.MultiSelection path="/myPath" showEmpty />
      </Form.Handler>
    )

    const element = document.querySelector(
      '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
    )

    expect(element).toHaveTextContent('Foo title and Bar title')

    const checkboxes = document.querySelectorAll(
      '.dnb-forms-field-multi-selection .dnb-checkbox__input'
    )

    // Uncheck "Foo title"
    fireEvent.click(checkboxes[0])
    expect(element).toHaveTextContent('Bar title')

    // Check "Baz title"
    fireEvent.click(checkboxes[2])
    expect(element).toHaveTextContent('Bar title and Baz title')
  })

  it('falls back to raw values when no title mapping is available', () => {
    render(
      <Form.Handler data={{ myPath: ['val1', 'val2'] }}>
        <Value.MultiSelection path="/myPath" />
      </Form.Handler>
    )

    expect(
      document.querySelector(
        '.dnb-forms-value-multi-selection .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('val1 og val2')
  })

  it('should not render when value is undefined', () => {
    render(<Value.MultiSelection value={undefined} />)

    expect(
      document.querySelector('.dnb-forms-value-multi-selection')
    ).toBeNull()
  })

  it('should render – when value is undefined and showEmpty is true', () => {
    render(<Value.MultiSelection value={undefined} showEmpty />)

    expect(
      document.querySelector('.dnb-forms-value-multi-selection')
    ).toBeInTheDocument()
  })
})

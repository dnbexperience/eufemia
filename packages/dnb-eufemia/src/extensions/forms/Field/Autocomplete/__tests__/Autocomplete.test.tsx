import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataContext from '../../../DataContext/Context'
import DrawerListProvider from '../../../../../fragments/drawer-list/DrawerListProvider'
import { Field, Form } from '../../..'

describe('Autocomplete', () => {
  const openAutocomplete = () => {
    fireEvent.focus(document.querySelector('.dnb-input__input'))
    fireEvent.mouseDown(document.querySelector('.dnb-input__input'))
  }

  it('has no selected value by default', () => {
    render(
      <Field.Autocomplete>
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Autocomplete>
    )

    openAutocomplete()

    const options = document.querySelectorAll('[role="option"]')
    expect(options.length).toEqual(2)
    expect(options[0].getAttribute('aria-selected')).toBe('false')
    expect(options[1].getAttribute('aria-selected')).toBe('false')
  })

  it('renders help', () => {
    render(
      <Field.Autocomplete
        help={{ title: 'Help title', content: 'Help content' }}
      >
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Autocomplete>
    )
    expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(1)
    expect(document.querySelector('input')).toHaveAttribute(
      'aria-describedby'
    )
    expect(
      document
        .querySelector('.dnb-help-button')
        .getAttribute('aria-describedby')
    ).toBe(document.querySelector('.dnb-tooltip__content').id)
  })

  it('should disable autocomplete', () => {
    render(
      <Field.Autocomplete disabled>
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Autocomplete>
    )

    expect(document.querySelector('input')).toBeDisabled()
  })

  it('renders selected option', () => {
    render(
      <Field.Autocomplete value="bar">
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Autocomplete>
    )

    openAutocomplete()

    const options = document.querySelectorAll('[role="option"]')
    expect(options.length).toEqual(2)
    expect(options[0].getAttribute('aria-selected')).toBe('false')
    expect(options[1].getAttribute('aria-selected')).toBe('true')
  })

  it('renders update selected option based on external value change', () => {
    const { rerender } = render(
      <Field.Autocomplete value="bar">
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Autocomplete>
    )

    rerender(
      <Field.Autocomplete value="foo">
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Autocomplete>
    )

    openAutocomplete()

    const options = document.querySelectorAll('[role="option"]')
    expect(options.length).toEqual(2)
    expect(options[0].getAttribute('aria-selected')).toBe('true')
    expect(options[1].getAttribute('aria-selected')).toBe('false')
  })

  it('renders only options with a value', () => {
    const { rerender } = render(
      <Field.Autocomplete value="bar">
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
        {null}
      </Field.Autocomplete>
    )

    openAutocomplete()

    expect(document.querySelectorAll('[role="option"]')).toHaveLength(2)

    rerender(
      <Field.Autocomplete value="foo">
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
        content without a key
      </Field.Autocomplete>
    )

    expect(document.querySelectorAll('[role="option"]')).toHaveLength(3)
    expect(
      document.querySelectorAll('[role="option"]')[2]
    ).toHaveTextContent('content without a key')
  })

  it('should accept camelCase props in autocomplete props', () => {
    render(
      <Field.Autocomplete
        value="bar"
        showSubmitButton
        submitButtonTitle="Custom title"
      >
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Autocomplete>
    )

    expect(document.querySelector('button')).toHaveAttribute(
      'aria-label',
      'Custom title'
    )
  })

  it('should support data prop', async () => {
    render(
      <Field.Autocomplete
        value="foo"
        data={[
          {
            title: 'Foo!',
            value: 'foo',
          },
          {
            title: 'Bar!',
            value: 'bar',
          },
        ]}
      />
    )

    const input = document.querySelector('input')
    expect(input).toHaveValue('Foo!')

    openAutocomplete()

    const options = Array.from(
      document.querySelectorAll('[role="option"]')
    )
    const [option1, option2] = options

    expect(options).toHaveLength(2)

    expect(option1).toHaveTextContent('Foo!')
    expect(option2).toHaveTextContent('Bar!')

    expect(option1).toHaveAttribute('aria-selected', 'true')
    expect(option2).toHaveAttribute('aria-selected', 'false')
  })

  it('should support selected value from "path"', async () => {
    render(
      <Form.Handler
        defaultData={{
          mySelection: 'foo',
          myList: [
            {
              value: 'foo',
              title: 'Foo!',
            },
            {
              value: 'bar',
              title: 'Bar!',
            },
          ],
        }}
      >
        <Field.Autocomplete path="/mySelection" dataPath="/myList" />
      </Form.Handler>
    )

    openAutocomplete()

    const options = Array.from(
      document.querySelectorAll('[role="option"]')
    )
    const [option1, option2] = options

    expect(options).toHaveLength(2)

    expect(option1).toHaveTextContent('Foo!')
    expect(option2).toHaveTextContent('Bar!')

    expect(option1).toHaveAttribute('aria-selected', 'true')
    expect(option2).toHaveAttribute('aria-selected', 'false')
  })

  it('should support "dataPath"', () => {
    render(
      <Form.Handler
        data={{
          myList: [
            {
              value: 'foo',
              title: 'Foo!',
            },
            {
              value: 'bar',
              title: 'Bar!',
            },
          ],
        }}
      >
        <Field.Autocomplete dataPath="/myList">
          <Field.Option value="baz">Baz!</Field.Option>
        </Field.Autocomplete>
      </Form.Handler>
    )

    openAutocomplete()

    const options = Array.from(
      document.querySelectorAll('[role="option"]')
    )

    expect(options).toHaveLength(3)

    const [option1, option2, option3] = options

    expect(option1).toHaveTextContent('Foo!')
    expect(option2).toHaveTextContent('Bar!')
    expect(option3).toHaveTextContent('Baz!')

    expect(option1).toHaveAttribute('aria-selected', 'false')
    expect(option2).toHaveAttribute('aria-selected', 'false')
    expect(option3).toHaveAttribute('aria-selected', 'false')
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler
        defaultData={{
          mySelection: 'foo',
          myList: [
            {
              value: 'foo',
              title: 'Foo!',
            },
            {
              value: 'bar',
              title: 'Bar!',
            },
          ],
        }}
      >
        <Field.Autocomplete path="/mySelection" dataPath="/myList" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/mySelection': {
        type: 'field',
        value: 'Foo!',
      },
    })

    // Open like user would do, but without a delay
    DrawerListProvider['blurDelay'] = 0
    await userEvent.tab()
    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')
    DrawerListProvider['blurDelay'] = 201

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/mySelection': {
        type: 'field',
        value: 'Bar!',
      },
    })
  })

  it('should support inline styling using Field.Option', () => {
    render(
      <Field.Autocomplete>
        <Field.Option value="foo" style={{ color: 'red' }}>
          Foo
        </Field.Option>
      </Field.Autocomplete>
    )

    openAutocomplete()

    const option = document.querySelector('[role="option"]')
    expect(option.getAttribute('style')).toBe('color: red;')
  })

  it('should support inline styling using data', () => {
    render(
      <Field.Autocomplete
        data={[
          {
            title: 'Foo',
            value: 'foo',
            style: { color: 'red' },
          },
        ]}
      />
    )

    openAutocomplete()

    const option = document.querySelector('[role="option"]')
    expect(option.getAttribute('style')).toBe('color: red;')
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.Autocomplete label="Label" required validateInitially>
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Autocomplete>
      )

      openAutocomplete()

      expect(
        await axeComponent(result, {
          rules: {
            // Because of aria-controls and aria-required is not allowed on buttons – but VO still reads it
            'aria-allowed-attr': { enabled: false },
            'aria-valid-attr-value': { enabled: false },
          },
        })
      ).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(
        <Field.Autocomplete value="bar" required>
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Autocomplete>
      )

      const button = document.querySelector('input')

      openAutocomplete()

      expect(button).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(
        <Field.Autocomplete required validateInitially>
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Autocomplete>
      )

      openAutocomplete()

      const buttonElement = document.querySelector('input')
      expect(buttonElement).toHaveAttribute('aria-invalid', 'true')
    })
  })
})

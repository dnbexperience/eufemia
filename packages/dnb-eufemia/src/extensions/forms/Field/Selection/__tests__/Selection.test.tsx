import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import {
  screen,
  render,
  within,
  fireEvent,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataContext from '../../../DataContext/Context'
import DrawerListProvider from '../../../../../fragments/drawer-list/DrawerListProvider'
import { makeOptions } from '../Selection'
import { Field, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Selection', () => {
  it('renders selected option', () => {
    render(
      <Field.Selection value="bar">
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )
    expect(screen.queryAllByRole('button').length).toEqual(1)
    expect(screen.getByText('Bar')).toBeInTheDocument()
    expect(screen.queryAllByRole('option').length).toEqual(0)
    expect(screen.queryByText('Foo')).not.toBeInTheDocument()
  })

  it('renders selected option with a text property', () => {
    render(
      <Field.Selection value="bar">
        <Field.Option value="foo" title="Foo!" text="Text" />
        <Field.Option value="bar" title="Bar!" text="Text" />
      </Field.Selection>
    )
    expect(
      document.querySelector('.dnb-dropdown__text__inner')
    ).toHaveTextContent('Bar! Text')
  })

  describe('transformSelection', () => {
    it('renders selected option with the "transformSelection" return', () => {
      render(
        <Field.Selection
          value="bar"
          transformSelection={(item) => item.title}
        >
          <Field.Option value="foo" title="Foo!" text="Text" />
          <Field.Option value="bar" title="Bar!" text="Text" />
        </Field.Selection>
      )
      expect(
        document.querySelector('.dnb-dropdown__text__inner').textContent
      ).toBe('Bar!')
    })

    it('renders selected option with the "transformSelection" return using "children"', () => {
      render(
        <Field.Selection
          value="bar"
          transformSelection={(item) => item.children}
        >
          <Field.Option value="foo" text="Text">
            Foo!
          </Field.Option>
          <Field.Option value="bar" text="Text">
            Bar!
          </Field.Option>
        </Field.Selection>
      )
      expect(
        document.querySelector('.dnb-dropdown__text__inner').textContent
      ).toBe('Bar!')
    })

    it('renders selected data context with the "transformSelection" return', () => {
      render(
        <Form.Handler
          defaultData={{
            mySelection: 'bar',
            myList: [
              {
                value: 'foo',
                title: 'Foo!',
                text: 'Text',
              },
              {
                value: 'bar',
                title: 'Bar!',
                text: 'Text',
              },
            ],
          }}
        >
          <Field.Selection
            path="/mySelection"
            dataPath="/myList"
            transformSelection={(item) => item.title}
          >
            <Field.Option value="foo" title="Foo" text="Text" />
            <Field.Option value="bar" title="Bar" text="Text" />
          </Field.Selection>
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-dropdown__text__inner').textContent
      ).toBe('Bar!')
    })
  })

  it('renders selected option with number values', () => {
    render(
      <Field.Selection value="20">
        <Field.Option value="10" title="Ten" />
        <Field.Option value="20" title="Twenty" />
        <Field.Option value="30" title="Thirty" />
      </Field.Selection>
    )
    expect(screen.getByText('Twenty')).toBeInTheDocument()
    expect(screen.queryByText('Ten')).not.toBeInTheDocument()
    expect(screen.queryByText('Thirty')).not.toBeInTheDocument()
  })

  it('should change option based on external value change', async () => {
    const { rerender } = render(
      <Field.Selection value="bar">
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )

    const btn1 = screen.getByRole('button')
    expect(within(btn1).getByText('Bar')).toBeInTheDocument()
    expect(within(btn1).queryByText('Foo')).not.toBeInTheDocument()

    // This should re-render the mounted Selection-component with a new value-prop
    rerender(
      <Field.Selection value="foo">
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )

    // The selected button should now show the other option based on the value-prop change
    const btn2 = screen.getByRole('button')
    expect(within(btn2).getByText('Foo')).toBeInTheDocument()
    expect(within(btn2).queryByText('Bar')).not.toBeInTheDocument()
  })

  it('renders given options', async () => {
    render(
      <Field.Selection value="bar">
        <Field.Option value="one">One</Field.Option>
        <Field.Option value="two">Two</Field.Option>
        <Field.Option value="three">Three o'clock</Field.Option>
        <Field.Option value="four">Four o'clock rock</Field.Option>
      </Field.Selection>
    )

    const selectionButton = screen.getByRole('button')
    await userEvent.click(selectionButton)

    expect(screen.getAllByRole('option').length).toEqual(4)
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
    expect(screen.getByText("Three o'clock")).toBeInTheDocument()
    expect(screen.getByText("Four o'clock rock")).toBeInTheDocument()
  })

  it('renders placeholder', () => {
    render(
      <Field.Selection placeholder="Select something">
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )
    // getByText instead of getByPlaceholderText since eufemia adds placeholder as tag, not placeholder-attribute
    expect(screen.getByText('Select something')).toBeInTheDocument()
  })
})

describe('variants', () => {
  describe('radio', () => {
    it('renders selected option', () => {
      render(
        <Field.Selection variant="radio" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )
      const radioButtons = screen.queryAllByRole('radio')
      expect(radioButtons.length).toEqual(2)
      expect(radioButtons[0]).not.toBeChecked()
      expect(radioButtons[1]).toBeChecked()
    })

    it('precede option title over children', async () => {
      render(
        <Field.Selection variant="radio">
          <Field.Option value="foo" title="title a">
            child a
          </Field.Option>
          <Field.Option value="bar" title="title b">
            child b
          </Field.Option>
        </Field.Selection>
      )

      const options = document.querySelectorAll('.dnb-radio')

      expect(options[0].textContent).toBe('title a')
      expect(options[1].textContent).toBe('title b')
    })

    it('renders help', () => {
      render(
        <Field.Selection variant="radio">
          <Field.Option
            value="foo"
            help={{ title: 'Help title', content: 'Help content' }}
          >
            Foo
          </Field.Option>
          <Field.Option
            value="bar"
            help={{ title: 'Help title', content: 'Help content' }}
          >
            Bar
          </Field.Option>
        </Field.Selection>
      )
      expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(2)
      const [first, second] = Array.from(
        document.querySelectorAll('input')
      )
      expect(first).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining('-suffix')
      )
      expect(second).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining('-suffix')
      )
    })

    it('should disable options', () => {
      render(
        <Field.Selection variant="radio" disabled>
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )
      const radioButtons = screen.queryAllByRole('radio')
      expect(radioButtons[0]).toBeDisabled()
      expect(radioButtons[1]).toBeDisabled()
    })

    it('should render options in nested elements', () => {
      render(
        <Field.Selection variant="radio">
          <div>
            <Field.Option value="option1">Option 1</Field.Option>
            <div>
              <Field.Option value="option2">Option 2</Field.Option>
            </div>
          </div>
        </Field.Selection>
      )

      const [option1, option2] = Array.from(
        document.querySelectorAll('input')
      )

      expect(option1).toBeInTheDocument()
      expect(option2).toBeInTheDocument()
    })

    it('should render nested fields', () => {
      render(
        <Field.Selection variant="radio">
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.String />
          <Form.Visibility visible>
            <Field.Option value="option2">Option 2</Field.Option>
          </Form.Visibility>
        </Field.Selection>
      )

      const [option1, option2, option3] = Array.from(
        document.querySelectorAll('input')
      )

      expect(option1).toHaveAttribute('type', 'radio')
      expect(option2).toHaveAttribute('type', 'text')
      expect(option3).toHaveAttribute('type', 'radio')
    })

    it('renders update selected option based on external value change', () => {
      const { rerender } = render(
        <Field.Selection variant="radio" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )
      rerender(
        <Field.Selection variant="radio" value="foo">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      const radioButtons = screen.queryAllByRole('radio')
      expect(radioButtons.length).toEqual(2)
      expect(radioButtons[0]).toBeChecked()
      expect(radioButtons[1]).not.toBeChecked()
    })

    it('should support selected value from "path"', async () => {
      const onChange = jest.fn()

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
          <Field.Selection
            variant="radio"
            path="/mySelection"
            dataPath="/myList"
            onChange={onChange}
          />
        </Form.Handler>
      )

      const options = Array.from(document.querySelectorAll('.dnb-radio'))
      expect(options).toHaveLength(2)

      const [option1, option2] = options

      expect(option1).toHaveTextContent('Foo!')
      expect(option2).toHaveTextContent('Bar!')

      expect(option1.querySelector('input')).toBeChecked()
      expect(option2.querySelector('input')).not.toBeChecked()

      await userEvent.click(option2.querySelector('input'))

      expect(option1.querySelector('input')).not.toBeChecked()
      expect(option2.querySelector('input')).toBeChecked()

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith('bar')
    })

    it('should support "dataPath"', () => {
      render(
        <Form.Handler
          data={{
            myList: [
              { value: 'foo', title: 'Foo!', text: 'Text' },
              { value: 'bar', title: 'Bar!', text: 'Text' },
            ],
            mySelection: 'bar',
          }}
        >
          <Field.Selection
            variant="radio"
            path="/mySelection"
            dataPath="/myList"
          >
            <Field.Option value="baz">Baz!</Field.Option>
          </Field.Selection>
        </Form.Handler>
      )

      const options = Array.from(document.querySelectorAll('.dnb-radio'))
      expect(options).toHaveLength(3)

      const [option1, option2, option3] = options

      expect(option1).toHaveTextContent('Foo!')
      expect(option2).toHaveTextContent('Bar!')
      expect(option3).toHaveTextContent('Baz!')

      expect(option1.querySelector('input')).toHaveAttribute(
        'aria-checked',
        'false'
      )
      expect(option2.querySelector('input')).toHaveAttribute(
        'aria-checked',
        'true'
      )
      expect(option3.querySelector('input')).toHaveAttribute(
        'aria-checked',
        'false'
      )

      expect(option1.querySelector('input').id).toBe(
        option1.querySelector('label').getAttribute('for')
      )
      expect(option2.querySelector('input').id).toBe(
        option2.querySelector('label').getAttribute('for')
      )
      expect(option3.querySelector('input').id).toBe(
        option3.querySelector('label').getAttribute('for')
      )
      expect(option1.querySelector('input').id).not.toBe(
        option2.querySelector('label').getAttribute('for')
      )
      expect(option1.querySelector('input').id).not.toBe(
        option3.querySelector('label').getAttribute('for')
      )
    })

    it('should support "dataPath" with title and text property', () => {
      render(
        <Form.Handler
          data={{
            myList: [
              { value: 'foo', title: 'Foo!', text: 'Text' },
              { value: 'bar', title: 'Bar!', text: 'Text' },
            ],
            mySelection: 'bar',
          }}
        >
          <Field.Selection
            variant="dropdown"
            path="/mySelection"
            dataPath="/myList"
          >
            <Field.Option value="baz">Baz!</Field.Option>
          </Field.Selection>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-dropdown__text__inner')
      ).toHaveTextContent('Bar! Text')

      fireEvent.click(document.querySelector('.dnb-dropdown__trigger'))

      const options = document.querySelectorAll('[role="option"]')
      expect(options[0]).toHaveTextContent('Foo!')
      expect(options[1]).toHaveTextContent('Bar!')
    })

    it('should support keyboard navigation to select an option', async () => {
      render(
        <Field.Selection variant="radio" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
          <Field.Option value="baz">Baz</Field.Option>
        </Field.Selection>
      )

      const radioButtons = screen.queryAllByRole('radio')

      expect(radioButtons.length).toEqual(3)
      expect(radioButtons[0]).not.toBeChecked()
      expect(radioButtons[1]).toBeChecked()
      expect(radioButtons[2]).not.toBeChecked()

      await userEvent.tab()
      await userEvent.keyboard('{ArrowDown}')
      expect(radioButtons[0]).not.toBeChecked()
      expect(radioButtons[1]).not.toBeChecked()
      expect(radioButtons[2]).toBeChecked()

      await userEvent.keyboard('{ArrowDown}')
      expect(radioButtons[0]).toBeChecked()
      expect(radioButtons[1]).not.toBeChecked()
      expect(radioButtons[2]).not.toBeChecked()

      await userEvent.keyboard('{ArrowDown}')
      expect(radioButtons[0]).not.toBeChecked()
      expect(radioButtons[1]).toBeChecked()
      expect(radioButtons[2]).not.toBeChecked()

      await userEvent.keyboard('{ArrowUp}')
      expect(radioButtons[0]).toBeChecked()
      expect(radioButtons[1]).not.toBeChecked()
      expect(radioButtons[2]).not.toBeChecked()

      await userEvent.keyboard('{ArrowUp}')
      expect(radioButtons[0]).not.toBeChecked()
      expect(radioButtons[1]).not.toBeChecked()
      expect(radioButtons[2]).toBeChecked()

      await userEvent.keyboard('{ArrowUp}')
      expect(radioButtons[0]).not.toBeChecked()
      expect(radioButtons[1]).toBeChecked()
      expect(radioButtons[2]).not.toBeChecked()
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
          <Field.Selection
            variant="radio"
            path="/mySelection"
            dataPath="/myList"
          />
          <DataContext.Consumer>
            {(context) => {
              dataContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/mySelection': 'Foo!',
      })

      await userEvent.tab()
      await userEvent.keyboard('{ArrowDown}')

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/mySelection': 'Bar!',
      })
    })

    describe('ARIA', () => {
      it('should validate with ARIA rules', async () => {
        const result = render(
          <Field.Selection
            label="Label"
            variant="radio"
            required
            validateInitially
          >
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        expect(await axeComponent(result)).toHaveNoViolations()
      })

      it('should have aria-required', () => {
        render(
          <Field.Selection variant="radio" value="bar" required>
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        const [first, second] = Array.from(
          document.querySelectorAll('input')
        )
        expect(first).toHaveAttribute('aria-required', 'true')
        expect(second).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Selection variant="radio" required validateInitially>
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        const [first, second] = Array.from(
          document.querySelectorAll('input')
        )
        expect(first).toHaveAttribute('aria-invalid', 'true')
        expect(second).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })

  describe('button', () => {
    it('has no selected value by default', () => {
      render(
        <Field.Selection variant="button">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      const buttons = document.querySelectorAll('button')
      expect(buttons.length).toEqual(2)
      expect(buttons[0].getAttribute('aria-pressed')).toBe('false')
      expect(buttons[1].getAttribute('aria-pressed')).toBe('false')
    })

    it('renders help', () => {
      render(
        <Field.Selection variant="button">
          <Field.Option
            value="foo"
            help={{ title: 'Help title', content: 'Help content' }}
          >
            Foo
          </Field.Option>
          <Field.Option
            value="bar"
            help={{ title: 'Help title', content: 'Help content' }}
          >
            Bar
          </Field.Option>
        </Field.Selection>
      )
      expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(2)
      const [first, second] = Array.from(
        document.querySelectorAll('.dnb-toggle-button')
      )
      expect(first.querySelector('button')).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining('-suffix')
      )
      expect(second.querySelector('button')).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining('-suffix')
      )
    })

    it('should disable options', () => {
      render(
        <Field.Selection variant="button" disabled>
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )
      const buttons = document.querySelectorAll('button')
      expect(buttons[0]).toBeDisabled()
      expect(buttons[1]).toBeDisabled()
    })

    it('renders selected option', () => {
      render(
        <Field.Selection variant="button" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      const buttons = document.querySelectorAll('button')
      expect(buttons.length).toEqual(2)
      expect(buttons[0].getAttribute('aria-pressed')).toBe('false')
      expect(buttons[1].getAttribute('aria-pressed')).toBe('true')
    })

    it('should render options in nested elements', () => {
      render(
        <Field.Selection variant="button">
          <div>
            <Field.Option value="option1">Option 1</Field.Option>
            <div>
              <Field.Option value="option2">Option 2</Field.Option>
            </div>
          </div>
        </Field.Selection>
      )

      const [option1, option2] = Array.from(
        document.querySelectorAll('button')
      )

      expect(option1).toBeInTheDocument()
      expect(option2).toBeInTheDocument()
    })

    it('should render nested fields', () => {
      render(
        <Field.Selection variant="button">
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.String />
          <Form.Visibility visible>
            <Field.Option value="option2">Option 2</Field.Option>
          </Form.Visibility>
        </Field.Selection>
      )

      const [option1, option2, option3] = Array.from(
        document.querySelectorAll('button, input')
      )

      expect(option1).toHaveAttribute('type', 'button')
      expect(option2).toHaveAttribute('type', 'text')
      expect(option3).toHaveAttribute('type', 'button')
    })

    it('renders fieldset/legend if more than two options are given', () => {
      const { rerender } = render(
        <Field.Selection variant="button" label="Legend">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      expect(document.querySelectorAll('fieldset')).toHaveLength(1)
      expect(document.querySelectorAll('legend')).toHaveLength(1)
      expect(document.querySelectorAll('label')).toHaveLength(0)

      rerender(
        <Field.Selection variant="button" label="Label">
          <Field.Option value="foo">Foo</Field.Option>
        </Field.Selection>
      )

      expect(document.querySelectorAll('fieldset')).toHaveLength(0)
      expect(document.querySelectorAll('legend')).toHaveLength(0)
      expect(document.querySelectorAll('label')).toHaveLength(1)
      expect(document.querySelector('label')).toHaveAttribute('for')
      expect(document.querySelector('label').getAttribute('for')).toBe(
        document.querySelector('button').getAttribute('id')
      )
    })

    it('renders update selected option based on external value change', () => {
      const { rerender } = render(
        <Field.Selection variant="button" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      rerender(
        <Field.Selection variant="button" value="foo">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      const buttons = document.querySelectorAll('button')
      expect(buttons.length).toEqual(2)
      expect(buttons[0].getAttribute('aria-pressed')).toBe('true')
      expect(buttons[1].getAttribute('aria-pressed')).toBe('false')
    })

    it('should support selected value from "path"', async () => {
      const onChange = jest.fn()

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
          <Field.Selection
            variant="button"
            path="/mySelection"
            dataPath="/myList"
            onChange={onChange}
          />
        </Form.Handler>
      )

      const options = Array.from(document.querySelectorAll('button'))
      expect(options).toHaveLength(2)

      const [option1, option2] = options

      expect(option1).toHaveTextContent('Foo!')
      expect(option2).toHaveTextContent('Bar!')

      expect(option1).toHaveAttribute('aria-pressed', 'true')
      expect(option2).toHaveAttribute('aria-pressed', 'false')

      await userEvent.click(option2)

      {
        const [option1, option2] = Array.from(
          document.querySelectorAll('button')
        )
        expect(option1).toHaveAttribute('aria-pressed', 'false')
        expect(option2).toHaveAttribute('aria-pressed', 'true')
      }

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith('bar')
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
          <Field.Selection variant="button" dataPath="/myList">
            <Field.Option value="baz">Baz!</Field.Option>
          </Field.Selection>
        </Form.Handler>
      )

      const options = Array.from(document.querySelectorAll('button'))
      expect(options).toHaveLength(3)

      const [option1, option2, option3] = options

      expect(option1).toHaveTextContent('Foo!')
      expect(option2).toHaveTextContent('Bar!')
      expect(option3).toHaveTextContent('Baz!')

      expect(option1).toHaveAttribute('aria-pressed', 'false')
      expect(option2).toHaveAttribute('aria-pressed', 'false')
      expect(option3).toHaveAttribute('aria-pressed', 'false')
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
          <Field.Selection
            variant="button"
            path="/mySelection"
            dataPath="/myList"
          />
          <DataContext.Consumer>
            {(context) => {
              dataContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/mySelection': 'Foo!',
      })

      await userEvent.tab()
      await userEvent.tab()
      await userEvent.click(document.activeElement)

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/mySelection': 'Bar!',
      })
    })

    describe('ARIA', () => {
      it('should validate with ARIA rules', async () => {
        const result = render(
          <Field.Selection
            label="Label"
            variant="button"
            required
            validateInitially
          >
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        expect(
          await axeComponent(result, {
            rules: {
              // Because of aria-required is not allowed on buttons – but VO still reads it
              'aria-allowed-attr': { enabled: false },
            },
          })
        ).toHaveNoViolations()
      })

      it('should have aria-required', () => {
        render(
          <Field.Selection variant="button" value="bar" required>
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        const [first, second] = Array.from(
          document.querySelectorAll('button')
        )
        expect(first).toHaveAttribute('aria-required', 'true')
        expect(second).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Selection variant="button" required validateInitially>
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        const [first, second] = Array.from(
          document.querySelectorAll('button')
        )
        expect(first).toHaveAttribute('aria-invalid', 'true')
        expect(second).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })

  describe('dropdown', () => {
    const open = () =>
      fireEvent.click(document.querySelector('.dnb-dropdown__trigger'))

    it('has no selected value by default', () => {
      render(
        <Field.Selection variant="dropdown">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      open()

      const options = document.querySelectorAll('[role="option"]')
      expect(options.length).toEqual(2)
      expect(options[0].getAttribute('aria-selected')).toBe('false')
      expect(options[1].getAttribute('aria-selected')).toBe('false')
    })

    it('precede option title over children', async () => {
      render(
        <Field.Selection variant="dropdown">
          <Field.Option value="foo" title="title a">
            child a
          </Field.Option>
          <Field.Option value="bar" title="title b">
            child b
          </Field.Option>
        </Field.Selection>
      )

      open()
      const options = document.querySelectorAll('[role="option"]')

      expect(options[0].textContent).toBe('title a')
      expect(options[1].textContent).toBe('title b')
    })

    it('renders help', () => {
      render(
        <Field.Selection
          variant="dropdown"
          help={{ title: 'Help title', content: 'Help content' }}
        >
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )
      expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(1)
      expect(
        document.querySelector('.dnb-dropdown__trigger')
      ).toHaveAttribute('aria-describedby')
      expect(
        document
          .querySelector('.dnb-help-button')
          .getAttribute('aria-describedby')
      ).toBe(document.querySelector('.dnb-tooltip__content').id)
    })

    it('should disable dropdown', () => {
      render(
        <Field.Selection variant="dropdown" disabled>
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      expect(
        document.querySelector('.dnb-dropdown__trigger')
      ).toBeDisabled()
    })

    it('renders selected option', () => {
      render(
        <Field.Selection variant="dropdown" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      open()

      const options = document.querySelectorAll('[role="option"]')
      expect(options.length).toEqual(2)
      expect(options[0].getAttribute('aria-selected')).toBe('false')
      expect(options[1].getAttribute('aria-selected')).toBe('true')
    })

    it('renders update selected option based on external value change', () => {
      const { rerender } = render(
        <Field.Selection variant="dropdown" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      rerender(
        <Field.Selection variant="dropdown" value="foo">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      open()

      const options = document.querySelectorAll('[role="option"]')
      expect(options.length).toEqual(2)
      expect(options[0].getAttribute('aria-selected')).toBe('true')
      expect(options[1].getAttribute('aria-selected')).toBe('false')
    })

    it('renders only options with a value', () => {
      const { rerender } = render(
        <Field.Selection variant="dropdown" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
          {null}
        </Field.Selection>
      )

      open()

      expect(document.querySelectorAll('[role="option"]')).toHaveLength(2)

      rerender(
        <Field.Selection variant="dropdown" value="foo">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
          content without a key
        </Field.Selection>
      )

      expect(document.querySelectorAll('[role="option"]')).toHaveLength(3)
      expect(
        document.querySelectorAll('[role="option"]')[2]
      ).toHaveTextContent('content without a key')
    })

    it('should accept camelCase props in "dropdownProps', () => {
      render(
        <Field.Selection
          variant="dropdown"
          value="bar"
          dropdownProps={{
            labelDirection: 'vertical',
          }}
        >
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      expect(document.querySelector('.dnb-dropdown')).toHaveClass(
        'dnb-dropdown--vertical'
      )
    })

    it('should support data prop', async () => {
      render(
        <Field.Selection
          variant="dropdown"
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

      const title = document.querySelector('.dnb-dropdown')
      expect(title).toHaveTextContent('Foo!')

      open()

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
          <Field.Selection
            variant="dropdown"
            path="/mySelection"
            dataPath="/myList"
          />
        </Form.Handler>
      )

      open()

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
          <Field.Selection variant="dropdown" dataPath="/myList">
            <Field.Option value="baz">Baz!</Field.Option>
          </Field.Selection>
        </Form.Handler>
      )

      open()

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
          <Field.Selection
            variant="dropdown"
            path="/mySelection"
            dataPath="/myList"
          />
          <DataContext.Consumer>
            {(context) => {
              dataContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/mySelection': 'Foo!',
      })

      // Open like user would do, but without a delay
      DrawerListProvider['blurDelay'] = 0
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{Enter}')
      DrawerListProvider['blurDelay'] = 201

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/mySelection': 'Bar!',
      })
    })

    describe('ARIA', () => {
      it('should validate with ARIA rules', async () => {
        const result = render(
          <Field.Selection
            label="Label"
            variant="dropdown"
            required
            validateInitially
          >
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        open()

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
          <Field.Selection variant="dropdown" value="bar" required>
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        const button = document.querySelector('button')

        open()

        expect(button).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Selection variant="dropdown" required validateInitially>
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        open()

        const buttonElement = document.querySelector('button')
        expect(buttonElement).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })

  describe('autocomplete', () => {
    const open = () => {
      fireEvent.focus(document.querySelector('.dnb-input__input'))
      fireEvent.mouseDown(document.querySelector('.dnb-input__input'))
    }

    it('has no selected value by default', () => {
      render(
        <Field.Selection variant="autocomplete">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      open()

      const options = document.querySelectorAll('[role="option"]')
      expect(options.length).toEqual(2)
      expect(options[0].getAttribute('aria-selected')).toBe('false')
      expect(options[1].getAttribute('aria-selected')).toBe('false')
    })

    it('renders help', () => {
      render(
        <Field.Selection
          variant="autocomplete"
          help={{ title: 'Help title', content: 'Help content' }}
        >
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
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
        <Field.Selection variant="autocomplete" disabled>
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      expect(document.querySelector('input')).toBeDisabled()
    })

    it('renders selected option', () => {
      render(
        <Field.Selection variant="autocomplete" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      open()

      const options = document.querySelectorAll('[role="option"]')
      expect(options.length).toEqual(2)
      expect(options[0].getAttribute('aria-selected')).toBe('false')
      expect(options[1].getAttribute('aria-selected')).toBe('true')
    })

    it('renders update selected option based on external value change', () => {
      const { rerender } = render(
        <Field.Selection variant="autocomplete" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      rerender(
        <Field.Selection variant="autocomplete" value="foo">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      open()

      const options = document.querySelectorAll('[role="option"]')
      expect(options.length).toEqual(2)
      expect(options[0].getAttribute('aria-selected')).toBe('true')
      expect(options[1].getAttribute('aria-selected')).toBe('false')
    })

    it('renders only options with a value', () => {
      const { rerender } = render(
        <Field.Selection variant="autocomplete" value="bar">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
          {null}
        </Field.Selection>
      )

      open()

      expect(document.querySelectorAll('[role="option"]')).toHaveLength(2)

      rerender(
        <Field.Selection variant="autocomplete" value="foo">
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
          content without a key
        </Field.Selection>
      )

      expect(document.querySelectorAll('[role="option"]')).toHaveLength(3)
      expect(
        document.querySelectorAll('[role="option"]')[2]
      ).toHaveTextContent('content without a key')
    })

    it('should accept camelCase props in "autocompleteProps', () => {
      render(
        <Field.Selection
          variant="autocomplete"
          value="bar"
          autocompleteProps={{
            showSubmitButton: true,
            submitButtonTitle: 'Custom title',
          }}
        >
          <Field.Option value="foo">Foo</Field.Option>
          <Field.Option value="bar">Bar</Field.Option>
        </Field.Selection>
      )

      expect(document.querySelector('button')).toHaveAttribute(
        'aria-label',
        'Custom title'
      )
    })

    it('should support data prop', async () => {
      render(
        <Field.Selection
          variant="autocomplete"
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

      open()

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
          <Field.Selection
            variant="autocomplete"
            path="/mySelection"
            dataPath="/myList"
          />
        </Form.Handler>
      )

      open()

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
          <Field.Selection variant="autocomplete" dataPath="/myList">
            <Field.Option value="baz">Baz!</Field.Option>
          </Field.Selection>
        </Form.Handler>
      )

      open()

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
          <Field.Selection
            variant="autocomplete"
            path="/mySelection"
            dataPath="/myList"
          />
          <DataContext.Consumer>
            {(context) => {
              dataContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/mySelection': 'Foo!',
      })

      // Open like user would do, but without a delay
      DrawerListProvider['blurDelay'] = 0
      await userEvent.tab()
      await userEvent.keyboard('{Enter}')
      await userEvent.keyboard('{ArrowDown}')
      await userEvent.keyboard('{Enter}')
      DrawerListProvider['blurDelay'] = 201

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/mySelection': 'Bar!',
      })
    })

    describe('ARIA', () => {
      it('should validate with ARIA rules', async () => {
        const result = render(
          <Field.Selection
            label="Label"
            variant="autocomplete"
            required
            validateInitially
          >
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        open()

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
          <Field.Selection variant="autocomplete" value="bar" required>
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        const button = document.querySelector('input')

        open()

        expect(button).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Selection
            variant="autocomplete"
            required
            validateInitially
          >
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )

        open()

        const buttonElement = document.querySelector('input')
        expect(buttonElement).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })
})

describe('event handlers', () => {
  it('calls onChange when selecting a different options', async () => {
    const onChange = jest.fn()
    render(
      <Field.Selection value="bar" onChange={onChange}>
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )

    const selectionButton = screen.getByRole('button')
    await userEvent.click(selectionButton)

    await waitFor(async () => {
      const option1 = screen.getByText('Foo')
      await userEvent.click(option1)
    })

    expect(onChange.mock.calls).toHaveLength(1)
    expect(onChange.mock.calls[0][0]).toEqual('foo')

    await waitFor(async () => {
      await userEvent.click(selectionButton)
      const option2 = screen.getByText('Bar')
      await userEvent.click(option2)
    })

    expect(onChange.mock.calls).toHaveLength(2)
    expect(onChange.mock.calls[0][0]).toEqual('foo')
    expect(onChange.mock.calls[1][0]).toEqual('bar')
  })

  it('calls onFocus when opening the dropdown with selected value as argument', async () => {
    const onFocus = jest.fn()
    render(
      <Field.Selection value="bar" onFocus={onFocus}>
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )

    const selectionButton = screen.getByRole('button')
    await userEvent.click(selectionButton)

    await waitFor(() => {
      expect(onFocus.mock.calls).toHaveLength(1)
      expect(onFocus.mock.calls[0][0]).toEqual('bar')
    })
  })

  it('calls onBlur when selecting the options so the dropdown closes with selected value as argument', async () => {
    const onBlur = jest.fn()
    render(
      <Field.Selection value="bar" onBlur={onBlur}>
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )

    const selectionButton = screen.getByRole('button')
    await userEvent.click(selectionButton)

    await waitFor(async () => {
      const option1 = screen.getByText('Foo')
      await userEvent.click(option1)
    })

    expect(onBlur.mock.calls).toHaveLength(1)
    expect(onBlur.mock.calls[0][0]).toEqual('foo')
  })
})

describe('validation and error handling', () => {
  describe('required', () => {
    describe('validation based on required-prop', () => {
      it('should show error for empty value', async () => {
        render(
          <Field.Selection required validateInitially>
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )
        const selectionButton = screen.getByRole('button')
        await userEvent.click(selectionButton)

        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error when value is not empty', async () => {
        render(
          <Field.Selection required>
            <Field.Option value="foo">Foo</Field.Option>
            <Field.Option value="bar">Bar</Field.Option>
          </Field.Selection>
        )
        const selectionButton = screen.getByRole('button')
        await userEvent.click(selectionButton)

        await waitFor(async () => {
          const option1 = screen.getByText('Foo')
          await userEvent.click(option1)
        })

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })

  it('shows error border', () => {
    const { rerender } = render(
      <Field.Selection error={new Error('This is what went wrong')}>
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )
    const dropdown = document.querySelector('.dnb-dropdown')
    expect(dropdown.className).toContain('dnb-dropdown__status--error')

    rerender(
      <Field.Selection
        variant="radio"
        error={new Error('This is what went wrong')}
      >
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )

    const radio = document.querySelector('.dnb-radio')
    expect(radio.className).toContain('dnb-radio__status--error')

    rerender(
      <Field.Selection
        variant="button"
        error={new Error('This is what went wrong')}
      >
        <Field.Option value="foo">Foo</Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )

    const button = document.querySelector('.dnb-toggle-button')
    expect(button.className).toContain('dnb-toggle-button__status--error')
  })

  it('shows error in individual button item', () => {
    render(
      <Field.Selection variant="button">
        <Field.Option
          value="foo"
          error={new Error('This is what went wrong')}
        >
          Foo
        </Field.Option>
        <Field.Option value="bar">Bar</Field.Option>
      </Field.Selection>
    )
    const [first, second] = Array.from(
      document.querySelectorAll('.dnb-toggle-button')
    )
    expect(first.className).toContain('dnb-toggle-button__status--error')
    expect(second.className).not.toContain(
      'dnb-toggle-button__status--error'
    )
  })

  it('should show error under the nested field', () => {
    render(
      <Field.Selection variant="radio" validateInitially>
        <Field.Option value="first" title="First" />
        <Field.Number value={1} exclusiveMinimum={900} validateInitially />
      </Field.Selection>
    )

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    expect(document.querySelector('.dnb-form-status').textContent).toBe(
      nb.NumberField.errorExclusiveMinimum.replace(
        '{exclusiveMinimum}',
        '900'
      )
    )
  })

  it('should show errors in separate FormStatus components', () => {
    render(
      <Field.Selection variant="radio" required validateInitially>
        <Field.Option value="first" title="First" />
        <Field.Number value={1} exclusiveMinimum={900} validateInitially />
      </Field.Selection>
    )

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)
    const [first, second] = Array.from(
      document.querySelectorAll('.dnb-form-status')
    )

    expect(first.textContent).toBe(nb.Field.errorRequired)
    expect(second.textContent).toBe(
      nb.NumberField.errorExclusiveMinimum.replace(
        '{exclusiveMinimum}',
        '900'
      )
    )
  })
})

describe('makeOptions', () => {
  it('should render with props', () => {
    const result = makeOptions([
      <Field.Option key="a" value="foo" title="Foo!" />,
      <Field.Option key="b" value="bar" title="Baar!" />,
    ])

    expect(result).toEqual([
      { selectedKey: 'foo', content: 'Foo!' },
      { selectedKey: 'bar', content: 'Baar!' },
    ])
  })

  it('should render "Untitled" when no title is given', () => {
    const result = makeOptions(<Field.Option />)

    expect(result).toEqual([
      { content: <em>Untitled</em>, selectedKey: '' },
    ])
  })

  it('title can be given by children', () => {
    const result = makeOptions(
      <Field.Option value="foo">Foo</Field.Option>
    )

    expect(result).toEqual([{ content: 'Foo', selectedKey: 'foo' }])
  })

  it('should support extra text in title', () => {
    const result = makeOptions(
      <Field.Option value="foo" text="Text">
        Foo
      </Field.Option>
    )

    expect(result).toEqual([
      { content: ['Foo', 'Text'], selectedKey: 'foo' },
    ])
  })
})

import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Field, FieldBlock, Form } from '../../..'

describe('ArraySelection', () => {
  describe('checkbox variant', () => {
    it('renders correctly', () => {
      render(
        <Field.ArraySelection>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })

    it('renders help', () => {
      render(
        <Field.ArraySelection
          help={{ title: 'Help title', content: 'Help content' }}
        >
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )
      expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(1)
      expect(
        document
          .querySelector('.dnb-help-button')
          .getAttribute('aria-describedby')
      ).toBe(document.querySelector('.dnb-tooltip__content').id)
    })

    it('handles selection correctly', () => {
      const handleChange = jest.fn()
      render(
        <Field.ArraySelection onChange={handleChange}>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      fireEvent.click(screen.getByText('Option 1'))
      expect(handleChange).toHaveBeenLastCalledWith(['option1'])

      fireEvent.click(screen.getByText('Option 2'))
      expect(handleChange).toHaveBeenLastCalledWith(['option1', 'option2'])

      fireEvent.click(screen.getByText('Option 1'))
      expect(handleChange).toHaveBeenLastCalledWith(['option2'])
    })

    it('handles emptyValue correctly', () => {
      const handleChange = jest.fn()
      render(
        <Field.ArraySelection onChange={handleChange} emptyValue={[]}>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      fireEvent.click(screen.getByText('Option 1'))
      fireEvent.click(screen.getByText('Option 1'))
      expect(handleChange).toHaveBeenLastCalledWith([])
    })

    it('displays error message when error prop is provided', () => {
      const errorMessage = new Error('This is what is wrong...')
      render(
        <Field.ArraySelection error={errorMessage}>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      const element = document.querySelector('.dnb-form-status')

      expect(element).toBeInTheDocument()
      expect(element).toHaveClass('dnb-form-status--error')
      expect(element).toHaveTextContent('This is what is wrong...')
    })

    it('applies the correct layout class when layout prop is provided', () => {
      const layout = 'horizontal'
      render(
        <Field.ArraySelection layout={layout}>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      const element = document.querySelector(
        '.dnb-forms-field-block__grid'
      )
      expect(element).toHaveClass(
        `dnb-forms-field-block--layout-${layout}`
      )
    })

    it('should render variant class', () => {
      render(
        <Field.ArraySelection>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      expect(
        document.querySelector('.dnb-forms-field-array-selection')
      ).toHaveClass('dnb-forms-field-array-selection--variant-checkbox')
    })

    it('applies the correct layout class when optionsLayout prop is provided', () => {
      const optionsLayout = 'horizontal'
      render(
        <Field.ArraySelection optionsLayout={optionsLayout}>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      const element = document.querySelector(
        '.dnb-forms-field-array-selection'
      )
      expect(element).toHaveClass(
        `dnb-forms-field-array-selection--options-layout-${optionsLayout}`
      )
    })

    it('has correct elements when "checkbox" is provided provided', () => {
      render(
        <Field.ArraySelection>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      const [option1, option2] = Array.from(
        document.querySelectorAll('input')
      )
      expect(option1).toBeInTheDocument()
      expect(option2).toBeInTheDocument()
    })

    it('disables all options when disabled prop is true', () => {
      render(
        <Field.ArraySelection disabled>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      const [option1, option2] = Array.from(
        document.querySelectorAll('input')
      )

      expect(option1).toBeDisabled()
      expect(option2).toBeDisabled()
    })

    it('should render options in nested elements', () => {
      render(
        <Field.ArraySelection>
          <div>
            <Field.Option value="option1">Option 1</Field.Option>
            <div>
              <Field.Option value="option2">Option 2</Field.Option>
            </div>
          </div>
        </Field.ArraySelection>
      )

      const [option1, option2] = Array.from(
        document.querySelectorAll('input')
      )

      expect(option1).toBeInTheDocument()
      expect(option2).toBeInTheDocument()
    })

    it('should render nested fields', () => {
      render(
        <Field.ArraySelection>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.String />
          <Form.Visibility visible>
            <Field.Option value="option2">Option 2</Field.Option>
          </Form.Visibility>
        </Field.ArraySelection>
      )

      const [option1, option2, option3] = Array.from(
        document.querySelectorAll('input')
      )

      expect(option1).toHaveAttribute('type', 'checkbox')
      expect(option2).toHaveAttribute('type', 'text')
      expect(option3).toHaveAttribute('type', 'checkbox')
    })

    it('has error class when error prop is provided', () => {
      const errorMessage = new Error('This is what is wrong...')
      render(
        <Field.ArraySelection error={errorMessage}>
          <Field.Option value="option1">Option 1</Field.Option>
          <Field.Option value="option2">Option 2</Field.Option>
        </Field.ArraySelection>
      )

      const [option1, option2] = Array.from(
        document.querySelectorAll('.dnb-checkbox')
      )

      expect(option1).toHaveClass('dnb-checkbox__status--error')
      expect(option2).toHaveClass('dnb-checkbox__status--error')
    })

    it('renders error', () => {
      render(
        <Field.ArraySelection error={new Error('Error message')}>
          <Field.Option value="A" title="Fooo!" />
          <Field.Option value="B" title="Baar!" />
          <Field.Option value="C" title="Bazz!" />
          <Field.Option value="D" title="Quxx!" />
        </Field.ArraySelection>
      )

      const element = document.querySelector('.dnb-form-status')
      expect(element).toHaveTextContent('Error message')

      const [optionA, optionB, optionC, optionD]: Array<HTMLElement> =
        Array.from(document.querySelectorAll('.dnb-checkbox'))
      expect(optionA).toHaveClass('dnb-checkbox__status--error')
      expect(optionB).toHaveClass('dnb-checkbox__status--error')
      expect(optionC).toHaveClass('dnb-checkbox__status--error')
      expect(optionD).toHaveClass('dnb-checkbox__status--error')
    })

    it('shows error style in FieldBlock', () => {
      render(
        <FieldBlock>
          <Field.ArraySelection error={new Error('Error message')}>
            <Field.Option value="A" title="Fooo!" />
            <Field.Option value="B" title="Baar!" />
            <Field.Option value="C" title="Bazz!" />
            <Field.Option value="D" title="Quxx!" />
          </Field.ArraySelection>
        </FieldBlock>
      )

      const [optionA, optionB, optionC, optionD]: Array<HTMLElement> =
        Array.from(document.querySelectorAll('.dnb-checkbox'))
      expect(optionA).toHaveClass('dnb-checkbox__status--error')
      expect(optionB).toHaveClass('dnb-checkbox__status--error')
      expect(optionC).toHaveClass('dnb-checkbox__status--error')
      expect(optionD).toHaveClass('dnb-checkbox__status--error')
    })

    it('should support "dataPath"', () => {
      render(
        <Form.Handler
          data={{
            myList: [
              { value: 'foo', title: 'Foo!' },
              { value: 'bar', title: 'Bar!' },
            ],
            mySelection: 'bar',
          }}
        >
          <Field.ArraySelection
            variant="checkbox"
            path="/mySelection"
            dataPath="/myList"
          >
            <Field.Option value="baz">Baz!</Field.Option>
          </Field.ArraySelection>
        </Form.Handler>
      )

      const options = Array.from(
        document.querySelectorAll('.dnb-checkbox')
      )
      expect(options).toHaveLength(3)

      const [option1, option2, option3] = options

      expect(option1).toHaveTextContent('Foo!')
      expect(option2).toHaveTextContent('Bar!')
      expect(option3).toHaveTextContent('Baz!')

      expect(option1.querySelector('input').checked).toBe(false)
      expect(option2.querySelector('input').checked).toBe(true)
      expect(option3.querySelector('input').checked).toBe(false)

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
  })

  describe.each(['button', 'checkbox-button'])(
    '%s variant',
    (testVariant: 'button' | 'checkbox-button') => {
      it(`has correct elements when "${testVariant}" is provided provided`, () => {
        render(
          <Field.ArraySelection variant={testVariant}>
            <Field.Option value="option1">Option 1</Field.Option>
            <Field.Option value="option2">Option 2</Field.Option>
          </Field.ArraySelection>
        )

        const [option1, option2] = Array.from(
          document.querySelectorAll('button')
        )
        expect(option1).toBeInTheDocument()
        expect(option2).toBeInTheDocument()
      })

      it('should render options in nested elements', () => {
        render(
          <Field.ArraySelection variant={testVariant}>
            <div>
              <Field.Option value="option1">Option 1</Field.Option>
              <div>
                <Field.Option value="option2">Option 2</Field.Option>
              </div>
            </div>
          </Field.ArraySelection>
        )

        const [option1, option2] = Array.from(
          document.querySelectorAll('button')
        )

        expect(option1).toBeInTheDocument()
        expect(option2).toBeInTheDocument()
      })

      it('should render nested fields', () => {
        render(
          <Field.ArraySelection variant={testVariant}>
            <Field.Option value="option1">Option 1</Field.Option>
            <Field.String />
            <Form.Visibility visible>
              <Field.Option value="option2">Option 2</Field.Option>
            </Form.Visibility>
          </Field.ArraySelection>
        )

        const [option1, option2, option3] = Array.from(
          document.querySelectorAll('button, input')
        )

        expect(option1).toHaveAttribute('type', 'button')
        expect(option2).toHaveAttribute('type', 'text')
        expect(option3).toHaveAttribute('type', 'button')
      })

      it('has error class when error prop is provided', () => {
        const errorMessage = new Error('This is what is wrong...')
        render(
          <Field.ArraySelection variant={testVariant} error={errorMessage}>
            <Field.Option value="option1">Option 1</Field.Option>
            <Field.Option value="option2">Option 2</Field.Option>
          </Field.ArraySelection>
        )

        const [option1, option2] = Array.from(
          document.querySelectorAll('.dnb-toggle-button')
        )

        expect(option1).toHaveClass('dnb-toggle-button__status--error')
        expect(option2).toHaveClass('dnb-toggle-button__status--error')
      })

      it('disables all options when disabled prop is true', () => {
        render(
          <Field.ArraySelection variant={testVariant} disabled>
            <Field.Option value="option1">Option 1</Field.Option>
            <Field.Option value="option2">Option 2</Field.Option>
          </Field.ArraySelection>
        )

        const [option1, option2] = Array.from(
          document.querySelectorAll('button')
        )

        expect(option1).toBeDisabled()
        expect(option2).toBeDisabled()
      })

      it('should render variant class', () => {
        render(
          <Field.ArraySelection variant={testVariant}>
            <Field.Option value="option1">Option 1</Field.Option>
            <Field.Option value="option2">Option 2</Field.Option>
          </Field.ArraySelection>
        )

        expect(
          document.querySelector('.dnb-forms-field-array-selection')
        ).toHaveClass('dnb-forms-field-array-selection--variant-button')
      })

      it('renders help', () => {
        render(
          <Field.ArraySelection
            variant={testVariant}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            <Field.Option value="option1">Option 1</Field.Option>
            <Field.Option value="option2">Option 2</Field.Option>
          </Field.ArraySelection>
        )
        expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(
          1
        )
        expect(
          document
            .querySelector('.dnb-help-button')
            .getAttribute('aria-describedby')
        ).toBe(document.querySelector('.dnb-tooltip__content').id)
      })

      it('renders error', () => {
        render(
          <Field.ArraySelection
            variant={testVariant}
            error={new Error('Error message')}
          >
            <Field.Option value="A" title="Fooo!" />
            <Field.Option value="B" title="Baar!" />
            <Field.Option value="C" title="Bazz!" />
            <Field.Option value="D" title="Quxx!" />
          </Field.ArraySelection>
        )

        const element = document.querySelector('.dnb-form-status')
        expect(element).toHaveTextContent('Error message')

        const [
          optionA,
          optionB,
          optionC,
          optionD,
        ]: Array<HTMLButtonElement> = Array.from(
          document.querySelectorAll('.dnb-toggle-button')
        )
        expect(optionA).toHaveClass('dnb-toggle-button__status--error')
        expect(optionB).toHaveClass('dnb-toggle-button__status--error')
        expect(optionC).toHaveClass('dnb-toggle-button__status--error')
        expect(optionD).toHaveClass('dnb-toggle-button__status--error')
      })

      it('shows error style in FieldBlock', () => {
        render(
          <FieldBlock>
            <Field.ArraySelection
              variant={testVariant}
              error={new Error('Error message')}
            >
              <Field.Option value="A" title="Fooo!" />
              <Field.Option value="B" title="Baar!" />
              <Field.Option value="C" title="Bazz!" />
              <Field.Option value="D" title="Quxx!" />
            </Field.ArraySelection>
          </FieldBlock>
        )

        const [
          optionA,
          optionB,
          optionC,
          optionD,
        ]: Array<HTMLButtonElement> = Array.from(
          document.querySelectorAll('.dnb-toggle-button')
        )
        expect(optionA).toHaveClass('dnb-toggle-button__status--error')
        expect(optionB).toHaveClass('dnb-toggle-button__status--error')
        expect(optionC).toHaveClass('dnb-toggle-button__status--error')
        expect(optionD).toHaveClass('dnb-toggle-button__status--error')
      })

      it('should support "dataPath"', () => {
        render(
          <Form.Handler
            data={{
              myList: [
                { value: 'foo', title: 'Foo!' },
                { value: 'bar', title: 'Bar!' },
              ],
              mySelection: 'bar',
            }}
          >
            <Field.ArraySelection
              variant={testVariant}
              path="/mySelection"
              dataPath="/myList"
            >
              <Field.Option value="baz">Baz!</Field.Option>
            </Field.ArraySelection>
          </Form.Handler>
        )

        const options = Array.from(
          document.querySelectorAll(
            `.dnb-forms-field-array-selection__button `
          )
        )
        expect(options).toHaveLength(3)

        const [option1, option2, option3] = options

        expect(option1).toHaveTextContent('Foo!')
        expect(option2).toHaveTextContent('Bar!')
        expect(option3).toHaveTextContent('Baz!')

        expect(option1.querySelector('button')).toHaveAttribute(
          'aria-pressed',
          'false'
        )
        expect(option1).not.toHaveClass('dnb-toggle-button--checked')

        expect(option2.querySelector('button')).toHaveAttribute(
          'aria-pressed',
          'true'
        )
        expect(option2).toHaveClass('dnb-toggle-button--checked')

        expect(option3.querySelector('button')).toHaveAttribute(
          'aria-pressed',
          'false'
        )
        expect(option3).not.toHaveClass('dnb-toggle-button--checked')
      })
    }
  )
})

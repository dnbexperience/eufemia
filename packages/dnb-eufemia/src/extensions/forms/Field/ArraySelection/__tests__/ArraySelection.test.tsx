import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Field, FieldBlock } from '../../..'
import { FormError } from '../../../types'

describe('ArraySelection', () => {
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

  it('handles selection correctly', () => {
    const handleChange = jest.fn()
    render(
      <Field.ArraySelection onChange={handleChange}>
        <Field.Option value="option1">Option 1</Field.Option>
        <Field.Option value="option2">Option 2</Field.Option>
      </Field.ArraySelection>
    )

    fireEvent.click(screen.getByText('Option 1'))
    expect(handleChange).toHaveBeenCalledWith(['option1'])

    fireEvent.click(screen.getByText('Option 2'))
    expect(handleChange).toHaveBeenCalledWith(['option1', 'option2'])

    fireEvent.click(screen.getByText('Option 1'))
    expect(handleChange).toHaveBeenCalledWith(['option2'])
  })

  it('handles emptyValue correctly', () => {
    const handleChange = jest.fn()
    render(
      <Field.ArraySelection onChange={handleChange} emptyValue="empty">
        <Field.Option value="option1">Option 1</Field.Option>
        <Field.Option value="option2">Option 2</Field.Option>
      </Field.ArraySelection>
    )

    fireEvent.click(screen.getByText('Option 1'))
    fireEvent.click(screen.getByText('Option 1'))
    expect(handleChange).toHaveBeenCalledWith('empty')
  })

  it('displays error message when error prop is provided', () => {
    const errorMessage = new FormError('This is what is wrong...')
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

    const element = document.querySelector('.dnb-forms-field-block__grid')
    expect(element).toHaveClass(`dnb-forms-field-block--layout-${layout}`)
  })

  it('applies the correct layout class when optionsLayout prop is provided', () => {
    const layout = 'horizontal'
    render(
      <Field.ArraySelection optionsLayout={layout}>
        <Field.Option value="option1">Option 1</Field.Option>
        <Field.Option value="option2">Option 2</Field.Option>
      </Field.ArraySelection>
    )

    const element = document.querySelector(
      '.dnb-forms-field-array-selection'
    )
    expect(element).toHaveClass(
      `dnb-forms-field-array-selection--layout-${layout}`
    )
  })

  describe('checkbox variant', () => {
    it('has correct elements when "checkbox" is provided provided', () => {
      const variant = 'checkbox'
      render(
        <Field.ArraySelection variant={variant}>
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

    it('has error class when error prop is provided', () => {
      const errorMessage = new FormError('This is what is wrong...')
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
  })

  describe('button variant', () => {
    it('has correct elements when "button" is provided provided', () => {
      const variant = 'button'
      render(
        <Field.ArraySelection variant={variant}>
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

    it('has error class when error prop is provided', () => {
      const errorMessage = new FormError('This is what is wrong...')
      render(
        <Field.ArraySelection variant="button" error={errorMessage}>
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
        <Field.ArraySelection variant="button" disabled>
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
  })

  describe('checkbox', () => {
    it('renders error', () => {
      render(
        <Field.ArraySelection error={new FormError('Error message')}>
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
          <Field.ArraySelection error={new FormError('Error message')}>
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
  })

  describe('button', () => {
    it('renders error', () => {
      render(
        <Field.ArraySelection
          variant="button"
          error={new FormError('Error message')}
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
            variant="button"
            error={new FormError('Error message')}
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
  })
})

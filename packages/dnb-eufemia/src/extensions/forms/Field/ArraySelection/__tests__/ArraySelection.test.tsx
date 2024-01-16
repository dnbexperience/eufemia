import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ArraySelection from '../ArraySelection'
import Option from '../../Option'
import { FormError } from '../../../types'

describe('ArraySelection', () => {
  it('renders correctly', () => {
    render(
      <ArraySelection>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
      </ArraySelection>
    )

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('handles selection correctly', () => {
    const handleChange = jest.fn()
    render(
      <ArraySelection onChange={handleChange}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
      </ArraySelection>
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
      <ArraySelection onChange={handleChange} emptyValue="empty">
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
      </ArraySelection>
    )

    fireEvent.click(screen.getByText('Option 1'))
    fireEvent.click(screen.getByText('Option 1'))
    expect(handleChange).toHaveBeenCalledWith('empty')
  })

  it('displays error message when error prop is provided', () => {
    const errorMessage = new FormError('This is what is wrong...')
    render(
      <ArraySelection error={errorMessage}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
      </ArraySelection>
    )

    const element = document.querySelector('.dnb-form-status')

    expect(element).toBeInTheDocument()
    expect(element.className).toBe(
      'dnb-form-status dnb-form-status--error dnb-form-status__size--default dnb-space__top--x-small dnb-form-status--has-content'
    )
    expect(element.textContent).toBe('This is what is wrong...')
  })

  it('applies the correct layout class when layout prop is provided', () => {
    const layout = 'horizontal'
    render(
      <ArraySelection layout={layout}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
      </ArraySelection>
    )

    const element = document.querySelector('.dnb-forms-field-block__grid')
    expect(element).toHaveClass(`dnb-forms-field-block--layout-${layout}`)
  })

  it('applies the correct layout class when optionsLayout prop is provided', () => {
    const layout = 'horizontal'
    render(
      <ArraySelection optionsLayout={layout}>
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
      </ArraySelection>
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
        <ArraySelection variant={variant}>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        </ArraySelection>
      )

      const [option1, option2] = Array.from(
        document.querySelectorAll('input')
      )
      expect(option1).toBeInTheDocument()
      expect(option2).toBeInTheDocument()
    })

    it('disables all options when disabled prop is true', () => {
      render(
        <ArraySelection disabled>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        </ArraySelection>
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
        <ArraySelection error={errorMessage}>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        </ArraySelection>
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
        <ArraySelection variant={variant}>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        </ArraySelection>
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
        <ArraySelection variant="button" error={errorMessage}>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        </ArraySelection>
      )

      const [option1, option2] = Array.from(
        document.querySelectorAll('.dnb-toggle-button')
      )

      expect(option1).toHaveClass('dnb-toggle-button__status--error')
      expect(option2).toHaveClass('dnb-toggle-button__status--error')
    })

    it('disables all options when disabled prop is true', () => {
      render(
        <ArraySelection variant="button" disabled>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
        </ArraySelection>
      )

      const [option1, option2] = Array.from(
        document.querySelectorAll('button')
      )

      expect(option1).toBeDisabled()
      expect(option2).toBeDisabled()
    })
  })
})

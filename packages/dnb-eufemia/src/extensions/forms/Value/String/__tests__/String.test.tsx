import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value } from '../../..'

describe('Value.String', () => {
  it('should render value', () => {
    render(<Value.String value="test123" />)
    expect(screen.getByText('test123')).toBeInTheDocument()
  })

  it('should render value inside correct class', () => {
    render(<Value.String label="The label" value="test123" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('test123')
  })

  it('should render placeholder', () => {
    render(<Value.String placeholder="Enter something" />)
    expect(screen.getByText('Enter something')).toBeInTheDocument()
  })

  it('should not render label if value is empty and showEmpty is false', () => {
    render(<Value.String label="The label" />)
    expect(screen.queryByText('The label')).not.toBeInTheDocument()
  })

  it('should render no label when no value and showEmpty is not set', () => {
    render(<Value.String label="The label" />)
    expect(document.querySelector('.dnb-forms-value-string')).toBeNull()
  })

  it('should render label', () => {
    render(<Value.String label="The label" showEmpty />)
    expect(screen.getByText('The label')).toBeInTheDocument()
  })

  it('should render default class', () => {
    render(<Value.String label="The label" showEmpty />)
    expect(
      document.querySelector('.dnb-forms-value-string')
    ).toHaveTextContent('The label')
  })
})

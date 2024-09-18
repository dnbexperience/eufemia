import React from 'react'
import { screen, render } from '@testing-library/react'
import { Value } from '../../..'

describe('Value.String', () => {
  it('renders value', () => {
    render(<Value.String value="test123" />)
    expect(screen.getByText('test123')).toBeInTheDocument()
  })

  it('renders value inside correct class', () => {
    render(<Value.String label="The label" value="test123" />)
    expect(
      document.querySelector(
        '.dnb-forms-value-string .dnb-forms-value-block__content'
      )
    ).toHaveTextContent('test123')
  })

  it('renders placeholder', () => {
    render(<Value.String placeholder="Enter something" />)
    expect(screen.getByText('Enter something')).toBeInTheDocument()
  })

  it('does not render label if value is empty and showEmpty is false', () => {
    render(<Value.String label="The label" />)
    expect(screen.queryByText('The label')).not.toBeInTheDocument()
  })

  it('renders no label when no value and showEmpty is not set', () => {
    render(<Value.String label="The label" />)
    expect(document.querySelector('.dnb-forms-value-string')).toBeNull()
  })

  it('renders label', () => {
    render(<Value.String label="The label" showEmpty />)
    expect(screen.getByText('The label')).toBeInTheDocument()
  })

  it('renders default class', () => {
    render(<Value.String label="The label" showEmpty />)
    expect(
      document.querySelector('.dnb-forms-value-string')
    ).toHaveTextContent('The label')
  })
})

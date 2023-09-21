import React from 'react'
import { screen, render } from '@testing-library/react'
import Value from '..'

describe('Value.String', () => {
  describe('props', () => {
    it('renders value', () => {
      render(<Value.String value="test123" />)
      expect(screen.getByText('test123')).toBeInTheDocument()
    })

    it('renders placeholder', () => {
      render(<Value.String placeholder="Enter something" />)
      expect(screen.getByText('Enter something')).toBeInTheDocument()
    })

    it('does not render label if value is empty and showEmpty is false', () => {
      render(<Value.String label="The label" />)
      expect(screen.queryByText('The label')).not.toBeInTheDocument()
    })

    it('renders label', () => {
      render(<Value.String label="The label" showEmpty />)
      expect(screen.getByText('The label')).toBeInTheDocument()
    })
  })
})

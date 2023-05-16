import '@testing-library/jest-dom'
import React from 'react'
import { screen, render } from '@testing-library/react'
import DataValue from '..'

describe('DataValue.String', () => {
  describe('props', () => {
    it('renders value', () => {
      render(<DataValue.String value="test123" />)
      expect(screen.getByText('test123')).toBeInTheDocument()
    })

    it('renders placeholder', () => {
      render(<DataValue.String placeholder="Enter something" />)
      expect(screen.getByText('Enter something')).toBeInTheDocument()
    })

    it('does not render label if value is empty and showEmpty is false', () => {
      render(<DataValue.String label="The label" />)
      expect(screen.queryByText('The label')).not.toBeInTheDocument()
    })

    it('renders label', () => {
      render(<DataValue.String label="The label" showEmpty />)
      expect(screen.getByText('The label')).toBeInTheDocument()
    })
  })
})

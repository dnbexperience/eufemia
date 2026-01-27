import React from 'react'
import { render } from '@testing-library/react'
import { Value } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.DateOfBirth', () => {
  it('should render value', () => {
    render(<Value.DateOfBirth value="2024-05-17" />)
    expect(
      document.querySelector('.dnb-forms-value-block__content').textContent
    ).toBe('17. mai 2024')
  })

  it('should render default label', () => {
    render(<Value.DateOfBirth showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.DateOfBirth.label
    )
  })

  it('should render custom label', () => {
    render(<Value.DateOfBirth label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })

  describe('dateFormat', () => {
    it('should use default format when no dateFormat is provided', () => {
      render(<Value.DateOfBirth value="2024-05-17" />)
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('17. mai 2024')
    })

    it('should format date using yyyy/MM/dd format', () => {
      render(
        <Value.DateOfBirth value="2024-05-17" dateFormat="yyyy/MM/dd" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('2024/05/17')
    })

    it('should format date using dd/MM/yyyy format', () => {
      render(
        <Value.DateOfBirth value="2024-05-17" dateFormat="dd/MM/yyyy" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('17/05/2024')
    })

    it('should format date using MM/dd/yyyy format', () => {
      render(
        <Value.DateOfBirth value="2024-05-17" dateFormat="MM/dd/yyyy" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('05/17/2024')
    })

    it('should format date using dd-MM-yyyy format', () => {
      render(
        <Value.DateOfBirth value="2024-05-17" dateFormat="dd-MM-yyyy" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('17-05-2024')
    })

    it('should handle empty value with custom format', () => {
      render(<Value.DateOfBirth value="" dateFormat="dd/MM/yyyy" />)
      const contentElement = document.querySelector(
        '.dnb-forms-value-block__content'
      )
      expect(contentElement).toBeNull()
    })

    it('should handle invalid date with custom format', () => {
      render(
        <Value.DateOfBirth value="invalid-date" dateFormat="dd/MM/yyyy" />
      )
      expect(
        document.querySelector('.dnb-forms-value-block__content')
          .textContent
      ).toBe('invalid-date')
    })
  })
})

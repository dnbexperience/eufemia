import React from 'react'
import { render } from '@testing-library/react'
import { Value } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Value.DateOfBirth', () => {
  it('renders value', () => {
    render(<Value.DateOfBirth value="2024-05-17" />)
    expect(
      document.querySelector('.dnb-forms-value-block__content').textContent
    ).toBe('17. mai 2024')
  })

  it('renders default label', () => {
    render(<Value.DateOfBirth showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      nb.DateOfBirth.label
    )
  })

  it('renders custom label', () => {
    render(<Value.DateOfBirth label="Custom label" showEmpty />)
    expect(document.querySelector('.dnb-form-label')).toHaveTextContent(
      'Custom label'
    )
  })
})

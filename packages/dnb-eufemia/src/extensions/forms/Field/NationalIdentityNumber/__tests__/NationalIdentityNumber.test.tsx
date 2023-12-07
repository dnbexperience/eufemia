import React from 'react'
import { render } from '@testing-library/react'
import NationalIdentityNumber, { Props } from '..'

describe('Field.NationalIdentityNumber', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<NationalIdentityNumber {...props} />)
  })
})

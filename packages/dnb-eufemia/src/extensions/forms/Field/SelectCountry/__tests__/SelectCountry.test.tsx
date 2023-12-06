import React from 'react'
import { render } from '@testing-library/react'
import SelectCountry, { Props } from '..'

describe('Field.SelectCountry', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<SelectCountry {...props} />)
  })
})

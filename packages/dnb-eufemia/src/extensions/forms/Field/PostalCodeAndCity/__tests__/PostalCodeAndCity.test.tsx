import React from 'react'
import { render } from '@testing-library/react'
import PostalCodeAndCity, { Props } from '..'

describe('Field.PostalCodeAndCity', () => {
  it('should render with props', () => {
    const props: Props = { postalCode: {}, city: {} }
    render(<PostalCodeAndCity {...props} />)
  })
})

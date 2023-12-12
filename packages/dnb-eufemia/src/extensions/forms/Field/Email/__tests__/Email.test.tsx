import React from 'react'
import { render } from '@testing-library/react'
import Email, { Props } from '..'

describe('Field.Email', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Email {...props} />)
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import Option, { Props } from '..'

describe('Field.Option', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Option {...props} />)
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import Date, { Props } from '..'

describe('Field.Date', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Date {...props} />)
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import Toggle, { Props } from '..'

describe('Field.Toggle', () => {
  it('should render with props', () => {
    const props: Props = { valueOn: 'checked', valueOff: 'unchecked' }
    render(<Toggle {...props} />)
  })
})

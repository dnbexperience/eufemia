import React from 'react'
import { render } from '@testing-library/react'
import ArraySelection, { Props } from '..'

describe('Field.ArraySelection', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<ArraySelection {...props} />)
  })
})

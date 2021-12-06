import React from 'react'
import { render, screen } from '@testing-library/react'
import Tag from '../Tag'
import { loadScss } from '../../../core/jest/jestSetup'

describe('Tag', () => {
  it('renders without properties', () => {
    render(<Tag />)

    expect(screen.queryByTestId('tag')).not.toBeNull()
  })
})

describe('Tag scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-tag.scss'))
    expect(scss).toMatchSnapshot()
  })
})

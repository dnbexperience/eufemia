import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import ListAllIcons from '../ListAllIcons'

describe('ListAllIcons', () => {
  it('renders each icon name as a real heading', () => {
    render(
      <MemoryRouter>
        <ListAllIcons variant="primary" groupBy="category" />
      </MemoryRouter>
    )

    const heading = document.querySelector('#bell').closest('.dnb-heading')

    expect(heading.tagName).toBe('H3')
    expect(heading.getAttribute('role')).toBeNull()
    expect(document.querySelector('figcaption')).toBeNull()
  })
})

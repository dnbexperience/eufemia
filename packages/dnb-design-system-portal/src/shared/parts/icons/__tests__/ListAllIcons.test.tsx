import { beforeEach, describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import ListAllIcons from '../ListAllIcons'

// On the page, the list follows the page title and H2 sections
beforeEach(() => resetLevels(2))

describe('ListAllIcons', () => {
  it('renders each icon name as a real heading', () => {
    render(
      <MemoryRouter>
        <ListAllIcons variant="primary" groupBy="category" />
      </MemoryRouter>
    )

    const heading = document.querySelector('#bell').closest('.dnb-heading')

    expect(heading.tagName).toBe('H3')
    expect(
      document.querySelector('#check').closest('.dnb-heading').tagName
    ).toBe('H3')
    expect(
      document.querySelector('#essentials').closest('.dnb-heading').tagName
    ).toBe('H2')
    expect(heading.getAttribute('role')).toBeNull()
    expect(document.querySelector('figcaption')).toBeNull()
  })
})

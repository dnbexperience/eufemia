import { beforeEach, describe, it, expect } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import iconsMetaData from '@dnb/eufemia/src/icons/dnb/icons-meta.json'
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

  describe('search', () => {
    const renderList = () =>
      render(
        <MemoryRouter>
          <ListAllIcons variant="primary" groupBy="category" />
        </MemoryRouter>
      )

    const search = (value: string) => {
      fireEvent.change(document.querySelector('input[type="search"]'), {
        target: { value },
      })
    }

    it('filters icons by name', () => {
      renderList()

      expect(document.querySelector('#bell')).not.toBeNull()

      search('bell')

      expect(document.querySelector('#bell')).not.toBeNull()
      expect(document.querySelector('#check')).toBeNull()
    })

    it('filters icons by tag and ignores case', () => {
      renderList()

      const tag = iconsMetaData.bell.tags[0]

      search(tag.toUpperCase())

      expect(document.querySelector('#bell')).not.toBeNull()
    })

    it('hides categories without matching icons', () => {
      renderList()

      const count = () =>
        document.querySelectorAll('h2.dnb-heading').length
      const before = count()

      search('bell')

      expect(count()).toBeGreaterThan(0)
      expect(count()).toBeLessThan(before)
    })

    it('shows a message and keeps the search field when nothing matches', () => {
      renderList()

      search('no-such-icon-xyz')

      expect(document.querySelector('h3.dnb-heading')).toBeNull()
      const messages = Array.from(
        document.querySelectorAll('[role="status"]')
      ).map((element) => element.textContent)

      expect(messages.join(' ')).toContain('No icons found')
      expect(messages.join(' ')).toContain('no-such-icon-xyz')
      expect(document.querySelector('input[type="search"]')).not.toBeNull()
    })
  })
})

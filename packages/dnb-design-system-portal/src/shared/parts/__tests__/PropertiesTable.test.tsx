import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import PropertiesTable from '../PropertiesTable'

afterEach(cleanup)

describe('PropertiesTable', () => {
  it('does not render the react-markdown node as an attribute', () => {
    const { container } = render(
      <MemoryRouter>
        <PropertiesTable
          props={{
            myProp: {
              doc: 'Use `false` to hide it. See [the docs](/uilib/).',
              type: ['string', 'false'],
              status: 'optional',
            },
          }}
        />
      </MemoryRouter>
    )

    expect(
      container.querySelectorAll('td.description code, td.description a')
    ).toHaveLength(2)
    expect(container.querySelectorAll('[node]')).toHaveLength(0)
  })
})

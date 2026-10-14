import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import PageNotFound from '../../docs/404'

vi.mock('../../shared/parts/Layout', () => ({
  default: ({ children }) => children,
}))

describe('PageNotFound', () => {
  beforeEach(() => {
    document.head.innerHTML = '<title id="head-title">Eufemia</title>'
  })

  it('sets the page title', () => {
    render(
      <MemoryRouter initialEntries={['/does-not-exist/']}>
        <PageNotFound />
      </MemoryRouter>
    )

    expect(document.getElementById('head-title').textContent).toBe(
      'Page not found | Eufemia'
    )
  })

  it('shows the current path when rendered without a location prop', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/404/']}>
        <PageNotFound />
      </MemoryRouter>
    )

    expect(
      container.querySelector('.dnb-global-error').textContent
    ).toContain('/404/')
  })
})

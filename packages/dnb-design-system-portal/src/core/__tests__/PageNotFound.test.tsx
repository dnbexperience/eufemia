import { render } from '@testing-library/react'
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
    render(<PageNotFound location={{ pathname: '/does-not-exist/' }} />)

    expect(document.getElementById('head-title').textContent).toBe(
      'Page not found | Eufemia'
    )
  })
})

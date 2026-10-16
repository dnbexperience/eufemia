import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Error500 from '../../docs/500'

describe('Error500', () => {
  it('renders the error inside a main landmark', () => {
    const { container } = render(<Error500 />)

    expect(
      container.querySelector('main .dnb-global-error')
    ).not.toBeNull()
  })
})

import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

describe('test setup', () => {
  it('renders a component', () => {
    render(<div className="rendered-in-previous-test" />)

    expect(
      document.querySelector('.rendered-in-previous-test')
    ).toBeTruthy()
  })

  it('unmounts components rendered in the previous test', () => {
    expect(document.querySelector('.rendered-in-previous-test')).toBeNull()
  })
})

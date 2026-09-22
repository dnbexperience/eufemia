import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../CodeBlock', () => ({
  default: ({ scope }: { scope: Record<string, unknown> }) => (
    <div>{String(scope.value)}</div>
  ),
}))

import ComponentBox from '../ComponentBox'

describe('ComponentBox', () => {
  it('uses the latest scope for the same code during development', () => {
    const { rerender } = render(
      <ComponentBox scope={{ value: 'first' }}>{'<div />'}</ComponentBox>
    )

    rerender(
      <ComponentBox scope={{ value: 'second' }}>{'<div />'}</ComponentBox>
    )

    expect(document.body.textContent).toContain('second')
  })
})

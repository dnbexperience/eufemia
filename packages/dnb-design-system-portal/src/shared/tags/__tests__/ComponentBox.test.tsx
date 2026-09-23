import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('../CodeBlock', () => ({
  default: ({
    scope,
    hideCode,
  }: {
    scope: Record<string, unknown>
    hideCode?: boolean
  }) => (
    <div>
      {String(scope.value)}:{String(hideCode)}
    </div>
  ),
}))

import ComponentBox from '../ComponentBox'

describe('ComponentBox', () => {
  it('keeps output-affecting props separate for the same code', () => {
    const { rerender } = render(
      <ComponentBox scope={{ value: 'first' }} hideCode>
        {'<div />'}
      </ComponentBox>
    )

    rerender(
      <ComponentBox scope={{ value: 'second' }}>{'<div />'}</ComponentBox>
    )

    expect(document.body.textContent).toContain('second:undefined')
  })
})

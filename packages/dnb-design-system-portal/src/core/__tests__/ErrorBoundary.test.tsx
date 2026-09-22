import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import ErrorBoundary from '../ErrorBoundary'

function Example({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Transient HMR error')
  }

  return <div>Recovered</div>
}

describe('ErrorBoundary', () => {
  it('retries rendering when the reset key changes', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)

    const { rerender } = render(
      <ErrorBoundary resetKey={0}>
        <Example shouldThrow />
      </ErrorBoundary>
    )

    expect(document.body.textContent).toContain('Transient HMR error')

    rerender(
      <ErrorBoundary resetKey={1}>
        <Example shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(document.body.textContent).toContain('Recovered')
  })
})

import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { FormattedCode } from '../PropertiesTable'

vi.mock('../../tags', () => ({
  basicComponents: { code: (props) => <code {...props} /> },
}))

afterEach(cleanup)

describe('FormattedCode', () => {
  it.each(['undefined', 'null'])(
    'should show %s values in the neutral text color',
    (value) => {
      render(<FormattedCode variant="value">{value}</FormattedCode>)

      expect(document.querySelector('code').style.color).toBe(
        'var(--token-color-text-neutral)'
      )
    }
  )
})

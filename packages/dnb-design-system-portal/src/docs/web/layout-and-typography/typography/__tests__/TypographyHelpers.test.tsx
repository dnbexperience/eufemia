import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { Theme } from '@dnb/eufemia/src/shared'
import { PropValue } from '../_helpers'

afterEach(cleanup)

describe('Typography property values', () => {
  it.each([
    ['sbanken', "'Roboto', 'Helvetica', 'Arial', sans-serif"],
    ['coconut', "'DNB', 'Arial', sans-serif"],
  ] as const)(
    'resolves the active %s font family',
    (brand, fontFamily) => {
      const { container } = render(
        <Theme brand={brand}>
          <PropValue name="--font-family-default" />
        </Theme>
      )

      expect(container.textContent).toBe(fontFamily)
    }
  )
})

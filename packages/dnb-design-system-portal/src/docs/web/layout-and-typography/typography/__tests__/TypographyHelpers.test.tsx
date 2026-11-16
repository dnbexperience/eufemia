import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { Theme } from '@dnb/eufemia/src/shared'
import { PropValue } from '../_helpers'

afterEach(cleanup)

describe('Typography property values', () => {
  it.each(['sbanken', 'coconut'] as const)(
    'resolves the active %s font family',
    (brand) => {
      const { container } = render(
        <Theme brand={brand}>
          <PropValue name="--font-family-default" />
        </Theme>
      )

      expect(container.textContent).toBe(
        "'Roboto', 'Helvetica', 'Arial', sans-serif"
      )
    }
  )
})

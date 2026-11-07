import { vi } from 'vitest'
import * as sass from 'sass'

vi.mock('sass', () => ({
  compile: vi.fn(() => ({ css: 'p { font-display: fallback; }' })),
}))

beforeEach(() => {
  vi.resetModules()
  vi.mocked(sass.compile).mockClear()
})

it('compiles each font style entry once and preserves the font loading policy', async () => {
  const { compileFontTestStyles } =
    await import('../../../src/style/__tests__/fontTestStyles')

  const first = compileFontTestStyles('style/themes/ui/fonts.scss')
  const second = compileFontTestStyles('style/themes/ui/fonts.scss')

  expect(first).toContain('font-display: block;')
  expect(second).toBe(first)
  expect(sass.compile).toHaveBeenCalledTimes(1)

  compileFontTestStyles('style/themes/sbanken/fonts.scss')

  expect(sass.compile).toHaveBeenCalledTimes(2)
})

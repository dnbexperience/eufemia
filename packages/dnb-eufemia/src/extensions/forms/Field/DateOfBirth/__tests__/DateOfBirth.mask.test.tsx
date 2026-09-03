import { render } from '@testing-library/react'
import { useMaskito } from '@maskito/react'
import DateOfBirth from '../DateOfBirth'

vi.mock('@maskito/react', async (importOriginal) => {
  const original = await importOriginal<typeof import('@maskito/react')>()

  return {
    ...original,
    useMaskito: vi.fn(() => () => undefined),
  }
})

describe('Field.DateOfBirth masks', () => {
  it('keeps Maskito options stable between renders', () => {
    const { rerender } = render(<DateOfBirth />)
    const firstRenderOptions = vi
      .mocked(useMaskito)
      .mock.calls.map(([config]) => config.options)
      .slice(-2)

    vi.mocked(useMaskito).mockClear()
    rerender(<DateOfBirth />)

    const secondRenderOptions = vi
      .mocked(useMaskito)
      .mock.calls.map(([config]) => config.options)

    expect(secondRenderOptions).toEqual(firstRenderOptions)
    secondRenderOptions.forEach((options, index) => {
      expect(options).toBe(firstRenderOptions[index])
    })
  })
})

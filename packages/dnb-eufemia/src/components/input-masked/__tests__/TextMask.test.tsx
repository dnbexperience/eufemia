import { render } from '@testing-library/react'
import TextMask, { cleanNumericValue } from '../TextMask'
import type { TextMaskMask } from '../TextMask'
import { maskitoTransform, maskitoUpdateElement } from '@maskito/core'
import { useMaskito } from '@maskito/react'

vi.mock('@maskito/react', () => ({
  useMaskito: vi.fn(() => vi.fn()),
}))

vi.mock('@maskito/core', () => ({
  maskitoTransform: vi.fn(),
  maskitoUpdateElement: vi.fn(),
}))

describe('TextMask', () => {
  const maskitoTransformMock =
    maskitoTransform as import('vitest').MockedFunction<
      typeof maskitoTransform
    >
  const maskitoUpdateElementMock =
    maskitoUpdateElement as import('vitest').MockedFunction<
      typeof maskitoUpdateElement
    >

  beforeEach(() => {
    vi.clearAllMocks()

    maskitoTransformMock.mockImplementation(({ value, selection }) => ({
      value,
      selection,
    }))
  })

  it('does not call maskitoUpdateElement when transformed value equals current element value', () => {
    render(<TextMask mask={[/\\d/]} value="123" />)

    expect(maskitoTransformMock).toHaveBeenCalled()
    expect(maskitoUpdateElementMock).not.toHaveBeenCalled()
  })

  it('calls maskitoUpdateElement when transformed value differs from current element value', () => {
    const validated = { value: '1234', selection: [4, 4] as const }
    maskitoTransformMock.mockReturnValue(validated)

    render(<TextMask mask={[/\\d/]} value="123" />)

    const input = document.querySelector('input')

    expect(maskitoUpdateElementMock).toHaveBeenCalledTimes(1)
    expect(maskitoUpdateElementMock).toHaveBeenCalledWith(input, validated)
  })

  it('clears element when value transitions from a number to null', () => {
    const validated = { value: '1234', selection: [4, 4] as const }
    maskitoTransformMock.mockReturnValue(validated)

    const { rerender } = render(<TextMask mask={[/\d/]} value="123" />)

    maskitoUpdateElementMock.mockClear()

    rerender(<TextMask mask={[/\d/]} value={null} />)

    const input = document.querySelector('input')
    expect(maskitoUpdateElementMock).toHaveBeenCalledTimes(1)
    expect(maskitoUpdateElementMock).toHaveBeenCalledWith(input, {
      value: '',
      selection: [0, 0],
    })
  })

  it('clears element when value transitions from a number to undefined', () => {
    const validated = { value: '1234', selection: [4, 4] as const }
    maskitoTransformMock.mockReturnValue(validated)

    const { rerender } = render(<TextMask mask={[/\d/]} value="123" />)

    maskitoUpdateElementMock.mockClear()

    rerender(<TextMask mask={[/\d/]} value={undefined} />)

    const input = document.querySelector('input')
    expect(maskitoUpdateElementMock).toHaveBeenCalledTimes(1)
    expect(maskitoUpdateElementMock).toHaveBeenCalledWith(input, {
      value: '',
      selection: [0, 0],
    })
  })

  it('does not clear element when value is null on initial mount', () => {
    render(<TextMask mask={[/\d/]} value={null} />)

    expect(maskitoUpdateElementMock).not.toHaveBeenCalled()
  })

  it('keeps Maskito options stable for equivalent inline masks', () => {
    const { rerender } = render(<TextMask mask={[/\d/, '-', /\d/]} />)
    const firstOptions = vi.mocked(useMaskito).mock.lastCall[0].options

    rerender(<TextMask mask={[/\d/, '-', /\d/]} />)

    const secondOptions = vi.mocked(useMaskito).mock.lastCall[0].options
    expect(secondOptions).toBe(firstOptions)
  })

  it('updates Maskito options when an inline mask changes', () => {
    const { rerender } = render(<TextMask mask={[/\d/, '-', /\d/]} />)
    const firstOptions = vi.mocked(useMaskito).mock.lastCall[0].options

    rerender(<TextMask mask={[/\d/, '/', /\d/]} />)

    const secondOptions = vi.mocked(useMaskito).mock.lastCall[0].options
    expect(secondOptions).not.toBe(firstOptions)
  })

  it('keeps Maskito options stable for equivalent number masks', () => {
    const createMask = () =>
      ({
        instanceOf: 'createNumberMask',
        maskParams: { decimalLimit: 2 },
      }) as unknown as TextMaskMask
    const { rerender } = render(<TextMask mask={createMask()} />)
    const firstOptions = vi.mocked(useMaskito).mock.lastCall[0].options

    rerender(<TextMask mask={createMask()} />)

    const secondOptions = vi.mocked(useMaskito).mock.lastCall[0].options
    expect(secondOptions).toBe(firstOptions)
  })

  it('keeps Maskito options stable for an unstable optionsEnhancer', () => {
    const mask = [/\d/, '-', /\d/]
    const { rerender } = render(
      <TextMask
        mask={mask}
        optionsEnhancer={(options) => (options ? { ...options } : options)}
      />
    )
    const firstOptions = vi.mocked(useMaskito).mock.lastCall[0].options

    rerender(
      <TextMask
        mask={mask}
        optionsEnhancer={(options) => (options ? { ...options } : options)}
      />
    )

    const secondOptions = vi.mocked(useMaskito).mock.lastCall[0].options
    expect(secondOptions).toBe(firstOptions)
  })
})

describe('cleanNumericValue', () => {
  const numericMask = {
    maskParams: { suffix: ' kroner' },
  } as unknown as TextMaskMask

  it('drops a mismatched dynamic suffix', () => {
    expect(cleanNumericValue('1 krone', numericMask)).toBe('1')
  })

  it('does not exhibit catastrophic backtracking on long non-numeric input', () => {
    // The equivalent /[^\d.,·-]+$/ ran in O(n^2) time on a long non-numeric run
    // ending in a digit (polynomial ReDoS).
    const input = 'a'.repeat(100000) + '1'

    const start = performance.now()
    const result = cleanNumericValue(input, numericMask)
    const elapsed = performance.now() - start

    expect(result).toBe(input)
    expect(elapsed).toBeLessThan(1000)
  })
})

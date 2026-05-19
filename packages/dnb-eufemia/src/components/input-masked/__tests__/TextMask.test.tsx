import { render } from '@testing-library/react'
import TextMask from '../TextMask'
import { maskitoTransform, maskitoUpdateElement } from '@maskito/core'

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
})

import { isFlexLineBreak } from '../FlexDividers'

const rect = ({
  left,
  right,
  top,
}: {
  left: number
  right: number
  top: number
}) => ({ left, right, top }) as DOMRect

describe('FlexDividers', () => {
  it('should not treat cross-axis alignment as a horizontal line break', () => {
    const previousRect = rect({ left: 0, right: 80, top: 24 })
    const currentRect = rect({ left: 96, right: 196, top: 0 })

    expect(
      isFlexLineBreak({
        isHorizontal: true,
        isRtl: false,
        rect: currentRect,
        previousRect,
      })
    ).toBe(false)
  })

  it('should detect horizontal line breaks in both text directions', () => {
    expect(
      isFlexLineBreak({
        isHorizontal: true,
        isRtl: false,
        rect: rect({ left: 0, right: 80, top: 24 }),
        previousRect: rect({ left: 96, right: 196, top: 0 }),
      })
    ).toBe(true)

    expect(
      isFlexLineBreak({
        isHorizontal: true,
        isRtl: true,
        rect: rect({ left: 104, right: 204, top: 0 }),
        previousRect: rect({ left: 220, right: 300, top: 24 }),
      })
    ).toBe(false)

    expect(
      isFlexLineBreak({
        isHorizontal: true,
        isRtl: true,
        rect: rect({ left: 220, right: 300, top: 24 }),
        previousRect: rect({ left: 104, right: 204, top: 0 }),
      })
    ).toBe(true)
  })
})

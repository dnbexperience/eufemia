import getAvailableSpace, { getViewportBounds } from '../getAvailableSpace'

describe('getAvailableSpace', () => {
  it('reserves the viewport margin and trigger offset on both sides', () => {
    expect(
      getAvailableSpace(
        { top: 300, bottom: 340 },
        {
          viewport: { top: 0, bottom: 800 },
          margin: 16,
          offset: 8,
        }
      )
    ).toEqual({ top: 16, bottom: 784, above: 276, below: 436 })
  })

  it('accounts for the visual viewport offset when the keyboard is open', () => {
    const viewport = { offsetTop: 200, height: 400 }
    vi.stubGlobal('visualViewport', viewport)
    expect(getViewportBounds()).toEqual({
      top: 200,
      bottom: 600,
      height: 400,
    })
    expect(
      getAvailableSpace(
        { top: 300, bottom: 340 },
        { margin: 16, offset: 8 }
      )
    ).toEqual({ top: 216, bottom: 584, above: 76, below: 236 })
    vi.unstubAllGlobals()
  })

  it('falls back to the layout viewport without visualViewport', () => {
    vi.stubGlobal('visualViewport', undefined)
    expect(getViewportBounds()).toEqual({
      top: 0,
      bottom: window.innerHeight,
      height: window.innerHeight,
    })
    vi.unstubAllGlobals()
  })
})

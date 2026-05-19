import { act } from 'react'

export function initializeTestSetup() {
  beforeEach(() => {
    globalThis.IS_TEST = false
    globalThis.readjustTime = 10
    globalThis.bypassTime = -1
    globalThis.animationDuration = -1

    const requestAnimationFrame = vi.fn((fn) => {
      nextAnimationFrame = fn
      return 1
    })
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(
      requestAnimationFrame
    )
  })
  afterEach(() => {
    globalThis.IS_TEST = undefined
    globalThis.readjustTime = undefined
    globalThis.bypassTime = undefined
    globalThis.animationDuration = undefined
  })
}

export function simulateAnimationEnd(
  element: Element = document.querySelector('.dnb-height-animation')
) {
  act(() => {
    const event = new CustomEvent('transitionend')
    element.dispatchEvent(event)
  })
}

export const getElement = () =>
  document.querySelector('.dnb-height-animation')

export const mockHeight = (
  height: number,
  element = document.querySelector('.dnb-height-animation')
) => {
  vi.spyOn(element, 'clientHeight', 'get').mockReturnValueOnce(height)
  element.setAttribute('data-height', String(height))
}

// Will be overwritten when using "initializeTestSetup"
export let nextAnimationFrame = () => null
export const runAnimation = () => {
  nextAnimationFrame()
  nextAnimationFrame()
  simulateAnimationEnd()
}

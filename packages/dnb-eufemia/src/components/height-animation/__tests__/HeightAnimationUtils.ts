import { act } from '@testing-library/react'

export function initializeTestSetup() {
  beforeEach(() => {
    ;(globalThis as any).IS_TEST = false
    ;(globalThis as any).readjustTime = 10
    ;(globalThis as any).bypassTime = -1
    ;(globalThis as any).animationDuration = -1

    const requestAnimationFrame = jest.fn((fn) => {
      nextAnimationFrame = fn
      return 1
    })
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(requestAnimationFrame)
  })
  afterEach(() => {
    ;(globalThis as any).IS_TEST = undefined
    ;(globalThis as any).readjustTime = undefined
    ;(globalThis as any).bypassTime = undefined
    ;(globalThis as any).animationDuration = undefined
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
  jest.spyOn(element, 'clientHeight', 'get').mockReturnValueOnce(height)
  element.setAttribute('data-height', String(height))
}

// Will be overwritten when using "initializeTestSetup"
export let nextAnimationFrame = () => null
export const runAnimation = () => {
  nextAnimationFrame()
  nextAnimationFrame()
  simulateAnimationEnd()
}

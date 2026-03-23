import { act } from '@testing-library/react'

export function initializeTestSetup() {
  beforeEach(() => {
    ;(globalThis as Record<string, unknown>).IS_TEST = false
    ;(globalThis as Record<string, unknown>).readjustTime = 10
    ;(globalThis as Record<string, unknown>).bypassTime = -1
    ;(globalThis as Record<string, unknown>).animationDuration = -1

    const requestAnimationFrame = jest.fn((fn) => {
      nextAnimationFrame = fn
      return 1
    })
    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(requestAnimationFrame)
  })
  afterEach(() => {
    ;(globalThis as Record<string, unknown>).IS_TEST = undefined
    ;(globalThis as Record<string, unknown>).readjustTime = undefined
    ;(globalThis as Record<string, unknown>).bypassTime = undefined
    ;(globalThis as Record<string, unknown>).animationDuration = undefined
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
export let nextAnimationFrame = (): null | void => null
export const runAnimation = () => {
  nextAnimationFrame()
  nextAnimationFrame()
  simulateAnimationEnd()
}

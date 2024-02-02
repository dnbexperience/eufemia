import { act } from '@testing-library/react'

export function initializeTestSetup() {
  // let sharedId = 0

  beforeEach(() => {
    globalThis.IS_TEST = false
    globalThis.readjustTime = 10
    globalThis.bypassTime = -1
    globalThis.animationDuration = -1

    // window.requestAnimationFrame = jest.fn((callback) => {
    //   return (sharedId = setTimeout(callback, 0))
    // })
    // window.cancelAnimationFrame = jest.fn((id) => {
    //   clearTimeout(id)
    // })
  })

  // afterEach(() => {
  //   clearTimeout(sharedId)
  // })
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

export let nextAnimationFrame = () => null
beforeEach(() => {
  const requestAnimationFrame = jest.fn((fn) => {
    nextAnimationFrame = fn
    return 1
  })
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation(requestAnimationFrame)
})

export const runAnimation = () => {
  nextAnimationFrame()
  nextAnimationFrame()
  simulateAnimationEnd()
}

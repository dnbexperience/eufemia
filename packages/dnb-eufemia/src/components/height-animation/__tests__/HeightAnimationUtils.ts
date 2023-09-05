export function testSetupInit() {
  beforeEach(() => {
    global.IS_TEST = false

    window.requestAnimationFrame = jest.fn((callback) => {
      return setTimeout(callback, 0)
    })
    window.cancelAnimationFrame = jest.fn((id) => {
      clearTimeout(id)
      return id
    })
  })
}

export function simulateAnimationEnd(
  element: Element = document.querySelector('.dnb-height-animation')
) {
  const event = new CustomEvent('transitionend')
  element.dispatchEvent(event)
}

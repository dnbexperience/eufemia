/**
 * AnimateHeight Tests
 *
 */

import AnimateHeight from '../AnimateHeight'

let element, container

beforeEach(() => {
  window.requestAnimationFrame = jest.fn((callback) => {
    return setTimeout(callback, 0)
  })
  window.cancelAnimationFrame = jest.fn((id) => {
    clearTimeout(id)
    return id
  })

  element = document.createElement('span')
  container = document.createElement('div')
  container.appendChild(element)
  document.body.appendChild(container)
})

function emulateSetContainerHeight() {
  jest.spyOn(element, 'offsetHeight', 'get').mockImplementation(() => 300)
  jest.spyOn(container, 'offsetTop', 'get').mockImplementation(() => 100)
}

describe('AnimateHeight', () => {
  it('should check for window', () => {
    expect(new AnimateHeight().isInBrowser).toBe(true)

    const _window = window
    jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined)

    expect(new AnimateHeight().isInBrowser).toBe(false)

    jest.spyOn(global, 'window', 'get').mockImplementation(() => _window)
  })

  it('setElement should set element and clear it again on remove call', () => {
    const inst = new AnimateHeight()
    inst.setElement(element)
    expect(inst.elem).toBe(element)

    inst.remove()
    expect(inst.elem).toBe(null)
  })

  it('getHeight should return height', () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    jest
      .spyOn(element, 'clientHeight', 'get')
      .mockImplementation(() => 100)

    expect(inst.getHeight()).toBe(100)
  })

  it('getWidth should return width', () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    let _elem
    window.getComputedStyle = jest.fn((elem) => {
      _elem = elem
      return {
        width: 100,
      }
    })

    expect(inst.getWidth()).toBe(100)
    expect(_elem).toBe(element)
  })

  it('setContainerHeight should set correct minHeight on container', () => {
    const inst = new AnimateHeight()
    inst.setElement(element, container)

    emulateSetContainerHeight()

    inst.setContainerHeight()

    expect(container.getAttribute('style')).toBe('min-height: 300px;')
  })

  it('_restore should remove CSS styles', () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    if (element.parentElement) {
      element.parentElement.style.position = 'relative'
    }

    element.style.position = 'absolute'
    element.style.visibility = 'hidden'
    element.style.height = '100px'
    element.style.width = '200px'

    expect(element.getAttribute('style')).toBe(
      'position: absolute; visibility: hidden; height: 100px; width: 200px;'
    )

    inst._restore()

    expect(element.getAttribute('style')).toBe('')
  })

  it('getUnknownHeight should return proper height', () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    jest
      .spyOn(element, 'clientHeight', 'get')
      .mockImplementation(() => 100)

    expect(inst.getUnknownHeight()).toBe(100)
  })

  it('adjustFrom should set and return height', () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    jest
      .spyOn(element, 'clientHeight', 'get')
      .mockImplementation(() => 100)

    const height = inst.adjustFrom()
    expect(element.getAttribute('style')).toBe('height: 100px;')
    expect(height).toBe(100)

    const changedHeight = inst.adjustFrom(200)
    expect(element.getAttribute('style')).toBe('height: 200px;')
    expect(changedHeight).toBe(200)
  })

  it('start without animation should work properly', () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    const onStart = jest.fn()
    inst.onStart(onStart)
    const onEnd = jest.fn()
    inst.onEnd(onEnd)

    const onTransitionEnd = jest.fn()
    element.addEventListener('transitionend', onTransitionEnd)
    expect(onTransitionEnd).toHaveBeenCalledTimes(0)

    const fromHeight = 100
    const toHeight = 200
    inst.start(fromHeight, toHeight, { animate: false })

    expect(onTransitionEnd).toHaveBeenCalledTimes(1)
    expect(element.getAttribute('style')).toBe('height: 200px;')

    expect(onStart).toHaveBeenCalledTimes(1)
    expect(onEnd).toHaveBeenCalledTimes(0)
  })

  it('start with animation should work properly', async () => {
    const inst = new AnimateHeight()
    inst.setElement(element, container)

    emulateSetContainerHeight()

    const onStart = jest.fn()
    inst.onStart(onStart)
    const onEnd = jest.fn()
    inst.onEnd(onEnd)

    const onTransitionEnd = jest.fn()
    element.addEventListener('transitionend', onTransitionEnd)
    expect(onTransitionEnd).toHaveBeenCalledTimes(0)

    const fromHeight = 100
    const toHeight = 200
    inst.start(fromHeight, toHeight)

    expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(2)
    expect(window.cancelAnimationFrame).toHaveBeenNthCalledWith(
      1,
      undefined
    )
    expect(window.cancelAnimationFrame).toHaveBeenNthCalledWith(
      2,
      undefined
    )

    expect(onStart).toHaveBeenCalledTimes(1)

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)

    await wait(0)

    expect(element.getAttribute('style')).toBe('height: 100px;')
    expect(container.getAttribute('style')).toBe('min-height: 100px;')

    await wait(0)

    expect(element.getAttribute('style')).toBe('height: 200px;')
    expect(container.getAttribute('style')).toBe('min-height: 300px;')

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2)

    const event = new CustomEvent('transitionend')
    element.dispatchEvent(event)

    expect(element.getAttribute('style')).toBe('height: 200px;')
  })

  it('adjustTo with animation should work properly', async () => {
    const inst = new AnimateHeight()
    inst.setElement(element, container)

    emulateSetContainerHeight()

    const onStart = jest.fn()
    inst.onStart(onStart)
    const onEnd = jest.fn()
    inst.onEnd(onEnd)

    const onTransitionEnd = jest.fn()
    element.addEventListener('transitionend', onTransitionEnd)
    expect(onTransitionEnd).toHaveBeenCalledTimes(0)

    const fromHeight = 100
    const toHeight = 200
    inst.adjustTo(fromHeight, toHeight)

    expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(2)
    expect(window.cancelAnimationFrame).toHaveBeenNthCalledWith(
      1,
      undefined
    )
    expect(window.cancelAnimationFrame).toHaveBeenNthCalledWith(
      2,
      undefined
    )

    expect(onStart).toHaveBeenCalledTimes(1)

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)

    await wait(0)

    expect(element.getAttribute('style')).toBe('height: 100px;')
    expect(container.getAttribute('style')).toBe('min-height: 100px;')

    await wait(0)

    expect(element.getAttribute('style')).toBe('height: 200px;')
    expect(container.getAttribute('style')).toBe('min-height: 300px;')

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2)

    const event = new CustomEvent('transitionend')
    element.dispatchEvent(event)

    expect(onEnd).toHaveBeenCalledTimes(1)

    expect(element.getAttribute('style')).toBe('height: auto;')
  })

  it('open without animation should work properly', async () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    jest
      .spyOn(element, 'clientHeight', 'get')
      .mockImplementation(() => 100)

    inst.open({ animate: false })

    await wait(1)

    expect(element.getAttribute('style')).toBe('height: auto;')

    const event = new CustomEvent('transitionend')
    element.dispatchEvent(event)

    expect(element.getAttribute('style')).toBe('height: auto;')

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(0)
  })

  it('close without animation should work properly', async () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    jest
      .spyOn(element, 'clientHeight', 'get')
      .mockImplementation(() => 100)

    inst.close({ animate: false })

    await wait(1)

    expect(element.getAttribute('style')).toBe(
      'height: 0px; visibility: hidden;'
    )

    const event = new CustomEvent('transitionend')
    element.dispatchEvent(event)

    expect(element.getAttribute('style')).toBe(
      'height: 0px; visibility: hidden;'
    )

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(0)
  })

  it('open with animation should work properly', async () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    jest
      .spyOn(element, 'clientHeight', 'get')
      .mockImplementation(() => 100)

    inst.open()

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)

    await wait(0)

    expect(element.getAttribute('style')).toBe('height: 0px;')

    await wait(0)

    expect(element.getAttribute('style')).toBe('height: 100px;')
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2)

    const event = new CustomEvent('transitionend')
    element.dispatchEvent(event)

    expect(element.getAttribute('style')).toBe('height: auto;')
  })

  it('close with animation should work properly', async () => {
    const inst = new AnimateHeight()
    inst.setElement(element)

    jest
      .spyOn(element, 'clientHeight', 'get')
      .mockImplementation(() => 100)

    inst.close()

    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1)

    await wait(0)

    expect(element.getAttribute('style')).toBe('height: 100px;')

    await wait(0)

    expect(element.getAttribute('style')).toBe('height: 0px;')
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(2)

    const event = new CustomEvent('transitionend')
    element.dispatchEvent(event)

    expect(element.getAttribute('style')).toBe(
      'height: 0px; visibility: hidden;'
    )
  })
})

const wait = (t) => new Promise((r) => setTimeout(r, t))

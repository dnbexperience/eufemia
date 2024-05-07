import { wait } from '../../../core/jest/jestSetup'
import HeightAnimationInstance from '../HeightAnimationInstance'
import {
  simulateAnimationEnd,
  initializeTestSetup,
  mockHeight,
  nextAnimationFrame,
} from './HeightAnimationUtils'

initializeTestSetup()

let element: HTMLElement
beforeEach(() => {
  element = document.createElement('span')
  document.body.appendChild(element)
})

describe('HeightAnimationInstance', () => {
  it('should check for window', () => {
    expect(new HeightAnimationInstance().isInBrowser).toBe(true)

    const _window = window
    jest.spyOn(global, 'window', 'get').mockImplementation(() => undefined)

    expect(new HeightAnimationInstance().isInBrowser).toBe(false)

    jest.spyOn(global, 'window', 'get').mockImplementation(() => _window)
  })

  it('setElement should set element and clear it again on remove call', () => {
    const inst = new HeightAnimationInstance()
    inst.setElement(element)

    expect(inst.elem).toBe(element)

    inst.remove()

    expect(inst.elem).toBeUndefined()
  })

  it('firstPaintStyle should have these properties', () => {
    const inst = new HeightAnimationInstance()
    expect(inst.firstPaintStyle).toEqual({
      height: 'auto',
      opacity: '0',
      visibility: 'hidden',
    })
    expect(inst.firstPaintStyle).not.toEqual(
      expect.objectContaining({
        position: 'absolute',
      })
    )
  })

  it('getHeight should return height', () => {
    const inst = new HeightAnimationInstance()
    inst.setElement(element)

    mockHeight(100, element)

    expect(inst.getHeight()).toBe(100)
  })

  describe('getUnknownHeight', () => {
    it('should return proper height', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      mockHeight(100, element)

      expect(inst.getUnknownHeight()).toBe(100)
    })

    it('should create a cloned element', async () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      mockHeight(100, element)

      const addedNodes = []
      const removedNodes = []

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (mutation.removedNodes?.length) {
              removedNodes.push(mutation.removedNodes)
            }
            if (mutation.addedNodes?.length) {
              addedNodes.push(mutation.addedNodes)
            }
          }
        }
      })

      observer.observe(document.body, {
        childList: true,
      })

      inst.getUnknownHeight()

      await wait(1)

      observer.disconnect()

      expect(addedNodes).toHaveLength(1)
      expect(removedNodes).toHaveLength(1)
    })

    it('should create a cloned element and remove name and id attributes', async () => {
      const element = document.createElement('span')
      const input = document.createElement('input')
      input.setAttribute('id', 'myId')
      input.setAttribute('name', 'myName')
      input.setAttribute('class', 'myClass')
      element.appendChild(input)
      document.body.appendChild(element)

      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      mockHeight(100, element)

      const addedNodes = []
      const removedNodes = []

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (mutation.removedNodes?.length) {
              removedNodes.push(mutation.removedNodes)
            }
            if (mutation.addedNodes?.length) {
              addedNodes.push(mutation.addedNodes)
            }
          }
        }
      })

      observer.observe(document.body, {
        childList: true,
      })

      inst.getUnknownHeight()

      await wait(1)

      observer.disconnect()

      expect(addedNodes).toHaveLength(1)
      expect(removedNodes).toHaveLength(1)

      const addedElement = removedNodes[0][0] as HTMLElement
      expect(addedElement.querySelector('input')).toHaveAttribute(
        'class',
        'myClass'
      )
      expect(addedElement.querySelector('input')).not.toHaveAttribute('id')
      expect(addedElement.querySelector('input')).not.toHaveAttribute(
        'name'
      )

      const removedElement = removedNodes[0][0] as HTMLElement
      expect(removedElement.querySelector('input')).toHaveAttribute(
        'class',
        'myClass'
      )
      expect(removedElement.querySelector('input')).not.toHaveAttribute(
        'id'
      )
      expect(removedElement.querySelector('input')).not.toHaveAttribute(
        'name'
      )
      expect(removedElement.outerHTML).toMatchInlineSnapshot(
        `"<span data-height="100" style="visibility: hidden; opacity: 0; height: auto; width: auto; position: absolute;"><input class="myClass"></span>"`
      )
    })

    it('should create a cloned element with firstPaintStyle styles', async () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      mockHeight(100, element)

      const styles = []

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (mutation.addedNodes?.length) {
              styles.push(mutation.addedNodes[0])
            }
          }
        }
      })

      observer.observe(document.body, {
        childList: true,
      })

      inst.getUnknownHeight()

      await wait(1)

      observer.disconnect()

      expect(styles).toHaveLength(1)
      expect(styles[0].getAttribute('style')).toBe(
        'visibility: hidden; opacity: 0; height: auto; width: auto; position: absolute;'
      )
    })

    it('should use cached height during animation', () => {
      const inst = new HeightAnimationInstance()

      mockHeight(100, element)

      expect(inst.__currentHeight).toBe(undefined)
      expect(inst.isAnimating).toBe(undefined)

      inst.setElement(element)
      inst.setState('closed')
      inst.open()

      expect(inst.isAnimating).toBe(true)
      expect(inst.__currentHeight).toBe(100)

      mockHeight(200, element)

      inst.getUnknownHeight()

      expect(inst.__currentHeight).toBe(100)

      delete inst.elem

      expect(inst.getUnknownHeight()).toBe(null)

      inst.callAnimationEnd()

      expect(inst.__currentHeight).toBe(undefined)
    })
  })

  describe('start', () => {
    it('start without animation should work properly', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)
      inst.setOptions({ animate: false })

      const onStart = jest.fn()
      inst.onStart(onStart)
      const onEnd = jest.fn()
      inst.onEnd(onEnd)

      const fromHeight = 100
      const toHeight = 200
      const result = inst.start(fromHeight, toHeight)

      expect(result).toBeUndefined()
      expect(element).not.toHaveAttribute('style')
      expect(onStart).toHaveBeenCalledTimes(0)
      expect(onEnd).toHaveBeenCalledTimes(0)
    })

    it('start with animation should work properly', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      const onStart = jest.fn()
      inst.onStart(onStart)
      const onEnd = jest.fn()
      inst.onEnd(onEnd)

      const fromHeight = 100
      const toHeight = 200
      inst.start(fromHeight, toHeight)

      nextAnimationFrame()

      expect(element).toHaveAttribute('style', 'height: 100px;')

      nextAnimationFrame()

      expect(element).toHaveAttribute('style', 'height: 200px;')

      simulateAnimationEnd(element)

      expect(element).toHaveAttribute('style', 'height: 200px;')

      expect(onStart).toHaveBeenCalledTimes(0)
      expect(onEnd).toHaveBeenCalledTimes(0)
    })

    it('should call stop', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      jest.spyOn(inst, 'stop').mockImplementation(jest.fn())
      inst.start(100, 200)

      expect(inst.stop).toHaveBeenCalledTimes(1)
    })

    it('should set reqId1 and reqId2', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      inst.start(100, 200)

      expect(inst.reqId1).toBe(1)
      expect(inst.reqId2).toBeUndefined()

      nextAnimationFrame()

      expect(inst.reqId1).toBe(1)
      expect(inst.reqId2).toBe(1)
    })

    it('should set height style', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      inst.start(100, 200)

      expect(inst.elem.style.height).toBe('')

      nextAnimationFrame()

      expect(inst.elem.style.height).toBe('100px')

      nextAnimationFrame()

      expect(inst.elem.style.height).toBe('200px')
    })

    it('should set not height style when element is missing', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)
      const elem = inst.elem

      inst.start(100, 200)

      expect(elem.style.height).toBe('')

      nextAnimationFrame()

      expect(elem.style.height).toBe('100px')

      inst.elem = undefined // here we remove the element during the second animation frame
      nextAnimationFrame()

      expect(elem.style.height).toBe('100px')
    })

    it('should not run when element is not set', () => {
      const inst = new HeightAnimationInstance()
      inst.start(100, 200)
      expect(inst.reqId1).toBeUndefined()
      expect(inst.reqId2).toBeUndefined()
    })

    it('should set isAnimating to true', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      inst.start(100, 200)

      expect(inst.isAnimating).toBe(true)
    })
  })

  describe('open', () => {
    beforeEach(() => {
      globalThis.bypassTime = 1
    })

    it('should call getUnknownHeight', () => {
      const inst = new HeightAnimationInstance()

      jest.spyOn(inst, 'getUnknownHeight').mockImplementation(jest.fn())

      inst.setElement(element)
      inst.setState('closed')
      inst.open()

      expect(inst.getUnknownHeight).toHaveBeenCalledTimes(1)
    })

    it('should call setAsOpen when criteria are met', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      const setAsOpen = jest.fn()
      jest.spyOn(inst, 'setAsOpen').mockImplementation(setAsOpen)

      inst.setOptions({ animate: false })

      inst.open()

      expect(setAsOpen).toHaveBeenCalledTimes(1)

      inst.setOptions({ animate: true })

      inst.setState('opened')
      inst.open()

      expect(setAsOpen).toHaveBeenCalledTimes(2)

      inst.setState('opening')
      inst.open()

      expect(setAsOpen).toHaveBeenCalledTimes(3)

      inst.setState('closed')
      inst.open()

      expect(setAsOpen).toHaveBeenCalledTimes(3)

      inst.callAnimationStart() // to set firstTime" with a timestamp
      inst.open()

      expect(setAsOpen).toHaveBeenCalledTimes(4)
    })

    it('open without animation should work properly', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)
      inst.setState('closed')
      inst.setOptions({ animate: false })

      const onStart = jest.fn()
      inst.onStart(onStart)
      const onEnd = jest.fn()
      inst.onEnd(onEnd)

      mockHeight(100, element)

      inst.open()

      expect(element).not.toHaveAttribute('style')

      simulateAnimationEnd(element)

      expect(element).not.toHaveAttribute('style')

      expect(onStart).toHaveBeenCalledTimes(1)
      expect(onEnd).toHaveBeenCalledTimes(1)
      expect(onStart).toHaveBeenLastCalledWith('opening')
      expect(onEnd).toHaveBeenLastCalledWith('opened')
    })

    it('open with animation should work properly', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)
      inst.setState('closed')

      const onStart = jest.fn()
      inst.onStart(onStart)
      const onEnd = jest.fn()
      inst.onEnd(onEnd)

      mockHeight(100, element)

      expect(element).not.toHaveAttribute('style')

      inst.open()

      nextAnimationFrame()

      expect(element).toHaveAttribute('style', 'height: 0px;')

      nextAnimationFrame()

      expect(element).toHaveAttribute('style', 'height: 100px;')

      simulateAnimationEnd(element)

      expect(element).toHaveAttribute('style', 'height: auto;')

      expect(onStart).toHaveBeenCalledTimes(1)
      expect(onEnd).toHaveBeenCalledTimes(1)
      expect(onStart).toHaveBeenLastCalledWith('opening')
      expect(onEnd).toHaveBeenLastCalledWith('opened')
    })
  })

  describe('close', () => {
    beforeEach(() => {
      globalThis.bypassTime = 1
    })

    it('should call setAsClosed when criteria are met', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      const setAsClosed = jest.fn()
      jest.spyOn(inst, 'setAsClosed').mockImplementation(setAsClosed)

      inst.setOptions({ animate: false })

      inst.close()

      expect(setAsClosed).toHaveBeenCalledTimes(1)

      inst.setOptions({ animate: true })

      inst.setState('closed')
      inst.close()

      expect(setAsClosed).toHaveBeenCalledTimes(2)

      inst.setState('closing')
      inst.close()

      expect(setAsClosed).toHaveBeenCalledTimes(3)

      inst.setState('opened')
      inst.close()

      expect(setAsClosed).toHaveBeenCalledTimes(3)

      inst.callAnimationStart() // to set firstTime" with a timestamp
      inst.close()

      expect(setAsClosed).toHaveBeenCalledTimes(4)
    })

    it('close without animation should work properly', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)
      inst.setState('opened')
      inst.setOptions({ animate: false })

      const onStart = jest.fn()
      inst.onStart(onStart)
      const onEnd = jest.fn()
      inst.onEnd(onEnd)

      mockHeight(100, element)

      inst.close()

      expect(element).not.toHaveAttribute('style')

      expect(onStart).toHaveBeenCalledTimes(1)
      expect(onEnd).toHaveBeenCalledTimes(1)
      expect(onStart).toHaveBeenLastCalledWith('closing')
      expect(onEnd).toHaveBeenLastCalledWith('closed')
    })

    it('close with animation should work properly', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)
      inst.setState('opened')

      const onStart = jest.fn()
      inst.onStart(onStart)
      const onEnd = jest.fn()
      inst.onEnd(onEnd)

      mockHeight(100, element)

      expect(element).not.toHaveAttribute('style')

      inst.close()

      nextAnimationFrame()

      expect(element).toHaveAttribute('style', 'height: 100px;')

      nextAnimationFrame()

      expect(element).toHaveAttribute('style', 'height: 0px;')

      simulateAnimationEnd(element)

      expect(element).toHaveAttribute(
        'style',
        'height: 0px; visibility: hidden; overflow-y: clip;'
      )

      expect(onStart).toHaveBeenCalledTimes(1)
      expect(onEnd).toHaveBeenCalledTimes(1)
      expect(onStart).toHaveBeenLastCalledWith('closing')
      expect(onEnd).toHaveBeenLastCalledWith('closed')
    })
  })

  describe('adjustTo', () => {
    it('adjustTo with animation should work properly', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      const onStart = jest.fn()
      inst.onStart(onStart)
      const onEnd = jest.fn()
      inst.onEnd(onEnd)

      const fromHeight = 100
      const toHeight = 200
      inst.adjustTo(fromHeight, toHeight)

      nextAnimationFrame()

      expect(element).toHaveAttribute('style', 'height: 100px;')

      nextAnimationFrame()

      expect(element).toHaveAttribute('style', 'height: 200px;')

      simulateAnimationEnd(element)

      expect(element).toHaveAttribute('style', 'height: auto;')

      expect(onStart).toHaveBeenCalledTimes(1)
      expect(onEnd).toHaveBeenCalledTimes(1)
      expect(onStart).toHaveBeenLastCalledWith('adjusting')
      expect(onEnd).toHaveBeenLastCalledWith('adjusted')
    })

    it('adjustTo with animation and same height should call events', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      const onStart = jest.fn()
      inst.onStart(onStart)
      const onEnd = jest.fn()
      inst.onEnd(onEnd)

      const onTransitionEnd = jest.fn()
      element.addEventListener('transitionend', onTransitionEnd)

      const fromHeight = 100
      const toHeight = 100
      inst.adjustTo(fromHeight, toHeight)

      expect(inst['state']).toBe('adjusted')
      expect(element).not.toHaveAttribute('style')

      expect(onTransitionEnd).toHaveBeenCalledTimes(0)
      expect(onStart).toHaveBeenCalledTimes(0)
      expect(onEnd).toHaveBeenCalledTimes(0)
    })
  })

  describe('readjust', () => {
    it('should adjust height if it has changed during animation', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      const getHeightSpy = jest
        .spyOn(inst, 'getHeight')
        .mockReturnValue(100)
      const getUnknownHeightSpy = jest
        .spyOn(inst, 'getUnknownHeight')
        .mockReturnValue(200)
      const adjustToSpy = jest.spyOn(inst, 'adjustTo')
      const callAnimationEndSpy = jest.spyOn(inst, 'callAnimationEnd')

      inst.readjust()

      expect(getHeightSpy).toHaveBeenCalledTimes(1)
      expect(getUnknownHeightSpy).toHaveBeenCalledTimes(1)
      expect(adjustToSpy).toHaveBeenCalledTimes(1)
      expect(adjustToSpy).toHaveBeenCalledWith(100, 200)
      expect(callAnimationEndSpy).not.toHaveBeenCalled()
    })
  })

  describe('stop', () => {
    let sharedId = 0
    beforeEach(() => {
      window.requestAnimationFrame = jest.fn((callback) => {
        return (sharedId = setTimeout(callback, 0))
      })
      window.cancelAnimationFrame = jest.fn((id) => {
        clearTimeout(id)
        return id
      })
    })

    afterEach(() => {
      clearTimeout(sharedId)
    })

    it('should clean up properly', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)
      const clearTimeout = jest.fn(window.clearTimeout)
      jest
        .spyOn(window, 'clearTimeout')
        .mockImplementationOnce(clearTimeout)
      inst.timeouts.push(setTimeout(jest.fn, 0))
      inst.reqId1 = 1
      inst.reqId2 = 2

      expect(inst.timeouts).toHaveLength(1)

      inst.stop()

      expect(clearTimeout).toHaveBeenCalledTimes(1)
      expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(2)
      expect(window.cancelAnimationFrame).toHaveBeenNthCalledWith(1, 1)
      expect(window.cancelAnimationFrame).toHaveBeenNthCalledWith(2, 2)
      expect(inst.timeouts).toHaveLength(0)
    })
  })

  describe('canFinish', () => {
    beforeEach(() => {
      globalThis.animationDuration = undefined
    })

    it('should return true if enough time has passed', () => {
      const inst = new HeightAnimationInstance()
      inst.startTime = Date.now() - 10
      inst.duration = 5

      const result = inst.canFinish()

      expect(result).toBe(true)
    })

    it('should return false if not enough time has passed', () => {
      const inst = new HeightAnimationInstance()
      inst.startTime = Date.now() - 10
      inst.duration = 15

      const result = inst.canFinish()

      expect(result).toBe(false)
    })
  })

  describe('shouldBypassAnimation', () => {
    it('should return true when element is not set or animate option is false', () => {
      const inst = new HeightAnimationInstance()
      inst.setOptions({ animate: false })

      expect(inst.shouldBypassAnimation()).toBe(true)

      inst.setElement(element)

      expect(inst.shouldBypassAnimation()).toBe(true)
    })

    it('should return false when running in browser and not in test mode or bypassTime is -1', () => {
      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      expect(inst.shouldBypassAnimation()).toBe(false)

      globalThis.IS_TEST = true

      expect(inst.shouldBypassAnimation()).toBe(false)

      globalThis.IS_TEST = false
      globalThis.bypassTime = -1

      expect(inst.shouldBypassAnimation()).toBe(false)
    })

    it('should return true when firstTime is not set or bypassTime has not elapsed', () => {
      globalThis.bypassTime = 10

      const inst = new HeightAnimationInstance()
      inst.setElement(element)

      expect(inst.shouldBypassAnimation()).toBe(false)

      inst.callAnimationStart() // to set firstTime" with a timestamp

      expect(inst.shouldBypassAnimation()).toBe(true)

      globalThis.bypassTime = 0

      inst.callAnimationStart() // to set firstTime" with a timestamp

      expect(inst.shouldBypassAnimation()).toBe(false)
      expect(inst.firstTime).toBeGreaterThan(1000)
    })
  })

  describe('remove', () => {
    it('should clean up correctly', () => {
      const inst = new HeightAnimationInstance()
      inst.stop = jest.fn(inst.stop)
      inst.removeEndEvents = jest.fn(inst.removeEndEvents)
      inst.setState = jest.fn(inst.setState)

      inst.setElement(element)

      expect(inst.elem).toBe(element)

      inst.remove()

      expect(inst.isAnimating).toBe(false)
      expect(inst.onEndStack).toEqual([])
      expect(inst.onStartStack).toEqual([])
      expect(inst.__currentHeight).toBeUndefined()
      expect(inst.elem).toBeUndefined()
      expect(inst.stop).toHaveBeenCalledTimes(1)
      expect(inst.stop).toHaveBeenLastCalledWith()
      expect(inst.removeEndEvents).toHaveBeenCalledTimes(1)
      expect(inst.removeEndEvents).toHaveBeenLastCalledWith()
      expect(inst.setState).toHaveBeenCalledTimes(1)
      expect(inst.setState).toHaveBeenLastCalledWith('init')
    })
  })

  describe('callAnimationStart', () => {
    it('should set startTime and firstTime if firstTime is not set', () => {
      const inst = new HeightAnimationInstance()
      inst.startTime = undefined
      inst.firstTime = undefined
      inst.onStartStack = []

      inst.callAnimationStart()

      expect(inst.startTime).toBeGreaterThan(1000)
      expect(inst.firstTime).toBe(inst.startTime)
    })

    it('should call onStartStack functions with the current state', () => {
      const inst = new HeightAnimationInstance()
      inst.startTime = undefined
      inst.firstTime = -1
      inst.onStartStack = [jest.fn(), jest.fn(), jest.fn()]

      inst.callAnimationStart()

      inst.onStartStack.forEach((fn) => {
        expect(fn).toHaveBeenCalledWith(inst['state'])
      })
    })
  })

  describe('callAnimationEnd', () => {
    it('should set isAnimating to false', () => {
      const inst = new HeightAnimationInstance()
      inst.isAnimating = true

      inst.callAnimationEnd()

      expect(inst.isAnimating).toBe(false)
    })

    it('should delete __currentHeight if state is not "opened"', () => {
      const inst = new HeightAnimationInstance()
      inst.setState('closed')
      inst.__currentHeight = 100

      inst.callAnimationEnd()

      expect(inst.__currentHeight).toBeUndefined()
    })

    it('should remove end events', () => {
      const inst = new HeightAnimationInstance()
      inst.removeEndEvents = jest.fn()

      inst.callAnimationEnd()

      expect(inst.removeEndEvents).toHaveBeenCalledTimes(1)
    })

    it('should call onEndStack functions with the current state', () => {
      const inst = new HeightAnimationInstance()
      inst.onEndStack = [jest.fn(), jest.fn(), jest.fn()]
      inst.setState('opened')

      inst.callAnimationEnd()

      inst.onEndStack.forEach((fn) => {
        expect(fn).toHaveBeenCalledTimes(1)
        expect(fn).toHaveBeenCalledWith('opened')
      })
    })

    it('should not call onEndStack functions if they are not functions', () => {
      const inst = new HeightAnimationInstance()
      inst.onEndStack = [undefined]
      inst.setState('closed')

      inst.callAnimationEnd()

      inst.onEndStack.forEach((fn) => {
        expect(fn).toBeUndefined()
      })
    })
  })
})

import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import mountHangingMotion from '../hangingMotion'

let root: HTMLDivElement
let reduced: MediaQueryList
let motionChange: () => void
let frame: FrameRequestCallback
let motion: ReturnType<typeof mountHangingMotion>
const disconnect = vi.fn()

beforeEach(() => {
  vi.useFakeTimers()
  vi.spyOn(Math, 'random').mockReturnValue(0.3)
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false)
  reduced = {
    matches: false,
    addEventListener: vi.fn((_event, callback) => {
      motionChange = callback
    }),
    removeEventListener: vi.fn(),
  } as unknown as MediaQueryList
  vi.stubGlobal('matchMedia', () => reduced)
  vi.stubGlobal(
    'requestAnimationFrame',
    vi.fn((callback) => {
      frame = callback
      return 1
    })
  )
  vi.stubGlobal('cancelAnimationFrame', vi.fn())
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = vi.fn()
      disconnect = disconnect
    }
  )
  vi.stubGlobal(
    'DOMMatrix',
    class {
      m11 = 1
      m12 = 0
      m21 = 0
      m22 = 1
      m23 = 0
      m33 = 1
    }
  )
  root = document.createElement('div')
  root.dataset.portalHome = ''
  root.innerHTML =
    '<div data-hanging-item style="--tilt: 0deg"><span><svg><path /></svg></span><div data-home-specimen><button>Brand</button></div></div>'.repeat(
      3
    )
  root.querySelectorAll('[data-hanging-item] > *').forEach((part) => {
    part.animate = vi.fn().mockReturnValue({
      cancel: vi.fn(),
      playState: 'finished',
    })
  })
  root.querySelectorAll('span').forEach((rope) => {
    Object.defineProperty(rope, 'offsetHeight', { value: 200 })
  })
  root.querySelectorAll('[data-home-specimen]').forEach((specimen) => {
    vi.spyOn(specimen, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 150,
      width: 120,
      height: 48,
    } as DOMRect)
  })
  vi.spyOn(root, 'getBoundingClientRect').mockReturnValue({
    top: 0,
    bottom: 500,
  } as DOMRect)
  document.body.appendChild(root)
  motion = mountHangingMotion(root)
})

afterEach(() => {
  motion.destroy()
  root.remove()
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

it('keeps idle physics asleep and disposes its visibility observer', () => {
  vi.advanceTimersByTime(7200)
  expect(requestAnimationFrame).not.toHaveBeenCalled()
  Object.defineProperty(reduced, 'matches', {
    value: true,
    configurable: true,
  })
  motionChange()
  for (const item of Array.from(root.children)) {
    expect((item as HTMLElement).style.getPropertyValue('--swing')).toBe(
      '0rad'
    )
  }
  expect(vi.getTimerCount()).toBe(0)
  Object.defineProperty(reduced, 'matches', { value: false })
  motionChange()
  expect(requestAnimationFrame).not.toHaveBeenCalled()
  disconnect.mockClear()
  motion.destroy()
  expect(disconnect).toHaveBeenCalledOnce()
  expect(vi.getTimerCount()).toBe(0)
})

it('drops a lifted control vertically until its rope catches', () => {
  const button = root.querySelector('button')
  button.setPointerCapture = vi.fn()
  button.hasPointerCapture = () => false
  const item = button.closest<HTMLElement>('[data-hanging-item]')
  const position = () => {
    const radius =
      200 + parseFloat(item.style.getPropertyValue('--lift-y'))
    const angle = parseFloat(item.style.getPropertyValue('--swing'))
    return { x: Math.sin(angle) * radius, y: Math.cos(angle) * radius }
  }

  for (const direction of [-1, 1]) {
    motion.destroy()
    motion = mountHangingMotion(root)
    const event = {
      target: button,
      button: 0,
      pointerId: 1,
      clientX: 0,
      clientY: 200,
      timeStamp: 0,
    } as unknown as PointerEvent
    motion.down(event)
    motion.move({
      ...event,
      clientX: direction * 50,
      clientY: 40,
      timeStamp: 100,
    })
    const released = position()
    const controlX = Number(
      item
        .querySelector('path')
        .getAttribute('d')
        .match(/Q([^ ]+)/)[1]
    )
    expect((controlX - 32) * direction).toBeLessThan(0)
    motion.release({ ...event, type: 'pointerup', timeStamp: 201 })
    for (let time = 16; time <= 160; time += 16) {
      frame(time)
      expect(position().x).toBeCloseTo(released.x, 1)
    }
    expect(position().y).toBeGreaterThan(released.y + 30)
  }
})

it('continues a vertical flick in its release direction', () => {
  const button = root.querySelector('button')
  button.setPointerCapture = vi.fn()
  button.hasPointerCapture = () => false
  const item = button.closest<HTMLElement>('[data-hanging-item]')
  for (const direction of [-1, 1]) {
    motion.destroy()
    motion = mountHangingMotion(root)
    const event = {
      target: button,
      button: 0,
      pointerId: 1,
      clientX: 0,
      clientY: 200,
      timeStamp: 0,
    } as unknown as PointerEvent
    motion.down(event)
    motion.move({
      ...event,
      clientY: 200 + direction * 40,
      timeStamp: 40,
    })
    const released = parseFloat(item.style.getPropertyValue('--lift-y'))
    motion.release({ ...event, type: 'pointerup', timeStamp: 41 })
    frame(16)
    expect(
      (parseFloat(item.style.getPropertyValue('--lift-y')) - released) *
        direction
    ).toBeGreaterThan(0)
  }
})

it('keeps sideways momentum when flicking a lifted control', () => {
  const button = root.querySelector('button')
  button.setPointerCapture = vi.fn()
  button.hasPointerCapture = () => false
  const item = button.closest<HTMLElement>('[data-hanging-item]')
  const positionX = () =>
    Math.sin(parseFloat(item.style.getPropertyValue('--swing'))) *
    (200 + parseFloat(item.style.getPropertyValue('--lift-y')))

  for (const direction of [-1, 1]) {
    motion.destroy()
    motion = mountHangingMotion(root)
    const event = {
      target: button,
      button: 0,
      pointerId: 1,
      clientX: 0,
      clientY: 200,
      timeStamp: 0,
    } as unknown as PointerEvent
    motion.down(event)
    motion.move({ ...event, clientY: 80, timeStamp: 100 })
    motion.move({
      ...event,
      clientX: direction * 40,
      clientY: 80,
      timeStamp: 140,
    })
    const released = positionX()
    motion.release({ ...event, type: 'pointerup', timeStamp: 141 })
    frame(16)
    frame(32)
    expect((positionX() - released) * direction).toBeGreaterThan(10)
  }
})

it('staggers the entrance drop and cancels it for reduced motion', () => {
  motion.destroy()
  motion = mountHangingMotion(root, true)
  const lifts = () =>
    Array.from(root.children).map((item) =>
      parseFloat((item as HTMLElement).style.getPropertyValue('--lift-y'))
    )
  const start = lifts()
  frame(16)
  frame(32)
  expect(lifts()[0]).toBeGreaterThan(start[0])
  expect(lifts()[1]).toBe(start[1])
  Object.defineProperty(reduced, 'matches', { value: true })
  motionChange()
  expect(lifts()).toEqual([0, 0, 0])
})

it('uses the same gravity during the fall and the rebound', () => {
  const button = root.querySelector('button')
  button.setPointerCapture = vi.fn()
  button.hasPointerCapture = () => false
  const item = button.closest<HTMLElement>('[data-hanging-item]')
  const event = {
    target: button,
    button: 0,
    pointerId: 1,
    clientX: 0,
    clientY: 200,
    timeStamp: 0,
  } as unknown as PointerEvent
  motion.down(event)
  motion.move({ ...event, clientY: 80, timeStamp: 100 })
  motion.release({ ...event, type: 'pointerup', timeStamp: 201 })
  const lifts: number[] = []
  for (let time = 16; time <= 2000; time += 16) {
    frame(time)
    lifts.push(parseFloat(item.style.getPropertyValue('--lift-y')))
  }
  const catchIndex = lifts.findIndex(
    (lift, index) => lift > lifts[index - 1] && lift > lifts[index + 1]
  )
  const peakIndex = lifts.findIndex(
    (lift, index) =>
      index > catchIndex &&
      lift < lifts[index - 1] &&
      lift < lifts[index + 1]
  )
  const acceleration = (index: number) =>
    lifts[index + 1] - 2 * lifts[index] + lifts[index - 1]
  expect(catchIndex).toBeGreaterThan(0)
  expect(peakIndex).toBeGreaterThan(catchIndex)
  expect(acceleration(peakIndex)).toBeCloseTo(acceleration(3), 1)
})

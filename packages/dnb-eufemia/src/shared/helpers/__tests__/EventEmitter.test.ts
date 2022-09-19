/**
 * EventEmitter Tests
 *
 */

import EventEmitter from '../EventEmitter'

describe('EventEmitter', () => {
  const uniqueId = '123'
  const instanceA = EventEmitter.createInstance(uniqueId)
  const instanceB = EventEmitter.createInstance(uniqueId)

  const listenerA = jest.fn((data) => data)
  const listenerB = jest.fn((data) => data)

  instanceA.listen(listenerA)
  instanceB.listen(listenerB)

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should contain a listen fcuntion', () => {
    expect(typeof instanceA.listen).toBe('function')
  })

  it('should contain listeners', () => {
    expect(instanceA.listeners).toHaveLength(1)
    expect(instanceB.listeners).toHaveLength(1)
  })

  it('should not emmit listeners on data set', () => {
    instanceA.set({ foo: 'bar' })
    expect(listenerA).toHaveBeenCalledTimes(0)
    expect(listenerB).toHaveBeenCalledTimes(0)
  })

  it('should merge data at once dimention', () => {
    instanceA.set({ foo: 'bar' })
    expect(instanceA.get()).toMatchObject(
      expect.objectContaining({ foo: 'bar' })
    )
    expect(instanceB.get()).toMatchObject(
      expect.objectContaining({ foo: 'bar' })
    )

    instanceA.set({ foo: 'z' })
    expect(instanceA.get()).toMatchObject(
      expect.objectContaining({ foo: 'z' })
    )
    expect(instanceB.get()).toMatchObject(
      expect.objectContaining({ foo: 'z' })
    )
  })

  it('should emmit listeners on data update', () => {
    const data = { foo: 'bar' }

    instanceA.update(data)

    expect(listenerA).toHaveBeenCalledTimes(1)
    expect(listenerB).toHaveBeenCalledTimes(1)
    expect(listenerA).toHaveBeenCalledWith(data)
    expect(listenerB).toHaveBeenCalledWith(data)
  })

  it('should add same listener only once', () => {
    instanceA.listen(listenerA)
    instanceA.listen(listenerA)
    instanceA.update({ foo: 'bar' })

    expect(listenerA).toHaveBeenCalledTimes(1)
    expect(listenerB).toHaveBeenCalledTimes(1)
  })

  it('should emmit a new added listener', () => {
    const listenerC = jest.fn((data) => data)
    instanceA.listen(listenerC)
    instanceA.update({ foo: 'bar' })

    expect(listenerA).toHaveBeenCalledTimes(1)
    expect(listenerB).toHaveBeenCalledTimes(1)
    expect(listenerC).toHaveBeenCalledTimes(1)
  })

  it('should unlisten one given listener', () => {
    const listenerC = jest.fn((data) => data)

    instanceA.listen(listenerC)
    instanceA.update({ foo: 'bar' })
    instanceA.update({ foo: 'bar' })

    expect(listenerC).toHaveBeenCalledTimes(2)

    instanceA.unlisten(listenerC)
    instanceA.update({ foo: 'bar' })

    expect(listenerC).toHaveBeenCalledTimes(2)
    expect(listenerA).toHaveBeenCalledTimes(3)
    expect(listenerB).toHaveBeenCalledTimes(3)
  })

  it('should remove all listeners', () => {
    const listenerC = jest.fn((data) => data)

    instanceA.listen(listenerC)

    instanceA.update({ foo: 'bar' })
    expect(listenerC).toHaveBeenCalledTimes(1)

    instanceA.remove()
    instanceB.remove()

    instanceA.update({ foo: 'bar' })

    expect(listenerC).toHaveBeenCalledTimes(1)
    expect(listenerA).toHaveBeenCalledTimes(1)
    expect(listenerB).toHaveBeenCalledTimes(1)
  })
})

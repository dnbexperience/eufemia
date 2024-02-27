import { wait } from '../../../core/jest/jestSetup'
import { debounce, debounceAsync } from '../debounce'

const delay = 2

describe('debounce', () => {
  it('delay execution', async () => {
    let outside = 'one'

    const debounced = debounce(({ inside }) => {
      outside = inside
    }, delay)

    debounced({ inside: 'two' })

    expect(outside).toBe('one')

    debounced({ inside: 'three' })

    expect(outside).toBe('one')

    debounced({ inside: 'four' })

    expect(outside).toBe('one')

    await wait(delay + 1)

    expect(outside).toBe('four')
  })

  it('handle return value', () => {
    let outside = 'one'

    const debounced = debounce(({ inside }) => {
      outside = inside
      expect(outside).toBe('two')

      return 'not accessible'
    }, delay)

    const result = debounced({ inside: 'two' })

    expect(typeof debounced).toBe('function')
    expect(typeof debounced.cancel).toBe('function')

    expect(outside).toBe('one')
    expect(result).toBe(undefined)
  })

  it('use given instance', () => {
    const instance = () => null
    instance.property = 'hello'

    const debounced = debounce(
      // Needs to be a function (so we can use "this")
      function () {
        expect(this).toBe(instance)
        expect(this.property).toBe(instance.property)
      },
      delay,
      { instance }
    )

    debounced()
  })

  it('execution immediate', () => {
    let outside = 'one'

    const debounced = debounce(
      ({ inside }) => {
        expect(outside).toBe('one')
        outside = inside
        expect(outside).toBe('two')
      },
      delay,
      { immediate: true }
    )

    debounced({ inside: 'two' })

    expect(outside).toBe('two')
  })

  it('execution immediate and return result', () => {
    let outside = 'one'

    const debounced = debounce(
      ({ inside }) => {
        expect(outside).toBe('one')
        outside = inside
        expect(outside).toBe('two')

        return inside
      },
      delay,
      { immediate: true }
    )

    const immediateResult = debounced({ inside: 'two' })

    expect(outside).toBe('two')
    expect(immediateResult).toBe('two')
  })

  it('should not run debounced function when cancelled', () => {
    let outside = 'one'

    const debounced = debounce(({ inside }) => {
      expect(outside).toBe('one')
      outside = inside
      expect(outside).toBe('two')
    }, delay)
    debounced({ inside: 'two' })
    debounced.cancel()

    expect(outside).toBe('one')
  })
})

describe('debounceAsync', () => {
  it('delay async execution', async () => {
    let outside = 'one'

    const debounced = debounceAsync(({ inside }) => {
      outside = inside
    }, delay)

    debounced({ inside: 'two' })

    expect(outside).toBe('one')

    debounced({ inside: 'three' })

    expect(outside).toBe('one')

    await debounced({ inside: 'four' })

    expect(outside).toBe('four')
  })

  it('delay async execution with additional async debouncedFunction', async () => {
    let outside = 'one'

    const debounced = debounceAsync(async ({ inside }) => {
      await wait(delay + 1)
      outside = inside
    }, delay)

    debounced({ inside: 'two' })

    expect(outside).toBe('one')

    debounced({ inside: 'three' })

    expect(outside).toBe('one')

    await debounced({ inside: 'four' })

    expect(outside).toBe('four')
  })

  it('execute async method once', async () => {
    let count = 0

    const debounced = debounceAsync(async () => {
      count++
    }, delay)

    debounced()
    debounced()
    await debounced()
    debounced()

    expect(count).toBe(1)
  })

  it('cancel async execution', async () => {
    let outside = 'one'

    const debounced = debounceAsync(async ({ inside }) => {
      outside = inside
    }, delay)

    debounced({ inside: 'two' })

    await wait(delay + 1)

    expect(outside).toBe('two')

    debounced({ inside: 'three' })

    // If we don't cancel, we get "three" instead of "two"
    debounced.cancel()

    await wait(delay + 1)

    expect(outside).toBe('two')
  })

  it('call "addCancelEvent" method on cancel', async () => {
    const onCancel = jest.fn()
    let wasCanceled = undefined

    const debounced = debounceAsync(async function () {
      wasCanceled = this.addCancelEvent(onCancel)
    }, delay)

    debounced()

    await wait(delay + 1)

    debounced()

    expect(onCancel).toHaveBeenCalledTimes(0)
    expect(wasCanceled()).toBe(false)

    debounced.cancel()

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(wasCanceled()).toBe(true)

    debounced()

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(wasCanceled()).toBe(false)
  })

  it('call "addCancelEvent" method on cancel – from the return', async () => {
    const onCancel = jest.fn()

    const debounced = debounceAsync(async () => null, delay)

    const wasCanceled = debounced.addCancelEvent(onCancel)

    debounced()

    await wait(delay + 1)

    debounced()

    expect(onCancel).toHaveBeenCalledTimes(0)
    expect(wasCanceled()).toBe(false)

    debounced.cancel()

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(wasCanceled()).toBe(true)

    debounced()

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(wasCanceled()).toBe(false)
  })
})

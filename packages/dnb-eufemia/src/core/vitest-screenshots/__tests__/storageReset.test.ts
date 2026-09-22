import { beforeEach, describe, expect, it, vi } from 'vitest'
import { clearBrowserStorages } from '../storageReset'

/**
 * `page.evaluate(fn)` ships `fn.toString()` to the browser, where
 * module scope does not exist. Re-evaluating the source the same way
 * is what catches a helper that only works in-process.
 */
const asPageFunction = (fn: () => void): (() => void) =>
  new Function(`return (${fn.toString()})`)() as () => void

const replaceStorage = (
  property: 'localStorage' | 'sessionStorage',
  get: () => unknown
) => {
  const original = Object.getOwnPropertyDescriptor(window, property)

  Object.defineProperty(window, property, { configurable: true, get })

  return () => {
    if (original) {
      Object.defineProperty(window, property, original)
    }
  }
}

beforeEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
})

describe('clearBrowserStorages', () => {
  it('clears local and session storage', () => {
    window.localStorage.setItem('eufemia-theme', '{"brand":"sbanken"}')
    window.sessionStorage.setItem('scroll', '120')

    clearBrowserStorages()

    expect(window.localStorage.length).toBe(0)
    expect(window.sessionStorage.length).toBe(0)
  })

  it('still clears when evaluated detached from module scope', () => {
    window.localStorage.setItem('eufemia-theme', '{"brand":"sbanken"}')
    window.sessionStorage.setItem('scroll', '120')

    asPageFunction(clearBrowserStorages)()

    expect(window.localStorage.length).toBe(0)
    expect(window.sessionStorage.length).toBe(0)
  })

  it('clears session storage even when local storage is blocked', () => {
    window.sessionStorage.setItem('scroll', '120')
    const restore = replaceStorage('localStorage', () => {
      throw new Error('The operation is insecure.')
    })

    try {
      expect(() => clearBrowserStorages()).not.toThrow()
      expect(window.sessionStorage.length).toBe(0)
    } finally {
      restore()
    }
  })

  it('ignores a storage that throws on clear', () => {
    const clear = vi.fn(() => {
      throw new Error('The operation is insecure.')
    })
    const restore = replaceStorage('sessionStorage', () => ({ clear }))

    try {
      expect(() => clearBrowserStorages()).not.toThrow()
      expect(clear).toHaveBeenCalledTimes(1)
    } finally {
      restore()
    }
  })
})

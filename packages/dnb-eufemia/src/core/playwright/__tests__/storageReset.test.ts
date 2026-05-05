import { describe, expect, it, vi } from 'vitest'
import { clearBrowserStorages, clearStorageSafely } from '../storageReset'

describe('clearStorageSafely', () => {
  it('clears storage when clear is available', () => {
    const clear = vi.fn()

    clearStorageSafely({ clear })

    expect(clear).toHaveBeenCalledTimes(1)
  })

  it('ignores storage access errors', () => {
    const clear = vi.fn(() => {
      throw new Error('The operation is insecure.')
    })

    expect(() => clearStorageSafely({ clear })).not.toThrow()
    expect(clear).toHaveBeenCalledTimes(1)
  })

  it('ignores missing storage', () => {
    expect(() => clearStorageSafely(null)).not.toThrow()
  })
})

describe('clearBrowserStorages', () => {
  it('ignores browser storage access errors', () => {
    const originalLocalStorage = Object.getOwnPropertyDescriptor(
      window,
      'localStorage'
    )
    const originalSessionStorage = Object.getOwnPropertyDescriptor(
      window,
      'sessionStorage'
    )

    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new Error('The operation is insecure.')
      },
    })

    Object.defineProperty(window, 'sessionStorage', {
      configurable: true,
      get() {
        throw new Error('The operation is insecure.')
      },
    })

    expect(() => clearBrowserStorages()).not.toThrow()

    if (originalLocalStorage) {
      Object.defineProperty(window, 'localStorage', originalLocalStorage)
    }

    if (originalSessionStorage) {
      Object.defineProperty(
        window,
        'sessionStorage',
        originalSessionStorage
      )
    }
  })
})

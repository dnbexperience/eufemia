import { describe, expect, it, vi } from 'vitest'
import { unregisterLegacyServiceWorkers } from '../client/unregister-legacy-service-workers'

describe('unregisterLegacyServiceWorkers', () => {
  it('does nothing when serviceWorker is unavailable', async () => {
    await expect(
      unregisterLegacyServiceWorkers({})
    ).resolves.toBeUndefined()
  })

  it('unregisters every existing registration', async () => {
    const unregister1 = vi.fn().mockResolvedValue(true)
    const unregister2 = vi.fn().mockResolvedValue(true)

    const navigatorRef = {
      serviceWorker: {
        getRegistrations: vi
          .fn()
          .mockResolvedValue([
            { unregister: unregister1 },
            { unregister: unregister2 },
          ]),
      },
    }

    await unregisterLegacyServiceWorkers(navigatorRef)

    expect(unregister1).toHaveBeenCalledTimes(1)
    expect(unregister2).toHaveBeenCalledTimes(1)
  })

  it('swallows errors thrown while unregistering', async () => {
    const navigatorRef = {
      serviceWorker: {
        getRegistrations: vi.fn().mockResolvedValue([
          {
            unregister: vi.fn().mockRejectedValue(new Error('nope')),
          },
        ]),
      },
    }

    await expect(
      unregisterLegacyServiceWorkers(navigatorRef)
    ).resolves.toBeUndefined()
  })

  it('swallows errors from getRegistrations()', async () => {
    const navigatorRef = {
      serviceWorker: {
        getRegistrations: vi.fn().mockRejectedValue(new Error('nope')),
      },
    }

    await expect(
      unregisterLegacyServiceWorkers(navigatorRef)
    ).resolves.toBeUndefined()
  })
})

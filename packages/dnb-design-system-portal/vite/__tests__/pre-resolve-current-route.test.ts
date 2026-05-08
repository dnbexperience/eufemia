import { describe, expect, it, vi } from 'vitest'
import { preResolveCurrentRoute } from '../client/pre-resolve-current-route'

describe('preResolveCurrentRoute', () => {
  it('pre-resolves the matching lazy route', async () => {
    const lazy = vi.fn(async () => ({ Component: () => null }))
    const routes = [
      { path: '/button', lazy },
      {
        path: '/input',
        lazy: vi.fn(async () => ({ Component: () => null })),
      },
    ]

    await preResolveCurrentRoute(routes, '/button/')

    expect(lazy).toHaveBeenCalledTimes(1)
    expect(routes[0].lazy).toBeUndefined()
    expect(routes[0]).toHaveProperty('Component')
  })

  it('does not touch non-matching routes', async () => {
    const lazy = vi.fn(async () => ({ Component: () => null }))
    const routes = [{ path: '/button', lazy }]

    await preResolveCurrentRoute(routes, '/input/')

    expect(lazy).not.toHaveBeenCalled()
    expect(routes[0].lazy).toBe(lazy)
  })

  it('swallows lazy resolution failures', async () => {
    const lazy = vi.fn(async () => {
      throw new Error('boom')
    })
    const routes = [{ path: '/button', lazy }]

    await expect(
      preResolveCurrentRoute(routes, '/button/')
    ).resolves.toBeUndefined()
    expect(routes[0].lazy).toBe(lazy)
  })

  it('pre-resolves index routes when pathname is /', async () => {
    const lazy = vi.fn(async () => ({ Component: () => null }))
    const routes = [
      { index: true, lazy },
      {
        path: '/about',
        lazy: vi.fn(async () => ({ Component: () => null })),
      },
    ]

    await preResolveCurrentRoute(routes, '/')

    expect(lazy).toHaveBeenCalledTimes(1)
    expect(routes[0].lazy).toBeUndefined()
    expect(routes[0]).toHaveProperty('Component')
    expect(routes[1].lazy).toBeDefined()
  })

  it('does not pre-resolve index routes for non-root paths', async () => {
    const lazy = vi.fn(async () => ({ Component: () => null }))
    const routes = [{ index: true, lazy }]

    await preResolveCurrentRoute(routes, '/about/')

    expect(lazy).not.toHaveBeenCalled()
    expect(routes[0].lazy).toBe(lazy)
  })

  it('resolves both trailing-slash variants of the same route', async () => {
    const lazy1 = vi.fn(async () => ({ Component: () => null }))
    const lazy2 = vi.fn(async () => ({ Component: () => null }))
    const routes = [
      { path: '/button', lazy: lazy1 },
      { path: '/button/', lazy: lazy2 },
    ]

    await preResolveCurrentRoute(routes, '/button/')

    expect(lazy1).toHaveBeenCalledTimes(1)
    expect(lazy2).toHaveBeenCalledTimes(1)
    expect(routes[0].lazy).toBeUndefined()
    expect(routes[1].lazy).toBeUndefined()
  })
})

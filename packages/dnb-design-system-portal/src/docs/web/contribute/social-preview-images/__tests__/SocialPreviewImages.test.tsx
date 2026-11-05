import { cleanup, render, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import SocialPreviewImages from '../SocialPreviewImages'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('SocialPreviewImages', () => {
  it('shows twelve noninteractive skeleton cards until the catalogue loads', async () => {
    let resolve: (value: unknown) => void
    vi.stubGlobal(
      'fetch',
      vi.fn().mockReturnValue(
        new Promise((done) => {
          resolve = done
        })
      )
    )
    render(<SocialPreviewImages />)
    expect(document.querySelectorAll('.dnb-card-info')).toHaveLength(12)
    expect(document.querySelector('[aria-busy="true"]')).toBeTruthy()
    expect(
      document.querySelectorAll('.dnb-card-info .dnb-skeleton--shape')
    ).toHaveLength(12)
    expect(
      document.querySelectorAll('.dnb-card-info h2.dnb-skeleton--font')
    ).toHaveLength(12)
    expect(document.querySelector('.dnb-progress-indicator')).toBeNull()
    expect(document.querySelector('.dnb-card-info a[href]')).toBeNull()

    resolve({ ok: true, json: async () => ({ version: 1, entries: {} }) })
    await waitFor(() =>
      expect(document.querySelectorAll('.dnb-card-info')).toHaveLength(1)
    )
    expect(document.querySelector('[aria-busy="true"]')).toBeNull()
    expect(
      document.querySelector('.dnb-card-info .dnb-skeleton')
    ).toBeNull()
    expect(document.querySelector('.dnb-card-info a[href]')).toBeTruthy()
  })

  it('loads the published catalogue with the default image before sorted screenshots', async () => {
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        version: 1,
        entries: {
          '/uilib/components/checkbox/': {
            file: 'images/' + 'b'.repeat(64) + '.png',
            kind: 'screenshot',
            alt: 'Checkbox. Component example.',
          },
          '/uilib/components/button/': {
            file: 'images/' + 'a'.repeat(64) + '.png',
            kind: 'screenshot',
            alt: 'Button. Component example.',
          },
        },
      }),
    })
    vi.stubGlobal('fetch', fetch)
    render(<SocialPreviewImages />)
    await waitFor(() =>
      expect(document.querySelectorAll('h2')).toHaveLength(3)
    )
    expect(fetch).toHaveBeenCalledWith(
      'https://assets.eufemia.dnb.no/og/manifest.json',
      { signal: expect.any(AbortSignal) }
    )
    expect(
      [...document.querySelectorAll('h2')].map(
        (heading) => heading.textContent
      )
    ).toEqual(['Default image', 'Button', 'Checkbox'])
    expect(
      document.querySelector('h2 a[href="/uilib/components/button/"]')
    ).toBeTruthy()
    const image = document.querySelector<HTMLImageElement>(
      'img[alt="Button. Component example."]'
    )
    expect(image.getAttribute('src')).toBe(
      'https://assets.eufemia.dnb.no/og/images/' + 'a'.repeat(64) + '.png'
    )
    expect(image.closest('a').getAttribute('href')).toBe(
      image.getAttribute('src')
    )
    expect(image.getAttribute('loading')).toBe('lazy')
    expect(image.closest('.dnb-card-info')).toBeTruthy()
    expect(document.querySelector('a a')).toBeNull()
  })

  it.each([
    { ok: false },
    {
      ok: true,
      json: async () => ({
        version: 1,
        entries: {
          '/button/': {
            file: '//other.example/image.png',
            kind: 'screenshot',
          },
        },
      }),
    },
  ])(
    'shows an error and keeps the default image when the catalogue cannot be used',
    async (response) => {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response))
      render(<SocialPreviewImages />)
      await waitFor(() =>
        expect(
          document.querySelector('.dnb-form-status').textContent
        ).toContain('could not be loaded')
      )
      expect(document.querySelectorAll('img')).toHaveLength(1)
      expect(document.querySelector('img').getAttribute('src')).toBe(
        '/dnb/og-image.png?v=2'
      )
    }
  )

  it('cancels the catalogue request on unmount', () => {
    const fetch = vi.fn().mockReturnValue(new Promise(() => {}))
    vi.stubGlobal('fetch', fetch)
    const { unmount } = render(<SocialPreviewImages />)
    const signal = fetch.mock.calls[0][1].signal
    expect(signal.aborted).toBe(false)
    unmount()
    expect(signal.aborted).toBe(true)
  })
})

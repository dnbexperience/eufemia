import { renderHook, waitFor } from '@testing-library/react'
import useMarkerStyle from '../useMarkerStyle'

it('repositions the marker when content before the current link changes without resizing the list', async () => {
  let top = 20
  const list = document.createElement('div')
  const link = document.createElement('a')
  list.append(link)
  document.body.append(list)
  list.getBoundingClientRect = () => ({ left: 0, top: 0 }) as DOMRect
  link.getBoundingClientRect = () =>
    ({ left: 0, top, width: 160, height: 36 }) as DOMRect
  Object.defineProperties(link, {
    offsetTop: { get: () => top },
    offsetLeft: { value: 0 },
    offsetWidth: { value: 160 },
    offsetHeight: { value: 36 },
  })
  Object.defineProperty(link, 'offsetParent', { value: list })
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    }
  )
  try {
    const { result, unmount } = renderHook(() => useMarkerStyle(link))
    expect(result.current.translate).toBe('0 20px')
    top = 80
    list.prepend(document.createElement('span'))
    await waitFor(() => expect(result.current.translate).toBe('0 80px'))
    unmount()
  } finally {
    vi.unstubAllGlobals()
    list.remove()
  }
})

it('measures the resting layout while a link is translated by an entrance animation', () => {
  const list = document.createElement('div')
  const link = document.createElement('a')
  list.append(link)
  document.body.append(list)
  list.getBoundingClientRect = () => ({ left: 100, top: 100 }) as DOMRect
  link.getBoundingClientRect = () =>
    ({ left: 116, top: 114, width: 160, height: 36 }) as DOMRect
  Object.defineProperties(link, {
    offsetParent: { value: list },
    offsetTop: { value: 20 },
    offsetLeft: { value: 16 },
    offsetWidth: { value: 160 },
    offsetHeight: { value: 36 },
  })
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    }
  )
  try {
    const { result, unmount } = renderHook(() => useMarkerStyle(link))
    expect(result.current).toEqual({
      left: 16,
      translate: '0 20px',
      width: 160,
      height: 36,
    })
    unmount()
  } finally {
    vi.unstubAllGlobals()
    list.remove()
  }
})

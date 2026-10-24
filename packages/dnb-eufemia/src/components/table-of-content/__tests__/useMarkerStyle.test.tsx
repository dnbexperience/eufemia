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

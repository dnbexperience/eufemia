type VerticalBounds = { top: number; bottom: number }

export function getViewportBounds() {
  const viewport = window.visualViewport
  let top = viewport?.offsetTop ?? 0
  if (top !== 0) {
    // Safari reports element rectangles relative to the panned visual viewport.
    const origin = document.createElement('span')
    origin.style.cssText = 'position:fixed;top:0;left:0;visibility:hidden'
    document.body.appendChild(origin)
    top += origin.getBoundingClientRect().top
    origin.remove()
  }
  const height =
    viewport?.height ??
    Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )

  return { top, bottom: top + height, height }
}

/** Available vertical space in the same coordinate system as the anchor. */
export default function getAvailableSpace(
  anchor: VerticalBounds,
  {
    viewport = getViewportBounds(),
    margin = 0,
    offset = 0,
  }: { viewport?: VerticalBounds; margin?: number; offset?: number } = {}
) {
  return {
    top: viewport.top + margin,
    bottom: viewport.bottom - margin,
    above: anchor.top - viewport.top - margin - offset,
    below: viewport.bottom - margin - anchor.bottom - offset,
  }
}

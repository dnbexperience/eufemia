export default async function sampleMotionStyles(
  element: Element,
  {
    times,
    selectors = { target: ':scope' },
  }: { times: number[]; selectors?: Record<string, string> }
) {
  const targets = Object.entries(selectors).map(([name, selector]) => {
    const target =
      selector === ':scope' ? element : element.querySelector(selector)
    if (!target) {
      throw new Error(`Motion sample target not found: ${selector}`)
    }
    return { name, target }
  })
  const animations = element.getAnimations({ subtree: true })
  if (animations.length === 0) {
    throw new Error('Motion sampling requires an animated element')
  }
  animations.forEach((animation) => animation.pause())
  await Promise.all(animations.map((animation) => animation.ready))

  return times.map((time) => {
    animations.forEach((animation) => {
      animation.currentTime = time
    })
    return Object.fromEntries(
      targets.map(({ name, target }) => {
        const style = getComputedStyle(target)
        const transform = new DOMMatrix(style.transform)
        const { x, y, width, height } = target.getBoundingClientRect()
        return [
          name,
          {
            opacity: Number(style.opacity),
            transform: style.transform,
            origin: style.transformOrigin,
            x: transform.m41,
            y: transform.m42,
            scaleX: transform.m11,
            scaleY: transform.m22,
            angle:
              (Math.atan2(transform.m12, transform.m11) * 180) / Math.PI,
            scale: Math.hypot(transform.m11, transform.m12),
            height: parseFloat(style.height),
            strokeDashoffset: parseFloat(style.strokeDashoffset),
            bounds: { x, y, width, height },
          },
        ] as const
      })
    )
  })
}

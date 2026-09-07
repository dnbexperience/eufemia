export default function sampleMotionPoints(
  element: SVGGElement,
  times: number[] | null
) {
  const animations = element.getAnimations()
  if (times) {
    animations.forEach((animation) => animation.pause())
  }
  const sample = () => {
    const inverse = element.getCTM().inverse()
    const points = Array.from(element.querySelectorAll('path')).flatMap(
      (path, index) => {
        const matrix = inverse.multiply(path.getCTM())
        const start = path.getPointAtLength(0).matrixTransform(matrix)
        const end = path
          .getPointAtLength(path.getTotalLength())
          .matrixTransform(matrix)
        return index === 0
          ? [start.x, start.y, end.x, end.y]
          : [end.x, end.y]
      }
    )
    return points.map((value) => Number(value.toFixed(3)))
  }
  return times
    ? times.map((time) => {
        animations.forEach((animation) => {
          animation.currentTime = time
        })
        return sample()
      })
    : [sample()]
}

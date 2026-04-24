export const PILL_RADIUS_THRESHOLD = 9999

export const formatNumberValue = (value: number) => {
  if (value === 0) {
    return '0'
  }

  if (value >= PILL_RADIUS_THRESHOLD) {
    return '9999px'
  }

  const rem = value / 16
  const formatted = parseFloat(rem.toFixed(4))
  return `${formatted}rem`
}

import { scrollToLocationHashId } from '@dnb/eufemia/src/shared/helpers'

export function scrollToAnimation() {
  const target =
    typeof window !== 'undefined'
      ? document.getElementById(window.location.hash.slice(1))
      : null
  const scrollMarginTop = target
    ? parseFloat(window.getComputedStyle(target).scrollMarginTop)
    : 0

  scrollToLocationHashId({
    offset: Math.max(100, scrollMarginTop),
    delay: 100,
    onCompletion: (elem) => {
      try {
        elem.parentElement.classList.add('focus')
      } catch {
        // stop here
      }
    },
  })
}

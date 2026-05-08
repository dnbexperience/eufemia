import { scrollToLocationHashId } from '@dnb/eufemia/src/shared/helpers'

export function scrollToAnimation() {
  scrollToLocationHashId({
    offset: 100,
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

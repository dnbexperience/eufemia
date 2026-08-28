import { scrollToLocationHashId } from '@dnb/eufemia/src/shared/helpers'

export function scrollToAnimation() {
  scrollToLocationHashId({
    useScrollIntoView: true,
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

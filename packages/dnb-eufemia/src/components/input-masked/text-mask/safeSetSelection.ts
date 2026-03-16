/**
 * Source for a non maintained repo:
 * https://github.com/text-mask/text-mask/tree/master/core/src
 */

import { isAndroid } from '../../../shared/helpers'

const defer: (cb: () => void) => void =
  typeof requestAnimationFrame !== 'undefined'
    ? (cb) => {
        requestAnimationFrame(cb)
      }
    : (cb) => {
        setTimeout(cb, 0)
      }

export function safeSetSelection(
  element: HTMLInputElement,
  selectionPosition: number
) {
  if (
    document.activeElement === element ||
    (process.env.NODE_ENV !== 'production' &&
      typeof jest !== 'undefined')
  ) {
    const select = () => {
      try {
        element.setSelectionRange(selectionPosition, selectionPosition)
      } catch (error) {
        //
      }
    }
    if (isAndroid()) {
      defer(select)
    } else {
      select()
    }
  }
}

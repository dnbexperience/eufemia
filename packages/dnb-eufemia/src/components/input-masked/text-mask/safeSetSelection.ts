/**
 * Source for a non maintained repo:
 * https://github.com/text-mask/text-mask/tree/master/core/src
 */

const isAndroid =
  typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent)
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
    element?.setSelectionRange?.name === 'mockConstructor'
  ) {
    const select = () => {
      try {
        element.setSelectionRange(selectionPosition, selectionPosition)
      } catch (error) {
        //
      }
    }
    if (isAndroid) {
      defer(select)
    } else {
      select()
    }
  }
}

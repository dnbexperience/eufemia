/**
 * So iOS v13 can select something on the first try, we run this add range trick.
 * NB: This hack may be removed in future iOS versions.
 */
export function runIOSSelectionFix() {
  try {
    const selection = window.getSelection()
    const range = document.createRange()
    selection.removeAllRanges()
    selection.addRange(range)
  } catch (e) {
    //
  }
}

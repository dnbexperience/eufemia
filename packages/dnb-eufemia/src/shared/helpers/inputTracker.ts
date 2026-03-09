/**
 * Lightweight replacement for `what-input`.
 *
 * Sets `data-whatinput` on `<html>` to `'keyboard'`, `'mouse'`, or `'touch'`
 * based on the most recent user interaction.
 *
 * Only the Tab key triggers `'keyboard'` – other key presses are ignored
 * so that typing inside a text field does not flip the state.
 */

let currentInput: string | undefined

function onPointerDown(e: PointerEvent) {
  const next = e.pointerType === 'touch' ? 'touch' : 'mouse'
  if (currentInput !== next) {
    currentInput = next
    document.documentElement.setAttribute('data-whatinput', next)
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Tab' && currentInput !== 'keyboard') {
    currentInput = 'keyboard'
    document.documentElement.setAttribute('data-whatinput', 'keyboard')
  }
}

export function initInputTracker() {
  if (typeof document === 'undefined') {
    return // stop here
  }

  document.addEventListener('pointerdown', onPointerDown, true)
  document.addEventListener('keydown', onKeyDown, true)
}

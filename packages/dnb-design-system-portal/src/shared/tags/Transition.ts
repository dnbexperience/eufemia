export function startPageTransition() {
  if (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition !== 'undefined' &&
    !globalThis.IS_TEST &&
    !window.location.href.includes('data-visual-test')
  ) {
    document.startViewTransition()
  }
}

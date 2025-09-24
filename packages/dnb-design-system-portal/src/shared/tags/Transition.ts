export function startPageTransition() {
  if (
    typeof document !== 'undefined' &&
    typeof document.startViewTransition !== 'undefined' &&
    !globalThis.IS_TEST &&
    !process.env.isCI
  ) {
    document.startViewTransition()
  }
}

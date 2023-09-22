declare global {
  interface Document {
    startViewTransition(): void
  }
}

export function startPageTransition() {
  if (
    !globalThis.IS_TEST &&
    typeof document.startViewTransition !== 'undefined'
  ) {
    document.startViewTransition()
  }
}

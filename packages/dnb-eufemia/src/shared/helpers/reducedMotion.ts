/**
 * Read the setting at the time of each action, because users can change it at any time.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    Boolean(
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    )
  )
}

/**
 * An explicit `behavior: 'smooth'` ignores the CSS `scroll-behavior`,
 * so the global reduced motion rule cannot stop it.
 */
export function getSmoothScrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? 'auto' : 'smooth'
}

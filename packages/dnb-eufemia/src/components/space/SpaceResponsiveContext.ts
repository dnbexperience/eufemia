import { createContext } from 'react'
import type { MediaQuerySizes } from '../../shared/MediaQueryUtils'

export type SpaceResponsiveContextValue = {
  /**
   * Forces a specific spacing density for descendants. Overrides `breakOn` when set. Use `false` to disable.
   */
  density?: 'compact' | 'basis' | false

  /**
   * Sets at which breakpoint we switch from `compact` to `basis` density. Default: `small`.
   */
  breakOn?: Extract<MediaQuerySizes, 'small' | 'medium'>

  /**
   * When `true`, disables responsive spacing for descendants, overriding a parent `Space.ResponsiveContext`. Defaults to `false`.
   */
  off?: boolean
}

/**
 * Signals whether a component tree is wrapped in `Space.ResponsiveContext`.
 *
 * When active, `useSpacing` appends CSS classes so descendant components
 * opt into responsive spacing via `--responsive-spacing-*` custom properties.
 */
const SpaceResponsiveContext = createContext<
  SpaceResponsiveContextValue | false
>(false)

export default SpaceResponsiveContext

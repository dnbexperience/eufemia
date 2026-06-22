import { useContext } from 'react'
import type { ReactNode } from 'react'
import SpaceResponsiveContext from './SpaceResponsiveContext'
import type {
  SpaceDensity,
  SpaceBreakpoint,
} from './SpaceResponsiveContext'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type SpaceResponsiveProps = {
  /**
   * Forces a specific spacing density for descendants. Overrides `breakpoint` when set.
   */
  density?: SpaceDensity

  /**
   * Sets which breakpoint's spacing scale to use as the default. Default: `medium`.
   */
  breakpoint?: SpaceBreakpoint

  /**
   * When `true`, disables responsive spacing for descendants, overriding a parent `Space.ResponsiveContext`. Defaults to `false`.
   */
  off?: boolean
  children?: ReactNode
}

function SpaceResponsive({
  density,
  breakpoint,
  off,
  children,
}: SpaceResponsiveProps) {
  const parent = useContext(SpaceResponsiveContext)

  const value = off
    ? { off }
    : {
        ...(parent || undefined),
        ...(density !== undefined && { density }),
        ...(breakpoint !== undefined && { breakpoint }),
        ...(off !== undefined && { off }),
      }

  return (
    <SpaceResponsiveContext value={value}>
      {children}
    </SpaceResponsiveContext>
  )
}

withComponentMarkers(SpaceResponsive, {
  _supportsSpacingProps: 'passthrough',
})

export default SpaceResponsive

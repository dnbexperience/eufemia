/**
 * Types for the Icon value
 *
 * They describe what can be passed as an `icon`, and live outside `types.ts`
 * because `IconType` is not public and would be picked up by its star export.
 */

import type { JSX, ReactElement, SVGProps } from 'react'

export type IconSVGProps = SVGProps<SVGSVGElement> & {
  title?: string
}

export type IconFunction = ((props?: IconSVGProps) => JSX.Element) & {
  __iconTransitionStyle?: Record<string, string>
  __iconTransitionFallback?: boolean
  __iconAnimation?: string
}

export type IconType =
  | string
  | ReactElement<SVGElement>
  | IconFunction
  | false

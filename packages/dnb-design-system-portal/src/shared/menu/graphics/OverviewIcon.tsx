/**
 * Overview sidebar icon
 *
 */

import type { SVGProps } from 'react'
import { IconsSvg } from '../MainMenuGraphics'

export default function OverviewIcon(props: SVGProps<SVGSVGElement> = {}) {
  // Keep the thicker stroke inside the SVG viewport.
  return <IconsSvg {...props} strokeWidth="3" viewBox="-1 -1 50 50" />
}

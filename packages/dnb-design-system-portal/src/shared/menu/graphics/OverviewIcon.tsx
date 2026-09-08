/**
 * Overview sidebar icon
 *
 */

import type { SVGProps } from 'react'
export default function OverviewIcon(props: SVGProps<SVGSVGElement> = {}) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="-1 -1 50 50"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {[
        [1.5, 1.5],
        [28.5, 1.5],
        [1.5, 28.5],
        [28.5, 28.5],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="18"
          height="18"
          rx="3"
          strokeWidth="3"
        />
      ))}
    </svg>
  )
}

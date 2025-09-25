import React from 'react'

export type CheckIconProps = {
  size: 'default' | 'small' | 'medium' | 'large' | number
}

// The new checkbox has too low contrast, as it is too thin on web
function CheckIcon({ size }: CheckIconProps) {
  let vB = 16
  if (typeof size === 'number') {
    vB = size
  } else if (size === 'large') {
    vB = 24
  } else if (size === 'medium') {
    vB = 20
  } else if (size === 'small') {
    vB = 14
  }
  return (
    <svg
      width={vB}
      height={vB}
      viewBox={`0 0 ${vB} ${vB}`}
      fill="none"
      className="dnb-checkbox__gfx"
      aria-hidden
    >
      <path
        d={size === 'large' ? 'M1.5 15L7.5 21L22.5 3' : 'M1 10L5 14L15 2'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CheckIcon

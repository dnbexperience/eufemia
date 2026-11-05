export type CheckIconProps = {
  size: 'default' | 'medium' | 'large'
}

// The new checkbox has too low contrast, as it is too thin on web
function CheckIcon({ size }: CheckIconProps) {
  let vB = 16
  if (size === 'large') {
    vB = 24
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
        d={
          size === 'large'
            ? 'M3.6 14.4L8.4 19.2L20.4 4.8'
            : 'M1 10L5 14L15 2'
        }
        stroke="currentColor"
        strokeWidth={size === 'large' ? '1.5' : '2'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CheckIcon

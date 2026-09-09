import type { SVGProps } from 'react'

export default function AnimationPrinciplesIcon(
  props: SVGProps<SVGSVGElement> = {}
) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 7V43H43" />
      <path d="M13 34C27 34 21 13 37 13" />
      <circle cx="10" cy="34" r="3" />
      <circle cx="40" cy="13" r="3" />
    </svg>
  )
}

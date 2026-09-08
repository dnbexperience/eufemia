import type { SVGProps } from 'react'

export default function MotionIcon(props: SVGProps<SVGSVGElement> = {}) {
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
      <path d="M5 15H15M2 24H12M5 33H15" />
      <circle cx="32" cy="24" r="12" />
      <path d="M26 24H38M33 19L38 24L33 29" />
    </svg>
  )
}

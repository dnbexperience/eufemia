import type { SVGProps } from 'react'

export default function ChecklistIcon(
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
      <rect x="7" y="4" width="34" height="40" rx="3" />
      <path d="M13 14L16 17L21 11M13 25L16 28L21 22M13 36L16 39L21 33" />
      <path d="M27 14H35M27 25H35M27 36H35" />
    </svg>
  )
}

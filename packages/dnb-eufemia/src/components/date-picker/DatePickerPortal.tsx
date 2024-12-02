import { createPortal } from 'react-dom'

type DatePickerPortalProps = React.HTMLProps<HTMLDivElement> & {
  show?: boolean
  targetElement?: HTMLElement
}

export default function DatePickerPortal({
  show = false,
  targetElement,
  children,
}: DatePickerPortalProps) {
  const scrollY = window.scrollY
  const scrollX = window.scrollX

  const rect = targetElement?.getBoundingClientRect()

  return show
    ? createPortal(
        <span
          className="dnb-datepicker__portal"
          style={{
            top: `${rect?.top + scrollY}px`,
            left: `${rect?.left + scrollX}px`,
          }}
        >
          {children}
        </span>,
        document.body
      )
    : null
}

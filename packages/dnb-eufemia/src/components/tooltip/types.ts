export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

export type TooltipArrow =
  | null
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
export type TooltipAlign = null | 'center' | 'right' | 'left'

export type TooltipSize = 'basis' | 'large'

export type TooltipProps = {
  id?: string
  group?: string
  size?: TooltipSize
  active?: boolean
  position?: TooltipPosition
  arrow?: TooltipArrow
  align?: TooltipAlign
  animate_position?: boolean
  fixed_position?: boolean
  skip_portal?: boolean
  no_animation?: boolean
  show_delay?: number
  hide_delay?: number
  target_selector?: string
  target_element?: React.ReactNode
  tooltip?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

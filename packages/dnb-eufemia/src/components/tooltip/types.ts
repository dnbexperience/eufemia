export type TooltipProps = {
  id?: string
  group?: string
  size?: 'basis' | 'large'
  active?: boolean
  position?: 'top' | 'right' | 'bottom' | 'left'
  arrow?: null | 'center' | 'top' | 'right' | 'bottom' | 'left'
  align?: null | 'center' | 'right' | 'left'
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

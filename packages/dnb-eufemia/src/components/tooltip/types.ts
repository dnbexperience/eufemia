import type { SpacingProps } from '../../shared/types'

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
  size?: TooltipSize
  active?: boolean
  position?: TooltipPosition
  arrow?: TooltipArrow
  align?: TooltipAlign
  fixedPosition?: boolean
  skipPortal?: boolean
  noAnimation?: boolean
  showDelay?: number
  hideDelay?: number
  targetSelector?: string
  targetElement?:
    | React.ReactNode
    | React.MutableRefObject<unknown>
    | HTMLElement
  tooltip?: React.ReactNode
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

export type TooltipAllProps = TooltipProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, keyof TooltipProps>

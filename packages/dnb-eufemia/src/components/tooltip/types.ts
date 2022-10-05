import { IncludeSnakeCase } from '../../shared/helpers/withSnakeCaseProps'
import { SpacingProps } from '../../shared/types'

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

export type TooltipProps = IncludeSnakeCase<{
  id?: string
  group?: string
  size?: TooltipSize
  active?: boolean
  position?: TooltipPosition
  arrow?: TooltipArrow
  align?: TooltipAlign
  animatePosition?: boolean
  fixedPosition?: boolean
  skipPortal?: boolean
  noAnimation?: boolean
  showDelay?: number
  hideDelay: number
  targetSelector?: string
  targetElement?: React.ReactNode
  tooltip?: React.ReactNode
  className?: string
  children?: React.ReactNode
}>

export type TooltipAllProps = TooltipProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, keyof TooltipProps>

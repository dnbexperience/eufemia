import { IncludeSnakeCase } from '../../shared/helpers/withSnakeCaseProps'
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

export type TooltipProps = IncludeSnakeCase<{
  id?: string
  size?: TooltipSize
  active?: boolean
  position?: TooltipPosition
  arrow?: TooltipArrow
  align?: TooltipAlign
  fixedPosition?: boolean
  contentRef?: React.MutableRefObject<HTMLSpanElement>
  skipPortal?: boolean
  noAnimation?: boolean
  showDelay?: number
  hideDelay: number
  /**
   * Optional className added to the Tooltip portal root element.
   * Has effect only when not using skipPortal.
   */
  portalRootClass?: string
  targetSelector?: string
  targetElement?:
    | React.ReactNode
    | React.MutableRefObject<unknown>
    | HTMLElement
  tooltip?: React.ReactNode
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  /**
   * Whether to omit the aria-describedby attribute.
   */
  omitDescribedBy?: boolean
}>

export type TooltipAllProps = TooltipProps &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, keyof TooltipProps>

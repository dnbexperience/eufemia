import type React from 'react'
import type { IncludeSnakeCase } from '../../shared/helpers/withSnakeCaseProps'
import type { SpacingProps } from '../../shared/types'

export type PopoverPosition = 'top' | 'right' | 'bottom' | 'left'

export type PopoverArrow =
  | null
  | 'center'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'

export type PopoverAlign = null | 'center' | 'right' | 'left'

export type PopoverTargetElement =
  | React.ReactNode
  | React.MutableRefObject<unknown>
  | HTMLElement

type PopoverPropsBase = IncludeSnakeCase<{
  id?: string
  position?: PopoverPosition
  arrow?: PopoverArrow
  align?: PopoverAlign
  fixedPosition?: boolean
  contentRef?: React.MutableRefObject<HTMLSpanElement>
  skipPortal?: boolean
  noAnimation?: boolean
  showDelay?: number
  hideDelay?: number
  portalRootClass?: string
  targetSelector?: string
  targetElement?: PopoverTargetElement
  className?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  omitDescribedBy?: boolean
}>

export type PopoverAllProps = PopoverPropsBase &
  SpacingProps &
  Omit<React.HTMLProps<HTMLElement>, keyof PopoverPropsBase>

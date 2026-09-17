/**
 * Types for RadioGroup
 *
 * Separate from `types.ts` so Radio and RadioGroup each export only their own
 * types.
 */

import type { CSSProperties, ReactNode, SyntheticEvent } from 'react'
import type { SkeletonShow } from '../Skeleton'
import type {
  FormStatusBaseProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { FormElementProps } from '../../shared/helpers/filterValidProps'
import type { SpacingProps } from '../../shared/types'

export type RadioGroupLabelPosition = 'left' | 'right'

export type RadioGroupSize = 'default' | 'medium' | 'large'

export type RadioGroupSuffix = string | ReactNode

export type RadioGroupLayoutDirection = 'column' | 'row'

export type RadioGroupAttributes = string | Record<string, unknown>

export type RadioGroupChildren = string | ReactNode

export type RadioGroupChangeEvent = {
  value: string
  event: SyntheticEvent
}

export type RadioGroupProps = {
  label?: ReactNode
  labelDirection?: FormElementProps['labelDirection']
  labelSrOnly?: boolean
  labelPosition?: RadioGroupLabelPosition
  title?: string
  disabled?: boolean
  skeleton?: SkeletonShow
  id?: string
  name?: string
  size?: RadioGroupSize
  status?: FormStatusText
  statusState?: FormStatusState
  statusProps?: FormStatusBaseProps
  statusNoAnimation?: boolean
  globalStatus?: FormStatusBaseProps['globalStatus']
  suffix?: RadioGroupSuffix
  vertical?: boolean
  layoutDirection?: RadioGroupLayoutDirection
  value?: string
  attributes?: RadioGroupAttributes
  style?: CSSProperties
  className?: string
  children?: RadioGroupChildren
  onChange?: (event: RadioGroupChangeEvent) => void
} & SpacingProps

/**
 * useFormField Hook
 *
 * Provides shared FormLabel and FormStatus elements used by form components.
 * Eliminates duplicated label + status JSX across Input, Textarea, Checkbox,
 * Slider, Dropdown, Autocomplete, DatePicker, and others.
 */

import React from 'react'
import FormLabel from '../../components/form-label/FormLabel'
import FormStatus from '../../components/form-status/FormStatus'
import { getStatusState } from '../component-helper'
import type { FormLabelProps } from '../../components/form-label/FormLabel'
import type { FormStatusBaseProps } from '../../components/form-status/FormStatus'

export type UseFormFieldProps = {
  /** Component id used to derive label and status ids */
  id: string

  /** Label text */
  label?: React.ReactNode

  /** Layout direction for the label */
  labelDirection?: FormLabelProps['labelDirection']

  /** Visually hide the label, keeping it accessible */
  labelSrOnly?: boolean

  /** Override the forId on FormLabel (defaults to id) */
  forId?: string

  /** Disabled state passed to FormLabel */
  disabled?: boolean

  /** Skeleton loading state */
  skeleton?: boolean

  /** Click handler for FormLabel */
  labelOnClick?: React.MouseEventHandler

  /** CSS selector used by FormStatus to determine its width */
  widthSelector?: string
} & FormStatusBaseProps

export type UseFormFieldReturn = {
  /** FormLabel element (or null when no label is provided) */
  labelElement: React.ReactNode
  /** FormStatus element */
  statusElement: React.ReactNode
  /** Whether the status is currently visible */
  showStatus: boolean
}

export default function useFormField(
  props: UseFormFieldProps
): UseFormFieldReturn {
  const {
    id,
    label,
    labelDirection,
    labelSrOnly,
    forId,
    disabled,
    skeleton,
    labelOnClick,
    status,
    statusState,
    statusProps,
    statusNoAnimation,
    globalStatus,
    widthSelector,
  } = props

  const showStatus = getStatusState(status)

  const labelElement = label ? (
    <FormLabel
      id={id + '-label'}
      forId={forId ?? id}
      text={label}
      labelDirection={labelDirection}
      srOnly={labelSrOnly}
      disabled={disabled}
      skeleton={skeleton}
      onClick={labelOnClick}
    />
  ) : null

  const statusElement = (
    <FormStatus
      show={showStatus}
      id={id + '-form-status'}
      globalStatus={globalStatus}
      label={label}
      textId={id + '-status'}
      text={status}
      state={statusState}
      noAnimation={statusNoAnimation}
      skeleton={skeleton}
      widthSelector={widthSelector}
      {...statusProps}
    />
  )

  return { labelElement, statusElement, showStatus }
}

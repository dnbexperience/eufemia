import React, { useContext } from 'react'
import { DatePicker } from '../../../components'
import { forwardSpaceProps } from '../utils'
import { useField } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps } from '../field-types'
import SharedContext from '../../../shared/Context'

export type Props = ComponentProps & FieldProps<string>

function DateComponent(props: Props) {
  const sharedContext = useContext(SharedContext)
  const preparedProps: Props = {
    ...props,
    fromInput: ({ date }: { date: string }) => {
      return date
    },
  }

  const {
    className,
    label,
    value,
    error,
    disabled,
    onFocus,
    onBlur,
    onChange,
  } = useField(preparedProps)

  return (
    <DatePicker
      className={className}
      label={label ?? sharedContext?.translation.Forms.dateLabel}
      label_direction="vertical"
      date={value}
      status={error?.message}
      disabled={disabled}
      show_input={true}
      show_cancel_button={true}
      show_reset_button={true}
      on_change={onChange}
      on_show={onFocus}
      on_hide={onBlur}
      {...forwardSpaceProps(props)}
    />
  )
}

DateComponent._supportsEufemiaSpacingProps = true
export default DateComponent

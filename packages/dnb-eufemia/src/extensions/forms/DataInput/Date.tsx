import React, { useContext } from 'react'
import { DatePicker } from '../../../components'
import { forwardSpaceProps } from '../utils'
import { useInput } from './hooks'
import type { ComponentProps } from '../component-types'
import type { InputProps } from '../input-types'
import SharedContext from '../../../shared/Context'

export type Props = ComponentProps &
  InputProps<string> & {
    stretch?: boolean
  }

export default function DateInput(props: Props) {
  const sharedContext = useContext(SharedContext)
  const preparedProps: Props = {
    ...props,
    fromInput: ({ date }: { date: string }) => {
      return date
    },
  }

  const {
    className,
    'data-testid': dataTestId,
    path,
    label,
    value,
    error,
    disabled,
    stretch = false,
    onFocus,
    onBlur,
    onChange,
  } = useInput(preparedProps)

  return (
    <DatePicker
      className={className}
      data-testid={dataTestId ?? path ?? 'data-input-date'}
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
      stretch={stretch}
      {...forwardSpaceProps(props)}
    />
  )
}

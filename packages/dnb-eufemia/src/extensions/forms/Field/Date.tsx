import React, { useContext } from 'react'
import { DatePicker, HelpButton } from '../../../components'
import { forwardSpaceProps } from '../utils'
import { useField } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps, FieldHelpProps } from '../field-types'
import SharedContext from '../../../shared/Context'

export type Props = ComponentProps & FieldHelpProps & FieldProps<string>

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
    help,
    error,
    disabled,
    handleFocus,
    handleBlur,
    handleChange,
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
      suffix={
        help ? (
          <HelpButton title={help.title}>{help.contents}</HelpButton>
        ) : undefined
      }
      on_change={handleChange}
      on_show={handleFocus}
      on_hide={handleBlur}
      {...forwardSpaceProps(props)}
    />
  )
}

DateComponent._supportsEufemiaSpacingProps = true
export default DateComponent

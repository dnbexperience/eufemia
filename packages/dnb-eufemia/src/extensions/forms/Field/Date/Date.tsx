import React, { useContext } from 'react'
import { DatePicker, HelpButton } from '../../../../components'
import { useDataValue } from '../../hooks'
import { FieldProps, FieldHelpProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import SharedContext from '../../../../shared/Context'

export type Props = FieldHelpProps & FieldProps<string>

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
  } = useDataValue(preparedProps)

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
      {...pickSpacingProps(props)}
    />
  )
}

DateComponent._supportsSpacingProps = true
export default DateComponent

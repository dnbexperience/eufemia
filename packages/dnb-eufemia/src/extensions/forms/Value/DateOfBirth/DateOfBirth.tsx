import React from 'react'
import DateComponent, { Props as DateValueProps } from '../Date/Date'
import useTranslation from '../../hooks/useTranslation'

export type Props = DateValueProps

function DateOfBirth(props: Props) {
  const translations = useTranslation().DateOfBirth

  const dateValueProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <DateComponent {...dateValueProps} />
}

DateOfBirth._supportsSpacingProps = true
export default DateOfBirth

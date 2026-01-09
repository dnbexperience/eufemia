import React from 'react'
import type { Props as DateValueProps } from '../Date/Date';
import DateComponent from '../Date/Date'
import useTranslation from '../../hooks/useTranslation'
import { DEFAULT_DATE_FORMAT } from '../../Field/DateOfBirth/DateOfBirth'

export type Props = DateValueProps & {
  dateFormat?: string
}

function DateOfBirth(props: Props) {
  const translations = useTranslation().DateOfBirth
  const { dateFormat = DEFAULT_DATE_FORMAT, ...otherProps } = props

  const dateValueProps: Props = {
    ...otherProps,
    label: props.label ?? translations.label,
    dateFormat,
  }
  return <DateComponent {...dateValueProps} />
}

DateOfBirth._supportsSpacingProps = true
export default DateOfBirth

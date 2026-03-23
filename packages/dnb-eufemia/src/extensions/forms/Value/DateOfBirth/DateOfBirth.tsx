import React from 'react'
import type { ValueDateProps as DateValueProps } from '../Date/Date'
import DateComponent from '../Date/Date'
import useTranslation from '../../hooks/useTranslation'
import { DEFAULT_DATE_FORMAT } from '../../Field/DateOfBirth/DateOfBirth'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueDateOfBirthProps = DateValueProps & {
  dateFormat?: string
}

function DateOfBirth(props: ValueDateOfBirthProps) {
  const translations = useTranslation().DateOfBirth
  const { dateFormat = DEFAULT_DATE_FORMAT, ...otherProps } = props

  const dateValueProps: ValueDateOfBirthProps = {
    ...otherProps,
    label: props.label ?? translations.label,
    dateFormat,
  }
  return <DateComponent {...dateValueProps} />
}

withComponentMarkers(DateOfBirth, {
  _supportsSpacingProps: true,
})

export default DateOfBirth

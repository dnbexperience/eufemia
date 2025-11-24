import React from 'react'
import classnames from 'classnames'
import { useTranslation, useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import useTimeZone from './useTimeZone'
import type { TimeZoneIdentifier } from '../../constants/timezones'

export type Props = ValueProps<TimeZoneIdentifier>

function SelectTimeZone(props: Props) {
  const translations = useTranslation().SelectTimeZone
  const {
    value,
    className,
    label = translations.label,
    ...rest
  } = useValueProps(props)

  const { getTimeZoneNameByIdentifier } = useTimeZone()

  return (
    <ValueBlock
      label={label}
      className={classnames('dnb-forms-value-select-timezone', className)}
      {...rest}
    >
      {getTimeZoneNameByIdentifier(value) ?? value}
    </ValueBlock>
  )
}

SelectTimeZone.useTimeZone = useTimeZone
SelectTimeZone._supportsSpacingProps = true
export default SelectTimeZone


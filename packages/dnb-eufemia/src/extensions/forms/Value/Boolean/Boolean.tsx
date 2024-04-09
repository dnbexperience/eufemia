import React from 'react'
import ValueBlock from '../../ValueBlock'
import { useFieldProps } from '../../hooks'
import { ValueProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'
import useTranslation from '../../hooks/useTranslation'

export type Props = ValueProps<boolean>

function BooleanComponent(props: Props) {
  const translations = useTranslation().BooleanField

  const { className, label, placeholder, showEmpty, value, inline } =
    useFieldProps(props)

  return (
    <ValueBlock
      className={className}
      label={label}
      showEmpty={showEmpty}
      placeholder={placeholder}
      inline={inline}
      {...pickSpacingProps(props)}
    >
      {value === true || value === false
        ? value === true
          ? translations.yes
          : translations.no
        : null}
    </ValueBlock>
  )
}

BooleanComponent._supportsSpacingProps = true
export default BooleanComponent

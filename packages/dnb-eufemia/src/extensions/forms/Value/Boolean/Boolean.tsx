import React from 'react'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import useTranslation from '../../hooks/useTranslation'

export type Props = ValueProps<boolean>

function BooleanComponent(props: Props) {
  const translations = useTranslation().BooleanField
  const { value, ...rest } = useValueProps(props)

  return (
    <ValueBlock {...rest}>
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

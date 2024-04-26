import React from 'react'
import ToggleField, { Props as ToggleFieldProps } from '../Toggle'
import useTranslation from '../../hooks/useTranslation'

export type Props = Omit<
  ToggleFieldProps,
  'valueOn' | 'valueOff' | 'textOn' | 'textOff'
> & {
  trueText?: string
  falseText?: string
}

function BooleanComponent(props: Props) {
  const { trueText, falseText, ...restProps } = props
  const translations = useTranslation().BooleanField

  return (
    <ToggleField
      {...restProps}
      valueOn={true}
      valueOff={false}
      textOn={trueText ?? translations.yes}
      textOff={falseText ?? translations.no}
    />
  )
}

BooleanComponent._supportsSpacingProps = true
export default BooleanComponent

import React from 'react'
import type { Props as ToggleFieldProps } from '../Toggle';
import ToggleField from '../Toggle'
import useTranslation from '../../hooks/useTranslation'
import type { FieldProps } from '../../types'

type BooleanProps = {
  trueText?: string
  falseText?: string
  variant?: ToggleFieldProps['variant']
  size?: ToggleFieldProps['size']
  onClick?: ToggleFieldProps['onClick']
}

type SharedFieldProps = Omit<
  FieldProps<unknown>,
  'layout' | 'layoutOptions'
>

export type Props = SharedFieldProps & BooleanProps

function BooleanComponent(props: Props) {
  const { trueText, falseText, ...restProps } = props
  const translations = useTranslation().BooleanField

  return (
    <ToggleField
      {...(restProps as ToggleFieldProps)}
      valueOn={true}
      valueOff={false}
      textOn={trueText ?? translations.yes}
      textOff={falseText ?? translations.no}
      valueType="boolean"
    />
  )
}

BooleanComponent._supportsSpacingProps = true
export default BooleanComponent

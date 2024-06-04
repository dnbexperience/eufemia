import React from 'react'
import ToggleField, { Props as ToggleFieldProps } from '../Toggle'
import useTranslation from '../../hooks/useTranslation'
import { FieldHelpProps, FieldProps, Path } from '../../types'

type BooleanProps = {
  trueText?: string
  falseText?: string
  variant?: ToggleFieldProps['variant']
  dependencePaths?: never
}
type NeverBooleanProps = {
  // eslint-disable-next-line no-unused-vars
  [K in keyof Partial<Omit<BooleanProps, 'dependencePaths'>>]: never
}
export type IndeterminateProps = FieldProps<unknown> & {
  dependencePaths: Array<Path>
} & NeverBooleanProps
export type Props = FieldHelpProps & FieldProps<unknown> & BooleanProps

function BooleanComponent(props: Props | IndeterminateProps) {
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

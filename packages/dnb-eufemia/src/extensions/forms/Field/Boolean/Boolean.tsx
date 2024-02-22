import React, { useContext } from 'react'
import ToggleField, { Props as ToggleFieldProps } from '../Toggle'
import { Context } from '../../DataContext/'

export type Props = Omit<
  ToggleFieldProps,
  'valueOn' | 'valueOff' | 'textOn' | 'textOff'
> & {
  trueText?: string
  falseText?: string
}

function BooleanComponent(props: Props) {
  const context = useContext(Context)
  const { trueText, falseText, ...restProps } = props
  const translations = context.translations.boolean

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

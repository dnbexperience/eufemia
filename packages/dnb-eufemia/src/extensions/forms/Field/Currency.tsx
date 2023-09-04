import React from 'react'
import classnames from 'classnames'
import NumberComponent from './Number'
import type { ComponentProps } from '../component-types'
import type { FieldProps, FieldHelpProps } from '../field-types'

export type Props = ComponentProps &
  FieldHelpProps &
  FieldProps<number, undefined> & {
    currency?: string
  }

function Currency(props: Props) {
  const preparedProps = {
    ...props,
    currency: props.currency ?? 'NOK',
    placeholder: props.placeholder ?? 'kr',
  }

  return (
    <NumberComponent
      {...preparedProps}
      className={classnames('dnb-forms-field-currency', props.className)}
    />
  )
}

Currency._supportsEufemiaSpacingProps = true
export default Currency

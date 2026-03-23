import React from 'react'
import clsx from 'clsx'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueBooleanProps = ValueProps<boolean> & {
  trueText?: React.ReactNode
  falseText?: React.ReactNode
}

function BooleanComponent(props: ValueBooleanProps) {
  const translations = useTranslation().BooleanField
  const { value, className, trueText, falseText, ...rest } =
    useValueProps(props)

  return (
    <ValueBlock
      className={clsx('dnb-forms-value-boolean', className)}
      {...rest}
    >
      {value === true || value === false
        ? value === true
          ? trueText ?? translations.yes
          : falseText ?? translations.no
        : null}
    </ValueBlock>
  )
}

withComponentMarkers(BooleanComponent, {
  _supportsSpacingProps: true,
})

export default BooleanComponent

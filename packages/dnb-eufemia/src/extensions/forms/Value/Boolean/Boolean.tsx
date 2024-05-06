import React from 'react'
import classnames from 'classnames'
import ValueBlock from '../../ValueBlock'
import { useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import useTranslation from '../../hooks/useTranslation'

export type Props = ValueProps<boolean>

function BooleanComponent(props: Props) {
  const translations = useTranslation().BooleanField
  const { value, className, ...rest } = useValueProps(props)

  return (
    <ValueBlock
      className={classnames('dnb-forms-value-boolean', className)}
      {...rest}
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

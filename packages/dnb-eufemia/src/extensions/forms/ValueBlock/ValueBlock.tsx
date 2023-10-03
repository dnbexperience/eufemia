import React from 'react'
import { Span } from '../../../elements'
import { FormLabel } from '../../../components'
import classnames from 'classnames'
import { ValueProps } from '../types'
import { pickSpacingProps } from '../../../components/layout/utils'

export type Props = Omit<ValueProps<unknown>, 'value'> & {
  children?: React.ReactNode
}

function ValueBlock(props: Props) {
  const { className, label, inline, placeholder, showEmpty, children } =
    props
  if (
    (children === undefined || children === null || children === false) &&
    !showEmpty &&
    !placeholder
  ) {
    return null
  }

  return (
    <Span
      className={classnames(
        'dnb-forms-value',
        inline && 'dnb-forms-value-block--inline',
        className
      )}
      {...pickSpacingProps(props)}
    >
      {label && (
        <FormLabel
          className="dnb-forms-value-block__label"
          label_direction={inline ? 'horizontal' : 'vertical'}
        >
          {label}
        </FormLabel>
      )}
      {children ?? (
        <span className="dnb-forms-value-block__placeholder">
          {placeholder}
        </span>
      )}
    </Span>
  )
}

ValueBlock._supportsEufemiaSpacingProps = true
export default ValueBlock

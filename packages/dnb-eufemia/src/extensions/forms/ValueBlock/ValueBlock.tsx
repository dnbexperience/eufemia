import React, { Fragment } from 'react'
import classnames from 'classnames'
import { Dd, Dl, Dt, Span } from '../../../elements'
import { FormLabel } from '../../../components'
import SummaryListContext from '../Value/SummaryList/SummaryListContext'
import { ValueProps } from '../types'
import { pickSpacingProps } from '../../../components/flex/utils'

export type Props = Omit<ValueProps<unknown>, 'value'> & {
  children?: React.ReactNode
}

function ValueBlock(props: Props) {
  const summaryListContext = React.useContext(SummaryListContext)
  const { className, label, inline, placeholder, showEmpty, children } =
    props

  if (
    (children === undefined || children === null || children === false) &&
    !showEmpty &&
    !placeholder
  ) {
    return null
  }

  if (summaryListContext && label) {
    const Element =
      summaryListContext.layout === 'horizontal' ? Dl.Item : Fragment
    return (
      <Element>
        <Dt>{label}</Dt>
        <Dd>
          {children ?? (
            <span className="dnb-forms-value-block__placeholder">
              {placeholder}
            </span>
          )}
        </Dd>
      </Element>
    )
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
          labelDirection={inline ? 'horizontal' : 'vertical'}
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

ValueBlock._supportsSpacingProps = true
export default ValueBlock

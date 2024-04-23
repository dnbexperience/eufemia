import React, { Fragment, useContext } from 'react'
import classnames from 'classnames'
import { Dd, Dl, Dt, Span } from '../../../elements'
import { FormLabel } from '../../../components'
import SummaryListContext from '../Value/SummaryList/SummaryListContext'
import { ValueProps } from '../types'
import { pickSpacingProps } from '../../../components/flex/utils'
import ValueBlockContext from './ValueBlockContext'

export type Props = Omit<ValueProps<unknown>, 'value'> & {
  children?: React.ReactNode
  composition?: boolean
}

function ValueBlock(props: Props) {
  const summaryListContext = useContext(SummaryListContext)
  const valueBlockContext = useContext(ValueBlockContext)

  const {
    className,
    label,
    inline,
    width = 'large',
    placeholder,
    showEmpty,
    children,
    composition,
  } = props

  if (
    (children === undefined || children === null || children === false) &&
    !showEmpty &&
    !placeholder
  ) {
    return null
  }

  let content = null

  const compositionClass =
    composition !== undefined &&
    `dnb-forms-value-block__composition--${
      composition === true ? 'horizontal' : composition
    }`

  if (summaryListContext) {
    const Element =
      summaryListContext.layout === 'horizontal' ? Dl.Item : Fragment

    if (!label && valueBlockContext?.composition) {
      content = children ?? (
        <span className="dnb-forms-value-block__placeholder">
          {placeholder}
        </span>
      )
    } else {
      content = (
        <Element>
          <Dt className="dnb-forms-value-block__label">{label}</Dt>
          <Dd
            className={classnames(
              summaryListContext.layout !== 'grid' &&
                width &&
                `dnb-forms-value-block--width-${width}`,
              compositionClass
            )}
          >
            {children ?? (
              <span className="dnb-forms-value-block__placeholder">
                {placeholder}
              </span>
            )}
          </Dd>
        </Element>
      )
    }
  } else {
    content = (
      <Span
        className={classnames(
          'dnb-forms-value-block',
          inline && 'dnb-forms-value-block--inline',
          width && `dnb-forms-value-block--width-${width}`,
          compositionClass,
          className
        )}
        {...pickSpacingProps(props)}
      >
        {label && (
          <FormLabel
            element="span"
            className="dnb-forms-value-block__label"
            labelDirection={inline ? 'horizontal' : 'vertical'}
          >
            {label}
          </FormLabel>
        )}
        {children ? (
          <span className="dnb-forms-value-block__content">
            {children}
          </span>
        ) : (
          <span className="dnb-forms-value-block__placeholder">
            {placeholder}
          </span>
        )}
      </Span>
    )
  }

  return (
    <ValueBlockContext.Provider value={props}>
      {content}
    </ValueBlockContext.Provider>
  )
}

ValueBlock._supportsSpacingProps = true
export default ValueBlock

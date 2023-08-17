import React from 'react'
import { Checkbox } from '../../../components'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import Option from './Option'
import FieldBlock from '../FieldBlock'
import { useField } from './hooks'
import type { ComponentProps } from '../component-types'
import type { FieldProps } from '../field-types'

export type Props = ComponentProps &
  FieldProps<Array<string | number>> & {
    children?: React.ReactNode
    variant?: 'checkbox'
  }

function ArraySelection(props: Props) {
  const {
    className,
    variant,
    layout,
    label,
    labelDescription,
    labelSecondary,
    value,
    error,
    info,
    warning,
    disabled,
    emptyValue,
    onChange,
    children,
  } = useField(props)

  const options = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Option
  ) as React.ReactElement[]

  switch (variant) {
    default:
    case 'checkbox':
      return (
        <FieldBlock
          className={classnames('dnb-forms-field-string', className)}
          layout={layout}
          label={label}
          labelDescription={labelDescription}
          labelSecondary={labelSecondary}
          info={info}
          warning={warning}
          error={error}
          {...forwardSpaceProps(props)}
        >
          {options.map((child, i) => (
            <React.Fragment key={child.props.value ?? `option-${i}`}>
              <Checkbox
                label={child.props.title ?? child.props.children}
                checked={
                  child.props.value && value?.includes(child.props.value)
                }
                top={i > 0 ? 'x-small' : undefined}
                disabled={disabled}
                onChange={() => {
                  const clickedValue = child.props.value

                  if (clickedValue === undefined) {
                    onChange?.(emptyValue)
                  }

                  const newValue = value?.includes(clickedValue)
                    ? value.filter((value) => value !== clickedValue)
                    : [...(value ?? []), clickedValue]

                  onChange?.(newValue.length === 0 ? emptyValue : newValue)
                }}
              />
              <br />
            </React.Fragment>
          ))}
        </FieldBlock>
      )
  }
}

ArraySelection._supportsEufemiaSpacingProps = true
export default ArraySelection

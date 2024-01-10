import React, { useMemo } from 'react'
import { Checkbox, Button } from '../../../../components'
import ButtonRow from '../../Form/ButtonRow'
import classnames from 'classnames'
import Option from '../Option'
import FieldBlock from '../../FieldBlock'
import { useDataValue } from '../../hooks'
import { FieldProps } from '../../types'
import { pickSpacingProps } from '../../../../components/flex/utils'

interface IOption {
  title: string
  value: number | string
  handleSelect: () => void
}

export type Props = FieldProps<Array<string | number>> & {
  children?: React.ReactNode
  variant?: 'checkbox' | 'button'
  optionsLayout?: 'horizontal' | 'vertical'
}

function ArraySelection(props: Props) {
  const {
    id,
    className,
    variant = 'checkbox',
    layout = 'vertical',
    optionsLayout = 'vertical',
    label,
    value,
    error,
    info,
    warning,
    disabled,
    emptyValue,
    handleChange,
    children,
  } = useDataValue(props)

  const fieldBlockProps = {
    forId: id,
    className: classnames(
      'dnb-forms-field-array-selection',
      `dnb-forms-field-array-selection--options-layout-${optionsLayout}`,
      className
    ),
    contentClassName: 'dnb-forms-field-array-selection__options',
    info,
    warning,
    error,
    layout,
    label,
    ...pickSpacingProps(props),
  }

  const options: IOption[] = useMemo(
    () =>
      React.Children.toArray(children)
        .filter(
          (child) => React.isValidElement(child) && child.type === Option
        )
        .map((option: React.ReactElement) => ({
          title: option.props.title ?? option.props.children,
          value: option.props.value,
          handleSelect: () => {
            const selected = option.props.value

            const newValue = value?.includes(selected)
              ? value.filter((value) => value !== selected)
              : [...(value ?? []), selected]

            handleChange?.(newValue.length === 0 ? emptyValue : newValue)
          },
        })),
    [children, value, emptyValue, handleChange]
  )

  switch (variant) {
    case 'button':
      return (
        <FieldBlock {...fieldBlockProps}>
          <ButtonRow>
            {options.map((option, i) => (
              <Button
                key={`option-${i}-${option.value}`}
                id={id}
                text={option.title}
                on_click={option.handleSelect}
                variant={
                  value?.includes(option.value) ? undefined : 'secondary'
                }
                status={error ? 'error' : undefined}
                disabled={disabled}
              />
            ))}
          </ButtonRow>
        </FieldBlock>
      )
    case 'checkbox':
      return (
        <FieldBlock {...fieldBlockProps}>
          {options.map((option, i) => (
            <Checkbox
              key={`option-${i}-${option.value}`}
              className="dnb-forms-field-array-selection__checkbox"
              label={option.title}
              checked={value?.includes(option.value)}
              disabled={disabled}
              on_change={option.handleSelect}
            />
          ))}
        </FieldBlock>
      )
  }
}

ArraySelection._supportsSpacingProps = true
export default ArraySelection

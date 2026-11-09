import { useContext, useState } from 'react'
import { clsx } from 'clsx'
import Context from '../../shared/Context'
import {
  combineDescribedBy,
  extendPropsWithContext,
  getStatusState,
  validateDOMAttributes,
} from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import useId from '../../shared/helpers/useId'
import Flex from '../Flex'
import Space from '../Space'
import FormLabel from '../FormLabel'
import FormStatus from '../FormStatus'
import Suffix from '../../shared/helpers/Suffix'
import RadioGroupContext from '../radio/RadioGroupContext'
import ChipGroupContext from './ChipGroupContext'
import type { ChipChangeEvent, ChipGroupProps } from './types'

function ChipGroup(localProps: ChipGroupProps) {
  const context = useContext(Context)
  const props = extendPropsWithContext(
    localProps,
    {},
    { skeleton: context.skeleton },
    pickFormElementProps(context.formElement),
    context.ChipGroup
  )
  const {
    id: idProp,
    name: nameProp,
    label,
    labelDirection = 'vertical',
    labelSrOnly,
    vertical,
    layoutDirection = 'row',
    variant = 'default',
    size,
    selectionMode = 'single',
    disabled,
    readOnly,
    skeleton,
    value: valueProp,
    values: valuesProp,
    onChange,
    status,
    statusState = 'error',
    statusProps,
    statusNoAnimation,
    globalStatus,
    suffix,
    attributes,
    className,
    children,
    'aria-describedby': describedByProp,
    'aria-label': ariaLabel,
    'aria-labelledby': labelledBy,
    ...rest
  } = props
  const id = useId(idProp)
  const name = nameProp ?? id
  const [value, setValue] = useState(valueProp)
  const [values, setValues] = useState(valuesProp ?? [])
  const [previousValue, setPreviousValue] = useState(valueProp)
  const [previousValues, setPreviousValues] = useState(valuesProp)

  if (valueProp !== previousValue) {
    setPreviousValue(valueProp)
    setValue(valueProp)
  }
  if (valuesProp !== previousValues) {
    setPreviousValues(valuesProp)
    setValues(valuesProp ?? [])
  }

  const multipleSelection = selectionMode === 'multiple'
  const showStatus = getStatusState(status)
  const invalid = Boolean(showStatus && statusState === 'error')
  const describedBy = combineDescribedBy(
    describedByProp,
    showStatus ? `${id}-status` : undefined,
    suffix ? `${id}-suffix` : undefined
  )

  const handleChange = (change: ChipChangeEvent) => {
    const nextValues = multipleSelection
      ? change.checked
        ? Array.from(new Set([...values, change.value]))
        : values.filter((value) => value !== change.value)
      : [change.value]

    setValue(change.value)
    setValues(nextValues)
    onChange?.({ ...change, values: nextValues })
  }

  const Fieldset = label ? 'fieldset' : 'div'
  const fieldsetProps = {
    'aria-labelledby': label ? `${id}-label` : labelledBy,
    'aria-label': ariaLabel,
    'aria-describedby': describedBy,
  }
  validateDOMAttributes({ attributes }, fieldsetProps)

  return (
    <ChipGroupContext
      value={{
        name,
        value,
        values,
        variant,
        size,
        selectionMode,
        disabled,
        readOnly,
        skeleton,
        invalid,
        describedBy,
        onChange: handleChange,
      }}
    >
      <RadioGroupContext
        value={
          multipleSelection
            ? {}
            : value === undefined
              ? { name }
              : { name, value: String(value) }
        }
      >
        <Space
          {...rest}
          id={id}
          className={clsx('dnb-chip-group', className)}
        >
          <Fieldset
            className="dnb-chip-group__fieldset"
            role={multipleSelection ? 'group' : 'radiogroup'}
            {...fieldsetProps}
          >
            <Flex.Container
              layoutEngine="css"
              direction={
                vertical || labelDirection === 'vertical'
                  ? 'vertical'
                  : 'horizontal'
              }
              gap="small"
            >
              {label && (
                <FormLabel
                  element="legend"
                  id={`${id}-label`}
                  srOnly={labelSrOnly}
                  vertical={false}
                >
                  {label}
                </FormLabel>
              )}
              <Flex.Stack gap="x-small">
                <Flex.Container
                  layoutEngine="css"
                  direction={
                    vertical || layoutDirection === 'column'
                      ? 'vertical'
                      : 'horizontal'
                  }
                  gap="x-small"
                >
                  {children}
                </Flex.Container>
                {suffix && (
                  <Suffix
                    className="dnb-chip-group__suffix"
                    id={`${id}-suffix`}
                    context={props}
                    skeleton={skeleton}
                  >
                    {suffix}
                  </Suffix>
                )}
                <FormStatus
                  show={showStatus}
                  id={`${id}-form-status`}
                  textId={`${id}-status`}
                  label={label}
                  text={status}
                  state={statusState}
                  globalStatus={globalStatus}
                  noAnimation={statusNoAnimation}
                  skeleton={skeleton}
                  {...statusProps}
                />
              </Flex.Stack>
            </Flex.Container>
          </Fieldset>
        </Space>
      </RadioGroupContext>
    </ChipGroupContext>
  )
}

export default ChipGroup

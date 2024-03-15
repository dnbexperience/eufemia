import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Field,
  FieldBlock,
  Form,
  JSONSchema,
  useFieldProps,
} from '@dnb/eufemia/src/extensions/forms'
import { Flex, Slider } from '@dnb/eufemia/src'

export const CustomComponentExample = () => {
  return (
    <ComponentBox scope={{ useFieldProps, FieldBlock }}>
      {() => {
        const MySliderComponent = (props) => {
          const fromInput = React.useCallback(
            (event) =>
              typeof event === 'number' ? event : event?.value || 0,
            [],
          )

          const errorMessages = React.useMemo(
            () => ({
              required: 'This field is required',
              ...props.errorMessages,
            }),
            [props.errorMessages],
          )
          const schema = React.useMemo<JSONSchema>(
            () =>
              props.schema ?? {
                type: 'number',
                minimum: props.minimum,
                maximum: props.maximum,
              },
            [props.schema, props.minimum, props.maximum],
          )

          const preparedProps = {
            fromInput,
            schema,
            ...errorMessages,
            label: 'Label',
            ...props,
          }

          const {
            id,
            label,
            info,
            warning,
            error,
            value,
            width = 'medium',
            minimum = 0,
            maximum = 100,
            step = 1,
            handleChange,
            handleFocus,
            handleBlur,
          } = useFieldProps(preparedProps)

          const steps = { minimum, maximum, step }

          return (
            <FieldBlock
              forId={id}
              label={label}
              info={info}
              warning={warning}
              error={error}
              width={width}
            >
              <Flex.Stack>
                <Field.Number
                  value={value}
                  showStepControls
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  {...steps}
                />
                <Slider
                  id={id}
                  value={value}
                  onChange={handleChange}
                  onDragStart={handleFocus}
                  onDragEnd={handleBlur}
                  {...steps}
                />
              </Flex.Stack>
            </FieldBlock>
          )
        }

        return (
          <Form.Handler data={{ sliderValue: 50 }}>
            <MySliderComponent
              path="/sliderValue"
              minimum={50}
              maximum={80}
              required
              info="Info"
            />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

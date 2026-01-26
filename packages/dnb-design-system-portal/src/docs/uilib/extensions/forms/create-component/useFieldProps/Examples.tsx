import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Field,
  FieldBlock,
  Form,
  useFieldProps,
  z,
  makeAjvInstance,
} from '@dnb/eufemia/src/extensions/forms'
import { Flex, Slider } from '@dnb/eufemia/src'

export const CustomComponentWithAjvSchemaExample = () => {
  return (
    <ComponentBox scope={{ useFieldProps }}>
      {() => {
        const MySliderComponent = (props) => {
          const fromInput = React.useCallback(
            (event) =>
              typeof event === 'number' ? event : event?.value || 0,
            []
          )

          const errorMessages = React.useMemo(() => {
            return {
              'Field.errorRequired': 'This field is required',
              ...props.errorMessages,
            }
          }, [props.errorMessages])

          // No schema - uses built-in validation from field props
          const schema = props.schema ?? {
            type: 'number',
            minimum: props.minimum,
            maximum: props.maximum,
          }

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
                  id={id}
                  value={value}
                  showStepControls
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  {...steps}
                />
                <Slider
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

export const CustomComponentWithZodSchemaExample = () => {
  return (
    <ComponentBox scope={{ useFieldProps, z }}>
      {() => {
        const MySliderComponent = (props) => {
          const fromInput = React.useCallback(
            (event) =>
              typeof event === 'number' ? event : event?.value || 0,
            []
          )

          const errorMessages = React.useMemo(() => {
            return {
              'Field.errorRequired': 'This field is required',
              ...props.errorMessages,
            }
          }, [props.errorMessages])

          // Preferred: Use Zod schemas when possible
          // They work out of the box and provide better TypeScript integration
          const schema =
            props.schema ??
            z
              .number()
              .min(props.minimum || 0)
              .max(props.maximum || 100)

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
                  id={id}
                  value={value}
                  showStepControls
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  {...steps}
                />
                <Slider
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

        // Example with Zod schema (preferred)
        // Note: You can pass a Zod schema via props.schema and it will work without AJV
        // The component now uses a Zod schema by default: z.number().min(50).max(80)
        return (
          <Form.Handler data={{ sliderValue: 50 }}>
            <MySliderComponent
              path="/sliderValue"
              minimum={50}
              maximum={80}
              required
              info="Info"
              // You can override with a custom Zod schema if needed
              // Example: schema={z.number().min(40).max(90).refine(val => val > 60, 'Value must be greater than 60')}
            />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const CustomComponentWithJsonSchema = () => {
  return (
    <ComponentBox scope={{ useFieldProps, makeAjvInstance }}>
      {() => {
        const MySliderComponent = (props) => {
          const fromInput = React.useCallback(
            (event) =>
              typeof event === 'number' ? event : event?.value || 0,
            []
          )

          const errorMessages = React.useMemo(() => {
            return {
              'Field.errorRequired': 'This field is required',
              ...props.errorMessages,
            }
          }, [props.errorMessages])

          // This approach requires explicitly providing ajvInstance to Form.Handler
          const schema = props.schema ?? {
            type: 'number',
            minimum: props.minimum,
            maximum: props.maximum,
          }

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
                  id={id}
                  value={value}
                  showStepControls
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  {...steps}
                />
                <Slider
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

        // Note: When using JSON Schema, you must provide ajvInstance to Form.Handler
        const ajv = makeAjvInstance()
        return (
          <Form.Handler data={{ sliderValue: 50 }} ajvInstance={ajv}>
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

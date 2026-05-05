import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{t as i}from"./ajv-UNqCcmpQ.js";import{Rr as a,j as o,tt as s}from"./index-CMgyXmp3.js";var c=e({CustomComponentWithAjvSchemaExample:()=>u,CustomComponentWithJsonSchema:()=>f,CustomComponentWithZodSchemaExample:()=>d});t();var l=n(),u=()=>(0,l.jsx)(r,{scope:{useFieldProps:o},noInline:!0,children:`const MySliderComponent = (props) => {
  const fromInput = React.useCallback(
    (event) => (typeof event === 'number' ? event : event?.value || 0),
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
  const steps = {
    minimum,
    maximum,
    step,
  }
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
render(
  <Form.Handler
    data={{
      sliderValue: 50,
    }}
  >
    <MySliderComponent
      path="/sliderValue"
      minimum={50}
      maximum={80}
      required
      info="Info"
    />
  </Form.Handler>
)
`}),d=()=>(0,l.jsx)(r,{scope:{useFieldProps:o,z:s},noInline:!0,children:`const MySliderComponent = (props) => {
  const fromInput = React.useCallback(
    (event) => (typeof event === 'number' ? event : event?.value || 0),
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
  const steps = {
    minimum,
    maximum,
    step,
  }
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
// Example with Zod schema (preferred)
// Note: You can pass a Zod schema via props.schema and it will work without AJV
// The component now uses a Zod schema by default: z.number().min(50).max(80)
render(
  <Form.Handler
    data={{
      sliderValue: 50,
    }}
  >
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
`}),f=()=>(0,l.jsx)(r,{scope:{useFieldProps:o,makeAjvInstance:i},noInline:!0,children:`const MySliderComponent = (props) => {
  const fromInput = React.useCallback(
    (event) => (typeof event === 'number' ? event : event?.value || 0),
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
  const steps = {
    minimum,
    maximum,
    step,
  }
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
render(
  <Form.Handler
    data={{
      sliderValue: 50,
    }}
    ajvInstance={ajv}
  >
    <MySliderComponent
      path="/sliderValue"
      minimum={50}
      maximum={80}
      required
      info="Info"
    />
  </Form.Handler>
)
`});function p(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...a(),...e.components};return c||h(`Examples`,!1),u||h(`Examples.CustomComponentWithAjvSchemaExample`,!0),d||h(`Examples.CustomComponentWithZodSchemaExample`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.p,{children:`On the consumer side, we can use this custom component like so:`}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-jsx`,children:`<Form.Handler data={{ sliderValue: 50 }}>
  <MySliderComponent
    path="/sliderValue"
    minimum={50}
    maximum={80}
    required
    info="Info"
  />
</Form.Handler>
`})}),`
`,(0,l.jsx)(t.h3,{children:`Using a Zod schema`}),`
`,(0,l.jsx)(t.p,{children:`It is recommended to use Zod schemas instead of JSON Schemas, as they provide better TypeScript integration.`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Using an Ajv schema`}),`
`,(0,l.jsx)(u,{})]})}function m(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
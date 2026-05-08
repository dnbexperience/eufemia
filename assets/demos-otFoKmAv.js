import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{t as r}from"./ajv-vuuxEh2r.js";import{Lr as i,T as a,Y as o}from"./index--zEB_f_m.js";var s=e({CustomComponentWithAjvSchemaExample:()=>l,CustomComponentWithJsonSchema:()=>d,CustomComponentWithZodSchemaExample:()=>u}),c=t(),l=()=>(0,c.jsx)(n,{scope:{useFieldProps:a},noInline:!0,children:`const MySliderComponent = (props) => {
  const fromInput = useCallback(
    (event) => (typeof event === 'number' ? event : event?.value || 0),
    []
  )
  const errorMessages = useMemo(() => {
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
`}),u=()=>(0,c.jsx)(n,{scope:{useFieldProps:a,z:o},noInline:!0,children:`const MySliderComponent = (props) => {
  const fromInput = useCallback(
    (event) => (typeof event === 'number' ? event : event?.value || 0),
    []
  )
  const errorMessages = useMemo(() => {
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
`}),d=()=>(0,c.jsx)(n,{scope:{useFieldProps:a,makeAjvInstance:r},noInline:!0,children:`const MySliderComponent = (props) => {
  const fromInput = useCallback(
    (event) => (typeof event === 'number' ? event : event?.value || 0),
    []
  )
  const errorMessages = useMemo(() => {
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
`});function f(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,...i(),...e.components};return s||m(`Examples`,!1),l||m(`Examples.CustomComponentWithAjvSchemaExample`,!0),u||m(`Examples.CustomComponentWithZodSchemaExample`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.p,{children:`On the consumer side, we can use this custom component like so:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`<Form.Handler data={{ sliderValue: 50 }}>
  <MySliderComponent
    path="/sliderValue"
    minimum={50}
    maximum={80}
    required
    info="Info"
  />
</Form.Handler>
`})}),`
`,(0,c.jsx)(t.h3,{children:`Using a Zod schema`}),`
`,(0,c.jsx)(t.p,{children:`It is recommended to use Zod schemas instead of JSON Schemas, as they provide better TypeScript integration.`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Using an Ajv schema`}),`
`,(0,c.jsx)(l,{})]})}function p(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
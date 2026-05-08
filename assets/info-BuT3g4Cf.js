import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";var n=e();function r(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Import`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { useFieldProps } from '@dnb/eufemia/extensions/forms'
// Use useFieldProps
`})}),`
`,(0,n.jsx)(r.h2,{children:`Description`}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`useFieldProps`}),` hook standardizes handling of the value flow for a single consumer component representing one data point. It holds error state, hides it while the field is in focus, connects to surrounding `,(0,n.jsx)(r.code,{children:`DataContext`}),` (if present), and handles other things that all field or value components need to do. By implementing custom field or value components and passing the received properties through `,(0,n.jsx)(r.code,{children:`useFieldProps`}),`, all these features work the same way as other field or value components, and you only need to implement the specific unique features of that component.`]}),`
`,(0,n.jsx)(r.h2,{children:`Relevant links`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/hooks/useFieldProps.tsx`,children:`Source code`})}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/create-component/useFieldProps`,children:`Docs code`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`How to use`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { useFieldProps } from '@dnb/eufemia/extensions/forms'

const MyFieldComponent = (props) => {
  const { value, ...rest } = useFieldProps(props)
  return <Input value={value} {...rest} />
}

render(<MyFieldComponent path="/dataSelector" />)
`})}),`
`,(0,n.jsx)(r.p,{children:`Advanced usage:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Form, useFieldProps } from '@dnb/eufemia/extensions/forms'

const MyFieldComponent = (props) => {
  const translations = Form.useTranslation().MyField

  const errorMessages = React.useMemo(() => {
    return {
      // My default error messages
      'Field.errorRequired': translations.myErrorMessage,
      'MyCustom.message': translations.myCustomErrorMessage,
      ...props.errorMessages,
    }
  }, [props.errorMessages])

  const preparedProps = {
    errorMessages,
    // Your component props
    ...props,
  }

  const {
    // Return Parameters:
    value,
    handleChange,
    handleFocus,
    handleBlur,
    htmlAttributes,

    // Component Properties
    ...rest
  } = useFieldProps(preparedProps)

  return (
    <Input
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...htmlAttributes}
      {...rest}
    />
  )
}
`})}),`
`,(0,n.jsx)(r.h3,{children:`Internal Properties`}),`
`,(0,n.jsx)(r.p,{children:`All properties are optional and can be used as needed. These properties can be provided as part of your component properties.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`value`}),` the input value (string).`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`emptyValue`}),` defines what value is considered to be empty. Defaults to `,(0,n.jsx)(r.code,{children:`undefined`}),`. But an empty string is also validated when required is true.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`path`}),` the JSON pointer that defines the entry name/key in the data structure.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`itemPath`}),` similar to `,(0,n.jsx)(r.code,{children:`path`}),`, but is used when run inside the `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`}),` context.`]}),`
`]}),`
`,(0,n.jsx)(r.h4,{children:`Validation`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`required`}),`—if true, it will call `,(0,n.jsx)(r.code,{children:`validateRequired`}),` for validation.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`schema`}),` or `,(0,n.jsx)(r.code,{children:`pattern`}),`—for JSON schema validation powered by `,(0,n.jsx)(r.a,{href:`https://ajv.js.org/`,children:`ajv`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`onChangeValidator`}),`—your custom validation function. It will run on every keystroke. Can be an async function. Use it together with `,(0,n.jsx)(r.a,{href:`/uilib/helpers/functions/#debounce`,children:`debounceAsync`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`onBlurValidator`}),`—your custom validation function. It will run on a `,(0,n.jsx)(r.code,{children:`handleBlur()`}),` call. Use it over `,(0,n.jsx)(r.code,{children:`onChangeValidator`}),` for validations with side-effects. Can be an async function.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`validateRequired`}),`—allows you to provide custom logic for how the `,(0,n.jsx)(r.code,{children:`required`}),` property should validate. See example below.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`validateInitially`}),`—in order to show an error without a change and blur event. Used for rare cases.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`validateUnchanged`}),`—in order to validate without a change and blur event. Used for rare cases.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`validateContinuously`}),`—in order to validate without a focus event beforehand. Used for rare cases.`]}),`
`]}),`
`,(0,n.jsx)(r.h4,{children:`Validators`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`exportValidators`}),` object with your validators you want to export. More info down below.`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Many Field components also export a `,(0,n.jsx)(r.code,{children:`<FieldName>Validator`}),` type describing exactly what keys are available on `,(0,n.jsx)(r.code,{children:`validators`}),`. Import the type from the corresponding Field (for example `,(0,n.jsx)(r.code,{children:`DateValidator`}),` from `,(0,n.jsx)(r.code,{children:`@dnb/eufemia/extensions/forms/Field/Date`}),`) and cast the `,(0,n.jsx)(r.code,{children:`validators`}),` argument to it before destructuring so TypeScript can narrow the object.`]}),`
`,(0,n.jsxs)(r.p,{children:[`For more advanced use cases, you can export your custom Field validators with `,(0,n.jsx)(r.code,{children:`exportValidators`}),`. They are then available (as `,(0,n.jsx)(r.code,{children:`validators`}),` in object of the second validator parameter) to be used in the validator.`]}),`
`,(0,n.jsx)(r.p,{children:`When an array is returned from the validator, it will be used to only call these validators (in the order they are returned).
If no array is returned, the internal validator will be called in addition.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`const MyField = (props) => {
  const myInternalValidator = useCallback(() => {
    if (value === 'fail now') {
      return new Error('Internal validation error')
    }
  }, [])
  return (
    <Field.String exportValidators={{ myInternalValidator }} {...props} />
  )
}

const myValidator = (value, { validators: { myInternalValidator } }) => {
  if (value === 'fail') {
    return new Error('My error')
  }

  return [myInternalValidator] // optional
}

render(<MyField onBlurValidator={myValidator} />)
`})}),`
`,(0,n.jsx)(r.h4,{children:`Error`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`error`}),`—like `,(0,n.jsx)(r.code,{children:`new Error()`}),` or `,(0,n.jsx)(r.code,{children:`new FormError()`}),` that includes a message to display. More info below.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`errorMessages`}),`—object with your custom messages or translation keys, such as `,(0,n.jsx)(r.code,{children:`'Field.errorRequired'`}),`. More info below.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Return Parameters`}),`
`,(0,n.jsx)(r.p,{children:`It returns all of the given component properties, in addition to these:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`value`}),` the output value.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`id`}),` creates a memorized id.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`dataContext`}),` the internal shared data context.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`error`}),` the error object, in case an error is invoked. Will skip returning the error object, if the hook is used in a nested `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`hasError`}),` will return true in case of an error, even if the hook is nested in a `,(0,n.jsx)(r.code,{children:`FieldBlock`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`htmlAttributes`}),` object that include needed HTML (e.g. aria-_ or data-_) attributes, ready to be spread on form elements. It includes in addition internal aria attributes such as `,(0,n.jsx)(r.code,{children:`aria-invalid`}),`, `,(0,n.jsx)(r.code,{children:`aria-required`}),` and `,(0,n.jsx)(r.code,{children:`aria-describedby`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`isChanged`}),` returns `,(0,n.jsx)(r.code,{children:`true`}),` if the value has changed with e.g. `,(0,n.jsx)(r.code,{children:`handleChange`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`setHasFocus`}),` accepts a boolean as value. When called, it will update the internal logic - for event handling and validation. Will re-render the React Hook and its outer component.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`onFocus`}),` event handler to assign to a form element.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`onBlur`}),` event handler to assign to a form element.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`onChange`}),` event handler to assign to a form element. When an `,(0,n.jsx)(r.code,{children:`async`}),` function is used, it will set the `,(0,n.jsx)(r.code,{children:`fieldState`}),` to pending. The corresponding `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` will show an indicator on the field label.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Custom validateRequired`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`const validateRequired = (value, { emptyValue, required, isChanged }) => {
  if (required && value === emptyValue) {
    return new FormError('Field.errorRequired')
  }
}

const { error, hasError } = useFieldProps({
  value: undefined,
  required: true,
  validateInitially: true,
  validateRequired,
  errorMessages: {
    'Field.errorRequired': 'Show this when "required" fails.',
  },
})
`})}),`
`,(0,n.jsx)(r.h4,{children:`Validation order`}),`
`,(0,n.jsx)(r.p,{children:`During validation, the different APIs do have a prioritization order and will stop processing further when they match:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`required`}),` property`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`schema`}),` property (including `,(0,n.jsx)(r.code,{children:`pattern`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`onChangeValidator`}),` property`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`onBlurValidator`}),` property`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Error handling`}),`
`,(0,n.jsx)(r.p,{children:`Validation and error-handling are tightly coupled together. When a validation fails, you may use the error-object to handle and show the failures/statuses:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`render(
  <Field.String
    label="Label"
    error={new Error('This is what is wrong...')}
  />
)
`})}),`
`,(0,n.jsxs)(r.p,{children:[`But when you handle errors via `,(0,n.jsx)(r.code,{children:`useFieldProps`}),`, you may rather provide an object with messages, which will be used to display the error:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`const { error, hasError } = useFieldProps({
  required: true,
  errorMessages: {
    'Field.errorRequired': 'Show this when "required" fails!',
  },
  ...componentProps,
})
`})}),`
`,(0,n.jsxs)(r.p,{children:[`To re-use existing `,(0,n.jsx)(r.code,{children:`errorMessages`}),`, you can use the `,(0,n.jsx)(r.code,{children:`FormError`}),` constructor as well:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`import { FormError } from '@dnb/eufemia/extensions/forms'

// Will show the message from the errorMessages
new FormError('Field.errorRequired')
`})}),`
`,(0,n.jsxs)(r.p,{children:[`In order to invoke an error without a change and blur event, you can use `,(0,n.jsx)(r.code,{children:`validateInitially`}),`:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`const { error, hasError } = useFieldProps({
  value: undefined,
  required: true,
  validateInitially: true,
  errorMessages: {
    'Field.errorRequired': 'Show this when "required" fails!',
  },
})
`})}),`
`,(0,n.jsx)(r.h3,{children:`Event handlers`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`handleFocus()`}),` to call the `,(0,n.jsx)(r.code,{children:`onFocus`}),` event.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`handleBlur()`}),` to call the `,(0,n.jsx)(r.code,{children:`onBlur`}),` event.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`handleChange(value)`}),` to call the `,(0,n.jsx)(r.code,{children:`onChange`}),` event. Will update/change the internal value and re-render the React Hook, so will the outer component too.`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-ts`,children:`handleChange(value, (additionalArgs = null))
`})}),`
`,(0,n.jsxs)(r.p,{children:[`When `,(0,n.jsx)(r.code,{children:`additionalArgs`}),` is provided, it will be passed to the `,(0,n.jsx)(r.code,{children:`onChange`}),`, `,(0,n.jsx)(r.code,{children:`onFocus`}),` or `,(0,n.jsx)(r.code,{children:`onBlur`}),` events as the second argument. It will be merged with the internal `,(0,n.jsx)(r.code,{children:`additionalArgs`}),`, which includes `,(0,n.jsx)(r.code,{children:`props`}),` (including all of the given properties), `,(0,n.jsx)(r.code,{children:`getValueByPath`}),` and `,(0,n.jsx)(r.code,{children:`getSourceValue`}),`.`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`updateValue(value)`}),` to update/change the internal value, without calling any events.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`forceUpdate()`}),` to re-render the React Hook along with the outer component.`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Value transformers`}),`
`,(0,n.jsx)(r.p,{children:`The transformers are hooks to transform the value on different stages.`}),`
`,(0,n.jsxs)(r.p,{children:[`They should return a transformed value: `,(0,n.jsx)(r.code,{children:`(value) => value`})]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`toInput`}),` transforms the value before it is returned. This applies whether the original source of the value is the value property or the data context.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`fromInput`}),` transforms the value given by `,(0,n.jsx)(r.code,{children:`handleChange`}),` before it is used in the further process flow. Use it to destruct the value from the original event object.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`toEvent`}),` transforms the internal value before it gets returned by even callbacks such as `,(0,n.jsx)(r.code,{children:`onChange`}),`, `,(0,n.jsx)(r.code,{children:`onFocus`}),` and `,(0,n.jsx)(r.code,{children:`onBlur`}),`. The second parameter returns the event type: `,(0,n.jsx)(r.code,{children:`onChange`}),`, `,(0,n.jsx)(r.code,{children:`onFocus`}),`, `,(0,n.jsx)(r.code,{children:`onBlur`}),` or `,(0,n.jsx)(r.code,{children:`onBlurValidator`}),`.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`fromExternal`}),` transforms the provided `,(0,n.jsx)(r.code,{children:`value`}),` property before any other operations are performed.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`transformValue`}),` transforms the value given by `,(0,n.jsx)(r.code,{children:`handleChange`}),` after `,(0,n.jsx)(r.code,{children:`fromInput`}),` and before `,(0,n.jsx)(r.code,{children:`updateValue`}),` and `,(0,n.jsx)(r.code,{children:`toEvent`}),`. The second parameter returns the current value.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`provideAdditionalArgs`}),` provide a function that can be called by the field to provide additional parameters, so events (`,(0,n.jsx)(r.code,{children:`onFocus`}),`, `,(0,n.jsx)(r.code,{children:`onBlur`}),` and `,(0,n.jsx)(r.code,{children:`onChange`}),`) and transformers (`,(0,n.jsx)(r.code,{children:`transformOut`}),`) get an additional parameter when transforming the value.`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`In addition there are `,(0,n.jsx)(r.strong,{children:`field value transformers`}),` which should be used outside of the field component (by the field consumer):`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`transformIn`}),` transforms the `,(0,n.jsx)(r.code,{children:`value`}),` before it's displayed in the field (e.g. input).`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`transformOut`}),` transforms the value before it gets forwarded to the form data object or returned as the onChange value parameter.`]}),`
`]}),`
`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};
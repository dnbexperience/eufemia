import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import{i as r,n as i,r as a}from"./Examples-BviLtI2X.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{children:`Create your own component`}),`
`,(0,o.jsx)(t.p,{children:`Eufemia Forms contains helper fields and tools so you can declaratively create interactive form components that flawlessly integrates between existing data and your custom form components.`}),`
`,(0,o.jsxs)(t.p,{children:[`By using the building blocks for value and field components, you save development time, and at the same time ensure that local, custom components work similarly, and fit into the setup with the standardized base `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Value/#base-components`,children:`value components`}),` and base `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/`,children:`field components`}),`.`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Table of Contents`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`#value-components`,children:`Value components`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`#field-components`,children:`Field components`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`#layout`,children:`Layout`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`#localization-and-translations`,children:`Localization and translations`})}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Value components`}),`
`,(0,o.jsxs)(t.p,{children:[`For creating a `,(0,o.jsx)(t.code,{children:`Value.*`}),` component you can use `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/ValueBlock/`,children:`ValueBlock`}),` and `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useValueProps/`,children:`useValueProps`}),`:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { ValueBlock, useValueProps } from '@dnb/eufemia/extensions/forms'

const MyValue = (props) => {
  const { value, ...rest } = useValueProps(props)
  return <ValueBlock {...rest}>{value}</ValueBlock>
}

render(<MyValue path="/dataSelector" />)
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/ValueBlock/`,children:`ValueBlock`}),` provides a standardized way to display labels and other surrounding elements in a consistent manner.`]}),`
`,(0,o.jsx)(a,{}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`useValueProps`}),` provides a standardized way to handle data flow in a consistent manner. It also keeps custom value components reactive with path-scoped form updates. If rendered output depends on additional form data paths, use Forms APIs such as `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useDataValue/`,children:`Form.useDataValue`}),` or compose with another value component. Use `,(0,o.jsx)(t.code,{children:`Form.useDataWithoutSubscription().getValue('/other/path')`}),` only for non-subscribing imperative reads in callbacks, effects or internal handlers. Avoid reading `,(0,o.jsx)(t.code,{children:`DataContext.data`}),` or `,(0,o.jsx)(t.code,{children:`internalDataRef.current`}),` directly during render, because that does not create a data subscription.`]}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`FieldBlock`}),` provides a standardized way to display a label and other surrounding elements in a consistent manner.`]}),`
`,(0,o.jsx)(t.h2,{children:`Field components`}),`
`,(0,o.jsxs)(t.p,{children:[`For creating a `,(0,o.jsx)(t.code,{children:`Field.*`}),` component, you can use `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` and `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),`:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { FieldBlock, useFieldProps } from '@dnb/eufemia/extensions/forms'

const MyField = (props) => {
  const {
    id,
    value,
    handleChange,
    handleFocus,
    handleBlur,
    htmlAttributes,
  } = useFieldProps(props)

  return (
    <FieldBlock
      forId={id}
      id={id} // If your field component does not support the HTML "for" attribute, you can use the "id" property instead of "forId".
    >
      <input
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

render(<MyField label="Label text" path="/dataSelector" />)
`})}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`useFieldProps`}),` provides a standardized way to handle data flow, validation and error messages in a consistent manner. It also keeps custom field components reactive with path-scoped form updates. If rendered output depends on additional form data paths, use Forms APIs such as `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useDataValue/`,children:`Form.useDataValue`}),` or compose with another field or value component. Use `,(0,o.jsx)(t.code,{children:`Form.useDataWithoutSubscription().getValue('/other/path')`}),` only for non-subscribing imperative reads in callbacks, effects or internal handlers. Avoid reading `,(0,o.jsx)(t.code,{children:`DataContext.data`}),` or `,(0,o.jsx)(t.code,{children:`internalDataRef.current`}),` directly during render, because that does not create a data subscription. For validators that depend on another field, use `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#connect-with-another-field`,children:(0,o.jsx)(t.code,{children:`connectWithPath`})}),` or `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#connect-with-another-field`,children:(0,o.jsx)(t.code,{children:`connectWithItemPath`})}),` from the validator arguments.`]}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`FieldBlock`}),` provides a standardized way to display labels, error messages and other surrounding elements in a consistent manner.`]}),`
`,(0,o.jsx)(t.p,{children:`Here is a working example with code you can edit in the playground:`}),`
`,(0,o.jsx)(i,{}),`
`,(0,o.jsx)(t.h3,{children:`Further customization`}),`
`,(0,o.jsx)(t.p,{children:`You can customize the behavior of the field component. For example, you can add a custom error message:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { useFieldProps } from '@dnb/eufemia/extensions/forms'

useFieldProps({
  errorMessages: {
    'Field.errorRequired': 'Show this when "required" fails.',
  },
})
`})}),`
`,(0,o.jsxs)(t.p,{children:[`or a custom `,(0,o.jsx)(t.code,{children:`required`}),` property validation function:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { FormError } from '@dnb/eufemia/extensions/forms'

const validateRequired = (value, { emptyValue, required, isChanged }) => {
  if (required && value === emptyValue) {
    return new FormError('Field.errorRequired')
  }
}

useFieldProps({ validateRequired })
`})}),`
`,(0,o.jsxs)(t.p,{children:[`For more information about all the available parameters, see the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` or the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` documentation.`]}),`
`,(0,o.jsx)(t.h3,{children:`More details`}),`
`,(0,o.jsxs)(t.p,{children:[`This example shows a custom component. The `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` hook receives the properties and adds extra properties to standardize field behavior. These include `,(0,o.jsx)(t.code,{children:`handleFocus`}),`, `,(0,o.jsx)(t.code,{children:`handleChange`}),`, and `,(0,o.jsx)(t.code,{children:`handleBlur`}),` functions. Even if the field components have external callbacks like "onChange", these will not be altered. The "handle" variants simplify your code.`]}),`
`,(0,o.jsx)(t.h3,{children:`The example explained`}),`
`,(0,o.jsxs)(t.p,{children:[`Using these two form helpers in your field component triggers several automatic processes. These include timely validation checks, syncing value changes with the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/DataContext/`,children:`DataContext`}),`, coordinating error messages across multiple fields, and preventing premature error displays while the user is editing the field.`]}),`
`,(0,o.jsxs)(t.p,{children:[`Keep in mind, you can customize the behavior of `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` and other helper functions to make the component work exactly as you want.`]}),`
`,(0,o.jsx)(t.h3,{children:`Your own validation`}),`
`,(0,o.jsxs)(t.p,{children:[`If you need custom validation that cannot use the built-in JSON Schema or a derivative validator (like in the example above), you can create your own logic. Then, pass the result as an `,(0,o.jsx)(t.code,{children:`error`}),` property to `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),`. All direct properties override standard handling, giving you full control over your component.`]}),`
`,(0,o.jsx)(t.h3,{children:`Customized even further`}),`
`,(0,o.jsxs)(t.p,{children:[`If you need something that looks even more different from the usual fields, you can drop `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` and display surrounding elements in other ways – but still get all the help of a data flow logic, such as `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` offers.`]}),`
`,(0,o.jsx)(t.p,{children:`Here follows an example that retrieves data from a surrounding DataContext, and creates a composite field based on other components from Eufemia:`}),`
`,(0,o.jsx)(r,{}),`
`,(0,o.jsx)(t.h2,{children:`Layout`}),`
`,(0,o.jsxs)(t.p,{children:[`When building your custom form components, preferably use the `,(0,o.jsx)(t.a,{href:`/uilib/layout`,children:`Layout`}),` component.`]}),`
`,(0,o.jsx)(t.h3,{children:`Width definitions`}),`
`,(0,o.jsxs)(t.p,{children:[`These are the official sizes you can use when `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/`,children:`creating your own form fields`}),`.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-css`,children:`:root {
  /* Field */
  --forms-field-width--small: 5rem;
  --forms-field-width--medium: 11rem;
  --forms-field-width--large: 21rem;
  --forms-field-label-max-width--large: 60ch;

  /* Value */
  --forms-value-width--small: 30ch;
  --forms-value-width--medium: 40ch;
  --forms-value-width--large: 60ch;
  --forms-value-label-max-width--large: 60ch;
}
`})}),`
`,(0,o.jsxs)(t.p,{children:[`You can also use a `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` and provide a `,(0,o.jsx)(t.code,{children:`width`}),` property with a value of either `,(0,o.jsx)(t.code,{children:`small`}),`, `,(0,o.jsx)(t.code,{children:`medium`}),` or `,(0,o.jsx)(t.code,{children:`large`}),` and use it as a sized wrapper.`]}),`
`,(0,o.jsx)(t.h2,{children:`Localization and translations`}),`
`,(0,o.jsxs)(t.p,{children:[`You can use the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Form/useTranslation/`,children:`Form.useTranslation`}),` hook to use existing translations or extend it with your custom field localization:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import {
  Form,
  FieldBlock,
  useFieldProps,
  FieldProps,
} from '@dnb/eufemia/extensions/forms'

const myFieldTranslations = {
  'en-GB': {
    MyField: {
      label: 'My field',
      requiredMessage: 'Custom required message',
    },
  },
  'nb-NO': {
    MyField: {
      label: 'Mitt felt',
      requiredMessage: 'Obligatorisk felt melding',
    },
  },
}

type Translation =
  (typeof myFieldTranslations)[keyof typeof myFieldTranslations]

type MyFieldValue = string

const MyField = (props: FieldProps<MyFieldValue>) => {
  const translations = Form.useTranslation<Translation>(
    myFieldTranslations
  )
  const { label, requiredMessage } = translations.MyField

  const preparedProps = {
    label,
    errorMessages: {
      'Field.errorRequired': requiredMessage,
    },
    ...props,
  }

  const { id, value, handleChange, handleFocus, handleBlur } =
    useFieldProps(preparedProps)

  return (
    <FieldBlock<MyFieldValue> forId={id}>
      <input
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </FieldBlock>
  )
}
`})})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}export{c as default};
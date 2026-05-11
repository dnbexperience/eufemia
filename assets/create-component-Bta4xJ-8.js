import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{i as n,n as r,r as i}from"./Examples-BcmbkTXm.js";import"./ListBasisAPIs-CDE0GSOl.js";var a=e();function o(e){let o={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.h1,{children:`Create your own component`}),`
`,(0,a.jsx)(o.p,{children:`Eufemia Forms contains helper fields and tools so you can declaratively create interactive form components that flawlessly integrates between existing data and your custom form components.`}),`
`,(0,a.jsxs)(o.p,{children:[`By using the building blocks for value and field components, you save development time, and at the same time ensure that local, custom components work similarly, and fit into the setup with the standardized base `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/Value/#base-components`,children:`value components`}),` and base `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/base-fields/`,children:`field components`}),`.`]}),`
`,(0,a.jsx)(o.p,{children:(0,a.jsx)(o.strong,{children:`Table of Contents`})}),`
`,(0,a.jsxs)(o.ul,{children:[`
`,(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:`#value-components`,children:`Value components`})}),`
`,(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:`#field-components`,children:`Field components`})}),`
`,(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:`#layout`,children:`Layout`})}),`
`,(0,a.jsx)(o.li,{children:(0,a.jsx)(o.a,{href:`#localization-and-translations`,children:`Localization and translations`})}),`
`]}),`
`,(0,a.jsx)(o.h2,{children:`Value components`}),`
`,(0,a.jsxs)(o.p,{children:[`For creating a `,(0,a.jsx)(o.code,{children:`Value.*`}),` component you can use `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/ValueBlock/`,children:`ValueBlock`}),` and `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/useValueProps/`,children:`useValueProps`}),`:`]}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-tsx`,children:`import { ValueBlock, useValueProps } from '@dnb/eufemia/extensions/forms'

const MyValue = (props) => {
  const { value, ...rest } = useValueProps(props)
  return <ValueBlock {...rest}>{value}</ValueBlock>
}

render(<MyValue path="/dataSelector" />)
`})}),`
`,(0,a.jsxs)(o.p,{children:[(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/ValueBlock/`,children:`ValueBlock`}),` provides a standardized way to display labels and other surrounding elements in a consistent manner.`]}),`
`,(0,a.jsx)(i,{}),`
`,(0,a.jsxs)(o.p,{children:[`The `,(0,a.jsx)(o.code,{children:`useValueProps`}),` provides a standardized way to handle data flow in a consistent manner.`]}),`
`,(0,a.jsxs)(o.p,{children:[`The `,(0,a.jsx)(o.code,{children:`FieldBlock`}),` provides a standardized way to display a label and other surrounding elements in a consistent manner.`]}),`
`,(0,a.jsx)(o.h2,{children:`Field components`}),`
`,(0,a.jsxs)(o.p,{children:[`For creating a `,(0,a.jsx)(o.code,{children:`Field.*`}),` component, you can use `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` and `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),`:`]}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-tsx`,children:`import { FieldBlock, useFieldProps } from '@dnb/eufemia/extensions/forms'

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
`,(0,a.jsxs)(o.p,{children:[`The `,(0,a.jsx)(o.code,{children:`useFieldProps`}),` provides a standardized way to handle data flow, validation and error messages in a consistent manner.`]}),`
`,(0,a.jsxs)(o.p,{children:[`The `,(0,a.jsx)(o.code,{children:`FieldBlock`}),` provides a standardized way to display labels, error messages and other surrounding elements in a consistent manner.`]}),`
`,(0,a.jsx)(o.p,{children:`Here is a working example with code you can edit in the playground:`}),`
`,(0,a.jsx)(r,{}),`
`,(0,a.jsx)(o.h3,{children:`Further customization`}),`
`,(0,a.jsx)(o.p,{children:`You can customize the behavior of the field component. For example, you can add a custom error message:`}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-tsx`,children:`import { useFieldProps } from '@dnb/eufemia/extensions/forms'

useFieldProps({
  errorMessages: {
    'Field.errorRequired': 'Show this when "required" fails.',
  },
})
`})}),`
`,(0,a.jsxs)(o.p,{children:[`or a custom `,(0,a.jsx)(o.code,{children:`required`}),` property validation function:`]}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-tsx`,children:`import { FormError } from '@dnb/eufemia/extensions/forms'

const validateRequired = (value, { emptyValue, required, isChanged }) => {
  if (required && value === emptyValue) {
    return new FormError('Field.errorRequired')
  }
}

useFieldProps({ validateRequired })
`})}),`
`,(0,a.jsxs)(o.p,{children:[`For more information about all the available parameters, see the `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` or the `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` documentation.`]}),`
`,(0,a.jsx)(o.h3,{children:`More details`}),`
`,(0,a.jsxs)(o.p,{children:[`This example shows a custom component. The `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` hook receives the properties and adds extra properties to standardize field behavior. These include `,(0,a.jsx)(o.code,{children:`handleFocus`}),`, `,(0,a.jsx)(o.code,{children:`handleChange`}),`, and `,(0,a.jsx)(o.code,{children:`handleBlur`}),` functions. Even if the field components have external callbacks like "onChange", these will not be altered. The "handle" variants simplify your code.`]}),`
`,(0,a.jsx)(o.h3,{children:`The example explained`}),`
`,(0,a.jsxs)(o.p,{children:[`Using these two form helpers in your field component triggers several automatic processes. These include timely validation checks, syncing value changes with the `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/DataContext/`,children:`DataContext`}),`, coordinating error messages across multiple fields, and preventing premature error displays while the user is editing the field.`]}),`
`,(0,a.jsxs)(o.p,{children:[`Keep in mind, you can customize the behavior of `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` and other helper functions to make the component work exactly as you want.`]}),`
`,(0,a.jsx)(o.h3,{children:`Your own validation`}),`
`,(0,a.jsxs)(o.p,{children:[`If you need custom validation that cannot use the built-in JSON Schema or a derivative validator (like in the example above), you can create your own logic. Then, pass the result as an `,(0,a.jsx)(o.code,{children:`error`}),` property to `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),`. All direct properties override standard handling, giving you full control over your component.`]}),`
`,(0,a.jsx)(o.h3,{children:`Customized even further`}),`
`,(0,a.jsxs)(o.p,{children:[`If you need something that looks even more different from the usual fields, you can drop `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` and display surrounding elements in other ways – but still get all the help of a data flow logic, such as `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` offers.`]}),`
`,(0,a.jsx)(o.p,{children:`Here follows an example that retrieves data from a surrounding DataContext, and creates a composite field based on other components from Eufemia:`}),`
`,(0,a.jsx)(n,{}),`
`,(0,a.jsx)(o.h2,{children:`Layout`}),`
`,(0,a.jsxs)(o.p,{children:[`When building your custom form components, preferably use the `,(0,a.jsx)(o.a,{href:`/uilib/layout`,children:`Layout`}),` component.`]}),`
`,(0,a.jsx)(o.h3,{children:`Width definitions`}),`
`,(0,a.jsxs)(o.p,{children:[`These are the official sizes you can use when `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/`,children:`creating your own form fields`}),`.`]}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-css`,children:`:root {
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
`,(0,a.jsxs)(o.p,{children:[`You can also use a `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` and provide a `,(0,a.jsx)(o.code,{children:`width`}),` property with a value of either `,(0,a.jsx)(o.code,{children:`small`}),`, `,(0,a.jsx)(o.code,{children:`medium`}),` or `,(0,a.jsx)(o.code,{children:`large`}),` and use it as a sized wrapper.`]}),`
`,(0,a.jsx)(o.h2,{children:`Localization and translations`}),`
`,(0,a.jsxs)(o.p,{children:[`You can use the `,(0,a.jsx)(o.a,{href:`/uilib/extensions/forms/Form/useTranslation/`,children:`Form.useTranslation`}),` hook to use existing translations or extend it with your custom field localization:`]}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-tsx`,children:`import {
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
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};
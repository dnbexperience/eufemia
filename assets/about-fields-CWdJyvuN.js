import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import{t as n}from"./Img-CKLl5zri.js";import r from"./ListBaseInputComponents-C_bKmn9P.js";import i from"./ListBaseSelectionComponents-BaEIx1yv.js";import a from"./ListBaseToggleComponents-BUK7gAaK.js";var o=e(),s=`/assets/form-diagram-1-ClWnIvwk.png`,c=`/assets/form-diagram-2-Cq9mJU6B.png`;function l(e){let l={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l.h1,{children:`About fields`}),`
`,(0,o.jsx)(l.p,{children:`Fields are the building blocks of the form components in Eufemia Forms. They are data-driven React components – named and structured – according to the "type" of data they can display and produce, based on the user's input and action in the interface.`}),`
`,(0,o.jsxs)(l.p,{children:[`Here's how you import the components from with the `,(0,o.jsx)(l.code,{children:`Field`}),` scope:`]}),`
`,(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,o.jsxs)(l.p,{children:[`Here is a list of `,(0,o.jsx)(l.a,{href:`/uilib/extensions/forms/all-fields/`,children:`all available fields`}),`.`]}),`
`,(0,o.jsx)(l.hr,{}),`
`,(0,o.jsx)(l.p,{children:(0,o.jsx)(l.strong,{children:`Table of Contents`})}),`
`,(0,o.jsxs)(l.ul,{children:[`
`,(0,o.jsxs)(l.li,{children:[(0,o.jsx)(l.a,{href:`#about-fields`,children:`About fields`}),`
`,(0,o.jsxs)(l.ul,{children:[`
`,(0,o.jsx)(l.li,{children:(0,o.jsx)(l.a,{href:`#base-fields`,children:`Base fields`})}),`
`,(0,o.jsx)(l.li,{children:(0,o.jsx)(l.a,{href:`#feature-fields`,children:`Feature fields`})}),`
`,(0,o.jsxs)(l.li,{children:[(0,o.jsx)(l.a,{href:`#more-info`,children:`More info`}),`
`,(0,o.jsxs)(l.ul,{children:[`
`,(0,o.jsx)(l.li,{children:(0,o.jsx)(l.a,{href:`#empty-value`,children:`Empty value`})}),`
`,(0,o.jsx)(l.li,{children:(0,o.jsx)(l.a,{href:`#standardized-properties`,children:`Standardized properties`})}),`
`,(0,o.jsx)(l.li,{children:(0,o.jsx)(l.a,{href:`#controlled--uncontrolled`,children:`Controlled & Uncontrolled`})}),`
`,(0,o.jsx)(l.li,{children:(0,o.jsx)(l.a,{href:`#creating-custom-field-components`,children:`Creating custom field components`})}),`
`,(0,o.jsx)(l.li,{children:(0,o.jsx)(l.a,{href:`#basic-field-usage`,children:`Basic field usage`})}),`
`,(0,o.jsx)(l.li,{children:(0,o.jsx)(l.a,{href:`#complete-state-management-and-local-custom-fields`,children:`Complete state management and local custom fields`})}),`
`]}),`
`]}),`
`,(0,o.jsx)(l.li,{children:(0,o.jsx)(l.a,{href:`#first-steps`,children:`First steps`})}),`
`]}),`
`]}),`
`]}),`
`,(0,o.jsx)(l.h2,{children:`Base fields`}),`
`,(0,o.jsx)(l.p,{children:`These components are data-driven React components—named and structured—according to the "type" of data they can display and produce, based on the user's input and action in the interface.`}),`
`,(0,o.jsxs)(l.ul,{children:[`
`,(0,o.jsxs)(l.li,{children:[(0,o.jsx)(l.strong,{children:`input category`}),`—which consists of field types that accept and produce values based on input from the user, such as text and numbers.`,`
`,(0,o.jsx)(r,{}),`
`]}),`
`,(0,o.jsxs)(l.li,{children:[(0,o.jsx)(l.strong,{children:`selection category`}),`—which consists of field types that allow the user to choose between a fixed set of values (options) represented by different UI components:`,`
`,(0,o.jsx)(i,{}),`
`]}),`
`,(0,o.jsxs)(l.li,{children:[(0,o.jsx)(l.strong,{children:`toggle category`}),`—which consists of field types that allow the user to toggle between two values, such as `,(0,o.jsx)(l.code,{children:`true`}),` and `,(0,o.jsx)(l.code,{children:`false`}),`:`,`
`,(0,o.jsx)(a,{}),`
`]}),`
`]}),`
`,(0,o.jsxs)(l.p,{children:[`On top of these, a number of `,(0,o.jsx)(l.a,{href:`#feature-fields`,children:`feature fields`}),` have been built that have special functionality based on given types of data, such as bank account numbers, e-mails and social security numbers.`]}),`
`,(0,o.jsx)(l.h2,{children:`Feature fields`}),`
`,(0,o.jsxs)(l.p,{children:[(0,o.jsx)(l.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`Feature fields`}),` are built on top of the `,(0,o.jsx)(l.a,{href:`#base-fields`,children:`base fields`}),` (listed above) to add more specific features targeting a given type of data.`]}),`
`,(0,o.jsx)(l.h2,{children:`More info`}),`
`,(0,o.jsx)(l.h3,{children:`Empty value`}),`
`,(0,o.jsxs)(l.p,{children:[`Every field has an `,(0,o.jsx)(l.code,{children:`emptyValue`}),` property that can be used to define what value should be used when the user does not enter any value.`]}),`
`,(0,o.jsxs)(l.p,{children:[`When a user removes its content from e.g. a string input field, the value will be set to the `,(0,o.jsx)(l.code,{children:`emptyValue`}),`.`]}),`
`,(0,o.jsxs)(l.ul,{children:[`
`,(0,o.jsxs)(l.li,{children:[`The default `,(0,o.jsx)(l.code,{children:`emptyValue`}),` value is `,(0,o.jsx)(l.code,{children:`undefined`}),`.`]}),`
`]}),`
`,(0,o.jsxs)(l.p,{children:[`When initializing fields from `,(0,o.jsx)(l.code,{children:`defaultData`}),`, providing an explicit empty value is optional; if you do, prefer the field's `,(0,o.jsx)(l.code,{children:`emptyValue`}),` (often `,(0,o.jsx)(l.code,{children:`undefined`}),`).`]}),`
`,(0,o.jsx)(l.h3,{children:`Standardized properties`}),`
`,(0,o.jsxs)(l.p,{children:[`All input components have a fixed set of properties that make it possible to build more complex standardized functionality around them. The most important ones here are `,(0,o.jsx)(l.code,{children:`value`}),` and `,(0,o.jsx)(l.code,{children:`onChange`}),` (can be async). Value expects values in the given data type, so for example, `,(0,o.jsx)(l.code,{children:`Field.Number`}),` expects a `,(0,o.jsx)(l.code,{children:`value`}),` of the type `,(0,o.jsx)(l.code,{children:`number`}),`, and will give a type error in TypeScript if it, e.g., receives a number in a `,(0,o.jsx)(l.code,{children:`string`}),`. The callback function submitted to `,(0,o.jsx)(l.code,{children:`onChange`}),` will always receive the value of the corresponding type as the first argument.`]}),`
`,(0,o.jsxs)(l.p,{children:[`It is deliberate that `,(0,o.jsx)(l.code,{children:`onChange`}),` sends out the value from the field, and not the event object that comes from the actual HTML tag into which the user enters data. This is to create a less tight coupling between application code that uses the components and the internal implementation in the field components. In addition, this makes the surrounding logic simpler by not having to extract, for example, `,(0,o.jsx)(l.code,{children:`e.target.value`}),` everywhere.`]}),`
`,(0,o.jsxs)(l.p,{children:[`The basic components have a number of properties that make it possible to control how they function in the interface, such as `,(0,o.jsx)(l.code,{children:`multiline`}),` on `,(0,o.jsx)(l.code,{children:`Field.String`}),`, which chooses whether to get one line of text (input tag) or several lines (textarea tag). In addition, they have a number of validation properties, such as `,(0,o.jsx)(l.code,{children:`minLength`}),` and `,(0,o.jsx)(l.code,{children:`required`}),`.`]}),`
`,(0,o.jsx)(l.h3,{children:`Controlled & Uncontrolled`}),`
`,(0,o.jsxs)(l.p,{children:[`In React, it's important to be aware of where the states of a given set of data "lives". This can be an entire object that represents an entity the user is going to make changes to (e.g. a user or a bank account), but it also applies to the individual value a form makes changes to. A form field can be `,(0,o.jsx)(l.a,{href:`https://reactjs.org/docs/forms.html#controlled-components`,children:`controlled`}),` or `,(0,o.jsx)(l.a,{href:`https://reactjs.org/docs/uncontrolled-components.html`,children:`uncontrolled`}),`. The components in this package make it possible to work in both ways.`]}),`
`,(0,o.jsxs)(l.p,{children:[`If the functionality is designed so that the state of the data will live outside the form components, you give the components a `,(0,o.jsx)(l.code,{children:`value`}),` and an `,(0,o.jsx)(l.code,{children:`onChange`}),`, and ensure that all changes that are sent out via `,(0,o.jsx)(l.code,{children:`onChange`}),` are fed back via `,(0,o.jsx)(l.code,{children:`value`}),` so that it functions as a controlled component. The internal logic in the components will then ensure that the value is kept the same via the changes it receives from the outside.`]}),`
`,(0,o.jsxs)(l.p,{children:[`If you want the state of the value to live inside the input component, do not send the updated value in via `,(0,o.jsx)(l.code,{children:`value`}),`. The logic will then keep the internal value with the changes continuously, and still send the latest version with all the changes the user has made, even if they are not received continuously via `,(0,o.jsx)(l.code,{children:`value`}),`, as a basic `,(0,o.jsx)(l.code,{children:`<input>`}),` tag in React expects.`]}),`
`,(0,o.jsx)(l.h3,{children:`Creating custom field components`}),`
`,(0,o.jsxs)(l.p,{children:[`The `,(0,o.jsx)(l.code,{children:`useFieldProps`}),` hook that is used in all existing field components is exported to make it possible `,(0,o.jsx)(l.a,{href:`/uilib/extensions/forms/create-component/`,children:`to create custom field components`}),` that have the same properties and follow the same flow as the standard components, without the need to recreate all the basic state handling features.`]}),`
`,(0,o.jsx)(l.h3,{children:`Basic field usage`}),`
`,(0,o.jsx)(l.p,{children:`Components in Eufemia Forms are very flexible. They adapt to the set of properties they receive, and you can therefore choose which parts of the functionality they should use, and what you yourself want to handle in the application code.`}),`
`,(0,o.jsx)(l.p,{children:`Here is an example that consists of a large degree of data handling in the application, even though the form itself still consists of both components from Eufemia and local special components (the blue boxes):`}),`
`,(0,o.jsx)(`div`,{style:{maxWidth:`1200px`},children:(0,o.jsx)(n,{height:`auto`,width:`auto`,src:s,caption:`Simple form example with Eufemia Forms fields`})}),`
`,(0,o.jsx)(l.h3,{children:`Complete state management and local custom fields`}),`
`,(0,o.jsx)(l.p,{children:`In this example, all state data, validation process and error handling are done by components from Eufemia Forms, inside a local field component created especially for this application. Here you find a combination of standardized field functionality taken from Eufemia Forms, and local specialized code to achieve the goal of maximum reuse without sacrificing flexibility:`}),`
`,(0,o.jsx)(`div`,{style:{maxWidth:`1200px`},children:(0,o.jsx)(n,{height:`auto`,width:`auto`,src:c,caption:`Complete state management and local custom fields`})}),`
`,(0,o.jsx)(l.h2,{children:`First steps`}),`
`,(0,o.jsxs)(l.p,{children:[`You import the components from with scopes, such as `,(0,o.jsx)(l.code,{children:`Form`}),` and `,(0,o.jsx)(l.code,{children:`Field`}),`:`]}),`
`,(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler onSubmit={console.log}>
    <Field.String label="Custom Field" />
    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Form.Handler>
)
`})}),`
`,(0,o.jsxs)(l.p,{children:[`More details in the `,(0,o.jsx)(l.a,{href:`/uilib/extensions/forms/getting-started/`,children:`getting started`}),` section.`]})]})}function u(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}export{u as default};
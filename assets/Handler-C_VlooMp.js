import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{t as n}from"./async-state-return-example-BV0uKrbt.js";import{t as r}from"./async-change-example-jdkGQ3pm.js";import i from"./demos-zzyMpbOo.js";var a=e();function o(e){let i={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,h5:`h5`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.h2,{children:`Import`}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Handler />)
`})}),`
`,(0,a.jsx)(i.h2,{children:`Description`}),`
`,(0,a.jsxs)(i.p,{children:[`The `,(0,a.jsx)(i.code,{children:`Form.Handler`}),` is the root component of your form. It provides an HTML form element and handles the form data.`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const existingData = { firstName: 'Nora' }

function MyForm() {
  return (
    <Form.Handler
      defaultData={existingData}
      onSubmit={...}
    >
      Your Form
    </Form.Handler>
  )
}
`})}),`
`,(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.code,{children:`defaultData`}),` is only used if no other data source is provided and will not update internal data if it changes after mount. Initializing fields with an empty value is optional; if you do, prefer the field's `,(0,a.jsx)(i.code,{children:`emptyValue`}),` (often `,(0,a.jsx)(i.code,{children:`undefined`}),`).`]}),`
`,(0,a.jsx)(i.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(i.ul,{children:[`
`,(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/Handler`,children:`Source code`})}),`
`,(0,a.jsx)(i.li,{children:(0,a.jsx)(i.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/Handler`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(i.h3,{children:`TypeScript support`}),`
`,(0,a.jsx)(i.p,{children:`You can define the TypeScript type structure for your form data. This will help you to get better code completion and type checking.`}),`
`,(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:`NB:`}),` Use `,(0,a.jsx)(i.code,{children:`type`}),` instead of `,(0,a.jsx)(i.code,{children:`interface`}),` for the type definition.`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

type MyData = {
  firstName?: string
}

// Method #1 – without initial data
function MyForm() {
  return (
    <Form.Handler<MyData>
      onSubmit={(data) => {
        console.log(data.firstName satisfies string)
      }}
    >
      ...
    </Form.Handler>
  )
}

// Method #2 – with data (initial values)
const existingData: MyData = {
  firstName: 'Nora',
}
function MyForm() {
  return (
    <Form.Handler
      defaultData={existingData}
      onSubmit={(data) => {
        console.log(data.firstName satisfies string)
      }}
    >
      ...
    </Form.Handler>
  )
}

// Method #3 – type definition for the submit handler
import type { OnSubmit } from '@dnb/eufemia/extensions/forms'
const submitHandler: OnSubmit<MyData> = (data) => {
  console.log(data.firstName satisfies string)
}
function MyForm() {
  return <Form.Handler onSubmit={submitHandler}>...</Form.Handler>
}

// Method #4 – type definition on the event parameter
function MyForm() {
  return (
    <Form.Handler
      onSubmit={(data: MyData) => {
        console.log(data.firstName satisfies string)
      }}
    >
      ...
    </Form.Handler>
  )
}
`})}),`
`,(0,a.jsx)(i.p,{children:`To disable types you can:`}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-tsx`,children:`<Form.Handler<any>>...</Form.Handler>
`})}),`
`,(0,a.jsx)(i.h2,{children:`Decoupling the form element`}),`
`,(0,a.jsxs)(i.p,{children:[`For more flexibility, you can decouple the form element from the form context by using the `,(0,a.jsx)(i.code,{children:`decoupleForm`}),` property. It is recommended to use `,(0,a.jsx)(i.code,{children:`Form.Element`}),` to wrap the rest of your form:`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyApp() {
  return (
    <Form.Handler decoupleForm>
      <AppRelatedThings>
        <Form.Element>
          <Form.MainHeading>Heading</Form.MainHeading>
          <Form.Card>
            <Field.Email />
          </Form.Card>
          <Form.SubmitButton />
        </Form.Element>
      </AppRelatedThings>
    </Form.Handler>
  )
}
`})}),`
`,(0,a.jsx)(i.h2,{children:`Native form submission`}),`
`,(0,a.jsxs)(i.p,{children:[`By default, `,(0,a.jsx)(i.code,{children:`Form.Handler`}),` prevents the browser's native submit behavior so it can run validation and submit handling inside Eufemia Forms.`]}),`
`,(0,a.jsxs)(i.p,{children:[`If you need a native form submit, such as posting to an `,(0,a.jsx)(i.code,{children:`action`}),` URL with `,(0,a.jsx)(i.code,{children:`method="post"`}),`, you can set `,(0,a.jsx)(i.code,{children:`preventDefaultOnSubmit={false}`}),`:`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-tsx`,children:`<Form.Handler action="/login" method="post" preventDefaultOnSubmit={false}>
  ...
</Form.Handler>
`})}),`
`,(0,a.jsxs)(i.p,{children:[`This also works on `,(0,a.jsx)(i.code,{children:`Form.Element`}),` when using `,(0,a.jsx)(i.code,{children:`decoupleForm`}),`.`]}),`
`,(0,a.jsx)(i.h2,{children:`Data handling`}),`
`,(0,a.jsxs)(i.p,{children:[`You can access, mutate, and filter data inside the form context by using the `,(0,a.jsx)(i.code,{children:`Form.useData`}),` hook:`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyComponent() {
  const {
    getValue,
    update,
    remove,
    set,
    data,
    filterData,
    reduceToVisibleFields,
  } = Form.useData()

  return <>...</>
}

function MyApp() {
  return (
    <>
      <Form.Handler>...</Form.Handler>
      <MyComponent />
    </>
  )
}
`})}),`
`,(0,a.jsxs)(i.ul,{children:[`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`getValue`}),` will return the value of the given path.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`update`}),` will update the value of the given path.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`remove`}),` will remove the given path from the data context (fields will reapply their values afterwards).`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`set`}),` will set the whole dataset.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`data`}),` will return the whole dataset (unvalidated).`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`filterData`}),` will filter the data based on your own logic.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`reduceToVisibleFields`}),` will reduce the given data set to only contain the visible fields (mounted fields).`]}),`
`]}),`
`,(0,a.jsx)(i.h3,{children:`Using a form ID`}),`
`,(0,a.jsx)(i.p,{children:`The form data can be handled outside the form. This is useful if you want to use the form data in other components:`}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object, or React Context reference

function MyComponent() {
  const { data } = Form.useData(myFormId)

  return <>...</>
}

function MyApp() {
  return (
    <>
      <Form.Handler id={myFormId}>...</Form.Handler>
      <MyComponent />
    </>
  )
}
`})}),`
`,(0,a.jsxs)(i.p,{children:[`More examples can be found in the `,(0,a.jsx)(i.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`}),` hook docs.`]}),`
`,(0,a.jsxs)(i.h2,{children:[`Async `,(0,a.jsx)(i.code,{children:`onChange`}),` and `,(0,a.jsx)(i.code,{children:`onSubmit`}),` event handlers`]}),`
`,(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:`NB:`}),` When using an async `,(0,a.jsx)(i.code,{children:`onChange`}),` event handler, the `,(0,a.jsx)(i.code,{children:`data`}),` parameter will only include validated data. This lets you utilize the `,(0,a.jsx)(i.code,{children:`data`}),` parameter directly in your request, without having to further process or transform it.`]}),`
`,(0,a.jsxs)(i.p,{children:[`If you need to use the original data (sync), you can access it via the `,(0,a.jsx)(i.a,{href:`/uilib/extensions/forms/Form/useData/`,children:`Form.useData`}),` hook.`]}),`
`,(0,a.jsxs)(i.p,{children:[`Depending on your needs, you may want to use e.g. `,(0,a.jsx)(i.code,{children:`debounceAsync`}),` (`,(0,a.jsx)(i.a,{href:`/uilib/helpers/functions/#debounce`,children:`debounce`}),`) to prevent multiple requests from being sent.`]}),`
`,(0,a.jsxs)(i.p,{children:[`You can return parameters from inside the async `,(0,a.jsx)(i.code,{children:`onChange`}),` or `,(0,a.jsx)(i.code,{children:`onSubmit`}),` event handler. This way you can display more related information, such as an error or an object with these keys:`]}),`
`,(0,a.jsx)(r,{}),`
`,(0,a.jsx)(n,{}),`
`,(0,a.jsxs)(i.p,{children:[`The `,(0,a.jsx)(i.code,{children:`info`}),`, `,(0,a.jsx)(i.code,{children:`warning`}),`, and `,(0,a.jsx)(i.code,{children:`error`}),` messages will be displayed at the bottom of a form or field (`,(0,a.jsx)(i.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),`), depending on where it is used. The `,(0,a.jsx)(i.code,{children:`success`}),` message will be displayed on the label of the field that initiated the `,(0,a.jsx)(i.code,{children:`onChange`}),` event.`]}),`
`,(0,a.jsx)(i.h2,{children:`Browser autofill`}),`
`,(0,a.jsxs)(i.p,{children:[`You can set `,(0,a.jsx)(i.code,{children:`autoComplete`}),` on the `,(0,a.jsx)(i.code,{children:`Form.Handler`}),` – each `,(0,a.jsx)(i.a,{href:`/uilib/extensions/forms/base-fields/String/`,children:`Field.String`}),`-field will then get `,(0,a.jsx)(i.code,{children:`autoComplete="on"`}),`:`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-tsx`,children:`<Form.Handler autoComplete={true}>
  <Field.String path="/firstName" />
  <Field.String path="/firstName" />
</Form.Handler>
`})}),`
`,(0,a.jsxs)(i.p,{children:[`The `,(0,a.jsx)(i.code,{children:`path`}),` property will be used to set the `,(0,a.jsx)(i.code,{children:`name`}),` attribute, which lets the browser know which autocomplete value should be proposed to the user.`]}),`
`,(0,a.jsx)(i.h2,{children:`Temporary storage`}),`
`,(0,a.jsxs)(i.p,{children:[`The `,(0,a.jsx)(i.code,{children:`sessionStorageId`}),` feature uses the browser's session storage (temporary storage mechanism) to store data entered by the user.`]}),`
`,(0,a.jsx)(i.p,{children:`This allows the user to navigate away and come back to the form without losing already-entered data.`}),`
`,(0,a.jsx)(i.p,{children:`Ensure you only use this feature for non-sensitive data.`}),`
`,(0,a.jsx)(i.p,{children:`It will flush the storage once the form gets submitted.`}),`
`,(0,a.jsx)(i.h2,{children:`Visible data`}),`
`,(0,a.jsxs)(i.p,{children:[`You can use the `,(0,a.jsx)(i.code,{children:`reduceToVisibleFields`}),` function to get only the data of visible (mounted) fields.`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    onSubmit={(data, { reduceToVisibleFields }) => {
      const myData = reduceToVisibleFields(data, {
        keepPaths: ['/foo'],
        removePaths: ['/bar'],
      })
    }}
  >
    <Form.SubmitButton />
  </Form.Handler>
)
`})}),`
`,(0,a.jsx)(i.h2,{children:`Filter data`}),`
`,(0,a.jsxs)(i.p,{children:[`You can use the `,(0,a.jsx)(i.code,{children:`filterData`}),` function to filter your `,(0,a.jsx)(i.code,{children:`onSubmit`}),` data. It might be useful—for example, to `,(0,a.jsx)(i.strong,{children:`exclude disabled fields`}),` or filter out empty fields. The callback function receives the following arguments:`]}),`
`,(0,a.jsx)(i.p,{children:`The callback function receives the following properties in an object:`}),`
`,(0,a.jsxs)(i.ul,{children:[`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`path`}),` The path of the field.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`value`}),` The value of the field.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`displayValue`}),` The displayed value of the field.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`label`}),` The label of the field.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`props`}),` The given field properties.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`error`}),` The error of the field. Is `,(0,a.jsx)(i.code,{children:`undefined`}),` if there is no error.`]}),`
`]}),`
`,(0,a.jsxs)(i.p,{children:[`The callback function should return a `,(0,a.jsx)(i.code,{children:`boolean`}),` or `,(0,a.jsx)(i.code,{children:`undefined`}),`. Return `,(0,a.jsx)(i.code,{children:`false`}),` to exclude an entry.`]}),`
`,(0,a.jsx)(i.p,{children:`It returns the filtered form data.`}),`
`,(0,a.jsxs)(i.p,{children:[`The `,(0,a.jsx)(i.a,{href:`/uilib/extensions/forms/Form/useData/#filter-data`,children:`Form.useData`}),` hook and the `,(0,a.jsx)(i.a,{href:`/uilib/extensions/forms/Form/getData/#filter-data`,children:`Form.getData`}),` method also returns a `,(0,a.jsx)(i.code,{children:`filterData`}),` function you can use to filter data the same way.`]}),`
`,(0,a.jsxs)(i.p,{children:[`In the demo section is an example of how to use the `,(0,a.jsx)(i.code,{children:`filterData`}),` method.`]}),`
`,(0,a.jsx)(i.h3,{children:`Filter arrays`}),`
`,(0,a.jsxs)(i.p,{children:[`You can filter arrays by using the `,(0,a.jsx)(i.code,{children:`filterData`}),` method. You can find more information about this in the `,(0,a.jsx)(i.a,{href:`/uilib/extensions/forms/Iterate/Array/#filter-data`,children:`Iterate.Array`}),` docs.`]}),`
`,(0,a.jsx)(i.h3,{children:`onSubmit parameters`}),`
`,(0,a.jsxs)(i.p,{children:[`The `,(0,a.jsx)(i.code,{children:`onSubmit`}),` event returns additional functions you can call:`]}),`
`,(0,a.jsxs)(i.ul,{children:[`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`filterData`}),` Filters the given/internal data set.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`reduceToVisibleFields`}),` Reduces the given data set to only contain the visible fields (mounted fields).`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`transformData`}),` Will call your given function for each `,(0,a.jsx)(i.code,{children:`Field.*`}),` that contains a path (not `,(0,a.jsx)(i.code,{children:`Iterate.Array`}),`). It's up to you to define the shape of the value.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`resetForm`}),` Deletes `,(0,a.jsx)(i.code,{children:`sessionStorage`}),` and browser stored autocomplete data.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`clearData`}),` Empties the given/internal data set.`]}),`
`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFilter = {
  '/myPath': (value) => {
    return value.length > 0
  },
}

const MyForm = () => {
  return (
    <Form.Handler
      onSubmit={(
        data,
        {
          filterData,
          reduceToVisibleFields,
          transformData,
          resetForm,
          clearData,
        }
      ) => {
        resetForm()
        clearData()

        const filteredData = filterData(myFilter)
        const myData = reduceToVisibleFields(filteredData)
        const transformed = transformData(
          myData,
          ({ path, value, displayValue, label, props, error }) => {
            return 'new value'
          }
        )
      }}
      sessionStorageId="session-key"
    >
      <Form.SubmitButton />
    </Form.Handler>
  )
}
`})}),`
`,(0,a.jsx)(i.h4,{children:(0,a.jsx)(i.code,{children:`transformData`})}),`
`,(0,a.jsxs)(i.p,{children:[`The `,(0,a.jsx)(i.code,{children:`transformData`}),` handler will call your given function for each `,(0,a.jsx)(i.code,{children:`Field.*`}),` that contains a path (not `,(0,a.jsx)(i.code,{children:`Iterate.Array`}),`). The returned value will be used instead of the given `,(0,a.jsx)(i.code,{children:`value`}),` and returned as a new data object. It's up to you to define the shape of the returned value.`]}),`
`,(0,a.jsx)(i.p,{children:`The callback function receives the following properties in an object:`}),`
`,(0,a.jsxs)(i.ul,{children:[`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`path`}),` The path of the field.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`value`}),` The value of the field.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`displayValue`}),` The displayed value of the field.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`label`}),` The label of the field.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`props`}),` The given field properties.`]}),`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.code,{children:`error`}),` The error of the field. Is `,(0,a.jsx)(i.code,{children:`undefined`}),` if there is no error.`]}),`
`]}),`
`,(0,a.jsxs)(i.p,{children:[(0,a.jsx)(i.strong,{children:`displayValue`}),` can be `,(0,a.jsx)(i.code,{children:`undefined`}),` if a field does not support it, or it's value is not set (`,(0,a.jsx)(i.code,{children:`emptyValue`}),`).`]}),`
`,(0,a.jsxs)(i.p,{children:[`Most of the fields will return the `,(0,a.jsx)(i.code,{children:`displayValue`}),` as a string. But there are some exceptions:`]}),`
`,(0,a.jsxs)(i.ul,{children:[`
`,(0,a.jsxs)(i.li,{children:[(0,a.jsx)(i.a,{href:`/uilib/extensions/forms/base-fields/ArraySelection/`,children:`Field.ArraySelection`}),` will return the displayed/active options content as an array that contains a string (or React.ReactNode).`]}),`
`]}),`
`,(0,a.jsxs)(i.h5,{children:[(0,a.jsx)(i.code,{children:`displayValue`}),` from fields inside Iterate.Array`]}),`
`,(0,a.jsxs)(i.p,{children:[`When using the `,(0,a.jsx)(i.code,{children:`Iterate.Array`}),` component, you may check if the current entry is an array. This way you ensure you never transform the array itself, but only the values from the fields inside the array.`]}),`
`,(0,a.jsx)(i.pre,{children:(0,a.jsx)(i.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler
      onSubmit={(data, { transformData }) => {
        const transformedData = transformData(
          data,
          ({ value, displayValue, label }) => {
            return { value, displayValue, label }
          }
        )
      }}
    >
      <Form.Card>
        <Iterate.Array path="/myArray">
          <Field.String itemPath="/" label="My label" />
        </Iterate.Array>
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
`})})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(i,{})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};
import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-uHUiOB_d.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Isolation />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Form.Isolation`}),` lets you isolate parts of your form so data and validations are not shared between the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` until you want to.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It's a provider that lets you provide a `,(0,i.jsx)(t.code,{children:`schema`}),` or `,(0,i.jsx)(t.code,{children:`data`}),` very similar to what the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` component does.`]}),`
`,(0,i.jsx)(t.h3,{children:`Good to know`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`It needs to be used inside of a `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` component.`]}),`
`,(0,i.jsxs)(t.li,{children:[`All fields inside need to validate successfully before the isolated data can be committed, just like the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` does before submitting.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Input fields are prevented from submitting the form when pressing enter. Pressing enter on input fields will commit the isolated data to the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` context instead.`]}),`
`,(0,i.jsxs)(t.li,{children:[`You can provide a `,(0,i.jsx)(t.code,{children:`schema`}),`, `,(0,i.jsx)(t.code,{children:`data`}),` or `,(0,i.jsx)(t.code,{children:`defaultData`}),` like you would do with the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[`You can also provide `,(0,i.jsx)(t.code,{children:`data`}),` or `,(0,i.jsx)(t.code,{children:`defaultData`}),` to the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` component. If not given on the `,(0,i.jsx)(t.code,{children:`Form.Isolation`}),` component, this will define the data that will be used for the isolated data.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Using `,(0,i.jsx)(t.code,{children:`Form.Isolation`}),` inside of a `,(0,i.jsx)(t.code,{children:`Form.Section`}),` is supported.`]}),`
`,(0,i.jsxs)(t.li,{children:[`If the user enters data without committing it to the outer context, that data will be lost when navigating to another step in the Wizard. To prevent this, you can use the `,(0,i.jsx)(t.code,{children:`preventUncommittedChanges`}),` property on Form.Isolation. When enabled, it will display an error message if the user tries to proceed without committing their changes.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`onChange`}),` on the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` will be called when the isolated data gets committed.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`onChange`}),` on the `,(0,i.jsx)(t.code,{children:`Form.Isolation`}),` will be called on every change of the isolated data. Use `,(0,i.jsx)(t.code,{children:`onCommit`}),` to get the data that gets committed.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Usage`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

export function MyForm(props) {
  return (
    <Form.Handler
      defaultData={{ isolated: 'Isolated', regular: 'Regular' }}
    >
      <Form.Isolation resetDataAfterCommit>
        <Field.String label="Isolated" path="/isolated" />
        <Form.Isolation.CommitButton />
      </Form.Isolation>

      <Field.String label="Regular" path="/regular" />
      <Form.SubmitButton />
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsx)(t.h2,{children:`TypeScript support`}),`
`,(0,i.jsx)(t.p,{children:`You can define the TypeScript type structure for your data like so:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

type IsolationData = {
  persons: Array<{ name: string }>
  newPerson: Array<{ name: string }>
}

function MyForm() {
  return (
    <Form.Isolation<IsolationData>
      onCommit={(data) => {
        data // <-- is of type IsolationData
      }}
      transformOnCommit={(isolatedData, handlerData) => {
        return {
          ...handlerData,
          persons: [...handlerData.persons, isolatedData.newPerson],
        }
      }}
    >
      ...
    </Form.Isolation>
  )
}
`})}),`
`,(0,i.jsx)(t.h2,{children:`Commit the data to the form`}),`
`,(0,i.jsxs)(t.p,{children:[`You can either use the `,(0,i.jsx)(t.code,{children:`Form.Isolation.CommitButton`}),` or provide a custom ref handler you can use (call) when you want to commit the data to the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` context:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, JSONSchema } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  const commitHandleRef = React.useRef<(() => void) | undefined>(undefined)

  return (
    <Form.Handler>
      <Form.Isolation commitHandleRef={commitHandleRef}>
        <Field.PhoneNumber path="/phoneNumber" />
        <Button text="Submit" onClick={commitHandleRef.current} />
      </Form.Isolation>
    </Form.Handler>
  )
}

render(<MyForm />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Prevent the form from being submitted`}),`
`,(0,i.jsxs)(t.p,{children:[`To prevent the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` from being submitted when there are fields with errors inside the Isolation, you can use the `,(0,i.jsx)(t.code,{children:`bubbleValidation`}),` property.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Form.Isolation bubbleValidation>
      <Field.String label="Required field" path="/isolated" required />
      <Form.Isolation.CommitButton />
    </Form.Isolation>
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Schema support`}),`
`,(0,i.jsxs)(t.p,{children:[`You can also use a `,(0,i.jsx)(t.code,{children:`schema`}),` to define the properties of the nested fields.`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using Zod schemas`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const MySection = (props) => {
  return (
    <Form.Section {...props}>
      <Field.PhoneNumber path="/phoneNumber" />
    </Form.Section>
  )
}

const schema = z.object({
  phoneNumber: z.string().regex(/^[0-9]{10}$/),
})

render(
  <Form.Handler>
    <Form.Isolation schema={schema}>
      <Field.PhoneNumber path="/phoneNumber" />
    </Form.Isolation>
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using JSON Schema (Ajv)`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import {
  Form,
  Field,
  JSONSchema,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance()
const isolatedSchema: JSONSchema = {
  type: 'object',
  properties: {
    phoneNumber: {
      type: 'string',
      pattern: '^[0-9]{10}$',
    },
  },
  required: ['phoneNumber'],
}

render(
  <Form.Handler ajvInstance={ajv}>
    <Form.Isolation schema={isolatedSchema}>
      <Field.PhoneNumber path="/phoneNumber" />
    </Form.Isolation>
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Clear data from isolated fields`}),`
`,(0,i.jsxs)(t.p,{children:[`You can clear the isolation by calling `,(0,i.jsx)(t.code,{children:`clearData`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Form.Isolation
        onCommit={(data, { clearData }) => {
          clearData()
        }}
      >
        <Field.String path="/isolated" />
        <Form.Isolation.CommitButton />
      </Form.Isolation>
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsxs)(t.h2,{children:[`Reset data after commit (`,(0,i.jsx)(t.code,{children:`resetDataAfterCommit`}),`)`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can reset the isolation the user committed by using `,(0,i.jsx)(t.code,{children:`resetDataAfterCommit`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Form.Isolation resetDataAfterCommit>
        <Field.String path="/isolated" />
        <Form.Isolation.CommitButton />
      </Form.Isolation>
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsxs)(t.h3,{children:[`Define your own data reference (`,(0,i.jsx)(t.code,{children:`dataReference`}),`)`]}),`
`,(0,i.jsxs)(t.p,{children:[`Technically, when you use `,(0,i.jsx)(t.code,{children:`preventUncommittedChanges`}),` or `,(0,i.jsx)(t.code,{children:`resetDataAfterCommit`}),`, the `,(0,i.jsx)(t.code,{children:`Form.Isolation`}),` will use its "initial" internal data set to create a reference. This reference is used to either compare if there is a change or to reset the data context after a commit.`]}),`
`,(0,i.jsx)(t.p,{children:`But in some situations, you may need a different data set than the initial data set given at the initial render.`}),`
`,(0,i.jsxs)(t.p,{children:[`In order to do that you can create a `,(0,i.jsx)(t.code,{children:`dataReference`}),` and pass it to the `,(0,i.jsx)(t.code,{children:`Form.Isolation`}),` component and call `,(0,i.jsx)(t.code,{children:`refresh`}),` on it whenever you need to update it.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

const dataReference = Form.Isolation.createDataReference()

function MyForm() {
  useEffect(() => {
    // When ever you want to refresh the "reset data"
    dataReference.refresh()
  }, [])

  return (
    <Form.Handler>
      <Form.Isolation resetDataAfterCommit dataReference={dataReference}>
        <Field.String path="/isolated" />
        <Form.Isolation.CommitButton />
      </Form.Isolation>
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsxs)(t.h2,{children:[`Require the user to commit before submitting (`,(0,i.jsx)(t.code,{children:`preventUncommittedChanges`}),`)`]}),`
`,(0,i.jsxs)(t.p,{children:[`In scenarios where you want to ensure users commit their changes before submitting or navigating to the next Wizard step, you can use the `,(0,i.jsx)(t.code,{children:`preventUncommittedChanges`}),` property. This will prevent form submission (or a step change) and prompt the user to commit any uncommitted changes first.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
        <Field.String path="/isolated" />
        <Form.Isolation.CommitButton />
        <Form.Isolation.ResetButton showWhen="uncommittedChangeDetected" />
      </Form.Isolation>
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`showWhen="uncommittedChangeDetected"`}),` property ensures that the reset button is displayed only when the "prevent uncommitted changes" error is visible. This helps prevent users from resetting the form unnecessarily.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};
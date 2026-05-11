import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({MixedIndeterminateDependence:()=>o,NestedIndeterminateDependence:()=>c,PropagateIndeterminateDependence:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.Handler onChange={console.log}>
  <Form.Card>
    <Field.Indeterminate
      label="Indeterminate"
      dependencePaths={['/child1', '/child2', '/child3']}
    />

    <Field.Toggle
      label="Checkbox 1"
      path="/child1"
      valueOn="what-ever"
      valueOff="you-name-it"
      required
    />

    <Field.Boolean label="Checkbox 2" path="/child2" required />

    <Field.Toggle
      label="Checkbox 3"
      path="/child3"
      valueOn="on"
      valueOff="off"
    />
  </Form.Card>

  <Form.SubmitButton />
</Form.Handler>
`}),s=()=>(0,a.jsx)(n,{noInline:!0,children:`const MyFormContent = () => {
  const { data } = Form.useData()
  return (
    <>
      <Form.Card>
        <Field.Selection label="Propagate to" path="/propagate">
          <Field.Option value="checked">Checked</Field.Option>
          <Field.Option value="unchecked">Unchecked</Field.Option>
          <Field.Option value="auto">Auto</Field.Option>
        </Field.Selection>

        <Field.Indeterminate
          label="Indeterminate"
          dependencePaths={['/child1', '/child2', '/child3']}
          propagateIndeterminateState={data['propagate']}
        />

        <Field.Toggle
          label="Checkbox 1"
          path="/child1"
          valueOn="what-ever"
          valueOff="you-name-it"
        />

        <Field.Boolean label="Checkbox 2" path="/child2" />

        <Field.Toggle
          label="Checkbox 3"
          path="/child3"
          valueOn="on"
          valueOff="off"
        />
      </Form.Card>
    </>
  )
}
const MyForm = () => {
  return (
    <Form.Handler
      id="propagate-demo"
      defaultData={{
        propagate: 'checked',
        child1: 'you-name-it',
        child2: true,
        child3: 'on',
      }}
      onChange={console.log}
    >
      <MyFormContent />
    </Form.Handler>
  )
}
render(<MyForm />)
`}),c=()=>(0,a.jsx)(n,{children:`<Form.Handler onChange={console.log}>
  <Form.Card>
    <Field.Indeterminate
      label="1"
      path="/p1"
      dependencePaths={['/c2.1', '/p2.2', '/c3.1', '/c3.2']}
    />

    <Flex.Stack left="large">
      <Field.Boolean label="2.1" path="/c2.1" />
      <Field.Indeterminate
        label="2.2"
        valueOn="what-ever"
        valueOff="you-name-it"
        path="/p2.2"
        dependencePaths={['/c3.1', '/c3.2']}
      />

      <Flex.Stack left="large">
        <Field.Boolean label="3.1" path="/c3.1" />
        <Field.Toggle
          label="3.2"
          path="/c3.2"
          valueOn="what-ever"
          valueOff="you-name-it"
        />
      </Flex.Stack>
    </Flex.Stack>
  </Form.Card>
</Form.Handler>
`});function l(e){let t={code:`code`,h2:`h2`,h3:`h3`,...r(),...e.components};return i||d(`Examples`,!1),o||d(`Examples.MixedIndeterminateDependence`,!0),c||d(`Examples.NestedIndeterminateDependence`,!0),s||d(`Examples.PropagateIndeterminateDependence`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Indeterminate state (partially checked)`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Nested indeterminate state`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsxs)(t.h3,{children:[`Propagate to `,(0,a.jsx)(t.code,{children:`auto`}),`, `,(0,a.jsx)(t.code,{children:`checked`}),` and `,(0,a.jsx)(t.code,{children:`unchecked`})]}),`
`,(0,a.jsx)(s,{})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
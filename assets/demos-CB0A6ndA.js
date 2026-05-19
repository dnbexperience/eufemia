import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({MixedIndeterminateDependence:()=>s,NestedIndeterminateDependence:()=>l,PropagateIndeterminateDependence:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`MixedIndeterminateDependence`,children:`<Form.Handler onChange={console.log}>
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
`}),c=()=>(0,o.jsx)(r,{stableName:`PropagateIndeterminateDependence`,noInline:!0,children:`const MyFormContent = () => {
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
`}),l=()=>(0,o.jsx)(r,{stableName:`NestedIndeterminateDependence`,children:`<Form.Handler onChange={console.log}>
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
`});function u(e){let t={code:`code`,h2:`h2`,h3:`h3`,...i(),...e.components};return a||f(`Examples`,!1),s||f(`Examples.MixedIndeterminateDependence`,!0),l||f(`Examples.NestedIndeterminateDependence`,!0),c||f(`Examples.PropagateIndeterminateDependence`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Indeterminate state (partially checked)`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Nested indeterminate state`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Propagate to `,(0,o.jsx)(t.code,{children:`auto`}),`, `,(0,o.jsx)(t.code,{children:`checked`}),` and `,(0,o.jsx)(t.code,{children:`unchecked`})]}),`
`,(0,o.jsx)(c,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};
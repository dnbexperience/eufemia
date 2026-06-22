import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-DoxBGtHF.js";import{j as i,w as a}from"./forms-CsJzlVUF.js";import{t as o}from"./Card-DP9KYSzC.js";import{B as s}from"./index-DdG6L_K8.js";import{t as c}from"./ComponentBox-q_23Ylzi.js";var l=e({MixedIndeterminateDependence:()=>d,NestedIndeterminateDependence:()=>p,PropagateIndeterminateDependence:()=>f}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`MixedIndeterminateDependence`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Card:o,Field:i},children:`<Form.Handler onChange={console.log}>
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
`}),f=()=>(0,u.jsx)(c,{stableName:`PropagateIndeterminateDependence`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Card:o,Field:i},noInline:!0,children:`const MyFormContent = () => {
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
`}),p=()=>(0,u.jsx)(c,{stableName:`NestedIndeterminateDependence`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Card:o,Field:i,Flex:r},children:`<Form.Handler onChange={console.log}>
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
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,...s(),...e.components};return l||g(`Examples`,!1),d||g(`Examples.MixedIndeterminateDependence`,!0),p||g(`Examples.NestedIndeterminateDependence`,!0),f||g(`Examples.PropagateIndeterminateDependence`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Indeterminate state (partially checked)`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Nested indeterminate state`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsxs)(t.h3,{children:[`Propagate to `,(0,u.jsx)(t.code,{children:`auto`}),`, `,(0,u.jsx)(t.code,{children:`checked`}),` and `,(0,u.jsx)(t.code,{children:`unchecked`})]}),`
`,(0,u.jsx)(f,{})]})}function h(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
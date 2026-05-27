import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-CuOH-QN0.js";import{t as i}from"./Form-KS-x6we6.js";import{t as a}from"./Field-bFo7XjQz.js";import{t as o}from"./Value-Cn-VyKaI.js";import{Bn as s,Rr as c}from"./index-Da-r8F54.js";import{t as l}from"./ComponentBox-DXeEXSK2.js";var u=t({ViewAndEditContainer:()=>f}),d=e(n()),f=()=>(0,d.jsx)(l,{stableName:`ViewAndEditContainer`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Section:s,Field:a,Value:o,Card:r},noInline:!0,children:`const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer>
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required containerMode="edit">
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
`});function p(e){let t={code:`code`,h2:`h2`,p:`p`,...c(),...e.components};return u||h(`Examples`,!1),f||h(`Examples.ViewAndEditContainer`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsxs)(t.p,{children:[`This demo shows the edit container opened by default by using the `,(0,d.jsx)(t.code,{children:`containerMode="edit"`}),` property.`]}),`
`,(0,d.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
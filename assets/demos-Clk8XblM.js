import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({ViewAndEditContainer:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{noInline:!0,children:`const MyEditContainer = () => {
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
`});function s(e){let t={code:`code`,h2:`h2`,p:`p`,...r(),...e.components};return i||l(`Examples`,!1),o||l(`Examples.ViewAndEditContainer`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsxs)(t.p,{children:[`This demo shows the edit container opened by default by using the `,(0,a.jsx)(t.code,{children:`containerMode="edit"`}),` property.`]}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};
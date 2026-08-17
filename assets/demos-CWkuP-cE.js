import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r,m as i,v as a,w as o}from"./forms-D__hPZDv.js";import{t as s}from"./Card-DZd-xLSg.js";import{t as c}from"./Section-Ba8Ez2kR.js";import{U as l}from"./index-CGxQ8PRe.js";import{t as u}from"./ComponentBox-DOwlXUSS.js";var d=e({PreventUncommittedChanges:()=>m,ViewAndEditContainer:()=>p}),f=t(n()),p=()=>(0,f.jsx)(u,{stableName:`ViewAndEditContainer`,sourceImports:[`import { Field, Form, Value, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Section:c,Field:r,Value:a,Card:s},noInline:!0,children:`const MyEditContainer = () => {
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
`}),m=()=>(0,f.jsx)(u,{stableName:`PreventUncommittedChanges`,sourceImports:[`import { Field, Form, Value, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Wizard:i,Section:c,Field:r,Value:a},children:`<Form.Handler>
  <Wizard.Container>
    <Wizard.Step title="Profile">
      <Form.Section path="/profile" containerMode="edit">
        <Form.Section.EditContainer preventUncommittedChanges>
          <Field.Name.First path="/firstName" />
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer>
          <Value.Name.First path="/firstName" />
        </Form.Section.ViewContainer>
      </Form.Section>

      <Wizard.Buttons />
    </Wizard.Step>

    <Wizard.Step title="Summary">
      <Value.Name.First path="/profile/firstName" />
      <Wizard.Buttons />
    </Wizard.Step>
  </Wizard.Container>
</Form.Handler>
`});function h(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...l(),...e.components};return d||_(`Examples`,!1),m||_(`Examples.PreventUncommittedChanges`,!0),p||_(`Examples.ViewAndEditContainer`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`View and edit container`}),`
`,(0,f.jsxs)(t.p,{children:[`This demo shows the edit container opened by default by using the `,(0,f.jsx)(t.code,{children:`containerMode="edit"`}),` property.`]}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`Prevent uncommitted changes`}),`
`,(0,f.jsxs)(t.p,{children:[`With `,(0,f.jsx)(t.code,{children:`preventUncommittedChanges`}),`, the user must select "Done" or "Cancel" before continuing to the next Wizard step, even when no values have changed.`]}),`
`,(0,f.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};
import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({BasicUsage:()=>o,UsageInWizard:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{"data-visual-test":`forms-card`,children:`<Flex.Stack>
  <Form.MainHeading>Main heading</Form.MainHeading>
  <Form.Card>
    <Field.String label="Field A" required />
    <Field.String label="Field B" required />
    <Form.Card>
      <P>Nested card</P>
    </Form.Card>
  </Form.Card>
  <Form.SubmitButton />
</Flex.Stack>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`forms-card-in-wizard`,children:`<Form.Handler>
  <Wizard.Container>
    <Wizard.Step>
      <Form.Card>
        <Form.Section>
          <Form.Section.ViewContainer title="In a Wizard" variant="basic">
            <Value.String defaultValue="Something" />
          </Form.Section.ViewContainer>
          <Form.Section.EditContainer variant="basic">
            <Field.String defaultValue="Something" />
          </Form.Section.EditContainer>
        </Form.Section>
      </Form.Card>
      <Form.SubmitButton text="Happy coding!" />
    </Wizard.Step>
  </Wizard.Container>
</Form.Handler>
`});function c(e){let t={h2:`h2`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||u(`Examples`,!1),o||u(`Examples.BasicUsage`,!0),s||u(`Examples.UsageInWizard`,!0),n||u(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(n,{children:(0,a.jsx)(s,{})})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};
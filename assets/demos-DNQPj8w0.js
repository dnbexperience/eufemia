import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({BasicUsage:()=>s,UsageInWizard:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{"data-visual-test":`forms-card`,stableName:`BasicUsage`,children:`<Flex.Stack>
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
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`forms-card-in-wizard`,stableName:`UsageInWizard`,children:`<Form.Handler>
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
`});function l(e){let t={h2:`h2`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||d(`Examples`,!1),s||d(`Examples.BasicUsage`,!0),c||d(`Examples.UsageInWizard`,!0),n||d(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(c,{})})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};
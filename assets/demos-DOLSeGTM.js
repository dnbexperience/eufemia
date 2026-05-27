import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-2G-TKpj3.js";import{t as i}from"./Form-PES0Uozy.js";import{t as a}from"./Field-DrUGn0oz.js";import{t as o}from"./Value-BOhdc4cL.js";import{n as s}from"./Wizard-DlovE-XE.js";import{Bn as c,In as l,Rr as u,un as d}from"./index-BIrFyEEc.js";import{t as f}from"./ComponentBox-DFVIRw0w.js";var p=t({BasicUsage:()=>h,UsageInWizard:()=>g}),m=e(n()),h=()=>(0,m.jsx)(f,{"data-visual-test":`forms-card`,stableName:`BasicUsage`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form, Field, Wizard, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:d,Form:i,Card:r,Field:a,P:l},children:`<Flex.Stack>
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
`}),g=()=>(0,m.jsx)(f,{"data-visual-test":`forms-card-in-wizard`,stableName:`UsageInWizard`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form, Field, Wizard, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Wizard:s,Card:r,Section:c,Value:o,Field:a},children:`<Form.Handler>
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
`});function _(e){let t={h2:`h2`,...u(),...e.components},{VisibleWhenVisualTest:n}=t;return p||y(`Examples`,!1),h||y(`Examples.BasicUsage`,!0),g||y(`Examples.UsageInWizard`,!0),n||y(`VisibleWhenVisualTest`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(h,{}),`
`,(0,m.jsx)(n,{children:(0,m.jsx)(g,{})})]})}function v(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};
import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-DtVKLSL-.js";import{t as i}from"./Section-UYj7uQy5.js";import{c as a}from"./ToggleButton-D3NEk3jO.js";import{t as o}from"./Card-C6UABezd.js";import{t as s}from"./Form-C16rVaXm.js";import{t as c}from"./Field-B5trC2Cn.js";import{t as l}from"./Value-DvCb56Kz.js";import{n as u}from"./Wizard-DMAIqrxA.js";import{W as d}from"./index-BCXtuv-b.js";import{t as f}from"./ComponentBox-B2X8809Z.js";var p=e({BasicUsage:()=>h,UsageInWizard:()=>g}),m=t(n()),h=()=>(0,m.jsx)(f,{"data-visual-test":`forms-card`,stableName:`BasicUsage`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form, Field, Wizard, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:a,Form:s,Card:o,Field:c,P:r},children:`<Flex.Stack>
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
`}),g=()=>(0,m.jsx)(f,{"data-visual-test":`forms-card-in-wizard`,stableName:`UsageInWizard`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form, Field, Wizard, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Wizard:u,Card:o,Section:i,Value:l,Field:c},children:`<Form.Handler>
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
`});function _(e){let t={h2:`h2`,...d(),...e.components},{VisibleWhenVisualTest:n}=t;return p||y(`Examples`,!1),h||y(`Examples.BasicUsage`,!0),g||y(`Examples.UsageInWizard`,!0),n||y(`VisibleWhenVisualTest`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(h,{}),`
`,(0,m.jsx)(n,{children:(0,m.jsx)(g,{})})]})}function v(e={}){let{wrapper:t}={...d(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};
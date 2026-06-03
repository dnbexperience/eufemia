import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{X as r}from"./Anchor-ywdvt45E.js";import{c as i}from"./ToggleButton-D3NEk3jO.js";import{t as a}from"./Form-C16rVaXm.js";import{t as o}from"./Field-B5trC2Cn.js";import{W as s}from"./index-BCXtuv-b.js";import{t as c}from"./ComponentBox-B2X8809Z.js";var l=e({Disabled:()=>f,Inverted:()=>p,Required:()=>d}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`Required`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:a,Flex:i,Field:o,Provider:r},children:`<Form.Handler>
  <Flex.Stack>
    <Field.String label="Not required" />

    <Field.Provider required>
      <Field.String label="Required A" />
      <Field.Number label="Required B" />
    </Field.Provider>

    <Form.ButtonRow>
      <Form.SubmitButton />
    </Form.ButtonRow>
  </Flex.Stack>
</Form.Handler>
`}),f=()=>(0,u.jsx)(c,{stableName:`Disabled`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:a,Flex:i,Field:o,Provider:r},children:`<Form.Handler>
  <Flex.Stack>
    <Field.String label="Not disabled" />

    <Field.Provider disabled>
      <Flex.Stack>
        <Field.String label="Disabled" />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Stack>
    </Field.Provider>
  </Flex.Stack>
</Form.Handler>
`}),p=()=>(0,u.jsx)(c,{stableName:`Inverted`,sourceImports:[`import { Form, Field } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:a,Flex:i,Field:o,Provider:r},children:`<Form.Handler disabled>
  <Flex.Stack>
    <Field.String label="Disabled" />

    <Field.Provider disabled={false}>
      <Flex.Stack>
        <Field.String label="Not disabled" />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Stack>
    </Field.Provider>
  </Flex.Stack>
</Form.Handler>
`});function m(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return l||g(`Examples`,!1),f||g(`Examples.Disabled`,!0),p||g(`Examples.Inverted`,!0),d||g(`Examples.Required`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Required`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Disabled`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Inverted`}),`
`,(0,u.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
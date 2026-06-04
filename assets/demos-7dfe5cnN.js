import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-avM674pJ.js";import{c as i}from"./ToggleButton-BtQrsiHY.js";import{t as a}from"./Card--_AKADDp.js";import{t as o}from"./Form-913YPZs6.js";import{W as s}from"./index-D7e1avVt.js";import{t as c}from"./ComponentBox-CE7bpcJy.js";var l=e({AboveCard:()=>p,Default:()=>d,PrecedingFlexContainer:()=>f,WithHelpButton:()=>m}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`Default`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o},children:`<Form.MainHeading>This is a main heading</Form.MainHeading>
`}),f=()=>(0,u.jsx)(c,{"data-visual-test":`layout-main-heading-above-stack`,stableName:`PrecedingFlexContainer`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Flex:i,P:r},children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Flex.Stack>
  <P>Stack contents</P>
</Flex.Stack>

`}),p=()=>(0,u.jsx)(c,{"data-visual-test":`layout-main-heading-above-card`,stableName:`AboveCard`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Card:a,P:r},children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Form.Card>
  <P>Card contents</P>
</Form.Card>

`}),m=()=>(0,u.jsx)(c,{"data-visual-test":`layout-main-heading-help-button`,stableName:`WithHelpButton`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:i,Form:o,Card:a,P:r},children:`<Flex.Stack>
  <Form.MainHeading
    help={{
      title: 'Title',
      content: 'Content',
    }}
  >
    This is a main heading
  </Form.MainHeading>
  <Form.Card>
    <P>Card contents</P>
  </Form.Card>
</Flex.Stack>
`});function h(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return l||_(`Examples`,!1),p||_(`Examples.AboveCard`,!0),d||_(`Examples.Default`,!0),f||_(`Examples.PrecedingFlexContainer`,!0),m||_(`Examples.WithHelpButton`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Text only`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Above a flex container`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Above Card`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`With HelpButton`}),`
`,(0,u.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};
import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-CuOH-QN0.js";import{t as i}from"./Form-KS-x6we6.js";import{In as a,Rr as o,un as s}from"./index-Da-r8F54.js";import{t as c}from"./ComponentBox-DXeEXSK2.js";var l=t({AboveCard:()=>p,Default:()=>d,PrecedingFlexContainer:()=>f,WithHelpButton:()=>m}),u=e(n()),d=()=>(0,u.jsx)(c,{stableName:`Default`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i},children:`<Form.MainHeading>This is a main heading</Form.MainHeading>
`}),f=()=>(0,u.jsx)(c,{"data-visual-test":`layout-main-heading-above-stack`,stableName:`PrecedingFlexContainer`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Flex:s,P:a},children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Flex.Stack>
  <P>Stack contents</P>
</Flex.Stack>

`}),p=()=>(0,u.jsx)(c,{"data-visual-test":`layout-main-heading-above-card`,stableName:`AboveCard`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:r,P:a},children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Form.Card>
  <P>Card contents</P>
</Form.Card>

`}),m=()=>(0,u.jsx)(c,{"data-visual-test":`layout-main-heading-help-button`,stableName:`WithHelpButton`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:s,Form:i,Card:r,P:a},children:`<Flex.Stack>
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
`});function h(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return l||_(`Examples`,!1),p||_(`Examples.AboveCard`,!0),d||_(`Examples.Default`,!0),f||_(`Examples.PrecedingFlexContainer`,!0),m||_(`Examples.WithHelpButton`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Text only`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Above a flex container`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Above Card`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`With HelpButton`}),`
`,(0,u.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};
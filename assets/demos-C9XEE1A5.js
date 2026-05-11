import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({AboveCard:()=>c,Default:()=>o,PrecedingFlexContainer:()=>s,WithHelpButton:()=>l}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.MainHeading>This is a main heading</Form.MainHeading>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`layout-main-heading-above-stack`,children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Flex.Stack>
  <P>Stack contents</P>
</Flex.Stack>

`}),c=()=>(0,a.jsx)(n,{"data-visual-test":`layout-main-heading-above-card`,children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Form.Card>
  <P>Card contents</P>
</Form.Card>

`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`layout-main-heading-help-button`,children:`<Flex.Stack>
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
`});function u(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||f(`Examples`,!1),c||f(`Examples.AboveCard`,!0),o||f(`Examples.Default`,!0),s||f(`Examples.PrecedingFlexContainer`,!0),l||f(`Examples.WithHelpButton`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Text only`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Above a flex container`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Above Card`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`With HelpButton`}),`
`,(0,a.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};
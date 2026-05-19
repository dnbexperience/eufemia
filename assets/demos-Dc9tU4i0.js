import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({AboveCard:()=>l,Default:()=>s,PrecedingFlexContainer:()=>c,WithHelpButton:()=>u}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Default`,children:`<Form.MainHeading>This is a main heading</Form.MainHeading>
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`layout-main-heading-above-stack`,stableName:`PrecedingFlexContainer`,children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Flex.Stack>
  <P>Stack contents</P>
</Flex.Stack>

`}),l=()=>(0,o.jsx)(r,{"data-visual-test":`layout-main-heading-above-card`,stableName:`AboveCard`,children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Form.Card>
  <P>Card contents</P>
</Form.Card>

`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`layout-main-heading-help-button`,stableName:`WithHelpButton`,children:`<Flex.Stack>
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
`});function d(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||p(`Examples`,!1),l||p(`Examples.AboveCard`,!0),s||p(`Examples.Default`,!0),c||p(`Examples.PrecedingFlexContainer`,!0),u||p(`Examples.WithHelpButton`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Text only`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Above a flex container`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Above Card`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`With HelpButton`}),`
`,(0,o.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};
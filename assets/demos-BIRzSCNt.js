import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({AboveCard:()=>u,BelowMainHeading:()=>s,InsideCard:()=>l,PrecedingFlexContainer:()=>c,TextOnly:()=>o,TwoSubHeadings:()=>d,WithHelpButton:()=>f}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.SubHeading>This is a sub heading</Form.SubHeading>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`layout-sub-heading-below-main`,children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Form.SubHeading>This is a sub heading</Form.SubHeading>

`}),c=()=>(0,a.jsx)(n,{children:`
<Form.SubHeading>This is a sub heading</Form.SubHeading>
<Flex.Stack>
  <P>Stack contents</P>
</Flex.Stack>

`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`layout-sub-heading-inside-card`,children:`<Form.Card>
  <Flex.Stack>
    <Form.SubHeading>This is a sub heading</Form.SubHeading>
    <P>Card contents</P>
  </Flex.Stack>
</Form.Card>
`}),u=()=>(0,a.jsx)(n,{"data-visual-test":`layout-sub-heading-above-card`,children:`
<Form.SubHeading>This is a sub heading</Form.SubHeading>
<Form.Card>
  <P>Card contents</P>
</Form.Card>

`}),d=()=>(0,a.jsx)(n,{children:`
<Form.SubHeading>This is sub heading 1</Form.SubHeading>
<Form.SubHeading>This is sub heading 2</Form.SubHeading>
Other contents

`}),f=()=>(0,a.jsx)(n,{"data-visual-test":`layout-sub-heading-help-button`,children:`<Flex.Stack>
  <Form.SubHeading
    help={{
      title: 'Title',
      content: 'Content',
    }}
  >
    This is a sub heading
  </Form.SubHeading>
  <Form.Card>
    <P>Card contents</P>
  </Form.Card>
</Flex.Stack>
`});function p(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||h(`Examples`,!1),u||h(`Examples.AboveCard`,!0),s||h(`Examples.BelowMainHeading`,!0),l||h(`Examples.InsideCard`,!0),c||h(`Examples.PrecedingFlexContainer`,!0),o||h(`Examples.TextOnly`,!0),d||h(`Examples.TwoSubHeadings`,!0),f||h(`Examples.WithHelpButton`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Text only`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Below MainHeading`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Above a flex container`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Inside Card`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Above Card`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Two sub headings`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`With HelpButton`}),`
`,(0,a.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
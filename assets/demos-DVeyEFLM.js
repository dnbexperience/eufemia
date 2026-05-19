import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({AboveCard:()=>d,BelowMainHeading:()=>c,InsideCard:()=>u,PrecedingFlexContainer:()=>l,TextOnly:()=>s,TwoSubHeadings:()=>f,WithHelpButton:()=>p}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`TextOnly`,children:`<Form.SubHeading>This is a sub heading</Form.SubHeading>
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`layout-sub-heading-below-main`,stableName:`BelowMainHeading`,children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Form.SubHeading>This is a sub heading</Form.SubHeading>

`}),l=()=>(0,o.jsx)(r,{stableName:`PrecedingFlexContainer`,children:`
<Form.SubHeading>This is a sub heading</Form.SubHeading>
<Flex.Stack>
  <P>Stack contents</P>
</Flex.Stack>

`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`layout-sub-heading-inside-card`,stableName:`InsideCard`,children:`<Form.Card>
  <Flex.Stack>
    <Form.SubHeading>This is a sub heading</Form.SubHeading>
    <P>Card contents</P>
  </Flex.Stack>
</Form.Card>
`}),d=()=>(0,o.jsx)(r,{"data-visual-test":`layout-sub-heading-above-card`,stableName:`AboveCard`,children:`
<Form.SubHeading>This is a sub heading</Form.SubHeading>
<Form.Card>
  <P>Card contents</P>
</Form.Card>

`}),f=()=>(0,o.jsx)(r,{stableName:`TwoSubHeadings`,children:`
<Form.SubHeading>This is sub heading 1</Form.SubHeading>
<Form.SubHeading>This is sub heading 2</Form.SubHeading>
Other contents

`}),p=()=>(0,o.jsx)(r,{"data-visual-test":`layout-sub-heading-help-button`,stableName:`WithHelpButton`,children:`<Flex.Stack>
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
`});function m(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||g(`Examples`,!1),d||g(`Examples.AboveCard`,!0),c||g(`Examples.BelowMainHeading`,!0),u||g(`Examples.InsideCard`,!0),l||g(`Examples.PrecedingFlexContainer`,!0),s||g(`Examples.TextOnly`,!0),f||g(`Examples.TwoSubHeadings`,!0),p||g(`Examples.WithHelpButton`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Text only`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Below MainHeading`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Above a flex container`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Inside Card`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Above Card`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Two sub headings`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`With HelpButton`}),`
`,(0,o.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
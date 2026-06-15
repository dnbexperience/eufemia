import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-C9wBv35m.js";import{c as i}from"./ToggleButton-_NsXxiTa.js";import{t as a}from"./Card-ChPhpBPz.js";import{t as o}from"./Form-JTiJXf2d.js";import{K as s}from"./index-ppRu2ktv.js";import{t as c}from"./ComponentBox-R2c6Bo76.js";var l=e({AboveCard:()=>h,BelowMainHeading:()=>f,InsideCard:()=>m,PrecedingFlexContainer:()=>p,TextOnly:()=>d,TwoSubHeadings:()=>g,WithHelpButton:()=>_}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`TextOnly`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o},children:`<Form.SubHeading>This is a sub heading</Form.SubHeading>
`}),f=()=>(0,u.jsx)(c,{"data-visual-test":`layout-sub-heading-below-main`,stableName:`BelowMainHeading`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o},children:`
<Form.MainHeading>This is a main heading</Form.MainHeading>
<Form.SubHeading>This is a sub heading</Form.SubHeading>

`}),p=()=>(0,u.jsx)(c,{stableName:`PrecedingFlexContainer`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Flex:i,P:r},children:`
<Form.SubHeading>This is a sub heading</Form.SubHeading>
<Flex.Stack>
  <P>Stack contents</P>
</Flex.Stack>

`}),m=()=>(0,u.jsx)(c,{"data-visual-test":`layout-sub-heading-inside-card`,stableName:`InsideCard`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Card:a,Flex:i,P:r},children:`<Form.Card>
  <Flex.Stack>
    <Form.SubHeading>This is a sub heading</Form.SubHeading>
    <P>Card contents</P>
  </Flex.Stack>
</Form.Card>
`}),h=()=>(0,u.jsx)(c,{"data-visual-test":`layout-sub-heading-above-card`,stableName:`AboveCard`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Card:a,P:r},children:`
<Form.SubHeading>This is a sub heading</Form.SubHeading>
<Form.Card>
  <P>Card contents</P>
</Form.Card>

`}),g=()=>(0,u.jsx)(c,{stableName:`TwoSubHeadings`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o},children:`
<Form.SubHeading>This is sub heading 1</Form.SubHeading>
<Form.SubHeading>This is sub heading 2</Form.SubHeading>
Other contents

`}),_=()=>(0,u.jsx)(c,{"data-visual-test":`layout-sub-heading-help-button`,stableName:`WithHelpButton`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:i,Form:o,Card:a,P:r},children:`<Flex.Stack>
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
`});function v(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return l||b(`Examples`,!1),h||b(`Examples.AboveCard`,!0),f||b(`Examples.BelowMainHeading`,!0),m||b(`Examples.InsideCard`,!0),p||b(`Examples.PrecedingFlexContainer`,!0),d||b(`Examples.TextOnly`,!0),g||b(`Examples.TwoSubHeadings`,!0),_||b(`Examples.WithHelpButton`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Text only`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Below MainHeading`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Above a flex container`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`Inside Card`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Above Card`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Two sub headings`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(t.h3,{children:`With HelpButton`}),`
`,(0,u.jsx)(_,{})]})}function y(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};
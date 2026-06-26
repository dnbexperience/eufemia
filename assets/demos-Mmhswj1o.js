import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-DM984GyO.js";import{j as i,w as a}from"./forms-CFi5-4x5.js";import{t as o}from"./P-CtWu9WHu.js";import{t as s}from"./Card-Db-Q1D3Y.js";import{t as c}from"./Heading-DAtQYz9n.js";import{U as l}from"./index-kfZVC31v.js";import{t as u}from"./ComponentBox-qLaLt9T0.js";var d=e({WithCard:()=>g,WithCardAndHeading:()=>_,WithCardAndHeadings:()=>v,WithFieldString:()=>p,WithHeadingsAndAriaLabel:()=>y,WithMainHeading:()=>h,WithParagraphs:()=>m}),f=t(n()),p=()=>(0,f.jsx)(u,{"data-visual-test":`flex-stack-form`,stableName:`WithFieldString`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Card, Flex, P } from '@dnb/eufemia'`],__buildScope:{Flex:r,Field:i,Form:a},children:`<Flex.Stack>
  <Field.String label="Label" value="Foo" />
  <Field.String label="Label" value="Foo" />
  <Form.SubmitButton />
</Flex.Stack>
`}),m=()=>(0,f.jsx)(u,{"data-visual-test":`flex-stack-paragraphs`,stableName:`WithParagraphs`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Card, Flex, P } from '@dnb/eufemia'`],__buildScope:{Flex:r,P:o},children:`<Flex.Stack>
  <P>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum.
  </P>
  <P>
    Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae
    metus.
  </P>
</Flex.Stack>
`}),h=()=>(0,f.jsx)(u,{stableName:`WithMainHeading`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Card, Flex, P } from '@dnb/eufemia'`],__buildScope:{Flex:r,Form:a,Heading:c,P:o},children:`<Flex.Stack>
  <Form.MainHeading>Heading</Form.MainHeading>
  <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
  <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
</Flex.Stack>
`}),g=()=>(0,f.jsx)(u,{"data-visual-test":`flex-stack-card-stack`,stableName:`WithCard`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Card, Flex, P } from '@dnb/eufemia'`],__buildScope:{Flex:r,Card:s,P:o},children:`<Flex.Stack>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
</Flex.Stack>
`}),_=()=>(0,f.jsx)(u,{"data-visual-test":`flex-stack-card-heading`,stableName:`WithCardAndHeading`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Card, Flex, P } from '@dnb/eufemia'`],__buildScope:{Flex:r,Form:a,Card:s,P:o},children:`<Flex.Stack>
  <Form.MainHeading>Main heading</Form.MainHeading>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
</Flex.Stack>
`}),v=()=>(0,f.jsx)(u,{"data-visual-test":`flex-stack-card-two-headings`,stableName:`WithCardAndHeadings`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Card, Flex, P } from '@dnb/eufemia'`],__buildScope:{Flex:r,Form:a,Card:s,P:o},children:`<Flex.Stack>
  <Form.MainHeading>Main heading</Form.MainHeading>
  <Form.SubHeading>Sub heading</Form.SubHeading>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
</Flex.Stack>
`}),y=()=>(0,f.jsx)(u,{hidePreview:!0,stableName:`WithHeadingsAndAriaLabel`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Card, Flex, P } from '@dnb/eufemia'`],__buildScope:{Flex:r,Form:a,Heading:c,Card:s,P:o},children:`<Flex.Stack aria-labelledby="unique-id">
  <Form.SubHeading id="unique-id">Heading</Form.SubHeading>
  <Card>
    <P>Content inside a landmark ...</P>
  </Card>
</Flex.Stack>
`});function b(e){let t={h2:`h2`,h3:`h3`,...l(),...e.components};return d||S(`Examples`,!1),g||S(`Examples.WithCard`,!0),_||S(`Examples.WithCardAndHeading`,!0),v||S(`Examples.WithCardAndHeadings`,!0),p||S(`Examples.WithFieldString`,!0),h||S(`Examples.WithMainHeading`,!0),m||S(`Examples.WithParagraphs`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`With input fields`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`With paragraphs`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h3,{children:`With main heading`}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.h3,{children:`With Card`}),`
`,(0,f.jsx)(g,{}),`
`,(0,f.jsx)(t.h3,{children:`With Card and heading`}),`
`,(0,f.jsx)(_,{}),`
`,(0,f.jsx)(t.h3,{children:`With Card and headings`}),`
`,(0,f.jsx)(v,{})]})}function x(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,y as n,d as t};
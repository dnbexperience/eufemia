import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({WithCard:()=>u,WithCardAndHeading:()=>d,WithCardAndHeadings:()=>f,WithFieldString:()=>s,WithHeadingsAndAriaLabel:()=>p,WithMainHeading:()=>l,WithParagraphs:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{"data-visual-test":`flex-stack-form`,stableName:`WithFieldString`,children:`<Flex.Stack>
  <Field.String label="Label" value="Foo" />
  <Field.String label="Label" value="Foo" />
  <Form.SubmitButton />
</Flex.Stack>
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`flex-stack-paragraphs`,stableName:`WithParagraphs`,children:`<Flex.Stack>
  <P>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum.
  </P>
  <P>
    Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae
    metus.
  </P>
</Flex.Stack>
`}),l=()=>(0,o.jsx)(r,{stableName:`WithMainHeading`,children:`<Flex.Stack>
  <Form.MainHeading>Heading</Form.MainHeading>
  <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
  <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
</Flex.Stack>
`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`flex-stack-card-stack`,stableName:`WithCard`,children:`<Flex.Stack>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
</Flex.Stack>
`}),d=()=>(0,o.jsx)(r,{"data-visual-test":`flex-stack-card-heading`,stableName:`WithCardAndHeading`,children:`<Flex.Stack>
  <Form.MainHeading>Main heading</Form.MainHeading>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
</Flex.Stack>
`}),f=()=>(0,o.jsx)(r,{"data-visual-test":`flex-stack-card-two-headings`,stableName:`WithCardAndHeadings`,children:`<Flex.Stack>
  <Form.MainHeading>Main heading</Form.MainHeading>
  <Form.SubHeading>Sub heading</Form.SubHeading>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
</Flex.Stack>
`}),p=()=>(0,o.jsx)(r,{hidePreview:!0,stableName:`WithHeadingsAndAriaLabel`,children:`<Flex.Stack aria-labelledby="unique-id">
  <Form.SubHeading id="unique-id">Heading</Form.SubHeading>
  <Card>
    <P>Content inside a landmark ...</P>
  </Card>
</Flex.Stack>
`});function m(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||g(`Examples`,!1),u||g(`Examples.WithCard`,!0),d||g(`Examples.WithCardAndHeading`,!0),f||g(`Examples.WithCardAndHeadings`,!0),s||g(`Examples.WithFieldString`,!0),l||g(`Examples.WithMainHeading`,!0),c||g(`Examples.WithParagraphs`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`With input fields`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`With paragraphs`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`With main heading`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`With Card`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`With Card and heading`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`With Card and headings`}),`
`,(0,o.jsx)(f,{})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,p as n,a as t};
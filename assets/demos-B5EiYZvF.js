import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({WithCard:()=>l,WithCardAndHeading:()=>u,WithCardAndHeadings:()=>d,WithFieldString:()=>o,WithHeadingsAndAriaLabel:()=>f,WithMainHeading:()=>c,WithParagraphs:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{"data-visual-test":`flex-stack-form`,children:`<Flex.Stack>
  <Field.String label="Label" value="Foo" />
  <Field.String label="Label" value="Foo" />
  <Form.SubmitButton />
</Flex.Stack>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`flex-stack-paragraphs`,children:`<Flex.Stack>
  <P>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum.
  </P>
  <P>
    Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae
    metus.
  </P>
</Flex.Stack>
`}),c=()=>(0,a.jsx)(n,{children:`<Flex.Stack>
  <Form.MainHeading>Heading</Form.MainHeading>
  <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
  <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
</Flex.Stack>
`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`flex-stack-card-stack`,children:`<Flex.Stack>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
</Flex.Stack>
`}),u=()=>(0,a.jsx)(n,{"data-visual-test":`flex-stack-card-heading`,children:`<Flex.Stack>
  <Form.MainHeading>Main heading</Form.MainHeading>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
</Flex.Stack>
`}),d=()=>(0,a.jsx)(n,{"data-visual-test":`flex-stack-card-two-headings`,children:`<Flex.Stack>
  <Form.MainHeading>Main heading</Form.MainHeading>
  <Form.SubHeading>Sub heading</Form.SubHeading>
  <Card gap="medium">
    <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
    <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
  </Card>
</Flex.Stack>
`}),f=()=>(0,a.jsx)(n,{hidePreview:!0,children:`<Flex.Stack aria-labelledby="unique-id">
  <Form.SubHeading id="unique-id">Heading</Form.SubHeading>
  <Card>
    <P>Content inside a landmark ...</P>
  </Card>
</Flex.Stack>
`});function p(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||h(`Examples`,!1),l||h(`Examples.WithCard`,!0),u||h(`Examples.WithCardAndHeading`,!0),d||h(`Examples.WithCardAndHeadings`,!0),o||h(`Examples.WithFieldString`,!0),c||h(`Examples.WithMainHeading`,!0),s||h(`Examples.WithParagraphs`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`With input fields`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`With paragraphs`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`With main heading`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`With Card`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`With Card and heading`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`With Card and headings`}),`
`,(0,a.jsx)(d,{})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default,f as n,i as t};
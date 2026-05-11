import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{b as n,t as r}from"./ComponentBox-xW2kV1s2.js";import{t as i}from"./TestElement-cTsZrWus.js";import{Lr as a}from"./index-DVm0MbGb.js";var o=e({Default:()=>c,Help:()=>u,HelpHtml:()=>d,Inline:()=>l,Widths:()=>f,Wrapping:()=>p}),s=t(),c=()=>(0,s.jsx)(r,{scope:{ValueBlock:n},children:`<ValueBlock label="Label text">Data-value goes here</ValueBlock>
`}),l=()=>(0,s.jsx)(r,{"data-visual-test":`value-block-inline`,scope:{ValueBlock:n},children:`<P>
  this is before the value <ValueBlock inline>Foo</ValueBlock>{' '}
  <ValueBlock inline>Bar</ValueBlock> this is after the value
</P>
`}),u=()=>(0,s.jsx)(r,{scope:{ValueBlock:n},"data-visual-test":`value-block-help-button`,children:`<ValueBlock
  label="Label text"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
>
  Data-value goes here
</ValueBlock>
`}),d=()=>(0,s.jsx)(r,{scope:{ValueBlock:n},"data-visual-test":`value-block-help-button-html`,children:`<ValueBlock
  label="Label text with a long label label – lorem ipsum
        dolor sit"
  help={{
    open: true,
    title: <strong>Help title</strong>,
    content: (
      <>
        Help content with a <Anchor href="/">Anchor</Anchor>.
      </>
    ),
  }}
>
  Data-value goes here – lorem ipsum dolor sit amet consectetur.
</ValueBlock>
`}),f=()=>(0,s.jsx)(r,{scope:{ValueBlock:n,TestElement:i},hideCode:!0,"data-visual-test":`forms-value-block-widths`,children:`<Flex.Stack>
  <ValueBlock label="No maxWidth: This label is long so we can validate that the label can be longer until it will wrap.">
    <TestElement>
      This content is long so we can see the maxWidth defined. It should
      wrap at a certain amount of characters.
    </TestElement>
  </ValueBlock>
  <ValueBlock
    label="maxWidth='small': This label is long so we can validate that the label can be longer."
    maxWidth="small"
  >
    <TestElement>
      This content is long so we can see the maxWidth defined. It should
      wrap at a certain amount of characters.
    </TestElement>
  </ValueBlock>
  <ValueBlock
    label="maxWidth='medium': This label is long so we can validate that the label can be longer."
    maxWidth="medium"
  >
    <TestElement>
      This content is long so we can see the maxWidth defined. It should
      wrap at a certain amount of characters.
    </TestElement>
  </ValueBlock>
  <ValueBlock
    label="maxWidth='large': This label is long so we can validate that the label can be longer."
    maxWidth="large"
  >
    <TestElement>
      This content is long so we can see the maxWidth defined. It should
      wrap at a certain amount of characters.
    </TestElement>
  </ValueBlock>
  <ValueBlock
    label="maxWidth='auto': This label is long so we can validate that the label can be longer."
    maxWidth="auto"
  >
    <TestElement>
      This content is long so we can see the maxWidth defined. It should
      wrap at a certain amount of characters.
    </TestElement>
  </ValueBlock>
</Flex.Stack>
`}),p=()=>(0,s.jsx)(r,{scope:{ValueBlock:n,sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},"data-visual-test":`forms-value-block-wrapping`,children:`<Flex.Stack>
  <Form.Card>
    <Form.SubHeading>Breaking word with 61 characters</Form.SubHeading>
    <ValueBlock label={sixtyOneChars}>{sixtyOneChars}</ValueBlock>
    <ValueBlock
      label={sixtyOneChars}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      {sixtyOneChars}
    </ValueBlock>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>
      Breaking a sentence of 61 characters that include a space
    </Form.SubHeading>
    <ValueBlock label={sixtyOneCharsIncludingASpace}>
      {sixtyOneCharsIncludingASpace}
    </ValueBlock>
    <ValueBlock
      label={sixtyOneCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      {sixtyOneCharsIncludingASpace}
    </ValueBlock>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
    <ValueBlock
      label={fiftyEightCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      {'value'}
    </ValueBlock>
  </Form.Card>
</Flex.Stack>
`});function m(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return o||g(`Examples`,!1),c||g(`Examples.Default`,!0),u||g(`Examples.Help`,!0),d||g(`Examples.HelpHtml`,!0),l||g(`Examples.Inline`,!0),f||g(`Examples.Widths`,!0),p||g(`Examples.Wrapping`,!0),n||g(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h2,{children:`Help button`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h2,{children:`Help button with HTML`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Widths`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(n,{children:(0,s.jsx)(p,{})})]})}function h(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
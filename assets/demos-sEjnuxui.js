import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{b as r,t as i}from"./ComponentBox-a4aOn231.js";import{t as a}from"./TestElement-CGrmu8xx.js";import{zr as o}from"./index-DqqByKA2.js";var s=t({Default:()=>l,Help:()=>d,HelpHtml:()=>f,Inline:()=>u,Widths:()=>p,Wrapping:()=>m}),c=e(n()),l=()=>(0,c.jsx)(i,{scope:{ValueBlock:r},stableName:`Default`,children:`<ValueBlock label="Label text">Data-value goes here</ValueBlock>
`}),u=()=>(0,c.jsx)(i,{"data-visual-test":`value-block-inline`,scope:{ValueBlock:r},stableName:`Inline`,children:`<P>
  this is before the value <ValueBlock inline>Foo</ValueBlock>{' '}
  <ValueBlock inline>Bar</ValueBlock> this is after the value
</P>
`}),d=()=>(0,c.jsx)(i,{scope:{ValueBlock:r},"data-visual-test":`value-block-help-button`,stableName:`Help`,children:`<ValueBlock
  label="Label text"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
>
  Data-value goes here
</ValueBlock>
`}),f=()=>(0,c.jsx)(i,{scope:{ValueBlock:r},"data-visual-test":`value-block-help-button-html`,stableName:`HelpHtml`,children:`<ValueBlock
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
`}),p=()=>(0,c.jsx)(i,{scope:{ValueBlock:r,TestElement:a},hideCode:!0,"data-visual-test":`forms-value-block-widths`,stableName:`Widths`,children:`<Flex.Stack>
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
`}),m=()=>(0,c.jsx)(i,{scope:{ValueBlock:r,sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},"data-visual-test":`forms-value-block-wrapping`,stableName:`Wrapping`,children:`<Flex.Stack>
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
`});function h(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components},{VisibleWhenVisualTest:n}=t;return s||_(`Examples`,!1),l||_(`Examples.Default`,!0),d||_(`Examples.Help`,!0),f||_(`Examples.HelpHtml`,!0),u||_(`Examples.Inline`,!0),p||_(`Examples.Widths`,!0),m||_(`Examples.Wrapping`,!0),n||_(`VisibleWhenVisualTest`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Inline`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h2,{children:`Help button`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h2,{children:`Help button with HTML`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Widths`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(n,{children:(0,c.jsx)(m,{})})]})}function g(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};
import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Anchor-9saPtqqX.js";import{t as i}from"./P-BqMs-VnB.js";import{c as a}from"./ToggleButton-BMi2PwcS.js";import{t as o}from"./Card-ClZNWqpG.js";import{t as s}from"./Form-C8lTzZqR.js";import{t as c}from"./TestElement-ChPsu-BT.js";import{t as l}from"./ValueBlock-BkbSUpXr.js";import{K as u}from"./index-Bx3ttow-.js";import{t as d}from"./ComponentBox-CG7uqrFy.js";var f=e({Default:()=>m,Help:()=>g,HelpHtml:()=>_,Inline:()=>h,Widths:()=>v,Wrapping:()=>y}),p=t(n()),m=()=>(0,p.jsx)(d,{scope:{ValueBlock:l},stableName:`Default`,sourceImports:[`import { TestElement, ValueBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, P } from '@dnb/eufemia'`],__buildScope:{ValueBlock:l},children:`<ValueBlock label="Label text">Data-value goes here</ValueBlock>
`}),h=()=>(0,p.jsx)(d,{"data-visual-test":`value-block-inline`,scope:{ValueBlock:l},stableName:`Inline`,sourceImports:[`import { TestElement, ValueBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, P } from '@dnb/eufemia'`],__buildScope:{P:i,ValueBlock:l},children:`<P>
  this is before the value <ValueBlock inline>Foo</ValueBlock>{' '}
  <ValueBlock inline>Bar</ValueBlock> this is after the value
</P>
`}),g=()=>(0,p.jsx)(d,{scope:{ValueBlock:l},"data-visual-test":`value-block-help-button`,stableName:`Help`,sourceImports:[`import { TestElement, ValueBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, P } from '@dnb/eufemia'`],__buildScope:{ValueBlock:l},children:`<ValueBlock
  label="Label text"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
>
  Data-value goes here
</ValueBlock>
`}),_=()=>(0,p.jsx)(d,{scope:{ValueBlock:l},"data-visual-test":`value-block-help-button-html`,stableName:`HelpHtml`,sourceImports:[`import { TestElement, ValueBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, P } from '@dnb/eufemia'`],__buildScope:{ValueBlock:l,Anchor:r},children:`<ValueBlock
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
`}),v=()=>(0,p.jsx)(d,{scope:{ValueBlock:l,TestElement:c},hideCode:!0,"data-visual-test":`forms-value-block-widths`,stableName:`Widths`,sourceImports:[`import { TestElement, ValueBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, P } from '@dnb/eufemia'`],__buildScope:{Flex:a,ValueBlock:l},children:`<Flex.Stack>
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
`}),y=()=>(0,p.jsx)(d,{scope:{ValueBlock:l,sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},"data-visual-test":`forms-value-block-wrapping`,stableName:`Wrapping`,sourceImports:[`import { TestElement, ValueBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, P } from '@dnb/eufemia'`],__buildScope:{Flex:a,Form:s,Card:o,ValueBlock:l},children:`<Flex.Stack>
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
`});function b(e){let t={h2:`h2`,h3:`h3`,...u(),...e.components},{VisibleWhenVisualTest:n}=t;return f||S(`Examples`,!1),m||S(`Examples.Default`,!0),g||S(`Examples.Help`,!0),_||S(`Examples.HelpHtml`,!0),h||S(`Examples.Inline`,!0),v||S(`Examples.Widths`,!0),y||S(`Examples.Wrapping`,!0),n||S(`VisibleWhenVisualTest`,!0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.h2,{children:`Demos`}),`
`,(0,p.jsx)(m,{}),`
`,(0,p.jsx)(t.h3,{children:`Inline`}),`
`,(0,p.jsx)(h,{}),`
`,(0,p.jsx)(t.h2,{children:`Help button`}),`
`,(0,p.jsx)(g,{}),`
`,(0,p.jsx)(t.h2,{children:`Help button with HTML`}),`
`,(0,p.jsx)(_,{}),`
`,(0,p.jsx)(t.h3,{children:`Widths`}),`
`,(0,p.jsx)(v,{}),`
`,(0,p.jsx)(n,{children:(0,p.jsx)(y,{})})]})}function x(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};
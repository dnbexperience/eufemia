import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{X as r,t as i}from"./Anchor-9saPtqqX.js";import{t as a}from"./P-BqMs-VnB.js";import{t as o}from"./Link-DiFl42-p.js";import{t as s}from"./ListExport-D75QHdxY.js";import{n as c,t as l}from"./ListFormat-CSR_-4Ti.js";import{K as u,W as d}from"./index-Bx3ttow-.js";import{t as f}from"./ComponentBox-CG7uqrFy.js";var p=e({Inline:()=>y,ListTypes:()=>x,ListVariants:()=>b,UsingListFormatFunction:()=>h,WithChildren:()=>_,WithCustomFormat:()=>v,WithValue:()=>g}),m=t(n()),h=()=>(0,m.jsx)(f,{"data-visual-test":`list-format-function`,scope:{listFormat:c},stableName:`UsingListFormatFunction`,sourceImports:[`import { Fragment } from 'react'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { ListFormat, P, Badge, Anchor } from '@dnb/eufemia'`,`import { listFormat } from '@dnb/eufemia/components/list-format/ListFormat'`],__buildScope:{Anchor:i,Link:o,Badge:d},children:`{
  listFormat(
    [
      <Fragment key="a">A</Fragment>,
      <>
        <b>B</b>
      </>,
      <>C</>,
      'D',
      123,
      <Anchor
        target="_blank"
        href="https://github.com/dnbexperience/eufemia"
        rel="noopener noreferrer"
        key="github"
      >
        Link to Eufemia's Github Repo
      </Anchor>,
      <>
        Text <Badge content="Info" variant="information" /> Text
      </>,
    ],
    {
      format: {
        type: 'disjunction',
      },
      locale: 'en-US',
    }
  )
}
`}),g=()=>(0,m.jsx)(f,{"data-visual-test":`list-format-default`,stableName:`WithValue`,sourceImports:[`import { Fragment } from 'react'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { ListFormat, P, Badge, Anchor } from '@dnb/eufemia'`,`import { listFormat } from '@dnb/eufemia/components/list-format/ListFormat'`],__buildScope:{ListFormat:l,Anchor:i,Link:o,Badge:d},children:`<ListFormat
  value={[
    <Fragment key="a">A</Fragment>,
    <>
      <b>B</b>
    </>,
    <>C</>,
    'D',
    123,
    <Anchor
      target="_blank"
      href="https://github.com/dnbexperience/eufemia"
      rel="noopener noreferrer"
      key="github"
    >
      Link to Eufemia's Github Repo
    </Anchor>,
    <>
      Text <Badge content="Info" variant="information" /> Text
    </>,
  ]}
/>
`}),_=()=>(0,m.jsx)(f,{stableName:`WithChildren`,sourceImports:[`import { Fragment } from 'react'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { ListFormat, P, Badge, Anchor } from '@dnb/eufemia'`,`import { listFormat } from '@dnb/eufemia/components/list-format/ListFormat'`],__buildScope:{ListFormat:l,Anchor:i,Link:o,Badge:d},children:`<ListFormat>
  <Fragment key="a">A</Fragment>
  <>
    <b>B</b>
  </>
  <>C</>
  <>D</>
  123
  <Anchor
    target="_blank"
    href="https://github.com/dnbexperience/eufemia"
    rel="noopener noreferrer"
    key="github"
  >
    Link to Eufemia's Github Repo
  </Anchor>
  <>
    Text <Badge content="Info" variant="information" /> Text
  </>
</ListFormat>
`}),v=()=>(0,m.jsx)(f,{"data-visual-test":`list-format-custom-format`,stableName:`WithCustomFormat`,sourceImports:[`import { Fragment } from 'react'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { ListFormat, P, Badge, Anchor } from '@dnb/eufemia'`,`import { listFormat } from '@dnb/eufemia/components/list-format/ListFormat'`],__buildScope:{Provider:r,ListFormat:l,Anchor:i,Link:o,Badge:d},children:`<Provider locale="en-GB">
  <ListFormat
    value={[
      <Fragment key="a">A</Fragment>,
      <>
        <b>B</b>
      </>,
      <>C</>,
      'D',
      123,
      <Anchor
        target="_blank"
        href="https://github.com/dnbexperience/eufemia"
        rel="noopener noreferrer"
        key="github"
      >
        Link to Eufemia's Github Repo
      </Anchor>,
      <>
        Text <Badge content="Info" variant="information" /> Text
      </>,
    ]}
    format={{
      type: 'disjunction',
    }}
  />
</Provider>
`}),y=()=>(0,m.jsx)(f,{"data-visual-test":`list-format-inline`,stableName:`Inline`,sourceImports:[`import { Fragment } from 'react'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { ListFormat, P, Badge, Anchor } from '@dnb/eufemia'`,`import { listFormat } from '@dnb/eufemia/components/list-format/ListFormat'`],__buildScope:{P:a,ListFormat:l,Anchor:i,Link:o,Badge:d},children:`<P>
  This is before the component{' '}
  <ListFormat
    value={[
      123,
      <Anchor
        target="_blank"
        href="https://github.com/dnbexperience/eufemia"
        rel="noopener noreferrer"
        key="github"
      >
        Link to Eufemia's Github Repo
      </Anchor>,
      <>
        Text <Badge content="Info" variant="information" /> Text
      </>,
    ]}
  />{' '}
  This is after the component
</P>
`}),b=()=>(0,m.jsx)(f,{"data-visual-test":`list-format-variants`,stableName:`ListVariants`,sourceImports:[`import { Fragment } from 'react'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { ListFormat, P, Badge, Anchor } from '@dnb/eufemia'`,`import { listFormat } from '@dnb/eufemia/components/list-format/ListFormat'`],__buildScope:{P:a,List:s,ListFormat:l},children:`
<P>Ordered List:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" />
<P>Unordered List:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ul" />

`}),x=()=>(0,m.jsx)(f,{"data-visual-test":`list-format-types`,stableName:`ListTypes`,sourceImports:[`import { Fragment } from 'react'`,`import { Provider } from '@dnb/eufemia/shared'`,`import { ListFormat, P, Badge, Anchor } from '@dnb/eufemia'`,`import { listFormat } from '@dnb/eufemia/components/list-format/ListFormat'`],__buildScope:{P:a,List:s,ListFormat:l},children:`
<P>Ordered List a:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="a" />
<P>Ordered List A:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="A" />
<P>Ordered List i:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="i" />
<P>Ordered List I:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="I" />
<P>Unordered List square:</P>
<ListFormat
  value={['Foo', 'Bar', 'Baz']}
  variant="ul"
  listType="square"
/>
<P>Unordered List circle:</P>
<ListFormat
  value={['Foo', 'Bar', 'Baz']}
  variant="ul"
  listType="circle"
/>
<P>Unordered List unstyled:</P>
<ListFormat
  value={['Foo', 'Bar', 'Baz']}
  variant="ul"
  listType="unstyled"
/>

`});function S(e){let t={code:`code`,h2:`h2`,h3:`h3`,...u(),...e.components};return p||w(`Examples`,!1),y||w(`Examples.Inline`,!0),x||w(`Examples.ListTypes`,!0),b||w(`Examples.ListVariants`,!0),h||w(`Examples.UsingListFormatFunction`,!0),_||w(`Examples.WithChildren`,!0),v||w(`Examples.WithCustomFormat`,!0),g||w(`Examples.WithValue`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsxs)(t.h3,{children:[`Basic usage with `,(0,m.jsx)(t.code,{children:`value`})]}),`
`,(0,m.jsx)(g,{}),`
`,(0,m.jsxs)(t.h3,{children:[`Basic usage with `,(0,m.jsx)(t.code,{children:`children`})]}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(t.h3,{children:`Custom format`}),`
`,(0,m.jsx)(v,{}),`
`,(0,m.jsx)(t.h3,{children:`Inline`}),`
`,(0,m.jsx)(y,{}),`
`,(0,m.jsx)(t.h3,{children:`List variants`}),`
`,(0,m.jsx)(b,{}),`
`,(0,m.jsx)(t.h3,{children:`List types`}),`
`,(0,m.jsx)(x,{}),`
`,(0,m.jsx)(t.h3,{children:`Using listFormat function`}),`
`,(0,m.jsx)(h,{})]})}function C(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};
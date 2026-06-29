import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Anchor-BPx9fjvj.js";import{Ft as r,It as i,Nt as a,Pt as o}from"./forms-D54jfDKN.js";import{n as s,t as c}from"./Ul-kZ0OphyC.js";import{t as l}from"./Link-DsLLxgOh.js";import{U as u}from"./index-BsJ3GLEw.js";import{t as d}from"./ComponentBox-sLMgHvLi.js";var f=e(t()),p=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`lists-dl`,stableName:`DefinitionListExample`,sourceImports:[`import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Dl:r,Dt:o,Dd:i},children:`<Dl>
  <Dt>Term</Dt>
  <Dd>Description</Dd>
  <Dt>Term</Dt>
  <Dd>Description 1</Dd>
  <Dd>Description 2</Dd>
  <Dd>Description 3</Dd>
  <Dd>
    <Dl>
      <Dt>Sub Term</Dt>
      <Dd>Sub Description</Dd>
    </Dl>
  </Dd>
</Dl>
`}),m=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`lists-dl-horizontal`,stableName:`DefinitionListHorizontalExample`,sourceImports:[`import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Dl:r,Dt:o,Dd:i},children:`<Dl layout="horizontal">
  <Dl.Item>
    <Dt>Term 1</Dt>
    <Dd>Description 1</Dd>
  </Dl.Item>
  <Dl.Item>
    <Dt>Term 2</Dt>
    <Dd>Description 2</Dd>
  </Dl.Item>
  <Dl.Item>
    <Dt>
      A term with several words lorem dolor sit amet consectetur adipiscing
    </Dt>
    <Dd>
      Description with several words lorem nulla mi posuere cubilia vel
      vulputate
    </Dd>
  </Dl.Item>
</Dl>
`}),h=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`lists-dl-grid`,stableName:`DefinitionListGridExample`,sourceImports:[`import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Dl:r,Dt:o,Dd:i},children:`<Dl layout="grid">
  <Dt>Term 1</Dt>
  <Dd>Description 1</Dd>

  <Dt>Term 2</Dt>
  <Dd>Description 2</Dd>

  <Dt>A term with several words lorem dolor sit amet</Dt>
  <Dd>
    Description with several words lorem nulla mi posuere cubilia vel
    vulputate
  </Dd>
</Dl>
`}),g=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`lists-ul`,stableName:`UnorderedListExample`,sourceImports:[`import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Ul:c,Li:s,Anchor:n,Link:l},children:`<Ul>
  <Li>Item 1</Li>
  <Li>Item 2</Li>
  <Li>
    Item 3
    <Ul>
      <Li>
        Item 1 <br />
        Break with a <Anchor href="/">Anchor (Text Link)</Anchor>
      </Li>
      <Li>Item 2</Li>
    </Ul>
  </Li>
  <Li>Item 4</Li>
</Ul>
`}),_=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`lists-ol`,stableName:`OrderedListNestedExample`,sourceImports:[`import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Ol:a,Li:s},children:`<Ol nested>
  <Li>Item</Li>
  <Li>
    Item
    <Ol>
      <Li>
        Item
        <Ol>
          <Li>Item</Li>
          <Li>Item</Li>
        </Ol>
      </Li>
      <Li>
        Item
        <Ol>
          <Li>Item</Li>
          <Li>Item</Li>
        </Ol>
      </Li>
    </Ol>
  </Li>
  <Li>Item</Li>
</Ol>
`}),v=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`lists-ol-style-position`,stableName:`OrderedListStylePositionExample`,sourceImports:[`import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Ol:a,Li:s},noInline:!0,children:`const WidthLimit = styled.div\`
  max-width: 22rem;
  .dnb-ol li::before {
    font-weight: var(--font-weight-bold);
  }
\`
render(
  <WidthLimit>
    <Ol nested className="dnb-ol--outside">
      <Li>
        Using <code className="dnb-code">dnb-ol--outside</code> (default):
        Using Porta commodo tempus interdum habitant urna magna aliquet
        quam nisl
        <Ol>
          <Li>
            Porta commodo tempus interdum habitant urna magna aliquet quam
            nisl
          </Li>
        </Ol>
      </Li>
    </Ol>
    <Ol nested className="dnb-ol--inside">
      <Li>
        New ol, using <code className="dnb-code">dnb-ol--inside</code>:
        Porta commodo tempus interdum habitant urna magna aliquet quam nisl
        <Ol>
          <Li>
            Porta commodo tempus interdum habitant urna magna aliquet quam
            nisl
          </Li>
        </Ol>
      </Li>
    </Ol>
  </WidthLimit>
)
`}),y=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`lists-ol-types`,stableName:`OrderedListOtherTypesExample`,sourceImports:[`import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Ol:a,Li:s},children:`<Ol type="A">
  <Li>Item</Li>
  <Li>
    Item
    <Ol type="I" start={3}>
      <Li>
        Item
        <Ol type="i">
          <Li>Item</Li>
          <Li>Item</Li>
        </Ol>
      </Li>
    </Ol>
  </Li>
  <Li>Item</Li>
</Ol>
`}),b=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`lists-reset`,stableName:`RemoveListExample`,sourceImports:[`import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],children:`
<ul className="dnb-ul dnb-unstyled-list">
  <li>ul Item</li>
</ul>
<ol className="dnb-ol dnb-unstyled-list">
  <li>ol Item</li>
</ol>
<dl className="dnb-dl dnb-unstyled-list">
  <dt>dl Title</dt>
  <dd>dl Description</dd>
</dl>

`}),x=()=>(0,f.jsx)(d,{hideCode:!0,"data-visual-test":`ul-inside-ol`,stableName:`UlInsideOl`,sourceImports:[`import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Ol:a,Li:s,Ul:c},children:`<Ol>
  <Li>
    Ordered item 1
    <Ul>
      <Li>Unordered item 1</Li>
      <Li>Unordered item 2</Li>
      <Li>Unordered item 3</Li>
    </Ul>
  </Li>
  <Li>Ordered item 2</Li>
</Ol>
`});function S(e){let t={code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,p:`p`,...u(),...e.components};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Demos`}),`
`,(0,f.jsx)(t.h3,{children:`Unordered Lists`}),`
`,(0,f.jsx)(g,{}),`
`,(0,f.jsx)(t.h3,{children:`Ordered Lists (nested)`}),`
`,(0,f.jsxs)(t.p,{children:[`Nested `,(0,f.jsx)(t.code,{children:`<ol>`}),` list by using `,(0,f.jsx)(t.code,{children:`.dnb-ol--nested`}),`.`]}),`
`,(0,f.jsx)(_,{}),`
`,(0,f.jsx)(t.h3,{children:`Unordered Lists inside Ordered Lists`}),`
`,(0,f.jsx)(x,{}),`
`,(0,f.jsx)(t.h4,{children:`Ordered list style position (outside vs inside)`}),`
`,(0,f.jsx)(t.p,{children:`The list marker will be inside of wrapped text / text with newlines.`}),`
`,(0,f.jsxs)(t.p,{children:[`Nested `,(0,f.jsx)(t.code,{children:`<ol>`}),` with inside modifier `,(0,f.jsx)(t.code,{children:`.dnb-ol--inside`}),`.`]}),`
`,(0,f.jsx)(v,{}),`
`,(0,f.jsx)(t.h4,{children:`Ordered list with other types`}),`
`,(0,f.jsxs)(t.p,{children:[`Ordered lists do support natively other types, like `,(0,f.jsx)(t.em,{children:`letters`}),` and `,(0,f.jsx)(t.em,{children:`roman numerals`}),`. You can define that by using the `,(0,f.jsx)(t.code,{children:`type`}),` HTML attribute.`]}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`<ol>`}),` with custom type.`]}),`
`,(0,f.jsx)(y,{}),`
`,(0,f.jsx)(t.h3,{children:`Definition Lists`}),`
`,(0,f.jsx)(t.p,{children:`Use Definition Lists whenever you have to tie together any items that have a direct relationship with each other (name/value sets).`}),`
`,(0,f.jsxs)(t.p,{children:[`You can use multiples of `,(0,f.jsx)(t.code,{children:`<dt>`}),` and `,(0,f.jsx)(t.code,{children:`<dd>`}),` within a definition list.`]}),`
`,(0,f.jsxs)(t.p,{children:[`You can also use block level elements in the definition description, such as the `,(0,f.jsx)(t.code,{children:`<p>`}),` and `,(0,f.jsx)(t.code,{children:`<ul>`}),` elements. But you cannot use block level elements inside a definition term.`]}),`
`,(0,f.jsx)(t.p,{children:`Any styling can be applied.`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h3,{children:`Definition List in horizontal direction`}),`
`,(0,f.jsxs)(t.p,{children:[`When using the `,(0,f.jsx)(t.code,{children:`layout="horizontal"`}),` property, the term and description will be wrapped in a `,(0,f.jsx)(t.code,{children:`Dl.Item`}),` element. You can only use one `,(0,f.jsx)(t.code,{children:`Dd`}),` element per `,(0,f.jsx)(t.code,{children:`Dt`}),` element.`]}),`
`,(0,f.jsx)(t.p,{children:`The term and description are aligned on the bottom.`}),`
`,(0,f.jsx)(m,{}),`
`,(0,f.jsx)(t.h4,{children:`Definition List with a Grid pattern`}),`
`,(0,f.jsxs)(t.p,{children:[`You can only use one `,(0,f.jsx)(t.code,{children:`Dd`}),` element per `,(0,f.jsx)(t.code,{children:`Dt`}),` element.`]}),`
`,(0,f.jsx)(t.p,{children:`The term and description are aligned on the bottom.`}),`
`,(0,f.jsx)(h,{}),`
`,(0,f.jsx)(t.h3,{children:`Remove list styles`}),`
`,(0,f.jsx)(b,{})]})}function C(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(S,{...e})}):S(e)}export{C as default};
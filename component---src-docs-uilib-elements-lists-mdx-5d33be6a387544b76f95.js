"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[3480],{37952:function(n,e,i){i.r(e),i.d(e,{default:function(){return x}});var t=i(52322),s=i(45392),l=i(35823);const d=()=>(0,t.jsx)(l.Z,{hideCode:!0,"data-visual-test":"lists-dl",children:"<Dl>\n  <Dt>Term</Dt>\n  <Dd>Description</Dd>\n  <Dt>Term</Dt>\n  <Dd>Description 1</Dd>\n  <Dd>Description 2</Dd>\n  <Dd>Description 3</Dd>\n  <Dd>\n    <Dl>\n      <Dt>Sub Term</Dt>\n      <Dd>Sub Description</Dd>\n    </Dl>\n  </Dd>\n</Dl>\n"}),o=()=>(0,t.jsx)(l.Z,{hideCode:!0,"data-visual-test":"lists-dl-horizontal",children:'<Dl direction="horizontal">\n  <Dl.Item>\n    <Dt>Term</Dt>\n    <Dd>Description</Dd>\n  </Dl.Item>\n  <Dl.Item>\n    <Dt>A term with several words</Dt>\n    <Dd>\n      Description with several words lorem nulla mi posuere cubilia vel\n      vulputate\n    </Dd>\n  </Dl.Item>\n</Dl>\n'}),r=()=>(0,t.jsx)(l.Z,{hideCode:!0,"data-visual-test":"lists-ul",children:'<Ul>\n  <Li>Item 1</Li>\n  <Li>Item 2</Li>\n  <Li>\n    Item 3\n    <Ul>\n      <Li>\n        Item 1 <br />\n        Break with a <Anchor href="/">Anchor (Text Link</Anchor>\n      </Li>\n      <Li>Item 2</Li>\n    </Ul>\n  </Li>\n  <Li>Item 4</Li>\n</Ul>\n'}),a=()=>(0,t.jsx)(l.Z,{hideCode:!0,"data-visual-test":"lists-ol",children:"<Ol nested>\n  <Li>Item</Li>\n  <Li>\n    Item\n    <Ol>\n      <Li>\n        Item\n        <Ol>\n          <Li>Item</Li>\n          <Li>Item</Li>\n        </Ol>\n      </Li>\n      <Li>\n        Item\n        <Ol>\n          <Li>Item</Li>\n          <Li>Item</Li>\n        </Ol>\n      </Li>\n    </Ol>\n  </Li>\n  <Li>Item</Li>\n</Ol>\n"}),c=()=>(0,t.jsx)(l.Z,{hideCode:!0,"data-visual-test":"lists-ol-style-position",noInline:!0,children:'const WidthLimit = styled.div`\n  max-width: 22rem;\n  .dnb-ol li::before {\n    font-weight: var(--font-weight-bold);\n  }\n`\nrender(\n  <WidthLimit>\n    <Ol nested className="dnb-ol--outside">\n      <Li>\n        Using <code className="dnb-code">dnb-ol--outside</code> (default):\n        Using Porta commodo tempus interdum habitant urna magna aliquet\n        quam nisl\n        <Ol>\n          <Li>\n            Porta commodo tempus interdum habitant urna magna aliquet quam\n            nisl\n          </Li>\n        </Ol>\n      </Li>\n    </Ol>\n    <Ol nested className="dnb-ol--inside">\n      <Li>\n        New ol, using <code className="dnb-code">dnb-ol--inside</code>:\n        Porta commodo tempus interdum habitant urna magna aliquet quam nisl\n        <Ol>\n          <Li>\n            Porta commodo tempus interdum habitant urna magna aliquet quam\n            nisl\n          </Li>\n        </Ol>\n      </Li>\n    </Ol>\n  </WidthLimit>,\n)\n'}),h=()=>(0,t.jsx)(l.Z,{hideCode:!0,"data-visual-test":"lists-ol-types",children:'<Ol type="A">\n  <Li>Item</Li>\n  <Li>\n    Item\n    <Ol type="I" start={3}>\n      <Li>\n        Item\n        <Ol type="i">\n          <Li>Item</Li>\n          <Li>Item</Li>\n        </Ol>\n      </Li>\n    </Ol>\n  </Li>\n  <Li>Item</Li>\n</Ol>\n'}),m=()=>(0,t.jsx)(l.Z,{hideCode:!0,"data-visual-test":"lists-reset",children:'\n<ul className="dnb-ul dnb-unstyled-list">\n  <li>ul Item</li>\n</ul>\n<ol className="dnb-ol dnb-unstyled-list">\n  <li>ol Item</li>\n</ol>\n<dl className="dnb-dl dnb-unstyled-list">\n  <dt>dl Title</dt>\n  <dd>dl Description</dd>\n</dl>\n\n'});function u(n){const e=Object.assign({h1:"h1",h2:"h2",ul:"ul",li:"li",code:"code",p:"p",pre:"pre",h3:"h3",em:"em"},(0,s.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{children:"Lists"}),"\n",(0,t.jsx)(e.h2,{children:"List modifiers"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:".dnb-ul--nested"})," / ",(0,t.jsx)(e.code,{children:".dnb-ol--nested"})," will ensure a nested structure of several lists"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:".dnb-ol--outside"})," (default) defines the position of the marker"]}),"\n",(0,t.jsxs)(e.li,{children:[(0,t.jsx)(e.code,{children:".dnb-ol--inside"})," defines the position of the marker"]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"With React you can also send in the modifiers as booleans:"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:"import { Ol } from '@dnb/eufemia'\n\nrender(\n  <Ol nested inside>\n    <li>Item</li>\n  </Ol>,\n)\n"})}),"\n",(0,t.jsx)(e.h2,{children:"Unordered Lists"}),"\n",(0,t.jsx)(r,{}),"\n",(0,t.jsx)(e.h2,{children:"Ordered Lists (nested)"}),"\n",(0,t.jsxs)(e.p,{children:["Nested ",(0,t.jsx)(e.code,{children:"<ol>"})," list by using ",(0,t.jsx)(e.code,{children:".dnb-ol--nested"}),"."]}),"\n",(0,t.jsx)(a,{}),"\n",(0,t.jsx)(e.h3,{children:"Ordered list style position (outside vs inside)"}),"\n",(0,t.jsx)(e.p,{children:"The list marker will be inside of wrapped text / text with newlines."}),"\n",(0,t.jsxs)(e.p,{children:["Nested ",(0,t.jsx)(e.code,{children:"<ol>"})," with inside modifier ",(0,t.jsx)(e.code,{children:".dnb-ol--inside"}),"."]}),"\n",(0,t.jsx)(c,{}),"\n",(0,t.jsx)(e.h3,{children:"Ordered list with other types"}),"\n",(0,t.jsxs)(e.p,{children:["Ordered lists do support natively other types, like ",(0,t.jsx)(e.em,{children:"letters"})," and ",(0,t.jsx)(e.em,{children:"roman numerals"}),". You can define that by using the ",(0,t.jsx)(e.code,{children:"type"})," HTML attribute."]}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"<ol>"})," with custom type."]}),"\n",(0,t.jsx)(h,{}),"\n",(0,t.jsx)(e.h2,{children:"Definition Lists"}),"\n",(0,t.jsx)(e.p,{children:"Use Definition Lists when ever you have to tie together any items that have a direct relationship with each other (name/value sets)."}),"\n",(0,t.jsxs)(e.p,{children:["You can use multiples of ",(0,t.jsx)(e.code,{children:"<dt>"})," and ",(0,t.jsx)(e.code,{children:"<dd>"})," within a definition list."]}),"\n",(0,t.jsxs)(e.p,{children:["You can also use block level elements in the definition description, such as the ",(0,t.jsx)(e.code,{children:"<p>"})," and ",(0,t.jsx)(e.code,{children:"<ul>"})," elements. But you cannot use block level elements inside a definition term."]}),"\n",(0,t.jsx)(e.p,{children:"Any styling can be applied."}),"\n",(0,t.jsx)(d,{}),"\n",(0,t.jsx)(e.h3,{children:"Definition List in horizontal direction"}),"\n",(0,t.jsx)(o,{}),"\n",(0,t.jsx)(e.h2,{children:"Remove list styles"}),"\n",(0,t.jsx)(m,{})]})}var x=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(u,n)})):u(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-elements-lists-mdx-5d33be6a387544b76f95.js.map
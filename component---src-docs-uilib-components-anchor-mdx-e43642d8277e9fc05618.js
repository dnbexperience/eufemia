"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[82605,14419],{15198:function(n,e,r){r.r(e);var s=r(52322),o=r(45392),c=r(65677),h=r(21786);function a(n){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(c.default,{}),"\n",(0,s.jsx)(h.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,s.jsx)(e,Object.assign({},n,{children:(0,s.jsx)(a,n)})):a()}},65677:function(n,e,r){r.r(e);var s=r(52322),o=r(45392);function c(n){const e=Object.assign({h2:"h2",pre:"pre",code:"code",p:"p",h3:"h3",strong:"strong"},(0,o.ah)(),n.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h2,{children:"Import"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-tsx",children:"import { Anchor } from '@dnb/eufemia'\n"})}),"\n",(0,s.jsx)(e.h2,{children:"Description"}),"\n",(0,s.jsxs)(e.p,{children:["The Anchor, also knows as ",(0,s.jsx)(e.code,{children:"Link"})," is used to navigate from one page to the next HTML page."]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-jsx",children:"import { Link, Anchor } from '@dnb/eufemia'\nrender(<Anchor href=\"/uilib/components/anchor\">Accessible text</Anchor>)\n"})}),"\n",(0,s.jsx)(e.h3,{children:"Combine a Link with an Anchor"}),"\n",(0,s.jsx)(e.p,{children:"You can combine a meta framework link, with the Anchor. This way, all the framework provided features will still work, as well as the behavior of the Eufemia Anchor."}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-jsx",children:"import Anchor from '@dnb/eufemia/components/Anchor'\nimport { Link } from 'gatsby'\n\nrender(\n  <App>\n    <Anchor element={Link} to=\"/path\">\n      Link\n    </Anchor>\n  </App>,\n)\n"})}),"\n",(0,s.jsx)(e.h3,{children:"Anchor hash"}),"\n",(0,s.jsxs)(e.p,{children:["Some browsers like Chrome (behind a flag) does still not support animated anchor hash clicks when CSS ",(0,s.jsx)(e.code,{children:"scroll-behavior: smooth;"})," is set. To make it work, you can provide the ",(0,s.jsx)(e.code,{children:"scrollToHashHandler"})," helper function to the Anchor:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-jsx",children:'import Anchor, {\n  scrollToHashHandler,\n} from \'@dnb/eufemia/components/Anchor\'\n\nrender(\n  <App>\n    <Anchor href="/path#hash-id" onClick={scrollToHashHandler}>\n      Link\n    </Anchor>\n\n    <div id="hash-id">element to scroll to</div>\n  </App>,\n)\n'})}),"\n",(0,s.jsxs)(e.p,{children:["Or with the ",(0,s.jsx)(e.code,{children:"scrollToHash"})," helper function:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-jsx",children:"import Anchor, { scrollToHash } from '@dnb/eufemia/components/Anchor'\n\nscrollToHash('/path#hash-id')\n\nrender(\n  <App>\n    <div id=\"hash-id\">element to scroll to</div>\n  </App>,\n)\n"})}),"\n",(0,s.jsx)(e.h2,{children:"Blank target"}),"\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.strong,{children:"NB:"})," If you only use a vanilla HTML anchor element including ",(0,s.jsx)(e.code,{children:'target="_blank"'})," then you have to ensure you add a ",(0,s.jsx)(e.code,{children:"title"})," attribute that includes ",(0,s.jsx)(e.code,{children:"Opens a new Window"})," or as a part of the text:"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-html",children:'<a\n  title="Opens a new Window"\n  target="_blank"\n  href="https://"\n  class="dnb-anchor"\n>\n  text (opens in new window)\n</a>\n'})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,s.jsx)(e,Object.assign({},n,{children:(0,s.jsx)(c,n)})):c(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-anchor-mdx-e43642d8277e9fc05618.js.map
"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[98703,1339,82449],{79375:function(n,e,t){t.r(e);var r=t(52322),i=t(45392),o=t(10663),s=t(75301);function a(n){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.default,{}),"\n",(0,r.jsx)(s.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(a,n)})):a()}},75301:function(n,e,t){t.r(e),t.d(e,{default:function(){return x}});var r={};t.r(r),t.d(r,{Inline:function(){return u},ListTypes:function(){return p},ListVariants:function(){return m},UsingListFormatFunction:function(){return l},WithChildren:function(){return d},WithCustomFormat:function(){return h},WithValue:function(){return c}});var i=t(52322),o=t(45392),s=(t(2784),t(41404)),a=t(18792);const l=()=>(0,i.jsx)(s.Z,{"data-visual-test":"list-format-function",scope:{listFormat:a.X},children:'{\n  listFormat(\n    [\n      <React.Fragment key="a">A</React.Fragment>,\n      <>\n        <b>B</b>\n      </>,\n      <>C</>,\n      \'D\',\n      123,\n      <Anchor\n        target="_blank"\n        href="https://github.com/dnbexperience/eufemia"\n        rel="noopener noreferrer"\n        key="github"\n      >\n        Link to Eufemia\'s Github Repo\n      </Anchor>,\n      <>\n        Text <Badge content="Info" variant="information" /> Text\n      </>,\n    ],\n    {\n      format: {\n        type: \'disjunction\',\n      },\n      locale: \'en-US\',\n    },\n  )\n}\n'}),c=()=>(0,i.jsx)(s.Z,{"data-visual-test":"list-format-default",children:'<ListFormat\n  value={[\n    <React.Fragment key="a">A</React.Fragment>,\n    <>\n      <b>B</b>\n    </>,\n    <>C</>,\n    \'D\',\n    123,\n    <Anchor\n      target="_blank"\n      href="https://github.com/dnbexperience/eufemia"\n      rel="noopener noreferrer"\n      key="github"\n    >\n      Link to Eufemia\'s Github Repo\n    </Anchor>,\n    <>\n      Text <Badge content="Info" variant="information" /> Text\n    </>,\n  ]}\n/>\n'}),d=()=>(0,i.jsx)(s.Z,{children:'<ListFormat>\n  <React.Fragment key="a">A</React.Fragment>\n  <>\n    <b>B</b>\n  </>\n  <>C</>\n  <>D</>\n  123\n  <Anchor\n    target="_blank"\n    href="https://github.com/dnbexperience/eufemia"\n    rel="noopener noreferrer"\n    key="github"\n  >\n    Link to Eufemia\'s Github Repo\n  </Anchor>\n  <>\n    Text <Badge content="Info" variant="information" /> Text\n  </>\n</ListFormat>\n'}),h=()=>(0,i.jsx)(s.Z,{"data-visual-test":"list-format-custom-format",children:'<Provider locale="en-GB">\n  <ListFormat\n    value={[\n      <React.Fragment key="a">A</React.Fragment>,\n      <>\n        <b>B</b>\n      </>,\n      <>C</>,\n      \'D\',\n      123,\n      <Anchor\n        target="_blank"\n        href="https://github.com/dnbexperience/eufemia"\n        rel="noopener noreferrer"\n        key="github"\n      >\n        Link to Eufemia\'s Github Repo\n      </Anchor>,\n      <>\n        Text <Badge content="Info" variant="information" /> Text\n      </>,\n    ]}\n    format={{\n      type: \'disjunction\',\n    }}\n  />\n</Provider>\n'}),u=()=>(0,i.jsx)(s.Z,{"data-visual-test":"list-format-inline",children:'<P>\n  This is before the component{\' \'}\n  <ListFormat\n    value={[\n      123,\n      <Anchor\n        target="_blank"\n        href="https://github.com/dnbexperience/eufemia"\n        rel="noopener noreferrer"\n        key="github"\n      >\n        Link to Eufemia\'s Github Repo\n      </Anchor>,\n      <>\n        Text <Badge content="Info" variant="information" /> Text\n      </>,\n    ]}\n  />{\' \'}\n  This is after the component\n</P>\n'}),m=()=>(0,i.jsx)(s.Z,{"data-visual-test":"list-format-variants",children:"\n<P>Ordered List:</P>\n<ListFormat value={['Foo', 'Bar', 'Baz']} variant=\"ol\" />\n<P>Unordered List:</P>\n<ListFormat value={['Foo', 'Bar', 'Baz']} variant=\"ul\" />\n\n"}),p=()=>(0,i.jsx)(s.Z,{"data-visual-test":"list-format-types",children:"\n<P>Ordered List a:</P>\n<ListFormat value={['Foo', 'Bar', 'Baz']} variant=\"ol\" listType=\"a\" />\n<P>Ordered List A:</P>\n<ListFormat value={['Foo', 'Bar', 'Baz']} variant=\"ol\" listType=\"A\" />\n<P>Ordered List i:</P>\n<ListFormat value={['Foo', 'Bar', 'Baz']} variant=\"ol\" listType=\"i\" />\n<P>Ordered List I:</P>\n<ListFormat value={['Foo', 'Bar', 'Baz']} variant=\"ol\" listType=\"I\" />\n<P>Unordered List square:</P>\n<ListFormat\n  value={['Foo', 'Bar', 'Baz']}\n  variant=\"ul\"\n  listType=\"square\"\n/>\n<P>Unordered List circle:</P>\n<ListFormat\n  value={['Foo', 'Bar', 'Baz']}\n  variant=\"ul\"\n  listType=\"circle\"\n/>\n<P>Unordered List unstyled:</P>\n<ListFormat\n  value={['Foo', 'Bar', 'Baz']}\n  variant=\"ul\"\n  listType=\"unstyled\"\n/>\n\n"});function f(n){const e=Object.assign({h2:"h2",h3:"h3",code:"code"},(0,o.ah)(),n.components);return r||j("Examples",!1),u||j("Examples.Inline",!0),p||j("Examples.ListTypes",!0),m||j("Examples.ListVariants",!0),l||j("Examples.UsingListFormatFunction",!0),d||j("Examples.WithChildren",!0),h||j("Examples.WithCustomFormat",!0),c||j("Examples.WithValue",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Demos"}),"\n",(0,i.jsxs)(e.h3,{children:["Basic usage with ",(0,i.jsx)(e.code,{children:"value"})]}),"\n",(0,i.jsx)(c,{}),"\n",(0,i.jsxs)(e.h3,{children:["Basic usage with ",(0,i.jsx)(e.code,{children:"children"})]}),"\n",(0,i.jsx)(d,{}),"\n",(0,i.jsx)(e.h3,{children:"Custom format"}),"\n",(0,i.jsx)(h,{}),"\n",(0,i.jsx)(e.h3,{children:"Inline"}),"\n",(0,i.jsx)(u,{}),"\n",(0,i.jsx)(e.h3,{children:"List variants"}),"\n",(0,i.jsx)(m,{}),"\n",(0,i.jsx)(e.h3,{children:"List types"}),"\n",(0,i.jsx)(p,{}),"\n",(0,i.jsx)(e.h3,{children:"Using listFormat function"}),"\n",(0,i.jsx)(l,{})]})}var x=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(f,n)})):f(n)};function j(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},10663:function(n,e,t){t.r(e);var r=t(52322),i=t(45392);function o(n){const e=Object.assign({h2:"h2",pre:"pre",code:"code",p:"p",ul:"ul",li:"li",a:"a"},(0,i.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Import"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-tsx",children:"import { ListFormat } from '@dnb/eufemia'\n"})}),"\n",(0,r.jsx)(e.h2,{children:"Description"}),"\n",(0,r.jsx)(e.p,{children:"A ready-to-use list formatter. Use it wherever you have to display a list of strings, numbers, or React components (JSX)."}),"\n",(0,r.jsx)(e.p,{children:"Good reasons for why we have this is to:"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Uniform the creation and formatting of lists."}),"\n",(0,r.jsx)(e.li,{children:"Supports translation and localization."}),"\n",(0,r.jsx)(e.li,{children:"Built on top of web standards."}),"\n"]}),"\n",(0,r.jsxs)(e.p,{children:["The component is designed to maximum display 10-20 items.\nIf you need to display more items than that, consider a different design, and perhaps using ",(0,r.jsx)(e.a,{href:"/uilib/components/pagination",children:"Pagination"})," and/or ",(0,r.jsx)(e.a,{href:"/uilib/components/pagination/infinity-scroller",children:"InfinityScroller"}),"."]}),"\n",(0,r.jsxs)(e.p,{children:["When the ",(0,r.jsx)(e.code,{children:"variant"})," property is set to ",(0,r.jsx)(e.code,{children:"text"})," (default), the browser API ",(0,r.jsx)(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat",children:"Intl.ListFormat"})," will be used with additional React components (JSX) support."]}),"\n",(0,r.jsxs)(e.p,{children:["When the ",(0,r.jsx)(e.code,{children:"variant"})," is set to a non-",(0,r.jsx)(e.code,{children:"text"})," variant, it uses ",(0,r.jsx)(e.a,{href:"/uilib/elements/lists/",children:"Lists"})," to render the given list."]}),"\n",(0,r.jsx)(e.h2,{children:"Formatting only"}),"\n",(0,r.jsxs)(e.p,{children:["You can use the ",(0,r.jsx)(e.code,{children:"listFormat"})," function without using the React Component ",(0,r.jsx)(e.code,{children:"ListFormat"}),", to format strings, numbers, or React components (JSX) as a string. It does not return lists(ol, ul, etc)."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"import { listFormat } from '@dnb/eufemia/components/ListFormat'\n\nreturn listFormat(myList, {\n  format: { type: 'disjunction' },\n  locale: 'en-US',\n})\n"})}),"\n",(0,r.jsxs)(e.p,{children:["See the following ",(0,r.jsx)(e.a,{href:"/uilib/components/list-format/demos/#using-listformat-function",children:"demo"})," for a more detailed example."]}),"\n",(0,r.jsxs)(e.p,{children:["The ",(0,r.jsx)(e.code,{children:"listFormat"})," function supports an object with ",(0,r.jsx)(e.code,{children:"{ format, locale }"})," as the second parameter. ",(0,r.jsx)(e.code,{children:"format"})," and ",(0,r.jsx)(e.code,{children:"locale"})," will accept the same values as documented in ",(0,r.jsx)(e.a,{href:"/uilib/components/list-format/properties/",children:"format property"})," of the ",(0,r.jsx)(e.code,{children:"ListFormat"})," component."]})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(o,n)})):o(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-list-format-mdx-0e9c19008004a227f202.js.map
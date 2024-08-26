"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[87707],{1119:function(e,n,a){a.r(n);var s=a(52322),r=a(45392);function t(e){const n=Object.assign({h2:"h2",p:"p",ol:"ol",li:"li",code:"code",a:"a",pre:"pre"},(0,r.ah)(),e.components);return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{children:"Description"}),"\n",(0,s.jsx)(n.p,{children:"Iterate is a set of components and functionality designed for traversing values and parts of data sets, such as arrays."}),"\n",(0,s.jsx)(n.p,{children:"It is particularly useful when dealing with data that contains a varying number of items, as the number of components on the screen depends on the number of items in the data."}),"\n",(0,s.jsx)(n.h2,{children:"Usage"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Define a ",(0,s.jsx)(n.code,{children:"value"})," prop with an array of items you want to iterate over. This can be a list of strings, objects, or any other type of data."]}),"\n",(0,s.jsxs)(n.li,{children:["Put ",(0,s.jsx)(n.a,{href:"/uilib/extensions/forms/all-fields/",children:"Field.*"})," or ",(0,s.jsx)(n.a,{href:"/uilib/extensions/forms/Value/",children:"Values.*"})," with an ",(0,s.jsx)(n.code,{children:"itemPath"})," inside."]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { Iterate, Field } from '@dnb/eufemia/extensions/forms'\n\nrender(\n  <Iterate.Array value={['foo', 'bar']} onChange={console.log}>\n    <Field.String itemPath=\"/\" />\n  </Iterate.Array>,\n)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["You can also iterate over objects and easily integrate it with the ",(0,s.jsx)(n.a,{href:"/uilib/extensions/forms/Form/Handler",children:"Form.Handler"})," data handling, as shown in the example below:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-tsx",children:"import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'\n\nrender(\n  <Form.Handler\n    defaultData={{\n      listOfHeroes: [\n        { name: 'Iron Man' },\n        { name: 'Captain America' },\n        { name: 'The Hulk' },\n      ],\n    }}\n    onChange={console.log}\n  >\n    <Iterate.Array path=\"/listOfHeroes\">\n      <Field.Name.Last itemPath=\"/name\" />\n    </Iterate.Array>\n  </Form.Handler>,\n)\n"})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(t,e)})):t(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-iterate-info-mdx-22a0c3165f27dde2dbf9.js.map
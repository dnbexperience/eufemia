"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[76438],{30261:function(e,t,n){n.r(t);var r=n(52322),s=n(45392);function i(e){const t=Object.assign({h1:"h1",ul:"ul",li:"li",code:"code",a:"a",pre:"pre"},(0,s.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:"Best Practices on Forms"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["Ensure you have a ",(0,r.jsx)(t.code,{children:"form"})," element. It will add support for additional keyboard and auto-complete features. Use the ",(0,r.jsx)(t.a,{href:"/uilib/extensions/forms/extended-features/Form/Handler/",children:"Form.Handler"})," that uses the ",(0,r.jsx)(t.a,{href:"/uilib/extensions/forms/extended-features/Form/Element/",children:"Form.Element"})," under the hood."]}),"\n",(0,r.jsxs)(t.li,{children:["Ensure your form HTML elements have a semantic and unique ",(0,r.jsx)(t.code,{children:"name"}),". By using the ",(0,r.jsx)(t.code,{children:"path"})," property (e.g. ",(0,r.jsx)(t.code,{children:'path="/firstName"'}),"), it will set an unique ",(0,r.jsx)(t.code,{children:"name"})," attribute to the rendered HTML element."]}),"\n",(0,r.jsxs)(t.li,{children:["Ensure you have a submit button. Use the ",(0,r.jsx)(t.a,{href:"/uilib/extensions/forms/extended-features/Form/SubmitButton/",children:"Form.SubmitButton"})," for that."]}),"\n",(0,r.jsxs)(t.li,{children:["Ensure to let browser autofill personal data if applicable, based on HTML ",(0,r.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete",children:"autocomplete attributes"}),". By using the ",(0,r.jsx)(t.code,{children:"path"})," property with semantic names (e.g. ",(0,r.jsx)(t.code,{children:'path="/firstName"'}),"), browser will be able to provide a correct autofill integration."]}),"\n",(0,r.jsxs)(t.li,{children:["In some cases, it is appreciated to temporary store user entered input data. Use the ",(0,r.jsx)(t.code,{children:"sessionStorageId"})," feature provided by ",(0,r.jsx)(t.a,{href:"/uilib/extensions/forms/extended-features/Form/Handler/",children:"Form.Handler"})," for that."]}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-jsx",children:'<Form.Handler autoComplete={true}>\n  <Field.String path="/firstName" />\n  <Field.Email path="/email" />\n  <Form.SubmitButton>Submit</Form.SubmitButton>\n</Form.Handler>\n'})})]})}t.default=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,s.ah)(),e.components);return t?(0,r.jsx)(t,Object.assign({},e,{children:(0,r.jsx)(i,e)})):i(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-best-practices-on-forms-mdx-0a917f92b2eb821acc36.js.map
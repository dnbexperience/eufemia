"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[81517],{56041:function(e,n,t){t.r(n);var r=t(52322),a=t(45392);function o(e){const n=Object.assign({h2:"h2",p:"p",code:"code",ul:"ul",li:"li",a:"a",pre:"pre"},(0,a.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Description"}),"\n",(0,r.jsxs)(n.p,{children:["With the ",(0,r.jsx)(n.code,{children:"Form.setData"})," method, you can manage your form data outside of the form itself. This is beneficial when you need to utilize the form data in other places within your application:"]}),"\n",(0,r.jsx)(n.p,{children:"Related helpers:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Form/getData/",children:"getData"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Form/useData/",children:"useData"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{children:"Replace the whole data set"}),"\n",(0,r.jsxs)(n.p,{children:["When a value is given to the ",(0,r.jsx)(n.code,{children:"setData"})," function, the whole data set will be replaced."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nconst myFormId = 'unique-id' // or a function, object or React Context reference\n\nForm.setData('unique', { foo: 'bar' })\n\nfunction MyForm() {\n  return (\n    <Form.Handler id={myFormId}>\n      <Field.String path=\"/foo\" />\n    </Form.Handler>\n  )\n}\n"})}),"\n",(0,r.jsx)(n.h2,{children:"Update a single value"}),"\n",(0,r.jsxs)(n.p,{children:["You can use the ",(0,r.jsx)(n.code,{children:"update"})," function to update the data."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nconst myFormId = 'unique-id' // or a function, object or React Context reference\nconst { update } = Form.setData(myFormId)\n\nfunction MyForm() {\n  return (\n    <Form.Handler id={myFormId}>\n      <Field.Number path=\"/foo\" defaultValue={0} />\n    </Form.Handler>\n  )\n}\n\n// Call \"update\" with the path and the new value.\nupdate('/foo', 1)\n\n// Or with a function that gives you the current value, if any.\nupdate('/foo', (value) => {\n  if (typeof value === 'number') {\n    return value + 1\n  }\n  return 1\n})\n"})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(o,e)})):o(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-set-data-info-mdx-6a4d672bbb2d8a93ddb0.js.map
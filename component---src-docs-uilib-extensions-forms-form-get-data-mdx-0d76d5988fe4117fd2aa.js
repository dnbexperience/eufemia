"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[8799,59574,40531],{36923:function(n,e,t){t.r(e);var a=t(52322),r=t(45392),i=t(74664),o=t(88510);function s(n){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.default,{}),"\n",(0,a.jsx)(o.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(s,n)})):s()}},88510:function(n,e,t){t.r(e),t.d(e,{default:function(){return c}});var a={};t.r(a),t.d(a,{Default:function(){return s},FilterData:function(){return l}});var r=t(52322),i=t(45392),o=t(28204);function s(){return(0,r.jsx)(o.Z,{noInline:!0,children:"const existingData = {\n  foo: 'bar',\n}\nconst Component = () => {\n  const { data } = Form.useData('default-id', existingData)\n  return (\n    <Form.Handler id=\"default-id\">\n      <Field.String path=\"/foo\" label={data.foo} />\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n"})}function l(){return(0,r.jsx)(o.Z,{noInline:!0,children:'const filterDataHandler = (path, value, props, internal) => {\n  if (value === \'foo\') {\n    return false\n  }\n}\nconst Component = () => {\n  return (\n    <Form.Handler id="filter-data">\n      <Value.String path="/foo" value="foo" />{\' \'}\n      <Value.String path="/bar" value="baz" />\n    </Form.Handler>\n  )\n}\nconst { data, filterData } = Form.getData(\'filter-data\')\nrender(\n  <>\n    <Component />\n\n    <Section backgroundColor="sand-yellow" innerSpace>\n      <pre>{JSON.stringify(data)}</pre>\n      <pre>{JSON.stringify(filterData(filterDataHandler))}</pre>\n    </Section>\n  </>,\n)\n'})}function d(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,i.ah)(),n.components);return a||u("Examples",!1),s||u("Examples.Default",!0),l||u("Examples.FilterData",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Demos"}),"\n",(0,r.jsx)(e.h3,{children:"Get data outside of the form"}),"\n",(0,r.jsx)(s,{}),"\n",(0,r.jsx)(e.h3,{children:"Filter data"}),"\n",(0,r.jsx)(l,{})]})}var c=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(d,n)})):d(n)};function u(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},74664:function(n,e,t){t.r(e);var a=t(52322),r=t(45392);function i(n){const e=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre",ul:"ul",li:"li",a:"a"},(0,r.ah)(),n.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Description"}),"\n",(0,a.jsxs)(e.p,{children:["With the ",(0,a.jsx)(e.code,{children:"Form.getData"})," method, you can manage your form data outside of the form itself. This is beneficial when you need to utilize the form data in other places within your application:"]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-jsx",children:"import { Form } from '@dnb/eufemia/extensions/forms'\n\nfunction Component() {\n  return <Form.Handler id=\"unique-id\">...</Form.Handler>\n}\n\n// Later, when there is data available\nconst {\n  getValue, // Method to get a single value\n  data, // The whole dataset (unvalidated)\n  filterData, // Method to filter data with your own logic\n} = Form.getData('unique-id')\n"})}),"\n",(0,a.jsxs)(e.p,{children:["You link them together via the ",(0,a.jsx)(e.code,{children:"id"})," (string) property."]}),"\n",(0,a.jsx)(e.p,{children:"TypeScript support:"}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-tsx",children:"type Data = { foo: string }\nconst { data } = Form.getData<Data>('unique')\n"})}),"\n",(0,a.jsx)(e.p,{children:"Related helpers:"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/Form/setData/",children:"setData"})}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/Form/useData/",children:"useData"})}),"\n"]}),"\n",(0,a.jsx)(e.h2,{children:"Filter data"}),"\n",(0,a.jsxs)(e.p,{children:["You can use the ",(0,a.jsx)(e.code,{children:"filterData"})," method to filter your data."]}),"\n",(0,a.jsxs)(e.p,{children:["You simply give it the same kind of callback function as you would with the ",(0,a.jsx)(e.code,{children:"Form.Handler"})," ",(0,a.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Handler/demos/#filter-your-data",children:"filterData"})," property method."]}),"\n",(0,a.jsx)(e.p,{children:"The callback function receives the path as the first argument, the value as the second argument, and the related field properties as the third argument. The callback function must return a boolean value or undefined. Return false to exclude an entry."}),"\n",(0,a.jsx)(e.p,{children:"It returns the filtered form data."}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-tsx",children:'const Component = () => {\n  return (\n    <Form.Handler id={id}>\n      <Field.String path="/foo" disabled />\n    </Form.Handler>\n  )\n}\n\nconst filterDataHandler = (path, value, props, internal) => {\n  if (props.disabled === true) {\n    return false\n  }\n}\n\n// Later, when there is data available\nconst { data, filterData } = Form.getData(id)\nconst filteredData = filterData(filterDataHandler)\n'})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(i,n)})):i(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-get-data-mdx-0d76d5988fe4117fd2aa.js.map
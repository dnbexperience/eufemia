"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[15434],{86671:function(n,e,t){t.r(e),t.d(e,{default:function(){return c}});var r={};t.r(r),t.d(r,{Default:function(){return s},FilterData:function(){return l}});var a=t(52322),o=t(45392),i=t(44464);function s(){return(0,a.jsx)(i.Z,{noInline:!0,children:"const existingData = {\n  foo: 'bar',\n}\nconst Component = () => {\n  const { data } = Form.useData('default-id', existingData)\n  return (\n    <Form.Handler id=\"default-id\">\n      <Field.String path=\"/foo\" label={data.foo} />\n    </Form.Handler>\n  )\n}\nrender(<Component />)\n"})}function l(){return(0,a.jsx)(i.Z,{noInline:!0,children:'const filterDataHandler = (path, value, props) => {\n  if (value === \'foo\') {\n    return false\n  }\n}\nconst Component = () => {\n  return (\n    <Form.Handler id="filter-data">\n      <Value.String path="/foo" value="foo" />{\' \'}\n      <Value.String path="/bar" value="baz" />\n    </Form.Handler>\n  )\n}\nconst { data, filterData } = Form.getData(\'filter-data\')\nrender(\n  <>\n    <Component />\n\n    <Section backgroundColor="sand-yellow" innerSpace>\n      <pre>{JSON.stringify(data)}</pre>\n      <pre>{JSON.stringify(filterData(filterDataHandler))}</pre>\n    </Section>\n  </>,\n)\n'})}function d(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,o.ah)(),n.components);return r||u("Examples",!1),s||u("Examples.Default",!0),l||u("Examples.FilterData",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Demos"}),"\n",(0,a.jsx)(e.h3,{children:"Get data outside of the form"}),"\n",(0,a.jsx)(s,{}),"\n",(0,a.jsx)(e.h3,{children:"Filter data"}),"\n",(0,a.jsx)(l,{})]})}var c=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(d,n)})):d(n)};function u(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-form-get-data-demos-mdx-3b60a2ecb6616d49f9dc.js.map
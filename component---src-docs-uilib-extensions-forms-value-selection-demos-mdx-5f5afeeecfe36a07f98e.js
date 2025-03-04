"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[90274],{36165:function(e,n,l){l.r(n),l.d(n,{default:function(){return j}});var t={};l.r(t),l.d(t,{FieldSelectionAndOption:function(){return x},FieldSelectionPath:function(){return u},Inline:function(){return h},Label:function(){return r},LabelAndValue:function(){return d},Placeholder:function(){return s},WithValue:function(){return c}});var i=l(52322),a=l(45392),o=l(41404);const s=()=>(0,i.jsx)(o.Z,{children:'<Value.Selection placeholder="No values selected" />\n'}),c=()=>(0,i.jsx)(o.Z,{children:'<Value.Selection value="Bar" />\n'}),r=()=>(0,i.jsx)(o.Z,{children:'<Value.Selection label="Label text" showEmpty />\n'}),d=()=>(0,i.jsx)(o.Z,{children:'<Value.Selection label="Label text" value="Foo" />\n'}),h=()=>(0,i.jsx)(o.Z,{children:'<P>\n  This is before the component <Value.Selection value="Baz" inline /> This\n  is after the component\n</P>\n'}),u=()=>(0,i.jsx)(o.Z,{children:"<Form.Handler\n  data={{\n    selection: 'bar',\n    myList: [\n      {\n        value: 'foo',\n        title: 'Foo',\n      },\n      {\n        value: 'bar',\n        title: 'Bar',\n      },\n      {\n        value: 'baz',\n        title: 'Baz',\n      },\n    ],\n  }}\n>\n  <Flex.Stack>\n    <Field.Selection\n      path=\"/selection\"\n      dataPath=\"/myList\"\n      variant=\"radio\"\n      label=\"My selection\"\n    />\n    <Value.Selection path=\"/selection\" dataPath=\"/myList\" inheritLabel />\n  </Flex.Stack>\n</Form.Handler>\n"}),x=()=>(0,i.jsx)(o.Z,{children:'<Form.Handler>\n  <Flex.Stack>\n    <Field.Selection\n      label="My selection"\n      path="/myPath"\n      variant="radio"\n      value="bar"\n    >\n      <Field.Option value="foo" title="Foo" />\n      <Field.Option value="bar" title="Bar" />\n      <Field.Option value="baz" title="Baz" />\n    </Field.Selection>\n\n    <Value.Selection label="My selection" path="/myPath" />\n  </Flex.Stack>\n</Form.Handler>\n'});function p(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code"},(0,a.ah)(),e.components);return t||b("Examples",!1),x||b("Examples.FieldSelectionAndOption",!0),u||b("Examples.FieldSelectionPath",!0),h||b("Examples.Inline",!0),r||b("Examples.Label",!0),d||b("Examples.LabelAndValue",!0),s||b("Examples.Placeholder",!0),c||b("Examples.WithValue",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{children:"Demos"}),"\n",(0,i.jsx)(n.h3,{children:"Placeholder"}),"\n",(0,i.jsx)(s,{}),"\n",(0,i.jsx)(n.h3,{children:"Value"}),"\n",(0,i.jsx)(c,{}),"\n",(0,i.jsx)(n.h3,{children:"Label"}),"\n",(0,i.jsx)(r,{}),"\n",(0,i.jsx)(n.h3,{children:"Label and value"}),"\n",(0,i.jsx)(d,{}),"\n",(0,i.jsx)(n.h3,{children:"Inline"}),"\n",(0,i.jsx)(h,{}),"\n",(0,i.jsx)(n.h3,{children:"Field.Selection with path"}),"\n",(0,i.jsxs)(n.p,{children:["When using the same ",(0,i.jsx)(n.code,{children:"path"})," as on a ",(0,i.jsx)(n.code,{children:"Field.Selection"}),", the title will be used as the displayed value."]}),"\n",(0,i.jsx)(u,{}),"\n",(0,i.jsx)(n.h3,{children:"Field.Option and Field.Selection"}),"\n",(0,i.jsxs)(n.p,{children:["When using the same ",(0,i.jsx)(n.code,{children:"path"})," as on a ",(0,i.jsx)(n.code,{children:"Field.Selection"}),", the ",(0,i.jsx)(n.code,{children:"Field.Option"})," title will be used as the displayed value."]}),"\n",(0,i.jsx)(x,{})]})}var j=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(p,e)})):p(e)};function b(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-value-selection-demos-mdx-5f5afeeecfe36a07f98e.js.map
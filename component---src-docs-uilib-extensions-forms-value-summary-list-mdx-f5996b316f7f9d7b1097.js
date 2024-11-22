"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[53808,43836,84168],{18234:function(n,a,e){e.r(a);var t=e(52322),r=e(45392),i=e(71329),o=e(20957);function l(n){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.default,{}),"\n",(0,t.jsx)(o.default,{})]})}a.default=function(n){void 0===n&&(n={});const{wrapper:a}=Object.assign({},(0,r.ah)(),n.components);return a?(0,t.jsx)(a,Object.assign({},n,{children:(0,t.jsx)(l,n)})):l()}},20957:function(n,a,e){e.r(a);var t=e(52322),r=e(45392),i=e(69159);function o(n){const a=Object.assign({h2:"h2",h3:"h3",p:"p",a:"a",code:"code"},(0,r.ah)(),n.components),{VisibleWhenVisualTest:e}=a;return i||l("Examples",!1),i.CombinedLayout||l("Examples.CombinedLayout",!0),i.DefaultLayout||l("Examples.DefaultLayout",!0),i.GridLayout||l("Examples.GridLayout",!0),i.HorizontalLayout||l("Examples.HorizontalLayout",!0),i.HorizontalLayoutWithoutLabel||l("Examples.HorizontalLayoutWithoutLabel",!0),i.InheritLabel||l("Examples.InheritLabel",!0),i.InheritVisibility||l("Examples.InheritVisibility",!0),e||l("VisibleWhenVisualTest",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.h2,{children:"Demos"}),"\n",(0,t.jsx)(a.h3,{children:"With a default layout"}),"\n",(0,t.jsx)(i.DefaultLayout,{}),"\n",(0,t.jsx)(a.h3,{children:"With a Horizontal layout"}),"\n",(0,t.jsx)(i.HorizontalLayout,{}),"\n",(0,t.jsx)(a.h3,{children:"With a grid layout"}),"\n",(0,t.jsx)(i.GridLayout,{}),"\n",(0,t.jsx)(a.h3,{children:"With a combined layout"}),"\n",(0,t.jsxs)(a.p,{children:["Using ",(0,t.jsx)(a.a,{href:"/uilib/extensions/forms/Value/Composition/",children:"Value.Composition"})," to combine two or more ",(0,t.jsx)(a.code,{children:"Value.*"})," components into one."]}),"\n",(0,t.jsx)(i.CombinedLayout,{}),"\n",(0,t.jsx)(a.h3,{children:"Inherit visibility"}),"\n",(0,t.jsx)(i.InheritVisibility,{}),"\n",(0,t.jsx)(a.h3,{children:"Inherit label"}),"\n",(0,t.jsx)(i.InheritLabel,{}),"\n",(0,t.jsx)(e,{children:(0,t.jsx)(i.HorizontalLayoutWithoutLabel,{})})]})}function l(n,a){throw new Error("Expected "+(a?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}a.default=function(n){void 0===n&&(n={});const{wrapper:a}=Object.assign({},(0,r.ah)(),n.components);return a?(0,t.jsx)(a,Object.assign({},n,{children:(0,t.jsx)(o,n)})):o(n)}},71329:function(n,a,e){e.r(a);var t=e(52322),r=e(45392);function i(n){const a=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre"},(0,r.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.h2,{children:"Description"}),"\n",(0,t.jsxs)(a.p,{children:["The ",(0,t.jsx)(a.code,{children:"Value.SummaryList"})," component ensures that the wrapped ",(0,t.jsx)(a.code,{children:"Value.*"})," components are rendered as definition lists, which helps maintain semantic correctness."]}),"\n",(0,t.jsx)(a.pre,{children:(0,t.jsx)(a.code,{className:"language-jsx",children:'import { Value } from \'@dnb/eufemia/extensions/forms\'\nrender(\n  <Value.SummaryList>\n    <Value.String label="First value" path="/myValue" />\n    <Value.String label="Second value" path="/mySecondValue" />\n  </Value.SummaryList>,\n)\n'})})]})}a.default=function(n){void 0===n&&(n={});const{wrapper:a}=Object.assign({},(0,r.ah)(),n.components);return a?(0,t.jsx)(a,Object.assign({},n,{children:(0,t.jsx)(i,n)})):i(n)}},69159:function(n,a,e){e.r(a),e.d(a,{CombinedLayout:function(){return s},DefaultLayout:function(){return i},GridLayout:function(){return o},HorizontalLayout:function(){return l},HorizontalLayoutWithoutLabel:function(){return d},InheritLabel:function(){return m},InheritVisibility:function(){return u}});var t=e(46832),r=e(52322);const i=()=>(0,r.jsx)(t.Z,{"data-visual-test":"forms-value-summary-list-default",children:"<Form.Handler\n  data={{\n    firstName: 'John',\n    lastName: 'Doe',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList>\n      <Value.Name.First path=\"/firstName\" />\n      <Value.Name.Last path=\"/lastName\" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n"}),o=()=>(0,r.jsx)(t.Z,{"data-visual-test":"forms-value-summary-list-grid",children:'<Form.Handler\n  data={{\n    firstName: \'John\',\n    lastName: \'Doe\',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList layout="grid">\n      <Value.Name.First path="/firstName" />\n      <Value.Name.Last path="/lastName" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'}),l=()=>(0,r.jsx)(t.Z,{"data-visual-test":"forms-value-summary-list-horizontal",children:'<Form.Handler\n  data={{\n    firstName: \'John\',\n    lastName: \'Doe\',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList layout="horizontal">\n      <Value.Name.First path="/firstName" />\n      <Value.Name.Last path="/lastName" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'}),s=()=>(0,r.jsx)(t.Z,{"data-visual-test":"forms-value-summary-list-combined",children:'<Form.Handler\n  data={{\n    firstName: \'John\',\n    lastName: \'Doe\',\n    streetName: \'Osloveien\',\n    streetNr: 12,\n    postalCode: \'1234\',\n    city: \'Oslo\',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList>\n      <Value.Name.First path="/firstName" />\n      <Value.Name.Last path="/lastName" />\n\n      <Value.Composition label="Street">\n        <Value.String path="/streetName" />\n        <Value.Number path="/streetNr" />\n      </Value.Composition>\n\n      <Value.Composition label="City">\n        <Value.String path="/postalCode" />\n        <Value.String path="/city" />\n      </Value.Composition>\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'});function u(){return(0,r.jsx)(t.Z,{children:'<Form.Handler>\n  <Form.Card>\n    <Field.Boolean\n      variant="button"\n      path="/isVisible"\n      defaultValue={true}\n    />\n\n    <Form.Visibility pathTrue="/isVisible" animate>\n      <Field.Name.First path="/foo" defaultValue="foo" />\n      <Field.Name.Last path="/bar" defaultValue="bar" />\n    </Form.Visibility>\n\n    <Value.SummaryList inheritVisibility>\n      <Value.Name.First path="/foo" />\n      <Value.Name.First path="/bar" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'})}function m(){return(0,r.jsx)(t.Z,{children:'<Form.Handler>\n  <Form.Card>\n    <Field.String path="/foo" defaultValue="foo" label="foo label" />\n    <Field.String path="/bar" defaultValue="bar" label="bar label" />\n\n    <Value.SummaryList inheritLabel>\n      <Value.String path="/foo" />\n      <Value.String path="/bar" />\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'})}const d=()=>(0,r.jsx)(t.Z,{"data-visual-test":"forms-value-summary-empty-label",children:'<Value.SummaryList layout="horizontal">\n  <Value.String value="foo" label="Foo" />\n  <Value.String value="bar" />\n  <Value.String value="baz" label="Baz" />\n</Value.SummaryList>\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-value-summary-list-mdx-f5996b316f7f9d7b1097.js.map
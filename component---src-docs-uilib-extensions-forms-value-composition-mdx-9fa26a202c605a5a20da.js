"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[41727,97331,21672],{46282:function(n,e,a){a.r(e);var t=a(52322),i=a(45392),s=a(81129),o=a(91532);function r(n){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.default,{}),"\n",(0,t.jsx)(o.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(r,n)})):r()}},91532:function(n,e,a){a.r(e),a.d(e,{default:function(){return h}});var t={};a.r(t),a.d(t,{Basic:function(){return r},CombineValuesInSummaryList:function(){return u},WidthComparison:function(){return l},WithSummaryList:function(){return m},WithSummaryListGridLayout:function(){return c}});var i=a(52322),s=a(45392),o=a(46832);const r=()=>(0,i.jsx)(o.Z,{children:'<Value.Composition>\n  <Value.String label="Label A" value="value" />\n  <Value.Number label="Label B" value={123} />\n</Value.Composition>\n'}),l=()=>(0,i.jsx)(o.Z,{"data-visual-test":"forms-value-composition-default",children:'<Value.Composition gap="large">\n  <Value.String\n    maxWidth="medium"\n    label="Medium maxWidth"\n    value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."\n  />\n  <Value.String\n    label="Without a width"\n    value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."\n  />\n</Value.Composition>\n'}),u=()=>(0,i.jsx)(o.Z,{"data-visual-test":"forms-value-composition-summary-list-combined",children:'<Value.SummaryList>\n  <Value.Composition label="Label">\n    <Value.String value="value" />\n    <Value.Number value={123} />\n  </Value.Composition>\n</Value.SummaryList>\n'}),m=()=>(0,i.jsx)(o.Z,{"data-visual-test":"forms-value-composition-summary-list",children:'<Form.Handler\n  data={{\n    firstName: \'John\',\n    lastName: \'Doe\',\n    streetName: \'Osloveien\',\n    streetNr: 12,\n    postalCode: \'1234\',\n    city: \'Oslo\',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList>\n      <Value.Composition label="Name">\n        <Value.String path="/firstName" />\n        <Value.String path="/lastName" />\n      </Value.Composition>\n\n      <Value.Composition label="Street">\n        <Value.String path="/streetName" />\n        <Value.Number path="/streetNr" />\n      </Value.Composition>\n\n      <Value.Composition label="City">\n        <Value.String path="/postalCode" />\n        <Value.String path="/city" />\n      </Value.Composition>\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'}),c=()=>(0,i.jsx)(o.Z,{"data-visual-test":"forms-value-composition-summary-list-grid",children:'<Form.Handler\n  data={{\n    firstName: \'John\',\n    lastName: \'Doe\',\n    streetName: \'Osloveien\',\n    streetNr: 12,\n    postalCode: \'1234\',\n    city: \'Oslo\',\n  }}\n>\n  <Form.Card>\n    <Form.SubHeading>Subheading</Form.SubHeading>\n\n    <Value.SummaryList layout="grid">\n      <Value.Name.First path="/firstName" />\n      <Value.Name.Last path="/lastName" />\n\n      <Value.Composition label="Street">\n        <Value.String path="/streetName" />\n        <Value.Number path="/streetNr" />\n      </Value.Composition>\n\n      <Value.Composition label="City">\n        <Value.String path="/postalCode" />\n        <Value.String path="/city" />\n      </Value.Composition>\n    </Value.SummaryList>\n  </Form.Card>\n</Form.Handler>\n'});function d(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,s.ah)(),n.components);return t||p("Examples",!1),r||p("Examples.Basic",!0),u||p("Examples.CombineValuesInSummaryList",!0),l||p("Examples.WidthComparison",!0),m||p("Examples.WithSummaryList",!0),c||p("Examples.WithSummaryListGridLayout",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Demos"}),"\n",(0,i.jsx)(e.h3,{children:"Basic usage"}),"\n",(0,i.jsx)(r,{}),"\n",(0,i.jsx)(e.h3,{children:"In SummaryList"}),"\n",(0,i.jsx)(u,{}),"\n",(0,i.jsx)(e.h3,{children:"Inside a plain SummaryList"}),"\n",(0,i.jsx)(m,{}),"\n",(0,i.jsx)(e.h3,{children:"Inside a SummaryList with grid layout"}),"\n",(0,i.jsx)(c,{}),"\n",(0,i.jsx)(e.h3,{children:"Width comparison"}),"\n",(0,i.jsx)(l,{})]})}var h=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(d,n)})):d(n)};function p(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},81129:function(n,e,a){a.r(e);var t=a(52322),i=a(45392);function s(n){const e=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,i.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Description"}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"Value.Composition"})," combines two or more ",(0,t.jsx)(e.code,{children:"Value.*"})," components into one."]}),"\n",(0,t.jsx)(e.p,{children:"By default, they will be placed in a horizontal layout. When rendered on a small screen, they will be placed in a vertical layout."}),"\n",(0,t.jsxs)(e.p,{children:["Also good to know is that, there is an equivalent ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/base-fields/Composition/",children:"Field.Composition"})," component that can be used for ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/all-fields/",children:"field"})," components."]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-jsx",children:'import { Value } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Value.Composition label="Label">\n    <Value.String label="First" path="/first" />\n    <Value.String label="Second" path="/second" />\n  </Value.Composition>,\n)\n'})}),"\n",(0,t.jsx)(e.h2,{children:"Accessibility"}),"\n",(0,t.jsxs)(e.p,{children:["When you combine multiple ",(0,t.jsx)(e.code,{children:"Value.*"})," components together, consider enclosing them within the ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/Value/SummaryList/",children:"SummaryList"})," component. This component offers a standardized approach for presenting labels and values within an accessible definition list structure."]})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(s,n)})):s(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-value-composition-mdx-9fa26a202c605a5a20da.js.map
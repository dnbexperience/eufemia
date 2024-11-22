"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[14085,86353,673],{55231:function(n,e,i){i.r(e);var a=i(52322),r=i(45392),s=i(49117),t=i(48855);function d(n){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s.default,{}),"\n",(0,a.jsx)(t.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(d,n)})):d()}},48855:function(n,e,i){i.r(e),i.d(e,{default:function(){return g}});var a={};i.r(a),i.d(a,{AboveCard:function(){return u},BelowMainHeading:function(){return o},InsideCard:function(){return l},PrecedingFlexContainer:function(){return c},TextOnly:function(){return d},TwoSubHeadings:function(){return h},WithHelpButton:function(){return m}});var r=i(52322),s=i(45392),t=i(46832);const d=()=>(0,r.jsx)(t.Z,{children:"<Form.SubHeading>This is a sub heading</Form.SubHeading>\n"}),o=()=>(0,r.jsx)(t.Z,{"data-visual-test":"layout-sub-heading-below-main",children:"\n<Form.MainHeading>This is a main heading</Form.MainHeading>\n<Form.SubHeading>This is a sub heading</Form.SubHeading>\n\n"}),c=()=>(0,r.jsx)(t.Z,{children:"\n<Form.SubHeading>This is a sub heading</Form.SubHeading>\n<Flex.Stack>\n  <P>Stack contents</P>\n</Flex.Stack>\n\n"}),l=()=>(0,r.jsx)(t.Z,{"data-visual-test":"layout-sub-heading-inside-card",children:"<Form.Card>\n  <Flex.Stack>\n    <Form.SubHeading>This is a sub heading</Form.SubHeading>\n    <P>Card contents</P>\n  </Flex.Stack>\n</Form.Card>\n"}),u=()=>(0,r.jsx)(t.Z,{"data-visual-test":"layout-sub-heading-above-card",children:"\n<Form.SubHeading>This is a sub heading</Form.SubHeading>\n<Form.Card>\n  <P>Card contents</P>\n</Form.Card>\n\n"}),h=()=>(0,r.jsx)(t.Z,{children:"\n<Form.SubHeading>This is sub heading 1</Form.SubHeading>\n<Form.SubHeading>This is sub heading 2</Form.SubHeading>\nOther contents\n\n"}),m=()=>(0,r.jsx)(t.Z,{"data-visual-test":"layout-sub-heading-help-button",children:"<Flex.Stack>\n  <Form.SubHeading\n    help={{\n      title: 'Title',\n      content: 'Content',\n    }}\n  >\n    This is a sub heading\n  </Form.SubHeading>\n  <Form.Card>\n    <P>Card contents</P>\n  </Form.Card>\n</Flex.Stack>\n"});function x(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",a:"a"},(0,s.ah)(),n.components);return a||b("Examples",!1),u||b("Examples.AboveCard",!0),o||b("Examples.BelowMainHeading",!0),l||b("Examples.InsideCard",!0),c||b("Examples.PrecedingFlexContainer",!0),d||b("Examples.TextOnly",!0),h||b("Examples.TwoSubHeadings",!0),m||b("Examples.WithHelpButton",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Demos"}),"\n",(0,r.jsx)(e.h3,{children:"Text only"}),"\n",(0,r.jsx)(d,{}),"\n",(0,r.jsx)(e.h3,{children:"Below MainHeading"}),"\n",(0,r.jsx)(o,{}),"\n",(0,r.jsx)(e.h3,{children:"Above a flex container"}),"\n",(0,r.jsx)(c,{}),"\n",(0,r.jsx)(e.h3,{children:"Inside Card"}),"\n",(0,r.jsx)(l,{}),"\n",(0,r.jsx)(e.h3,{children:"Above Card"}),"\n",(0,r.jsxs)(e.p,{children:["When placed above a ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/Form/Card/",children:"Form.Card"})," component, the heading will be indented to align with the card content."]}),"\n",(0,r.jsx)(e.p,{children:"On small screens, the indention will be removed."}),"\n",(0,r.jsx)(u,{}),"\n",(0,r.jsx)(e.h3,{children:"Two sub headings"}),"\n",(0,r.jsx)(h,{}),"\n",(0,r.jsx)(e.h3,{children:"With HelpButton"}),"\n",(0,r.jsx)(m,{})]})}var g=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(x,n)})):x(n)};function b(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},49117:function(n,e,i){i.r(e);var a=i(52322),r=i(45392);function s(n){const e=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre"},(0,r.ah)(),n.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Description"}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"Form.SubHeading"})," is a standardized sub heading for sections, ensuring default layout, spacing etc."]}),"\n",(0,a.jsxs)(e.p,{children:["The used font-size is set to ",(0,a.jsx)(e.code,{children:"large"}),"."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-jsx",children:"import { Flex, Card } from '@dnb/eufemia'\nimport { Form, Field } from '@dnb/eufemia/extensions/forms'\nrender(\n  <Form.Handler onSubmit={submitHandler}>\n    <Flex.Stack>\n      <Form.MainHeading>Header</Form.MainHeading>\n      <Form.Card>\n        <Form.SubHeading>Header</Form.SubHeading>\n        <Field.Email path=\"/dataPath\" />\n      </Form.Card>\n    </Flex.Stack>\n  </Form.Handler>,\n)\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(s,n)})):s(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-form-sub-heading-mdx-cf3e72030200ae1f8e21.js.map
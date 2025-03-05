"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[55214,69602,45154],{91610:function(e,n,i){i.r(n);var o=i(52322),s=i(45392),t=i(42873),l=i(80036);function r(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.default,{}),"\n",(0,o.jsx)(l.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(r,e)})):r()}},80036:function(e,n,i){i.r(n),i.d(n,{default:function(){return p}});var o={};i.r(o),i.d(o,{Alignment:function(){return h},Composition:function(){return r},CompositionError:function(){return d},CompositionMultipleStatuses:function(){return c},CompositionWithLabel:function(){return a}});var s=i(52322),t=i(45392),l=i(41404);const r=()=>(0,s.jsx)(l.Z,{"data-visual-test":"forms-field-block-composition",children:'<Field.Composition info="Info at the bottom" width="large">\n  <Field.String label="Field A with a long label" width="medium" />\n  <Field.String label="Field B" width="stretch" />\n</Field.Composition>\n'}),a=()=>(0,s.jsx)(l.Z,{"data-visual-test":"forms-field-block-composition-with-label",children:'<Field.Composition label="A legend for the fieldset" width="large">\n  <Field.String label="Field label" width="stretch" />\n  <Field.Number width="small" placeholder="0000" />\n</Field.Composition>\n'}),d=()=>(0,s.jsx)(l.Z,{"data-visual-test":"forms-field-block-composition-error",children:'<Field.Composition error={new Error(\'Error at the bottom\')} width="large">\n  <Field.String label="Field A" width="stretch" />\n  <Field.String\n    label="Field B with a long label that wraps"\n    width="medium"\n  />\n</Field.Composition>\n'}),c=()=>(0,s.jsx)(l.Z,{"data-visual-test":"forms-field-block-composition-statuses",children:'<Field.Composition label="Label text" info="FieldBlock info">\n  <Field.String width="small" minLength={3} warning="Warning message" />\n  <Field.Number minimum={10} info="Field info" />\n</Field.Composition>\n'}),h=()=>(0,s.jsx)(l.Z,{"data-visual-test":"forms-field-block-composition-alignment",children:'<Field.Composition label="Label text" align="center">\n  <Field.Number width="small" defaultValue={0} showStepControls />\n  <Field.Boolean />\n</Field.Composition>\n'});function m(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p"},(0,t.ah)(),e.components);return o||u("Examples",!1),h||u("Examples.Alignment",!0),r||u("Examples.Composition",!0),d||u("Examples.CompositionError",!0),c||u("Examples.CompositionMultipleStatuses",!0),a||u("Examples.CompositionWithLabel",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{children:"Demos"}),"\n",(0,s.jsx)(n.h3,{children:"Composition field"}),"\n",(0,s.jsx)(n.p,{children:"You may adjust the widths to your needs."}),"\n",(0,s.jsx)(r,{}),"\n",(0,s.jsx)(n.h3,{children:"Composition with a label"}),"\n",(0,s.jsx)(a,{}),"\n",(0,s.jsx)(n.h3,{children:"Composition of multiple statuses"}),"\n",(0,s.jsx)(c,{}),"\n",(0,s.jsx)(n.h3,{children:"Composition field with error"}),"\n",(0,s.jsx)(d,{}),"\n",(0,s.jsx)(n.h3,{children:"Alignment"}),"\n",(0,s.jsx)(h,{})]})}var p=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?(0,s.jsx)(n,Object.assign({},e,{children:(0,s.jsx)(m,e)})):m(e)};function u(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},42873:function(e,n,i){i.r(n);var o=i(52322),s=i(45392);function t(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,s.ah)(),e.components);return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{children:"Description"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"Field.Composition"})," is a component for when you create a field block that contains of several existing fields. It uses ",(0,o.jsx)(n.a,{href:"/uilib/extensions/forms/create-component/FieldBlock/",children:"FieldBlock"})," under the hood."]}),"\n",(0,o.jsxs)(n.p,{children:["Also good to know is that, there is an equivalent ",(0,o.jsx)(n.a,{href:"/uilib/extensions/forms/Value/Composition",children:"Value.Composition"})," component that can be used for ",(0,o.jsx)(n.a,{href:"/uilib/extensions/forms/Value/",children:"value"})," components."]}),"\n",(0,o.jsx)(n.p,{children:"The composition field serves the purpose of managing layout and status messages, with a strong focus on accessibility. More on that topic down below."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-tsx",children:'import { Field } from \'@dnb/eufemia/extensions/forms\'\n\nrender(\n  <Field.Composition>\n    <Field.String label="Field A" />\n    <Field.String Label="Field B" />\n  </Field.Composition>,\n)\n'})}),"\n",(0,o.jsx)(n.p,{children:"When each field inside your composition is horizontally aligned for larger screens, they will wrap to a vertical layout for smaller screens."}),"\n",(0,o.jsx)(n.p,{children:"If each of the fields have a label, the labels should ideally be top aligned. But when one of the labels contain more text than fits into one line, the fields will be bottom aligned."}),"\n",(0,o.jsxs)(n.p,{children:["In the demo section you find an ",(0,o.jsx)(n.a,{href:"#composition-field-with-error",children:"example"})," on how to handle form states."]}),"\n",(0,o.jsx)(n.h2,{children:"Messages"}),"\n",(0,o.jsx)(n.p,{children:"Messages that appears to be the same, will be grouped together and announced as one message."}),"\n",(0,o.jsxs)(n.p,{children:["You can also show an ",(0,o.jsx)(n.code,{children:"error"}),", ",(0,o.jsx)(n.code,{children:"warning"})," or ",(0,o.jsx)(n.code,{children:"info"})," message at the same time."]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-jsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\n\nrender(\n  <Field.Composition error=\"Shared error at the bottom\">\n    <Field.String />\n    <Field.String />\n  </Field.Composition>,\n)\n"})}),"\n",(0,o.jsx)(n.h2,{children:"Accessibility"}),"\n",(0,o.jsxs)(n.p,{children:["When using the ",(0,o.jsx)(n.code,{children:"error"}),", ",(0,o.jsx)(n.code,{children:"warning"})," or ",(0,o.jsx)(n.code,{children:"info"})," property, the displayed ",(0,o.jsx)(n.a,{href:"/uilib/components/form-status",children:"FormStatus"})," components will be placed in the DOM before the content of the form elements itself."]}),"\n",(0,o.jsxs)(n.p,{children:["Furthermore, the status messages are linked to the corresponding form elements using ",(0,o.jsx)(n.code,{children:"aria-describedby"})," when ",(0,o.jsx)(n.a,{href:"/uilib/extensions/forms/create-component/useFieldProps",children:"useFieldProps"})," is used in conjunction."]}),"\n",(0,o.jsx)(n.p,{children:"This will allow screen readers to find and announce the error message properly."})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,s.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(t,e)})):t(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-base-fields-composition-mdx-e3ed77cb1617c6babf78.js.map
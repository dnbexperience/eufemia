"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[30676],{55850:function(n,e,a){a.r(e),a.d(e,{default:function(){return j}});var l={};a.r(l),a.d(l,{Disabled:function(){return x},Empty:function(){return t},Label:function(){return d},LabelAndValue:function(){return h},OmitMask:function(){return s},Placeholder:function(){return u},ValidationExtendValidator:function(){return b},ValidationRequired:function(){return m},WithError:function(){return g},WithHelp:function(){return c}});var i=a(52322),o=a(45392),r=a(64368);const t=()=>(0,i.jsx)(r.Z,{children:"<Field.OrganizationNumber\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),s=()=>(0,i.jsx)(r.Z,{children:"<Field.OrganizationNumber\n  onChange={(value) => console.log('onChange', value)}\n  omitMask\n/>\n"}),u=()=>(0,i.jsx)(r.Z,{children:"<Field.OrganizationNumber\n  placeholder=\"Enter 9 digits...\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),d=()=>(0,i.jsx)(r.Z,{children:"<Field.OrganizationNumber\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),h=()=>(0,i.jsx)(r.Z,{children:'<Field.OrganizationNumber\n  label="Label text"\n  value="987654321"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),c=()=>(0,i.jsx)(r.Z,{children:"<Field.OrganizationNumber\n  label=\"Label text\"\n  value=\"987654321\"\n  help={{\n    title: 'Help is available',\n    content:\n      'Success has nothing to do with what you gain in life or accomplish for yourself. It’s what you do for others.',\n  }}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),x=()=>(0,i.jsx)(r.Z,{children:'<Field.OrganizationNumber\n  value="989898989"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n/>\n'}),g=()=>(0,i.jsx)(r.Z,{children:"<Field.OrganizationNumber\n  value=\"007\"\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n  error={new Error('This is what is wrong...')}\n/>\n"}),m=()=>(0,i.jsx)(r.Z,{children:'<Field.OrganizationNumber\n  value="123456789"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  required\n/>\n'}),b=()=>(0,i.jsx)(r.Z,{noInline:!0,children:"const firstNumIs1 = (value: string) =>\n  value.substring(0, 1) === '1'\n    ? {\n        status: 'valid',\n      }\n    : {\n        status: 'invalid',\n      }\nconst myValidator = (value, { validators }) => {\n  const { organizationNumberValidator } = validators\n  const result = firstNumIs1(value)\n  if (result.status === 'invalid') {\n    return new Error('My error')\n  }\n  return [organizationNumberValidator]\n}\nrender(\n  <Field.OrganizationNumber\n    required\n    value=\"991541209\"\n    onBlurValidator={myValidator}\n    validateInitially\n  />,\n)\n"});function v(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",a:"a",code:"code"},(0,o.ah)(),n.components);return l||p("Examples",!1),x||p("Examples.Disabled",!0),t||p("Examples.Empty",!0),d||p("Examples.Label",!0),h||p("Examples.LabelAndValue",!0),s||p("Examples.OmitMask",!0),u||p("Examples.Placeholder",!0),b||p("Examples.ValidationExtendValidator",!0),m||p("Examples.ValidationRequired",!0),g||p("Examples.WithError",!0),c||p("Examples.WithHelp",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Demos"}),"\n",(0,i.jsx)(e.h3,{children:"Empty"}),"\n",(0,i.jsx)(t,{}),"\n",(0,i.jsx)(e.h3,{children:"Omit mask"}),"\n",(0,i.jsx)(s,{}),"\n",(0,i.jsx)(e.h3,{children:"Placeholder"}),"\n",(0,i.jsx)(u,{}),"\n",(0,i.jsx)(e.h3,{children:"Label"}),"\n",(0,i.jsx)(d,{}),"\n",(0,i.jsx)(e.h3,{children:"Label and value"}),"\n",(0,i.jsx)(h,{}),"\n",(0,i.jsx)(e.h3,{children:"With help"}),"\n",(0,i.jsx)(c,{}),"\n",(0,i.jsx)(e.h3,{children:"Disabled"}),"\n",(0,i.jsx)(x,{}),"\n",(0,i.jsx)(e.h3,{children:"Error"}),"\n",(0,i.jsx)(g,{}),"\n",(0,i.jsx)(e.h3,{children:"Validation - Required"}),"\n",(0,i.jsx)(m,{}),"\n",(0,i.jsx)(e.h3,{children:"Extend validation with custom validation function"}),"\n",(0,i.jsxs)(e.p,{children:["You can ",(0,i.jsx)(e.a,{href:"/uilib/extensions/forms/create-component/useFieldProps/info/#validators",children:"extend the existing validation"}),"(",(0,i.jsx)(e.code,{children:"organizationNumberValidator"}),") with your own validation function."]}),"\n",(0,i.jsx)(b,{})]})}var j=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(v,n)})):v(n)};function p(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-organization-number-demos-mdx-e15eb9d400f7d6131742.js.map
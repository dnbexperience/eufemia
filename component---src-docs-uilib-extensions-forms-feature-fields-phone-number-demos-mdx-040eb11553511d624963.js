"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[53708],{66230:function(n,e,l){l.r(e),l.d(e,{default:function(){return f}});var a={};l.r(a),l.d(a,{Disabled:function(){return c},Empty:function(){return t},FilterCountries:function(){return v},InCard:function(){return j},Label:function(){return d},LabelAndValue:function(){return u},LongLabel:function(){return p},Placeholder:function(){return s},ValidationPattern:function(){return b},ValidationRequired:function(){return x},WithError:function(){return g},WithFilter:function(){return m},WithHelp:function(){return h}});var o=l(52322),i=l(45392),r=l(41404);const t=()=>(0,o.jsx)(r.Z,{children:"<Field.PhoneNumber\n  onFocus={(value, additionalArgs) =>\n    console.log('onFocus', value, additionalArgs)\n  }\n  onBlur={(value, additionalArgs) =>\n    console.log('onBlur', value, additionalArgs)\n  }\n  onChange={(value, additionalArgs) =>\n    console.log('onChange', value, additionalArgs)\n  }\n  onCountryCodeChange={(countryCode) =>\n    console.log('onCountryCodeChange', countryCode)\n  }\n  onNumberChange={(phoneNumber) =>\n    console.log('onNumberChange', phoneNumber)\n  }\n/>\n"}),s=()=>(0,o.jsx)(r.Z,{children:"<Field.PhoneNumber\n  placeholder=\"Call this number\"\n  onChange={(value, additionalArgs) =>\n    console.log('onChange', value, additionalArgs)\n  }\n/>\n"}),d=()=>(0,o.jsx)(r.Z,{children:"<Field.PhoneNumber\n  label=\"Label text\"\n  onChange={(value, additionalArgs) =>\n    console.log('onChange', value, additionalArgs)\n  }\n/>\n"}),u=()=>(0,o.jsx)(r.Z,{"data-visual-test":"phone-number-label",children:'<Field.PhoneNumber\n  label="Label text"\n  value="+47 98765432"\n  onChange={(value, additionalArgs) =>\n    console.log(\'onChange\', value, additionalArgs)\n  }\n/>\n'}),h=()=>(0,o.jsx)(r.Z,{children:"<Field.PhoneNumber\n  onChange={(value, additionalArgs) =>\n    console.log('onChange', value, additionalArgs)\n  }\n  help={{\n    title: 'Help is available',\n    content:\n      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',\n  }}\n/>\n"}),c=()=>(0,o.jsx)(r.Z,{children:'<Field.PhoneNumber\n  value="+47 12345678"\n  label="Label text"\n  onChange={(value, additionalArgs) =>\n    console.log(\'onChange\', value, additionalArgs)\n  }\n  disabled\n/>\n'}),g=()=>(0,o.jsx)(r.Z,{"data-visual-test":"phone-number-error",children:"<Field.PhoneNumber\n  value=\"007\"\n  label=\"Label text\"\n  onChange={(value, additionalArgs) =>\n    console.log('onChange', value, additionalArgs)\n  }\n  error={new Error('This is what is wrong...')}\n/>\n"}),x=()=>(0,o.jsx)(r.Z,{children:'<Field.PhoneNumber\n  value="+47 888"\n  label="Label text"\n  onChange={(value, additionalArgs) =>\n    console.log(\'onChange\', value, additionalArgs)\n  }\n  required\n/>\n'}),b=()=>(0,o.jsx)(r.Z,{children:'<Field.PhoneNumber\n  value="+41 123"\n  label="Label text"\n  onChange={(value, additionalArgs) =>\n    console.log(\'onChange\', value, additionalArgs)\n  }\n  pattern="^\\+41 [1]\\d{2}$"\n/>\n'}),m=()=>(0,o.jsx)(r.Z,{children:'<Field.PhoneNumber\n  label="Label text"\n  onChange={(value, additionalArgs) =>\n    console.log(\'onChange\', value, additionalArgs)\n  }\n  countries="Scandinavia"\n/>\n'}),p=()=>(0,o.jsx)(r.Z,{"data-visual-test":"phone-number-long-label",children:'<Field.PhoneNumber label="Telefon/mobilnummer with long label" />\n'}),j=()=>(0,o.jsx)(r.Z,{"data-visual-test":"phone-number-in-card",children:"<Form.Card>\n  <Field.PhoneNumber />\n</Form.Card>\n"});function v(){return(0,o.jsx)(r.Z,{children:"<Field.PhoneNumber\n  countries=\"Scandinavia\"\n  filterCountries={({ iso }) => iso !== 'DK'}\n/>\n"})}function C(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code"},(0,i.ah)(),n.components),{VisibleWhenVisualTest:l}=e;return a||A("Examples",!1),c||A("Examples.Disabled",!0),t||A("Examples.Empty",!0),v||A("Examples.FilterCountries",!0),j||A("Examples.InCard",!0),d||A("Examples.Label",!0),u||A("Examples.LabelAndValue",!0),p||A("Examples.LongLabel",!0),s||A("Examples.Placeholder",!0),b||A("Examples.ValidationPattern",!0),x||A("Examples.ValidationRequired",!0),g||A("Examples.WithError",!0),m||A("Examples.WithFilter",!0),h||A("Examples.WithHelp",!0),l||A("VisibleWhenVisualTest",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{children:"Demos"}),"\n",(0,o.jsx)(e.h3,{children:"Empty"}),"\n",(0,o.jsx)(t,{}),"\n",(0,o.jsx)(e.h3,{children:"Placeholder"}),"\n",(0,o.jsx)(s,{}),"\n",(0,o.jsx)(e.h3,{children:"Label"}),"\n",(0,o.jsx)(d,{}),"\n",(0,o.jsx)(e.h3,{children:"Label and value"}),"\n",(0,o.jsx)(u,{}),"\n",(0,o.jsx)(e.h3,{children:"Show only Scandinavian countries"}),"\n",(0,o.jsx)(m,{}),"\n",(0,o.jsx)(e.h3,{children:"With help"}),"\n",(0,o.jsx)(h,{}),"\n",(0,o.jsx)(e.h3,{children:"Used in Card"}),"\n",(0,o.jsx)(j,{}),"\n",(0,o.jsx)(e.h3,{children:"Disabled"}),"\n",(0,o.jsx)(c,{}),"\n",(0,o.jsx)(e.h3,{children:"Error"}),"\n",(0,o.jsx)(g,{}),"\n",(0,o.jsx)(e.h3,{children:"Validation - Required"}),"\n",(0,o.jsx)(x,{}),"\n",(0,o.jsx)(e.h3,{children:"Validation - Pattern"}),"\n",(0,o.jsx)(b,{}),"\n",(0,o.jsx)(e.h3,{children:"Filter countries"}),"\n",(0,o.jsxs)(e.p,{children:["This example demonstrates how to filter specific countries. Use the ",(0,o.jsx)(e.code,{children:"countries"})," property to define a set of countries and/or the ",(0,o.jsx)(e.code,{children:"filterCountries"})," property to apply custom filtering logic."]}),"\n",(0,o.jsx)(v,{}),"\n",(0,o.jsx)(l,{children:(0,o.jsx)(p,{})})]})}var f=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,i.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(C,n)})):C(n)};function A(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-phone-number-demos-mdx-040eb11553511d624963.js.map
"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[40081,36251,62076],{24055:function(e,n,s){s.r(n);var r=s(52322),l=s(45392),o=s(75588),a=s(24585);function i(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.default,{}),"\n",(0,r.jsx)(a.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(i,e)})):i()}},24585:function(e,n,s){s.r(n),s.d(n,{default:function(){return f}});var r={};s.r(r),s.d(r,{Disabled:function(){return x},EmptyPostal:function(){return i},EmptyStreet:function(){return t},Label:function(){return c},LabelAndValue:function(){return h},Placeholder:function(){return d},ValidationRequired:function(){return j},WithError:function(){return p},WithHelp:function(){return u}});var l=s(52322),o=s(45392),a=s(46832);const i=()=>(0,l.jsx)(a.Z,{children:"<Field.Address.Postal\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),t=()=>(0,l.jsx)(a.Z,{children:"<Field.Address.Street\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),d=()=>(0,l.jsx)(a.Z,{children:"<Field.Address.Postal\n  placeholder=\"Enter address...\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),c=()=>(0,l.jsx)(a.Z,{children:"<Field.Address.Postal\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),h=()=>(0,l.jsx)(a.Z,{children:'<Field.Address.Postal\n  label="Label text"\n  value="Dronning Eufemias gate 30"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),u=()=>(0,l.jsx)(a.Z,{children:"<Field.Address.Postal\n  label=\"Label text\"\n  value=\"Dronning Eufemias gate 30\"\n  help={{\n    title: 'Help is available',\n    content:\n      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',\n  }}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),x=()=>(0,l.jsx)(a.Z,{children:'<Field.Address.Postal\n  value="Dronning Eufemias gate 30"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n/>\n'}),p=()=>(0,l.jsx)(a.Z,{children:"<Field.Address.Postal\n  value=\"Dronning Eufemias gate X\"\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n  error={new Error('This is what is wrong...')}\n/>\n"}),j=()=>(0,l.jsx)(a.Z,{children:'<Field.Address.Postal\n  value="Dronning Eufemias gate 30"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  required\n/>\n'});function g(e){const n=Object.assign({h2:"h2",h3:"h3"},(0,o.ah)(),e.components);return r||m("Examples",!1),x||m("Examples.Disabled",!0),i||m("Examples.EmptyPostal",!0),t||m("Examples.EmptyStreet",!0),c||m("Examples.Label",!0),h||m("Examples.LabelAndValue",!0),d||m("Examples.Placeholder",!0),j||m("Examples.ValidationRequired",!0),p||m("Examples.WithError",!0),u||m("Examples.WithHelp",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Demos"}),"\n",(0,l.jsx)(n.h3,{children:"Postal address"}),"\n",(0,l.jsx)(i,{}),"\n",(0,l.jsx)(n.h3,{children:"Street address"}),"\n",(0,l.jsx)(t,{}),"\n",(0,l.jsx)(n.h3,{children:"Placeholder"}),"\n",(0,l.jsx)(d,{}),"\n",(0,l.jsx)(n.h3,{children:"Label"}),"\n",(0,l.jsx)(c,{}),"\n",(0,l.jsx)(n.h3,{children:"Label and value"}),"\n",(0,l.jsx)(h,{}),"\n",(0,l.jsx)(n.h3,{children:"With help"}),"\n",(0,l.jsx)(u,{}),"\n",(0,l.jsx)(n.h3,{children:"Disabled"}),"\n",(0,l.jsx)(x,{}),"\n",(0,l.jsx)(n.h3,{children:"Error message"}),"\n",(0,l.jsx)(p,{}),"\n",(0,l.jsx)(n.h3,{children:"Validation - Required"}),"\n",(0,l.jsx)(j,{})]})}var f=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(g,e)})):g(e)};function m(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},75588:function(e,n,s){s.r(n);var r=s(52322),l=s(45392);function o(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre",ul:"ul",li:"li"},(0,l.ah)(),e.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Description"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"Field.Address"})," is a wrapper component for the ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/base-fields/String",children:"input of strings"}),", with user experience tailored for postal and street addresses."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\nrender(\n  <>\n    <Field.Address.Postal />\n    <Field.Address.Street />\n  </>,\n)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["There is a corresponding ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/Value/Address",children:"Value.Address"})," component."]}),"\n",(0,r.jsx)(n.h2,{children:"Characteristics"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"If the user enters an address with a space, the space is removed."}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"autocomplete"})," is by default set to ",(0,r.jsx)(n.code,{children:"street-address"}),", but can be customized to using a grouping identifier like so ",(0,r.jsx)(n.code,{children:"billing street-address"}),", see ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#grouping_identifier",children:"mdn docs"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"inputmode"})," is by default set to ",(0,r.jsx)(n.code,{children:"text"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{children:"Postal address"}),"\n",(0,r.jsx)(n.p,{children:"Is for locations for recieving mail, for people or businesses. This can also be used as a postbox address."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\nrender(<Field.Address.Postal />)\n"})}),"\n",(0,r.jsx)(n.h2,{children:"Street address"}),"\n",(0,r.jsx)(n.p,{children:"Is for physical locations of people or businesses."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-jsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\nrender(<Field.Address.Street />)\n"})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(o,e)})):o(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-address-mdx-2d9426861133bc4b5aa9.js.map
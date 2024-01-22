"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[12728,30602,61585],{25754:function(n,e,a){a.r(e);var r=a(52322),l=a(45392),o=a(4431),t=a(21343);function s(n){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.default,{}),"\n",(0,r.jsx)(t.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,l.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(s,n)})):s()}},21343:function(n,e,a){a.r(e),a.d(e,{default:function(){return j}});var r={};a.r(r),a.d(r,{Disabled:function(){return p},Empty:function(){return i},Error:function(){return m},Label:function(){return h},LabelAndValue:function(){return d},OmitMask:function(){return c},Placeholder:function(){return u},ValidationRequired:function(){return b},WithHelp:function(){return x}});var l=a(52322),o=a(45392),t=a(50716),s=a(27439);const i=()=>(0,l.jsx)(t.Z,{children:"<Field.BankAccountNumber\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),c=()=>(0,l.jsx)(t.Z,{children:"<Field.BankAccountNumber\n  onChange={(value) => console.log('onChange', value)}\n  omitMask\n/>\n"}),u=()=>(0,l.jsx)(t.Z,{children:"<Field.BankAccountNumber\n  placeholder=\"Enter 11 digits...\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),h=()=>(0,l.jsx)(t.Z,{children:"<Field.BankAccountNumber\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),d=()=>(0,l.jsx)(t.Z,{children:'<Field.BankAccountNumber\n  label="Label text"\n  value="20001234567"\n  onChange={(value) => console.log(\'onChange\', value)}\n/>\n'}),x=()=>(0,l.jsx)(t.Z,{children:"<Field.BankAccountNumber\n  label=\"Label text\"\n  value=\"20001234567\"\n  help={{\n    title: 'Help is available',\n    content:\n      'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',\n  }}\n  onChange={(value) => console.log('onChange', value)}\n/>\n"}),p=()=>(0,l.jsx)(t.Z,{children:'<Field.BankAccountNumber\n  value="20001234567"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  disabled\n/>\n'}),m=()=>(0,l.jsx)(t.Z,{scope:{FormError:s.Xq},children:"<Field.BankAccountNumber\n  value=\"007\"\n  label=\"Label text\"\n  onChange={(value) => console.log('onChange', value)}\n  error={new FormError('This is what is wrong...')}\n/>\n"}),b=()=>(0,l.jsx)(t.Z,{children:'<Field.BankAccountNumber\n  value="20001234567"\n  label="Label text"\n  onChange={(value) => console.log(\'onChange\', value)}\n  required\n/>\n'});function g(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,o.ah)(),n.components);return r||f("Examples",!1),p||f("Examples.Disabled",!0),i||f("Examples.Empty",!0),m||f("Examples.Error",!0),h||f("Examples.Label",!0),d||f("Examples.LabelAndValue",!0),c||f("Examples.OmitMask",!0),u||f("Examples.Placeholder",!0),b||f("Examples.ValidationRequired",!0),x||f("Examples.WithHelp",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.h2,{children:"Demos"}),"\n",(0,l.jsx)(e.h3,{children:"Empty"}),"\n",(0,l.jsx)(i,{}),"\n",(0,l.jsx)(e.h3,{children:"Omit mask"}),"\n",(0,l.jsx)(c,{}),"\n",(0,l.jsx)(e.h3,{children:"Placeholder"}),"\n",(0,l.jsx)(u,{}),"\n",(0,l.jsx)(e.h3,{children:"Label"}),"\n",(0,l.jsx)(h,{}),"\n",(0,l.jsx)(e.h3,{children:"Label and value"}),"\n",(0,l.jsx)(d,{}),"\n",(0,l.jsx)(e.h3,{children:"With help"}),"\n",(0,l.jsx)(x,{}),"\n",(0,l.jsx)(e.h3,{children:"Disabled"}),"\n",(0,l.jsx)(p,{}),"\n",(0,l.jsx)(e.h3,{children:"Error"}),"\n",(0,l.jsx)(m,{}),"\n",(0,l.jsx)(e.h3,{children:"Validation - Required"}),"\n",(0,l.jsx)(b,{})]})}var j=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,l.jsx)(e,Object.assign({},n,{children:(0,l.jsx)(g,n)})):g(n)};function f(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},4431:function(n,e,a){a.r(e);var r=a(52322),l=a(45392);function o(n){const e=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,l.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Description"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Field.BankAccountNumber"})," is a wrapper component for the ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/base-fields/String",children:"input of strings"}),", with user experience tailored for bank account values."]}),"\n",(0,r.jsxs)(e.p,{children:["This field is meant for norwegian bank account numbers, and therefor takes a 11-digit string as a value. A norwegian bank account number can have a leading zero, which is why this value is a string and not a number.\nMore info can be found at ",(0,r.jsx)(e.a,{href:"https://no.wikipedia.org/wiki/Kontonummer",children:"Wikipedia"})]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",children:"import { Field } from '@dnb/eufemia/extensions/forms'\nrender(<Field.BankAccountNumber />)\n"})}),"\n",(0,r.jsxs)(e.p,{children:["There is a corresponding ",(0,r.jsx)(e.a,{href:"/uilib/extensions/forms/extended-features/Value/BankAccountNumber",children:"Value.BankAccountNumber"})," component."]})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,l.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(o,n)})):o(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-feature-fields-bank-account-number-mdx-fd98613b5744d228a8d8.js.map
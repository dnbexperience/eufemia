"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[62502,68661,66225],{70721:function(n,e,l){l.r(e);var a=l(52322),r=l(45392),o=l(4339),t=l(75322);function s(n){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.default,{}),"\n",(0,a.jsx)(t.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(s,n)})):s()}},75322:function(n,e,l){l.r(e),l.d(e,{default:function(){return f}});var a={};l.r(a),l.d(a,{Empty:function(){return i},Inline:function(){return m},Label:function(){return p},LabelAndValue:function(){return d},Placeholder:function(){return u},WithValue:function(){return c}});var r=l(52322),o=l(45392),t=l(50716),s=l(18626);const i=()=>(0,r.jsx)(t.Z,{scope:{Value:s},children:"<Value.Email showEmpty />\n"}),u=()=>(0,r.jsx)(t.Z,{scope:{Value:s},children:'<Value.Email placeholder="The value was not filled in" />\n'}),c=()=>(0,r.jsx)(t.Z,{scope:{Value:s},children:'<Value.Email value="firstname.lastname@domain.com" />\n'}),p=()=>(0,r.jsx)(t.Z,{scope:{Value:s},children:'<Value.Email label="Label text" showEmpty />\n'}),d=()=>(0,r.jsx)(t.Z,{scope:{Value:s},children:'<Value.Email label="Label text" value="firstname.lastname@domain.com" />\n'}),m=()=>(0,r.jsx)(t.Z,{scope:{Value:s},children:'<P>\n  This is before the component\n  <Value.Email value="firstname.lastname@domain.com" inline />\n  This is after the component\n</P>\n'});function h(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,o.ah)(),n.components);return a||b("Examples",!1),i||b("Examples.Empty",!0),m||b("Examples.Inline",!0),p||b("Examples.Label",!0),d||b("Examples.LabelAndValue",!0),u||b("Examples.Placeholder",!0),c||b("Examples.WithValue",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Demos"}),"\n",(0,r.jsx)(e.h3,{children:"Empty"}),"\n",(0,r.jsx)(i,{}),"\n",(0,r.jsx)(e.h3,{children:"Placeholder"}),"\n",(0,r.jsx)(u,{}),"\n",(0,r.jsx)(e.h3,{children:"Value"}),"\n",(0,r.jsx)(c,{}),"\n",(0,r.jsx)(e.h3,{children:"Label"}),"\n",(0,r.jsx)(p,{}),"\n",(0,r.jsx)(e.h3,{children:"Label and value"}),"\n",(0,r.jsx)(d,{}),"\n",(0,r.jsx)(e.h3,{children:"Inline"}),"\n",(0,r.jsx)(m,{})]})}var f=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(h,n)})):h(n)};function b(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},4339:function(n,e,l){l.r(e);var a=l(52322),r=l(45392);function o(n){const e=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre"},(0,r.ah)(),n.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Description"}),"\n",(0,a.jsxs)(e.p,{children:[(0,a.jsx)(e.code,{children:"Value.Email"})," is a wrapper component for displaying string values, with user experience tailored for email values."]}),"\n",(0,a.jsx)(e.pre,{children:(0,a.jsx)(e.code,{className:"language-jsx",children:"import { Value } from '@dnb/eufemia/extensions/forms'\nrender(<Value.Email />)\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(o,n)})):o(n)}},69887:function(n,e,l){var a=l(2784),r=l(54390),o=l(28952),t=l(52322);function s(n){var e;const l=(0,a.useContext)(o.Z),s={...n,label:null!==(e=n.label)&&void 0!==e?e:null==l?void 0:l.translation.Forms.emailLabel};return(0,t.jsx)(r.Z,{...s})}s._supportsSpacingProps=!0,e.Z=s},15957:function(n,e,l){var a=l(2784),r=l(54390),o=l(28952),t=l(41672),s=l(52322);function i(n){var e;const l=(0,a.useContext)(o.Z),i={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==l?void 0:l.translation.Forms.nationalIdentityNumberLabel,prepare:n=>(0,t.WU)((0,t.bR)(n),{nin:!0}).toString()};return(0,s.jsx)(r.Z,{...i})}i._supportsSpacingProps=!0,e.Z=i},55410:function(n,e,l){var a=l(2784),r=l(54390),o=l(28952),t=l(41672),s=l(52322);function i(n){var e;const l=(0,a.useContext)(o.Z),i={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==l?void 0:l.translation.Forms.phoneNumberLabel,prepare:n=>(0,t.WU)((0,t.bR)(n),{phone:!0}).toString()};return(0,s.jsx)(r.Z,{...i})}i._supportsSpacingProps=!0,e.Z=i},54390:function(n,e,l){var a=l(49406),r=l(35533),o=l(55590),t=l(52322);function s(n){const{className:e,label:l,placeholder:s,value:i,inline:u,showEmpty:c,prepare:p=(n=>n)}=(0,r.Z)(n);return(0,t.jsx)(a.Z,{className:e,label:l,showEmpty:c,placeholder:s,inline:u,...(0,o.SR)(n),children:p(i)})}s._supportsSpacingProps=!0,e.Z=s},18626:function(n,e,l){l.r(e),l.d(e,{BankAccountNumber:function(){return y},Boolean:function(){return h},Currency:function(){return b},Date:function(){return v},Email:function(){return j.Z},NationalIdentityNumber:function(){return g.Z},Number:function(){return c},PhoneNumber:function(){return Z.Z},String:function(){return a.Z}});var a=l(54390);function r(n,e){const{thousandSeparator:l,decimalLimit:a,fixedDecimals:r,decimalSymbol:o=",",magnitude:t,prefix:s,suffix:i}=null!=e?e:{},u=void 0!==t?n/Math.pow(10,t):n,c=void 0!==r?u.toFixed(r):a?(Math.round(u*Math.pow(10,a))/Math.pow(10,a)).toString():u.toString(),p=void 0!==o?c.replace(".",o):c,d=void 0!==l?p.replace(/\B(?=(\d{3})+(?!\d))/g,l):p,m=void 0!==s?s+d:d;return void 0!==i?m+i:m}var o=l(49406),t=l(35533),s=l(55590),i=l(52322);function u(n){const{className:e,label:l,placeholder:a,value:u,inline:c,showEmpty:p,thousandSeparator:d,decimalSymbol:m,decimalLimit:h,prefix:f,suffix:b}=(0,t.Z)(n);return(0,i.jsx)(o.Z,{className:e,label:l,showEmpty:p,placeholder:a,inline:c,...(0,s.SR)(n),children:void 0!==u?r(u,{thousandSeparator:!0===d?" ":d,decimalSymbol:m,decimalLimit:h,prefix:f,suffix:b}):null})}u._supportsSpacingProps=!0;var c=u,p=l(2784),d=l(28952);function m(n){const e=(0,p.useContext)(d.Z),{className:l,label:a,placeholder:r,showEmpty:u,value:c,inline:m}=(0,t.Z)(n);return(0,i.jsx)(o.Z,{className:l,label:a,showEmpty:u,placeholder:r,inline:m,...(0,s.SR)(n),children:!0===c||!1===c?!0===c?null==e?void 0:e.translation.Forms.booleanYes:null==e?void 0:e.translation.Forms.booleanNo:null})}m._supportsSpacingProps=!0;var h=m;function f(n){var e,l;const a={...n,label:n.label,thousandSeparator:null!==(e=n.thousandSeparator)&&void 0!==e?e:" ",suffix:null!==(l=n.suffix)&&void 0!==l?l:" kr"};return(0,i.jsx)(c,{...a})}f._supportsSpacingProps=!0;var b=f;function x(n){var e;const l=(0,p.useContext)(d.Z),r={...n,label:null!==(e=n.label)&&void 0!==e?e:null==l?void 0:l.translation.Forms.dateLabel};return(0,i.jsx)(a.Z,{...r})}x._supportsSpacingProps=!0;var v=x,j=l(69887),g=l(15957),Z=l(55410),E=l(41672);function S(n){var e;const l=(0,p.useContext)(d.Z),r={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==l?void 0:l.translation.Forms.bankAccountNumberLabel,prepare:n=>(0,E.WU)((0,E.bR)(n),{ban:!0}).toString()};return(0,i.jsx)(a.Z,{...r})}S._supportsSpacingProps=!0;var y=S},49406:function(n,e,l){var a=l(65731),r=l(9149),o=l(72779),t=l.n(o),s=l(55590),i=l(52322);function u(n){const{className:e,label:l,inline:o,placeholder:u,showEmpty:c,children:p}=n;return null!=p&&!1!==p||c||u?(0,i.jsxs)(a.Z,{className:t()("dnb-forms-value",o&&"dnb-forms-value-block--inline",e),...(0,s.SR)(n),children:[l&&(0,i.jsx)(r.Z,{className:"dnb-forms-value-block__label",label_direction:o?"horizontal":"vertical",children:l}),null!=p?p:(0,i.jsx)("span",{className:"dnb-forms-value-block__placeholder",children:u})]}):null}u._supportsSpacingProps=!0,e.Z=u}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-value-email-mdx-607c96587476ef213fc7.js.map
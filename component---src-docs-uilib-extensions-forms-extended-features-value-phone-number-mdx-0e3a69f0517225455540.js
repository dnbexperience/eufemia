"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[67077,40847,56330],{38265:function(n,e,l){l.r(e);var r=l(52322),o=l(45392),a=l(98150),t=l(87070);function s(n){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.default,{}),"\n",(0,r.jsx)(t.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(s,n)})):s()}},87070:function(n,e,l){l.r(e),l.d(e,{default:function(){return b}});var r={};l.r(r),l.d(r,{Empty:function(){return i},Inline:function(){return h},Label:function(){return p},LabelAndValue:function(){return d},Placeholder:function(){return u},WithValue:function(){return c}});var o=l(52322),a=l(45392),t=l(50716),s=l(18626);const i=()=>(0,o.jsx)(t.Z,{scope:{Value:s},children:"<Value.PhoneNumber showEmpty />\n"}),u=()=>(0,o.jsx)(t.Z,{scope:{Value:s},children:'<Value.PhoneNumber placeholder="The value was not filled in" />\n'}),c=()=>(0,o.jsx)(t.Z,{scope:{Value:s},children:'<Value.PhoneNumber value="98712345" />\n'}),p=()=>(0,o.jsx)(t.Z,{scope:{Value:s},children:'<Value.PhoneNumber label="Label text" showEmpty />\n'}),d=()=>(0,o.jsx)(t.Z,{scope:{Value:s},children:'<Value.PhoneNumber label="Label text" value="+4798712345" />\n'}),h=()=>(0,o.jsx)(t.Z,{scope:{Value:s},children:'<P>\n  This is before the component\n  <Value.PhoneNumber value="98712345" inline />\n  This is after the component\n</P>\n'});function m(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,a.ah)(),n.components);return r||f("Examples",!1),i||f("Examples.Empty",!0),h||f("Examples.Inline",!0),p||f("Examples.Label",!0),d||f("Examples.LabelAndValue",!0),u||f("Examples.Placeholder",!0),c||f("Examples.WithValue",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{children:"Demos"}),"\n",(0,o.jsx)(e.h3,{children:"Empty"}),"\n",(0,o.jsx)(i,{}),"\n",(0,o.jsx)(e.h3,{children:"Placeholder"}),"\n",(0,o.jsx)(u,{}),"\n",(0,o.jsx)(e.h3,{children:"Value"}),"\n",(0,o.jsx)(c,{}),"\n",(0,o.jsx)(e.h3,{children:"Label"}),"\n",(0,o.jsx)(p,{}),"\n",(0,o.jsx)(e.h3,{children:"Label and value"}),"\n",(0,o.jsx)(d,{}),"\n",(0,o.jsx)(e.h3,{children:"Inline"}),"\n",(0,o.jsx)(h,{})]})}var b=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(m,n)})):m(n)};function f(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},98150:function(n,e,l){l.r(e);var r=l(52322),o=l(45392);function a(n){const e=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre"},(0,o.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Description"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Value.PhoneNumber"})," is a wrapper component for displaying string values, with user experience tailored for phone number values."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",children:"import { Value } from '@dnb/eufemia/extensions/forms'\nrender(<Value.PhoneNumber />)\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(a,n)})):a(n)}},69887:function(n,e,l){var r=l(2784),o=l(54390),a=l(28952),t=l(52322);function s(n){var e;const l=(0,r.useContext)(a.Z),s={...n,label:null!==(e=n.label)&&void 0!==e?e:null==l?void 0:l.translation.Forms.emailLabel};return(0,t.jsx)(o.Z,{...s})}s._supportsSpacingProps=!0,e.Z=s},15957:function(n,e,l){var r=l(2784),o=l(54390),a=l(28952),t=l(41672),s=l(52322);function i(n){var e;const l=(0,r.useContext)(a.Z),i={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==l?void 0:l.translation.Forms.nationalIdentityNumberLabel,prepare:n=>(0,t.WU)((0,t.bR)(n),{nin:!0}).toString()};return(0,s.jsx)(o.Z,{...i})}i._supportsSpacingProps=!0,e.Z=i},55410:function(n,e,l){var r=l(2784),o=l(54390),a=l(28952),t=l(41672),s=l(52322);function i(n){var e;const l=(0,r.useContext)(a.Z),i={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==l?void 0:l.translation.Forms.phoneNumberLabel,prepare:n=>(0,t.WU)((0,t.bR)(n),{phone:!0}).toString()};return(0,s.jsx)(o.Z,{...i})}i._supportsSpacingProps=!0,e.Z=i},54390:function(n,e,l){var r=l(49406),o=l(35533),a=l(55590),t=l(52322);function s(n){const{className:e,label:l,placeholder:s,value:i,inline:u,showEmpty:c,prepare:p=(n=>n)}=(0,o.Z)(n);return(0,t.jsx)(r.Z,{className:e,label:l,showEmpty:c,placeholder:s,inline:u,...(0,a.SR)(n),children:p(i)})}s._supportsSpacingProps=!0,e.Z=s},18626:function(n,e,l){l.r(e),l.d(e,{BankAccountNumber:function(){return P},Boolean:function(){return m},Currency:function(){return f},Date:function(){return v},Email:function(){return j.Z},NationalIdentityNumber:function(){return g.Z},Number:function(){return c},PhoneNumber:function(){return Z.Z},String:function(){return r.Z}});var r=l(54390);function o(n,e){const{thousandSeparator:l,decimalLimit:r,fixedDecimals:o,decimalSymbol:a=",",magnitude:t,prefix:s,suffix:i}=null!=e?e:{},u=void 0!==t?n/Math.pow(10,t):n,c=void 0!==o?u.toFixed(o):r?(Math.round(u*Math.pow(10,r))/Math.pow(10,r)).toString():u.toString(),p=void 0!==a?c.replace(".",a):c,d=void 0!==l?p.replace(/\B(?=(\d{3})+(?!\d))/g,l):p,h=void 0!==s?s+d:d;return void 0!==i?h+i:h}var a=l(49406),t=l(35533),s=l(55590),i=l(52322);function u(n){const{className:e,label:l,placeholder:r,value:u,inline:c,showEmpty:p,thousandSeparator:d,decimalSymbol:h,decimalLimit:m,prefix:b,suffix:f}=(0,t.Z)(n);return(0,i.jsx)(a.Z,{className:e,label:l,showEmpty:p,placeholder:r,inline:c,...(0,s.SR)(n),children:void 0!==u?o(u,{thousandSeparator:!0===d?" ":d,decimalSymbol:h,decimalLimit:m,prefix:b,suffix:f}):null})}u._supportsSpacingProps=!0;var c=u,p=l(2784),d=l(28952);function h(n){const e=(0,p.useContext)(d.Z),{className:l,label:r,placeholder:o,showEmpty:u,value:c,inline:h}=(0,t.Z)(n);return(0,i.jsx)(a.Z,{className:l,label:r,showEmpty:u,placeholder:o,inline:h,...(0,s.SR)(n),children:!0===c||!1===c?!0===c?null==e?void 0:e.translation.Forms.booleanYes:null==e?void 0:e.translation.Forms.booleanNo:null})}h._supportsSpacingProps=!0;var m=h;function b(n){var e,l;const r={...n,label:n.label,thousandSeparator:null!==(e=n.thousandSeparator)&&void 0!==e?e:" ",suffix:null!==(l=n.suffix)&&void 0!==l?l:" kr"};return(0,i.jsx)(c,{...r})}b._supportsSpacingProps=!0;var f=b;function x(n){var e;const l=(0,p.useContext)(d.Z),o={...n,label:null!==(e=n.label)&&void 0!==e?e:null==l?void 0:l.translation.Forms.dateLabel};return(0,i.jsx)(r.Z,{...o})}x._supportsSpacingProps=!0;var v=x,j=l(69887),g=l(15957),Z=l(55410),N=l(41672);function S(n){var e;const l=(0,p.useContext)(d.Z),o={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==l?void 0:l.translation.Forms.bankAccountNumberLabel,prepare:n=>(0,N.WU)((0,N.bR)(n),{ban:!0}).toString()};return(0,i.jsx)(r.Z,{...o})}S._supportsSpacingProps=!0;var P=S},49406:function(n,e,l){var r=l(65731),o=l(9149),a=l(72779),t=l.n(a),s=l(55590),i=l(52322);function u(n){const{className:e,label:l,inline:a,placeholder:u,showEmpty:c,children:p}=n;return null!=p&&!1!==p||c||u?(0,i.jsxs)(r.Z,{className:t()("dnb-forms-value",a&&"dnb-forms-value-block--inline",e),...(0,s.SR)(n),children:[l&&(0,i.jsx)(o.Z,{className:"dnb-forms-value-block__label",label_direction:a?"horizontal":"vertical",children:l}),null!=p?p:(0,i.jsx)("span",{className:"dnb-forms-value-block__placeholder",children:u})]}):null}u._supportsSpacingProps=!0,e.Z=u}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-value-phone-number-mdx-0e3a69f0517225455540.js.map
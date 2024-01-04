"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[86149,98054,62142],{95284:function(n,e,l){l.r(e);var r=l(52322),a=l(45392),t=l(33135),o=l(29941);function s(n){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.default,{}),"\n",(0,r.jsx)(o.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(s,n)})):s()}},29941:function(n,e,l){l.r(e),l.d(e,{default:function(){return f}});var r={};l.r(r),l.d(r,{Empty:function(){return i},Inline:function(){return h},Label:function(){return p},LabelAndValue:function(){return d},Placeholder:function(){return u},WithValue:function(){return c}});var a=l(52322),t=l(45392),o=l(50716),s=l(18626);const i=()=>(0,a.jsx)(o.Z,{scope:{Value:s},children:"<Value.Date showEmpty />\n"}),u=()=>(0,a.jsx)(o.Z,{scope:{Value:s},children:'<Value.Date placeholder="The value was not filled in" />\n'}),c=()=>(0,a.jsx)(o.Z,{scope:{Value:s},children:'<Value.Date value="2023-01-16" />\n'}),p=()=>(0,a.jsx)(o.Z,{scope:{Value:s},children:'<Value.Date label="Label text" showEmpty />\n'}),d=()=>(0,a.jsx)(o.Z,{scope:{Value:s},children:'<Value.Date label="Label text" value="2023-01-16" />\n'}),h=()=>(0,a.jsx)(o.Z,{scope:{Value:s},children:'<P>\n  This is before the component\n  <Value.Date value="2023-01-16" inline />\n  This is after the component\n</P>\n'});function m(n){const e=Object.assign({h2:"h2",h3:"h3"},(0,t.ah)(),n.components);return r||b("Examples",!1),i||b("Examples.Empty",!0),h||b("Examples.Inline",!0),p||b("Examples.Label",!0),d||b("Examples.LabelAndValue",!0),u||b("Examples.Placeholder",!0),c||b("Examples.WithValue",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.h2,{children:"Demos"}),"\n",(0,a.jsx)(e.h3,{children:"Empty"}),"\n",(0,a.jsx)(i,{}),"\n",(0,a.jsx)(e.h3,{children:"Placeholder"}),"\n",(0,a.jsx)(u,{}),"\n",(0,a.jsx)(e.h3,{children:"Value"}),"\n",(0,a.jsx)(c,{}),"\n",(0,a.jsx)(e.h3,{children:"Label"}),"\n",(0,a.jsx)(p,{}),"\n",(0,a.jsx)(e.h3,{children:"Label and value"}),"\n",(0,a.jsx)(d,{}),"\n",(0,a.jsx)(e.h3,{children:"Inline"}),"\n",(0,a.jsx)(h,{})]})}var f=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,t.ah)(),n.components);return e?(0,a.jsx)(e,Object.assign({},n,{children:(0,a.jsx)(m,n)})):m(n)};function b(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},33135:function(n,e,l){l.r(e);var r=l(52322),a=l(45392);function t(n){const e=Object.assign({h2:"h2",p:"p",code:"code",pre:"pre"},(0,a.ah)(),n.components);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h2,{children:"Description"}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.code,{children:"Value.Date"})," is a wrapper component for displaying string values, with user experience tailored for date values."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-jsx",children:"import { Value } from '@dnb/eufemia/extensions/forms'\nrender(<Value.Date />)\n"})})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,a.ah)(),n.components);return e?(0,r.jsx)(e,Object.assign({},n,{children:(0,r.jsx)(t,n)})):t(n)}},69887:function(n,e,l){var r=l(2784),a=l(54390),t=l(28952),o=l(52322);function s(n){var e;const l=(0,r.useContext)(t.Z),s={...n,label:null!==(e=n.label)&&void 0!==e?e:null==l?void 0:l.translation.Forms.emailLabel};return(0,o.jsx)(a.Z,{...s})}s._supportsSpacingProps=!0,e.Z=s},15957:function(n,e,l){var r=l(2784),a=l(54390),t=l(28952),o=l(41672),s=l(52322);function i(n){var e;const l=(0,r.useContext)(t.Z),i={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==l?void 0:l.translation.Forms.nationalIdentityNumberLabel,prepare:n=>(0,o.WU)((0,o.bR)(n),{nin:!0}).toString()};return(0,s.jsx)(a.Z,{...i})}i._supportsSpacingProps=!0,e.Z=i},55410:function(n,e,l){var r=l(2784),a=l(54390),t=l(28952),o=l(41672),s=l(52322);function i(n){var e;const l=(0,r.useContext)(t.Z),i={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==l?void 0:l.translation.Forms.phoneNumberLabel,prepare:n=>(0,o.WU)((0,o.bR)(n),{phone:!0}).toString()};return(0,s.jsx)(a.Z,{...i})}i._supportsSpacingProps=!0,e.Z=i},54390:function(n,e,l){var r=l(49406),a=l(35533),t=l(55590),o=l(52322);function s(n){const{className:e,label:l,placeholder:s,value:i,inline:u,showEmpty:c,prepare:p=(n=>n)}=(0,a.Z)(n);return(0,o.jsx)(r.Z,{className:e,label:l,showEmpty:c,placeholder:s,inline:u,...(0,t.SR)(n),children:p(i)})}s._supportsSpacingProps=!0,e.Z=s},18626:function(n,e,l){l.r(e),l.d(e,{BankAccountNumber:function(){return w},Boolean:function(){return m},Currency:function(){return b},Date:function(){return v},Email:function(){return j.Z},NationalIdentityNumber:function(){return g.Z},Number:function(){return c},PhoneNumber:function(){return Z.Z},String:function(){return r.Z}});var r=l(54390);function a(n,e){const{thousandSeparator:l,decimalLimit:r,fixedDecimals:a,decimalSymbol:t=",",magnitude:o,prefix:s,suffix:i}=null!=e?e:{},u=void 0!==o?n/Math.pow(10,o):n,c=void 0!==a?u.toFixed(a):r?(Math.round(u*Math.pow(10,r))/Math.pow(10,r)).toString():u.toString(),p=void 0!==t?c.replace(".",t):c,d=void 0!==l?p.replace(/\B(?=(\d{3})+(?!\d))/g,l):p,h=void 0!==s?s+d:d;return void 0!==i?h+i:h}var t=l(49406),o=l(35533),s=l(55590),i=l(52322);function u(n){const{className:e,label:l,placeholder:r,value:u,inline:c,showEmpty:p,thousandSeparator:d,decimalSymbol:h,decimalLimit:m,prefix:f,suffix:b}=(0,o.Z)(n);return(0,i.jsx)(t.Z,{className:e,label:l,showEmpty:p,placeholder:r,inline:c,...(0,s.SR)(n),children:void 0!==u?a(u,{thousandSeparator:!0===d?" ":d,decimalSymbol:h,decimalLimit:m,prefix:f,suffix:b}):null})}u._supportsSpacingProps=!0;var c=u,p=l(2784),d=l(28952);function h(n){const e=(0,p.useContext)(d.Z),{className:l,label:r,placeholder:a,showEmpty:u,value:c,inline:h}=(0,o.Z)(n);return(0,i.jsx)(t.Z,{className:l,label:r,showEmpty:u,placeholder:a,inline:h,...(0,s.SR)(n),children:!0===c||!1===c?!0===c?null==e?void 0:e.translation.Forms.booleanYes:null==e?void 0:e.translation.Forms.booleanNo:null})}h._supportsSpacingProps=!0;var m=h;function f(n){var e,l;const r={...n,label:n.label,thousandSeparator:null!==(e=n.thousandSeparator)&&void 0!==e?e:" ",suffix:null!==(l=n.suffix)&&void 0!==l?l:" kr"};return(0,i.jsx)(c,{...r})}f._supportsSpacingProps=!0;var b=f;function x(n){var e;const l=(0,p.useContext)(d.Z),a={...n,label:null!==(e=n.label)&&void 0!==e?e:null==l?void 0:l.translation.Forms.dateLabel};return(0,i.jsx)(r.Z,{...a})}x._supportsSpacingProps=!0;var v=x,j=l(69887),g=l(15957),Z=l(55410),S=l(41672);function y(n){var e;const l=(0,p.useContext)(d.Z),a={...n,label:null!==(e=n.label)&&void 0!==e?e:n.inline||null==l?void 0:l.translation.Forms.bankAccountNumberLabel,prepare:n=>(0,S.WU)((0,S.bR)(n),{ban:!0}).toString()};return(0,i.jsx)(r.Z,{...a})}y._supportsSpacingProps=!0;var w=y},49406:function(n,e,l){var r=l(65731),a=l(9149),t=l(72779),o=l.n(t),s=l(55590),i=l(52322);function u(n){const{className:e,label:l,inline:t,placeholder:u,showEmpty:c,children:p}=n;return null!=p&&!1!==p||c||u?(0,i.jsxs)(r.Z,{className:o()("dnb-forms-value",t&&"dnb-forms-value-block--inline",e),...(0,s.SR)(n),children:[l&&(0,i.jsx)(a.Z,{className:"dnb-forms-value-block__label",label_direction:t?"horizontal":"vertical",children:l}),null!=p?p:(0,i.jsx)("span",{className:"dnb-forms-value-block__placeholder",children:u})]}):null}u._supportsSpacingProps=!0,e.Z=u}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-value-date-mdx-6c26e91ce1d27491ffc8.js.map
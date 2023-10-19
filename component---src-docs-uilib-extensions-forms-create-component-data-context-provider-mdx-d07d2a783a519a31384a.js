"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[51058,2410,45509],{28677:function(e,n,t){t.r(n);var a=t(52322),r=t(45392),l=t(37299),i=t(34168);function o(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l.default,{}),"\n",(0,a.jsx)(i.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(o,e)})):o()}},34168:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var a={};t.r(a),t.d(a,{Default:function(){return c},TestdataSchema:function(){return u},ValidationWithJsonSchema:function(){return m},testdata:function(){return d}});var r=t(52322),l=t(45392),i=t(35823),o=t(16620),s=t(1357);const u={type:"object",properties:{requiredString:{type:"string"},string:{type:"string",minLength:3},number:{type:"number",minimum:42},boolean:{type:"boolean"},email:{type:"string"},nested:{type:"object",properties:{nestedText:{type:"string"},nestedNumber:{type:"number",minimum:50}}},list:{type:"array",items:{type:"object",properties:{itemText:{type:"string"},itemNumber:{type:"number",minimum:50}}}}},required:["requiredString"]},d={requiredString:"This is a text",string:"String value",number:123,boolean:!0,email:"m@il.com",nested:{nestedText:"Nested text",nestedNumber:42},list:[{itemText:"Item text",itemNumber:1001},{itemText:"Item text 2",itemNumber:1002}]},c=()=>(0,r.jsx)(i.Z,{scope:{DataContext:o,Value:s,testdata:d,TestdataSchema:u},children:'<DataContext.Provider\n  data={testdata}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  onSubmitRequest={() => console.log(\'onSubmitRequest\')}\n  sessionStorageId="provider-example-1"\n>\n  <Flex.Stack>\n    <Card>\n      <Flex.Vertical divider="line" spacing="small">\n        <Field.String\n          path="/requiredString"\n          label="Required string"\n          required\n        />\n        <Field.String path="/hmm" label="Invalid path" />\n        <Field.String path="/string" label="String value" />\n        <Field.String path="/string" label="String value (copy)" />\n        <Field.Number path="/number" label="Number value" />\n        <Field.String path="/number" label="Number with Field.String" />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Checkbox"\n          variant="checkbox"\n        />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Toggle"\n          variant="button"\n        />\n        <div>\n          <Field.String path="/nested/nestedText" label="Nested text" />\n          <Field.Number\n            path="/nested/nestedNumber"\n            label="Nested number (minimum 50)"\n            minimum={50}\n          />\n        </div>\n        <div className="hmm">\n          <Flex.Horizontal>\n            <Field.String path="/list/0/itemText" label="Item text" />\n            <Field.Number path="/list/0/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n          <Flex.Horizontal>\n            <Field.String path="/list/1/itemText" label="Item text" />\n            <Field.Number path="/list/1/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n        </div>\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Vertical>\n    </Card>\n  </Flex.Stack>\n</DataContext.Provider>\n'}),m=()=>(0,r.jsx)(i.Z,{scope:{DataContext:o,Value:s,testdata:d,TestdataSchema:u},children:'<DataContext.Provider\n  data={testdata}\n  schema={TestdataSchema}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  onSubmitRequest={() => console.log(\'onSubmitRequest\')}\n>\n  <Flex.Stack>\n    <Card>\n      <Flex.Vertical divider="line" spacing="small">\n        <Field.String path="/requiredString" label="Required string" />\n        <Field.String path="/hmm" label="Invalid path" />\n        <Field.String path="/string" label="String value" />\n        <Field.String path="/string" label="String value (copy)" />\n        <Field.Number path="/number" label="Number value" />\n        <Field.String path="/number" label="Number with Field.String" />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Checkbox"\n          variant="checkbox"\n        />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Toggle"\n          variant="button"\n        />\n        <div>\n          <Field.String path="/nested/nestedText" label="Nested text" />\n          <Field.Number\n            path="/nested/nestedNumber"\n            label="Nested number"\n          />\n        </div>\n        <div className="hmm">\n          <Flex.Horizontal>\n            <Field.String path="/list/0/itemText" label="Item text" />\n            <Field.Number path="/list/0/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n          <Flex.Horizontal>\n            <Field.String path="/list/1/itemText" label="Item text" />\n            <Field.Number path="/list/1/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n        </div>\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Vertical>\n    </Card>\n  </Flex.Stack>\n</DataContext.Provider>\n'});function p(e){const n=Object.assign({h2:"h2",h3:"h3"},(0,l.ah)(),e.components);return a||h("Examples",!1),c||h("Examples.Default",!0),m||h("Examples.ValidationWithJsonSchema",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Demos"}),"\n",(0,r.jsx)(n.h3,{children:"Data and callback events (and session store)"}),"\n",(0,r.jsx)(c,{}),"\n",(0,r.jsx)(n.h3,{children:"Validation with Json Schema"}),"\n",(0,r.jsx)(m,{})]})}var b=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(p,e)})):p(e)};function h(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},37299:function(e,n,t){t.r(n);var a=t(52322),r=t(45392);function l(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a"},(0,r.ah)(),e.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:"Description"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"DataContext.Provider"})," is the context provider that has to wrap the features if components of Field and Value is to be used with a common source instead of distributing values and events individually."]}),"\n",(0,a.jsxs)(n.p,{children:["Please use ",(0,a.jsx)(n.a,{href:"/uilib/extensions/forms/extended-features/Form/Handler",children:"Form.Handler"})," for application forms."]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(l,e)})):l(e)}},16620:function(e,n,t){t.r(n),t.d(n,{At:function(){return d},Context:function(){return a.Z},Provider:function(){return r.Z},defaultContextState:function(){return a.E}});var a=t(21068),r=t(80370),l=t(2784),i=t(95955),o=t.n(i),s=t(52322);function u(e){const{path:n="/",iterate:t,children:r}=e,i=(0,l.useContext)(a.Z),{data:u,handlePathChange:d}=i,c=u&&o().has(u,n)?o().get(u,n):void 0,m=(0,l.useMemo)((()=>d?(e,t)=>{d(`${n}${e}`,t)}:void 0),[d,n]);return t?Array.isArray(c)?(0,s.jsx)(s.Fragment,{children:c.map(((e,t)=>{const l=d?(e,a)=>{d(`${n}/${t}${e}`,a)}:void 0;return(0,s.jsx)(a.Z.Provider,{value:{...i,data:e,handlePathChange:l},children:r},`element${t}`)}))}):null:(0,s.jsx)(a.Z.Provider,{value:{...i,data:c,handlePathChange:m},children:r})}u._supportsSpacingProps=!0;var d=u},1357:function(e,n,t){t.r(n),t.d(n,{BankAccountNumber:function(){return Z},Boolean:function(){return h},Currency:function(){return g},Date:function(){return f},Email:function(){return F},NationalIdentityNumber:function(){return y},Number:function(){return c},PhoneNumber:function(){return P},String:function(){return s}});var a=t(49406),r=t(8160),l=t(55590),i=t(52322);function o(e){const{className:n,label:t,placeholder:o,value:s,inline:u,showEmpty:d,prepare:c=(e=>e)}=(0,r.Z)(e);return(0,i.jsx)(a.Z,{className:n,label:t,showEmpty:d,placeholder:o,inline:u,...(0,l.SR)(e),children:c(s)})}o._supportsSpacingProps=!0;var s=o;function u(e,n){const{thousandSeparator:t,decimalLimit:a,fixedDecimals:r,decimalSymbol:l=",",magnitude:i,prefix:o,suffix:s}=null!=n?n:{},u=void 0!==i?e/Math.pow(10,i):e,d=void 0!==r?u.toFixed(r):a?(Math.round(u*Math.pow(10,a))/Math.pow(10,a)).toString():u.toString(),c=void 0!==l?d.replace(".",l):d,m=void 0!==t?c.replace(/\B(?=(\d{3})+(?!\d))/g,t):c,p=void 0!==o?o+m:m;return void 0!==s?p+s:p}function d(e){const{className:n,label:t,placeholder:o,value:s,inline:d,showEmpty:c,thousandSeparator:m,decimalSymbol:p,decimalLimit:b,prefix:h,suffix:x}=(0,r.Z)(e);return(0,i.jsx)(a.Z,{className:n,label:t,showEmpty:c,placeholder:o,inline:d,...(0,l.SR)(e),children:void 0!==s?u(s,{thousandSeparator:!0===m?" ":m,decimalSymbol:p,decimalLimit:b,prefix:h,suffix:x}):null})}d._supportsSpacingProps=!0;var c=d,m=t(2784),p=t(32831);function b(e){const n=(0,m.useContext)(p.Z),{className:t,label:o,placeholder:s,showEmpty:u,value:d,inline:c}=(0,r.Z)(e);return(0,i.jsx)(a.Z,{className:t,label:o,showEmpty:u,placeholder:s,inline:c,...(0,l.SR)(e),children:!0===d||!1===d?!0===d?null==n?void 0:n.translation.Forms.booleanYes:null==n?void 0:n.translation.Forms.booleanNo:null})}b._supportsSpacingProps=!0;var h=b;function x(e){var n,t;const a={...e,label:e.label,thousandSeparator:null!==(n=e.thousandSeparator)&&void 0!==n?n:" ",suffix:null!==(t=e.suffix)&&void 0!==t?t:" kr"};return(0,i.jsx)(c,{...a})}x._supportsSpacingProps=!0;var g=x;function v(e){var n;const t=(0,m.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:null==t?void 0:t.translation.Forms.dateLabel};return(0,i.jsx)(s,{...a})}v._supportsSpacingProps=!0;var f=v;function S(e){var n;const t=(0,m.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:null==t?void 0:t.translation.Forms.emailLabel};return(0,i.jsx)(s,{...a})}S._supportsSpacingProps=!0;var F=S,j=t(41672);function N(e){var n;const t=(0,m.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:e.inline||null==t?void 0:t.translation.Forms.nationalIdentityNumberLabel,prepare:e=>(0,j.WU)((0,j.bR)(e),{nin:!0}).toString()};return(0,i.jsx)(s,{...a})}N._supportsSpacingProps=!0;var y=N;function C(e){var n;const t=(0,m.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:e.inline||null==t?void 0:t.translation.Forms.phoneNumberLabel,prepare:e=>(0,j.WU)((0,j.bR)(e),{phone:!0}).toString()};return(0,i.jsx)(s,{...a})}C._supportsSpacingProps=!0;var P=C;function w(e){var n;const t=(0,m.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:e.inline||null==t?void 0:t.translation.Forms.bankAccountNumberLabel,prepare:e=>(0,j.WU)((0,j.bR)(e),{ban:!0}).toString()};return(0,i.jsx)(s,{...a})}w._supportsSpacingProps=!0;var Z=w},49406:function(e,n,t){var a=t(65731),r=t(94799),l=t(72779),i=t.n(l),o=t(55590),s=t(52322);function u(e){const{className:n,label:t,inline:l,placeholder:u,showEmpty:d,children:c}=e;return null!=c&&!1!==c||d||u?(0,s.jsxs)(a.Z,{className:i()("dnb-forms-value",l&&"dnb-forms-value-block--inline",n),...(0,o.SR)(e),children:[t&&(0,s.jsx)(r.Z,{className:"dnb-forms-value-block__label",label_direction:l?"horizontal":"vertical",children:t}),null!=c?c:(0,s.jsx)("span",{className:"dnb-forms-value-block__placeholder",children:u})]}):null}u._supportsSpacingProps=!0,n.Z=u}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-create-component-data-context-provider-mdx-d07d2a783a519a31384a.js.map
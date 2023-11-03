"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[2410],{34168:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var a={};t.r(a),t.d(a,{Default:function(){return m},TestdataSchema:function(){return u},ValidationWithJsonSchema:function(){return c},testdata:function(){return d}});var l=t(52322),r=t(45392),i=t(35823),o=t(16620),s=t(1357);const u={type:"object",properties:{requiredString:{type:"string"},string:{type:"string",minLength:3},number:{type:"number",minimum:42},boolean:{type:"boolean"},email:{type:"string"},nested:{type:"object",properties:{nestedText:{type:"string"},nestedNumber:{type:"number",minimum:50}}},list:{type:"array",items:{type:"object",properties:{itemText:{type:"string"},itemNumber:{type:"number",minimum:50}}}}},required:["requiredString"]},d={requiredString:"This is a text",string:"String value",number:123,boolean:!0,email:"m@il.com",nested:{nestedText:"Nested text",nestedNumber:42},list:[{itemText:"Item text",itemNumber:1001},{itemText:"Item text 2",itemNumber:1002}]},m=()=>(0,l.jsx)(i.Z,{scope:{DataContext:o,Value:s,testdata:d,TestdataSchema:u},children:'<DataContext.Provider\n  defaultData={testdata}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  onSubmitRequest={() => console.log(\'onSubmitRequest\')}\n  sessionStorageId="provider-example-1"\n>\n  <Flex.Stack>\n    <Card>\n      <Flex.Vertical divider="line" spacing="small">\n        <Field.String\n          path="/requiredString"\n          label="Required string"\n          required\n        />\n        <Field.String path="/hmm" label="Invalid path" />\n        <Field.String path="/string" label="String value" />\n        <Field.String path="/string" label="String value (copy)" />\n        <Field.Number path="/number" label="Number value" />\n        <Field.String path="/number" label="Number with Field.String" />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Checkbox"\n          variant="checkbox"\n        />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Toggle"\n          variant="button"\n        />\n        <div>\n          <Field.String path="/nested/nestedText" label="Nested text" />\n          <Field.Number\n            path="/nested/nestedNumber"\n            label="Nested number (minimum 50)"\n            minimum={50}\n          />\n        </div>\n        <div className="hmm">\n          <Flex.Horizontal>\n            <Field.String path="/list/0/itemText" label="Item text" />\n            <Field.Number path="/list/0/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n          <Flex.Horizontal>\n            <Field.String path="/list/1/itemText" label="Item text" />\n            <Field.Number path="/list/1/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n        </div>\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Vertical>\n    </Card>\n  </Flex.Stack>\n</DataContext.Provider>\n'}),c=()=>(0,l.jsx)(i.Z,{scope:{DataContext:o,Value:s,testdata:d,TestdataSchema:u},children:'<DataContext.Provider\n  data={testdata}\n  schema={TestdataSchema}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  onSubmitRequest={() => console.log(\'onSubmitRequest\')}\n>\n  <Flex.Stack>\n    <Card>\n      <Flex.Vertical divider="line" spacing="small">\n        <Field.String path="/requiredString" label="Required string" />\n        <Field.String path="/hmm" label="Invalid path" />\n        <Field.String path="/string" label="String value" />\n        <Field.String path="/string" label="String value (copy)" />\n        <Field.Number path="/number" label="Number value" />\n        <Field.String path="/number" label="Number with Field.String" />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Checkbox"\n          variant="checkbox"\n        />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Toggle"\n          variant="button"\n        />\n        <div>\n          <Field.String path="/nested/nestedText" label="Nested text" />\n          <Field.Number\n            path="/nested/nestedNumber"\n            label="Nested number"\n          />\n        </div>\n        <div className="hmm">\n          <Flex.Horizontal>\n            <Field.String path="/list/0/itemText" label="Item text" />\n            <Field.Number path="/list/0/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n          <Flex.Horizontal>\n            <Field.String path="/list/1/itemText" label="Item text" />\n            <Field.Number path="/list/1/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n        </div>\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Vertical>\n    </Card>\n  </Flex.Stack>\n</DataContext.Provider>\n'});function p(e){const n=Object.assign({h2:"h2",h3:"h3"},(0,r.ah)(),e.components);return a||h("Examples",!1),m||h("Examples.Default",!0),c||h("Examples.ValidationWithJsonSchema",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Demos"}),"\n",(0,l.jsx)(n.h3,{children:"Data and callback events (and session store)"}),"\n",(0,l.jsx)(m,{}),"\n",(0,l.jsx)(n.h3,{children:"Validation with Json Schema"}),"\n",(0,l.jsx)(c,{})]})}var b=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(p,e)})):p(e)};function h(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},16620:function(e,n,t){t.r(n),t.d(n,{At:function(){return d},Context:function(){return a.Z},Provider:function(){return l.Z},defaultContextState:function(){return a.E}});var a=t(21068),l=t(80370),r=t(2784),i=t(95955),o=t.n(i),s=t(52322);function u(e){const{path:n="/",iterate:t,children:l}=e,i=(0,r.useContext)(a.Z),{data:u,handlePathChange:d}=i,m=u&&o().has(u,n)?o().get(u,n):void 0,c=(0,r.useMemo)((()=>d?(e,t)=>{d(`${n}${e}`,t)}:void 0),[d,n]);return t?Array.isArray(m)?(0,s.jsx)(s.Fragment,{children:m.map(((e,t)=>{const r=d?(e,a)=>{d(`${n}/${t}${e}`,a)}:void 0;return(0,s.jsx)(a.Z.Provider,{value:{...i,data:e,handlePathChange:r},children:l},`element${t}`)}))}):null:(0,s.jsx)(a.Z.Provider,{value:{...i,data:m,handlePathChange:c},children:l})}u._supportsSpacingProps=!0;var d=u},1357:function(e,n,t){t.r(n),t.d(n,{BankAccountNumber:function(){return Z},Boolean:function(){return h},Currency:function(){return x},Date:function(){return S},Email:function(){return F},NationalIdentityNumber:function(){return C},Number:function(){return m},PhoneNumber:function(){return P},String:function(){return s}});var a=t(49406),l=t(8160),r=t(55590),i=t(52322);function o(e){const{className:n,label:t,placeholder:o,value:s,inline:u,showEmpty:d,prepare:m=(e=>e)}=(0,l.Z)(e);return(0,i.jsx)(a.Z,{className:n,label:t,showEmpty:d,placeholder:o,inline:u,...(0,r.SR)(e),children:m(s)})}o._supportsSpacingProps=!0;var s=o;function u(e,n){const{thousandSeparator:t,decimalLimit:a,fixedDecimals:l,decimalSymbol:r=",",magnitude:i,prefix:o,suffix:s}=null!=n?n:{},u=void 0!==i?e/Math.pow(10,i):e,d=void 0!==l?u.toFixed(l):a?(Math.round(u*Math.pow(10,a))/Math.pow(10,a)).toString():u.toString(),m=void 0!==r?d.replace(".",r):d,c=void 0!==t?m.replace(/\B(?=(\d{3})+(?!\d))/g,t):m,p=void 0!==o?o+c:c;return void 0!==s?p+s:p}function d(e){const{className:n,label:t,placeholder:o,value:s,inline:d,showEmpty:m,thousandSeparator:c,decimalSymbol:p,decimalLimit:b,prefix:h,suffix:g}=(0,l.Z)(e);return(0,i.jsx)(a.Z,{className:n,label:t,showEmpty:m,placeholder:o,inline:d,...(0,r.SR)(e),children:void 0!==s?u(s,{thousandSeparator:!0===c?" ":c,decimalSymbol:p,decimalLimit:b,prefix:h,suffix:g}):null})}d._supportsSpacingProps=!0;var m=d,c=t(2784),p=t(28952);function b(e){const n=(0,c.useContext)(p.Z),{className:t,label:o,placeholder:s,showEmpty:u,value:d,inline:m}=(0,l.Z)(e);return(0,i.jsx)(a.Z,{className:t,label:o,showEmpty:u,placeholder:s,inline:m,...(0,r.SR)(e),children:!0===d||!1===d?!0===d?null==n?void 0:n.translation.Forms.booleanYes:null==n?void 0:n.translation.Forms.booleanNo:null})}b._supportsSpacingProps=!0;var h=b;function g(e){var n,t;const a={...e,label:e.label,thousandSeparator:null!==(n=e.thousandSeparator)&&void 0!==n?n:" ",suffix:null!==(t=e.suffix)&&void 0!==t?t:" kr"};return(0,i.jsx)(m,{...a})}g._supportsSpacingProps=!0;var x=g;function v(e){var n;const t=(0,c.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:null==t?void 0:t.translation.Forms.dateLabel};return(0,i.jsx)(s,{...a})}v._supportsSpacingProps=!0;var S=v;function f(e){var n;const t=(0,c.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:null==t?void 0:t.translation.Forms.emailLabel};return(0,i.jsx)(s,{...a})}f._supportsSpacingProps=!0;var F=f,N=t(41672);function y(e){var n;const t=(0,c.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:e.inline||null==t?void 0:t.translation.Forms.nationalIdentityNumberLabel,prepare:e=>(0,N.WU)((0,N.bR)(e),{nin:!0}).toString()};return(0,i.jsx)(s,{...a})}y._supportsSpacingProps=!0;var C=y;function j(e){var n;const t=(0,c.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:e.inline||null==t?void 0:t.translation.Forms.phoneNumberLabel,prepare:e=>(0,N.WU)((0,N.bR)(e),{phone:!0}).toString()};return(0,i.jsx)(s,{...a})}j._supportsSpacingProps=!0;var P=j;function w(e){var n;const t=(0,c.useContext)(p.Z),a={...e,label:null!==(n=e.label)&&void 0!==n?n:e.inline||null==t?void 0:t.translation.Forms.bankAccountNumberLabel,prepare:e=>(0,N.WU)((0,N.bR)(e),{ban:!0}).toString()};return(0,i.jsx)(s,{...a})}w._supportsSpacingProps=!0;var Z=w},49406:function(e,n,t){var a=t(65731),l=t(9149),r=t(72779),i=t.n(r),o=t(55590),s=t(52322);function u(e){const{className:n,label:t,inline:r,placeholder:u,showEmpty:d,children:m}=e;return null!=m&&!1!==m||d||u?(0,s.jsxs)(a.Z,{className:i()("dnb-forms-value",r&&"dnb-forms-value-block--inline",n),...(0,o.SR)(e),children:[t&&(0,s.jsx)(l.Z,{className:"dnb-forms-value-block__label",label_direction:r?"horizontal":"vertical",children:t}),null!=m?m:(0,s.jsx)("span",{className:"dnb-forms-value-block__placeholder",children:u})]}):null}u._supportsSpacingProps=!0,n.Z=u}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-create-component-data-context-provider-demos-mdx-f532c73891bf9af553dc.js.map
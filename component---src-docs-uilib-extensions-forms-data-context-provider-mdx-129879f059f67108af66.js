"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[85683,98897,20758],{642:function(e,n,t){t.r(n);var a=t(52322),r=t(45392),i=t(17146),o=t(79046);function l(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.default,{}),"\n",(0,a.jsx)(o.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(l,e)})):l()}},79046:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var a={};t.r(a),t.d(a,{Default:function(){return m},TestDataSchema:function(){return d},ValidationWithJsonSchema:function(){return c},testData:function(){return u}});var r=t(52322),i=t(45392),o=t(41404),l=t(16620),s=t(92188);const d={type:"object",properties:{requiredString:{type:"string"},string:{type:"string",minLength:3},number:{type:"number",minimum:42},boolean:{type:"boolean"},email:{type:"string"},nested:{type:"object",properties:{nestedText:{type:"string"},nestedNumber:{type:"number",minimum:50}}},list:{type:"array",items:{type:"object",properties:{itemText:{type:"string"},itemNumber:{type:"number",minimum:50}}}}},required:["requiredString"]},u={requiredString:"This is a text",string:"String value",number:123,boolean:!0,email:"m@il.com",nested:{nestedText:"Nested text",nestedNumber:42},list:[{itemText:"Item text",itemNumber:1001},{itemText:"Item text 2",itemNumber:1002}]},m=()=>(0,r.jsx)(o.Z,{scope:{DataContext:l,Value:s,testData:u,TestDataSchema:d},children:'<DataContext.Provider\n  defaultData={testData}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmitRequest={() => console.log(\'onSubmitRequest\')}\n  onSubmit={(data, { resetForm, clearData }) => {\n    console.log(\'onSubmit\', data)\n\n    // Docs: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/events/#onsubmit-parameters\n    resetForm()\n    clearData()\n  }}\n  sessionStorageId="provider-example-1"\n>\n  <Flex.Stack>\n    <Form.Card>\n      <Flex.Vertical divider="line" gap="small">\n        <Field.String\n          path="/requiredString"\n          label="Required string"\n          required\n        />\n        <Field.String path="/hmm" label="Invalid path" />\n        <Field.String path="/string" label="String value" />\n        <Field.String path="/string" label="String value (copy)" />\n        <Field.Number path="/number" label="Number value" />\n        <Field.String path="/number" label="Number with Field.String" />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Checkbox"\n          variant="checkbox"\n        />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Toggle"\n          variant="button"\n        />\n        <div>\n          <Field.String path="/nested/nestedText" label="Nested text" />\n          <Field.Number\n            path="/nested/nestedNumber"\n            label="Nested number (minimum 50)"\n            minimum={50}\n          />\n        </div>\n        <div className="hmm">\n          <Flex.Horizontal>\n            <Field.String path="/list/0/itemText" label="Item text" />\n            <Field.Number path="/list/0/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n          <Flex.Horizontal>\n            <Field.String path="/list/1/itemText" label="Item text" />\n            <Field.Number path="/list/1/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n        </div>\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Vertical>\n    </Form.Card>\n  </Flex.Stack>\n</DataContext.Provider>\n'}),c=()=>(0,r.jsx)(o.Z,{scope:{DataContext:l,Value:s,testData:u,TestDataSchema:d},children:'<DataContext.Provider\n  data={testData}\n  schema={TestDataSchema}\n  onChange={(data) => console.log(\'onChange\', data)}\n  onPathChange={(path, value) => console.log(\'onPathChange\', path, value)}\n  onSubmit={(data) => console.log(\'onSubmit\', data)}\n  onSubmitRequest={() => console.log(\'onSubmitRequest\')}\n>\n  <Flex.Stack>\n    <Form.Card>\n      <Flex.Vertical divider="line" gap="small">\n        <Field.String path="/requiredString" label="Required string" />\n        <Field.String path="/hmm" label="Invalid path" />\n        <Field.String path="/string" label="String value" />\n        <Field.String path="/string" label="String value (copy)" />\n        <Field.Number path="/number" label="Number value" />\n        <Field.String path="/number" label="Number with Field.String" />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Checkbox"\n          variant="checkbox"\n        />\n        <Field.Boolean\n          path="/boolean"\n          label="Boolean - Toggle"\n          variant="button"\n        />\n        <div>\n          <Field.String path="/nested/nestedText" label="Nested text" />\n          <Field.Number\n            path="/nested/nestedNumber"\n            label="Nested number"\n          />\n        </div>\n        <div className="hmm">\n          <Flex.Horizontal>\n            <Field.String path="/list/0/itemText" label="Item text" />\n            <Field.Number path="/list/0/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n          <Flex.Horizontal>\n            <Field.String path="/list/1/itemText" label="Item text" />\n            <Field.Number path="/list/1/itemNumber" label="Item number" />\n          </Flex.Horizontal>\n        </div>\n        <Form.ButtonRow>\n          <Form.SubmitButton />\n        </Form.ButtonRow>\n      </Flex.Vertical>\n    </Form.Card>\n  </Flex.Stack>\n</DataContext.Provider>\n'});function h(e){const n=Object.assign({h2:"h2",h3:"h3"},(0,i.ah)(),e.components);return a||p("Examples",!1),m||p("Examples.Default",!0),c||p("Examples.ValidationWithJsonSchema",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Demos"}),"\n",(0,r.jsx)(n.h3,{children:"Data and callback events (and session store)"}),"\n",(0,r.jsx)(m,{}),"\n",(0,r.jsx)(n.h3,{children:"Validation with Json Schema"}),"\n",(0,r.jsx)(c,{})]})}var b=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(h,e)})):h(e)};function p(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},17146:function(e,n,t){t.r(n);var a=t(52322),r=t(45392);function i(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,r.ah)(),e.components);return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:"Description"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"DataContext.Provider"})," is the context provider that has to wrap the features if components of Field and Value is to be used with a common source instead of distributing values and events individually."]}),"\n",(0,a.jsxs)(n.p,{children:["For a more complete feature set tailored to building forms, please use ",(0,a.jsx)(n.a,{href:"/uilib/extensions/forms/Form/Handler",children:"Form.Handler"}),". It uses DataContext internally."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-tsx",children:"import { DataContext } from '@dnb/eufemia/extensions/forms'\nrender(\n  <DataContext.Provider data={existingData}>...</DataContext.Provider>,\n)\n"})})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,a.jsx)(n,Object.assign({},e,{children:(0,a.jsx)(i,e)})):i(e)}},16620:function(e,n,t){t.r(n),t.d(n,{At:function(){return d},Consumer:function(){return u},Context:function(){return a.Z},Provider:function(){return r.Z},defaultContextState:function(){return a.E}});var a=t(21068),r=t(6436),i=t(2784),o=t(2394),l=t(52322);function s(e){const{path:n="/",iterate:t,children:r}=e,s=(0,i.useContext)(a.Z),{data:d,handlePathChange:u}=s,m=d&&o.e$(d,n)?o.U2(d,n):void 0,c=(0,i.useCallback)(((e,t)=>{u(`${n}${e}`,t)}),[u,n]);return t?Array.isArray(m)?(0,l.jsx)(l.Fragment,{children:m.map(((e,t)=>{const i=u?(e,a)=>{u(`${n}/${t}${e}`,a)}:void 0;return(0,l.jsx)(a.Z.Provider,{value:{...s,data:e,handlePathChange:i},children:r},`element${t}`)}))}):null:(0,l.jsx)(a.Z.Provider,{value:{...s,data:m,handlePathChange:c},children:r})}s._supportsSpacingProps=!0;var d=s;const u=a.Z.Consumer}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-data-context-provider-mdx-129879f059f67108af66.js.map
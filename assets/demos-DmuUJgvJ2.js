import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{Q as r}from"./Anchor-Djq5YQEM.js";import{c as i}from"./ToggleButton-_NsXxiTa.js";import{t as a}from"./Card-ChPhpBPz.js";import{y as o}from"./Selection-DWa_5MEy.js";import{t as s}from"./ajv-bWb4wA9P.js";import{t as c}from"./Form-JTiJXf2d.js";import{t as l}from"./Field-DqRpWyNm.js";import{t as u}from"./Value-OsZalonW.js";import{K as d}from"./index-ppRu2ktv.js";import{t as f}from"./ComponentBox-R2c6Bo76.js";var p=e({Default:()=>_,TestDataSchema:()=>h,ValidationWithJsonSchema:()=>v,testData:()=>g}),m=t(n()),h={type:`object`,properties:{requiredString:{type:`string`},string:{type:`string`,minLength:3},number:{type:`number`,minimum:42},boolean:{type:`boolean`},email:{type:`string`},nested:{type:`object`,properties:{nestedText:{type:`string`},nestedNumber:{type:`number`,minimum:50}}},list:{type:`array`,items:{type:`object`,properties:{itemText:{type:`string`},itemNumber:{type:`number`,minimum:50}}}}},required:[`requiredString`]},g={requiredString:`This is a text`,string:`String value`,number:123,boolean:!0,email:`m@il.com`,nested:{nestedText:`Nested text`,nestedNumber:42},list:[{itemText:`Item text`,itemNumber:1001},{itemText:`Item text 2`,itemNumber:1002}]},_=()=>(0,m.jsx)(f,{scope:{DataContext:o,Value:u,testData:g,TestDataSchema:h},stableName:`Default`,sourceImports:[`import { Form, DataContext, Field, Value, JSONSchema, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{DataContext:o,Provider:r,Flex:i,Form:c,Card:a,Field:l},children:`<DataContext.Provider
  defaultData={testData}
  onChange={(data) => console.log('onChange', data)}
  onPathChange={(path, value) => console.log('onPathChange', path, value)}
  onSubmitRequest={() => console.log('onSubmitRequest')}
  onSubmit={(data, { resetForm, clearData }) => {
    console.log('onSubmit', data)

    // Docs: https://eufemia.dnb.no/uilib/extensions/forms/DataContext/Provider/events/#onsubmit-parameters
    resetForm()
    clearData()
  }}
  sessionStorageId="provider-example-1"
>
  <Flex.Stack>
    <Form.Card>
      <Flex.Vertical divider="line" gap="small">
        <Field.String
          path="/requiredString"
          label="Required string"
          required
        />
        <Field.String path="/hmm" label="Invalid path" />
        <Field.String path="/string" label="String value" />
        <Field.String path="/string" label="String value (copy)" />
        <Field.Number path="/number" label="Number value" />
        <Field.String path="/number" label="Number with Field.String" />
        <Field.Boolean
          path="/boolean"
          label="Boolean - Checkbox"
          variant="checkbox"
        />
        <Field.Boolean
          path="/boolean"
          label="Boolean - Toggle"
          variant="button"
        />
        <div>
          <Field.String path="/nested/nestedText" label="Nested text" />
          <Field.Number
            path="/nested/nestedNumber"
            label="Nested number (minimum 50)"
            minimum={50}
          />
        </div>
        <div className="hmm">
          <Flex.Horizontal>
            <Field.String path="/list/0/itemText" label="Item text" />
            <Field.Number path="/list/0/itemNumber" label="Item number" />
          </Flex.Horizontal>
          <Flex.Horizontal>
            <Field.String path="/list/1/itemText" label="Item text" />
            <Field.Number path="/list/1/itemNumber" label="Item number" />
          </Flex.Horizontal>
        </div>
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Vertical>
    </Form.Card>
  </Flex.Stack>
</DataContext.Provider>
`}),v=()=>(0,m.jsx)(f,{scope:{DataContext:o,Value:u,testData:g,TestDataSchema:h,ajv:s()},stableName:`ValidationWithJsonSchema`,sourceImports:[`import { Form, DataContext, Field, Value, JSONSchema, makeAjvInstance } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{DataContext:o,Provider:r,Flex:i,Form:c,Card:a,Field:l},children:`<DataContext.Provider
  data={testData}
  schema={TestDataSchema}
  ajvInstance={ajv}
  onChange={(data) => console.log('onChange', data)}
  onPathChange={(path, value) => console.log('onPathChange', path, value)}
  onSubmit={(data) => console.log('onSubmit', data)}
  onSubmitRequest={() => console.log('onSubmitRequest')}
>
  <Flex.Stack>
    <Form.Card>
      <Flex.Vertical divider="line" gap="small">
        <Field.String path="/requiredString" label="Required string" />
        <Field.String path="/hmm" label="Invalid path" />
        <Field.String path="/string" label="String value" />
        <Field.String path="/string" label="String value (copy)" />
        <Field.Number path="/number" label="Number value" />
        <Field.String path="/number" label="Number with Field.String" />
        <Field.Boolean
          path="/boolean"
          label="Boolean - Checkbox"
          variant="checkbox"
        />
        <Field.Boolean
          path="/boolean"
          label="Boolean - Toggle"
          variant="button"
        />
        <div>
          <Field.String path="/nested/nestedText" label="Nested text" />
          <Field.Number
            path="/nested/nestedNumber"
            label="Nested number"
          />
        </div>
        <div className="hmm">
          <Flex.Horizontal>
            <Field.String path="/list/0/itemText" label="Item text" />
            <Field.Number path="/list/0/itemNumber" label="Item number" />
          </Flex.Horizontal>
          <Flex.Horizontal>
            <Field.String path="/list/1/itemText" label="Item text" />
            <Field.Number path="/list/1/itemNumber" label="Item number" />
          </Flex.Horizontal>
        </div>
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Flex.Vertical>
    </Form.Card>
  </Flex.Stack>
</DataContext.Provider>
`});function y(e){let t={h2:`h2`,h3:`h3`,...d(),...e.components};return p||x(`Examples`,!1),_||x(`Examples.Default`,!0),v||x(`Examples.ValidationWithJsonSchema`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(t.h3,{children:`Data and callback events (and session store)`}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(t.h3,{children:`Validation with Json Schema`}),`
`,(0,m.jsx)(v,{})]})}function b(e={}){let{wrapper:t}={...d(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};
import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{g as n,t as r}from"./ComponentBox-xW2kV1s2.js";import{t as i}from"./ajv-4Y6M4YbK.js";import{J as a,Lr as o}from"./index-DVm0MbGb.js";var s=e({Default:()=>d,TestDataSchema:()=>l,ValidationWithJsonSchema:()=>f,testData:()=>u}),c=t(),l={type:`object`,properties:{requiredString:{type:`string`},string:{type:`string`,minLength:3},number:{type:`number`,minimum:42},boolean:{type:`boolean`},email:{type:`string`},nested:{type:`object`,properties:{nestedText:{type:`string`},nestedNumber:{type:`number`,minimum:50}}},list:{type:`array`,items:{type:`object`,properties:{itemText:{type:`string`},itemNumber:{type:`number`,minimum:50}}}}},required:[`requiredString`]},u={requiredString:`This is a text`,string:`String value`,number:123,boolean:!0,email:`m@il.com`,nested:{nestedText:`Nested text`,nestedNumber:42},list:[{itemText:`Item text`,itemNumber:1001},{itemText:`Item text 2`,itemNumber:1002}]},d=()=>(0,c.jsx)(r,{scope:{DataContext:a,Value:n,testData:u,TestDataSchema:l},children:`<DataContext.Provider
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
`}),f=()=>(0,c.jsx)(r,{scope:{DataContext:a,Value:n,testData:u,TestDataSchema:l,ajv:i()},children:`<DataContext.Provider
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
`});function p(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return s||h(`Examples`,!1),d||h(`Examples.Default`,!0),f||h(`Examples.ValidationWithJsonSchema`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Data and callback events (and session store)`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Validation with Json Schema`}),`
`,(0,c.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
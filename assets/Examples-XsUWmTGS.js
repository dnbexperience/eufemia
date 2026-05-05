import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";var r=e({Composition:()=>o,InheritLabel:()=>s,InheritVisibility:()=>c,SummaryList:()=>a}),i=t(),a=()=>(0,i.jsx)(n,{children:`<Value.SummaryList>
  <Value.String label="Foo" value="value" />
  <Value.Number label="Bar" value={123} />
</Value.SummaryList>
`}),o=()=>(0,i.jsx)(n,{children:`<Value.SummaryList>
  <Value.String label="Foo" value="value" />
  <Value.Composition label="Label">
    <Value.String value="value" />
    <Value.Number value={123} />
  </Value.Composition>
</Value.SummaryList>
`}),s=()=>(0,i.jsx)(n,{children:`<Form.Handler
  data={{
    myPath: 'My value',
  }}
>
  <Flex.Stack>
    <Value.String path="/myPath" inheritLabel />
    <Field.String path="/myPath" label="Inherited label" />
  </Flex.Stack>
</Form.Handler>
`}),c=()=>(0,i.jsx)(n,{children:`<Form.Handler>
  <Flex.Stack>
    <Field.Boolean
      label="Show radio buttons"
      variant="button"
      path="/isVisible"
      defaultValue={true}
    />

    <Form.Visibility pathTrue="/isVisible" animate>
      <Field.Selection
        label="Radio buttons"
        variant="radio"
        path="/myValue"
        defaultValue="foo"
      >
        <Field.Option value="foo" title="Foo" />
        <Field.Option value="bar" title="Bar" />
      </Field.Selection>
    </Form.Visibility>

    <Value.Selection path="/myValue" inheritLabel inheritVisibility />
  </Flex.Stack>
</Form.Handler>
`});export{a,c as i,r as n,s as r,o as t};
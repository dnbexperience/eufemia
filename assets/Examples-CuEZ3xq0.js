import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";var i=t({Composition:()=>s,InheritLabel:()=>c,InheritVisibility:()=>l,SummaryList:()=>o}),a=e(n()),o=()=>(0,a.jsx)(r,{stableName:`SummaryList`,children:`<Value.SummaryList>
  <Value.String label="Foo" value="value" />
  <Value.Number label="Bar" value={123} />
</Value.SummaryList>
`}),s=()=>(0,a.jsx)(r,{stableName:`Composition`,children:`<Value.SummaryList>
  <Value.String label="Foo" value="value" />
  <Value.Composition label="Label">
    <Value.String value="value" />
    <Value.Number value={123} />
  </Value.Composition>
</Value.SummaryList>
`}),c=()=>(0,a.jsx)(r,{stableName:`InheritLabel`,children:`<Form.Handler
  data={{
    myPath: 'My value',
  }}
>
  <Flex.Stack>
    <Value.String path="/myPath" inheritLabel />
    <Field.String path="/myPath" label="Inherited label" />
  </Flex.Stack>
</Form.Handler>
`}),l=()=>(0,a.jsx)(r,{stableName:`InheritVisibility`,children:`<Form.Handler>
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
`});export{o as a,l as i,i as n,c as r,s as t};
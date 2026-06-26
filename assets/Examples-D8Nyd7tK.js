import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-DM984GyO.js";import{j as i,v as a,w as o}from"./forms-CFi5-4x5.js";import{t as s}from"./ComponentBox-qLaLt9T0.js";var c=e({Composition:()=>d,InheritLabel:()=>f,InheritVisibility:()=>p,SummaryList:()=>u}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`SummaryList`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Value:a},children:`<Value.SummaryList>
  <Value.String label="Foo" value="value" />
  <Value.Number label="Bar" value={123} />
</Value.SummaryList>
`}),d=()=>(0,l.jsx)(s,{stableName:`Composition`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Value:a},children:`<Value.SummaryList>
  <Value.String label="Foo" value="value" />
  <Value.Composition label="Label">
    <Value.String value="value" />
    <Value.Number value={123} />
  </Value.Composition>
</Value.SummaryList>
`}),f=()=>(0,l.jsx)(s,{stableName:`InheritLabel`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:o,Flex:r,Value:a,Field:i},children:`<Form.Handler
  data={{
    myPath: 'My value',
  }}
>
  <Flex.Stack>
    <Value.String path="/myPath" inheritLabel />
    <Field.String path="/myPath" label="Inherited label" />
  </Flex.Stack>
</Form.Handler>
`}),p=()=>(0,l.jsx)(s,{stableName:`InheritVisibility`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:o,Flex:r,Field:i,Value:a},children:`<Form.Handler>
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
`});export{u as a,p as i,c as n,f as r,d as t};
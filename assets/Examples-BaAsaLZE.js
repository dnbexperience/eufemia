import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Form-PES0Uozy.js";import{t as i}from"./Field-DrUGn0oz.js";import{t as a}from"./Value-BOhdc4cL.js";import{un as o}from"./index-BIrFyEEc.js";import{t as s}from"./ComponentBox-DFVIRw0w.js";var c=t({Composition:()=>d,InheritLabel:()=>f,InheritVisibility:()=>p,SummaryList:()=>u}),l=e(n()),u=()=>(0,l.jsx)(s,{stableName:`SummaryList`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Value:a},children:`<Value.SummaryList>
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
`}),f=()=>(0,l.jsx)(s,{stableName:`InheritLabel`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:r,Flex:o,Value:a,Field:i},children:`<Form.Handler
  data={{
    myPath: 'My value',
  }}
>
  <Flex.Stack>
    <Value.String path="/myPath" inheritLabel />
    <Field.String path="/myPath" label="Inherited label" />
  </Flex.Stack>
</Form.Handler>
`}),p=()=>(0,l.jsx)(s,{stableName:`InheritVisibility`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:r,Flex:o,Field:i,Value:a},children:`<Form.Handler>
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
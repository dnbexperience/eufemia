import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as ee}from"./ToggleButton-DM984GyO.js";import{j as r,v as te,w as i}from"./forms-CFi5-4x5.js";import{t as ne}from"./Button-XQwxqpWO.js";import{t as a}from"./Card-Db-Q1D3Y.js";import{t as re}from"./Section-BQdvtuRF.js";import{t as ie}from"./ListExport-BA-bYu0z.js";import{U as ae}from"./index-kfZVC31v.js";import{t as o}from"./ComponentBox-qLaLt9T0.js";var oe=e({AutocompleteGroups:()=>D,AutocompleteLabel:()=>T,AutocompleteValidationRequired:()=>E,ButtonDisabled:()=>G,ButtonDisabledOptions:()=>K,ButtonEmpty:()=>V,ButtonError:()=>q,ButtonHorizontalOptionsLayout:()=>U,ButtonLabel:()=>H,ButtonNestingWithLogic:()=>X,ButtonOptionSelected:()=>W,ButtonWithAPath:()=>Y,ButtonWithData:()=>J,DropdownDisabled:()=>g,DropdownDisabledOptions:()=>_,DropdownDynamicOptions:()=>y,DropdownEmpty:()=>c,DropdownError:()=>v,DropdownGroups:()=>w,DropdownHighNumberOfOptions:()=>b,DropdownLabel:()=>u,DropdownLabelAndOptionSelected:()=>f,DropdownPlaceholder:()=>l,DropdownTransformSelection:()=>d,DropdownValidationRequired:()=>x,DropdownWidths:()=>h,DropdownWithAPath:()=>C,DropdownWithData:()=>S,HorizontalLayout:()=>m,RadioDisabled:()=>N,RadioDisabledOptions:()=>P,RadioEmpty:()=>O,RadioError:()=>F,RadioHorizontalLayout:()=>A,RadioHorizontalLayoutAndHorizontalOptionsLayout:()=>M,RadioHorizontalOptionsLayout:()=>j,RadioLabel:()=>se,RadioNestingAdvanced:()=>B,RadioNestingWithLogic:()=>z,RadioOptionSelected:()=>k,RadioWithAPath:()=>L,RadioWithData:()=>I,RadioWithListComposition:()=>R,SelectionErrorMessage:()=>Z,SelectionInfoMessage:()=>ce,SelectionWarningMessage:()=>Q,WithHelp:()=>p}),s=t(n()),c=()=>(0,s.jsx)(o,{stableName:`DropdownEmpty`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  onFocus={(value) => console.log('onFocus', value)}
  onBlur={(value) => console.log('onBlur', value)}
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),l=()=>(0,s.jsx)(o,{stableName:`DropdownPlaceholder`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  placeholder="Select something..."
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),u=()=>(0,s.jsx)(o,{stableName:`DropdownLabel`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`});function d(){return(0,s.jsx)(o,{stableName:`DropdownTransformSelection`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  label="Label"
  value="bar"
  transformSelection={({ title }) => {
    return title
  }}
>
  <Field.Option value="foo" title="Foo!" text="Additional text" />
  <Field.Option value="bar" title="Baar!" text="Additional text" />
</Field.Selection>
`})}var f=()=>(0,s.jsx)(o,{"data-visual-test":`selection-dropdown-default`,stableName:`DropdownLabelAndOptionSelected`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),p=()=>(0,s.jsx)(o,{"data-visual-test":`selection-dropdown-help`,stableName:`WithHelp`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  value="bar"
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Somewhere along the way, we must learn that there is nothing greater than to do something for others.',
  }}
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),m=()=>(0,s.jsx)(o,{"data-visual-test":`selection-dropdown-horizontal`,stableName:`HorizontalLayout`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  value="bar"
  label="Label text"
  layout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),h=()=>(0,s.jsx)(o,{hideCode:!0,"data-visual-test":`selection-dropdown-widths`,stableName:`DropdownWidths`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:ee,Field:r},children:`<Flex.Stack>
  <Field.Selection label="Default width (property omitted)" value="bar">
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>
  <Field.Selection
    label="Small selection with a long label"
    value="bar"
    width="small"
  >
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>
  <Field.Selection label="Medium" value="bar" width="medium">
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>
  <Field.Selection label="Large" value="bar" width="large">
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>
  <Field.Selection label="Stretch" value="bar" width="stretch">
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>
</Flex.Stack>
`}),g=()=>(0,s.jsx)(o,{stableName:`DropdownDisabled`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),_=()=>(0,s.jsx)(o,{stableName:`DropdownDisabledOptions`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},noInline:!0,children:`const Example = () => {
  return (
    <Field.Selection label="Label text">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
`}),v=()=>(0,s.jsx)(o,{stableName:`DropdownError`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),y=()=>(0,s.jsx)(o,{stableName:`DropdownDynamicOptions`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r,Button:ne},noInline:!0,children:`const Example = () => {
  const [numOptions, setNumOptions] = useState(3)
  return (
    <>
      <Field.Selection
        value="option-15"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      >
        {Array.from(Array(numOptions).keys()).map((key) => (
          <Field.Option
            key={key}
            value={key}
            title={\`Option \${key + 1}\`}
          />
        ))}
      </Field.Selection>

      <p>
        {[3, 4, 5].map((num, i) => (
          <Button
            key={i}
            size="medium"
            right="x-small"
            variant={numOptions === num ? 'primary' : 'secondary'}
            onClick={() => setNumOptions(num)}
          >
            {num} options
          </Button>
        ))}
      </p>
    </>
  )
}
render(<Example />)
`}),b=()=>(0,s.jsx)(o,{stableName:`DropdownHighNumberOfOptions`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  value="option-15"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="option-1" title="One" />
  <Field.Option value="option-2" title="Two" />
  <Field.Option value="option-3" title="Three" />
  <Field.Option value="option-4" title="Four" />
  <Field.Option value="option-5" title="Five" />
  <Field.Option value="option-6" title="Six" />
  <Field.Option value="option-7" title="Seven" />
  <Field.Option value="option-8" title="Eight" />
  <Field.Option value="option-9" title="Nine" />
  <Field.Option value="option-10" title="Ten" />
  <Field.Option value="option-11" title="Eleven" />
  <Field.Option value="option-12" title="Twelve" />
  <Field.Option value="option-13" title="Thirteen" />
  <Field.Option value="option-14" title="Fourteen" />
  <Field.Option value="option-15" title="Fifteen" />
  <Field.Option value="option-16" title="Sixteen" />
  <Field.Option value="option-17" title="Seventeen" />
  <Field.Option value="option-18" title="Eighteen" />
  <Field.Option value="option-19" title="Nineteen" />
  <Field.Option value="option-20" title="Twenty" />
  <Field.Option value="option-21" title="Twenty-one" />
  <Field.Option value="option-22" title="Twenty-two" />
  <Field.Option value="option-23" title="Twenty-three" />
  <Field.Option value="option-24" title="Twenty-four" />
  <Field.Option value="option-25" title="Twenty-five" />
</Field.Selection>
`}),x=()=>(0,s.jsx)(o,{stableName:`DropdownValidationRequired`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  value="foo"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onFocus={(value) => console.log('onFocus', value)}
  onBlur={(value) => console.log('onBlur', value)}
  required
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),S=()=>(0,s.jsx)(o,{stableName:`DropdownWithData`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  label="Label text"
  data={[
    {
      title: 'One',
      value: 'one',
    },
    {
      title: 'Two',
      value: 'two',
    },
  ]}
/>
`}),C=()=>(0,s.jsx)(o,{stableName:`DropdownWithAPath`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Field:r},children:`<Form.Handler
  data={{
    example: {
      list: [
        {
          title: 'One',
          value: 'one',
        },
        {
          title: 'Two',
          value: 'two',
        },
      ],
    },
    selection: 'two',
  }}
>
  <Field.Selection
    label="Label text"
    path="/selection"
    dataPath="/example/list"
  >
    <Field.Option value="foo">Fooo</Field.Option>
  </Field.Selection>
</Form.Handler>
`}),w=()=>(0,s.jsx)(o,{"data-visual-test":`selection-dropdown-groups`,stableName:`DropdownGroups`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  label="Label text"
  path="/selection"
  dataPath="/example/list"
  groups={['Foos', 'Bars']}
>
  <Field.Option value="foo" groupIndex={0}>
    Fooo
  </Field.Option>
  <Field.Option value="bar" groupIndex={1}>
    Bar
  </Field.Option>
</Field.Selection>
`}),T=()=>(0,s.jsx)(o,{stableName:`AutocompleteLabel`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="autocomplete"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),E=()=>(0,s.jsx)(o,{stableName:`AutocompleteValidationRequired`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="autocomplete"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onFocus={(value) => console.log('onFocus', value)}
  onBlur={(value) => console.log('onBlur', value)}
  required
  validateInitially
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),D=()=>(0,s.jsx)(o,{"data-visual-test":`selection-autocomplete-groups`,stableName:`AutocompleteGroups`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="autocomplete"
  label="Label text"
  path="/selection"
  dataPath="/example/list"
  groups={['Foos', 'Bars']}
>
  <Field.Option value="foo" groupIndex={0}>
    Fooo
  </Field.Option>
  <Field.Option value="bar" groupIndex={1}>
    Bar
  </Field.Option>
</Field.Selection>
`}),O=()=>(0,s.jsx)(o,{stableName:`RadioEmpty`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="radio"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),se=()=>(0,s.jsx)(o,{"data-visual-test":`selection-radio-options-vertical`,stableName:`RadioLabel`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="radio"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),k=()=>(0,s.jsx)(o,{"data-visual-test":`selection-radio-vertical`,stableName:`RadioOptionSelected`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),A=()=>(0,s.jsx)(o,{"data-visual-test":`selection-radio-horizontal`,stableName:`RadioHorizontalLayout`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  layout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),j=()=>(0,s.jsx)(o,{"data-visual-test":`selection-radio-options-horizontal`,stableName:`RadioHorizontalOptionsLayout`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  optionsLayout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),M=()=>(0,s.jsx)(o,{stableName:`RadioHorizontalLayoutAndHorizontalOptionsLayout`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  layout="horizontal"
  optionsLayout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),N=()=>(0,s.jsx)(o,{stableName:`RadioDisabled`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="radio"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),P=()=>(0,s.jsx)(o,{stableName:`RadioDisabledOptions`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},noInline:!0,children:`const Example = () => {
  return (
    <Field.Selection label="Label text" variant="radio">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
`}),F=()=>(0,s.jsx)(o,{stableName:`RadioError`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="radio"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),I=()=>(0,s.jsx)(o,{stableName:`RadioWithData`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="radio"
  label="Label text"
  data={[
    {
      title: 'One',
      value: 'one',
    },
    {
      title: 'Two',
      value: 'two',
    },
  ]}
/>
`}),L=()=>(0,s.jsx)(o,{stableName:`RadioWithAPath`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Field:r},children:`<Form.Handler
  data={{
    example: {
      list: [
        {
          title: 'One',
          value: 'one',
        },
        {
          title: 'Two',
          value: 'two',
        },
      ],
    },
    selection: 'two',
  }}
>
  <Field.Selection
    variant="radio"
    label="Label text"
    path="/selection"
    dataPath="/example/list"
  >
    <Field.Option value="foo">Fooo</Field.Option>
  </Field.Selection>
</Form.Handler>
`}),R=()=>(0,s.jsx)(o,{stableName:`RadioWithListComposition`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Field:r,List:ie,Value:te},children:`<Form.Handler
  defaultData={{
    selection: 'bar',
    myDataPath: [
      {
        value: 'foo',
        title: 'Foo!',
        amount: 1234,
      },
      {
        value: 'bar',
        title: 'Baar!',
        amount: 5678,
      },
      {
        value: 'baz',
        title: 'Baz!',
        amount: 9999,
      },
    ],
  }}
>
  <Field.Selection
    label="Select an option"
    variant="radio"
    path="/selection"
    dataPath="/myDataPath"
    width="large"
  >
    {({ value: selectedValue, options = [] }) => {
      return (
        <List.Container>
          {options.map(({ value, title, amount }) => {
            return (
              <List.Item.Basic
                key={value}
                selected={value === selectedValue}
              >
                <List.Cell.Start>
                  <Field.Option value={value} title={title} />
                </List.Cell.Start>
                <List.Cell.End>
                  <Value.Currency value={amount} />
                </List.Cell.End>
              </List.Item.Basic>
            )
          })}
        </List.Container>
      )
    }}
  </Field.Selection>
</Form.Handler>
`}),z=()=>(0,s.jsx)(o,{hideCode:!0,"data-visual-test":`selection-radio-nesting-logic`,stableName:`RadioNestingWithLogic`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:a,Field:r,Section:re},children:`<Form.Handler onSubmit={console.log}>
  <Form.Card>
    <Field.Selection
      variant="radio"
      label="Make a selection"
      path="/mySelection"
      required
    >
      <Field.Option value="nothing" title="Nothing" />
      <Field.Option value="showInput" title="Show an input" />
      <Form.Visibility
        visibleWhen={{
          path: '/mySelection',
          hasValue: 'showInput',
        }}
        animate
        compensateForGap="auto" // makes animation smooth
      >
        <Section variant="information" innerSpace>
          <Field.String placeholder="Enter some value" required />
        </Section>
      </Form.Visibility>
      <Field.Option
        value="showAdditionalOption"
        title="Show additional option"
      />
      <Form.Visibility
        visibleWhen={{
          path: '/mySelection',
          hasValue: (value) =>
            value === 'showAdditionalOption' || value === 'showMeMore',
        }}
        animate
        compensateForGap="auto" // makes animation smooth
      >
        <Field.Option
          value="showMeMore"
          title="Show even more"
          bottom="x-small"
        />
        <Form.Visibility
          animate
          visibleWhen={{
            path: '/mySelection',
            hasValue: 'showMeMore',
          }}
        >
          <Section variant="information" innerSpace>
            <Field.String placeholder="Enter more info" required />
          </Section>
        </Form.Visibility>
      </Form.Visibility>
    </Field.Selection>
  </Form.Card>

  <Form.SubmitButton />
</Form.Handler>
`}),B=()=>(0,s.jsx)(o,{hideCode:!0,"data-visual-test":`selection-radio-advanced-nesting-logic`,stableName:`RadioNestingAdvanced`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:a,Field:r},children:`<Form.Handler
  defaultData={{
    mySelection: 'first',
    firstSelection: 'first',
  }}
  onSubmit={console.log}
>
  <Form.Card>
    <Field.Selection path="/mySelection" variant="radio">
      <Field.Option value="first" title="First" />
      <Form.Visibility
        visibleWhen={{
          path: '/mySelection',
          hasValue: 'first',
        }}
        animate
        compensateForGap="auto" // makes animation smooth
      >
        <Form.Card top bottom>
          <Field.Number
            path="/firstNumber"
            label="First number"
            value={1}
            allowNegative={false}
            required
            exclusiveMinimum={900}
            exclusiveMaximum={1000}
          />
          <Field.String
            path="/firstString"
            label="First String"
            value="foo"
            pattern="bar"
            minLength={4}
          />
          <Field.Boolean
            path="/firstBoolean"
            label="First boolean"
            variant="checkbox"
            required
          />
          <Field.Selection
            path="/firstSelection"
            variant="radio"
            required
            label="First selection"
          >
            <Field.Option value="first" title="First nested" />
            <Form.Visibility
              visibleWhen={{
                path: '/firstSelection',
                hasValue: 'first',
              }}
              animate
              compensateForGap="auto" // makes animation smooth
            >
              <Form.Card top bottom>
                <Field.Number
                  path="/firstNestedNumber"
                  label="First nested number"
                  required
                />
              </Form.Card>
            </Form.Visibility>
            <Field.Option value="second" title="Second nested" />
          </Field.Selection>
        </Form.Card>
      </Form.Visibility>

      <Field.Option value="second" title="Second" />
      <Field.Option value="third" title="Third" />
    </Field.Selection>
  </Form.Card>

  <Form.SubmitButton />
</Form.Handler>
`}),V=()=>(0,s.jsx)(o,{stableName:`ButtonEmpty`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="button"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),H=()=>(0,s.jsx)(o,{"data-visual-test":`selection-button-options-vertical`,stableName:`ButtonLabel`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),U=()=>(0,s.jsx)(o,{"data-visual-test":`selection-button-options-horizontal`,stableName:`ButtonHorizontalOptionsLayout`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="button"
  label="Label text"
  optionsLayout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),W=()=>(0,s.jsx)(o,{"data-visual-test":`selection-button-vertical`,stableName:`ButtonOptionSelected`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="button"
  label="Label text"
  value="bar"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),G=()=>(0,s.jsx)(o,{stableName:`ButtonDisabled`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="button"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),K=()=>(0,s.jsx)(o,{stableName:`ButtonDisabledOptions`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},noInline:!0,children:`const Example = () => {
  return (
    <Field.Selection label="Label text" variant="button">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
`}),q=()=>(0,s.jsx)(o,{stableName:`ButtonError`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="button"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),J=()=>(0,s.jsx)(o,{stableName:`ButtonWithData`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection
  variant="button"
  label="Label text"
  data={[
    {
      title: 'One',
      value: 'one',
    },
    {
      title: 'Two',
      value: 'two',
    },
  ]}
/>
`}),Y=()=>(0,s.jsx)(o,{stableName:`ButtonWithAPath`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Field:r},children:`<Form.Handler
  data={{
    example: {
      list: [
        {
          title: 'One',
          value: 'one',
        },
        {
          title: 'Two',
          value: 'two',
        },
      ],
    },
    selection: 'two',
  }}
>
  <Field.Selection
    variant="button"
    label="Label text"
    path="/selection"
    dataPath="/example/list"
  >
    <Field.Option value="foo">Fooo</Field.Option>
  </Field.Selection>
</Form.Handler>
`}),X=()=>(0,s.jsx)(o,{"data-visual-test":`selection-button-nesting-logic`,stableName:`ButtonNestingWithLogic`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:a,Field:r,Section:re},children:`<Form.Handler>
  <Form.Card>
    <Field.Selection
      variant="button"
      label="Make a selection"
      path="/mySelection"
    >
      <Field.Option value="nothing" title="Nothing" />

      <Field.Option value="showInput" title="Show an input" />
      <Form.Visibility
        animate
        visibleWhen={{
          path: '/mySelection',
          hasValue: 'showInput',
        }}
      >
        <Section variant="information" innerSpace>
          <Field.String placeholder="Enter some value" />
        </Section>
      </Form.Visibility>

      <Field.Option
        value="showAdditionalOption"
        title="Show additional option"
      />
      <Form.Visibility
        animate
        visibleWhen={{
          path: '/mySelection',
          hasValue: (value) =>
            value === 'showAdditionalOption' || value === 'showMeMore',
        }}
      >
        <Field.Option
          value="showMeMore"
          title="Show even more"
          bottom="x-small"
        />
        <Form.Visibility
          animate
          visibleWhen={{
            path: '/mySelection',
            hasValue: 'showMeMore',
          }}
        >
          <Section variant="information" innerSpace>
            <Field.String placeholder="Enter more info" />
          </Section>
        </Form.Visibility>
      </Form.Visibility>
    </Field.Selection>
  </Form.Card>
</Form.Handler>
`}),Z=()=>(0,s.jsx)(o,{"data-visual-test":`selection-dropdown-error-message`,stableName:`SelectionErrorMessage`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection label="Label" error="This is what is wrong...">
  <Field.Option value="foo">Foo</Field.Option>
  <Field.Option value="bar">Bar</Field.Option>
</Field.Selection>
`}),ce=()=>(0,s.jsx)(o,{"data-visual-test":`selection-dropdown-info-message`,stableName:`SelectionInfoMessage`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection label="Label" info="Useful information (?)">
  <Field.Option value="foo">Foo</Field.Option>
  <Field.Option value="bar">Bar</Field.Option>
</Field.Selection>
`}),Q=()=>(0,s.jsx)(o,{"data-visual-test":`selection-dropdown-warning-message`,stableName:`SelectionWarningMessage`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Selection label="Label" warning="I'm warning you...">
  <Field.Option value="foo">Foo</Field.Option>
  <Field.Option value="bar">Bar</Field.Option>
</Field.Selection>
`});function le(e){let t={a:`a`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,p:`p`,...ae(),...e.components},{VisibleWhenVisualTest:n}=t;return oe||$(`Examples`,!1),D||$(`Examples.AutocompleteGroups`,!0),T||$(`Examples.AutocompleteLabel`,!0),E||$(`Examples.AutocompleteValidationRequired`,!0),G||$(`Examples.ButtonDisabled`,!0),K||$(`Examples.ButtonDisabledOptions`,!0),V||$(`Examples.ButtonEmpty`,!0),q||$(`Examples.ButtonError`,!0),U||$(`Examples.ButtonHorizontalOptionsLayout`,!0),H||$(`Examples.ButtonLabel`,!0),X||$(`Examples.ButtonNestingWithLogic`,!0),W||$(`Examples.ButtonOptionSelected`,!0),Y||$(`Examples.ButtonWithAPath`,!0),J||$(`Examples.ButtonWithData`,!0),g||$(`Examples.DropdownDisabled`,!0),_||$(`Examples.DropdownDisabledOptions`,!0),y||$(`Examples.DropdownDynamicOptions`,!0),c||$(`Examples.DropdownEmpty`,!0),v||$(`Examples.DropdownError`,!0),w||$(`Examples.DropdownGroups`,!0),b||$(`Examples.DropdownHighNumberOfOptions`,!0),u||$(`Examples.DropdownLabel`,!0),f||$(`Examples.DropdownLabelAndOptionSelected`,!0),l||$(`Examples.DropdownPlaceholder`,!0),d||$(`Examples.DropdownTransformSelection`,!0),x||$(`Examples.DropdownValidationRequired`,!0),h||$(`Examples.DropdownWidths`,!0),C||$(`Examples.DropdownWithAPath`,!0),S||$(`Examples.DropdownWithData`,!0),m||$(`Examples.HorizontalLayout`,!0),N||$(`Examples.RadioDisabled`,!0),P||$(`Examples.RadioDisabledOptions`,!0),O||$(`Examples.RadioEmpty`,!0),F||$(`Examples.RadioError`,!0),A||$(`Examples.RadioHorizontalLayout`,!0),M||$(`Examples.RadioHorizontalLayoutAndHorizontalOptionsLayout`,!0),j||$(`Examples.RadioHorizontalOptionsLayout`,!0),se||$(`Examples.RadioLabel`,!0),B||$(`Examples.RadioNestingAdvanced`,!0),z||$(`Examples.RadioNestingWithLogic`,!0),k||$(`Examples.RadioOptionSelected`,!0),L||$(`Examples.RadioWithAPath`,!0),I||$(`Examples.RadioWithData`,!0),R||$(`Examples.RadioWithListComposition`,!0),Z||$(`Examples.SelectionErrorMessage`,!0),ce||$(`Examples.SelectionInfoMessage`,!0),Q||$(`Examples.SelectionWarningMessage`,!0),p||$(`Examples.WithHelp`,!0),n||$(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Variants summary`}),`
`,(0,s.jsx)(t.p,{children:`As there are many variants, they are split into separate sections. Here is a summary of the variants:`}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h4,{children:`Autocomplete`}),`
`,(0,s.jsx)(T,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio buttons`}),`
`,(0,s.jsx)(se,{}),`
`,(0,s.jsx)(t.h4,{children:`Toggle buttons`}),`
`,(0,s.jsx)(H,{}),`
`,(0,s.jsx)(t.hr,{}),`
`,(0,s.jsx)(t.h3,{children:`Dropdown variant (default)`}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown empty`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown placeholder`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown with a transformed selection text`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown label and option selected`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown with help`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Horizontal layout`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown disabled`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown option disabled`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown error`}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown dynamic options`}),`
`,(0,s.jsx)(y,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown high number of options`}),`
`,(0,s.jsx)(b,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown validation - Required`}),`
`,(0,s.jsx)(x,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown button with a path to populate the data`}),`
`,(0,s.jsx)(C,{}),`
`,(0,s.jsx)(t.h4,{children:`Dropdown with the data property`}),`
`,(0,s.jsx)(S,{}),`
`,(0,s.jsx)(t.h3,{children:`Dropdown widths`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Dropdown groups`}),`
`,(0,s.jsx)(w,{}),`
`,(0,s.jsx)(t.hr,{}),`
`,(0,s.jsx)(t.h3,{children:`Autocomplete variant`}),`
`,(0,s.jsx)(E,{}),`
`,(0,s.jsx)(t.h3,{children:`Autocomplete groups`}),`
`,(0,s.jsx)(D,{}),`
`,(0,s.jsx)(t.hr,{}),`
`,(0,s.jsx)(t.h3,{children:`Radio variant`}),`
`,(0,s.jsx)(t.h4,{children:`Radio empty`}),`
`,(0,s.jsx)(O,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio option selected`}),`
`,(0,s.jsx)(k,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio horizontal layout`}),`
`,(0,s.jsx)(A,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio horizontal options-layout`}),`
`,(0,s.jsx)(j,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio horizontal layout and horizontal options-layout`}),`
`,(0,s.jsx)(M,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio disabled`}),`
`,(0,s.jsx)(N,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio option disabled`}),`
`,(0,s.jsx)(P,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio error`}),`
`,(0,s.jsx)(F,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio button with a path to populate the data`}),`
`,(0,s.jsx)(L,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio with the data property`}),`
`,(0,s.jsx)(I,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio with List composition`}),`
`,(0,s.jsxs)(t.p,{children:[`Use render prop children to compose each option with `,(0,s.jsx)(t.a,{href:`/uilib/components/list`,children:`List`}),` and set selected state from the current field value.`]}),`
`,(0,s.jsx)(R,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio nesting other fields with logic`}),`
`,(0,s.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,s.jsx)(z,{}),`
`,(0,s.jsx)(t.h4,{children:`Radio nesting advanced`}),`
`,(0,s.jsx)(B,{}),`
`,(0,s.jsx)(t.hr,{}),`
`,(0,s.jsx)(t.h3,{children:`Buttons variant`}),`
`,(0,s.jsx)(t.h4,{children:`ToggleButton empty`}),`
`,(0,s.jsx)(V,{}),`
`,(0,s.jsx)(t.h4,{children:`ToggleButton option selected`}),`
`,(0,s.jsx)(W,{}),`
`,(0,s.jsx)(t.h4,{children:`ToggleButton horizontal options-layout`}),`
`,(0,s.jsx)(U,{}),`
`,(0,s.jsx)(t.h4,{children:`ToggleButton disabled`}),`
`,(0,s.jsx)(G,{}),`
`,(0,s.jsx)(t.h4,{children:`ToggleButton option disabled`}),`
`,(0,s.jsx)(K,{}),`
`,(0,s.jsx)(t.h4,{children:`ToggleButton error`}),`
`,(0,s.jsx)(q,{}),`
`,(0,s.jsx)(t.h4,{children:`ToggleButton nesting other fields with logic`}),`
`,(0,s.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,s.jsx)(X,{}),`
`,(0,s.jsx)(t.h4,{children:`ToggleButton with a path to populate the data`}),`
`,(0,s.jsx)(Y,{}),`
`,(0,s.jsx)(t.h4,{children:`ToggleButton with the data property`}),`
`,(0,s.jsx)(J,{}),`
`,(0,s.jsxs)(n,{children:[(0,s.jsx)(Z,{}),(0,s.jsx)(ce,{}),(0,s.jsx)(Q,{})]})]})}function ue(e={}){let{wrapper:t}={...ae(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(le,{...e})}):le(e)}function $(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{ue as default};
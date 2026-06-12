import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Section-BV74bciL.js";import{c as i}from"./ToggleButton-T4E3Coih.js";import{t as a}from"./Card-Dsou21Li.js";import{t as o}from"./ListExport-2kiUgtRC.js";import{t as s}from"./Form-B9l6EvGx.js";import{t as c}from"./Field-DHicZJEj.js";import{t as l}from"./Value-whMgauSk.js";import{K as u}from"./index-CsG353ar.js";import{t as d}from"./ComponentBox-Cb1rLw_D.js";var f=e({ButtonDisabled:()=>R,ButtonDisabledOptions:()=>z,ButtonEmpty:()=>A,ButtonError:()=>H,ButtonHorizontalLayout:()=>F,ButtonHorizontalLayoutAndHorizontalOptionsLayout:()=>L,ButtonHorizontalOptionsLayout:()=>I,ButtonInfo:()=>B,ButtonLabel:()=>N,ButtonNestingWithLogic:()=>W,ButtonOptionSelected:()=>P,ButtonWarning:()=>V,ButtonWithData:()=>K,ButtonWithDataPath:()=>G,ButtonWithHelp:()=>U,CheckboxButtonEmpty:()=>j,CheckboxButtonHorizontalOptionsLayout:()=>M,CheckboxDisabled:()=>b,CheckboxDisabledOptions:()=>x,CheckboxEmpty:()=>m,CheckboxError:()=>w,CheckboxHorizontalLayout:()=>_,CheckboxHorizontalLayoutAndHorizontalOptionsLayout:()=>y,CheckboxHorizontalOptionsLayout:()=>v,CheckboxInfo:()=>S,CheckboxLabel:()=>h,CheckboxNestingWithLogic:()=>E,CheckboxOptionSelected:()=>g,CheckboxWarning:()=>C,CheckboxWithData:()=>O,CheckboxWithDataPath:()=>D,CheckboxWithHelp:()=>T,CheckboxWithListComposition:()=>k}),p=t(n()),m=()=>(0,p.jsx)(d,{stableName:`CheckboxEmpty`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  onFocus={(value) => console.log('onFocus', value)}
  onBlur={(value) => console.log('onBlur', value)}
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),h=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-checkbox-options-vertical`,stableName:`CheckboxLabel`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),g=()=>(0,p.jsx)(d,{stableName:`CheckboxOptionSelected`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  value={['bar']}
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),_=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-checkbox-horizontal-layout`,stableName:`CheckboxHorizontalLayout`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Label text"
  value={['bar']}
  layout="horizontal"
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),v=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-checkbox-options-horizontal`,stableName:`CheckboxHorizontalOptionsLayout`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Label text"
  value={['bar']}
  optionsLayout="horizontal"
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),y=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-checkbox-horizontal`,stableName:`CheckboxHorizontalLayoutAndHorizontalOptionsLayout`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Label text"
  value={['bar']}
  layout="horizontal"
  optionsLayout="horizontal"
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),b=()=>(0,p.jsx)(d,{stableName:`CheckboxDisabled`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  value={['bar']}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),x=()=>(0,p.jsx)(d,{stableName:`CheckboxDisabledOptions`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  value={['foo']}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" disabled />
  <Field.Option value="baz" title="Bazz!" disabled />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),S=()=>(0,p.jsx)(d,{stableName:`CheckboxInfo`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  info="FYI"
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),C=()=>(0,p.jsx)(d,{stableName:`CheckboxWarning`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  warning="I'm warning you..."
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),w=()=>(0,p.jsx)(d,{stableName:`CheckboxError`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),T=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-checkbox-help`,stableName:`CheckboxWithHelp`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Label text"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.ArraySelection>
`}),E=()=>(0,p.jsx)(d,{hideCode:!0,"data-visual-test":`array-selection-checkbox-nesting-logic`,stableName:`CheckboxNestingWithLogic`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:i,Card:a,Field:c,Section:r},children:`<Form.Handler onSubmit={console.log}>
  <Flex.Stack>
    <Form.Card>
      <Field.ArraySelection
        label="Make a selection"
        path="/mySelection"
        required
      >
        <Field.Option value="nothing" title="Nothing" />

        <Field.Option value="showInput" title="Show an input" />
        <Form.Visibility
          visibleWhen={{
            path: '/mySelection',
            hasValue: (value) => {
              return Array.isArray(value)
                ? value.includes('showInput')
                : false
            },
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
            hasValue: (value) => {
              return Array.isArray(value)
                ? value.includes('showAdditionalOption')
                : false
            },
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
              hasValue: (value) => {
                return Array.isArray(value)
                  ? value.includes('showMeMore')
                  : false
              },
            }}
          >
            <Section variant="information" innerSpace>
              <Field.String placeholder="Enter more info" required />
            </Section>
          </Form.Visibility>
        </Form.Visibility>
      </Field.ArraySelection>
    </Form.Card>

    <Form.SubmitButton />
  </Flex.Stack>
</Form.Handler>
`}),D=()=>(0,p.jsx)(d,{stableName:`CheckboxWithDataPath`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Field:c},children:`<Form.Handler
  data={{
    myDataPath: [
      {
        title: 'Foo!',
        value: 'foo',
      },
      {
        title: 'Bar!',
        value: 'bar',
      },
      {
        title: 'Baz!',
        value: 'baz',
      },
    ],
  }}
>
  <Field.ArraySelection
    label="Populated by dataPath"
    dataPath="/myDataPath"
  />
</Form.Handler>
`}),O=()=>(0,p.jsx)(d,{stableName:`CheckboxWithData`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Populated by data"
  data={[
    {
      title: 'Foo!',
      value: 'foo',
    },
    {
      title: 'Bar!',
      value: 'bar',
    },
    {
      title: 'Baz!',
      value: 'baz',
    },
  ]}
/>
`}),k=()=>(0,p.jsx)(d,{stableName:`CheckboxWithListComposition`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Field:c,List:o,Value:l},children:`<Form.Handler
  defaultData={{
    selection: ['bar'],
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
  <Field.ArraySelection
    label="Select one or more options"
    variant="checkbox"
    path="/selection"
    dataPath="/myDataPath"
    width="large"
  >
    {({ value = [], options }) => {
      return (
        <List.Container>
          {options.map(({ value: optionValue, title, amount }) => {
            return (
              <List.Item.Basic
                key={optionValue}
                selected={value.includes(optionValue)}
              >
                <List.Cell.Start>
                  <Field.Option
                    key={optionValue}
                    value={optionValue}
                    title={title}
                  />
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
  </Field.ArraySelection>
</Form.Handler>
`}),A=()=>(0,p.jsx)(d,{stableName:`ButtonEmpty`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),j=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-checkbox-button`,stableName:`CheckboxButtonEmpty`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="checkbox-button"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),M=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-checkbox-button-options-horizontal`,stableName:`CheckboxButtonHorizontalOptionsLayout`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  label="Label text"
  value={['bar']}
  variant="checkbox-button"
  optionsLayout="horizontal"
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
  <Field.Option value="quux" title="Quuux!" />
  <Field.Option value="quuz" title="Quuuuz!" />
  <Field.Option value="corge" title="Corge!" />
</Field.ArraySelection>
`}),N=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-button-options-vertical`,stableName:`ButtonLabel`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),P=()=>(0,p.jsx)(d,{stableName:`ButtonOptionSelected`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  value={['bar']}
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),F=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-button-horizontal-layout`,stableName:`ButtonHorizontalLayout`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  value={['bar']}
  layout="horizontal"
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),I=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-button-horizontal`,stableName:`ButtonHorizontalOptionsLayout`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  value={['bar']}
  optionsLayout="horizontal"
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),L=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-button-options-horizontal`,stableName:`ButtonHorizontalLayoutAndHorizontalOptionsLayout`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  value={['bar']}
  layout="horizontal"
  optionsLayout="horizontal"
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),R=()=>(0,p.jsx)(d,{stableName:`ButtonDisabled`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  value={['bar']}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),z=()=>(0,p.jsx)(d,{stableName:`ButtonDisabledOptions`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  value={['foo']}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" disabled />
  <Field.Option value="baz" title="Bazz!" disabled />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),B=()=>(0,p.jsx)(d,{stableName:`ButtonInfo`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  info="FYI"
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),V=()=>(0,p.jsx)(d,{stableName:`ButtonWarning`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  warning="I'm warning you..."
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),H=()=>(0,p.jsx)(d,{stableName:`ButtonError`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),U=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-button-help`,stableName:`ButtonWithHelp`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.ArraySelection>
`}),W=()=>(0,p.jsx)(d,{"data-visual-test":`array-selection-button-nesting-logic`,stableName:`ButtonNestingWithLogic`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Card:a,Field:c,Section:r},children:`<Form.Handler>
  <Form.Card>
    <Field.ArraySelection
      variant="button"
      label="Make a selection"
      path="/mySelection"
    >
      <Field.Option value="nothing" title="Nothing" />

      <Field.Option value="showInput" title="Show an input" />
      <Form.Visibility
        visibleWhen={{
          path: '/mySelection',
          hasValue: (value) => {
            return Array.isArray(value)
              ? value.includes('showInput')
              : false
          },
        }}
        animate
        compensateForGap="auto" // makes animation smooth
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
        visibleWhen={{
          path: '/mySelection',
          hasValue: (value) => {
            return Array.isArray(value)
              ? value.includes('showAdditionalOption')
              : false
          },
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
            hasValue: (value) => {
              return Array.isArray(value)
                ? value.includes('showMeMore')
                : false
            },
          }}
        >
          <Section variant="information" innerSpace>
            <Field.String placeholder="Enter more info" />
          </Section>
        </Form.Visibility>
      </Form.Visibility>
    </Field.ArraySelection>
  </Form.Card>
</Form.Handler>
`}),G=()=>(0,p.jsx)(d,{stableName:`ButtonWithDataPath`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Field:c},children:`<Form.Handler
  data={{
    myDataPath: [
      {
        title: 'Foo!',
        value: 'foo',
      },
      {
        title: 'Bar!',
        value: 'bar',
      },
      {
        title: 'Baz!',
        value: 'baz',
      },
    ],
  }}
>
  <Field.ArraySelection
    variant="button"
    label="Populated by dataPath"
    dataPath="/myDataPath"
  />
</Form.Handler>
`}),K=()=>(0,p.jsx)(d,{stableName:`ButtonWithData`,sourceImports:[`import { Flex, List, Section } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:c},children:`<Field.ArraySelection
  variant="button"
  label="Populated by data"
  data={[
    {
      title: 'Foo!',
      value: 'foo',
    },
    {
      title: 'Bar!',
      value: 'bar',
    },
    {
      title: 'Baz!',
      value: 'baz',
    },
  ]}
/>
`});function q(e){let t={a:`a`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,p:`p`,...u(),...e.components};return f||Y(`Examples`,!1),R||Y(`Examples.ButtonDisabled`,!0),z||Y(`Examples.ButtonDisabledOptions`,!0),A||Y(`Examples.ButtonEmpty`,!0),H||Y(`Examples.ButtonError`,!0),F||Y(`Examples.ButtonHorizontalLayout`,!0),L||Y(`Examples.ButtonHorizontalLayoutAndHorizontalOptionsLayout`,!0),I||Y(`Examples.ButtonHorizontalOptionsLayout`,!0),B||Y(`Examples.ButtonInfo`,!0),N||Y(`Examples.ButtonLabel`,!0),W||Y(`Examples.ButtonNestingWithLogic`,!0),P||Y(`Examples.ButtonOptionSelected`,!0),V||Y(`Examples.ButtonWarning`,!0),K||Y(`Examples.ButtonWithData`,!0),G||Y(`Examples.ButtonWithDataPath`,!0),U||Y(`Examples.ButtonWithHelp`,!0),j||Y(`Examples.CheckboxButtonEmpty`,!0),M||Y(`Examples.CheckboxButtonHorizontalOptionsLayout`,!0),b||Y(`Examples.CheckboxDisabled`,!0),x||Y(`Examples.CheckboxDisabledOptions`,!0),m||Y(`Examples.CheckboxEmpty`,!0),w||Y(`Examples.CheckboxError`,!0),_||Y(`Examples.CheckboxHorizontalLayout`,!0),y||Y(`Examples.CheckboxHorizontalLayoutAndHorizontalOptionsLayout`,!0),v||Y(`Examples.CheckboxHorizontalOptionsLayout`,!0),S||Y(`Examples.CheckboxInfo`,!0),h||Y(`Examples.CheckboxLabel`,!0),E||Y(`Examples.CheckboxNestingWithLogic`,!0),g||Y(`Examples.CheckboxOptionSelected`,!0),C||Y(`Examples.CheckboxWarning`,!0),O||Y(`Examples.CheckboxWithData`,!0),D||Y(`Examples.CheckboxWithDataPath`,!0),T||Y(`Examples.CheckboxWithHelp`,!0),k||Y(`Examples.CheckboxWithListComposition`,!0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.h2,{children:`Demos`}),`
`,(0,p.jsx)(t.h3,{children:`Checkbox variant (default)`}),`
`,(0,p.jsx)(m,{}),`
`,(0,p.jsx)(t.h3,{children:`Button variant`}),`
`,(0,p.jsx)(A,{}),`
`,(0,p.jsx)(t.h3,{children:`Button with checkbox variant`}),`
`,(0,p.jsx)(j,{}),`
`,(0,p.jsx)(t.hr,{}),`
`,(0,p.jsx)(t.h3,{children:`Checkbox variant demos`}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox label`}),`
`,(0,p.jsx)(h,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox option selected`}),`
`,(0,p.jsx)(g,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox horizontal layout`}),`
`,(0,p.jsx)(_,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox horizontal options-layout`}),`
`,(0,p.jsx)(v,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox horizontal layout and horizontal options-layout`}),`
`,(0,p.jsx)(y,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox with help`}),`
`,(0,p.jsx)(T,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox disabled`}),`
`,(0,p.jsx)(b,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox disabled options`}),`
`,(0,p.jsx)(x,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox info`}),`
`,(0,p.jsx)(S,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox warning`}),`
`,(0,p.jsx)(C,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox error`}),`
`,(0,p.jsx)(w,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox with nested fields and logic`}),`
`,(0,p.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,p.jsx)(E,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox with a path to populate the data`}),`
`,(0,p.jsx)(D,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox with the data property`}),`
`,(0,p.jsx)(O,{}),`
`,(0,p.jsx)(t.h4,{children:`Checkbox with List composition`}),`
`,(0,p.jsxs)(t.p,{children:[`Use render prop children to compose each option with `,(0,p.jsx)(t.a,{href:`/uilib/components/list`,children:`List`}),` and set selected state from the current field values.`]}),`
`,(0,p.jsx)(k,{}),`
`,(0,p.jsx)(t.hr,{}),`
`,(0,p.jsx)(t.h3,{children:`Button variant demos`}),`
`,(0,p.jsx)(t.h4,{children:`Button Label`}),`
`,(0,p.jsx)(N,{}),`
`,(0,p.jsx)(t.h4,{children:`Button option selected`}),`
`,(0,p.jsx)(P,{}),`
`,(0,p.jsx)(t.h4,{children:`Button horizontal layout`}),`
`,(0,p.jsx)(F,{}),`
`,(0,p.jsx)(t.h4,{children:`Button horizontal options-layout`}),`
`,(0,p.jsx)(I,{}),`
`,(0,p.jsx)(t.h4,{children:`Button horizontal layout and horizontal options-layout`}),`
`,(0,p.jsx)(L,{}),`
`,(0,p.jsx)(t.h4,{children:`Button with help`}),`
`,(0,p.jsx)(U,{}),`
`,(0,p.jsx)(t.h4,{children:`Button disabled`}),`
`,(0,p.jsx)(R,{}),`
`,(0,p.jsx)(t.h4,{children:`Button disabled options`}),`
`,(0,p.jsx)(z,{}),`
`,(0,p.jsx)(t.h4,{children:`Button info`}),`
`,(0,p.jsx)(B,{}),`
`,(0,p.jsx)(t.h4,{children:`Button warning`}),`
`,(0,p.jsx)(V,{}),`
`,(0,p.jsx)(t.h4,{children:`Button error`}),`
`,(0,p.jsx)(H,{}),`
`,(0,p.jsx)(t.h4,{children:`Button with a path to populate the data`}),`
`,(0,p.jsx)(G,{}),`
`,(0,p.jsx)(t.h4,{children:`Button with the data property`}),`
`,(0,p.jsx)(K,{}),`
`,(0,p.jsx)(t.h4,{children:`Button with nested fields and logic`}),`
`,(0,p.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,p.jsx)(W,{}),`
`,(0,p.jsx)(t.h4,{children:`Button with checkbox variant`}),`
`,(0,p.jsx)(M,{})]})}function J(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(q,{...e})}):q(e)}function Y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{J as default};
import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({ButtonDisabled:()=>A,ButtonDisabledOptions:()=>j,ButtonEmpty:()=>S,ButtonError:()=>P,ButtonHorizontalLayout:()=>D,ButtonHorizontalLayoutAndHorizontalOptionsLayout:()=>k,ButtonHorizontalOptionsLayout:()=>O,ButtonInfo:()=>M,ButtonLabel:()=>T,ButtonNestingWithLogic:()=>I,ButtonOptionSelected:()=>E,ButtonWarning:()=>N,ButtonWithData:()=>R,ButtonWithDataPath:()=>L,ButtonWithHelp:()=>F,CheckboxButtonEmpty:()=>C,CheckboxButtonHorizontalOptionsLayout:()=>w,CheckboxDisabled:()=>f,CheckboxDisabledOptions:()=>p,CheckboxEmpty:()=>o,CheckboxError:()=>g,CheckboxHorizontalLayout:()=>l,CheckboxHorizontalLayoutAndHorizontalOptionsLayout:()=>d,CheckboxHorizontalOptionsLayout:()=>u,CheckboxInfo:()=>m,CheckboxLabel:()=>s,CheckboxNestingWithLogic:()=>v,CheckboxOptionSelected:()=>c,CheckboxWarning:()=>h,CheckboxWithData:()=>b,CheckboxWithDataPath:()=>y,CheckboxWithHelp:()=>_,CheckboxWithListComposition:()=>x}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
  onFocus={(value) => console.log('onFocus', value)}
  onBlur={(value) => console.log('onBlur', value)}
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-checkbox-options-vertical`,children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
  value={['bar']}
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-checkbox-horizontal-layout`,children:`<Field.ArraySelection
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
`}),u=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-checkbox-options-horizontal`,children:`<Field.ArraySelection
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
`}),d=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-checkbox-horizontal`,children:`<Field.ArraySelection
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
`}),f=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
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
`}),p=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
  value={['foo']}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" disabled />
  <Field.Option value="baz" title="Bazz!" disabled />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),m=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  info="FYI"
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),h=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  warning="I'm warning you..."
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),g=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),_=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-checkbox-help`,children:`<Field.ArraySelection
  label="Label text"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.ArraySelection>
`}),v=()=>(0,a.jsx)(n,{hideCode:!0,"data-visual-test":`array-selection-checkbox-nesting-logic`,children:`<Form.Handler onSubmit={console.log}>
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
`}),y=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`}),b=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
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
`}),x=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`}),S=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
  variant="button"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),C=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-checkbox-button`,children:`<Field.ArraySelection
  variant="checkbox-button"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),w=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-checkbox-button-options-horizontal`,children:`<Field.ArraySelection
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
`}),T=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-button-options-vertical`,children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),E=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
  variant="button"
  value={['bar']}
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),D=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-button-horizontal-layout`,children:`<Field.ArraySelection
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
`}),O=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-button-horizontal`,children:`<Field.ArraySelection
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
`}),k=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-button-options-horizontal`,children:`<Field.ArraySelection
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
`}),A=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
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
`}),j=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
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
`}),M=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
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
`}),N=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
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
`}),P=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
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
`}),F=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-button-help`,children:`<Field.ArraySelection
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
`}),I=()=>(0,a.jsx)(n,{"data-visual-test":`array-selection-button-nesting-logic`,children:`<Form.Handler>
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
`}),L=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`}),R=()=>(0,a.jsx)(n,{children:`<Field.ArraySelection
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
`});function z(e){let t={a:`a`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,p:`p`,...r(),...e.components};return i||V(`Examples`,!1),A||V(`Examples.ButtonDisabled`,!0),j||V(`Examples.ButtonDisabledOptions`,!0),S||V(`Examples.ButtonEmpty`,!0),P||V(`Examples.ButtonError`,!0),D||V(`Examples.ButtonHorizontalLayout`,!0),k||V(`Examples.ButtonHorizontalLayoutAndHorizontalOptionsLayout`,!0),O||V(`Examples.ButtonHorizontalOptionsLayout`,!0),M||V(`Examples.ButtonInfo`,!0),T||V(`Examples.ButtonLabel`,!0),I||V(`Examples.ButtonNestingWithLogic`,!0),E||V(`Examples.ButtonOptionSelected`,!0),N||V(`Examples.ButtonWarning`,!0),R||V(`Examples.ButtonWithData`,!0),L||V(`Examples.ButtonWithDataPath`,!0),F||V(`Examples.ButtonWithHelp`,!0),C||V(`Examples.CheckboxButtonEmpty`,!0),w||V(`Examples.CheckboxButtonHorizontalOptionsLayout`,!0),f||V(`Examples.CheckboxDisabled`,!0),p||V(`Examples.CheckboxDisabledOptions`,!0),o||V(`Examples.CheckboxEmpty`,!0),g||V(`Examples.CheckboxError`,!0),l||V(`Examples.CheckboxHorizontalLayout`,!0),d||V(`Examples.CheckboxHorizontalLayoutAndHorizontalOptionsLayout`,!0),u||V(`Examples.CheckboxHorizontalOptionsLayout`,!0),m||V(`Examples.CheckboxInfo`,!0),s||V(`Examples.CheckboxLabel`,!0),v||V(`Examples.CheckboxNestingWithLogic`,!0),c||V(`Examples.CheckboxOptionSelected`,!0),h||V(`Examples.CheckboxWarning`,!0),b||V(`Examples.CheckboxWithData`,!0),y||V(`Examples.CheckboxWithDataPath`,!0),_||V(`Examples.CheckboxWithHelp`,!0),x||V(`Examples.CheckboxWithListComposition`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Checkbox variant (default)`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Button variant`}),`
`,(0,a.jsx)(S,{}),`
`,(0,a.jsx)(t.h3,{children:`Button with checkbox variant`}),`
`,(0,a.jsx)(C,{}),`
`,(0,a.jsx)(t.hr,{}),`
`,(0,a.jsx)(t.h3,{children:`Checkbox variant demos`}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox label`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox option selected`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox horizontal layout`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox horizontal options-layout`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox horizontal layout and horizontal options-layout`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox with help`}),`
`,(0,a.jsx)(_,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox disabled`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox disabled options`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox info`}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox warning`}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox error`}),`
`,(0,a.jsx)(g,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox with nested fields and logic`}),`
`,(0,a.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,a.jsx)(v,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox with a path to populate the data`}),`
`,(0,a.jsx)(y,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox with the data property`}),`
`,(0,a.jsx)(b,{}),`
`,(0,a.jsx)(t.h4,{children:`Checkbox with List composition`}),`
`,(0,a.jsxs)(t.p,{children:[`Use render prop children to compose each option with `,(0,a.jsx)(t.a,{href:`/uilib/components/list`,children:`List`}),` and set selected state from the current field values.`]}),`
`,(0,a.jsx)(x,{}),`
`,(0,a.jsx)(t.hr,{}),`
`,(0,a.jsx)(t.h3,{children:`Button variant demos`}),`
`,(0,a.jsx)(t.h4,{children:`Button Label`}),`
`,(0,a.jsx)(T,{}),`
`,(0,a.jsx)(t.h4,{children:`Button option selected`}),`
`,(0,a.jsx)(E,{}),`
`,(0,a.jsx)(t.h4,{children:`Button horizontal layout`}),`
`,(0,a.jsx)(D,{}),`
`,(0,a.jsx)(t.h4,{children:`Button horizontal options-layout`}),`
`,(0,a.jsx)(O,{}),`
`,(0,a.jsx)(t.h4,{children:`Button horizontal layout and horizontal options-layout`}),`
`,(0,a.jsx)(k,{}),`
`,(0,a.jsx)(t.h4,{children:`Button with help`}),`
`,(0,a.jsx)(F,{}),`
`,(0,a.jsx)(t.h4,{children:`Button disabled`}),`
`,(0,a.jsx)(A,{}),`
`,(0,a.jsx)(t.h4,{children:`Button disabled options`}),`
`,(0,a.jsx)(j,{}),`
`,(0,a.jsx)(t.h4,{children:`Button info`}),`
`,(0,a.jsx)(M,{}),`
`,(0,a.jsx)(t.h4,{children:`Button warning`}),`
`,(0,a.jsx)(N,{}),`
`,(0,a.jsx)(t.h4,{children:`Button error`}),`
`,(0,a.jsx)(P,{}),`
`,(0,a.jsx)(t.h4,{children:`Button with a path to populate the data`}),`
`,(0,a.jsx)(L,{}),`
`,(0,a.jsx)(t.h4,{children:`Button with the data property`}),`
`,(0,a.jsx)(R,{}),`
`,(0,a.jsx)(t.h4,{children:`Button with nested fields and logic`}),`
`,(0,a.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,a.jsx)(I,{}),`
`,(0,a.jsx)(t.h4,{children:`Button with checkbox variant`}),`
`,(0,a.jsx)(w,{})]})}function B(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(z,{...e})}):z(e)}function V(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{B as default};
import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({ButtonDisabled:()=>j,ButtonDisabledOptions:()=>M,ButtonEmpty:()=>C,ButtonError:()=>F,ButtonHorizontalLayout:()=>O,ButtonHorizontalLayoutAndHorizontalOptionsLayout:()=>A,ButtonHorizontalOptionsLayout:()=>k,ButtonInfo:()=>N,ButtonLabel:()=>E,ButtonNestingWithLogic:()=>L,ButtonOptionSelected:()=>D,ButtonWarning:()=>P,ButtonWithData:()=>z,ButtonWithDataPath:()=>R,ButtonWithHelp:()=>I,CheckboxButtonEmpty:()=>w,CheckboxButtonHorizontalOptionsLayout:()=>T,CheckboxDisabled:()=>p,CheckboxDisabledOptions:()=>m,CheckboxEmpty:()=>s,CheckboxError:()=>_,CheckboxHorizontalLayout:()=>u,CheckboxHorizontalLayoutAndHorizontalOptionsLayout:()=>f,CheckboxHorizontalOptionsLayout:()=>d,CheckboxInfo:()=>h,CheckboxLabel:()=>c,CheckboxNestingWithLogic:()=>y,CheckboxOptionSelected:()=>l,CheckboxWarning:()=>g,CheckboxWithData:()=>x,CheckboxWithDataPath:()=>b,CheckboxWithHelp:()=>v,CheckboxWithListComposition:()=>S}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`CheckboxEmpty`,children:`<Field.ArraySelection
  onFocus={(value) => console.log('onFocus', value)}
  onBlur={(value) => console.log('onBlur', value)}
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-checkbox-options-vertical`,stableName:`CheckboxLabel`,children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),l=()=>(0,o.jsx)(r,{stableName:`CheckboxOptionSelected`,children:`<Field.ArraySelection
  value={['bar']}
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-checkbox-horizontal-layout`,stableName:`CheckboxHorizontalLayout`,children:`<Field.ArraySelection
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
`}),d=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-checkbox-options-horizontal`,stableName:`CheckboxHorizontalOptionsLayout`,children:`<Field.ArraySelection
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
`}),f=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-checkbox-horizontal`,stableName:`CheckboxHorizontalLayoutAndHorizontalOptionsLayout`,children:`<Field.ArraySelection
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
`}),p=()=>(0,o.jsx)(r,{stableName:`CheckboxDisabled`,children:`<Field.ArraySelection
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
`}),m=()=>(0,o.jsx)(r,{stableName:`CheckboxDisabledOptions`,children:`<Field.ArraySelection
  value={['foo']}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" disabled />
  <Field.Option value="baz" title="Bazz!" disabled />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),h=()=>(0,o.jsx)(r,{stableName:`CheckboxInfo`,children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  info="FYI"
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),g=()=>(0,o.jsx)(r,{stableName:`CheckboxWarning`,children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  warning="I'm warning you..."
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),_=()=>(0,o.jsx)(r,{stableName:`CheckboxError`,children:`<Field.ArraySelection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),v=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-checkbox-help`,stableName:`CheckboxWithHelp`,children:`<Field.ArraySelection
  label="Label text"
  help={{
    title: 'Help title',
    content: 'Help content',
  }}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.ArraySelection>
`}),y=()=>(0,o.jsx)(r,{hideCode:!0,"data-visual-test":`array-selection-checkbox-nesting-logic`,stableName:`CheckboxNestingWithLogic`,children:`<Form.Handler onSubmit={console.log}>
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
`}),b=()=>(0,o.jsx)(r,{stableName:`CheckboxWithDataPath`,children:`<Form.Handler
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
`}),x=()=>(0,o.jsx)(r,{stableName:`CheckboxWithData`,children:`<Field.ArraySelection
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
`}),S=()=>(0,o.jsx)(r,{stableName:`CheckboxWithListComposition`,children:`<Form.Handler
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
`}),C=()=>(0,o.jsx)(r,{stableName:`ButtonEmpty`,children:`<Field.ArraySelection
  variant="button"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),w=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-checkbox-button`,stableName:`CheckboxButtonEmpty`,children:`<Field.ArraySelection
  variant="checkbox-button"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),T=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-checkbox-button-options-horizontal`,stableName:`CheckboxButtonHorizontalOptionsLayout`,children:`<Field.ArraySelection
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
`}),E=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-button-options-vertical`,stableName:`ButtonLabel`,children:`<Field.ArraySelection
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Fooo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),D=()=>(0,o.jsx)(r,{stableName:`ButtonOptionSelected`,children:`<Field.ArraySelection
  variant="button"
  value={['bar']}
  onChange={(values) => console.log('onChange', values)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
  <Field.Option value="baz" title="Bazz!" />
  <Field.Option value="qux" title="Quxx!" />
</Field.ArraySelection>
`}),O=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-button-horizontal-layout`,stableName:`ButtonHorizontalLayout`,children:`<Field.ArraySelection
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
`}),k=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-button-horizontal`,stableName:`ButtonHorizontalOptionsLayout`,children:`<Field.ArraySelection
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
`}),A=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-button-options-horizontal`,stableName:`ButtonHorizontalLayoutAndHorizontalOptionsLayout`,children:`<Field.ArraySelection
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
`}),j=()=>(0,o.jsx)(r,{stableName:`ButtonDisabled`,children:`<Field.ArraySelection
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
`}),M=()=>(0,o.jsx)(r,{stableName:`ButtonDisabledOptions`,children:`<Field.ArraySelection
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
`}),N=()=>(0,o.jsx)(r,{stableName:`ButtonInfo`,children:`<Field.ArraySelection
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
`}),P=()=>(0,o.jsx)(r,{stableName:`ButtonWarning`,children:`<Field.ArraySelection
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
`}),F=()=>(0,o.jsx)(r,{stableName:`ButtonError`,children:`<Field.ArraySelection
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
`}),I=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-button-help`,stableName:`ButtonWithHelp`,children:`<Field.ArraySelection
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
`}),L=()=>(0,o.jsx)(r,{"data-visual-test":`array-selection-button-nesting-logic`,stableName:`ButtonNestingWithLogic`,children:`<Form.Handler>
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
`}),R=()=>(0,o.jsx)(r,{stableName:`ButtonWithDataPath`,children:`<Form.Handler
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
`}),z=()=>(0,o.jsx)(r,{stableName:`ButtonWithData`,children:`<Field.ArraySelection
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
`});function B(e){let t={a:`a`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,p:`p`,...i(),...e.components};return a||H(`Examples`,!1),j||H(`Examples.ButtonDisabled`,!0),M||H(`Examples.ButtonDisabledOptions`,!0),C||H(`Examples.ButtonEmpty`,!0),F||H(`Examples.ButtonError`,!0),O||H(`Examples.ButtonHorizontalLayout`,!0),A||H(`Examples.ButtonHorizontalLayoutAndHorizontalOptionsLayout`,!0),k||H(`Examples.ButtonHorizontalOptionsLayout`,!0),N||H(`Examples.ButtonInfo`,!0),E||H(`Examples.ButtonLabel`,!0),L||H(`Examples.ButtonNestingWithLogic`,!0),D||H(`Examples.ButtonOptionSelected`,!0),P||H(`Examples.ButtonWarning`,!0),z||H(`Examples.ButtonWithData`,!0),R||H(`Examples.ButtonWithDataPath`,!0),I||H(`Examples.ButtonWithHelp`,!0),w||H(`Examples.CheckboxButtonEmpty`,!0),T||H(`Examples.CheckboxButtonHorizontalOptionsLayout`,!0),p||H(`Examples.CheckboxDisabled`,!0),m||H(`Examples.CheckboxDisabledOptions`,!0),s||H(`Examples.CheckboxEmpty`,!0),_||H(`Examples.CheckboxError`,!0),u||H(`Examples.CheckboxHorizontalLayout`,!0),f||H(`Examples.CheckboxHorizontalLayoutAndHorizontalOptionsLayout`,!0),d||H(`Examples.CheckboxHorizontalOptionsLayout`,!0),h||H(`Examples.CheckboxInfo`,!0),c||H(`Examples.CheckboxLabel`,!0),y||H(`Examples.CheckboxNestingWithLogic`,!0),l||H(`Examples.CheckboxOptionSelected`,!0),g||H(`Examples.CheckboxWarning`,!0),x||H(`Examples.CheckboxWithData`,!0),b||H(`Examples.CheckboxWithDataPath`,!0),v||H(`Examples.CheckboxWithHelp`,!0),S||H(`Examples.CheckboxWithListComposition`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Checkbox variant (default)`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Button variant`}),`
`,(0,o.jsx)(C,{}),`
`,(0,o.jsx)(t.h3,{children:`Button with checkbox variant`}),`
`,(0,o.jsx)(w,{}),`
`,(0,o.jsx)(t.hr,{}),`
`,(0,o.jsx)(t.h3,{children:`Checkbox variant demos`}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox label`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox option selected`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox horizontal layout`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox horizontal options-layout`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox horizontal layout and horizontal options-layout`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox with help`}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox disabled`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox disabled options`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox info`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox warning`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox error`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox with nested fields and logic`}),`
`,(0,o.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox with a path to populate the data`}),`
`,(0,o.jsx)(b,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox with the data property`}),`
`,(0,o.jsx)(x,{}),`
`,(0,o.jsx)(t.h4,{children:`Checkbox with List composition`}),`
`,(0,o.jsxs)(t.p,{children:[`Use render prop children to compose each option with `,(0,o.jsx)(t.a,{href:`/uilib/components/list`,children:`List`}),` and set selected state from the current field values.`]}),`
`,(0,o.jsx)(S,{}),`
`,(0,o.jsx)(t.hr,{}),`
`,(0,o.jsx)(t.h3,{children:`Button variant demos`}),`
`,(0,o.jsx)(t.h4,{children:`Button Label`}),`
`,(0,o.jsx)(E,{}),`
`,(0,o.jsx)(t.h4,{children:`Button option selected`}),`
`,(0,o.jsx)(D,{}),`
`,(0,o.jsx)(t.h4,{children:`Button horizontal layout`}),`
`,(0,o.jsx)(O,{}),`
`,(0,o.jsx)(t.h4,{children:`Button horizontal options-layout`}),`
`,(0,o.jsx)(k,{}),`
`,(0,o.jsx)(t.h4,{children:`Button horizontal layout and horizontal options-layout`}),`
`,(0,o.jsx)(A,{}),`
`,(0,o.jsx)(t.h4,{children:`Button with help`}),`
`,(0,o.jsx)(I,{}),`
`,(0,o.jsx)(t.h4,{children:`Button disabled`}),`
`,(0,o.jsx)(j,{}),`
`,(0,o.jsx)(t.h4,{children:`Button disabled options`}),`
`,(0,o.jsx)(M,{}),`
`,(0,o.jsx)(t.h4,{children:`Button info`}),`
`,(0,o.jsx)(N,{}),`
`,(0,o.jsx)(t.h4,{children:`Button warning`}),`
`,(0,o.jsx)(P,{}),`
`,(0,o.jsx)(t.h4,{children:`Button error`}),`
`,(0,o.jsx)(F,{}),`
`,(0,o.jsx)(t.h4,{children:`Button with a path to populate the data`}),`
`,(0,o.jsx)(R,{}),`
`,(0,o.jsx)(t.h4,{children:`Button with the data property`}),`
`,(0,o.jsx)(z,{}),`
`,(0,o.jsx)(t.h4,{children:`Button with nested fields and logic`}),`
`,(0,o.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,o.jsx)(L,{}),`
`,(0,o.jsx)(t.h4,{children:`Button with checkbox variant`}),`
`,(0,o.jsx)(T,{})]})}function V(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(B,{...e})}):B(e)}function H(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{V as default};
import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var ee=e({AutocompleteGroups:()=>w,AutocompleteLabel:()=>S,AutocompleteValidationRequired:()=>C,ButtonDisabled:()=>U,ButtonDisabledOptions:()=>W,ButtonEmpty:()=>z,ButtonError:()=>G,ButtonHorizontalOptionsLayout:()=>V,ButtonLabel:()=>B,ButtonNestingWithLogic:()=>J,ButtonOptionSelected:()=>H,ButtonWithAPath:()=>q,ButtonWithData:()=>K,DropdownDisabled:()=>p,DropdownDisabledOptions:()=>m,DropdownDynamicOptions:()=>g,DropdownEmpty:()=>a,DropdownError:()=>h,DropdownGroups:()=>x,DropdownHighNumberOfOptions:()=>_,DropdownLabel:()=>s,DropdownLabelAndOptionSelected:()=>l,DropdownPlaceholder:()=>o,DropdownTransformSelection:()=>c,DropdownValidationRequired:()=>v,DropdownWidths:()=>f,DropdownWithAPath:()=>b,DropdownWithData:()=>y,HorizontalLayout:()=>d,RadioDisabled:()=>j,RadioDisabledOptions:()=>M,RadioEmpty:()=>T,RadioError:()=>N,RadioHorizontalLayout:()=>O,RadioHorizontalLayoutAndHorizontalOptionsLayout:()=>A,RadioHorizontalOptionsLayout:()=>k,RadioLabel:()=>E,RadioNestingAdvanced:()=>R,RadioNestingWithLogic:()=>L,RadioOptionSelected:()=>D,RadioWithAPath:()=>F,RadioWithData:()=>P,RadioWithListComposition:()=>I,SelectionErrorMessage:()=>Y,SelectionInfoMessage:()=>X,SelectionWarningMessage:()=>Z,WithHelp:()=>u}),i=t(),a=()=>(0,i.jsx)(n,{children:`<Field.Selection
  onFocus={(value) => console.log('onFocus', value)}
  onBlur={(value) => console.log('onBlur', value)}
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),o=()=>(0,i.jsx)(n,{children:`<Field.Selection
  placeholder="Select something..."
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),s=()=>(0,i.jsx)(n,{children:`<Field.Selection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`});function c(){return(0,i.jsx)(n,{children:`<Field.Selection
  label="Label"
  value="bar"
  transformSelection={({ title }) => {
    return title
  }}
>
  <Field.Option value="foo" title="Foo!" text="Additional text" />
  <Field.Option value="bar" title="Baar!" text="Additional text" />
</Field.Selection>
`})}var l=()=>(0,i.jsx)(n,{"data-visual-test":`selection-dropdown-default`,children:`<Field.Selection
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),u=()=>(0,i.jsx)(n,{"data-visual-test":`selection-dropdown-help`,children:`<Field.Selection
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
`}),d=()=>(0,i.jsx)(n,{"data-visual-test":`selection-dropdown-horizontal`,children:`<Field.Selection
  value="bar"
  label="Label text"
  layout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),f=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`selection-dropdown-widths`,children:`<Flex.Stack>
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
`}),p=()=>(0,i.jsx)(n,{children:`<Field.Selection
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),m=()=>(0,i.jsx)(n,{noInline:!0,children:`const Example = () => {
  return (
    <Field.Selection label="Label text">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
`}),h=()=>(0,i.jsx)(n,{children:`<Field.Selection
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),g=()=>(0,i.jsx)(n,{noInline:!0,children:`const Example = () => {
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
`}),_=()=>(0,i.jsx)(n,{children:`<Field.Selection
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
`}),v=()=>(0,i.jsx)(n,{children:`<Field.Selection
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
`}),y=()=>(0,i.jsx)(n,{children:`<Field.Selection
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
`}),b=()=>(0,i.jsx)(n,{children:`<Form.Handler
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
`}),x=()=>(0,i.jsx)(n,{"data-visual-test":`selection-dropdown-groups`,children:`<Field.Selection
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
`}),S=()=>(0,i.jsx)(n,{children:`<Field.Selection
  variant="autocomplete"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),C=()=>(0,i.jsx)(n,{children:`<Field.Selection
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
`}),w=()=>(0,i.jsx)(n,{"data-visual-test":`selection-autocomplete-groups`,children:`<Field.Selection
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
`}),T=()=>(0,i.jsx)(n,{children:`<Field.Selection
  variant="radio"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),E=()=>(0,i.jsx)(n,{"data-visual-test":`selection-radio-options-vertical`,children:`<Field.Selection
  variant="radio"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),D=()=>(0,i.jsx)(n,{"data-visual-test":`selection-radio-vertical`,children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),O=()=>(0,i.jsx)(n,{"data-visual-test":`selection-radio-horizontal`,children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  layout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),k=()=>(0,i.jsx)(n,{"data-visual-test":`selection-radio-options-horizontal`,children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  optionsLayout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),A=()=>(0,i.jsx)(n,{children:`<Field.Selection
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
`}),j=()=>(0,i.jsx)(n,{children:`<Field.Selection
  variant="radio"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),M=()=>(0,i.jsx)(n,{noInline:!0,children:`const Example = () => {
  return (
    <Field.Selection label="Label text" variant="radio">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
`}),N=()=>(0,i.jsx)(n,{children:`<Field.Selection
  variant="radio"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),P=()=>(0,i.jsx)(n,{children:`<Field.Selection
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
`}),F=()=>(0,i.jsx)(n,{children:`<Form.Handler
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
`}),I=()=>(0,i.jsx)(n,{children:`<Form.Handler
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
`}),L=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`selection-radio-nesting-logic`,children:`<Form.Handler onSubmit={console.log}>
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
`}),R=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`selection-radio-advanced-nesting-logic`,children:`<Form.Handler
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
`}),z=()=>(0,i.jsx)(n,{children:`<Field.Selection
  variant="button"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),B=()=>(0,i.jsx)(n,{"data-visual-test":`selection-button-options-vertical`,children:`<Field.Selection
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),V=()=>(0,i.jsx)(n,{"data-visual-test":`selection-button-options-horizontal`,children:`<Field.Selection
  variant="button"
  label="Label text"
  optionsLayout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),H=()=>(0,i.jsx)(n,{"data-visual-test":`selection-button-vertical`,children:`<Field.Selection
  variant="button"
  label="Label text"
  value="bar"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),U=()=>(0,i.jsx)(n,{children:`<Field.Selection
  variant="button"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),W=()=>(0,i.jsx)(n,{noInline:!0,children:`const Example = () => {
  return (
    <Field.Selection label="Label text" variant="button">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
`}),G=()=>(0,i.jsx)(n,{children:`<Field.Selection
  variant="button"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),K=()=>(0,i.jsx)(n,{children:`<Field.Selection
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
`}),q=()=>(0,i.jsx)(n,{children:`<Form.Handler
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
`}),J=()=>(0,i.jsx)(n,{"data-visual-test":`selection-button-nesting-logic`,children:`<Form.Handler>
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
`}),Y=()=>(0,i.jsx)(n,{"data-visual-test":`selection-dropdown-error-message`,children:`<Field.Selection label="Label" error="This is what is wrong...">
  <Field.Option value="foo">Foo</Field.Option>
  <Field.Option value="bar">Bar</Field.Option>
</Field.Selection>
`}),X=()=>(0,i.jsx)(n,{"data-visual-test":`selection-dropdown-info-message`,children:`<Field.Selection label="Label" info="Useful information (?)">
  <Field.Option value="foo">Foo</Field.Option>
  <Field.Option value="bar">Bar</Field.Option>
</Field.Selection>
`}),Z=()=>(0,i.jsx)(n,{"data-visual-test":`selection-dropdown-warning-message`,children:`<Field.Selection label="Label" warning="I'm warning you...">
  <Field.Option value="foo">Foo</Field.Option>
  <Field.Option value="bar">Bar</Field.Option>
</Field.Selection>
`});function Q(e){let t={a:`a`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return ee||$(`Examples`,!1),w||$(`Examples.AutocompleteGroups`,!0),S||$(`Examples.AutocompleteLabel`,!0),C||$(`Examples.AutocompleteValidationRequired`,!0),U||$(`Examples.ButtonDisabled`,!0),W||$(`Examples.ButtonDisabledOptions`,!0),z||$(`Examples.ButtonEmpty`,!0),G||$(`Examples.ButtonError`,!0),V||$(`Examples.ButtonHorizontalOptionsLayout`,!0),B||$(`Examples.ButtonLabel`,!0),J||$(`Examples.ButtonNestingWithLogic`,!0),H||$(`Examples.ButtonOptionSelected`,!0),q||$(`Examples.ButtonWithAPath`,!0),K||$(`Examples.ButtonWithData`,!0),p||$(`Examples.DropdownDisabled`,!0),m||$(`Examples.DropdownDisabledOptions`,!0),g||$(`Examples.DropdownDynamicOptions`,!0),a||$(`Examples.DropdownEmpty`,!0),h||$(`Examples.DropdownError`,!0),x||$(`Examples.DropdownGroups`,!0),_||$(`Examples.DropdownHighNumberOfOptions`,!0),s||$(`Examples.DropdownLabel`,!0),l||$(`Examples.DropdownLabelAndOptionSelected`,!0),o||$(`Examples.DropdownPlaceholder`,!0),c||$(`Examples.DropdownTransformSelection`,!0),v||$(`Examples.DropdownValidationRequired`,!0),f||$(`Examples.DropdownWidths`,!0),b||$(`Examples.DropdownWithAPath`,!0),y||$(`Examples.DropdownWithData`,!0),d||$(`Examples.HorizontalLayout`,!0),j||$(`Examples.RadioDisabled`,!0),M||$(`Examples.RadioDisabledOptions`,!0),T||$(`Examples.RadioEmpty`,!0),N||$(`Examples.RadioError`,!0),O||$(`Examples.RadioHorizontalLayout`,!0),A||$(`Examples.RadioHorizontalLayoutAndHorizontalOptionsLayout`,!0),k||$(`Examples.RadioHorizontalOptionsLayout`,!0),E||$(`Examples.RadioLabel`,!0),R||$(`Examples.RadioNestingAdvanced`,!0),L||$(`Examples.RadioNestingWithLogic`,!0),D||$(`Examples.RadioOptionSelected`,!0),F||$(`Examples.RadioWithAPath`,!0),P||$(`Examples.RadioWithData`,!0),I||$(`Examples.RadioWithListComposition`,!0),Y||$(`Examples.SelectionErrorMessage`,!0),X||$(`Examples.SelectionInfoMessage`,!0),Z||$(`Examples.SelectionWarningMessage`,!0),u||$(`Examples.WithHelp`,!0),n||$(`VisibleWhenVisualTest`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Variants summary`}),`
`,(0,i.jsx)(t.p,{children:`As there are many variants, they are split into separate sections. Here is a summary of the variants:`}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h4,{children:`Autocomplete`}),`
`,(0,i.jsx)(S,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio buttons`}),`
`,(0,i.jsx)(E,{}),`
`,(0,i.jsx)(t.h4,{children:`Toggle buttons`}),`
`,(0,i.jsx)(B,{}),`
`,(0,i.jsx)(t.hr,{}),`
`,(0,i.jsx)(t.h3,{children:`Dropdown variant (default)`}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown empty`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown placeholder`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown with a transformed selection text`}),`
`,(0,i.jsx)(c,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown label and option selected`}),`
`,(0,i.jsx)(l,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown with help`}),`
`,(0,i.jsx)(u,{}),`
`,(0,i.jsx)(t.h3,{children:`Horizontal layout`}),`
`,(0,i.jsx)(d,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown disabled`}),`
`,(0,i.jsx)(p,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown option disabled`}),`
`,(0,i.jsx)(m,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown error`}),`
`,(0,i.jsx)(h,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown dynamic options`}),`
`,(0,i.jsx)(g,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown high number of options`}),`
`,(0,i.jsx)(_,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown validation - Required`}),`
`,(0,i.jsx)(v,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown button with a path to populate the data`}),`
`,(0,i.jsx)(b,{}),`
`,(0,i.jsx)(t.h4,{children:`Dropdown with the data property`}),`
`,(0,i.jsx)(y,{}),`
`,(0,i.jsx)(t.h3,{children:`Dropdown widths`}),`
`,(0,i.jsx)(f,{}),`
`,(0,i.jsx)(t.h3,{children:`Dropdown groups`}),`
`,(0,i.jsx)(x,{}),`
`,(0,i.jsx)(t.hr,{}),`
`,(0,i.jsx)(t.h3,{children:`Autocomplete variant`}),`
`,(0,i.jsx)(C,{}),`
`,(0,i.jsx)(t.h3,{children:`Autocomplete groups`}),`
`,(0,i.jsx)(w,{}),`
`,(0,i.jsx)(t.hr,{}),`
`,(0,i.jsx)(t.h3,{children:`Radio variant`}),`
`,(0,i.jsx)(t.h4,{children:`Radio empty`}),`
`,(0,i.jsx)(T,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio option selected`}),`
`,(0,i.jsx)(D,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio horizontal layout`}),`
`,(0,i.jsx)(O,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio horizontal options-layout`}),`
`,(0,i.jsx)(k,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio horizontal layout and horizontal options-layout`}),`
`,(0,i.jsx)(A,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio disabled`}),`
`,(0,i.jsx)(j,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio option disabled`}),`
`,(0,i.jsx)(M,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio error`}),`
`,(0,i.jsx)(N,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio button with a path to populate the data`}),`
`,(0,i.jsx)(F,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio with the data property`}),`
`,(0,i.jsx)(P,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio with List composition`}),`
`,(0,i.jsxs)(t.p,{children:[`Use render prop children to compose each option with `,(0,i.jsx)(t.a,{href:`/uilib/components/list`,children:`List`}),` and set selected state from the current field value.`]}),`
`,(0,i.jsx)(I,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio nesting other fields with logic`}),`
`,(0,i.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,i.jsx)(L,{}),`
`,(0,i.jsx)(t.h4,{children:`Radio nesting advanced`}),`
`,(0,i.jsx)(R,{}),`
`,(0,i.jsx)(t.hr,{}),`
`,(0,i.jsx)(t.h3,{children:`Buttons variant`}),`
`,(0,i.jsx)(t.h4,{children:`ToggleButton empty`}),`
`,(0,i.jsx)(z,{}),`
`,(0,i.jsx)(t.h4,{children:`ToggleButton option selected`}),`
`,(0,i.jsx)(H,{}),`
`,(0,i.jsx)(t.h4,{children:`ToggleButton horizontal options-layout`}),`
`,(0,i.jsx)(V,{}),`
`,(0,i.jsx)(t.h4,{children:`ToggleButton disabled`}),`
`,(0,i.jsx)(U,{}),`
`,(0,i.jsx)(t.h4,{children:`ToggleButton option disabled`}),`
`,(0,i.jsx)(W,{}),`
`,(0,i.jsx)(t.h4,{children:`ToggleButton error`}),`
`,(0,i.jsx)(G,{}),`
`,(0,i.jsx)(t.h4,{children:`ToggleButton nesting other fields with logic`}),`
`,(0,i.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,i.jsx)(J,{}),`
`,(0,i.jsx)(t.h4,{children:`ToggleButton with a path to populate the data`}),`
`,(0,i.jsx)(q,{}),`
`,(0,i.jsx)(t.h4,{children:`ToggleButton with the data property`}),`
`,(0,i.jsx)(K,{}),`
`,(0,i.jsxs)(n,{children:[(0,i.jsx)(Y,{}),(0,i.jsx)(X,{}),(0,i.jsx)(Z,{})]})]})}function te(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(Q,{...e})}):Q(e)}function $(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{te as default};
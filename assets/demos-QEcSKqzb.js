import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i}from"./index-CMgyXmp3.js";var ee=e({AutocompleteGroups:()=>T,AutocompleteLabel:()=>C,AutocompleteValidationRequired:()=>w,ButtonDisabled:()=>W,ButtonDisabledOptions:()=>G,ButtonEmpty:()=>B,ButtonError:()=>K,ButtonHorizontalOptionsLayout:()=>H,ButtonLabel:()=>V,ButtonNestingWithLogic:()=>Y,ButtonOptionSelected:()=>U,ButtonWithAPath:()=>J,ButtonWithData:()=>q,DropdownDisabled:()=>m,DropdownDisabledOptions:()=>h,DropdownDynamicOptions:()=>_,DropdownEmpty:()=>o,DropdownError:()=>g,DropdownGroups:()=>S,DropdownHighNumberOfOptions:()=>v,DropdownLabel:()=>c,DropdownLabelAndOptionSelected:()=>u,DropdownPlaceholder:()=>s,DropdownTransformSelection:()=>l,DropdownValidationRequired:()=>y,DropdownWidths:()=>p,DropdownWithAPath:()=>x,DropdownWithData:()=>b,HorizontalLayout:()=>f,RadioDisabled:()=>M,RadioDisabledOptions:()=>N,RadioEmpty:()=>E,RadioError:()=>P,RadioHorizontalLayout:()=>k,RadioHorizontalLayoutAndHorizontalOptionsLayout:()=>j,RadioHorizontalOptionsLayout:()=>A,RadioLabel:()=>D,RadioNestingAdvanced:()=>z,RadioNestingWithLogic:()=>R,RadioOptionSelected:()=>O,RadioWithAPath:()=>I,RadioWithData:()=>F,RadioWithListComposition:()=>L,SelectionErrorMessage:()=>X,SelectionInfoMessage:()=>Z,SelectionWarningMessage:()=>Q,WithHelp:()=>d});t();var a=n(),o=()=>(0,a.jsx)(r,{children:`<Field.Selection
  onFocus={(value) => console.log('onFocus', value)}
  onBlur={(value) => console.log('onBlur', value)}
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),s=()=>(0,a.jsx)(r,{children:`<Field.Selection
  placeholder="Select something..."
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),c=()=>(0,a.jsx)(r,{children:`<Field.Selection
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`});function l(){return(0,a.jsx)(r,{children:`<Field.Selection
  label="Label"
  value="bar"
  transformSelection={({ title }) => {
    return title
  }}
>
  <Field.Option value="foo" title="Foo!" text="Additional text" />
  <Field.Option value="bar" title="Baar!" text="Additional text" />
</Field.Selection>
`})}var u=()=>(0,a.jsx)(r,{"data-visual-test":`selection-dropdown-default`,children:`<Field.Selection
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),d=()=>(0,a.jsx)(r,{"data-visual-test":`selection-dropdown-help`,children:`<Field.Selection
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
`}),f=()=>(0,a.jsx)(r,{"data-visual-test":`selection-dropdown-horizontal`,children:`<Field.Selection
  value="bar"
  label="Label text"
  layout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),p=()=>(0,a.jsx)(r,{hideCode:!0,"data-visual-test":`selection-dropdown-widths`,children:`<Flex.Stack>
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
`}),m=()=>(0,a.jsx)(r,{children:`<Field.Selection
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),h=()=>(0,a.jsx)(r,{noInline:!0,children:`const Example = () => {
  return (
    <Field.Selection label="Label text">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
`}),g=()=>(0,a.jsx)(r,{children:`<Field.Selection
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),_=()=>(0,a.jsx)(r,{noInline:!0,children:`const Example = () => {
  const [numOptions, setNumOptions] = React.useState(3)
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
`}),v=()=>(0,a.jsx)(r,{children:`<Field.Selection
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
`}),y=()=>(0,a.jsx)(r,{children:`<Field.Selection
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
`}),b=()=>(0,a.jsx)(r,{children:`<Field.Selection
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
`}),x=()=>(0,a.jsx)(r,{children:`<Form.Handler
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
`}),S=()=>(0,a.jsx)(r,{"data-visual-test":`selection-dropdown-groups`,children:`<Field.Selection
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
`}),C=()=>(0,a.jsx)(r,{children:`<Field.Selection
  variant="autocomplete"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),w=()=>(0,a.jsx)(r,{children:`<Field.Selection
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
`}),T=()=>(0,a.jsx)(r,{"data-visual-test":`selection-autocomplete-groups`,children:`<Field.Selection
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
`}),E=()=>(0,a.jsx)(r,{children:`<Field.Selection
  variant="radio"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),D=()=>(0,a.jsx)(r,{"data-visual-test":`selection-radio-options-vertical`,children:`<Field.Selection
  variant="radio"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),O=()=>(0,a.jsx)(r,{"data-visual-test":`selection-radio-vertical`,children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),k=()=>(0,a.jsx)(r,{"data-visual-test":`selection-radio-horizontal`,children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  layout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),A=()=>(0,a.jsx)(r,{"data-visual-test":`selection-radio-options-horizontal`,children:`<Field.Selection
  variant="radio"
  label="Label text"
  value="bar"
  optionsLayout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),j=()=>(0,a.jsx)(r,{children:`<Field.Selection
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
`}),M=()=>(0,a.jsx)(r,{children:`<Field.Selection
  variant="radio"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),N=()=>(0,a.jsx)(r,{noInline:!0,children:`const Example = () => {
  return (
    <Field.Selection label="Label text" variant="radio">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
`}),P=()=>(0,a.jsx)(r,{children:`<Field.Selection
  variant="radio"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),F=()=>(0,a.jsx)(r,{children:`<Field.Selection
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
`}),I=()=>(0,a.jsx)(r,{children:`<Form.Handler
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
`}),L=()=>(0,a.jsx)(r,{children:`<Form.Handler
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
`}),R=()=>(0,a.jsx)(r,{hideCode:!0,"data-visual-test":`selection-radio-nesting-logic`,children:`<Form.Handler onSubmit={console.log}>
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
`}),z=()=>(0,a.jsx)(r,{hideCode:!0,"data-visual-test":`selection-radio-advanced-nesting-logic`,children:`<Form.Handler
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
`}),B=()=>(0,a.jsx)(r,{children:`<Field.Selection
  variant="button"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),V=()=>(0,a.jsx)(r,{"data-visual-test":`selection-button-options-vertical`,children:`<Field.Selection
  variant="button"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),H=()=>(0,a.jsx)(r,{"data-visual-test":`selection-button-options-horizontal`,children:`<Field.Selection
  variant="button"
  label="Label text"
  optionsLayout="horizontal"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),U=()=>(0,a.jsx)(r,{"data-visual-test":`selection-button-vertical`,children:`<Field.Selection
  variant="button"
  label="Label text"
  value="bar"
  onChange={(value) => console.log('onChange', value)}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),W=()=>(0,a.jsx)(r,{children:`<Field.Selection
  variant="button"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),G=()=>(0,a.jsx)(r,{noInline:!0,children:`const Example = () => {
  return (
    <Field.Selection label="Label text" variant="button">
      <Field.Option value="foo" title="Foo!" disabled />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  )
}
render(<Example />)
`}),K=()=>(0,a.jsx)(r,{children:`<Field.Selection
  variant="button"
  value="bar"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
>
  <Field.Option value="foo" title="Foo!" />
  <Field.Option value="bar" title="Baar!" />
</Field.Selection>
`}),q=()=>(0,a.jsx)(r,{children:`<Field.Selection
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
`}),J=()=>(0,a.jsx)(r,{children:`<Form.Handler
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
`}),Y=()=>(0,a.jsx)(r,{"data-visual-test":`selection-button-nesting-logic`,children:`<Form.Handler>
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
`}),X=()=>(0,a.jsx)(r,{"data-visual-test":`selection-dropdown-error-message`,children:`<Field.Selection label="Label" error="This is what is wrong...">
  <Field.Option value="foo">Foo</Field.Option>
  <Field.Option value="bar">Bar</Field.Option>
</Field.Selection>
`}),Z=()=>(0,a.jsx)(r,{"data-visual-test":`selection-dropdown-info-message`,children:`<Field.Selection label="Label" info="Useful information (?)">
  <Field.Option value="foo">Foo</Field.Option>
  <Field.Option value="bar">Bar</Field.Option>
</Field.Selection>
`}),Q=()=>(0,a.jsx)(r,{"data-visual-test":`selection-dropdown-warning-message`,children:`<Field.Selection label="Label" warning="I'm warning you...">
  <Field.Option value="foo">Foo</Field.Option>
  <Field.Option value="bar">Bar</Field.Option>
</Field.Selection>
`});function te(e){let t={a:`a`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,p:`p`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return ee||$(`Examples`,!1),T||$(`Examples.AutocompleteGroups`,!0),C||$(`Examples.AutocompleteLabel`,!0),w||$(`Examples.AutocompleteValidationRequired`,!0),W||$(`Examples.ButtonDisabled`,!0),G||$(`Examples.ButtonDisabledOptions`,!0),B||$(`Examples.ButtonEmpty`,!0),K||$(`Examples.ButtonError`,!0),H||$(`Examples.ButtonHorizontalOptionsLayout`,!0),V||$(`Examples.ButtonLabel`,!0),Y||$(`Examples.ButtonNestingWithLogic`,!0),U||$(`Examples.ButtonOptionSelected`,!0),J||$(`Examples.ButtonWithAPath`,!0),q||$(`Examples.ButtonWithData`,!0),m||$(`Examples.DropdownDisabled`,!0),h||$(`Examples.DropdownDisabledOptions`,!0),_||$(`Examples.DropdownDynamicOptions`,!0),o||$(`Examples.DropdownEmpty`,!0),g||$(`Examples.DropdownError`,!0),S||$(`Examples.DropdownGroups`,!0),v||$(`Examples.DropdownHighNumberOfOptions`,!0),c||$(`Examples.DropdownLabel`,!0),u||$(`Examples.DropdownLabelAndOptionSelected`,!0),s||$(`Examples.DropdownPlaceholder`,!0),l||$(`Examples.DropdownTransformSelection`,!0),y||$(`Examples.DropdownValidationRequired`,!0),p||$(`Examples.DropdownWidths`,!0),x||$(`Examples.DropdownWithAPath`,!0),b||$(`Examples.DropdownWithData`,!0),f||$(`Examples.HorizontalLayout`,!0),M||$(`Examples.RadioDisabled`,!0),N||$(`Examples.RadioDisabledOptions`,!0),E||$(`Examples.RadioEmpty`,!0),P||$(`Examples.RadioError`,!0),k||$(`Examples.RadioHorizontalLayout`,!0),j||$(`Examples.RadioHorizontalLayoutAndHorizontalOptionsLayout`,!0),A||$(`Examples.RadioHorizontalOptionsLayout`,!0),D||$(`Examples.RadioLabel`,!0),z||$(`Examples.RadioNestingAdvanced`,!0),R||$(`Examples.RadioNestingWithLogic`,!0),O||$(`Examples.RadioOptionSelected`,!0),I||$(`Examples.RadioWithAPath`,!0),F||$(`Examples.RadioWithData`,!0),L||$(`Examples.RadioWithListComposition`,!0),X||$(`Examples.SelectionErrorMessage`,!0),Z||$(`Examples.SelectionInfoMessage`,!0),Q||$(`Examples.SelectionWarningMessage`,!0),d||$(`Examples.WithHelp`,!0),n||$(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Variants summary`}),`
`,(0,a.jsx)(t.p,{children:`As there are many variants, they are split into separate sections. Here is a summary of the variants:`}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h4,{children:`Autocomplete`}),`
`,(0,a.jsx)(C,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio buttons`}),`
`,(0,a.jsx)(D,{}),`
`,(0,a.jsx)(t.h4,{children:`Toggle buttons`}),`
`,(0,a.jsx)(V,{}),`
`,(0,a.jsx)(t.hr,{}),`
`,(0,a.jsx)(t.h3,{children:`Dropdown variant (default)`}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown empty`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown placeholder`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown with a transformed selection text`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown label and option selected`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown with help`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Horizontal layout`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown disabled`}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown option disabled`}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown error`}),`
`,(0,a.jsx)(g,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown dynamic options`}),`
`,(0,a.jsx)(_,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown high number of options`}),`
`,(0,a.jsx)(v,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown validation - Required`}),`
`,(0,a.jsx)(y,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown button with a path to populate the data`}),`
`,(0,a.jsx)(x,{}),`
`,(0,a.jsx)(t.h4,{children:`Dropdown with the data property`}),`
`,(0,a.jsx)(b,{}),`
`,(0,a.jsx)(t.h3,{children:`Dropdown widths`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`Dropdown groups`}),`
`,(0,a.jsx)(S,{}),`
`,(0,a.jsx)(t.hr,{}),`
`,(0,a.jsx)(t.h3,{children:`Autocomplete variant`}),`
`,(0,a.jsx)(w,{}),`
`,(0,a.jsx)(t.h3,{children:`Autocomplete groups`}),`
`,(0,a.jsx)(T,{}),`
`,(0,a.jsx)(t.hr,{}),`
`,(0,a.jsx)(t.h3,{children:`Radio variant`}),`
`,(0,a.jsx)(t.h4,{children:`Radio empty`}),`
`,(0,a.jsx)(E,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio option selected`}),`
`,(0,a.jsx)(O,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio horizontal layout`}),`
`,(0,a.jsx)(k,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio horizontal options-layout`}),`
`,(0,a.jsx)(A,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio horizontal layout and horizontal options-layout`}),`
`,(0,a.jsx)(j,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio disabled`}),`
`,(0,a.jsx)(M,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio option disabled`}),`
`,(0,a.jsx)(N,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio error`}),`
`,(0,a.jsx)(P,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio button with a path to populate the data`}),`
`,(0,a.jsx)(I,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio with the data property`}),`
`,(0,a.jsx)(F,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio with List composition`}),`
`,(0,a.jsxs)(t.p,{children:[`Use render prop children to compose each option with `,(0,a.jsx)(t.a,{href:`/uilib/components/list`,children:`List`}),` and set selected state from the current field value.`]}),`
`,(0,a.jsx)(L,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio nesting other fields with logic`}),`
`,(0,a.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,a.jsx)(R,{}),`
`,(0,a.jsx)(t.h4,{children:`Radio nesting advanced`}),`
`,(0,a.jsx)(z,{}),`
`,(0,a.jsx)(t.hr,{}),`
`,(0,a.jsx)(t.h3,{children:`Buttons variant`}),`
`,(0,a.jsx)(t.h4,{children:`ToggleButton empty`}),`
`,(0,a.jsx)(B,{}),`
`,(0,a.jsx)(t.h4,{children:`ToggleButton option selected`}),`
`,(0,a.jsx)(U,{}),`
`,(0,a.jsx)(t.h4,{children:`ToggleButton horizontal options-layout`}),`
`,(0,a.jsx)(H,{}),`
`,(0,a.jsx)(t.h4,{children:`ToggleButton disabled`}),`
`,(0,a.jsx)(W,{}),`
`,(0,a.jsx)(t.h4,{children:`ToggleButton option disabled`}),`
`,(0,a.jsx)(G,{}),`
`,(0,a.jsx)(t.h4,{children:`ToggleButton error`}),`
`,(0,a.jsx)(K,{}),`
`,(0,a.jsx)(t.h4,{children:`ToggleButton nesting other fields with logic`}),`
`,(0,a.jsx)(t.p,{children:`You can nest other fields and show them based on your desired logic.`}),`
`,(0,a.jsx)(Y,{}),`
`,(0,a.jsx)(t.h4,{children:`ToggleButton with a path to populate the data`}),`
`,(0,a.jsx)(J,{}),`
`,(0,a.jsx)(t.h4,{children:`ToggleButton with the data property`}),`
`,(0,a.jsx)(q,{}),`
`,(0,a.jsxs)(n,{children:[(0,a.jsx)(X,{}),(0,a.jsx)(Z,{}),(0,a.jsx)(Q,{})]})]})}function ne(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(te,{...e})}):te(e)}function $(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{ne as default};
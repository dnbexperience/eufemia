import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r,Nt as i,o as a}from"./index-DVm0MbGb.js";var o=e({Alignment:()=>g,AllowNegative:()=>S,ConditionalInfo:()=>A,Disabled:()=>y,DisallowLeadingZeroes:()=>C,ExclusiveMinMax:()=>m,HorizontalLayout:()=>p,LabelAndDescription:()=>d,LabelAndValue:()=>l,Percentage:()=>w,Placeholder:()=>c,PrefixAndSuffix:()=>h,ValidateMaximumCustomError:()=>T,ValidateMinimum:()=>x,ValidateRequired:()=>b,Widths:()=>v,WithCustomMask:()=>u,WithHelp:()=>_,WithSlider:()=>k,WithStatus:()=>f,WithStepControls:()=>E,WithStepControlsDisabled:()=>O,WithStepControlsError:()=>D}),s=t(),c=()=>(0,s.jsx)(n,{children:`<Field.Number
  label="Label text"
  placeholder="Enter a number..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,s.jsx)(n,{children:`<Field.Number
  label="Label text"
  defaultValue={420000.25}
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,s.jsx)(n,{children:`<Field.Number
  label="Label text"
  defaultValue={1234}
  mask={Array(4).fill(/\\d/)}
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,s.jsx)(n,{"data-visual-test":`number-label-description`,children:`<Form.Card>
  <Field.Number
    label="Label text"
    labelDescription="Description text on the next line"
    placeholder="Enter a text..."
  />
  <Field.Number
    label="Label text"
    labelDescription="Description text on the same line"
    labelDescriptionInline
    placeholder="Enter a text..."
  />
</Form.Card>
`}),f=()=>(0,s.jsx)(n,{"data-visual-test":`number-status`,children:`<Form.Card>
  <Field.Number
    label="Label text"
    placeholder="Enter a number..."
    width="large"
    warning="Short warning."
    required
  />
  <Field.Number
    label="Label text"
    defaultValue={420000}
    width="large"
    info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
    required
  />
  <Field.Number
    label="Label text"
    value={1234}
    width="small"
    warning="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et. Velit incididunt exercitation est magna ex irure dolore nisi eiusmod ea exercitation."
    required
  />
</Form.Card>
`}),p=()=>(0,s.jsx)(n,{"data-visual-test":`number-horizontal-layout`,children:`<Form.Card>
  <Field.Provider
    layout="horizontal"
    layoutOptions={{
      width: 'medium', // can be a rem value
    }}
    required
  >
    <Field.Number
      label="Label text"
      defaultValue={420000}
      step={10000}
      showStepControls
    />
    <Field.Number
      label="Label with a long text that will wrap"
      placeholder="Enter a number..."
      info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
    />
    <Field.Number
      label="Label with a long text that will wrap"
      placeholder="Enter a number..."
      size="large"
      width="stretch"
    />
  </Field.Provider>
</Form.Card>
`}),m=()=>(0,s.jsx)(n,{children:`<Field.Number
  defaultValue={1000}
  label="Label text"
  allowNegative={false}
  required
  exclusiveMinimum={900}
  exclusiveMaximum={1000}
  validateInitially
/>
`}),h=()=>(0,s.jsx)(n,{children:`<Flex.Stack>
  <Field.Number
    defaultValue={1234}
    label="With prefix"
    prefix="prefix "
    onChange={(value) => console.log('onChange', value)}
  />
  <Field.Number
    defaultValue={1}
    label="With suffix (function)"
    suffix={(value) => (value === 1 ? ' year' : ' years')}
    onChange={(value) => console.log('onChange', value)}
  />
</Flex.Stack>
`}),g=()=>(0,s.jsx)(n,{children:`<Flex.Stack>
  <Field.Number
    align="center"
    label="Center aligned (default)"
    defaultValue={10}
    onChange={(value) => console.log('onChange', value)}
  />
  <Field.Number
    align="left"
    label="Left aligned"
    defaultValue={10}
    onChange={(value) => console.log('onChange', value)}
  />
  <Field.Number
    align="right"
    label="Right aligned"
    defaultValue={10}
    onChange={(value) => console.log('onChange', value)}
  />
</Flex.Stack>
`}),_=()=>(0,s.jsx)(n,{children:`<Field.Number
  defaultValue={12345}
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Here is what a team can do for you. . . . It allows you to help others do their best.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),v=()=>(0,s.jsx)(n,{hideCode:!0,"data-visual-test":`number-widths`,children:`<Flex.Stack>
  <Form.SubHeading>Without step controls</Form.SubHeading>

  <Field.Number
    label="Default width (property omitted)"
    defaultValue={1234}
  />
  <Field.Number label="Small" defaultValue={1234} width="small" />
  <Field.Number
    label="Medium (and medium size)"
    defaultValue={1234}
    width="medium"
    size="medium"
  />
  <Field.Number
    label="Large (and large size)"
    defaultValue={1234}
    width="large"
    size="large"
  />
  <Field.Number label="Stretch" defaultValue={1234} width="stretch" />
  <Form.SubHeading>With step controls</Form.SubHeading>
  <Field.Number
    showStepControls
    label="Default width (property omitted)"
    defaultValue={1234}
  />
  <Field.Number
    showStepControls
    label="Small"
    defaultValue={1234}
    width="small"
  />
  <Field.Number
    showStepControls
    label="Medium (and medium size)"
    defaultValue={1234}
    width="medium"
    size="medium"
  />
  <Field.Number
    showStepControls
    label="Large (and large size)"
    defaultValue={1234}
    width="large"
    size="large"
  />
  <Field.Number
    showStepControls
    label="Stretch"
    defaultValue={1234}
    width="stretch"
  />
</Flex.Stack>
`}),y=()=>(0,s.jsx)(n,{children:`<Field.Number
  defaultValue={135}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),b=()=>(0,s.jsx)(n,{children:`<Field.Number
  defaultValue={123}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
/>
`}),x=()=>(0,s.jsx)(n,{children:`<Field.Number
  defaultValue={300}
  label="Enter a number below 250 and blur to trigger error"
  onChange={(value) => console.log('onChange', value)}
  minimum={250}
/>
`}),S=()=>(0,s.jsx)(n,{children:`<Field.Number allowNegative={false} />
`}),C=()=>(0,s.jsx)(n,{children:`<Field.Number disallowLeadingZeroes />
`}),w=()=>(0,s.jsx)(n,{children:`<Field.Number
  percent
  defaultValue={80}
  label="Percentage"
  onChange={(value) => console.log('onChange', value)}
  minimum={90}
/>
`}),T=()=>(0,s.jsx)(n,{children:`<Field.Number
  label="Enter a number above 250 and blur to trigger error"
  defaultValue={200}
  maximum={250}
  errorMessages={{
    maximum: "You can't enter a number THAR large.. Max 250!",
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),E=()=>(0,s.jsx)(n,{"data-visual-test":`number-input-step-controls`,children:`<Field.Number
  label="Label text"
  showStepControls
  minimum={0}
  maximum={100}
  step={10}
  defaultValue={50}
/>
`}),D=()=>(0,s.jsx)(n,{"data-visual-test":`number-input-step-controls-error`,children:`<Field.Number
  label="Label text"
  showStepControls
  maximum={100}
  defaultValue={150}
  error={new Error('You done messed up, A-a-ron!')}
/>
`}),O=()=>(0,s.jsx)(n,{"data-visual-test":`number-input-step-controls-disabled`,children:`<Field.Number label="Label text" showStepControls disabled />
`}),k=()=>(0,s.jsx)(n,{hideCode:!0,noInline:!0,children:`const Component = () => {
  const [value, setValue] = useState(50000)
  const settings = {
    min: 0,
    max: 100000,
    step: 1000,
  }
  return (
    <Grid.Container>
      <Grid.Item
        span={{
          small: [1, 12],
          medium: [1, 4],
          large: [1, 3],
        }}
      >
        <Field.Number
          label="Label text"
          showStepControls
          minimum={settings.min}
          maximum={settings.max}
          step={settings.step}
          value={value}
          onChange={(value) => setValue(value)}
          width="stretch"
          bottom="small"
        />
        <Slider
          min={settings.min}
          max={settings.max}
          step={settings.step}
          value={value}
          onChange={({ value }) => setValue(parseFloat(String(value)))}
          hideButtons
          tooltip
        />
      </Grid.Item>
    </Grid.Container>
  )
}
render(<Component />)
`}),A=()=>(0,s.jsx)(n,{scope:{FormError:i},noInline:!0,children:`render(
  <Form.Handler
    defaultData={{
      maximum: 4,
      amount: 5,
    }}
    onSubmit={async (data) => {
      console.log('onSubmit', data)
    }}
  >
    <Form.Card>
      <Field.Number
        label="Maximum for amount"
        labelDescription={
          <>Defines the maximum amount possible to be entered.</>
        }
        path="/maximum"
        required
        info={(
          maximum,
          { conditionally, getValueByPath, getFieldByPath }
        ) => {
          return conditionally(() => {
            if (maximum < getValueByPath('/amount')) {
              const { props, id } = getFieldByPath('/amount')
              const anchor = props?.label && (
                <Anchor
                  href={'#' + id + '-label'}
                  onClick={(event) => {
                    event.preventDefault()
                    const el = document.getElementById(id + '-label')
                    el?.scrollIntoView()
                  }}
                >
                  {props.label}
                </Anchor>
              )
              return (
                anchor && (
                  <>
                    Remember to adjust the {anchor} to be {maximum} or
                    lower.
                  </>
                )
              )
            }
          })
        }}
      />
      <Field.Number
        label="Amount"
        labelDescription={<>Should be same or lower than maximum.</>}
        path="/amount"
        required
        onBlurValidator={(amount: number, { connectWithPath }) => {
          const maximum = connectWithPath('/maximum').getValue()
          if (amount > maximum) {
            return new FormError('NumberField.errorMaximum', {
              messageValues: {
                maximum: maximum.toString(),
              },
            })
          }
        }}
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
`});function j(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return o||N(`Examples`,!1),g||N(`Examples.Alignment`,!0),S||N(`Examples.AllowNegative`,!0),A||N(`Examples.ConditionalInfo`,!0),y||N(`Examples.Disabled`,!0),C||N(`Examples.DisallowLeadingZeroes`,!0),m||N(`Examples.ExclusiveMinMax`,!0),p||N(`Examples.HorizontalLayout`,!0),d||N(`Examples.LabelAndDescription`,!0),l||N(`Examples.LabelAndValue`,!0),w||N(`Examples.Percentage`,!0),c||N(`Examples.Placeholder`,!0),h||N(`Examples.PrefixAndSuffix`,!0),T||N(`Examples.ValidateMaximumCustomError`,!0),x||N(`Examples.ValidateMinimum`,!0),b||N(`Examples.ValidateRequired`,!0),v||N(`Examples.Widths`,!0),u||N(`Examples.WithCustomMask`,!0),_||N(`Examples.WithHelp`,!0),k||N(`Examples.WithSlider`,!0),f||N(`Examples.WithStatus`,!0),E||N(`Examples.WithStepControls`,!0),O||N(`Examples.WithStepControlsDisabled`,!0),D||N(`Examples.WithStepControlsError`,!0),n||N(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(a,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Label and description`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,s.jsxs)(t.p,{children:[`This example uses `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Provider/`,children:`Field.Provider`}),` to set the `,(0,s.jsx)(t.code,{children:`layout`}),` to `,(0,s.jsx)(t.code,{children:`horizontal`}),` and `,(0,s.jsx)(t.code,{children:`layoutOptions`}),` to `,(0,s.jsx)(t.code,{children:`{ width: 'medium' }`}),` for all nested fields.`]}),`
`,(0,s.jsxs)(t.p,{children:[`The `,(0,s.jsx)(t.code,{children:`width`}),` of the horizontal label can be set to `,(0,s.jsx)(t.code,{children:`small`}),`, `,(0,s.jsx)(t.code,{children:`medium`}),`, `,(0,s.jsx)(t.code,{children:`large`}),` or a `,(0,s.jsx)(t.code,{children:`rem`}),` value.`]}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h4,{children:`With custom mask`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`With a status`}),`
`,(0,s.jsx)(t.p,{children:`This example demonstrates how the status message width adjusts according to the field width.`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h4,{children:`With help`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Exclusive minimum and exclusive maximum`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Prefix and suffix`}),`
`,(0,s.jsx)(t.p,{children:`You can also use a function as a prefix or suffix.`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Alignment`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`With help`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`With step controls`}),`
`,(0,s.jsx)(E,{}),`
`,(0,s.jsx)(t.h3,{children:`With step controls in conjunction with Slider`}),`
`,(0,s.jsx)(k,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled`}),`
`,(0,s.jsx)(y,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,s.jsx)(b,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Minimum`}),`
`,(0,s.jsx)(x,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Maximum and custom error message`}),`
`,(0,s.jsx)(T,{}),`
`,(0,s.jsx)(t.h3,{children:`Displaying messages - Conditional info message`}),`
`,(0,s.jsxs)(t.p,{children:[`You can provide a function to the `,(0,s.jsx)(t.code,{children:`info`}),`, `,(0,s.jsx)(t.code,{children:`warning`}),` or `,(0,s.jsx)(t.code,{children:`error`}),` properties that returns a message based on your conditions.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`<Field.String
  info={(value) => {
    if (value === '123') {
      return 'The value is 123'
    }
  }}
/>
`})}),`
`,(0,s.jsxs)(t.p,{children:[`Optionally, use the `,(0,s.jsx)(t.code,{children:`conditionally`}),` higher order function to show the message only when the field got changed (onChange) and blurred (onBlur).`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`<Field.String
  info={(value, { conditionally, getValueByPath, getFieldByPath }) => {
    if (value === '123') {
      // Show this message only when the field got changed and blurred.
      return conditionally(() => 'The value is 123')
    }
  }}
/>
`})}),`
`,(0,s.jsxs)(t.p,{children:[`You can also pass options to the `,(0,s.jsx)(t.code,{children:`conditionally`}),` function:`]}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`showInitially`}),` – display the message when the field is first rendered.`]}),`
`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`<Field.String
  info={(value, { conditionally, getValueByPath, getFieldByPath }) => {
    if (value === '123') {
      // Show this message only when the field got changed and blurred.
      return conditionally(() => 'The value is 123', {
        showInitially: true,
      })
    }
  }}
/>
`})}),`
`,(0,s.jsxs)(t.p,{children:[`Down below you can see an example of how to use the `,(0,s.jsx)(t.code,{children:`conditionally`}),` function. There are two input fields which depend on each other. Here we use `,(0,s.jsx)(t.code,{children:`info`}),` to show a message when the value of the first field is too low. While we use an error message when the value of the second field is more than what the first field has. The `,(0,s.jsx)(t.code,{children:`info`}),` on the first field will only be shown when the user has changed the value and blurred the field.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Read more about `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#validation-and-the-user-experience-ux`,children:`validation and the user experience`}),`.`]}),`
`,(0,s.jsx)(A,{}),`
`,(0,s.jsx)(t.h3,{children:`Percentage`}),`
`,(0,s.jsx)(w,{}),`
`,(0,s.jsx)(t.h3,{children:`Allow Negative`}),`
`,(0,s.jsx)(S,{}),`
`,(0,s.jsx)(t.h3,{children:`Disallow Leading Zeroes`}),`
`,(0,s.jsx)(C,{}),`
`,(0,s.jsx)(t.h3,{children:`Widths`}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsxs)(n,{children:[(0,s.jsx)(D,{}),(0,s.jsx)(O,{})]})]})}function M(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(j,{...e})}):j(e)}function N(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{M as default};
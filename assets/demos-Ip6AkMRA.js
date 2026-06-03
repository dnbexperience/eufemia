import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{X as r,t as i}from"./Anchor-ywdvt45E.js";import{c as a}from"./ToggleButton-D3NEk3jO.js";import{t as o}from"./Card-C6UABezd.js";import{pt as s}from"./Selection-DXfzor9j.js";import{t as c}from"./export-Df-7CzYN.js";import{t as l}from"./Slider-lEY9INSg.js";import{t as u}from"./Form-C16rVaXm.js";import{t as d}from"./Field-B5trC2Cn.js";import{W as f,o as p}from"./index-BCXtuv-b.js";import{t as m}from"./ComponentBox-B2X8809Z.js";var h=e({Alignment:()=>T,AllowNegative:()=>j,ConditionalInfo:()=>z,Disabled:()=>O,DisallowLeadingZeroes:()=>M,ExclusiveMinMax:()=>C,HorizontalLayout:()=>S,LabelAndDescription:()=>b,LabelAndValue:()=>v,Percentage:()=>N,Placeholder:()=>_,PrefixAndSuffix:()=>w,ValidateMaximumCustomError:()=>P,ValidateMinimum:()=>A,ValidateRequired:()=>k,Widths:()=>D,WithCustomMask:()=>y,WithHelp:()=>E,WithSlider:()=>R,WithStatus:()=>x,WithStepControls:()=>F,WithStepControlsDisabled:()=>L,WithStepControlsError:()=>I}),g=t(n()),_=()=>(0,g.jsx)(m,{stableName:`Placeholder`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  label="Label text"
  placeholder="Enter a number..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),v=()=>(0,g.jsx)(m,{stableName:`LabelAndValue`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  label="Label text"
  defaultValue={420000.25}
  onChange={(value) => console.log('onChange', value)}
/>
`}),y=()=>(0,g.jsx)(m,{stableName:`WithCustomMask`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  label="Label text"
  defaultValue={1234}
  mask={Array(4).fill(/\\d/)}
  onChange={(value) => console.log('onChange', value)}
/>
`}),b=()=>(0,g.jsx)(m,{"data-visual-test":`number-label-description`,stableName:`LabelAndDescription`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:u,Card:o,Field:d},children:`<Form.Card>
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
`}),x=()=>(0,g.jsx)(m,{"data-visual-test":`number-status`,stableName:`WithStatus`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:u,Card:o,Field:d},children:`<Form.Card>
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
`}),S=()=>(0,g.jsx)(m,{"data-visual-test":`number-horizontal-layout`,stableName:`HorizontalLayout`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:u,Card:o,Field:d,Provider:r},children:`<Form.Card>
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
`}),C=()=>(0,g.jsx)(m,{stableName:`ExclusiveMinMax`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  defaultValue={1000}
  label="Label text"
  allowNegative={false}
  required
  exclusiveMinimum={900}
  exclusiveMaximum={1000}
  validateInitially
/>
`}),w=()=>(0,g.jsx)(m,{stableName:`PrefixAndSuffix`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:a,Field:d},children:`<Flex.Stack>
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
`}),T=()=>(0,g.jsx)(m,{stableName:`Alignment`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:a,Field:d},children:`<Flex.Stack>
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
`}),E=()=>(0,g.jsx)(m,{stableName:`WithHelp`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  defaultValue={12345}
  label="Label text"
  help={{
    title: 'Help is available',
    content:
      'Here is what a team can do for you. . . . It allows you to help others do their best.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),D=()=>(0,g.jsx)(m,{hideCode:!0,"data-visual-test":`number-widths`,stableName:`Widths`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:a,Form:u,Field:d},children:`<Flex.Stack>
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
`}),O=()=>(0,g.jsx)(m,{stableName:`Disabled`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  defaultValue={135}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),k=()=>(0,g.jsx)(m,{stableName:`ValidateRequired`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  defaultValue={123}
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
/>
`}),A=()=>(0,g.jsx)(m,{stableName:`ValidateMinimum`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  defaultValue={300}
  label="Enter a number below 250 and blur to trigger error"
  onChange={(value) => console.log('onChange', value)}
  minimum={250}
/>
`}),j=()=>(0,g.jsx)(m,{stableName:`AllowNegative`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number allowNegative={false} />
`}),M=()=>(0,g.jsx)(m,{stableName:`DisallowLeadingZeroes`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number disallowLeadingZeroes />
`}),N=()=>(0,g.jsx)(m,{stableName:`Percentage`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  percent
  defaultValue={80}
  label="Percentage"
  onChange={(value) => console.log('onChange', value)}
  minimum={90}
/>
`}),P=()=>(0,g.jsx)(m,{stableName:`ValidateMaximumCustomError`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  label="Enter a number above 250 and blur to trigger error"
  defaultValue={200}
  maximum={250}
  errorMessages={{
    maximum: "You can't enter a number THAR large.. Max 250!",
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),F=()=>(0,g.jsx)(m,{"data-visual-test":`number-input-step-controls`,stableName:`WithStepControls`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  label="Label text"
  showStepControls
  minimum={0}
  maximum={100}
  step={10}
  defaultValue={50}
/>
`}),I=()=>(0,g.jsx)(m,{"data-visual-test":`number-input-step-controls-error`,stableName:`WithStepControlsError`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number
  label="Label text"
  showStepControls
  maximum={100}
  defaultValue={150}
  error={new Error('You done messed up, A-a-ron!')}
/>
`}),L=()=>(0,g.jsx)(m,{"data-visual-test":`number-input-step-controls-disabled`,stableName:`WithStepControlsDisabled`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:d},children:`<Field.Number label="Label text" showStepControls disabled />
`}),R=()=>(0,g.jsx)(m,{hideCode:!0,stableName:`WithSlider`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Grid:c,Field:d,Slider:l},noInline:!0,children:`const Component = () => {
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
`}),z=()=>(0,g.jsx)(m,{scope:{FormError:s},stableName:`ConditionalInfo`,sourceImports:[`import { useState } from 'react'`,`import { Slider, Grid, Flex, Anchor } from '@dnb/eufemia'`,`import { Field, Form, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:u,Card:o,Field:d,Anchor:i},noInline:!0,children:`render(
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
`});function B(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...f(),...e.components},{VisibleWhenVisualTest:n}=t;return h||H(`Examples`,!1),T||H(`Examples.Alignment`,!0),j||H(`Examples.AllowNegative`,!0),z||H(`Examples.ConditionalInfo`,!0),O||H(`Examples.Disabled`,!0),M||H(`Examples.DisallowLeadingZeroes`,!0),C||H(`Examples.ExclusiveMinMax`,!0),S||H(`Examples.HorizontalLayout`,!0),b||H(`Examples.LabelAndDescription`,!0),v||H(`Examples.LabelAndValue`,!0),N||H(`Examples.Percentage`,!0),_||H(`Examples.Placeholder`,!0),w||H(`Examples.PrefixAndSuffix`,!0),P||H(`Examples.ValidateMaximumCustomError`,!0),A||H(`Examples.ValidateMinimum`,!0),k||H(`Examples.ValidateRequired`,!0),D||H(`Examples.Widths`,!0),y||H(`Examples.WithCustomMask`,!0),E||H(`Examples.WithHelp`,!0),R||H(`Examples.WithSlider`,!0),x||H(`Examples.WithStatus`,!0),F||H(`Examples.WithStepControls`,!0),L||H(`Examples.WithStepControlsDisabled`,!0),I||H(`Examples.WithStepControlsError`,!0),n||H(`VisibleWhenVisualTest`,!0),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(t.h2,{children:`Demos`}),`
`,(0,g.jsx)(p,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,g.jsx)(t.h3,{children:`Label and value`}),`
`,(0,g.jsx)(v,{}),`
`,(0,g.jsx)(t.h3,{children:`Label and description`}),`
`,(0,g.jsx)(b,{}),`
`,(0,g.jsx)(t.h3,{children:`With a horizontal layout`}),`
`,(0,g.jsxs)(t.p,{children:[`This example uses `,(0,g.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Provider/`,children:`Field.Provider`}),` to set the `,(0,g.jsx)(t.code,{children:`layout`}),` to `,(0,g.jsx)(t.code,{children:`horizontal`}),` and `,(0,g.jsx)(t.code,{children:`layoutOptions`}),` to `,(0,g.jsx)(t.code,{children:`{ width: 'medium' }`}),` for all nested fields.`]}),`
`,(0,g.jsxs)(t.p,{children:[`The `,(0,g.jsx)(t.code,{children:`width`}),` of the horizontal label can be set to `,(0,g.jsx)(t.code,{children:`small`}),`, `,(0,g.jsx)(t.code,{children:`medium`}),`, `,(0,g.jsx)(t.code,{children:`large`}),` or a `,(0,g.jsx)(t.code,{children:`rem`}),` value.`]}),`
`,(0,g.jsx)(S,{}),`
`,(0,g.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,g.jsx)(_,{}),`
`,(0,g.jsx)(t.h4,{children:`With custom mask`}),`
`,(0,g.jsx)(y,{}),`
`,(0,g.jsx)(t.h3,{children:`With a status`}),`
`,(0,g.jsx)(t.p,{children:`This example demonstrates how the status message width adjusts according to the field width.`}),`
`,(0,g.jsx)(x,{}),`
`,(0,g.jsx)(t.h4,{children:`With help`}),`
`,(0,g.jsx)(E,{}),`
`,(0,g.jsx)(t.h3,{children:`Exclusive minimum and exclusive maximum`}),`
`,(0,g.jsx)(C,{}),`
`,(0,g.jsx)(t.h3,{children:`Prefix and suffix`}),`
`,(0,g.jsx)(t.p,{children:`You can also use a function as a prefix or suffix.`}),`
`,(0,g.jsx)(w,{}),`
`,(0,g.jsx)(t.h3,{children:`Alignment`}),`
`,(0,g.jsx)(T,{}),`
`,(0,g.jsx)(t.h3,{children:`With help`}),`
`,(0,g.jsx)(E,{}),`
`,(0,g.jsx)(t.h3,{children:`With step controls`}),`
`,(0,g.jsx)(F,{}),`
`,(0,g.jsx)(t.h3,{children:`With step controls in conjunction with Slider`}),`
`,(0,g.jsx)(R,{}),`
`,(0,g.jsx)(t.h3,{children:`Disabled`}),`
`,(0,g.jsx)(O,{}),`
`,(0,g.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,g.jsx)(k,{}),`
`,(0,g.jsx)(t.h3,{children:`Validation - Minimum`}),`
`,(0,g.jsx)(A,{}),`
`,(0,g.jsx)(t.h3,{children:`Validation - Maximum and custom error message`}),`
`,(0,g.jsx)(P,{}),`
`,(0,g.jsx)(t.h3,{children:`Displaying messages - Conditional info message`}),`
`,(0,g.jsxs)(t.p,{children:[`You can provide a function to the `,(0,g.jsx)(t.code,{children:`info`}),`, `,(0,g.jsx)(t.code,{children:`warning`}),` or `,(0,g.jsx)(t.code,{children:`error`}),` properties that returns a message based on your conditions.`]}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-tsx`,children:`<Field.String
  info={(value) => {
    if (value === '123') {
      return 'The value is 123'
    }
  }}
/>
`})}),`
`,(0,g.jsxs)(t.p,{children:[`Optionally, use the `,(0,g.jsx)(t.code,{children:`conditionally`}),` higher order function to show the message only when the field got changed (onChange) and blurred (onBlur).`]}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-tsx`,children:`<Field.String
  info={(value, { conditionally, getValueByPath, getFieldByPath }) => {
    if (value === '123') {
      // Show this message only when the field got changed and blurred.
      return conditionally(() => 'The value is 123')
    }
  }}
/>
`})}),`
`,(0,g.jsxs)(t.p,{children:[`You can also pass options to the `,(0,g.jsx)(t.code,{children:`conditionally`}),` function:`]}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`showInitially`}),` – display the message when the field is first rendered.`]}),`
`]}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-tsx`,children:`<Field.String
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
`,(0,g.jsxs)(t.p,{children:[`Down below you can see an example of how to use the `,(0,g.jsx)(t.code,{children:`conditionally`}),` function. There are two input fields which depend on each other. Here we use `,(0,g.jsx)(t.code,{children:`info`}),` to show a message when the value of the first field is too low. While we use an error message when the value of the second field is more than what the first field has. The `,(0,g.jsx)(t.code,{children:`info`}),` on the first field will only be shown when the user has changed the value and blurred the field.`]}),`
`,(0,g.jsxs)(t.p,{children:[`Read more about `,(0,g.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#validation-and-the-user-experience-ux`,children:`validation and the user experience`}),`.`]}),`
`,(0,g.jsx)(z,{}),`
`,(0,g.jsx)(t.h3,{children:`Percentage`}),`
`,(0,g.jsx)(N,{}),`
`,(0,g.jsx)(t.h3,{children:`Allow Negative`}),`
`,(0,g.jsx)(j,{}),`
`,(0,g.jsx)(t.h3,{children:`Disallow Leading Zeroes`}),`
`,(0,g.jsx)(M,{}),`
`,(0,g.jsx)(t.h3,{children:`Widths`}),`
`,(0,g.jsx)(D,{}),`
`,(0,g.jsxs)(n,{children:[(0,g.jsx)(I,{}),(0,g.jsx)(L,{})]})]})}function V(e={}){let{wrapper:t}={...f(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(B,{...e})}):B(e)}function H(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{V as default};
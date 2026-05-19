import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Alignment:()=>f,Composition:()=>s,CompositionError:()=>u,CompositionMultipleStatuses:()=>d,CompositionWithHelpButton:()=>l,CompositionWithLabel:()=>c,Wrapping:()=>p}),o=e(n()),s=()=>(0,o.jsx)(r,{"data-visual-test":`forms-field-block-composition`,stableName:`Composition`,children:`<Field.Composition info="Info at the bottom" width="large">
  <Field.String label="Field A with a long label" width="medium" />
  <Field.String label="Field B" width="stretch" />
</Field.Composition>
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`forms-field-block-composition-with-label`,stableName:`CompositionWithLabel`,children:`<Field.Composition label="A legend for the fieldset" width="large">
  <Field.String label="Field label" width="stretch" />
  <Field.Number width="small" placeholder="0000" />
</Field.Composition>
`}),l=()=>(0,o.jsx)(r,{"data-visual-test":`forms-field-block-composition-with-help-button`,stableName:`CompositionWithHelpButton`,children:`<Field.Composition
  label="A legend for the fieldset"
  width="large"
  help={{
    title: 'Help title',
    content: 'Help content',
    open: true,
  }}
>
  <Field.String
    label="Field label"
    help={{
      title: 'Help title',
      content: 'Help content',
      open: true,
    }}
  />
  <Field.String
    label="Field label"
    width="stretch"
    help={{
      title: 'Help title',
      content: 'Help content',
      open: true,
    }}
  />
</Field.Composition>
`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`forms-field-block-composition-error`,stableName:`CompositionError`,children:`<Field.Composition error={new Error('Error at the bottom')} width="large">
  <Field.String label="Field A" width="stretch" />
  <Field.String
    label="Field B with a long label that wraps"
    width="medium"
  />
</Field.Composition>
`}),d=()=>(0,o.jsx)(r,{"data-visual-test":`forms-field-block-composition-statuses`,stableName:`CompositionMultipleStatuses`,children:`<Field.Composition label="Label text" info="FieldBlock info">
  <Field.String width="small" minLength={3} warning="Warning message" />
  <Field.Number minimum={10} info="Field info" />
</Field.Composition>
`}),f=()=>(0,o.jsx)(r,{"data-visual-test":`forms-field-block-composition-alignment`,stableName:`Alignment`,children:`<Field.Composition label="Label text" align="center">
  <Field.Number width="small" defaultValue={0} showStepControls />
  <Field.Boolean />
</Field.Composition>
`}),p=()=>(0,o.jsx)(r,{scope:{sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},"data-visual-test":`forms-field-block-composition-wrapping`,stableName:`Wrapping`,children:`<Flex.Stack>
  <Form.Card>
    <Form.SubHeading>Breaking word with 61 characters</Form.SubHeading>
    <Field.Composition label={sixtyOneChars}>
      <Field.String value="string" />
      <Field.String value="string" />
    </Field.Composition>
    <Field.Composition
      label={sixtyOneChars}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      <Field.String value="string" />
      <Field.String value="string" />
    </Field.Composition>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>
      Breaking a sentence of 61 characters that include a space
    </Form.SubHeading>
    <Field.Composition label={sixtyOneCharsIncludingASpace}>
      <Field.String value="string" />
      <Field.String value="string" />
    </Field.Composition>
    <Field.Composition
      label={sixtyOneCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      <Field.String value="string" />
      <Field.String value="string" />
    </Field.Composition>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
    <Field.Composition
      label={fiftyEightCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      <Field.String value="string" />
      <Field.String value="string" />
    </Field.Composition>
  </Form.Card>
</Flex.Stack>
`});function m(e){let t={h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||g(`Examples`,!1),f||g(`Examples.Alignment`,!0),s||g(`Examples.Composition`,!0),u||g(`Examples.CompositionError`,!0),d||g(`Examples.CompositionMultipleStatuses`,!0),l||g(`Examples.CompositionWithHelpButton`,!0),c||g(`Examples.CompositionWithLabel`,!0),p||g(`Examples.Wrapping`,!0),n||g(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Composition field`}),`
`,(0,o.jsx)(t.p,{children:`You may adjust the widths to your needs.`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Composition with a label`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Composition of multiple statuses`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Composition field with error`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Alignment`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsxs)(n,{children:[(0,o.jsx)(l,{}),(0,o.jsx)(p,{})]})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
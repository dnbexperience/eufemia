import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({Alignment:()=>d,Composition:()=>o,CompositionError:()=>l,CompositionMultipleStatuses:()=>u,CompositionWithHelpButton:()=>c,CompositionWithLabel:()=>s,Wrapping:()=>f}),a=t(),o=()=>(0,a.jsx)(n,{"data-visual-test":`forms-field-block-composition`,children:`<Field.Composition info="Info at the bottom" width="large">
  <Field.String label="Field A with a long label" width="medium" />
  <Field.String label="Field B" width="stretch" />
</Field.Composition>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`forms-field-block-composition-with-label`,children:`<Field.Composition label="A legend for the fieldset" width="large">
  <Field.String label="Field label" width="stretch" />
  <Field.Number width="small" placeholder="0000" />
</Field.Composition>
`}),c=()=>(0,a.jsx)(n,{"data-visual-test":`forms-field-block-composition-with-help-button`,children:`<Field.Composition
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
`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`forms-field-block-composition-error`,children:`<Field.Composition error={new Error('Error at the bottom')} width="large">
  <Field.String label="Field A" width="stretch" />
  <Field.String
    label="Field B with a long label that wraps"
    width="medium"
  />
</Field.Composition>
`}),u=()=>(0,a.jsx)(n,{"data-visual-test":`forms-field-block-composition-statuses`,children:`<Field.Composition label="Label text" info="FieldBlock info">
  <Field.String width="small" minLength={3} warning="Warning message" />
  <Field.Number minimum={10} info="Field info" />
</Field.Composition>
`}),d=()=>(0,a.jsx)(n,{"data-visual-test":`forms-field-block-composition-alignment`,children:`<Field.Composition label="Label text" align="center">
  <Field.Number width="small" defaultValue={0} showStepControls />
  <Field.Boolean />
</Field.Composition>
`}),f=()=>(0,a.jsx)(n,{scope:{sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},"data-visual-test":`forms-field-block-composition-wrapping`,children:`<Flex.Stack>
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
`});function p(e){let t={h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||h(`Examples`,!1),d||h(`Examples.Alignment`,!0),o||h(`Examples.Composition`,!0),l||h(`Examples.CompositionError`,!0),u||h(`Examples.CompositionMultipleStatuses`,!0),c||h(`Examples.CompositionWithHelpButton`,!0),s||h(`Examples.CompositionWithLabel`,!0),f||h(`Examples.Wrapping`,!0),n||h(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Composition field`}),`
`,(0,a.jsx)(t.p,{children:`You may adjust the widths to your needs.`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Composition with a label`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Composition of multiple statuses`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Composition field with error`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Alignment`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsxs)(n,{children:[(0,a.jsx)(c,{}),(0,a.jsx)(f,{})]})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
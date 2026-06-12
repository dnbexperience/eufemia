import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-T4E3Coih.js";import{t as i}from"./Card-Dsou21Li.js";import{t as a}from"./Form-B9l6EvGx.js";import{t as o}from"./Field-DHicZJEj.js";import{K as s}from"./index-CsG353ar.js";import{t as c}from"./ComponentBox-Cb1rLw_D.js";var l=e({Alignment:()=>g,Composition:()=>d,CompositionError:()=>m,CompositionMultipleStatuses:()=>h,CompositionWithHelpButton:()=>p,CompositionWithLabel:()=>f,Wrapping:()=>_}),u=t(n()),d=()=>(0,u.jsx)(c,{"data-visual-test":`forms-field-block-composition`,stableName:`Composition`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:o},children:`<Field.Composition info="Info at the bottom" width="large">
  <Field.String label="Field A with a long label" width="medium" />
  <Field.String label="Field B" width="stretch" />
</Field.Composition>
`}),f=()=>(0,u.jsx)(c,{"data-visual-test":`forms-field-block-composition-with-label`,stableName:`CompositionWithLabel`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:o},children:`<Field.Composition label="A legend for the fieldset" width="large">
  <Field.String label="Field label" width="stretch" />
  <Field.Number width="small" placeholder="0000" />
</Field.Composition>
`}),p=()=>(0,u.jsx)(c,{"data-visual-test":`forms-field-block-composition-with-help-button`,stableName:`CompositionWithHelpButton`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:o},children:`<Field.Composition
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
`}),m=()=>(0,u.jsx)(c,{"data-visual-test":`forms-field-block-composition-error`,stableName:`CompositionError`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:o},children:`<Field.Composition error={new Error('Error at the bottom')} width="large">
  <Field.String label="Field A" width="stretch" />
  <Field.String
    label="Field B with a long label that wraps"
    width="medium"
  />
</Field.Composition>
`}),h=()=>(0,u.jsx)(c,{"data-visual-test":`forms-field-block-composition-statuses`,stableName:`CompositionMultipleStatuses`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:o},children:`<Field.Composition label="Label text" info="FieldBlock info">
  <Field.String width="small" minLength={3} warning="Warning message" />
  <Field.Number minimum={10} info="Field info" />
</Field.Composition>
`}),g=()=>(0,u.jsx)(c,{"data-visual-test":`forms-field-block-composition-alignment`,stableName:`Alignment`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:o},children:`<Field.Composition label="Label text" align="center">
  <Field.Number width="small" defaultValue={0} showStepControls />
  <Field.Boolean />
</Field.Composition>
`}),_=()=>(0,u.jsx)(c,{scope:{sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},"data-visual-test":`forms-field-block-composition-wrapping`,stableName:`Wrapping`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:r,Form:a,Card:i,Field:o},children:`<Flex.Stack>
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
`});function v(e){let t={h2:`h2`,h3:`h3`,p:`p`,...s(),...e.components},{VisibleWhenVisualTest:n}=t;return l||b(`Examples`,!1),g||b(`Examples.Alignment`,!0),d||b(`Examples.Composition`,!0),m||b(`Examples.CompositionError`,!0),h||b(`Examples.CompositionMultipleStatuses`,!0),p||b(`Examples.CompositionWithHelpButton`,!0),f||b(`Examples.CompositionWithLabel`,!0),_||b(`Examples.Wrapping`,!0),n||b(`VisibleWhenVisualTest`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Composition field`}),`
`,(0,u.jsx)(t.p,{children:`You may adjust the widths to your needs.`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Composition with a label`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Composition of multiple statuses`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Composition field with error`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Alignment`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsxs)(n,{children:[(0,u.jsx)(p,{}),(0,u.jsx)(_,{})]})]})}function y(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};
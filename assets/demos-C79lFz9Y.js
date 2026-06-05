import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-BMi2PwcS.js";import{t as i}from"./Card-ClZNWqpG.js";import{t as a}from"./Form-C8lTzZqR.js";import{t as o}from"./Value-Cjs3mKU7.js";import{K as s}from"./index-Bx3ttow-.js";import{t as c}from"./ComponentBox-CG7uqrFy.js";var l=e({Basic:()=>d,CombineValuesInSummaryList:()=>p,WidthComparison:()=>f,WithHelp:()=>g,WithSummaryList:()=>m,WithSummaryListGridLayout:()=>h,Wrapping:()=>_}),u=t(n()),d=()=>(0,u.jsx)(c,{stableName:`Basic`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:o},children:`<Value.Composition>
  <Value.String label="Label A" value="value" />
  <Value.Number label="Label B" value={123} />
</Value.Composition>
`}),f=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-composition-default`,stableName:`WidthComparison`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:o},children:`<Value.Composition gap="large">
  <Value.String
    maxWidth="medium"
    label="Medium maxWidth"
    value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
  />
  <Value.String
    label="Without a width"
    value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
  />
</Value.Composition>
`}),p=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-composition-summary-list-combined`,stableName:`CombineValuesInSummaryList`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:o},children:`<Value.SummaryList>
  <Value.Composition label="Label">
    <Value.String value="value" />
    <Value.Number value={123} />
  </Value.Composition>
</Value.SummaryList>
`}),m=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-composition-summary-list`,stableName:`WithSummaryList`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Card:i,Value:o},children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
    streetName: 'Øvraørnefjeddstakkslåttåveien',
    streetNr: 9998,
    streetId: 'H0301',
    postalCode: '9713',
    city: 'Russenes',
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList>
      <Value.Composition label="Name">
        <Value.String path="/firstName" />
        <Value.String path="/lastName" />
      </Value.Composition>

      <Value.Composition label="Street">
        <Value.String path="/streetName" />
        <Value.Number path="/streetNr" />
        <Value.String path="/streetId" />
      </Value.Composition>

      <Value.Composition label="City">
        <Value.String path="/postalCode" />
        <Value.String path="/city" />
      </Value.Composition>
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`}),h=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-composition-summary-list-grid`,stableName:`WithSummaryListGridLayout`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Card:i,Value:o},children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
    streetName: 'Øvraørnefjeddstakkslåttåveien',
    streetNr: 9998,
    streetId: 'H0301',
    postalCode: '9713',
    city: 'Russenes',
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList layout="grid">
      <Value.Composition label="Name">
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.Composition>

      <Value.Composition label="Street">
        <Value.String path="/streetName" />
        <Value.Number path="/streetNr" />
        <Value.String path="/streetId" />
      </Value.Composition>

      <Value.PostalCodeAndCity
        postalCode={{
          path: '/postalCode',
        }}
        city={{
          path: '/city',
        }}
      />
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`}),g=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-composition-help`,stableName:`WithHelp`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:r,Value:o,Form:a,Card:i},children:`<Flex.Stack>
  <Value.Composition
    label="Label with help"
    help={{
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
  >
    <Value.String value="value" />
    <Value.Number value={123} />
  </Value.Composition>

  <Form.Card>
    <Value.SummaryList>
      <Value.Composition
        label="Label with help inside SummaryList"
        help={{
          title: 'Hva betyr lånebeløp?',
          content: 'Dette er hvor mye du har tenkt å låne totalt.',
        }}
      >
        <Value.String value="value" />
        <Value.Number value={123} />
      </Value.Composition>
      <Value.String value="Another value" />
    </Value.SummaryList>
  </Form.Card>
</Flex.Stack>
`}),_=()=>(0,u.jsx)(c,{scope:{sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},"data-visual-test":`forms-value-composition-wrapping`,stableName:`Wrapping`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:r,Form:a,Card:i,Value:o},children:`<Flex.Stack>
  <Form.Card>
    <Form.SubHeading>Breaking word with 61 characters</Form.SubHeading>
    <Value.Composition label={sixtyOneChars}>
      <Value.String value={sixtyOneChars} />
      <Value.String value={sixtyOneChars} />
    </Value.Composition>
    <Value.Composition
      label={sixtyOneChars}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      <Value.String value={sixtyOneChars} />
      <Value.String value={sixtyOneChars} />
    </Value.Composition>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>
      Breaking a sentence of 61 characters that include a space
    </Form.SubHeading>
    <Value.Composition label={sixtyOneCharsIncludingASpace}>
      <Value.String value={sixtyOneCharsIncludingASpace} />
      <Value.String value={sixtyOneCharsIncludingASpace} />
    </Value.Composition>
    <Value.Composition
      label={sixtyOneCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      <Value.String value={sixtyOneCharsIncludingASpace} />
      <Value.String value={sixtyOneCharsIncludingASpace} />
    </Value.Composition>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
    <Value.Composition
      label={fiftyEightCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      <Value.String value={'value'} />
      <Value.String value={'value'} />
    </Value.Composition>
  </Form.Card>
</Flex.Stack>
`});function v(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components},{VisibleWhenVisualTest:n}=t;return l||b(`Examples`,!1),d||b(`Examples.Basic`,!0),p||b(`Examples.CombineValuesInSummaryList`,!0),f||b(`Examples.WidthComparison`,!0),g||b(`Examples.WithHelp`,!0),m||b(`Examples.WithSummaryList`,!0),h||b(`Examples.WithSummaryListGridLayout`,!0),_||b(`Examples.Wrapping`,!0),n||b(`VisibleWhenVisualTest`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`In SummaryList`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`Inside a plain SummaryList`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Inside a SummaryList with grid layout`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Width comparison`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`With help`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(n,{children:(0,u.jsx)(_,{})})]})}function y(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};
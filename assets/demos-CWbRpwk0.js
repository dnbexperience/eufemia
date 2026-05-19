import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Basic:()=>s,CombineValuesInSummaryList:()=>l,WidthComparison:()=>c,WithHelp:()=>f,WithSummaryList:()=>u,WithSummaryListGridLayout:()=>d,Wrapping:()=>p}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Basic`,children:`<Value.Composition>
  <Value.String label="Label A" value="value" />
  <Value.Number label="Label B" value={123} />
</Value.Composition>
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`forms-value-composition-default`,stableName:`WidthComparison`,children:`<Value.Composition gap="large">
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
`}),l=()=>(0,o.jsx)(r,{"data-visual-test":`forms-value-composition-summary-list-combined`,stableName:`CombineValuesInSummaryList`,children:`<Value.SummaryList>
  <Value.Composition label="Label">
    <Value.String value="value" />
    <Value.Number value={123} />
  </Value.Composition>
</Value.SummaryList>
`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`forms-value-composition-summary-list`,stableName:`WithSummaryList`,children:`<Form.Handler
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
`}),d=()=>(0,o.jsx)(r,{"data-visual-test":`forms-value-composition-summary-list-grid`,stableName:`WithSummaryListGridLayout`,children:`<Form.Handler
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
`}),f=()=>(0,o.jsx)(r,{"data-visual-test":`forms-value-composition-help`,stableName:`WithHelp`,children:`<Flex.Stack>
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
`}),p=()=>(0,o.jsx)(r,{scope:{sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},"data-visual-test":`forms-value-composition-wrapping`,stableName:`Wrapping`,children:`<Flex.Stack>
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
`});function m(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||g(`Examples`,!1),s||g(`Examples.Basic`,!0),l||g(`Examples.CombineValuesInSummaryList`,!0),c||g(`Examples.WidthComparison`,!0),f||g(`Examples.WithHelp`,!0),u||g(`Examples.WithSummaryList`,!0),d||g(`Examples.WithSummaryListGridLayout`,!0),p||g(`Examples.Wrapping`,!0),n||g(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`In SummaryList`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Inside a plain SummaryList`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Inside a SummaryList with grid layout`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Width comparison`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(p,{})})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};
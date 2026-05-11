import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({Basic:()=>o,CombineValuesInSummaryList:()=>c,WidthComparison:()=>s,WithHelp:()=>d,WithSummaryList:()=>l,WithSummaryListGridLayout:()=>u,Wrapping:()=>f}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.Composition>
  <Value.String label="Label A" value="value" />
  <Value.Number label="Label B" value={123} />
</Value.Composition>
`}),s=()=>(0,a.jsx)(n,{"data-visual-test":`forms-value-composition-default`,children:`<Value.Composition gap="large">
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
`}),c=()=>(0,a.jsx)(n,{"data-visual-test":`forms-value-composition-summary-list-combined`,children:`<Value.SummaryList>
  <Value.Composition label="Label">
    <Value.String value="value" />
    <Value.Number value={123} />
  </Value.Composition>
</Value.SummaryList>
`}),l=()=>(0,a.jsx)(n,{"data-visual-test":`forms-value-composition-summary-list`,children:`<Form.Handler
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
`}),u=()=>(0,a.jsx)(n,{"data-visual-test":`forms-value-composition-summary-list-grid`,children:`<Form.Handler
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
`}),d=()=>(0,a.jsx)(n,{"data-visual-test":`forms-value-composition-help`,children:`<Flex.Stack>
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
`}),f=()=>(0,a.jsx)(n,{scope:{sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},"data-visual-test":`forms-value-composition-wrapping`,children:`<Flex.Stack>
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
`});function p(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return i||h(`Examples`,!1),o||h(`Examples.Basic`,!0),c||h(`Examples.CombineValuesInSummaryList`,!0),s||h(`Examples.WidthComparison`,!0),d||h(`Examples.WithHelp`,!0),l||h(`Examples.WithSummaryList`,!0),u||h(`Examples.WithSummaryListGridLayout`,!0),f||h(`Examples.Wrapping`,!0),n||h(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`In SummaryList`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Inside a plain SummaryList`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Inside a SummaryList with grid layout`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Width comparison`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(n,{children:(0,a.jsx)(f,{})})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};
import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";var i=t({AnimatedVisibility:()=>v,CombinedLayout:()=>p,DefaultLayout:()=>o,DefaultLayoutWithHelp:()=>l,GridLayout:()=>s,GridLayoutWithHelp:()=>u,GridLayoutWithHelpAndLabel:()=>d,HelpButton:()=>y,HorizontalLayout:()=>c,HorizontalLayoutWithHelp:()=>f,HorizontalLayoutWithoutLabel:()=>g,InheritLabel:()=>h,InheritVisibility:()=>m,MaxWidth:()=>b,WithHelpInInfoOverlay:()=>_}),a=e(n()),o=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-default`,stableName:`DefaultLayout`,children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList>
      <Value.Name.First path="/firstName" />
      <Value.Name.Last path="/lastName" />
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`}),s=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-grid`,stableName:`GridLayout`,children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList layout="grid">
      <Value.Name.First path="/firstName" />
      <Value.Name.Last path="/lastName" />
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`}),c=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-horizontal`,stableName:`HorizontalLayout`,children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList layout="horizontal">
      <Value.Name.First path="/firstName" />
      <Value.Name.Last path="/lastName" />
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`}),l=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-default-with-help`,stableName:`DefaultLayoutWithHelp`,children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
    nickName: 'JD',
    streetName: 'Osloveien',
    streetNr: 12,
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList>
      <Value.Name.First
        path="/firstName"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      />
      <Value.Name.Last path="/lastName" />
      <Value.String
        path="/nickName"
        label="kallenavn"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      />
      <Value.Composition
        label="Street"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Value.String path="/streetName" />
        <Value.Number
          path="/streetNr"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
      </Value.Composition>
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`}),u=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-grid-with-help`,stableName:`GridLayoutWithHelp`,children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
    nickName: 'JD',
    streetName: 'Osloveien',
    streetNr: 12,
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList layout="grid">
      <Value.Name.First
        path="/firstName"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      />
      <Value.Name.Last path="/lastName" />
      <Value.String
        path="/nickName"
        label="kallenavn"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      />
      <Value.Composition
        label="Street"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Value.String path="/streetName" />
        <Value.Number
          path="/streetNr"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
      </Value.Composition>
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`}),d=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-grid-with-help-and-label`,stableName:`GridLayoutWithHelpAndLabel`,children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
    nickName: 'JD',
    streetName: 'Osloveien',
    streetNr: 12,
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList layout="grid">
      <Value.Composition
        label="Street"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Value.String path="/streetName" label="Label" />
        <Value.Number path="/streetNr" label="Label" />
      </Value.Composition>
      <Value.Composition
        label="Street"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Value.String
          path="/streetName"
          label="Label"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
        <Value.Number
          path="/streetNr"
          label="Label"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
      </Value.Composition>
      <Value.Composition label="Street">
        <Value.String
          path="/streetName"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
        <Value.Number
          path="/streetNr"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
      </Value.Composition>
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`}),f=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-horizontal-with-help`,stableName:`HorizontalLayoutWithHelp`,children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
    nickName: 'JD',
    streetName: 'Osloveien',
    streetNr: 12,
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList layout="horizontal">
      <Value.Name.First
        path="/firstName"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      />
      <Value.Name.Last path="/lastName" />
      <Value.String
        path="/nickName"
        label="kallenavn"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      />
      <Value.Composition
        label="Street"
        help={{
          open: true,
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Value.String
          path="/streetName"
          label="label"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
        <Value.Number
          path="/streetNr"
          label="label"
          help={{
            open: true,
            title: 'Help title',
            content: 'Help content',
          }}
        />
      </Value.Composition>
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`}),p=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-combined`,stableName:`CombinedLayout`,children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
    streetName: 'Osloveien',
    streetNr: 12,
    postalCode: '1234',
    city: 'Oslo',
  }}
>
  <Form.Card>
    <Form.SubHeading>Subheading</Form.SubHeading>

    <Value.SummaryList>
      <Value.Name.First path="/firstName" />
      <Value.Name.Last path="/lastName" />

      <Value.Composition label="Street">
        <Value.String path="/streetName" />
        <Value.Number path="/streetNr" />
      </Value.Composition>

      <Value.Composition label="City">
        <Value.String path="/postalCode" />
        <Value.String path="/city" />
      </Value.Composition>
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`});function m(){return(0,a.jsx)(r,{stableName:`InheritVisibility`,children:`<Form.Handler>
  <Form.Card>
    <Field.Boolean
      variant="button"
      path="/isVisible"
      defaultValue={true}
    />

    <Form.Visibility pathTrue="/isVisible" animate>
      <Field.Name.First path="/foo" defaultValue="foo" />
      <Field.Name.Last path="/bar" defaultValue="bar" />
    </Form.Visibility>

    <Value.SummaryList inheritVisibility>
      <Value.Name.First path="/foo" />
      <Value.Name.First path="/bar" />
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`})}function h(){return(0,a.jsx)(r,{stableName:`InheritLabel`,children:`<Form.Handler>
  <Form.Card>
    <Field.String path="/foo" defaultValue="foo" label="foo label" />
    <Field.String path="/bar" defaultValue="bar" label="bar label" />

    <Value.SummaryList inheritLabel>
      <Value.String path="/foo" />
      <Value.String path="/bar" />
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`})}var g=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-empty-label`,stableName:`HorizontalLayoutWithoutLabel`,children:`<Value.SummaryList layout="horizontal">
  <Value.String value="foo" label="Foo" />
  <Value.String value="bar" />
  <Value.String value="baz" label="Baz" />
</Value.SummaryList>
`}),_=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-with-help-in-info-overlay`,stableName:`WithHelpInInfoOverlay`,children:`<Form.Handler
  data={{
    firstName: 'John',
    lastName: 'Doe',
  }}
>
  <Form.InfoOverlay>
    <Value.SummaryList>
      <Value.Name.First
        path="/firstName"
        help={{
          title: 'Help title',
          content: 'Help content.',
        }}
      />
      <Value.Name.Last
        path="/lastName"
        help={{
          title: 'Help title',
          content: 'Help content.',
        }}
      />
    </Value.SummaryList>
  </Form.InfoOverlay>
</Form.Handler>
`});function v(){return(0,a.jsx)(r,{stableName:`AnimatedVisibility`,children:`<Form.Handler>
  <Flex.Stack>
    <Field.Boolean
      label="Make second field visible when toggled"
      path="/toggleValue"
      variant="checkbox"
    />

    <Form.Card>
      <Value.SummaryList>
        <Value.String label="Label" value="First field" />

        <Form.Visibility pathTrue="/toggleValue" animate>
          <Value.String label="Label" value="Second field" />
        </Form.Visibility>
      </Value.SummaryList>
    </Form.Card>
  </Flex.Stack>
</Form.Handler>
`})}var y=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-with-help-button`,stableName:`HelpButton`,children:`<Form.Handler>
  <Flex.Stack>
    <Form.Card>
      <Value.SummaryList>
        <Value.Boolean
          label={
            'Vil foretaket være involvert i, eller drive virksomhet knyttet til virtuell valuta?'
          }
          help={{
            open: true,
            title: 'Virtuell valuta',
            content:
              'For eksempel i forbindelse med veksling, oppbevaring, utvinning eller investering i kryptovaluta.',
          }}
          value={false}
        />
        <Value.Boolean
          label={
            'Skal foretaket drive med betalingsformidling som hovedvirksomhet eller som tilleggsvirksomhet til annen næring?'
          }
          help={{
            open: true,
            title: 'Betalingsformidling',
            content:
              'For eksempel betalingsforetak, agent, filial eller tilsvarende virksomhet som krever konsesjon.',
          }}
          value={false}
        />
      </Value.SummaryList>
      <Value.Boolean
        label={'Er foretaket registreringspliktig hos Finanstilsynet?'}
        help={{
          open: true,
          title: 'Registreringspliktig',
          content:
            'Driver virksomhet innenfor eiendomsmegling, inkasso, finans eller regnskapstjenester kan foretaket være regnskapspliktig.',
        }}
        value={true}
      />
    </Form.Card>
  </Flex.Stack>
</Form.Handler>
`}),b=()=>(0,a.jsx)(r,{"data-visual-test":`forms-value-summary-list-with-max-width`,stableName:`MaxWidth`,children:`<Form.Handler>
  <Form.Card>
    <Value.SummaryList>
      <Value.String
        label="No maxWidth: This label is long so we can validate that the label can be longer."
        value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
      />
      <Value.String
        label="maxWidth='small': This label is long so we can validate that the label can be longer."
        maxWidth="small"
        value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
      />
      <Value.String
        label="maxWidth='medium': This label is long so we can validate that the label can be longer."
        maxWidth="medium"
        value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
      />
      <Value.String
        label="maxWidth='large': This label is long so we can validate that the label can be longer."
        maxWidth="large"
        value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
      />
      <Value.String
        label="maxWidth='auto': This label is long so we can validate that the label can be longer."
        maxWidth="auto"
        value="This content is long so we can see the maxWidth defined. It
            should wrap at a certain amount of characters."
      />
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`});export{i as a,d as c,f as d,g as f,_ as g,b as h,l as i,y as l,m,p as n,s as o,h as p,o as r,u as s,v as t,c as u};
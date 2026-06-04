import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-BtQrsiHY.js";import{t as i}from"./Card--_AKADDp.js";import{t as a}from"./Form-913YPZs6.js";import{t as o}from"./Field-CbVmykdw.js";import{t as s}from"./Value-C2hl5_67.js";import{t as c}from"./ComponentBox-CE7bpcJy.js";var l=e({AnimatedVisibility:()=>C,CombinedLayout:()=>v,DefaultLayout:()=>d,DefaultLayoutWithHelp:()=>m,GridLayout:()=>f,GridLayoutWithHelp:()=>h,GridLayoutWithHelpAndLabel:()=>g,HelpButton:()=>w,HorizontalLayout:()=>p,HorizontalLayoutWithHelp:()=>_,HorizontalLayoutWithoutLabel:()=>x,InheritLabel:()=>b,InheritVisibility:()=>y,MaxWidth:()=>T,WithHelpInInfoOverlay:()=>S}),u=t(n()),d=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-default`,stableName:`DefaultLayout`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Value:s},children:`<Form.Handler
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
`}),f=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-grid`,stableName:`GridLayout`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Value:s},children:`<Form.Handler
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
`}),p=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-horizontal`,stableName:`HorizontalLayout`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Value:s},children:`<Form.Handler
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
`}),m=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-default-with-help`,stableName:`DefaultLayoutWithHelp`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Value:s},children:`<Form.Handler
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
`}),h=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-grid-with-help`,stableName:`GridLayoutWithHelp`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Value:s},children:`<Form.Handler
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
`}),g=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-grid-with-help-and-label`,stableName:`GridLayoutWithHelpAndLabel`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Value:s},children:`<Form.Handler
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
`}),_=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-horizontal-with-help`,stableName:`HorizontalLayoutWithHelp`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Value:s},children:`<Form.Handler
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
`}),v=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-combined`,stableName:`CombinedLayout`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Value:s},children:`<Form.Handler
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
`});function y(){return(0,u.jsx)(c,{stableName:`InheritVisibility`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Field:o,Value:s},children:`<Form.Handler>
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
`})}function b(){return(0,u.jsx)(c,{stableName:`InheritLabel`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Field:o,Value:s},children:`<Form.Handler>
  <Form.Card>
    <Field.String path="/foo" defaultValue="foo" label="foo label" />
    <Field.String path="/bar" defaultValue="bar" label="bar label" />

    <Value.SummaryList inheritLabel>
      <Value.String path="/foo" />
      <Value.String path="/bar" />
    </Value.SummaryList>
  </Form.Card>
</Form.Handler>
`})}var x=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-empty-label`,stableName:`HorizontalLayoutWithoutLabel`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Value:s},children:`<Value.SummaryList layout="horizontal">
  <Value.String value="foo" label="Foo" />
  <Value.String value="bar" />
  <Value.String value="baz" label="Baz" />
</Value.SummaryList>
`}),S=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-with-help-in-info-overlay`,stableName:`WithHelpInInfoOverlay`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Value:s},children:`<Form.Handler
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
`});function C(){return(0,u.jsx)(c,{stableName:`AnimatedVisibility`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Flex:r,Field:o,Card:i,Value:s},children:`<Form.Handler>
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
`})}var w=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-with-help-button`,stableName:`HelpButton`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Flex:r,Card:i,Value:s},children:`<Form.Handler>
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
`}),T=()=>(0,u.jsx)(c,{"data-visual-test":`forms-value-summary-list-with-max-width`,stableName:`MaxWidth`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia/components'`],__buildScope:{Form:a,Card:i,Value:s},children:`<Form.Handler>
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
`});export{l as a,g as c,_ as d,x as f,S as g,T as h,m as i,w as l,y as m,v as n,f as o,b as p,d as r,h as s,C as t,p as u};
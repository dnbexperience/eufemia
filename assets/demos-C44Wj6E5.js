import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{t as r}from"./TestElement-cTsZrWus.js";import{Lr as i}from"./index-DVm0MbGb.js";var a=e({CombineErrorMessages:()=>_,Default:()=>s,Horizontal:()=>l,HorizontalAutoSize:()=>h,HorizontalWithInfo:()=>d,HorizontalWrap:()=>u,InlineHelpButtonCompositionFields:()=>T,InlineHelpButtonHTML:()=>S,InlineHelpButtonHorizontalLabel:()=>w,InlineHelpButtonLabelDescription:()=>b,InlineHelpButtonLabelDescriptionNoLabel:()=>x,InlineHelpButtonVerticalLabel:()=>y,InlineHelpButtonVerticalLabelDescription:()=>C,LabelSize:()=>g,StatusPositionAbove:()=>v,Widths:()=>f,WithDescription:()=>p,WithDescriptionNoLabel:()=>m,WithInfo:()=>c,WrappingLabel:()=>E,WrappingLabelDescription:()=>D}),o=t(),s=()=>(0,o.jsx)(n,{children:`<FieldBlock label="Label text">Input features goes here</FieldBlock>
`}),c=()=>(0,o.jsx)(n,{children:`<FieldBlock label="Label text" info="For your information">
  Input features goes here
</FieldBlock>
`}),l=()=>(0,o.jsx)(n,{children:`<FieldBlock label="Label text" layout="horizontal">
  Input features goes here
</FieldBlock>
`}),u=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-horizontal-wrap`,children:`<FieldBlock layout="horizontal" composition width="large">
  <Field.String label="Foo" width="medium" />
  <Field.String label="Bar" width="medium" />
</FieldBlock>
`}),d=()=>(0,o.jsx)(n,{children:`<FieldBlock
  label="Label text"
  layout="horizontal"
  info="For your information"
>
  Input features goes here
</FieldBlock>
`}),f=()=>(0,o.jsx)(n,{scope:{TestElement:r},hideCode:!0,"data-visual-test":`forms-field-block-widths`,children:`<Flex.Stack>
  <FieldBlock label="Default width (no width props). This label is long so we can validate that the label can be longer.">
    <TestElement>Contents</TestElement>
  </FieldBlock>
  <FieldBlock label="Small (affects outer block element)." width="small">
    <TestElement>Contents</TestElement>
  </FieldBlock>
  <FieldBlock label="Medium (affects outer block element)." width="medium">
    <TestElement>Contents</TestElement>
  </FieldBlock>
  <FieldBlock label="Large (affects outer block element)." width="large">
    <TestElement>Contents</TestElement>
  </FieldBlock>
  <FieldBlock label="Custom (affects outer block element)." width="8rem">
    <TestElement>Contents</TestElement>
  </FieldBlock>
  <FieldBlock
    label="Stretch (affects outer block element). This label is long so we can validate that the label also stretches full width."
    width="stretch"
  >
    <TestElement>Contents</TestElement>
  </FieldBlock>

  <FieldBlock
    label="Small (affects contents only). This label is long so we can validate that the label can be longer."
    contentWidth="small"
  >
    <TestElement>Contents</TestElement>
  </FieldBlock>
  <FieldBlock
    label="Medium (affects contents only). This label is long so we can validate that the label can be longer."
    contentWidth="medium"
  >
    <TestElement>Contents</TestElement>
  </FieldBlock>
  <FieldBlock
    label="Large (affects contents only). This label is long so we can validate that the label can be longer."
    contentWidth="large"
  >
    <TestElement>Contents</TestElement>
  </FieldBlock>
  <FieldBlock
    label="Custom (affects contents only). This label is long so we can validate that the label can be longer."
    contentWidth="8rem"
  >
    <TestElement>Contents</TestElement>
  </FieldBlock>
  <FieldBlock
    label="Stretch (affects contents only). This label is long so we can validate that the label can be longer."
    contentWidth="stretch"
  >
    <TestElement>Contents</TestElement>
  </FieldBlock>

  <Flex.Horizontal gap={false}>
    <FieldBlock
      width="stretch"
      style={{
        backgroundColor: 'var(--color-mint-green)',
      }}
    >
      Left content
    </FieldBlock>
    <FieldBlock
      width="stretch"
      style={{
        backgroundColor: 'var(--color-pistachio)',
      }}
    >
      Right content
    </FieldBlock>
  </Flex.Horizontal>
</Flex.Stack>
`}),p=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-label-description`,children:`<FieldBlock label="Label text" labelDescription="Description text">
  Input features goes here
</FieldBlock>
`}),m=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-label-description-no-label`,children:`<FieldBlock labelDescription="Description text">
  Input features goes here
</FieldBlock>
`}),h=()=>(0,o.jsx)(n,{children:`<FieldBlock label="Label">
  <Flex.Container>
    <Flex.Item
      span={{
        small: 12,
        large: 'auto',
      }}
    >
      <Field.Name.First path="/firstName" width="medium" minLength={2} />
    </Flex.Item>
    <Flex.Item
      span={{
        small: 12,
        large: 'auto',
      }}
    >
      <Field.Name.Last path="/lastName" width="medium" required />
    </Flex.Item>
    <Flex.Item
      span={{
        small: 12,
        large: 'auto',
      }}
    >
      <FieldBlock width="large">
        <Slider
          min={1900}
          max={new Date().getFullYear()}
          step={1}
          value={2010}
          label="Birth year"
          tooltip
          alwaysShowTooltip
        />
      </FieldBlock>
    </Flex.Item>
  </Flex.Container>
</FieldBlock>
`}),g=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-label-size`,children:`<Form.Handler>
  <Flex.Stack>
    <Form.MainHeading>Heading</Form.MainHeading>
    <FieldBlock label="Legend with medium heading size" labelSize="medium">
      <Field.String
        label="Label with a long text that goes beyond the field"
        width="medium"
      />
    </FieldBlock>
  </Flex.Stack>
</Form.Handler>
`}),_=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-combined-errors`,children:`<Field.Composition>
  <Field.Number
    width="small"
    label="Number"
    value={99}
    minimum={100}
    validateInitially
  />
  <Field.String
    width="medium"
    label="Text"
    value="Text"
    minLength={5}
    validateInitially
  />
</Field.Composition>
`}),v=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-status-position-above`,children:`<Field.String
  label="Field with status above"
  warning="Warning message"
  info="Info message"
  statusPosition="above"
/>
`}),y=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-help-button-vertical-label`,children:`<Flex.Stack>
  <Field.String
    label="Ønsket lånebeløp"
    help={{
      title: 'Hva betyr lånebeløp?',
      content: (
        <>
          Dette er hvor mye du har tenkt å låne{' '}
          <Anchor href="#test">totalt</Anchor>.
        </>
      ),
    }}
    onChange={async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }}
  />
  <Field.String
    label="Ønsket lånebeløp"
    multiline
    rows={3}
    help={{
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
  />
</Flex.Stack>
`}),b=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-help-button-label-description`,children:`<Flex.Stack>
  <Field.String
    label="Ønsket lånebeløp"
    labelDescription="Description Nisi ad ullamco ut anim proident sint eiusmod."
    help={{
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
    onChange={async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }}
  />
  <Field.String
    label="Ønsket lånebeløp"
    labelDescription="Description"
    multiline
    rows={3}
    help={{
      open: true,
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
  />
</Flex.Stack>
`}),x=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-help-button-label-description-no-label`,children:`<Flex.Stack>
  <Field.String
    labelDescription="Description Nisi ad ullamco ut anim proident sint eiusmod."
    help={{
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
    onChange={async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }}
  />
  <Field.String
    labelDescription="Description"
    multiline
    rows={3}
    help={{
      open: true,
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
  />
</Flex.Stack>
`}),S=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-help-button-html`,children:`<Flex.Stack>
  <Field.String
    label={<strong>Ønsket lånebeløp</strong>}
    labelDescription={
      <span>
        Label description with a <Anchor href="/">Anchor</Anchor>
      </span>
    }
    help={{
      open: true,
      title: <strong>Help title</strong>,
      content: (
        <>
          Help content with a <Anchor href="/">Anchor</Anchor>.
        </>
      ),
    }}
    onChange={async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }}
  />
</Flex.Stack>
`}),C=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-help-button-vertical-label-description`,children:`<Form.Card>
  <Field.String
    label="Ønsket lånebeløp"
    labelDescription="Description"
    help={{
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
    onChange={async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }}
  />
  <Field.String
    label="Ønsket lånebeløp"
    labelDescription="Description"
    multiline
    rows={3}
    help={{
      open: true,
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
  />
</Form.Card>
`}),w=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-help-button-horizontal-label`,children:`<Form.Card>
  <Field.String
    label="Ønsket lånebeløp"
    layout="horizontal"
    help={{
      open: true,
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
    info="Info message"
    onChange={async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }}
  />
  <Field.String
    label="Ønsket lånebeløp"
    layout="horizontal"
    layoutOptions={{
      width: '8rem',
    }}
    help={{
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
    info="Info message"
  />
  <Field.String
    label="Ønsket lånebeløp"
    layout="horizontal"
    layoutOptions={{
      width: '8rem',
    }}
    multiline
    rows={3}
    help={{
      title: 'Hva betyr lånebeløp?',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
    info="Info message"
  />
</Form.Card>
`}),T=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-help-button-composition-fields`,children:`<Form.Card>
  <Field.Composition label="Field.Composition" width="large">
    <Field.String
      width="medium"
      label="Label"
      help={{
        title: 'Hva betyr lånebeløp? ',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
    />
    <Field.String
      width="stretch"
      label="Label"
      help={{
        title: 'Hva betyr lånebeløp? ',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
    />
  </Field.Composition>
  <Field.PostalCodeAndCity
    help={{
      title: 'Hva betyr lånebeløp? ',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
  />
  <Field.PhoneNumber
    help={{
      open: true,
      title: 'Hva betyr lånebeløp? ',
      content: 'Dette er hvor mye du har tenkt å låne totalt.',
    }}
  />
</Form.Card>
`}),E=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-wrapping`,scope:{sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},children:`<Flex.Stack>
  <Form.Card>
    <Form.SubHeading>Breaking word with 61 characters</Form.SubHeading>
    <FieldBlock label={sixtyOneChars}>value</FieldBlock>
    <FieldBlock
      label={sixtyOneChars}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      value
    </FieldBlock>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>
      Breaking a sentence of 61 characters that include a space
    </Form.SubHeading>
    <FieldBlock label={sixtyOneCharsIncludingASpace}>value</FieldBlock>
    <FieldBlock
      label={sixtyOneCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      value
    </FieldBlock>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
    <FieldBlock
      label={fiftyEightCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      value
    </FieldBlock>
  </Form.Card>
</Flex.Stack>
`}),D=()=>(0,o.jsx)(n,{"data-visual-test":`forms-field-block-wrapping-label-description`,scope:{sixtyEightChars:`00000000000000000000000000000000000000000000000000000000000000000000`,sixtyEightCharsIncludingASpace:`0000000000000000000000000000000000 000000000000000000000000000000000`,sixtyFiveCharsIncludingASpace:`000000000000000000000000000000000000000000000000000000000000000 0`},children:`<Flex.Stack>
  <Form.Card>
    <Form.SubHeading>Breaking word with 68 characters</Form.SubHeading>
    <FieldBlock labelDescription={sixtyEightChars}>value</FieldBlock>
    <FieldBlock
      labelDescription={sixtyEightChars}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      value
    </FieldBlock>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>
      Breaking a sentence of 68 characters that include a space
    </Form.SubHeading>
    <FieldBlock labelDescription={sixtyEightCharsIncludingASpace}>
      value
    </FieldBlock>
    <FieldBlock
      labelDescription={sixtyEightCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      value
    </FieldBlock>
  </Form.Card>
  <Form.Card>
    <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
    <FieldBlock
      labelDescription={sixtyFiveCharsIncludingASpace}
      help={{
        title: 'Help title',
        content: 'Help content',
      }}
    >
      value
    </FieldBlock>
  </Form.Card>
</Flex.Stack>
`});function O(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return a||A(`Examples`,!1),_||A(`Examples.CombineErrorMessages`,!0),s||A(`Examples.Default`,!0),l||A(`Examples.Horizontal`,!0),h||A(`Examples.HorizontalAutoSize`,!0),d||A(`Examples.HorizontalWithInfo`,!0),u||A(`Examples.HorizontalWrap`,!0),T||A(`Examples.InlineHelpButtonCompositionFields`,!0),S||A(`Examples.InlineHelpButtonHTML`,!0),w||A(`Examples.InlineHelpButtonHorizontalLabel`,!0),b||A(`Examples.InlineHelpButtonLabelDescription`,!0),x||A(`Examples.InlineHelpButtonLabelDescriptionNoLabel`,!0),y||A(`Examples.InlineHelpButtonVerticalLabel`,!0),C||A(`Examples.InlineHelpButtonVerticalLabelDescription`,!0),g||A(`Examples.LabelSize`,!0),v||A(`Examples.StatusPositionAbove`,!0),f||A(`Examples.Widths`,!0),p||A(`Examples.WithDescription`,!0),m||A(`Examples.WithDescriptionNoLabel`,!0),c||A(`Examples.WithInfo`,!0),E||A(`Examples.WrappingLabel`,!0),D||A(`Examples.WrappingLabelDescription`,!0),n||A(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Label only (default layout)`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`With info`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Label size`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal layout`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal layout with info`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`With label and label description (vertical only)`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`With label description (vertical only)`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Responsive forms`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Combine error messages`}),`
`,(0,o.jsx)(t.p,{children:`Error messages from all fields inside the FieldBlock are combined as one message below the whole block`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h3,{children:`Status position above`}),`
`,(0,o.jsxs)(t.p,{children:[`Shows warning and info visually above the field by using `,(0,o.jsx)(t.code,{children:`statusPosition="above"`}),`.`]}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline help button (vertical only)`}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline help button (with label and label description)`}),`
`,(0,o.jsx)(b,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline help button (with label description)`}),`
`,(0,o.jsx)(x,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline help button (vertical label description)`}),`
`,(0,o.jsx)(C,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline help button (horizontal label)`}),`
`,(0,o.jsx)(w,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline help button (composition fields)`}),`
`,(0,o.jsx)(T,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline help button with HTML`}),`
`,(0,o.jsx)(S,{}),`
`,(0,o.jsx)(t.h3,{children:`Widths`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsxs)(n,{children:[(0,o.jsx)(u,{}),(0,o.jsx)(E,{}),(0,o.jsx)(D,{})]})]})}function k(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(O,{...e})}):O(e)}function A(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{k as default};
import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{t as i}from"./TestElement-CGrmu8xx.js";import{zr as a}from"./index-DqqByKA2.js";var o=t({CombineErrorMessages:()=>v,Default:()=>c,Horizontal:()=>u,HorizontalAutoSize:()=>g,HorizontalWithInfo:()=>f,HorizontalWrap:()=>d,InlineHelpButtonCompositionFields:()=>E,InlineHelpButtonHTML:()=>C,InlineHelpButtonHorizontalLabel:()=>T,InlineHelpButtonLabelDescription:()=>x,InlineHelpButtonLabelDescriptionNoLabel:()=>S,InlineHelpButtonVerticalLabel:()=>b,InlineHelpButtonVerticalLabelDescription:()=>w,LabelSize:()=>_,StatusPositionAbove:()=>y,Widths:()=>p,WithDescription:()=>m,WithDescriptionNoLabel:()=>h,WithInfo:()=>l,WrappingLabel:()=>D,WrappingLabelDescription:()=>O}),s=e(n()),c=()=>(0,s.jsx)(r,{stableName:`Default`,children:`<FieldBlock label="Label text">Input features goes here</FieldBlock>
`}),l=()=>(0,s.jsx)(r,{stableName:`WithInfo`,children:`<FieldBlock label="Label text" info="For your information">
  Input features goes here
</FieldBlock>
`}),u=()=>(0,s.jsx)(r,{stableName:`Horizontal`,children:`<FieldBlock label="Label text" layout="horizontal">
  Input features goes here
</FieldBlock>
`}),d=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-horizontal-wrap`,stableName:`HorizontalWrap`,children:`<FieldBlock layout="horizontal" composition width="large">
  <Field.String label="Foo" width="medium" />
  <Field.String label="Bar" width="medium" />
</FieldBlock>
`}),f=()=>(0,s.jsx)(r,{stableName:`HorizontalWithInfo`,children:`<FieldBlock
  label="Label text"
  layout="horizontal"
  info="For your information"
>
  Input features goes here
</FieldBlock>
`}),p=()=>(0,s.jsx)(r,{scope:{TestElement:i},hideCode:!0,"data-visual-test":`forms-field-block-widths`,stableName:`Widths`,children:`<Flex.Stack>
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
`}),m=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-label-description`,stableName:`WithDescription`,children:`<FieldBlock label="Label text" labelDescription="Description text">
  Input features goes here
</FieldBlock>
`}),h=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-label-description-no-label`,stableName:`WithDescriptionNoLabel`,children:`<FieldBlock labelDescription="Description text">
  Input features goes here
</FieldBlock>
`}),g=()=>(0,s.jsx)(r,{stableName:`HorizontalAutoSize`,children:`<FieldBlock label="Label">
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
`}),_=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-label-size`,stableName:`LabelSize`,children:`<Form.Handler>
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
`}),v=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-combined-errors`,stableName:`CombineErrorMessages`,children:`<Field.Composition>
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
`}),y=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-status-position-above`,stableName:`StatusPositionAbove`,children:`<Field.String
  label="Field with status above"
  warning="Warning message"
  info="Info message"
  statusPosition="above"
/>
`}),b=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-help-button-vertical-label`,stableName:`InlineHelpButtonVerticalLabel`,children:`<Flex.Stack>
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
`}),x=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-help-button-label-description`,stableName:`InlineHelpButtonLabelDescription`,children:`<Flex.Stack>
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
`}),S=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-help-button-label-description-no-label`,stableName:`InlineHelpButtonLabelDescriptionNoLabel`,children:`<Flex.Stack>
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
`}),C=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-help-button-html`,stableName:`InlineHelpButtonHTML`,children:`<Flex.Stack>
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
`}),w=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-help-button-vertical-label-description`,stableName:`InlineHelpButtonVerticalLabelDescription`,children:`<Form.Card>
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
`}),T=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-help-button-horizontal-label`,stableName:`InlineHelpButtonHorizontalLabel`,children:`<Form.Card>
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
`}),E=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-help-button-composition-fields`,stableName:`InlineHelpButtonCompositionFields`,children:`<Form.Card>
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
`}),D=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-wrapping`,scope:{sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},stableName:`WrappingLabel`,children:`<Flex.Stack>
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
`}),O=()=>(0,s.jsx)(r,{"data-visual-test":`forms-field-block-wrapping-label-description`,scope:{sixtyEightChars:`00000000000000000000000000000000000000000000000000000000000000000000`,sixtyEightCharsIncludingASpace:`0000000000000000000000000000000000 000000000000000000000000000000000`,sixtyFiveCharsIncludingASpace:`000000000000000000000000000000000000000000000000000000000000000 0`},stableName:`WrappingLabelDescription`,children:`<Flex.Stack>
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
`});function k(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return o||j(`Examples`,!1),v||j(`Examples.CombineErrorMessages`,!0),c||j(`Examples.Default`,!0),u||j(`Examples.Horizontal`,!0),g||j(`Examples.HorizontalAutoSize`,!0),f||j(`Examples.HorizontalWithInfo`,!0),d||j(`Examples.HorizontalWrap`,!0),E||j(`Examples.InlineHelpButtonCompositionFields`,!0),C||j(`Examples.InlineHelpButtonHTML`,!0),T||j(`Examples.InlineHelpButtonHorizontalLabel`,!0),x||j(`Examples.InlineHelpButtonLabelDescription`,!0),S||j(`Examples.InlineHelpButtonLabelDescriptionNoLabel`,!0),b||j(`Examples.InlineHelpButtonVerticalLabel`,!0),w||j(`Examples.InlineHelpButtonVerticalLabelDescription`,!0),_||j(`Examples.LabelSize`,!0),y||j(`Examples.StatusPositionAbove`,!0),p||j(`Examples.Widths`,!0),m||j(`Examples.WithDescription`,!0),h||j(`Examples.WithDescriptionNoLabel`,!0),l||j(`Examples.WithInfo`,!0),D||j(`Examples.WrappingLabel`,!0),O||j(`Examples.WrappingLabelDescription`,!0),n||j(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Label only (default layout)`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`With info`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Label size`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Horizontal layout`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Horizontal layout with info`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`With label and label description (vertical only)`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`With label description (vertical only)`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Responsive forms`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`Combine error messages`}),`
`,(0,s.jsx)(t.p,{children:`Error messages from all fields inside the FieldBlock are combined as one message below the whole block`}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsx)(t.h3,{children:`Status position above`}),`
`,(0,s.jsxs)(t.p,{children:[`Shows warning and info visually above the field by using `,(0,s.jsx)(t.code,{children:`statusPosition="above"`}),`.`]}),`
`,(0,s.jsx)(y,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline help button (vertical only)`}),`
`,(0,s.jsx)(b,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline help button (with label and label description)`}),`
`,(0,s.jsx)(x,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline help button (with label description)`}),`
`,(0,s.jsx)(S,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline help button (vertical label description)`}),`
`,(0,s.jsx)(w,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline help button (horizontal label)`}),`
`,(0,s.jsx)(T,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline help button (composition fields)`}),`
`,(0,s.jsx)(E,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline help button with HTML`}),`
`,(0,s.jsx)(C,{}),`
`,(0,s.jsx)(t.h3,{children:`Widths`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsxs)(n,{children:[(0,s.jsx)(d,{}),(0,s.jsx)(D,{}),(0,s.jsx)(O,{})]})]})}function A(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(k,{...e})}):k(e)}function j(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{A as default};
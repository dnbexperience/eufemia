import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Anchor-BPx9fjvj.js";import{s as i}from"./ToggleButton-DfKpi57X.js";import{j as a,q as o,tt as s,w as c}from"./forms-D54jfDKN.js";import{F as l}from"./Autocomplete-eAFtuLbJ.js";import{t as u}from"./Card-BvVSLAbs.js";import{t as d}from"./TestElement-CJNwFdUL.js";import{t as f}from"./Heading-OwOHsD1e.js";import{U as p}from"./index-BsJ3GLEw.js";import{t as m}from"./ComponentBox-sLMgHvLi.js";var h=e({CombineErrorMessages:()=>D,Default:()=>_,Horizontal:()=>y,HorizontalAutoSize:()=>T,HorizontalWithInfo:()=>x,HorizontalWrap:()=>b,InlineHelpButtonCompositionFields:()=>F,InlineHelpButtonHTML:()=>M,InlineHelpButtonHorizontalLabel:()=>P,InlineHelpButtonLabelDescription:()=>A,InlineHelpButtonLabelDescriptionNoLabel:()=>j,InlineHelpButtonVerticalLabel:()=>k,InlineHelpButtonVerticalLabelDescription:()=>N,LabelSize:()=>E,StatusPositionAbove:()=>O,Widths:()=>S,WithDescription:()=>C,WithDescriptionNoLabel:()=>w,WithInfo:()=>v,WrappingLabel:()=>I,WrappingLabelDescription:()=>L}),g=t(n()),_=()=>(0,g.jsx)(m,{stableName:`Default`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{FieldBlock:s,Input:l},children:`<FieldBlock label="Label text">Input features goes here</FieldBlock>
`}),v=()=>(0,g.jsx)(m,{stableName:`WithInfo`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{FieldBlock:s,Input:l},children:`<FieldBlock label="Label text" info="For your information">
  Input features goes here
</FieldBlock>
`}),y=()=>(0,g.jsx)(m,{stableName:`Horizontal`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{FieldBlock:s,Input:l},children:`<FieldBlock label="Label text" layout="horizontal">
  Input features goes here
</FieldBlock>
`}),b=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-horizontal-wrap`,stableName:`HorizontalWrap`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{FieldBlock:s,Field:a},children:`<FieldBlock layout="horizontal" composition width="large">
  <Field.String label="Foo" width="medium" />
  <Field.String label="Bar" width="medium" />
</FieldBlock>
`}),x=()=>(0,g.jsx)(m,{stableName:`HorizontalWithInfo`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{FieldBlock:s,Input:l},children:`<FieldBlock
  label="Label text"
  layout="horizontal"
  info="For your information"
>
  Input features goes here
</FieldBlock>
`}),S=()=>(0,g.jsx)(m,{scope:{TestElement:d},hideCode:!0,"data-visual-test":`forms-field-block-widths`,stableName:`Widths`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Flex:i,FieldBlock:s},children:`<Flex.Stack>
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
`}),C=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-label-description`,stableName:`WithDescription`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{FieldBlock:s,Input:l},children:`<FieldBlock label="Label text" labelDescription="Description text">
  Input features goes here
</FieldBlock>
`}),w=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-label-description-no-label`,stableName:`WithDescriptionNoLabel`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{FieldBlock:s,Input:l},children:`<FieldBlock labelDescription="Description text">
  Input features goes here
</FieldBlock>
`}),T=()=>(0,g.jsx)(m,{stableName:`HorizontalAutoSize`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{FieldBlock:s,Flex:i,Field:a,Slider:o},children:`<FieldBlock label="Label">
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
`}),E=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-label-size`,stableName:`LabelSize`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Form:c,Flex:i,Heading:f,FieldBlock:s,Field:a},children:`<Form.Handler>
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
`}),D=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-combined-errors`,stableName:`CombineErrorMessages`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Field:a},children:`<Field.Composition>
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
`}),O=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-status-position-above`,stableName:`StatusPositionAbove`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Field:a},children:`<Field.String
  label="Field with status above"
  warning="Warning message"
  info="Info message"
  statusPosition="above"
/>
`}),k=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-help-button-vertical-label`,stableName:`InlineHelpButtonVerticalLabel`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Flex:i,Field:a,Anchor:r},children:`<Flex.Stack>
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
`}),A=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-help-button-label-description`,stableName:`InlineHelpButtonLabelDescription`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Flex:i,Field:a},children:`<Flex.Stack>
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
`}),j=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-help-button-label-description-no-label`,stableName:`InlineHelpButtonLabelDescriptionNoLabel`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Flex:i,Field:a},children:`<Flex.Stack>
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
`}),M=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-help-button-html`,stableName:`InlineHelpButtonHTML`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Flex:i,Field:a,Anchor:r},children:`<Flex.Stack>
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
`}),N=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-help-button-vertical-label-description`,stableName:`InlineHelpButtonVerticalLabelDescription`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Form:c,Card:u,Field:a},children:`<Form.Card>
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
`}),P=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-help-button-horizontal-label`,stableName:`InlineHelpButtonHorizontalLabel`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Form:c,Card:u,Field:a},children:`<Form.Card>
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
`}),F=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-help-button-composition-fields`,stableName:`InlineHelpButtonCompositionFields`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Form:c,Card:u,Field:a},children:`<Form.Card>
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
`}),I=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-wrapping`,scope:{sixtyOneChars:`0000000000000000000000000000000000000000000000000000000000000`,sixtyOneCharsIncludingASpace:`000000000000000000000000000000 000000000000000000000000000000`,fiftyEightCharsIncludingASpace:`00000000000000000000000000000000000000000000000000000000 0`},stableName:`WrappingLabel`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Flex:i,Form:c,Card:u,FieldBlock:s},children:`<Flex.Stack>
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
`}),L=()=>(0,g.jsx)(m,{"data-visual-test":`forms-field-block-wrapping-label-description`,scope:{sixtyEightChars:`00000000000000000000000000000000000000000000000000000000000000000000`,sixtyEightCharsIncludingASpace:`0000000000000000000000000000000000 000000000000000000000000000000000`,sixtyFiveCharsIncludingASpace:`000000000000000000000000000000000000000000000000000000000000000 0`},stableName:`WrappingLabelDescription`,sourceImports:[`import { FieldBlock, Field, TestElement, Form } from '@dnb/eufemia/extensions/forms'`,`import { Anchor, Flex, Slider } from '@dnb/eufemia'`],__buildScope:{Flex:i,Form:c,Card:u,FieldBlock:s},children:`<Flex.Stack>
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
`});function R(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...p(),...e.components},{VisibleWhenVisualTest:n}=t;return h||B(`Examples`,!1),D||B(`Examples.CombineErrorMessages`,!0),_||B(`Examples.Default`,!0),y||B(`Examples.Horizontal`,!0),T||B(`Examples.HorizontalAutoSize`,!0),x||B(`Examples.HorizontalWithInfo`,!0),b||B(`Examples.HorizontalWrap`,!0),F||B(`Examples.InlineHelpButtonCompositionFields`,!0),M||B(`Examples.InlineHelpButtonHTML`,!0),P||B(`Examples.InlineHelpButtonHorizontalLabel`,!0),A||B(`Examples.InlineHelpButtonLabelDescription`,!0),j||B(`Examples.InlineHelpButtonLabelDescriptionNoLabel`,!0),k||B(`Examples.InlineHelpButtonVerticalLabel`,!0),N||B(`Examples.InlineHelpButtonVerticalLabelDescription`,!0),E||B(`Examples.LabelSize`,!0),O||B(`Examples.StatusPositionAbove`,!0),S||B(`Examples.Widths`,!0),C||B(`Examples.WithDescription`,!0),w||B(`Examples.WithDescriptionNoLabel`,!0),v||B(`Examples.WithInfo`,!0),I||B(`Examples.WrappingLabel`,!0),L||B(`Examples.WrappingLabelDescription`,!0),n||B(`VisibleWhenVisualTest`,!0),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(t.h2,{children:`Demos`}),`
`,(0,g.jsx)(t.h3,{children:`Label only (default layout)`}),`
`,(0,g.jsx)(_,{}),`
`,(0,g.jsx)(t.h3,{children:`With info`}),`
`,(0,g.jsx)(v,{}),`
`,(0,g.jsx)(t.h3,{children:`Label size`}),`
`,(0,g.jsx)(E,{}),`
`,(0,g.jsx)(t.h3,{children:`Horizontal layout`}),`
`,(0,g.jsx)(y,{}),`
`,(0,g.jsx)(t.h3,{children:`Horizontal layout with info`}),`
`,(0,g.jsx)(x,{}),`
`,(0,g.jsx)(t.h3,{children:`With label and label description (vertical only)`}),`
`,(0,g.jsx)(C,{}),`
`,(0,g.jsx)(t.h3,{children:`With label description (vertical only)`}),`
`,(0,g.jsx)(w,{}),`
`,(0,g.jsx)(t.h3,{children:`Responsive forms`}),`
`,(0,g.jsx)(T,{}),`
`,(0,g.jsx)(t.h3,{children:`Combine error messages`}),`
`,(0,g.jsx)(t.p,{children:`Error messages from all fields inside the FieldBlock are combined as one message below the whole block`}),`
`,(0,g.jsx)(D,{}),`
`,(0,g.jsx)(t.h3,{children:`Status position above`}),`
`,(0,g.jsxs)(t.p,{children:[`Shows warning and info visually above the field by using `,(0,g.jsx)(t.code,{children:`statusPosition="above"`}),`.`]}),`
`,(0,g.jsx)(O,{}),`
`,(0,g.jsx)(t.h3,{children:`Inline help button (vertical only)`}),`
`,(0,g.jsx)(k,{}),`
`,(0,g.jsx)(t.h3,{children:`Inline help button (with label and label description)`}),`
`,(0,g.jsx)(A,{}),`
`,(0,g.jsx)(t.h3,{children:`Inline help button (with label description)`}),`
`,(0,g.jsx)(j,{}),`
`,(0,g.jsx)(t.h3,{children:`Inline help button (vertical label description)`}),`
`,(0,g.jsx)(N,{}),`
`,(0,g.jsx)(t.h3,{children:`Inline help button (horizontal label)`}),`
`,(0,g.jsx)(P,{}),`
`,(0,g.jsx)(t.h3,{children:`Inline help button (composition fields)`}),`
`,(0,g.jsx)(F,{}),`
`,(0,g.jsx)(t.h3,{children:`Inline help button with HTML`}),`
`,(0,g.jsx)(M,{}),`
`,(0,g.jsx)(t.h3,{children:`Widths`}),`
`,(0,g.jsx)(S,{}),`
`,(0,g.jsxs)(n,{children:[(0,g.jsx)(b,{}),(0,g.jsx)(I,{}),(0,g.jsx)(L,{})]})]})}function z(e={}){let{wrapper:t}={...p(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(R,{...e})}):R(e)}function B(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{z as default};
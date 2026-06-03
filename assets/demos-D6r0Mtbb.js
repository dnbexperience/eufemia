import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./FormLabel-CRJduJ2n.js";import{M as i}from"./Autocomplete-DM3xptYi.js";import{t as a}from"./HelpButton-sV5p6bwJ.js";import{t as o}from"./Lead-D3tiD9gF.js";import{c as s}from"./ToggleButton-D3NEk3jO.js";import{a as c}from"./Selection-DXfzor9j.js";import{t as l}from"./Form-C16rVaXm.js";import{t as u}from"./Field-B5trC2Cn.js";import{W as d}from"./index-BCXtuv-b.js";import{t as f}from"./ComponentBox-B2X8809Z.js";var p=e({CurrencyField:()=>D,InputExampleClear:()=>T,InputExampleDefault:()=>h,InputExampleDisabled:()=>y,InputExampleFormStatus:()=>b,InputExampleMedium:()=>_,InputExampleNumbers:()=>C,InputExampleSearch:()=>g,InputExampleStretched:()=>S,InputExampleSubmit:()=>w,InputExampleSuffix:()=>x,InputExampleWithIcon:()=>v,InputScreenshotTests:()=>E}),m=t(n()),h=()=>(0,m.jsx)(f,{"data-visual-test":`input-placeholder`,stableName:`InputExampleDefault`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:i},children:`<Input label="Label" placeholder="Placeholder text" />
`}),g=()=>(0,m.jsx)(f,{"data-visual-test":`input-search`,stableName:`InputExampleSearch`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:i},children:`<Input
  label="Search"
  type="search"
  placeholder="Search text placeholder"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
  onSubmit={({ value }) => {
    console.log('Submit:', value)
  }}
/>
`}),_=()=>(0,m.jsx)(f,{"data-visual-test":`input-medium`,stableName:`InputExampleMedium`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:i},children:`<Input
  size="medium"
  type="search"
  stretch={true}
  value="Medium search value"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
/>
`}),v=()=>(0,m.jsx)(f,{"data-visual-test":`input-icon`,stableName:`InputExampleWithIcon`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:i},children:`
<Input label="Input with icon" placeholder="Input" icon="check" bottom />
<Input
  label="Input with icon"
  labelSrOnly
  placeholder="Input with a placeholder"
  iconPosition="right"
  icon="check"
  align="right"
/>

`}),y=()=>(0,m.jsx)(f,{"data-visual-test":`input-disabled`,stableName:`InputExampleDisabled`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:i},children:`<Input
  disabled
  label="Disabled input"
  placeholder="Disabled Input with a placeholder"
/>
`}),b=()=>(0,m.jsx)(f,{stableName:`InputExampleFormStatus`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:s,Input:i},children:`<Flex.Vertical>
  <section data-visual-test="input-error">
    <Input
      label="With FormStatus"
      status="You have to fill in this field"
      value="Input value with error"
    />
  </section>
  <section data-visual-test="input-error-button">
    <Input
      label="With button"
      status="You have to fill in this field"
      value="Input value with error"
      type="search"
    />
  </section>
</Flex.Vertical>
`}),x=()=>(0,m.jsx)(f,{stableName:`InputExampleSuffix`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:i,Lead:o,HelpButton:a},children:`<Input
  label={<Lead>Fødselsnummer</Lead>}
  autocomplete="on"
  placeholder="Placeholder text"
  suffix={
    <HelpButton title="Info" size="large">
      Some content
    </HelpButton>
  }
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
/>
`}),S=()=>(0,m.jsx)(f,{"data-visual-test":`input-stretch`,stableName:`InputExampleStretched`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{FieldBlock:c,Input:i},children:`<FieldBlock
  label="Long label labwl Adipiscing mauris dis proin nec"
  forId="input-id"
>
  <Input
    id="input-id"
    value="I stretch ..."
    stretch
    status="Status message"
    statusState="warning"
  />
</FieldBlock>
`}),C=()=>(0,m.jsx)(f,{stableName:`InputExampleNumbers`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Input:i},children:`<Input
  label="Label"
  autocomplete="on"
  placeholder="Placeholder text"
  status="Numbers are using DNB Mono (monospace)"
  statusState="information"
  value="1234567890"
  onChange={({ value }) => {
    console.log('onChange', value)
    return String(value).toUpperCase()
  }}
/>
`}),w=()=>(0,m.jsx)(f,{stableName:`InputExampleSubmit`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:l,FormLabel:r,Flex:s,Input:i},children:`<Form.Handler
  onSubmit={(event) => {
    console.log(event)
  }}
>
  <FormLabel forId="search">Label</FormLabel>
  <Flex.Horizontal align="baseline">
    <Input
      id="search"
      type="search"
      value="Input ..."
      selectAll={true}
      onSubmit={(event) => {
        console.log('Input.onSubmit', event)
      }}
      onChange={({ value }) => {
        console.log('onChange:', value)
      }}
    />
    <Form.SubmitButton />
  </Flex.Horizontal>
</Form.Handler>
`}),T=()=>(0,m.jsx)(f,{"data-visual-test":`input-clear`,stableName:`InputExampleClear`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:s,Input:i},children:`<Flex.Vertical>
  <Input showClearButton={true} value="Value ..." size="medium" />
  <Input showClearButton={true} value="Value ..." type="search" />
  <Input
    showClearButton={true}
    value="Value ..."
    icon="loupe"
    type="search"
  />
</Flex.Vertical>
`}),E=()=>(0,m.jsx)(f,{"data-visual-test":`input-align`,stableName:`InputScreenshotTests`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{FieldBlock:c,Flex:s,Input:i},children:`
<FieldBlock label="Left aligned">
  <Flex.Vertical>
    <Input value="Plain" />
    <Input value="Search" type="search" />
    <Input value="Search" size="medium" type="search" />
    <Input value="Search" size="large" type="search" />
    <Input
      value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
      icon="calendar"
    />
    <Input
      placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
      iconPosition="right"
      icon="calendar"
    />
    <Input size="medium" value="Value" icon="calendar" />
    <Input
      size="medium"
      placeholder="Placeholder"
      iconPosition="right"
      icon="calendar"
    />
    <Input size="large" value="Value" icon="calendar" />
    <Input
      size="large"
      placeholder="Placeholder"
      iconPosition="right"
      icon="calendar"
    />
  </Flex.Vertical>
</FieldBlock>
<FieldBlock top label="Right aligned">
  <Flex.Vertical>
    <Input value="Plain" align="right" />
    <Input value="Search" type="search" align="right" />
    <Input value="Search" size="medium" type="search" align="right" />
    <Input value="Search" size="large" type="search" align="right" />
    <Input
      value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
      icon="calendar"
      align="right"
    />
    <Input
      placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
      iconPosition="right"
      icon="calendar"
      align="right"
    />
    <Input size="medium" value="Value" icon="calendar" align="right" />
    <Input
      size="medium"
      placeholder="Placeholder"
      iconPosition="right"
      icon="calendar"
      align="right"
    />
    <Input size="large" value="Value" icon="calendar" align="right" />
    <Input
      size="large"
      placeholder="Placeholder"
      iconPosition="right"
      icon="calendar"
      align="right"
    />
  </Flex.Vertical>
</FieldBlock>

`}),D=()=>(0,m.jsx)(f,{hideCode:!0,stableName:`CurrencyField`,sourceImports:[`import { HelpButton, Input, Flex, FormLabel, Lead } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:u},children:`<Field.Currency
  label="Amount"
  value={1234}
  onChange={(value) => console.log('onChange', value)}
/>
`});function O(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...d(),...e.components},{VisibleWhenVisualTest:n}=t;return n||A(`VisibleWhenVisualTest`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(t.h3,{children:`Placeholder text`}),`
`,(0,m.jsx)(h,{}),`
`,(0,m.jsx)(t.h3,{children:`Search text placeholder`}),`
`,(0,m.jsx)(g,{}),`
`,(0,m.jsx)(t.h3,{children:`Medium and stretched search input`}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(t.h3,{children:`Input with icon`}),`
`,(0,m.jsx)(t.p,{children:`With left / right aligned text`}),`
`,(0,m.jsx)(v,{}),`
`,(0,m.jsx)(t.h3,{children:`Disabled input`}),`
`,(0,m.jsx)(y,{}),`
`,(0,m.jsx)(t.h3,{children:`With FormStatus`}),`
`,(0,m.jsx)(b,{}),`
`,(0,m.jsx)(t.h3,{children:`Input with suffix and custom label component`}),`
`,(0,m.jsx)(x,{}),`
`,(0,m.jsxs)(t.h3,{children:[`Stretched `,(0,m.jsx)(t.code,{children:`Input`}),` in horizontal flex and a long label`]}),`
`,(0,m.jsx)(S,{}),`
`,(0,m.jsx)(t.h3,{children:`Numbers are using DNB Mono (monospace)`}),`
`,(0,m.jsx)(t.p,{children:`Also, this example manipulates the value during typing.`}),`
`,(0,m.jsx)(C,{}),`
`,(0,m.jsx)(t.h3,{children:`Submit Form with Input`}),`
`,(0,m.jsx)(t.p,{children:`Pressing the enter key will trigger a submit.`}),`
`,(0,m.jsx)(w,{}),`
`,(0,m.jsx)(t.h3,{children:`Input with clear button`}),`
`,(0,m.jsx)(t.p,{children:`Pushing the clear button will clear the input.`}),`
`,(0,m.jsx)(T,{}),`
`,(0,m.jsx)(t.h3,{children:`Prevent typing of invalid characters`}),`
`,(0,m.jsxs)(t.p,{children:[`You can check out the `,(0,m.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String/#prevent-typing-of-invalid-characters`,children:`Field.String`}),` example for more information using `,(0,m.jsx)(t.code,{children:`onInput`}),` event handler property.`]}),`
`,(0,m.jsx)(t.h3,{children:`Input password type`}),`
`,(0,m.jsx)(t.p,{children:`The password component has to ensure that there is still room for password managers to inject the input with their UX functionality.`}),`
`,(0,m.jsxs)(t.p,{children:[`Read more about it in `,(0,m.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Password/`,children:`Field.Password`}),`.`]}),`
`,(0,m.jsx)(n,{children:(0,m.jsx)(E,{})})]})}function k(e={}){let{wrapper:t}={...d(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(O,{...e})}):O(e)}function A(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{k as default,p as n,D as t};
import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({CurrencyField:()=>y,InputExampleClear:()=>_,InputExampleDefault:()=>s,InputExampleDisabled:()=>d,InputExampleFormStatus:()=>f,InputExampleMedium:()=>l,InputExampleNumbers:()=>h,InputExampleSearch:()=>c,InputExampleStretched:()=>m,InputExampleSubmit:()=>g,InputExampleSuffix:()=>p,InputExampleWithIcon:()=>u,InputScreenshotTests:()=>v}),o=e(n()),s=()=>(0,o.jsx)(r,{"data-visual-test":`input-placeholder`,stableName:`InputExampleDefault`,children:`<Input label="Label" placeholder="Placeholder text" />
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`input-search`,stableName:`InputExampleSearch`,children:`<Input
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
`}),l=()=>(0,o.jsx)(r,{"data-visual-test":`input-medium`,stableName:`InputExampleMedium`,children:`<Input
  size="medium"
  type="search"
  stretch={true}
  value="Medium search value"
  onChange={({ value }) => {
    console.log('onChange', value)
  }}
/>
`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`input-icon`,stableName:`InputExampleWithIcon`,children:`
<Input label="Input with icon" placeholder="Input" icon="check" bottom />
<Input
  label="Input with icon"
  labelSrOnly
  placeholder="Input with a placeholder"
  iconPosition="right"
  icon="check"
  align="right"
/>

`}),d=()=>(0,o.jsx)(r,{"data-visual-test":`input-disabled`,stableName:`InputExampleDisabled`,children:`<Input
  disabled
  label="Disabled input"
  placeholder="Disabled Input with a placeholder"
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`InputExampleFormStatus`,children:`<Flex.Vertical>
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
`}),p=()=>(0,o.jsx)(r,{stableName:`InputExampleSuffix`,children:`<Input
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
`}),m=()=>(0,o.jsx)(r,{"data-visual-test":`input-stretch`,stableName:`InputExampleStretched`,children:`<FieldBlock
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
`}),h=()=>(0,o.jsx)(r,{stableName:`InputExampleNumbers`,children:`<Input
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
`}),g=()=>(0,o.jsx)(r,{stableName:`InputExampleSubmit`,children:`<Form.Handler
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
`}),_=()=>(0,o.jsx)(r,{"data-visual-test":`input-clear`,stableName:`InputExampleClear`,children:`<Flex.Vertical>
  <Input showClearButton={true} value="Value ..." size="medium" />
  <Input showClearButton={true} value="Value ..." type="search" />
  <Input
    showClearButton={true}
    value="Value ..."
    icon="loupe"
    type="search"
  />
</Flex.Vertical>
`}),v=()=>(0,o.jsx)(r,{"data-visual-test":`input-align`,stableName:`InputScreenshotTests`,children:`
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

`}),y=()=>(0,o.jsx)(r,{hideCode:!0,stableName:`CurrencyField`,children:`<Field.Currency
  label="Amount"
  value={1234}
  onChange={(value) => console.log('onChange', value)}
/>
`});function b(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components},{VisibleWhenVisualTest:n}=t;return n||S(`VisibleWhenVisualTest`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder text`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Search text placeholder`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Medium and stretched search input`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Input with icon`}),`
`,(0,o.jsx)(t.p,{children:`With left / right aligned text`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled input`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`With FormStatus`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Input with suffix and custom label component`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Stretched `,(0,o.jsx)(t.code,{children:`Input`}),` in horizontal flex and a long label`]}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Numbers are using DNB Mono (monospace)`}),`
`,(0,o.jsx)(t.p,{children:`Also, this example manipulates the value during typing.`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Submit Form with Input`}),`
`,(0,o.jsx)(t.p,{children:`Pressing the enter key will trigger a submit.`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Input with clear button`}),`
`,(0,o.jsx)(t.p,{children:`Pushing the clear button will clear the input.`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h3,{children:`Prevent typing of invalid characters`}),`
`,(0,o.jsxs)(t.p,{children:[`You can check out the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String/#prevent-typing-of-invalid-characters`,children:`Field.String`}),` example for more information using `,(0,o.jsx)(t.code,{children:`onInput`}),` event handler property.`]}),`
`,(0,o.jsx)(t.h3,{children:`Input password type`}),`
`,(0,o.jsx)(t.p,{children:`The password component has to ensure that there is still room for password managers to inject the input with their UX functionality.`}),`
`,(0,o.jsxs)(t.p,{children:[`Read more about it in `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Password/`,children:`Field.Password`}),`.`]}),`
`,(0,o.jsx)(n,{children:(0,o.jsx)(v,{})})]})}function x(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,a as n,y as t};
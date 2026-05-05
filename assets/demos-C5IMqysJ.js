import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{O as n,t as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i}from"./index-CMgyXmp3.js";var a=t(),o=e({AllSizes:()=>s,Forms:()=>l,InComponents:()=>u,Square:()=>c}),s=()=>(0,a.jsx)(r,{"data-visual-test":`country-flag-sizes`,children:`<Flex.Horizontal align="center">
  <CountryFlag iso="NO" size="auto" />
  <CountryFlag iso="NO" size="xx-small" />
  <CountryFlag iso="NO" size="x-small" />
  <CountryFlag iso="NO" size="small" />
  <CountryFlag iso="NO" size="medium" />
  <CountryFlag iso="NO" size="large" />
  <CountryFlag iso="NO" size="x-large" />
</Flex.Horizontal>
`}),c=()=>(0,a.jsx)(r,{"data-visual-test":`country-flag-shape`,children:`<CountryFlag iso="CH" shape="square" size="large" />
`}),l=()=>(0,a.jsx)(r,{scope:{useValueProps:n},noInline:!0,children:`const MyComponent = ({ label, ...props }) => {
  const { value } = useValueProps(props)
  const iso = String(value)
  return (
    <FieldBlock label={label}>
      <CountryFlag iso={iso} size="large" />
    </FieldBlock>
  )
}
render(
  <Form.Handler>
    <Field.Composition>
      <Field.SelectCountry
        label="Select a country"
        path="/country"
        width="medium"
        value="SE"
      />
      <MyComponent label="Country flag" path="/country" />
    </Field.Composition>
  </Form.Handler>
)
`}),u=()=>(0,a.jsx)(r,{hideCode:!0,"data-visual-test":`country-flag-in-components`,children:`<Flex.Vertical gap="x-small">
  <Button icon={<CountryFlag iso="NO" />} title="Icon button" />
  <Button
    icon={<CountryFlag iso="NO" />}
    title="Icon button"
    size="large"
  />
  <Button
    icon={<CountryFlag iso="NO" />}
    iconPosition="left"
    text="Button"
    variant="secondary"
  />
  <Button
    icon={<CountryFlag iso="NO" />}
    iconSize="medium"
    iconPosition="left"
    size="large"
    text="Button"
    variant="secondary"
  />
  <Input
    icon={<CountryFlag iso="NO" />}
    iconPosition="left"
    placeholder="Write something"
  />
  <Input
    icon={<CountryFlag iso="NO" />}
    iconPosition="left"
    size="large"
    placeholder="Write something"
  />
  <Dropdown
    value="NO"
    iconPosition="left"
    data={{
      NO: (
        <Dropdown.HorizontalItem>
          <CountryFlag iso="NO" />
          {'\xA0'}Norway
        </Dropdown.HorizontalItem>
      ),
      SE: (
        <Dropdown.HorizontalItem>
          <CountryFlag iso="SE" />
          {'\xA0'}Sweden
        </Dropdown.HorizontalItem>
      ),
    }}
  />
  <Dropdown icon={<CountryFlag iso="NO" />} size="large" />

  <Flex.Horizontal align="center" gap="x-small">
    In Icon component:
    <Icon icon={<CountryFlag iso="NO" />} />
    <Icon icon={<CountryFlag iso="NO" />} size="medium" />
  </Flex.Horizontal>

  <Flex.Vertical>
    <Heading level="1">
      H1 heading <CountryFlag iso="NO" />
    </Heading>
    <Heading level="2">
      H2 heading <CountryFlag iso="NO" />
    </Heading>
    <Heading level="3">
      H3 heading <CountryFlag iso="NO" />
    </Heading>
    <P
      style={{
        maxWidth: '20rem',
      }}
    >
      <CountryFlag iso="NO" /> Paragraph Eiusmod id cillum Lorem nulla non
      consectetur pariatur mollit Lorem non do nulla reprehenderit
      {'\xA0'}
      <CountryFlag iso="NO" />
    </P>
  </Flex.Vertical>
</Flex.Vertical>
`});function d(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return o||p(`Examples`,!1),s||p(`Examples.AllSizes`,!0),l||p(`Examples.Forms`,!0),u||p(`Examples.InComponents`,!0),c||p(`Examples.Square`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`All sizes`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Square`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Eufemia Forms`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`In various components`}),`
`,(0,a.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};
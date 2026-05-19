import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{O as r,t as i}from"./ComponentBox-a4aOn231.js";import{zr as a}from"./index-DqqByKA2.js";var o=e(n()),s=t({AllSizes:()=>c,Forms:()=>u,InComponents:()=>d,Square:()=>l}),c=()=>(0,o.jsx)(i,{"data-visual-test":`country-flag-sizes`,stableName:`AllSizes`,children:`<Flex.Horizontal align="center">
  <CountryFlag iso="NO" size="auto" />
  <CountryFlag iso="NO" size="xx-small" />
  <CountryFlag iso="NO" size="x-small" />
  <CountryFlag iso="NO" size="small" />
  <CountryFlag iso="NO" size="medium" />
  <CountryFlag iso="NO" size="large" />
  <CountryFlag iso="NO" size="x-large" />
</Flex.Horizontal>
`}),l=()=>(0,o.jsx)(i,{"data-visual-test":`country-flag-shape`,stableName:`Square`,children:`<CountryFlag iso="CH" shape="square" size="large" />
`}),u=()=>(0,o.jsx)(i,{scope:{useValueProps:r},stableName:`Forms`,noInline:!0,children:`const MyComponent = ({ label, ...props }) => {
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
`}),d=()=>(0,o.jsx)(i,{hideCode:!0,"data-visual-test":`country-flag-in-components`,stableName:`InComponents`,children:`<Flex.Vertical gap="x-small">
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
`});function f(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return s||m(`Examples`,!1),c||m(`Examples.AllSizes`,!0),u||m(`Examples.Forms`,!0),d||m(`Examples.InComponents`,!0),l||m(`Examples.Square`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`All sizes`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Square`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Eufemia Forms`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`In various components`}),`
`,(0,o.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};
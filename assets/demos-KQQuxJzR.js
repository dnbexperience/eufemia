import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./H2-BeLNZ3dn.js";import{t as i}from"./H3-NvK5RHoR.js";import{t as a}from"./Paragraph-5ep_6ij4.js";import{t as o}from"./Form-KS-x6we6.js";import{t as s}from"./useValueProps-BHms0_gg.js";import{t as c}from"./Field-bFo7XjQz.js";import{An as l,E as u,Gn as d,In as f,Oi as p,Rr as m,en as h,gr as g,tn as _,un as v,wr as y}from"./index-Da-r8F54.js";import{t as b}from"./ComponentBox-DXeEXSK2.js";var x=e(n()),S=t({AllSizes:()=>C,Forms:()=>T,InComponents:()=>E,Square:()=>w}),C=()=>(0,x.jsx)(b,{"data-visual-test":`country-flag-sizes`,stableName:`AllSizes`,sourceImports:[`import { Button, CountryFlag, Dropdown, Flex, Heading, Icon, Input, P } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form, useValueProps } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:v,CountryFlag:d},children:`<Flex.Horizontal align="center">
  <CountryFlag iso="NO" size="auto" />
  <CountryFlag iso="NO" size="xx-small" />
  <CountryFlag iso="NO" size="x-small" />
  <CountryFlag iso="NO" size="small" />
  <CountryFlag iso="NO" size="medium" />
  <CountryFlag iso="NO" size="large" />
  <CountryFlag iso="NO" size="x-large" />
</Flex.Horizontal>
`}),w=()=>(0,x.jsx)(b,{"data-visual-test":`country-flag-shape`,stableName:`Square`,sourceImports:[`import { Button, CountryFlag, Dropdown, Flex, Heading, Icon, Input, P } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form, useValueProps } from '@dnb/eufemia/extensions/forms'`],__buildScope:{CountryFlag:d},children:`<CountryFlag iso="CH" shape="square" size="large" />
`}),T=()=>(0,x.jsx)(b,{scope:{useValueProps:s},stableName:`Forms`,sourceImports:[`import { Button, CountryFlag, Dropdown, Flex, Heading, Icon, Input, P } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form, useValueProps } from '@dnb/eufemia/extensions/forms'`],__buildScope:{FieldBlock:u,CountryFlag:d,Form:o,Field:c},noInline:!0,children:`const MyComponent = ({ label, ...props }) => {
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
`}),E=()=>(0,x.jsx)(b,{hideCode:!0,"data-visual-test":`country-flag-in-components`,stableName:`InComponents`,sourceImports:[`import { Button, CountryFlag, Dropdown, Flex, Heading, Icon, Input, P } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form, useValueProps } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:v,Button:y,CountryFlag:d,Input:g,Dropdown:_,Icon:p,Heading:h,H1:l,H2:r,H3:i,P:f,Paragraph:a},children:`<Flex.Vertical gap="x-small">
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
`});function D(e){let t={h2:`h2`,h3:`h3`,...m(),...e.components};return S||k(`Examples`,!1),C||k(`Examples.AllSizes`,!0),T||k(`Examples.Forms`,!0),E||k(`Examples.InComponents`,!0),w||k(`Examples.Square`,!0),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(t.h2,{children:`Demos`}),`
`,(0,x.jsx)(t.h3,{children:`All sizes`}),`
`,(0,x.jsx)(C,{}),`
`,(0,x.jsx)(t.h3,{children:`Square`}),`
`,(0,x.jsx)(w,{}),`
`,(0,x.jsx)(t.h3,{children:`Eufemia Forms`}),`
`,(0,x.jsx)(T,{}),`
`,(0,x.jsx)(t.h3,{children:`In various components`}),`
`,(0,x.jsx)(E,{})]})}function O(e={}){let{wrapper:t}={...m(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(D,{...e})}):D(e)}function k(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{O as default};
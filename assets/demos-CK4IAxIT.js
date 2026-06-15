import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Icon-BONd9ALW.js";import{t as i}from"./Button-DwQUlfj-.js";import{M as a,o}from"./Autocomplete-Bbkxjf2i.js";import{t as s}from"./P-C9wBv35m.js";import{d as c}from"./HelpButton-C7xeEDxM.js";import{t as l}from"./H2-Dw1W-git.js";import{t as u}from"./H3-BONyL4Vo.js";import{t as d}from"./Paragraph-4LlB0HbK.js";import{c as f}from"./ToggleButton-_NsXxiTa.js";import{a as p,mt as m}from"./Selection-DWa_5MEy.js";import{t as h}from"./useValueProps-C6XOTK8Z.js";import{t as g}from"./Form-JTiJXf2d.js";import{t as _}from"./Field-DqRpWyNm.js";import{K as v,M as y}from"./index-ppRu2ktv.js";import{t as b}from"./ComponentBox-R2c6Bo76.js";var x=t(n()),S=e({AllSizes:()=>C,Forms:()=>T,InComponents:()=>E,Square:()=>w}),C=()=>(0,x.jsx)(b,{"data-visual-test":`country-flag-sizes`,stableName:`AllSizes`,sourceImports:[`import { Button, CountryFlag, Dropdown, Flex, Heading, Icon, Input, P } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form, useValueProps } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:f,CountryFlag:o},children:`<Flex.Horizontal align="center">
  <CountryFlag iso="NO" size="auto" />
  <CountryFlag iso="NO" size="xx-small" />
  <CountryFlag iso="NO" size="x-small" />
  <CountryFlag iso="NO" size="small" />
  <CountryFlag iso="NO" size="medium" />
  <CountryFlag iso="NO" size="large" />
  <CountryFlag iso="NO" size="x-large" />
</Flex.Horizontal>
`}),w=()=>(0,x.jsx)(b,{"data-visual-test":`country-flag-shape`,stableName:`Square`,sourceImports:[`import { Button, CountryFlag, Dropdown, Flex, Heading, Icon, Input, P } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form, useValueProps } from '@dnb/eufemia/extensions/forms'`],__buildScope:{CountryFlag:o},children:`<CountryFlag iso="CH" shape="square" size="large" />
`}),T=()=>(0,x.jsx)(b,{scope:{useValueProps:h},stableName:`Forms`,sourceImports:[`import { Button, CountryFlag, Dropdown, Flex, Heading, Icon, Input, P } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form, useValueProps } from '@dnb/eufemia/extensions/forms'`],__buildScope:{FieldBlock:p,CountryFlag:o,Form:g,Field:_},noInline:!0,children:`const MyComponent = ({ label, ...props }) => {
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
`}),E=()=>(0,x.jsx)(b,{hideCode:!0,"data-visual-test":`country-flag-in-components`,stableName:`InComponents`,sourceImports:[`import { Button, CountryFlag, Dropdown, Flex, Heading, Icon, Input, P } from '@dnb/eufemia'`,`import { Field, FieldBlock, Form, useValueProps } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Flex:f,Button:i,CountryFlag:o,Input:a,Dropdown:m,Icon:r,Heading:y,H1:c,H2:l,H3:u,P:s,Paragraph:d},children:`<Flex.Vertical gap="x-small">
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
`});function D(e){let t={h2:`h2`,h3:`h3`,...v(),...e.components};return S||k(`Examples`,!1),C||k(`Examples.AllSizes`,!0),T||k(`Examples.Forms`,!0),E||k(`Examples.InComponents`,!0),w||k(`Examples.Square`,!0),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(t.h2,{children:`Demos`}),`
`,(0,x.jsx)(t.h3,{children:`All sizes`}),`
`,(0,x.jsx)(C,{}),`
`,(0,x.jsx)(t.h3,{children:`Square`}),`
`,(0,x.jsx)(w,{}),`
`,(0,x.jsx)(t.h3,{children:`Eufemia Forms`}),`
`,(0,x.jsx)(T,{}),`
`,(0,x.jsx)(t.h3,{children:`In various components`}),`
`,(0,x.jsx)(E,{})]})}function O(e={}){let{wrapper:t}={...v(),...e.components};return t?(0,x.jsx)(t,{...e,children:(0,x.jsx)(D,{...e})}):D(e)}function k(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{O as default};
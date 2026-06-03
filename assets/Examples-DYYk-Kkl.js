import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{K as i,Q as a,W as o,X as s,_ as c}from"./Anchor-ywdvt45E.js";import{t as l}from"./MediaQuery-DbZygDmJ.js";import{c as u,s as d}from"./Space-XDya2fLD.js";import{t as f}from"./Space-D5PuuilP2.js";import{t as p}from"./Button-2YHZk8Pc.js";import{M as m,t as h}from"./Autocomplete-DM3xptYi.js";import{i as g}from"./HelpButton-sV5p6bwJ.js";import{t as _}from"./H2-DT2jDb2-.js";import{c as v,l as y,r as b,s as x,t as S,u as C}from"./ToggleButton-D3NEk3jO.js";import{t as w}from"./Card-C6UABezd.js";import{t as T}from"./DatePicker-CZCjhlse.js";import{a as E,mt as D}from"./Selection-DXfzor9j.js";import{t as O}from"./export-Df-7CzYN.js";import{t as k}from"./Slider-lEY9INSg.js";import{g as A}from"./Upload-_FypiXDK.js";import{t as j}from"./Form-C16rVaXm.js";import{t as M}from"./TestElement-pdBUkdrQ.js";import{t as N}from"./Field-B5trC2Cn.js";import{S as P,j as F}from"./index-BCXtuv-b.js";import{t as I}from"./ComponentBox-B2X8809Z.js";var L=e({AllComponentsHorizontalTestCase:()=>$,AllComponentsVerticalLabelsTestCase:()=>Q,AllComponentsVerticalTestCase:()=>Z,FormSetAlternativeAfter:()=>J,FormSetAlternativeForms:()=>Y,HorizontalFlexItemResponsiveSize:()=>H,HorizontalFlexItemResponsiveSizeCustomColumns:()=>U,LayoutComponents:()=>B,MediaQueryLiveExample:()=>K,MediaQueryUseMedia:()=>G,ResponsiveGridContainer:()=>q,colors:()=>V}),R=n(t()),z=n(r()),B=()=>(0,z.jsx)(I,{scope:{Field:N,Form:j},hideCode:!0,stableName:`LayoutComponents`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:v,Form:j,Card:w,Field:N},children:`<Flex.Stack>
  <Form.MainHeading>Profile</Form.MainHeading>

  <Form.Card>
    <Form.SubHeading>Name</Form.SubHeading>

    <Field.String label="Fornavn" value="John" />
    <Field.String label="Etternavn" value="Smith" />
  </Form.Card>

  <Form.Card>
    <Form.SubHeading>More information</Form.SubHeading>

    <Field.NationalIdentityNumber value="20058512345" />
    <Field.Email value="john@smith.email" />
    <Field.PhoneNumber value="+4798765432" />
  </Form.Card>
</Flex.Stack>
`}),V=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],H=()=>(0,z.jsx)(I,{scope:{colors:V,TestElement:M},hideCode:!0,"data-visual-test":`flex-item-size`,stableName:`HorizontalFlexItemResponsiveSize`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:v},children:`<Flex.Container>
  <Flex.Item span={8}>
    <TestElement style={colors[0]}>FlexItem (8)</TestElement>
  </Flex.Item>
  <Flex.Item span={4}>
    <TestElement style={colors[1]}>FlexItem (4)</TestElement>
  </Flex.Item>
  <Flex.Item
    span={{
      small: 12,
      medium: 4,
    }}
  >
    <TestElement style={colors[2]}>
      FlexItem (small: 8, medium: 4)
    </TestElement>
  </Flex.Item>
  <Flex.Item
    span={{
      small: 12,
      medium: 8,
    }}
  >
    <TestElement style={colors[3]}>
      FlexItem (small: 4, medium: 8)
    </TestElement>
  </Flex.Item>
</Flex.Container>
`}),U=()=>(0,z.jsx)(I,{hideCode:!0,scope:{colors:V,TestElement:M,Field:N,defaultBreakpoints:i,defaultQueries:d},"data-visual-test":`flex-item-custom-size`,stableName:`HorizontalFlexItemResponsiveSizeCustomColumns`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:v},noInline:!0,children:`const breakpoints = {
  ...defaultBreakpoints,
  xsmall: '30em',
}
const queries = {
  ...defaultQueries,
  xsmall: {
    min: 0,
    max: 'xsmall',
  },
  small: {
    min: 'xsmall',
    max: 'small',
  },
}
const CustomMediaQuery = styled.div\`
  display: flex;
  flex-direction: column;
  .dnb-flex-container[data-media-key='xsmall'] .dnb-flex-item--responsive {
    --span: var(--xsmall);
  }
\`
render(
  <CustomMediaQuery>
    <Flex.Container
      direction="horizontal"
      sizeCount={4}
      breakpoints={breakpoints}
      queries={queries}
    >
      <Flex.Item
        span={{
          small: 2,
          medium: 3,
          large: 1,
        }}
      >
        <TestElement style={colors[0]}>FlexItem</TestElement>
      </Flex.Item>
      <Flex.Item
        span={{
          small: 2,
          medium: 1,
          large: 2,
        }}
      >
        <TestElement style={colors[1]}>FlexItem</TestElement>
      </Flex.Item>
      <Flex.Item
        span={{
          xsmall: 4,
          small: 2,
          medium: 1,
          large: 1,
        }}
      >
        <TestElement style={colors[2]}>FlexItem</TestElement>
      </Flex.Item>
      <Flex.Item
        span={{
          xsmall: 4,
          small: 2,
          medium: 3,
          large: 4,
        }}
      >
        <TestElement style={colors[3]}>FlexItem</TestElement>
      </Flex.Item>
    </Flex.Container>
  </CustomMediaQuery>
)
`}),W=()=>{let[e,t]=(0,R.useState)(typeof window<`u`?window.innerWidth:0);return(0,R.useEffect)(()=>{let e=()=>{t(window.innerWidth)};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),{innerWidth:e}},G=()=>(0,z.jsx)(I,{scope:{useMedia:u,useWindowWidth:W},hideCode:!0,stableName:`MediaQueryUseMedia`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Code:a},noInline:!0,children:`const Playground = () => {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()
  const { innerWidth } = useWindowWidth()
  return (
    <Code>
      <pre>
        {JSON.stringify(
          {
            isSmall,
            isMedium,
            isLarge,
            isSSR,
            innerWidth,
          },
          null,
          2
        )}
      </pre>
    </Code>
  )
}
render(<Playground />)
`}),K=()=>(0,z.jsx)(I,{scope:{MediaQuery:l,useMediaQuery:o},hideCode:!0,stableName:`MediaQueryLiveExample`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Button:p,Switch:P,Code:a},noInline:!0,children:`const Playground = () => {
  const [query, updateQuery] = useState({
    screen: true,
    not: true,
    min: 'small',
    max: 'large',
  })
  const match1 = useMediaQuery({
    matchOnSSR: true,
    when: query,
  })
  const match2 = useMediaQuery({
    matchOnSSR: true,
    not: true,
    when: query,
  })
  useEffect(() => {
    console.log('mediaQuery:', match1, match2)
  }, [match1, match2])
  return (
    <>
      <Button
        onClick={() => {
          updateQuery({
            ...query,
            screen: !query.screen,
          })
        }}
        right
      >
        Switch
      </Button>
      <MediaQuery when={query}>
        <Code>when</Code>
      </MediaQuery>
      <MediaQuery not when={query}>
        <Code>not when</Code>
      </MediaQuery>
    </>
  )
}
render(<Playground />)
`}),q=()=>(0,z.jsx)(I,{hideCode:!0,scope:{TestElement:M,colors:V},stableName:`ResponsiveGridContainer`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Grid:O},children:`<Grid.Container rowGap columnGap>
  <Grid.Item
    span={{
      small: [1, 2],
      medium: [1, 3],
      large: [1, 12],
    }}
    style={colors[0]}
    element={TestElement}
  >
    Item A
  </Grid.Item>

  <Grid.Item
    span={{
      small: [3, 4],
      medium: [4, 6],
      large: [1, 4],
    }}
    style={colors[1]}
    element={TestElement}
  >
    Item B
  </Grid.Item>

  <Grid.Item
    span={{
      small: [2, 3],
      medium: [4, 6],
      large: [5, 8],
    }}
    style={colors[2]}
    element={TestElement}
  >
    Item C
  </Grid.Item>

  <Grid.Item
    span={{
      small: [1, 4],
      medium: [4, 6],
      large: [9, 12],
    }}
    style={colors[3]}
    element={TestElement}
  >
    Item D
  </Grid.Item>
</Grid.Container>
`}),J=()=>(0,z.jsx)(I,{stableName:`FormSetAlternativeAfter`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Form:j,H2:_,Heading:F,FieldBlock:E,Flex:v,Input:m},children:`<Form.Handler>
  <H2 top={0}>Heading</H2>
  <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>
    <Flex.Horizontal>
      <Input label="Label A" />
      <Input label="Label B" />
    </Flex.Horizontal>
  </FieldBlock>
</Form.Handler>
`}),Y=()=>(0,z.jsx)(I,{stableName:`FormSetAlternativeForms`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Form:j,Flex:v,Heading:F,FieldBlock:E,Field:N},children:`<Form.Handler>
  <Flex.Stack>
    <Form.MainHeading>Heading</Form.MainHeading>
    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>
      <Flex.Horizontal>
        <Field.String label="Label A" width="medium" />
        <Field.String label="Label B" width="large" />
      </Flex.Horizontal>
    </FieldBlock>
  </Flex.Stack>
</Form.Handler>
`}),X=({direction:e=`vertical`,showText:t=!1,hideLabel:n=!1}={})=>{let r={left:e===`horizontal`?`small`:null,top:e===`horizontal`?null:`small`},i={datePicker:`DatePicker:`,dropdown:`Dropdown:`,autocomplete:`Autocomplete:`,checkbox:`Checkbox`,radio:`Radio`,radioGroup:`Radio Group:`,toggleButton:`Toggle:`,toggleButtonGroup:`Toggle Group:`,switch:`Switch`,input:`Input:`,textarea:`Textarea:`,slider:`Slider:`};n&&(i=Object.entries(i).reduce((e,[t])=>(e[t]=``,e),{}));let a=()=>(0,z.jsxs)(z.Fragment,{children:[t&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(f,{...r,inline:!0,children:(0,z.jsxs)(`p`,{className:`dnb-p`,children:[`paragraph`,` `,(0,z.jsx)(c,{icon:`bell`,size:`medium`,...r,style:{margin:0}})]})}),`text`]}),(0,z.jsx)(p,{text:`Button`,...r}),(0,z.jsx)(p,{icon:`add`,...r}),(0,z.jsx)(m,{label:i.input,...r}),(0,z.jsx)(D,{label:i.dropdown,data:[`Item A`,`Item B`,`Item C`],...r}),(0,z.jsx)(h,{label:i.autocomplete,data:[`Item A`,`Item B`,`Item C`],...r}),(0,z.jsx)(T,{label:i.datePicker,...r}),(0,z.jsx)(c,{icon:`bell`,size:`medium`,...r}),(0,z.jsx)(x,{label:i.checkbox,...r}),(0,z.jsx)(b,{label:i.radio,...r}),(0,z.jsxs)(b.Group,{label:i.radioGroup,...r,children:[(0,z.jsx)(b,{label:i.radio,value:`a`}),(0,z.jsx)(b,{label:i.radio,value:`b`})]}),(0,z.jsx)(S,{label:i.toggleButton,text:`Toggle`,...r}),(0,z.jsxs)(S.Group,{label:i.toggleButtonGroup,...r,children:[(0,z.jsx)(S,{text:`Toggle A`,value:`a`}),(0,z.jsx)(S,{text:`Toggle B`,value:`b`})]}),(0,z.jsx)(P,{label:i.switch,...r}),(0,z.jsx)(A,{label:i.textarea,rows:`5`,...r}),(0,z.jsx)(`div`,{style:{display:`inline-flex`},children:(0,z.jsx)(k,{label:i.slider,value:50,...r})})]});return e===`horizontal`?(0,z.jsx)(C,{style:{padding:`1rem`,whiteSpace:`nowrap`},children:(0,z.jsx)(a,{})}):(a._supportsSpacingProps=!0,(0,z.jsx)(y,{style:{padding:`1rem`},children:(0,z.jsx)(a,{})}))},Z=e=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical`,...e,children:(0,z.jsx)(X,{direction:`vertical`})}),Q=e=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical-labels`,...e,children:(0,z.jsx)(X,{direction:`vertical`})}),$=e=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-horizontal`,...e,children:(0,z.jsx)(s,{formElement:{labelDirection:`horizontal`},children:(0,z.jsx)(g,{children:(0,z.jsx)(X,{direction:`horizontal`})})})});export{J as a,U as c,G as d,q as f,L as i,B as l,Q as n,Y as o,Z as r,H as s,$ as t,K as u};
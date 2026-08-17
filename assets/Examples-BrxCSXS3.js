import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{$ as i,J as a,K as o,g as s,tt as c}from"./Anchor-CUnuD5Cj.js";import{t as l}from"./MediaQuery-Bi4eJivm.js";import{c as u,s as d}from"./Space-DcWrO_6S.js";import{l as f,o as p,r as m,s as h,t as g,u as _}from"./ToggleButton-EPOyxk36.js";import{G as v,U as y,ht as b,j as x,mt as S,q as C,tt as w,w as T}from"./forms-D__hPZDv.js";import{t as E}from"./Space-BTDd9blr.js";import{t as D}from"./Button-CmA8Qaoz.js";import{F as O,t as k}from"./Autocomplete-DsgUfZ6R.js";import{t as A}from"./H2-BHwjJ88t.js";import{t as j}from"./Card-DZd-xLSg.js";import{t as M}from"./TestElement-B-MJGTyS.js";import{t as N}from"./Heading-Z0RGhEBm.js";import{t as P}from"./export-DpQkjcdy.js";import{t as F}from"./ComponentBox-DOwlXUSS.js";import{t as I}from"./ScrollView-DNXw-pl-.js";var L=e({AllComponentsHorizontalTestCase:()=>$,AllComponentsVerticalLabelsTestCase:()=>Q,AllComponentsVerticalTestCase:()=>Z,FormSetAlternativeAfter:()=>J,FormSetAlternativeForms:()=>Y,HorizontalFlexItemResponsiveSize:()=>H,HorizontalFlexItemResponsiveSizeCustomColumns:()=>U,LayoutComponents:()=>B,MediaQueryLiveExample:()=>K,MediaQueryUseMedia:()=>G,ResponsiveGridContainer:()=>q,colors:()=>V}),R=n(t()),z=n(r()),B=()=>(0,z.jsx)(F,{scope:{Field:x,Form:T},hideCode:!0,stableName:`LayoutComponents`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:h,Form:T,Card:j,Field:x},children:`<Flex.Stack>
  <Form.MainHeading>Profile</Form.MainHeading>

  <Form.Card>
    <Form.SubHeading>Name</Form.SubHeading>

    <Field.Name.First value="John" />
    <Field.Name.Last value="Smith" />
  </Form.Card>

  <Form.Card>
    <Form.SubHeading>More information</Form.SubHeading>

    <Field.NationalIdentityNumber value="20058512345" />
    <Field.Email value="john@smith.email" />
    <Field.PhoneNumber value="+4798765432" />
  </Form.Card>
</Flex.Stack>
`}),V=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],H=()=>(0,z.jsx)(F,{scope:{colors:V,TestElement:M},hideCode:!0,"data-visual-test":`flex-item-size`,stableName:`HorizontalFlexItemResponsiveSize`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:h},children:`<Flex.Container>
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
`}),U=()=>(0,z.jsx)(F,{hideCode:!0,scope:{colors:V,TestElement:M,Field:x,defaultBreakpoints:a,defaultQueries:d},"data-visual-test":`flex-item-custom-size`,stableName:`HorizontalFlexItemResponsiveSizeCustomColumns`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:h},noInline:!0,children:`const breakpoints = {
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
`}),W=()=>{let[e,t]=(0,R.useState)(typeof window<`u`?window.innerWidth:0);return(0,R.useEffect)(()=>{let e=()=>{t(window.innerWidth)};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),{innerWidth:e}},G=()=>(0,z.jsx)(F,{scope:{useMedia:u,useWindowWidth:W},hideCode:!0,stableName:`MediaQueryUseMedia`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Code:c},noInline:!0,children:`const Playground = () => {
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
`}),K=()=>(0,z.jsx)(F,{scope:{MediaQuery:l,useMediaQuery:o},hideCode:!0,stableName:`MediaQueryLiveExample`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Button:D,Switch:v,Code:c},noInline:!0,children:`const Playground = () => {
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
`}),q=()=>(0,z.jsx)(F,{hideCode:!0,scope:{TestElement:M,colors:V},stableName:`ResponsiveGridContainer`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Grid:P},children:`<Grid.Container rowGap columnGap>
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
`}),J=()=>(0,z.jsx)(F,{stableName:`FormSetAlternativeAfter`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Form:T,H2:A,Heading:N,FieldBlock:w,Flex:h,Input:O},children:`<Form.Handler>
  <H2 top={0}>Heading</H2>
  <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>
    <Flex.Horizontal>
      <Input label="Label A" />
      <Input label="Label B" />
    </Flex.Horizontal>
  </FieldBlock>
</Form.Handler>
`}),Y=()=>(0,z.jsx)(F,{stableName:`FormSetAlternativeForms`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Form:T,Flex:h,Heading:N,FieldBlock:w,Field:x},children:`<Form.Handler>
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
`}),X=({direction:e=`vertical`,showText:t=!1,hideLabel:n=!1,layoutEngine:r}={})=>{let i={left:e===`horizontal`?`small`:null,top:e===`horizontal`?null:`small`},a={datePicker:`DatePicker:`,dropdown:`Dropdown:`,autocomplete:`Autocomplete:`,checkbox:`Checkbox`,radio:`Radio`,radioGroup:`Radio Group:`,toggleButton:`Toggle:`,toggleButtonGroup:`Toggle Group:`,switch:`Switch`,input:`Input:`,textarea:`Textarea:`,slider:`Slider:`};n&&(a=Object.entries(a).reduce((e,[t])=>(e[t]=``,e),{}));let o=()=>(0,z.jsxs)(z.Fragment,{children:[t&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(E,{...i,inline:!0,children:(0,z.jsxs)(`p`,{className:`dnb-p`,children:[`paragraph`,` `,(0,z.jsx)(s,{icon:`bell`,size:`medium`,...i,style:{margin:0}})]})}),`text`]}),(0,z.jsx)(D,{text:`Button`,...i}),(0,z.jsx)(D,{icon:`add`,...i}),(0,z.jsx)(O,{label:a.input,...i}),(0,z.jsx)(S,{label:a.dropdown,data:[`Item A`,`Item B`,`Item C`],...i}),(0,z.jsx)(k,{label:a.autocomplete,data:[`Item A`,`Item B`,`Item C`],...i}),(0,z.jsx)(b,{label:a.datePicker,...i}),(0,z.jsx)(s,{icon:`bell`,size:`medium`,...i}),(0,z.jsx)(p,{label:a.checkbox,...i}),(0,z.jsx)(m,{label:a.radio,...i}),(0,z.jsxs)(m.Group,{label:a.radioGroup,...i,children:[(0,z.jsx)(m,{label:a.radio,value:`a`}),(0,z.jsx)(m,{label:a.radio,value:`b`})]}),(0,z.jsx)(g,{label:a.toggleButton,text:`Toggle`,...i}),(0,z.jsxs)(g.Group,{label:a.toggleButtonGroup,...i,children:[(0,z.jsx)(g,{text:`Toggle A`,value:`a`}),(0,z.jsx)(g,{text:`Toggle B`,value:`b`})]}),(0,z.jsx)(v,{label:a.switch,...i}),(0,z.jsx)(y,{label:a.textarea,rows:`5`,...i}),(0,z.jsx)(`div`,{style:{display:`inline-flex`},children:(0,z.jsx)(C,{label:a.slider,value:50,...i})})]});return e===`horizontal`?(0,z.jsx)(_,{layoutEngine:r,style:{padding:`1rem`,whiteSpace:`nowrap`},children:(0,z.jsx)(o,{})}):(o._supportsSpacingProps=!0,(0,z.jsx)(f,{layoutEngine:r,style:{padding:`1rem`},children:(0,z.jsx)(o,{})}))},Z=({layoutEngine:e,...t})=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical`,...t,children:(0,z.jsx)(X,{direction:`vertical`,layoutEngine:e})}),Q=({layoutEngine:e,...t})=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical-labels`,...t,children:(0,z.jsx)(X,{direction:`vertical`,layoutEngine:e})}),$=({layoutEngine:e,...t})=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-horizontal`,...t,children:(0,z.jsx)(i,{formElement:{labelDirection:`horizontal`},children:(0,z.jsx)(I,{children:(0,z.jsx)(X,{direction:`horizontal`,layoutEngine:e})})})});export{J as a,U as c,G as d,q as f,L as i,B as l,Q as n,Y as o,Z as r,H as s,$ as t,K as u};
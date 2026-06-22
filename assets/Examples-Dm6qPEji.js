import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{J as i,K as a,Q as o,et as s,g as c}from"./Anchor-CDwNjfi4.js";import{t as l}from"./MediaQuery-DCjR9a4O.js";import{c as u,s as d}from"./Space-CvwsUpPG.js";import{c as f,l as p,r as m,s as h,t as g,u as _}from"./ToggleButton-DoxBGtHF.js";import{G as v,U as y,j as b,mt as x,pt as S,q as C,tt as w,w as T}from"./forms-CsJzlVUF.js";import{t as E}from"./Space-DFk-scwu.js";import{t as D}from"./Button-QIkiaQEp.js";import{F as O,t as k}from"./Autocomplete-CcXvXMYE.js";import{u as A}from"./Table-D3iIoHmL.js";import{t as j}from"./H2-CDxBDFS_.js";import{t as M}from"./Card-DP9KYSzC.js";import{t as N}from"./TestElement-D-t3kpSj.js";import{t as P}from"./Heading-CDZ3ehTc.js";import{t as F}from"./export-BSBgn3cP.js";import{t as I}from"./ComponentBox-q_23Ylzi.js";var L=e({AllComponentsHorizontalTestCase:()=>$,AllComponentsVerticalLabelsTestCase:()=>Q,AllComponentsVerticalTestCase:()=>Z,FormSetAlternativeAfter:()=>J,FormSetAlternativeForms:()=>Y,HorizontalFlexItemResponsiveSize:()=>H,HorizontalFlexItemResponsiveSizeCustomColumns:()=>U,LayoutComponents:()=>B,MediaQueryLiveExample:()=>K,MediaQueryUseMedia:()=>G,ResponsiveGridContainer:()=>q,colors:()=>V}),R=n(t()),z=n(r()),B=()=>(0,z.jsx)(I,{scope:{Field:b,Form:T},hideCode:!0,stableName:`LayoutComponents`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:f,Form:T,Card:M,Field:b},children:`<Flex.Stack>
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
`}),V=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],H=()=>(0,z.jsx)(I,{scope:{colors:V,TestElement:N},hideCode:!0,"data-visual-test":`flex-item-size`,stableName:`HorizontalFlexItemResponsiveSize`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:f},children:`<Flex.Container>
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
`}),U=()=>(0,z.jsx)(I,{hideCode:!0,scope:{colors:V,TestElement:N,Field:b,defaultBreakpoints:i,defaultQueries:d},"data-visual-test":`flex-item-custom-size`,stableName:`HorizontalFlexItemResponsiveSizeCustomColumns`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:f},noInline:!0,children:`const breakpoints = {
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
`}),W=()=>{let[e,t]=(0,R.useState)(typeof window<`u`?window.innerWidth:0);return(0,R.useEffect)(()=>{let e=()=>{t(window.innerWidth)};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),{innerWidth:e}},G=()=>(0,z.jsx)(I,{scope:{useMedia:u,useWindowWidth:W},hideCode:!0,stableName:`MediaQueryUseMedia`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Code:s},noInline:!0,children:`const Playground = () => {
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
`}),K=()=>(0,z.jsx)(I,{scope:{MediaQuery:l,useMediaQuery:a},hideCode:!0,stableName:`MediaQueryLiveExample`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Button:D,Switch:v,Code:s},noInline:!0,children:`const Playground = () => {
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
`}),q=()=>(0,z.jsx)(I,{hideCode:!0,scope:{TestElement:N,colors:V},stableName:`ResponsiveGridContainer`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Grid:F},children:`<Grid.Container rowGap columnGap>
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
`}),J=()=>(0,z.jsx)(I,{stableName:`FormSetAlternativeAfter`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Form:T,H2:j,Heading:P,FieldBlock:w,Flex:f,Input:O},children:`<Form.Handler>
  <H2 top={0}>Heading</H2>
  <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>
    <Flex.Horizontal>
      <Input label="Label A" />
      <Input label="Label B" />
    </Flex.Horizontal>
  </FieldBlock>
</Form.Handler>
`}),Y=()=>(0,z.jsx)(I,{stableName:`FormSetAlternativeForms`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Form:T,Flex:f,Heading:P,FieldBlock:w,Field:b},children:`<Form.Handler>
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
`}),X=({direction:e=`vertical`,showText:t=!1,hideLabel:n=!1}={})=>{let r={left:e===`horizontal`?`small`:null,top:e===`horizontal`?null:`small`},i={datePicker:`DatePicker:`,dropdown:`Dropdown:`,autocomplete:`Autocomplete:`,checkbox:`Checkbox`,radio:`Radio`,radioGroup:`Radio Group:`,toggleButton:`Toggle:`,toggleButtonGroup:`Toggle Group:`,switch:`Switch`,input:`Input:`,textarea:`Textarea:`,slider:`Slider:`};n&&(i=Object.entries(i).reduce((e,[t])=>(e[t]=``,e),{}));let a=()=>(0,z.jsxs)(z.Fragment,{children:[t&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(E,{...r,inline:!0,children:(0,z.jsxs)(`p`,{className:`dnb-p`,children:[`paragraph`,` `,(0,z.jsx)(c,{icon:`bell`,size:`medium`,...r,style:{margin:0}})]})}),`text`]}),(0,z.jsx)(D,{text:`Button`,...r}),(0,z.jsx)(D,{icon:`add`,...r}),(0,z.jsx)(O,{label:i.input,...r}),(0,z.jsx)(S,{label:i.dropdown,data:[`Item A`,`Item B`,`Item C`],...r}),(0,z.jsx)(k,{label:i.autocomplete,data:[`Item A`,`Item B`,`Item C`],...r}),(0,z.jsx)(x,{label:i.datePicker,...r}),(0,z.jsx)(c,{icon:`bell`,size:`medium`,...r}),(0,z.jsx)(h,{label:i.checkbox,...r}),(0,z.jsx)(m,{label:i.radio,...r}),(0,z.jsxs)(m.Group,{label:i.radioGroup,...r,children:[(0,z.jsx)(m,{label:i.radio,value:`a`}),(0,z.jsx)(m,{label:i.radio,value:`b`})]}),(0,z.jsx)(g,{label:i.toggleButton,text:`Toggle`,...r}),(0,z.jsxs)(g.Group,{label:i.toggleButtonGroup,...r,children:[(0,z.jsx)(g,{text:`Toggle A`,value:`a`}),(0,z.jsx)(g,{text:`Toggle B`,value:`b`})]}),(0,z.jsx)(v,{label:i.switch,...r}),(0,z.jsx)(y,{label:i.textarea,rows:`5`,...r}),(0,z.jsx)(`div`,{style:{display:`inline-flex`},children:(0,z.jsx)(C,{label:i.slider,value:50,...r})})]});return e===`horizontal`?(0,z.jsx)(_,{style:{padding:`1rem`,whiteSpace:`nowrap`},children:(0,z.jsx)(a,{})}):(a._supportsSpacingProps=!0,(0,z.jsx)(p,{style:{padding:`1rem`},children:(0,z.jsx)(a,{})}))},Z=e=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical`,...e,children:(0,z.jsx)(X,{direction:`vertical`})}),Q=e=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical-labels`,...e,children:(0,z.jsx)(X,{direction:`vertical`})}),$=e=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-horizontal`,...e,children:(0,z.jsx)(o,{formElement:{labelDirection:`horizontal`},children:(0,z.jsx)(A,{children:(0,z.jsx)(X,{direction:`horizontal`})})})});export{J as a,U as c,G as d,q as f,L as i,B as l,Q as n,Y as o,Z as r,H as s,$ as t,K as u};
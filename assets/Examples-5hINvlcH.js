import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{n,t as r}from"./jsx-runtime-BgMs7Gb-.js";import{t as i}from"./MediaQuery-BgjqBtCf.js";import{t as a}from"./H2-DdnHe8Vl.js";import{t as o}from"./Card-M3YCnXL2.js";import{t as s}from"./DatePicker-NdS9kmhi.js";import{t as c}from"./export-B-7Fh9Xt.js";import{t as l}from"./Slider-DDql3QUf.js";import{g as u}from"./Upload-IGOQE-LV.js";import{t as d}from"./Form-CCz-rEVh.js";import{t as f}from"./TestElement-6sNBAjfM.js";import{t as p}from"./Field-B1tS3XXm.js";import{E as m,Ft as h,Hi as g,Ht as _,Ii as v,Lr as y,Mi as b,Sn as x,Un as S,Ut as C,Wi as w,dn as T,en as E,fn as D,gr as O,ji as k,ri as A,sn as j,tn as M,un as N,wr as P,zi as F}from"./index-mmuoVhax.js";import{t as I}from"./ComponentBox-XDAvsf_r.js";var L=t({AllComponentsHorizontalTestCase:()=>$,AllComponentsVerticalLabelsTestCase:()=>Q,AllComponentsVerticalTestCase:()=>Z,FormSetAlternativeAfter:()=>J,FormSetAlternativeForms:()=>Y,HorizontalFlexItemResponsiveSize:()=>H,HorizontalFlexItemResponsiveSizeCustomColumns:()=>U,LayoutComponents:()=>B,MediaQueryLiveExample:()=>K,MediaQueryUseMedia:()=>G,ResponsiveGridContainer:()=>q,colors:()=>V}),R=e(n()),z=e(r()),B=()=>(0,z.jsx)(I,{scope:{Field:p,Form:d},hideCode:!0,stableName:`LayoutComponents`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:N,Form:d,Card:o,Field:p},children:`<Flex.Stack>
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
`}),V=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],H=()=>(0,z.jsx)(I,{scope:{colors:V,TestElement:f},hideCode:!0,"data-visual-test":`flex-item-size`,stableName:`HorizontalFlexItemResponsiveSize`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:N},children:`<Flex.Container>
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
`}),U=()=>(0,z.jsx)(I,{hideCode:!0,scope:{colors:V,TestElement:f,Field:p,defaultBreakpoints:F,defaultQueries:k},"data-visual-test":`flex-item-custom-size`,stableName:`HorizontalFlexItemResponsiveSizeCustomColumns`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Flex:N},noInline:!0,children:`const breakpoints = {
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
`}),W=()=>{let[e,t]=(0,R.useState)(typeof window<`u`?window.innerWidth:0);return(0,R.useEffect)(()=>{let e=()=>{t(window.innerWidth)};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),{innerWidth:e}},G=()=>(0,z.jsx)(I,{scope:{useMedia:b,useWindowWidth:W},hideCode:!0,stableName:`MediaQueryUseMedia`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Code:w},noInline:!0,children:`const Playground = () => {
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
`}),K=()=>(0,z.jsx)(I,{scope:{MediaQuery:i,useMediaQuery:v},hideCode:!0,stableName:`MediaQueryLiveExample`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Button:P,Switch:_,Code:w},noInline:!0,children:`const Playground = () => {
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
`}),q=()=>(0,z.jsx)(I,{hideCode:!0,scope:{TestElement:f,colors:V},stableName:`ResponsiveGridContainer`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Grid:c},children:`<Grid.Container rowGap columnGap>
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
`}),J=()=>(0,z.jsx)(I,{stableName:`FormSetAlternativeAfter`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Form:d,H2:a,Heading:E,FieldBlock:m,Flex:N,Input:O},children:`<Form.Handler>
  <H2 top={0}>Heading</H2>
  <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>
    <Flex.Horizontal>
      <Input label="Label A" />
      <Input label="Label B" />
    </Flex.Horizontal>
  </FieldBlock>
</Form.Handler>
`}),Y=()=>(0,z.jsx)(I,{stableName:`FormSetAlternativeForms`,sourceImports:[`import { useEffect, useState, CSSProperties, HTMLProps } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Input, H2, Button, ToggleButton, Flex, Switch, Textarea, Slider, Radio, Checkbox, IconPrimary, DatePicker, Autocomplete, Dropdown, Space, Code, Grid } from '@dnb/eufemia'`,`import { TestElement, Field, Form, FieldBlock } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery, Provider } from '@dnb/eufemia/shared'`,`import { SpacingElementProps } from '@dnb/eufemia/shared/types'`,`import { ScrollView } from '@dnb/eufemia/fragments'`],__buildScope:{Form:d,Flex:N,Heading:E,FieldBlock:m,Field:p},children:`<Form.Handler>
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
`}),X=({direction:e=`vertical`,showText:t=!1,hideLabel:n=!1}={})=>{let r={left:e===`horizontal`?`small`:null,top:e===`horizontal`?null:`small`},i={datePicker:`DatePicker:`,dropdown:`Dropdown:`,autocomplete:`Autocomplete:`,checkbox:`Checkbox`,radio:`Radio`,radioGroup:`Radio Group:`,toggleButton:`Toggle:`,toggleButtonGroup:`Toggle Group:`,switch:`Switch`,input:`Input:`,textarea:`Textarea:`,slider:`Slider:`};n&&(i=Object.entries(i).reduce((e,[t])=>(e[t]=``,e),{}));let a=()=>(0,z.jsxs)(z.Fragment,{children:[t&&(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(y,{...r,inline:!0,children:(0,z.jsxs)(`p`,{className:`dnb-p`,children:[`paragraph`,` `,(0,z.jsx)(A,{icon:`bell`,size:`medium`,...r,style:{margin:0}})]})}),`text`]}),(0,z.jsx)(P,{text:`Button`,...r}),(0,z.jsx)(P,{icon:`add`,...r}),(0,z.jsx)(O,{label:i.input,...r}),(0,z.jsx)(M,{label:i.dropdown,data:[`Item A`,`Item B`,`Item C`],...r}),(0,z.jsx)(S,{label:i.autocomplete,data:[`Item A`,`Item B`,`Item C`],...r}),(0,z.jsx)(s,{label:i.datePicker,...r}),(0,z.jsx)(A,{icon:`bell`,size:`medium`,...r}),(0,z.jsx)(j,{label:i.checkbox,...r}),(0,z.jsx)(C,{label:i.radio,...r}),(0,z.jsxs)(C.Group,{label:i.radioGroup,...r,children:[(0,z.jsx)(C,{label:i.radio,value:`a`}),(0,z.jsx)(C,{label:i.radio,value:`b`})]}),(0,z.jsx)(h,{label:i.toggleButton,text:`Toggle`,...r}),(0,z.jsxs)(h.Group,{label:i.toggleButtonGroup,...r,children:[(0,z.jsx)(h,{text:`Toggle A`,value:`a`}),(0,z.jsx)(h,{text:`Toggle B`,value:`b`})]}),(0,z.jsx)(_,{label:i.switch,...r}),(0,z.jsx)(u,{label:i.textarea,rows:`5`,...r}),(0,z.jsx)(`div`,{style:{display:`inline-flex`},children:(0,z.jsx)(l,{label:i.slider,value:50,...r})})]});return e===`horizontal`?(0,z.jsx)(D,{style:{padding:`1rem`,whiteSpace:`nowrap`},children:(0,z.jsx)(a,{})}):(a._supportsSpacingProps=!0,(0,z.jsx)(T,{style:{padding:`1rem`},children:(0,z.jsx)(a,{})}))},Z=e=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical`,...e,children:(0,z.jsx)(X,{direction:`vertical`})}),Q=e=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical-labels`,...e,children:(0,z.jsx)(X,{direction:`vertical`})}),$=e=>(0,z.jsx)(`div`,{"data-visual-test":`form-components-alignment-horizontal`,...e,children:(0,z.jsx)(g,{formElement:{labelDirection:`horizontal`},children:(0,z.jsx)(x,{children:(0,z.jsx)(X,{direction:`horizontal`})})})});export{J as a,U as c,G as d,q as f,L as i,B as l,Q as n,Y as o,Z as r,H as s,$ as t,K as u};
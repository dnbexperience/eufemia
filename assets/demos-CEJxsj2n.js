import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{J as i,K as a,et as o}from"./Anchor-CDwNjfi4.js";import{t as s}from"./MediaQuery-DCjR9a4O.js";import{c,s as l}from"./Space-CvwsUpPG.js";import{c as u}from"./ToggleButton-DoxBGtHF.js";import{G as d,j as f,q as p,tt as m,w as h}from"./forms-CsJzlVUF.js";import{t as g}from"./Button-QIkiaQEp.js";import{t as _}from"./Card-DP9KYSzC.js";import{t as v}from"./TestElement-D-t3kpSj.js";import{B as y}from"./index-DdG6L_K8.js";import{t as b}from"./ComponentBox-q_23Ylzi.js";var x=e({HorizontalAutoSize:()=>O,HorizontalFlexItemResponsiveSize:()=>E,HorizontalFlexItemResponsiveSizeCustomColumns:()=>D,LayoutComponents:()=>w,MediaQueryLiveExample:()=>j,MediaQueryUseMedia:()=>A,colors:()=>T}),S=n(t()),C=n(r()),w=()=>(0,C.jsx)(b,{scope:{Field:f,Form:h},stableName:`LayoutComponents`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Flex:u,Form:h,Card:_,Field:f},children:`<Flex.Stack>
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
`}),T=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],E=()=>(0,C.jsx)(b,{scope:{colors:T,TestElement:v},"data-visual-test":`flex-item-size`,stableName:`HorizontalFlexItemResponsiveSize`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Flex:u},children:`<Flex.Container>
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
`}),D=()=>(0,C.jsx)(b,{scope:{colors:T,TestElement:v,Field:f,defaultBreakpoints:i,defaultQueries:l},stableName:`HorizontalFlexItemResponsiveSizeCustomColumns`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Flex:u},noInline:!0,children:`const breakpoints = {
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
`}),O=()=>(0,C.jsx)(b,{scope:{Field:f,FieldBlock:m},hideCode:!0,stableName:`HorizontalAutoSize`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{FieldBlock:m,Flex:u,Field:f,Slider:p},children:`<FieldBlock label="Label">
  <Flex.Container>
    <Flex.Item
      span={{
        small: 12,
        large: 'auto',
      }}
    >
      <Field.Name.First path="/firstName" width="medium" minLength={2} />
    </Flex.Item>
    <Flex.Item
      span={{
        small: 12,
        large: 'auto',
      }}
    >
      <Field.Name.Last path="/lastName" width="medium" required />
    </Flex.Item>
    <Flex.Item
      span={{
        small: 12,
        large: 'auto',
      }}
    >
      <FieldBlock width="large">
        <Slider
          min={1900}
          max={new Date().getFullYear()}
          step={1}
          value={2010}
          label="Birth year"
          tooltip
          alwaysShowTooltip
        />
      </FieldBlock>
    </Flex.Item>
  </Flex.Container>
</FieldBlock>
`}),k=()=>{let[e,t]=(0,S.useState)(typeof window<`u`?window.innerWidth:0);return(0,S.useEffect)(()=>{let e=()=>{t(window.innerWidth)};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),{innerWidth:e}},A=()=>(0,C.jsx)(b,{scope:{useMedia:c,useWindowWidth:k},hideCode:!0,stableName:`MediaQueryUseMedia`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Code:o},noInline:!0,children:`const Playground = () => {
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
`}),j=()=>(0,C.jsx)(b,{scope:{MediaQuery:s,useMediaQuery:a},hideCode:!0,stableName:`MediaQueryLiveExample`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Button:g,Switch:d,Code:o},noInline:!0,children:`const Playground = () => {
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
`});function M(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...y(),...e.components};return x||P(`Examples`,!1),E||P(`Examples.HorizontalFlexItemResponsiveSize`,!0),D||P(`Examples.HorizontalFlexItemResponsiveSizeCustomColumns`,!0),w||P(`Examples.LayoutComponents`,!0),(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(t.h2,{children:`Demos`}),`
`,(0,C.jsx)(t.h3,{children:`Used in forms`}),`
`,(0,C.jsx)(w,{}),`
`,(0,C.jsx)(t.h3,{children:`Responsive Flex.Item`}),`
`,(0,C.jsxs)(t.p,{children:[`With the default `,(0,C.jsx)(t.code,{children:`sizeCount`}),` of 12 parts.`]}),`
`,(0,C.jsx)(E,{}),`
`,(0,C.jsx)(t.h3,{children:`Customized Flex.Item spans`}),`
`,(0,C.jsxs)(t.p,{children:[`With a custom amount of 4 parts (`,(0,C.jsx)(t.code,{children:`sizeCount`}),`) as well as custom breakpoints and media queries.`]}),`
`,(0,C.jsx)(D,{})]})}function N(e={}){let{wrapper:t}={...y(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(M,{...e})}):M(e)}function P(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{N as default};
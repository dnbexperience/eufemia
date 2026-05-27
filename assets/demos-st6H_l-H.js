import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{n,t as r}from"./jsx-runtime-BgMs7Gb-.js";import{t as i}from"./MediaQuery-BgjqBtCf.js";import{t as a}from"./Card-M3YCnXL2.js";import{t as o}from"./Slider-DDql3QUf.js";import{t as s}from"./Form-CCz-rEVh.js";import{t as c}from"./TestElement-6sNBAjfM.js";import{t as l}from"./Field-B1tS3XXm.js";import{E as u,Ht as d,Ii as f,Mi as p,Rr as m,Wi as h,ji as g,un as _,wr as v,zi as y}from"./index-mmuoVhax.js";import{t as b}from"./ComponentBox-XDAvsf_r.js";var x=t({HorizontalAutoSize:()=>O,HorizontalFlexItemResponsiveSize:()=>E,HorizontalFlexItemResponsiveSizeCustomColumns:()=>D,LayoutComponents:()=>w,MediaQueryLiveExample:()=>j,MediaQueryUseMedia:()=>A,colors:()=>T}),S=e(n()),C=e(r()),w=()=>(0,C.jsx)(b,{scope:{Field:l,Form:s},stableName:`LayoutComponents`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Flex:_,Form:s,Card:a,Field:l},children:`<Flex.Stack>
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
`}),T=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],E=()=>(0,C.jsx)(b,{scope:{colors:T,TestElement:c},"data-visual-test":`flex-item-size`,stableName:`HorizontalFlexItemResponsiveSize`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Flex:_},children:`<Flex.Container>
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
`}),D=()=>(0,C.jsx)(b,{scope:{colors:T,TestElement:c,Field:l,defaultBreakpoints:y,defaultQueries:g},stableName:`HorizontalFlexItemResponsiveSizeCustomColumns`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Flex:_},noInline:!0,children:`const breakpoints = {
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
`}),O=()=>(0,C.jsx)(b,{scope:{Field:l,FieldBlock:u},hideCode:!0,stableName:`HorizontalAutoSize`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{FieldBlock:u,Flex:_,Field:l,Slider:o},children:`<FieldBlock label="Label">
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
`}),k=()=>{let[e,t]=(0,S.useState)(typeof window<`u`?window.innerWidth:0);return(0,S.useEffect)(()=>{let e=()=>{t(window.innerWidth)};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),{innerWidth:e}},A=()=>(0,C.jsx)(b,{scope:{useMedia:p,useWindowWidth:k},hideCode:!0,stableName:`MediaQueryUseMedia`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Code:h},noInline:!0,children:`const Playground = () => {
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
`}),j=()=>(0,C.jsx)(b,{scope:{MediaQuery:i,useMediaQuery:f},hideCode:!0,stableName:`MediaQueryLiveExample`,sourceImports:[`import { useEffect, useState, CSSProperties } from 'react'`,`import styled from '@emotion/styled'`,`import MediaQuery from '@dnb/eufemia/shared/MediaQuery'`,`import { Slider, Code, Button, Flex } from '@dnb/eufemia'`,`import { TestElement, Field, FieldBlock, Form } from '@dnb/eufemia/extensions/forms'`,`import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'`,`import { defaultQueries } from '@dnb/eufemia/shared/useMedia'`,`import { useMedia, useMediaQuery } from '@dnb/eufemia/shared'`],__buildScope:{Button:v,Switch:d,Code:h},noInline:!0,children:`const Playground = () => {
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
`});function M(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...m(),...e.components};return x||P(`Examples`,!1),E||P(`Examples.HorizontalFlexItemResponsiveSize`,!0),D||P(`Examples.HorizontalFlexItemResponsiveSizeCustomColumns`,!0),w||P(`Examples.LayoutComponents`,!0),(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(t.h2,{children:`Demos`}),`
`,(0,C.jsx)(t.h3,{children:`Used in forms`}),`
`,(0,C.jsx)(w,{}),`
`,(0,C.jsx)(t.h3,{children:`Responsive Flex.Item`}),`
`,(0,C.jsxs)(t.p,{children:[`With the default `,(0,C.jsx)(t.code,{children:`sizeCount`}),` of 12 parts.`]}),`
`,(0,C.jsx)(E,{}),`
`,(0,C.jsx)(t.h3,{children:`Customized Flex.Item spans`}),`
`,(0,C.jsxs)(t.p,{children:[`With a custom amount of 4 parts (`,(0,C.jsx)(t.code,{children:`sizeCount`}),`) as well as custom breakpoints and media queries.`]}),`
`,(0,C.jsx)(D,{})]})}function N(e={}){let{wrapper:t}={...m(),...e.components};return t?(0,C.jsx)(t,{...e,children:(0,C.jsx)(M,{...e})}):M(e)}function P(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{N as default};
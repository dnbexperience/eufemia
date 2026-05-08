import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{n,t as r}from"./jsx-runtime-BgMs7Gb-.js";import{t as i}from"./MediaQuery-DzftodFy.js";import{C as a,t as o,u as s}from"./ComponentBox-C64JNWnl.js";import{t as c}from"./TestElement-DQpgIGiP.js";import{Ci as l,Lr as u,Oi as d,ji as f,p,wi as m}from"./index-2AO2Cu5K.js";var h=t({HorizontalAutoSize:()=>S,HorizontalFlexItemResponsiveSize:()=>b,HorizontalFlexItemResponsiveSizeCustomColumns:()=>x,LayoutComponents:()=>v,MediaQueryLiveExample:()=>T,MediaQueryUseMedia:()=>w,colors:()=>y}),g=e(n()),_=r(),v=()=>(0,_.jsx)(o,{scope:{Field:a,Form:s},children:`<Flex.Stack>
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
`}),y=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],b=()=>(0,_.jsx)(o,{scope:{colors:y,TestElement:c},"data-visual-test":`flex-item-size`,children:`<Flex.Container>
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
`}),x=()=>(0,_.jsx)(o,{scope:{colors:y,TestElement:c,Field:a,defaultBreakpoints:f,defaultQueries:l},noInline:!0,children:`const breakpoints = {
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
`}),S=()=>(0,_.jsx)(o,{scope:{Field:a,FieldBlock:p},hideCode:!0,children:`<FieldBlock label="Label">
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
`}),C=()=>{let[e,t]=(0,g.useState)(typeof window<`u`?window.innerWidth:0);return(0,g.useEffect)(()=>{let e=()=>{t(window.innerWidth)};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),{innerWidth:e}},w=()=>(0,_.jsx)(o,{scope:{useMedia:m,useWindowWidth:C},hideCode:!0,noInline:!0,children:`const Playground = () => {
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
`}),T=()=>(0,_.jsx)(o,{scope:{MediaQuery:i,useMediaQuery:d},hideCode:!0,noInline:!0,children:`const Playground = () => {
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
`});function E(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...u(),...e.components};return h||O(`Examples`,!1),b||O(`Examples.HorizontalFlexItemResponsiveSize`,!0),x||O(`Examples.HorizontalFlexItemResponsiveSizeCustomColumns`,!0),v||O(`Examples.LayoutComponents`,!0),(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(t.h2,{children:`Demos`}),`
`,(0,_.jsx)(t.h3,{children:`Used in forms`}),`
`,(0,_.jsx)(v,{}),`
`,(0,_.jsx)(t.h3,{children:`Responsive Flex.Item`}),`
`,(0,_.jsxs)(t.p,{children:[`With the default `,(0,_.jsx)(t.code,{children:`sizeCount`}),` of 12 parts.`]}),`
`,(0,_.jsx)(b,{}),`
`,(0,_.jsx)(t.h3,{children:`Customized Flex.Item spans`}),`
`,(0,_.jsxs)(t.p,{children:[`With a custom amount of 4 parts (`,(0,_.jsx)(t.code,{children:`sizeCount`}),`) as well as custom breakpoints and media queries.`]}),`
`,(0,_.jsx)(x,{})]})}function D(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(E,{...e})}):E(e)}function O(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{D as default};
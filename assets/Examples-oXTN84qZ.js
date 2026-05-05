import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{n,t as r}from"./jsx-runtime-BgMs7Gb-.js";import{t as i}from"./MediaQuery-jEjuM2UV.js";import{A as a,C as o,W as s,j as c,t as l,u}from"./ComponentBox-geTEYZ7b.js";import{t as d}from"./TestElement-7TlpAKwo.js";import{$t as f,Fi as p,Gn as m,Ir as h,Mi as g,Mt as _,Rt as v,Ti as y,_n as b,cn as x,in as S,ki as C,ln as w,rr as T,ti as E,wi as D,wr as O,zt as k}from"./index-CMgyXmp3.js";var A=t({AllComponentsHorizontalTestCase:()=>K,AllComponentsVerticalLabelsTestCase:()=>G,AllComponentsVerticalTestCase:()=>W,FormSetAlternativeAfter:()=>V,FormSetAlternativeForms:()=>H,HorizontalFlexItemResponsiveSize:()=>F,HorizontalFlexItemResponsiveSizeCustomColumns:()=>I,LayoutComponents:()=>N,MediaQueryLiveExample:()=>z,MediaQueryUseMedia:()=>R,ResponsiveGridContainer:()=>B,colors:()=>P}),j=e(n()),M=r(),N=()=>(0,M.jsx)(l,{scope:{Field:o,Form:u},hideCode:!0,children:`<Flex.Stack>
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
`}),P=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],F=()=>(0,M.jsx)(l,{scope:{colors:P,TestElement:d},hideCode:!0,"data-visual-test":`flex-item-size`,children:`<Flex.Container>
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
`}),I=()=>(0,M.jsx)(l,{hideCode:!0,scope:{colors:P,TestElement:d,Field:o,defaultBreakpoints:g,defaultQueries:D},"data-visual-test":`flex-item-custom-size`,noInline:!0,children:`const breakpoints = {
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
`}),L=()=>{let[e,t]=j.useState(typeof window<`u`?window.innerWidth:0);return j.useEffect(()=>{let e=()=>{t(window.innerWidth)};return window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]),{innerWidth:e}},R=()=>(0,M.jsx)(l,{scope:{useMedia:y,useWindowWidth:L},hideCode:!0,noInline:!0,children:`const Playground = () => {
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
`}),z=()=>(0,M.jsx)(l,{scope:{MediaQuery:i,useMediaQuery:C},hideCode:!0,noInline:!0,children:`const Playground = () => {
  const [query, updateQuery] = React.useState({
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
  React.useEffect(() => {
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
`}),B=()=>(0,M.jsx)(l,{hideCode:!0,scope:{TestElement:d,colors:P},children:`<Grid.Container rowGap columnGap>
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
`}),V=()=>(0,M.jsx)(l,{children:`<Form.Handler>
  <H2 top={0}>Heading</H2>
  <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>
    <Flex.Horizontal>
      <Input label="Label A" />
      <Input label="Label B" />
    </Flex.Horizontal>
  </FieldBlock>
</Form.Handler>
`}),H=()=>(0,M.jsx)(l,{children:`<Form.Handler>
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
`}),U=({direction:e=`vertical`,showText:t=!1,hideLabel:n=!1}={})=>{let r={left:e===`horizontal`?`small`:null,top:e===`horizontal`?null:`small`},i={datePicker:`DatePicker:`,dropdown:`Dropdown:`,autocomplete:`Autocomplete:`,checkbox:`Checkbox`,radio:`Radio`,radioGroup:`Radio Group:`,toggleButton:`Toggle:`,toggleButtonGroup:`Toggle Group:`,switch:`Switch`,input:`Input:`,textarea:`Textarea:`,slider:`Slider:`};n&&(i=Object.entries(i).reduce((e,[t])=>(e[t]=``,e),{}));let o=()=>(0,M.jsxs)(M.Fragment,{children:[t&&(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(h,{...r,inline:!0,children:(0,M.jsxs)(`p`,{className:`dnb-p`,children:[`paragraph`,` `,(0,M.jsx)(E,{icon:`bell`,size:`medium`,...r,style:{margin:0}})]})}),`text`]}),(0,M.jsx)(O,{text:`Button`,...r}),(0,M.jsx)(O,{icon:`add`,...r}),(0,M.jsx)(m,{label:i.input,...r}),(0,M.jsx)(f,{label:i.dropdown,data:[`Item A`,`Item B`,`Item C`],...r}),(0,M.jsx)(b,{label:i.autocomplete,data:[`Item A`,`Item B`,`Item C`],...r}),(0,M.jsx)(s,{label:i.datePicker,...r}),(0,M.jsx)(E,{icon:`bell`,size:`medium`,...r}),(0,M.jsx)(S,{label:i.checkbox,...r}),(0,M.jsx)(k,{label:i.radio,...r}),(0,M.jsxs)(k.Group,{label:i.radioGroup,...r,children:[(0,M.jsx)(k,{label:i.radio,value:`a`}),(0,M.jsx)(k,{label:i.radio,value:`b`})]}),(0,M.jsx)(_,{label:i.toggleButton,text:`Toggle`,...r}),(0,M.jsxs)(_.Group,{label:i.toggleButtonGroup,...r,children:[(0,M.jsx)(_,{text:`Toggle A`,value:`a`}),(0,M.jsx)(_,{text:`Toggle B`,value:`b`})]}),(0,M.jsx)(v,{label:i.switch,...r}),(0,M.jsx)(a,{label:i.textarea,rows:`5`,...r}),(0,M.jsx)(`div`,{style:{display:`inline-flex`},children:(0,M.jsx)(c,{label:i.slider,value:50,...r})})]});return e===`horizontal`?(0,M.jsx)(w,{style:{padding:`1rem`,whiteSpace:`nowrap`},children:(0,M.jsx)(o,{})}):(o._supportsSpacingProps=!0,(0,M.jsx)(x,{style:{padding:`1rem`},children:(0,M.jsx)(o,{})}))},W=e=>(0,M.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical`,...e,children:(0,M.jsx)(U,{direction:`vertical`})}),G=e=>(0,M.jsx)(`div`,{"data-visual-test":`form-components-alignment-vertical-labels`,...e,children:(0,M.jsx)(U,{direction:`vertical`})}),K=e=>(0,M.jsx)(`div`,{"data-visual-test":`form-components-alignment-horizontal`,...e,children:(0,M.jsx)(p,{formElement:{labelDirection:`horizontal`},children:(0,M.jsx)(T,{children:(0,M.jsx)(U,{direction:`horizontal`})})})});export{V as a,I as c,R as d,B as f,A as i,N as l,G as n,H as o,W as r,F as s,K as t,z as u};
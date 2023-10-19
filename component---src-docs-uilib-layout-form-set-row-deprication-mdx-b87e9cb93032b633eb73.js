"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[34260],{66763:function(e,n,t){t.r(n);var l=t(52322),r=t(45392),i=t(84285);function a(e){const n=Object.assign({h2:"h2",p:"p",a:"a"},(0,r.ah)(),e.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Depreciation"}),"\n",(0,l.jsxs)(n.p,{children:["In order to replace FormSet or FormRow you may use the Eufemia ",(0,l.jsx)(n.a,{href:"/uilib/usage/customisation/provider-info",children:"Provider"})," and ",(0,l.jsx)(n.a,{href:"/uilib/layout/flex",children:"Flex"})," as well as the Eufemia ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms",children:"Forms Extension"}),"."]}),"\n",(0,l.jsx)(n.p,{children:"e.g. before:"}),"\n",(0,l.jsx)(i.FormSetAlternativeBefore,{}),"\n",(0,l.jsx)(n.p,{children:"e.g. after (two examples):"}),"\n",(0,l.jsx)(i.FormSetAlternativeAfter,{}),"\n",(0,l.jsx)(i.FormSetAlternativeForms,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(a,e)})):a(e)}},84285:function(e,n,t){t.r(n),t.d(n,{AllComponentsHorizontalTestCase:function(){return W},AllComponentsVerticalLabelsTestCase:function(){return _},AllComponentsVerticalTestCase:function(){return q},FormSetAlternativeAfter:function(){return R},FormSetAlternativeBefore:function(){return Q},FormSetAlternativeForms:function(){return P},HorizontalFlexItemResponsiveSize:function(){return H},HorizontalFlexItemResponsiveSizeCustomColumns:function(){return M},LayoutComponents:function(){return k},MediaQueryLiveExample:function(){return A},MediaQueryUseMedia:function(){return G},ResponsiveGridContainer:function(){return L},colors:function(){return z}});var l=t(2784),r=t(35823),i=t(35235),a=t(80215),s=t(3805),o=t(96844),d=t(75511),m=t(469),u=t(25807),c=t(47081),x=t(72151),h=t(20167),p=t(90524),F=t(55904),b=t(16353),g=t(43838),f=t(89751),j=t(38644),y=t(12750),v=t(82991),I=t(99210),C=t(67571),S=t(87682),Z=t(81858),w=t(60131),E=t(44086),T=t(52322);const k=()=>(0,T.jsx)(r.Z,{scope:{Field:y,Form:v},hideCode:!0,children:'<Flex.Stack>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Form.SubHeading>Name</Form.SubHeading>\n\n    <Field.String label="Fornavn" value="John" />\n    <Field.String label="Etternavn" value="Smith" />\n  </Card>\n\n  <Card stack>\n    <Form.SubHeading>More information</Form.SubHeading>\n\n    <Field.NationalIdentityNumber value="20058512345" />\n    <Field.Email value="john@smith.email" />\n    <Field.PhoneNumber value="+47 98765432" />\n  </Card>\n</Flex.Stack>\n'}),z=[{background:"#babeee"},{background:"#dfe0ee"},{background:"#90d2c3"},{background:"#ecf4be"}],H=()=>(0,T.jsx)(r.Z,{scope:{colors:z,TestElement:I.Z,Field:y},hideCode:!0,"data-visual-test":"flex-item-size",children:"<Flex.Container>\n  <Flex.Item size={8}>\n    <TestElement style={colors[0]}>FlexItem (8)</TestElement>\n  </Flex.Item>\n  <Flex.Item size={4}>\n    <TestElement style={colors[1]}>FlexItem (4)</TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 4,\n    }}\n  >\n    <TestElement style={colors[2]}>\n      FlexItem (small: 8, medium: 4)\n    </TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 8,\n    }}\n  >\n    <TestElement style={colors[3]}>\n      FlexItem (small: 4, medium: 8)\n    </TestElement>\n  </Flex.Item>\n</Flex.Container>\n"}),M=()=>(0,T.jsx)(r.Z,{hideCode:!0,scope:{colors:z,TestElement:I.Z,Field:y,defaultBreakpoints:C.R1,defaultQueries:S.L},"data-visual-test":"flex-item-custom-size",noInline:!0,children:"const breakpoints = {\n  ...defaultBreakpoints,\n  xsmall: '30em',\n}\nconst queries = {\n  ...defaultQueries,\n  xsmall: {\n    min: 0,\n    max: 'xsmall',\n  },\n  small: {\n    min: 'xsmall',\n    max: 'small',\n  },\n}\nconst CustomMediaQuery = styled.div`\n  display: flex;\n  flex-direction: column;\n  .dnb-flex-container[data-media-key='xsmall'] .dnb-flex-item--responsive {\n    --size: var(--xsmall);\n  }\n`\nrender(\n  <CustomMediaQuery>\n    <Flex.Container\n      direction=\"horizontal\"\n      sizeCount={4}\n      breakpoints={breakpoints}\n      queries={queries}\n    >\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 3,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[0]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 1,\n          large: 2,\n        }}\n      >\n        <TestElement style={colors[1]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 1,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[2]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 3,\n          large: 4,\n        }}\n      >\n        <TestElement style={colors[3]}>FlexItem</TestElement>\n      </Flex.Item>\n    </Flex.Container>\n  </CustomMediaQuery>,\n)\n"}),B=()=>{const[e,n]=l.useState("undefined"!=typeof window?window.innerWidth:0);return l.useEffect((()=>{const e=()=>{n(window.innerWidth)};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),{innerWidth:e}},G=()=>(0,T.jsx)(r.Z,{scope:{useMedia:S.Z,useWindowWidth:B},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const { isSmall, isMedium, isLarge, isSSR } = useMedia()\n  const { innerWidth } = useWindowWidth()\n  return (\n    <Code>\n      <pre>\n        {JSON.stringify(\n          {\n            isSmall,\n            isMedium,\n            isLarge,\n            isSSR,\n            innerWidth,\n          },\n          null,\n          2,\n        )}\n      </pre>\n    </Code>\n  )\n}\nrender(<Playground />)\n"}),A=()=>(0,T.jsx)(r.Z,{scope:{MediaQuery:i.Z,useMediaQuery:Z.Z},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const [query, updateQuery] = React.useState({\n    screen: true,\n    not: true,\n    min: 'small',\n    max: 'large',\n  })\n  const match1 = useMediaQuery({\n    matchOnSSR: true,\n    when: query,\n  })\n  const match2 = useMediaQuery({\n    matchOnSSR: true,\n    not: true,\n    when: query,\n  })\n  React.useEffect(() => {\n    console.log('mediaQuery:', match1, match2)\n  }, [match1, match2])\n  return (\n    <>\n      <Button\n        onClick={() => {\n          updateQuery({\n            ...query,\n            screen: !query.screen,\n          })\n        }}\n        right\n      >\n        Switch\n      </Button>\n      <MediaQuery when={query}>\n        <Code>when</Code>\n      </MediaQuery>\n      <MediaQuery not when={query}>\n        <Code>not when</Code>\n      </MediaQuery>\n    </>\n  )\n}\nrender(<Playground />)\n"}),L=()=>(0,T.jsx)(r.Z,{hideCode:!0,scope:{TestElement:I.Z,colors:z},children:"<Grid.Container rowGap columnGap>\n  <Grid.Item\n    span={{\n      small: [1, 2],\n      medium: [1, 3],\n      large: [1, 12],\n    }}\n    style={colors[0]}\n    element={TestElement}\n  >\n    Item A\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [3, 4],\n      medium: [4, 6],\n      large: [1, 4],\n    }}\n    style={colors[1]}\n    element={TestElement}\n  >\n    Item B\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [2, 3],\n      medium: [4, 6],\n      large: [5, 8],\n    }}\n    style={colors[2]}\n    element={TestElement}\n  >\n    Item C\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [1, 4],\n      medium: [4, 6],\n      large: [9, 12],\n    }}\n    style={colors[3]}\n    element={TestElement}\n  >\n    Item D\n  </Grid.Item>\n</Grid.Container>\n"}),Q=()=>(0,T.jsx)(r.Z,{children:'<FormSet label_direction="vertical">\n  <H2 top={0}>Heading</H2>\n  <FormRow label={<span className="dnb-h--medium">Legend</span>}>\n    <Input label="Label A" right />\n    <Input label="Label B" />\n  </FormRow>\n</FormSet>\n'}),R=()=>(0,T.jsx)(r.Z,{children:'<Provider\n  formElement={{\n    label_direction: \'vertical\',\n  }}\n>\n  <Form.Handler>\n    <H2 top={0}>Heading</H2>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Input label="Label A" />\n        <Input label="Label B" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Form.Handler>\n</Provider>\n'}),P=()=>(0,T.jsx)(r.Z,{children:'<Form.Handler>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Field.String label="Label A" width="medium" />\n        <Field.String label="Label B" width="large" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Flex.Stack>\n</Form.Handler>\n'}),N=function(e){let{direction:n="vertical",showText:t=!1,hideLabel:l=!1}=void 0===e?{}:e;const r={left:"horizontal"===n?"small":null,top:"horizontal"!==n?"small":null};let i={datePicker:"DatePicker:",dropdown:"Dropdown:",autocomplete:"Autocomplete:",checkbox:"Checkbox",radio:"Radio",radioGroup:"Radio Group:",toggleButton:"Toggle:",toggleButtonGroup:"Toggle Group:",switch:"Switch",input:"Input:",textarea:"Textarea:",slider:"Slider:"};l&&(i=Object.entries(i).reduce(((e,n)=>{let[t]=n;return e[t]="",e}),{}));const y=()=>(0,T.jsxs)(T.Fragment,{children:[t&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(a.Z,{...r,inline:!0,children:(0,T.jsxs)("p",{className:"dnb-p",children:["paragraph"," ",(0,T.jsx)(s.Z,{icon:"bell",size:"medium",...r,style:{margin:0}})]})}),"text"]}),(0,T.jsx)(o.Z,{text:"Button",...r}),(0,T.jsx)(o.Z,{icon:"add",...r}),(0,T.jsx)(d.ZP,{label:i.input,...r}),(0,T.jsx)(m.Z,{label:i.dropdown,data:["Item A","Item B","Item C"],...r}),(0,T.jsx)(u.Z,{label:i.autocomplete,data:["Item A","Item B","Item C"],...r}),(0,T.jsx)(c.Z,{label:i.datePicker,...r}),(0,T.jsx)(s.Z,{icon:"bell",size:"medium",...r}),(0,T.jsx)(x.Z,{label:i.checkbox,...r}),(0,T.jsx)(h.Z,{label:i.radio,...r}),(0,T.jsxs)(h.Z.Group,{label:i.radioGroup,...r,children:[(0,T.jsx)(h.Z,{label:i.radio,value:"a"}),(0,T.jsx)(h.Z,{label:i.radio,value:"b"})]}),(0,T.jsx)(p.Z,{label:i.toggleButton,text:"Toggle",...r}),(0,T.jsxs)(p.Z.Group,{label:i.toggleButtonGroup,...r,children:[(0,T.jsx)(p.Z,{text:"Toggle A",value:"a"}),(0,T.jsx)(p.Z,{text:"Toggle B",value:"b"})]}),(0,T.jsx)(F.Z,{label:i.switch,...r}),(0,T.jsx)(b.Z,{label:i.textarea,rows:"5",...r}),(0,T.jsx)("div",{style:{display:"inline-flex"},children:(0,T.jsx)(g.Z,{label:i.slider,value:50,...r})})]});return"horizontal"===n?(0,T.jsx)(f.Z,{style:{padding:"1rem",whiteSpace:"nowrap"},children:(0,T.jsx)(y,{})}):(y._supportsSpacingProps=!0,(0,T.jsx)(j.Z,{style:{padding:"1rem"},children:(0,T.jsx)(y,{})}))},q=e=>(0,T.jsx)("div",{"data-visual-test":"form-components-alignment-vertical",...e,children:(0,T.jsx)(N,{direction:"vertical"})}),_=e=>(0,T.jsx)("div",{"data-visual-test":"form-components-alignment-vertical-labels",...e,children:(0,T.jsx)(w.Z,{formElement:{label_direction:"vertical"},children:(0,T.jsx)(N,{direction:"vertical"})})}),W=e=>(0,T.jsx)("div",{"data-visual-test":"form-components-alignment-horizontal",...e,children:(0,T.jsx)(E.Z,{children:(0,T.jsx)(N,{direction:"horizontal"})})})},99210:function(e,n,t){t.d(n,{Z:function(){return s}});var l=t(72779),r=t.n(l),i=t(80215),a=t(52322);function s(e){let{className:n=null,...t}=e;return(0,a.jsx)(i.Z,{className:r()("dnb-forms-test-element",n),...t})}}}]);
//# sourceMappingURL=component---src-docs-uilib-layout-form-set-row-deprication-mdx-b87e9cb93032b633eb73.js.map
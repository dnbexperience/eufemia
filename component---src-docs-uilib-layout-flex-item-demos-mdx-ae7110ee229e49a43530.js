"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[2734],{12673:function(e,n,t){t.r(n);var l=t(52322),i=t(45392),s=t(70884);function r(e){const n=Object.assign({h2:"h2",h3:"h3",code:"code",p:"p"},(0,i.ah)(),e.components);return s||a("Examples",!1),s.AdvancedSizeExample||a("Examples.AdvancedSizeExample",!0),s.BasicSizeExample||a("Examples.BasicSizeExample",!0),s.Default||a("Examples.Default",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Demo"}),"\n",(0,l.jsx)(s.Default,{}),"\n",(0,l.jsxs)(n.h3,{children:["Basic ",(0,l.jsx)(n.code,{children:"size"})," usage"]}),"\n",(0,l.jsxs)(n.p,{children:["With the default ",(0,l.jsx)(n.code,{children:"sizeCount"})," of 12 parts."]}),"\n",(0,l.jsx)(s.BasicSizeExample,{}),"\n",(0,l.jsxs)(n.h2,{children:["Advanced ",(0,l.jsx)(n.code,{children:"size"})," usage"]}),"\n",(0,l.jsxs)(n.p,{children:["The following example has a customized amount of 4 parts (",(0,l.jsx)(n.code,{children:"sizeCount"}),") as well as custom breakpoints and media queries."]}),"\n",(0,l.jsx)(s.AdvancedSizeExample,{})]})}function a(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(r,e)})):r(e)}},84285:function(e,n,t){t.r(n),t.d(n,{AllComponentsHorizontalTestCase:function(){return W},AllComponentsVerticalLabelsTestCase:function(){return _},AllComponentsVerticalTestCase:function(){return N},FormSetAlternativeAfter:function(){return P},FormSetAlternativeBefore:function(){return Q},FormSetAlternativeForms:function(){return R},HorizontalFlexItemResponsiveSize:function(){return H},HorizontalFlexItemResponsiveSizeCustomColumns:function(){return B},LayoutComponents:function(){return T},MediaQueryLiveExample:function(){return A},MediaQueryUseMedia:function(){return G},ResponsiveGridContainer:function(){return L},colors:function(){return k}});var l=t(2784),i=t(41404),s=t(35235),r=t(80215),a=t(66651),o=t(96844),m=t(75511),d=t(469),c=t(25807),u=t(70486),x=t(59194),p=t(20167),h=t(35944),F=t(33119),g=t(16353),b=t(99399),f=t(89751),j=t(38644),I=t(50021),v=t(40853),z=t(99210),y=t(67571),C=t(87682),E=t(81858),S=t(60131),Z=t(44086),w=t(52322);const T=()=>(0,w.jsx)(i.Z,{scope:{Field:I,Form:v},hideCode:!0,children:'<Flex.Stack>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Form.Card>\n    <Form.SubHeading>Name</Form.SubHeading>\n\n    <Field.String label="Fornavn" value="John" />\n    <Field.String label="Etternavn" value="Smith" />\n  </Form.Card>\n\n  <Form.Card>\n    <Form.SubHeading>More information</Form.SubHeading>\n\n    <Field.NationalIdentityNumber value="20058512345" />\n    <Field.Email value="john@smith.email" />\n    <Field.PhoneNumber value="+47 98765432" />\n  </Form.Card>\n</Flex.Stack>\n'}),k=[{background:"#babeee"},{background:"#dfe0ee"},{background:"#90d2c3"},{background:"#ecf4be"}],H=()=>(0,w.jsx)(i.Z,{scope:{colors:k,TestElement:z.Z},hideCode:!0,"data-visual-test":"flex-item-size",children:"<Flex.Container>\n  <Flex.Item size={8}>\n    <TestElement style={colors[0]}>FlexItem (8)</TestElement>\n  </Flex.Item>\n  <Flex.Item size={4}>\n    <TestElement style={colors[1]}>FlexItem (4)</TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 4,\n    }}\n  >\n    <TestElement style={colors[2]}>\n      FlexItem (small: 8, medium: 4)\n    </TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 8,\n    }}\n  >\n    <TestElement style={colors[3]}>\n      FlexItem (small: 4, medium: 8)\n    </TestElement>\n  </Flex.Item>\n</Flex.Container>\n"}),B=()=>(0,w.jsx)(i.Z,{hideCode:!0,scope:{colors:k,TestElement:z.Z,Field:I,defaultBreakpoints:y.R1,defaultQueries:C.L},"data-visual-test":"flex-item-custom-size",noInline:!0,children:"const breakpoints = {\n  ...defaultBreakpoints,\n  xsmall: '30em',\n}\nconst queries = {\n  ...defaultQueries,\n  xsmall: {\n    min: 0,\n    max: 'xsmall',\n  },\n  small: {\n    min: 'xsmall',\n    max: 'small',\n  },\n}\nconst CustomMediaQuery = styled.div`\n  display: flex;\n  flex-direction: column;\n  .dnb-flex-container[data-media-key='xsmall'] .dnb-flex-item--responsive {\n    --size: var(--xsmall);\n  }\n`\nrender(\n  <CustomMediaQuery>\n    <Flex.Container\n      direction=\"horizontal\"\n      sizeCount={4}\n      breakpoints={breakpoints}\n      queries={queries}\n    >\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 3,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[0]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 1,\n          large: 2,\n        }}\n      >\n        <TestElement style={colors[1]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 1,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[2]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 3,\n          large: 4,\n        }}\n      >\n        <TestElement style={colors[3]}>FlexItem</TestElement>\n      </Flex.Item>\n    </Flex.Container>\n  </CustomMediaQuery>,\n)\n"}),M=()=>{const[e,n]=l.useState("undefined"!=typeof window?window.innerWidth:0);return l.useEffect((()=>{const e=()=>{n(window.innerWidth)};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),{innerWidth:e}},G=()=>(0,w.jsx)(i.Z,{scope:{useMedia:C.Z,useWindowWidth:M},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const { isSmall, isMedium, isLarge, isSSR } = useMedia()\n  const { innerWidth } = useWindowWidth()\n  return (\n    <Code>\n      <pre>\n        {JSON.stringify(\n          {\n            isSmall,\n            isMedium,\n            isLarge,\n            isSSR,\n            innerWidth,\n          },\n          null,\n          2,\n        )}\n      </pre>\n    </Code>\n  )\n}\nrender(<Playground />)\n"}),A=()=>(0,w.jsx)(i.Z,{scope:{MediaQuery:s.Z,useMediaQuery:E.Z},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const [query, updateQuery] = React.useState({\n    screen: true,\n    not: true,\n    min: 'small',\n    max: 'large',\n  })\n  const match1 = useMediaQuery({\n    matchOnSSR: true,\n    when: query,\n  })\n  const match2 = useMediaQuery({\n    matchOnSSR: true,\n    not: true,\n    when: query,\n  })\n  React.useEffect(() => {\n    console.log('mediaQuery:', match1, match2)\n  }, [match1, match2])\n  return (\n    <>\n      <Button\n        onClick={() => {\n          updateQuery({\n            ...query,\n            screen: !query.screen,\n          })\n        }}\n        right\n      >\n        Switch\n      </Button>\n      <MediaQuery when={query}>\n        <Code>when</Code>\n      </MediaQuery>\n      <MediaQuery not when={query}>\n        <Code>not when</Code>\n      </MediaQuery>\n    </>\n  )\n}\nrender(<Playground />)\n"}),L=()=>(0,w.jsx)(i.Z,{hideCode:!0,scope:{TestElement:z.Z,colors:k},children:"<Grid.Container rowGap columnGap>\n  <Grid.Item\n    span={{\n      small: [1, 2],\n      medium: [1, 3],\n      large: [1, 12],\n    }}\n    style={colors[0]}\n    element={TestElement}\n  >\n    Item A\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [3, 4],\n      medium: [4, 6],\n      large: [1, 4],\n    }}\n    style={colors[1]}\n    element={TestElement}\n  >\n    Item B\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [2, 3],\n      medium: [4, 6],\n      large: [5, 8],\n    }}\n    style={colors[2]}\n    element={TestElement}\n  >\n    Item C\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [1, 4],\n      medium: [4, 6],\n      large: [9, 12],\n    }}\n    style={colors[3]}\n    element={TestElement}\n  >\n    Item D\n  </Grid.Item>\n</Grid.Container>\n"}),Q=()=>(0,w.jsx)(i.Z,{children:'<FormSet label_direction="vertical">\n  <H2 top={0}>Heading</H2>\n  <FormRow label={<span className="dnb-h--medium">Legend</span>}>\n    <Input label="Label A" right />\n    <Input label="Label B" />\n  </FormRow>\n</FormSet>\n'}),P=()=>(0,w.jsx)(i.Z,{children:'<Provider\n  formElement={{\n    label_direction: \'vertical\',\n  }}\n>\n  <Form.Handler>\n    <H2 top={0}>Heading</H2>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Input label="Label A" />\n        <Input label="Label B" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Form.Handler>\n</Provider>\n'}),R=()=>(0,w.jsx)(i.Z,{children:'<Form.Handler>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Field.String label="Label A" width="medium" />\n        <Field.String label="Label B" width="large" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Flex.Stack>\n</Form.Handler>\n'}),q=function(e){let{direction:n="vertical",showText:t=!1,hideLabel:l=!1}=void 0===e?{}:e;const i={left:"horizontal"===n?"small":null,top:"horizontal"!==n?"small":null};let s={datePicker:"DatePicker:",dropdown:"Dropdown:",autocomplete:"Autocomplete:",checkbox:"Checkbox",radio:"Radio",radioGroup:"Radio Group:",toggleButton:"Toggle:",toggleButtonGroup:"Toggle Group:",switch:"Switch",input:"Input:",textarea:"Textarea:",slider:"Slider:"};l&&(s=Object.entries(s).reduce(((e,n)=>{let[t]=n;return e[t]="",e}),{}));const I=()=>(0,w.jsxs)(w.Fragment,{children:[t&&(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(r.Z,{...i,inline:!0,children:(0,w.jsxs)("p",{className:"dnb-p",children:["paragraph"," ",(0,w.jsx)(a.ZP,{icon:"bell",size:"medium",...i,style:{margin:0}})]})}),"text"]}),(0,w.jsx)(o.Z,{text:"Button",...i}),(0,w.jsx)(o.Z,{icon:"add",...i}),(0,w.jsx)(m.ZP,{label:s.input,...i}),(0,w.jsx)(d.Z,{label:s.dropdown,data:["Item A","Item B","Item C"],...i}),(0,w.jsx)(c.Z,{label:s.autocomplete,data:["Item A","Item B","Item C"],...i}),(0,w.jsx)(u.Z,{label:s.datePicker,...i}),(0,w.jsx)(a.ZP,{icon:"bell",size:"medium",...i}),(0,w.jsx)(x.Z,{label:s.checkbox,...i}),(0,w.jsx)(p.Z,{label:s.radio,...i}),(0,w.jsxs)(p.Z.Group,{label:s.radioGroup,...i,children:[(0,w.jsx)(p.Z,{label:s.radio,value:"a"}),(0,w.jsx)(p.Z,{label:s.radio,value:"b"})]}),(0,w.jsx)(h.Z,{label:s.toggleButton,text:"Toggle",...i}),(0,w.jsxs)(h.Z.Group,{label:s.toggleButtonGroup,...i,children:[(0,w.jsx)(h.Z,{text:"Toggle A",value:"a"}),(0,w.jsx)(h.Z,{text:"Toggle B",value:"b"})]}),(0,w.jsx)(F.Z,{label:s.switch,...i}),(0,w.jsx)(g.Z,{label:s.textarea,rows:"5",...i}),(0,w.jsx)("div",{style:{display:"inline-flex"},children:(0,w.jsx)(b.Z,{label:s.slider,value:50,...i})})]});return"horizontal"===n?(0,w.jsx)(f.Z,{style:{padding:"1rem",whiteSpace:"nowrap"},children:(0,w.jsx)(I,{})}):(I._supportsSpacingProps=!0,(0,w.jsx)(j.Z,{style:{padding:"1rem"},children:(0,w.jsx)(I,{})}))},N=e=>(0,w.jsx)("div",{"data-visual-test":"form-components-alignment-vertical",...e,children:(0,w.jsx)(q,{direction:"vertical"})}),_=e=>(0,w.jsx)("div",{"data-visual-test":"form-components-alignment-vertical-labels",...e,children:(0,w.jsx)(S.Z,{formElement:{label_direction:"vertical"},children:(0,w.jsx)(q,{direction:"vertical"})})}),W=e=>(0,w.jsx)("div",{"data-visual-test":"form-components-alignment-horizontal",...e,children:(0,w.jsx)(Z.Z,{children:(0,w.jsx)(q,{direction:"horizontal"})})})},70884:function(e,n,t){t.r(n),t.d(n,{AdvancedSizeExample:function(){return c},BasicSize:function(){return o},BasicSizeExample:function(){return d},Default:function(){return a},ResponsiveSize:function(){return m}});var l=t(41404),i=t(99210),s=t(84285),r=t(52322);const a=()=>(0,r.jsx)(l.Z,{scope:{TestElement:i.Z},children:"<Flex.Container>\n  <Flex.Item>\n    <TestElement>FlexItem</TestElement>\n  </Flex.Item>\n  <Flex.Item>\n    <TestElement>FlexItem</TestElement>\n  </Flex.Item>\n</Flex.Container>\n"}),o=()=>(0,r.jsx)(l.Z,{children:"<Flex.Container>\n  <Flex.Item size={6}>uses 50% in width</Flex.Item>\n  <Flex.Item size={6}>uses 50% in width</Flex.Item>\n</Flex.Container>\n"}),m=()=>(0,r.jsx)(l.Z,{hidePreview:!0,children:"<Flex.Container>\n  <Flex.Item\n    size={{\n      small: 12,\n      large: 6,\n    }}\n  >\n    uses 50% or 100% based on the screen size\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      large: 6,\n    }}\n  >\n    uses 50% or 100% based on the screen size\n  </Flex.Item>\n</Flex.Container>\n"}),d=s.HorizontalFlexItemResponsiveSize,c=s.HorizontalFlexItemResponsiveSizeCustomColumns},99210:function(e,n,t){t.d(n,{Z:function(){return a}});var l=t(72779),i=t.n(l),s=t(80215),r=t(52322);function a(e){let{className:n=null,...t}=e;return(0,r.jsx)(s.Z,{className:i()("dnb-forms-test-element",n),...t})}a._supportsSpacingProps=!0}}]);
//# sourceMappingURL=component---src-docs-uilib-layout-flex-item-demos-mdx-ae7110ee229e49a43530.js.map
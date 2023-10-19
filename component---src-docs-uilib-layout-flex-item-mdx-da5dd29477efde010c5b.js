"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[24459,2734,1366],{70226:function(e,n,t){t.r(n);var l=t(52322),i=t(45392),s=t(18871),r=t(12673);function o(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.default,{}),"\n",(0,l.jsx)(r.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(o,e)})):o()}},12673:function(e,n,t){t.r(n);var l=t(52322),i=t(45392),s=t(70884);function r(e){const n=Object.assign({h2:"h2",h3:"h3",code:"code",p:"p"},(0,i.ah)(),e.components);return s||o("Examples",!1),s.AdvancedSizeExample||o("Examples.AdvancedSizeExample",!0),s.BasicSizeExample||o("Examples.BasicSizeExample",!0),s.Default||o("Examples.Default",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Demo"}),"\n",(0,l.jsx)(s.Default,{}),"\n",(0,l.jsxs)(n.h3,{children:["Basic ",(0,l.jsx)(n.code,{children:"size"})," usage"]}),"\n",(0,l.jsxs)(n.p,{children:["With the default ",(0,l.jsx)(n.code,{children:"sizeCount"})," of 12 parts."]}),"\n",(0,l.jsx)(s.BasicSizeExample,{}),"\n",(0,l.jsxs)(n.h2,{children:["Advanced ",(0,l.jsx)(n.code,{children:"size"})," usage"]}),"\n",(0,l.jsxs)(n.p,{children:["The following example has a customized amount of 4 parts (",(0,l.jsx)(n.code,{children:"sizeCount"}),") as well as custom breakpoints and media queries."]}),"\n",(0,l.jsx)(s.AdvancedSizeExample,{})]})}function o(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(r,e)})):r(e)}},18871:function(e,n,t){t.r(n);var l=t(52322),i=t(45392),s=t(70884);function r(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre",h3:"h3"},(0,i.ah)(),e.components);return s||o("Examples",!1),s.BasicSize||o("Examples.BasicSize",!0),s.ResponsiveSize||o("Examples.ResponsiveSize",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Description"}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"Flex.Item"})," is a building block for ",(0,l.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout",children:"CSS flexbox"})," based layout of contents and components. Should be used in combination with ",(0,l.jsx)(n.a,{href:"/uilib/layout/flex/container/",children:"Flex.Container"}),"."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-jsx",children:"import { Flex } from '@dnb/eufemia'\n\nrender(\n  <Flex.Container>\n    <Flex.Item>content</Flex.Item>\n  </Flex.Container>,\n)\n"})}),"\n",(0,l.jsx)(n.h3,{children:"Size adjustment"}),"\n",(0,l.jsxs)(n.p,{children:["You can provide a ",(0,l.jsx)(n.code,{children:"size"})," prop with a number from 1 to 12 (can be changed in ",(0,l.jsx)(n.a,{href:"/uilib/layout/flex/container/",children:"Flex.Container"})," with the ",(0,l.jsx)(n.code,{children:"sizeCount"})," property)."]}),"\n",(0,l.jsx)(n.p,{children:"The number will be used to set the item size (a part of the container). It set a percentage unit and apply it on the item via CSS. When the container is tilled to 100%, the remaining items will wrap to a new row."}),"\n",(0,l.jsx)(n.p,{children:"The number 6 results in 50%, while 12 results in 100%."}),"\n",(0,l.jsx)(s.BasicSize,{}),"\n",(0,l.jsx)(n.h3,{children:"Responsive size"}),"\n",(0,l.jsx)(n.p,{children:"You can also make sizes respond to media queries."}),"\n",(0,l.jsxs)(n.p,{children:["For doing so, provide a ",(0,l.jsx)(n.code,{children:"size"})," prop with an object containing ",(0,l.jsx)(n.a,{href:"/uilib/usage/layout/media-queries/",children:"Media Query"})," types. Each media size should contain number, like mentioned above."]}),"\n",(0,l.jsx)(s.ResponsiveSize,{}),"\n",(0,l.jsxs)(n.p,{children:["You need to ensure that ",(0,l.jsx)(n.code,{children:"flex-wrap: wrap"})," is set, so the remaining items wrap to a new row when needed. This is enabled by default in the ",(0,l.jsx)(n.a,{href:"/uilib/layout/flex/container/",children:"Flex.Container"}),"."]})]})}function o(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(r,e)})):r(e)}},84285:function(e,n,t){t.r(n),t.d(n,{AllComponentsHorizontalTestCase:function(){return O},AllComponentsVerticalLabelsTestCase:function(){return N},AllComponentsVerticalTestCase:function(){return _},FormSetAlternativeAfter:function(){return L},FormSetAlternativeBefore:function(){return Q},FormSetAlternativeForms:function(){return P},HorizontalFlexItemResponsiveSize:function(){return B},HorizontalFlexItemResponsiveSizeCustomColumns:function(){return H},LayoutComponents:function(){return T},MediaQueryLiveExample:function(){return R},MediaQueryUseMedia:function(){return G},ResponsiveGridContainer:function(){return A},colors:function(){return k}});var l=t(2784),i=t(35823),s=t(35235),r=t(80215),o=t(3805),a=t(96844),d=t(75511),m=t(469),c=t(25807),u=t(47081),x=t(72151),h=t(20167),p=t(90524),j=t(55904),b=t(16353),F=t(43838),f=t(89751),g=t(38644),v=t(12750),I=t(82991),z=t(99210),y=t(67571),S=t(87682),w=t(81858),C=t(60131),E=t(44086),Z=t(52322);const T=()=>(0,Z.jsx)(i.Z,{scope:{Field:v,Form:I},hideCode:!0,children:'<Flex.Stack>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Form.SubHeading>Name</Form.SubHeading>\n\n    <Field.String label="Fornavn" value="John" />\n    <Field.String label="Etternavn" value="Smith" />\n  </Card>\n\n  <Card stack>\n    <Form.SubHeading>More information</Form.SubHeading>\n\n    <Field.NationalIdentityNumber value="20058512345" />\n    <Field.Email value="john@smith.email" />\n    <Field.PhoneNumber value="+47 98765432" />\n  </Card>\n</Flex.Stack>\n'}),k=[{background:"#babeee"},{background:"#dfe0ee"},{background:"#90d2c3"},{background:"#ecf4be"}],B=()=>(0,Z.jsx)(i.Z,{scope:{colors:k,TestElement:z.Z,Field:v},hideCode:!0,"data-visual-test":"flex-item-size",children:"<Flex.Container>\n  <Flex.Item size={8}>\n    <TestElement style={colors[0]}>FlexItem (8)</TestElement>\n  </Flex.Item>\n  <Flex.Item size={4}>\n    <TestElement style={colors[1]}>FlexItem (4)</TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 4,\n    }}\n  >\n    <TestElement style={colors[2]}>\n      FlexItem (small: 8, medium: 4)\n    </TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 8,\n    }}\n  >\n    <TestElement style={colors[3]}>\n      FlexItem (small: 4, medium: 8)\n    </TestElement>\n  </Flex.Item>\n</Flex.Container>\n"}),H=()=>(0,Z.jsx)(i.Z,{hideCode:!0,scope:{colors:k,TestElement:z.Z,Field:v,defaultBreakpoints:y.R1,defaultQueries:S.L},"data-visual-test":"flex-item-custom-size",noInline:!0,children:"const breakpoints = {\n  ...defaultBreakpoints,\n  xsmall: '30em',\n}\nconst queries = {\n  ...defaultQueries,\n  xsmall: {\n    min: 0,\n    max: 'xsmall',\n  },\n  small: {\n    min: 'xsmall',\n    max: 'small',\n  },\n}\nconst CustomMediaQuery = styled.div`\n  display: flex;\n  flex-direction: column;\n  .dnb-flex-container[data-media-key='xsmall'] .dnb-flex-item--responsive {\n    --size: var(--xsmall);\n  }\n`\nrender(\n  <CustomMediaQuery>\n    <Flex.Container\n      direction=\"horizontal\"\n      sizeCount={4}\n      breakpoints={breakpoints}\n      queries={queries}\n    >\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 3,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[0]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 1,\n          large: 2,\n        }}\n      >\n        <TestElement style={colors[1]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 1,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[2]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 3,\n          large: 4,\n        }}\n      >\n        <TestElement style={colors[3]}>FlexItem</TestElement>\n      </Flex.Item>\n    </Flex.Container>\n  </CustomMediaQuery>,\n)\n"}),M=()=>{const[e,n]=l.useState("undefined"!=typeof window?window.innerWidth:0);return l.useEffect((()=>{const e=()=>{n(window.innerWidth)};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),{innerWidth:e}},G=()=>(0,Z.jsx)(i.Z,{scope:{useMedia:S.Z,useWindowWidth:M},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const { isSmall, isMedium, isLarge, isSSR } = useMedia()\n  const { innerWidth } = useWindowWidth()\n  return (\n    <Code>\n      <pre>\n        {JSON.stringify(\n          {\n            isSmall,\n            isMedium,\n            isLarge,\n            isSSR,\n            innerWidth,\n          },\n          null,\n          2,\n        )}\n      </pre>\n    </Code>\n  )\n}\nrender(<Playground />)\n"}),R=()=>(0,Z.jsx)(i.Z,{scope:{MediaQuery:s.Z,useMediaQuery:w.Z},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const [query, updateQuery] = React.useState({\n    screen: true,\n    not: true,\n    min: 'small',\n    max: 'large',\n  })\n  const match1 = useMediaQuery({\n    matchOnSSR: true,\n    when: query,\n  })\n  const match2 = useMediaQuery({\n    matchOnSSR: true,\n    not: true,\n    when: query,\n  })\n  React.useEffect(() => {\n    console.log('mediaQuery:', match1, match2)\n  }, [match1, match2])\n  return (\n    <>\n      <Button\n        onClick={() => {\n          updateQuery({\n            ...query,\n            screen: !query.screen,\n          })\n        }}\n        right\n      >\n        Switch\n      </Button>\n      <MediaQuery when={query}>\n        <Code>when</Code>\n      </MediaQuery>\n      <MediaQuery not when={query}>\n        <Code>not when</Code>\n      </MediaQuery>\n    </>\n  )\n}\nrender(<Playground />)\n"}),A=()=>(0,Z.jsx)(i.Z,{hideCode:!0,scope:{TestElement:z.Z,colors:k},children:"<Grid.Container rowGap columnGap>\n  <Grid.Item\n    span={{\n      small: [1, 2],\n      medium: [1, 3],\n      large: [1, 12],\n    }}\n    style={colors[0]}\n    element={TestElement}\n  >\n    Item A\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [3, 4],\n      medium: [4, 6],\n      large: [1, 4],\n    }}\n    style={colors[1]}\n    element={TestElement}\n  >\n    Item B\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [2, 3],\n      medium: [4, 6],\n      large: [5, 8],\n    }}\n    style={colors[2]}\n    element={TestElement}\n  >\n    Item C\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [1, 4],\n      medium: [4, 6],\n      large: [9, 12],\n    }}\n    style={colors[3]}\n    element={TestElement}\n  >\n    Item D\n  </Grid.Item>\n</Grid.Container>\n"}),Q=()=>(0,Z.jsx)(i.Z,{children:'<FormSet label_direction="vertical">\n  <H2 top={0}>Heading</H2>\n  <FormRow label={<span className="dnb-h--medium">Legend</span>}>\n    <Input label="Label A" right />\n    <Input label="Label B" />\n  </FormRow>\n</FormSet>\n'}),L=()=>(0,Z.jsx)(i.Z,{children:'<Provider\n  formElement={{\n    label_direction: \'vertical\',\n  }}\n>\n  <Form.Handler>\n    <H2 top={0}>Heading</H2>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Input label="Label A" />\n        <Input label="Label B" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Form.Handler>\n</Provider>\n'}),P=()=>(0,Z.jsx)(i.Z,{children:'<Form.Handler>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Field.String label="Label A" width="medium" />\n        <Field.String label="Label B" width="large" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Flex.Stack>\n</Form.Handler>\n'}),q=function(e){let{direction:n="vertical",showText:t=!1,hideLabel:l=!1}=void 0===e?{}:e;const i={left:"horizontal"===n?"small":null,top:"horizontal"!==n?"small":null};let s={datePicker:"DatePicker:",dropdown:"Dropdown:",autocomplete:"Autocomplete:",checkbox:"Checkbox",radio:"Radio",radioGroup:"Radio Group:",toggleButton:"Toggle:",toggleButtonGroup:"Toggle Group:",switch:"Switch",input:"Input:",textarea:"Textarea:",slider:"Slider:"};l&&(s=Object.entries(s).reduce(((e,n)=>{let[t]=n;return e[t]="",e}),{}));const v=()=>(0,Z.jsxs)(Z.Fragment,{children:[t&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(r.Z,{...i,inline:!0,children:(0,Z.jsxs)("p",{className:"dnb-p",children:["paragraph"," ",(0,Z.jsx)(o.Z,{icon:"bell",size:"medium",...i,style:{margin:0}})]})}),"text"]}),(0,Z.jsx)(a.Z,{text:"Button",...i}),(0,Z.jsx)(a.Z,{icon:"add",...i}),(0,Z.jsx)(d.ZP,{label:s.input,...i}),(0,Z.jsx)(m.Z,{label:s.dropdown,data:["Item A","Item B","Item C"],...i}),(0,Z.jsx)(c.Z,{label:s.autocomplete,data:["Item A","Item B","Item C"],...i}),(0,Z.jsx)(u.Z,{label:s.datePicker,...i}),(0,Z.jsx)(o.Z,{icon:"bell",size:"medium",...i}),(0,Z.jsx)(x.Z,{label:s.checkbox,...i}),(0,Z.jsx)(h.Z,{label:s.radio,...i}),(0,Z.jsxs)(h.Z.Group,{label:s.radioGroup,...i,children:[(0,Z.jsx)(h.Z,{label:s.radio,value:"a"}),(0,Z.jsx)(h.Z,{label:s.radio,value:"b"})]}),(0,Z.jsx)(p.Z,{label:s.toggleButton,text:"Toggle",...i}),(0,Z.jsxs)(p.Z.Group,{label:s.toggleButtonGroup,...i,children:[(0,Z.jsx)(p.Z,{text:"Toggle A",value:"a"}),(0,Z.jsx)(p.Z,{text:"Toggle B",value:"b"})]}),(0,Z.jsx)(j.Z,{label:s.switch,...i}),(0,Z.jsx)(b.Z,{label:s.textarea,rows:"5",...i}),(0,Z.jsx)("div",{style:{display:"inline-flex"},children:(0,Z.jsx)(F.Z,{label:s.slider,value:50,...i})})]});return"horizontal"===n?(0,Z.jsx)(f.Z,{style:{padding:"1rem",whiteSpace:"nowrap"},children:(0,Z.jsx)(v,{})}):(v._supportsSpacingProps=!0,(0,Z.jsx)(g.Z,{style:{padding:"1rem"},children:(0,Z.jsx)(v,{})}))},_=e=>(0,Z.jsx)("div",{"data-visual-test":"form-components-alignment-vertical",...e,children:(0,Z.jsx)(q,{direction:"vertical"})}),N=e=>(0,Z.jsx)("div",{"data-visual-test":"form-components-alignment-vertical-labels",...e,children:(0,Z.jsx)(C.Z,{formElement:{label_direction:"vertical"},children:(0,Z.jsx)(q,{direction:"vertical"})})}),O=e=>(0,Z.jsx)("div",{"data-visual-test":"form-components-alignment-horizontal",...e,children:(0,Z.jsx)(E.Z,{children:(0,Z.jsx)(q,{direction:"horizontal"})})})},70884:function(e,n,t){t.r(n),t.d(n,{AdvancedSizeExample:function(){return c},BasicSize:function(){return a},BasicSizeExample:function(){return m},Default:function(){return o},ResponsiveSize:function(){return d}});var l=t(35823),i=t(99210),s=t(84285),r=t(52322);const o=()=>(0,r.jsx)(l.Z,{scope:{TestElement:i.Z},children:"<Flex.Container>\n  <Flex.Item>\n    <TestElement>FlexItem</TestElement>\n  </Flex.Item>\n  <Flex.Item>\n    <TestElement>FlexItem</TestElement>\n  </Flex.Item>\n</Flex.Container>\n"}),a=()=>(0,r.jsx)(l.Z,{children:"<Flex.Container>\n  <Flex.Item size={6}>uses 50% in width</Flex.Item>\n  <Flex.Item size={6}>uses 50% in width</Flex.Item>\n</Flex.Container>\n"}),d=()=>(0,r.jsx)(l.Z,{hidePreview:!0,children:"<Flex.Container>\n  <Flex.Item\n    size={{\n      small: 12,\n      large: 6,\n    }}\n  >\n    uses 50% or 100% based on the screen size\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      large: 6,\n    }}\n  >\n    uses 50% or 100% based on the screen size\n  </Flex.Item>\n</Flex.Container>\n"}),m=s.HorizontalFlexItemResponsiveSize,c=s.HorizontalFlexItemResponsiveSizeCustomColumns},99210:function(e,n,t){t.d(n,{Z:function(){return o}});var l=t(72779),i=t.n(l),s=t(80215),r=t(52322);function o(e){let{className:n=null,...t}=e;return(0,r.jsx)(s.Z,{className:i()("dnb-forms-test-element",n),...t})}}}]);
//# sourceMappingURL=component---src-docs-uilib-layout-flex-item-mdx-da5dd29477efde010c5b.js.map
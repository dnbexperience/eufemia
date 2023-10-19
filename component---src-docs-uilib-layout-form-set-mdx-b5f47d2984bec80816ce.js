"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[58093,48531,76507,34260],{66763:function(e,n,t){t.r(n);var l=t(52322),r=t(45392),o=t(84285);function i(e){const n=Object.assign({h2:"h2",p:"p",a:"a"},(0,r.ah)(),e.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Depreciation"}),"\n",(0,l.jsxs)(n.p,{children:["In order to replace FormSet or FormRow you may use the Eufemia ",(0,l.jsx)(n.a,{href:"/uilib/usage/customisation/provider-info",children:"Provider"})," and ",(0,l.jsx)(n.a,{href:"/uilib/layout/flex",children:"Flex"})," as well as the Eufemia ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms",children:"Forms Extension"}),"."]}),"\n",(0,l.jsx)(n.p,{children:"e.g. before:"}),"\n",(0,l.jsx)(o.FormSetAlternativeBefore,{}),"\n",(0,l.jsx)(n.p,{children:"e.g. after (two examples):"}),"\n",(0,l.jsx)(o.FormSetAlternativeAfter,{}),"\n",(0,l.jsx)(o.FormSetAlternativeForms,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(i,e)})):i(e)}},47770:function(e,n,t){t.r(n);var l=t(52322),r=t(45392),o=t(63943),i=t(42659);function s(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(o.default,{}),"\n",(0,l.jsx)(i.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(s,e)})):s()}},42659:function(e,n,t){t.r(n);var l=t(52322),r=t(45392),o=t(15961);function i(e){const n=Object.assign({h2:"h2",h3:"h3",code:"code"},(0,r.ah)(),e.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Demos"}),"\n",(0,l.jsxs)(n.h3,{children:["Use the ",(0,l.jsx)(n.code,{children:"FormSet"})," as a Provider for ",(0,l.jsx)(n.code,{children:"FormRow"})]}),"\n",(0,l.jsx)(o.y9,{}),"\n",(0,l.jsx)(n.h3,{children:"FormSet where FormRow inherits the direction"}),"\n",(0,l.jsx)(o.b1,{}),"\n",(0,l.jsxs)(n.h3,{children:["FormSet with ",(0,l.jsx)(n.code,{children:"on_submit"})," event and ",(0,l.jsx)(n.code,{children:"prevent_submit"})," set to ",(0,l.jsx)(n.code,{children:"true"})]}),"\n",(0,l.jsx)(o.bO,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(i,e)})):i(e)}},63943:function(e,n,t){t.r(n);var l=t(52322),r=t(45392),o=t(15961),i=t(66763);function s(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",strong:"strong"},(0,r.ah)(),e.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Description"}),"\n",(0,l.jsxs)(n.p,{children:["The FormSet component gives you both a HTML form element ",(0,l.jsx)(n.code,{children:"<form>"})," by default and also a React provider for ",(0,l.jsx)(n.a,{href:"/uilib/layout/form-row",children:"FormRow"}),". This way you can define more globally e.g. if all the rows should be displayed ",(0,l.jsx)(n.strong,{children:"vertically"}),"."]}),"\n",(0,l.jsx)(o.ai,{}),"\n",(0,l.jsx)(i.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,r.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(s,e)})):s(e)}},84285:function(e,n,t){t.r(n),t.d(n,{AllComponentsHorizontalTestCase:function(){return q},AllComponentsVerticalLabelsTestCase:function(){return N},AllComponentsVerticalTestCase:function(){return P},FormSetAlternativeAfter:function(){return Q},FormSetAlternativeBefore:function(){return A},FormSetAlternativeForms:function(){return _},HorizontalFlexItemResponsiveSize:function(){return k},HorizontalFlexItemResponsiveSizeCustomColumns:function(){return H},LayoutComponents:function(){return E},MediaQueryLiveExample:function(){return B},MediaQueryUseMedia:function(){return M},ResponsiveGridContainer:function(){return L},colors:function(){return z}});var l=t(2784),r=t(35823),o=t(35235),i=t(80215),s=t(3805),a=t(96844),d=t(75511),m=t(469),c=t(25807),u=t(47081),x=t(72151),h=t(20167),p=t(90524),b=t(55904),F=t(16353),g=t(43838),j=t(89751),f=t(38644),v=t(12750),y=t(82991),w=t(99210),S=t(67571),I=t(87682),C=t(81858),Z=t(60131),T=t(44086),R=t(52322);const E=()=>(0,R.jsx)(r.Z,{scope:{Field:v,Form:y},hideCode:!0,children:'<Flex.Stack>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Form.SubHeading>Name</Form.SubHeading>\n\n    <Field.String label="Fornavn" value="John" />\n    <Field.String label="Etternavn" value="Smith" />\n  </Card>\n\n  <Card stack>\n    <Form.SubHeading>More information</Form.SubHeading>\n\n    <Field.NationalIdentityNumber value="20058512345" />\n    <Field.Email value="john@smith.email" />\n    <Field.PhoneNumber value="+47 98765432" />\n  </Card>\n</Flex.Stack>\n'}),z=[{background:"#babeee"},{background:"#dfe0ee"},{background:"#90d2c3"},{background:"#ecf4be"}],k=()=>(0,R.jsx)(r.Z,{scope:{colors:z,TestElement:w.Z,Field:v},hideCode:!0,"data-visual-test":"flex-item-size",children:"<Flex.Container>\n  <Flex.Item size={8}>\n    <TestElement style={colors[0]}>FlexItem (8)</TestElement>\n  </Flex.Item>\n  <Flex.Item size={4}>\n    <TestElement style={colors[1]}>FlexItem (4)</TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 4,\n    }}\n  >\n    <TestElement style={colors[2]}>\n      FlexItem (small: 8, medium: 4)\n    </TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 8,\n    }}\n  >\n    <TestElement style={colors[3]}>\n      FlexItem (small: 4, medium: 8)\n    </TestElement>\n  </Flex.Item>\n</Flex.Container>\n"}),H=()=>(0,R.jsx)(r.Z,{hideCode:!0,scope:{colors:z,TestElement:w.Z,Field:v,defaultBreakpoints:S.R1,defaultQueries:I.L},"data-visual-test":"flex-item-custom-size",noInline:!0,children:"const breakpoints = {\n  ...defaultBreakpoints,\n  xsmall: '30em',\n}\nconst queries = {\n  ...defaultQueries,\n  xsmall: {\n    min: 0,\n    max: 'xsmall',\n  },\n  small: {\n    min: 'xsmall',\n    max: 'small',\n  },\n}\nconst CustomMediaQuery = styled.div`\n  display: flex;\n  flex-direction: column;\n  .dnb-flex-container[data-media-key='xsmall'] .dnb-flex-item--responsive {\n    --size: var(--xsmall);\n  }\n`\nrender(\n  <CustomMediaQuery>\n    <Flex.Container\n      direction=\"horizontal\"\n      sizeCount={4}\n      breakpoints={breakpoints}\n      queries={queries}\n    >\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 3,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[0]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 1,\n          large: 2,\n        }}\n      >\n        <TestElement style={colors[1]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 1,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[2]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 3,\n          large: 4,\n        }}\n      >\n        <TestElement style={colors[3]}>FlexItem</TestElement>\n      </Flex.Item>\n    </Flex.Container>\n  </CustomMediaQuery>,\n)\n"}),G=()=>{const[e,n]=l.useState("undefined"!=typeof window?window.innerWidth:0);return l.useEffect((()=>{const e=()=>{n(window.innerWidth)};return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)}),[]),{innerWidth:e}},M=()=>(0,R.jsx)(r.Z,{scope:{useMedia:I.Z,useWindowWidth:G},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const { isSmall, isMedium, isLarge, isSSR } = useMedia()\n  const { innerWidth } = useWindowWidth()\n  return (\n    <Code>\n      <pre>\n        {JSON.stringify(\n          {\n            isSmall,\n            isMedium,\n            isLarge,\n            isSSR,\n            innerWidth,\n          },\n          null,\n          2,\n        )}\n      </pre>\n    </Code>\n  )\n}\nrender(<Playground />)\n"}),B=()=>(0,R.jsx)(r.Z,{scope:{MediaQuery:o.Z,useMediaQuery:C.Z},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const [query, updateQuery] = React.useState({\n    screen: true,\n    not: true,\n    min: 'small',\n    max: 'large',\n  })\n  const match1 = useMediaQuery({\n    matchOnSSR: true,\n    when: query,\n  })\n  const match2 = useMediaQuery({\n    matchOnSSR: true,\n    not: true,\n    when: query,\n  })\n  React.useEffect(() => {\n    console.log('mediaQuery:', match1, match2)\n  }, [match1, match2])\n  return (\n    <>\n      <Button\n        onClick={() => {\n          updateQuery({\n            ...query,\n            screen: !query.screen,\n          })\n        }}\n        right\n      >\n        Switch\n      </Button>\n      <MediaQuery when={query}>\n        <Code>when</Code>\n      </MediaQuery>\n      <MediaQuery not when={query}>\n        <Code>not when</Code>\n      </MediaQuery>\n    </>\n  )\n}\nrender(<Playground />)\n"}),L=()=>(0,R.jsx)(r.Z,{hideCode:!0,scope:{TestElement:w.Z,colors:z},children:"<Grid.Container rowGap columnGap>\n  <Grid.Item\n    span={{\n      small: [1, 2],\n      medium: [1, 3],\n      large: [1, 12],\n    }}\n    style={colors[0]}\n    element={TestElement}\n  >\n    Item A\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [3, 4],\n      medium: [4, 6],\n      large: [1, 4],\n    }}\n    style={colors[1]}\n    element={TestElement}\n  >\n    Item B\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [2, 3],\n      medium: [4, 6],\n      large: [5, 8],\n    }}\n    style={colors[2]}\n    element={TestElement}\n  >\n    Item C\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [1, 4],\n      medium: [4, 6],\n      large: [9, 12],\n    }}\n    style={colors[3]}\n    element={TestElement}\n  >\n    Item D\n  </Grid.Item>\n</Grid.Container>\n"}),A=()=>(0,R.jsx)(r.Z,{children:'<FormSet label_direction="vertical">\n  <H2 top={0}>Heading</H2>\n  <FormRow label={<span className="dnb-h--medium">Legend</span>}>\n    <Input label="Label A" right />\n    <Input label="Label B" />\n  </FormRow>\n</FormSet>\n'}),Q=()=>(0,R.jsx)(r.Z,{children:'<Provider\n  formElement={{\n    label_direction: \'vertical\',\n  }}\n>\n  <Form.Handler>\n    <H2 top={0}>Heading</H2>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Input label="Label A" />\n        <Input label="Label B" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Form.Handler>\n</Provider>\n'}),_=()=>(0,R.jsx)(r.Z,{children:'<Form.Handler>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Field.String label="Label A" width="medium" />\n        <Field.String label="Label B" width="large" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Flex.Stack>\n</Form.Handler>\n'}),O=function(e){let{direction:n="vertical",showText:t=!1,hideLabel:l=!1}=void 0===e?{}:e;const r={left:"horizontal"===n?"small":null,top:"horizontal"!==n?"small":null};let o={datePicker:"DatePicker:",dropdown:"Dropdown:",autocomplete:"Autocomplete:",checkbox:"Checkbox",radio:"Radio",radioGroup:"Radio Group:",toggleButton:"Toggle:",toggleButtonGroup:"Toggle Group:",switch:"Switch",input:"Input:",textarea:"Textarea:",slider:"Slider:"};l&&(o=Object.entries(o).reduce(((e,n)=>{let[t]=n;return e[t]="",e}),{}));const v=()=>(0,R.jsxs)(R.Fragment,{children:[t&&(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)(i.Z,{...r,inline:!0,children:(0,R.jsxs)("p",{className:"dnb-p",children:["paragraph"," ",(0,R.jsx)(s.Z,{icon:"bell",size:"medium",...r,style:{margin:0}})]})}),"text"]}),(0,R.jsx)(a.Z,{text:"Button",...r}),(0,R.jsx)(a.Z,{icon:"add",...r}),(0,R.jsx)(d.ZP,{label:o.input,...r}),(0,R.jsx)(m.Z,{label:o.dropdown,data:["Item A","Item B","Item C"],...r}),(0,R.jsx)(c.Z,{label:o.autocomplete,data:["Item A","Item B","Item C"],...r}),(0,R.jsx)(u.Z,{label:o.datePicker,...r}),(0,R.jsx)(s.Z,{icon:"bell",size:"medium",...r}),(0,R.jsx)(x.Z,{label:o.checkbox,...r}),(0,R.jsx)(h.Z,{label:o.radio,...r}),(0,R.jsxs)(h.Z.Group,{label:o.radioGroup,...r,children:[(0,R.jsx)(h.Z,{label:o.radio,value:"a"}),(0,R.jsx)(h.Z,{label:o.radio,value:"b"})]}),(0,R.jsx)(p.Z,{label:o.toggleButton,text:"Toggle",...r}),(0,R.jsxs)(p.Z.Group,{label:o.toggleButtonGroup,...r,children:[(0,R.jsx)(p.Z,{text:"Toggle A",value:"a"}),(0,R.jsx)(p.Z,{text:"Toggle B",value:"b"})]}),(0,R.jsx)(b.Z,{label:o.switch,...r}),(0,R.jsx)(F.Z,{label:o.textarea,rows:"5",...r}),(0,R.jsx)("div",{style:{display:"inline-flex"},children:(0,R.jsx)(g.Z,{label:o.slider,value:50,...r})})]});return"horizontal"===n?(0,R.jsx)(j.Z,{style:{padding:"1rem",whiteSpace:"nowrap"},children:(0,R.jsx)(v,{})}):(v._supportsSpacingProps=!0,(0,R.jsx)(f.Z,{style:{padding:"1rem"},children:(0,R.jsx)(v,{})}))},P=e=>(0,R.jsx)("div",{"data-visual-test":"form-components-alignment-vertical",...e,children:(0,R.jsx)(O,{direction:"vertical"})}),N=e=>(0,R.jsx)("div",{"data-visual-test":"form-components-alignment-vertical-labels",...e,children:(0,R.jsx)(Z.Z,{formElement:{label_direction:"vertical"},children:(0,R.jsx)(O,{direction:"vertical"})})}),q=e=>(0,R.jsx)("div",{"data-visual-test":"form-components-alignment-horizontal",...e,children:(0,R.jsx)(T.Z,{children:(0,R.jsx)(O,{direction:"horizontal"})})})},15961:function(e,n,t){t.d(n,{ai:function(){return a},b1:function(){return i},bO:function(){return s},y9:function(){return o}});var l=t(35823),r=t(52322);const o=()=>(0,r.jsx)(l.Z,{children:'<FormSet vertical>\n  <FormRow no_label>\n    <H2>A semantic h2 in a FormRow without a label</H2>\n  </FormRow>\n  <FormRow\n    section_style="mint-green-12"\n    section_spacing\n    label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"\n  >\n    <Radio.Group value="first">\n      <Radio label="First" value="first" />\n      <Radio label="Second" value="second" />\n      <Radio label="Third" value="third" />\n    </Radio.Group>\n  </FormRow>\n</FormSet>\n'}),i=()=>(0,r.jsx)(l.Z,{children:'<FormSet direction="vertical">\n  <FormRow\n    label={\n      <Space element="span" className="dnb-h--large">\n        Custom Legend:\n      </Space>\n    }\n  >\n    <Input label="Label:" bottom />\n    <Input label="Label:" />\n  </FormRow>\n</FormSet>\n'}),s=()=>(0,r.jsx)(l.Z,{children:'<FormSet\n  direction="horizontal"\n  on_submit={({ event }) => console.log(\'on_submit\', event)}\n  prevent_submit={true}\n>\n  <FormRow>\n    <Input\n      label="Search Input:"\n      type="search"\n      value="Search text ..."\n      right="small"\n    />\n    <Button type="submit" text="Trigger submit" />\n  </FormRow>\n</FormSet>\n'}),a=()=>(0,r.jsx)(l.Z,{hidePreview:!0,hideToolbar:!0,children:'<FormSet direction="vertical">\n  <FormRow>Components are now vertical aligned</FormRow>\n  <FormRow>Components are now vertical aligned</FormRow>\n</FormSet>\n'})},99210:function(e,n,t){t.d(n,{Z:function(){return s}});var l=t(72779),r=t.n(l),o=t(80215),i=t(52322);function s(e){let{className:n=null,...t}=e;return(0,i.jsx)(o.Z,{className:r()("dnb-forms-test-element",n),...t})}}}]);
//# sourceMappingURL=component---src-docs-uilib-layout-form-set-mdx-b5f47d2984bec80816ce.js.map
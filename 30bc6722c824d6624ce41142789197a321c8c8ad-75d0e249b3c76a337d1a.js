"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[25249],{92647:function(n,e,i){i.r(e);var t=i(52322),o=i(45392),r=i(84285),a=i(84618),l=i(95415);function s(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",a:"a",code:"code"},(0,o.ah)(),n.components);return r||d("Examples",!1),r.HorizontalFlexItemResponsiveSize||d("Examples.HorizontalFlexItemResponsiveSize",!0),r.HorizontalFlexItemResponsiveSizeCustomColumns||d("Examples.HorizontalFlexItemResponsiveSizeCustomColumns",!0),r.LayoutComponents||d("Examples.LayoutComponents",!0),r.ResponsiveGridContainer||d("Examples.ResponsiveGridContainer",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Demos"}),"\n",(0,t.jsx)(e.h3,{children:"Horizontal aligned Cards"}),"\n",(0,t.jsxs)(e.p,{children:["Grid wraps the Cards nicely on smaller screens. More examples in the ",(0,t.jsx)(e.a,{href:"/uilib/components/card/",children:"Card"})," section."]}),"\n",(0,t.jsx)(a.WithGrid,{}),"\n",(0,t.jsx)(e.h3,{children:"Accordion in two columns"}),"\n",(0,t.jsx)(e.p,{children:"This is a demo of how to outline accordions in two columns, including the correct tab order."}),"\n",(0,t.jsx)(l.EI,{}),"\n",(0,t.jsxs)(e.h3,{children:["Responsive application ",(0,t.jsx)(e.a,{href:"/uilib/layout/grid/",children:"Grid"})," usage"]}),"\n",(0,t.jsx)(r.ResponsiveGridContainer,{}),"\n",(0,t.jsxs)(e.h3,{children:["Responsive ",(0,t.jsx)(e.a,{href:"/uilib/layout/flex/",children:"Flex"})," usage"]}),"\n",(0,t.jsxs)(e.p,{children:["With the default ",(0,t.jsx)(e.code,{children:"sizeCount"})," of 12 parts."]}),"\n",(0,t.jsx)(r.HorizontalFlexItemResponsiveSize,{}),"\n",(0,t.jsxs)(e.h3,{children:["Customized ",(0,t.jsx)(e.a,{href:"/uilib/layout/flex/item/",children:"Flex.Item"})," sizes"]}),"\n",(0,t.jsxs)(e.p,{children:["With a custom amount of 4 parts (",(0,t.jsx)(e.code,{children:"sizeCount"}),") as well as custom breakpoints and media queries."]}),"\n",(0,t.jsx)(r.HorizontalFlexItemResponsiveSizeCustomColumns,{}),"\n",(0,t.jsxs)(e.h3,{children:[(0,t.jsx)(e.a,{href:"/uilib/layout/flex/",children:"Flex"})," usage in ",(0,t.jsx)(e.a,{href:"/uilib/extensions/forms/",children:"Forms"})]}),"\n",(0,t.jsx)(r.LayoutComponents,{})]})}function d(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,o.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(s,n)})):s(n)}},95415:function(n,e,i){i.d(e,{EI:function(){return C},F$:function(){return h},GC:function(){return b},GD:function(){return v},Lo:function(){return x},VH:function(){return g},g8:function(){return f},h8:function(){return j},oE:function(){return m},q3:function(){return A},xk:function(){return p}});var t=i(2784),o=i(58469),r=i(79357),a=i(48287),l=i(51796),s=i(96844),d=i(12834),c=i(88268),u=i(52322);const m=()=>(0,u.jsx)(o.Z,{"data-visual-test":"accordion-default",children:'\n<Accordion\n  expanded\n  remember_state\n  id="single-accordion"\n  title="Accordion title"\n>\n  <P>Accordion content</P>\n</Accordion>\n<Accordion.Provider\n  top\n  remember_state\n  icon="chevron_down"\n  icon_position="right"\n>\n  <Accordion id="single-provider-accordion" title="Accordion title">\n    <P>Accordion content</P>\n  </Accordion>\n</Accordion.Provider>\n\n'}),p=()=>(0,u.jsx)(o.Z,{"data-visual-test":"accordion-large",hideCode:!0,children:'<Accordion\n  expanded\n  bottom="large"\n  title="Large content with long titleScelerisque eget cubilia tempus ipsum aenean dolor suscipit egestas potenti at eleifend platea interdum magnis amet molestie sem faucibus netus "\n>\n  <P>\n    Hendrerit dictum elit facilisis aliquet eleifend potenti leo nec\n    praesent sollicitudin elementum scelerisque ridiculus neque nisi risus\n    et habitant torquent nam pellentesque dictumst porttitor accumsan a\n    nibh fringilla facilisi lacus sagittis mauris libero tellus justo\n    ultricies tempor viverra sodales vestibulum proin tempus lorem cubilia\n    at velit sociis sit malesuada class consectetur turpis metus vulputate\n    tortor cum nisl ornare ligula platea quam gravida sapien penatibus ad\n    curae varius hac ultrices ipsum felis vehicula fermentum rutrum\n    parturient congue sed vel magnis laoreet donec id consequat augue mi\n    semper volutpat urna in condimentum luctus cursus fames dignissim magna\n    suspendisse bibendum mus natoque diam\n  </P>\n</Accordion>\n'}),x=()=>(0,u.jsx)(o.Z,{"data-visual-test":"accordion-custom",scope:{bell:r.Z},children:'\n<Accordion group="unique-id" left_component={<Icon icon={bell} />}>\n  <Accordion.Header>Accordion title</Accordion.Header>\n  <Accordion.Content>\n    <P>\n      Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida\n      himenaeos nostra mollis volutpat bibendum convallis cum condimentum\n      dictumst blandit rutrum vehicula\n    </P>\n  </Accordion.Content>\n</Accordion>\n<Accordion top expanded={true} group="unique-id">\n  <Accordion.Header>Accordion title</Accordion.Header>\n  <Accordion.Content>\n    <P>\n      Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam\n    </P>\n  </Accordion.Content>\n</Accordion>\n\n'}),h=()=>(0,u.jsx)(o.Z,{"data-visual-test":"accordion-group",children:"<Accordion.Group expanded allow_close_all>\n  <Accordion expanded={false}>\n    <Accordion.Header>Accordion title</Accordion.Header>\n    <Accordion.Content top>\n      <P>\n        Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida\n        himenaeos nostra mollis volutpat bibendum convallis cum condimentum\n        dictumst blandit rutrum vehicula\n      </P>\n    </Accordion.Content>\n  </Accordion>\n  <Accordion top>\n    <Accordion.Header>Accordion title</Accordion.Header>\n    <Accordion.Content>\n      <P>\n        Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam\n      </P>\n    </Accordion.Content>\n  </Accordion>\n</Accordion.Group>\n"}),b=()=>(0,u.jsx)(o.Z,{"data-visual-test":"accordion-variant-plain",scope:{AddIcon:a.Z,SubtractIcon:l.Z},children:'\n<Accordion\n  variant="plain"\n  title="Accordion with plain variant"\n  icon={{\n    closed: AddIcon,\n    expanded: SubtractIcon,\n  }}\n  icon_position="right"\n>\n  <P>content</P>\n</Accordion>\n<Accordion\n  variant="plain"\n  title="Accordion with plain variant"\n  icon={{\n    closed: AddIcon,\n    expanded: SubtractIcon,\n  }}\n  icon_position="right"\n  expanded\n>\n  <P>content</P>\n</Accordion>\n\n'}),g=()=>(0,u.jsx)(o.Z,{"data-visual-test":"accordion-nested",children:'<Accordion id="nested-accordion" title="Accordion" expanded space>\n  <P space={0}>Content A</P>\n  <Accordion id="nested-accordion-1" title="Accordion nested 1" space>\n    <P space={0}>I\'m nested 1</P>\n  </Accordion>\n\n  <P space={0}>Content B</P>\n  <Accordion id="nested-accordion-2" title="Accordion nested 2" space>\n    <P space={0}>I\'m nested 2</P>\n  </Accordion>\n</Accordion>\n'}),v=()=>(0,u.jsx)(o.Z,{"data-visual-test":"accordion-disabled",children:'\n<Accordion expanded disabled remember_state title="Disabled (expanded)">\n  <P>I am expanded, but disabled, so I can\'t be closed</P>\n</Accordion>\n<Accordion.Provider\n  top\n  disabled\n  remember_state\n  icon="chevron_down"\n  icon_position="right"\n>\n  <Accordion title="Disabled (closed)">\n    <P>You can\'t see this text because I am disabled and closed.</P>\n  </Accordion>\n</Accordion.Provider>\n\n'}),A=()=>(0,u.jsx)(o.Z,{"data-visual-test":"accordion-description",children:'\n<Accordion\n  expanded\n  title="Accordion title"\n  description="Accordion description"\n>\n  <P>Accordion content</P>\n</Accordion>\n<Accordion\n  top\n  icon="chevron_down"\n  icon_position="right"\n  id="description-provider-accordion"\n  title="Accordion title"\n  description="Accordion description"\n>\n  <P>Accordion content</P>\n</Accordion>\n\n'}),f=()=>(0,u.jsx)(o.Z,{"data-visual-test":"accordion-filled",children:'\n<Accordion expanded title="Accordion title" variant="filled">\n  <P>Accordion content</P>\n</Accordion>\n<Accordion top title="Accordion title" variant="filled">\n  <P>Accordion content</P>\n</Accordion>\n\n'}),C=()=>(0,u.jsx)(o.Z,{background:"white",noInline:!0,children:'const items = [\n  <Accordion key="one" variant="filled">\n    <Accordion.Header>\n      Sit amet suscipit ipsum tincidunt id?\n    </Accordion.Header>\n    <Accordion.Content space>\n      <P>\n        Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida\n        himenaeos nostra mollis volutpat bibendum convallis cum condimentum\n        dictumst blandit rutrum vehicula\n      </P>\n    </Accordion.Content>\n  </Accordion>,\n  <Accordion key="two" variant="filled">\n    <Accordion.Header>\n      Cras eget quam eget tortor placerat viverra?\n    </Accordion.Header>\n    <Accordion.Content space>\n      <P>\n        Morbi condimentum odio ut enim vulputate, rutrum ullamcorper sem\n        vestibulum. Ut luctus tempus leo vel finibus. Pellentesque ultrices\n        interdum nisi, sit amet suscipit ipsum tincidunt id. Praesent\n        sodales vel eros ut accumsan.\n      </P>\n    </Accordion.Content>\n  </Accordion>,\n  <Accordion key="three" variant="filled">\n    <Accordion.Header>Nam porta nec ipsum id porta</Accordion.Header>\n    <Accordion.Content space>\n      <P>\n        Nam porta nec ipsum id porta. Cras eget quam eget tortor placerat\n        viverra.\n      </P>\n    </Accordion.Content>\n  </Accordion>,\n]\nrender(\n  <>\n    <Heading size="large">Accordion in columns</Heading>\n    <Grid.Container columns={2} columnGap="small" rowGap="x-small">\n      <Grid.Item\n        span={{\n          small: [1, 2],\n          medium: [1, 1],\n          large: [1, 1],\n        }}\n      >\n        <Flex.Stack gap="x-small">{items}</Flex.Stack>\n      </Grid.Item>\n      <Grid.Item\n        span={{\n          small: [1, 2],\n          medium: [2, 2],\n          large: [2, 2],\n        }}\n      >\n        <Flex.Stack gap="x-small">{[...items].reverse()}</Flex.Stack>\n      </Grid.Item>\n    </Grid.Container>\n  </>,\n)\n'});function j(){const n=t.createRef();return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(s.Z,{bottom:"large",variant:"secondary",onClick:()=>n.current(),children:"Close All"}),(0,u.jsxs)(d.Z.Group,{expanded:!0,allow_close_all:!0,collapseAllHandleRef:n,children:[(0,u.jsxs)(d.Z,{expanded:!0,children:[(0,u.jsx)(d.Z.Header,{children:"Accordion title 1"}),(0,u.jsx)(d.Z.Content,{children:(0,u.jsx)(c.Z,{children:"Sociis sapien sociosqu vel sollicitudin accumsan laoreet gravida himenaeos nostra mollis volutpat bibendum convallis cum condimentum dictumst blandit rutrum vehicula"})})]}),(0,u.jsxs)(d.Z,{expanded:!0,children:[(0,u.jsx)(d.Z.Header,{children:"Accordion title 2"}),(0,u.jsx)(d.Z.Content,{children:()=>(0,u.jsx)(c.Z,{children:"Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam"})})]}),(0,u.jsxs)(d.Z,{expanded:!0,children:[(0,u.jsx)(d.Z.Header,{children:"Accordion title 2"}),(0,u.jsx)(d.Z.Content,{children:()=>(0,u.jsx)(c.Z,{children:"Nec sit mattis natoque interdum sagittis cubilia nibh nullam etiam"})})]})]})]})}},84618:function(n,e,i){i.r(e),i.d(e,{Default:function(){return r},HorizontalFields:function(){return u},Stack:function(){return d},VerticalFields:function(){return c},WithFlex:function(){return s},WithGrid:function(){return l},WithHeadingsAndAriaLabel:function(){return m},WithTable:function(){return a}});var t=i(58469),o=i(52322);const r=()=>(0,o.jsx)(t.Z,{children:'<Card data-visual-test="layout-card-border">\n  <P>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus\n    pharetra elit in bibendum.\n  </P>\n  <P>\n    Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae\n    metus.\n  </P>\n</Card>\n'}),a=()=>(0,o.jsx)(t.Z,{"data-visual-test":"layout-card-table",noInline:!0,children:'const MyTable = () => (\n  <Table.ScrollView>\n    <Table border outline size="medium">\n      <thead>\n        <Tr noWrap>\n          <Th>Column 1</Th>\n          <Th>Column 2</Th>\n          <Th>Column 3</Th>\n        </Tr>\n      </thead>\n      <tbody>\n        <Tr>\n          <Td>Row 1</Td>\n          <Td>Row 1</Td>\n          <Td>Row 1</Td>\n        </Tr>\n        <Tr>\n          <Td colSpan={3} align="right">\n            <Button>Button</Button>\n          </Td>\n        </Tr>\n        <Tr>\n          <Td>Row 3</Td>\n          <Td>Row 3</Td>\n          <Td>Row 3</Td>\n        </Tr>\n      </tbody>\n    </Table>\n  </Table.ScrollView>\n)\nrender(\n  <Card title="Card title" responsive={false} innerSpace={0} filled>\n    <MyTable />\n  </Card>,\n)\n'}),l=()=>(0,o.jsx)(t.Z,{"data-visual-test":"layout-card-grid",children:'<Grid.Container\n  columns={{\n    small: 1,\n    medium: 3,\n    large: 3,\n  }}\n  columnGap="small"\n>\n  <Card stack>\n    <H2>Heading</H2>\n    <P>Text</P>\n  </Card>\n  <Card stack>\n    <H2>Heading</H2>\n    <P>Pariatur officia sit adipisicing pariatur commodo enim do quis</P>\n  </Card>\n  <Card stack>\n    <H2>Heading</H2>\n    <P>Text</P>\n  </Card>\n</Grid.Container>\n'}),s=()=>(0,o.jsx)(t.Z,{"data-visual-test":"layout-card-flex",children:"<Flex.Container>\n  <Card\n    size={{\n      small: 'auto',\n      medium: 4,\n      large: 4,\n    }}\n    stack\n  >\n    <H2>Heading</H2>\n    <P>Text</P>\n  </Card>\n  <Card\n    size={{\n      small: 'auto',\n      medium: 4,\n      large: 4,\n    }}\n    stack\n  >\n    <H2>Heading</H2>\n    <P>Pariatur officia sit adipisicing pariatur commodo enim do quis</P>\n  </Card>\n  <Card\n    size={{\n      small: 'auto',\n      medium: 4,\n      large: 4,\n    }}\n    stack\n  >\n    <H2>Heading</H2>\n    <P>Text</P>\n  </Card>\n</Flex.Container>\n"}),d=()=>(0,o.jsx)(t.Z,{"data-visual-test":"layout-card-stack",children:'<Card stack>\n  <Field.String label="Label" value="Value" />\n  <Field.String label="Label" value="Value" />\n  <Hr />\n  <Form.SubmitButton />\n</Card>\n'}),c=()=>(0,o.jsx)(t.Z,{children:'<Card>\n  <Flex.Vertical>\n    <Field.String label="Label" value="Value" />\n    <Field.String label="Label" value="Value" />\n  </Flex.Vertical>\n</Card>\n'}),u=()=>(0,o.jsx)(t.Z,{children:'<Card>\n  <Flex.Horizontal>\n    <Field.String label="Label" value="Value" width="small" />\n    <Field.String label="Label" value="Value" width="stretch" />\n  </Flex.Horizontal>\n</Card>\n'}),m=()=>(0,o.jsx)(t.Z,{hidePreview:!0,children:'<Card aria-labelledby="unique-id">\n  <Form.SubHeading id="unique-id" space={0}>\n    Heading\n  </Form.SubHeading>\n  <P>Content inside a landmark ...</P>\n</Card>\n'})},84285:function(n,e,i){i.r(e),i.d(e,{AllComponentsHorizontalTestCase:function(){return W},AllComponentsVerticalLabelsTestCase:function(){return N},AllComponentsVerticalTestCase:function(){return Q},FormSetAlternativeAfter:function(){return M},FormSetAlternativeBefore:function(){return L},FormSetAlternativeForms:function(){return _},HorizontalFlexItemResponsiveSize:function(){return z},HorizontalFlexItemResponsiveSizeCustomColumns:function(){return k},LayoutComponents:function(){return S},MediaQueryLiveExample:function(){return q},MediaQueryUseMedia:function(){return E},ResponsiveGridContainer:function(){return R},colors:function(){return w}});var t=i(2784),o=i(58469),r=i(35235),a=i(80215),l=i(66651),s=i(96844),d=i(75511),c=i(469),u=i(25807),m=i(71618),p=i(59194),x=i(20167),h=i(35944),b=i(55904),g=i(16353),v=i(99399),A=i(89751),f=i(38644),C=i(52024),j=i(70564),F=i(99210),P=i(67571),H=i(87682),I=i(81858),y=i(60131),Z=i(44086),T=i(52322);const S=()=>(0,T.jsx)(o.Z,{scope:{Field:C,Form:j},hideCode:!0,children:'<Flex.Stack>\n  <Form.MainHeading>Profile</Form.MainHeading>\n\n  <Card stack>\n    <Form.SubHeading>Name</Form.SubHeading>\n\n    <Field.String label="Fornavn" value="John" />\n    <Field.String label="Etternavn" value="Smith" />\n  </Card>\n\n  <Card stack>\n    <Form.SubHeading>More information</Form.SubHeading>\n\n    <Field.NationalIdentityNumber value="20058512345" />\n    <Field.Email value="john@smith.email" />\n    <Field.PhoneNumber value="+47 98765432" />\n  </Card>\n</Flex.Stack>\n'}),w=[{background:"#babeee"},{background:"#dfe0ee"},{background:"#90d2c3"},{background:"#ecf4be"}],z=()=>(0,T.jsx)(o.Z,{scope:{colors:w,TestElement:F.Z},hideCode:!0,"data-visual-test":"flex-item-size",children:"<Flex.Container>\n  <Flex.Item size={8}>\n    <TestElement style={colors[0]}>FlexItem (8)</TestElement>\n  </Flex.Item>\n  <Flex.Item size={4}>\n    <TestElement style={colors[1]}>FlexItem (4)</TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 4,\n    }}\n  >\n    <TestElement style={colors[2]}>\n      FlexItem (small: 8, medium: 4)\n    </TestElement>\n  </Flex.Item>\n  <Flex.Item\n    size={{\n      small: 12,\n      medium: 8,\n    }}\n  >\n    <TestElement style={colors[3]}>\n      FlexItem (small: 4, medium: 8)\n    </TestElement>\n  </Flex.Item>\n</Flex.Container>\n"}),k=()=>(0,T.jsx)(o.Z,{hideCode:!0,scope:{colors:w,TestElement:F.Z,Field:C,defaultBreakpoints:P.R1,defaultQueries:H.L},"data-visual-test":"flex-item-custom-size",noInline:!0,children:"const breakpoints = {\n  ...defaultBreakpoints,\n  xsmall: '30em',\n}\nconst queries = {\n  ...defaultQueries,\n  xsmall: {\n    min: 0,\n    max: 'xsmall',\n  },\n  small: {\n    min: 'xsmall',\n    max: 'small',\n  },\n}\nconst CustomMediaQuery = styled.div`\n  display: flex;\n  flex-direction: column;\n  .dnb-flex-container[data-media-key='xsmall'] .dnb-flex-item--responsive {\n    --size: var(--xsmall);\n  }\n`\nrender(\n  <CustomMediaQuery>\n    <Flex.Container\n      direction=\"horizontal\"\n      sizeCount={4}\n      breakpoints={breakpoints}\n      queries={queries}\n    >\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 3,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[0]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          small: 2,\n          medium: 1,\n          large: 2,\n        }}\n      >\n        <TestElement style={colors[1]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 1,\n          large: 1,\n        }}\n      >\n        <TestElement style={colors[2]}>FlexItem</TestElement>\n      </Flex.Item>\n      <Flex.Item\n        size={{\n          xsmall: 4,\n          small: 2,\n          medium: 3,\n          large: 4,\n        }}\n      >\n        <TestElement style={colors[3]}>FlexItem</TestElement>\n      </Flex.Item>\n    </Flex.Container>\n  </CustomMediaQuery>,\n)\n"}),G=()=>{const[n,e]=t.useState("undefined"!=typeof window?window.innerWidth:0);return t.useEffect((()=>{const n=()=>{e(window.innerWidth)};return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n)}),[]),{innerWidth:n}},E=()=>(0,T.jsx)(o.Z,{scope:{useMedia:H.Z,useWindowWidth:G},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const { isSmall, isMedium, isLarge, isSSR } = useMedia()\n  const { innerWidth } = useWindowWidth()\n  return (\n    <Code>\n      <pre>\n        {JSON.stringify(\n          {\n            isSmall,\n            isMedium,\n            isLarge,\n            isSSR,\n            innerWidth,\n          },\n          null,\n          2,\n        )}\n      </pre>\n    </Code>\n  )\n}\nrender(<Playground />)\n"}),q=()=>(0,T.jsx)(o.Z,{scope:{MediaQuery:r.Z,useMediaQuery:I.Z},hideCode:!0,noInline:!0,children:"const Playground = () => {\n  const [query, updateQuery] = React.useState({\n    screen: true,\n    not: true,\n    min: 'small',\n    max: 'large',\n  })\n  const match1 = useMediaQuery({\n    matchOnSSR: true,\n    when: query,\n  })\n  const match2 = useMediaQuery({\n    matchOnSSR: true,\n    not: true,\n    when: query,\n  })\n  React.useEffect(() => {\n    console.log('mediaQuery:', match1, match2)\n  }, [match1, match2])\n  return (\n    <>\n      <Button\n        onClick={() => {\n          updateQuery({\n            ...query,\n            screen: !query.screen,\n          })\n        }}\n        right\n      >\n        Switch\n      </Button>\n      <MediaQuery when={query}>\n        <Code>when</Code>\n      </MediaQuery>\n      <MediaQuery not when={query}>\n        <Code>not when</Code>\n      </MediaQuery>\n    </>\n  )\n}\nrender(<Playground />)\n"}),R=()=>(0,T.jsx)(o.Z,{hideCode:!0,scope:{TestElement:F.Z,colors:w},children:"<Grid.Container rowGap columnGap>\n  <Grid.Item\n    span={{\n      small: [1, 2],\n      medium: [1, 3],\n      large: [1, 12],\n    }}\n    style={colors[0]}\n    element={TestElement}\n  >\n    Item A\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [3, 4],\n      medium: [4, 6],\n      large: [1, 4],\n    }}\n    style={colors[1]}\n    element={TestElement}\n  >\n    Item B\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [2, 3],\n      medium: [4, 6],\n      large: [5, 8],\n    }}\n    style={colors[2]}\n    element={TestElement}\n  >\n    Item C\n  </Grid.Item>\n\n  <Grid.Item\n    span={{\n      small: [1, 4],\n      medium: [4, 6],\n      large: [9, 12],\n    }}\n    style={colors[3]}\n    element={TestElement}\n  >\n    Item D\n  </Grid.Item>\n</Grid.Container>\n"}),L=()=>(0,T.jsx)(o.Z,{children:'<FormSet label_direction="vertical">\n  <H2 top={0}>Heading</H2>\n  <FormRow label={<span className="dnb-h--medium">Legend</span>}>\n    <Input label="Label A" right />\n    <Input label="Label B" />\n  </FormRow>\n</FormSet>\n'}),M=()=>(0,T.jsx)(o.Z,{children:'<Provider\n  formElement={{\n    label_direction: \'vertical\',\n  }}\n>\n  <Form.Handler>\n    <H2 top={0}>Heading</H2>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Input label="Label A" />\n        <Input label="Label B" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Form.Handler>\n</Provider>\n'}),_=()=>(0,T.jsx)(o.Z,{children:'<Form.Handler>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <FieldBlock label={<span className="dnb-h--medium">Legend</span>}>\n      <Flex.Horizontal>\n        <Field.String label="Label A" width="medium" />\n        <Field.String label="Label B" width="large" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Flex.Stack>\n</Form.Handler>\n'}),B=function(n){let{direction:e="vertical",showText:i=!1,hideLabel:t=!1}=void 0===n?{}:n;const o={left:"horizontal"===e?"small":null,top:"horizontal"!==e?"small":null};let r={datePicker:"DatePicker:",dropdown:"Dropdown:",autocomplete:"Autocomplete:",checkbox:"Checkbox",radio:"Radio",radioGroup:"Radio Group:",toggleButton:"Toggle:",toggleButtonGroup:"Toggle Group:",switch:"Switch",input:"Input:",textarea:"Textarea:",slider:"Slider:"};t&&(r=Object.entries(r).reduce(((n,e)=>{let[i]=e;return n[i]="",n}),{}));const C=()=>(0,T.jsxs)(T.Fragment,{children:[i&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(a.Z,{...o,inline:!0,children:(0,T.jsxs)("p",{className:"dnb-p",children:["paragraph"," ",(0,T.jsx)(l.ZP,{icon:"bell",size:"medium",...o,style:{margin:0}})]})}),"text"]}),(0,T.jsx)(s.Z,{text:"Button",...o}),(0,T.jsx)(s.Z,{icon:"add",...o}),(0,T.jsx)(d.ZP,{label:r.input,...o}),(0,T.jsx)(c.Z,{label:r.dropdown,data:["Item A","Item B","Item C"],...o}),(0,T.jsx)(u.Z,{label:r.autocomplete,data:["Item A","Item B","Item C"],...o}),(0,T.jsx)(m.Z,{label:r.datePicker,...o}),(0,T.jsx)(l.ZP,{icon:"bell",size:"medium",...o}),(0,T.jsx)(p.Z,{label:r.checkbox,...o}),(0,T.jsx)(x.Z,{label:r.radio,...o}),(0,T.jsxs)(x.Z.Group,{label:r.radioGroup,...o,children:[(0,T.jsx)(x.Z,{label:r.radio,value:"a"}),(0,T.jsx)(x.Z,{label:r.radio,value:"b"})]}),(0,T.jsx)(h.Z,{label:r.toggleButton,text:"Toggle",...o}),(0,T.jsxs)(h.Z.Group,{label:r.toggleButtonGroup,...o,children:[(0,T.jsx)(h.Z,{text:"Toggle A",value:"a"}),(0,T.jsx)(h.Z,{text:"Toggle B",value:"b"})]}),(0,T.jsx)(b.Z,{label:r.switch,...o}),(0,T.jsx)(g.Z,{label:r.textarea,rows:"5",...o}),(0,T.jsx)("div",{style:{display:"inline-flex"},children:(0,T.jsx)(v.Z,{label:r.slider,value:50,...o})})]});return"horizontal"===e?(0,T.jsx)(A.Z,{style:{padding:"1rem",whiteSpace:"nowrap"},children:(0,T.jsx)(C,{})}):(C._supportsSpacingProps=!0,(0,T.jsx)(f.Z,{style:{padding:"1rem"},children:(0,T.jsx)(C,{})}))},Q=n=>(0,T.jsx)("div",{"data-visual-test":"form-components-alignment-vertical",...n,children:(0,T.jsx)(B,{direction:"vertical"})}),N=n=>(0,T.jsx)("div",{"data-visual-test":"form-components-alignment-vertical-labels",...n,children:(0,T.jsx)(y.Z,{formElement:{label_direction:"vertical"},children:(0,T.jsx)(B,{direction:"vertical"})})}),W=n=>(0,T.jsx)("div",{"data-visual-test":"form-components-alignment-horizontal",...n,children:(0,T.jsx)(Z.Z,{children:(0,T.jsx)(B,{direction:"horizontal"})})})},99210:function(n,e,i){i.d(e,{Z:function(){return l}});var t=i(72779),o=i.n(t),r=i(80215),a=i(52322);function l(n){let{className:e=null,...i}=n;return(0,a.jsx)(r.Z,{className:o()("dnb-forms-test-element",e),...i})}l._supportsSpacingProps=!0}}]);
//# sourceMappingURL=30bc6722c824d6624ce41142789197a321c8c8ad-75d0e249b3c76a337d1a.js.map
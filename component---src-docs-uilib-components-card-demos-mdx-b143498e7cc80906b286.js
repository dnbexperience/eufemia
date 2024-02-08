"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[75927],{90349:function(n,e,a){a.r(e);var i=a(52322),l=a(45392),t=a(84618);function r(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p"},(0,l.ah)(),n.components);return t||s("Examples",!1),t.Default||s("Examples.Default",!0),t.HorizontalFields||s("Examples.HorizontalFields",!0),t.Stack||s("Examples.Stack",!0),t.VerticalFields||s("Examples.VerticalFields",!0),t.WithFlex||s("Examples.WithFlex",!0),t.WithGrid||s("Examples.WithGrid",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{children:"Demo"}),"\n",(0,i.jsx)(e.h3,{children:"Default border"}),"\n",(0,i.jsx)(t.Default,{}),"\n",(0,i.jsx)(e.h3,{children:"Vertical fields"}),"\n",(0,i.jsx)(t.VerticalFields,{}),"\n",(0,i.jsx)(e.h3,{children:"Horizontal fields"}),"\n",(0,i.jsx)(t.HorizontalFields,{}),"\n",(0,i.jsx)(e.h3,{children:"Stack"}),"\n",(0,i.jsx)(t.Stack,{}),"\n",(0,i.jsx)(e.h3,{children:"With Grid"}),"\n",(0,i.jsx)(e.p,{children:"Grid wraps the Cards nicely on smaller screens."}),"\n",(0,i.jsx)(t.WithGrid,{}),"\n",(0,i.jsx)(e.h3,{children:"With Flex"}),"\n",(0,i.jsx)(e.p,{children:"While Flex has the horizontal direction, it uses rowGap when wrapping. So its the container spacing the Cards then. This is not ideal, because the Cards should ideally have no gap, like in the Grid example above."}),"\n",(0,i.jsx)(t.WithFlex,{})]})}function s(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,l.ah)(),n.components);return e?(0,i.jsx)(e,Object.assign({},n,{children:(0,i.jsx)(r,n)})):r(n)}},84618:function(n,e,a){a.r(e),a.d(e,{Default:function(){return t},HorizontalFields:function(){return c},Stack:function(){return d},VerticalFields:function(){return o},WithFlex:function(){return s},WithGrid:function(){return r},WithHeadingsAndAriaLabel:function(){return u}});var i=a(44464),l=a(52322);const t=()=>(0,l.jsx)(i.Z,{children:'<Card data-visual-test="layout-card-border">\n  <P>\n    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus\n    pharetra elit in bibendum.\n  </P>\n  <P>\n    Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae\n    metus.\n  </P>\n</Card>\n'}),r=()=>(0,l.jsx)(i.Z,{"data-visual-test":"layout-card-grid",children:'<Grid.Container\n  columns={{\n    small: 1,\n    medium: 3,\n    large: 3,\n  }}\n  columnGap="small"\n>\n  <Card stack>\n    <H2>Heading</H2>\n    <P>Text</P>\n  </Card>\n  <Card stack>\n    <H2>Heading</H2>\n    <P>Pariatur officia sit adipisicing pariatur commodo enim do quis</P>\n  </Card>\n  <Card stack>\n    <H2>Heading</H2>\n    <P>Text</P>\n  </Card>\n</Grid.Container>\n'}),s=()=>(0,l.jsx)(i.Z,{"data-visual-test":"layout-card-flex",children:"<Flex.Container>\n  <Card\n    size={{\n      small: 'auto',\n      medium: 4,\n      large: 4,\n    }}\n    stack\n  >\n    <H2>Heading</H2>\n    <P>Text</P>\n  </Card>\n  <Card\n    size={{\n      small: 'auto',\n      medium: 4,\n      large: 4,\n    }}\n    stack\n  >\n    <H2>Heading</H2>\n    <P>Pariatur officia sit adipisicing pariatur commodo enim do quis</P>\n  </Card>\n  <Card\n    size={{\n      small: 'auto',\n      medium: 4,\n      large: 4,\n    }}\n    stack\n  >\n    <H2>Heading</H2>\n    <P>Text</P>\n  </Card>\n</Flex.Container>\n"}),d=()=>(0,l.jsx)(i.Z,{"data-visual-test":"layout-card-stack",children:'<Card stack>\n  <Field.String label="Label" value="Value" />\n  <Field.String label="Label" value="Value" />\n</Card>\n'}),o=()=>(0,l.jsx)(i.Z,{children:'<Card>\n  <Flex.Vertical>\n    <Field.String label="Label" value="Value" />\n    <Field.String label="Label" value="Value" />\n  </Flex.Vertical>\n</Card>\n'}),c=()=>(0,l.jsx)(i.Z,{children:'<Card>\n  <Flex.Horizontal>\n    <Field.String label="Label" value="Value" width="small" />\n    <Field.String label="Label" value="Value" width="stretch" />\n  </Flex.Horizontal>\n</Card>\n'}),u=()=>(0,l.jsx)(i.Z,{hidePreview:!0,children:'<Card aria-labelledby="unique-id">\n  <Form.SubHeading id="unique-id" space={0}>\n    Heading\n  </Form.SubHeading>\n  <P>Content inside a landmark ...</P>\n</Card>\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-components-card-demos-mdx-b143498e7cc80906b286.js.map
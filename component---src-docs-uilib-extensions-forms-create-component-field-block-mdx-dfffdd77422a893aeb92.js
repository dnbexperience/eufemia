"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[92965,3402,59195],{83690:function(e,n,t){t.r(n);var l=t(52322),o=t(45392),i=t(24068),r=t(56485);function s(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.default,{}),"\n",(0,l.jsx)(r.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(s,e)})):s()}},56485:function(e,n,t){t.r(n),t.d(n,{default:function(){return B}});var l={};t.r(l),t.d(l,{CombineErrorMessages:function(){return f},Default:function(){return a},Horizontal:function(){return d},HorizontalAutoSize:function(){return p},HorizontalWithInfo:function(){return h},InlineHelpButtonCompositionFields:function(){return v},InlineHelpButtonHTML:function(){return k},InlineHelpButtonHorizontalLabel:function(){return j},InlineHelpButtonLabelDescription:function(){return F},InlineHelpButtonVerticalLabel:function(){return x},InlineHelpButtonVerticalLabelDescription:function(){return g},LabelSize:function(){return b},Widths:function(){return u},WithDescription:function(){return m},WithInfo:function(){return c}});var o=t(52322),i=t(45392),r=t(46832),s=t(99210);const a=()=>(0,o.jsx)(r.Z,{children:'<FieldBlock label="Label text">Input features goes here</FieldBlock>\n'}),c=()=>(0,o.jsx)(r.Z,{children:'<FieldBlock label="Label text" info="For your information">\n  Input features goes here\n</FieldBlock>\n'}),d=()=>(0,o.jsx)(r.Z,{children:'<FieldBlock label="Label text" layout="horizontal">\n  Input features goes here\n</FieldBlock>\n'}),h=()=>(0,o.jsx)(r.Z,{children:'<FieldBlock\n  label="Label text"\n  layout="horizontal"\n  info="For your information"\n>\n  Input features goes here\n</FieldBlock>\n'}),u=()=>(0,o.jsx)(r.Z,{scope:{TestElement:s.Z},hideCode:!0,"data-visual-test":"forms-field-block-widths",children:'<Flex.Stack>\n  <FieldBlock label="Default width (no width props)">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Small (affects outer block element)" width="small">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Medium (affects outer block element)" width="medium">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Large (affects outer block element)" width="large">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Custom (affects outer block element)" width="8rem">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock\n    label="Stretch (affects outer block element)"\n    width="stretch"\n  >\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n\n  <FieldBlock label="Small (affects contents only)" contentWidth="small">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Medium (affects contents only)" contentWidth="medium">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Large (affects contents only)" contentWidth="large">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Custom (affects contents only)" contentWidth="8rem">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock\n    label="Stretch (affects contents only)"\n    contentWidth="stretch"\n  >\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n\n  <Flex.Horizontal gap={false}>\n    <FieldBlock\n      width="stretch"\n      style={{\n        backgroundColor: \'var(--color-mint-green)\',\n      }}\n    >\n      Left content\n    </FieldBlock>\n    <FieldBlock\n      width="stretch"\n      style={{\n        backgroundColor: \'var(--color-pistachio)\',\n      }}\n    >\n      Right content\n    </FieldBlock>\n  </Flex.Horizontal>\n</Flex.Stack>\n'}),m=()=>(0,o.jsx)(r.Z,{"data-visual-test":"forms-field-block-label-description",children:'<FieldBlock label="Label text" labelDescription="Description text">\n  Input features goes here\n</FieldBlock>\n'}),p=()=>(0,o.jsx)(r.Z,{children:'<FieldBlock label="Label">\n  <Flex.Container>\n    <Flex.Item\n      size={{\n        small: 12,\n        large: \'auto\',\n      }}\n    >\n      <Field.Name.First path="/firstName" width="medium" minLength={2} />\n    </Flex.Item>\n    <Flex.Item\n      size={{\n        small: 12,\n        large: \'auto\',\n      }}\n    >\n      <Field.Name.Last path="/lastName" width="medium" required />\n    </Flex.Item>\n    <Flex.Item\n      size={{\n        small: 12,\n        large: \'auto\',\n      }}\n    >\n      <FieldBlock width="large">\n        <Slider\n          min={1900}\n          max={new Date().getFullYear()}\n          step={1}\n          value={2010}\n          label="Birth year"\n          label_direction="vertical"\n          tooltip\n          alwaysShowTooltip\n        />\n      </FieldBlock>\n    </Flex.Item>\n  </Flex.Container>\n</FieldBlock>\n'}),b=()=>(0,o.jsx)(r.Z,{"data-visual-test":"forms-field-block-label-size",children:'<Form.Handler>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <FieldBlock label="Legend with medium heading size" labelSize="medium">\n      <Field.String\n        label="Label with a long text that goes beyond the field"\n        width="medium"\n      />\n    </FieldBlock>\n  </Flex.Stack>\n</Form.Handler>\n'}),f=()=>(0,o.jsx)(r.Z,{"data-visual-test":"forms-field-block-combined-errors",children:'<Field.Composition>\n  <Field.Number\n    width="small"\n    label="Number"\n    value={99}\n    minimum={100}\n    validateInitially\n  />\n  <Field.String\n    width="medium"\n    label="Text"\n    value="Text"\n    minLength={5}\n    validateInitially\n  />\n</Field.Composition>\n'}),x=()=>(0,o.jsx)(r.Z,{"data-visual-test":"forms-field-block-help-button-vertical-label",children:"<Flex.Stack>\n  <Field.String\n    label=\"Ønsket lånebeløp\"\n    help={{\n      title: 'Hva betyr lånebeløp?',\n      content: (\n        <>\n          Dette er hvor mye du har tenkt å låne{' '}\n          <Anchor href=\"#test\">totalt</Anchor>.\n        </>\n      ),\n    }}\n    onChange={async () => {\n      await new Promise((resolve) => setTimeout(resolve, 1000))\n    }}\n  />\n  <Field.String\n    label=\"Ønsket lånebeløp\"\n    multiline\n    rows={3}\n    help={{\n      title: 'Hva betyr lånebeløp?',\n      content: 'Dette er hvor mye du har tenkt å låne totalt.',\n    }}\n  />\n</Flex.Stack>\n"}),F=()=>(0,o.jsx)(r.Z,{"data-visual-test":"forms-field-block-help-button-label-description",children:"<Flex.Stack>\n  <Field.String\n    label=\"Ønsket lånebeløp\"\n    labelDescription=\"Description Nisi ad ullamco ut anim proident sint eiusmod.\"\n    help={{\n      title: 'Hva betyr lånebeløp?',\n      content: 'Dette er hvor mye du har tenkt å låne totalt.',\n    }}\n    onChange={async () => {\n      await new Promise((resolve) => setTimeout(resolve, 1000))\n    }}\n  />\n  <Field.String\n    label=\"Ønsket lånebeløp\"\n    labelDescription=\"Description\"\n    multiline\n    rows={3}\n    help={{\n      open: true,\n      title: 'Hva betyr lånebeløp?',\n      content: 'Dette er hvor mye du har tenkt å låne totalt.',\n    }}\n  />\n</Flex.Stack>\n"}),k=()=>(0,o.jsx)(r.Z,{"data-visual-test":"forms-field-block-help-button-html",children:"<Flex.Stack>\n  <Field.String\n    label={<strong>Ønsket lånebeløp</strong>}\n    labelDescription={\n      <span>\n        <br />\n        Label description with a <Anchor>Anchor</Anchor>\n      </span>\n    }\n    help={{\n      open: true,\n      title: <strong>Help title</strong>,\n      content: (\n        <>\n          Help content with a <Anchor>Anchor</Anchor>.\n        </>\n      ),\n    }}\n    onChange={async () => {\n      await new Promise((resolve) => setTimeout(resolve, 1000))\n    }}\n  />\n</Flex.Stack>\n"}),g=()=>(0,o.jsx)(r.Z,{"data-visual-test":"forms-field-block-help-button-vertical-label-description",children:"<Form.Card>\n  <Field.String\n    label=\"Ønsket lånebeløp\"\n    labelDescription={'\\nDescription'}\n    help={{\n      title: 'Hva betyr lånebeløp?',\n      content: 'Dette er hvor mye du har tenkt å låne totalt.',\n    }}\n    onChange={async () => {\n      await new Promise((resolve) => setTimeout(resolve, 1000))\n    }}\n  />\n  <Field.String\n    label=\"Ønsket lånebeløp\"\n    labelDescription={'\\nDescription'}\n    multiline\n    rows={3}\n    help={{\n      open: true,\n      title: 'Hva betyr lånebeløp?',\n      content: 'Dette er hvor mye du har tenkt å låne totalt.',\n    }}\n  />\n</Form.Card>\n"}),j=()=>(0,o.jsx)(r.Z,{"data-visual-test":"forms-field-block-help-button-horizontal-label",children:'<Form.Card>\n  <Field.String\n    label="Ønsket lånebeløp"\n    layout="horizontal"\n    help={{\n      open: true,\n      title: \'Hva betyr lånebeløp?\',\n      content: \'Dette er hvor mye du har tenkt å låne totalt.\',\n    }}\n    info="Info message"\n    onChange={async () => {\n      await new Promise((resolve) => setTimeout(resolve, 1000))\n    }}\n  />\n  <Field.String\n    label="Ønsket lånebeløp"\n    layout="horizontal"\n    layoutOptions={{\n      width: \'8rem\',\n    }}\n    help={{\n      title: \'Hva betyr lånebeløp?\',\n      content: \'Dette er hvor mye du har tenkt å låne totalt.\',\n    }}\n    info="Info message"\n  />\n  <Field.String\n    label="Ønsket lånebeløp"\n    layout="horizontal"\n    layoutOptions={{\n      width: \'8rem\',\n    }}\n    multiline\n    rows={3}\n    help={{\n      title: \'Hva betyr lånebeløp?\',\n      content: \'Dette er hvor mye du har tenkt å låne totalt.\',\n    }}\n    info="Info message"\n  />\n</Form.Card>\n'}),v=()=>(0,o.jsx)(r.Z,{"data-visual-test":"forms-field-block-help-button-composition-fields",children:"<Form.Card>\n  <Field.Composition label=\"Field.Composition\" width=\"large\">\n    <Field.String\n      width=\"medium\"\n      label=\"Label\"\n      help={{\n        title: 'Hva betyr lånebeløp? ',\n        content: 'Dette er hvor mye du har tenkt å låne totalt.',\n      }}\n    />\n    <Field.String\n      width=\"stretch\"\n      label=\"Label\"\n      help={{\n        title: 'Hva betyr lånebeløp? ',\n        content: 'Dette er hvor mye du har tenkt å låne totalt.',\n      }}\n    />\n  </Field.Composition>\n  <Field.PostalCodeAndCity\n    help={{\n      title: 'Hva betyr lånebeløp? ',\n      content: 'Dette er hvor mye du har tenkt å låne totalt.',\n    }}\n  />\n  <Field.PhoneNumber\n    help={{\n      open: true,\n      title: 'Hva betyr lånebeløp? ',\n      content: 'Dette er hvor mye du har tenkt å låne totalt.',\n    }}\n  />\n</Form.Card>\n"});function y(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p"},(0,i.ah)(),e.components);return l||w("Examples",!1),f||w("Examples.CombineErrorMessages",!0),a||w("Examples.Default",!0),d||w("Examples.Horizontal",!0),p||w("Examples.HorizontalAutoSize",!0),h||w("Examples.HorizontalWithInfo",!0),v||w("Examples.InlineHelpButtonCompositionFields",!0),k||w("Examples.InlineHelpButtonHTML",!0),j||w("Examples.InlineHelpButtonHorizontalLabel",!0),F||w("Examples.InlineHelpButtonLabelDescription",!0),x||w("Examples.InlineHelpButtonVerticalLabel",!0),g||w("Examples.InlineHelpButtonVerticalLabelDescription",!0),b||w("Examples.LabelSize",!0),u||w("Examples.Widths",!0),m||w("Examples.WithDescription",!0),c||w("Examples.WithInfo",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{children:"Demos"}),"\n",(0,o.jsx)(n.h3,{children:"Label only (default layout)"}),"\n",(0,o.jsx)(a,{}),"\n",(0,o.jsx)(n.h3,{children:"With info"}),"\n",(0,o.jsx)(c,{}),"\n",(0,o.jsx)(n.h3,{children:"Label size"}),"\n",(0,o.jsx)(b,{}),"\n",(0,o.jsx)(n.h3,{children:"Horizontal layout"}),"\n",(0,o.jsx)(d,{}),"\n",(0,o.jsx)(n.h3,{children:"Horizontal layout with info"}),"\n",(0,o.jsx)(h,{}),"\n",(0,o.jsx)(n.h3,{children:"With description (vertical only)"}),"\n",(0,o.jsx)(m,{}),"\n",(0,o.jsx)(n.h3,{children:"Responsive forms"}),"\n",(0,o.jsx)(p,{}),"\n",(0,o.jsx)(n.h3,{children:"Combine error messages"}),"\n",(0,o.jsx)(n.p,{children:"Error messages from all fields inside the FieldBlock are combined as one message below the whole block"}),"\n",(0,o.jsx)(f,{}),"\n",(0,o.jsx)(n.h3,{children:"Inline help button (vertical only)"}),"\n",(0,o.jsx)(x,{}),"\n",(0,o.jsx)(n.h3,{children:"Inline help button (with label description)"}),"\n",(0,o.jsx)(F,{}),"\n",(0,o.jsx)(n.h3,{children:"Inline help button (vertical label description)"}),"\n",(0,o.jsx)(g,{}),"\n",(0,o.jsx)(n.h3,{children:"Inline help button (horizontal label)"}),"\n",(0,o.jsx)(j,{}),"\n",(0,o.jsx)(n.h3,{children:"Inline help button (composition fields)"}),"\n",(0,o.jsx)(v,{}),"\n",(0,o.jsx)(n.h3,{children:"Inline help button with HTML"}),"\n",(0,o.jsx)(k,{}),"\n",(0,o.jsx)(n.h3,{children:"Widths"}),"\n",(0,o.jsx)(u,{})]})}var B=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(y,e)})):y(e)};function w(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},24068:function(e,n,t){t.r(n);var l=t(52322),o=t(45392);function i(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,o.ah)(),e.components);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.h2,{children:"Description"}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.code,{children:"FieldBlock"})," is a reusable wrapper ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms/create-component/",children:"for building"})," interactive ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms/feature-fields",children:"Field"})," components."]}),"\n",(0,l.jsxs)(n.p,{children:["It shows surrounding elements through properties from ",(0,l.jsx)(n.code,{children:"FieldProps"})," like ",(0,l.jsx)(n.code,{children:"label"})," and ",(0,l.jsx)(n.code,{children:"error"}),", and ensure that spacing between different fields work as required when put into surrounding components like ",(0,l.jsx)(n.a,{href:"/uilib/layout/flex/container/",children:"Flex.Container"})," or ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms/Form/Card/",children:"Form.Card"}),"."]}),"\n",(0,l.jsxs)(n.p,{children:["It can also be used to group multiple inner FieldBlock components, composing status (error) messages together as one component. Check out the ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms/base-fields/Composition/",children:"Field.Composition"})," docs for that."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-tsx",children:'import { FieldBlock } from \'@dnb/eufemia/extensions/forms\'\n\nconst YourFieldComponent = () => {\n  return (\n    <FieldBlock\n      forId="unique-id"\n      label="A label"\n      info="Info at the bottom"\n    >\n      <Input id="unique-id" />\n    </FieldBlock>\n  )\n}\n'})}),"\n",(0,l.jsxs)(n.p,{children:["More information about the usage can be found in the ",(0,l.jsx)(n.a,{href:"/uilib/extensions/forms/create-component/",children:"create your own component"})," section."]})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?(0,l.jsx)(n,Object.assign({},e,{children:(0,l.jsx)(i,e)})):i(e)}},99210:function(e,n,t){t.d(n,{Z:function(){return s}});var l=t(72779),o=t.n(l),i=t(80215),r=t(52322);function s(e){let{className:n=null,...t}=e;return(0,r.jsx)(i.Z,{className:o()("dnb-forms-test-element",n),...t})}s._supportsSpacingProps=!0}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-create-component-field-block-mdx-dfffdd77422a893aeb92.js.map
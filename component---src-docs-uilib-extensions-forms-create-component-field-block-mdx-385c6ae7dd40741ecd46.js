"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[92965,3402,59195],{83690:function(e,n,l){l.r(n);var t=l(52322),i=l(45392),o=l(24068);function s(e){return(0,t.jsx)(o.default,{})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(s,e)})):s()}},56485:function(e,n,l){l.r(n),l.d(n,{default:function(){return g}});var t={};l.r(t),l.d(t,{CombineErrorMessages:function(){return p},Default:function(){return m},GroupMultipleFields:function(){return F},Horizontal:function(){return h},HorizontalAutoSize:function(){return b},HorizontalWithInfo:function(){return x},LabelSize:function(){return k},Widths:function(){return f},WithInfo:function(){return u}});var i=l(52322),o=l(45392),s=l(50716),r=l(99210),a=l(76508),d=l(33232),c=l(96781);const m=()=>(0,i.jsx)(s.Z,{children:'<FieldBlock label="Label text">Input features goes here</FieldBlock>\n'}),u=()=>(0,i.jsx)(s.Z,{children:'<FieldBlock label="Label text" info="For your information">\n  Input features goes here\n</FieldBlock>\n'}),h=()=>(0,i.jsx)(s.Z,{children:'<FieldBlock label="Label text" layout="horizontal">\n  Input features goes here\n</FieldBlock>\n'}),x=()=>(0,i.jsx)(s.Z,{children:'<FieldBlock\n  label="Label text"\n  layout="horizontal"\n  info="For your information"\n>\n  Input features goes here\n</FieldBlock>\n'}),f=()=>(0,i.jsx)(s.Z,{scope:{TestElement:r.Z},hideCode:!0,"data-visual-test":"forms-field-block-widths",children:'<Flex.Stack>\n  <FieldBlock label="Default width (no width props)">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Small (affects outer block element)" width="small">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Medium (affects outer block element)" width="medium">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Large (affects outer block element)" width="large">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock\n    label="Stretch (affects outer block element)"\n    width="stretch"\n  >\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n\n  <FieldBlock label="Small (affects contents only)" contentsWidth="small">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock\n    label="Medium (affects contents only)"\n    contentsWidth="medium"\n  >\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock label="Large (affects contents only)" contentsWidth="large">\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n  <FieldBlock\n    label="Stretch (affects contents only)"\n    contentsWidth="stretch"\n  >\n    <TestElement>Contents</TestElement>\n  </FieldBlock>\n</Flex.Stack>\n'}),F=()=>(0,i.jsx)(s.Z,{children:'<FieldBlock label="Label text" info="For your information">\n  <Flex.Horizontal>\n    <Field.String width="small" minLength={3} />\n    <Field.Number minimum={10} />\n  </Flex.Horizontal>\n</FieldBlock>\n'}),p=()=>(0,i.jsx)(s.Z,{children:'<FieldBlock>\n  <Flex.Horizontal>\n    <Field.Number width="small" label="Num" minimum={100} />\n    <Field.String width="medium" label="Txt" minLength={5} />\n  </Flex.Horizontal>\n</FieldBlock>\n'}),b=()=>(0,i.jsx)(s.Z,{children:'<FieldBlock label="Label">\n  <Flex.Container>\n    <Flex.Item\n      size={{\n        small: 12,\n        large: \'auto\',\n      }}\n    >\n      <Field.String\n        path="/firstName"\n        label="First name"\n        width="medium"\n        minLength={2}\n      />\n    </Flex.Item>\n    <Flex.Item\n      size={{\n        small: 12,\n        large: \'auto\',\n      }}\n    >\n      <Field.String\n        path="/lastName"\n        label="Last name"\n        width="medium"\n        required\n      />\n    </Flex.Item>\n    <Flex.Item\n      size={{\n        small: 12,\n        large: \'auto\',\n      }}\n    >\n      <FieldBlock width="large">\n        <Slider\n          min={1900}\n          max={new Date().getFullYear()}\n          step={1}\n          value={2010}\n          label="Birth year"\n          label_direction="vertical"\n          tooltip\n          alwaysShowTooltip\n        />\n      </FieldBlock>\n    </Flex.Item>\n  </Flex.Container>\n</FieldBlock>\n'}),k=()=>(0,i.jsx)(s.Z,{scope:{Form:a,Field:d,FieldBlock:c.Z},"data-visual-test":"forms-field-block-label-size",children:'<Form.Handler>\n  <Flex.Stack>\n    <Form.MainHeading>Heading</Form.MainHeading>\n    <FieldBlock label="Legend with medium heading size" size="medium">\n      <Flex.Horizontal>\n        <Field.String label="Label A" width="medium" />\n        <Field.String label="Label B" width="medium" />\n      </Flex.Horizontal>\n    </FieldBlock>\n  </Flex.Stack>\n</Form.Handler>\n'});function j(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p"},(0,o.ah)(),e.components);return t||B("Examples",!1),p||B("Examples.CombineErrorMessages",!0),m||B("Examples.Default",!0),F||B("Examples.GroupMultipleFields",!0),h||B("Examples.Horizontal",!0),b||B("Examples.HorizontalAutoSize",!0),x||B("Examples.HorizontalWithInfo",!0),k||B("Examples.LabelSize",!0),f||B("Examples.Widths",!0),u||B("Examples.WithInfo",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{children:"Demos"}),"\n",(0,i.jsx)(n.h3,{children:"Label only (default layout)"}),"\n",(0,i.jsx)(m,{}),"\n",(0,i.jsx)(n.h3,{children:"With info"}),"\n",(0,i.jsx)(u,{}),"\n",(0,i.jsx)(n.h3,{children:"Label size"}),"\n",(0,i.jsx)(k,{}),"\n",(0,i.jsx)(n.h3,{children:"Horizontal layout"}),"\n",(0,i.jsx)(h,{}),"\n",(0,i.jsx)(n.h3,{children:"Horizontal layout with info"}),"\n",(0,i.jsx)(x,{}),"\n",(0,i.jsx)(n.h3,{children:"Group multiple fields"}),"\n",(0,i.jsx)(F,{}),"\n",(0,i.jsx)(n.h3,{children:"Combine error messages"}),"\n",(0,i.jsx)(n.p,{children:"Error messages from all fields inside the FieldBlock are combined as one message below the whole block"}),"\n",(0,i.jsx)(p,{}),"\n",(0,i.jsx)(n.h3,{children:"Responsive forms"}),"\n",(0,i.jsx)(b,{}),"\n",(0,i.jsx)(n.h3,{children:"Widths"}),"\n",(0,i.jsx)(f,{})]})}var g=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?(0,i.jsx)(n,Object.assign({},e,{children:(0,i.jsx)(j,e)})):j(e)};function B(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},24068:function(e,n,l){l.r(n);var t=l(52322),i=l(45392),o=l(56485);function s(e){const n=Object.assign({h2:"h2",p:"p",code:"code",a:"a",pre:"pre"},(0,i.ah)(),e.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{children:"Description"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"FieldBlock"})," is a reusable wrapper for building ",(0,t.jsx)(n.a,{href:"/uilib/extensions/forms/fields",children:"Field"})," or ",(0,t.jsx)(n.a,{href:"/uilib/extensions/forms/extended-features/Value",children:"Value"})," components."]}),"\n",(0,t.jsxs)(n.p,{children:["It shows surrounding elements through properties from ",(0,t.jsx)(n.code,{children:"FieldProps"})," like ",(0,t.jsx)(n.code,{children:"label"})," and ",(0,t.jsx)(n.code,{children:"error"}),", and ensure that spacing between different fields work as required when put into surrounding components like ",(0,t.jsx)(n.a,{href:"/uilib/layout/flex/container/",children:"Flex.Container"})," or ",(0,t.jsx)(n.a,{href:"/uilib/components/card/",children:"Card"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"It can also be used to group multiple inner FieldBlock components, composing status (error) messages together as one component."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-jsx",children:'import { FieldBlock } from \'@dnb/eufemia/extensions/forms\'\n\nconst YourFieldComponent = () => {\n  return (\n    <FieldBlock label="Legend" info="Info at the bottom">\n      <Flex.Container>\n        <FieldBlock label="Field A">...</FieldBlock>\n        <FieldBlock label="Field B">...</FieldBlock>\n      </Flex.Container>\n    </FieldBlock>\n  )\n}\n'})}),"\n",(0,t.jsx)(o.default,{})]})}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,i.ah)(),e.components);return n?(0,t.jsx)(n,Object.assign({},e,{children:(0,t.jsx)(s,e)})):s(e)}},99210:function(e,n,l){l.d(n,{Z:function(){return r}});var t=l(72779),i=l.n(t),o=l(80215),s=l(52322);function r(e){let{className:n=null,...l}=e;return(0,s.jsx)(o.Z,{className:i()("dnb-forms-test-element",n),...l})}r._supportsSpacingProps=!0}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-create-component-field-block-mdx-385c6ae7dd40741ecd46.js.map
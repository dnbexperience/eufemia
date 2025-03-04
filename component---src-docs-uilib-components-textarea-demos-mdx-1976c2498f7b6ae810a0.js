"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[28984],{91409:function(e,n,t){t.r(n);var r=t(52322),a=t(45392),l=t(3615);function s(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p",a:"a"},(0,a.ah)(),e.components);return l||i("Examples",!1),l.Autoresize||i("Examples.Autoresize",!0),l.CharacterCounter||i("Examples.CharacterCounter",!0),l.Disabled||i("Examples.Disabled",!0),l.FormStatus||i("Examples.FormStatus",!0),l.Placeholder||i("Examples.Placeholder",!0),l.RowsCols||i("Examples.RowsCols",!0),l.Sizes||i("Examples.Sizes",!0),l.Stretched||i("Examples.Stretched",!0),l.Suffix||i("Examples.Suffix",!0),l.Vertical||i("Examples.Vertical",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Demos"}),"\n",(0,r.jsx)(n.h3,{children:"Textarea with rows and colds"}),"\n",(0,r.jsx)(l.RowsCols,{}),"\n",(0,r.jsx)(n.h3,{children:"Textarea with placeholder text"}),"\n",(0,r.jsx)(l.Placeholder,{}),"\n",(0,r.jsx)(n.h3,{children:"Vertically placed label"}),"\n",(0,r.jsx)(l.Vertical,{}),"\n",(0,r.jsx)(n.h3,{children:"Stretched horizontally placed label"}),"\n",(0,r.jsx)(l.Stretched,{}),"\n",(0,r.jsx)(n.h3,{children:"Autoresize with max rows"}),"\n",(0,r.jsx)(l.Autoresize,{}),"\n",(0,r.jsx)(n.h3,{children:"Character counter"}),"\n",(0,r.jsxs)(n.p,{children:["Internally, the ",(0,r.jsx)(n.a,{href:"uilib/components/fragments/text-counter/",children:"TextCounter"})," fragment is used to display the character counter."]}),"\n",(0,r.jsx)(l.CharacterCounter,{}),"\n",(0,r.jsx)(n.h3,{children:"With FormStatus failure message"}),"\n",(0,r.jsx)(l.FormStatus,{}),"\n",(0,r.jsx)(n.h3,{children:"Sizes"}),"\n",(0,r.jsx)(l.Sizes,{}),"\n",(0,r.jsx)(n.h3,{children:"Disabled textarea"}),"\n",(0,r.jsx)(l.Disabled,{}),"\n",(0,r.jsx)(n.h3,{children:"Textarea with a suffix"}),"\n",(0,r.jsx)(l.Suffix,{})]})}function i(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(s,e)})):s(e)}},3615:function(e,n,t){t.r(n),t.d(n,{Autoresize:function(){return u},CharacterCounter:function(){return c},Disabled:function(){return x},FormStatus:function(){return h},MaxLength:function(){return p},Placeholder:function(){return i},RowsCols:function(){return s},Sizes:function(){return j},Stretched:function(){return d},Suffix:function(){return m},Vertical:function(){return o}});var r=t(70894),a=(t(2784),t(41404)),l=t(52322);const s=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-default",children:'<Textarea\n  label="Default"\n  rows="2"\n  cols="20"\n  value="Textarea value\nNewline"\n  spellCheck={false}\n  on_change={({ value }) => {\n    console.log(\'on_change\', value)\n  }}\n  on_focus={() => {\n    console.log(\'on_focus\')\n  }}\n  on_blur={() => {\n    console.log(\'on_blur\')\n  }}\n/>\n'})}),i=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{children:'<Textarea label="Placeholder" placeholder="Placeholder text" />\n'})}),o=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{children:'<Textarea\n  label="Vertical"\n  label_direction="vertical"\n  rows="3"\n  cols="33"\n  value="Textarea value with more than 3 lines\nNewline\nNewline\nNewline\nNewline"\n/>\n'})}),c=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-character-counter",children:'<Textarea\n  label="Count characters"\n  label_direction="vertical"\n  autoresize\n  value="Textarea value\nNewline"\n  status="Message to the user"\n  characterCounter={40}\n/>\n'})}),d=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-stretch",children:'<Textarea\n  label="Horizontal"\n  stretch={true}\n  rows="3"\n  value="Nec litora inceptos vestibulum id interdum donec gravida."\n/>\n'})}),u=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{children:'<Textarea\n  label="Autogrow"\n  rows={1}\n  autoresize={true}\n  autoresize_max_rows={4}\n  placeholder="Placeholder"\n  on_key_down={({ rows, event }) => {\n    if (rows >= 4 && event.key === \'Enter\') {\n      event.preventDefault()\n    }\n  }}\n/>\n'})}),h=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-error",children:'<Textarea\n  label="Error Message"\n  cols="33"\n  value="Nec litora inceptos vestibulum id interdum donec gravida."\n  status="Message to the user"\n/>\n'})}),x=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{children:'<Textarea\n  label="Disabled"\n  disabled\n  value="Nec litora inceptos vestibulum id interdum donec gravida."\n/>\n'})}),m=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{children:'<Textarea\n  label="Textarea with suffix"\n  value="Nec litora inceptos vestibulum id interdum donec gravida."\n  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}\n/>\n'})}),j=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-sizes",children:'<Flex.Stack>\n  <Textarea placeholder="Small size" size="small" rows={1} />\n  <Textarea placeholder="Medium size" size="medium" rows={1} />\n  <Textarea placeholder="Large size" size="large" rows={1} />\n</Flex.Stack>\n'})}),p=()=>(0,l.jsx)(f,{children:(0,l.jsx)(a.Z,{hideCode:!0,children:'<Form.Handler>\n  <Form.Card>\n    <Field.String\n      label="Label"\n      placeholder="Write more than 3 characters to demonstrate the limit"\n      multiline\n      maxLength={3}\n      required\n      characterCounter={{\n        max: 3,\n        variant: \'up\',\n      }}\n    />\n    <Form.SubmitButton text="Test" />\n  </Form.Card>\n</Form.Handler>\n'})}),f=(0,r.Z)("div",{target:"e1gal15f0"})({name:"1082qq3",styles:"display:block;width:100%"})}}]);
//# sourceMappingURL=component---src-docs-uilib-components-textarea-demos-mdx-1976c2498f7b6ae810a0.js.map
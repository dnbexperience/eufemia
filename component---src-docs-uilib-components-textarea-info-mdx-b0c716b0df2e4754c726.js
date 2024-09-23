"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[349],{81587:function(e,n,t){t.r(n);var r=t(52322),a=t(45392),l=t(3615);function i(e){const n=Object.assign({h2:"h2",pre:"pre",code:"code",p:"p",h3:"h3",a:"a"},(0,a.ah)(),e.components);return l||s("Examples",!1),l.MaxLength||s("Examples.MaxLength",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Import"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"import { Textarea } from '@dnb/eufemia'\n"})}),"\n",(0,r.jsx)(n.h2,{children:"Description"}),"\n",(0,r.jsx)(n.p,{children:"The Textarea component is used as a multi-line text input control with an unlimited number of characters."}),"\n",(0,r.jsx)(n.h3,{children:"Accessibility"}),"\n",(0,r.jsxs)(n.p,{children:["Please avoid using the ",(0,r.jsx)(n.code,{children:"maxlength"})," attribute when ever possible, as it is not accessible. Instead, use the ",(0,r.jsx)(n.code,{children:"characterCounter"})," property."]}),"\n",(0,r.jsx)(n.p,{children:"This way the user gets a visual feedback of the number of characters entered and the maximum number of characters allowed. And it will not limit the user in their workflow."}),"\n",(0,r.jsxs)(n.p,{children:["You still can still set the requirement of your desired maximum number of characters by setting the ",(0,r.jsx)(n.code,{children:"maxLength"})," property in ",(0,r.jsx)(n.a,{href:"/uilib/extensions/forms/base-fields/String/",children:"Eufemia Forms"}),"."]}),"\n",(0,r.jsx)(l.MaxLength,{})]})}function s(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}n.default=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(i,e)})):i(e)}},3615:function(e,n,t){t.r(n),t.d(n,{Autoresize:function(){return d},CharacterCounter:function(){return c},Disabled:function(){return x},FormStatus:function(){return h},MaxLength:function(){return f},Placeholder:function(){return s},RowsCols:function(){return i},Sizes:function(){return p},Stretched:function(){return u},Suffix:function(){return m},Vertical:function(){return o}});var r=t(70894),a=(t(2784),t(64368)),l=t(52322);const i=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-default",children:'<Textarea\n  label="Default"\n  rows="2"\n  cols="20"\n  value="Textarea value\nNewline"\n  spellCheck={false}\n  on_change={({ value }) => {\n    console.log(\'on_change\', value)\n  }}\n  on_focus={() => {\n    console.log(\'on_focus\')\n  }}\n  on_blur={() => {\n    console.log(\'on_blur\')\n  }}\n/>\n'})}),s=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{children:'<Textarea label="Placeholder" placeholder="Placeholder text" />\n'})}),o=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{children:'<Textarea\n  label="Vertical"\n  label_direction="vertical"\n  rows="3"\n  cols="33"\n  value="Textarea value with more than 3 lines\nNewline\nNewline\nNewline\nNewline"\n/>\n'})}),c=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-character-counter",children:'<Textarea\n  label="Count characters"\n  label_direction="vertical"\n  autoresize\n  value="Textarea value\nNewline"\n  status="Message to the user"\n  characterCounter={40}\n/>\n'})}),u=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-stretch",children:'<Textarea\n  label="Horizontal"\n  stretch={true}\n  rows="3"\n  value="Nec litora inceptos vestibulum id interdum donec gravida."\n/>\n'})}),d=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{children:'<Textarea\n  label="Autogrow"\n  rows={1}\n  autoresize={true}\n  autoresize_max_rows={4}\n  placeholder="Placeholder"\n  on_key_down={({ rows, event }) => {\n    if (rows >= 4 && event.key === \'Enter\') {\n      event.preventDefault()\n    }\n  }}\n/>\n'})}),h=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-error",children:'<Textarea\n  label="Error Message"\n  cols="33"\n  value="Nec litora inceptos vestibulum id interdum donec gravida."\n  status="Message to the user"\n/>\n'})}),x=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{children:'<Textarea\n  label="Disabled"\n  disabled\n  value="Nec litora inceptos vestibulum id interdum donec gravida."\n/>\n'})}),m=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{children:'<Textarea\n  label="Textarea with suffix"\n  value="Nec litora inceptos vestibulum id interdum donec gravida."\n  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}\n/>\n'})}),p=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{"data-visual-test":"textarea-sizes",children:'<Flex.Stack>\n  <Textarea placeholder="Small size" size="small" rows={1} />\n  <Textarea placeholder="Medium size" size="medium" rows={1} />\n  <Textarea placeholder="Large size" size="large" rows={1} />\n</Flex.Stack>\n'})}),f=()=>(0,l.jsx)(b,{children:(0,l.jsx)(a.Z,{hideCode:!0,children:'<Form.Handler>\n  <Card stack>\n    <Field.String\n      label="Label"\n      placeholder="Write more than 3 characters to demonstrate the limit"\n      multiline\n      maxLength={3}\n      required\n      characterCounter={{\n        max: 3,\n        variant: \'up\',\n      }}\n    />\n    <Form.SubmitButton text="Test" />\n  </Card>\n</Form.Handler>\n'})}),b=(0,r.Z)("div",{target:"e1gal15f0"})({name:"1082qq3",styles:"display:block;width:100%"})}}]);
//# sourceMappingURL=component---src-docs-uilib-components-textarea-info-mdx-b0c716b0df2e4754c726.js.map
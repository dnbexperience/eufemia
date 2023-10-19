"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[37493],{13910:function(e,n,a){a.r(n),a.d(n,{default:function(){return b}});var o=a(52322),l=a(45392),i=(a(2784),a(35823));const d=()=>(0,o.jsx)(i.Z,{"data-visual-test":"radio-group",children:'<Radio.Group\n  label="Radio Group:"\n  on_change={({ value }) => {\n    console.log(\'on_change\', value)\n  }}\n  value="first"\n>\n  <Radio label="First" value="first" />\n  <Radio label="Second" value="second" />\n  <Radio label="Third" value="third" />\n</Radio.Group>\n'}),s=()=>(0,o.jsx)(i.Z,{"data-visual-test":"radio-group-vertical",children:'<Radio.Group\n  label="Vertical Group:"\n  layout_direction="column"\n  on_change={({ value }) => {\n    console.log(\'on_change\', value)\n  }}\n>\n  <Radio label="First" value="first" />\n  <Radio label="Second" value="second" />\n  <Radio label="Third" value="third" checked />\n</Radio.Group>\n'}),t=()=>(0,o.jsx)(i.Z,{"data-visual-test":"radio-group-label-above",children:'<Radio.Group\n  vertical\n  label="Vertical Group:"\n  layout_direction="column"\n  on_change={({ value }) => {\n    console.log(\'on_change\', value)\n  }}\n>\n  <Radio label="First" value="first" />\n  <Radio label="Second" value="second" />\n  <Radio label="Third" value="third" checked />\n</Radio.Group>\n'}),r=()=>(0,o.jsx)(i.Z,{"data-visual-test":"radio-group-status",children:'<Radio.Group\n  label="Radio Group with status:"\n  layout_direction="column"\n  on_change={({ value }) => {\n    console.log(\'on_change\', value)\n  }}\n>\n  <Radio label="First" value="first" status="error" />\n  <Radio label="Second" value="second" status="Error message" />\n  <Radio\n    label="Third"\n    value="third"\n    checked\n    status="Info message"\n    status_state="info"\n  />\n</Radio.Group>\n'}),c=()=>(0,o.jsx)(i.Z,{"data-visual-test":"radio-group-plain",children:'<FieldBlock label="Plain Radio group:" layout="horizontal">\n  <Radio\n    value="first"\n    label="First"\n    group="MyRadioGroup"\n    on_change={({ value, checked }) => {\n      console.log(\'on_change\', value, checked)\n    }}\n    right\n  />\n  <Radio\n    value="second"\n    label="Second"\n    group="MyRadioGroup"\n    on_change={({ value, checked }) => {\n      console.log(\'on_change\', value, checked)\n    }}\n    right\n  />\n  <Radio\n    checked\n    value="third"\n    label="Third"\n    group="MyRadioGroup"\n    on_change={({ value, checked }) => {\n      console.log(\'on_change\', value, checked)\n    }}\n    right\n  />\n</FieldBlock>\n'}),u=()=>(0,o.jsx)(i.Z,{"data-visual-test":"radio-sizes",children:'\n<Radio size="medium" label="Medium" right="large" checked />\n<Radio size="large" label="Large" checked />\n\n'}),h=()=>(0,o.jsx)(i.Z,{"data-visual-test":"radio-group-disabled",children:'<Radio.Group\n  label="Disabled Group:"\n  disabled\n  label_position="left"\n  name="MyGroup"\n>\n  <Radio label="First" value="first" />\n  <Radio label="Second" value="second" />\n  <Radio label="Third" value="third" checked />\n</Radio.Group>\n'}),p=()=>(0,o.jsx)(i.Z,{children:'<Radio.Group label="With suffixes:" label_position="left">\n  <Radio label="First" value="first" />\n  <Radio\n    label="Second"\n    value="second"\n    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}\n  />\n  <Radio\n    label="Third"\n    value="third"\n    status="Error message"\n    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}\n    checked\n  />\n</Radio.Group>\n'});function g(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i.Z,{"data-visual-test":"radio-default",children:'<Radio label="Single Radio" />\n'}),(0,o.jsx)(i.Z,{"data-visual-test":"radio-checked",children:'<Radio\n  label="Checked Radio"\n  checked\n  on_change={({ checked }) => console.log(checked)}\n/>\n'})]})}function R(e){const n=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code",strong:"strong"},(0,l.ah)(),e.components),{VisibleWhenVisualTest:a}=n;return a||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("VisibleWhenVisualTest",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{children:"Demos"}),"\n",(0,o.jsx)(n.h3,{children:"Radio group"}),"\n",(0,o.jsx)(d,{}),"\n",(0,o.jsx)(n.h3,{children:"Vertical aligned Radio group"}),"\n",(0,o.jsx)(s,{}),"\n",(0,o.jsx)(n.h3,{children:"Radio group with label above"}),"\n",(0,o.jsx)(t,{}),"\n",(0,o.jsx)(n.h3,{children:"Radio group with status messages"}),"\n",(0,o.jsx)(r,{}),"\n",(0,o.jsx)(n.h3,{children:"Plain Radio group"}),"\n",(0,o.jsxs)(n.p,{children:["Without ",(0,o.jsx)(n.code,{children:"<Radio.Group>"}),". It is recommended to use the ",(0,o.jsx)(n.code,{children:"<Radio.Group>"})," if you are using ",(0,o.jsx)(n.strong,{children:"React"}),"."]}),"\n",(0,o.jsx)(c,{}),"\n",(0,o.jsx)(n.h3,{children:"With different sizes"}),"\n",(0,o.jsxs)(n.p,{children:["As for now, there are two sizes. ",(0,o.jsx)(n.code,{children:"medium"})," is the default size."]}),"\n",(0,o.jsx)(u,{}),"\n",(0,o.jsx)(n.h3,{children:"Disabled Radio Group"}),"\n",(0,o.jsxs)(n.p,{children:["With ",(0,o.jsx)(n.code,{children:"label_position"})," set to left."]}),"\n",(0,o.jsx)(h,{}),"\n",(0,o.jsx)(n.h3,{children:"Radio Buttons with a suffix"}),"\n",(0,o.jsx)(p,{}),"\n",(0,o.jsx)(a,{children:(0,o.jsx)(g,{})})]})}var b=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,l.ah)(),e.components);return n?(0,o.jsx)(n,Object.assign({},e,{children:(0,o.jsx)(R,e)})):R(e)}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-radio-demos-mdx-1cc8fcebffe6b6c3dd91.js.map
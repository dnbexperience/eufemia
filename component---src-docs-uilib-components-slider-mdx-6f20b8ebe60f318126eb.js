"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[45069,7169,39337],{18383:function(n,e,l){l.r(e);var t=l(52322),r=l(45392),a=l(15915),i=l(86712);function o(n){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.default,{}),"\n",(0,t.jsx)(i.default,{})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(o,n)})):o()}},86712:function(n,e,l){l.r(e),l.d(e,{default:function(){return p}});var t=l(52322),r=l(45392),a=(l(2784),l(35823)),i=l(41672);const o=()=>(0,t.jsx)(a.Z,{"data-visual-test":"slider-default",children:"<Slider\n  min={0}\n  max={100}\n  value={70}\n  label=\"Default Slider:\"\n  numberFormat={{\n    currency: 'EUR',\n  }}\n  tooltip={true}\n  onChange={({ value }) => console.log('onChange:', value)}\n/>\n"}),s=()=>(0,t.jsx)(a.Z,{"data-visual-test":"slider-multi",scope:{format:i.WU},children:"<Provider\n  formElement={{\n    label_direction: 'vertical',\n  }}\n>\n  <Flex.Vertical align=\"stretch\">\n    <Slider\n      min={0}\n      max={100}\n      value={[30, 70]}\n      step={5}\n      label=\"Range with steps:\"\n      numberFormat={{\n        currency: 'USD',\n      }}\n      tooltip\n      onChange={({ value }) => console.log('onChange:', value)}\n    />\n    <Slider\n      min={0}\n      max={100}\n      value={[10, 30, 50, 70]}\n      label=\"Multi thumbs:\"\n      numberFormat={(value) =>\n        format(value, {\n          percent: true,\n          decimals: 0,\n        })\n      }\n      tooltip\n      onChange={({ value, number }) =>\n        console.log('onChange:', value, number)\n      }\n    />\n  </Flex.Vertical>\n</Provider>\n"}),c=()=>(0,t.jsx)(a.Z,{children:'<Provider\n  formElement={{\n    label_direction: \'vertical\',\n  }}\n>\n  <Flex.Vertical align="stretch">\n    <Slider\n      multiThumbBehavior="omit"\n      value={[30, 70]}\n      label="Omit behavior:"\n      numberFormat={{\n        currency: \'EUR\',\n      }}\n      tooltip={true}\n      onChange={({ value }) => console.log(\'onChange:\', value)}\n    />\n    <Slider\n      multiThumbBehavior="push"\n      min={-40}\n      value={[-10, 50, 70]}\n      step={1}\n      label="Push behavior:"\n      numberFormat={{\n        currency: true,\n      }}\n      tooltip={true}\n      onChange={({ value, number }) =>\n        console.log(\'onChange:\', value, number)\n      }\n    />\n  </Flex.Vertical>\n</Provider>\n'}),u=()=>(0,t.jsx)(a.Z,{scope:{format:i.WU},noInline:!0,children:'const Component = () => {\n  const [value, setValue] = React.useState(70)\n  return (\n    <>\n      <Slider\n        value={value}\n        step={1}\n        hideButtons\n        label="Slider A:"\n        numberFormat={{\n          currency: \'EUR\',\n        }}\n        tooltip={true}\n        onChange={({ value }) => setValue(parseFloat(String(value)))}\n      />\n      <VerticalWrapper>\n        <Slider\n          value={value}\n          vertical={true}\n          hideButtons={true}\n          step={10}\n          label="Slider B:"\n          labelDirection="vertical"\n          numberFormat={(value) =>\n            format(value, {\n              currency: \'NOK\',\n            })\n          }\n          tooltip\n          alwaysShowTooltip\n          onChange={({ value }) => setValue(parseFloat(String(value)))}\n        />\n        <Input\n          align="center"\n          selectall\n          value={String(value)}\n          on_change={({ value }) => setValue(value)}\n        />\n      </VerticalWrapper>\n    </>\n  )\n}\nconst VerticalWrapper = styled.div`\n  display: inline-flex;\n  flex-direction: column;\n  align-items: center;\n  height: 20rem; /* max-height works fine except in Safari */\n  margin-top: 1rem;\n  padding: 1rem;\n  background: dimgray;\n  .dnb-input {\n    width: 4rem;\n    margin-top: 1rem;\n  }\n`\nrender(<Component />)\n'}),d=()=>(0,t.jsx)(a.Z,{children:'<Slider\n  min={0}\n  max={100}\n  value={70}\n  label="Slider with suffix:"\n  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}\n/>\n'}),h=()=>(0,t.jsx)(a.Z,{"data-visual-test":"slider-vertical",noInline:!0,children:'const VerticalWrapper = styled.div`\n  display: inline-flex;\n  flex-direction: column;\n  height: 12rem; /* max-height works fine except in Safari */\n`\nrender(\n  <VerticalWrapper>\n    <Slider\n      min={0}\n      max={100}\n      value={20}\n      step={10}\n      vertical={true}\n      label="Vertical slider:"\n      labelDirection="vertical"\n      onChange={({ value }) => console.log(\'onChange:\', value)}\n    />\n  </VerticalWrapper>,\n)\n'});function m(n){const e=Object.assign({h2:"h2",h3:"h3",p:"p",code:"code"},(0,r.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Demos"}),"\n",(0,t.jsx)(e.h3,{children:"Default Slider"}),"\n",(0,t.jsx)(o,{}),"\n",(0,t.jsx)(e.h3,{children:"Slider with multiple thumb buttons"}),"\n",(0,t.jsxs)(e.p,{children:["Provide the ",(0,t.jsx)(e.code,{children:"value"})," property as an array with numbers. The ",(0,t.jsx)(e.code,{children:"onChange"})," event will then also return the property ",(0,t.jsx)(e.code,{children:"value"})," as an array. The ",(0,t.jsx)(e.code,{children:"+"})," and ",(0,t.jsx)(e.code,{children:"-"})," buttons will not be visible when when more than one thumb button is present."]}),"\n",(0,t.jsx)(s,{}),"\n",(0,t.jsxs)(e.p,{children:["By default, the thumbs can swap positions. You can change that behavior with ",(0,t.jsx)(e.code,{children:"multiThumbBehavior"}),"."]}),"\n",(0,t.jsx)(c,{}),"\n",(0,t.jsx)(e.h3,{children:"Vertical slider with steps of 10"}),"\n",(0,t.jsx)(h,{}),"\n",(0,t.jsx)(e.h3,{children:"Horizontal and vertical slider in sync with input field"}),"\n",(0,t.jsx)(u,{}),"\n",(0,t.jsx)(e.h3,{children:"Slider with a suffix"}),"\n",(0,t.jsx)(d,{})]})}var p=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(m,n)})):m(n)}},15915:function(n,e,l){l.r(e);var t=l(52322),r=l(45392);function a(n){const e=Object.assign({h2:"h2",p:"p",h3:"h3",code:"code"},(0,r.ah)(),n.components);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h2,{children:"Description"}),"\n",(0,t.jsx)(e.p,{children:"The Slider component provides a visual indication of adjustable value. A value can be adjusted (increased or decreased) by moving the drag handle along a track (usually horizontal or vertical). Remember to inform users that they can also adjust the value directly in the value input field (if it exists)."}),"\n",(0,t.jsxs)(e.h3,{children:["Define a ",(0,t.jsx)(e.code,{children:"min"})," and ",(0,t.jsx)(e.code,{children:"max"})," value"]}),"\n",(0,t.jsxs)(e.p,{children:["Keep in mind, you should most probably define your ",(0,t.jsx)(e.code,{children:"min"})," and ",(0,t.jsx)(e.code,{children:"max"})," value, because they are tied closely to your given value property."]})]})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(a,n)})):a(n)}}}]);
//# sourceMappingURL=component---src-docs-uilib-components-slider-mdx-6f20b8ebe60f318126eb.js.map
"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[46129],{99435:function(n,e,r){r.r(e);var t=r(52322),s=r(45392),a=r(99187);function o(n){return(0,t.jsx)(a.VL,{})}e.default=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,s.ah)(),n.components);return e?(0,t.jsx)(e,Object.assign({},n,{children:(0,t.jsx)(o,n)})):o()}},99187:function(n,e,r){r.d(e,{CC:function(){return u},F:function(){return x},MV:function(){return d},Ol:function(){return j},VL:function(){return P},YY:function(){return o},Zp:function(){return p},dN:function(){return _},fU:function(){return a},iQ:function(){return h},jj:function(){return m},mO:function(){return I},oK:function(){return b},qr:function(){return f},r:function(){return c},sm:function(){return i},tp:function(){return g},wE:function(){return l},xG:function(){return v}});r(2784);var t=r(35823),s=r(52322);const a=()=>(0,s.jsx)(t.Z,{children:"<ProgressIndicator />\n"}),o=()=>(0,s.jsx)(t.Z,{children:'<ProgressIndicator type="circular" />\n'}),i=()=>(0,s.jsx)(t.Z,{children:'<ProgressIndicator\n  // label="Custom label ..."\n  type="circular"\n  show_label={true}\n  label_direction="horizontal"\n/>\n'}),l=()=>(0,s.jsx)(t.Z,{children:'<ProgressIndicator\n  // label="Custom label ..."\n  type="circular"\n  show_label={true}\n  label_direction="vertical"\n/>\n'}),c=()=>(0,s.jsx)(t.Z,{"data-visual-test":"progress-indicator-circular--primary",children:'<ProgressIndicator\n  type="circular"\n  progress="50"\n  size="large"\n  no_animation\n/>\n'}),u=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const ChangeValue = () => {\n  const [value, setValue] = React.useState(50)\n  return (\n    <Flex.Horizontal align="center">\n      <ProgressIndicator\n        type="circular"\n        progress={value}\n        show_label\n        no_animation\n      />\n      <Button\n        left\n        size="small"\n        variant="secondary"\n        onClick={() => setValue(Math.random() * 100)}\n      >\n        Change\n      </Button>\n    </Flex.Horizontal>\n  )\n}\nrender(<ChangeValue />)\n'}),d=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const Example = () => {\n  const random = (min, max) =>\n    Math.floor(Math.random() * (max - min + 1)) + min\n  const [progress, setProgressIndicator] = React.useState(random(1, 100))\n  React.useEffect(() => {\n    const timer = setInterval(\n      () => setProgressIndicator(random(1, 100)),\n      1e3,\n    )\n    return () => clearInterval(timer)\n  })\n  return (\n    <ProgressIndicator type="circular" size="large" progress={progress} />\n  )\n}\nrender(<Example />)\n'}),m=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const Example = () => {\n  const random = (min, max) =>\n    Math.floor(Math.random() * (max - min + 1)) + min\n  const [visible, setVisible] = React.useState(true)\n  React.useEffect(() => {\n    const timer = setInterval(\n      () => setVisible(!visible),\n      random(2400, 4200),\n    )\n    return () => clearTimeout(timer)\n  })\n  return (\n    <ProgressIndicator\n      type="circular"\n      size="large"\n      visible={visible}\n      on_complete={() => {\n        console.log(\'on_complete_circular\')\n      }}\n    />\n  )\n}\nrender(<Example />)\n'}),g=()=>(0,s.jsx)(t.Z,{children:'<Dialog\n  spacing={false}\n  maxWidth="12rem"\n  fullscreen={false}\n  alignContent="centered"\n  hideCloseButton\n  triggerAttributes={{\n    text: \'Show\',\n  }}\n  preventClose={false}\n>\n  <ProgressIndicator\n    type="circular"\n    show_label\n    label_direction="vertical"\n    top="large"\n    bottom="large"\n    size="large"\n  />\n</Dialog>\n'}),p=()=>(0,s.jsx)(t.Z,{children:'<ProgressIndicator type="linear" />\n'}),h=()=>(0,s.jsx)(t.Z,{children:'<ProgressIndicator type="linear" size="small" />\n'}),f=()=>(0,s.jsx)(t.Z,{children:'<ProgressIndicator\n  type="linear"\n  // label="Custom label ..."\n  show_label={true}\n  label_direction="horizontal"\n/>\n'}),x=()=>(0,s.jsx)(t.Z,{children:'<ProgressIndicator\n  type="linear"\n  // label="Custom label ..."\n  show_label={true}\n  label_direction="vertical"\n/>\n'}),b=()=>(0,s.jsx)(t.Z,{"data-visual-test":"progress-indicator-linear--primary",children:'<ProgressIndicator\n  type="linear"\n  progress="50"\n  size="large"\n  no_animation\n/>\n'}),I=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const ChangeValue = () => {\n  const [value, setValue] = React.useState(50)\n  return (\n    <FormRow centered>\n      <ProgressIndicator type="linear" progress={value} no_animation />\n      <Button\n        left\n        size="small"\n        variant="secondary"\n        onClick={() => setValue(Math.random() * 100)}\n      >\n        Change\n      </Button>\n    </FormRow>\n  )\n}\nrender(<ChangeValue />)\n'}),v=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const Example = () => {\n  const random = (min, max) =>\n    Math.floor(Math.random() * (max - min + 1)) + min\n  const [progress, setProgressIndicator] = React.useState(random(1, 100))\n  React.useEffect(() => {\n    const timer = setInterval(\n      () => setProgressIndicator(random(1, 100)),\n      1e3,\n    )\n    return () => clearInterval(timer)\n  })\n  return <ProgressIndicator type="linear" progress={progress} />\n}\nrender(<Example />)\n'}),_=()=>(0,s.jsx)(t.Z,{noInline:!0,children:'const Example = () => {\n  const random = (min, max) =>\n    Math.floor(Math.random() * (max - min + 1)) + min\n  const [visible, setVisible] = React.useState(true)\n  React.useEffect(() => {\n    const timer = setInterval(\n      () => setVisible(!visible),\n      random(2400, 4200),\n    )\n    return () => clearTimeout(timer)\n  })\n  return (\n    <ProgressIndicator\n      type="linear"\n      size="large"\n      visible={visible}\n      on_complete={() => {\n        console.log(\'on_complete_linear\')\n      }}\n    />\n  )\n}\nrender(<Example />)\n'}),j=()=>(0,s.jsx)(t.Z,{children:'<Dialog\n  spacing={false}\n  maxWidth="12rem"\n  fullscreen={false}\n  alignContent="centered"\n  hideCloseButton\n  triggerAttributes={{\n    text: \'Show\',\n  }}\n  preventClose={false}\n>\n  <ProgressIndicator\n    type="linear"\n    show_label\n    label_direction="vertical"\n    top="large"\n    bottom="large"\n  />\n</Dialog>\n'}),P=()=>(0,s.jsx)(t.Z,{"data-visual-test":"progress-indicator-sizes",children:'<div\n  style={{\n    display: \'flex\',\n  }}\n>\n  <ProgressIndicator progress="50" size="small" />\n  <ProgressIndicator progress="50" size="medium" />\n  <ProgressIndicator progress="50" />\n  <ProgressIndicator progress="50" size="large" />\n</div>\n'})}}]);
//# sourceMappingURL=component---src-docs-uilib-components-progress-indicator-visual-tests-mdx-d6b2076083ac36670db5.js.map
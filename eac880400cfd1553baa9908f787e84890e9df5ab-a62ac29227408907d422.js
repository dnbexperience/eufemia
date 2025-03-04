"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[99286],{99187:function(n,e,r){r.d(e,{CC:function(){return m},F:function(){return x},H9:function(){return _},MV:function(){return g},Ol:function(){return z},VL:function(){return D},VP:function(){return S},YY:function(){return i},Zp:function(){return f},bS:function(){return w},bf:function(){return M},dN:function(){return C},fU:function(){return a},iQ:function(){return b},jj:function(){return p},mO:function(){return v},nt:function(){return d},oK:function(){return I},qr:function(){return y},r:function(){return u},sm:function(){return l},tp:function(){return h},wE:function(){return c},xG:function(){return P}});var t=r(70894),s=(r(2784),r(41404)),o=r(52322);const a=()=>(0,o.jsx)(s.Z,{children:"<ProgressIndicator />\n"}),i=()=>(0,o.jsx)(s.Z,{children:'<ProgressIndicator type="circular" />\n'}),l=()=>(0,o.jsx)(s.Z,{children:'<ProgressIndicator\n  // label="Custom label ..."\n  type="circular"\n  showDefaultLabel={true}\n  labelDirection="horizontal"\n/>\n'}),c=()=>(0,o.jsx)(s.Z,{children:'<ProgressIndicator\n  // label="Custom label ..."\n  type="circular"\n  showDefaultLabel={true}\n  labelDirection="vertical"\n/>\n'}),d=()=>(0,o.jsx)(s.Z,{children:'\n<ProgressIndicator\n  right\n  label={<IconPrimary icon="save" />}\n  type="circular"\n  labelDirection="inside"\n/>\n<ProgressIndicator\n  progress={72}\n  size="large"\n  type="circular"\n  labelDirection="inside"\n  data-visual-test="progress-indicator-label-inside"\n>\n  <span className="dnb-p dnb-t__weight--bold dnb-t__size--small">\n    {72}%\n  </span>\n</ProgressIndicator>\n\n'}),u=()=>(0,o.jsx)(s.Z,{"data-visual-test":"progress-indicator-circular--primary",children:'<ProgressIndicator\n  type="circular"\n  progress="50"\n  size="large"\n  noAnimation\n/>\n'}),m=()=>(0,o.jsx)(s.Z,{noInline:!0,children:'const ChangeValue = () => {\n  const [value, setValue] = React.useState(50)\n  return (\n    <Flex.Horizontal align="center">\n      <ProgressIndicator\n        type="circular"\n        progress={value}\n        showDefaultLabel\n        noAnimation\n      />\n      <Button\n        left\n        size="small"\n        variant="secondary"\n        onClick={() => setValue(Math.random() * 100)}\n      >\n        Change\n      </Button>\n    </Flex.Horizontal>\n  )\n}\nrender(<ChangeValue />)\n'}),g=()=>(0,o.jsx)(s.Z,{noInline:!0,children:'const Example = () => {\n  const random = (min, max) =>\n    Math.floor(Math.random() * (max - min + 1)) + min\n  const [progress, setProgressIndicator] = React.useState(random(1, 100))\n  React.useEffect(() => {\n    const timer = setInterval(\n      () => setProgressIndicator(random(1, 100)),\n      1e3,\n    )\n    return () => clearInterval(timer)\n  })\n  return (\n    <ProgressIndicator type="circular" size="large" progress={progress} />\n  )\n}\nrender(<Example />)\n'}),p=()=>(0,o.jsx)(s.Z,{noInline:!0,children:'const Example = () => {\n  const random = (min, max) =>\n    Math.floor(Math.random() * (max - min + 1)) + min\n  const [visible, setVisible] = React.useState(true)\n  React.useEffect(() => {\n    const timer = setInterval(\n      () => setVisible(!visible),\n      random(2400, 4200),\n    )\n    return () => clearTimeout(timer)\n  })\n  return (\n    <ProgressIndicator\n      type="circular"\n      size="large"\n      visible={visible}\n      onComplete={() => {\n        console.log(\'on_complete_circular\')\n      }}\n    />\n  )\n}\nrender(<Example />)\n'}),h=()=>(0,o.jsx)(s.Z,{children:'<Dialog\n  spacing={false}\n  maxWidth="12rem"\n  fullscreen={false}\n  alignContent="centered"\n  hideCloseButton\n  triggerAttributes={{\n    text: \'Show\',\n  }}\n  preventClose={false}\n>\n  <ProgressIndicator\n    type="circular"\n    showDefaultLabel\n    labelDirection="vertical"\n    top="large"\n    bottom="large"\n    size="large"\n  />\n</Dialog>\n'}),f=()=>(0,o.jsx)(s.Z,{children:'<ProgressIndicator type="linear" />\n'}),b=()=>(0,o.jsx)(s.Z,{children:'<ProgressIndicator type="linear" size="small" />\n'}),y=()=>(0,o.jsx)(s.Z,{children:'<ProgressIndicator\n  type="linear"\n  // label="Custom label ..."\n  showDefaultLabel={true}\n  labelDirection="horizontal"\n/>\n'}),x=()=>(0,o.jsx)(s.Z,{children:'<ProgressIndicator\n  type="linear"\n  // label="Custom label ..."\n  showDefaultLabel={true}\n  labelDirection="vertical"\n/>\n'}),I=()=>(0,o.jsx)(s.Z,{"data-visual-test":"progress-indicator-linear--primary",children:'<ProgressIndicator type="linear" progress="50" size="large" noAnimation />\n'}),v=()=>(0,o.jsx)(s.Z,{noInline:!0,children:'const ChangeValue = () => {\n  const [value, setValue] = React.useState(50)\n  return (\n    <FormRow centered>\n      <ProgressIndicator type="linear" progress={value} noAnimation />\n      <Button\n        left\n        size="small"\n        variant="secondary"\n        onClick={() => setValue(Math.random() * 100)}\n      >\n        Change\n      </Button>\n    </FormRow>\n  )\n}\nrender(<ChangeValue />)\n'}),P=()=>(0,o.jsx)(s.Z,{noInline:!0,children:'const Example = () => {\n  const random = (min, max) =>\n    Math.floor(Math.random() * (max - min + 1)) + min\n  const [progress, setProgressIndicator] = React.useState(random(1, 100))\n  React.useEffect(() => {\n    const timer = setInterval(\n      () => setProgressIndicator(random(1, 100)),\n      1e3,\n    )\n    return () => clearInterval(timer)\n  })\n  return <ProgressIndicator type="linear" progress={progress} />\n}\nrender(<Example />)\n'}),C=()=>(0,o.jsx)(s.Z,{noInline:!0,children:'const Example = () => {\n  const random = (min, max) =>\n    Math.floor(Math.random() * (max - min + 1)) + min\n  const [visible, setVisible] = React.useState(true)\n  React.useEffect(() => {\n    const timer = setInterval(\n      () => setVisible(!visible),\n      random(2400, 4200),\n    )\n    return () => clearTimeout(timer)\n  })\n  return (\n    <ProgressIndicator\n      type="linear"\n      size="large"\n      visible={visible}\n      onComplete={() => {\n        console.log(\'on_complete_linear\')\n      }}\n    />\n  )\n}\nrender(<Example />)\n'}),z=()=>(0,o.jsx)(s.Z,{children:'<Dialog\n  spacing={false}\n  maxWidth="12rem"\n  fullscreen={false}\n  alignContent="centered"\n  hideCloseButton\n  triggerAttributes={{\n    text: \'Show\',\n  }}\n  preventClose={false}\n>\n  <ProgressIndicator\n    type="linear"\n    showDefaultLabel\n    labelDirection="vertical"\n    top="large"\n    bottom="large"\n  />\n</Dialog>\n'}),D=()=>(0,o.jsx)(s.Z,{"data-visual-test":"progress-indicator-sizes",children:'<div\n  style={{\n    display: \'flex\',\n  }}\n>\n  <ProgressIndicator progress="50" size="small" />\n  <ProgressIndicator progress="50" size="medium" />\n  <ProgressIndicator progress="50" />\n  <ProgressIndicator progress="50" size="large" />\n</div>\n'}),j=(0,t.Z)("span",{target:"e10cbhza1"})({name:"t91scv",styles:"display:grid;place-content:center"}),Z=n=>{let{children:e,...r}=n;return(0,o.jsx)(j,{className:"dnb-p dnb-t__weight--medium dnb-t__size--small",...r,children:e})},w=()=>(0,o.jsx)(s.Z,{scope:{MyCustomLabel:Z},noInline:!0,children:'const ChangeValue = () => {\n  const max = 60\n  const [current, setCurrent] = React.useState(10)\n  React.useEffect(() => {\n    const timer = setInterval(() => {\n      setCurrent(current === 0 ? max - 1 : current - 1)\n    }, 1000)\n    return () => clearTimeout(timer)\n  })\n  return (\n    <ProgressIndicator\n      type="countdown"\n      progress={(current / max) * 100}\n      title={current + \' av \' + max}\n      size="large"\n      labelDirection="inside"\n    >\n      <MyCustomLabel aria-hidden>{current}</MyCustomLabel>\n    </ProgressIndicator>\n  )\n}\nrender(<ChangeValue />)\n'}),k=(0,t.Z)("div",{target:"e10cbhza0"})({name:"rulrx",styles:"background-color:var(--color-emerald-green);border-radius:0.5rem;padding:1rem;text-align:center"}),M=()=>(0,o.jsx)(s.Z,{hideCode:!0,"data-visual-test":"progress-indicator-custom-countdown",scope:{DarkBackground:k,MyCustomLabel:Z},noInline:!0,children:"const MyProgressIndicator = () => {\n  const StyledText = styled.span`\n    color: var(--color-white);\n    font-size: var(--font-size-small);\n  `\n  const StyledTitle = styled.span`\n    display: block;\n    font-weight: var(--font-weight-medium);\n    font-size: var(--font-size-medium);\n  `\n  const daysLeft = 20\n  const daysInMonth = 31\n  return (\n    <DarkBackground>\n      <ProgressIndicator\n        type=\"countdown\"\n        progress={(daysLeft / daysInMonth) * 100}\n        size=\"6rem\"\n        labelDirection=\"inside\"\n        customColors={{\n          line: 'var(--color-summer-green)',\n          shaft: 'transparent',\n          background: 'var(--color-sea-green)',\n        }}\n        title={daysLeft + 'days left'}\n        customCircleWidth=\"0.5rem\"\n      >\n        <StyledText>\n          <StyledTitle>{daysLeft} d</StyledTitle>\n          left\n        </StyledText>\n      </ProgressIndicator>\n    </DarkBackground>\n  )\n}\nrender(<MyProgressIndicator />)\n"}),S=()=>(0,o.jsx)(s.Z,{hideCode:!0,"data-visual-test":"progress-indicator-custom-horizontal",scope:{DarkBackground:k,MyCustomLabel:Z},noInline:!0,children:'const MyProgressIndicator = () => {\n  const StyledText = styled.span`\n    color: white;\n    font-size: var(--font-size-basis);\n  `\n  return (\n    <DarkBackground>\n      <ProgressIndicator\n        type="linear"\n        progress={75}\n        size="1rem"\n        labelDirection="vertical"\n        customColors={{\n          line: \'var(--color-summer-green)\',\n          shaft: \'var(--color-sea-green)\',\n        }}\n      >\n        <StyledText>\n          <NumberFormat percent value={75} /> done\n        </StyledText>\n      </ProgressIndicator>\n    </DarkBackground>\n  )\n}\nrender(<MyProgressIndicator />)\n'}),_=()=>(0,o.jsx)(s.Z,{"data-visual-test":"progress-indicator-customization",children:"\n<ProgressIndicator\n  type=\"linear\"\n  progress={32}\n  customColors={{\n    line: 'red',\n    shaft: 'green',\n  }}\n  size=\"4rem\"\n/>\n<ProgressIndicator\n  type=\"circular\"\n  progress={32}\n  customColors={{\n    line: 'red',\n    shaft: 'green',\n    background: 'blue',\n  }}\n  size=\"4rem\"\n/>\n\n"})}}]);
//# sourceMappingURL=eac880400cfd1553baa9908f787e84890e9df5ab-a62ac29227408907d422.js.map
"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[86323],{45566:function(e,n,t){t.d(n,{AX:function(){return T},BJ:function(){return k},C3:function(){return f},Eu:function(){return Z},GC:function(){return u},P8:function(){return m},SM:function(){return p},V$:function(){return c},Wi:function(){return d},Yp:function(){return g},g6:function(){return R},ug:function(){return h},wp:function(){return E},yt:function(){return I}});var l=t(70894),o=t(2784),s=t(82058),a=t(80215),r=t(60131),i=t(52322);const c=()=>(0,i.jsx)(b,{children:(0,i.jsx)(s.Z,{"data-visual-test":"spacing-method-space",scope:{RedBox:y},children:'<RedBox>\n  <Space top="large x-small">\n    <Input label="Input:" />\n  </Space>\n</RedBox>\n'})}),d=()=>(0,i.jsx)(b,{children:(0,i.jsx)(s.Z,{"data-visual-test":"spacing-method-form-row",children:'\n<FormRow>\n  <Input label="Input A:" />\n</FormRow>\n<FormRow top="medium">\n  <Input label="Input B:" />\n</FormRow>\n\n'})}),p=()=>(0,i.jsx)(b,{children:(0,i.jsx)(s.Z,{"data-visual-test":"spacing-method-component",children:'<FormRow>\n  <Input label="Input A:" right="small" />\n  <Input label="Input B:" />\n</FormRow>\n'})}),u=()=>(0,i.jsx)(b,{children:(0,i.jsx)(s.Z,{hideCode:!0,scope:{RedBox:y,Vertical:v},children:'<Vertical>\n  <RedBox>\n    <Space bottom="small">\n      <>\n        I have <code className="dnb-code">bottom="small"</code>\n      </>\n    </Space>\n  </RedBox>\n  <RedBox>\n    <Space top="large">\n      <>\n        I have <code className="dnb-code">top="large"</code>\n      </>\n    </Space>\n  </RedBox>\n</Vertical>\n'})}),m=()=>(0,i.jsx)(b,{children:(0,i.jsx)(s.Z,{"data-visual-test":"spacing-margins",hideCode:!0,children:'<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px">\n  <details>\n    <summary>\n      I have four <code className="dnb-code">2.5rem</code> margins!\n    </summary>\n    And this are my CSS classes:{\' \'}\n    <code className="dnb-code">\n      dnb-space dnb-space__top--large dnb-space__top--x-small\n      dnb-space__right--large dnb-space__right--x-small\n      dnb-space__bottom--large dnb-space__bottom--x-small\n      dnb-space__left--large dnb-space__left--x-small\n    </code>\n  </details>\n</Space>\n'})}),h=()=>(0,i.jsx)(b,{children:(0,i.jsx)(s.Z,{"data-visual-test":"spacing-patterns",scope:{MagicBox:C,CustomStyle:x},hideCode:!0,noInline:!0,children:'const TestCase = (props) => {\n  return (\n    <CustomStyle {...props}>\n      {listOfBoxes.map((v) => (\n        <Space key={v} top={v}>\n          <MagicBox />\n        </Space>\n      ))}\n    </CustomStyle>\n  )\n}\nconst listOfBoxes = []\nfor (let i = 0, c = 0, l = 20; i <= l; i++) {\n  listOfBoxes.push(String(c))\n  c += 0.5\n}\nrender(\n  <div className="spacing-patterns">\n    <P bottom>\n      With <Code>dnb-core-style</Code>\n    </P>\n    <TestCase className="dnb-core-style" />\n\n    <P top bottom>\n      Without\n    </P>\n    <TestCase />\n  </div>,\n)\n'})}),f=()=>(0,i.jsx)(b,{children:(0,i.jsx)(s.Z,{"data-visual-test":"spacing-elements",scope:{MagicBox:C,CustomStyle:x},hideCode:!0,noInline:!0,children:'const listOfBoxes = []\nfor (let i = 0, c = 0, l = 10; i <= l; i++) {\n  listOfBoxes.push(String(c))\n  c += 1\n}\nconst TestCase = (props) => {\n  return (\n    <CustomStyle {...props}>\n      {listOfBoxes.map((v) => (\n        <Button\n          key={v}\n          left="x-small"\n          top={v}\n          size="small"\n          custom_content={<MagicBox />}\n        />\n      ))}\n    </CustomStyle>\n  )\n}\nrender(\n  <div className="spacing-elements">\n    <P bottom>\n      With <Code>dnb-core-style</Code>\n    </P>\n    <TestCase className="dnb-core-style" />\n\n    <P top bottom>\n      Without\n    </P>\n    <TestCase />\n  </div>,\n)\n'})}),g=()=>(0,i.jsx)(s.Z,{"data-visual-test":"spacing-reset",noInline:!0,children:'const BlueBox = styled.div`\n  display: inline-block;\n  padding: 0.5rem;\n  background: blue;\n  ul {\n    background: white;\n  }\n`\nrender(\n  <BlueBox>\n    <ul className="dnb-space__reset dnb-space__top--small dnb-space__right--small dnb-space__bottom--small dnb-space__left--small">\n      <li> </li>\n    </ul>\n  </BlueBox>,\n)\n'}),b=(0,l.Z)("div",{target:"e27ecjf7"})({name:"h7k29t",styles:".dnb-input{&__input{width:8rem;}}[data-visual-test='spacing-margins']{display:flex;}"}),x=(0,l.Z)("div",{target:"e27ecjf6"})({name:"2mmh6t",styles:"display:flex;width:auto;box-shadow:0 0 0 1px var(--color-fire-red);.dnb-input__input{width:10rem;}"}),v=(0,l.Z)("div",{target:"e27ecjf5"})({name:"dnp3pp",styles:"display:inline-flex;flex-direction:column"}),y=e=>{let{children:n}=e;return(0,i.jsx)(x,{children:(0,i.jsx)(P,{children:n})})};y.defaultProps={children:null};const w=(0,l.Z)("div",{target:"e27ecjf4"})({name:"1yapa93",styles:"position:relative;display:flex;justify-content:center;width:1.5rem;height:1.5rem;background-color:var(--color-mint-green)"}),j=(0,l.Z)("div",{target:"e27ecjf3"})({name:"v6mfps",styles:"position:absolute;bottom:100%;display:flex;align-items:center;width:0.0625rem;height:100%;background-color:var(--color-fire-red);"}),_=(0,l.Z)("div",{target:"e27ecjf2"})({name:"bjn8wh",styles:"position:relative"}),S=(0,l.Z)("div",{target:"e27ecjf1"})({name:"vsd97i",styles:"position:absolute;bottom:100%;&.bottom{top:100%;bottom:0;}display:flex;align-items:center;justify-content:center;width:100%;height:100%;background-color:rgba(213, 30, 149, 0.25);"}),B=(0,l.Z)("label",{target:"e27ecjf0"})({name:"8z6nio",styles:"display:block;width:1rem;margin-left:0.25rem;font-size:calc(var(--font-size-basis) - 0.5rem);text-align:center;color:var(--color-black-80)"}),C=e=>{let{label:n=null,...t}=e;const l=o.createRef(),[s,a]=o.useState(n),[r,c]=o.useState(null);return o.useEffect((()=>{let e=!0;const t=()=>{if(e)try{if(!n){const e=window.getComputedStyle(l.current.parentElement).getPropertyValue("margin-top"),n=""+parseFloat(e)/16;a(n);const t=l.current.parentElement.getAttribute("class");c(t)}}catch(t){console.warn(t)}};return"complete"===document.readyState?t():"undefined"!=typeof window&&window.addEventListener("load",t),()=>{e=!1,"undefined"!=typeof window&&window.removeEventListener("load",t)}}),[n,l]),(0,i.jsxs)(w,{...t,ref:l,title:r,children:[(0,i.jsx)(j,{style:{height:`${s}rem`}}),(0,i.jsx)(B,{children:s})]})};C.defaultProps={label:null};const P=e=>{let{label:n=null,children:t,...l}=e;const s=o.createRef(),[r,c]=o.useState("top"),[d,p]=o.useState(n),[u,m]=o.useState(null);return o.useEffect((()=>{if(!n){let e=!0;const n=()=>{if(e)try{const e=s.current,n=window.getComputedStyle(e.children[0]),t=parseFloat(n.getPropertyValue("margin-top")),l=parseFloat(n.getPropertyValue("margin-bottom"));let o=t;l>0&&(o=l,c("bottom"));p(""+o/16);const a=e.parentElement.getAttribute("class");m(a)}catch(n){console.warn(n)}};return"complete"===document.readyState?n():"undefined"!=typeof window&&window.addEventListener("load",n),()=>{e=!1,"undefined"!=typeof window&&window.removeEventListener("load",n)}}}),[n,s]),(0,i.jsx)(a.Z,{...l,title:u,children:(0,i.jsxs)(_,{ref:s,children:[t,(0,i.jsx)(S,{style:{height:`${d}rem`},className:r,children:(0,i.jsx)(B,{children:d})})]})})};P.defaultProps={label:null,children:null};const Z=()=>(0,i.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:'\n{/* All of these methods will result in the same spacing */}\n<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />\n\n'}),I=()=>(0,i.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:"\n{/* All of these methods will result in the same spacing */}\n<Space\n  space={{\n    top: 'large x-small',\n    right: '2.5',\n    bottom: '2.5rem',\n    left: '40px',\n  }}\n/>\n\n"}),R=()=>(0,i.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:"\n<Button top=\"large x-small medium\" />\n<Button\n  space={{\n    top: 'large x-small medium',\n  }}\n/>\n\n"}),k=()=>(0,i.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:'\n{/* Equivalent to top="small" */}\n<Button top />\n{/* Equivalent to top="small" right="small" bottom="small" left="small" */}\n<Button space />\n\n'}),E=()=>(0,i.jsx)(s.Z,{hidePreview:!0,hideToolbar:!0,children:'<Button space="large x-small medium" />\n'}),T=()=>(0,i.jsx)(s.Z,{scope:{Provider:r.Z},hidePreview:!0,children:"<Provider\n  space={{\n    no_collapse: true,\n  }}\n>\n  <Space>I do not collapse</Space>\n  <Space>I do not collapse</Space>\n</Provider>\n"})}}]);
//# sourceMappingURL=128811ddd54fdc603dff4684979e65d25da6d638-5466e2a80e39da2b6392.js.map
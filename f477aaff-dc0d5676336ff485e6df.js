"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[87966],{16908:function(e,n,t){t.r(n),t.d(n,{Components:function(){return O},FourDirections:function(){return L},InnerSpace:function(){return h},MagicBox:function(){return T},MarginCollapse:function(){return g},Margins:function(){return x},Method1:function(){return p},Method2:function(){return m},Method3:function(){return u},ProviderExample:function(){return W},SameResult1:function(){return N},SameResult2:function(){return M},Shorthand:function(){return A},SpaceVisibleWhenVisualTestElements:function(){return f},SpaceVisibleWhenVisualTestPatterns:function(){return b},SpaceVisibleWhenVisualTestReset:function(){return v},VisualSpace:function(){return V}});var s=t(70894),a=t(2784),o=t(35823),l=t(80215),r=t(72779),i=t.n(r),c=t(2045),d=t(52322);const p=()=>(0,d.jsx)(y,{children:(0,d.jsx)(o.Z,{"data-visual-test":"spacing-method-space",scope:{RedBox:w},children:'<RedBox>\n  <Space top="large x-small">\n    <Input label="Input:" />\n  </Space>\n</RedBox>\n'})}),m=()=>(0,d.jsx)(y,{children:(0,d.jsx)(o.Z,{"data-visual-test":"spacing-method-component",children:'\n<Input label="Input A:" right="small" />\n<Input label="Input B:" />\n\n'})}),u=()=>(0,d.jsx)(y,{children:(0,d.jsx)(o.Z,{scope:{RedBox:w,createSpacingClasses:c.HU,createSpacingProperties:c.PL,removeSpaceProps:c.du,classnames:i()},"data-visual-test":"spacing-method-form-row",noInline:!0,children:"const Component = ({ className = null, style = null, ...props }) => {\n  const spacingClasses = createSpacingClasses(props)\n  const spacingProperties = createSpacingProperties(props)\n  const cn = classnames(\n    'my-comoponent',\n    'dnb-space',\n    spacingClasses,\n    className,\n  )\n  const st = {\n    ...style,\n    ...spacingProperties,\n  }\n  return <div className={cn} style={st} {...removeSpaceProps(props)} />\n}\nrender(\n  <>\n    <RedBox>\n      <Component top=\"small medium large\">Space A</Component>\n    </RedBox>\n    <RedBox>\n      <Component top>Space B</Component>\n    </RedBox>\n    <RedBox>\n      <Component innerSpace=\"large\">Inner Space</Component>\n    </RedBox>\n    <RedBox>\n      <Component\n        innerSpace={{\n          large: true,\n        }}\n      >\n        Has space when breakpoint is large\n      </Component>\n    </RedBox>\n  </>,\n)\n"})}),h=()=>(0,d.jsx)(y,{children:(0,d.jsx)(o.Z,{"data-visual-test":"inner-spacing",scope:{RedBox:w},children:"<RedBox>\n  <Space\n    innerSpace={{\n      small: 'large x-small',\n      medium: true,\n      large: {\n        top: '2rem',\n        left: '16px',\n        bottom: 'large',\n        right: '5rem',\n      },\n    }}\n  >\n    <P>Content</P>\n  </Space>\n</RedBox>\n"})}),g=()=>(0,d.jsx)(y,{children:(0,d.jsx)(o.Z,{hideCode:!0,scope:{RedBox:w,Vertical:j},children:'<Vertical>\n  <RedBox>\n    <Space bottom="small">\n      <>\n        I have <code className="dnb-code">bottom="small"</code>\n      </>\n    </Space>\n  </RedBox>\n  <RedBox>\n    <Space top="large">\n      <>\n        I have <code className="dnb-code">top="large"</code>\n      </>\n    </Space>\n  </RedBox>\n</Vertical>\n'})}),x=()=>(0,d.jsx)(y,{children:(0,d.jsx)(o.Z,{"data-visual-test":"spacing-margins",hideCode:!0,children:'<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px">\n  <details>\n    <summary>\n      I have four <code className="dnb-code">2.5rem</code> margins!\n    </summary>\n    And this are my CSS classes:{\' \'}\n    <code className="dnb-code">\n      dnb-space dnb-space__top--large dnb-space__top--x-small\n      dnb-space__right--large dnb-space__right--x-small\n      dnb-space__bottom--large dnb-space__bottom--x-small\n      dnb-space__left--large dnb-space__left--x-small\n    </code>\n  </details>\n</Space>\n'})}),b=()=>(0,d.jsx)(y,{children:(0,d.jsx)(o.Z,{"data-visual-test":"spacing-patterns",scope:{MagicBox:T,CustomStyle:S},hideCode:!0,noInline:!0,children:'const TestCase = (props) => {\n  return (\n    <CustomStyle {...props}>\n      {listOfBoxes.map((v) => (\n        <Space key={v} top={v}>\n          <MagicBox />\n        </Space>\n      ))}\n    </CustomStyle>\n  )\n}\nconst listOfBoxes = []\nfor (let i = 0, c = 0, l = 20; i <= l; i++) {\n  listOfBoxes.push(String(c))\n  c += 0.5\n}\nrender(\n  <div className="spacing-patterns">\n    <P bottom>\n      With <Code>dnb-core-style</Code>\n    </P>\n    <TestCase className="dnb-core-style" />\n\n    <P top bottom>\n      Without\n    </P>\n    <TestCase />\n  </div>,\n)\n'})}),f=()=>(0,d.jsx)(y,{children:(0,d.jsx)(o.Z,{"data-visual-test":"spacing-elements",scope:{MagicBox:T,CustomStyle:S},hideCode:!0,noInline:!0,children:'const listOfBoxes = []\nfor (let i = 0, c = 0, l = 10; i <= l; i++) {\n  listOfBoxes.push(String(c))\n  c += 1\n}\nconst TestCase = (props) => {\n  return (\n    <CustomStyle {...props}>\n      {listOfBoxes.map((v) => (\n        <Button\n          key={v}\n          left="x-small"\n          top={v}\n          size="small"\n          custom_content={<MagicBox />}\n        />\n      ))}\n    </CustomStyle>\n  )\n}\nrender(\n  <div className="spacing-elements">\n    <P bottom>\n      With <Code>dnb-core-style</Code>\n    </P>\n    <TestCase className="dnb-core-style" />\n\n    <P top bottom>\n      Without\n    </P>\n    <TestCase />\n  </div>,\n)\n'})}),v=()=>(0,d.jsx)(o.Z,{"data-visual-test":"spacing-reset",noInline:!0,children:'const BlueBox = styled.div`\n  display: inline-block;\n  padding: 0.5rem;\n  background: blue;\n  ul {\n    background: white;\n  }\n`\nrender(\n  <BlueBox>\n    <ul className="dnb-space__reset dnb-space__top--small dnb-space__right--small dnb-space__bottom--small dnb-space__left--small">\n      <li> </li>\n    </ul>\n  </BlueBox>,\n)\n'}),y=(0,s.Z)("div",{target:"e1ejvx8y11"})({name:"h7k29t",styles:".dnb-input{&__input{width:8rem;}}[data-visual-test='spacing-margins']{display:flex;}"}),S=(0,s.Z)("div",{target:"e1ejvx8y10"})({name:"2mmh6t",styles:"display:flex;width:auto;box-shadow:0 0 0 1px var(--color-fire-red);.dnb-input__input{width:10rem;}"}),j=(0,s.Z)("div",{target:"e1ejvx8y9"})({name:"dnp3pp",styles:"display:inline-flex;flex-direction:column"}),w=e=>{let{children:n,...t}=e;return(0,d.jsx)(S,{children:(0,d.jsx)(V,{...t,children:n})})},B=(0,s.Z)("div",{target:"e1ejvx8y8"})({name:"1yapa93",styles:"position:relative;display:flex;justify-content:center;width:1.5rem;height:1.5rem;background-color:var(--color-mint-green)"}),C=(0,s.Z)("div",{target:"e1ejvx8y7"})({name:"v6mfps",styles:"position:absolute;bottom:100%;display:flex;align-items:center;width:0.0625rem;height:100%;background-color:var(--color-fire-red);"}),_=(0,s.Z)("div",{target:"e1ejvx8y6"})({name:"bjn8wh",styles:"position:relative"}),P=(0,s.Z)("div",{target:"e1ejvx8y5"})("position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:100%;height:100%;background-color:",(e=>"padding"===e.theme.unit?"rgba(30, 112, 213, 0.25)":"rgba(213, 30, 149, 0.25)"),";"),Z=(0,s.Z)(P,{target:"e1ejvx8y4"})("top:",(e=>"padding"===e.theme.unit?0:"auto"),";bottom:100%;"),R=(0,s.Z)(P,{target:"e1ejvx8y3"})("top:",(e=>"padding"===e.theme.unit?"auto":"100%"),";bottom:0;"),k=(0,s.Z)(P,{target:"e1ejvx8y2"})({name:"w71e3",styles:"left:auto;right:auto"}),I=(0,s.Z)(P,{target:"e1ejvx8y1"})({name:"jr388m",styles:"left:auto;right:0"}),E=(0,s.Z)("label",{target:"e1ejvx8y0"})({name:"8z6nio",styles:"display:block;width:1rem;margin-left:0.25rem;font-size:calc(var(--font-size-basis) - 0.5rem);text-align:center;color:var(--color-black-80)"}),T=e=>{const n=a.createRef(),[t,s]=a.useState(""),[o,l]=a.useState(null);return a.useEffect((()=>{const e=n.current,t=()=>{try{const n=window.getComputedStyle(e.parentElement).getPropertyValue("margin-top"),t=""+parseFloat(n)/16;s(t);const a=e.parentElement.getAttribute("class");l(a)}catch(n){console.warn(n)}};return"complete"===document.readyState?t():"undefined"!=typeof window&&window.addEventListener("load",t),()=>{window.removeEventListener("load",t)}}),[]),(0,d.jsxs)(B,{...e,ref:n,title:o,children:[(0,d.jsx)(C,{style:{height:`${t}rem`}}),(0,d.jsx)(E,{children:t})]})},V=e=>{let{children:n,...t}=e;const s=a.createRef(),o={top:0,left:0,right:0,bottom:0},[r,i]=a.useState(o),[c,p]=a.useState(o),[m,u]=a.useState(null);a.useEffect((()=>{const e=s.current,n=()=>{try{const n={...o},t={...o},s=window.getComputedStyle(e.children[0]);Object.keys(o).forEach((e=>{n[e]=parseFloat(s.getPropertyValue(`margin-${e}`))/16,t[e]=parseFloat(s.getPropertyValue(`padding-${e}`))/16})),i(n),p(t);const a=e.parentElement.getAttribute("class");u(a)}catch(n){console.warn(n)}};let t;"complete"===document.readyState?n():"undefined"!=typeof window&&window.addEventListener("load",n);const a=()=>{clearTimeout(t),t=setTimeout(n,10)};return window.addEventListener("resize",a),()=>{"undefined"!=typeof window&&(window.removeEventListener("load",n),window.removeEventListener("resize",a))}}),[]);const h=e=>{let{space:n,unit:t}=e;return Object.keys(o).map((e=>{const s={unit:t};let a=null;switch(e){case"top":a=Z;break;case"right":a=I;break;case"bottom":a=R;break;case"left":a=k}const o="top"===e||"bottom"===e?"height":"width";return(0,d.jsx)(a,{theme:s,style:{[o]:`${n[e]}rem`},children:(0,d.jsx)(E,{children:n[e]||""})},e)}))};return(0,d.jsx)(l.Z,{...t,title:m,children:(0,d.jsxs)(_,{ref:s,children:[n,h({space:r,unit:"margin"}),h({space:c,unit:"padding"})]})})},N=()=>(0,d.jsx)(o.Z,{hidePreview:!0,hideToolbar:!0,children:'\n{/* All of these methods will result in the same spacing */}\n<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />\n\n'}),M=()=>(0,d.jsx)(o.Z,{hidePreview:!0,hideToolbar:!0,children:"\n{/* All of these methods will result in the same spacing */}\n<Space\n  space={{\n    top: 'large x-small',\n    right: '2.5',\n    bottom: '2.5rem',\n    left: '40px',\n  }}\n/>\n\n"}),O=()=>(0,d.jsx)(o.Z,{hidePreview:!0,hideToolbar:!0,children:"\n<Button top=\"large x-small medium\" />\n<Button\n  space={{\n    top: 'large x-small medium',\n  }}\n/>\n\n"}),A=()=>(0,d.jsx)(o.Z,{hidePreview:!0,hideToolbar:!0,children:'\n{/* Equivalent to top="small" */}\n<Button top />\n{/* Equivalent to top="small" right="small" bottom="small" left="small" */}\n<Button space />\n\n'}),L=()=>(0,d.jsx)(o.Z,{hidePreview:!0,hideToolbar:!0,children:'<Button space="large x-small medium" />\n'}),W=()=>(0,d.jsx)(o.Z,{hidePreview:!0,children:"<Provider\n  space={{\n    no_collapse: true,\n  }}\n>\n  <Space>I do not collapse</Space>\n  <Space>I do not collapse</Space>\n</Provider>\n"})}}]);
//# sourceMappingURL=f477aaff-dc0d5676336ff485e6df.js.map
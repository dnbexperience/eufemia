"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[83590],{57136:function(n,e,t){t.r(e),t.d(e,{default:function(){return u}});var s={};t.r(s),t.d(s,{Default:function(){return c}});var o=t(52322),r=t(45392),i=t(50716),a=t(64129),l=t(59626);const c=()=>(0,o.jsx)(i.Z,{scope:{StepsLayout:a.Z,StepsContext:l.Z},children:"<StepsContext.Provider\n  value={{\n    activeIndex: 5,\n    handlePrevious: () => console.log('handlePrevious'),\n    handleNext: () => console.log('handleNext'),\n  }}\n>\n  <StepsLayout.Buttons />\n</StepsContext.Provider>\n"});function d(n){const e=Object.assign({h2:"h2"},(0,r.ah)(),n.components);return s||p("Examples",!1),c||p("Examples.Default",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{children:"Demo"}),"\n",(0,o.jsx)(c,{})]})}var u=function(n){void 0===n&&(n={});const{wrapper:e}=Object.assign({},(0,r.ah)(),n.components);return e?(0,o.jsx)(e,Object.assign({},n,{children:(0,o.jsx)(d,n)})):d(n)};function p(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}},59626:function(n,e,t){const s=t(2784).createContext(void 0);e.Z=s},64129:function(n,e,t){t.d(e,{Z:function(){return S}});var s=t(2784),o=t(72779),r=t.n(o),i=t(80215),a=t(76603),l=t(66485),c=t(21068),d=t(30392),u=t(59626),p=t(52322);function h(n){const{className:e,index:t,children:o}=n,i=(0,s.useContext)(u.Z);return(null==i?void 0:i.activeIndex)!==t?null:(0,p.jsx)(d.Z,{className:r()("dnb-forms-step",e),direction:"vertical",...(0,d.W)(n),children:o})}h._supportsSpacingProps=!0;var v=h,x=t(96844),m=t(28952),f=t(65927);function b(n){const e=(0,s.useContext)(m.Z),{className:t,variant:o="primary",icon_position:i="right",icon:a="chevron_right",children:l=(null==e?void 0:e.translation.Forms.stepNext)}=n,c=(0,s.useContext)(u.Z);return(0,p.jsx)(f.Z,{children:(0,p.jsx)(x.Z,{...n,className:r()("dnb-forms-next-button",t),onClick:null==c?void 0:c.handleNext,variant:o,icon_position:i,icon:a,children:l})})}b._supportsSpacingProps=!0;var _=b;function j(n){const e=(0,s.useContext)(m.Z),{className:t,variant:o="tertiary",icon_position:i="left",icon:a="chevron_left",children:l=(null==e?void 0:e.translation.Forms.stepPrevious)}=n,c=(0,s.useContext)(u.Z);return(0,p.jsx)(f.Z,{children:(0,p.jsx)(x.Z,{...n,className:r()("dnb-forms-previous-button",t),onClick:null==c?void 0:c.handlePrevious,variant:o,icon_position:i,icon:a,children:l})})}j._supportsSpacingProps=!0;var C=j;function Z(n){const{className:e}=n;return(0,p.jsxs)(f.Z,{className:r()("dnb-forms-buttons",e),...n,children:[(0,p.jsx)(C,{}),(0,p.jsx)(_,{})]})}Z._supportsSpacingProps=!0;var g=Z;function N(n){const{className:e,id:t=(0,l.Xo)(),mode:o="strict",scrollTopOnStepChange:d,initialActiveIndex:h=0,onStepChange:x,children:m,...f}=n,b=(0,s.useContext)(c.Z),{0:_,1:j}=(0,s.useState)(h),C=(0,s.useCallback)((()=>{var n;(j((n=>(null==x||x(n-1),n-1))),d)&&(null===(n=window)||void 0===n||n.scrollTo({top:0,behavior:"smooth"}))}),[d,x]),Z=(0,s.useCallback)((()=>{var n;b.hasErrors()?b.setShowAllErrors(!0):(j((n=>(null==x||x(n+1),n+1))),d&&(null===(n=window)||void 0===n||n.scrollTo({top:0,behavior:"smooth"})))}),[b,d,x]),g=s.Children.map(m,(n=>{var e;if(!s.isValidElement(n)||n.type!==v)throw new Error("Only Step can be children of StepsLayout");return null!==(e=n.props.title)&&void 0!==e?e:"Title missing"})),N=(0,s.useCallback)((n=>{let{current_step:e}=n;j(e)}),[]);return(0,p.jsx)(u.Z.Provider,{value:{activeIndex:_,handlePrevious:C,handleNext:Z},children:(0,p.jsxs)(i.Z,{className:r()("dnb-forms-steps-layout",e),...f,children:[(0,p.jsxs)("aside",{className:"dnb-forms-steps-layout__sidebar",children:[(0,p.jsx)(a.Z.Sidebar,{sidebar_id:t}),(0,p.jsx)(a.Z,{bottom:!0,current_step:_,data:g,mode:o,no_animation:!0,on_change:N,sidebar_id:t,title:""})]}),(0,p.jsx)("div",{className:"dnb-forms-steps-layout__contents",children:s.Children.map(m,((n,e)=>s.isValidElement(n)&&n.type===v?s.cloneElement(n,{index:e}):n))})]})})}N._supportsSpacingProps=!0,N.Step=v,N.NextButton=_,N.PreviousButton=C,N.Buttons=g;var S=N}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-steps-layout-buttons-demos-mdx-4e766963b4dfb10d0114.js.map
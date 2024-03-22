"use strict";(self.webpackChunkdnb_design_system_portal=self.webpackChunkdnb_design_system_portal||[]).push([[65031],{29236:function(e,n,t){t.r(n),t.d(n,{default:function(){return d}});var s={};t.r(s),t.d(s,{Default:function(){return c}});var r=t(52322),o=t(45392),i=t(7325),a=t(67436),l=t(59626);const c=()=>(0,r.jsx)(i.Z,{scope:{StepsLayout:a.Z,StepsContext:l.Z},children:"<StepsContext.Provider\n  value={{\n    activeIndex: 0,\n    handlePrevious: () => null,\n    handleNext: () => console.log('handleNext'),\n  }}\n>\n  <StepsLayout.NextButton />\n</StepsContext.Provider>\n"});function u(e){const n=Object.assign({h2:"h2"},(0,o.ah)(),e.components);return s||p("Examples",!1),c||p("Examples.Default",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:"Demo"}),"\n",(0,r.jsx)(c,{})]})}var d=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,o.ah)(),e.components);return n?(0,r.jsx)(n,Object.assign({},e,{children:(0,r.jsx)(u,e)})):u(e)};function p(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},59626:function(e,n,t){const s=t(2784).createContext({activeIndex:0,setActiveIndex:()=>null,handlePrevious:()=>null,handleNext:()=>null});n.Z=s},67436:function(e,n,t){t.d(n,{Z:function(){return I}});var s=t(2784),r=t(72779),o=t.n(r),i=t(80215),a=t(76603),l=t(80945),c=t(56239),u=t(67155),d=t(21068),p=t(30392),v=t(59626),x=t(61890),h=t(52322);function m(e){const{className:n,index:t,children:r}=e,i=(0,s.useContext)(v.Z);return(null==i?void 0:i.activeIndex)!==t?null:(0,h.jsx)(x.Z,{className:o()("dnb-forms-step",n),...(0,p.W)(e),children:r})}m._supportsSpacingProps=!0;var f=m,b=t(28952),C=t(65927),_=t(71370);function j(e){const n=(0,s.useContext)(b.Z),{className:t,variant:r="primary",icon_position:i="right",icon:a="chevron_right",children:l=(null==n?void 0:n.translation.Forms.stepNext)}=e,c=(0,s.useContext)(v.Z);return(0,h.jsx)(C.Z,{children:(0,h.jsx)(_.Z,{type:"button",className:o()("dnb-forms-next-button",t),onClick:null==c?void 0:c.handleNext,variant:r,icon_position:i,icon:a,...e,children:l})})}j._supportsSpacingProps=!0;var y=j,Z=t(96844);function k(e){const n=(0,s.useContext)(b.Z),{className:t,variant:r="tertiary",icon_position:i="left",icon:a="chevron_left",children:l=(null==n?void 0:n.translation.Forms.stepPrevious)}=e,c=(0,s.useContext)(v.Z),u={};return 0===(null==c?void 0:c.activeIndex)&&(u.disabled=!0),(0,h.jsx)(C.Z,{children:(0,h.jsx)(Z.Z,{className:o()("dnb-forms-previous-button",t),onClick:null==c?void 0:c.handlePrevious,variant:r,icon_position:i,icon:a,...u,...e,children:l})})}k._supportsSpacingProps=!0;var S=k;function N(e){const{className:n}=e;return(0,h.jsxs)(C.Z,{className:o()("dnb-forms-buttons",n),...e,children:[(0,h.jsx)(S,{}),(0,h.jsx)(y,{})]})}N._supportsSpacingProps=!0;var g=N,E=t(80370),P=t(43151);function w(e){const{className:n,id:t,mode:r="strict",scrollTopOnStepChange:p,initialActiveIndex:x=0,onStepChange:m,children:b,noAnimation:C=!0,variant:_="sidebar",sidebarId:j,...y}=e,{hasContext:Z,setFormState:k,handleSubmitCall:S,setShowAllErrors:N,showAllErrors:g,scrollToTop:I}=(0,s.useContext)(d.Z),A=(0,u.Z)(t),{1:F}=(0,s.useReducer)((()=>({})),{}),O=(0,s.useRef)(x),B=(0,s.useRef)({});B.current[O.current]=g;const R=(0,s.useCallback)((async(e,n)=>(0,c.S)(m)?await m(e,n):null==m?void 0:m(e,n)),[m]),T=(0,s.useCallback)((e=>{let{index:n,skipErrorCheck:t,mode:s}=e;S({skipErrorCheck:t,skipFieldValidation:t,enableAsyncBehaviour:(0,c.S)(m),onSubmit:async()=>{const e=await R(n,s);return k("abort"),t||N(B.current[n]),e instanceof Error||(O.current=n,F()),p&&I(),e}})}),[R,S,m,I,p,k,N]),D=(0,s.useCallback)(((e,n)=>{if(e===O.current)return;const t=e>O.current?"next":"previous";T({index:e,skipErrorCheck:"previous"===t,mode:t,...n})}),[T]),L=(0,s.useCallback)((()=>{D(O.current-1)}),[D]),V=(0,s.useCallback)((()=>{D(O.current+1)}),[D]),H=(0,s.useCallback)((e=>{let{current_step:n}=e;D(n,{skipErrorCheck:!0})}),[D]),K=(0,s.useMemo)((()=>({activeIndex:O.current,setActiveIndex:D,handlePrevious:L,handleNext:V})),[O.current,D,L,V]),M=(0,P.O)(Z&&A?A+"-steps":void 0),{extend:W}=M;if((0,s.useEffect)((()=>{Z&&A&&W(K)}),[A,W,K]),!Z)return(0,l.ZK)("You may wrap StepsLayout in Form.Handler"),(0,h.jsx)(E.Z,{children:(0,h.jsx)(w,{...e,id:A})});const Y=[],q=s.Children.map(b,((e,n)=>{if(s.isValidElement(e)){var t,r;let a=e;var o,i;if((null===(t=e)||void 0===t?void 0:t.type)!==f&&"function"==typeof e.type)a=e.type.apply(e.type,[e.props]),(null===(o=a)||void 0===o?void 0:o.type)===f&&(e=a);if((null===(r=e)||void 0===r?void 0:r.type)===f)return Y.push(null!==(i=e.props.title)&&void 0!==i?i:"Title missing"),s.cloneElement(e,{index:n})}return e}));return(0,h.jsx)(v.Z.Provider,{value:K,children:(0,h.jsxs)(i.Z,{className:o()("dnb-forms-steps-layout","drawer"===_&&"dnb-forms-steps-layout--drawer",n),...y,children:[(0,h.jsxs)("aside",{className:"dnb-forms-steps-layout__sidebar",children:[(0,h.jsx)(a.Z.Sidebar,{sidebar_id:A}),(0,h.jsx)(a.Z,{bottom:!0,current_step:O.current,data:Y,mode:r,no_animation:C,on_change:H,sidebar_id:"drawer"!==_||j?j||A:""})]}),(0,h.jsx)("div",{className:"dnb-forms-steps-layout__contents",children:q})]})})}w._supportsSpacingProps=!0,w.Step=f,w.NextButton=y,w.PreviousButton=S,w.Buttons=g,w.useStep=function(e){void 0===e&&(e=null);const n=(0,s.useRef)(null);n.current=(0,P.O)(e?e+"-steps":void 0);const t=(0,s.useContext)(v.Z);return n.current.data||t};var I=w}}]);
//# sourceMappingURL=component---src-docs-uilib-extensions-forms-extended-features-steps-layout-next-button-demos-mdx-041ce9d7bcca252856d0.js.map
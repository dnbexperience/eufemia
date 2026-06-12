import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{m as r}from"./index-CsG353ar.js";var i=e({FocusExample:()=>c,SkipLinkExample:()=>s}),a=t(n()),o=r.div`
  margin: 3rem 0;
  a.dnb-skip-link--active {
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
    &::after {
      content: none;
    }
  }
`;function s(){return(0,a.jsx)(o,{children:(0,a.jsx)(`a`,{className:`dnb-skip-link--active`,onClick:e=>{let t=document.querySelector(`a.dnb-skip-link`);try{t.focus(),e.preventDefault()}catch(e){console.log(e)}},href:`#dnb-app-content`,children:`Show Skip-Link`})})}function c(){return(0,a.jsx)(`button`,{type:`button`,style:{display:`inline-block`,padding:`0.5rem 1.5rem`,border:`var(--focus-ring-width) solid var(--token-color-stroke-action-focus)`,backgroundColor:`var(--token-color-background-action-focus-subtle)`,color:`var(--token-color-text-action-focus)`,borderRadius:`var(--token-radius-full)`},children:`Focus example`})}export{c as n,s as r,i as t};
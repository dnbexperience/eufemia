import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{y as n}from"./index-DVm0MbGb.js";var r=e({FocusExample:()=>s,SkipLinkExample:()=>o}),i=t(),a=n.div`
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
`;function o(){return(0,i.jsx)(a,{children:(0,i.jsx)(`a`,{className:`dnb-skip-link--active`,onClick:e=>{let t=document.querySelector(`a.dnb-skip-link`);try{t.focus(),e.preventDefault()}catch(e){console.log(e)}},href:`#dnb-app-content`,children:`Show Skip-Link`})})}function s(){return(0,i.jsx)(`button`,{type:`button`,style:{display:`inline-block`,padding:`0.5rem 1.5rem`,border:`var(--focus-ring-width) solid var(--token-color-stroke-action-focus)`,backgroundColor:`var(--token-color-background-action-focus-subtle)`,color:`var(--token-color-text-action-focus)`,borderRadius:`var(--token-radius-full)`},children:`Focus example`})}export{s as n,o as r,r as t};